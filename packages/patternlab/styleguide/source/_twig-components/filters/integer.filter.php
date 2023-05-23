<?php

/**
* @file
* Add "typogrify" filter for Pattern Lab.
*/

$filter = new Twig_SimpleFilter('integer', function ($value) {
  return intval($value);
});
