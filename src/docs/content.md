# Content Editing Guide

The project separates:
- **Content configuration** (texts, gallery items) under `src/content/`
- **Static media files** (images, video) under `public/assets/`

## Where to edit

- Life story text: `src/content/story.js`
- Candle section text/settings: `src/content/candle.js`
- Gallery items (images/videos): `src/content/gallery.js`
- Hero section: `src/content/hero.js`
- Footer: `src/content/footer.js`

## Story Section

The Story section displays:
- A title
- Multiple paragraphs
- A signature line
- A quote block
- Optional audio playback (play/pause toggle)

### Editing story text

Update `src/content/story.js`:
- `title`
- `paragraphs` array
- `signature`
- `quote` (text + author)

### Audio

Audio is embedded with an `<audio>` element.
The play button triggers `toggle()` from `useAudioPlayer`.

Media file location:
- Place audio under `public/assets/audio/`
- Reference via `STORY.audio.src` (path relative to `public/`)

Accessibility:
- The play button uses `aria-label` and `aria-pressed`
- The button references the audio element via `aria-controls`

## Where to place media

- Images: `public/assets/images/`
- Videos: `public/assets/video/`
- Audio: `public/assets/audio/`

## Gallery item schema

Each gallery item is a plain object in `src/content/gallery.js`.

### Image example

```js
{
  type: 'image',
  src: 'assets/images/gallery-01.jpg',
  alt: 'Short description for accessibility',
  ratio: '3 / 4', // portrait (use '4 / 3' for landscape)
  previewClass: 'focus-top', // optional: thumbnail focus
  modalClass: 'focus-top',   // optional: modal focus
}
```

### Video example

```js
{
  type: 'video',
  src: 'assets/video/gallery-01.mp4',
  poster: 'assets/images/video-tn.png',
  alt: 'Video description',
  ratio: '4 / 3',
  previewClass: 'focus-bottom', // optional
}
```

## Ratios

Ratios control the slide frame size (via CSS `aspect-ratio`).

Recommended:

* Portrait images: `ratio: '3 / 4'`
* Landscape images / video posters: `ratio: '4 / 3'`

## Focus classes

If an image looks "cropped" in the thumbnail, you can shift the visible area with focus classes:

* `focus-top`
* `focus-top-more`
* `focus-top-extra`
* `focus-bottom`
* `focus-left`
* `focus-right`
* `focus-top-left`
* `focus-top-right`

Use them via `previewClass` / `modalClass`.
