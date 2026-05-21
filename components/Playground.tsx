"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./Playground.module.css";

// useLayoutEffect on the server logs a warning; alias to useEffect for SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Photo = {
  id: string;
  src: string;
  location: string;
  year: number;
  // Position on the wall, in px (top-left of the photo card).
  x: number;
  y: number;
  width: number; // display width in px — height follows the image's true aspect ratio.
  aspect: number; // h / w of the source image (preserved 1:1)
  tilt: number; // deg, range -2 .. +4
};

// Most photos display in portrait via object-fit: cover.
// Exceptions kept landscape: bee, hummingbird, dog, sf-sunset.
const L = 0.75; // landscape display ratio (h/w)
const P = 1.333; // portrait display ratio (h/w)

// Scattered placement on a 2800 × 2000 wall — staggered y-positions, some
// photos drift between horizontal bands to break the row feel.
const PHOTOS: Photo[] = [
  {
    id: "italy",
    src: "/playground/italy.jpg",
    location: "Italy",
    year: 2024,
    x: 180,
    y: 160,
    width: 300,
    aspect: P,
    tilt: -1.8,
  },
  {
    id: "dog-on-beach",
    src: "/playground/dog-on-beach.jpg",
    location: "San Francisco",
    year: 2026,
    x: 600,
    y: 80,
    width: 340,
    aspect: P,
    tilt: 2.6,
  },
  {
    id: "crane",
    src: "/playground/crane.jpg",
    location: "Mexico",
    year: 2025,
    x: 1000,
    y: 380,
    width: 320,
    aspect: P,
    tilt: 3.5,
  },
  {
    id: "hummingbird",
    src: "/playground/hummingbird.jpg",
    location: "San Francisco",
    year: 2024,
    x: 1500,
    y: 160,
    width: 390,
    aspect: L,
    tilt: -2.0,
  },
  {
    id: "water-restaurant",
    src: "/playground/water-restaurant.jpg",
    location: "India",
    year: 2024,
    x: 1960,
    y: 420,
    width: 320,
    aspect: P,
    tilt: 2.2,
  },
  {
    id: "georgia",
    src: "/playground/georgia.jpg",
    location: "Georgia",
    year: 2024,
    x: 2380,
    y: 120,
    width: 340,
    aspect: P,
    tilt: 2.8,
  },

  {
    id: "sun-beach",
    src: "/playground/sun-beach.jpg",
    location: "San Francisco",
    year: 2025,
    x: 240,
    y: 720,
    width: 290,
    aspect: P,
    tilt: -1.4,
  },
  {
    id: "bee",
    src: "/playground/bee.jpg",
    location: "Berkeley",
    year: 2024,
    x: 620,
    y: 820,
    width: 380,
    aspect: L,
    tilt: 2.0,
  },
  {
    id: "tree",
    src: "/playground/tree.jpg",
    location: "Chicago",
    year: 2025,
    x: 1480,
    y: 560,
    width: 290,
    aspect: P,
    tilt: -1.2,
  },
  {
    id: "bird",
    src: "/playground/bird.jpg",
    location: "Chicago",
    year: 2025,
    x: 1080,
    y: 900,
    width: 320,
    aspect: P,
    tilt: -1.6,
  },
  {
    id: "sf-sunset",
    src: "/playground/sf-sunset.jpg",
    location: "San Francisco",
    year: 2025,
    x: 1880,
    y: 900,
    width: 420,
    aspect: L,
    tilt: 1.6,
  },
  {
    id: "japanese-lake",
    src: "/playground/japanese-lake.jpg",
    location: "San Francisco",
    year: 2025,
    x: 2360,
    y: 720,
    width: 320,
    aspect: P,
    tilt: 2.4,
  },

  {
    id: "house-island",
    src: "/playground/house-island.jpg",
    location: "San Francisco",
    year: 2025,
    x: 1500,
    y: 1240,
    width: 290,
    aspect: P,
    tilt: 3.2,
  },
  {
    id: "cows",
    src: "/playground/cows.jpg",
    location: "India",
    year: 2025,
    x: 200,
    y: 1280,
    width: 320,
    aspect: P,
    tilt: -1.8,
  },
  {
    id: "bus",
    src: "/playground/bus.jpg",
    location: "San Francisco",
    year: 2024,
    x: 620,
    y: 1340,
    width: 290,
    aspect: P,
    tilt: 2.0,
  },
  {
    id: "seal",
    src: "/playground/seal.jpg",
    location: "San Francisco",
    year: 2024,
    x: 1100,
    y: 1380,
    width: 320,
    aspect: P,
    tilt: -1.4,
  },
  {
    id: "dog",
    src: "/playground/dog.jpg",
    location: "India",
    year: 2024,
    x: 1900,
    y: 1380,
    width: 380,
    aspect: L,
    tilt: -2.0,
  },
];

type Offset = { x: number; y: number };

type CarryState = {
  id: string;
  // Cursor coords at pickup in WALL space (clientX/Y + scrollLeft/Top). Storing
  // these in wall coords means edge-scrolling naturally produces the right
  // photo offset without re-anchoring on every scroll change.
  pickupWallX: number;
  pickupWallY: number;
  originX: number;
  originY: number;
};

type DragState = {
  id: string;
  pointerId: number;
  // Cursor position at pickup, in wall coords (viewport + scroll). Using wall
  // coords means subsequent scroll changes naturally translate into offset
  // changes without re-anchoring.
  startWallX: number;
  startWallY: number;
  originX: number;
  originY: number;
  // The viewport-space start position is kept for the click-vs-drag distance
  // check (we don't want scrolling to count as "movement" past the threshold).
  startClientX: number;
  startClientY: number;
  moved: boolean;
};

const CLICK_THRESHOLD_PX = 5;
const EDGE_THRESHOLD = 90;
const MAX_SCROLL_SPEED = 18;

// Clamp a photo's offset so the resulting wall-space position keeps the
// photo (including the corners produced by its tilt) fully inside the wall.
function clampOffset(
  photo: Photo,
  raw: Offset,
  wallEl: HTMLElement | null,
): Offset {
  const wallW = wallEl?.offsetWidth ?? 2800;
  const wallH = wallEl?.offsetHeight ?? 2000;
  const photoH = photo.width * photo.aspect;
  // A rotated rectangle's bounding box is larger than the unrotated one.
  // Reserve enough margin so the rotated corners don't poke past the wall.
  const tiltRad = (Math.abs(photo.tilt) * Math.PI) / 180;
  const tiltBuffer = Math.ceil(
    (Math.max(photo.width, photoH) / 2) * Math.sin(tiltRad),
  );
  const minX = -photo.x + tiltBuffer;
  const maxX = wallW - photo.x - photo.width - tiltBuffer;
  const minY = -photo.y + tiltBuffer;
  const maxY = wallH - photo.y - photoH - tiltBuffer;
  return {
    x: Math.max(minX, Math.min(maxX, raw.x)),
    y: Math.max(minY, Math.min(maxY, raw.y)),
  };
}

export default function Playground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wallRef = useRef<HTMLDivElement | null>(null);
  const [offsets, setOffsets] = useState<Record<string, Offset>>({});
  const [zOrder, setZOrder] = useState<string[]>(() => PHOTOS.map((p) => p.id));
  const [carriedId, setCarriedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const carryRef = useRef<CarryState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  // Latest cursor viewport position, sampled in the move handlers. Read by
  // the edge-scroll rAF loop so panning continues even when the cursor stops.
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // After a drag with movement, suppress the synthetic click that browsers
  // fire on pointerup — otherwise it would immediately enter carry mode.
  const suppressNextClickRef = useRef(false);
  const suppressClearTidRef = useRef<number | null>(null);

  const bringToFront = useCallback((id: string) => {
    setZOrder((order) => {
      if (order[order.length - 1] === id) return order;
      const next = order.filter((x) => x !== id);
      next.push(id);
      return next;
    });
  }, []);

  // Apply (current cursor − pickup) as the displacement from the original offset.
  // Cursor positions are taken in wall coords so an in-flight scroll change is
  // already reflected in the delta.
  const applyCarryDelta = useCallback((clientX: number, clientY: number) => {
    const carry = carryRef.current;
    if (!carry) return;
    const el = rootRef.current;
    const sl = el?.scrollLeft ?? 0;
    const st = el?.scrollTop ?? 0;
    const dx = clientX + sl - carry.pickupWallX;
    const dy = clientY + st - carry.pickupWallY;
    const photo = PHOTOS.find((p) => p.id === carry.id)!;
    const next = clampOffset(
      photo,
      { x: carry.originX + dx, y: carry.originY + dy },
      wallRef.current,
    );
    setOffsets((prev) => ({ ...prev, [carry.id]: next }));
  }, []);

  // ─── Click handler: pickup / drop (carry mode) ───
  const onPhotoClick = (e: React.MouseEvent<HTMLDivElement>, photo: Photo) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    if (carryRef.current) {
      applyCarryDelta(e.clientX, e.clientY);
      carryRef.current = null;
      setCarriedId(null);
      return;
    }
    const existing = offsets[photo.id] ?? { x: 0, y: 0 };
    const el = rootRef.current;
    const sl = el?.scrollLeft ?? 0;
    const st = el?.scrollTop ?? 0;
    carryRef.current = {
      id: photo.id,
      pickupWallX: e.clientX + sl,
      pickupWallY: e.clientY + st,
      originX: existing.x,
      originY: existing.y,
    };
    cursorRef.current = { x: e.clientX, y: e.clientY };
    setCarriedId(photo.id);
    bringToFront(photo.id);
  };

  // ─── Pointer handlers: hold-and-drag ───
  const onPointerDown = (
    e: ReactPointerEvent<HTMLDivElement>,
    photo: Photo,
  ) => {
    // Always clear any stale suppress flag from a previous gesture. If the
    // last drag ended over empty wall, no photo click fired to consume it.
    suppressNextClickRef.current = false;
    if (suppressClearTidRef.current != null) {
      window.clearTimeout(suppressClearTidRef.current);
      suppressClearTidRef.current = null;
    }
    // Don't engage drag while a photo is already in carry mode — let the
    // click handler resolve the drop.
    if (carryRef.current) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const existing = offsets[photo.id] ?? { x: 0, y: 0 };
    const el = rootRef.current;
    const sl = el?.scrollLeft ?? 0;
    const st = el?.scrollTop ?? 0;
    dragRef.current = {
      id: photo.id,
      pointerId: e.pointerId,
      startWallX: e.clientX + sl,
      startWallY: e.clientY + st,
      startClientX: e.clientX,
      startClientY: e.clientY,
      originX: existing.x,
      originY: existing.y,
      moved: false,
    };
    cursorRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    cursorRef.current = { x: e.clientX, y: e.clientY };
    const el = rootRef.current;
    const sl = el?.scrollLeft ?? 0;
    const st = el?.scrollTop ?? 0;
    // Wall-space delta (driven by both cursor and scroll changes).
    const dx = e.clientX + sl - drag.startWallX;
    const dy = e.clientY + st - drag.startWallY;
    // Viewport-space delta is the right metric for the click-vs-drag check —
    // scrolling alone shouldn't promote a tap into a drag.
    const vdx = e.clientX - drag.startClientX;
    const vdy = e.clientY - drag.startClientY;
    if (!drag.moved && Math.hypot(vdx, vdy) > CLICK_THRESHOLD_PX) {
      drag.moved = true;
      setDraggingId(drag.id);
      bringToFront(drag.id);
    }
    if (drag.moved) {
      const photo = PHOTOS.find((p) => p.id === drag.id)!;
      const next = clampOffset(
        photo,
        { x: drag.originX + dx, y: drag.originY + dy },
        wallRef.current,
      );
      setOffsets((prev) => ({ ...prev, [drag.id]: next }));
    }
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    if (drag.moved) {
      // Photo stays exactly where it was last positioned — no inertia, no slide.
      setDraggingId(null);
      suppressNextClickRef.current = true;
      // Safety net: if the synthetic click never fires on a photo (e.g. drag
      // ended over empty wall), make sure the flag doesn't stay stale and
      // eat the next legitimate tap.
      if (suppressClearTidRef.current != null) {
        window.clearTimeout(suppressClearTidRef.current);
      }
      suppressClearTidRef.current = window.setTimeout(() => {
        suppressNextClickRef.current = false;
        suppressClearTidRef.current = null;
      }, 120);
    }
    dragRef.current = null;
  };

  // ─── Edge-scroll: while a photo is active (dragging or carrying) and the
  // cursor is near a viewport edge, pan the wall in that direction. Bounded
  // automatically by overflow:auto so the user can never scroll past the wall.
  useEffect(() => {
    if (!draggingId && !carriedId) return;
    let rafId = 0;
    const tick = () => {
      const el = rootRef.current;
      if (!el) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const { x: cx, y: cy } = cursorRef.current;
      const rect = el.getBoundingClientRect();
      let scrollDx = 0;
      let scrollDy = 0;
      if (cx < rect.left + EDGE_THRESHOLD) {
        const t = Math.min(
          1,
          (rect.left + EDGE_THRESHOLD - cx) / EDGE_THRESHOLD,
        );
        scrollDx = -t * MAX_SCROLL_SPEED;
      } else if (cx > rect.right - EDGE_THRESHOLD) {
        const t = Math.min(
          1,
          (cx - (rect.right - EDGE_THRESHOLD)) / EDGE_THRESHOLD,
        );
        scrollDx = t * MAX_SCROLL_SPEED;
      }
      if (cy < rect.top + EDGE_THRESHOLD) {
        const t = Math.min(
          1,
          (rect.top + EDGE_THRESHOLD - cy) / EDGE_THRESHOLD,
        );
        scrollDy = -t * MAX_SCROLL_SPEED;
      } else if (cy > rect.bottom - EDGE_THRESHOLD) {
        const t = Math.min(
          1,
          (cy - (rect.bottom - EDGE_THRESHOLD)) / EDGE_THRESHOLD,
        );
        scrollDy = t * MAX_SCROLL_SPEED;
      }
      if (scrollDx !== 0 || scrollDy !== 0) {
        const prevSL = el.scrollLeft;
        const prevST = el.scrollTop;
        el.scrollLeft = prevSL + scrollDx;
        el.scrollTop = prevST + scrollDy;
        const actualDx = el.scrollLeft - prevSL;
        const actualDy = el.scrollTop - prevST;
        if (actualDx !== 0 || actualDy !== 0) {
          // Re-derive offset from wall-space cursor so the photo stays glued
          // to the cursor as the view pans beneath it.
          if (dragRef.current) {
            const drag = dragRef.current;
            const dx = cx + el.scrollLeft - drag.startWallX;
            const dy = cy + el.scrollTop - drag.startWallY;
            const photo = PHOTOS.find((p) => p.id === drag.id)!;
            const next = clampOffset(
              photo,
              { x: drag.originX + dx, y: drag.originY + dy },
              wallRef.current,
            );
            setOffsets((prev) => ({ ...prev, [drag.id]: next }));
          } else if (carryRef.current) {
            const carry = carryRef.current;
            const dx = cx + el.scrollLeft - carry.pickupWallX;
            const dy = cy + el.scrollTop - carry.pickupWallY;
            const photo = PHOTOS.find((p) => p.id === carry.id)!;
            const next = clampOffset(
              photo,
              { x: carry.originX + dx, y: carry.originY + dy },
              wallRef.current,
            );
            setOffsets((prev) => ({ ...prev, [carry.id]: next }));
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [draggingId, carriedId]);

  // ─── Document-level listeners while in carry mode ───
  useEffect(() => {
    if (!carriedId) return;
    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      applyCarryDelta(e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => {
      applyCarryDelta(e.clientX, e.clientY);
      carryRef.current = null;
      setCarriedId(null);
    };
    document.addEventListener("mousemove", onMove);
    // Defer one tick so the same click that initiated pickup doesn't drop it.
    const tid = window.setTimeout(() => {
      document.addEventListener("click", onClick);
    }, 0);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      window.clearTimeout(tid);
    };
  }, [carriedId, applyCarryDelta]);

  // Center the initial scroll exactly on the wall on first mount, before the
  // browser paints the hydrated DOM, so the user never sees the (0, 0) state.
  useIsoLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth, scrollHeight, clientHeight } = el;
    el.scrollLeft = Math.max(0, (scrollWidth - clientWidth) / 2);
    el.scrollTop = Math.max(0, (scrollHeight - clientHeight) / 2);
    setReady(true);
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <div
        ref={wallRef}
        className={`${styles.wall}${ready ? " " + styles.ready : ""}`}
      >
        {zOrder.map((id, idx) => {
          const photo = PHOTOS.find((p) => p.id === id)!;
          const offset = offsets[id] ?? { x: 0, y: 0 };
          const isActive = carriedId === id || draggingId === id;
          const style: CSSProperties = {
            transform: `translate3d(${photo.x + offset.x}px, ${photo.y + offset.y}px, 0) rotate(${photo.tilt}deg)`,
            width: photo.width,
            height: photo.width * photo.aspect,
            zIndex: isActive ? 200 : idx + 1,
            // No transition while active — the photo tracks the cursor exactly.
            transition: isActive ? "none" : undefined,
          };
          const classes = [styles.photo];
          if (isActive) classes.push(styles.dragging);
          return (
            <div
              key={id}
              className={classes.join(" ")}
              style={style}
              onClick={(e) => onPhotoClick(e, photo)}
              onPointerDown={(e) => onPointerDown(e, photo)}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              role="button"
              aria-label={`${photo.location} ${photo.year}`}
            >
              <span className={styles.tape} aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.image}
                src={photo.src}
                alt=""
                draggable={false}
              />
              <div className={styles.caption}>
                {photo.location} · {photo.year}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.hint}>Tap / drag pic to move</div>
    </div>
  );
}
