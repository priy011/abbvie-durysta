/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-quicklinks
 * Base block: columns
 * Source selector: .durysta-quick-links
 * Structure: Two-column quick links with headings and link lists
 * Generated: 2026-05-25
 */
export default function parse(element, { document }) {
  // Extract the two column containers
  const columns = element.querySelectorAll(':scope .abbv-col');

  // Build content for each column
  const cellsRow = [];

  columns.forEach((col) => {
    const richText = col.querySelector('.abbv-rich-text');
    if (!richText) return;

    const columnContent = [];

    // Extract heading (h4 in source, preserve as-is)
    const heading = richText.querySelector('h4, h3, h2');
    if (heading) {
      columnContent.push(heading);
    }

    // Extract the list of links (ul with li > a)
    const linkList = richText.querySelector('ul');
    if (linkList) {
      columnContent.push(linkList);
    }

    cellsRow.push(columnContent);
  });

  // Build cells array matching the Columns block structure:
  // Single row with one cell per column
  const cells = [cellsRow];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-quicklinks', cells });
  element.replaceWith(block);
}
