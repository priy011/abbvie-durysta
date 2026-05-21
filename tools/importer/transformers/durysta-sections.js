/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Durysta Savings Program section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for styled sections.
 * Processes sections from payload.template.sections in reverse order.
 * All selectors verified from migration-work/cleaned.html and page-templates.json.
 *
 * Sections (from page-templates.json):
 *   1. Hero - selector: .image-text-v2.parbase (style: null)
 *   2. Eligibility and Terms - selector: .abbv-row-container.durysta-main-content (style: null)
 *   3. Quick Links - selector: .columns.parbase:has(.durysta-quick-links) (style: "teal")
 *   4. Important Safety Information - selector: .abbv-inline-use-isi (style: null)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;
    const sections = payload && payload.template && payload.template.sections;

    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const reversedSections = [...sections].reverse();

    for (const section of reversedSections) {
      // Find the first element matching this section's selector
      let sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert section metadata after the section element
        if (sectionEl.nextSibling) {
          sectionEl.parentNode.insertBefore(sectionMetadataBlock, sectionEl.nextSibling);
        } else {
          sectionEl.parentNode.appendChild(sectionMetadataBlock);
        }
      }

      // Insert <hr> before non-first sections to create section breaks
      if (section.id !== sections[0].id) {
        const hr = doc.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}
