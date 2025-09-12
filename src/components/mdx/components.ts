// MDX Components Export
// This file exports custom components that can be used in MDX files
// Import this in your MDX files and export as `components` to override HTML elements

import Heading from './Heading.astro';
import Paragraph from './Paragraph.astro';
import Blockquote from './Blockquote.astro';
import Link from './Link.astro';

// Export components mapped to HTML elements
export const components = {
  // Headings
  h1: (props: any) => Heading({ level: 1, ...props }),
  h2: (props: any) => Heading({ level: 2, ...props }),
  h3: (props: any) => Heading({ level: 3, ...props }),
  h4: (props: any) => Heading({ level: 4, ...props }),
  h5: (props: any) => Heading({ level: 5, ...props }),
  h6: (props: any) => Heading({ level: 6, ...props }),
  
  // Text elements
  p: Paragraph,
  a: Link,
  blockquote: Blockquote,
};

// Export individual components for direct use
export {
  Heading,
  Paragraph,
  Blockquote,
  Link,
};