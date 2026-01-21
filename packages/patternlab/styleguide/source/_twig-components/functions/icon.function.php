<?php

use PatternLab\Config;

$function = new Twig_SimpleFunction('icon', function ($name, $width = '24', $height = '24', $class = '', $bold = true) {
  // Note: Temporary BC layer for turning icon twig files into direct
  // filename references. This exists only so we don't break anything
  // terribly while working this function into general use. Going forward,
  // the string name of the icon should be passed to this function directly.
  if (strpos($name, '@') === 0) {
    $iconname = pathinfo($name, PATHINFO_FILENAME);
    $name = preg_replace('/^svg-/', '', $iconname);
  }
  
  // Determine the icon path based on bold parameter
  if ($bold) {
    $iconPath = 'bold/' . $name . '--bold';
  } else {
    $iconPath = $name;
  }
  
  $path = sprintf(Config::getOption('publicDir') . '/assets/images/icons/%s.svg', $iconPath);

  $helper = new \PatternLab\IconHelper();
  $id = $helper->getId($path);
  $svg = $helper->load($path);
  $svg->setAttribute('id', $id);
  
  // Set dimensions on the symbol itself
  if ($width || $height) {
    $svg->setAttribute('width', $width ?: $height);
    $svg->setAttribute('height', $height ?: $width);
  }
  
  $symbol = $helper->exportAsSymbol($svg);
  
  // Modify the symbol to include width/height
  if ($width || $height) {
    $symbol = preg_replace(
      '/<symbol([^>]*)>/',
      sprintf(
        '<symbol$1 width="%s" height="%s">',
        $width ?: $height,
        $height ?: $width
      ),
      $symbol
    );
  }

  $useElement = $helper->getSvgUse($id);
  
  // Also set dimensions on the use element's SVG wrapper
  if ($width || $height || $class) {
    $useElement = preg_replace(
      '/<svg([^>]*)>/',
      sprintf(
        '<svg$1%s%s%s>',
        $width ? ' width="' . $width . '"' : '',
        $height ? ' height="' . $height . '"' : '',
        $class ? ' class="' . $class . '"' : ''
      ),
      $useElement
    );
  }

  return $useElement . $helper->wrapSymbols([$symbol]);
}, [
  'is_safe' => ['html']
]);
