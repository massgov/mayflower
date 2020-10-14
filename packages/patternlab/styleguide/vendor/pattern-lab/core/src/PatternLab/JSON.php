<?php

/*!
 * JSON Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Handles checking for any errors that might have been encountered when loading JSON data
 *
 */

namespace PatternLab;

use \PatternLab\Console;
use \PatternLab\Timer;
use \Seld\JsonLint;

class JSON {
	
	protected static $errors = array(
		JSON_ERROR_NONE             => false,
		JSON_ERROR_DEPTH            => 'Maximum stack depth exceeded',
		JSON_ERROR_STATE_MISMATCH   => 'Underflow or the modes mismatch',
		JSON_ERROR_CTRL_CHAR        => 'Unexpected control character found',
		JSON_ERROR_SYNTAX           => 'Syntax error, malformed JSON',
		JSON_ERROR_UTF8             => 'Malformed UTF-8 characters, possibly incorrectly encoded'
	);
	
	/**
	* Returns the last error message when building a JSON file. Mimics json_last_error_msg() from PHP 5.5
	* @param  {String}       the file that generated the error
	*/
	public static function hasError() {
		$error        = json_last_error();
		$errorMessage = array_key_exists($error, self::$errors) ? self::$errors[$error] : "Unknown error ({$error})";
		return $errorMessage;
	}
	
	/**
	* Returns the last error message when building a JSON file. Mimics json_last_error_msg() from PHP 5.5
	* @param  {String}       the file that generated the error
	*/
	public static function lastErrorMsg($file,$message,$data) {
		Console::writeLine(PHP_EOL."<error>The JSON file, ".$file.", wasn't loaded. The error: ".$message."</error>");
		if ($message == "Syntax error, malformed JSON") {
			Console::writeLine("");
			$parser = new JsonLint\JsonParser();
			$error  = $parser->lint($data);
			Console::writeError($error->getMessage(), false, true);
		}
	}
	
}
