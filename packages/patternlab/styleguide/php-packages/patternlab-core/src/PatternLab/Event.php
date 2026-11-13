<?php

namespace PatternLab;

/**
 * Base event with propagation control compatible with Symfony's legacy event.
 */
class Event {

	private bool $propagationStopped = false;

	public function isPropagationStopped(): bool {
		return $this->propagationStopped;
	}

	public function stopPropagation(): void {
		$this->propagationStopped = true;
	}
}
