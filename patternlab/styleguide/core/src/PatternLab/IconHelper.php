<?php

namespace PatternLab;

/**
 * Helper for embedding SVGs in Mayflower.
 *
 * Alongside the twig `icon` function, allows SVGs to be embedded
 * and referenced with a <use> statement.  This adds complication
 * to Mayflower that isn't really necessary, but it allows us to
 * mirror the way we're embedding the SVGs in other applications
 * to ensure there are no styling issues.
 */
class IconHelper {

  // Tracks the icons we've seen so we can avoid duplicating IDs.
  public static $seen = [];

  /**
   * Create a unique ID for a specific SVG file.
   * @param $path
   *
   * @return string
   */
  public function getId($path) {
    if(isset(self::$seen[$path])) {
      self::$seen[$path]++;
    }
    else {
      self::$seen[$path] = 0;
    }
    $i = self::$seen[$path];
    return sprintf('%s.%d', md5($path), $i);
  }

  /**
   * Load an SVG element as a DOMElement.
   *
   * @param $path
   *
   * @return \DOMElement
   */
  public function load($path) {
    if(!file_exists($path)) {
      throw new \Exception('Invalid icon path: ' . $path);
    }
    $svg = file_get_contents($path);
    $doc = new \DOMDocument('1.0', 'UTF-8');
    $doc->loadXML($svg);
    if(!$doc->firstChild) {
      throw new \Exception('Malformed SVG found at ' . $path);
    }
    return $doc->firstChild;
  }

  /**
   * Export an SVG DOMElement as a symbol string.
   *
   * @param \DOMElement $sourceNode
   *
   * @return string
   */
  public function exportAsSymbol(\DOMElement $sourceNode) {
    $symbol = $sourceNode->ownerDocument->createElementNS($sourceNode->namespaceURI, 'symbol');

    // Copy attributes from <svg> to <symbol>.
    /** @var \DOMAttr $attribute */
    foreach ($sourceNode->attributes as $attribute) {
      $symbol->setAttribute($attribute->name, $attribute->value);
    }

    // Copy all child nodes from the SVG to the symbol.
    // This has to be a double loop due to an issue with DOMNodeList.
    // @see http://php.net/manual/en/domnode.appendchild.php#121829
    foreach ($sourceNode->childNodes as $node) {
      $children[] = $node;
    }

    foreach ($children as $child) {
      $symbol->appendChild($child);
    }

    return $sourceNode->ownerDocument->saveXML($symbol);
  }

  /**
   * Get an SVG tag with a <use> statement inside of it.
   *
   * @param $id
   *
   * @return string
   */
  public function getSvgUse($id) {
    return sprintf('<svg aria-hidden="true"><use xlink:href="#%s"></use></svg>', $id);
  }

  /**
   * Wrap symbol elements into a new SVG element.
   *
   * @param array $symbols
   *
   * @return string
   */
  public function wrapSymbols(array $symbols) {
    return sprintf('<svg xmlns="http://www.w3.org/2000/svg" style="display: none">%s</svg>', implode('', $symbols));
  }
}