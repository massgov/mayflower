export default {
  "cacheBust": true,
  "cleanPublic": true,
  "defaultPattern": "pages-readme2",
  "defaultShowPatternInfo": false,
  "ishControlsHide": {
    "s": false,
    "m": false,
    "l": false,
    "full": false,
    "random": true,
    "disco": true,
    "hay": true,
    "mqs": false,
    "find": false,
    "views-all": false,
    "views-annotations": false,
    "views-code": false,
    "views-new": false,
    "tools-all": false,
    "tools-docs": false
  },
  "ishViewportRange": {
    "s": [
      240,
      500
    ],
    "m": [
      500,
      800
    ],
    "l": [
      800,
      2600
    ]
  },
  "logLevel": "info",
  "outputFileSuffixes": {
    "rendered": ".rendered",
    "rawTemplate": "",
    "markupOnly": ".markup-only"
  },
  "paths": {
    "source": {
      "root": "./source/",
      "patterns": "./source/_patterns/",
      "data": "./source/_data/",
      "meta": "./source/_meta/",
      "annotations": "./source/_annotations/",
      "styleguide": "dist/",
      "patternlabFiles": {
        "general-header": "views/partials/general-header.mustache",
        "general-footer": "views/partials/general-footer.mustache",
        "patternSection": "views/partials/patternSection.mustache",
        "patternSectionSubtype": "views/partials/patternSectionSubtype.mustache",
        "viewall": "views/viewall.mustache"
      },
      "js": "./source/js",
      "images": "./source/images",
      "fonts": "./source/fonts",
      "css": "./source/css"
    },
    "public": {
      "root": "public/",
      "patterns": "public/patterns/",
      "data": "public/styleguide/data/",
      "annotations": "public/annotations/",
      "styleguide": "public/styleguide/",
      "js": "public/js",
      "images": "public/images",
      "fonts": "public/fonts",
      "css": "public/css"
    }
  },
  "patternExtension": "twig",
  "patternStateCascade": [
    "inprogress",
    "inreview",
    "complete"
  ],
  "patternExportAll": false,
  "patternExportDirectory": "pattern_exports",
  "patternExportPatternPartials": [],
  "patternExportPreserveDirectoryStructure": true,
  "patternExportRaw": false,
  "serverOptions": {
    "wait": 1000
  },
  "starterkitSubDir": "dist",
  "styleGuideExcludes": [],
  "theme": {
    "color": "light",
    "density": "compact",
    "layout": "horizontal",
    "noViewAll": false
  },
  "uikits": [
    {
      "name": "uikit-workshop",
      "outputDir": "",
      "enabled": true,
      "excludedPatternStates": [],
      "excludedTags": []
    }
  ],
  "engines": {
    "twig": {
      "hasExtraInfoInResponses": true,
      "debug": true,
      "namespaces": [
        {
          "id": "base",
          "recursive": true,
          "paths": [
            "source/_patterns/00-base"
          ]
        },
        {
          "id": "atoms",
          "recursive": true,
          "paths": [
            "source/_patterns/01-atoms/",
            "source/_patterns/01-atoms/01-buttons/",
            "source/_patterns/01-atoms/03-forms/",
            "source/_patterns/01-atoms/04-headings/",
            "source/_patterns/01-atoms/05-icons/",
            "source/_patterns/01-atoms/06-rich-text/",
            "source/_patterns/01-atoms/08-lists/",
            "source/_patterns/01-atoms/09-media/",
            "source/_patterns/01-atoms/10-table/",
            "source/_patterns/01-atoms/11-text/"

          ]
        },
        {
          "id": "molecules",
          "recursive": true,
          "paths": [
            "source/_patterns/02-molecules/",
            "source/_patterns/02-molecules/forms/"
          ]
        },
        {
          "id": "organisms",
          "recursive": true,
          "paths": [
            "source/_patterns/03-organisms/",
            "source/_patterns/03-organisms/by-author/",
            "source/_patterns/03-organisms/by-template/",
            "source/_patterns/03-organisms/feedback/"
          ]
        },
        {
          "id": "templates",
          "recursive": true,
          "paths": [
            "source/_patterns/04-templates",
            "source/_patterns/04-templates/01-content-types"
          ]
        },
        {
          "id": "pages",
          "recursive": true,
          "paths": [
            "source/_patterns/05-pages"
          ]
        },
        {
          "id": "meta",
          "recursive": true,
          "paths": [
            "source/_patterns/07-meta"
          ]
        },
        {
          "id": "macros",
          "recursive": true,
          "paths": [
            "source/_macros"
          ]
        }
      ],
      "alterTwigEnv": [
        {
          "file": "alter-twig.php",
          "functions": [
            "addCustomExtension"
          ]
        }
      ]
    }
  }
}
