/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Durysta savings program section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for sections with styles.
 * Sections from page-templates.json:
 *   1. Hero - selector: .image-text-v2.parbase (no style)
 *   2. Main Content - selector: .durysta-main-content (no style)
 *   3. Quick Links - selector: .durysta-quick-links (style: "teal")
 *   4. ISI - selector: .abbv-inline-safety (no style)
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block after the section element if it has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: [['style', section.style]],
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before each section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
