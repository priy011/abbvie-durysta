/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-savings
 * Base block: hero
 * Source: https://www.durystasavingsprogram.com/
 * Selector: .durysta-hero
 * Generated: 2026-05-21
 *
 * Structure (from block library):
 *   Row 1: Background image
 *   Row 2: Heading content (h1, optional h2/subheading)
 */
export default function parse(element, { document }) {
  // Extract background image from the image container
  const bgImage = element.querySelector('.abbv-image-content-container-v2 img, picture img, img');

  // Extract heading content from the text container
  const textContainer = element.querySelector('.abbv-stretched-card-body, .abbv-image-text-display-v2, .abbv-image-text-content-v2');

  const heading = textContainer
    ? textContainer.querySelector('h1, h2[class*="title"], .hero-heading')
    : element.querySelector('h1');

  const subheading = textContainer
    ? textContainer.querySelector('h2, h3, p.subtitle, .hero-subheading')
    : element.querySelector('h2, h3');

  // Build cells array matching block library structure
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Heading content (h1 + optional subheading + optional CTA) in a single cell
  const contentWrapper = document.createElement('div');
  if (heading) contentWrapper.append(heading);
  if (subheading && subheading !== heading) contentWrapper.append(subheading);

  // Optional CTA links
  const ctaLinks = Array.from(
    element.querySelectorAll('.abbv-stretched-card-body a, .abbv-image-text-display-v2 a, a.cta, a.button')
  );
  ctaLinks.forEach((link) => contentWrapper.append(link));

  if (contentWrapper.childNodes.length > 0) {
    cells.push([contentWrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-savings', cells });
  element.replaceWith(block);
}
