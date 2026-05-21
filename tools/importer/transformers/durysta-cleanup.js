/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Durysta Savings Program site-wide cleanup.
 * Removes non-authorable content (header, footer, modals, cookie banner, safety bar, etc.)
 * All selectors verified from migration-work/cleaned.html
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner (OneTrust) - found as #onetrust-consent-sdk in captured DOM
    // Modals - found as .modal.parbase containers with .abbv-modal dialogs
    // Safety bar (sticky ISI) - found as .safety-bar.parbase in captured DOM
    // Empty placeholder divs - found as .newpar.new.section and .par.iparys_inherited
    // Dimmer overlay - found as .abbv-dimmer in captured DOM
    // Social copy input - found as input.abbv-social-copy in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.modal.parbase',
      '.safety-bar.parbase',
      '.newpar',
      '.par.iparys_inherited',
      '.abbv-dimmer',
      'input.abbv-social-copy',
      'iframe',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Header - found as .header.parbase > header.abbv-header in captured DOM
    // Footer - found as .footer.parbase > footer.abbv-footer in captured DOM
    // SVG data URI images (non-content decorative) - found as img[src^="data:image/svg"]
    // Link and noscript elements
    WebImporter.DOMUtils.remove(element, [
      '.header.parbase',
      '.footer.parbase',
      'img[src^="data:image/svg"]',
      'link',
      'noscript',
    ]);
  }
}
