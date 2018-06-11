/**
 * history.js Native Adapter
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

// Closure
(function(window,undefined){
	"use strict";

	var history = window.history;

	// Check Existence
	if ( typeof history.Adapter !== 'undefined' ) {
		throw new Error('history.js Adapter has already been loaded...');
	}

	// Add the Adapter
	history.Adapter = {
		/**
		 * history.Adapter.handlers[uid][eventName] = Array
		 */
		handlers: {},

		/**
		 * history.Adapter._uid
		 * The current element unique identifier
		 */
		_uid: 1,

		/**
		 * history.Adapter.uid(element)
		 * @param {Element} element
		 * @return {String} uid
		 */
		uid: function(element){
			return element._uid || (element._uid = history.Adapter._uid++);
		},

		/**
		 * history.Adapter.bind(el,event,callback)
		 * @param {Element} element
		 * @param {String} eventName - custom and standard events
		 * @param {Function} callback
		 * @return
		 */
		bind: function(element,eventName,callback){
			// Prepare
			var uid = history.Adapter.uid(element);

			// Apply Listener
			history.Adapter.handlers[uid] = history.Adapter.handlers[uid] || {};
			history.Adapter.handlers[uid][eventName] = history.Adapter.handlers[uid][eventName] || [];
			history.Adapter.handlers[uid][eventName].push(callback);

			// Bind Global Listener
			element['on'+eventName] = (function(element,eventName){
				return function(event){
					history.Adapter.trigger(element,eventName,event);
				};
			})(element,eventName);
		},

		/**
		 * history.Adapter.trigger(el,event)
		 * @param {Element} element
		 * @param {String} eventName - custom and standard events
		 * @param {Object} event - a object of event data
		 * @return
		 */
		trigger: function(element,eventName,event){
			// Prepare
			event = event || {};
			var uid = history.Adapter.uid(element),
				i,n;

			// Apply Listener
			history.Adapter.handlers[uid] = history.Adapter.handlers[uid] || {};
			history.Adapter.handlers[uid][eventName] = history.Adapter.handlers[uid][eventName] || [];

			// Fire Listeners
			for ( i=0,n=history.Adapter.handlers[uid][eventName].length; i<n; ++i ) {
				history.Adapter.handlers[uid][eventName][i].apply(this,[event]);
			}
		},

		/**
		 * history.Adapter.extractEventData(key,event,extra)
		 * @param {String} key - key for the event data to extract
		 * @param {String} event - custom and standard events
		 * @return {mixed}
		 */
		extractEventData: function(key,event){
			var result = (event && event[key]) || undefined;
			return result;
		},

		/**
		 * history.Adapter.onDomLoad(callback)
		 * @param {Function} callback
		 * @return
		 */
		onDomLoad: function(callback) {
			var timeout = window.setTimeout(function(){
				callback();
			},2000);
			window.onload = function(){
				clearTimeout(timeout);
				callback();
			};
		}
	};

	// Try to Initialise history
	if ( typeof history.init !== 'undefined' ) {
		history.init();
	}

})(window);
/**
 * history.js Core
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(window,undefined){
	"use strict";

	// ========================================================================
	// Initialise

	// Localise Globals
	var
		console = window.console||undefined, // Prevent a JSLint complain
		document = window.document, // Make sure we are using the correct document
		navigator = window.navigator, // Make sure we are using the correct navigator
		sessionStorage = false, // sessionStorage
		setTimeout = window.setTimeout,
		clearTimeout = window.clearTimeout,
		setInterval = window.setInterval,
		clearInterval = window.clearInterval,
		JSON = window.JSON,
		alert = window.alert,
		history = window.history;

	try {
		sessionStorage = window.sessionStorage; // This will throw an exception in some browsers when cookies/localStorage are explicitly disabled (i.e. Chrome)
		sessionStorage.setItem('TEST', '1');
		sessionStorage.removeItem('TEST');
	} catch(e) {
		sessionStorage = false;
	}

	// MooTools Compatibility
	JSON.stringify = JSON.stringify||JSON.encode;
	JSON.parse = JSON.parse||JSON.decode;

	// Check Existence
	if ( typeof history.init !== 'undefined' ) {
		throw new Error('history.js Core has already been loaded...');
	}

	// Initialise history
	history.init = function(options){
		// Check Load Status of Adapter
		if ( typeof history.Adapter === 'undefined' ) {
			return false;
		}

		// Check Load Status of Core
		if ( typeof history.initCore !== 'undefined' ) {
			history.initCore();
		}

		// Check Load Status of HTML4 Support
		if ( typeof history.initHtml4 !== 'undefined' ) {
			history.initHtml4();
		}

		// Return true
		return true;
	};


	// ========================================================================
	// Initialise Core

	// Initialise Core
	history.initCore = function(options){
		// Initialise
		if ( typeof history.initCore.initialized !== 'undefined' ) {
			// Already Loaded
			return false;
		}
		else {
			history.initCore.initialized = true;
		}


		// ====================================================================
		// Options

		/**
		 * history.options
		 * Configurable options
		 */
		history.options = history.options||{};

		/**
		 * history.options.hashChangeInterval
		 * How long should the interval be before hashchange checks
		 */
		history.options.hashChangeInterval = history.options.hashChangeInterval || 100;

		/**
		 * history.options.safariPollInterval
		 * How long should the interval be before safari poll checks
		 */
		history.options.safariPollInterval = history.options.safariPollInterval || 500;

		/**
		 * history.options.doubleCheckInterval
		 * How long should the interval be before we perform a double check
		 */
		history.options.doubleCheckInterval = history.options.doubleCheckInterval || 500;

		/**
		 * history.options.disableSuid
		 * Force history not to append suid
		 */
		history.options.disableSuid = history.options.disableSuid || false;

		/**
		 * history.options.storeInterval
		 * How long should we wait between store calls
		 */
		history.options.storeInterval = history.options.storeInterval || 1000;

		/**
		 * history.options.busyDelay
		 * How long should we wait between busy events
		 */
		history.options.busyDelay = history.options.busyDelay || 250;

		/**
		 * history.options.debug
		 * If true will enable debug messages to be logged
		 */
		history.options.debug = history.options.debug || false;

		/**
		 * history.options.initialTitle
		 * What is the title of the initial state
		 */
		history.options.initialTitle = history.options.initialTitle || document.title;

		/**
		 * history.options.html4Mode
		 * If true, will force HTMl4 mode (hashtags)
		 */
		history.options.html4Mode = history.options.html4Mode || false;

		/**
		 * history.options.delayInit
		 * Want to override default options and call init manually.
		 */
		history.options.delayInit = history.options.delayInit || false;


		// ====================================================================
		// Interval record

		/**
		 * history.intervalList
		 * List of intervals set, to be cleared when document is unloaded.
		 */
		history.intervalList = [];

		/**
		 * history.clearAllIntervals
		 * Clears all setInterval instances.
		 */
		history.clearAllIntervals = function(){
			var i, il = history.intervalList;
			if (typeof il !== "undefined" && il !== null) {
				for (i = 0; i < il.length; i++) {
					clearInterval(il[i]);
				}
				history.intervalList = null;
			}
		};


		// ====================================================================
		// Debug

		/**
		 * history.debug(message,...)
		 * Logs the passed arguments if debug enabled
		 */
		history.debug = function(){
			if ( (history.options.debug||false) ) {
				history.log.apply(history,arguments);
			}
		};

		/**
		 * history.log(message,...)
		 * Logs the passed arguments
		 */
		history.log = function(){
			// Prepare
			var
				consoleExists = !(typeof console === 'undefined' || typeof console.log === 'undefined' || typeof console.log.apply === 'undefined'),
				textarea = document.getElementById('log'),
				message,
				i,n,
				args,arg
				;

			// Write to Console
			if ( consoleExists ) {
				args = Array.prototype.slice.call(arguments);
				message = args.shift();
				if ( typeof console.debug !== 'undefined' ) {
					console.debug.apply(console,[message,args]);
				}
				else {
					console.log.apply(console,[message,args]);
				}
			}
			else {
				message = ("\n"+arguments[0]+"\n");
			}

			// Write to log
			for ( i=1,n=arguments.length; i<n; ++i ) {
				arg = arguments[i];
				if ( typeof arg === 'object' && typeof JSON !== 'undefined' ) {
					try {
						arg = JSON.stringify(arg);
					}
					catch ( Exception ) {
						// Recursive Object
					}
				}
				message += "\n"+arg+"\n";
			}

			// Textarea
			if ( textarea ) {
				textarea.value += message+"\n-----\n";
				textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
			}
			// No Textarea, No Console
			else if ( !consoleExists ) {
				alert(message);
			}

			// Return true
			return true;
		};


		// ====================================================================
		// Emulated Status

		/**
		 * history.getInternetExplorerMajorVersion()
		 * Get's the major version of Internet Explorer
		 * @return {integer}
		 * @license Public Domain
		 * @author Benjamin Arthur Lupton <contact@balupton.com>
		 * @author James Padolsey <https://gist.github.com/527683>
		 */
		history.getInternetExplorerMajorVersion = function(){
			var result = history.getInternetExplorerMajorVersion.cached =
					(typeof history.getInternetExplorerMajorVersion.cached !== 'undefined')
				?	history.getInternetExplorerMajorVersion.cached
				:	(function(){
						var v = 3,
								div = document.createElement('div'),
								all = div.getElementsByTagName('i');
						while ( (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->') && all[0] ) {}
						return (v > 4) ? v : false;
					})()
				;
			return result;
		};

		/**
		 * history.isInternetExplorer()
		 * Are we using Internet Explorer?
		 * @return {boolean}
		 * @license Public Domain
		 * @author Benjamin Arthur Lupton <contact@balupton.com>
		 */
		history.isInternetExplorer = function(){
			var result =
				history.isInternetExplorer.cached =
				(typeof history.isInternetExplorer.cached !== 'undefined')
					?	history.isInternetExplorer.cached
					:	Boolean(history.getInternetExplorerMajorVersion())
				;
			return result;
		};

		/**
		 * history.emulated
		 * Which features require emulating?
		 */

		if (history.options.html4Mode) {
			history.emulated = {
				pushState : true,
				hashChange: true
			};
		}

		else {

			history.emulated = {
				pushState: !Boolean(
					window.history && window.history.pushState && window.history.replaceState
					&& !(
						(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i).test(navigator.userAgent) /* disable for versions of iOS before version 4.3 (8F190) */
						|| (/AppleWebKit\/5([0-2]|3[0-2])/i).test(navigator.userAgent) /* disable for the mercury iOS browser, or at least older versions of the webkit engine */
					)
				),
				hashChange: Boolean(
					!(('onhashchange' in window) || ('onhashchange' in document))
					||
					(history.isInternetExplorer() && history.getInternetExplorerMajorVersion() < 8)
				)
			};
		}

		/**
		 * history.enabled
		 * Is history enabled?
		 */
		history.enabled = !history.emulated.pushState;

		/**
		 * history.bugs
		 * Which bugs are present
		 */
		history.bugs = {
			/**
			 * Safari 5 and Safari iOS 4 fail to return to the correct state once a hash is replaced by a `replaceState` call
			 * https://bugs.webkit.org/show_bug.cgi?id=56249
			 */
			setHash: Boolean(!history.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),

			/**
			 * Safari 5 and Safari iOS 4 sometimes fail to apply the state change under busy conditions
			 * https://bugs.webkit.org/show_bug.cgi?id=42940
			 */
			safariPoll: Boolean(!history.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),

			/**
			 * MSIE 6 and 7 sometimes do not apply a hash even it was told to (requiring a second call to the apply function)
			 */
			ieDoubleCheck: Boolean(history.isInternetExplorer() && history.getInternetExplorerMajorVersion() < 8),

			/**
			 * MSIE 6 requires the entire hash to be encoded for the hashes to trigger the onHashChange event
			 */
			hashEscape: Boolean(history.isInternetExplorer() && history.getInternetExplorerMajorVersion() < 7)
		};

		/**
		 * history.isEmptyObject(obj)
		 * Checks to see if the Object is Empty
		 * @param {Object} obj
		 * @return {boolean}
		 */
		history.isEmptyObject = function(obj) {
			for ( var name in obj ) {
				if ( obj.hasOwnProperty(name) ) {
					return false;
				}
			}
			return true;
		};

		/**
		 * history.cloneObject(obj)
		 * Clones a object and eliminate all references to the original contexts
		 * @param {Object} obj
		 * @return {Object}
		 */
		history.cloneObject = function(obj) {
			var hash,newObj;
			if ( obj ) {
				hash = JSON.stringify(obj);
				newObj = JSON.parse(hash);
			}
			else {
				newObj = {};
			}
			return newObj;
		};


		// ====================================================================
		// URL Helpers

		/**
		 * history.getRootUrl()
		 * Turns "http://mysite.com/dir/page.html?asd" into "http://mysite.com"
		 * @return {String} rootUrl
		 */
		history.getRootUrl = function(){
			// Create
			var rootUrl = document.location.protocol+'//'+(document.location.hostname||document.location.host);
			if ( document.location.port||false ) {
				rootUrl += ':'+document.location.port;
			}
			rootUrl += '/';

			// Return
			return rootUrl;
		};

		/**
		 * history.getBaseHref()
		 * Fetches the `href` attribute of the `<base href="...">` element if it exists
		 * @return {String} baseHref
		 */
		history.getBaseHref = function(){
			// Create
			var
				baseElements = document.getElementsByTagName('base'),
				baseElement = null,
				baseHref = '';

			// Test for Base Element
			if ( baseElements.length === 1 ) {
				// Prepare for Base Element
				baseElement = baseElements[0];
				baseHref = baseElement.href.replace(/[^\/]+$/,'');
			}

			// Adjust trailing slash
			baseHref = baseHref.replace(/\/+$/,'');
			if ( baseHref ) baseHref += '/';

			// Return
			return baseHref;
		};

		/**
		 * history.getBaseUrl()
		 * Fetches the baseHref or basePageUrl or rootUrl (whichever one exists first)
		 * @return {String} baseUrl
		 */
		history.getBaseUrl = function(){
			// Create
			var baseUrl = history.getBaseHref()||history.getBasePageUrl()||history.getRootUrl();

			// Return
			return baseUrl;
		};

		/**
		 * history.getPageUrl()
		 * Fetches the URL of the current page
		 * @return {String} pageUrl
		 */
		history.getPageUrl = function(){
			// Fetch
			var
				State = history.getState(false,false),
				stateUrl = (State||{}).url||history.getLocationHref(),
				pageUrl;

			// Create
			pageUrl = stateUrl.replace(/\/+$/,'').replace(/[^\/]+$/,function(part,index,string){
				return (/\./).test(part) ? part : part+'/';
			});

			// Return
			return pageUrl;
		};

		/**
		 * history.getBasePageUrl()
		 * Fetches the Url of the directory of the current page
		 * @return {String} basePageUrl
		 */
		history.getBasePageUrl = function(){
			// Create
			var basePageUrl = (history.getLocationHref()).replace(/[#\?].*/,'').replace(/[^\/]+$/,function(part,index,string){
				return (/[^\/]$/).test(part) ? '' : part;
			}).replace(/\/+$/,'')+'/';

			// Return
			return basePageUrl;
		};

		/**
		 * history.getFullUrl(url)
		 * Ensures that we have an absolute URL and not a relative URL
		 * @param {string} url
		 * @param {Boolean} allowBaseHref
		 * @return {string} fullUrl
		 */
		history.getFullUrl = function(url,allowBaseHref){
			// Prepare
			var fullUrl = url, firstChar = url.substring(0,1);
			allowBaseHref = (typeof allowBaseHref === 'undefined') ? true : allowBaseHref;

			// Check
			if ( /[a-z]+\:\/\//.test(url) ) {
				// Full URL
			}
			else if ( firstChar === '/' ) {
				// Root URL
				fullUrl = history.getRootUrl()+url.replace(/^\/+/,'');
			}
			else if ( firstChar === '#' ) {
				// Anchor URL
				fullUrl = history.getPageUrl().replace(/#.*/,'')+url;
			}
			else if ( firstChar === '?' ) {
				// Query URL
				fullUrl = history.getPageUrl().replace(/[\?#].*/,'')+url;
			}
			else {
				// Relative URL
				if ( allowBaseHref ) {
					fullUrl = history.getBaseUrl()+url.replace(/^(\.\/)+/,'');
				} else {
					fullUrl = history.getBasePageUrl()+url.replace(/^(\.\/)+/,'');
				}
				// We have an if condition above as we do not want hashes
				// which are relative to the baseHref in our URLs
				// as if the baseHref changes, then all our bookmarks
				// would now point to different locations
				// whereas the basePageUrl will always stay the same
			}

			// Return
			return fullUrl.replace(/\#$/,'');
		};

		/**
		 * history.getShortUrl(url)
		 * Ensures that we have a relative URL and not a absolute URL
		 * @param {string} url
		 * @return {string} url
		 */
		history.getShortUrl = function(url){
			// Prepare
			var shortUrl = url, baseUrl = history.getBaseUrl(), rootUrl = history.getRootUrl();

			// Trim baseUrl
			if ( history.emulated.pushState ) {
				// We are in a if statement as when pushState is not emulated
				// The actual url these short urls are relative to can change
				// So within the same session, we the url may end up somewhere different
				shortUrl = shortUrl.replace(baseUrl,'');
			}

			// Trim rootUrl
			shortUrl = shortUrl.replace(rootUrl,'/');

			// Ensure we can still detect it as a state
			if ( history.isTraditionalAnchor(shortUrl) ) {
				shortUrl = './'+shortUrl;
			}

			// Clean It
			shortUrl = shortUrl.replace(/^(\.\/)+/g,'./').replace(/\#$/,'');

			// Return
			return shortUrl;
		};

		/**
		 * history.getLocationHref(document)
		 * Returns a normalized version of document.location.href
		 * accounting for browser inconsistencies, etc.
		 *
		 * This URL will be URI-encoded and will include the hash
		 *
		 * @param {object} document
		 * @return {string} url
		 */
		history.getLocationHref = function(doc) {
			doc = doc || document;

			// most of the time, this will be true
			if (doc.URL === doc.location.href)
				return doc.location.href;

			// some versions of webkit URI-decode document.location.href
			// but they leave document.URL in an encoded state
			if (doc.location.href === decodeURIComponent(doc.URL))
				return doc.URL;

			// FF 3.6 only updates document.URL when a page is reloaded
			// document.location.href is updated correctly
			if (doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash)
				return doc.location.href;

			if (doc.URL.indexOf('#') == -1 && doc.location.href.indexOf('#') != -1)
				return doc.location.href;
			
			return doc.URL || doc.location.href;
		};


		// ====================================================================
		// State Storage

		/**
		 * history.store
		 * The store for all session specific data
		 */
		history.store = {};

		/**
		 * history.idToState
		 * 1-1: State ID to State Object
		 */
		history.idToState = history.idToState||{};

		/**
		 * history.stateToId
		 * 1-1: State String to State ID
		 */
		history.stateToId = history.stateToId||{};

		/**
		 * history.urlToId
		 * 1-1: State URL to State ID
		 */
		history.urlToId = history.urlToId||{};

		/**
		 * history.storedStates
		 * Store the states in an array
		 */
		history.storedStates = history.storedStates||[];

		/**
		 * history.savedStates
		 * Saved the states in an array
		 */
		history.savedStates = history.savedStates||[];

		/**
		 * history.noramlizeStore()
		 * Noramlize the store by adding necessary values
		 */
		history.normalizeStore = function(){
			history.store.idToState = history.store.idToState||{};
			history.store.urlToId = history.store.urlToId||{};
			history.store.stateToId = history.store.stateToId||{};
		};

		/**
		 * history.getState()
		 * Get an object containing the data, title and url of the current state
		 * @param {Boolean} friendly
		 * @param {Boolean} create
		 * @return {Object} State
		 */
		history.getState = function(friendly,create){
			// Prepare
			if ( typeof friendly === 'undefined' ) { friendly = true; }
			if ( typeof create === 'undefined' ) { create = true; }

			// Fetch
			var State = history.getLastSavedState();

			// Create
			if ( !State && create ) {
				State = history.createStateObject();
			}

			// Adjust
			if ( friendly ) {
				State = history.cloneObject(State);
				State.url = State.cleanUrl||State.url;
			}

			// Return
			return State;
		};

		/**
		 * history.getIdByState(State)
		 * Gets a ID for a State
		 * @param {State} newState
		 * @return {String} id
		 */
		history.getIdByState = function(newState){

			// Fetch ID
			var id = history.extractId(newState.url),
				str;

			if ( !id ) {
				// Find ID via State String
				str = history.getStateString(newState);
				if ( typeof history.stateToId[str] !== 'undefined' ) {
					id = history.stateToId[str];
				}
				else if ( typeof history.store.stateToId[str] !== 'undefined' ) {
					id = history.store.stateToId[str];
				}
				else {
					// Generate a new ID
					while ( true ) {
						id = (new Date()).getTime() + String(Math.random()).replace(/\D/g,'');
						if ( typeof history.idToState[id] === 'undefined' && typeof history.store.idToState[id] === 'undefined' ) {
							break;
						}
					}

					// Apply the new State to the ID
					history.stateToId[str] = id;
					history.idToState[id] = newState;
				}
			}

			// Return ID
			return id;
		};

		/**
		 * history.normalizeState(State)
		 * Expands a State Object
		 * @param {object} State
		 * @return {object}
		 */
		history.normalizeState = function(oldState){
			// Variables
			var newState, dataNotEmpty;

			// Prepare
			if ( !oldState || (typeof oldState !== 'object') ) {
				oldState = {};
			}

			// Check
			if ( typeof oldState.normalized !== 'undefined' ) {
				return oldState;
			}

			// Adjust
			if ( !oldState.data || (typeof oldState.data !== 'object') ) {
				oldState.data = {};
			}

			// ----------------------------------------------------------------

			// Create
			newState = {};
			newState.normalized = true;
			newState.title = oldState.title||'';
			newState.url = history.getFullUrl(oldState.url?oldState.url:(history.getLocationHref()));
			newState.hash = history.getShortUrl(newState.url);
			newState.data = history.cloneObject(oldState.data);

			// Fetch ID
			newState.id = history.getIdByState(newState);

			// ----------------------------------------------------------------

			// Clean the URL
			newState.cleanUrl = newState.url.replace(/\??\&_suid.*/,'');
			newState.url = newState.cleanUrl;

			// Check to see if we have more than just a url
			dataNotEmpty = !history.isEmptyObject(newState.data);

			// Apply
			if ( (newState.title || dataNotEmpty) && history.options.disableSuid !== true ) {
				// Add ID to Hash
				newState.hash = history.getShortUrl(newState.url).replace(/\??\&_suid.*/,'');
				if ( !/\?/.test(newState.hash) ) {
					newState.hash += '?';
				}
				newState.hash += '&_suid='+newState.id;
			}

			// Create the Hashed URL
			newState.hashedUrl = history.getFullUrl(newState.hash);

			// ----------------------------------------------------------------

			// Update the URL if we have a duplicate
			if ( (history.emulated.pushState || history.bugs.safariPoll) && history.hasUrlDuplicate(newState) ) {
				newState.url = newState.hashedUrl;
			}

			// ----------------------------------------------------------------

			// Return
			return newState;
		};

		/**
		 * history.createStateObject(data,title,url)
		 * Creates a object based on the data, title and url state params
		 * @param {object} data
		 * @param {string} title
		 * @param {string} url
		 * @return {object}
		 */
		history.createStateObject = function(data,title,url){
			// Hashify
			var State = {
				'data': data,
				'title': title,
				'url': url
			};

			// Expand the State
			State = history.normalizeState(State);

			// Return object
			return State;
		};

		/**
		 * history.getStateById(id)
		 * Get a state by it's UID
		 * @param {String} id
		 */
		history.getStateById = function(id){
			// Prepare
			id = String(id);

			// Retrieve
			var State = history.idToState[id] || history.store.idToState[id] || undefined;

			// Return State
			return State;
		};

		/**
		 * Get a State's String
		 * @param {State} passedState
		 */
		history.getStateString = function(passedState){
			// Prepare
			var State, cleanedState, str;

			// Fetch
			State = history.normalizeState(passedState);

			// Clean
			cleanedState = {
				data: State.data,
				title: passedState.title,
				url: passedState.url
			};

			// Fetch
			str = JSON.stringify(cleanedState);

			// Return
			return str;
		};

		/**
		 * Get a State's ID
		 * @param {State} passedState
		 * @return {String} id
		 */
		history.getStateId = function(passedState){
			// Prepare
			var State, id;

			// Fetch
			State = history.normalizeState(passedState);

			// Fetch
			id = State.id;

			// Return
			return id;
		};

		/**
		 * history.getHashByState(State)
		 * Creates a Hash for the State Object
		 * @param {State} passedState
		 * @return {String} hash
		 */
		history.getHashByState = function(passedState){
			// Prepare
			var State, hash;

			// Fetch
			State = history.normalizeState(passedState);

			// Hash
			hash = State.hash;

			// Return
			return hash;
		};

		/**
		 * history.extractId(url_or_hash)
		 * Get a State ID by it's URL or Hash
		 * @param {string} url_or_hash
		 * @return {string} id
		 */
		history.extractId = function ( url_or_hash ) {
			// Prepare
			var id,parts,url, tmp;

			// Extract
			
			// If the URL has a #, use the id from before the #
			if (url_or_hash.indexOf('#') != -1)
			{
				tmp = url_or_hash.split("#")[0];
			}
			else
			{
				tmp = url_or_hash;
			}
			
			parts = /(.*)\&_suid=([0-9]+)$/.exec(tmp);
			url = parts ? (parts[1]||url_or_hash) : url_or_hash;
			id = parts ? String(parts[2]||'') : '';

			// Return
			return id||false;
		};

		/**
		 * history.isTraditionalAnchor
		 * Checks to see if the url is a traditional anchor or not
		 * @param {String} url_or_hash
		 * @return {Boolean}
		 */
		history.isTraditionalAnchor = function(url_or_hash){
			// Check
			var isTraditional = !(/[\/\?\.]/.test(url_or_hash));

			// Return
			return isTraditional;
		};

		/**
		 * history.extractState
		 * Get a State by it's URL or Hash
		 * @param {String} url_or_hash
		 * @return {State|null}
		 */
		history.extractState = function(url_or_hash,create){
			// Prepare
			var State = null, id, url;
			create = create||false;

			// Fetch SUID
			id = history.extractId(url_or_hash);
			if ( id ) {
				State = history.getStateById(id);
			}

			// Fetch SUID returned no State
			if ( !State ) {
				// Fetch URL
				url = history.getFullUrl(url_or_hash);

				// Check URL
				id = history.getIdByUrl(url)||false;
				if ( id ) {
					State = history.getStateById(id);
				}

				// Create State
				if ( !State && create && !history.isTraditionalAnchor(url_or_hash) ) {
					State = history.createStateObject(null,null,url);
				}
			}

			// Return
			return State;
		};

		/**
		 * history.getIdByUrl()
		 * Get a State ID by a State URL
		 */
		history.getIdByUrl = function(url){
			// Fetch
			var id = history.urlToId[url] || history.store.urlToId[url] || undefined;

			// Return
			return id;
		};

		/**
		 * history.getLastSavedState()
		 * Get an object containing the data, title and url of the current state
		 * @return {Object} State
		 */
		history.getLastSavedState = function(){
			return history.savedStates[history.savedStates.length-1]||undefined;
		};

		/**
		 * history.getLastStoredState()
		 * Get an object containing the data, title and url of the current state
		 * @return {Object} State
		 */
		history.getLastStoredState = function(){
			return history.storedStates[history.storedStates.length-1]||undefined;
		};

		/**
		 * history.hasUrlDuplicate
		 * Checks if a Url will have a url conflict
		 * @param {Object} newState
		 * @return {Boolean} hasDuplicate
		 */
		history.hasUrlDuplicate = function(newState) {
			// Prepare
			var hasDuplicate = false,
				oldState;

			// Fetch
			oldState = history.extractState(newState.url);

			// Check
			hasDuplicate = oldState && oldState.id !== newState.id;

			// Return
			return hasDuplicate;
		};

		/**
		 * history.storeState
		 * Store a State
		 * @param {Object} newState
		 * @return {Object} newState
		 */
		history.storeState = function(newState){
			// Store the State
			history.urlToId[newState.url] = newState.id;

			// Push the State
			history.storedStates.push(history.cloneObject(newState));

			// Return newState
			return newState;
		};

		/**
		 * history.isLastSavedState(newState)
		 * Tests to see if the state is the last state
		 * @param {Object} newState
		 * @return {boolean} isLast
		 */
		history.isLastSavedState = function(newState){
			// Prepare
			var isLast = false,
				newId, oldState, oldId;

			// Check
			if ( history.savedStates.length ) {
				newId = newState.id;
				oldState = history.getLastSavedState();
				oldId = oldState.id;

				// Check
				isLast = (newId === oldId);
			}

			// Return
			return isLast;
		};

		/**
		 * history.saveState
		 * Push a State
		 * @param {Object} newState
		 * @return {boolean} changed
		 */
		history.saveState = function(newState){
			// Check Hash
			if ( history.isLastSavedState(newState) ) {
				return false;
			}

			// Push the State
			history.savedStates.push(history.cloneObject(newState));

			// Return true
			return true;
		};

		/**
		 * history.getStateByIndex()
		 * Gets a state by the index
		 * @param {integer} index
		 * @return {Object}
		 */
		history.getStateByIndex = function(index){
			// Prepare
			var State = null;

			// Handle
			if ( typeof index === 'undefined' ) {
				// Get the last inserted
				State = history.savedStates[history.savedStates.length-1];
			}
			else if ( index < 0 ) {
				// Get from the end
				State = history.savedStates[history.savedStates.length+index];
			}
			else {
				// Get from the beginning
				State = history.savedStates[index];
			}

			// Return State
			return State;
		};
		
		/**
		 * history.getCurrentIndex()
		 * Gets the current index
		 * @return (integer)
		*/
		history.getCurrentIndex = function(){
			// Prepare
			var index = null;
			
			// No states saved
			if(history.savedStates.length < 1) {
				index = 0;
			}
			else {
				index = history.savedStates.length-1;
			}
			return index;
		};

		// ====================================================================
		// Hash Helpers

		/**
		 * history.getHash()
		 * @param {Location=} location
		 * Gets the current document hash
		 * Note: unlike location.hash, this is guaranteed to return the escaped hash in all browsers
		 * @return {string}
		 */
		history.getHash = function(doc){
			var url = history.getLocationHref(doc),
				hash;
			hash = history.getHashByUrl(url);
			return hash;
		};

		/**
		 * history.unescapeHash()
		 * normalize and Unescape a Hash
		 * @param {String} hash
		 * @return {string}
		 */
		history.unescapeHash = function(hash){
			// Prepare
			var result = history.normalizeHash(hash);

			// Unescape hash
			result = decodeURIComponent(result);

			// Return result
			return result;
		};

		/**
		 * history.normalizeHash()
		 * normalize a hash across browsers
		 * @return {string}
		 */
		history.normalizeHash = function(hash){
			// Prepare
			var result = hash.replace(/[^#]*#/,'').replace(/#.*/, '');

			// Return result
			return result;
		};

		/**
		 * history.setHash(hash)
		 * Sets the document hash
		 * @param {string} hash
		 * @return {history}
		 */
		history.setHash = function(hash,queue){
			// Prepare
			var State, pageUrl;

			// Handle Queueing
			if ( queue !== false && history.busy() ) {
				// Wait + Push to Queue
				//history.debug('history.setHash: we must wait', arguments);
				history.pushQueue({
					scope: history,
					callback: history.setHash,
					args: arguments,
					queue: queue
				});
				return false;
			}

			// Log
			//history.debug('history.setHash: called',hash);

			// Make Busy + Continue
			history.busy(true);

			// Check if hash is a state
			State = history.extractState(hash,true);
			if ( State && !history.emulated.pushState ) {
				// Hash is a state so skip the setHash
				//history.debug('history.setHash: Hash is a state so skipping the hash set with a direct pushState call',arguments);

				// PushState
				history.pushState(State.data,State.title,State.url,false);
			}
			else if ( history.getHash() !== hash ) {
				// Hash is a proper hash, so apply it

				// Handle browser bugs
				if ( history.bugs.setHash ) {
					// Fix Safari Bug https://bugs.webkit.org/show_bug.cgi?id=56249

					// Fetch the base page
					pageUrl = history.getPageUrl();

					// Safari hash apply
					history.pushState(null,null,pageUrl+'#'+hash,false);
				}
				else {
					// Normal hash apply
					document.location.hash = hash;
				}
			}

			// Chain
			return history;
		};

		/**
		 * history.escape()
		 * normalize and Escape a Hash
		 * @return {string}
		 */
		history.escapeHash = function(hash){
			// Prepare
			var result = history.normalizeHash(hash);

			// Escape hash
			result = window.encodeURIComponent(result);

			// IE6 Escape Bug
			if ( !history.bugs.hashEscape ) {
				// Restore common parts
				result = result
					.replace(/\%21/g,'!')
					.replace(/\%26/g,'&')
					.replace(/\%3D/g,'=')
					.replace(/\%3F/g,'?');
			}

			// Return result
			return result;
		};

		/**
		 * history.getHashByUrl(url)
		 * Extracts the Hash from a URL
		 * @param {string} url
		 * @return {string} url
		 */
		history.getHashByUrl = function(url){
			// Extract the hash
			var hash = String(url)
				.replace(/([^#]*)#?([^#]*)#?(.*)/, '$2')
				;

			// Unescape hash
			hash = history.unescapeHash(hash);

			// Return hash
			return hash;
		};

		/**
		 * history.setTitle(title)
		 * Applies the title to the document
		 * @param {State} newState
		 * @return {Boolean}
		 */
		history.setTitle = function(newState){
			// Prepare
			var title = newState.title,
				firstState;

			// Initial
			if ( !title ) {
				firstState = history.getStateByIndex(0);
				if ( firstState && firstState.url === newState.url ) {
					title = firstState.title||history.options.initialTitle;
				}
			}

			// Apply
			try {
				document.getElementsByTagName('title')[0].innerHTML = title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
			}
			catch ( Exception ) { }
			document.title = title;

			// Chain
			return history;
		};


		// ====================================================================
		// Queueing

		/**
		 * history.queues
		 * The list of queues to use
		 * First In, First Out
		 */
		history.queues = [];

		/**
		 * history.busy(value)
		 * @param {boolean} value [optional]
		 * @return {boolean} busy
		 */
		history.busy = function(value){
			// Apply
			if ( typeof value !== 'undefined' ) {
				//history.debug('history.busy: changing ['+(history.busy.flag||false)+'] to ['+(value||false)+']', history.queues.length);
				history.busy.flag = value;
			}
			// Default
			else if ( typeof history.busy.flag === 'undefined' ) {
				history.busy.flag = false;
			}

			// Queue
			if ( !history.busy.flag ) {
				// Execute the next item in the queue
				clearTimeout(history.busy.timeout);
				var fireNext = function(){
					var i, queue, item;
					if ( history.busy.flag ) return;
					for ( i=history.queues.length-1; i >= 0; --i ) {
						queue = history.queues[i];
						if ( queue.length === 0 ) continue;
						item = queue.shift();
						history.fireQueueItem(item);
						history.busy.timeout = setTimeout(fireNext,history.options.busyDelay);
					}
				};
				history.busy.timeout = setTimeout(fireNext,history.options.busyDelay);
			}

			// Return
			return history.busy.flag;
		};

		/**
		 * history.busy.flag
		 */
		history.busy.flag = false;

		/**
		 * history.fireQueueItem(item)
		 * Fire a Queue Item
		 * @param {Object} item
		 * @return {Mixed} result
		 */
		history.fireQueueItem = function(item){
			return item.callback.apply(item.scope||history,item.args||[]);
		};

		/**
		 * history.pushQueue(callback,args)
		 * Add an item to the queue
		 * @param {Object} item [scope,callback,args,queue]
		 */
		history.pushQueue = function(item){
			// Prepare the queue
			history.queues[item.queue||0] = history.queues[item.queue||0]||[];

			// Add to the queue
			history.queues[item.queue||0].push(item);

			// Chain
			return history;
		};

		/**
		 * history.queue (item,queue), (func,queue), (func), (item)
		 * Either firs the item now if not busy, or adds it to the queue
		 */
		history.queue = function(item,queue){
			// Prepare
			if ( typeof item === 'function' ) {
				item = {
					callback: item
				};
			}
			if ( typeof queue !== 'undefined' ) {
				item.queue = queue;
			}

			// Handle
			if ( history.busy() ) {
				history.pushQueue(item);
			} else {
				history.fireQueueItem(item);
			}

			// Chain
			return history;
		};

		/**
		 * history.clearQueue()
		 * Clears the Queue
		 */
		history.clearQueue = function(){
			history.busy.flag = false;
			history.queues = [];
			return history;
		};


		// ====================================================================
		// IE Bug Fix

		/**
		 * history.stateChanged
		 * States whether or not the state has changed since the last double check was initialised
		 */
		history.stateChanged = false;

		/**
		 * history.doubleChecker
		 * Contains the timeout used for the double checks
		 */
		history.doubleChecker = false;

		/**
		 * history.doubleCheckComplete()
		 * Complete a double check
		 * @return {history}
		 */
		history.doubleCheckComplete = function(){
			// Update
			history.stateChanged = true;

			// Clear
			history.doubleCheckClear();

			// Chain
			return history;
		};

		/**
		 * history.doubleCheckClear()
		 * Clear a double check
		 * @return {history}
		 */
		history.doubleCheckClear = function(){
			// Clear
			if ( history.doubleChecker ) {
				clearTimeout(history.doubleChecker);
				history.doubleChecker = false;
			}

			// Chain
			return history;
		};

		/**
		 * history.doubleCheck()
		 * Create a double check
		 * @return {history}
		 */
		history.doubleCheck = function(tryAgain){
			// Reset
			history.stateChanged = false;
			history.doubleCheckClear();

			// Fix IE6,IE7 bug where calling history.back or history.forward does not actually change the hash (whereas doing it manually does)
			// Fix Safari 5 bug where sometimes the state does not change: https://bugs.webkit.org/show_bug.cgi?id=42940
			if ( history.bugs.ieDoubleCheck ) {
				// Apply Check
				history.doubleChecker = setTimeout(
					function(){
						history.doubleCheckClear();
						if ( !history.stateChanged ) {
							//history.debug('history.doubleCheck: State has not yet changed, trying again', arguments);
							// Re-Attempt
							tryAgain();
						}
						return true;
					},
					history.options.doubleCheckInterval
				);
			}

			// Chain
			return history;
		};


		// ====================================================================
		// Safari Bug Fix

		/**
		 * history.safariStatePoll()
		 * Poll the current state
		 * @return {history}
		 */
		history.safariStatePoll = function(){
			// Poll the URL

			// Get the Last State which has the new URL
			var
				urlState = history.extractState(history.getLocationHref()),
				newState;

			// Check for a difference
			if ( !history.isLastSavedState(urlState) ) {
				newState = urlState;
			}
			else {
				return;
			}

			// Check if we have a state with that url
			// If not create it
			if ( !newState ) {
				//history.debug('history.safariStatePoll: new');
				newState = history.createStateObject();
			}

			// Apply the New State
			//history.debug('history.safariStatePoll: trigger');
			history.Adapter.trigger(window,'popstate');

			// Chain
			return history;
		};


		// ====================================================================
		// State Aliases

		/**
		 * history.back(queue)
		 * Send the browser history back one item
		 * @param {Integer} queue [optional]
		 */
		history.back = function(queue){
			//history.debug('history.back: called', arguments);

			// Handle Queueing
			if ( queue !== false && history.busy() ) {
				// Wait + Push to Queue
				//history.debug('history.back: we must wait', arguments);
				history.pushQueue({
					scope: history,
					callback: history.back,
					args: arguments,
					queue: queue
				});
				return false;
			}

			// Make Busy + Continue
			history.busy(true);

			// Fix certain browser bugs that prevent the state from changing
			history.doubleCheck(function(){
				history.back(false);
			});

			// Go back
			history.go(-1);

			// End back closure
			return true;
		};

		/**
		 * history.forward(queue)
		 * Send the browser history forward one item
		 * @param {Integer} queue [optional]
		 */
		history.forward = function(queue){
			//history.debug('history.forward: called', arguments);

			// Handle Queueing
			if ( queue !== false && history.busy() ) {
				// Wait + Push to Queue
				//history.debug('history.forward: we must wait', arguments);
				history.pushQueue({
					scope: history,
					callback: history.forward,
					args: arguments,
					queue: queue
				});
				return false;
			}

			// Make Busy + Continue
			history.busy(true);

			// Fix certain browser bugs that prevent the state from changing
			history.doubleCheck(function(){
				history.forward(false);
			});

			// Go forward
			history.go(1);

			// End forward closure
			return true;
		};

		/**
		 * history.go(index,queue)
		 * Send the browser history back or forward index times
		 * @param {Integer} queue [optional]
		 */
		history.go = function(index,queue){
			//history.debug('history.go: called', arguments);

			// Prepare
			var i;

			// Handle
			if ( index > 0 ) {
				// Forward
				for ( i=1; i<=index; ++i ) {
					history.forward(queue);
				}
			}
			else if ( index < 0 ) {
				// Backward
				for ( i=-1; i>=index; --i ) {
					history.back(queue);
				}
			}
			else {
				throw new Error('history.go: history.go requires a positive or negative integer passed.');
			}

			// Chain
			return history;
		};


		// ====================================================================
		// HTML5 State Support

		// Non-Native pushState Implementation
		if ( history.emulated.pushState ) {
			/*
			 * Provide Skeleton for HTML4 Browsers
			 */

			// Prepare
			var emptyFunction = function(){};
			history.pushState = history.pushState||emptyFunction;
			history.replaceState = history.replaceState||emptyFunction;
		} // history.emulated.pushState

		// Native pushState Implementation
		else {
			/*
			 * Use native HTML5 history API Implementation
			 */

			/**
			 * history.onPopState(event,extra)
			 * Refresh the Current State
			 */
			history.onPopState = function(event,extra){
				// Prepare
				var stateId = false, newState = false, currentHash, currentState;

				// Reset the double check
				history.doubleCheckComplete();

				// Check for a Hash, and handle apporiatly
				currentHash = history.getHash();
				if ( currentHash ) {
					// Expand Hash
					currentState = history.extractState(currentHash||history.getLocationHref(),true);
					if ( currentState ) {
						// We were able to parse it, it must be a State!
						// Let's forward to replaceState
						//history.debug('history.onPopState: state anchor', currentHash, currentState);
						history.replaceState(currentState.data, currentState.title, currentState.url, false);
					}
					else {
						// Traditional Anchor
						//history.debug('history.onPopState: traditional anchor', currentHash);
						history.Adapter.trigger(window,'anchorchange');
						history.busy(false);
					}

					// We don't care for hashes
					history.expectedStateId = false;
					return false;
				}

				// Ensure
				stateId = history.Adapter.extractEventData('state',event,extra) || false;

				// Fetch State
				if ( stateId ) {
					// Vanilla: Back/forward button was used
					newState = history.getStateById(stateId);
				}
				else if ( history.expectedStateId ) {
					// Vanilla: A new state was pushed, and popstate was called manually
					newState = history.getStateById(history.expectedStateId);
				}
				else {
					// Initial State
					newState = history.extractState(history.getLocationHref());
				}

				// The State did not exist in our store
				if ( !newState ) {
					// Regenerate the State
					newState = history.createStateObject(null,null,history.getLocationHref());
				}

				// Clean
				history.expectedStateId = false;

				// Check if we are the same state
				if ( history.isLastSavedState(newState) ) {
					// There has been no change (just the page's hash has finally propagated)
					//history.debug('history.onPopState: no change', newState, history.savedStates);
					history.busy(false);
					return false;
				}

				// Store the State
				history.storeState(newState);
				history.saveState(newState);

				// Force update of the title
				history.setTitle(newState);

				// Fire Our Event
				history.Adapter.trigger(window,'statechange');
				history.busy(false);

				// Return true
				return true;
			};
			history.Adapter.bind(window,'popstate',history.onPopState);

			/**
			 * history.pushState(data,title,url)
			 * Add a new State to the history object, become it, and trigger onpopstate
			 * We have to trigger for HTML4 compatibility
			 * @param {object} data
			 * @param {string} title
			 * @param {string} url
			 * @return {true}
			 */
			history.pushState = function(data,title,url,queue){
				//history.debug('history.pushState: called', arguments);

				// Check the State
				if ( history.getHashByUrl(url) && history.emulated.pushState ) {
					throw new Error('history.js does not support states with fragement-identifiers (hashes/anchors).');
				}

				// Handle Queueing
				if ( queue !== false && history.busy() ) {
					// Wait + Push to Queue
					//history.debug('history.pushState: we must wait', arguments);
					history.pushQueue({
						scope: history,
						callback: history.pushState,
						args: arguments,
						queue: queue
					});
					return false;
				}

				// Make Busy + Continue
				history.busy(true);

				// Create the newState
				var newState = history.createStateObject(data,title,url);

				// Check it
				if ( history.isLastSavedState(newState) ) {
					// Won't be a change
					history.busy(false);
				}
				else {
					// Store the newState
					history.storeState(newState);
					history.expectedStateId = newState.id;

					// Push the newState
					history.pushState(newState.id,newState.title,newState.url);

					// Fire HTML5 Event
					history.Adapter.trigger(window,'popstate');
				}

				// End pushState closure
				return true;
			};

			/**
			 * history.replaceState(data,title,url)
			 * Replace the State and trigger onpopstate
			 * We have to trigger for HTML4 compatibility
			 * @param {object} data
			 * @param {string} title
			 * @param {string} url
			 * @return {true}
			 */
			history.replaceState = function(data,title,url,queue){
				//history.debug('history.replaceState: called', arguments);

				// Check the State
				if ( history.getHashByUrl(url) && history.emulated.pushState ) {
					throw new Error('history.js does not support states with fragement-identifiers (hashes/anchors).');
				}

				// Handle Queueing
				if ( queue !== false && history.busy() ) {
					// Wait + Push to Queue
					//history.debug('history.replaceState: we must wait', arguments);
					history.pushQueue({
						scope: history,
						callback: history.replaceState,
						args: arguments,
						queue: queue
					});
					return false;
				}

				// Make Busy + Continue
				history.busy(true);

				// Create the newState
				var newState = history.createStateObject(data,title,url);

				// Check it
				if ( history.isLastSavedState(newState) ) {
					// Won't be a change
					history.busy(false);
				}
				else {
					// Store the newState
					history.storeState(newState);
					history.expectedStateId = newState.id;

					// Push the newState
					history.replaceState(newState.id,newState.title,newState.url);

					// Fire HTML5 Event
					history.Adapter.trigger(window,'popstate');
				}

				// End replaceState closure
				return true;
			};

		} // !history.emulated.pushState


		// ====================================================================
		// Initialise

		/**
		 * Load the Store
		 */
		if ( sessionStorage ) {
			// Fetch
			try {
				history.store = JSON.parse(sessionStorage.getItem('history.store'))||{};
			}
			catch ( err ) {
				history.store = {};
			}

			// Normalize
			history.normalizeStore();
		}
		else {
			// Default Load
			history.store = {};
			history.normalizeStore();
		}

		/**
		 * Clear Intervals on exit to prevent memory leaks
		 */
		history.Adapter.bind(window,"unload",history.clearAllIntervals);

		/**
		 * Create the initial State
		 */
		history.saveState(history.storeState(history.extractState(history.getLocationHref(),true)));

		/**
		 * Bind for Saving Store
		 */
		if ( sessionStorage ) {
			// When the page is closed
			history.onUnload = function(){
				// Prepare
				var	currentStore, item, currentStoreString;

				// Fetch
				try {
					currentStore = JSON.parse(sessionStorage.getItem('history.store'))||{};
				}
				catch ( err ) {
					currentStore = {};
				}

				// Ensure
				currentStore.idToState = currentStore.idToState || {};
				currentStore.urlToId = currentStore.urlToId || {};
				currentStore.stateToId = currentStore.stateToId || {};

				// Sync
				for ( item in history.idToState ) {
					if ( !history.idToState.hasOwnProperty(item) ) {
						continue;
					}
					currentStore.idToState[item] = history.idToState[item];
				}
				for ( item in history.urlToId ) {
					if ( !history.urlToId.hasOwnProperty(item) ) {
						continue;
					}
					currentStore.urlToId[item] = history.urlToId[item];
				}
				for ( item in history.stateToId ) {
					if ( !history.stateToId.hasOwnProperty(item) ) {
						continue;
					}
					currentStore.stateToId[item] = history.stateToId[item];
				}

				// Update
				history.store = currentStore;
				history.normalizeStore();

				// In Safari, going into Private Browsing mode causes the
				// Session Storage object to still exist but if you try and use
				// or set any property/function of it it throws the exception
				// "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to
				// add something to storage that exceeded the quota." infinitely
				// every second.
				currentStoreString = JSON.stringify(currentStore);
				try {
					// Store
					sessionStorage.setItem('history.store', currentStoreString);
				}
				catch (e) {
					if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
						if (sessionStorage.length) {
							// Workaround for a bug seen on iPads. Sometimes the quota exceeded error comes up and simply
							// removing/resetting the storage can work.
							sessionStorage.removeItem('history.store');
							sessionStorage.setItem('history.store', currentStoreString);
						} else {
							// Otherwise, we're probably private browsing in Safari, so we'll ignore the exception.
						}
					} else {
						throw e;
					}
				}
			};

			// For Internet Explorer
			history.intervalList.push(setInterval(history.onUnload,history.options.storeInterval));

			// For Other Browsers
			history.Adapter.bind(window,'beforeunload',history.onUnload);
			history.Adapter.bind(window,'unload',history.onUnload);

			// Both are enabled for consistency
		}

		// Non-Native pushState Implementation
		if ( !history.emulated.pushState ) {
			// Be aware, the following is only for native pushState implementations
			// If you are wanting to include something for all browsers
			// Then include it above this if block

			/**
			 * Setup Safari Fix
			 */
			if ( history.bugs.safariPoll ) {
				history.intervalList.push(setInterval(history.safariStatePoll, history.options.safariPollInterval));
			}

			/**
			 * Ensure Cross Browser Compatibility
			 */
			if ( navigator.vendor === 'Apple Computer, Inc.' || (navigator.appCodeName||'') === 'Mozilla' ) {
				/**
				 * Fix Safari HashChange Issue
				 */

				// Setup Alias
				history.Adapter.bind(window,'hashchange',function(){
					history.Adapter.trigger(window,'popstate');
				});

				// Initialise Alias
				if ( history.getHash() ) {
					history.Adapter.onDomLoad(function(){
						history.Adapter.trigger(window,'hashchange');
					});
				}
			}

		} // !history.emulated.pushState


	}; // history.initCore

	// Try to Initialise history
	if (!history.options || !history.options.delayInit) {
		history.init();
	}

})(window);
