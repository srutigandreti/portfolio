import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import math
import os

BASE = r"c:\Users\sruti gandreti\Desktop\design portfolio"
FONT_PATH = os.path.join(BASE, "public", "fonts", "PPNeueMontreal-Regular.otf")

CARDS = [
    {
        "input":  os.path.join(BASE, "Mysa Card.png"),
        "output": os.path.join(BASE, "public", "images", "mysa-front.png"),
        "text":   "Built the face of an AI dating startup before anyone knew its name. 15K+ signups in month one.",
    },
    {
        "input":  os.path.join(BASE, "Starwood Card.png"),
        "output": os.path.join(BASE, "public", "images", "starwood-front.png"),
        "text":   "Turned a 90-minute legal document marathon into a validated, accountant-trusted AI workflow.",
    },
    {
        "input":  os.path.join(BASE, "Phia Card.png"),
        "output": os.path.join(BASE, "public", "images", "phia-front.png"),
        "text":   "Designed the social layer for shopping decisions. Selected from 500+ design submissions.",
    },
]


def detect_card(img_cv):
    """Return (angle_deg, corners[4][2]) of the largest rotated rect found."""
    gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
    # Threshold: postcard has a light cream border against a white/transparent bg
    _, thresh = cv2.threshold(gray, 245, 255, cv2.THRESH_BINARY_INV)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        h, w = img_cv.shape[:2]
        return 0.0, np.array([[0,0],[w,0],[w,h],[0,h]], dtype=np.float32)

    largest = max(contours, key=cv2.contourArea)
    rect = cv2.minAreaRect(largest)          # ((cx,cy),(w,h), angle)
    box  = cv2.boxPoints(rect)               # 4 corners as float32

    angle = rect[2]
    # cv2.minAreaRect returns angle in [-90, 0); normalise to a small tilt
    rw, rh = rect[1]
    if rw < rh:
        angle += 90   # portrait → rotate back

    print(f"  detected angle: {angle:.2f}°  rect size: {rw:.0f}x{rh:.0f}")
    return angle, box


def order_corners(box):
    """Return corners in order: top-left, top-right, bottom-right, bottom-left."""
    pts = box.astype(np.float32)
    s   = pts.sum(axis=1)
    diff = np.diff(pts, axis=1)
    tl = pts[np.argmin(s)]
    br = pts[np.argmax(s)]
    tr = pts[np.argmin(diff)]
    bl = pts[np.argmax(diff)]
    return tl, tr, br, bl


def make_text_image(text, font, max_width, color=(255,255,255,220)):
    """Render right-aligned wrapped text; return PIL RGBA image."""
    dummy_img  = Image.new("RGBA", (1, 1))
    dummy_draw = ImageDraw.Draw(dummy_img)

    # Wrap words to max_width
    words = text.split()
    lines, cur = [], []
    for w in words:
        cur.append(w)
        bb = dummy_draw.textbbox((0,0), " ".join(cur), font=font)
        if (bb[2]-bb[0]) > max_width and len(cur) > 1:
            cur.pop()
            lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))

    # Measure
    line_h = int(font.size * 1.35)
    text_h = len(lines) * line_h
    text_img  = Image.new("RGBA", (max_width, text_h), (0,0,0,0))
    text_draw = ImageDraw.Draw(text_img)

    for i, line in enumerate(lines):
        bb = text_draw.textbbox((0,0), line, font=font)
        lw = bb[2]-bb[0]
        x  = max_width - lw          # right-align
        y  = i * line_h
        text_draw.text((x, y), line, font=font, fill=color)

    return text_img


def add_text_to_card(cfg, display_width=580):
    path = cfg["input"]
    print(f"\n{'='*50}")
    print(f"Processing: {os.path.basename(path)}")

    # --- load with OpenCV for detection, PIL for compositing ---
    img_cv  = cv2.imread(path)
    img_pil = Image.open(path).convert("RGBA")
    W, H    = img_pil.size
    # scale font size to canvas resolution (designed for 13px at display_width)
    scale     = W / display_width
    font_size = max(12, round(13 * scale))
    print(f"  canvas: {W}x{H}  scale: {scale:.2f}x  font: {font_size}px")

    # --- detect card ---
    angle, box = detect_card(img_cv)
    tl, tr, br, bl = order_corners(box)

    # card edge vectors
    card_w = float(np.linalg.norm(tr - tl))
    card_h = float(np.linalg.norm(bl - tl))
    print(f"  card size (px): {card_w:.0f}x{card_h:.0f}")

    # --- font ---
    try:
        font = ImageFont.truetype(FONT_PATH, font_size)
        print(f"  font: PPNeueMontreal {font_size}px loaded")
    except Exception as e:
        print(f"  font fallback ({e})")
        font = ImageFont.truetype("arial.ttf", font_size)

    # --- build text image ---
    max_text_w = int(card_w * 0.42)
    text_img   = make_text_image(cfg["text"], font, max_text_w)
    tw, th     = text_img.size
    print(f"  text block: {tw}x{th}px  ({len(cfg['text'].split())} words)")

    # --- padding inside the card ---
    pad_x = int(card_w * 0.055)   # from the right edge of the card
    pad_y = int(card_h * 0.075)   # from the top edge of the card

    # Right edge unit vector along the top of the card (tl→tr)
    right_vec = (tr - tl) / card_w
    # Down edge unit vector along the left of the card (tl→bl)
    down_vec  = (bl - tl) / card_h

    # Anchor = top-right corner of text block
    # Start from tl, move right by (card_w - pad_x), move down by pad_y
    anchor = tl + right_vec * (card_w - pad_x) + down_vec * pad_y

    # Top-left of text block (text is right-aligned so block extends left from anchor)
    text_origin = anchor - right_vec * tw

    # --- rotate text to match card angle ---
    # Rotate text_img by the card angle around its top-right corner
    # PIL rotates CCW; card angle: + means CW so negate
    rotated_text = text_img.rotate(-angle, expand=True, resample=Image.BICUBIC)
    rtw, rth = rotated_text.size

    # After rotation the bounding box shifts; compute paste position
    # We rotate around the top-right of the original text_img
    rad = math.radians(-angle)
    cos_a, sin_a = math.cos(rad), math.sin(rad)

    # top-right of text_img in local coords = (tw, 0)
    # after rotation around (0,0): new pos of top-right
    new_tr_x = cos_a * tw - sin_a * 0
    new_tr_y = sin_a * tw + cos_a * 0
    # offset from anchor (in canvas coords) to paste origin of rotated image
    paste_x = int(anchor[0] - new_tr_x)
    paste_y = int(anchor[1] - new_tr_y)

    # --- composite ---
    layer = Image.new("RGBA", (W, H), (0,0,0,0))
    layer.paste(rotated_text, (paste_x, paste_y), rotated_text)
    result = Image.alpha_composite(img_pil, layer)

    out = result.convert("RGB") if cfg["output"].endswith(".jpg") else result
    out.save(cfg["output"])
    print(f"  saved: {cfg['output']}")

    # also save a preview copy next to the source for visual check
    preview = os.path.join(BASE, f"preview_{os.path.basename(cfg['output'])}")
    out.save(preview)
    print(f"  preview: {preview}")

    return result


if __name__ == "__main__":
    for cfg in CARDS:
        add_text_to_card(cfg)
    print("\n✓ All done")
