<?php

/*!
 * Console Event Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Passes event data from Console to plug-ins
 *
 */

namespace PatternLab\Console;

class Event extends \PatternLab\Event {
	
	protected $options;
	
	public function __construct($options = array()) {
		$this->options = $options;
	}
	
	public function getOptions() {
		return $this->options;
	}
	
}
