<?php
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
    return sprintf('<svg aria-hidden="true" focusable="false"><use xlink:href="#%s"></use></svg>', $id);
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

/**
 * @param Twig_Environment $env - The Twig Environment - https://twig.symfony.com/api/1.x/Twig_Environment.html
 * @param $config - Config of `@basalt/twig-renderer`
 */
function addCustomExtension(\Twig_Environment &$env, $config) {
  //$env->enableDebug();

  $env->addFunction(
    new \Twig_SimpleFunction('icon', function ($name) use ($config) {
      // Note: Temporary BC layer for turning icon twig files into direct
      // filename references. This exists only so we don't break anything
      // terribly while working this function into general use. Going forward,
      // the string name of the icon should be passed to this function directly.
      if (strpos($name, '@') === 0) {
        $iconname = pathinfo($name, PATHINFO_FILENAME);
        $name = preg_replace('/^svg-/', '', $iconname);
      }
      $path = sprintf($config['relativeFrom'] . '/source/images/svg-icons/%s.svg', $name);

      // Return two SVGs:
      // <svg><use id="abc" /></svg>
      // <svg><symbol id="abc">...</symbol></svg>
      // This allows us to mirror what mass.gov is doing for styling purposes.
      $helper = new IconHelper();
      $id = $helper->getId($path);
      $svg = $helper->load($path);
      $svg->setAttribute('id', $id);
      $symbol = $helper->exportAsSymbol($svg);
      return $helper->getSvgUse($id) . $helper->wrapSymbols([$symbol]);
    }, [
      'is_safe' => ['html']
    ])
    );
  /**
   * @example `<h1>Hello {{ customTwigFunctionThatSaysWorld() }}!</h1>` => `<h1>Hello Custom World</h1>`
   */
//  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
//    return 'Custom World';
//  }));

  /*
   * Reverse a string
   * @param string $theString
   * @example `<p>{{ reverse('abc') }}</p>` => `<p>cba</p>`
   */
//  $env->addFunction(new \Twig_SimpleFunction('reverse', function ($theString) {
//    return strrev($theString);
//  }));


//  $env->addExtension(new \My\CustomExtension());

//  `{{ foo }}` => `bar`
//  $env->addGlobal('foo', 'bar');

  // example of enabling the Twig debug mode extension (ex. {{ dump(my_variable) }} to check out the template's available data) -- comment out to disable
  $env->addExtension(new \Twig_Extension_Debug());
  $env->clearTemplateCache();
}
