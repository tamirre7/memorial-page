# Gallery (Carousel + Modal)

## Overview

The gallery uses:
- Embla carousel for swipe/drag + navigation
- Autoplay plugin for automatic slide movement
- A modal for full-screen viewing (image/video) with keyboard navigation

## Key files

- Component: `src/components/Gallery/Gallery.jsx`
- Styles: `src/components/Gallery/Gallery.css`
- Modal component: `src/components/Gallery/GalleryModal/GalleryModal.jsx`
- Modal styles: `src/components/Gallery/GalleryModal/GalleryModal.css`
- Modal state hook: `src/hooks/useGalleryModal.js`
- Content: `src/content/gallery.js`

## How per-item aspect ratio works

Each gallery item can provide:
- `ratio: '3 / 4'` or `ratio: '4 / 3'`

In `Gallery.jsx`, the slide frame is set like:

```js
style={item.ratio ? { aspectRatio: item.ratio } : undefined}
```

The CSS typically provides a default aspect ratio, and items override it via inline style.

## Modal keyboard controls

When the modal is open:

* `Escape` closes the modal
* `ArrowLeft` navigates to the previous item
* `ArrowRight` navigates to the next item

These are implemented in `useGalleryModal`.

## Image fitting policy

This project uses `object-fit: contain` for thumbnails to minimize cropping.
That means some images may show "empty space" depending on the ratio mismatch.
If you prefer "no empty space", use `object-fit: cover`, but that crops.

Recommended pattern (if you ever switch):

* Thumbnails: `cover`
* Modal: `contain`

## Autoplay notes

Common behavior:

* Autoplay runs while browsing the gallery
* Autoplay should stop when opening the modal
* Autoplay can resume when closing the modal

If you change autoplay behavior, keep it consistent with user expectations:
manual navigation should not feel "fighting" with autoplay.
