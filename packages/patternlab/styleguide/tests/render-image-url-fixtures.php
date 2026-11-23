<?php

// Use the project's Composer install by default; allow another Twig install for local testing.
$autoload = getenv('MAYFLOWER_TWIG_AUTOLOAD') ?: __DIR__ . '/../vendor/autoload.php';
if (!is_file($autoload)) {
    fwrite(STDERR, "Install styleguide's Composer dependencies before running the image URL tests.\n");
    exit(1);
}
require $autoload;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\TwigFunction;

$patterns = __DIR__ . '/../source/_patterns';
$loader = new FilesystemLoader($patterns);
foreach (['atoms' => '01-atoms', 'molecules' => '02-molecules', 'organisms' => '03-organisms'] as $namespace => $directory) {
    $loader->addPath($patterns . '/' . $directory, $namespace);
}

$fixtures = [];
$mode = $argv[1] ?? 'html';
if (!in_array($mode, ['html', 'disabled'], true)) {
    throw new InvalidArgumentException('Autoescape mode must be html or disabled.');
}
$autoescape = $mode === 'html' ? 'html' : false;
$twig = new Environment($loader, ['autoescape' => $autoescape]);
// Icons do not participate in URL rendering; all included templates remain real templates.
$twig->addFunction(new TwigFunction('icon', static fn (...$args) => ''));

foreach ([false, true] as $specialCharacters) {
    $url = static fn ($name) => '/__image_url_test__/' . $name . '.png?download=1&itok=token-' . $name
        . ($specialCharacters ? '&label=O\'Reilly雪</style>' : '');
    $mobile = $url('mobile');
    $medium = $url('medium');
    $wide = $url('wide');
    $retina = $url('retina');
    $thumbnail = $url('thumbnail');

    $cases = [
        'page-banner' => [
            '@organisms/page-banner/page-banner.twig',
            ['pageBanner' => ['image' => $wide, 'imageMobile' => $mobile, 'imageMedium' => $medium, 'renderImageOnMobile' => true]],
            [$mobile, $medium, $wide], [],
        ],
        'page-banner-fallbacks' => [
            '@organisms/page-banner/page-banner.twig',
            ['pageBanner' => ['image' => $wide, 'renderImageOnMobile' => true]],
            [$wide, $wide, $wide], [],
        ],
        'legacy-page-banner' => [
            '@organisms/legacy-page-banner/page-banner-legacy.twig',
            ['pageBanner' => ['bgNarrow' => $mobile, 'bgWide' => $wide, 'renderImageOnMobile' => true]],
            [$mobile, $wide], [],
        ],
        'legacy-page-banner-fallback' => [
            '@organisms/legacy-page-banner/page-banner-legacy.twig',
            ['pageBanner' => ['bgWide' => $wide, 'renderImageOnMobile' => true]],
            [$wide, $wide], [],
        ],
        'illustrated-header' => [
            '@organisms/illustrated-header/illustrated-header.twig',
            ['illustratedHeader' => ['bgImage' => $wide, 'retinaBgImage' => $retina, 'pageHeader' => []]],
            [$wide, $retina], [],
        ],
        'search-banner' => [
            '@organisms/by-author/search-banner.twig',
            ['searchBanner' => ['id' => 'fixture-search', 'bgNarrow' => $mobile, 'bgWide' => $wide]],
            [$mobile, $wide], [],
        ],
        'feedback-form' => [
            '@organisms/by-author/feedback-form.twig',
            ['feedbackForm' => ['bgNarrow' => $mobile, 'bgWide' => $wide, 'radioButtons' => []]],
            [$mobile, $wide], [],
        ],
        'action-finder' => [
            '@organisms/by-author/action-finder.twig',
            ['actionFinder' => ['id' => 'fixture-action', 'bgNarrow' => $mobile, 'bgWide' => $wide]],
            [$mobile, $wide], [],
        ],
        'card' => [
            '@molecules/card.twig',
            ['card' => ['id' => 'fixture-card', 'thumbnail' => $thumbnail, 'title' => 'Fixture & title']],
            [$thumbnail], [$thumbnail],
        ],
    ];

    // Attribute templates retain HTML escaping. Their fixture URLs contain literal ampersands.
    if (!$specialCharacters) {
        $cases['illustrated-link-attribute'] = [
            '@molecules/illustrated-link.twig',
            ['illustratedLink' => ['image' => $wide, 'text' => 'Fixture', 'href' => '/fixture']],
            [$wide], [],
        ];
        $cases['press-teaser-attribute'] = [
            '@molecules/press-teaser.twig',
            ['pressTeaser' => ['image' => ['src' => $wide], 'title' => ['href' => '/fixture', 'text' => 'Fixture']]],
            [$wide], [],
        ];
    }

    foreach ($cases as $name => [$template, $context, $backgrounds, $images]) {
        $html = $twig->render($template, $context);
        // Verify that enabling HTML autoescaping still protects ordinary content and attributes.
        if ($name === 'card' && $autoescape === 'html'
            && (!str_contains($html, 'Fixture &amp; title') || !str_contains($html, '&amp;itok='))) {
            throw new RuntimeException('HTML autoescaping was lost in card.twig.');
        }
        if ($name === 'card' && $autoescape === false
            && (!str_contains($html, 'Fixture & title') || str_contains($html, '&amp;itok='))) {
            throw new RuntimeException('The disabled-autoescape fixture still uses HTML autoescaping.');
        }
        if (str_ends_with($name, '-attribute') && $autoescape === 'html'
            && !str_contains($html, '&amp;itok=')) {
            throw new RuntimeException('HTML attribute escaping was lost in ' . $template);
        }
        $fixtures[] = [
            'name' => $name . ' / autoescape=' . ($autoescape ?: 'disabled')
                . ($specialCharacters ? ' / CSS string characters' : ''),
            'html' => $html,
            'backgrounds' => $backgrounds,
            'images' => $images,
        ];
    }
}

echo json_encode($fixtures, JSON_THROW_ON_ERROR);
