# Memorial Website

An interactive memorial website featuring a photo gallery, life story, and virtual candle lighting.

## Content Management

### Adding Images to Gallery

1. Upload image to `public/assets/images/`
2. Update `src/content/gallery.js`:

```javascript
{
  type: 'image',
  src: 'assets/images/image-name.jpg',
  alt: 'Image description',
  ratio: '3 / 4',  // or '4 / 3' for landscape images
}
```

### Updating Texts

- **Life Story**: `src/content/story.js`
- **Candle Section**: `src/content/candle.js`
- **Gallery**: `src/content/gallery.js`

### Adding Video

1. Upload video to `public/assets/video/`
2. Upload poster image to `public/assets/images/`
3. Update `gallery.js`:

```javascript
{
  type: 'video',
  src: 'assets/video/video-name.mp4',
  poster: 'assets/images/poster-image.png',
  alt: 'Video description',
  ratio: '4 / 3',
}
```

## Project Structure

```
src/
├── components/     # React components
│   ├── Candle/     # Candle lighting
│   ├── Gallery/   # Photo gallery
│   ├── Story/     # Life story
│   └── ...
├── content/       # Content files (texts, paths)
├── hooks/         # Custom hooks
└── firebase.js    # Firebase configuration
```

## Firebase

The website uses Firebase Realtime Database for the candle counter. Ensure you have `src/firebase.js` configured with your connection details.

## License

Private project - In memory of my friend Ben.
