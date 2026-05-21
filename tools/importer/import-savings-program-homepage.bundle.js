/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-savings-program-homepage.js
  var import_savings_program_homepage_exports = {};
  __export(import_savings_program_homepage_exports, {
    default: () => import_savings_program_homepage_default
  });

  // tools/importer/parsers/hero-savings.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".abbv-image-content-container-v2 img, picture img, img");
    const textContainer = element.querySelector(".abbv-stretched-card-body, .abbv-image-text-display-v2, .abbv-image-text-content-v2");
    const heading = textContainer ? textContainer.querySelector('h1, h2[class*="title"], .hero-heading') : element.querySelector("h1");
    const subheading = textContainer ? textContainer.querySelector("h2, h3, p.subtitle, .hero-subheading") : element.querySelector("h2, h3");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentWrapper = document.createElement("div");
    if (heading) contentWrapper.append(heading);
    if (subheading && subheading !== heading) contentWrapper.append(subheading);
    const ctaLinks = Array.from(
      element.querySelectorAll(".abbv-stretched-card-body a, .abbv-image-text-display-v2 a, a.cta, a.button")
    );
    ctaLinks.forEach((link) => contentWrapper.append(link));
    if (contentWrapper.childNodes.length > 0) {
      cells.push([contentWrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-savings", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-links.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope .abbv-col");
    const cells = [];
    const row = [];
    columns.forEach((col) => {
      const richText = col.querySelector(".abbv-rich-text");
      const cellContent = [];
      if (richText) {
        const heading = richText.querySelector("h4");
        if (heading) cellContent.push(heading);
        const list = richText.querySelector("ul");
        if (list) cellContent.push(list);
      }
      row.push(cellContent);
    });
    cells.push(row);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-links", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/durysta-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".modal.parbase",
        ".safety-bar.parbase",
        ".newpar",
        ".par.iparys_inherited",
        ".abbv-dimmer",
        "input.abbv-social-copy",
        "iframe"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".header.parbase",
        ".footer.parbase",
        'img[src^="data:image/svg"]',
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/durysta-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        let sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadataBlock, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadataBlock);
          }
        }
        if (section.id !== sections[0].id) {
          const hr = doc.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-savings-program-homepage.js
  var parsers = {
    "hero-savings": parse,
    "columns-links": parse2
  };
  var PAGE_TEMPLATE = {
    name: "savings-program-homepage",
    description: "Durysta Savings Program homepage with program information, eligibility details, and enrollment steps",
    urls: ["https://www.durystasavingsprogram.com/"],
    blocks: [
      {
        name: "hero-savings",
        instances: [".durysta-hero"]
      },
      {
        name: "columns-links",
        instances: [".durysta-quick-links"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".image-text-v2.parbase",
        style: null,
        blocks: ["hero-savings"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Eligibility and Terms",
        selector: ".abbv-row-container.durysta-main-content",
        style: null,
        blocks: [],
        defaultContent: [".abbv-title h3", ".durysta-eligibility", ".durysta-terms"]
      },
      {
        id: "section-3",
        name: "Quick Links",
        selector: ".columns.parbase:has(.durysta-quick-links)",
        style: "teal",
        blocks: ["columns-links"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Important Safety Information",
        selector: ".abbv-inline-use-isi",
        style: null,
        blocks: [],
        defaultContent: ["#isi", ".bg-color__concreteGray"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_savings_program_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_savings_program_homepage_exports);
})();
