# Gallery Directory

This directory contains the wedding photos that will be displayed on the `/the-day` page.

## Adding Photos

1. **Simply add your wedding photos to this directory** - that's it!
2. Supported formats: JPG, JPEG, PNG (case insensitive)
3. Photos are automatically detected and loaded at build time
4. Images are sorted alphabetically by filename
5. No code changes needed - just drop files here and rebuild

## Automatic Detection & Optimization

The gallery component automatically:
- ✅ Scans this folder during build
- ✅ Filters for image files (.jpg, .jpeg, .png)
- ✅ Sorts them alphabetically
- ✅ Generates optimized gallery HTML
- ✅ Uses Cloudflare image optimization (WebP format, 800px width, 85% quality)
- ✅ Sets up click handlers for fullscreen view
- ✅ Provides lazy loading for better performance

## Image Optimization
When deployed to Cloudflare, images are automatically:
- 🔄 Converted to WebP format for smaller file sizes
- 📏 Resized to 800px width for optimal gallery display  
- 🎯 Compressed to 85% quality for best size/quality balance
- ⚡ Served from Cloudflare's global CDN

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