# Gallery Directory

This directory contains the wedding photos that will be displayed on the `/the-day` page.

## Adding Photos

1. Add your wedding photos to this directory
2. Name them consistently (e.g., `wedding-001.jpg`, `wedding-002.jpg`, etc.)
3. Update the `loadGalleryImages()` function in `/src/components/PhotoGallery.astro` to include the new filenames
4. Supported formats: JPG, PNG

## Current Photos

- `wedding-001.jpg` - Sample photo 1
- `wedding-002.jpg` - Sample photo 2  
- `wedding-003.jpg` - Sample photo 3

## Layout

The photos are displayed in a responsive masonry layout:
- 4 columns on desktop
- 3 columns on tablet
- 2 columns on mobile
- 1 column on small mobile

## Interaction

- Click any photo to view it in fullscreen
- Click the X or outside the image to close
- Press Escape key to close
- Smooth GSAP animations for all interactions