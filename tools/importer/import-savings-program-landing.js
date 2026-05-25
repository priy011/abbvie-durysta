/* eslint-disable */
/* global WebImporter */

import heroSavingsParser from './parsers/hero-savings.js';
import columnsQuicklinksParser from './parsers/columns-quicklinks.js';

import durystaCleanupTransformer from './transformers/durysta-cleanup.js';
import durystaSectionsTransformer from './transformers/durysta-sections.js';

const parsers = {
  'hero-savings': heroSavingsParser,
  'columns-quicklinks': columnsQuicklinksParser,
};

const PAGE_TEMPLATE = {
  name: 'savings-program-landing',
  description: 'Durysta savings program landing page with eligibility information, savings card details, and enrollment steps',
  urls: [
    'https://www.durystasavingsprogram.com/'
  ],
  blocks: [
    {
      name: 'hero-savings',
      instances: ['.durysta-hero']
    },
    {
      name: 'columns-quicklinks',
      instances: ['.durysta-quick-links']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.image-text-v2.parbase',
      style: null,
      blocks: ['hero-savings'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Main Content - Eligibility and Terms',
      selector: '.durysta-main-content',
      style: null,
      blocks: [],
      defaultContent: ['.abbv-title h3', '.durysta-eligibility', '.durysta-terms']
    },
    {
      id: 'section-3',
      name: 'Quick Links',
      selector: '.durysta-quick-links',
      style: 'teal',
      blocks: ['columns-quicklinks'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Important Safety Information',
      selector: '.abbv-inline-safety',
      style: null,
      blocks: [],
      defaultContent: ['#isi']
    }
  ]
};

const transformers = [
  durystaCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [durystaSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

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
          section: blockDef.section || null,
        });
      });
    });
  });

  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
