// MDX Auto-transform plugin
// This plugin automatically applies typography components to all MDX content

import { visit } from 'unist-util-visit';

export function mdxTypographyPlugin() {
  return function transformer(tree, file) {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      // Transform headings
      if (node.name && /^h[1-6]$/.test(node.name)) {
        const level = parseInt(node.name.slice(1));
        node.name = 'Heading';
        node.attributes = node.attributes || [];
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'level',
          value: level
        });
      }
      
      // Transform paragraphs
      if (node.name === 'p') {
        node.name = 'Paragraph';
      }
      
      // Transform blockquotes
      if (node.name === 'blockquote') {
        node.name = 'Blockquote';
      }
      
      // Transform links
      if (node.name === 'a') {
        node.name = 'Link';
      }
    });
    
    // Add imports at the top of the MDX file
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: `
        import Heading from '../../components/mdx/Heading.astro';
        import Paragraph from '../../components/mdx/Paragraph.astro';
        import Blockquote from '../../components/mdx/Blockquote.astro';
        import Link from '../../components/mdx/Link.astro';
      `,
      data: {
        estree: {
          type: 'Program',
          body: []
        }
      }
    });
  };
}