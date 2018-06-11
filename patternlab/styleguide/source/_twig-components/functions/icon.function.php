<?php
$function = new Twig_SimpleFunction('icon', function($name) {
  // Note: Temporary BC layer for turning icon twig files into direct
  // filename references. This exists only so we don't break anything
  // terribly while working this function into general use. Going forward,
  // the string name of the icon should be passed to this function directly.
  if(strpos($name, '@') === 0) {
    $iconname = pathinfo($name, PATHINFO_FILENAME);
    $name = preg_replace('/^svg-/', '', $iconname);
  }
  $path = sprintf('%s/../../assets/images/svg-icons/%s.svg', __DIR__, $name);

  // Return two SVGs:
  // <svg><use id="abc" /></svg>
  // <svg><symbol id="abc">...</symbol></svg>
  // This allows us to mirror what mass.gov is doing for styling purposes.
  $helper = new \PatternLab\IconHelper();
  $id = $helper->getId($path);
  $svg = $helper->load($path);
  $svg->setAttribute('id', $id);
  $symbol = $helper->exportAsSymbol($svg);

  return $helper->getSvgUse($id) . $helper->wrapSymbols([$symbol]);
}, [
  'is_safe' => ['html']
]);
