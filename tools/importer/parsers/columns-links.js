/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-links
 * Base block: columns
 * Source: https://www.durystasavingsprogram.com/
 * Selector: .durysta-quick-links
 * Generated: 2026-05-21
 *
 * Two-column layout for navigation links. Each column contains
 * a heading (h4) and an unordered list of links.
 */
export default function parse(element, { document }) {
  // Select the two column containers
  const columns = element.querySelectorAll(':scope .abbv-col');

  const cells = [];
  const row = [];

  columns.forEach((col) => {
    // Each column's content lives inside .abbv-rich-text
    const richText = col.querySelector('.abbv-rich-text');
    const cellContent = [];

    if (richText) {
      // Extract heading (h4)
      const heading = richText.querySelector('h4');
      if (heading) cellContent.push(heading);

      // Extract links list (ul)
      const list = richText.querySelector('ul');
      if (list) cellContent.push(list);
    }

    row.push(cellContent);
  });

  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-links', cells });
  element.replaceWith(block);
}
