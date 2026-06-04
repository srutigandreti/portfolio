"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";
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
    year: 2026,
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
    year: 2025,
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
    year: 2025,
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
// Touch only: ms a finger must rest on a photo before drag engages.
// Without the hold, a finger movement on a photo is treated as a swipe (pan).
const HOLD_MS = 220;

// Clamp a photo's offset so the resulting wall-space position keeps the
// photo (including the corners produced by its tilt) fully inside the wall.
// `scale` accounts for the responsive sizing — photos render at a smaller
// size on mobile and should be allowed to travel further before hitting the
// wall edge.
function clampOffset(
  photo: Photo,
  raw: Offset,
  wallEl: HTMLElement | null,
  scale = 1,
): Offset {
  const wallW = wallEl?.offsetWidth ?? 2800;
  const wallH = wallEl?.offsetHeight ?? 2000;
  const photoW = photo.width * scale;
  const photoH = photoW * photo.aspect;
  // A rotated rectangle's bounding box is larger than the unrotated one.
  // Reserve enough margin so the rotated corners don't poke past the wall.
  const tiltRad = (Math.abs(photo.tilt) * Math.PI) / 180;
  const tiltBuffer = Math.ceil(
    (Math.max(photoW, photoH) / 2) * Math.sin(tiltRad),
  );
  const minX = -photo.x + tiltBuffer;
  const maxX = wallW - photo.x - photoW - tiltBuffer;
  const minY = -photo.y + tiltBuffer;
  const maxY = wallH - photo.y - photoH - tiltBuffer;
  return {
    x: Math.max(minX, Math.min(maxX, raw.x)),
    y: Math.max(minY, Math.min(maxY, raw.y)),
  };
}

export default function Playground() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wallRef = useRef<HTMLDivElement | null>(null);
  const [offsets, setOffsets] = useState<Record<string, Offset>>({});
  const [zOrder, setZOrder] = useState<string[]>(() => PHOTOS.map((p) => p.id));
  const [carriedId, setCarriedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  // Touch-only: which photo has been tapped (caption visible). Cleared when
  // a drag starts or the user pans the wall.
  const [tappedId, setTappedId] = useState<string | null>(null);
  // Desktop carry-mode: after dropping a photo, the cursor is over the photo
  // and :hover would slide the caption out. Suppress the caption for this
  // photo briefly so the drop feels clean.
  const [justDroppedId, setJustDroppedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  // Touch devices can't track an "in-flight" photo (no hover after a tap),
  // so carry mode is disabled there. Photos shrink on small viewports too.
  const [isTouch, setIsTouch] = useState(false);
  const [photoScale, setPhotoScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setIsTouch(window.matchMedia("(hover: none)").matches);
      setPhotoScale(window.innerWidth < 560 ? 0.6 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // Mirror of photoScale that's always current — used inside callbacks and
  // useEffect closures that can't depend on photoScale without churn.
  const photoScaleRef = useRef(1);
  useEffect(() => {
    photoScaleRef.current = photoScale;
  }, [photoScale]);
  const carryRef = useRef<CarryState | null>(null);
  const dragRef = useRef<(DragState & { snapped?: boolean }) | null>(null);
  // Touch-only "pending" gesture — finger is down on a photo, but we don't
  // yet know if the user wants to drag it (long-press) or pan the wall
  // (swipe). HOLD_MS of stillness promotes to drag; movement before that
  // switches to pan.
  const holdRef = useRef<{
    pointerId: number;
    photoId: string;
    startClientX: number;
    startClientY: number;
    timer: number;
  } | null>(null);
  // Latest cursor viewport position, sampled in the move handlers. Read by
  // the edge-scroll rAF loop so panning continues even when the cursor stops.
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
      photoScaleRef.current,
    );
    setOffsets((prev) => ({ ...prev, [carry.id]: next }));
  }, []);

  // ─── Click handler: tap to pickup, tap to drop (carry mode).
  // Mouse only — touch devices use direct drag instead (a finger can't hover,
  // so the "pickup then move freely" model has no equivalent on touch).
  const onPhotoClick = (e: React.MouseEvent<HTMLDivElement>, photo: Photo) => {
    e.stopPropagation();
    // Touch: tap handled in onRootPointerUp (which fires before this synthetic
    // click). Returning early prevents a double-toggle of the caption.
    if (isTouch) return;
    // Drop if already carrying
    if (carryRef.current) {
      applyCarryDelta(e.clientX, e.clientY);
      const droppedId = carryRef.current.id;
      carryRef.current = null;
      setCarriedId(null);
      // Suppress the caption that would otherwise slide out via :hover
      // because the cursor lands on the just-dropped photo.
      setJustDroppedId(droppedId);
      window.setTimeout(() => {
        setJustDroppedId((prev) => (prev === droppedId ? null : prev));
      }, 1200);
      return;
    }
    // Pickup
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

  // ─── Pan-drag on empty wall area ───
  // Press anywhere that's NOT a photo and drag — the wall scrolls. With
  // overflow:hidden on the root and touch-action:none, native scroll is off,
  // so this is the only way to pan around the wall.
  const panRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startScrollLeft: number;
    startScrollTop: number;
  } | null>(null);

  const onRootPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Already carrying a photo (desktop)? Skip everything so the next click
    // drops the photo cleanly.
    if (carryRef.current) return;
    const el = rootRef.current;
    if (!el) return;
    const target = e.target as HTMLElement;
    const photoEl = target.closest(`[data-photo-id]`) as HTMLElement | null;
    const photoId = photoEl?.dataset.photoId ?? null;

    // Tap anywhere clears any touch-tapped caption.
    setTappedId(null);

    if (photoId && isTouch) {
      // Pending: wait HOLD_MS for the finger to settle. If it does, engage
      // drag mode; if the finger moves first, switch to pan; if released
      // first, treat as a tap (caption toggle).
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      const timer = window.setTimeout(() => {
        const hold = holdRef.current;
        if (!hold) return;
        const photo = PHOTOS.find((p) => p.id === hold.photoId);
        if (!photo) return;
        const existing = offsets[photo.id] ?? { x: 0, y: 0 };
        const elNow = rootRef.current;
        const sl = elNow?.scrollLeft ?? 0;
        const st = elNow?.scrollTop ?? 0;
        dragRef.current = {
          id: photo.id,
          pointerId: hold.pointerId,
          startClientX: hold.startClientX,
          startClientY: hold.startClientY,
          startWallX: hold.startClientX + sl,
          startWallY: hold.startClientY + st,
          originX: existing.x,
          originY: existing.y,
          moved: true,
          snapped: false,
        };
        cursorRef.current = {
          x: hold.startClientX,
          y: hold.startClientY,
        };
        setDraggingId(photo.id);
        bringToFront(photo.id);
        holdRef.current = null;
      }, HOLD_MS);

      holdRef.current = {
        pointerId: e.pointerId,
        photoId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        timer,
      };
      return;
    }

    if (photoId && !isTouch) {
      // Desktop touching down on a photo — carry-mode handles it via onClick.
      return;
    }

    // Empty wall: pan immediately.
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    panRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startScrollLeft: el.scrollLeft,
      startScrollTop: el.scrollTop,
    };
  };

  const onRootPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;

    // Pending hold — if finger moves before HOLD_MS elapses, cancel the
    // drag and convert to a pan (swipe gesture).
    const hold = holdRef.current;
    if (hold && hold.pointerId === e.pointerId) {
      const dx = e.clientX - hold.startClientX;
      const dy = e.clientY - hold.startClientY;
      if (Math.hypot(dx, dy) > CLICK_THRESHOLD_PX) {
        window.clearTimeout(hold.timer);
        holdRef.current = null;
        panRef.current = {
          pointerId: e.pointerId,
          startClientX: hold.startClientX,
          startClientY: hold.startClientY,
          startScrollLeft: el.scrollLeft,
          startScrollTop: el.scrollTop,
        };
        el.scrollLeft = panRef.current.startScrollLeft - dx;
        el.scrollTop = panRef.current.startScrollTop - dy;
      }
      return;
    }

    // Drag in progress (touch-only, set by hold-timer).
    const drag = dragRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      const sl = el.scrollLeft;
      const st = el.scrollTop;
      const photo = PHOTOS.find((p) => p.id === drag.id);
      if (!photo) return;
      // First move after activation: snap photo center to finger so it's
      // fully "in focus" — same UX as before, just relocated.
      if (!drag.snapped) {
        const scale = photoScaleRef.current;
        const photoW = photo.width * scale;
        const photoH = photoW * photo.aspect;
        const snapped = clampOffset(
          photo,
          {
            x: e.clientX + sl - photo.x - photoW / 2,
            y: e.clientY + st - photo.y - photoH / 2,
          },
          wallRef.current,
          scale,
        );
        setOffsets((prev) => ({ ...prev, [drag.id]: snapped }));
        drag.originX = snapped.x;
        drag.originY = snapped.y;
        drag.startWallX = e.clientX + sl;
        drag.startWallY = e.clientY + st;
        drag.snapped = true;
        return;
      }
      const dx = e.clientX + sl - drag.startWallX;
      const dy = e.clientY + st - drag.startWallY;
      const next = clampOffset(
        photo,
        { x: drag.originX + dx, y: drag.originY + dy },
        wallRef.current,
        photoScaleRef.current,
      );
      setOffsets((prev) => ({ ...prev, [drag.id]: next }));
      return;
    }

    // Pan in progress.
    const pan = panRef.current;
    if (pan && pan.pointerId === e.pointerId) {
      const dx = e.clientX - pan.startClientX;
      const dy = e.clientY - pan.startClientY;
      el.scrollLeft = pan.startScrollLeft - dx;
      el.scrollTop = pan.startScrollTop - dy;
    }
  };

  const onRootPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;

    // Pending hold released without movement = tap → toggle caption.
    const hold = holdRef.current;
    if (hold && hold.pointerId === e.pointerId) {
      window.clearTimeout(hold.timer);
      try {
        el?.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      const tappedPhotoId = hold.photoId;
      holdRef.current = null;
      setTappedId((prev) => (prev === tappedPhotoId ? null : tappedPhotoId));
      bringToFront(tappedPhotoId);
      return;
    }

    // Drag ends: photo stays where it is.
    const drag = dragRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      try {
        el?.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      dragRef.current = null;
      setDraggingId(null);
      return;
    }

    // Pan ends.
    const pan = panRef.current;
    if (pan && pan.pointerId === e.pointerId) {
      try {
        el?.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      panRef.current = null;
    }
  };

  // ─── Pointer handlers: hold-and-drag ───
  // ─── Edge-scroll: while a photo is active (dragging or carrying) and the
  // cursor is near a viewport edge, pan the wall in that direction. Bounded
  // automatically by overflow:auto so the user can never scroll past the wall.
  useEffect(() => {
    if (!draggingId && !carriedId) return;
    let rafId = 0;
    const tick = () => {
      // Bail out the moment the drag/carry refs are cleared. State updates
      // (setDraggingId(null) etc.) don't reach the dep array until the next
      // render, so without this guard the rAF loop keeps panning the wall
      // for several frames after pointerup — feeling like the pic "keeps
      // moving" after the user lets go (especially on touch, where the
      // finger releases right at a viewport edge).
      if (!dragRef.current && !carryRef.current) return;
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
              photoScaleRef.current,
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
              photoScaleRef.current,
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

  // ESC key exits back to the playground landing page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if ("startViewTransition" in document) {
        (
          document as Document & {
            startViewTransition: (cb: () => void) => void;
          }
        ).startViewTransition(() => router.push("/playground"));
      } else {
        router.push("/playground");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router]);

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
    <div
      ref={rootRef}
      className={styles.root}
      onPointerDown={onRootPointerDown}
      onPointerMove={onRootPointerMove}
      onPointerUp={onRootPointerUp}
      onPointerCancel={onRootPointerUp}
    >
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
            width: photo.width * photoScale,
            height: photo.width * photo.aspect * photoScale,
            zIndex: isActive ? 200 : idx + 1,
            // No transition while active — the photo tracks the cursor exactly.
            transition: isActive ? "none" : undefined,
          };
          const classes = [styles.photo];
          if (isActive) classes.push(styles.dragging);
          if (tappedId === id) classes.push(styles.tapped);
          if (justDroppedId === id) classes.push(styles.justDropped);
          return (
            <div
              key={id}
              data-photo-id={id}
              className={classes.join(" ")}
              style={style}
              onClick={(e) => onPhotoClick(e, photo)}
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
      <div className={styles.hint}>
        {isTouch
          ? "Hold + Drag photos to move them • Swipe to pan"
          : "Click photos to move them • Drag to pan"}
        {!isTouch && (
          <>
            {" • "}
            <kbd
              style={{
                display: "inline-block",
                fontFamily: "inherit",
                fontSize: "0.6rem",
                lineHeight: 1,
                padding: "2px 5px",
                border: "1px solid currentColor",
                borderRadius: "4px",
                boxShadow: "0 2px 0 currentColor",
                marginRight: "2px",
                verticalAlign: "middle",
              }}
            >
              ESC
            </kbd>{" "}
            to exit
          </>
        )}
      </div>
    </div>
  );
}
