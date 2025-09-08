### Description
Renders an inline list of links or text items (if URL is not provided for the link).
It provides an alternative background using the "background" variable.

This component includes accessibility features for screen readers, allowing translation links to announce both the language name and the associated document title while excluding file size information.

### Variables
~~~
inlineLinks: {
  ariaLabel: string / optional
  background: [{null, "gray"}] / optional
  links: [{
    text:
      type: string / required,
    href:
      type: string (url) / optional,
    info:
      type: string / optional
    lang_label:
      type: string / optional
    translation_id:
      type: string / optional - Unique ID for the translation link (e.g., "doc-123-es")
    document_id:
      type: string / optional - ID of the associated document title (e.g., "doc-123-title")
    aria_labelledby:
      type: string / optional - Space-separated list of IDs for screen reader announcement
    lang:
      type: string / optional - Language code for proper pronunciation (e.g., "es", "zh")
  }]
}
~~~

### Accessibility Features
- **aria-labelledby**: References both the translation link's own ID and the document title ID to ensure screen readers announce the full context (e.g., "Español ABI-MFP Participant Handbook")
- **lang attribute**: Provides proper language pronunciation for screen readers
- **Unique IDs**: Each translation link has a unique identifier to avoid conflicts when multiple language bars appear on the same page
