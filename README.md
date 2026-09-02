# KFC Breakfast Menu USA (independent informational site)

A static, informational website about KFC breakfast availability, hours, menu
categories, pricing, deals, and locations in the United States.

**This is not the official KFC website.** It is an independent project, not
affiliated with, endorsed by, or sponsored by KFC Corporation or Yum! Brands.
See `disclaimer.html` for the full legal notice.

## Why some pages don't list specific prices, calories, or deals

KFC does not run one standardized nationwide breakfast menu, price list, or
deals calendar in the U.S. — these vary by franchise, region, and channel, and
change over time. Rather than invent numbers, this site explains what's known,
flags what varies by location, and links to KFC's official sources for
real-time facts. Populate `menu/` and the relevant pages with verified data as
you obtain it (see "Where to update content" below).

## Tech stack

Plain HTML5, CSS3, and vanilla JavaScript. No build step, no frameworks.

## Run locally

Any static file server works. From this folder, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply open `index.html` directly in a browser (some browser security
settings may restrict `fetch`/local storage in file:// mode — a local server
is recommended).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repository.
3. Framework preset: choose **Other** (static site) — no build command or
   output directory changes are needed since this is plain HTML/CSS/JS.
4. Deploy. Vercel will serve `index.html` and every other page at its
   corresponding path (e.g. `/menu.html`).

## Where to replace `yourdomain.com`

The placeholder domain `https://yourdomain.com` appears in:

- `robots.txt` (Sitemap line)
- `sitemap.xml` (every `<loc>` entry)
- Every page's `<link rel="canonical">` tag
- Every page's Open Graph / Twitter meta tags (`og:url`, `og:image`, etc.)
- `logo.svg` / `favicon.svg` references use relative paths, so no change
  needed there

Once your real Vercel domain (or custom domain) is live, do a project-wide
find-and-replace of `yourdomain.com` with your actual domain in all `.html`,
`robots.txt`, and `sitemap.xml` files.

## Where menu data should be updated

- **`menu.html`** — the `data-menu-card` items in the HTML. Add verified
  prices/calories once confirmed, and update the `data-category` /
  `data-name` attributes used by the search and filter script in
  `script.js`.
- **`menu/`** — reserved for individual item pages (e.g.
  `menu/kfc-chicken-sandwich.html`) once you have verified nutrition,
  ingredients, and allergen data for that item. See `menu/README.md`.
- **`kfc-menu-prices.html`** — update the pricing-ranges table once you have
  location-specific or regionally averaged verified figures.
- **`kfc-deals.html`** — only add specific deals here once verified as
  currently active; remove them once expired.
- **`breakfast-hours.html`** — update if KFC changes its breakfast program
  structure nationally, or if you gather verified location-level data.

## Where images should be replaced

All images in `assets/images/` are original placeholder illustrations
(generated for this project, not KFC photography) so the project ships with
no broken images and no copyright risk. Replace them with your own licensed
photography or original illustrations before launch:

- `assets/images/hero-illustration.jpg` — homepage hero
- `assets/images/og-image.jpg` — social share preview (1200×630)
- `assets/images/food-*.jpg` — menu item placeholder images

Keep the same filenames (or update the `<img>` `src` attributes accordingly)
and preserve descriptive `alt` text for accessibility and SEO.

## Logo & favicon

`logo.svg` and `favicon.svg` are an original illustrated chef character
created for this project — not KFC's logo or the Colonel Sanders trademark
artwork. `favicon.ico` and `apple-touch-icon.png` are simplified raster
versions generated from the same design. If you'd like higher-fidelity raster
icons that exactly match `logo.svg`, regenerate them from the SVG with a tool
like Inkscape, `rsvg-convert`, or an online SVG-to-PNG/ICO converter:

```bash
rsvg-convert -w 180 -h 180 favicon.svg -o apple-touch-icon.png
rsvg-convert -w 32  -h 32  favicon.svg -o assets/icons/favicon-32.png
# then combine sizes into favicon.ico with ImageMagick:
convert assets/icons/favicon-16.png assets/icons/favicon-32.png favicon.ico
```

## How to update `sitemap.xml`

Add a new `<url>` block for every new indexable page:

```xml
<url>
  <loc>https://yourdomain.com/your-new-page.html</loc>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```

Keep the XML declaration as the very first line of the file with no leading
whitespace. Remove entries for any page you take down.

## How to update `robots.txt`

The default file allows all crawlers and points to the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

Only add `Disallow:` rules if you introduce private/internal pages that
shouldn't be indexed (e.g. a staging area). Never disallow `style.css` or
`script.js`.

## Project structure

```
index.html
menu.html
breakfast-hours.html
kfc-menu-prices.html
kfc-deals.html
locations.html
about.html
contact.html
privacy.html
disclaimer.html
style.css
script.js
robots.txt
sitemap.xml
favicon.svg
favicon.ico
apple-touch-icon.png
logo.svg
README.md
assets/
  images/
  icons/
menu/
  README.md   (placeholder for future verified item pages)
```

## Contact form note

`contact.html` includes a front-end-only form (see `script.js`). It does not
send email by default since this is a static site. Connect a form backend
(e.g. Formspree, a Vercel serverless function, or your own API) and update
the form's submit handler to actually deliver messages.
