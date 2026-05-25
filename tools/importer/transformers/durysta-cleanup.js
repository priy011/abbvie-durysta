/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Durysta savings program site cleanup.
 * Removes non-authorable content (header, footer, modals, cookie consent, sticky ISI bar, empty divs).
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner (OneTrust) - found at #onetrust-consent-sdk in cleaned.html line 686
    // Remove modal dialogs - found at .modal.parbase in cleaned.html lines 303, 342, 381, 420, 459, 498
    // Remove dimmer overlay - found at .abbv-dimmer in cleaned.html line 297
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.modal.parbase',
      '.abbv-dimmer',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header - found at .header.parbase in cleaned.html line 9
    // Remove footer - found at .footer.parbase in cleaned.html line 243
    // Remove sticky ISI safety bar - found at .abbv-safety-bar in cleaned.html line 546
    // Remove empty placeholder divs - found at .newpar in cleaned.html lines 3, 63, 292, 539, 676
    // Remove inherited paragraph divs - found at .par.iparys_inherited in cleaned.html lines 5, 65, 294, 541, 677
    // Remove social copy input - found at .abbv-social-copy in cleaned.html line 682
    // Remove iframes and noscript elements
    WebImporter.DOMUtils.remove(element, [
      '.header.parbase',
      '.footer.parbase',
      '.abbv-safety-bar',
      '.newpar',
      '.par.iparys_inherited',
      '.abbv-social-copy',
      'iframe',
      'noscript',
      'link',
    ]);

    // Remove inline SVG data images (non-content decorative elements)
    const svgImages = element.querySelectorAll('img[src^="data:image/svg+xml"]');
    svgImages.forEach((img) => img.remove());
  }
}
