# rules.md — Image & Placeholder Rules

These are the rules I follow for images, placeholders, and layout.  
Do not overthink this. Build the page first. Replace assets later.

---

## 1. Main rule

Every image must have a fixed slot before the final image exists.

Do not place random images directly into the page and hope they fit.

Correct mindset:

```txt
slot first → placeholder → final image
````

Wrong mindset:

```txt
find perfect image → resize manually → fix layout around it
```

---

## 2. Never use broken image links

Do not leave this:

```html
<img src="future-image.webp" alt="...">
```

Broken image icons make the site look unfinished.

Use one of these instead:

```txt
placeholder box
temporary local placeholder image
simple gradient/card block
```

---

## 3. Image type rules

| Image type         |                        Ratio | Fit mode | Rule                    |
| ------------------ | ---------------------------: | -------- | ----------------------- |
| Mascot / character |                          1:1 | contain  | Never crop              |
| Logo / icon        |                          1:1 | contain  | SVG preferred           |
| Card thumbnail     |                   4:3 or 1:1 | cover    | Cropping is okay        |
| Hero background    |                  16:9 or 3:2 | cover    | Fill the section        |
| Screenshot         | real screenshot ratio / 16:9 | contain  | Never crop important UI |
| Decorative image   |            any planned ratio | cover    | It can crop             |

---

## 4. Privacy Gremlin image rules

For this project:

```txt
Gremlin mascot images:
- square
- transparent background
- WebP for website
- PNG backup if transparency looks bad
- object-contain
```

Recommended exports:

```txt
hero gremlin: 1024x1024
small gremlin states: 512x512
icons: SVG or 128x128
card thumbnails: 800x600
hero/banner scenes: 1280x720 or 1600x900
screenshots: 1200-1440px wide
```

---

## 5. object-cover vs object-contain

Use `object-contain` when the whole image must be visible.

Use it for:

```txt
mascots
logos
icons
screenshots
transparent character images
```

Use `object-cover` when the box shape matters more than showing the full image.

Use it for:

```txt
card thumbnails
hero backgrounds
banners
decorative photos
```

Simple rule:

```txt
Characters = contain
Photos/thumbnails = cover
Screenshots = contain
```

---

## 6. Placeholder rules

Use only 3 placeholder types at first:

```txt
mascot placeholder
thumbnail placeholder
screenshot placeholder
```

Do not make many placeholder assets.

A plain placeholder box is enough while building.

Placeholder priority:

```txt
1. simple box
2. aspect-ratio box
3. temporary local placeholder image
4. skeleton loader
5. blurred placeholder
```

For beginner/static sites, stop at 1 or 2.

---

## 7. Tailwind slot rules

Every important image wrapper should define:

```txt
width
aspect ratio or height
overflow behavior
background placeholder
border radius if needed
```

Every image should define:

```txt
width full
height full or auto
object-cover/object-contain
alt text
```

The slot controls the layout.
The image only fills the slot.

This avoids layout shift, which is the main reason to reserve image space early. 

---

## 8. Folder structure

Use this:

```txt
public/
  images/
    mascots/
    placeholders/
    screenshots/
    thumbnails/
    icons/
```

For Privacy Gremlin:

```txt
public/
  images/
    mascots/
      gremlin-hero.webp
      gremlin-happy.webp
      gremlin-warning.webp
      gremlin-sleepy.webp

    placeholders/
      mascot-placeholder.webp
      thumbnail-placeholder.webp
      screenshot-placeholder.webp

    screenshots/
      dashboard-placeholder.webp

    icons/
```

---

## 9. File naming rules

Use:

```txt
lowercase
hyphens
clear names
no spaces
no random final-final-v2 names
```

Good:

```txt
gremlin-hero.webp
gremlin-warning.webp
privacy-score-card.webp
dashboard-screenshot.webp
```

Bad:

```txt
IMG_2026.png
gremlin final new.png
image1.webp
cuteeee.png
```

---

## 10. Alt text rules

Meaningful image:

```txt
Describe what it shows.
```

Example:

```txt
Happy Privacy Gremlin holding a shield
```

Decorative image:

```txt
Use empty alt text.
```

Example:

```html
alt=""
```

Do not write useless alt text like:

```txt
image
picture
photo
graphic
```

---

## 11. Performance rules

Before final deploy:

```txt
convert large images to WebP
keep PNG only when needed
do not upload huge raw images
do not use 3000px images for tiny cards
delete unused assets
```

Good enough sizes:

```txt
small icon: 64-128px
small mascot: 512px
hero mascot: 1024px
card image: 800x600
large hero: 1280-1600px wide
```

Do not obsess over perfect compression during early building.

---

## 12. Build order

Follow this order every time:

```txt
1. Decide section layout
2. Add placeholder slot
3. Finish HTML structure
4. Finish responsive layout
5. Add temporary image if needed
6. Replace with final WebP/PNG
7. Check mobile
8. Compress before deploy
```

Never stop building because the image is not ready.

---

## 13. Decision rules

When confused, use these defaults:

```txt
Mascot? square + contain
Card thumbnail? 4:3 + cover
Hero banner? 16:9 + cover
Screenshot? 16:9 or real ratio + contain
Icon? SVG + square
Not sure? use square
```

---

## 14. Things I will not worry about yet

Do not worry about:

```txt
perfect image pipeline
complex skeleton loaders
blurred placeholders
responsive srcset
AVIF vs WebP debates
advanced CMS image handling
Figma-perfect crops
```

These can come later.

For now:

```txt
fixed slot
simple placeholder
WebP final
move on
```

---

## 15. Final rule

A finished page with simple placeholders is better than an unfinished page waiting for perfect images.

Ship the layout first.
Polish the images later.

```
