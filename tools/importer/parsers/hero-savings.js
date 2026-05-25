/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-savings
 * Base block: hero
 * Source selector: .durysta-hero
 * Generated: 2026-05-25
 *
 * Extracts background image, h1 heading, and h2 subheading from the Durysta
 * savings program hero banner. Produces a 3-row Hero block table:
 *   Row 1: background image
 *   Row 2: heading (h1)
 *   Row 3: subheading (h2)
 */
export default function parse(element, { document }) {
  // Extract background image from picture element
  const picture = element.querySelector('.abbv-image-content-container-v2 picture');
  const bgImage = picture || element.querySelector('picture, img');

  // Extract heading (h1) from the stretched card body
  const heading = element.querySelector('.abbv-stretched-card-body h1, .abbv-image-text-display-v2 h1, h1');

  // Extract subheading (h2) from the stretched card body
  const subheading = element.querySelector('.abbv-stretched-card-body h2, .abbv-image-text-display-v2 h2, h2');

  // Build cells array matching library example structure:
  // Row 1: background image
  // Row 2: heading
  // Row 3: subheading/description
  const cells = [];

  if (bgImage) {
    cells.push([bgImage]);
  }

  if (heading) {
    cells.push([heading]);
  }

  if (subheading) {
    cells.push([subheading]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-savings', cells });
  element.replaceWith(block);
}
