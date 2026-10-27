<?php

namespace PatternLab\PatternEngine\Twig\Loaders\Twig;

use Twig\Loader\LoaderInterface;
use Twig\Source;

/**
 * Preserves Pattern Lab's legacy behavior of treating an unresolved template
 * name as inline Twig source. This loader must always be last in the chain.
 */
class StringFallbackLoader implements LoaderInterface {

	public function getSourceContext(string $name): Source {
		return new Source($name, $name);
	}

	public function getCacheKey(string $name): string {
		return hash('xxh128', $name);
	}

	public function isFresh(string $name, int $time): bool {
		return true;
	}

	public function exists(string $name): bool {
		return true;
	}
}
