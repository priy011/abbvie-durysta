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

  // tools/importer/import-savings-program-landing.js
  var import_savings_program_landing_exports = {};
  __export(import_savings_program_landing_exports, {
    default: () => import_savings_program_landing_default
  });

  // tools/importer/parsers/hero-savings.js
  function parse(element, { document }) {
    const picture = element.querySelector(".abbv-image-content-container-v2 picture");
    const bgImage = picture || element.querySelector("picture, img");
    const heading = element.querySelector(".abbv-stretched-card-body h1, .abbv-image-text-display-v2 h1, h1");
    const subheading = element.querySelector(".abbv-stretched-card-body h2, .abbv-image-text-display-v2 h2, h2");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-savings", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-quicklinks.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope .abbv-col");
    const cellsRow = [];
    columns.forEach((col) => {
      const richText = col.querySelector(".abbv-rich-text");
      if (!richText) return;
      const columnContent = [];
      const heading = richText.querySelector("h4, h3, h2");
      if (heading) {
        columnContent.push(heading);
      }
      const linkList = richText.querySelector("ul");
      if (linkList) {
        columnContent.push(linkList);
      }
      cellsRow.push(columnContent);
    });
    const cells = [cellsRow];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-quicklinks", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/durysta-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".modal.parbase",
        ".abbv-dimmer"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".header.parbase",
        ".footer.parbase",
        ".abbv-safety-bar",
        ".newpar",
        ".par.iparys_inherited",
        ".abbv-social-copy",
        "iframe",
        "noscript",
        "link"
      ]);
      const svgImages = element.querySelectorAll('img[src^="data:image/svg+xml"]');
      svgImages.forEach((img) => img.remove());
    }
  }

  // tools/importer/transformers/durysta-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: [["style", section.style]]
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-savings-program-landing.js
  var parsers = {
    "hero-savings": parse,
    "columns-quicklinks": parse2
  };
  var PAGE_TEMPLATE = {
    name: "savings-program-landing",
    description: "Durysta savings program landing page with eligibility information, savings card details, and enrollment steps",
    urls: [
      "https://www.durystasavingsprogram.com/"
    ],
    blocks: [
      {
        name: "hero-savings",
        instances: [".durysta-hero"]
      },
      {
        name: "columns-quicklinks",
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
        name: "Main Content - Eligibility and Terms",
        selector: ".durysta-main-content",
        style: null,
        blocks: [],
        defaultContent: [".abbv-title h3", ".durysta-eligibility", ".durysta-terms"]
      },
      {
        id: "section-3",
        name: "Quick Links",
        selector: ".durysta-quick-links",
        style: "teal",
        blocks: ["columns-quicklinks"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Important Safety Information",
        selector: ".abbv-inline-safety",
        style: null,
        blocks: [],
        defaultContent: ["#isi"]
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
        elements.forEach((el) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element: el,
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_savings_program_landing_default = {
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
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_savings_program_landing_exports);
})();
