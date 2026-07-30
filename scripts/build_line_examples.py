from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

OUT = "DC_PUBLISHING_LINE_LABEL_EXAMPLES.pdf"
PT = 72
PAGE_W, PAGE_H = landscape(letter)
LABEL_W, LABEL_H = 3.5 * PT, .675 * PT

EXAMPLES = [
    ("Vertigo", "SANDMAN", "The Sandman"),
    ("Black Label", "BATMAN BLACK LABEL LINE", "Batman: Damned"),
    ("Young Animal", "DOOM PATROL", "Doom Patrol"),
    ("Sandman Universe", "SANDMAN", "House of Whispers"),
    ("Milestone", "STATIC", "Static: Season One"),
    ("WildStorm", "THE AUTHORITY", "The Authority"),
    ("Elseworlds", "ELSEWORLDS / ALTERNATE UNIVERSE", "Kingdom Come"),
    ("Hill House Comics", "DC UNIVERSE", "Basketful of Heads"),
    ("Wonder Comics", "WONDER TWINS", "Wonder Twins"),
    ("America's Best Comics", "AMERICA'S BEST COMICS (ALAN MOORE LINE)", "Promethea"),
    ("All-Star", "SUPERMAN", "All-Star Superman"),
    ("Impact", "IMPACT COMICS IMPRINT", "The Shield"),
    ("Hanna-Barbera Beyond", "DC UNIVERSE", "Exit Stage Left: The Snagglepuss Chronicles"),
    ("DC Horror", "DC UNIVERSE", "DC Horror Presents"),
]

pdfmetrics.registerFont(TTFont("LabelRegular", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("LabelBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


def fitted_size(text, font, maximum, start=16.5, minimum=7):
    size = start
    while size > minimum and stringWidth(text, font, size) > maximum:
        size -= .5
    return size


def label(c, x, y, marker, parent, title):
    c.setFillColor(HexColor("#FFFFFF"))
    c.rect(x, y, LABEL_W, LABEL_H, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#999999"))
    c.setDash(2, 2)
    c.setLineWidth(.5)
    c.rect(x, y, LABEL_W, LABEL_H, fill=0, stroke=1)
    c.setDash()
    c.setStrokeColor(HexColor("#D0D0D0"))
    c.setLineWidth(.35)
    c.line(x + .1 * PT, y + .045 * PT, x + LABEL_W - .1 * PT, y + .045 * PT)
    c.line(x + .1 * PT, y + LABEL_H - .045 * PT, x + LABEL_W - .1 * PT, y + LABEL_H - .045 * PT)

    c.setFillColor(HexColor("#6D7176"))
    c.setFont("LabelBold", 6.4)
    c.drawCentredString(x + LABEL_W / 2, y + LABEL_H - 10.5, parent)

    size = fitted_size(title, "LabelBold", LABEL_W - 18)
    c.setFillColor(HexColor("#111111"))
    c.setFont("LabelBold", size)
    c.drawCentredString(x + LABEL_W / 2, y + 16, title)

    c.setFillColor(HexColor("#747980"))
    c.setFont("LabelBold", 5)
    c.drawRightString(x + LABEL_W - .1 * PT, y + .065 * PT, marker.upper())


def main():
    c = canvas.Canvas(OUT, pagesize=(PAGE_W, PAGE_H))
    c.setTitle("2NC DC Publishing Line Label Examples")
    c.setFillColor(HexColor("#F2F3F5"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(HexColor("#111111"))
    c.setFont("LabelBold", 21)
    c.drawString(.45 * PT, PAGE_H - .55 * PT, "DC Publishing Line & Imprint Label Examples")
    c.setFillColor(HexColor("#666666"))
    c.setFont("LabelRegular", 9)
    c.drawString(.45 * PT, PAGE_H - .76 * PT, "Actual label size: 3.50 × 0.675 inches. Imprint markers take priority over era markers.")

    left = .45 * PT
    right = 4.3 * PT
    top = PAGE_H - 1.16 * PT
    row_step = .91 * PT
    for index, (marker, parent, title) in enumerate(EXAMPLES):
        column = 0 if index < 7 else 1
        row = index if index < 7 else index - 7
        x = left if column == 0 else right
        label_y = top - row * row_step - LABEL_H
        c.setFillColor(HexColor("#73777D"))
        c.setFont("LabelBold", 7)
        c.drawString(x, label_y + LABEL_H + 5, marker.upper())
        label(c, x, label_y, marker, parent, title)

    c.save()


if __name__ == "__main__":
    main()
