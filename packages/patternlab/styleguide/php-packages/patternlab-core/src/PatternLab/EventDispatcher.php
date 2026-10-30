<?php

namespace PatternLab;

/**
 * Small event dispatcher preserving Pattern Lab's original event-name-first API.
 */
class EventDispatcher {

	private array $listeners = array();

	public function addListener(string $eventName, callable $listener, int $priority = 0): void {
		$this->listeners[$eventName][$priority][] = $listener;
	}

	public function dispatch(string $eventName, ?object $event = null): object {
		$event = $event ?? new Event();
		$listeners = $this->listeners[$eventName] ?? array();
		krsort($listeners);

		foreach ($listeners as $priorityListeners) {
			foreach ($priorityListeners as $listener) {
				if ($event instanceof Event && $event->isPropagationStopped()) {
					break 2;
				}
				$listener($event, $eventName, $this);
			}
		}

		return $event;
	}
}
