/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 104);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-css/showHide,-css/hiddenVisibleSelectors
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-07-21T05:55Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-css/showHide,-css/hiddenVisibleSelectors",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var documentElement = document.documentElement;



/*
 * Optional (non-Sizzle) selector module for custom builds.
 *
 * Note that this DOES NOT SUPPORT many documented jQuery
 * features in exchange for its smaller size:
 *
 * Attribute not equal selector
 * Positional selectors (:first; :eq(n); :odd; etc.)
 * Type selectors (:input; :checkbox; :button; etc.)
 * State-based selectors (:animated; :visible; :hidden; etc.)
 * :has(selector)
 * :not(complex selector)
 * custom selectors via Sizzle extensions
 * Leading combinators (e.g., $collection.find("> *"))
 * Reliable functionality on XML fragments
 * Requiring all parts of a selector to match elements under context
 *   (e.g., $div.find("div > *") now matches children of $div)
 * Matching against non-elements
 * Reliable sorting of disconnected nodes
 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
 *
 * If any of these are unacceptable tradeoffs, either use Sizzle or
 * customize this stub for the project's specific needs.
 */

var hasDuplicate, sortInput,
	sortStable = jQuery.expando.split( "" ).sort( sortOrder ).join( "" ) === jQuery.expando,
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.mozMatchesSelector ||
		documentElement.oMatchesSelector ||
		documentElement.msMatchesSelector,

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	};

function sortOrder( a, b ) {

	// Flag for duplicate removal
	if ( a === b ) {
		hasDuplicate = true;
		return 0;
	}

	// Sort on method existence if only one input has compareDocumentPosition
	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	if ( compare ) {
		return compare;
	}

	// Calculate position if both inputs belong to the same document
	compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
		a.compareDocumentPosition( b ) :

		// Otherwise we know they are disconnected
		1;

	// Disconnected nodes
	if ( compare & 1 ) {

		// Choose the first element that is related to our preferred document
		if ( a === document || a.ownerDocument === document &&
			jQuery.contains( document, a ) ) {
			return -1;
		}
		if ( b === document || b.ownerDocument === document &&
			jQuery.contains( document, b ) ) {
			return 1;
		}

		// Maintain original order
		return sortInput ?
			( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
			0;
	}

	return compare & 4 ? -1 : 1;
}

function uniqueSort( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	hasDuplicate = false;
	sortInput = !sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
}

function escape( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
}

jQuery.extend( {
	uniqueSort: uniqueSort,
	unique: uniqueSort,
	escapeSelector: escape,
	find: function( selector, context, results, seed ) {
		var elem, nodeType,
			i = 0;

		results = results || [];
		context = context || document;

		// Same basic safeguard as Sizzle
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		// Early return if context is not an element or document
		if ( ( nodeType = context.nodeType ) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( seed ) {
			while ( ( elem = seed[ i++ ] ) ) {
				if ( jQuery.find.matchesSelector( elem, selector ) ) {
					results.push( elem );
				}
			}
		} else {
			jQuery.merge( results, context.querySelectorAll( selector ) );
		}

		return results;
	},
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

			// Use textContent for elements
			return elem.textContent;
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},
	contains: function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains( bup ) );
	},
	isXMLDoc: function( elem ) {

		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && ( elem.ownerDocument || elem ).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	},
	expr: {
		attrHandle: {},
		match: {
			bool: new RegExp( "^(?:checked|selected|async|autofocus|autoplay|controls|defer" +
				"|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i" ),
			needsContext: /^[\x20\t\r\n\f]*[>+~]/
		}
	}
} );

jQuery.extend( jQuery.find, {
	matches: function( expr, elements ) {
		return jQuery.find( expr, null, null, elements );
	},
	matchesSelector: function( elem, expr ) {
		return matches.call( elem, expr );
	},
	attr: function( elem, name ) {
		var fn = jQuery.expr.attrHandle[ name.toLowerCase() ],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			value = fn && hasOwn.call( jQuery.expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, jQuery.isXMLDoc( elem ) ) :
				undefined;
		return value !== undefined ? value : elem.getAttribute( name );
	}
} );



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "5px";

		// Support: IE 9 only
		// Detect misreporting of content dimensions for border-box elements (gh-3699)
		borderBoxReliableVal = divStyle.width[ 0 ] === "5";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "5px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, borderBoxReliableVal, pixelMarginRightVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:10px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		borderBoxReliable: function() {
			computeStyleTests();
			return borderBoxReliableVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && !support.borderBoxReliable() ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





var readyCallbacks = [],
	whenReady = function( fn ) {
		readyCallbacks.push( fn );
	},
	executeReady = function( fn ) {

		// Prevent errors from freezing future callback execution (gh-1823)
		// Not backwards-compatible as this does not execute sync
		window.setTimeout( function() {
			fn.call( document, jQuery );
		} );
	};

jQuery.fn.ready = function( fn ) {
	whenReady( fn );
	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		whenReady = function( fn ) {
			readyCallbacks.push( fn );

			while ( readyCallbacks.length ) {
				fn = readyCallbacks.shift();
				if ( jQuery.isFunction( fn ) ) {
					executeReady( fn );
				}
			}
		};

		whenReady();
	}
} );

// Make jQuery.ready Promise consumable (gh-1778)
jQuery.ready.then = jQuery.fn.ready;

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE9-10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}



return jQuery;
} );


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module AX6Util
 */

var _toString = Object.prototype.toString;
var reIsJson = /^(["'](\\.|[^"\\\n\r])*?["']|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/,
    reMs = /^-ms-/,
    reSnakeCase = /[\-_]([\da-z])/gi,
    reCamelCase = /([A-Z])/g,
    reDot = /\./,
    reInt = /[-|+]?[\D]/gi,
    reNotNum = /\D/gi,
    reMoneySplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
    reAmp = /&/g,
    reEq = /=/,
    reClassNameSplit = /[ ]+/g;

function each(O, _fn) {
  if (isNothing(O)) return [];
  var key = void 0,
      i = 0,
      l = O.length,
      isObj = l === undefined || typeof O === "function";
  if (isObj) {
    for (key in O) {
      if (typeof O[key] != "undefined") if (_fn.call(O[key], key, O[key]) === false) break;
    }
  } else {
    for (; i < l;) {
      if (typeof O[i] != "undefined") if (_fn.call(O[i], i, O[i++]) === false) break;
    }
  }
  return O;
}

function search(O, _fn) {
  if (isNothing(O)) return -1;
  if (isObject(O)) {
    for (var key in O) {
      if (typeof O[key] != "undefined" && isFunction(_fn) && _fn.call(O[key], key, O[key])) {
        return key;
        break;
      } else if (O[key] == _fn) {
        return key;
        break;
      }
    }
  } else {
    for (var i = 0, l = O.length; i < l; i++) {
      if (typeof O[i] != "undefined" && isFunction(_fn) && _fn.call(O[i], i, O[i])) {
        return i;
        break;
      } else if (O[i] == _fn) {
        return i;
        break;
      }
    }
  }
  return -1;
}

function filter(O, _fn) {
  if (isNothing(O)) return [];
  var k = void 0,
      i = 0,
      l = O.length,
      results = [],
      fnResult = void 0;
  if (isObject(O)) {
    for (k in O) {
      if (typeof O[k] != "undefined") {
        if (fnResult = _fn.call(O[k], k, O[k])) results.push(O[k]);
      }
    }
  } else {
    for (; i < l;) {
      if (typeof O[i] != "undefined") {
        if (fnResult = _fn.call(O[i], i, O[i])) results.push(O[i]);
        i++;
      }
    }
  }
  return results;
}

function toJson(O) {
  var jsonString = "";
  if (isArray(O)) {
    var i = 0,
        l = O.length;
    jsonString += "[";
    for (; i < l; i++) {
      if (i > 0) jsonString += ",";
      jsonString += toJson(O[i]);
    }
    jsonString += "]";
  } else if (isObject(O)) {
    jsonString += "{";
    var jsonObjectBody = [];
    each(O, function (key, value) {
      jsonObjectBody.push('"' + key + '": ' + toJson(value));
    });
    jsonString += jsonObjectBody.join(", ");
    jsonString += "}";
  } else if (isString(O)) {
    jsonString = '"' + O + '"';
  } else if (isNumber(O)) {
    jsonString = O;
  } else if (isUndefined(O)) {
    jsonString = "undefined";
  } else if (isFunction(O)) {
    jsonString = '"{Function}"';
  } else {
    jsonString = O;
  }
  return jsonString;
}

function parseJson(str, force) {
  if (force || reIsJson.test(str)) {
    try {
      return new Function('', 'return ' + str)();
    } catch (e) {
      return { error: 500, msg: 'syntax error' };
    }
  } else {
    return { error: 500, msg: 'syntax error' };
  }
}

function getType(O) {
  var typeName = void 0;
  if (O != null && O == O.window) {
    typeName = "window";
  } else if (!!(O && O.nodeType == 1)) {
    typeName = "element";
  } else if (!!(O && O.nodeType == 11)) {
    typeName = "fragment";
  } else if (O === null) {
    typeName = "null";
  } else if (typeof O === "undefined") {
    typeName = "undefined";
  } else if (_toString.call(O) == "[object Object]") {
    typeName = "object";
  } else if (_toString.call(O) == "[object Array]") {
    typeName = "array";
  } else if (_toString.call(O) == "[object String]") {
    typeName = "string";
  } else if (_toString.call(O) == "[object Number]") {
    typeName = "number";
  } else if (_toString.call(O) == "[object NodeList]") {
    typeName = "nodelist";
  } else if (typeof O === "function") {
    typeName = "function";
  }
  return typeName;
}

function isWindow(O) {
  return O != null && O == O.window;
}

function isElement(O) {
  return !!(O && (O.nodeType == 1 || O.nodeType == 11));
}

function isObject(O) {
  return _toString.call(O) == "[object Object]";
}

function isArray(O) {
  return _toString.call(O) == "[object Array]";
}

function isFunction(O) {
  return typeof O === "function";
}

function isString(O) {
  return _toString.call(O) == "[object String]";
}

function isNumber(O) {
  return _toString.call(O) == "[object Number]";
}

function isNodelist(O) {
  return !!(_toString.call(O) == "[object NodeList]" || typeof O !== "undefined" && O && O[0] && O[0].nodeType == 1);
}

function isUndefined(O) {
  return typeof O === "undefined";
}

function isNothing(O) {
  return typeof O === "undefined" || O === null || O === "";
}

function isDate(O) {
  return O instanceof Date && !isNaN(O.valueOf());
}

function isDateFormat(O) {
  var result = false;

  if (!O) {} else if (O instanceof Date && !isNaN(O.valueOf())) {
    result = true;
  } else {
    if (O.length > 7) {
      if (date(O) instanceof Date) {
        return true;
      }
    }
    O = O.replace(/\D/g, '');
    if (O.length > 7) {
      var mm = O.substr(4, 2),
          dd = O.substr(6, 2);

      O = date(O);
      if (O.getMonth() == mm - 1 && O.getDate() == dd) {
        result = true;
      }
    }
  }
  return result;
}

function first(O) {
  if (isObject(O)) {
    var keys = Object.keys(O);
    var item = {};
    item[keys[0]] = O[keys[0]];
    return item;
  } else if (isArray(O)) {
    return O[0];
  } else {
    console.error("AX6Util.object.first", "argument type error");
    return undefined;
  }
}

function last(O) {
  if (isObject(O)) {
    var keys = Object.keys(O);
    var item = {};
    item[keys[keys.length - 1]] = O[keys[keys.length - 1]];
    return item;
  } else if (isArray(O)) {
    return O[O.length - 1];
  } else {
    console.error("AX6Util.object.last", "argument type error");
    return undefined;
  }
}

function setCookie(cn, cv, exdays, opts) {
  var expire = void 0;
  if (typeof exdays === "number") {
    expire = new Date();
    expire.setDate(expire.getDate() + exdays);
  }
  opts = opts || {};
  return doc.cookie = [escape(cn), '=', escape(cv), expire ? "; expires=" + expire.toUTCString() : "", // use expires attribute, max-age is not supported by IE
  opts.path ? "; path=" + opts.path : "", opts.domain ? "; domain=" + opts.domain : "", opts.secure ? "; secure" : ""].join("");
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = doc.cookie.split(';'),
      i = 0,
      l = ca.length;
  for (; i < l; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
  }
  return "";
}

function alert(O) {
  win.alert(toJson(O));
  return O;
}

function left(str, pos) {
  if (typeof str === "undefined" || typeof pos === "undefined") return "";
  if (isString(pos)) {
    return str.indexOf(pos) > -1 ? str.substr(0, str.indexOf(pos)) : "";
  } else if (isNumber(pos)) {
    return str.substr(0, pos);
  } else {
    return "";
  }
}

function right(str, pos) {
  if (typeof str === "undefined" || typeof pos === "undefined") return "";
  str = '' + str;
  if (isString(pos)) {
    return str.lastIndexOf(pos) > -1 ? str.substr(str.lastIndexOf(pos) + 1) : "";
  } else if (isNumber(pos)) {
    return str.substr(str.length - pos);
  } else {
    return "";
  }
}

function camelCase(str) {
  return str.replace(reMs, "ms-").replace(reSnakeCase, function (all, letter) {
    return letter.toUpperCase();
  });
}

function snakeCase(str) {
  return camelCase(str).replace(reCamelCase, function (all, letter) {
    return "-" + letter.toLowerCase();
  });
}

function number(str, cond) {
  var result = void 0,
      pair = ('' + str).split(reDot),
      isMinus = void 0,
      returnValue = void 0;

  isMinus = Number(pair[0].replace(/,/g, "")) < 0 || pair[0] == "-0";
  returnValue = 0.0;
  pair[0] = pair[0].replace(reInt, "");

  if (pair[1]) {
    pair[1] = pair[1].replace(reNotNum, "");
    returnValue = Number(pair[0] + "." + pair[1]) || 0;
  } else {
    returnValue = Number(pair[0]) || 0;
  }
  result = isMinus ? -returnValue : returnValue;

  each(cond, function (k, c) {
    if (k == "round") {
      if (isNumber(c)) {
        if (c < 0) {
          result = +(Math.round(result + "e-" + Math.abs(c)) + "e+" + Math.abs(c));
        } else {
          result = +(Math.round(result + "e+" + c) + "e-" + c);
        }
      } else {
        result = Math.round(result);
      }
    }
    if (k == "floor") {
      result = Math.floor(result);
    }
    if (k == "ceil") {
      result = Math.ceil(result);
    } else if (k == "money") {
      result = function (val) {
        var txtNumber = '' + val;
        if (isNaN(txtNumber) || txtNumber == "") {
          return "";
        } else {
          var arrNumber = txtNumber.split('.');
          arrNumber[0] += '.';
          do {
            arrNumber[0] = arrNumber[0].replace(reMoneySplit, '$1,$2');
          } while (reMoneySplit.test(arrNumber[0]));
          if (arrNumber.length > 1) {
            return arrNumber.join('');
          } else {
            return arrNumber[0].split('.')[0];
          }
        }
      }(result);
    } else if (k == "abs") {
      result = Math.abs(Number(result));
    } else if (k == "byte") {
      result = function (val) {
        val = Number(result);
        var nUnit = "KB";
        var myByte = val / 1024;
        if (myByte / 1024 > 1) {
          nUnit = "MB";
          myByte = myByte / 1024;
        }
        if (myByte / 1024 > 1) {
          nUnit = "GB";
          myByte = myByte / 1024;
        }
        return number(myByte, { round: 1 }) + nUnit;
      }(result);
    }
  });

  return result;
}

function toArray(O) {
  if (typeof O.length != "undefined") return Array.prototype.slice.call(O);
  return [];
}

function param(O, cond) {
  var p;
  if (isString(O) && typeof cond !== "undefined" && cond == "param") {
    return O;
  } else if (isString(O) && typeof cond !== "undefined" && cond == "object" || isString(O) && typeof cond === "undefined") {
    p = {};
    each(O.split(reAmp), function () {
      var item = this.split(reEq);
      if (!p[item[0]]) p[item[0]] = item[1];else {
        if (isString(p[item[0]])) p[item[0]] = [p[item[0]]];
        p[item[0]].push(item[1]);
      }
    });
    return p;
  } else {
    p = [];
    each(O, function (k, v) {
      p.push(k + "=" + escape(v));
    });
    return p.join('&');
  }
}

function encode(s) {
  return encodeURIComponent(s);
}

function decode(s) {
  return decodeURIComponent(s);
}

function error() {
  _AX6Info2.default.onerror.apply(this, arguments);
}

function localDate(yy, mm, dd, hh, mi, ss) {
  var utcD, localD;
  localD = new Date();
  if (mm < 0) mm = 0;
  if (typeof hh === "undefined") hh = 12;
  if (typeof mi === "undefined") mi = 0;
  utcD = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));

  if (mm == 0 && dd == 1 && utcD.getUTCHours() + utcD.getTimezoneOffset() / 60 < 0) {
    utcD.setUTCHours(0);
  } else {
    utcD.setUTCHours(utcD.getUTCHours() + utcD.getTimezoneOffset() / 60);
  }
  return utcD;
}

function date(d, cond) {
  var yy = void 0,
      mm = void 0,
      dd = void 0,
      hh = void 0,
      mi = void 0,
      aDateTime = void 0,
      aTimes = void 0,
      aTime = void 0,
      aDate = void 0,
      va = void 0,
      ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i,
      ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  if (isString(d)) {
    if (d.length == 0) {
      d = new Date();
    } else if (d.length > 15) {
      if (ISO_8601_FULL.test(d) || ISO_8601.test(d)) {
        d = new Date(d);
      } else {
        aDateTime = d.split(/ /g), aTimes, aTime, aDate = aDateTime[0].split(/\D/g), yy = aDate[0];
        mm = parseFloat(aDate[1]);
        dd = parseFloat(aDate[2]);
        aTime = aDateTime[1] || "09:00";
        aTimes = aTime.substring(0, 5).split(":");
        hh = parseFloat(aTimes[0]);
        mi = parseFloat(aTimes[1]);
        if (right(aTime, 2) === "AM" || right(aTime, 2) === "PM") hh += 12;
        d = localDate(yy, mm - 1, dd, hh, mi);
      }
    } else if (d.length == 14) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, number(va.substr(6, 2)), number(va.substr(8, 2)), number(va.substr(10, 2)), number(va.substr(12, 2)));
    } else if (d.length > 7) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, number(va.substr(6, 2)));
    } else if (d.length > 4) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
    } else if (d.length > 2) {
      va = d.replace(/\D/g, "");
      return localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
    } else {
      d = new Date();
    }
  }
  if (typeof cond === "undefined" || typeof d === "undefined") {
    return d;
  } else {
    if ("add" in cond) {
      d = function (_d, opts) {
        var yy = void 0,
            mm = void 0,
            dd = void 0,
            mxdd = void 0,
            DyMilli = 1000 * 60 * 60 * 24;

        if (typeof opts["d"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["d"] * DyMilli);
        } else if (typeof opts["m"] !== "undefined") {
          yy = _d.getFullYear();
          mm = _d.getMonth();
          dd = _d.getDate();
          yy = yy + parseInt(opts["m"] / 12);
          mm += opts["m"] % 12;
          mxdd = daysOfMonth(yy, mm);
          if (mxdd < dd) dd = mxdd;
          _d = new Date(yy, mm, dd, 12);
        } else if (typeof opts["y"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["y"] * 365 * DyMilli);
        } else if (typeof opts["h"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["h"] * 1000 * 60 * 60);
        }

        return _d;
      }(new Date(d), cond["add"]);
    }
    if ("set" in cond) {
      d = function (_d, opts) {
        var yy = void 0,
            mm = void 0,
            dd = void 0,
            processor = {
          "firstDayOfMonth": function firstDayOfMonth(date) {
            yy = date.getFullYear();
            mm = date.getMonth();
            dd = 1;
            return new Date(yy, mm, dd, 12);
          },
          "lastDayOfMonth": function lastDayOfMonth(date) {
            yy = date.getFullYear();
            mm = date.getMonth();
            dd = daysOfMonth(yy, mm);
            return new Date(yy, mm, dd, 12);
          }
        };
        if (opts in processor) {
          return processor[opts](_d);
        } else {
          return _d;
        }
      }(new Date(d), cond["set"]);
    }
    if ("return" in cond) {
      return function () {

        var fStr = cond["return"],
            nY = void 0,
            nM = void 0,
            nD = void 0,
            nH = void 0,
            nMM = void 0,
            nS = void 0,
            nDW = void 0,
            yre = void 0,
            regY = void 0,
            mre = void 0,
            regM = void 0,
            dre = void 0,
            regD = void 0,
            hre = void 0,
            regH = void 0,
            mire = void 0,
            regMI = void 0,
            sre = void 0,
            regS = void 0,
            dwre = void 0,
            regDW = void 0;

        nY = d.getUTCFullYear();
        nM = setDigit(d.getMonth() + 1, 2);
        nD = setDigit(d.getDate(), 2);
        nH = setDigit(d.getHours(), 2);
        nMM = setDigit(d.getMinutes(), 2);
        nS = setDigit(d.getSeconds(), 2);
        nDW = d.getDay();

        yre = /[^y]*(yyyy)[^y]*/gi;
        yre.exec(fStr);
        regY = RegExp.$1;
        mre = /[^m]*(MM)[^m]*/g;
        mre.exec(fStr);
        regM = RegExp.$1;
        dre = /[^d]*(dd)[^d]*/gi;
        dre.exec(fStr);
        regD = RegExp.$1;
        hre = /[^h]*(hh)[^h]*/gi;
        hre.exec(fStr);
        regH = RegExp.$1;
        mire = /[^m]*(mm)[^i]*/g;
        mire.exec(fStr);
        regMI = RegExp.$1;
        sre = /[^s]*(ss)[^s]*/gi;
        sre.exec(fStr);
        regS = RegExp.$1;
        dwre = /[^d]*(dw)[^w]*/gi;
        dwre.exec(fStr);
        regDW = RegExp.$1;

        if (regY === "yyyy") {
          fStr = fStr.replace(regY, right(nY, regY.length));
        }
        if (regM === "MM") {
          if (regM.length == 1) nM = d.getMonth() + 1;
          fStr = fStr.replace(regM, nM);
        }
        if (regD === "dd") {
          if (regD.length == 1) nD = d.getDate();
          fStr = fStr.replace(regD, nD);
        }
        if (regH === "hh") {
          fStr = fStr.replace(regH, nH);
        }
        if (regMI === "mm") {
          fStr = fStr.replace(regMI, nMM);
        }
        if (regS === "ss") {
          fStr = fStr.replace(regS, nS);
        }
        if (regDW == "dw") {
          fStr = fStr.replace(regDW, _AX6Info2.default.weekNames[nDW].label);
        }
        return fStr;
      }();
    } else {
      return d;
    }
  }
}

function dday(d, cond) {
  var memoryDay = date(d),
      DyMilli = 1000 * 60 * 60 * 24,
      today = new Date(),
      diffnum = void 0,
      thisYearMemoryDay = void 0;

  function getDayTime(_d) {
    return Math.floor(_d.getTime() / DyMilli) * DyMilli;
  }

  if (typeof cond === "undefined") {
    diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    return diffnum;
  } else {
    diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    if (cond["today"]) {
      today = date(cond.today);
      diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    }
    if (cond["thisYear"]) {
      thisYearMemoryDay = new Date(today.getFullYear(), memoryDay.getMonth(), memoryDay.getDate());
      diffnum = number((getDayTime(thisYearMemoryDay) - getDayTime(today)) / DyMilli, { floor: true });
      if (diffnum < 0) {
        thisYearMemoryDay = new Date(today.getFullYear() + 1, memoryDay.getMonth(), memoryDay.getDate());
        diffnum = number((getDayTime(thisYearMemoryDay) - getDayTime(today)) / DyMilli, { floor: true });
      }
    }
    if (cond["age"]) {
      thisYearMemoryDay = new Date(today.getFullYear(), memoryDay.getMonth(), memoryDay.getDate());
      diffnum = thisYearMemoryDay.getFullYear() - memoryDay.getFullYear();
    }

    return diffnum;
  }
}

function weeksOfMonth(d) {
  var myDate = date(d);
  return {
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    count: parseInt(myDate.getDate() / 7 + 1)
  };
}

function daysOfMonth(y, m) {
  if (m == 3 || m == 5 || m == 8 || m == 10) {
    return 30;
  } else if (m == 1) {
    return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
  } else {
    return 31;
  }
}

function setDigit(num, length, padder, radix) {
  var s = num.toString(radix || 10);
  return times(padder || '0', length - s.length) + s;
}

function times(s, count) {
  return count < 1 ? '' : new Array(count + 1).join(s);
}

function findParentNode(_target, cond) {
  if (_target) {
    while (function () {
      var result = true;
      if (typeof cond === "undefined") {
        _target = _target.parentNode ? _target.parentNode : false;
      } else if (isFunction(cond)) {
        result = cond(_target);
      } else if (isObject(cond)) {
        for (var k in cond) {
          if (k === "tagname") {
            if (_target.tagName.toLocaleLowerCase() != cond[k]) {
              result = false;
              break;
            }
          } else if (k === "clazz" || k === "class_name") {
            if ("className" in _target) {
              var klasss = _target.className.split(reClassNameSplit),
                  hasClass = false;

              for (var a = 0; a < klasss.length; a++) {
                if (klasss[a] == cond[k]) {
                  hasClass = true;
                  break;
                }
              }
              result = hasClass;
            } else {
              result = false;
              break;
            }
          } else {
            // 그외 속성값들.
            if (_target.getAttribute) {
              if (_target.getAttribute(k) != cond[k]) {
                result = false;
                break;
              }
            } else {
              result = false;
              break;
            }
          }
        }
      }
      return !result;
    }()) {
      if (_target.parentNode && _target.parentNode.parentNode) {
        _target = _target.parentNode;
      } else {
        _target = false;
        break;
      }
    }
  }
  return _target;
}

function cssNumber(val) {
  var re = /\D?(\d+)([a-zA-Z%]*)/i,
      found = ('' + val).match(re),
      unit = found[2] || "px";

  return found[1] + unit;
}

function css(val) {
  var returns = void 0;
  if (isObject(val)) {
    returns = '';
    for (var k in val) {
      returns += k + ':' + val[k] + ';';
    }
    return returns;
  } else if (isString(val)) {
    returns = {};
    var valSplited = val.split(/[ ]*;[ ]*/g);
    valSplited.forEach(function (v) {
      if ((v = v.trim()) !== "") {
        var vSplited = v.split(/[ ]*:[ ]*/g);
        returns[vSplited[0]] = vSplited[1];
      }
    });
    return returns;
  }
}

function stopEvent(e) {
  // 이벤트 중지 구문
  if (!e) e = window.event;

  //e.cancelBubble is supported by IE -
  // this will kill the bubbling process.
  e.cancelBubble = true;
  e.returnValue = false;

  //e.stopPropagation works only in Firefox.
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();

  return false;
  // 이벤트 중지 구문 끝
}

var selectRange = function () {
  var processor = {
    'textRange': {
      'selectAll': function selectAll(el, range, offset) {},
      'arr': function arr(el, range, offset) {
        range.moveStart("character", offset[0]); // todo ie node select 체크필요
        range.collapse();
        range.moveEnd("character", offset[1]);
      },
      'start': function start(el, range, offset) {
        range.moveStart("character", 0);
        range.collapse();
      },
      'end': function end(el, range, offset) {
        range.moveStart("character", range.text.length);
        range.collapse();
      }
    },
    'range': {
      'selectAll': function selectAll(el, range, offset) {
        range.selectNodeContents(el);
      },
      'arr': function arr(el, range, offset) {
        if (isObject(offset[0])) {
          range.setStart(offset[0].node, offset[0].offset);
          range.setEnd(offset[1].node, offset[1].offset);
        } else {
          range.setStart(el.firstChild, offset[0]);
          range.setEnd(el.firstChild, offset[1]);
        }
      },
      'start': function start(el, range, offset) {
        range.selectNodeContents(el);
        range.collapse(true);
      },
      'end': function end(el, range, offset) {
        range.selectNodeContents(el);
        range.collapse(false);
      }
    }
  };
  return function (el, offset) {
    var range = void 0,
        rangeType = void 0,
        selection = void 0;

    if (el instanceof jQuery) {
      el = el.get(0);
    }
    if (!el) return;

    // 레인지 타입 선택
    if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(el);
      rangeType = "textRange";
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      rangeType = "range";
    }

    // range 적용
    if (typeof offset == "undefined") {
      processor[rangeType].selectAll.call(this, el, range, offset);
    } else if (isArray(offset)) {
      processor[rangeType].arr.call(this, el, range, offset);
    } else {
      for (var key in processor[rangeType]) {
        if (offset == key) {
          processor[rangeType][key].call(this, el, range, offset);
          break;
        }
      }
    }

    // 포커스 및 셀렉트
    if (doc.body.createTextRange) {
      range.select();
      el.focus();
    } else if (window.getSelection) {
      el.focus();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
}();

// https://github.com/lodash/lodash/blob/master/debounce.js
var debounce = function debounce(func, wait, options) {
  var lastArgs = void 0,
      lastThis = void 0,
      maxWait = void 0,
      result = void 0,
      timerId = void 0,
      lastCallTime = void 0;

  var lastInvokeTime = 0;
  var leading = false;
  var maxing = false;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs;
    var thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var result = wait - timeSinceLastCall;

    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced() {
    var time = Date.now();
    var isInvoking = shouldInvoke(time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};

//https://github.com/lodash/lodash/blob/master/throttle.js
var throttle = function throttle(func, wait, options) {
  var leading = true;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
};

function deepCopy(obj) {
  var r = void 0,
      l = void 0;
  if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == 'object') {
    if (isArray(obj)) {
      l = obj.length;
      r = new Array(l);
      for (var i = 0; i < l; i++) {
        r[i] = deepCopy(obj[i]);
      }
      return r;
    } else {
      return Object.assign({}, obj);
    }
  }
  return obj;
}

function escapeHtml(s) {
  if (_toString.call(s) != "[object String]") return s;
  if (!s) return "";
  return s.replace(/[\<\>\&\"]/gm, function (match) {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
      default:
        return match;
    }
  });
}

function unescapeHtml(s) {
  if (_toString.call(s) != "[object String]") return s;
  if (!s) return "";
  return s.replace(/(&lt;)|(&gt;)|(&amp;)|(&quot;)/gm, function (match) {
    switch (match) {
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      case "&amp;":
        return "&";
      case "&quot;":
        return "\"";
      default:
        return match;
    }
  });
}

/**
 * @namespace ax6string
 * @example
 * ```js
 * AX6Util.string("{0} is dead").format("A");
 * AX6Util.string("String").escape();
 * AX6Util.string("String").unescape();
 * AX6Util.string("String").encode();
 * AX6Util.string("String").decode();
 * AX6Util.string("String").left(1);
 * AX6Util.string("String").right(1);
 * AX6Util.string("String").camelCase();
 * AX6Util.string("String").snakeCase();
 * ```
 */

function string(_string) {
  return new function (_string) {
    this.value = _string;
    this.toString = function () {
      return this.value;
    };
    this.format = function () {
      var args = [];
      for (var i = 0, l = arguments.length; i < l; i++) {
        args = args.concat(arguments[i]);
      }
      return this.value.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    };
    this.escape = function () {
      return escapeHtml(this.value);
    };
    this.unescape = function () {
      return unescapeHtml(this.value);
    };
    this.encode = function () {
      return encode(this.value);
    };
    this.decode = function () {
      return decode(this.value);
    };
    this.left = function (_pos) {
      return left(this.value, _pos);
    };
    this.right = function (_pos) {
      return right(this.value, _pos);
    };
    this.camelCase = function () {
      return camelCase(this.value);
    };
    this.snakeCase = function () {
      return snakeCase(this.value);
    };
  }(_string);
}

function color(_hexColor) {

  var matchers = function () {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }();

  var convertObject = function convertObject(_color) {
    var match = void 0;
    if (match = matchers.rgb.exec(_color)) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    if (match = matchers.rgba.exec(_color)) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if (match = matchers.hsl.exec(_color)) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    if (match = matchers.hsla.exec(_color)) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if (match = matchers.hsv.exec(_color)) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    if (match = matchers.hsva.exec(_color)) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if (match = matchers.hex8.exec(_color)) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        a: parseInt(match[4] / 255, 16),
        format: "hex8"
      };
    }
    if (match = matchers.hex6.exec(_color)) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        format: "hex"
      };
    }
    if (match = matchers.hex4.exec(_color)) {
      return {
        r: parseInt(match[1] + '' + match[1], 16),
        g: parseInt(match[2] + '' + match[2], 16),
        b: parseInt(match[3] + '' + match[3], 16),
        a: parseInt(match[4] + '' + match[4], 16),
        format: "hex8"
      };
    }
    if (match = matchers.hex3.exec(_color)) {
      return {
        r: parseInt(match[1] + '' + match[1], 16),
        g: parseInt(match[2] + '' + match[2], 16),
        b: parseInt(match[3] + '' + match[3], 16),
        format: "hex"
      };
    }

    return false;
  };

  function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  }

  function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
  }

  function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }

    return n;
  }

  function convertTo255(n) {
    return number(Math.min(255, Math.max(n, 0)), { 'round': 2 });
  }

  function convertToHex(n) {
    return setDigit(Math.round(n).toString(16), 2);
  }

  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }

    var processPercent = isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
      n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
      return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return n % max / parseFloat(max);
  }

  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h = void 0,
        s = void 0,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h: h, s: s, l: l };
  }

  function hslToRgb(h, s, l) {
    var r = void 0,
        g = void 0,
        b = void 0;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
  }

  return new function (_color) {
    this._originalValue = _color;
    _color = convertObject(_color);
    this.r = _color.r;
    this.g = _color.g;
    this.b = _color.b;
    this.a = _color.a || 1;
    this._format = _color.format;
    this._hex = convertToHex(this.r) + convertToHex(this.g) + convertToHex(this.b);

    this.getHexValue = function () {
      return this._hex;
    };

    this.lighten = function (amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = rgbToHsl(this.r, this.g, this.b),
          rgb = {};

      hsl.l += amount / 100;
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;

      rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

      return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
    };

    this.darken = function (amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = rgbToHsl(this.r, this.g, this.b),
          rgb = {};

      hsl.l -= amount / 100;
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;

      rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

      return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
    };

    this.getBrightness = function () {
      return (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    };

    this.isDark = function () {
      return this.getBrightness() < 128;
    };

    this.isLight = function () {
      return !this.isDark();
    };

    this.getHsl = function () {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l
      };
    };
  }(_hexColor);
}

exports.default = {

  /**
   * jsonString 으로 alert 합니다.
   * @param {Object|Array|String|Number} O
   * @returns {Object|Array|String|Number} O
   * @example ```js
   * AX6Util.alert({a:1,b:2});
   * AX6Util.alert("정말?");
   * ```
   */
  alert: alert,
  /**
   * Object나 Array의 아이템으로 사용자 함수를 호출합니다.
   * @param {Object|Array} O
   * @param {Function} _fn
   * @example
   * ```js
   * var axf = AX6Util;
   * axf.each([0,1,2], function(){
   * 	// with this
   * });
   * axf.each({a:1, b:2}, function(){
   * 	// with this
   * });
   * ```
   */
  each: each,
  /**
   * 원본 아이템들을 이용하여 사용자 함수의 리턴값이 참인 아이템의 위치나 키값을 반환합니다.
   * @param {Object|Array} O
   * @param {Function|String|Number} _fn - 함수 또는 값
   * @returns {Number|String}
   * @example
   * ```js
   * var myArray = [0,1,2,3,4,5,6];
   * var myObject = {a:"123","b":"123",c:123};
   *
   * AX6Util.search(myArray,  function(){
   *    return this > 3;
   * });
   * // 4
   * AX6Util.search(myObject,  function(k, v){
   *    return v === 123;
   * });
   * // "c"
   * AX6Util.search([1,2,3,4], 3);
   * // 2
   * AX6Util.search([1,2], 4);
   * // -1
   * AX6Util.search(["name","value"], "value");
   * // 1
   * AX6Util.search(["name","value"], "values");
   * // -1
   * AX6Util.search({k1:"name",k2:"value"}, "value2");
   * // -1
   * AX6Util.search({k1:"name",k2:"value"}, "value");
   * // "k2"
   * ```
   */
  search: search,
  /**
   * 배열또는 오브젝트의 각 아이템을 인자로 하는 사용자 함수의 결과가 참인 아이템들의 배열을 반환합니다.
   * @param {Object|Array} O
   * @param {Function} _fn
   * @returns {Array}
   * @example
   * ```js
   * var aarray = [5,4,3,2,1];
   * result = AX6Util.filter( aarray, function(){
   *    return this % 2;
   * });
   * console.log(result);
   * // [5, 3, 1]
   *
   * var filObject = {a:1, s:"string", oa:{pickup:true, name:"AXISJ"}, os:{pickup:true, name:"AX5"}};
   * result = AX6Util.filter( filObject, function(){
   * 	return this.pickup;
   * });
   * console.log( AX6Util.toJson(result) );
   * // [{"pickup": , "name": "AXISJ"}, {"pickup": , "name": "AX5"}]
   * ```
   */
  filter: filter,
  /**
   * Object를 JSONString 으로 반환합니다.
   * @method AX6Util.toJson
   * @param {Object|Array} O
   * @returns {String} JSON
   * @example
   * ```js
   * var ax = AX6Util;
   * var myObject = {
   *    a:1, b:"2", c:{axj:"what", arrs:[0,2,"3"]},
   *    fn: function(abcdd){
   *        return abcdd;
   *    }
   * };
   * console.log( ax.toJson(myObject) );
   * ```
   */
  toJson: toJson,
  /**
   * 관용의 JSON Parser
   * @param {String} JSONString
   * @param {Boolean} [force] - 강제 적용 여부 (json 문자열 검사를 무시하고 오브젝트 변환을 시도합니다.)
   * @returns {Object}
   * @example
   * ```
   * console.log(AX6Util.parseJson('{"a":1}'));
   * // Object {a: 1}
   * console.log(AX6Util.parseJson("{'a':1, 'b':'b'}"));
   * // Object {a: 1, b: "b"}
   * console.log(AX6Util.parseJson("{'a':1, 'b':function(){return 1;}}", true));
   * // Object {a: 1, b: function}
   * console.log(AX6Util.parseJson("{a:1}"));
   * // Object {a: 1}
   * console.log(AX6Util.parseJson("[1,2,3]"));
   * // [1, 2, 3]
   * console.log(AX6Util.parseJson("['1','2','3']"));
   * // ["1", "2", "3"]
   * console.log(AX6Util.parseJson("[{'a':'99'},'2','3']"));
   * // [Object, "2", "3"]
   * ```
   */
  parseJson: parseJson,
  /**
   * 오브젝트의 첫번째 아이템을 반환합니다.
   * @param {Object|Array} O
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.first({a:1, b:2});
   * // Object {a: 1}
   * AX6Util.first([1,2,3,4]);
   * // 1
   * ```
   */
  first: first,
  /**
   * 오브젝트의 마지막 아이템을 반환합니다.
   * @param {Object|Array} O
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.last({a:1, b:2});
   * // Object {b: 2}
   * AX6Util.last([1,2,3,4]);
   * // 4
   * ```
   */
  last: last,
  /**
   * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
   * @param {String} str - 문자열
   * @param {String|Number} pos - 찾을 문자열 또는 포지션
   * @returns {String}
   * @example
   * ```js
   * AX6Util.left("abcd.efd", 3);
   * // abc
   * AX6Util.left("abcd.efd", ".");
   * // abcd
   * ```
   */
  left: left,
  /**
   * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
   * @param {String} str - 문자열
   * @param {String|Number} pos - 찾을 문자열 또는 포지션
   * @returns {String}
   * @example
   * ```js
   * AX6Util.right("abcd.efd", 3);
   * // efd
   * AX6Util.right("abcd.efd", ".");
   * // efd
   * ```
   */
  right: right,
  /**
   * 인자의 타입을 반환합니다.
   * @param {Object|Array|String|Number|Element|Etc} O
   * @returns {String} window|element|object|array|function|string|number|undefined|nodelist
   * @example
   * ```js
   * var axf = AX6Util;
   * var a = 11;
   * var b = "11";
   * console.log( axf.getType(a) );
   * console.log( axf.getType(b) );
   * ```
   */
  getType: getType,
  /**
   * 오브젝트가 window 인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isWindow: isWindow,
  /**
   * 오브젝트가 HTML 엘리먼트여부인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isElement: isElement,
  /**
   * 오브젝트가 Object인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isObject: isObject,
  /**
   * 오브젝트가 Array인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isArray: isArray,
  /**
   * 오브젝트가 Function인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isFunction: isFunction,
  /**
   * 오브젝트가 String인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isString: isString,
  /**
   * 오브젝트가 Number인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isNumber: isNumber,
  /**
   * 오브젝트가 NodeList인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isNodelist: isNodelist,
  /**
   * 오브젝트가 undefined인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isUndefined: isUndefined,
  /**
   * 오브젝트가 undefined이거나 null이거나 빈값인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  /**
   * 오브젝트가 날자값인지 판단합니다.
   * @param {Date} O
   * @returns {Boolean}
   * @example
   * ```js
   * AX6Util.isDate('2016-09-30');
   * // false
   * AX6Util.isDate( new Date('2016-09-30') );
   * // true
   * ```
   */
  isDate: isDate,
  /**
   * 오브젝트가 날짜형 변수인지 판단합니다
   */
  isDateFormat: isDateFormat,
  isNothing: isNothing,
  /**
   * 쿠키를 설정합니다.
   * @param {String} cname - 쿠키이름
   * @param {String} cvalue - 쿠키값
   * @param {Number} [exdays] - 쿠키 유지일수
   * @param {Object} [opts] - path, domain 설정 옵션
   * @example
   * ```js
   * AX6Util.setCookie("jslib", "AX5");
   * AX6Util.setCookie("jslib", "AX5", 3);
   * AX6Util.setCookie("jslib", "AX5", 3, {path:"/", domain:".axisj.com"});
   * ```
   */
  setCookie: setCookie,
  /**
   * 쿠키를 가져옵니다.
   * @param {String} cname
   * @returns {String} cookie value
   * @example
   * ```js
   * AX6Util.getCookie("jslib");
   * ```
   */
  getCookie: getCookie,
  /**
   * css형 문자열이나 특수문자가 포함된 문자열을 카멜케이스로 바꾸어 반환합니다.
   * @param {String} str
   * @returns {String}
   * @example
   * ```js
   * AX6Util.camelCase("inner-width");
   * AX6Util.camelCase("innerWidth");
   * // innerWidth
   * ```
   */
  camelCase: camelCase,
  /**
   * css형 문자열이나 카멜케이스문자열을 스네이크 케이스 문자열로 바꾸어 반환합니다.
   * @param {String} str
   * @returns {String}
   * @example
   * ```js
   * AX6Util.snakeCase("innerWidth");
   * AX6Util.snakeCase("inner-Width");
   * AX6Util.snakeCase("innerWidth");
   * // inner-width
   * ```
   */
  snakeCase: snakeCase,
  /**
   * 문자열에서 -. 을 제외한 모든 문자열을 제거하고 숫자로 반환합니다. 옵션에 따라 원하는 형식의 숫자로 변환 할 수 도 있습니다.
   * @param {String|Number} str
   * @param {Object} cond - 옵션
   * @returns {String|Number}
   * @example
   * ```js
   * var cond = {
   * 	round: {Number|Boolean} - 반올림할 자릿수,
   * 	money: {Boolean} - 통화,
   * 	abs: {Boolean} - 절대값,
   * 	byte: {Boolean} - 바이트
   * }
   *
   * console.log(AX6Util.number(123456789.678, {round:1}));
   * console.log(AX6Util.number(123456789.678, {round:1, money:true}));
   * console.log(AX6Util.number(123456789.678, {round:2, byte:true}));
   * console.log(AX6Util.number(-123456789.8888, {abs:true, round:2, money:true}));
   * console.log(AX6Util.number("A-1234~~56789.8~888PX", {abs:true, round:2, money:true}));
   *
   * //123456789.7
   * //123,456,789.7
   * //117.7MB
   * //123,456,789.89
   * //123,456,789.89
   * ```
   */
  number: number,
  /**
   * 배열 비슷한 오브젝트를 배열로 변환해줍니다.
   * @param {Object|Elements|Arguments} O
   * @returns {Array}
   * @example
   * ```js
   * AX6Util.toArray(arguments);
   * //
   * ```
   */
  toArray: toArray,
  /**
   * 오브젝트를 파라미터형식으로 또는 파라미터를 오브젝트 형식으로 변환합니다.
   * @param {Object|Array|String} O
   * @param {String} [cond] - param|object
   * @returns {Object|String}
   * @example
   * ```
   * AX6Util.param({a:1,b:'1232'}, "param");
   * AX6Util.param("a=1&b=1232", "param");
   * // "a=1&b=1232"
   * AX6Util.param("a=1&b=1232");
   * // {a: "1", b: "1232"}
   * ```
   */
  param: param,
  error: error,
  /**
   * 날짜 형식의 문자열이나 Date객체를 조건에 맞게 처리 한 후 원하는 return 값으로 반환합니다.
   * @param {String|Date} d
   * @param {Object} cond
   * @returns {Date|String}
   * @example
   * ```js
   * AX6Util.date('2013-01-01'); // Tue Jan 01 2013 23:59:00 GMT+0900 (KST)
   * AX6Util.date((new Date()), {add:{d:10}, return:'yyyy/MM/dd'}); // "2015/07/01"
   * AX6Util.date('1919-03-01', {add:{d:10}, return:'yyyy/MM/dd hh:mm:ss'}); // "1919/03/11 23:59:00"
   * ```
   */
  date: date,
  /**
   * 인자인 날짜가 오늘부터 몇일전인지 반환합니다. 또는 인자인 날짜가 가까운 미래에 몇일 후인지 반환합니다.
   * @param {String|Data} d
   * @param {Object} cond
   * @returns {Number}
   * @example
   * ```js
   * AX6Util.dday('2016-01-29');
   * // 1
   * AX6Util.dday('2016-01-29', {today:'2016-01-28'});
   * // 1
   * AX6Util.dday('1977-03-29', {today:'2016-01-28', age:true});
   * // 39
   * ```
   */
  dday: dday,
  /**
   * 년월에 맞는 날자수를 반환합니다.
   * (new Date()).getMonth() 기준으로 월값을 보냅니다. "2월" 인경우 "1" 을 넘기게 됩니다.
   * @param {Number} y
   * @param {Number} m
   * @returns {Number}
   * @examples
   * ```js
   * AX6Util.daysOfMonth(2015, 11); // 31
   * AX6Util.daysOfMonth(2015, 1); // 28
   * ```
   */
  daysOfMonth: daysOfMonth,
  /**
   * 인자인 날짜가 몇년 몇월의 몇번째 주차인지 반환합니다.
   * @param {String|Data} d
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.weeksOfMonth("2015-10-01"); // {year: 2015, month: 10, count: 1}
   * AX6Util.weeksOfMonth("2015-09-19"); // {year: 2015, month: 9, count: 3}
   * ```
   */
  weeksOfMonth: weeksOfMonth,
  /**
   * 원하는 횟수 만큼 자릿수 맞춤 문자열을 포함한 문자열을 반환합니다.
   * 문자열 길이보다 작은값을 보내면 무시됩니다.
   * @param {String|Number} num
   * @param {Number} length
   * @param {String} [padder=0]
   * @param {Number} [radix]
   * @returns {String}
   * @example
   * ```
   * AX6Util.setDigit(2016, 6)
   * // "002016"
   * AX6Util.setDigit(2016, 2)
   * // "2016"
   * ```
   */
  setDigit: setDigit,
  /**
   * 문자열을 지정된 수만큼 반복 합니다.
   * @param {String} s
   * @param {Number} count
   * @returns {string}
   * @example
   * ```
   * AX6Util.times(2016, 2)
   * //"20162016"
   * ```
   */
  times: times,
  /**
   * 타겟엘리먼트의 부모 엘리멘트 트리에서 원하는 조건의 엘리먼트를 얻습니다.
   * @param {Element} _target - target element
   * @param {Object|Function} cond - 원하는 element를 찾을 조건
   * @returns {Element}
   * @example
   * ```
   * // cond 속성정의
   * var cond = {
   * 	tagname: {String} - 태그명 (ex. a, div, span..),
   * 	clazz: {String} - 클래스명
   * 	[, 그 외 찾고 싶은 attribute명들]
   * };
   * console.log(
   * console.log(
   *    AX6Util.findParentNode(e.target, {tagname:"a", clazz:"ax-menu-handel", "data-custom-attr":"attr_value"})
   * );
   * // cond 함수로 처리하기
   * jQuery('#id').bind("click.app_expand", function(e){
   * 	var target = AX6Util.findParentNode(e.target, function(target){
   * 		if($(target).hasClass("aside")){
   * 			return true;
   * 		}
   * 		else{
   * 			return true;
   * 		}
   * 	});
   * 	//client-aside
   * 	if(target.id !== "client-aside"){
   * 		// some action
   * 	}
   * });
   * ```
   */
  findParentNode: findParentNode,
  /**
   * @param {String|Number} val
   * @returns {String}
   * @example
   * ```
   * console.log(AX6Util.cssNumber("100px"))
   * console.log(AX6Util.cssNumber("100%"))
   * console.log(AX6Util.cssNumber("100"))
   * console.log(AX6Util.cssNumber(100))
   * console.log(AX6Util.cssNumber("!!100@#"))
   * ```
   */
  cssNumber: cssNumber,
  /**
   * css string 및 object 를 넘기면 object 및 string 으로 변환되어 리턴됩니다.
   * @param {Object|String} val - CSS String or CSS Object
   * @returns {String|Object}
   * @example
   * ```
   * console.log(AX6Util.css({background: "#ccc", padding: "50px", width: "100px"}));
   * //"background:#ccc;padding:50px;width:100px;"
   * console.log(AX6Util.css('width:100px;padding: 50px; background: #ccc'));
   * // object {width: "100px", padding: "50px", background: "#ccc"}
   * ```
   */
  css: css,
  /**
   * @param {Event} e
   * @example
   * ```
   * AX6Util.stopEvent(e);
   * ```
   */
  stopEvent: stopEvent,
  /**
   * @param {Element} el
   * @param {Element} offset
   * @example
   * ```
   * AX6Util.selectRange($("#select-test-0")); // selectAll
   * AX6Util.selectRange($("#select-test-0"), "selectAll"); //selectAll
   * AX6Util.selectRange($("#select-test-0"), "start"); // focus on start
   * AX6Util.selectRange($("#select-test-0"), "end"); // focus on end
   * AX6Util.selectRange($("#select-test-0"), [1, 5]); // select 1~5
   * ```
   */
  selectRange: selectRange,
  /**
   * 지정한 시간을 지연시켜 함수를 실행합니다.
   * @param {Function} func
   * @param {Number} wait
   * @param {Object} options
   * @returns {debounced}
   * @example
   * ```js
   * // https://github.com/lodash/lodash/blob/master/debounce.js
   * var debounceFn = AX6Util.debounce(function( val ) { console.log(val); }, 300);
   * $(document.body).click(function(){
         *  debounceFn(new Date());
         * });
   * ```
   */
  debounce: debounce,
  /**
   * @param func
   * @param wait
   * @param options
   * @return {throttled}
   * @example
   * ```js
   * //https://github.com/lodash/lodash/blob/master/throttle.js
   * var throttleFn = AX6Util.throttle(function( val ) { console.log(val); }, 300);
   * $(window).scroll(function(){
     *      throttleFn(new Date());
     * });
   * ```
   */
  throttle: throttle,
  /**
   * @param {Object} obj
   * @returns {Object}
   * @example
   * ```js
   * var obj = [
   *  {name:"A", child:[{name:"a-1"}]},
   *  {name:"B", child:[{name:"b-1"}], callBack: function(){ console.log('callBack'); }}
   * ];
   * var copiedObj = AX6Util.deepCopy(obj)
   * ```
   */
  deepCopy: deepCopy,
  /**
   * HTML 문자열을 escape 처리합니다.
   * "&lt;" represents the < sign.
   * "&gt;" represents the > sign.
   * "&amp;" represents the & sign.
   * "&quot; represents the " mark.
   * [Character entity references](https://www.w3.org/TR/html401/charset.html#h-5.3)
   * @param {String} s
   * @returns {string}
   * @example
   * ```
   * AX6Util.escapeHtml('HTML <span>string</span> & "escape"')
   * //"HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;"
   * ```
   */
  escapeHtml: escapeHtml,
  /**
   * HTML 문자열을 unescape 처리합니다.
   * escapeHtml를 참고하세요.
   * @param {String} s
   * @returns {string}
   * @example
   * ```
   * AX6Util.unescapeHtml('HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;')
   * //"HTML <span>string</span> & "escape""
   * ```
   */
  unescapeHtml: unescapeHtml,
  /**
   * @param {String} tmpl
   * @param {*} args
   * @return {ax6string}
   * @example
   * ```js
   * AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format("ASP", "ASP.NET");
   * AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format(["ASP", "ASP.NET"]);
   * AX6Util.stinrg("{0} counts").format(100);
   * ```
   */
  string: string,
  /**
   * @param _hexColor
   * @return {ax5color}
   * @example
   * ```js
   * AX6Util.color("#ff3300").lighten(10).getHexValue()
   * console.log(AX6Util.color("#ff3300").darken(10).getHexValue());
   * ```
   */
  color: color
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;
var doc = win ? win.document : null;
var docElem = win ? win.document.documentElement : null;

var eventKeys = {
  BACKSPACE: 8, TAB: 9,
  RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
  HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
};
var weekNames = [{ label: "SUN" }, { label: "MON" }, { label: "TUE" }, { label: "WED" }, { label: "THU" }, { label: "FRI" }, { label: "SAT" }];
var wheelEnm = win && /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
var errorMsg = {};

var onerror = function onerror() {
  console.error(arguments);
};
var browser = function (ua, mobile, browserName, match, browser, browserVersion) {
  if (!win || !win.navigator) return {};

  ua = navigator.userAgent.toLowerCase(), mobile = ua.search(/mobile/g) != -1, browserName, match, browser, browserVersion;

  if (ua.search(/iphone/g) != -1) {
    return { name: "iphone", version: 0, mobile: true };
  } else if (ua.search(/ipad/g) != -1) {
    return { name: "ipad", version: 0, mobile: true };
  } else if (ua.search(/android/g) != -1) {
    match = /(android)[ \/]([\w.]+)/.exec(ua) || [];
    browserVersion = match[2] || "0";
    return { name: "android", version: browserVersion, mobile: mobile };
  } else {
    browserName = "";
    match = /(opr)[ \/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    browser = match[1] || "";
    browserVersion = match[2] || "0";

    if (browser == "msie") browser = "ie";
    return {
      name: browser,
      version: browserVersion,
      mobile: mobile
    };
  }
  ua = null, mobile = null, browserName = null, match = null, browser = null, browserVersion = null;
}();
var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && win.document);
var urlUtil = function urlUtil(url, urls) {
  url = {
    href: win.location.href,
    param: win.location.search,
    referrer: doc.referrer,
    pathname: win.location.pathname,
    hostname: win.location.hostname,
    port: win.location.port
  };
  urls = url.href.split(/[\?#]/);
  url.param = url.param.replace("?", "");
  url.url = urls[0];
  if (url.href.search("#") > -1) {
    url.hashdata = urls[urls.length - 1];
  }
  urls = null;
  url.baseUrl = url.href.substr(0, url.href.indexOf("?")).replace(url.pathname, "");

  return url;
};
var getError = function getError(className, errorCode, methodName) {
  if (errorMsg && errorMsg[className]) {
    return {
      className: className,
      errorCode: errorCode,
      methodName: methodName,
      msg: errorMsg[className][errorCode]
    };
  } else {
    return { className: className, errorCode: errorCode, methodName: methodName };
  }
};
var supportTouch = win ? 'ontouchstart' in win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 : false;
var supportFileApi = win ? win.FileReader && win.File && win.FileList && win.Blob : false;

/**
 * @module AX6Info
 */
exports.default = {
  /**
   * 첫번째 자리수 동사 - (필요한것이 없을때 : 4, 실행오류 : 5)
   * 두번째 자리수 목적어 - 문자열 0, 숫자 1, 배열 2, 오브젝트 3, 함수 4, DOM 5, 파일 6, 기타 7
   * 세번째 자리수 옵션
   */
  errorMsg: errorMsg,
  /**
   * 에러 출력메세지 사용자 재 정의
   * @example
   * ```
   * AX6Info.onerror = function(){
   *  console.log(arguments);
   * }
   * ```
   */
  onerror: onerror,
  /**
   * event keyCodes
   * @example
   * ```
   * {
   * 	BACKSPACE: 8, TAB: 9,
   * 	RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
   * 	HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
   * }
   * ```
   */
  eventKeys: eventKeys,
  /**
   * week names
   * @example
   * ```
   * [
   *  {label: "SUN"},{label: "MON"},{label: "TUE"},{label: "WED"},{label: "THU"},{label: "FRI"},{label: "SAT"}
   * ]
   * console.log( weekNames[0] );
   * console.log( AX6Info.weekNames[(new Date()).getDay()].label )
   * ```
   */
  weekNames: weekNames,
  /**
   * 사용자 브라우저 식별용 오브젝트
   * @example
   * ```
   * console.log( AX6Info.browser );
   * //Object {name: "chrome", version: "39.0.2171.71", mobile: false}
   * ```
   */
  browser: browser,
  /**
   * 브라우저 여부
   */
  isBrowser: isBrowser,
  /**
   * 브라우져의 터치 가능 유무를 확인합니다.
   * @returns {boolean}
   * @example
   * ```
   * var chkFlag = AX6Info.supportTouch;
   */
  supportTouch: supportTouch,
  /**
   * HTML5 FileApi 지원여부
   */
  supportFileApi: supportFileApi,
  /**
   * 브라우저에 따른 마우스 휠 이벤트이름
   */
  wheelEnm: wheelEnm,
  /**
   * 현재 페이지의 Url 정보를 리턴합니다.
   * @example
   * ```
   * console.log( ax5.util.toJson( AX6Info.urlUtil() ) );
   * {
   *	"baseUrl": "http://ax5:2018",
   *	"href": "http://ax5:2018/samples/index.html?a=1&b=1#abc",
   *	"param": "a=1&b=1",
   *	"referrer": "",
   *	"pathname": "/samples/index.html",
   *	"hostname": "ax5",
   *	"port": "2018",
   *	"url": "http://ax5:2018/samples/index.html",
   *	"hashdata": "abc"
   * }
   * ```
   */
  urlUtil: urlUtil,
  /**
   * ax5-error-msg.js 에 정의된 ax5 error를 반환합니다.
   * @returns {Object}
   * @example
   * ```
   * console.log( AX6Info.getError("single-uploader", "460", "upload") );
   *
   * if(!this.selectedFile){
   *      if (cfg.onEvent) {
   *      	var that = {
   *      		action: "error",
   *      		error: AX6Info.getError("single-uploader", "460", "upload")
   *      	};
   *      	cfg.onEvent.call(that, that);
   *      }
   *      return this;
   * }
   * ```
   */
  getError: getError
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI_INSTANCE_ID = 0;

/**
 *  @class
 */

var AX6UICore = function () {
  _createClass(AX6UICore, null, [{
    key: "getInstanceId",
    value: function getInstanceId() {
      return UI_INSTANCE_ID++;
    }

    /**
     * @constructor
     */

  }]);

  function AX6UICore() {
    _classCallCheck(this, AX6UICore);

    this.initialized = false;
    this.instanceId = AX6UICore.getInstanceId();
  }

  /**
   * @method
   * @param config
   * @return {AX6UICore}
   */


  _createClass(AX6UICore, [{
    key: "setConfig",
    value: function setConfig(config) {
      _jqmin2.default.extend(this.config, config);

      this.init();
      return this;
    }

    /**
     * UI가 생성될 때, config 속성이 바뀔때 호출 되는 내부 메서드
     * @method
     */

  }, {
    key: "init",
    value: function init() {
      // 초기화 함수,

      this.initOnce();
    }

    /**
     * UI가 랜더링 될 때 1회만 호출되는 메소드 repaint가 필요한 상황엔 별도의 repaint 메서드를 이용할 것을 권장
     * @method
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      // 1회만 호출되어야 하는 초기화 함수
      if (this.initialized) return this;
      this.initialized = true;
      //
    }

    /**
     * @method
     */

  }, {
    key: "destory",
    value: function destory() {}
  }]);

  return AX6UICore;
}();

exports.default = AX6UICore;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-event/alias,-css/showHide,-css/hiddenVisibleSelectors
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-07-14T08:07Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-event/alias,-css/showHide,-css/hiddenVisibleSelectors",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var documentElement = document.documentElement;



/*
 * Optional (non-Sizzle) selector module for custom builds.
 *
 * Note that this DOES NOT SUPPORT many documented jQuery
 * features in exchange for its smaller size:
 *
 * Attribute not equal selector
 * Positional selectors (:first; :eq(n); :odd; etc.)
 * Type selectors (:input; :checkbox; :button; etc.)
 * State-based selectors (:animated; :visible; :hidden; etc.)
 * :has(selector)
 * :not(complex selector)
 * custom selectors via Sizzle extensions
 * Leading combinators (e.g., $collection.find("> *"))
 * Reliable functionality on XML fragments
 * Requiring all parts of a selector to match elements under context
 *   (e.g., $div.find("div > *") now matches children of $div)
 * Matching against non-elements
 * Reliable sorting of disconnected nodes
 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
 *
 * If any of these are unacceptable tradeoffs, either use Sizzle or
 * customize this stub for the project's specific needs.
 */

var hasDuplicate, sortInput,
	sortStable = jQuery.expando.split( "" ).sort( sortOrder ).join( "" ) === jQuery.expando,
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.mozMatchesSelector ||
		documentElement.oMatchesSelector ||
		documentElement.msMatchesSelector,

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	};

function sortOrder( a, b ) {

	// Flag for duplicate removal
	if ( a === b ) {
		hasDuplicate = true;
		return 0;
	}

	// Sort on method existence if only one input has compareDocumentPosition
	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	if ( compare ) {
		return compare;
	}

	// Calculate position if both inputs belong to the same document
	compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
		a.compareDocumentPosition( b ) :

		// Otherwise we know they are disconnected
		1;

	// Disconnected nodes
	if ( compare & 1 ) {

		// Choose the first element that is related to our preferred document
		if ( a === document || a.ownerDocument === document &&
			jQuery.contains( document, a ) ) {
			return -1;
		}
		if ( b === document || b.ownerDocument === document &&
			jQuery.contains( document, b ) ) {
			return 1;
		}

		// Maintain original order
		return sortInput ?
			( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
			0;
	}

	return compare & 4 ? -1 : 1;
}

function uniqueSort( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	hasDuplicate = false;
	sortInput = !sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
}

function escape( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
}

jQuery.extend( {
	uniqueSort: uniqueSort,
	unique: uniqueSort,
	escapeSelector: escape,
	find: function( selector, context, results, seed ) {
		var elem, nodeType,
			i = 0;

		results = results || [];
		context = context || document;

		// Same basic safeguard as Sizzle
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		// Early return if context is not an element or document
		if ( ( nodeType = context.nodeType ) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( seed ) {
			while ( ( elem = seed[ i++ ] ) ) {
				if ( jQuery.find.matchesSelector( elem, selector ) ) {
					results.push( elem );
				}
			}
		} else {
			jQuery.merge( results, context.querySelectorAll( selector ) );
		}

		return results;
	},
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

			// Use textContent for elements
			return elem.textContent;
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},
	contains: function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains( bup ) );
	},
	isXMLDoc: function( elem ) {

		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && ( elem.ownerDocument || elem ).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	},
	expr: {
		attrHandle: {},
		match: {
			bool: new RegExp( "^(?:checked|selected|async|autofocus|autoplay|controls|defer" +
				"|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i" ),
			needsContext: /^[\x20\t\r\n\f]*[>+~]/
		}
	}
} );

jQuery.extend( jQuery.find, {
	matches: function( expr, elements ) {
		return jQuery.find( expr, null, null, elements );
	},
	matchesSelector: function( elem, expr ) {
		return matches.call( elem, expr );
	},
	attr: function( elem, name ) {
		var fn = jQuery.expr.attrHandle[ name.toLowerCase() ],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			value = fn && hasOwn.call( jQuery.expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, jQuery.isXMLDoc( elem ) ) :
				undefined;
		return value !== undefined ? value : elem.getAttribute( name );
	}
} );



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "5px";

		// Support: IE 9 only
		// Detect misreporting of content dimensions for border-box elements (gh-3699)
		borderBoxReliableVal = divStyle.width[ 0 ] === "5";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "5px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, borderBoxReliableVal, pixelMarginRightVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:10px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		borderBoxReliable: function() {
			computeStyleTests();
			return borderBoxReliableVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && !support.borderBoxReliable() ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


support.focusin = "onfocusin" in window;


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





var readyCallbacks = [],
	whenReady = function( fn ) {
		readyCallbacks.push( fn );
	},
	executeReady = function( fn ) {

		// Prevent errors from freezing future callback execution (gh-1823)
		// Not backwards-compatible as this does not execute sync
		window.setTimeout( function() {
			fn.call( document, jQuery );
		} );
	};

jQuery.fn.ready = function( fn ) {
	whenReady( fn );
	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		whenReady = function( fn ) {
			readyCallbacks.push( fn );

			while ( readyCallbacks.length ) {
				fn = readyCallbacks.shift();
				if ( jQuery.isFunction( fn ) ) {
					executeReady( fn );
				}
			}
		};

		whenReady();
	}
} );

// Make jQuery.ready Promise consumable (gh-1778)
jQuery.ready.then = jQuery.fn.ready;

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE9-10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}



return jQuery;
} );


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 * https://github.com/thomasJang/mustache.js -- imporove some variables
 */

/**
 * AX6Mustache는 http://github.com/janl/mustache.js에 몇가지 최소한의 기능을 튜닝하여 사용하는 템플릿 엔진입니다.
 * @namespace AX6Mustache
 */

/**
 * @method AX6Mustache.render
 * @example
 * ```js
 * ax5.mustache.render(template, view)
 *
 *
 * //Array @i
 * //{{#beatles}}
 * //{{firstName}} {{lastName}} ({{@i}}) ({{@first}})
 * //{{/beatles}}
 *
 * //Object @each
 * {{#beatles}}
 *  {{#@each}}
 *      {{@key}} : {{@value.firstName}} {{@value.lastName}}
 *  {{/@each}}
 * {{/beatles}}
 *
 * ```
 */

var AX6 = {};

(function defineMustache(global, factory) {

  factory(global.mustache = {});
})(AX6, function mustacheFactory(mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr(obj) {
    return isArray(obj) ? 'array' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty(obj, propName) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && propName in obj;
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;

  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    if (!template) return [];

    var sections = []; // Stack to hold section tokens
    var tokens = []; // Buffer to hold the tokens
    var spaces = []; // Indices of whitespace tokens on the current line
    var hasTag = false; // Is there a {{tag}} on the current line?
    var nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;

    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe)) break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos() {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0) return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re),
        match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view;
    this.cache = {
      '.': this.view,
      '@each': function each() {
        var returns = [];
        for (var k in this) {
          returns.push({ '@key': k, '@value': this[k] });
        }
        return returns;
      }
    };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this,
          names,
          index,
          lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value)) value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache() {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render(template, view, partials) {
    var tokens = this.parse(template);
    var context = view instanceof Context ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
    var buffer = '';
    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);else if (symbol === '&') value = this.unescapedValue(token, context);else if (symbol === 'name') value = this.escapedValue(token, context);else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined) buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';

    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender(template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        if (value[j]) {
          if (_typeof(value[j]) === 'object') {
            value[j]['@i'] = j;
            value[j]['@first'] = j === 0;
          }

          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
        }
      }
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null) buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return value;
  };

  Writer.prototype.escapedValue = function escapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.1.3';
  mustache.tags = ['{{', '}}'];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache() {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse(template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render(template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html(template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
});

exports.default = AX6.mustache;

/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(13);
var isBuffer = __webpack_require__(38);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(9);
var normalizeHeaderName = __webpack_require__(40);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(15);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(15);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-moz-keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-webkit-keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n@-moz-keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n@keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n[data-ax6ui-calendar] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-calendar] * {\n    box-sizing: border-box; }\n  [data-ax6ui-calendar] .calendar-control {\n    position: relative;\n    box-sizing: content-box;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5);\n    border: 1px solid #ddd;\n    border-radius: 5px;\n    font-size: 18px;\n    margin-bottom: 5px;\n    padding: 0;\n    color: #333; }\n    [data-ax6ui-calendar] .calendar-control .date-move-left, [data-ax6ui-calendar] .calendar-control .date-move-right {\n      display: block;\n      position: absolute;\n      overflow: hidden;\n      text-align: center;\n      font-size: 22px;\n      cursor: pointer;\n      text-decoration: none;\n      padding: 0; }\n      [data-ax6ui-calendar] .calendar-control .date-move-left i, [data-ax6ui-calendar] .calendar-control .date-move-left span, [data-ax6ui-calendar] .calendar-control .date-move-right i, [data-ax6ui-calendar] .calendar-control .date-move-right span {\n        line-height: inherit; }\n    [data-ax6ui-calendar] .calendar-control .date-move-left {\n      left: 0px;\n      top: 0px; }\n    [data-ax6ui-calendar] .calendar-control .date-move-right {\n      right: 0px;\n      top: 0px; }\n    [data-ax6ui-calendar] .calendar-control .date-display {\n      text-align: center; }\n      [data-ax6ui-calendar] .calendar-control .date-display [data-calendar-display] {\n        margin: 0px 10px;\n        cursor: pointer;\n        text-decoration: underline; }\n    [data-ax6ui-calendar] .calendar-control a {\n      color: #333; }\n    [data-ax6ui-calendar] .calendar-control a:hover {\n      color: #337ab7; }\n  [data-ax6ui-calendar] .calendar-body.fadein {\n    -webkit-animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    opacity: 1.0; }\n  [data-ax6ui-calendar] .calendar-body.fadeout {\n    -webkit-animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    opacity: 0.0; }\n  [data-ax6ui-calendar] .calendar-body table {\n    box-sizing: border-box;\n    table-layout: fixed;\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 0 none; }\n    [data-ax6ui-calendar] .calendar-body table thead {\n      border: 0 none; }\n      [data-ax6ui-calendar] .calendar-body table thead td, [data-ax6ui-calendar] .calendar-body table thead th {\n        box-sizing: border-box;\n        vertical-align: middle;\n        line-height: 1em;\n        cursor: pointer;\n        text-align: center;\n        font-size: 12px;\n        padding: 0px 2px;\n        border: 0px none;\n        overflow: hidden;\n        background-color: #FFFFFF;\n        background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n        background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n        color: #6D6E70; }\n        [data-ax6ui-calendar] .calendar-body table thead td.calendar-col-0, [data-ax6ui-calendar] .calendar-body table thead th.calendar-col-0 {\n          color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table thead td.calendar-col-6, [data-ax6ui-calendar] .calendar-body table thead th.calendar-col-6 {\n          color: #32B4DC; }\n    [data-ax6ui-calendar] .calendar-body table tbody {\n      border: 0 none; }\n      [data-ax6ui-calendar] .calendar-body table tbody td, [data-ax6ui-calendar] .calendar-body table tbody th {\n        box-sizing: border-box;\n        vertical-align: middle;\n        line-height: 1em;\n        cursor: pointer;\n        text-align: center;\n        font-size: 14px;\n        border: 0px none;\n        background-color: #FFFFFF;\n        background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n        background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n        overflow: hidden;\n        /*\n          &.calendar-col-0 {\n              .calendar-item-day.live {\n                  color: $ax6calendar-sun-text-color;\n                  @include extend-item-theme();\n              }\n          }\n          &.calendar-col-6 {\n              .calendar-item-day.live {\n                  color: $ax6calendar-sat-text-color;\n                  @include extend-item-theme();\n              }\n          }\n          */ }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day {\n          position: relative;\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon {\n            position: absolute;\n            width: 100%;\n            text-align: center;\n            line-height: 11.2px;\n            font-size: 11.2px; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon.addon-header, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon.addon-header {\n              left: 0px;\n              top: 1px; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon.addon-footer, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon.addon-footer {\n              left: 0px;\n              bottom: 1px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live span.addon {\n              color: #A1A1A1; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live.sunday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live.sunday {\n              color: #C78B81; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live.saturday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live.saturday {\n              color: #32B4DC; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus.hover {\n              background-color: #32B4DC;\n              background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n              background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n              color: #fff !important; }\n              [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus.hover span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus.hover span.addon {\n                color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.period, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.period {\n            background-color: #82d3fa;\n            background-image: -webkit-linear-gradient(bottom, #82d3fa, #82d3fa);\n            background-image: linear-gradient(to top,#82d3fa, #82d3fa);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.period span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.period span.addon {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.selected-day, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.selected-day {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.selected-day span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.selected-day span.addon {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.holiday {\n            color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month {\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.hover {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month span.lunar, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month span.lunar {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.holiday {\n            color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year {\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.hover {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year span.lunar, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year span.lunar {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.holiday {\n            color: #C78B81; }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(9);
var settle = __webpack_require__(41);
var buildURL = __webpack_require__(43);
var parseHeaders = __webpack_require__(44);
var isURLSameOrigin = __webpack_require__(45);
var createError = __webpack_require__(16);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(46);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(47);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(42);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method ax5grid.util.divideTableByFrozenColumnIndex
 * @param _table
 * @param _frozenColumnIndex
 * @returns {{leftHeaderData: {rows: Array}, headerData: {rows: Array}}}
 */
var divideTableByFrozenColumnIndex = function divideTableByFrozenColumnIndex(_table, _frozenColumnIndex) {

  var tempTable_l = { rows: [] },
      tempTable_r = { rows: [] };

  for (var r = 0, rl = _table.rows.length; r < rl; r++) {
    var row = _table.rows[r];

    tempTable_l.rows[r] = { cols: [] };
    tempTable_r.rows[r] = { cols: [] };

    for (var c = 0, cl = row.cols.length; c < cl; c++) {
      var col = _jqmin2.default.extend({}, row.cols[c]),
          colStartIndex = col.colIndex,
          colEndIndex = col.colIndex + col.colspan;

      if (colStartIndex < _frozenColumnIndex) {
        if (colEndIndex <= _frozenColumnIndex) {
          // 좌측편에 변형없이 추가
          tempTable_l.rows[r].cols.push(col);
        } else {
          var leftCol = _jqmin2.default.extend({}, col),
              rightCol = _jqmin2.default.extend({}, leftCol);

          leftCol.colspan = _frozenColumnIndex - leftCol.colIndex;
          rightCol.colIndex = _frozenColumnIndex;
          rightCol.colspan = col.colspan - leftCol.colspan;

          tempTable_l.rows[r].cols.push(leftCol);
          if (rightCol.colspan) {
            tempTable_r.rows[r].cols.push(rightCol);
          }
        }
      } else {
        // 오른편
        tempTable_r.rows[r].cols.push(col);
      }

      col = null;
      colStartIndex = null;
      colEndIndex = null;
    }

    row = null;
  }

  return {
    leftData: tempTable_l,
    rightData: tempTable_r
  };
};

var getTableByStartEndColumnIndex = function getTableByStartEndColumnIndex(_table, _startColumnIndex, _endColumnIndex) {

  var tempTable = { rows: [] };
  for (var r = 0, rl = _table.rows.length; r < rl; r++) {
    var row = _table.rows[r];

    tempTable.rows[r] = { cols: [] };
    for (var c = 0, cl = row.cols.length; c < cl; c++) {
      var col = _jqmin2.default.extend({}, row.cols[c]),
          colStartIndex = col.colIndex,
          colEndIndex = col.colIndex + col.colspan;

      if (_startColumnIndex <= colStartIndex || colEndIndex <= _endColumnIndex) {
        if (_startColumnIndex <= colStartIndex && colEndIndex <= _endColumnIndex) {
          // 변형없이 추가
          tempTable.rows[r].cols.push(col);
        } else if (_startColumnIndex > colStartIndex && colEndIndex > _startColumnIndex) {
          // 앞에서 걸친경우
          col.colspan = colEndIndex - _startColumnIndex;
          tempTable.rows[r].cols.push(col);
        } else if (colEndIndex > _endColumnIndex && colStartIndex <= _endColumnIndex) {
          tempTable.rows[r].cols.push(col);
        }
      }
    }
  }

  return tempTable;
};

var getMousePosition = function getMousePosition(e) {
  var mouseObj = void 0,
      originalEvent = e.originalEvent ? e.originalEvent : e;

  mouseObj = 'changedTouches' in originalEvent && originalEvent.changedTouches ? originalEvent.changedTouches[0] : originalEvent;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    clientX: mouseObj.pageX,
    clientY: mouseObj.pageY
  };
};

var ENM = {
  "mousedown": _AX6Info2.default.supportTouch ? "touchstart" : "mousedown",
  "mousemove": _AX6Info2.default.supportTouch ? "touchmove" : "mousemove",
  "mouseup": _AX6Info2.default.supportTouch ? "touchend" : "mouseup"
};

var makeHeaderTable = function makeHeaderTable(_columns) {
  var columns = _AX6Util2.default.deepCopy(_columns),
      cfg = this.config,
      table = {
    rows: []
  },
      colIndex = 0,
      maekRows = function maekRows(_columns, depth, parentField) {
    var row = { cols: [] };
    var i = 0,
        l = _columns.length;

    for (; i < l; i++) {
      var field = _columns[i];
      var colspan = 1;

      if (!field.hidden) {
        field.colspan = 1;
        field.rowspan = 1;

        field.rowIndex = depth;
        field.colIndex = function () {
          if (!parentField) {
            return colIndex++;
          } else {
            colIndex = parentField.colIndex + i + 1;
            return parentField.colIndex + i;
          }
        }();

        row.cols.push(field);

        if ('columns' in field) {
          colspan = maekRows(field.columns, depth + 1, field);
        } else {
          field.width = 'width' in field ? field.width : cfg.columnMinWidth;
        }
        field.colspan = colspan;
      } else {}
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return row.cols.length - 1 + colspan;
    } else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  // set rowspan
  for (var r = 0, rl = table.rows.length; r < rl; r++) {
    for (var c = 0, cl = table.rows[r].cols.length; c < cl; c++) {
      if (!('columns' in table.rows[r].cols[c])) {
        table.rows[r].cols[c].rowspan = rl - r;
      }
    }
  }

  return table;
};

var makeBodyRowTable = function makeBodyRowTable(_columns) {
  var columns = _AX6Util2.default.deepCopy(_columns),
      table = {
    rows: []
  },
      colIndex = 0,
      maekRows = function maekRows(_columns, depth, parentField) {
    var row = { cols: [] },
        i = 0,
        l = _columns.length,
        colspan = 1;

    var selfMakeRow = function selfMakeRow(__columns) {
      var i = 0,
          l = __columns.length;
      for (; i < l; i++) {
        var field = __columns[i],
            _colspan = 1;

        if (!field.hidden) {

          if ('key' in field) {
            field.colspan = 1;
            field.rowspan = 1;

            field.rowIndex = depth;
            field.colIndex = function () {
              if (!parentField) {
                return colIndex++;
              } else {
                colIndex = parentField.colIndex + i + 1;
                return parentField.colIndex + i;
              }
            }();

            row.cols.push(field);
            if ('columns' in field) {
              _colspan = maekRows(field.columns, depth + 1, field);
            }
            field.colspan = _colspan;
          } else {
            if ('columns' in field) {
              selfMakeRow(field.columns, depth);
            }
          }
        } else {}
      }
    };

    for (; i < l; i++) {
      var field = _columns[i];
      colspan = 1;

      if (!field.hidden) {

        if ('key' in field) {
          field.colspan = 1;
          field.rowspan = 1;

          field.rowIndex = depth;
          field.colIndex = function () {
            if (!parentField) {
              return colIndex++;
            } else {
              colIndex = parentField.colIndex + i + 1;
              return parentField.colIndex + i;
            }
          }();

          row.cols.push(field);
          if ('columns' in field) {
            colspan = maekRows(field.columns, depth + 1, field);
          }
          field.colspan = colspan;
        } else {
          if ('columns' in field) {
            selfMakeRow(field.columns, depth);
          }
        }
      } else {}

      field = null;
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return row.cols.length - 1 + colspan;
    } else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  (function (table) {
    // set rowspan
    for (var r = 0, rl = table.rows.length; r < rl; r++) {
      var row = table.rows[r];
      for (var c = 0, cl = row.cols.length; c < cl; c++) {
        var col = row.cols[c];
        if (!('columns' in col)) {
          col.rowspan = rl - r;
        }
        col = null;
      }
      row = null;
    }
  })(table);

  return table;
};

var makeBodyRowMap = function makeBodyRowMap(_table) {
  var map = {};
  _table.rows.forEach(function (row) {
    row.cols.forEach(function (col) {
      map[col.rowIndex + "_" + col.colIndex] = _jqmin2.default.extend({}, col);
    });
  });
  return map;
};

var makeFootSumTable = function makeFootSumTable(_footSumColumns) {
  var table = {
    rows: []
  };

  for (var r = 0, rl = _footSumColumns.length; r < rl; r++) {
    var footSumRow = _footSumColumns[r],
        addC = 0;

    table.rows[r] = { cols: [] };

    for (var c = 0, cl = footSumRow.length; c < cl; c++) {
      if (addC > this.colGroup.length) break;
      var colspan = footSumRow[c].colspan || 1;
      if (footSumRow[c].label || footSumRow[c].key) {
        table.rows[r].cols.push({
          colspan: colspan,
          rowspan: 1,
          colIndex: addC,
          columnAttr: "sum",
          align: footSumRow[c].align,
          label: footSumRow[c].label,
          key: footSumRow[c].key,
          collector: footSumRow[c].collector,
          formatter: footSumRow[c].formatter
        });
      } else {
        table.rows[r].cols.push({
          colIndex: addC,
          colspan: colspan,
          rowspan: 1,
          label: "&nbsp;"
        });
      }
      addC += colspan;
      colspan = null;
    }

    if (addC < this.colGroup.length) {
      for (var _c = addC; _c < this.colGroup.length; _c++) {
        table.rows[r].cols.push({
          colIndex: _c,
          colspan: 1,
          rowspan: 1,
          label: "&nbsp;"
        });
      }
    }
    footSumRow = null;
    addC = null;
  }

  return table;
};

var makeBodyGroupingTable = function makeBodyGroupingTable(_bodyGroupingColumns) {
  var table = {
    rows: []
  },
      r = 0,
      addC = 0;

  table.rows[r] = { cols: [] };
  for (var _c2 = 0, cl = _bodyGroupingColumns.length; _c2 < cl; _c2++) {
    if (addC > this.columns.length) break;
    var colspan = _bodyGroupingColumns[_c2].colspan || 1;
    if (_bodyGroupingColumns[_c2].label || _bodyGroupingColumns[_c2].key) {
      table.rows[r].cols.push({
        colspan: colspan,
        rowspan: 1,
        rowIndex: 0,
        colIndex: addC,
        columnAttr: "default",
        align: _bodyGroupingColumns[_c2].align,
        label: _bodyGroupingColumns[_c2].label,
        key: _bodyGroupingColumns[_c2].key,
        collector: _bodyGroupingColumns[_c2].collector,
        formatter: _bodyGroupingColumns[_c2].formatter
      });
    } else {
      table.rows[r].cols.push({
        rowIndex: 0,
        colIndex: addC,
        colspan: colspan,
        rowspan: 1,
        label: "&nbsp;"
      });
    }
    addC += colspan;
  }

  if (addC < this.colGroup.length) {
    for (var c = addC; c < this.colGroup.length; c++) {
      table.rows[r].cols.push({
        rowIndex: 0,
        colIndex: c,
        colspan: 1,
        rowspan: 1,
        label: "&nbsp;"
      });
    }
  }

  return table;
};

var findPanelByColumnIndex = function findPanelByColumnIndex(_dindex, _colIndex, _rowIndex) {
  var _containerPanelName = void 0,
      _isScrollPanel = false,
      _panels = [];

  if (this.xvar.frozenRowIndex > _dindex) _panels.push("top");
  if (this.xvar.frozenColumnIndex > _colIndex) _panels.push("left");
  _panels.push("body");

  if (this.xvar.frozenColumnIndex <= _colIndex || this.xvar.frozenRowIndex <= _dindex) {
    _containerPanelName = _panels.join("-");
    _panels.push("scroll");
    _isScrollPanel = true;
  }

  return {
    panelName: _panels.join("-"),
    containerPanelName: _containerPanelName,
    isScrollPanel: _isScrollPanel
  };
};

var getRealPathForDataItem = function getRealPathForDataItem(_dataPath) {
  var path = [],
      _path = [].concat(_dataPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });
  _path = null;
  return path.join("");
};

exports.default = {
  divideTableByFrozenColumnIndex: divideTableByFrozenColumnIndex,
  getTableByStartEndColumnIndex: getTableByStartEndColumnIndex,
  getMousePosition: getMousePosition,
  ENM: ENM,
  makeHeaderTable: makeHeaderTable,
  makeBodyRowTable: makeBodyRowTable,
  makeBodyRowMap: makeBodyRowMap,
  makeFootSumTable: makeFootSumTable,
  makeBodyGroupingTable: makeBodyGroupingTable,
  findPanelByColumnIndex: findPanelByColumnIndex,
  getRealPathForDataItem: getRealPathForDataItem
};

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIGrid_util = __webpack_require__(19);

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

var _AX6UIGrid_data = __webpack_require__(55);

var _AX6UIGrid_data2 = _interopRequireDefault(_AX6UIGrid_data);

var _AX6UIGrid_page = __webpack_require__(56);

var _AX6UIGrid_page2 = _interopRequireDefault(_AX6UIGrid_page);

var _AX6UIGrid_header = __webpack_require__(57);

var _AX6UIGrid_header2 = _interopRequireDefault(_AX6UIGrid_header);

var _AX6UIGrid_inline_editor = __webpack_require__(106);

var _AX6UIGrid_inline_editor2 = _interopRequireDefault(_AX6UIGrid_inline_editor);

var _AX6UIGrid_collector = __webpack_require__(107);

var _AX6UIGrid_collector2 = _interopRequireDefault(_AX6UIGrid_collector);

var _AX6UIGrid_formatter = __webpack_require__(108);

var _AX6UIGrid_formatter2 = _interopRequireDefault(_AX6UIGrid_formatter);

var _AX6UIGrid_scroller = __webpack_require__(58);

var _AX6UIGrid_scroller2 = _interopRequireDefault(_AX6UIGrid_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnSelect = {
  focusClear: function focusClear() {
    var self = this,
        _column = void 0;
    for (var c in self.focusedColumn) {
      _column = self.focusedColumn[c];
      if (_column) {
        self.$.panel[_column.panelName].find('[data-ax6grid-tr-data-index="' + _column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + _column.rowIndex + '"][data-ax6grid-column-colindex="' + _column.colIndex + '"]').removeAttr('data-ax6grid-column-focused');
      }
    }
    self.focusedColumn = {};
  },
  clear: function clear() {
    var self = this,
        _column = void 0;
    for (var c in self.selectedColumn) {
      _column = self.selectedColumn[c];
      if (_column) {
        self.$.panel[_column.panelName].find('[data-ax6grid-tr-data-index="' + _column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + _column.rowIndex + '"][data-ax6grid-column-colindex="' + _column.colIndex + '"]').removeAttr('data-ax6grid-column-selected');
      }
    }
    self.selectedColumn = {};
  },
  init: function init(column) {
    var self = this;
    if (this.isInlineEditing) {
      for (var editKey in this.inlineEditing) {
        if (editKey == column.dindex + "_" + column.colIndex + "_" + column.rowIndex) {
          return this;
        }
      }
    }

    // focus
    columnSelect.focusClear.call(self);
    self.focusedColumn[column.dindex + "_" + column.colIndex + "_" + column.rowIndex] = {
      panelName: column.panelName,
      dindex: column.dindex,
      doindex: column.doindex,
      rowIndex: column.rowIndex,
      colIndex: column.colIndex,
      colspan: column.colspan
    };

    // select
    columnSelect.clear.call(self);
    self.xvar.selectedRange = {
      start: [column.dindex, column.rowIndex, column.colIndex, column.colspan - 1],
      end: null
    };
    self.selectedColumn[column.dindex + "_" + column.colIndex + "_" + column.rowIndex] = function (data) {
      if (data) {
        return false;
      } else {
        return {
          panelName: column.panelName,
          dindex: column.dindex,
          doindex: column.doindex,
          rowIndex: column.rowIndex,
          colIndex: column.colIndex,
          colspan: column.colspan
        };
      }
    }(self.selectedColumn[column.dindex + "_" + column.colIndex + "_" + column.rowIndex]);

    this.$.panel[column.panelName].find('[data-ax6grid-tr-data-index="' + column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + column.rowIndex + '"][data-ax6grid-column-colindex="' + column.colIndex + '"]').attr('data-ax6grid-column-focused', "true").attr('data-ax6grid-column-selected', "true");

    if (this.isInlineEditing) {
      inlineEdit.deActive.call(this, "RETURN");
    }
  },
  update: function update(column) {
    var self = this;
    var dindex = void 0,
        doindex = void 0,
        colIndex = void 0,
        rowIndex = void 0,
        trl = void 0;

    self.xvar.selectedRange["end"] = [column.dindex, column.rowIndex, column.colIndex, column.colspan - 1];
    columnSelect.clear.call(self);

    var range = {
      r: {
        s: Math.min(self.xvar.selectedRange["start"][0], self.xvar.selectedRange["end"][0]),
        e: Math.max(self.xvar.selectedRange["start"][0], self.xvar.selectedRange["end"][0])
      },
      c: {
        s: Math.min(self.xvar.selectedRange["start"][2], self.xvar.selectedRange["end"][2]),
        e: Math.max(self.xvar.selectedRange["start"][2] + self.xvar.selectedRange["start"][3], self.xvar.selectedRange["end"][2] + self.xvar.selectedRange["end"][3])
      }
    };

    dindex = range.r.s;
    for (; dindex <= range.r.e; dindex++) {

      trl = this.bodyRowTable.rows.length;
      rowIndex = 0;
      for (; rowIndex < trl; rowIndex++) {
        colIndex = range.c.s;
        for (; colIndex <= range.c.e; colIndex++) {
          var _panels = [],
              panelName = "";

          if (self.xvar.frozenRowIndex > dindex) _panels.push("top");
          if (self.xvar.frozenColumnIndex > colIndex) _panels.push("left");
          _panels.push("body");
          if (_panels[0] !== "top") _panels.push("scroll");
          panelName = _panels.join("-");

          self.selectedColumn[dindex + "_" + colIndex + "_" + rowIndex] = {
            panelName: panelName,
            dindex: dindex,
            rowIndex: rowIndex,
            colIndex: colIndex,
            colspan: column.colspan
          };

          _panels = null;
          panelName = null;
        }
      }
    }
    dindex = null;
    doindex = null;
    colIndex = null;
    rowIndex = null;

    for (var c in self.selectedColumn) {
      var _column = self.selectedColumn[c];
      if (_column) {
        self.$.panel[_column.panelName].find('[data-ax6grid-tr-data-index="' + _column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + _column.rowIndex + '"][data-ax6grid-column-colindex="' + _column.colIndex + '"]').attr('data-ax6grid-column-selected', 'true');
      }
    }
  }
};

var columnSelector = {
  "on": function on(cell) {
    var self = this;

    if (this.inlineEditing[cell.dindex + "_" + cell.colIndex + "_" + cell.rowIndex]) {
      return;
    }

    columnSelect.init.call(self, cell);

    this.$["container"]["body"].on("mousemove.ax5grid-" + this.instanceId, '[data-ax6grid-column-attr="default"]', function (e) {
      if (this.getAttribute("data-ax6grid-column-rowIndex")) {
        columnSelect.update.call(self, {
          panelName: this.getAttribute("data-ax6grid-panel-name"),
          dindex: Number(this.getAttribute("data-ax6grid-data-index")),
          doindex: Number(this.getAttribute("data-ax6grid-data-o-index")),
          rowIndex: Number(this.getAttribute("data-ax6grid-column-rowIndex")),
          colIndex: Number(this.getAttribute("data-ax6grid-column-colIndex")),
          colspan: Number(this.getAttribute("colspan"))
        });
        _AX6Util2.default.stopEvent(e);
      }
    }).on("mouseup.ax5grid-" + this.instanceId, function () {
      columnSelector.off.call(self);
    }).on("mouseleave.ax5grid-" + this.instanceId, function () {
      columnSelector.off.call(self);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {

    this.$["container"]["body"].off("mousemove.ax5grid-" + this.instanceId).off("mouseup.ax5grid-" + this.instanceId).off("mouseleave.ax5grid-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};

var resetFrozenColumn = function resetFrozenColumn() {
  var cfg = this.config,
      dividedBodyRowObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.bodyRowTable, this.xvar.frozenColumnIndex);

  this.asideBodyRowData = function (dataTable) {
    var data = { rows: [] };
    for (var i = 0, l = dataTable.rows.length; i < l; i++) {
      data.rows[i] = { cols: [] };
      if (i === 0) {
        var col = {
          label: "",
          colspan: 1,
          rowspan: dataTable.rows.length,
          colIndex: null
        },
            _col = {};

        if (cfg.showLineNumber) {
          _col = _jqmin2.default.extend({}, col, {
            width: cfg.lineNumberColumnWidth,
            _width: cfg.lineNumberColumnWidth,
            columnAttr: "lineNumber",
            label: "&nbsp;", key: "__d-index__"
          });
          data.rows[i].cols.push(_col);
        }
        if (cfg.showRowSelector) {
          _col = _jqmin2.default.extend({}, col, {
            width: cfg.rowSelectorColumnWidth,
            _width: cfg.rowSelectorColumnWidth,
            columnAttr: "rowSelector",
            label: "", key: "__d-checkbox__"
          });
          data.rows[i].cols.push(_col);
        }
      }
    }

    return data;
  }.call(this, this.bodyRowTable);

  //console.log(dividedBodyRowObj);

  this.leftBodyRowData = dividedBodyRowObj.leftData;
  this.bodyRowData = dividedBodyRowObj.rightData;

  if (cfg.body.grouping) {
    var dividedBodyGroupingObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.bodyGroupingTable, this.xvar.frozenColumnIndex);
    this.asideBodyGroupingData = function (dataTable) {
      var data = { rows: [] };
      for (var i = 0, l = dataTable.rows.length; i < l; i++) {
        data.rows[i] = { cols: [] };
        if (i === 0) {
          var col = {
            label: "",
            colspan: 1,
            rowspan: dataTable.rows.length,
            colIndex: null
          },
              _col = {};

          if (cfg.showLineNumber) {
            _col = _jqmin2.default.extend({}, col, {
              width: cfg.lineNumberColumnWidth,
              _width: cfg.lineNumberColumnWidth,
              columnAttr: "lineNumber",
              label: "&nbsp;", key: "__d-index__"
            });
            data.rows[i].cols.push(_col);
          }
          if (cfg.showRowSelector) {
            _col = _jqmin2.default.extend({}, col, {
              width: cfg.rowSelectorColumnWidth,
              _width: cfg.rowSelectorColumnWidth,
              columnAttr: "rowSelector",
              label: "", key: "__d-checkbox__"
            });
            data.rows[i].cols.push(_col);
          }
        }
      }

      return data;
    }.call(this, this.bodyGroupingTable);
    this.leftBodyGroupingData = dividedBodyGroupingObj.leftData;
    this.bodyGroupingData = dividedBodyGroupingObj.rightData;
    this.bodyGroupingMap = _AX6UIGrid_util2.default.makeBodyRowMap.call(this, this.bodyGroupingTable);
  }

  this.leftFootSumData = {};
  this.footSumData = {};
  if (this.config.footSum) {
    var dividedFootSumObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.footSumTable, this.xvar.frozenColumnIndex);
    this.leftFootSumData = dividedFootSumObj.leftData;
    this.footSumData = dividedFootSumObj.rightData;
  }
};

var getFieldValue = function getFieldValue(_list, _item, _index, _col, _value, _returnPlainText) {

  var _key = _col.key,
      tagsToReplace = {
    '<': '&lt;',
    '>': '&gt;'
  };

  if (_key === "__d-index__") {
    return typeof _item["__index"] !== "undefined" ? _item["__index"] + 1 : "";
  } else if (_key === "__d-checkbox__") {
    return "<div class=\"checkBox\" style=\"max-height: " + (_col.width - 10) + "px;min-height: " + (_col.width - 10) + "px;\"></div>";
  } else {
    if (_col.editor && function (_editor) {
      if (_editor.type in _AX6UIGrid_inline_editor2.default) {
        return _AX6UIGrid_inline_editor2.default[_editor.type].editMode == "inline";
      }
      return false;
    }(_col.editor)) {
      // editor가 inline타입이라면

      _value = _value || _AX6UIGrid_data2.default.getValue.call(this, _index, _item.__origin_index__, _key);

      if (_AX6Util2.default.isFunction(_col.editor.disabled)) {
        if (_col.editor.disabled.call({
          list: _list,
          dindex: _index,
          item: _list[_index],
          key: _key,
          value: _value
        })) {
          return _value;
        }
      }

      // print editor
      return _returnPlainText ? _value : _AX6UIGrid_inline_editor2.default[_col.editor.type].getHtml(this, _col.editor, _value);
    }

    var valueProcessor = {
      "formatter": function formatter() {
        var that = {
          key: _key,
          value: _value || _AX6UIGrid_data2.default.getValue.call(this, _index, _item.__origin_index__, _key),
          dindex: _index,
          item: _item,
          list: _list
        };

        var caller = _AX6Util2.default.isFunction(_col.formatter) ? _col.formatter : this.customFormatter[_col.formatter] || _AX6UIGrid_formatter2.default[_col.formatter];
        return caller ? caller.call(that) : that.value;
      },
      "default": function _default() {
        var returnValue = "";

        if (typeof _value !== "undefined") {
          returnValue = _value;
        } else {
          if (/[\.\[\]]/.test(_key)) {
            _value = _AX6UIGrid_data2.default.getValue.call(this, _index, _item.__origin_index__, _key);
          } else {
            _value = _item[_key];
          }

          if (_value !== null && typeof _value !== "undefined") returnValue = _value;
        }

        // 키값이 Boolean일때 오류 발생하여 수정.
        return typeof returnValue !== "string" ? returnValue : returnValue.replace(/[<>]/g, function (tag) {
          return tagsToReplace[tag] || tag;
        });
      },
      "treeControl": function treeControl(__value) {
        var cfg = this.config,
            keys = this.config.tree.columnKeys,
            indentNodeHtml = '';

        if (_item[keys.children].length) {
          indentNodeHtml += '<a ' + 'data-ax6grid-data-index="' + _index + '" ' + 'data-ax6grid-column-attr="tree-control" ' + 'data-ax6grid-tnode-arrow="" ' + 'style="width: ' + cfg.tree.arrowWidth + 'px;padding-left:' + _item[keys.depth] * cfg.tree.indentWidth + 'px;"' + '>';
          indentNodeHtml += _item[keys.collapse] ? cfg.tree.icons.collapsedArrow : cfg.tree.icons.openedArrow;
          indentNodeHtml += '</a>';
        } else {
          indentNodeHtml += '<span ' + 'data-ax6grid-tnode-arrow="" ' + 'style="width: ' + cfg.tree.arrowWidth + 'px;padding-left:' + _item[keys.depth] * cfg.tree.indentWidth + 'px;"' + '>&nbsp;</span>';
        }

        indentNodeHtml += '<span ' + 'data-ax6grid-tnode-item="' + (_item[keys.children].length ? 'group' : 'item') + '" ' + 'style="width: ' + cfg.tree.iconWidth + 'px;"' + '>';
        indentNodeHtml += _item[keys.children].length ? _item[keys.collapse] ? cfg.tree.icons.collapsedGroupIcon : cfg.tree.icons.groupIcon : cfg.tree.icons.itemIcon;
        indentNodeHtml += '</span>';

        return indentNodeHtml + __value;
      }
    };

    var returnValue = _col.formatter ? valueProcessor.formatter.call(this) : valueProcessor.default.call(this);
    if (this.config.tree.use && _col.treeControl) {
      returnValue = valueProcessor.treeControl.call(this, returnValue);
    }

    return returnValue;
  }
};

var getGroupingValue = function getGroupingValue(_item, _index, _col) {
  var value = void 0,
      that = void 0,
      caller = void 0,
      _key = _col.key,
      _label = _col.label;

  if (typeof _key === "undefined") {
    that = {
      key: _key,
      list: _item.__groupingList,
      groupBy: _item.__groupingBy
    };
    if (_AX6Util2.default.isFunction(_label)) {
      value = _label.call(that);
    } else {
      value = _label;
    }
    _item[_col.colIndex] = value;
    return value;
  } else if (_key === "__d-index__") {
    return '';
  } else if (_key === "__d-checkbox__") {
    return '';
  } else {
    if (_col.collector) {
      that = {
        key: _key,
        list: _item.__groupingList
      };
      _item[_col.colIndex] = value = (_AX6Util2.default.isFunction(_col.collector) ? _col.collector : this.customCollector[_col.collector] || _AX6UIGrid_collector2.default[_col.collector]).call(that);
      if (_col.formatter) {
        that.value = value;
        caller = _AX6Util2.default.isFunction(_col.formatter) ? _col.formatter : this.customFormatter[_col.formatter] || _AX6UIGrid_formatter2.default[_col.formatter];
        return caller ? caller.call(that) : value;
      } else {
        return value;
      }
    } else {
      return "&nbsp;";
    }
  }
};

var getSumFieldValue = function getSumFieldValue(_list, _col) {
  var _key = _col.key,
      _label = _col.label;
  //, _collector, _formatter
  if (typeof _key === "undefined") {
    return _label;
  } else if (_key === "__d-index__" || _key === "__d-checkbox__") {
    return '&nbsp;';
  } else {
    if (_col.collector) {
      var that = {
        key: _key,
        list: _list
      };
      var value = (_AX6Util2.default.isFunction(_col.collector) ? _col.collector : this.customCollector[_col.collector] || _AX6UIGrid_collector2.default[_col.collector]).call(that);
      that.value = value;

      if (_col.formatter) {
        return (_AX6Util2.default.isFunction(_col.formatter) ? _col.formatter : this.config.formatter[_col.formatter] || _AX6UIGrid_formatter2.default[_col.formatter]).call(that);
      } else {
        return value;
      }
    } else {
      return "&nbsp;";
    }
  }
};

var inlineEdit = {
  active: function active(_focusedColumn, _e, _initValue) {
    var self = this,
        dindex = void 0,
        doindex = void 0,
        colIndex = void 0,
        rowIndex = void 0,
        panelName = void 0,
        colspan = void 0,
        col = void 0,
        editor = void 0;

    for (var key in _focusedColumn) {
      panelName = _focusedColumn[key].panelName;
      dindex = _focusedColumn[key].dindex;
      doindex = _focusedColumn[key].doindex;
      colIndex = _focusedColumn[key].colIndex;
      rowIndex = _focusedColumn[key].rowIndex;
      colspan = _focusedColumn[key].colspan;

      // 인라인 에디팅을 멈춰야 하는 경우 조건
      col = this.colGroup[colIndex];
      if (!(editor = col.editor)) return this;

      // editor disabled 체크
      if (_AX6Util2.default.isFunction(editor.disabled)) {
        if (editor.disabled.call({
          list: this.list,
          dindex: dindex,
          item: this.list[dindex],
          key: col.key,
          value: _initValue
        })) {
          return this;
        }
      }

      // 조건에 맞지 않는 에디팅 타입이면 반응 없음.
      if (!function (_editor, _type) {
        if (_editor.type in _AX6UIGrid_inline_editor2.default) {
          return _AX6UIGrid_inline_editor2.default[_editor.type].editMode == "popup";
        }
      }(editor)) {
        // 체크 박스 타입이면 값 변경 시도
        if (editor.type == "checkbox") {
          var checked = void 0,
              newValue = void 0;
          if (editor.config && editor.config.trueValue) {
            if (checked = !(_initValue == editor.config.trueValue)) {
              newValue = editor.config.trueValue;
            } else {
              newValue = editor.config.falseValue;
            }
          } else {
            newValue = checked = _initValue == false || _initValue == "false" || _initValue < "1" ? "true" : "false";
          }

          _AX6UIGrid_data2.default.setValue.call(self, dindex, doindex, col.key, newValue);
          updateRowState.call(self, ["cellChecked"], dindex, doindex, {
            key: col.key, rowIndex: rowIndex, colIndex: colIndex,
            editorConfig: col.editor.config, checked: checked
          });
        }
        return this;
      }

      if (this.list[dindex].__isGrouping) {
        return false;
      }
      if (key in this.inlineEditing) {
        return false;
      }

      this.inlineEditing[key] = {
        editor: editor,
        panelName: panelName,
        columnKey: key,
        column: _focusedColumn[key],
        useReturnToSave: _AX6UIGrid_inline_editor2.default[editor.type].useReturnToSave
      };
      this.isInlineEditing = true;
    }
    if (this.isInlineEditing) {

      var originalValue = _AX6UIGrid_data2.default.getValue.call(self, dindex, doindex, col.key),
          initValue = function (__value, __editor) {
        if (_AX6Util2.default.isNothing(__value)) {
          __value = _AX6Util2.default.isNothing(originalValue) ? "" : originalValue;
        }

        if (__editor.type == "money") {
          return _AX6Util2.default.number(__value, { "money": true });
        } else {
          return __value;
        }
      }.call(this, _initValue, editor);

      this.inlineEditing[key].$inlineEditorCell = this.$["panel"][panelName].find('[data-ax6grid-tr-data-index="' + dindex + '"]').find('[data-ax6grid-column-rowindex="' + rowIndex + '"][data-ax6grid-column-colindex="' + colIndex + '"]').find('[data-ax6grid-cellholder]');

      this.inlineEditing[key].$inlineEditor = _AX6UIGrid_inline_editor2.default[editor.type].init(this, key, editor, this.inlineEditing[key].$inlineEditorCell, initValue);

      return true;
    }
  },
  deActive: function deActive(_msg, _key, _value) {
    // console.log(this.inlineEditing.column.dindex, this.inlineEditing.$inlineEditor.val());
    if (!this.inlineEditing[_key]) return this;

    var panelName = this.inlineEditing[_key].panelName,
        dindex = this.inlineEditing[_key].column.dindex,
        doindex = this.inlineEditing[_key].column.doindex,
        rowIndex = this.inlineEditing[_key].column.rowIndex,
        colIndex = this.inlineEditing[_key].column.colIndex,
        column = this.bodyRowMap[this.inlineEditing[_key].column.rowIndex + "_" + this.inlineEditing[_key].column.colIndex],
        editorValue = function ($inlineEditor) {
      if (typeof _value === "undefined") {
        if ($inlineEditor.get(0).tagName == "SELECT" || $inlineEditor.get(0).tagName == "INPUT" || $inlineEditor.get(0).tagName == "TEXTAREA") {
          return $inlineEditor.val();
        } else {
          _msg = "CANCEL";
          return false;
        }
      } else {
        return _value;
      }
    }(this.inlineEditing[_key].$inlineEditor),
        newValue = function (__value, __editor) {
      if (__editor.type == "money") {
        return _AX6Util2.default.number(__value);
      } else {
        return __value;
      }
    }.call(this, editorValue, column.editor);

    var action = {
      "CANCEL": function CANCEL(_dindex, _column, _newValue) {
        action["__clear"].call(this);
      },
      "RETURN": function RETURN(_dindex, _doindex, _column, _newValue) {
        if (_AX6UIGrid_data2.default.setValue.call(this, _dindex, _doindex, _column.key, _newValue)) {
          action["__clear"].call(this);
          repaintCell.call(this, panelName, _dindex, _doindex, rowIndex, colIndex, _newValue);
        } else {
          action["__clear"].call(this);
        }
      },
      "__clear": function __clear() {
        this.isInlineEditing = false;
        var bindedAx5ui = this.inlineEditing[_key].$inlineEditor.data("binded-ax5ui");
        if (bindedAx5ui == "ax5picker") {
          this.inlineEditing[_key].$inlineEditor.ax5picker("close");
        } else if (bindedAx5ui == "ax5select") {
          this.inlineEditing[_key].$inlineEditor.ax5select("close");
        }

        this.inlineEditing[_key].$inlineEditor.remove();
        this.inlineEditing[_key].$inlineEditor = null;
        this.inlineEditing[_key].$inlineEditorCell = null;
        this.inlineEditing[_key] = undefined;
        delete this.inlineEditing[_key]; // delete 지원안하는 브라우저 테스트..
      }
    };

    if (_msg in action) {
      action[_msg || "RETURN"].call(this, dindex, doindex, column, newValue);
    } else {
      action["__clear"].call(this);
    }
  },
  keydown: function keydown(key, columnKey, _options) {
    var processor = {
      "ESC": function ESC() {
        for (var columnKey in this.inlineEditing) {
          inlineEdit.deActive.call(this, "CANCEL", columnKey);
        }
      },
      "RETURN": function RETURN() {
        if (this.isInlineEditing) {
          if (this.inlineEditing[columnKey] && this.inlineEditing[columnKey].useReturnToSave) {
            // todo : 네이밍 검증 할 필요있음.
            inlineEdit.deActive.call(this, "RETURN", columnKey);
          } else {
            return false;
          }
        } else {

          for (var k in this.focusedColumn) {
            var _column = this.focusedColumn[k],
                column = this.bodyRowMap[_column.rowIndex + "_" + _column.colIndex],
                dindex = _column.dindex,
                doindex = _column.doindex,
                value = "",
                col = this.colGroup[_column.colIndex];

            if (column) {
              if (!this.list[dindex].__isGrouping) {
                value = _AX6UIGrid_data2.default.getValue.call(this, dindex, doindex, column.key);
              }
            }

            if (col.editor && _AX6UIGrid_inline_editor2.default[col.editor.type].editMode === "inline") {
              if (_options && _options.moveFocus) {} else {
                if (column.editor && column.editor.type == "checkbox") {
                  value = _AX6UIGrid_data2.default.getValue.call(this, dindex, doindex, column.key);

                  var checked = void 0,
                      newValue = void 0;
                  if (column.editor.config && column.editor.config.trueValue) {
                    // console.log(value, column.editor.config.trueValue);

                    if (value != column.editor.config.trueValue) {
                      newValue = column.editor.config.trueValue;
                      checked = true;
                    } else {
                      newValue = column.editor.config.falseValue;
                      checked = false;
                    }
                  } else {
                    newValue = checked = value == false || value == "false" || value < "1" ? "true" : "false";
                  }

                  _AX6UIGrid_data2.default.setValue.call(this, dindex, doindex, column.key, newValue);
                  updateRowState.call(this, ["cellChecked"], dindex, doindex, {
                    key: column.key, rowIndex: _column.rowIndex, colIndex: _column.colIndex,
                    editorConfig: column.editor.config, checked: checked
                  });
                }
              }
            } else {
              inlineEdit.active.call(this, this.focusedColumn, null, value);
            }
          }
        }
        return true;
      }
    };

    if (key in processor) {
      processor[key].call(this, key, columnKey, _options);
    }
  }
};

var repaint = function repaint(_reset) {
  // debugger;
  var cfg = this.config,
      list = this.proxyList ? this.proxyList : this.list;

  /// repaint reset 타입이면 고정컬럼을 재조정
  if (_reset) {
    resetFrozenColumn.call(this);
    // 틀고정 이 변경되면 출력 시작 인덱스 값을 초기화
    this.xvar.paintStartRowIndex = undefined;
    this.xvar.paintStartColumnIndex = undefined;
  }

  /// 출력시작 인덱스
  var paintStartRowIndex = void 0,
      virtualPaintStartRowIndex = void 0;

  if (this.config.virtualScrollY) {
    virtualPaintStartRowIndex = paintStartRowIndex = Math.floor(-this.$.panel["body-scroll"].position().top / this.xvar.bodyTrHeight) + this.xvar.frozenRowIndex;
    if (this.xvar.paintRowCountTopMargin < paintStartRowIndex) {
      paintStartRowIndex -= this.xvar.paintRowCountTopMargin;
    }
  } else {
    paintStartRowIndex = this.xvar.frozenRowIndex;
  }

  if (isNaN(paintStartRowIndex)) return this;

  var paintStartColumnIndex = 0,
      paintEndColumnIndex = 0,
      nopaintLeftColumnsWidth = null,
      nopaintRightColumnsWidth = null;

  var bodyScrollLeft = -this.$.panel["body-scroll"].position().left;

  if (this.config.virtualScrollX) {
    // 페인트 시작컬럼위치와 종료컬럼위치 구하기
    for (var ci = this.xvar.frozenColumnIndex; ci < this.colGroup.length; ci++) {
      // bodyScrollLeft
      this.colGroup[ci]._sx = ci == this.xvar.frozenColumnIndex ? 0 : this.colGroup[ci - 1]._ex;
      this.colGroup[ci]._ex = this.colGroup[ci]._sx + this.colGroup[ci]._width;

      if (this.colGroup[ci]._sx <= bodyScrollLeft && this.colGroup[ci]._ex >= bodyScrollLeft) {
        paintStartColumnIndex = ci;
      }
      if (this.colGroup[ci]._sx <= bodyScrollLeft + this.xvar.bodyWidth && this.colGroup[ci]._ex >= bodyScrollLeft + this.xvar.bodyWidth) {
        paintEndColumnIndex = ci;

        if (nopaintLeftColumnsWidth === null) nopaintLeftColumnsWidth = this.colGroup[paintStartColumnIndex]._sx;
        if (nopaintRightColumnsWidth === null) nopaintRightColumnsWidth = this.xvar.scrollContentWidth - this.colGroup[ci]._ex;
      }
    }

    if (nopaintLeftColumnsWidth === null) nopaintLeftColumnsWidth = 0;
    if (nopaintRightColumnsWidth === null) nopaintRightColumnsWidth = 0;
    this.$.panel["top-body-scroll"].css({ "padding-left": nopaintLeftColumnsWidth, "padding-right": nopaintRightColumnsWidth });
    this.$.panel["body-scroll"].css({ "padding-left": nopaintLeftColumnsWidth, "padding-right": nopaintRightColumnsWidth });
    this.$.panel["bottom-body-scroll"].css({ "padding-left": nopaintLeftColumnsWidth, "padding-right": nopaintRightColumnsWidth });
  }

  var isFirstPaint = typeof this.xvar.paintStartRowIndex === "undefined",
      headerColGroup = this.headerColGroup,
      asideBodyRowData = this.asideBodyRowData,
      leftBodyRowData = this.leftBodyRowData,
      bodyRowData = this.bodyRowData,
      leftFootSumData = this.leftFootSumData,
      footSumData = this.footSumData,
      asideBodyGroupingData = this.asideBodyGroupingData,
      leftBodyGroupingData = this.leftBodyGroupingData,
      bodyGroupingData = this.bodyGroupingData,
      bodyAlign = cfg.body.align,
      paintRowCount = void 0,
      virtualPaintRowCount = void 0;

  if (!this.config.virtualScrollY) {
    virtualPaintRowCount = paintRowCount = list.length;
  } else {
    virtualPaintRowCount = Math.ceil(this.xvar.bodyHeight / this.xvar.bodyTrHeight);
    paintRowCount = virtualPaintRowCount + (this.xvar.paintRowCountMargin || 1);
  }

  // 여유범위 안에 있으면 페인팅 안할수 있게 paintStartRowIndex 변경하지 않음.
  if (this.xvar.paintRowCountTopMargin < paintStartRowIndex && Math.abs(this.xvar.paintStartRowIndex - paintStartRowIndex) <= this.xvar.paintRowCountTopMargin) {
    paintStartRowIndex = this.xvar.paintStartRowIndex;
  }

  if (this.xvar.dataRowCount === list.length && this.xvar.paintStartRowIndex === paintStartRowIndex && this.xvar.paintRowCount === paintRowCount && this.xvar.paintStartColumnIndex === paintStartColumnIndex && this.xvar.paintEndColumnIndex === paintEndColumnIndex) return this; // 스크롤 포지션 변경 여부에 따라 프로세스 진행여부 결정

  // bodyRowData 수정 : 페인트 컬럼 포지션이 달라지므로
  if (nopaintLeftColumnsWidth || nopaintRightColumnsWidth) {
    headerColGroup = [].concat(headerColGroup).splice(paintStartColumnIndex - this.xvar.frozenColumnIndex, paintEndColumnIndex - paintStartColumnIndex + 1 + this.xvar.frozenColumnIndex);
    bodyRowData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(bodyRowData, paintStartColumnIndex, paintEndColumnIndex);

    if (cfg.body.grouping) {
      bodyGroupingData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(bodyGroupingData, paintStartColumnIndex, paintEndColumnIndex);
    }
    if (cfg.footSum) {
      footSumData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(footSumData, paintStartColumnIndex, paintEndColumnIndex);
    }
    if (this.xvar.paintStartColumnIndex !== paintStartColumnIndex || this.xvar.paintEndColumnIndex !== paintEndColumnIndex) {
      this.needToPaintSum = true;
    }
  }

  /// 스크롤 컨텐츠의 높이 : 그리드 스크롤의 실제 크기와는 관계 없이 데이터 갯수에 따라 스크롤 컨텐츠 높이값 구해서 저장해두기.
  this.xvar.scrollContentHeight = this.xvar.bodyTrHeight * (this.list.length - this.xvar.frozenRowIndex);
  /// 사용된 패널들의 키 모음
  this.$.livePanelKeys = [];

  // 그리드 바디 영역 페인트 함수
  /**
   * @param _elTargetKey
   * @param _colGroup
   * @param _bodyRow
   * @param _groupRow
   * @param _list
   * @param [_scrollConfig]
   * @returns {boolean}
   */
  var repaintBody = function repaintBody(_elTargetKey, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig) {
    var _elTarget = this.$.panel[_elTargetKey];

    if (!isFirstPaint && !_scrollConfig) {
      this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
      return false;
    }

    var SS = [],
        cgi = void 0,
        cgl = void 0,
        di = void 0,
        dl = void 0,
        tri = void 0,
        trl = void 0,
        ci = void 0,
        cl = void 0,
        col = void 0,
        cellHeight = void 0,
        colAlign = void 0,
        isScrolled = function () {
      // 스크롤값이 변경되거나 처음 호출되었습니까?
      if (typeof _scrollConfig === "undefined" || typeof _scrollConfig['paintStartRowIndex'] === "undefined") {
        _scrollConfig = {
          paintStartRowIndex: 0,
          paintRowCount: _list.length
        };
        return false;
      } else {
        return true;
      }
    }(),
        stripeString = '#fff 0px, #fff ' + (cfg.body.columnHeight - cfg.body.columnBorderWidth) + 'px, #eee ' + (cfg.body.columnHeight - cfg.body.columnBorderWidth) + 'px, #eee ' + cfg.body.columnHeight + 'px';

    if (isScrolled) {
      SS.push('<div style="background:repeating-linear-gradient(to top, ' + stripeString + ');' + 'font-size:0;' + 'line-height:0;height: ' + (_scrollConfig.paintStartRowIndex - this.xvar.frozenRowIndex) * _scrollConfig.bodyTrHeight + 'px;"></div>');
    }

    SS.push('<table border="0" cellpadding="0" cellspacing="0">');
    SS.push('<colgroup>');
    for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
      SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
    }
    SS.push('<col  />');
    SS.push('</colgroup>');

    di = _scrollConfig.paintStartRowIndex;

    for (dl = function () {
      var len = void 0;
      len = _list.length;
      if (_scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex < len) {
        len = _scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex;
      }
      return len;
    }(); di < dl; di++) {

      if (_list[di]) {
        var isGroupingRow = false,
            rowTable = void 0,
            odi = typeof _list[di].__origin_index__ !== "undefined" ? _list[di].__origin_index__ : di;
        if (_groupRow && "__isGrouping" in _list[di]) {
          rowTable = _groupRow;
          isGroupingRow = true;
        } else {
          rowTable = _bodyRow;
        }

        for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {

          SS.push('<tr class="tr-' + di % 4 + '', cfg.body.trStyleClass ? _AX6Util2.default.isFunction(cfg.body.trStyleClass) ? ' ' + cfg.body.trStyleClass.call({
            item: _list[di],
            index: di
          }, _list[di], di) : ' ' + cfg.body.trStyleClass : '', '"', isGroupingRow ? ' data-ax6grid-grouping-tr="true"' : '', ' data-ax6grid-tr-data-index="' + di + '"', ' data-ax6grid-tr-data-o-index="' + odi + '"', ' data-ax6grid-selected="' + (_list[di][cfg.columnKeys.selected] || "false") + '"', ' data-ax6grid-disable-selection="' + (_list[di][cfg.columnKeys.disableSelection] || "false") + '"', '>');
          for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
            col = rowTable.rows[tri].cols[ci];
            cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
            colAlign = col.align || bodyAlign;

            SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-data-o-index="' + odi + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
              var attrs = "";
              if (_focusedColumn) {
                attrs += 'data-ax6grid-column-focused="true" ';
              }
              if (_selectedColumn) {
                attrs += 'data-ax6grid-column-selected="true" ';
              }
              return attrs;
            }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
              var tdCSS_class = "";
              if (_col.styleClass) {
                if (_AX6Util2.default.isFunction(_col.styleClass)) {
                  tdCSS_class += _col.styleClass.call({
                    column: _col,
                    key: _col.key,
                    item: _list[di],
                    index: di
                  }) + " ";
                } else {
                  tdCSS_class += _col.styleClass + " ";
                }
              }
              if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
              if (ci == cl - 1) tdCSS_class += "isLastColumn ";
              return tdCSS_class;
            }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

            SS.push(function (_cellHeight) {
              var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
              if (!col.multiLine) {
                _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
              }

              return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
            }(cellHeight), isGroupingRow ? getGroupingValue.call(this, _list[di], di, col) : getFieldValue.call(this, _list, _list[di], di, col), '</span>');

            SS.push('</td>');
          }
          SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-data-o-index="' + odi + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
          SS.push('</tr>');
        }
      }
    }
    SS.push('</table>');

    if (isScrolled && _list.length) {
      SS.push('<div style="background:repeating-linear-gradient(to bottom, ' + stripeString + ');' + 'font-size:0;' + 'line-height:0;height: ' + (_list.length - di) * _scrollConfig.bodyTrHeight + 'px;"></div>');
    }

    _elTarget.empty();
    SS = SS.join('');

    _elTarget.get(0).innerHTML = SS;

    this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
    return true;
  };

  /**
   * @param _elTargetKey
   * @param _colGroup
   * @param _bodyRow
   * @param _list
   * @param [_scrollConfig]
   * @returns {boolean}
   */
  var repaintSum = function repaintSum(_elTargetKey, _colGroup, _bodyRow, _list, _scrollConfig) {
    var _elTarget = this.$.panel[_elTargetKey];

    if (!isFirstPaint && !_scrollConfig) {
      this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
      return false;
    }

    var SS = [],
        cgi = void 0,
        cgl = void 0,
        tri = void 0,
        trl = void 0,
        ci = void 0,
        cl = void 0,
        col = void 0,
        cellHeight = void 0,
        colAlign = void 0;

    SS.push('<table border="0" cellpadding="0" cellspacing="0">');
    SS.push('<colgroup>');
    for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
      SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
    }
    SS.push('<col  />');
    SS.push('</colgroup>');

    for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
      SS.push('<tr class="tr-sum">');
      for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
        col = _bodyRow.rows[tri].cols[ci];
        cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
        colAlign = col.align || bodyAlign;

        SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + tri + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "sum") + '" ', function (_focusedColumn, _selectedColumn) {
          var attrs = "";
          if (_focusedColumn) {
            attrs += 'data-ax6grid-column-focused="true" ';
          }
          if (_selectedColumn) {
            attrs += 'data-ax6grid-column-selected="true" ';
          }
          return attrs;
        }(this.focusedColumn["sum_" + col.colIndex + "_" + tri], this.selectedColumn["sum_" + col.colIndex + "_" + tri]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
          var tdCSS_class = "";
          if (_col.styleClass) {
            if (_AX6Util2.default.isFunction(_col.styleClass)) {
              tdCSS_class += _col.styleClass.call({
                column: _col,
                key: _col.key,
                isFootSum: true
              }) + " ";
            } else {
              tdCSS_class += _col.styleClass + " ";
            }
          }
          if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
          if (ci == cl - 1) tdCSS_class += "isLastColumn ";
          return tdCSS_class;
        }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

        SS.push(function (_cellHeight) {
          var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
          if (!col.multiLine) {
            _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
          }

          return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
        }(cellHeight), getSumFieldValue.call(this, _list, col), '</span>');

        SS.push('</td>');
      }
      SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-column-attr="' + "sum" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
      SS.push('</tr>');
    }

    SS.push('</table>');

    _elTarget.empty();
    SS = SS.join('');

    _elTarget.get(0).innerHTML = SS;

    this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
    return true;
  };

  /**
   * @param _elTargetKey
   * @param _colGroup
   * @param _bodyRow
   * @param _list
   * @param [_scrollConfig]
   * @returns {boolean}
   */
  var mergeCellsBody = function mergeCellsBody(_elTargetKey, _colGroup, _bodyRow, _list, _scrollConfig) {
    var tblRowMaps = [];
    var _elTarget = this.$.panel[_elTargetKey];
    var token = {},
        hasMergeTd = void 0;

    // 테이블의 td들을 수잡하여 저장해두고 스크립트로 반복하여 정리.
    var tableTrs = _elTarget.find("tr");
    for (var ri = 0, rl = tableTrs.length; ri < rl; ri++) {
      var tableTrTds = void 0,
          trMaps = void 0;
      tableTrTds = tableTrs[ri].childNodes;
      trMaps = [];

      for (var _ci = 0, cl = tableTrTds.length; _ci < cl; _ci++) {
        var tdObj = {
          "$": (0, _jqmin2.default)(tableTrTds[_ci])
        };

        if (tdObj["$"].attr("data-ax6grid-column-col") != "null") {
          tdObj.dindex = tdObj["$"].attr("data-ax6grid-data-index");
          tdObj.tri = tdObj["$"].attr("data-ax6grid-column-row");
          tdObj.ci = tdObj["$"].attr("data-ax6grid-column-col");
          tdObj.rowIndex = tdObj["$"].attr("data-ax6grid-column-rowIndex");
          tdObj.colIndex = tdObj["$"].attr("data-ax6grid-column-colIndex");
          tdObj.rowspan = tdObj["$"].attr("rowspan");
          tdObj.text = tdObj["$"].text();
          trMaps.push(tdObj);
        }

        tdObj = null;
      }
      tblRowMaps.push(trMaps);
    }

    // 두줄이상 일 때 의미가 있으니.
    if (tblRowMaps.length > 1) {
      hasMergeTd = false;

      var _loop = function _loop(_ri, _rl) {
        var prevTokenColIndexs = [];

        var _loop2 = function _loop2(_ci3, _cl2) {
          // 적용 하려는 컬럼에 editor 속성이 없다면 머지 대상입니다.

          if (!_colGroup[_ci3].editor && function () {
            if (_AX6Util2.default.isArray(cfg.body.mergeCells)) {
              return _AX6Util2.default.search(cfg.body.mergeCells, _colGroup[_ci3].key) > -1;
            } else {
              return true;
            }
          }()) {

            // 앞줄과 값이 같다면.
            if (token[_ci3] && function () {
              if (prevTokenColIndexs.length > 0) {
                var hasFalse = true;
                prevTokenColIndexs.forEach(function (ti) {
                  if (tblRowMaps[_ri - 1][ti].text != tblRowMaps[_ri][ti].text) {
                    hasFalse = false;
                  }
                });
                return hasFalse;
              } else {
                return true;
              }
            }() && token[_ci3].text == tblRowMaps[_ri][_ci3].text) {
              tblRowMaps[_ri][_ci3].rowspan = 0;
              tblRowMaps[token[_ci3].ri][_ci3].rowspan++;
              hasMergeTd = true;
            } else {
              token[_ci3] = {
                ri: _ri,
                ci: _ci3,
                text: tblRowMaps[_ri][_ci3].text
              };
            }

            prevTokenColIndexs.push(_ci3);
          }
        };

        for (var _ci3 = 0, _cl2 = tblRowMaps[_ri].length; _ci3 < _cl2; _ci3++) {
          _loop2(_ci3, _cl2);
        }
      };

      for (var _ri = 0, _rl = tblRowMaps.length; _ri < _rl; _ri++) {
        _loop(_ri, _rl);
      }

      // rowspan을 다 구했으면 적용합니다.
      if (hasMergeTd) {
        for (var _ri2 = 0, _rl2 = tblRowMaps.length; _ri2 < _rl2; _ri2++) {
          for (var _ci2 = 0, _cl = tblRowMaps[_ri2].length; _ci2 < _cl; _ci2++) {
            if (tblRowMaps[_ri2][_ci2].rowspan == 0) {
              tblRowMaps[_ri2][_ci2]["$"].remove();
            } else if (tblRowMaps[_ri2][_ci2].rowspan > 1) {
              tblRowMaps[_ri2][_ci2]["$"].attr("rowspan", tblRowMaps[_ri2][_ci2].rowspan).addClass("merged");
            }
          }
        }
      }
    }
  };

  var scrollConfig = {
    paintStartRowIndex: paintStartRowIndex,
    paintRowCount: paintRowCount,
    paintStartColumnIndex: paintStartColumnIndex,
    paintEndColumnIndex: paintEndColumnIndex,
    nopaintLeftColumnsWidth: nopaintLeftColumnsWidth,
    nopaintRightColumnsWidth: nopaintRightColumnsWidth,
    bodyTrHeight: this.xvar.bodyTrHeight,
    virtualScrollX: this.config.virtualScrollX,
    virtualScrollY: this.config.virtualScrollY
  };
  var frozenScrollConfig = _jqmin2.default.extend({}, scrollConfig, {
    paintStartRowIndex: 0,
    paintRowCount: this.xvar.frozenRowIndex
  });

  // aside
  if (cfg.asidePanelWidth > 0) {
    if (this.xvar.frozenRowIndex > 0) {
      // 상단 행고정
      repaintBody.call(this, "top-aside-body", this.asideColGroup, asideBodyRowData, asideBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), frozenScrollConfig);
    }

    repaintBody.call(this, "aside-body-scroll", this.asideColGroup, asideBodyRowData, asideBodyGroupingData, list, scrollConfig);

    if (cfg.footSum) {
      // 바닥 요약 (footSum에 대한 aside 사용안함)
      repaintSum.call(this, "bottom-aside-body", this.asideColGroup, asideBodyRowData, null, list);
    }
  }

  // left
  if (this.xvar.frozenColumnIndex > 0) {
    if (this.xvar.frozenRowIndex > 0) {
      // 상단 행고정
      repaintBody.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), frozenScrollConfig);
    }

    repaintBody.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, scrollConfig);

    if (cfg.footSum && this.needToPaintSum) {
      // 바닥 요약
      repaintSum.call(this, "bottom-left-body", this.leftHeaderColGroup, leftFootSumData, list);
    }
  }

  // body
  if (this.xvar.frozenRowIndex > 0) {
    // 상단 행고정
    repaintBody.call(this, "top-body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), frozenScrollConfig);
  }
  repaintBody.call(this, "body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list, scrollConfig);

  // 바닥 요약
  if (cfg.footSum && this.needToPaintSum) {
    repaintSum.call(this, "bottom-body-scroll", headerColGroup, footSumData, list, scrollConfig);
  }
  // right
  if (cfg.rightSum) {}
  // todo : right 표현 정리


  /// mergeCells
  if (cfg.body.mergeCells && this.list.length) {
    // left
    if (this.xvar.frozenColumnIndex > 0) {
      if (this.xvar.frozenRowIndex > 0) {
        // 상단 행고정
        // console.log(this.leftHeaderColGroup, leftBodyRowData);
        mergeCellsBody.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyRowData, list.slice(0, this.xvar.frozenRowIndex));
      }
      mergeCellsBody.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyRowData, list, scrollConfig);
    }

    // body
    if (this.xvar.frozenRowIndex > 0) {
      // 상단 행고정
      mergeCellsBody.call(this, "top-body-scroll", this.headerColGroup, bodyRowData, list.slice(0, this.xvar.frozenRowIndex));
    }
    mergeCellsBody.call(this, "body-scroll", this.headerColGroup, bodyRowData, list, scrollConfig);
  }

  this.xvar.virtualPaintStartRowIndex = virtualPaintStartRowIndex;
  this.xvar.paintStartRowIndex = paintStartRowIndex;
  this.xvar.paintRowCount = paintRowCount;
  this.xvar.virtualPaintRowCount = virtualPaintRowCount;
  this.xvar.paintStartColumnIndex = paintStartColumnIndex;
  this.xvar.paintEndColumnIndex = paintEndColumnIndex;
  this.xvar.nopaintLeftColumnsWidth = nopaintLeftColumnsWidth;
  this.xvar.nopaintRightColumnsWidth = nopaintRightColumnsWidth;
  this.xvar.dataRowCount = list.length;
  this.needToPaintSum = false;

  _AX6UIGrid_page2.default.statusUpdate.call(this);
};

/**
 * @module AX6UIGrid_body
 */
exports.default = {
  /**
   *
   */
  init: function init() {
    var self = this;

    this.$["container"]["body"].on("dblclick", '[data-ax6grid-column-attr]', function (e) {
      var panelName = void 0,
          attr = void 0,
          row = void 0,
          col = void 0,
          dindex = void 0,
          doindex = void 0,
          rowIndex = void 0,
          colIndex = void 0,
          targetDBLClick = {
        "default": function _default(_column) {
          if (self.isInlineEditing) {
            for (var columnKey in self.inlineEditing) {
              if (columnKey == _column.dindex + "_" + _column.colIndex + "_" + _column.rowIndex) {
                return this;
              }
            }
          }

          var column = self.bodyRowMap[_column.rowIndex + "_" + _column.colIndex],
              value = "";
          if (column) {
            if (!self.list[dindex].__isGrouping) {
              value = _AX6UIGrid_data2.default.getValue.call(self, dindex, doindex, column.key);
            }
          }

          var editor = self.colGroup[_column.colIndex].editor;
          if (_AX6Util2.default.isObject(editor)) {
            inlineEdit.active.call(self, self.focusedColumn, e, value);
          } else {
            // 더블클릭 실행
            if (self.config.body.onDBLClick) {
              var that = {
                self: self,
                page: self.page,
                list: self.list,
                item: self.list[_column.dindex],
                dindex: _column.dindex,
                doindex: _column.doindex,
                rowIndex: _column.rowIndex,
                colIndex: _column.colIndex,
                column: column,
                value: self.list[_column.dindex][column.key]
              };
              self.config.body.onDBLClick.call(that);
            }
          }
        },
        "rowSelector": function rowSelector(_column) {},
        "lineNumber": function lineNumber(_column) {}
      };

      panelName = this.getAttribute("data-ax6grid-panel-name");
      attr = this.getAttribute("data-ax6grid-column-attr");
      row = Number(this.getAttribute("data-ax6grid-column-row"));
      col = Number(this.getAttribute("data-ax6grid-column-col"));
      rowIndex = Number(this.getAttribute("data-ax6grid-column-rowIndex"));
      colIndex = Number(this.getAttribute("data-ax6grid-column-colIndex"));
      dindex = Number(this.getAttribute("data-ax6grid-data-index"));
      doindex = Number(this.getAttribute("data-ax6grid-data-o-index"));

      if (attr in targetDBLClick) {
        targetDBLClick[attr]({
          panelName: panelName,
          attr: attr,
          row: row,
          col: col,
          dindex: dindex,
          doindex: doindex,
          rowIndex: rowIndex,
          colIndex: colIndex
        });

        _AX6Util2.default.stopEvent(e);
      }
    });

    this.$["container"]["body"].on("click", '[data-ax6grid-column-attr]', function (e) {
      var panelName = void 0,
          attr = void 0,
          row = void 0,
          col = void 0,
          dindex = void 0,
          doindex = void 0,
          rowIndex = void 0,
          colIndex = void 0,
          disableSelection = void 0,
          targetClick = {
        "default": function _default(_column) {
          var column = self.bodyRowMap[_column.rowIndex + "_" + _column.colIndex],
              that = {
            self: self,
            page: self.page,
            list: self.list,
            item: self.list[_column.doindex],
            dindex: _column.dindex,
            doindex: _column.doindex,
            rowIndex: _column.rowIndex,
            colIndex: _column.colIndex,
            column: column,
            value: self.list[_column.dindex][column.key]
          };

          if (column.editor && column.editor.type == "checkbox") {
            // todo : INLINE_EDITOR에서 처리 할수 있도록 구문 변경 필요.
            var value = _AX6UIGrid_data2.default.getValue.call(self, _column.dindex, _column.doindex, column.key),
                checked = void 0,
                newValue = void 0;

            if (column.editor.config && column.editor.config.trueValue) {
              if (checked = !(value == column.editor.config.trueValue)) {
                newValue = column.editor.config.trueValue;
              } else {
                newValue = column.editor.config.falseValue;
              }
            } else {
              newValue = checked = value == false || value == "false" || value < "1" ? "true" : "false";
            }

            _AX6UIGrid_data2.default.setValue.call(self, _column.dindex, _column.doindex, column.key, newValue);

            updateRowState.call(self, ["cellChecked"], _column.dindex, _column.doindex, {
              key: column.key, rowIndex: _column.rowIndex, colIndex: _column.colIndex,
              editorConfig: column.editor.config, checked: checked
            });
          } else {
            if (self.config.body.onClick) {
              self.config.body.onClick.call(that);
            }
          }
        },
        "rowSelector": function rowSelector(_column) {
          var item = self.list[_column.doindex];
          if (item[self.config.columnKeys.disableSelection]) {
            return false;
          }

          if (!self.config.multipleSelect && self.selectedDataIndexs[0] !== _column.doindex) {
            updateRowState.call(self, ["selectedClear"]);
            _AX6UIGrid_data2.default.clearSelect.call(self);
          }

          _AX6UIGrid_data2.default.select.call(self, _column.dindex, _column.doindex, undefined, {
            internalCall: true
          });
          updateRowState.call(self, ["selected"], _column.dindex, _column.doindex);
        },
        "lineNumber": function lineNumber(_column) {},
        "tree-control": function treeControl(_column, _el) {
          //console.log(_column);
          toggleCollapse.call(self, _column.dindex, _column.doindex);
        }
      };

      panelName = this.getAttribute("data-ax6grid-panel-name");
      attr = this.getAttribute("data-ax6grid-column-attr");
      row = Number(this.getAttribute("data-ax6grid-column-row"));
      col = Number(this.getAttribute("data-ax6grid-column-col"));
      rowIndex = Number(this.getAttribute("data-ax6grid-column-rowIndex"));
      colIndex = Number(this.getAttribute("data-ax6grid-column-colIndex"));
      dindex = Number(this.getAttribute("data-ax6grid-data-index"));
      doindex = Number(this.getAttribute("data-ax6grid-data-o-index"));

      if (attr in targetClick) {
        targetClick[attr]({
          panelName: panelName,
          attr: attr,
          row: row,
          col: col,
          dindex: dindex,
          doindex: doindex,
          rowIndex: rowIndex,
          colIndex: colIndex
        }, this);
      }
    });

    this.$["container"]["body"].on("contextmenu", function (e) {
      var target = void 0,
          dindex = void 0,
          doindex = void 0,
          rowIndex = void 0,
          colIndex = void 0,
          item = void 0,
          column = void 0,
          param = {};

      target = _AX6Util2.default.findParentNode(e.target, function (t) {
        if (t.getAttribute("data-ax6grid-column-attr")) {
          return true;
        }
      });

      if (target) {
        // item 찾기
        rowIndex = Number(target.getAttribute("data-ax6grid-column-rowIndex"));
        colIndex = Number(target.getAttribute("data-ax6grid-column-colIndex"));
        dindex = Number(target.getAttribute("data-ax6grid-data-index"));
        doindex = Number(target.getAttribute("data-ax6grid-data-o-index"));
        column = self.bodyRowMap[rowIndex + "_" + colIndex];
        item = self.list[dindex];
      }

      if (self.config.body.onContextMenu) {
        param = {
          element: target,
          dindex: dindex,
          doindex: doindex,
          rowIndex: rowIndex,
          colIndex: colIndex,
          item: item,
          column: column,
          gridSelf: self
        };
        self.config.body.onContextMenu.call({
          self: self,
          item: item,
          column: column,
          dindex: dindex,
          doindex: doindex,
          rowIndex: rowIndex,
          colIndex: colIndex
        }, e, param);
      }

      _AX6Util2.default.stopEvent(e.originalEvent);
      target = null;
      dindex = null;
      doindex = null;
      rowIndex = null;
      colIndex = null;
      item = null;
      column = null;
      param = null;
    });

    this.$["container"]["body"].on("mousedown", '[data-ax6grid-column-attr="default"]', function (e) {
      if (self.xvar.touchmoved) return false;
      if (this.getAttribute("data-ax6grid-column-rowIndex")) {
        columnSelector.on.call(self, {
          panelName: this.getAttribute("data-ax6grid-panel-name"),
          dindex: Number(this.getAttribute("data-ax6grid-data-index")),
          doindex: Number(this.getAttribute("data-ax6grid-data-o-index")),
          rowIndex: Number(this.getAttribute("data-ax6grid-column-rowIndex")),
          colIndex: Number(this.getAttribute("data-ax6grid-column-colIndex")),
          colspan: Number(this.getAttribute("colspan"))
        });
      }
    }).on("dragstart", function (e) {
      _AX6Util2.default.stopEvent(e);
      return false;
    });

    resetFrozenColumn.call(this);

    // 그리드 바디에 출력할 여유 카운트
    this.xvar.paintRowCountMargin = this.config.virtualScrollYCountMargin;
    this.xvar.paintRowCountTopMargin = this.config.virtualScrollYCountMargin - Math.floor(this.config.virtualScrollYCountMargin / 2);

    if (this.config.virtualScrollAccelerated) {
      this.__throttledScroll = _AX6Util2.default.throttle(function (css, opts) {
        if (this.config.virtualScrollY && !opts.noRepaint && "top" in css) {
          repaint.call(this);
        } else if (this.config.virtualScrollX && !opts.noRepaint && "left" in css) {
          repaint.call(this);
        }
        if (opts.callback) {
          opts.callback();
        }
      }, this.config.virtualScrollAcceleratedDelayTime);
    } else {
      this.__throttledScroll = false;
    }
  },
  /**
   *
   * @param _reset
   * @return {module:AX6UIGrid_body}
   */
  repaint: repaint,
  /**
   *
   * @param _panelName
   * @param _dindex
   * @param _doindex
   * @param _rowIndex
   * @param _colIndex
   * @param _newValue
   */
  repaintCell: function repaintCell(_panelName, _dindex, _doindex, _rowIndex, _colIndex, _newValue) {
    var self = this,
        cfg = this.config,
        list = this.list;

    var updateCell = this.$["panel"][_panelName].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').find('[data-ax6grid-column-rowindex="' + _rowIndex + '"][data-ax6grid-column-colindex="' + _colIndex + '"]').find('[data-ax6grid-cellholder]'),
        colGroup = this.colGroup,
        col = colGroup[_colIndex];

    updateCell.html(getFieldValue.call(this, list, list[_dindex], _dindex, col));

    if (col.editor && col.editor.updateWith) {
      col.editor.updateWith.forEach(function (updateColumnKey) {
        colGroup.forEach(function (col) {
          if (col.key == updateColumnKey) {
            var rowIndex = col.rowIndex,
                colIndex = col.colIndex,
                panelName = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(self, _dindex, colIndex, rowIndex).panelName,
                updateWithCell = self.$["panel"][panelName].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').find('[data-ax6grid-column-rowindex="' + rowIndex + '"][data-ax6grid-column-colindex="' + colIndex + '"]').find('[data-ax6grid-cellholder]');

            updateWithCell.html(getFieldValue.call(self, list, list[_dindex], _dindex, col));
          }
        });
      });
    }

    /// ~~~~~~

    var paintStartRowIndex = Math.floor(Math.abs(this.$.panel["body-scroll"].position().top) / this.xvar.bodyTrHeight) + this.xvar.frozenRowIndex,
        headerColGroup = this.headerColGroup,
        leftFootSumData = this.leftFootSumData,
        footSumData = this.footSumData,
        leftBodyGroupingData = this.leftBodyGroupingData,
        bodyGroupingData = this.bodyGroupingData,
        bodyAlign = cfg.body.align,
        paintRowCount = Math.ceil(this.$.panel["body"].height() / this.xvar.bodyTrHeight) + 1,
        scrollConfig = {
      paintStartRowIndex: paintStartRowIndex,
      paintRowCount: paintRowCount,
      bodyTrHeight: this.xvar.bodyTrHeight
    };

    if (this.xvar.nopaintLeftColumnsWidth || this.xvar.nopaintRightColumnsWidth) {
      headerColGroup = [].concat(headerColGroup).splice(this.xvar.paintStartColumnIndex, this.xvar.paintEndColumnIndex - this.xvar.paintStartColumnIndex + 1);
      if (cfg.body.grouping) {
        bodyGroupingData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(bodyGroupingData, this.xvar.paintStartColumnIndex, this.xvar.paintEndColumnIndex);
      }
      if (cfg.footSum) {
        footSumData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(footSumData, this.xvar.paintStartColumnIndex, this.xvar.paintEndColumnIndex);
      }
    }

    var repaintSum = function repaintSum(_elTargetKey, _colGroup, _bodyRow, _list, _scrollConfig) {
      var _elTarget = this.$.panel[_elTargetKey],
          SS = [],
          cgi = void 0,
          cgl = void 0,
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0,
          cellHeight = void 0,
          colAlign = void 0;

      SS.push('<table border="0" cellpadding="0" cellspacing="0">');
      SS.push('<colgroup>');
      for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
        SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
      }
      SS.push('<col  />');
      SS.push('</colgroup>');

      for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
        SS.push('<tr class="tr-sum">');
        for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
          col = _bodyRow.rows[tri].cols[ci];
          cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
          colAlign = col.align || bodyAlign;

          SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + tri + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "sum") + '" ', function (_focusedColumn, _selectedColumn) {
            var attrs = "";
            if (_focusedColumn) {
              attrs += 'data-ax6grid-column-focused="true" ';
            }
            if (_selectedColumn) {
              attrs += 'data-ax6grid-column-selected="true" ';
            }
            return attrs;
          }(this.focusedColumn["sum_" + col.colIndex + "_" + tri], this.selectedColumn["sum_" + col.colIndex + "_" + tri]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
            var tdCSS_class = "";
            if (_col.styleClass) {
              if (_AX6Util2.default.isFunction(_col.styleClass)) {
                tdCSS_class += _col.styleClass.call({
                  column: _col,
                  key: _col.key,
                  isFootSum: true
                }) + " ";
              } else {
                tdCSS_class += _col.styleClass + " ";
              }
            }
            if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
            if (ci == cl - 1) tdCSS_class += "isLastColumn ";
            return tdCSS_class;
          }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

          SS.push(function (_cellHeight) {
            var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
            if (!col.multiLine) {
              _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
            }

            return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
          }(cellHeight), getSumFieldValue.call(this, _list, col), '</span>');

          SS.push('</td>');
        }
        SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-column-attr="' + "sum" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
        SS.push('</tr>');
      }

      SS.push('</table>');

      _elTarget.empty().get(0).innerHTML = SS.join('');
      return true;
    };
    var replaceGroupTr = function replaceGroupTr(_elTargetKey, _colGroup, _groupRow, _list, _scrollConfig) {
      var _elTarget = this.$.panel[_elTargetKey],
          SS = [],
          di = void 0,
          dl = void 0,
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0,
          cellHeight = void 0,
          colAlign = void 0;

      for (di = _scrollConfig.paintStartRowIndex, dl = function () {
        var len = void 0;
        len = _list.length;
        if (_scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex < len) {
          len = _scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex;
        }
        return len;
      }(); di < dl; di++) {
        if (_list[di] && _groupRow && "__isGrouping" in _list[di]) {
          var rowTable = _groupRow;
          SS = [];
          for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
            for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
              col = rowTable.rows[tri].cols[ci];
              cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
              colAlign = col.align || bodyAlign;

              SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
                var attrs = "";
                if (_focusedColumn) {
                  attrs += 'data-ax6grid-column-focused="true" ';
                }
                if (_selectedColumn) {
                  attrs += 'data-ax6grid-column-selected="true" ';
                }
                return attrs;
              }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                var tdCSS_class = "";
                if (_col.styleClass) {
                  if (_AX6Util2.default.isFunction(_col.styleClass)) {
                    tdCSS_class += _col.styleClass.call({
                      column: _col,
                      key: _col.key,
                      item: _list[di],
                      index: di
                    }) + " ";
                  } else {
                    tdCSS_class += _col.styleClass + " ";
                  }
                }
                if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                return tdCSS_class;
              }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

              SS.push(function (_cellHeight) {
                var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                if (!col.multiLine) {
                  _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                }

                return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
              }(cellHeight), getGroupingValue.call(this, _list[di], di, col), '</span>');

              SS.push('</td>');
            }
            SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
          }
          _elTarget.find('tr[data-ax6grid-tr-data-index="' + di + '"]').empty().get(0).innerHTML = SS.join('');
        }
      }
    };

    // body.grouping tr 다시 그리기..
    if (cfg.body.grouping) {
      // left
      if (this.xvar.frozenColumnIndex > 0) {
        if (this.xvar.frozenRowIndex > 0) {
          // 상단 행고정
          replaceGroupTr.call(this, "top-left-body", headerColGroup, leftBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), {
            paintStartRowIndex: 0,
            paintRowCount: this.xvar.frozenRowIndex,
            bodyTrHeight: this.xvar.bodyTrHeight
          });
        }
        replaceGroupTr.call(this, "left-body-scroll", headerColGroup, leftBodyGroupingData, list, scrollConfig);
      }

      // body
      if (this.xvar.frozenRowIndex > 0) {
        // 상단 행고정
        replaceGroupTr.call(this, "top-body-scroll", headerColGroup, bodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), {
          paintStartRowIndex: 0,
          paintRowCount: this.xvar.frozenRowIndex,
          bodyTrHeight: this.xvar.bodyTrHeight
        });
      }

      replaceGroupTr.call(this, "body-scroll", headerColGroup, bodyGroupingData, list, scrollConfig);
    }

    if (this.xvar.frozenColumnIndex > 0) {
      if (cfg.footSum && this.needToPaintSum) {
        // 바닥 요약
        repaintSum.call(this, "bottom-left-body", headerColGroup, leftFootSumData, list);
      }
    }

    if (cfg.footSum && this.needToPaintSum) {
      // 바닥 요약
      repaintSum.call(this, "bottom-body-scroll", headerColGroup, footSumData, list, scrollConfig);
    }
  },
  /**
   *
   * @param _dindex
   */
  repaintRow: function repaintRow(_dindex) {
    var self = this,
        cfg = this.config,
        list = this.list;
    /// ~~~~~~

    var paintStartRowIndex = Math.floor(Math.abs(this.$.panel["body-scroll"].position().top) / this.xvar.bodyTrHeight) + this.xvar.frozenRowIndex,
        asideBodyRowData = this.asideBodyRowData,
        leftBodyRowData = this.leftBodyRowData,
        bodyRowData = this.bodyRowData,
        leftFootSumData = this.leftFootSumData,
        footSumData = this.footSumData,
        asideBodyGroupingData = this.asideBodyGroupingData,
        leftBodyGroupingData = this.leftBodyGroupingData,
        bodyGroupingData = this.bodyGroupingData,
        bodyAlign = cfg.body.align,
        paintRowCount = Math.ceil(this.$.panel["body"].height() / this.xvar.bodyTrHeight) + 1,
        scrollConfig = {
      paintStartRowIndex: paintStartRowIndex,
      paintRowCount: paintRowCount,
      bodyTrHeight: this.xvar.bodyTrHeight
    };

    var repaintSum = function repaintSum(_elTargetKey, _colGroup, _bodyRow, _list) {
      var _elTarget = this.$.panel[_elTargetKey],
          SS = [],
          cgi = void 0,
          cgl = void 0,
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0,
          cellHeight = void 0,
          colAlign = void 0;

      SS.push('<table border="0" cellpadding="0" cellspacing="0">');
      SS.push('<colgroup>');
      for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
        SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
      }
      SS.push('<col  />');
      SS.push('</colgroup>');

      for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
        SS.push('<tr class="tr-sum">');
        for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
          col = _bodyRow.rows[tri].cols[ci];
          cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
          colAlign = col.align || bodyAlign;

          SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + tri + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "sum") + '" ', function (_focusedColumn, _selectedColumn) {
            var attrs = "";
            if (_focusedColumn) {
              attrs += 'data-ax6grid-column-focused="true" ';
            }
            if (_selectedColumn) {
              attrs += 'data-ax6grid-column-selected="true" ';
            }
            return attrs;
          }(this.focusedColumn["sum_" + col.colIndex + "_" + tri], this.selectedColumn["sum_" + col.colIndex + "_" + tri]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
            var tdCSS_class = "";
            if (_col.styleClass) {
              if (_AX6Util2.default.isFunction(_col.styleClass)) {
                tdCSS_class += _col.styleClass.call({
                  column: _col,
                  key: _col.key,
                  isFootSum: true
                }) + " ";
              } else {
                tdCSS_class += _col.styleClass + " ";
              }
            }
            if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
            if (ci == cl - 1) tdCSS_class += "isLastColumn ";
            return tdCSS_class;
          }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

          SS.push(function (_cellHeight) {
            var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
            if (!col.multiLine) {
              _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
            }

            return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;line-height: ' + lineHeight + 'px;">';
          }(cellHeight), getSumFieldValue.call(this, _list, col), '</span>');

          SS.push('</td>');
        }
        SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-column-attr="' + "sum" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
        SS.push('</tr>');
      }

      SS.push('</table>');

      _elTarget.empty().get(0).innerHTML = SS.join('');
      return true;
    };
    var replaceGroupTr = function replaceGroupTr(_elTargetKey, _colGroup, _groupRow, _list, _scrollConfig) {
      var _elTarget = this.$.panel[_elTargetKey],
          SS = [],
          di = void 0,
          dl = void 0,
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0,
          cellHeight = void 0,
          colAlign = void 0;

      if (typeof _scrollConfig === "undefined" || typeof _scrollConfig['paintStartRowIndex'] === "undefined") {
        _scrollConfig = {
          paintStartRowIndex: 0,
          paintRowCount: _list.length
        };
      }

      for (di = _scrollConfig.paintStartRowIndex, dl = function () {
        var len = void 0;
        len = _list.length;
        if (_scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex < len) {
          len = _scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex;
        }
        return len;
      }(); di < dl; di++) {
        if (_list[di] && _groupRow && "__isGrouping" in _list[di]) {
          var rowTable = _groupRow;
          SS = [];
          for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
            for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
              col = rowTable.rows[tri].cols[ci];
              cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
              colAlign = col.align || bodyAlign;

              SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
                var attrs = "";
                if (_focusedColumn) {
                  attrs += 'data-ax6grid-column-focused="true" ';
                }
                if (_selectedColumn) {
                  attrs += 'data-ax6grid-column-selected="true" ';
                }
                return attrs;
              }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                var tdCSS_class = "";
                if (_col.styleClass) {
                  if (_AX6Util2.default.isFunction(_col.styleClass)) {
                    tdCSS_class += _col.styleClass.call({
                      column: _col,
                      key: _col.key,
                      item: _list[di],
                      index: di
                    }) + " ";
                  } else {
                    tdCSS_class += _col.styleClass + " ";
                  }
                }
                if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                return tdCSS_class;
              }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

              SS.push(function (_cellHeight) {
                var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                if (!col.multiLine) {
                  _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                }

                return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;line-height: ' + lineHeight + 'px;">';
              }(cellHeight), getGroupingValue.call(this, _list[di], di, col), '</span>');

              SS.push('</td>');
            }
            SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
          }
          _elTarget.find('tr[data-ax6grid-tr-data-index="' + di + '"]').empty().get(0).innerHTML = SS.join('');
        }
      }
    };
    var replaceTr = function replaceTr(_elTargetKey, _colGroup, _bodyRow, _list, di) {
      var _elTarget = this.$.panel[_elTargetKey],
          SS = [],
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0,
          cellHeight = void 0,
          colAlign = void 0,
          rowTable = _bodyRow,
          odi = typeof _list[di].__origin_index__ !== "undefined" ? _list[di].__origin_index__ : di;

      for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
        for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
          col = rowTable.rows[tri].cols[ci];
          cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
          colAlign = col.align || bodyAlign;

          SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-data-o-index="' + odi + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
            var attrs = "";
            if (_focusedColumn) {
              attrs += 'data-ax6grid-column-focused="true" ';
            }
            if (_selectedColumn) {
              attrs += 'data-ax6grid-column-selected="true" ';
            }
            return attrs;
          }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
            var tdCSS_class = "";
            if (_col.styleClass) {
              if (_AX6Util2.default.isFunction(_col.styleClass)) {
                tdCSS_class += _col.styleClass.call({
                  column: _col,
                  key: _col.key,
                  item: _list[di],
                  index: di
                }) + " ";
              } else {
                tdCSS_class += _col.styleClass + " ";
              }
            }
            if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
            if (ci == cl - 1) tdCSS_class += "isLastColumn ";
            return tdCSS_class;
          }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

          SS.push(function (_cellHeight) {
            var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
            if (!col.multiLine) {
              _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
            }

            return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
          }(cellHeight), getFieldValue.call(this, _list, _list[di], di, col), '</span>');
          SS.push('</td>');
        }
        SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
      }

      _elTarget.find('tr[data-ax6grid-tr-data-index="' + di + '"]').empty().get(0).innerHTML = SS.join('');
    };

    // left
    if (this.xvar.frozenColumnIndex > 0) {
      if (this.xvar.frozenRowIndex > _dindex) {
        // 상단 행고정
        replaceTr.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyRowData, list.slice(0, this.xvar.frozenRowIndex), _dindex);
      } else {
        replaceTr.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyRowData, list, _dindex);
      }
    }

    // body
    if (this.xvar.frozenRowIndex > _dindex) {
      // 상단 행고정
      replaceTr.call(this, "top-body-scroll", this.headerColGroup, bodyRowData, list.slice(0, this.xvar.frozenRowIndex), _dindex);
    } else {
      replaceTr.call(this, "body-scroll", this.headerColGroup, bodyRowData, list, _dindex);
    }

    // body.grouping tr 다시 그리기..
    if (cfg.body.grouping) {
      // left
      if (this.xvar.frozenColumnIndex > 0) {
        if (this.xvar.frozenRowIndex > _dindex) {
          // 상단 행고정
          replaceGroupTr.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex));
        } else {
          replaceGroupTr.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyGroupingData, list, scrollConfig);
        }
      }

      // body
      if (this.xvar.frozenRowIndex > _dindex) {
        // 상단 행고정
        replaceGroupTr.call(this, "top-body-scroll", this.headerColGroup, bodyGroupingData, list.slice(0, this.xvar.frozenRowIndex));
      } else {
        replaceGroupTr.call(this, "body-scroll", this.headerColGroup, bodyGroupingData, list, scrollConfig);
      }
    }

    if (this.xvar.frozenColumnIndex > 0) {
      if (cfg.footSum && this.needToPaintSum) {
        // 바닥 요약
        repaintSum.call(this, "bottom-left-body", this.leftHeaderColGroup, leftFootSumData, list);
      }
    }

    if (cfg.footSum && this.needToPaintSum) {
      // 바닥 요약
      repaintSum.call(this, "bottom-body-scroll", this.headerColGroup, footSumData, list, scrollConfig);
    }
  },
  /**
   *
   * @param _states
   * @param _dindex
   * @param _doindex
   * @param _data
   */
  updateRowState: function updateRowState(_states, _dindex, _doindex, _data) {
    var self = this,
        cfg = this.config,
        processor = {
      "selected": function selected(_dindex, _doindex) {
        if (this.list[_doindex]) {
          var i = this.$.livePanelKeys.length;
          while (i--) {
            this.$.panel[this.$.livePanelKeys[i]].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').attr("data-ax6grid-selected", this.list[_doindex][cfg.columnKeys.selected]);
          }
        }
      },
      "selectedClear": function selectedClear() {
        var di = this.list.length;
        var pi = void 0;

        if (!this.proxyList) {
          while (di--) {
            if (this.list[di][cfg.columnKeys.selected]) {
              pi = this.$.livePanelKeys.length;
              while (pi--) {
                this.$.panel[this.$.livePanelKeys[pi]].find('[data-ax6grid-tr-data-index="' + di + '"]').attr("data-ax6grid-selected", false);
              }
            }
            this.list[di][cfg.columnKeys.selected] = false;
          }
        } else {
          while (di--) {
            this.list[di][cfg.columnKeys.selected] = false;
          }
          di = this.proxyList.length;
          while (di--) {
            if (this.list[doi][cfg.columnKeys.selected]) {
              pi = this.$.livePanelKeys.length;
              while (pi--) {
                this.$.panel[this.$.livePanelKeys[pi]].find('[data-ax6grid-tr-data-index="' + di + '"]').attr("data-ax6grid-selected", false);
              }
            }

            this.proxyList[di][cfg.columnKeys.selected] = false;
            var doi = this.proxyList[di].__original_index__;
          }
        }
      },
      "cellChecked": function cellChecked(_dindex, _doindex, _data) {
        var key = _data.key,
            rowIndex = _data.rowIndex,
            colIndex = _data.colIndex;

        var panelName = function () {
          var _panels = [];
          if (this.xvar.frozenRowIndex > _dindex) _panels.push("top");
          if (this.xvar.frozenColumnIndex > colIndex) _panels.push("left");
          _panels.push("body");
          if (_panels[0] !== "top") _panels.push("scroll");
          return _panels.join("-");
        }.call(this);

        this.$.panel[panelName].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').find('[data-ax6grid-column-rowIndex="' + rowIndex + '"][data-ax6grid-column-colIndex="' + colIndex + '"]').find('[data-ax6grid-editor="checkbox"]').attr("data-ax6grid-checked", '' + _data.checked);
      }
    };

    if (typeof _doindex === "undefined") _doindex = _dindex;

    _states.forEach(function (_state) {
      if (!processor[_state]) throw 'invaild state name';
      processor[_state].call(self, _dindex, _doindex, _data);
    });
  },
  /**
   *
   * @param _states
   * @param _data
   */
  updateRowStateAll: function updateRowStateAll(_states, _data) {
    var self = this,
        cfg = this.config,
        processor = {
      "selected": function selected(_dindex) {
        repaint.call(this, true);
      }
    };

    _states.forEach(function (_state) {
      if (!processor[_state]) throw 'invaild state name';
      processor[_state].call(self, _data);
    });
  },
  /**
   *
   * @param css
   * @param opts
   */
  scrollTo: function scrollTo(css, opts) {
    var self = this;
    if (typeof opts === "undefined") opts = { timeoutUnUse: false };
    if (this.isInlineEditing) {
      for (var key in this.inlineEditing) {
        //if(this.inlineEditing[key].editor.type === "select") {}
        // 인라인 에디팅 인데 스크롤 이벤트가 발생하면 디액티브 처리
        inlineEdit.deActive.call(this, "ESC", key);
      }
    }

    if (this.config.asidePanelWidth > 0 && "top" in css) {
      this.$.panel["aside-body-scroll"].css({ top: css.top });
    }
    if (this.xvar.frozenColumnIndex > 0 && "top" in css) {
      this.$.panel["left-body-scroll"].css({ top: css.top });
    }
    if (this.xvar.frozenRowIndex > 0 && "left" in css) {
      this.$.panel["top-body-scroll"].css({ left: css.left });
    }

    this.$.panel["body-scroll"].css(css);

    if (this.config.footSum && "left" in css) {
      this.$.panel["bottom-body-scroll"].css({ left: css.left });
    }

    // 바디 리페인팅 this.__throttledScroll 은 body init 에서 초기화
    if (this.__throttledScroll) {
      this.__throttledScroll(css, opts);
    } else {
      if (this.config.virtualScrollY && !opts.noRepaint && "top" in css) {
        repaint.call(this);
      } else if (this.config.virtualScrollX && !opts.noRepaint && "left" in css) {
        repaint.call(this);
      }
      if (opts.callback) {
        opts.callback();
      }
    }
  },
  /**
   *
   */
  blur: function blur() {
    columnSelect.focusClear.call(this);
    columnSelect.clear.call(this);
    if (this.isInlineEditing) {
      inlineEdit.deActive.call(this);
    }
  },
  /**
   *
   * @param _position
   * @return {*}
   */
  moveFocus: function moveFocus(_position) {
    var focus = {
      "UD": function UD(_dy) {
        var moveResult = true,
            focusedColumn = void 0,
            originalColumn = void 0,
            while_i = void 0,
            nPanelInfo = void 0;

        for (var c in this.focusedColumn) {
          focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
          break;
        }

        if (!focusedColumn) return false;

        originalColumn = this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex];
        columnSelect.focusClear.call(this);
        columnSelect.clear.call(this);

        if (_dy > 0) {
          // 아래로
          if (focusedColumn.rowIndex + (originalColumn.rowspan - 1) + _dy > this.bodyRowTable.rows.length - 1) {
            focusedColumn.dindex = focusedColumn.dindex + _dy;
            focusedColumn.doindex = focusedColumn.doindex + _dy;
            focusedColumn.rowIndex = 0;
            if (focusedColumn.dindex > this.list.length - 1) {
              focusedColumn.dindex = focusedColumn.doindex = this.list.length - 1;
              moveResult = false;
            }
          } else {
            focusedColumn.rowIndex = focusedColumn.rowIndex + _dy;
          }
        } else {
          // 위로
          if (focusedColumn.rowIndex + _dy < 0) {
            focusedColumn.dindex = focusedColumn.dindex + _dy;
            focusedColumn.doindex = focusedColumn.doindex + _dy;
            focusedColumn.rowIndex = this.bodyRowTable.rows.length - 1;
            if (focusedColumn.dindex < 0) {
              focusedColumn.dindex = focusedColumn.doindex = 0;
              moveResult = false;
            }
          } else {
            focusedColumn.rowIndex = focusedColumn.rowIndex + _dy;
          }
        }

        while_i = 0;
        while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
          if (focusedColumn.rowIndex == 0 || while_i % 2 == (_dy > 0 ? 0 : 1)) {
            focusedColumn.colIndex--;
          } else {
            focusedColumn.rowIndex--;
          }

          if (focusedColumn.rowIndex <= 0 && focusedColumn.colIndex <= 0) {
            // find fail
            moveResult = false;
            break;
          }
          while_i++;
        }

        nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);

        // if mergeCells
        if (this.config.body.mergeCells && this.list.length) {
          while (!this.$.panel[nPanelInfo.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').get(0)) {

            if (_dy > 0) {
              focusedColumn.dindex++;
            } else {
              focusedColumn.dindex--;
            }

            if (focusedColumn.dindex < 0 || focusedColumn.dindex > this.list.length - 1) {
              break;
            }
          }
          nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);
        }

        focusedColumn.panelName = nPanelInfo.panelName;

        // 포커스 컬럼의 위치에 따라 스크롤 처리.ㅊㅇ

        if (focusedColumn.dindex + 1 > this.xvar.frozenRowIndex) {
          if (focusedColumn.dindex <= this.xvar.virtualPaintStartRowIndex) {
            var newTop = (focusedColumn.dindex - this.xvar.frozenRowIndex - 1) * this.xvar.bodyTrHeight;
            if (newTop < 0) newTop = 0;
            scrollTo.call(this, { top: -newTop, timeoutUnUse: false });
            _AX6UIGrid_scroller2.default.resize.call(this);
          } else if (focusedColumn.dindex + 1 > this.xvar.virtualPaintStartRowIndex + (this.xvar.virtualPaintRowCount - 2)) {
            scrollTo.call(this, { top: (this.xvar.virtualPaintRowCount - 2 - focusedColumn.dindex) * this.xvar.bodyTrHeight, timeoutUnUse: false });
            _AX6UIGrid_scroller2.default.resize.call(this);
          }
        }

        this.focusedColumn[focusedColumn.dindex + "_" + focusedColumn.colIndex + "_" + focusedColumn.rowIndex] = focusedColumn;
        this.$.panel[focusedColumn.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').attr('data-ax6grid-column-focused', "true");

        return moveResult;
      },
      "LR": function LR(_dx) {
        var moveResult = true,
            focusedColumn = void 0,
            originalColumn = void 0,
            while_i = 0,
            isScrollPanel = false,
            containerPanelName = "",
            nPanelInfo = void 0;

        for (var c in this.focusedColumn) {
          focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
          break;
        }
        if (!focusedColumn) return false;

        originalColumn = this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex];

        columnSelect.focusClear.call(this);
        columnSelect.clear.call(this);

        if (_dx < 0) {
          focusedColumn.colIndex = focusedColumn.colIndex + _dx;
          if (focusedColumn.colIndex < 0) {
            focusedColumn.colIndex = 0;
            moveResult = false;
          }
        } else {
          focusedColumn.colIndex = focusedColumn.colIndex + _dx;
          if (focusedColumn.colIndex > this.colGroup.length - 1) {
            focusedColumn.colIndex = this.colGroup.length - 1;
            moveResult = false;
          }
        }

        if (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
          focusedColumn.rowIndex = 0;
        }

        if (this.list[focusedColumn.dindex] && this.list[focusedColumn.dindex].__isGrouping) {
          if (_dx < 0) {
            while (typeof this.bodyGroupingMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
              focusedColumn.colIndex--;
              if (focusedColumn.colIndex <= 0) {
                // find fail
                moveResult = false;
                break;
              }
            }
          } else {
            while (typeof this.bodyGroupingMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
              focusedColumn.colIndex++;
              if (focusedColumn.colIndex >= this.colGroup.length) {
                // find fail
                moveResult = false;
                break;
              }
            }
          }
        } else {
          if (_dx < 0) {
            while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
              focusedColumn.colIndex--;
              if (focusedColumn.colIndex <= 0) {
                // find fail
                moveResult = false;
                break;
              }
            }
          } else {
            while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
              focusedColumn.colIndex++;
              if (focusedColumn.colIndex >= this.colGroup.length) {
                // find fail
                moveResult = false;
                break;
              }
            }
          }
        }

        nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);

        // if mergeCells
        if (this.config.body.mergeCells && this.list.length && focusedColumn.dindex > 1) {
          while (!this.$.panel[nPanelInfo.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').get(0)) {

            focusedColumn.dindex--;

            if (focusedColumn.dindex < 0 || focusedColumn.dindex > this.list.length - 1) {
              break;
            }
          }
          nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);
        }

        focusedColumn.panelName = nPanelInfo.panelName;

        // 포커스 컬럼의 위치에 따라 스크롤 처리
        var isScrollTo = function () {
          if (!this.config.virtualScrollX) return false;
          var scrollLeft = 0;
          if (focusedColumn.colIndex + 1 > this.xvar.frozenColumnIndex) {
            if (focusedColumn.colIndex <= this.xvar.paintStartColumnIndex && this.colGroup[focusedColumn.colIndex]) {
              scrollLeft = -this.colGroup[Number(focusedColumn.colIndex)]._sx;
              scrollTo.call(this, { left: scrollLeft });
              _AX6UIGrid_header2.default.scrollTo.call(this, { left: scrollLeft });
              _AX6UIGrid_scroller2.default.resize.call(this);
              return true;
            } else if (focusedColumn.colIndex >= this.xvar.paintEndColumnIndex && this.colGroup[Number(focusedColumn.colIndex)]) {
              if (this.colGroup[Number(focusedColumn.colIndex)]._ex > this.xvar.bodyWidth) {
                scrollLeft = this.colGroup[Number(focusedColumn.colIndex)]._ex - this.xvar.bodyWidth;
                scrollTo.call(this, { left: -scrollLeft });
                _AX6UIGrid_header2.default.scrollTo.call(this, { left: -scrollLeft });
                _AX6UIGrid_scroller2.default.resize.call(this);
              }
              return true;
            }
          }
          scrollLeft = null;
          return false;
        }.call(this);

        containerPanelName = nPanelInfo.containerPanelName;
        isScrollPanel = nPanelInfo.isScrollPanel;

        this.focusedColumn[focusedColumn.dindex + "_" + focusedColumn.colIndex + "_" + focusedColumn.rowIndex] = focusedColumn;

        var $column = this.$.panel[focusedColumn.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').attr('data-ax6grid-column-focused', "true");

        if (!isScrollTo && $column && isScrollPanel) {
          // 스크롤 패널 이라면~
          // todo : 컬럼이동할 때에도 scrollTo 체크
          var newLeft = function () {
            if ($column.position().left + $column.outerWidth() > Math.abs(this.$.panel[focusedColumn.panelName].position().left) + this.$.panel[containerPanelName].width()) {
              return $column.position().left + $column.outerWidth() - this.$.panel[containerPanelName].width();
            } else if (Math.abs(this.$.panel[focusedColumn.panelName].position().left) > $column.position().left) {
              return $column.position().left;
            } else {
              return;
            }
          }.call(this);

          if (typeof newLeft !== "undefined") {
            _AX6UIGrid_header2.default.scrollTo.call(this, { left: -newLeft });
            scrollTo.call(this, { left: -newLeft });
            _AX6UIGrid_scroller2.default.resize.call(this);
          }
        }

        return moveResult;
      },
      "INDEX": function INDEX(_dindex) {
        var moveResult = true,
            focusedColumn = void 0,
            originalColumn = void 0,
            while_i = void 0;

        for (var c in this.focusedColumn) {
          focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
          break;
        }
        if (!focusedColumn) {
          focusedColumn = {
            rowIndex: 0,
            colIndex: 0
          };
        }
        originalColumn = this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex];

        columnSelect.focusClear.call(this);
        columnSelect.clear.call(this);

        if (_dindex == "end") {
          _dindex = this.list.length - 1;
        }

        focusedColumn.dindex = _dindex;
        focusedColumn.rowIndex = 0;

        while_i = 0;
        while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
          if (focusedColumn.rowIndex == 0 || while_i % 2 == (_dy > 0 ? 0 : 1)) {
            focusedColumn.colIndex--;
          } else {
            focusedColumn.rowIndex--;
          }

          if (focusedColumn.rowIndex <= 0 && focusedColumn.colIndex <= 0) {
            // find fail
            break;
          }
          while_i++;
        }

        var nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);
        focusedColumn.panelName = nPanelInfo.panelName;

        // 포커스 컬럼의 위치에 따라 스크롤 처리.
        (function () {
          if (focusedColumn.dindex + 1 > this.xvar.frozenRowIndex) {
            if (focusedColumn.dindex < this.xvar.virtualPaintStartRowIndex) {
              scrollTo.call(this, { top: -(focusedColumn.dindex - this.xvar.frozenRowIndex) * this.xvar.bodyTrHeight });
              _AX6UIGrid_scroller2.default.resize.call(this);
            } else if (focusedColumn.dindex + 1 > this.xvar.virtualPaintStartRowIndex + (this.xvar.virtualPaintRowCount - 2)) {
              scrollTo.call(this, { top: -(focusedColumn.dindex - this.xvar.frozenRowIndex - this.xvar.virtualPaintRowCount + 3) * this.xvar.bodyTrHeight });
              _AX6UIGrid_scroller2.default.resize.call(this);
            }
          }
        }).call(this);

        this.focusedColumn[focusedColumn.dindex + "_" + focusedColumn.colIndex + "_" + focusedColumn.rowIndex] = focusedColumn;
        this.$.panel[focusedColumn.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').attr('data-ax6grid-column-focused', "true");

        return moveResult;
      }
    };

    var processor = {
      "UP": function UP() {
        return focus["UD"].call(this, -1);
      },
      "DOWN": function DOWN() {
        return focus["UD"].call(this, 1);
      },
      "LEFT": function LEFT() {
        return focus["LR"].call(this, -1);
      },
      "RIGHT": function RIGHT() {
        return focus["LR"].call(this, 1);
      },
      "HOME": function HOME() {
        return focus["INDEX"].call(this, 0);
      },
      "END": function END() {
        return focus["INDEX"].call(this, "end");
      },
      "position": function position(_position) {
        return focus["INDEX"].call(this, _position);
      }
    };

    if (_position in processor) {
      return processor[_position].call(this);
    } else {
      return processor["position"].call(this, _position);
    }
  },
  inlineEdit: inlineEdit,
  /**
   *
   * @return {string}
   */
  getExcelString: function getExcelString() {
    var cfg = this.config,
        list = this.list,
        bodyRowData = this.bodyRowTable,
        footSumData = this.footSumTable,
        bodyGroupingData = this.bodyGroupingTable;

    // body-scroll 의 포지션에 의존적이므로..
    var getBody = function getBody(_colGroup, _bodyRow, _groupRow, _list) {
      var SS = [],
          di = void 0,
          dl = void 0,
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0,
          val = void 0;

      //SS.push('<table border="1">');
      for (di = 0, dl = _list.length; di < dl; di++) {
        var isGroupingRow = false,
            rowTable = void 0;

        if (_groupRow && "__isGrouping" in _list[di]) {
          rowTable = _groupRow;
          isGroupingRow = true;
        } else {
          rowTable = _bodyRow;
        }

        for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
          SS.push('\n<tr>');
          for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
            col = rowTable.rows[tri].cols[ci];

            SS.push('<td ', 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', '>', isGroupingRow ? getGroupingValue.call(this, _list[di], di, col) : getFieldValue.call(this, _list, _list[di], di, col, val, "text"), '&nbsp;</td>');
          }
          SS.push('\n</tr>');
        }
      }
      //SS.push('</table>');
      return SS.join('');
    };
    var getSum = function getSum(_colGroup, _bodyRow, _list) {
      var SS = [],
          tri = void 0,
          trl = void 0,
          ci = void 0,
          cl = void 0,
          col = void 0;

      //SS.push('<table border="1">');
      for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
        SS.push('\n<tr>');
        for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
          col = _bodyRow.rows[tri].cols[ci];
          SS.push('<td ', 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', '>', getSumFieldValue.call(this, _list, col), '</td>');
        }
        SS.push('\n</tr>');
      }
      //SS.push('</table>');

      return SS.join('');
    };

    var po = [];
    po.push(getBody.call(this, this.headerColGroup, bodyRowData, bodyGroupingData, list));
    if (cfg.footSum) {
      // 바닥 요약
      po.push(getSum.call(this, this.headerColGroup, footSumData, list));
    }

    // right
    if (cfg.rightSum) {
      // todo : right 표현 정리
    }

    return po.join('');
  },
  /**
   *
   * @param _dindex
   * @param _doindex
   * @param _collapse
   */
  toggleCollapse: function toggleCollapse(_dindex, _doindex, _collapse) {
    if (_AX6UIGrid_data2.default.toggleCollapse.call(this, _dindex, _doindex, _collapse)) {
      this.proxyList = _AX6UIGrid_data2.default.getProxyList.call(this, this.list);
      repaint.call(this);
    }
  },
  /**
   *
   * @param _dindex
   * @param _doindex
   */
  click: function click(_dindex, _doindex) {
    var that = {
      self: this,
      page: this.page,
      list: this.list,
      item: this.list[_dindex],
      dindex: _dindex
    };

    moveFocus.call(this, _dindex);

    if (this.config.body.onClick) {
      this.config.body.onClick.call(that);
    }

    that = null;
    // console.log(this.$["panel"]["body-scroll"].find('[data-ax6grid-tr-data-index="' + _dindex + '"]>td:first-child'));
  },
  /**
   *
   * @param _dindex
   * @param _doindex
   */
  dblClick: function dblClick(_dindex, _doindex) {
    var that = {
      self: this,
      page: this.page,
      list: this.list,
      item: this.list[_dindex],
      dindex: _dindex
    };

    moveFocus.call(this, _dindex);

    if (this.config.body.onDBLClick) {
      this.config.body.onDBLClick.call(that);
    }

    that = null;
  }
};

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-picker {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: translate(0, 0%); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0); } }\n\n@-moz-keyframes ax-picker {\n  0% {\n    opacity: 0.0;\n    -moz-transform: translate(0, 0%); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: translate(0, 0); } }\n\n@keyframes ax-picker {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: translate(0, 0%);\n    -moz-transform: translate(0, 0%);\n    -ms-transform: translate(0, 0%);\n    -o-transform: translate(0, 0%);\n    transform: translate(0, 0%); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0); } }\n\n@-webkit-keyframes ax-picker-destroy {\n  from {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0); }\n  to {\n    opacity: 0.0;\n    -webkit-transform: scale(0.8) translate(0, -10%); } }\n\n@-moz-keyframes ax-picker-destroy {\n  from {\n    opacity: 1.0;\n    -moz-transform: translate(0, 0); }\n  to {\n    opacity: 0.0;\n    -moz-transform: scale(0.8) translate(0, -10%); } }\n\n@keyframes ax-picker-destroy {\n  from {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  to {\n    opacity: 0.0;\n    -webkit-transform: scale(0.8) translate(0, -10%);\n    -moz-transform: scale(0.8) translate(0, -10%);\n    -ms-transform: scale(0.8) translate(0, -10%);\n    -o-transform: scale(0.8) translate(0, -10%);\n    transform: scale(0.8) translate(0, -10%); } }\n\n[data-ax6ui-picker] {\n  box-sizing: border-box;\n  z-index: 2000;\n  position: absolute;\n  left: 0;\n  top: 0;\n  -webkit-perspective: 1000;\n  -moz-perspective: 1000;\n  perspective: 1000;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-animation: ax-picker 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;\n  -moz-animation: ax-picker 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;\n  animation: ax-picker 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top;\n  /* flip type\n  @include backface-visibility(visible);\n  @include transform(translateY(0%) rotateX(0deg));\n  */\n  background-color: #fff;\n  background-image: -webkit-linear-gradient(bottom, #fff);\n  background-image: linear-gradient(to top,#fff);\n  border: 1px solid;\n  border-color: #ddd;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175); }\n  [data-ax6ui-picker] *,\n  [data-ax6ui-picker] *:before,\n  [data-ax6ui-picker] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-picker] .ax-picker-heading {\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    color: #333;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5); }\n    [data-ax6ui-picker] .ax-picker-heading .badge {\n      font-size: 0.8em;\n      color: #f5f5f5;\n      background-color: #333;\n      background-image: -webkit-linear-gradient(bottom, #333);\n      background-image: linear-gradient(to top,#333); }\n  [data-ax6ui-picker] .ax-picker-body {\n    padding: 5px;\n    text-align: center; }\n    [data-ax6ui-picker] .ax-picker-body .ax-picker-content {\n      min-width: 50px; }\n      [data-ax6ui-picker] .ax-picker-body .ax-picker-content .ax-picker-content-box {\n        border: 0px solid;\n        border-color: none;\n        border-radius: 0px;\n        padding: 0px;\n        overflow: hidden; }\n    [data-ax6ui-picker] .ax-picker-body .ax-picker-buttons {\n      padding: 10px 0px 5px 0px; }\n      [data-ax6ui-picker] .ax-picker-body .ax-picker-buttons button:not(:last-child) {\n        margin-right: 3px; }\n  [data-ax6ui-picker].direction-top .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    top: 0; }\n    [data-ax6ui-picker].direction-top .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      top: -20px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-bottom: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-top .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      top: -18px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-bottom: 20px solid #fff; }\n  [data-ax6ui-picker].direction-right .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    right: 0;\n    top: 50%; }\n    [data-ax6ui-picker].direction-right .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -20px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-left: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-right .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -18px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-left: 20px solid #fff; }\n  [data-ax6ui-picker].direction-bottom .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    bottom: 0; }\n    [data-ax6ui-picker].direction-bottom .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      bottom: -20px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-top: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-bottom .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      bottom: -18px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-top: 20px solid #fff; }\n  [data-ax6ui-picker].direction-left .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 0;\n    top: 50%; }\n    [data-ax6ui-picker].direction-left .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -20px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-right: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-left .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -18px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-right: 20px solid #fff; }\n  [data-ax6ui-picker].destroy {\n    -webkit-animation: ax-picker-destroy 0.1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;\n    -moz-animation: ax-picker-destroy 0.1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;\n    animation: ax-picker-destroy 0.1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards; }\n  [data-ax6ui-picker].direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  [data-ax6ui-picker].direction-right {\n    -webkit-transform-origin: right center;\n    -moz-transform-origin: right center;\n    -ms-transform-origin: right center;\n    -o-transform-origin: right center;\n    transform-origin: right center; }\n  [data-ax6ui-picker].direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  [data-ax6ui-picker].direction-left {\n    -webkit-transform-origin: left center;\n    -moz-transform-origin: left center;\n    -ms-transform-origin: left center;\n    -o-transform-origin: left center;\n    transform-origin: left center; }\n\n.input-group[data-ax6picker] .input-group-addon {\n  cursor: pointer; }\n  .input-group[data-ax6picker] .input-group-addon:not(:last-child) {\n    border-left: 0 none;\n    border-right: 0 none; }\n  .input-group[data-ax6picker] .input-group-addon.color-preview {\n    padding: 0; }\n  .input-group[data-ax6picker] .input-group-addon [data-ax6picker-color=\"preview\"] {\n    display: block; }\n\n.form-group[data-ax6picker] .input-group-addon {\n  cursor: pointer; }\n  .form-group[data-ax6picker] .input-group-addon:not(:last-child) {\n    border-left: 0 none;\n    border-right: 0 none; }\n  .form-group[data-ax6picker] .input-group-addon.color-preview {\n    padding: 0; }\n  .form-group[data-ax6picker] .input-group-addon [data-ax6picker-color=\"preview\"] {\n    display: block; }\n", ""]);

// exports


/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(7);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

var tmpl = {
  menu: function menu(columnKeys) {
    return "\n        <div data-ax6ui-menu=\"\" class=\"{{theme}}\" {{#width}}style=\"width:{{width}}px;\"{{/width}}>\n            <div class=\"ax-menu-body\">\n                {{#" + columnKeys.items + "}}\n                    {{^@isMenu}}\n                        {{#divide}}\n                        <div class=\"ax-menu-item-divide\" data-menu-item-index=\"{{@i}}\"></div>\n                        {{/divide}}\n                        {{#html}}\n                        <div class=\"ax-menu-item-html\" data-menu-item-index=\"{{@i}}\">{{{@html}}}</div>\n                        {{/html}}\n                    {{/@isMenu}}\n                    {{#@isMenu}}\n                    <div class=\"ax-menu-item\" data-menu-item-depth=\"{{@depth}}\" data-menu-item-index=\"{{@i}}\" data-menu-item-path=\"{{@path}}.{{@i}}\">\n                        <span class=\"ax-menu-item-cell ax-menu-item-checkbox\">\n                            {{#check}}\n                            <span class=\"item-checkbox-wrap useCheckBox\" {{#checked}}data-item-checked=\"true\"{{/checked}}></span>\n                            {{/check}}\n                            {{^check}}\n                            <span class=\"item-checkbox-wrap\"></span>\n                            {{/check}}\n                        </span>\n                        {{#icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-icon\" style=\"width:{{cfg.iconWidth}}px;\">{{{.}}}</span>\n                        {{/icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-label\">{{{" + columnKeys.label + "}}}</span>\n                        {{#accelerator}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-accelerator\" style=\"width:{{cfg.acceleratorWidth}}px;\"><span class=\"item-wrap\">{{.}}</span></span>\n                        {{/accelerator}}\n                        {{#@hasChild}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-handle\">{{{cfg.icons.arrow}}}</span>\n                        {{/@hasChild}}\n                    </div>\n                    {{/@isMenu}}\n\n                {{/" + columnKeys.items + "}}\n            </div>\n            <div class=\"ax-menu-arrow\"></div>\n        </div>\n        ";
  },
  menubar: function menubar(columnKeys) {
    return "\n        <div data-ax6ui-menubar=\"\" class=\"{{theme}}\">\n            <div class=\"ax-menu-body\">\n                {{#" + columnKeys.items + "}}\n                    {{^@isMenu}}\n                        {{#divide}}\n                        <div class=\"ax-menu-item-divide\" data-menu-item-index=\"{{@i}}\"></div>\n                        {{/divide}}\n                        {{#html}}\n                        <div class=\"ax-menu-item-html\" data-menu-item-index=\"{{@i}}\">{{{@html}}}</div>\n                        {{/html}}\n                    {{/@isMenu}}\n                    {{#@isMenu}}\n                    <div class=\"ax-menu-item\" data-menu-item-index=\"{{@i}}\">\n                        {{#icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-icon\" style=\"width:{{cfg.iconWidth}}px;\">{{{.}}}</span>\n                        {{/icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-label\">{{{" + columnKeys.label + "}}}</span>\n                    </div>\n                    {{/@isMenu}}\n                {{/" + columnKeys.items + "}}\n            </div>\n        </div>\n        ";
  }
};

var appEventAttach = function appEventAttach(active, opt) {
  if (active) {
    (0, _jqmin2.default)(document.body).off("click.ax5menu-" + this.instanceId).on("click.ax5menu-" + this.instanceId, clickItem.bind(this, opt));

    (0, _jqmin2.default)(window).off("keydown.ax5menu-" + this.instanceId).on("keydown.ax5menu-" + this.instanceId, function (e) {
      if (e.which == _AX6Info2.default.eventKeys.ESC) {
        self.close();
      }
    }).off("resize.ax5menu-" + this.instanceId).on("resize.ax5menu-" + this.instanceId, function (e) {
      self.close();
    });
  } else {
    (0, _jqmin2.default)(document.body).off("click.ax5menu-" + this.instanceId);
    (0, _jqmin2.default)(window).off("keydown.ax5menu-" + this.instanceId);
    (0, _jqmin2.default)(window).off("resize.ax5menu-" + this.instanceId);
  }
};
var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  this.state = that.state;
  opts = null;
  that = null;
  return true;
};
var onLoad = function onLoad(that) {
  if (this.onLoad) {
    this.onLoad.call(that, that);
  }

  that = null;
  return true;
};
var _popup = function _popup(opt, items, depth, path) {
  var self = this,
      cfg = this.config;
  var data = opt,
      $activeMenu = void 0,
      removed = void 0;

  data.theme = opt.theme || cfg.theme;
  data.cfg = {
    icons: _jqmin2.default.extend({}, cfg.icons),
    iconWidth: opt.iconWidth || cfg.iconWidth,
    acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
  };

  items.forEach(function (n) {
    if (n.html || n.divide) {
      n['@isMenu'] = false;
      if (n.html) {
        n['@html'] = n.html.call({
          item: n,
          config: cfg,
          opt: opt
        });
      }
    } else {
      n['@isMenu'] = true;
    }
  });

  data[cfg.columnKeys.items] = items;
  data['@depth'] = depth;
  data['@path'] = path || "root";
  data['@hasChild'] = function () {
    return this[cfg.columnKeys.items] && this[cfg.columnKeys.items].length > 0;
  };
  $activeMenu = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.menu.call(this, cfg.columnKeys), data));
  (0, _jqmin2.default)(document.body).append($activeMenu);

  // remove queue
  removed = this.queue.splice(depth);
  removed.forEach(function (n) {
    n.$target.remove();
  });

  this.queue.push({
    '$target': $activeMenu,
    'data': _jqmin2.default.extend({}, data)
  });

  $activeMenu.on('mouseover', '[data-menu-item-index]', function () {
    var depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        $this = void 0,
        offset = void 0,
        scrollTop = void 0,
        childOpt = void 0,
        _items = void 0,
        _activeMenu = void 0;

    if (depth != null && typeof depth != "undefined") {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
      _activeMenu = self.queue[depth].$target;
      _activeMenu.find('[data-menu-item-index]').removeClass("hover");
      (0, _jqmin2.default)(this).addClass("hover");

      if (_activeMenu.attr("data-selected-menu-item-index") != index) {
        _activeMenu.attr("data-selected-menu-item-index", index);

        if (_items && _items.length > 0) {

          $this = (0, _jqmin2.default)(this);
          offset = $this.offset();
          scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;
          childOpt = {
            '@parent': {
              left: offset.left,
              top: offset.top,
              width: $this.outerWidth(),
              height: $this.outerHeight()
            },
            left: offset.left + $this.outerWidth() - cfg.menuBodyPadding,
            top: offset.top - cfg.menuBodyPadding - 1 - scrollTop
          };

          childOpt = _jqmin2.default.extend(true, opt, childOpt);
          _popup.call(self, childOpt, _items, Number(depth) + 1, path);
        } else {
          self.queue.splice(Number(depth) + 1).forEach(function (n) {
            n.$target.remove();
          });
        }
      }
    }

    depth = null;
    index = null;
    path = null;
    $this = null;
    offset = null;
    scrollTop = null;
    childOpt = null;
    _items = null;
    _activeMenu = null;
  });

  // mouse out
  $activeMenu.on('mouseout', '[data-menu-item-index]', function () {
    var depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        _items = void 0;

    if (path) {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
    }
    if (_items && _items.length > 0) {} else {
      (0, _jqmin2.default)(this).removeClass("hover");
    }
  });

  // is Root
  if (depth == 0) {
    if (data.direction) $activeMenu.addClass("direction-" + data.direction);
    onStateChanged.call(this, null, {
      self: this,
      items: items,
      parent: function (path) {
        if (!path) return false;
        try {
          return Function("", "return this.config.items[" + path.substring(5).replace(/\./g, '].items[') + "];").call(self);
        } catch (e) {}
      }(data['@path']),
      state: "popup"
    });
  }

  align.call(this, $activeMenu, data);
  onLoad.call(this, {
    self: this,
    items: items,
    element: $activeMenu.get(0)
  });

  data = null;
  $activeMenu = null;
  removed = null;
  opt = null;
  items = null;
  depth = null;
  path = null;

  return this;
};
var clickItem = function clickItem(opt, e) {
  var self = this,
      cfg = this.config;
  var target = void 0,
      item = void 0;

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-menu-item-index")) {
      return true;
    }
  });
  if (target) {
    if (typeof opt === "undefined") opt = {};
    item = function (path) {
      if (!path) return false;
      try {
        return Function("", "return this[" + path.substring(5).replace(/\./g, '].' + cfg.columnKeys.items + '[') + "];").call(opt.items || cfg.items);
      } catch (e) {
        console.log(_AX6Info2.default.getError("ax5menu", "501", "menuItemClick"));
      } finally {
        item = null;
      }
    }(target.getAttribute("data-menu-item-path"));

    if (!item) return this;

    if (item.check) {
      (function (items) {
        var setValue = {
          'checkbox': function checkbox(value) {
            this.checked = !value;
          },
          'radio': function radio(value) {
            var name = this.name;
            items.forEach(function (n) {
              if (n.check && n.check.type === 'radio' && n.check.name == name) {
                n.check.checked = false;
              }
            });
            this.checked = !value;
          }
        };
        if (setValue[this.type]) setValue[this.type].call(this, this.checked);
        setValue = null;
      }).call(item.check, cfg.items);

      if (!cfg.itemClickAndClose) {
        self.queue.forEach(function (n) {
          n.$target.find('[data-menu-item-index]').each(function () {
            var item = n.data[cfg.columnKeys.items][this.getAttribute("data-menu-item-index")];
            if (item.check) {
              (0, _jqmin2.default)(this).find(".item-checkbox-wrap").attr("data-item-checked", item.check.checked);
            }
            item = null;
          });
        });
      }
    }

    if (self.onClick) {
      if (self.onClick.call(item, item, opt.param)) {
        self.close();
      }
    }
    if ((!item[cfg.columnKeys.items] || item[cfg.columnKeys.items].length == 0) && cfg.itemClickAndClose) self.close();
  } else {
    self.close();
  }

  target = null;
  item = null;
  return this;
};
var align = function align($activeMenu, data) {
  var self = this,
      cfg = this.config;
  var $window = (0, _jqmin2.default)(window),
      $document = (0, _jqmin2.default)(document),
      wh = cfg.position == "fixed" ? $window.height() : $document.height(),
      ww = $window.width(),
      h = $activeMenu.outerHeight(),
      w = $activeMenu.outerWidth(),
      l = data.left,
      t = data.top,
      position = cfg.position || "fixed";

  if (l + w > ww) {
    if (data['@parent']) {
      l = data['@parent'].left - w + cfg.menuBodyPadding;
    } else {
      l = ww - w;
    }
  }

  if (t + h > wh) {
    t = wh - h;
  }

  $activeMenu.css({ left: l, top: t, position: position });

  $activeMenu = null;
  data = null;
  $window = null;
  $document = null;
  wh = null;
  ww = null;
  h = null;
  w = null;
  l = null;
  t = null;
  position = null;
  return this;
};
/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

/**
 * @class
 */

var AX6UIMenu = function (_AX6UICore) {
  _inherits(AX6UIMenu, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIMenu(config) {
    _classCallCheck(this, AX6UIMenu);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme]
     * @param [config.iconWidth=22]
     * @param [config.acceleratorWidth=100]
     * @param [config.menuBodyPadding=5]
     * @param [config.offset]
     * @param [config.offset.left=0]
     * @param [config.offset.top=0]
     * @param [config.position="fixed"]
     * @param [config.animateTime=250]
     * @param [config.items]
     * @param [config.itemClickAndClose=true]
     * @param [config.columnKeys]
     * @param [config.columnKeys.label='label']
     * @param [config.columnKeys.items='items']
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onLoad]
     *
     */
    var _this = _possibleConstructorReturn(this, (AX6UIMenu.__proto__ || Object.getPrototypeOf(AX6UIMenu)).call(this));

    _this.config = {
      theme: "default",
      iconWidth: 22,
      acceleratorWidth: 100,
      menuBodyPadding: 5,
      offset: { left: 0, top: 0 },
      position: "fixed",
      animateTime: 250,
      items: [],
      itemClickAndClose: true,
      columnKeys: {
        label: 'label',
        items: 'items'
      }
    };
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    /**
     * @member
     */
    _this.openTimer = null;
    /**
     * @member
     */
    _this.closeTimer = null;
    /**
     * @member {Array}
     */
    _this.queue = [];
    /**
     * @member {Object}
     */
    _this.menuBar = {};
    /**
     * @member
     */
    _this.state = undefined;

    if (typeof config !== "undefined") _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UIMenu, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;
      this.onLoad = this.config.onLoad;
      delete this.config.onLoad;

      onStateChanged.call(this, null, {
        self: this,
        state: "init"
      });
      // init 호출 여부
      this.initOnce();
    }

    /**
     * @method
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;
    }

    /**
     * @method
     * @param {Event|Object} e - Event or Object
     * @param {Object} [opt]
     * @param {String} [opt.theme]
     * @param {Function} [opt.filter]
     * @returns {AX6UIMenu}
     */

  }, {
    key: "popup",
    value: function popup(e, opt) {
      var self = this,
          cfg = this.config;
      var getOption = {
        'event': function event(e, opt) {
          e = {
            left: e.clientX,
            top: cfg.position == "fixed" ? e.clientY : e.pageY,
            width: cfg.width,
            theme: cfg.theme
          };

          e.left -= 5;
          e.top -= 5;

          if (cfg.offset) {
            if (cfg.offset.left) e.left += cfg.offset.left;
            if (cfg.offset.top) e.top += cfg.offset.top;
          }
          opt = _jqmin2.default.extend(true, e, opt);

          try {
            return opt;
          } finally {
            e = null;
            //opt = null;
          }
        },
        'object': function object(e, opt) {
          e = {
            left: e.left,
            top: e.top,
            width: e.width || cfg.width,
            theme: e.theme || cfg.theme
          };

          if (cfg.offset) {
            if (cfg.offset.left) e.left += cfg.offset.left;
            if (cfg.offset.top) e.top += cfg.offset.top;
          }

          opt = _jqmin2.default.extend(true, e, opt);

          try {
            return opt;
          } finally {
            e = null;
            //opt = null;
          }
        }
      },
          updateTheme = function updateTheme(theme) {
        if (theme) cfg.theme = theme;
      };

      if (!e) return this;
      opt = getOption[typeof e.clientX == "undefined" ? "object" : "event"].call(this, e, opt);
      updateTheme(opt.theme);

      var items = [].concat(cfg.items),
          _filteringItem = void 0;
      opt.items = items;

      if (opt.filter) {
        _filteringItem = function filteringItem(_items) {
          var arr = [];
          _items.forEach(function (n) {
            if (n.items && n.items.length > 0) {
              n.items = _filteringItem(n.items);
            }
            if (opt.filter.call(n)) {
              arr.push(n);
            }
          });
          return arr;
        };
        opt.items = items = _filteringItem(items);
      }

      if (items.length) {
        appEventAttach.call(this, false);
        _popup.call(this, opt, items, 0); // 0 is seq of queue

        if (this.popupEventAttachTimer) clearTimeout(this.popupEventAttachTimer);
        this.popupEventAttachTimer = setTimeout(function () {
          appEventAttach.call(this, true, opt); // 이벤트 연결
        }.bind(this), 500);
      }

      e = null;
      return this;
    }

    /**
     * @method
     * @param {Element|jQueryObject} el
     * @returns {AX6UIMenu}
     */

  }, {
    key: "attach",
    value: function attach(el, opt) {
      var self = this,
          cfg = this.config;
      var getOption = {
        'object': function object(e, opt) {
          e = {
            left: e.left,
            top: e.top,
            width: e.width || cfg.width,
            theme: e.theme || cfg.theme,
            direction: e.direction || cfg.direction
          };
          opt = _jqmin2.default.extend(true, opt, e);

          try {
            return opt;
          } finally {
            e = null;
            opt = null;
          }
        }
      };

      var popUpChildMenu = function popUpChildMenu(target, opt, eType) {
        var $target = (0, _jqmin2.default)(target),
            offset = $target.offset(),
            height = $target.outerHeight(),
            index = Number(target.getAttribute("data-menu-item-index")),
            scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;

        if (cfg.items && cfg.items[index][cfg.columnKeys.items] && cfg.items[index][cfg.columnKeys.items].length) {

          if (self.menuBar.openedIndex == index) {
            if (eType == "click") self.close();
            return false;
          }

          self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
          self.menuBar.opened = true;
          self.menuBar.openedIndex = index;

          $target.attr("data-menu-item-opened", "true");
          $target.addClass("hover");

          if (cfg.offset) {
            if (cfg.offset.left) offset.left += cfg.offset.left;
            if (cfg.offset.top) offset.top += cfg.offset.top;
          }

          opt = getOption["object"].call(this, { left: offset.left, top: offset.top + height - scrollTop }, opt);

          _popup.call(self, opt, cfg.items[index][cfg.columnKeys.items], 0, 'root.' + target.getAttribute("data-menu-item-index")); // 0 is seq of queue
          appEventAttach.call(self, true, {}); // 이벤트 연결
        }

        target = null;
        opt = null;
        $target = null;
        offset = null;
        height = null;
        index = null;
        scrollTop = null;
      };
      var clickParentMenu = function clickParentMenu(target, opt, eType) {
        var $target = (0, _jqmin2.default)(target),
            offset = $target.offset(),
            height = $target.outerHeight(),
            index = Number(target.getAttribute("data-menu-item-index")),
            scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;
        if (cfg.items && (!cfg.items[index][cfg.columnKeys.items] || cfg.items[index][cfg.columnKeys.items].length == 0)) {
          if (self.onClick) {
            self.onClick.call(cfg.items[index], cfg.items[index]);
          }
        }
      };

      var data = {},
          items = cfg.items,
          $activeMenu = void 0;

      if (typeof opt === "undefined") opt = {};

      data.theme = opt.theme || cfg.theme;
      data.cfg = {
        icons: _jqmin2.default.extend({}, cfg.icons),
        iconWidth: opt.iconWidth || cfg.iconWidth,
        acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
      };

      items.forEach(function (n) {
        if (n.html || n.divide) {
          n['@isMenu'] = false;
          if (n.html) {
            n['@html'] = n.html.call({
              item: n,
              config: cfg,
              opt: opt
            });
          }
        } else {
          n['@isMenu'] = true;
        }
      });

      data[cfg.columnKeys.items] = items;

      $activeMenu = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.menubar.call(this, cfg.columnKeys), data));

      self.menuBar = {
        target: (0, _jqmin2.default)(el),
        opened: false
      };
      self.menuBar.target.html($activeMenu);

      // click, mouseover
      self.menuBar.target.on("click", function (e) {
        if (!e) return this;
        var target = _AX6Util2.default.findParentNode(e.target, function (target) {
          if (target.getAttribute("data-menu-item-index")) {
            return true;
          }
        });
        if (target) {
          clickParentMenu(target, opt, "click");
          popUpChildMenu(target, opt, "click");
        }

        target = null;
      });
      self.menuBar.target.on("mouseover", function (e) {
        if (!self.menuBar.opened) return false;
        var target = _AX6Util2.default.findParentNode(e.target, function (target) {
          if (target.getAttribute("data-menu-item-index")) {
            return true;
          }
        });
        if (target) popUpChildMenu(target, opt, "mouseover");

        target = null;
      });

      el = null;
      opt = null;
      data = null;
      items = null;
      $activeMenu = null;

      return this;
    }

    /**
     * @method
     * @returns {AX6UIMenu}
     */

  }, {
    key: "close",
    value: function close() {
      var self = this,
          cfg = this.config;
      if (self.menuBar && self.menuBar.target) {
        self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
        self.menuBar.opened = false;
        self.menuBar.openedIndex = null;
      }

      appEventAttach.call(this, false); // 이벤트 제거

      this.queue.forEach(function (n) {
        n.$target.remove();
      });
      this.queue = [];

      onStateChanged.call(this, null, {
        self: this,
        state: "close"
      });

      return this;
    }
  }, {
    key: "getCheckValue",


    /**
     * @method
     * @returns {Object} statusCheckItem
     */
    value: function getCheckValue() {

      var checkItems = {};
      var collectItem = function collectItem(items) {
        var i = items.length;
        while (i--) {
          if (items[i].check && items[i].check.checked) {
            if (!checkItems[items[i].check.name]) checkItems[items[i].check.name] = items[i].check.value;else {
              if (_AX6Util2.default.isString(checkItems[items[i].check.name])) checkItems[items[i].check.name] = [checkItems[items[i].check.name]];
              checkItems[items[i].check.name].push(items[i].check.value);
            }
          }
          if (items[i].items && items[i].items.length > 0) collectItem(items[i].items);
        }
      };

      collectItem(this.config.items);

      try {
        return checkItems;
      } finally {
        checkItems = null;
      }
    }
  }]);

  return AX6UIMenu;
}(_AX6UICore3.default);

exports.default = AX6UIMenu;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-menu {\n  0% {\n    opacity: 0.0; }\n  1% {\n    opacity: 0.0; }\n  100% {\n    opacity: 0.95; } }\n\n@-moz-keyframes ax-menu {\n  0% {\n    opacity: 0.0; }\n  1% {\n    opacity: 0.0; }\n  100% {\n    opacity: 0.95; } }\n\n@keyframes ax-menu {\n  0% {\n    opacity: 0.0; }\n  1% {\n    opacity: 0.0; }\n  100% {\n    opacity: 0.95; } }\n\n@-webkit-keyframes ax-menu-destroy {\n  from {\n    -webkit-transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: scale(0.5);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-menu-destroy {\n  from {\n    -moz-transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -moz-transform: scale(0.5);\n    opacity: 0.0; } }\n\n@keyframes ax-menu-destroy {\n  from {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: scale(0.5);\n    -moz-transform: scale(0.5);\n    -ms-transform: scale(0.5);\n    -o-transform: scale(0.5);\n    transform: scale(0.5);\n    opacity: 0.0; } }\n\n[data-ax6ui-menu] {\n  box-sizing: border-box;\n  z-index: 2000;\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  .width: 100px;\n  opacity: 0.95;\n  -webkit-perspective: 1000px;\n  -moz-perspective: 1000px;\n  perspective: 1000px;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-animation: ax-menu 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-animation: ax-menu 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  animation: ax-menu 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top;\n  /* flip type\n  @include backface-visibility(visible);\n  @include transform(translateY(0%) rotateX(0deg));\n  */\n  background-color: #eee;\n  background-image: -webkit-linear-gradient(bottom, #eee);\n  background-image: linear-gradient(to top,#eee);\n  border: 1px solid;\n  border-color: #aaa;\n  border-radius: 5px;\n  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);\n  color: #333; }\n  [data-ax6ui-menu] *,\n  [data-ax6ui-menu] *:before,\n  [data-ax6ui-menu] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-menu] .ax-menu-heading {\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    color: #333;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5); }\n    [data-ax6ui-menu] .ax-menu-heading .badge {\n      font-size: 0.8em;\n      color: #f5f5f5;\n      background-color: #333;\n      background-image: -webkit-linear-gradient(bottom, #333);\n      background-image: linear-gradient(to top,#333); }\n  [data-ax6ui-menu] .ax-menu-body {\n    padding: 5px 0px;\n    text-align: center;\n    position: relative;\n    overflow: hidden; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-item {\n      padding: 4px 0px;\n      text-align: left;\n      background: #eee;\n      color: #444;\n      cursor: pointer;\n      font-size: 13px;\n      display: table;\n      position: relative;\n      border-collapse: separate;\n      box-sizing: border-box;\n      overflow: hidden;\n      width: 100%;\n      height: 18px; }\n      [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell {\n        box-sizing: border-box;\n        display: table-cell;\n        vertical-align: middle;\n        white-space: nowrap;\n        font-size: 13px;\n        line-height: 18px;\n        padding: 0px 0px 0px 0px;\n        user-select: none; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox {\n          overflow: hidden;\n          width: 18px;\n          text-align: center; }\n          [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap {\n            position: relative;\n            display: block;\n            width: 18px;\n            height: 18px; }\n            [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n              content: '';\n              width: 10px;\n              height: 5px;\n              position: absolute;\n              top: 4px;\n              left: 4px;\n              border: 2px solid #444;\n              border-top: none;\n              border-right: none;\n              background: transparent;\n              opacity: 0.1;\n              -webkit-transform: rotate(-50deg);\n              -moz-transform: rotate(-50deg);\n              -ms-transform: rotate(-50deg);\n              -o-transform: rotate(-50deg);\n              transform: rotate(-50deg); }\n            [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap.useCheckBox[data-item-checked=\"true\"]:after {\n              opacity: 1; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-icon {\n          text-align: left; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-label {\n          padding-right: 10px; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-accelerator {\n          text-align: right;\n          padding: 0px 7px 0px 0px; }\n          [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-accelerator .item-wrap {\n            width: 100%;\n            vertical-align: middle;\n            display: inline-block;\n            max-width: 100%;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            word-wrap: normal;\n            display: block; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-handle {\n          overflow: hidden;\n          width: 14px;\n          text-align: center; }\n      [data-ax6ui-menu] .ax-menu-body .ax-menu-item:hover, [data-ax6ui-menu] .ax-menu-body .ax-menu-item.hover {\n        background: #999;\n        color: #fff; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item:hover .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap:after, [data-ax6ui-menu] .ax-menu-body .ax-menu-item.hover .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap:after {\n          border-color: #fff; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-item-divide {\n      border-top: 1px solid;\n      border-color: #aaaaaa;\n      margin: 5px 0px; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-item-html {\n      padding: 0px 5px;\n      text-align: left; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-buttons button:not(:last-child) {\n      margin-right: 3px; }\n  [data-ax6ui-menu].direction-top {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px; }\n    [data-ax6ui-menu].direction-top.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: 50%;\n      top: 0px; }\n      [data-ax6ui-menu].direction-top.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        top: -20px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-top.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        top: -18px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 20px solid #eee; }\n  [data-ax6ui-menu].direction-right {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 5px;\n    border-bottom-left-radius: 5px; }\n    [data-ax6ui-menu].direction-right.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: 0px;\n      top: 50%; }\n      [data-ax6ui-menu].direction-right.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        right: -20px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-left: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-right.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        right: -18px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-left: 20px solid #eee; }\n  [data-ax6ui-menu].direction-bottom {\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px; }\n    [data-ax6ui-menu].direction-bottom.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: 50%;\n      bottom: 0px; }\n      [data-ax6ui-menu].direction-bottom.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        bottom: -20px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-top: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-bottom.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        bottom: -18px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-top: 20px solid #eee; }\n  [data-ax6ui-menu].direction-left {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px; }\n    [data-ax6ui-menu].direction-left.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: 0px;\n      top: 50%; }\n      [data-ax6ui-menu].direction-left.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -20px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-right: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-left.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -18px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-right: 20px solid #eee; }\n  [data-ax6ui-menu].destroy {\n    -webkit-animation: ax-menu-destroy 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    -moz-animation: ax-menu-destroy 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    animation: ax-menu-destroy 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }\n  [data-ax6ui-menu].direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  [data-ax6ui-menu].direction-right {\n    -webkit-transform-origin: right center;\n    -moz-transform-origin: right center;\n    -ms-transform-origin: right center;\n    -o-transform-origin: right center;\n    transform-origin: right center; }\n  [data-ax6ui-menu].direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  [data-ax6ui-menu].direction-left {\n    -webkit-transform-origin: left center;\n    -moz-transform-origin: left center;\n    -ms-transform-origin: left center;\n    -o-transform-origin: left center;\n    transform-origin: left center; }\n\n[data-ax6ui-menubar] {\n  box-sizing: border-box;\n  height: 100%;\n  position: relative; }\n  [data-ax6ui-menubar] .ax-menu-body {\n    display: table;\n    height: 100%;\n    border-collapse: separate;\n    box-sizing: border-box; }\n    [data-ax6ui-menubar] .ax-menu-body .ax-menu-item {\n      display: table-cell;\n      height: 100%;\n      vertical-align: middle;\n      white-space: nowrap;\n      box-sizing: border-box;\n      padding: 0px 10px;\n      cursor: pointer;\n      font-size: 13px; }\n      [data-ax6ui-menubar] .ax-menu-body .ax-menu-item .ax-menu-item-cell {\n        white-space: nowrap;\n        user-select: none; }\n  [data-ax6ui-menubar] .ax-menu-body .ax-menu-item {\n    color: #444; }\n    [data-ax6ui-menubar] .ax-menu-body .ax-menu-item:hover, [data-ax6ui-menubar] .ax-menu-body .ax-menu-item.hover {\n      background: #999;\n      color: #fff; }\n", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);
var bind = __webpack_require__(13);
var Axios = __webpack_require__(39);
var defaults = __webpack_require__(10);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(18);
axios.CancelToken = __webpack_require__(53);
axios.isCancel = __webpack_require__(17);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(54);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(10);
var utils = __webpack_require__(9);
var InterceptorManager = __webpack_require__(48);
var dispatchRequest = __webpack_require__(49);
var isAbsoluteURL = __webpack_require__(51);
var combineURLs = __webpack_require__(52);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(16);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);
var transformData = __webpack_require__(50);
var isCancel = __webpack_require__(17);
var defaults = __webpack_require__(10);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(18);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIGrid_page = __webpack_require__(56);

var _AX6UIGrid_page2 = _interopRequireDefault(_AX6UIGrid_page);

var _AX6UIGrid_util = __webpack_require__(19);

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {};

var clearGroupingData = function clearGroupingData(_list) {
  var i = 0,
      l = _list.length,
      returnList = [];
  for (; i < l; i++) {
    if (_list[i] && !_list[i]["__isGrouping"]) {
      if (_list[i][this.config.columnKeys.selected]) {
        this.selectedDataIndexs.push(i);
      }
      returnList.push(_jqmin2.default.extend({}, _list[i]));
    }
  }
  return returnList;
};

var initData = function initData(_list) {
  this.selectedDataIndexs = [];
  // this.deletedList = [];
  // todo : deletedList 초기화 시점이 언제로 하는게 좋은가. set 메소드에서 초기화 하는 것으로 수정

  var i = 0,
      l = _list.length,
      returnList = [],
      appendIndex = 0,
      dataRealRowCount = 0,
      lineNumber = 0;

  if (this.config.body.grouping) {

    var groupingKeys = _AX6Util2.default.map(this.bodyGrouping.by, function () {
      return {
        key: this,
        compareString: "",
        grouping: false,
        list: []
      };
    });

    var gi = 0,
        gl = groupingKeys.length,
        compareString = void 0,
        appendRow = [],
        ari = void 0;
    for (; i < l + 1; i++) {
      gi = 0;

      if (_list[i] && _list[i][this.config.columnKeys.deleted]) {
        this.deletedList.push(_list[i]);
      } else {
        compareString = ""; // 그룹핑 구문검사용
        appendRow = []; // 현재줄 앞에 추가해줘야 하는 줄

        // 그룹핑 구문검사
        for (; gi < gl; gi++) {
          if (_list[i]) {
            compareString += "$|$" + _list[i][groupingKeys[gi].key];
          }

          if (appendIndex > 0 && compareString != groupingKeys[gi].compareString) {
            var appendRowItem = { keys: [], labels: [], list: groupingKeys[gi].list };
            for (var ki = 0; ki < gi + 1; ki++) {
              appendRowItem.keys.push(groupingKeys[ki].key);
              appendRowItem.labels.push(_list[i - 1][groupingKeys[ki].key]);
            }
            appendRow.push(appendRowItem);
            groupingKeys[gi].list = [];
          }

          groupingKeys[gi].list.push(_list[i]);
          groupingKeys[gi].compareString = compareString;
        }

        // 새로 추가해야할 그룹핑 row
        ari = appendRow.length;
        while (ari--) {
          returnList.push({ __isGrouping: true, __groupingList: appendRow[ari].list, __groupingBy: { keys: appendRow[ari].keys, labels: appendRow[ari].labels } });
        }
        //~ 그룹핑 구문 검사 완료

        if (_list[i]) {
          if (_list[i][this.config.columnKeys.selected]) {
            this.selectedDataIndexs.push(i);
          }
          // 그룹핑이 적용된 경우 오리지널 인덱스 의미 없음 : 정렬보다 그룹핑이 더 중요하므로.
          _list[i]["__original_index"] = _list[i]["__index"] = lineNumber;
          returnList.push(_list[i]);

          dataRealRowCount++;
          appendIndex++;
          lineNumber++;
        }
      }
    }
  } else {
    for (; i < l; i++) {
      if (_list[i]) {
        if (_list[i][this.config.columnKeys.deleted]) {
          this.deletedList.push(_list[i]);
        } else {

          if (_list[i][this.config.columnKeys.selected]) {
            this.selectedDataIndexs.push(i);
          }

          // __original_index 인덱스 키가 없다면 추가.
          if (typeof _list[i]["__original_index"] === "undefined") {
            _list[i]["__original_index"] = lineNumber;
          }
          _list[i]["__index"] = lineNumber;
          dataRealRowCount++;
          lineNumber++;
          returnList.push(_list[i]);
        }
      }
    }
  }

  // 원본 데이터의 갯수
  // grouping은 제외하고 수집됨.
  this.xvar.dataRealRowCount = dataRealRowCount;
  return returnList;
};

var arrangeData4tree = function arrangeData4tree(_list) {
  this.selectedDataIndexs = [];
  this.deletedList = [];
  var i = 0,
      seq = 0,
      appendIndex = 0,
      dataRealRowCount = 0,
      lineNumber = 0;

  var li = _list.length;
  var keys = this.config.tree.columnKeys;
  var hashDigit = this.config.tree.hashDigit;
  var listIndexMap = {};

  while (li--) {
    delete _list[li][keys.parentHash];
    delete _list[li][keys.selfHash];
    //delete _list[li][keys.childrenLength];
  }

  /// 루트 아이템 수집
  i = 0;
  seq = 0;
  li = _list.length;
  for (; i < li; i++) {
    if (_list[i]) {
      listIndexMap[_list[i][keys.selfKey]] = i; // 인덱싱

      if (_AX6Util2.default.isNothing(_list[i][keys.parentKey]) || _list[i][keys.parentKey] === "top") {
        // 최상위 아이템인 경우
        _list[i][keys.parentKey] = "top";
        _list[i][keys.children] = [];
        _list[i][keys.parentHash] = _AX6Util2.default.setDigit("0", hashDigit);
        _list[i][keys.selfHash] = _AX6Util2.default.setDigit("0", hashDigit) + "." + _AX6Util2.default.setDigit(seq, hashDigit);
        _list[i][keys.depth] = 0;
        _list[i][keys.hidden] = false;

        seq++;
      }
    }
  }

  /// 자식 아이템 수집
  i = 0;
  lineNumber = 0;
  for (; i < li; i++) {
    var _parent = void 0,
        _parentHash = void 0;
    if (_list[i] && _list[i][keys.parentKey] !== "top" && typeof _list[i][keys.parentHash] === "undefined") {

      if (_parent = _list[listIndexMap[_list[i][keys.parentKey]]]) {
        _parentHash = _parent[keys.selfHash];
        _list[i][keys.children] = [];
        _list[i][keys.parentHash] = _parentHash;
        _list[i][keys.selfHash] = _parentHash + "." + _AX6Util2.default.setDigit(_parent[keys.children].length, hashDigit);
        _list[i][keys.depth] = _parent[keys.depth] + 1;
        if (_parent[keys.collapse] || _parent[keys.hidden]) _list[i][keys.hidden] = true;
        _parent[keys.children].push(_list[i][keys.selfKey]);
      } else {
        _list[i][keys.parentKey] = "top";
        _list[i][keys.children] = [];
        _list[i][keys.parentHash] = _AX6Util2.default.setDigit("0", hashDigit);
        _list[i][keys.selfHash] = _AX6Util2.default.setDigit("0", hashDigit) + "." + _AX6Util2.default.setDigit(seq, hashDigit);
        _list[i][keys.hidden] = false;

        seq++;
      }
    }

    if (_list[i]) {
      if (_list[i][this.config.columnKeys.deleted]) {
        this.deletedList.push(_list[i]);
        _list[i][keys.hidden] = true;
      } else if (_list[i][this.config.columnKeys.selected]) {
        this.selectedDataIndexs.push(i);
      }

      _list[i]["__index"] = lineNumber;
      dataRealRowCount++;
      lineNumber++;
    }
  }

  this.listIndexMap = listIndexMap;
  this.xvar.dataRealRowCount = dataRealRowCount;

  return _list;
};

var getProxyList = function getProxyList(_list) {
  var i = 0,
      l = _list.length,
      returnList = [];
  for (; i < l; i++) {

    if (_list[i] && !_list[i][this.config.tree.columnKeys.hidden]) {
      _list[i].__origin_index__ = i;
      returnList.push(_list[i]);
    }
  }
  return returnList;
};

var set = function set(data) {

  var list = void 0;
  if (_AX6Util2.default.isArray(data)) {
    this.page = null;
    list = data;
  } else if ("page" in data) {
    this.page = _jqmin2.default.extend({}, data.page);
    list = data.list;
  }

  // console.log(this.list.length);

  if (this.config.tree.use) {
    this.list = arrangeData4tree.call(this, list);
    this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
  } else {
    this.proxyList = null;
    this.list = initData.call(this, !this.config.remoteSort && Object.keys(this.sortInfo).length ? sort.call(this, this.sortInfo, list) : list);
  }
  this.selectedDataIndexs = [];
  this.deletedList = [];

  this.needToPaintSum = true;
  this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
  this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  _AX6UIGrid_page2.default.navigationUpdate.call(this);

  if (this.config.body.grouping) {}
  return this;
};

var get = function get(_type) {
  return {
    list: this.list,
    page: this.page
  };
};

var getList = function getList(_type) {
  var returnList = [];
  //let list = (this.proxyList) ? this.proxyList : this.list;
  var list = this.list;
  var i = 0,
      l = list.length;
  switch (_type) {
    case "modified":
      for (; i < l; i++) {
        if (list[i] && !list[i]["__isGrouping"] && list[i][this.config.columnKeys.modified]) {
          returnList.push(_jqmin2.default.extend({}, list[i]));
        }
      }
      break;
    case "selected":
      for (; i < l; i++) {
        if (list[i] && !list[i]["__isGrouping"] && list[i][this.config.columnKeys.selected]) {
          returnList.push(_jqmin2.default.extend({}, list[i]));
        }
      }
      break;
    case "deleted":
      //_list = clearGroupingData(this.list);
      returnList = [].concat(this.deletedList);
      break;
    default:
      returnList = clearGroupingData.call(this, list);
  }
  return returnList;
};

var add = function add(_row, _dindex, _options) {
  var list = this.config.body.grouping ? clearGroupingData.call(this, this.list) : this.list;
  var processor = {
    "first": function first() {
      list = [].concat(_row).concat(list);
    },
    "last": function last() {
      list = list.concat([].concat(_row));
    }
  };

  if (this.config.tree.use) {
    var _list2 = this.list.concat([].concat(_row));

    this.list = arrangeData4tree.call(this, _list2);
    this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
  } else {
    if (typeof _dindex === "undefined") _dindex = "last";
    if (_dindex in processor) {
      _row[this.config.columnKeys.modified] = true;
      processor[_dindex].call(this, _row);
    } else {
      if (!_AX6Util2.default.isNumber(_dindex)) {
        throw 'invalid argument _dindex';
      }
      if (_AX6Util2.default.isArray(_row)) {
        for (var _i = 0, _l = _row.length; _i < _l; _i++) {
          list.splice(_dindex + _i, 0, _row[_i]);
        }
      } else {
        list.splice(_dindex, 0, _row);
      }
    }

    if (this.config.body.grouping) {
      list = initData.call(this, sort.call(this, this.sortInfo, list));
    } else if (_options && _options.sort && Object.keys(this.sortInfo).length) {
      list = initData.call(this, sort.call(this, this.sortInfo, list));
    } else {
      list = initData.call(this, list);
    }

    this.list = list;
  }

  this.needToPaintSum = true;
  this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
  this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  _AX6UIGrid_page2.default.navigationUpdate.call(this);
  return this;
};

/**
 * list에서 완전 제거 하는 경우 사용.
 * ax5grid.data.remove
 */
var remove = function remove(_dindex) {
  var list = this.config.body.grouping ? clearGroupingData.call(this, this.list) : this.list;
  var processor = {
    "first": function first() {
      if (this.config.tree.use) {
        processor.tree.call(this, 0);
      } else {
        list.splice(0, 1);
      }
    },
    "last": function last() {
      if (this.config.tree.use) {
        processor.tree.call(this, list.length - 1);
      } else {
        list.splice(list.length - 1, 1);
      }
    },
    "index": function index(_dindex) {
      if (this.config.tree.use) {
        processor.tree.call(this, _dindex);
      } else {
        list.splice(_dindex, 1);
      }
    },
    "selected": function selected() {
      if (this.config.tree.use) {
        processor.tree.call(this, "selected");
      } else {
        var __list = [],
            i = void 0,
            l = void 0;

        for (i = 0, l = list.length; i < l; i++) {
          if (!list[i][this.config.columnKeys.selected]) {
            __list.push(list[i]);
          }
        }
        list = __list;
        __list = null;
        i = null;
      }
    },
    "tree": function tree(_dindex) {
      var treeKeys = this.config.tree.columnKeys,
          selfHash = list[_dindex][this.config.tree.columnKeys.selfHash];
      list = _AX6Util2.default.filter(list, function () {
        return this[treeKeys.selfHash].substr(0, selfHash.length) != selfHash;
      });
      treeKeys = null;
      selfHash = null;
    }
  };

  if (typeof _dindex === "undefined") _dindex = "last";
  if (_dindex in processor) {
    processor[_dindex].call(this, _dindex);
  } else {
    if (!_AX6Util2.default.isNumber(_dindex)) {
      throw 'invalid argument _dindex';
    }
    processor["index"].call(this, _dindex);
  }

  if (this.config.tree.use) {
    this.list = arrangeData4tree.call(this, list);
    this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
  } else {
    if (this.config.body.grouping) {
      list = initData.call(this, sort.call(this, this.sortInfo, list));
    } else if (Object.keys(this.sortInfo).length) {
      list = initData.call(this, sort.call(this, this.sortInfo, list));
    } else {
      list = initData.call(this, list);
    }
    this.list = list;
  }

  this.needToPaintSum = true;
  this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
  this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  _AX6UIGrid_page2.default.navigationUpdate.call(this);
  return this;
};

/**
 * list에서 deleted 처리 repaint
 * ax5grid.data.deleteRow
 */
var deleteRow = function deleteRow(_dindex) {
  var list = this.config.body.grouping ? clearGroupingData.call(this, this.list) : this.list;
  var processor = {
    "first": function first() {
      if (this.config.tree.use) {
        processor.tree.call(this, 0);
      } else {
        list[0][this.config.columnKeys.deleted] = true;
      }
    },
    "last": function last() {
      if (this.config.tree.use) {
        processor.tree.call(this, list.length - 1);
      } else {
        list[list.length - 1][this.config.columnKeys.deleted] = true;
      }
    },
    "selected": function selected() {
      if (this.config.tree.use) {
        processor.tree.call(this, "selected");
      } else {
        var i = list.length;
        while (i--) {
          if (list[i][this.config.columnKeys.selected]) {
            list[i][this.config.columnKeys.deleted] = true;
          }
        }
        i = null;
      }
    },
    "tree": function tree(_dindex) {
      var keys = this.config.columnKeys,
          treeKeys = this.config.tree.columnKeys;

      if (_dindex === "selected") {

        var i = list.length;
        while (i--) {
          if (list[i][this.config.columnKeys.selected]) {
            list[i][this.config.columnKeys.deleted] = true;

            var selfHash = list[i][treeKeys.selfHash];
            var ii = list.length;

            while (ii--) {
              if (list[ii][treeKeys.selfHash].substr(0, selfHash.length) === selfHash) {
                list[ii][keys.deleted] = true;
              }
            }

            selfHash = null;
            ii = null;
          }
        }
        i = null;
      } else {
        var _selfHash = list[_dindex][treeKeys.selfHash];
        var _i2 = list.length;
        while (_i2--) {
          if (list[_i2][treeKeys.selfHash].substr(0, _selfHash.length) !== _selfHash) {
            list[_i2][keys.deleted] = true;
          }
        }
        _selfHash = null;
        _i2 = null;
      }

      keys = null;
      treeKeys = null;
    }
  };

  if (typeof _dindex === "undefined") _dindex = "last";

  if (_dindex in processor) {
    processor[_dindex].call(this, _dindex);
  } else {
    if (!_AX6Util2.default.isNumber(_dindex)) {
      throw 'invalid argument _dindex';
    }
    list[_dindex][this.config.columnKeys.deleted] = true;
  }

  if (this.config.tree.use) {
    this.list = arrangeData4tree.call(this, list);
    this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
  } else {
    if (this.config.body.grouping) {
      list = initData.call(this, sort.call(this, this.sortInfo, list));
    } else if (Object.keys(this.sortInfo).length) {
      list = initData.call(this, sort.call(this, this.sortInfo, list));
    } else {
      list = initData.call(this, list);
    }

    this.list = list;
  }

  this.needToPaintSum = true;
  this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
  this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  _AX6UIGrid_page2.default.navigationUpdate.call(this);
  return this;
};

var update = function update(_row, _dindex) {
  if (!_AX6Util2.default.isNumber(_dindex)) {
    throw 'invalid argument _dindex';
  }
  //
  this.needToPaintSum = true;
  this.list.splice(_dindex, 1, _row);

  if (this.config.body.grouping) {
    this.list = initData.call(this, clearGroupingData.call(this, this.list));
  }
};

var updateChild = function updateChild(_dindex, _updateData, _options) {
  var keys = this.config.tree.columnKeys,
      selfHash = void 0,
      originIndex = void 0;

  if (typeof _dindex === "undefined") return false;
  originIndex = this.proxyList[_dindex].__origin_index__;

  if (this.list[originIndex][keys.children]) {
    this.proxyList = []; // 리셋 프록시

    if (_options && _options.filter) {
      if (_options.filter.call({ item: this.list[originIndex], dindex: originIndex }, this.list[originIndex])) {
        for (var _k in _updateData) {
          this.list[originIndex][_k] = _updateData[_k];
        }
      }
    } else {
      for (var _k2 in _updateData) {
        this.list[originIndex][_k2] = _updateData[_k2];
      }
    }

    selfHash = this.list[originIndex][keys.selfHash];

    var i = 0,
        l = this.list.length;
    for (; i < l; i++) {
      if (this.list[i]) {
        if (this.list[i][keys.parentHash].substr(0, selfHash.length) === selfHash) {

          if (_options && _options.filter) {
            if (_options.filter.call({ item: this.list[i], dindex: i }, this.list[i])) {
              for (var _k3 in _updateData) {
                this.list[i][_k3] = _updateData[_k3];
              }
            }
          } else {
            for (var _k4 in _updateData) {
              this.list[i][_k4] = _updateData[_k4];
            }
          }
        }

        if (!this.list[i][keys.hidden]) {
          this.proxyList.push(this.list[i]);
        }
      }
    }

    return true;
  } else {
    return false;
  }
};

var setValue = function setValue(_dindex, _doindex, _key, _value) {
  var originalValue = getValue.call(this, _dindex, _doindex, _key);
  var list = this.list;
  var listIndex = typeof _doindex === "undefined" ? _dindex : _doindex;
  this.needToPaintSum = true;

  if (originalValue !== _value) {
    if (/[\.\[\]]/.test(_key)) {
      try {
        list[listIndex][this.config.columnKeys.modified] = true;
        Function("val", "this" + _AX6UIGrid_util2.default.getRealPathForDataItem(_key) + " = val;").call(list[listIndex], _value);
      } catch (e) {}
    } else {
      list[listIndex][this.config.columnKeys.modified] = true;
      list[listIndex][_key] = _value;
    }

    if (this.onDataChanged) {
      this.onDataChanged.call({
        self: this,
        list: this.list,
        dindex: _dindex,
        doindex: _doindex,
        item: this.list[_dindex],
        key: _key,
        value: _value
      });
    }
  }

  return true;
};

var getValue = function getValue(_dindex, _doindex, _key, _value) {
  var list = this.list;
  var listIndex = typeof _doindex === "undefined" ? _dindex : _doindex;

  if (/[\.\[\]]/.test(_key)) {
    try {
      _value = Function("", "return this" + _AX6UIGrid_util2.default.getRealPathForDataItem(_key) + ";").call(list[listIndex]);
    } catch (e) {}
  } else {
    _value = list[listIndex][_key];
  }
  return _value;
};

var clearSelect = function clearSelect() {
  this.selectedDataIndexs = [];
};

var select = function select(_dindex, _doindex, _selected, _options) {
  var cfg = this.config;

  if (typeof _doindex === "undefined") _doindex = _dindex;

  if (!this.list[_doindex]) return false;
  if (this.list[_doindex].__isGrouping) return false;
  if (this.list[_doindex][cfg.columnKeys.disableSelection]) return false;

  if (typeof _selected === "undefined") {
    if (this.list[_doindex][cfg.columnKeys.selected] = !this.list[_doindex][cfg.columnKeys.selected]) {
      this.selectedDataIndexs.push(_doindex);
    } else {
      this.selectedDataIndexs.splice(_AX6Util2.default.search(this.selectedDataIndexs, function () {
        return this == _doindex;
      }), 1);
    }
  } else {
    if (this.list[_doindex][cfg.columnKeys.selected] = _selected) {
      this.selectedDataIndexs.push(_doindex);
    } else {
      this.selectedDataIndexs.splice(_AX6Util2.default.search(this.selectedDataIndexs, function () {
        return this == _doindex;
      }), 1);
    }
  }

  if (this.onDataChanged && _options && _options.internalCall) {
    this.onDataChanged.call({
      self: this,
      list: this.list,
      dindex: _dindex,
      doindex: _doindex,
      item: this.list[_doindex],
      key: cfg.columnKeys.selected,
      value: this.list[_doindex][cfg.columnKeys.selected]
    });
  }

  return this.list[_doindex][cfg.columnKeys.selected];
};

var selectAll = function selectAll(_selected, _options) {
  var cfg = this.config,
      dindex = this.list.length;

  this.selectedDataIndexs = [];

  if (typeof _selected === "undefined") {
    while (dindex--) {
      if (this.list[dindex].__isGrouping) continue;
      if (_options && _options.filter) {
        if (_options.filter.call(this.list[dindex]) !== true) {
          continue;
        }
      }
      if (this.list[dindex][cfg.columnKeys.disableSelection]) continue;

      if (this.list[dindex][cfg.columnKeys.selected] = !this.list[dindex][cfg.columnKeys.selected]) {
        this.selectedDataIndexs.push(dindex);
      }
    }
  } else {
    while (dindex--) {
      if (this.list[dindex].__isGrouping) continue;
      if (_options && _options.filter) {
        if (_options.filter.call(this.list[dindex]) !== true) {
          continue;
        }
      }
      if (this.list[dindex][cfg.columnKeys.disableSelection]) continue;

      if (this.list[dindex][cfg.columnKeys.selected] = _selected) {
        this.selectedDataIndexs.push(dindex);
      }
    }
  }

  if (this.onDataChanged && _options && _options.internalCall) {
    this.onDataChanged.call({
      self: this,
      list: this.list
    });
  }

  return this.list;
};

var sort = function sort(_sortInfo, _list, _options) {
  var self = this,
      list = _list || this.list,
      sortInfoArray = [],
      lineNumber = 0;
  var getKeyValue = function getKeyValue(_item, _key, _value) {
    if (/[\.\[\]]/.test(_key)) {
      try {
        _value = Function("", "return this" + _AX6UIGrid_util2.default.getRealPathForDataItem(_key) + ";").call(_item);
      } catch (e) {}
    } else {
      _value = _item[_key];
    }
    return _value;
  };

  for (var k in _sortInfo) {
    sortInfoArray[_sortInfo[k].seq] = { key: k, order: _sortInfo[k].orderBy };
  }
  sortInfoArray = _AX6Util2.default.filter(sortInfoArray, function () {
    return typeof this !== "undefined";
  });

  // 정렬조건이 없으면 original_index값을 이용하여 정렬처리
  if (_options && _options.resetLineNumber && sortInfoArray.length === 0) {
    sortInfoArray[0] = { key: '__original_index', order: "asc" };
  }

  var i = 0,
      l = sortInfoArray.length,
      _a_val = void 0,
      _b_val = void 0;

  list.sort(function (_a, _b) {
    for (i = 0; i < l; i++) {
      _a_val = getKeyValue(_a, sortInfoArray[i].key);
      _b_val = getKeyValue(_b, sortInfoArray[i].key);

      if ((typeof _a_val === "undefined" ? "undefined" : _typeof(_a_val)) !== (typeof _b_val === "undefined" ? "undefined" : _typeof(_b_val))) {
        _a_val = '' + _a_val;
        _b_val = '' + _b_val;
      }
      if (_a_val < _b_val) {
        return sortInfoArray[i].order === "asc" ? -1 : 1;
      } else if (_a_val > _b_val) {
        return sortInfoArray[i].order === "asc" ? 1 : -1;
      }
    }
  });

  if (_options && _options.resetLineNumber) {
    i = 0, l = list.length, lineNumber = 0;
    for (; i < l; i++) {
      if (_list[i] && !_list[i]["__isGrouping"]) {
        _list[i]["__index"] = lineNumber++;
      }
    }
  }

  if (_list) {
    return list;
  } else {
    this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
    this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    _AX6UIGrid_page2.default.navigationUpdate.call(this);
    return this;
  }
};

var append = function append(_list, _callback) {
  var self = this;

  if (this.config.tree.use) {
    var list = this.list.concat([].concat(_list));

    this.list = arrangeData4tree.call(this, list);
    this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
    list = null;
  } else {
    this.list = this.list.concat([].concat(_list));
  }

  this.appendProgress = true;
  _AX6UIGrid_page2.default.statusUpdate.call(this);

  if (this.appendDebouncer) {
    if (self.appendDebounceTimes < this.config.debounceTime / 10) {
      clearTimeout(this.appendDebouncer);
      self.appendDebounceTimes++;
    } else {
      self.appendDebounceTimes = 0;
      appendIdle.call(self);
      _callback();
      return false;
    }
  }

  this.appendDebouncer = setTimeout(function () {
    self.appendDebounceTimes = 0;
    appendIdle.call(self);
    _callback();
  }, this.config.debounceTime);

  // todo : append bounce animation
};

var appendIdle = function appendIdle() {
  this.appendProgress = false;
  if (this.config.body.grouping) {
    this.list = initData.call(this, sort.call(this, this.sortInfo, this.list));
  } else {
    this.list = initData.call(this, this.list);
  }

  this.needToPaintSum = true;
  this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
  this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  _AX6UIGrid_page2.default.navigationUpdate.call(this);
};

var toggleCollapse = function toggleCollapse(_dindex, _doindx, _collapse) {
  var keys = this.config.tree.columnKeys,
      selfHash = void 0,
      originIndex = void 0;

  if (typeof _dindex === "undefined") return false;
  originIndex = this.proxyList[_dindex].__origin_index__;

  if (this.list[originIndex][keys.children]) {
    this.proxyList = []; // 리셋 프록시
    if (typeof _collapse == "undefined") {
      _collapse = !(this.list[originIndex][keys.collapse] || false);
    }

    this.list[originIndex][keys.collapse] = _collapse;
    selfHash = this.list[originIndex][keys.selfHash];

    var i = this.list.length;
    while (i--) {
      if (this.list[i]) {
        // console.log(this.list[i][keys.parentHash].substr(0, selfHash.length), selfHash);
        if (this.list[i][keys.parentHash].substr(0, selfHash.length) === selfHash) {
          this.list[i][keys.hidden] = _collapse;
        }

        if (!this.list[i][keys.hidden]) {
          this.proxyList.push(this.list[i]);
        }
      }
    }

    return true;
  } else {
    return false;
  }
};

exports.default = {
  init: init,
  set: set,
  get: get,
  getList: getList,
  getProxyList: getProxyList,
  setValue: setValue,
  getValue: getValue,
  clearSelect: clearSelect,
  select: select,
  selectAll: selectAll,
  add: add,
  remove: remove,
  deleteRow: deleteRow,
  update: update,
  updateChild: updateChild,
  sort: sort,
  initData: initData,
  clearGroupingData: clearGroupingData,
  append: append,
  toggleCollapse: toggleCollapse
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(7);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onclickPageMove = function onclickPageMove(_act) {
  var callback = function callback(_pageNo) {
    if (this.page.currentPage != _pageNo) {
      this.page.selectPage = _pageNo;
      if (this.config.page.onChange) {
        this.config.page.onChange.call({
          self: this,
          page: this.page,
          data: this.data
        });
      }
    }
  };
  var processor = {
    "first": function first() {
      callback.call(this, 0);
    },
    "prev": function prev() {
      var pageNo = this.page.currentPage - 1;
      if (pageNo < 0) pageNo = 0;
      callback.call(this, pageNo);
    },
    "next": function next() {
      var pageNo = this.page.currentPage + 1;
      if (pageNo > this.page.totalPages - 1) pageNo = this.page.totalPages - 1;
      callback.call(this, pageNo);
    },
    "last": function last() {
      callback.call(this, this.page.totalPages - 1);
    }
  };

  if (_act in processor) {
    processor[_act].call(this);
  } else {
    callback.call(this, _act - 1);
  }
};

var navigationUpdate = function navigationUpdate() {
  var self = this;
  if (this.page) {
    var page = {
      hasPage: false,
      currentPage: this.page.currentPage,
      pageSize: this.page.pageSize,
      totalElements: this.page.totalElements,
      totalPages: this.page.totalPages,
      firstIcon: this.config.page.firstIcon,
      prevIcon: this.config.page.prevIcon || "«",
      nextIcon: this.config.page.nextIcon || "»",
      lastIcon: this.config.page.lastIcon
    };
    var navigationItemCount = this.config.page.navigationItemCount;

    page["@paging"] = function () {
      var returns = [],
          startI = void 0,
          endI = void 0;

      startI = page.currentPage - Math.floor(navigationItemCount / 2);
      if (startI < 0) startI = 0;
      endI = page.currentPage + navigationItemCount;
      if (endI > page.totalPages) endI = page.totalPages;

      if (endI - startI > navigationItemCount) {
        endI = startI + navigationItemCount;
      }

      if (endI - startI < navigationItemCount) {
        startI = endI - navigationItemCount;
      }
      if (startI < 0) startI = 0;

      for (var p = startI, l = endI; p < l; p++) {
        returns.push({ 'pageNo': p + 1, 'selected': page.currentPage == p });
      }
      return returns;
    }();

    if (page["@paging"].length > 0) {
      page.hasPage = true;
    }

    this.$["page"]["navigation"].html(_AX6Mustache2.default.render(this.__tmpl.page_navigation.call(this), page));
    this.$["page"]["navigation"].find("[data-ax6grid-page-move]").on("click", function () {
      onclickPageMove.call(self, this.getAttribute("data-ax6grid-page-move"));
    });
  } else {
    this.$["page"]["navigation"].empty();
  }
};

var statusUpdate = function statusUpdate() {
  if (!this.config.page.statusDisplay) {
    return;
  }

  var toRowIndex = void 0,
      rangeCount = Math.min(this.xvar.dataRowCount, this.xvar.virtualPaintRowCount);
  var data = {};

  toRowIndex = this.xvar.virtualPaintStartRowIndex + rangeCount;

  if (toRowIndex > this.xvar.dataRowCount) {
    toRowIndex = this.xvar.dataRowCount;
  }

  data.fromRowIndex = _AX6Util2.default.number(this.xvar.virtualPaintStartRowIndex + 1, { "money": true });
  data.toRowIndex = _AX6Util2.default.number(toRowIndex, { "money": true });
  data.totalElements = false;
  data.dataRealRowCount = this.xvar.dataRowCount !== this.xvar.dataRealRowCount ? _AX6Util2.default.number(this.xvar.dataRealRowCount, { "money": true }) : false;
  data.dataRowCount = _AX6Util2.default.number(this.xvar.dataRowCount, { "money": true });
  data.progress = this.appendProgress ? this.config.appendProgressIcon : "";

  if (this.page) {
    data.fromRowIndex_page = _AX6Util2.default.number(this.xvar.virtualPaintStartRowIndex + this.page.currentPage * this.page.pageSize + 1, { "money": true });
    data.toRowIndex_page = _AX6Util2.default.number(this.xvar.virtualPaintStartRowIndex + rangeCount + this.page.currentPage * this.page.pageSize, { "money": true });
    data.totalElements = _AX6Util2.default.number(this.page.totalElements, { "money": true });

    if (data.toRowIndex_page > this.page.totalElements) {
      data.toRowIndex_page = this.page.totalElements;
    }
  }

  this.$["page"]["status"].html(_AX6Mustache2.default.render(this.__tmpl.page_status.call(this), data));
};

exports.default = {
  navigationUpdate: navigationUpdate,
  statusUpdate: statusUpdate
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIGrid_util = __webpack_require__(19);

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

var _AX6UIGrid_body = __webpack_require__(21);

var _AX6UIGrid_body2 = _interopRequireDefault(_AX6UIGrid_body);

var _AX6UIGrid_data = __webpack_require__(55);

var _AX6UIGrid_data2 = _interopRequireDefault(_AX6UIGrid_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnResizerEvent = {
  "on": function on(_columnResizer, _colIndex) {
    var self = this;
    var $columnResizer = $(_columnResizer);
    var columnResizerPositionLeft = $columnResizer.offset().left;
    var gridTargetOffsetLeft = self.$["container"]["root"].offset().left;
    self.xvar.columnResizerIndex = _colIndex;
    var resizeRange = {
      min: -self.colGroup[_colIndex]._width + 2,
      max: self.$["container"]["root"].width() - self.colGroup[_colIndex]._width
    };

    (0, _jqmin2.default)(document.body).on(_AX6UIGrid_util2.default.ENM["mousemove"] + ".ax5grid-" + this.instanceId, function (e) {
      var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
      self.xvar.__da = mouseObj.clientX - self.xvar.mousePosition.clientX;

      if (resizeRange.min > self.xvar.__da) {
        self.xvar.__da = resizeRange.min;
      } else if (resizeRange.max < self.xvar.__da) {
        self.xvar.__da = resizeRange.max;
      }

      if (!self.xvar.columnResizerLived) {
        self.$["resizer"]["horizontal"].addClass("live");
      }
      self.xvar.columnResizerLived = true;
      self.$["resizer"]["horizontal"].css({
        left: columnResizerPositionLeft + self.xvar.__da - gridTargetOffsetLeft
      });
    }).on(_AX6UIGrid_util2.default.ENM["mouseup"] + ".ax5grid-" + this.instanceId, function (e) {
      columnResizerEvent.off.call(self);
      _AX6Util2.default.stopEvent(e);
    }).on("mouseleave.ax5grid-" + this.instanceId, function (e) {
      columnResizerEvent.off.call(self);
      _AX6Util2.default.stopEvent(e);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {
    this.$["resizer"]["horizontal"].removeClass("live");
    this.xvar.columnResizerLived = false;

    if (typeof this.xvar.__da === "undefined") {} else {
      this.setColumnWidth(this.colGroup[this.xvar.columnResizerIndex]._width + this.xvar.__da, this.xvar.columnResizerIndex);
    }

    (0, _jqmin2.default)(document.body).off(_AX6UIGrid_util2.default.ENM["mousemove"] + ".ax5grid-" + this.instanceId).off(_AX6UIGrid_util2.default.ENM["mouseup"] + ".ax5grid-" + this.instanceId).off("mouseleave.ax5grid-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};

var init = function init() {
  // 헤더 초기화
  var self = this;

  this.$["container"]["header"].on("click", '[data-ax6grid-column-attr]', function (e) {
    var key = this.getAttribute("data-ax6grid-column-key"),
        colIndex = this.getAttribute("data-ax6grid-column-colindex"),

    //rowIndex = this.getAttribute("data-ax6grid-column-rowindex"),
    col = self.colGroup[colIndex];

    if (key === "__checkbox_header__") {
      var selected = this.getAttribute("data-ax6grid-selected");
      selected = _AX6Util2.default.isNothing(selected) ? true : selected !== "true";

      $(this).attr("data-ax6grid-selected", selected);
      self.selectAll({ selected: selected });

      selected = null;
    } else {
      if (key && col && col.sortable !== false && !col.sortFixed) {
        if (col.sortable === true || self.config.sortable === true) {
          toggleSort.call(self, col.key);
        }
      }
    }

    _AX6UIGrid_body2.default.blur.call(self);

    key = null;
    colIndex = null;
    col = null;
  });
  this.$["container"]["header"].on("mousedown", '[data-ax6grid-column-resizer]', function (e) {
    var colIndex = this.getAttribute("data-ax6grid-column-resizer");

    self.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
    columnResizerEvent.on.call(self, this, Number(colIndex));
    _AX6Util2.default.stopEvent(e);

    colIndex = null;
  }).on("dragstart", function (e) {
    _AX6Util2.default.stopEvent(e);
    return false;
  });

  resetFrozenColumn.call(this);
};

var resetFrozenColumn = function resetFrozenColumn() {
  var cfg = this.config,
      dividedHeaderObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.headerTable, this.xvar.frozenColumnIndex);

  this.asideHeaderData = function (dataTable) {
    var colGroup = [];
    var data = { rows: [] };
    for (var i = 0, l = dataTable.rows.length; i < l; i++) {
      data.rows[i] = { cols: [] };
      if (i === 0) {
        var col = {
          label: "",
          colspan: 1,
          rowspan: dataTable.rows.length,
          colIndex: null
        },
            _col = {};

        if (cfg.showLineNumber) {
          _col = _jqmin2.default.extend({}, col, {
            width: cfg.lineNumberColumnWidth,
            _width: cfg.lineNumberColumnWidth,
            columnAttr: "lineNumber",
            key: "__index_header__", label: "&nbsp;"
          });
          colGroup.push(_col);
          data.rows[i].cols.push(_col);
        }
        if (cfg.showRowSelector) {
          _col = _jqmin2.default.extend({}, col, {
            width: cfg.rowSelectorColumnWidth,
            _width: cfg.rowSelectorColumnWidth,
            columnAttr: "rowSelector",
            key: "__checkbox_header__", label: ""
          });
          colGroup.push(_col);
          data.rows[i].cols.push(_col);
        }

        col = null;
      }
    }

    this.asideColGroup = colGroup;
    return data;
  }.call(this, this.headerTable);

  this.leftHeaderData = dividedHeaderObj.leftData;
  this.headerData = dividedHeaderObj.rightData;
};

var getFieldValue = function getFieldValue(_col) {
  return _col.key === "__checkbox_header__" ? "<div class=\"checkBox\" style=\"max-height: " + (_col.width - 10) + "px;min-height: " + (_col.width - 10) + "px;\"></div>" : _col.label || "&nbsp;";
};

var repaint = function repaint(_reset) {
  var cfg = this.config,
      colGroup = this.colGroup;

  if (_reset) {
    resetFrozenColumn.call(this);
    this.xvar.paintStartRowIndex = undefined;
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
  }
  var asideHeaderData = this.asideHeaderData,
      leftHeaderData = this.leftHeaderData,
      headerData = this.headerData,
      headerAlign = cfg.header.align;

  // this.asideColGroup : asideHeaderData에서 처리 함.
  this.leftHeaderColGroup = colGroup.slice(0, this.config.frozenColumnIndex);
  this.headerColGroup = colGroup.slice(this.config.frozenColumnIndex);

  var repaintHeader = function repaintHeader(_elTarget, _colGroup, _bodyRow) {
    var tableWidth = 0,
        SS = [];
    SS.push('<table border="0" cellpadding="0" cellspacing="0">');
    SS.push('<colgroup>');
    for (var cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
      SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
      tableWidth += _colGroup[cgi]._width;
    }
    SS.push('<col  />');
    SS.push('</colgroup>');

    for (var tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
      var trCSS_class = "";
      SS.push('<tr class="' + trCSS_class + '">');
      for (var ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
        var col = _bodyRow.rows[tri].cols[ci];
        var cellHeight = cfg.header.columnHeight * col.rowspan - cfg.header.columnBorderWidth;
        var colAlign = headerAlign || col.align;
        SS.push('<td ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', function () {
          return typeof col.key !== "undefined" ? 'data-ax6grid-column-key="' + col.key + '" ' : '';
        }(), 'data-ax6grid-column-colindex="' + col.colIndex + '" ', 'data-ax6grid-column-rowindex="' + col.rowIndex + '" ', 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
          var tdCSS_class = "";
          if (_col.headerStyleClass) {
            if (_AX6Util2.default.isFunction(_col.headerStyleClass)) {
              tdCSS_class += _col.headerStyleClass.call({
                column: _col,
                key: _col.key
              }) + " ";
            } else {
              tdCSS_class += _col.headerStyleClass + " ";
            }
          }
          if (cfg.header.columnBorderWidth) tdCSS_class += "hasBorder ";
          if (ci == cl - 1) tdCSS_class += "isLastColumn ";
          return tdCSS_class;
        }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

        SS.push(function () {
          var lineHeight = cfg.header.columnHeight - cfg.header.columnPadding * 2 - cfg.header.columnBorderWidth;
          return '<span data-ax6grid-cellHolder="" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + ' style="height: ' + (cfg.header.columnHeight - cfg.header.columnBorderWidth) + 'px;line-height: ' + lineHeight + 'px;">';
        }(), function () {
          var _SS = "";

          if (!_AX6Util2.default.isNothing(col.key) && !_AX6Util2.default.isNothing(col.colIndex) && (cfg.sortable === true || col.sortable === true) && col.sortable !== false) {
            _SS += '<span data-ax6grid-column-sort="' + col.colIndex + '" data-ax6grid-column-sort-order="' + (colGroup[col.colIndex].sort || "") + '" />';
          }
          return _SS;
        }(), getFieldValue.call(this, col), '</span>');

        if (!_AX6Util2.default.isNothing(col.colIndex)) {
          if (cfg.enableFilter) {
            SS.push('<span data-ax6grid-column-filter="' + col.colIndex + '" data-ax6grid-column-filter-value=""  />');
          }
        }

        SS.push('</td>');
      }
      SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'style="height: ' + cfg.header.columnHeight + 'px;min-height: 1px;" ', '></td>');
      SS.push('</tr>');
    }
    SS.push('</table>');
    _elTarget.html(SS.join(''));

    /// append column-resizer
    (function () {
      var resizerHeight = cfg.header.columnHeight * _bodyRow.rows.length - cfg.header.columnBorderWidth,
          resizerLeft = 0,
          AS = [];

      for (var cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
        var col = _colGroup[cgi];
        if (!_AX6Util2.default.isNothing(col.colIndex)) {
          //_colGroup[cgi]._width
          resizerLeft += col._width;
          AS.push('<div data-ax6grid-column-resizer="' + col.colIndex + '" style="height:' + resizerHeight + 'px;left: ' + (resizerLeft - 4) + 'px;"  />');
        }
      }
      _elTarget.append(AS);
    }).call(this);

    return tableWidth;
  };

  if (cfg.asidePanelWidth > 0) {
    repaintHeader.call(this, this.$.panel["aside-header"], this.asideColGroup, asideHeaderData);
  }
  if (cfg.frozenColumnIndex > 0) {
    repaintHeader.call(this, this.$.panel["left-header"], this.leftHeaderColGroup, leftHeaderData);
  }
  this.xvar.scrollContentWidth = repaintHeader.call(this, this.$.panel["header-scroll"], this.headerColGroup, headerData);

  if (cfg.rightSum) {}
};

var scrollTo = function scrollTo(css) {
  this.$.panel["header-scroll"].css(css);
  return this;
};

var toggleSort = function toggleSort(_key) {
  var sortOrder = "",
      sortInfo = {},
      seq = 0;

  for (var k in this.sortInfo) {
    if (this.sortInfo[k].fixed) {
      sortInfo[k] = this.sortInfo[k];
      seq++;
    }
  }

  for (var i = 0, l = this.colGroup.length; i < l; i++) {
    if (this.colGroup[i].key == _key) {
      if (sortOrder == "") {
        if (typeof this.colGroup[i].sort === "undefined") {
          sortOrder = "desc";
        } else if (this.colGroup[i].sort === "desc") {
          sortOrder = "asc";
        } else {
          sortOrder = undefined;
        }
      }
      this.colGroup[i].sort = sortOrder;
    } else if (!this.config.multiSort) {
      this.colGroup[i].sort = undefined;
    }

    if (typeof this.colGroup[i].sort !== "undefined") {
      if (!sortInfo[this.colGroup[i].key]) {
        sortInfo[this.colGroup[i].key] = {
          seq: seq++,
          orderBy: this.colGroup[i].sort
        };
      }
    }
  }

  this.setColumnSort(sortInfo);
  return this;
};

var applySortStatus = function applySortStatus(_sortInfo) {
  for (var i = 0, l = this.colGroup.length; i < l; i++) {
    for (var _key in _sortInfo) {
      if (this.colGroup[i].key == _key) {
        this.colGroup[i].sort = _sortInfo[_key].orderBy;
      }
    }
  }
  return this;
};

var select = function select(_options) {
  _AX6UIGrid_data2.default.select.call(this, dindex, _options && _options.selected);
  _AX6UIGrid_body2.default.updateRowState.call(this, ["selected"], dindex);
};

var getExcelString = function getExcelString() {
  var cfg = this.config,
      colGroup = this.colGroup,
      headerData = this.headerTable,
      getHeader = function getHeader(_colGroup, _bodyRow) {
    var SS = [];
    //SS.push('<table border="1">');
    for (var tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
      SS.push('<tr>');
      for (var ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
        var col = _bodyRow.rows[tri].cols[ci];
        SS.push('<td ', 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', '>', getFieldValue.call(this, col), '</td>');
      }
      SS.push('</tr>');
    }
    //SS.push('</table>');

    return SS.join('');
  };

  return getHeader.call(this, colGroup, headerData);
};

exports.default = {
  init: init,
  repaint: repaint,
  scrollTo: scrollTo,
  toggleSort: toggleSort,
  applySortStatus: applySortStatus,
  getExcelString: getExcelString
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6UIGrid_util = __webpack_require__(19);

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

var _AX6UIGrid_header = __webpack_require__(57);

var _AX6UIGrid_header2 = _interopRequireDefault(_AX6UIGrid_header);

var _AX6UIGrid_body = __webpack_require__(21);

var _AX6UIGrid_body2 = _interopRequireDefault(_AX6UIGrid_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveout_timer = new Date().getTime();

var convertScrollPosition = {
  "vertical": function vertical(css, _var) {
    var _content_height = _var._content_height - _var._panel_height,
        _scroller_height = _var._vertical_scroller_height - _var.verticalScrollBarHeight,
        top = _content_height * css.top / _scroller_height;

    if (top < 0) top = 0;else if (_content_height < top) {
      top = _content_height;
    }
    return {
      top: -top
    };
  },
  "horizontal": function horizontal(css, _var) {
    var _content_width = _var._content_width - _var._panel_width,
        _scroller_width = _var._horizontal_scroller_width - _var.horizontalScrollBarWidth,
        left = _content_width * css.left / _scroller_width;

    if (left < 0) left = 0;else if (_content_width < left) {
      left = _content_width;
    }
    return {
      left: -left
    };
  }
};

var convertScrollBarPosition = {
  "vertical": function vertical(_top, _var) {

    var self = this,
        type = "vertical",
        _content_height = _var._content_height - _var._panel_height,
        _scroller_height = _var._vertical_scroller_height - _var.verticalScrollBarHeight,
        top = _scroller_height * _top / _content_height,
        scrollPositon = void 0;

    if (-top > _scroller_height) {
      top = -_scroller_height;

      scrollPositon = convertScrollPosition[type].call(this, { top: -top }, {
        _content_width: _var._content_width,
        _content_height: _var._content_height,
        _panel_width: _var._panel_width,
        _panel_height: _var._panel_height,
        _horizontal_scroller_width: _var._horizontal_scroller_width,
        _vertical_scroller_height: _var._vertical_scroller_height,
        verticalScrollBarHeight: _var.verticalScrollBarHeight,
        horizontalScrollBarWidth: _var.horizontalScrollBarWidth
      });

      _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);
    }

    return -top;
  },
  "horizontal": function horizontal(_left, _var) {
    var self = this,
        type = "horizontal",
        _content_width = _var._content_width - _var._panel_width,
        _scroller_width = _var._horizontal_scroller_width - _var.horizontalScrollBarWidth,
        left = _scroller_width * _left / _content_width,
        scrollPositon = void 0;

    if (-left > _scroller_width) {
      left = -_scroller_width;
      scrollPositon = convertScrollPosition[type].call(this, { left: -left }, {
        _content_width: _var._content_width,
        _content_height: _var._content_height,
        _panel_width: _var._panel_width,
        _panel_height: _var._panel_height,
        _horizontal_scroller_width: _var._horizontal_scroller_width,
        _vertical_scroller_height: _var._vertical_scroller_height,
        verticalScrollBarHeight: _var.verticalScrollBarHeight,
        horizontalScrollBarWidth: _var.horizontalScrollBarWidth
      });

      _AX6UIGrid_header2.default.scrollTo.call(self, scrollPositon);
      _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);
    }

    return -left;
  }
};

var scrollBarMover = {
  "click": function click(track, bar, type, e) {

    // 마우스 무브 완료 타임과 클릭타임 차이가 20 보다 작으면 클릭이벤트 막기.
    if (new Date().getTime() - moveout_timer < 20) {
      return false;
    }

    var self = this,
        trackOffset = track.offset(),
        barBox = {
      width: bar.outerWidth(), height: bar.outerHeight()
    },
        trackBox = {
      width: track.innerWidth(), height: track.innerHeight()
    },
        _vertical_scroller_height = self.$["scroller"]["vertical"].innerHeight(),
        _panel_height = self.$["panel"]["body"].height(),
        _horizontal_scroller_width = self.$["scroller"]["horizontal"].innerWidth(),
        _panel_width = self.$["panel"]["body"].width(),
        _content_height = self.xvar.scrollContentHeight,
        _content_width = self.xvar.scrollContentWidth,
        verticalScrollBarHeight = self.$["scroller"]["vertical-bar"].outerHeight(),
        horizontalScrollBarWidth = self.$["scroller"]["horizontal-bar"].outerWidth(),
        getScrollerPosition = {
      "vertical": function vertical(e) {
        var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
        // track을 벗어 나지 안도록 범위 체크
        var newTop = mouseObj.clientY - trackOffset.top;
        if (newTop < 0) {
          newTop = 0;
        } else if (newTop + barBox.height > trackBox.height) {
          newTop = trackBox.height - barBox.height;
        }
        return { top: newTop };
      },
      "horizontal": function horizontal(e) {
        var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
        // track을 벗어 나지 안도록 범위 체크
        var newLeft = mouseObj.clientX - trackOffset.left;
        if (newLeft < 0) {
          newLeft = 0;
        } else if (newLeft + barBox.width > trackBox.width) {
          newLeft = trackBox.width - barBox.width;
        }
        return { left: newLeft };
      }
    },
        css = getScrollerPosition[type](e);

    bar.css(css);

    var scrollPositon = convertScrollPosition[type].call(self, css, {
      _content_width: _content_width,
      _content_height: _content_height,
      _panel_width: _panel_width,
      _panel_height: _panel_height,
      _horizontal_scroller_width: _horizontal_scroller_width,
      _vertical_scroller_height: _vertical_scroller_height,
      verticalScrollBarHeight: verticalScrollBarHeight,
      horizontalScrollBarWidth: horizontalScrollBarWidth
    });
    if (type === "horizontal") _AX6UIGrid_header2.default.scrollTo.call(self, scrollPositon);
    _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);

    scrollPositon = null;
  },
  "on": function on(track, bar, type, e) {
    var self = this,
        barOffset = bar.position(),
        barBox = {
      width: bar.outerWidth(), height: bar.outerHeight()
    },
        trackBox = {
      width: track.innerWidth(), height: track.innerHeight()
    },
        _vertical_scroller_height = self.$["scroller"]["vertical"].innerHeight(),
        _panel_height = self.$["panel"]["body"].height(),
        _horizontal_scroller_width = self.$["scroller"]["horizontal"].innerWidth(),
        _panel_width = self.$["panel"]["body"].width(),
        _content_height = self.xvar.scrollContentHeight,
        _content_width = self.xvar.scrollContentWidth,
        verticalScrollBarHeight = self.$["scroller"]["vertical-bar"].outerHeight(),
        horizontalScrollBarWidth = self.$["scroller"]["horizontal-bar"].outerWidth(),
        getScrollerPosition = {
      "vertical": function vertical(e) {
        var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
        self.xvar.__da = mouseObj.clientY - self.xvar.mousePosition.clientY;
        // track을 벗어 나지 안도록 범위 체크
        var newTop = barOffset.top + self.xvar.__da;
        if (newTop < 0) {
          newTop = 0;
        } else if (newTop + barBox.height > trackBox.height) {
          newTop = trackBox.height - barBox.height;
        }
        return { top: newTop };
      },
      "horizontal": function horizontal(e) {
        var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
        self.xvar.__da = mouseObj.clientX - self.xvar.mousePosition.clientX;
        // track을 벗어 나지 안도록 범위 체크
        var newLeft = barOffset.left + self.xvar.__da;
        if (newLeft < 0) {
          newLeft = 0;
        } else if (newLeft + barBox.width > trackBox.width) {
          newLeft = trackBox.width - barBox.width;
        }
        return { left: newLeft };
      }
    };

    self.xvar.__da = 0; // 이동량 변수 초기화 (계산이 잘못 될까바)

    (0, _jqmin2.default)(document.body).on(_AX6UIGrid_util2.default.ENM["mousemove"] + ".ax6grid-" + this.instanceId, function (e) {
      var css = getScrollerPosition[type](e);
      bar.css(css);

      var scrollPositon = convertScrollPosition[type].call(self, css, {
        _content_width: _content_width,
        _content_height: _content_height,
        _panel_width: _panel_width,
        _panel_height: _panel_height,
        _horizontal_scroller_width: _horizontal_scroller_width,
        _vertical_scroller_height: _vertical_scroller_height,
        verticalScrollBarHeight: verticalScrollBarHeight,
        horizontalScrollBarWidth: horizontalScrollBarWidth
      });

      if (type === "horizontal") _AX6UIGrid_header2.default.scrollTo.call(self, scrollPositon);

      _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);
    }).on(_AX6UIGrid_util2.default.ENM["mouseup"] + ".ax6grid-" + this.instanceId, function (e) {
      scrollBarMover.off.call(self);
    }).on("mouseleave.ax6grid-" + this.instanceId, function (e) {
      scrollBarMover.off.call(self);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {
    moveout_timer = new Date().getTime();

    (0, _jqmin2.default)(document.body).off(_AX6UIGrid_util2.default.ENM["mousemove"] + ".ax6grid-" + this.instanceId).off(_AX6UIGrid_util2.default.ENM["mouseup"] + ".ax6grid-" + this.instanceId).off("mouseleave.ax6grid-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};

var scrollContentMover = {
  "wheel": function wheel(delta) {
    var self = this,
        _body_scroll_position = self.$["panel"]["body-scroll"].position(),
        _panel_height = self.xvar.body_panel_height,
        _panel_width = self.xvar.body_panel_width,
        _content_height = self.xvar.scrollContentHeight,
        _content_width = self.xvar.scrollContentWidth;

    if (isNaN(_content_height) || isNaN(_content_width)) {
      return false;
    }

    var newLeft = void 0,
        newTop = void 0,
        _top_is_end = false,
        _left_is_end = false;

    newLeft = _body_scroll_position.left - delta.x;
    newTop = _body_scroll_position.top - delta.y;

    // newTop이 범위를 넘었는지 체크
    if (newTop >= 0) {
      newTop = 0;
      _top_is_end = true;
    } else if (newTop <= _panel_height - _content_height) {
      newTop = _panel_height - _content_height;
      if (newTop >= 0) newTop = 0;
      _top_is_end = true;
    } else {
      if (delta.y == 0) _top_is_end = true;
    }

    // newLeft이 범위를 넘었는지 체크
    if (newLeft >= 0) {
      newLeft = 0;
      _left_is_end = true;
    } else if (newLeft <= _panel_width - _content_width) {
      newLeft = _panel_width - _content_width;
      if (newLeft >= 0) newLeft = 0;
      _left_is_end = true;
    } else {
      if (delta.x == 0) _left_is_end = true;
    }

    _AX6UIGrid_header2.default.scrollTo.call(self, { left: newLeft });
    _AX6UIGrid_body2.default.scrollTo.call(self, { left: newLeft, top: newTop }, {
      callback: function callback() {
        resize.call(self);
      }
    });

    return !_top_is_end || !_left_is_end;
  },
  "on": function on() {
    var self = this,
        _body_scroll_position = self.$["panel"]["body-scroll"].position(),
        _panel_height = self.xvar.body_panel_height,
        _panel_width = self.xvar.body_panel_width,
        _content_height = self.xvar.scrollContentHeight,
        _content_width = self.xvar.scrollContentWidth,
        getContentPosition = function getContentPosition(e) {
      var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e),
          newLeft = void 0,
          newTop = void 0;

      self.xvar.__x_da = mouseObj.clientX - self.xvar.mousePosition.clientX;
      self.xvar.__y_da = mouseObj.clientY - self.xvar.mousePosition.clientY;

      newLeft = _body_scroll_position.left + self.xvar.__x_da;
      newTop = _body_scroll_position.top + self.xvar.__y_da;

      // newTop이 범위를 넘었는지 체크
      if (newTop >= 0) {
        newTop = 0;
      } else if (newTop <= _panel_height - _content_height) {
        newTop = _panel_height - _content_height;
        if (newTop >= 0) newTop = 0;
      }

      // newLeft이 범위를 넘었는지 체크
      if (newLeft >= 0) {
        newLeft = 0;
      } else if (newLeft <= _panel_width - _content_width) {
        newLeft = _panel_width - _content_width;
        if (newLeft >= 0) newLeft = 0;
      }

      return {
        left: newLeft, top: newTop
      };
    };

    this.xvar.__x_da = 0; // 이동량 변수 초기화
    this.xvar.__y_da = 0; // 계산이 잘못 될까바
    this.xvar.touchmoved = false;

    (0, _jqmin2.default)(document.body).on("touchmove" + ".ax6grid-" + this.instanceId, function (e) {
      var css = getContentPosition(e);

      resize.call(self);
      _AX6UIGrid_header2.default.scrollTo.call(self, { left: css.left });
      _AX6UIGrid_body2.default.scrollTo.call(self, css, { noRepaint: "noRepaint" });
      _AX6Util2.default.stopEvent(e.originalEvent);
      self.xvar.touchmoved = true;
    }).on("touchend" + ".ax6grid-" + this.instanceId, function (e) {
      if (self.xvar.touchmoved) {
        var css = getContentPosition(e);

        resize.call(self);
        _AX6UIGrid_header2.default.scrollTo.call(self, { left: css.left });
        _AX6UIGrid_body2.default.scrollTo.call(self, css);
        _AX6Util2.default.stopEvent(e.originalEvent);
        scrollContentMover.off.call(self);
      }
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {

    (0, _jqmin2.default)(document.body).off("touchmove" + ".ax6grid-" + this.instanceId).off("touchend" + ".ax6grid-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};

var init = function init() {
  var self = this,
      margin = this.config.scroller.trackPadding;

  if (margin == 0) {
    this.$["scroller"]["vertical-bar"].css({ width: this.config.scroller.size, left: -1 });
    this.$["scroller"]["horizontal-bar"].css({ height: this.config.scroller.size, top: -1 });
  } else {
    this.$["scroller"]["vertical-bar"].css({ width: this.config.scroller.size - (margin + 1), left: margin / 2 });
    this.$["scroller"]["horizontal-bar"].css({ height: this.config.scroller.size - (margin + 1), top: margin / 2 });
  }

  this.$["scroller"]["vertical-bar"].on(_AX6UIGrid_util2.default.ENM["mousedown"], function (e) {
    this.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
    scrollBarMover.on.call(this, this.$["scroller"]["vertical"], this.$["scroller"]["vertical-bar"], "vertical", e);
  }.bind(this)).on("dragstart", function (e) {
    _AX6Util2.default.stopEvent(e);
    return false;
  });

  this.$["scroller"]["vertical"].on("click", function (e) {
    if (e.target.getAttribute("data-ax6grid-scroller") == "vertical") {
      scrollBarMover.click.call(this, this.$["scroller"]["vertical"], this.$["scroller"]["vertical-bar"], "vertical", e);
    }
  }.bind(this));

  this.$["scroller"]["horizontal-bar"].on(_AX6UIGrid_util2.default.ENM["mousedown"], function (e) {
    this.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
    scrollBarMover.on.call(this, this.$["scroller"]["horizontal"], this.$["scroller"]["horizontal-bar"], "horizontal", e);
  }.bind(this)).on("dragstart", function (e) {
    _AX6Util2.default.stopEvent(e);
    return false;
  });

  this.$["scroller"]["horizontal"].on("click", function (e) {
    if (e.target.getAttribute("data-ax6grid-scroller") == "horizontal") {
      scrollBarMover.click.call(this, this.$["scroller"]["horizontal"], this.$["scroller"]["horizontal-bar"], "horizontal", e);
    }
  }.bind(this));

  this.$["container"]["body"].on('mousewheel DOMMouseScroll', function (e) {
    var E = e.originalEvent,
        delta = { x: 0, y: 0 };

    if (E.detail) {
      delta.y = E.detail * 10;
    } else {
      if (typeof E.deltaY === "undefined") {
        delta.y = -E.wheelDelta;
        delta.x = 0;
      } else {
        delta.y = E.deltaY;
        delta.x = E.deltaX;
      }
    }

    if (scrollContentMover.wheel.call(this, delta)) {
      _AX6Util2.default.stopEvent(e);
    }
  }.bind(this));

  if (_AX6Info2.default.supportTouch) {
    this.$["container"]["body"].on("touchstart", '[data-ax6grid-panel]', function (e) {
      self.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
      scrollContentMover.on.call(self);
    });
  }

  this.xvar.body_panel_height = this.$["panel"]["body"].height();
  this.xvar.body_panel_width = this.$["panel"]["body"].width();
};

var resize = function resize() {
  var _vertical_scroller_height = this.$["scroller"]["vertical"].height(),
      _horizontal_scroller_width = this.$["scroller"]["horizontal"].width(),
      _panel_height = this.$["panel"]["body"].height(),
      _panel_width = this.$["panel"]["body"].width(),
      _content_height = this.xvar.scrollContentHeight,
      _content_width = this.xvar.scrollContentWidth,
      verticalScrollBarHeight = _panel_height * _vertical_scroller_height / _content_height,
      horizontalScrollBarWidth = _panel_width * _horizontal_scroller_width / _content_width;

  if (verticalScrollBarHeight < this.config.scroller.barMinSize) verticalScrollBarHeight = this.config.scroller.barMinSize;
  if (horizontalScrollBarWidth < this.config.scroller.barMinSize) horizontalScrollBarWidth = this.config.scroller.barMinSize;

  this.$["scroller"]["vertical-bar"].css({
    top: convertScrollBarPosition.vertical.call(this, this.$.panel["body-scroll"].position().top, {
      _content_width: _content_width,
      _content_height: _content_height,
      _panel_width: _panel_width,
      _panel_height: _panel_height,
      _horizontal_scroller_width: _horizontal_scroller_width,
      _vertical_scroller_height: _vertical_scroller_height,
      verticalScrollBarHeight: verticalScrollBarHeight,
      horizontalScrollBarWidth: horizontalScrollBarWidth
    }),
    height: verticalScrollBarHeight
  });

  this.$["scroller"]["horizontal-bar"].css({
    left: convertScrollBarPosition.horizontal.call(this, this.$.panel["body-scroll"].position().left, {
      _content_width: _content_width,
      _content_height: _content_height,
      _panel_width: _panel_width,
      _panel_height: _panel_height,
      _horizontal_scroller_width: _horizontal_scroller_width,
      _vertical_scroller_height: _vertical_scroller_height,
      verticalScrollBarHeight: verticalScrollBarHeight,
      horizontalScrollBarWidth: horizontalScrollBarWidth
    }),
    width: horizontalScrollBarWidth
  });

  this.xvar.body_panel_height = _panel_height;
  this.xvar.body_panel_width = _panel_width;

  _vertical_scroller_height = null;
  _horizontal_scroller_width = null;
  _panel_height = null;
  _panel_width = null;
  _content_height = null;
  _content_width = null;
  verticalScrollBarHeight = null;
  horizontalScrollBarWidth = null;
};

exports.default = {
  // 타이머
  moveout_timer: moveout_timer,
  init: init,
  resize: resize
};

/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _axios = __webpack_require__(36);

var _axios2 = _interopRequireDefault(_axios);

var _AX6UIGrid = __webpack_require__(105);

var _AX6UIGrid2 = _interopRequireDefault(_AX6UIGrid);

var _AX6UIMenu = __webpack_require__(33);

var _AX6UIMenu2 = _interopRequireDefault(_AX6UIMenu);

__webpack_require__(110);

__webpack_require__(34);

__webpack_require__(11);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $body = (0, _jqmin2.default)("#sample-body");
var el = "\n<h4>Grid basic</h4>\n<div data-ax6ui-grid=\"grid-basic\" data-ax6ui-grid-config=\"{columns: [\n        {key: 'a', label: 'field A'},\n        {key: 'b', label: 'field B'},\n        {key: 'c', label: 'numbers C'},\n        {key: 'd', label: 'field D'},\n        {key: 'e', label: 'field E'},\n        {key: 'f', label: 'field F'},\n        {key: 'g', label: 'field G'},\n        {key: 'h', label: 'field H'}\n    ]}\" style=\"height: 200px;\"></div>\n    \n<h4>Grid formatter</h4>\n<div data-ax6ui-grid=\"grid-formatter\" style=\"height: 200px;\"></div>\n\n<h4>Grid column group</h4>\n<div data-ax6ui-grid=\"grid-column-group\" style=\"height: 200px;\"></div>\n\n<h4>Grid frozen col&row</h4>\n<div data-ax6ui-grid=\"grid-frozen\" style=\"height: 200px;\"></div>\n\n<h4>Grid context-menu</h4>\n<div data-ax6ui-grid=\"grid-context-menu\" style=\"height: 200px;\"></div>\n";
$body.append(el);

/////~~~~~~~~~~~~~~~~~~

_AX6UIGrid2.default.setFormatter({
  "capital": function capital() {
    // 개발자가 직접 정의한.
    return this.value.toUpperCase();
  }
});
_AX6UIGrid2.default.setCollector({});
_AX6UIGrid2.default.setTmpl({
  "page_status": function page_status() {
    return '<span>{{{progress}}} {{fromRowIndex}} - {{toRowIndex}} of {{dataRowCount}} {{#dataRealRowCount}}  현재페이지 {{.}}{{/dataRealRowCount}} {{#totalElements}}  전체갯수 {{.}}{{/totalElements}}</span>';
  }
});

var grid_basic = new _AX6UIGrid2.default({
  target: $body.find('[data-ax6ui-grid="grid-basic"]')
});

// xhr 호출
(0, _axios2.default)({
  method: 'get',
  url: 'http://api-demo.ax5.io/api/v1/ax5grid'
}).then(function (res) {
  grid_basic.setData(res.data);
}).catch(function (error) {
  console.log(error);
});

//
new _AX6UIGrid2.default({
  target: $body.find('[data-ax6ui-grid="grid-formatter"]'),
  showLineNumber: true,
  showRowSelector: true,
  multipleSelect: true,
  lineNumberColumnWidth: 40,
  rowSelectorColumnWidth: 27,
  columns: [{ key: 'a', label: 'field A' }, { key: 'b', label: 'field B', formatter: 'capital' }, { key: 'c', label: 'number C', formatter: 'money' // 그리드에 내장된 formatter
  }]
}).setData([{ a: "토마스", b: "Thomas", c: 50000 }]);

//
new _AX6UIGrid2.default({
  target: $body.find('[data-ax6ui-grid="grid-column-group"]'),
  columns: [{ key: "a", label: "field A" }, { key: "b", label: "field B" }, {
    key: "c", label: "field C", columns: [// child columns
    { key: "d", label: "field D" }, { key: "e", label: "field E" }, { key: "f", label: "field F" }]
  }, { key: "g", label: "field G" }, { key: "h", label: "field H" }]
}).setData([{ a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }]);

//
new _AX6UIGrid2.default({
  target: $body.find('[data-ax6ui-grid="grid-frozen"]'),
  frozenColumnIndex: 3,
  frozenRowIndex: 2,
  columns: [{ key: "a", label: "field A", width: 80 }, { key: "b", label: "field B", width: 80 }, {
    label: "Group", columns: [// child columns
    { key: "d", label: "field D" }, { key: "e", label: "field E" }, { key: "f", label: "field F" }]
  }, { key: "c", label: "field C", width: 200 }, { key: "g", label: "field G", width: 300 }, { key: "h", label: "field H" }]
}).setData([{ a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }]);

var menu = new _AX6UIMenu2.default({
  // width: 200,
  iconWidth: 20,
  acceleratorWidth: 100,
  // offset: {left: 10, top: 10},
  itemClickAndClose: false,
  //position: "absolute",
  icons: {
    'arrow': '<i class="tiny material-icons">chevron_right</i>'
  },
  columnKeys: {
    label: 'name',
    items: 'chidren'
  },
  items: [{
    icon: '<i class="tiny material-icons">class</i>',
    name: "Menu Parent 0",
    chidren: [{
      check: {
        type: 'checkbox',
        name: 'A',
        value: '0',
        checked: false
      },
      name: "Menu Z",
      data: {},
      role: "",
      accelerator: "CmdOrCtrl+Z"
    }, {
      check: {
        type: 'checkbox',
        name: 'A',
        value: '1',
        checked: true
      },
      name: "Menu A",
      data: {},
      role: ""
      //accelerator: "CmdOrCtrl+A"
    }],
    filterType: "A"
  }, {
    divide: true,
    filterType: "A"
  }, {
    icon: '<i class="tiny material-icons">class</i>',
    name: "Menu Parent 1",
    chidren: [{
      name: "Menu Z",
      data: {},
      role: "",
      //accelerator: "CmdOrCtrl+Z",
      chidren: [{
        name: "Menu Z",
        data: {},
        role: ""
        //accelerator: "CmdOrCtrl+Z"
      }, {
        name: "Menu A",
        data: {},
        role: ""
        //accelerator: "CmdOrCtrl+A"
      }]
    }, {
      name: "Menu A",
      data: {},
      role: ""
      //accelerator: "CmdOrCtrl+A"
    }],
    filterType: "A"
  }, {
    check: {
      type: 'radio',
      name: 'radioName',
      value: '1',
      checked: false
    },
    icon: '<i class="tiny material-icons">class</i>',
    name: "Menu Parent 2"
  }, {
    check: {
      type: 'radio',
      name: 'radioName',
      value: '2',
      checked: false
    },
    name: "Menu Parent 3"
  }, {
    check: {
      type: 'radio',
      name: 'radioName',
      value: '3',
      checked: false
    },
    name: "Menu Parent 4"
  }, { divide: true }, {
    html: function html() {
      // console.log(this);
      return '<div style="text-align: center;">' + '<button class="btn btn-primary" data-menu-btn="OK">OK</button> ' + '<button class="btn btn-danger" data-menu-btn="CANCEL">CANCEL</button>' + '</div>';
    }
  }]
});
menu.onClick = function (item, param) {
  console.log(item, param);
};

new _AX6UIGrid2.default({
  target: $body.find('[data-ax6ui-grid="grid-context-menu"]'),
  columns: [{ key: "a", label: "field A" }, { key: "b", label: "field B" }, { key: "c", label: "field C", formatter: "money" }, { key: "g", label: "field G" }, { key: "h", label: "field H" }],
  body: {
    onContextMenu: function onContextMenu(e, param) {
      // console.log(e);
      menu.popup(e, { param: param });
    }
  }
}).setData([{ a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman" }, { a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman" }]);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Mustache = __webpack_require__(7);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

var _AX6UIGrid_data = __webpack_require__(55);

var _AX6UIGrid_data2 = _interopRequireDefault(_AX6UIGrid_data);

var _AX6UIGrid_header = __webpack_require__(57);

var _AX6UIGrid_header2 = _interopRequireDefault(_AX6UIGrid_header);

var _AX6UIGrid_body = __webpack_require__(21);

var _AX6UIGrid_body2 = _interopRequireDefault(_AX6UIGrid_body);

var _AX6UIGrid_scroller = __webpack_require__(58);

var _AX6UIGrid_scroller2 = _interopRequireDefault(_AX6UIGrid_scroller);

var _AX6UIGrid_page = __webpack_require__(56);

var _AX6UIGrid_page2 = _interopRequireDefault(_AX6UIGrid_page);

var _AX6UIGrid_tmpl = __webpack_require__(109);

var _AX6UIGrid_tmpl2 = _interopRequireDefault(_AX6UIGrid_tmpl);

var _AX6UIGrid_util = __webpack_require__(19);

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

var formatter = {};
var collector = {};
var ctrlKeys = {
  "33": "KEY_PAGEUP",
  "34": "KEY_PAGEDOWN",
  "35": "KEY_END",
  "36": "KEY_HOME",
  "37": "KEY_LEFT",
  "38": "KEY_UP",
  "39": "KEY_RIGHT",
  "40": "KEY_DOWN"
};
var tmpl = {};

var initGrid = function initGrid() {
  // 그리드 템플릿에 전달하고자 하는 데이터를 정리합시다.

  var data = {
    instanceId: this.id
  };

  this.$target.html(_AX6Mustache2.default.render(this.__tmpl.main.call(this), data));

  // 그리드 패널 프레임의 각 엘리먼트를 캐쉬합시다.
  this.$ = {
    "container": {
      "hidden": this.$target.find('[data-ax6grid-container="hidden"]'),
      "root": this.$target.find('[data-ax6grid-container="root"]'),
      "header": this.$target.find('[data-ax6grid-container="header"]'),
      "body": this.$target.find('[data-ax6grid-container="body"]'),
      "page": this.$target.find('[data-ax6grid-container="page"]'),
      "scroller": this.$target.find('[data-ax6grid-container="scroller"]')
    },
    "panel": {
      "aside-header": this.$target.find('[data-ax6grid-panel="aside-header"]'),
      "left-header": this.$target.find('[data-ax6grid-panel="left-header"]'),
      "header": this.$target.find('[data-ax6grid-panel="header"]'),
      "header-scroll": this.$target.find('[data-ax6grid-panel-scroll="header"]'),
      "right-header": this.$target.find('[data-ax6grid-panel="right-header"]'),
      "top-aside-body": this.$target.find('[data-ax6grid-panel="top-aside-body"]'),
      "top-left-body": this.$target.find('[data-ax6grid-panel="top-left-body"]'),
      "top-body": this.$target.find('[data-ax6grid-panel="top-body"]'),
      "top-body-scroll": this.$target.find('[data-ax6grid-panel-scroll="top-body"]'),
      "top-right-body": this.$target.find('[data-ax6grid-panel="top-right-body"]'),
      "aside-body": this.$target.find('[data-ax6grid-panel="aside-body"]'),
      "aside-body-scroll": this.$target.find('[data-ax6grid-panel-scroll="aside-body"]'),
      "left-body": this.$target.find('[data-ax6grid-panel="left-body"]'),
      "left-body-scroll": this.$target.find('[data-ax6grid-panel-scroll="left-body"]'),
      "body": this.$target.find('[data-ax6grid-panel="body"]'),
      "body-scroll": this.$target.find('[data-ax6grid-panel-scroll="body"]'),
      "right-body": this.$target.find('[data-ax6grid-panel="right-body"]'),
      "right-body-scroll": this.$target.find('[data-ax6grid-panel-scroll="right-body"]'),
      "bottom-aside-body": this.$target.find('[data-ax6grid-panel="bottom-aside-body"]'),
      "bottom-left-body": this.$target.find('[data-ax6grid-panel="bottom-left-body"]'),
      "bottom-body": this.$target.find('[data-ax6grid-panel="bottom-body"]'),
      "bottom-body-scroll": this.$target.find('[data-ax6grid-panel-scroll="bottom-body"]'),
      "bottom-right-body": this.$target.find('[data-ax6grid-panel="bottom-right-body"]')
    },
    "livePanelKeys": [], // 현재 사용중인 패널들 (grid-body repaint에서 수집하여 처리)
    "scroller": {
      "vertical": this.$target.find('[data-ax6grid-scroller="vertical"]'),
      "vertical-bar": this.$target.find('[data-ax6grid-scroller="vertical-bar"]'),
      "horizontal": this.$target.find('[data-ax6grid-scroller="horizontal"]'),
      "horizontal-bar": this.$target.find('[data-ax6grid-scroller="horizontal-bar"]'),
      "corner": this.$target.find('[data-ax6grid-scroller="corner"]')
    },
    "page": {
      "navigation": this.$target.find('[data-ax6grid-page="navigation"]'),
      "status": this.$target.find('[data-ax6grid-page="status"]')
    },
    "form": {
      "clipboard": this.$target.find('[data-ax6grid-form="clipboard"]')
    },
    "resizer": {
      "vertical": this.$target.find('[data-ax6grid-resizer="vertical"]'),
      "horizontal": this.$target.find('[data-ax6grid-resizer="horizontal"]')
    }
  };

  this.$["container"]["root"].css({ height: this.config.height || this.config._height });

  return this;
};
var initColumns = function initColumns(_columns) {
  if (!_AX6Util2.default.isArray(_columns)) _columns = [];
  this.columns = _AX6Util2.default.deepCopy(_columns);
  this.headerTable = _AX6UIGrid_util2.default.makeHeaderTable.call(this, this.columns);
  this.xvar.frozenColumnIndex = this.config.frozenColumnIndex || 0;

  this.bodyRowTable = _AX6UIGrid_util2.default.makeBodyRowTable.call(this, this.columns);
  this.bodyRowMap = _AX6UIGrid_util2.default.makeBodyRowMap.call(this, this.bodyRowTable);
  // 바디에 표현될 한줄의 높이를 계산합니다.
  this.xvar.bodyTrHeight = this.bodyRowTable.rows.length * this.config.body.columnHeight;

  var colGroupMap = {};
  for (var r = 0, rl = this.headerTable.rows.length; r < rl; r++) {
    var row = this.headerTable.rows[r];
    for (var c = 0, cl = row.cols.length; c < cl; c++) {
      colGroupMap[row.cols[c].colIndex] = _jqmin2.default.extend({}, row.cols[c]);
    }
  }

  this.colGroup = [];
  for (var k in colGroupMap) {
    this.colGroup.push(colGroupMap[k]);
  }

  return this;
};
var onResetColumns = function onResetColumns() {
  initColumns.call(this, this.config.columns);
  resetColGroupWidth.call(this);
  if (this.config.footSum) {
    initFootSum.call(this, this.config.footSum);
    this.needToPaintSum = true;
  }
  if (this.config.body.grouping) initBodyGroup.call(this, this.config.body.grouping);
  alignGrid.call(this, true);
  _AX6UIGrid_header2.default.repaint.call(this, true);
  _AX6UIGrid_body2.default.repaint.call(this, true);
  _AX6UIGrid_scroller2.default.resize.call(this);
};
var resetColGroupWidth = function resetColGroupWidth() {
  var _this = this;

  /// !! 그리드 target의 크기가 변경되면 이 함수를 호출하려 this.colGroup의 _width 값을 재 계산 하여야 함. [tom]
  var CT_WIDTH = this.$["container"]["root"].width() - function () {
    var width = 0;
    if (_this.config.showLineNumber) width += _this.config.lineNumberColumnWidth;
    if (_this.config.showRowSelector) width += _this.config.rowSelectorColumnWidth;
    width += _this.config.scroller.size;
    return width;
  }(),
      totalWidth = 0,
      computedWidth = void 0,
      autoWidthColgroupIndexs = [],
      colGroup = this.colGroup,
      i = void 0,
      l = void 0;

  for (i = 0, l = colGroup.length; i < l; i++) {
    if (_AX6Util2.default.isNumber(colGroup[i].width)) {
      totalWidth += colGroup[i]._width = colGroup[i].width;
    } else if (colGroup[i].width === "*") {
      autoWidthColgroupIndexs.push(i);
    } else if (_AX6Util2.default.right(colGroup[i].width, 1) === "%") {
      totalWidth += colGroup[i]._width = CT_WIDTH * _AX6Util2.default.left(colGroup[i].width, "%") / 100;
    }
  }
  if (autoWidthColgroupIndexs.length > 0) {
    computedWidth = (CT_WIDTH - totalWidth) / autoWidthColgroupIndexs.length;
    for (i = 0, l = autoWidthColgroupIndexs.length; i < l; i++) {
      colGroup[autoWidthColgroupIndexs[i]]._width = computedWidth;
    }
  }
};
var initFootSum = function initFootSum(_footSum) {
  if (_AX6Util2.default.isArray(_footSum)) {
    this.footSumTable = _AX6UIGrid_util2.default.makeFootSumTable.call(this, this.footSumColumns = _footSum);
  } else {
    this.footSumColumns = [];
    this.footSumTable = {};
  }
};
var initBodyGroup = function initBodyGroup(_grouping) {
  var grouping = _jqmin2.default.extend({}, _grouping);
  if ("by" in grouping && "columns" in grouping) {
    this.bodyGrouping = {
      by: grouping.by,
      columns: grouping.columns
    };
    this.bodyGroupingTable = _AX6UIGrid_util2.default.makeBodyGroupingTable.call(this, this.bodyGrouping.columns);
    this.sortInfo = function () {
      var sortInfo = {};
      for (var k = 0, kl = this.bodyGrouping.by.length; k < kl; k++) {
        sortInfo[this.bodyGrouping.by[k]] = {
          orderBy: "asc",
          seq: k,
          fixed: true
        };
        for (var c = 0, cl = this.colGroup.length; c < cl; c++) {
          if (this.colGroup[c].key === this.bodyGrouping.by[k]) {
            this.colGroup[c].sort = "asc";
            this.colGroup[c].sortFixed = true;
          }
        }
      }
      return sortInfo;
    }.call(this);
  } else {
    this.config.body.grouping = false;
  }
};
var alignGrid = function alignGrid(_isFirst) {
  var _this2 = this;

  // 대상이 크기가 컬럼의 최소 크기 보다 작업 금지
  if (Math.min(this.$target.innerWidth(), this.$target.innerHeight()) < 5) {
    return false;
  }

  if (!this.config.height) {
    this.$["container"]["root"].css({ height: this.config._height = this.$target.height() });
  }

  var CT_WIDTH = this.$["container"]["root"].width(),
      CT_HEIGHT = this.$["container"]["root"].height(),
      CT_INNER_WIDTH = CT_WIDTH,
      CT_INNER_HEIGHT = CT_HEIGHT,
      asidePanelWidth = this.config.asidePanelWidth = function () {
    var width = 0;
    if (_this2.config.showLineNumber) width += _this2.config.lineNumberColumnWidth;
    if (_this2.config.showRowSelector) width += _this2.config.rowSelectorColumnWidth;
    return width;
  }(),
      frozenPanelWidth = this.config.frozenPanelWidth = function (colGroup, endIndex) {
    var width = 0;
    for (var i = 0, l = endIndex; i < l; i++) {
      width += colGroup[i]._width;
    }
    return width;
  }(this.colGroup, this.config.frozenColumnIndex),
      verticalScrollerWidth = void 0,
      horizontalScrollerHeight = void 0,
      bodyHeight = void 0;

  // todo : 우측 함계컬럼 너비 계산
  var rightPanelWidth = 0,
      frozenRowHeight = this.config.frozenRowIndex * this.xvar.bodyTrHeight,
      footSumHeight = this.footSumColumns.length * this.xvar.bodyTrHeight,
      headerHeight = this.config.header.display ? this.headerTable.rows.length * this.config.header.columnHeight : 0,
      pageHeight = this.config.page.display ? this.config.page.height : 0;

  {
    verticalScrollerWidth = CT_HEIGHT - headerHeight - pageHeight - footSumHeight < this.list.length * this.xvar.bodyTrHeight ? this.config.scroller.size : 0;
    // 남은 너비가 colGroup의 너비보다 넓을때. 수평 스크롤 활성화.
    horizontalScrollerHeight = function () {
      var totalColGroupWidth = 0;
      // aside 빼고 너비
      // 수직 스크롤이 있으면 또 빼고 비교
      var bodyWidth = CT_WIDTH - asidePanelWidth - verticalScrollerWidth;
      for (var i = 0, l = _this2.colGroup.length; i < l; i++) {
        totalColGroupWidth += _this2.colGroup[i]._width;
      }
      return totalColGroupWidth > bodyWidth ? _this2.config.scroller.size : 0;
    }();

    if (horizontalScrollerHeight > 0) {
      verticalScrollerWidth = CT_HEIGHT - headerHeight - pageHeight - footSumHeight - horizontalScrollerHeight < this.list.length * this.xvar.bodyTrHeight ? this.config.scroller.size : 0;
    }
  }

  // 수평 너비 결정
  CT_INNER_WIDTH = CT_WIDTH - verticalScrollerWidth;
  // 수직 스크롤러의 높이 결정.
  CT_INNER_HEIGHT = CT_HEIGHT - pageHeight - horizontalScrollerHeight;

  bodyHeight = CT_INNER_HEIGHT - headerHeight;

  var panelDisplayProcess = function panelDisplayProcess(panel, vPosition, hPosition, containerType) {
    var css = {
      display: "block"
    },
        isHide = false;

    switch (hPosition) {
      case "aside":
        if (asidePanelWidth === 0) {
          isHide = true;
        } else {
          css["left"] = 0;
          css["width"] = asidePanelWidth;
        }
        break;
      case "left":
        if (this.config.frozenColumnIndex === 0) {
          isHide = true;
        } else {
          css["left"] = asidePanelWidth;
          css["width"] = frozenPanelWidth;
        }
        break;
      case "right":
        if (!this.config.rightSum) {
          isHide = true;
        } else {}
        break;
      default:
        if (containerType !== "page") {
          if (this.config.frozenColumnIndex === 0) {
            css["left"] = asidePanelWidth;
          } else {
            css["left"] = frozenPanelWidth + asidePanelWidth;
          }
          css["width"] = CT_INNER_WIDTH - asidePanelWidth - frozenPanelWidth - rightPanelWidth;
        }
        break;
    }

    if (isHide) {
      panel.css({ display: "none" });
      // 프로세스 중지
      return this;
    }

    if (containerType === "body") {
      switch (vPosition) {
        case "top":
          if (this.config.frozenRowIndex == 0) {
            isHide = true;
          } else {
            css["top"] = 0;
            css["height"] = frozenRowHeight;
          }
          break;
        case "bottom":
          if (!this.config.footSum) {
            isHide = true;
          } else {
            css["top"] = bodyHeight - footSumHeight;
            css["height"] = footSumHeight; // footSum height
          }
          break;
        default:
          css["top"] = frozenRowHeight;
          css["height"] = bodyHeight - frozenRowHeight - footSumHeight;

          break;
      }
    } else if (containerType === "header") {
      css["height"] = headerHeight;
    } else if (containerType === "page") {
      if (pageHeight == 0) {
        isHide = true;
      } else {
        css["height"] = pageHeight;
      }
    }

    if (isHide) {
      panel.css({ display: "none" });
      // 프로세스 중지
      return this;
    }

    panel.css(css);
    return this;
  };
  var scrollerDisplayProcess = function scrollerDisplayProcess(panel, scrollerWidth, scrollerHeight, containerType) {
    var css = {
      display: "block"
    },
        isHide = false;

    switch (containerType) {
      case "vertical":
        if (scrollerWidth > 0) {
          css["width"] = scrollerWidth;
          css["height"] = CT_INNER_HEIGHT;
          css["bottom"] = scrollerHeight + pageHeight;
        } else {
          isHide = true;
        }
        break;
      case "horizontal":
        if (scrollerHeight > 0) {
          css["width"] = CT_INNER_WIDTH;
          css["height"] = scrollerHeight;
          css["right"] = scrollerWidth;
          css["bottom"] = pageHeight;
        } else {
          isHide = true;
        }
        break;
      case "corner":
        if (scrollerWidth > 0 && scrollerHeight > 0) {
          css["width"] = scrollerWidth;
          css["height"] = scrollerHeight;
          css["bottom"] = pageHeight;
        } else {
          isHide = true;
        }
        break;
    }

    if (isHide) {
      panel.css({ display: "none" });
      // 프로세스 중지
      return this;
    }

    panel.css(css);
  };

  this.$["container"]["header"].css({ height: headerHeight });
  this.$["container"]["body"].css({ height: bodyHeight });

  // 각 패널들의 크기 표시여부를 결정합니다
  panelDisplayProcess.call(this, this.$["panel"]["aside-header"], "", "aside", "header");
  panelDisplayProcess.call(this, this.$["panel"]["left-header"], "", "left", "header");
  panelDisplayProcess.call(this, this.$["panel"]["header"], "", "", "header");
  panelDisplayProcess.call(this, this.$["panel"]["right-header"], "", "right", "header");

  panelDisplayProcess.call(this, this.$["panel"]["top-aside-body"], "top", "aside", "body");
  panelDisplayProcess.call(this, this.$["panel"]["top-left-body"], "top", "left", "body");
  panelDisplayProcess.call(this, this.$["panel"]["top-body"], "top", "", "body");
  panelDisplayProcess.call(this, this.$["panel"]["top-right-body"], "top", "right", "body");

  panelDisplayProcess.call(this, this.$["panel"]["aside-body"], "", "aside", "body");
  panelDisplayProcess.call(this, this.$["panel"]["left-body"], "", "left", "body");
  panelDisplayProcess.call(this, this.$["panel"]["body"], "", "", "body");
  panelDisplayProcess.call(this, this.$["panel"]["right-body"], "", "right", "body");

  panelDisplayProcess.call(this, this.$["panel"]["bottom-aside-body"], "bottom", "aside", "body");
  panelDisplayProcess.call(this, this.$["panel"]["bottom-left-body"], "bottom", "left", "body");
  panelDisplayProcess.call(this, this.$["panel"]["bottom-body"], "bottom", "", "body");
  panelDisplayProcess.call(this, this.$["panel"]["bottom-right-body"], "bottom", "right", "body");

  scrollerDisplayProcess.call(this, this.$["scroller"]["vertical"], verticalScrollerWidth, horizontalScrollerHeight, "vertical");
  scrollerDisplayProcess.call(this, this.$["scroller"]["horizontal"], verticalScrollerWidth, horizontalScrollerHeight, "horizontal");
  scrollerDisplayProcess.call(this, this.$["scroller"]["corner"], verticalScrollerWidth, horizontalScrollerHeight, "corner");

  panelDisplayProcess.call(this, this.$["container"]["page"], "", "", "page");

  // 각 패널의 사이즈 결정
  /// 다른 패널의 사이즈 정보가 필요한 경우 여기서 정의해주고 사용함.
  this.xvar.bodyHeight = this.$.panel["body"].height();
  this.xvar.bodyWidth = this.$.panel["body"].width();
  // scrollContentWidth 는 grid-header repaint에서 결정합니다. 까먹지 맙시다. > this.xvar.scrollContentWidth

  return true;
};
var sortColumns = function sortColumns(_sortInfo) {
  _AX6UIGrid_header2.default.repaint.call(this);

  if (_AX6Util2.default.isFunction(this.config.remoteSort)) {
    var that = { sortInfo: [] };
    for (var k in _sortInfo) {
      that.sortInfo.push({
        key: k,
        orderBy: _sortInfo[k].orderBy,
        seq: _sortInfo[k].seq
      });
    }
    that.sortInfo.sort(function (a, b) {
      return a.seq > b.seq;
    });
    this.config.remoteSort.call(that, that);
  } else {
    if (this.config.body.grouping) {
      this.list = _AX6UIGrid_data2.default.initData.call(this, _AX6UIGrid_data2.default.sort.call(this, _sortInfo, _AX6UIGrid_data2.default.clearGroupingData.call(this, this.list)));
    } else {
      this.list = _AX6UIGrid_data2.default.sort.call(this, _sortInfo, _AX6UIGrid_data2.default.clearGroupingData.call(this, this.list), { resetLineNumber: true });
    }
    _AX6UIGrid_body2.default.repaint.call(this, true);
    _AX6UIGrid_scroller2.default.resize.call(this);
  }
};
/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

/**
 * @class
 */

var AX6UIGrid = function (_AX6UICore) {
  _inherits(AX6UIGrid, _AX6UICore);

  _createClass(AX6UIGrid, null, [{
    key: "setFormatter",


    /**
     * @static
     * @param _formatter
     */
    value: function setFormatter(_formatter) {
      return formatter = Object.assign(formatter, _formatter);
    }

    /**
     * @static
     * @return {Object}
     */

  }, {
    key: "getFormatter",
    value: function getFormatter() {
      return formatter || {};
    }

    /**
     * @static
     * @param _collector
     * @return {collector}
     */

  }, {
    key: "setCollector",
    value: function setCollector(_collector) {
      return collector = Object.assign(collector, _collector);
    }

    /**
     * @static
     * @return {collector}
     */

  }, {
    key: "getCollector",
    value: function getCollector() {
      return collector || {};
    }

    /**
     * @static
     * @param _tmpl
     * @return {tmpl}
     */

  }, {
    key: "setTmpl",
    value: function setTmpl(_tmpl) {
      return tmpl = Object.assign(tmpl, _tmpl);
    }

    /**
     * @static
     * @return {tmpl}
     */

  }, {
    key: "getTmpl",
    value: function getTmpl() {
      return tmpl || {};
    }

    /**
     * @constructor
     * @param config
     */

  }]);

  function AX6UIGrid(config) {
    var _ret;

    _classCallCheck(this, AX6UIGrid);

    /**
     * @member {JSON}
     * @param config
     * @param {Element} config.target
     * @param {Number} [config.frozenColumnIndex=0]
     * @param {Number} [config.frozenRowIndex=0]
     * @param {Boolean} [config.showLineNumber=false]
     * @param {Boolean} [config.showRowSelector=false]
     * @param {Boolean} [config.multipleSelect=true]
     * @param {Number} [config.columnMinWidth=100]
     * @param {Number} [config.lineNumberColumnWidth=30]
     * @param {Number} [config.rowSelectorColumnWidth=25]
     * @param {Boolean} [config.sortable=false]
     * @param {Boolean} [config.multiSort=false]
     * @param {Function} [config.remoteSort=false]
     * @param {Boolean} [config.virtualScrollY=true] - 세로축 가상스크롤 처리여부
     * @param {Boolean} [config.virtualScrollX=true] - 가로축 가상스크롤 처리여부
     * @param {Object} [config.header]
     * @param {String} [config.header.align]
     * @param {Number} [config.header.columnHeight=25]
     * @param {Number} [config.header.columnPadding=3]
     * @param {Number} [config.header.columnBorderWidth=1]
     * @param {Object} [config.body]
     * @param {Function} [config.body.onClick]
     * @param {Function} [config.body.onDBLClick]
     * @param {Function} [config.body.onDataChanged]
     * @param {Function} [config.body.onContextMenu]
     * @param {String|Array} [config.body.mergeCells=false] -
     * @param {String} [config.body.align]
     * @param {Number} [config.body.columnHeight=25]
     * @param {Number} [config.body.columnPadding=3]
     * @param {Number} [config.body.columnBorderWidth=1]
     * @param {Object} [config.body.grouping]
     * @param {Array} [config.body.grouping.by] - list grouping keys
     * @param {Array} [config.body.grouping.columns] - list grouping columns
     * @param {(String|Function)} [config.body.trStyleClass]
     * @param {Object} [config.page]
     * @param {Number} [config.page.height=25]
     * @param {Boolean} [config.page.display=true] - grid page display
     * @param {Boolean} [config.page.statusDisplay=true] - grid status display
     * @param {Number} [config.page.navigationItemCount=5]
     * @param {Object} [config.scroller]
     * @param {Number} [config.scroller.size=15]
     * @param {Number} [config.scroller.barMinSize=15]
     * @param {Number} [config.scroller.trackPadding=4]
     * @param {Object} [config.columnKeys]
     * @param {String} [config.columnKeys.selected="_SELECTED"]
     * @param {Object[]} config.columns
     * @param {String} config.columns[].key
     * @param {String} config.columns[].label
     * @param {Number} config.columns[].width
     * @param {(String|Function)} config.columns[].styleClass
     * @param {(String|Function)} config.columns[].headerStyleClass
     * @param {Boolean} config.columns[].enableFilter
     * @param {Boolean} config.columns[].sortable
     * @param {String} config.columns[].align
     * @param {(String|Function)} config.columns[].formatter
     * @param {Object} config.columns[].editor
     * @param {String} config.columns[].editor.type - text,number,money,date
     * @param {Object} config.columns[].editor.config
     * @param {Array} config.columns[].editor.updateWith
     * @param {Function} config.columns[].editor.disabled - disable editor
     * @param {Boolean} [config.columns[].multiLine=false]
     * @param {Object} [config.tree]
     * @param {Boolean} [config.tree.use=false] - Whether tree-type data is used
     * @param {Number} [config.tree.hashDigit=8]
     * @param {Number} [config.tree.indentWidth=10]
     * @param {Number} [config.tree.arrowWidth=15]
     * @param {Number} [config.tree.iconWidth=18]
     * @param {Object} [config.tree.icons]
     * @param {String} [config.tree.icons.openedArrow='▾']
     * @param {String} [config.tree.icons.collapsedArrow='▸']
     * @param {String} [config.tree.icons.groupIcon='⊚']
     * @param {String} [config.tree.icons.collapsedGroupIcon='⊚']
     * @param {String} [config.tree.icons.itemIcon='⊙']
     * @param {Object} [config.tree.columnKeys]
     * @param {String} [config.tree.columnKeys.parentKey="pid"]
     * @param {String} [config.tree.columnKeys.selfKey="id"]
     * @param {String} [config.tree.columnKeys.collapse="collapse"]
     * @param {String} [config.tree.columnKeys.hidden="hidden"]
     * @param {String} [config.tree.columnKeys.parentHash="__hp__"]
     * @param {String} [config.tree.columnKeys.selfHash="__hs__"]
     * @param {String} [config.tree.columnKeys.children="__children__"]
     * @param {String} [config.tree.columnKeys.depth="__depth__"]
     */
    var _this3 = _possibleConstructorReturn(this, (AX6UIGrid.__proto__ || Object.getPrototypeOf(AX6UIGrid)).call(this));

    _this3.config = {
      theme: 'default',
      animateTime: 250,
      debounceTime: 250,
      appendDebouncer: null,
      appendDebounceTimes: 0,
      appendProgressIcon: '...',
      appendProgress: false,

      // 틀고정 속성
      frozenColumnIndex: 0,
      frozenRowIndex: 0,
      showLineNumber: false,
      showRowSelector: false,
      multipleSelect: true,
      virtualScrollY: true,
      virtualScrollX: true,

      // 스크롤될 때 body 페인팅 딜레이를 주어 성능이 좋은 않은 브라우저에서 반응을 빠르게 할 때 사용하는 옵션들
      virtualScrollYCountMargin: 0,
      virtualScrollAccelerated: true,
      virtualScrollAcceleratedDelayTime: 10,

      height: 0,
      columnMinWidth: 100,
      lineNumberColumnWidth: 30,
      rowSelectorColumnWidth: 26,
      sortable: undefined,
      remoteSort: false,

      header: {
        display: true,
        align: false,
        columnHeight: 26,
        columnPadding: 3,
        columnBorderWidth: 1
      },
      body: {
        align: false,
        columnHeight: 26,
        columnPadding: 3,
        columnBorderWidth: 1,
        grouping: false,
        mergeCells: false
      },
      rightSum: false,
      footSum: false,
      page: {
        height: 25,
        display: true,
        statusDisplay: true,
        navigationItemCount: 5
      },
      scroller: {
        size: 15,
        barMinSize: 15,
        trackPadding: 4
      },
      columnKeys: {
        selected: '__selected__',
        modified: '__modified__',
        deleted: '__deleted__',
        disableSelection: '__disable_selection__'
      },
      tree: {
        use: false,
        hashDigit: 8,
        indentWidth: 10,
        arrowWidth: 15,
        iconWidth: 18,
        icons: {
          openedArrow: '▾',
          collapsedArrow: '▸',
          groupIcon: '⊚',
          collapsedGroupIcon: '⊚',
          itemIcon: '⊙'
        },
        columnKeys: {
          parentKey: "pid",
          selfKey: "id",
          collapse: "collapse",
          hidden: "hidden",
          parentHash: "__hp__",
          selfHash: "__hs__",
          children: "__children__",
          depth: "__depth__"
        }
      }
    };
    _jqmin2.default.extend(true, _this3.config, config);

    // 멤버 변수 초기화
    /**
     * @member {Object}
     */
    _this3.xvar = {
      bodyTrHeight: 0, // 한줄의 높이
      scrollContentWidth: 0, // 스크롤 될 내용물의 너비 (스크롤 될 내용물 : panel['body-scroll'] 안에 컬럼이 있는)
      scrollContentHeight: 0, // 스크롤 된 내용물의 높이
      scrollTimer: null
    };

    // 그리드 데이터셋
    /**
     * @member {Array}
     */
    _this3.columns = []; // config.columns에서 복제된 오브젝트
    /**
     * @member {Array}
     */
    _this3.colGroup = []; // columns를 table태그로 출력하기 좋게 변환한 오브젝트
    /**
     * @member {Array}
     */
    _this3.footSumColumns = [];
    /**
     * @member {Object}
     */
    _this3.bodyGrouping = {};
    /**
     * @member {Array}
     */
    _this3.list = []; // 그리드의 데이터
    /**
     * @member {Array}
     */
    _this3.proxyList = null; // 그리드 데이터의 대리자
    /**
     * @member {Object}
     */
    _this3.page = null; // 그리드의 페이지 정보

    _this3.selectedDataIndexs = [];
    _this3.deletedList = [];

    /**
     * @member {Object}
     */
    _this3.sortInfo = {}; // 그리드의 헤더 정렬 정보
    _this3.focused = false;
    /**
     * @member {Object}
     */
    _this3.focusedColumn = {}; // 그리드 바디의 포커스된 셀 정보
    /**
     * @member {Object}
     */
    _this3.selectedColumn = {}; // 그리드 바디의 선택된 셀 정보
    _this3.isInlineEditing = false;
    /**
     * @member {Object}
     */
    _this3.inlineEditing = {};
    /**
     * @member {Object}
     */
    _this3.listIndexMap = {}; // tree데이터 사용시 데이터 인덱싱 맵
    /**
     * @member {Object}
     */
    _this3.contextMenu = null; // contentMenu 의 인스턴스

    // header
    /**
     * @member {Object}
     */
    _this3.headerTable = {};
    /**
     * @member {Object}
     */
    _this3.leftHeaderData = {};
    /**
     * @member {Object}
     */
    _this3.headerData = {};
    /**
     * @member {Object}
     */
    _this3.rightHeaderData = {};

    // body
    /**
     * @member {Object}
     */
    _this3.bodyRowTable = {};
    /**
     * @member {Object}
     */
    _this3.leftBodyRowData = {};
    /**
     * @member {Object}
     */
    _this3.bodyRowData = {};
    /**
     * @member {Object}
     */
    _this3.rightBodyRowData = {};
    /**
     * @member {Object}
     */
    _this3.bodyRowMap = {};

    /**
     * @member {Object}
     */
    _this3.bodyGroupingTable = {};
    /**
     * @member {Object}
     */
    _this3.leftBodyGroupingData = {};
    /**
     * @member {Object}
     */
    _this3.bodyGroupingData = {};
    /**
     * @member {Object}
     */
    _this3.rightBodyGroupingData = {};
    /**
     * @member {Object}
     */
    _this3.bodyGroupingMap = {};

    // footSum
    /**
     * @member {Object}
     */
    _this3.footSumTable = {}; // footSum의 출력레이아웃
    /**
     * @member {Object}
     */
    _this3.leftFootSumData = {}; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
    /**
     * @member {Object}
     */
    _this3.footSumData = {}; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
    /**
     * @member {Boolean}
     */
    _this3.needToPaintSum = true; // 데이터 셋이 변경되어 summary 변경 필요여부

    /**
     * 사용자 정의 formatter. AX6UIGrid.setFormatter 를 이용하여 확장
     * @member
     */
    _this3.customFormatter = AX6UIGrid.getFormatter();

    /**
     * 사용자 정의 collector. AX6UIGrid.setCollector 를 이용하여 확장
     * @member
     */
    _this3.customCollector = AX6UIGrid.getCollector();

    _this3.__tmpl = Object.assign(_AX6UIGrid_tmpl2.default, AX6UIGrid.getTmpl());

    if (typeof config !== "undefined") _this3.init();

    return _ret = _this3, _possibleConstructorReturn(_this3, _ret);
  }

  /**
   * @method
   * @param config
   */


  _createClass(AX6UIGrid, [{
    key: "init",
    value: function init() {
      var _this4 = this;

      // 그리드의 이벤트 정의 구간
      this.onStateChanged = this.config.onStateChanged;
      this.onLoad = this.config.onLoad;

      // init 호출 여부
      this.initOnce();

      if (typeof this.config.target !== "undefined") {

        this.$target = (0, _jqmin2.default)(this.config.target);

        // target attribute data
        (function (data) {
          if (_AX6Util2.default.isObject(data) && !data.error) {
            this.config = _jqmin2.default.extend(true, {}, this.config, data);
          }
        }).call(this, _AX6Util2.default.parseJson(this.$target.attr("data-ax6ui-grid-config"), true));

        if (!this.config.height) {
          this.config._height = this.$target.height();
        }

        if (!this.id) this.id = this.$target.data("ax6ui-grid-id");
        if (!this.id) {
          this.id = 'ax6ui-grid-' + this.instanceId;
          this.$target.data("ax6ui-grid-id", this.id);
        }

        _AX6UIGrid_data2.default.init.call(this);

        if (this.config.tree.use) {
          // 트리라면
          this.sortInfo = {};
          this.sortInfo[this.config.tree.columnKeys.selfHash] = { orderBy: "asc", seq: 0, fixed: true };
        }

        ///========
        // 그리드를 그리기 위한 가장 기초적인 작업 뼈대와 틀을 준비합니다. 이 메소드는 초기화 시 한번만 호출 되게 됩니다.
        initGrid.call(this);

        // columns데이터를 분석하여 미리 처리해야하는 데이터를 정리합니다.
        initColumns.call(this, this.config.columns);
        resetColGroupWidth.call(this);

        // footSum 데이터를 분석하여 미리 처리해야 하는 데이터를 정리
        if (this.config.footSum) initFootSum.call(this, this.config.footSum);

        // bodyGrouping 데이터를 분석하여 미리 처리해야 하는 데이터를 정리
        if (this.config.body.grouping) initBodyGroup.call(this, this.config.body.grouping);

        // 그리드의 각 요소의 크기를 맞춤니다.
        alignGrid.call(this, true);

        // columns의 데이터로 header데이터를 만들고
        _AX6UIGrid_header2.default.init.call(this);
        // header를 출력합니다.
        _AX6UIGrid_header2.default.repaint.call(this);

        // columns의 데이터로 body데이터를 만들고
        _AX6UIGrid_body2.default.init.call(this);
        // body를 출력합니다.
        _AX6UIGrid_body2.default.repaint.call(this);

        // scroller
        _AX6UIGrid_scroller2.default.init.call(this);
        _AX6UIGrid_scroller2.default.resize.call(this);

        (0, _jqmin2.default)(window).on("resize.ax6grid-" + this.id, _AX6Util2.default.throttle(function (e) {
          alignGrid.call(this);
          _AX6UIGrid_scroller2.default.resize.call(this);
          _AX6UIGrid_body2.default.repaint.call(this); // window resize시 repaint 함수 호출
        }, 30).bind(this)).on("keydown.ax6grid-" + this.instanceId, function (e) {
          if (_this4.focused) {
            if (_this4.isInlineEditing) {
              if (e.which == _AX6Info2.default.eventKeys.ESC) {
                _this4.keyDown("ESC", e.originalEvent);
              } else if (e.which == _AX6Info2.default.eventKeys.RETURN) {
                _this4.keyDown("RETURN", e.originalEvent);
              } else if (e.which == _AX6Info2.default.eventKeys.TAB) {
                _this4.keyDown("TAB", e.originalEvent);
                _AX6Util2.default.stopEvent(e);
              } else if (e.which == _AX6Info2.default.eventKeys.UP) {
                _this4.keyDown("RETURN", { shiftKey: true });
              } else if (e.which == _AX6Info2.default.eventKeys.DOWN) {
                _this4.keyDown("RETURN", {});
              }
            } else {
              if (e.metaKey || e.ctrlKey) {
                if (e.which == 67) {
                  // c
                  self.copySelect();
                }
              } else {
                if (ctrlKeys[e.which]) {
                  _this4.keyDown(ctrlKeys[e.which], e.originalEvent); // 키다운 이벤트 호출
                  _AX6Util2.default.stopEvent(e);
                } else if (e.which == _AX6Info2.default.eventKeys.ESC) {
                  if (_this4.focused) {
                    _AX6UIGrid_body2.default.blur.call(self);
                  }
                } else if (e.which == _AX6Info2.default.eventKeys.RETURN || e.which == _AX6Info2.default.eventKeys.SPACE) {
                  _this4.keyDown("RETURN", e.originalEvent);
                } else if (e.which == _AX6Info2.default.eventKeys.TAB) {
                  //self.keyDown("RETURN", e.originalEvent);
                  _AX6Util2.default.stopEvent(e);
                } else if (Object.keys(_this4.focusedColumn).length) {
                  _this4.keyDown("INLINE_EDIT", e.originalEvent);
                }
              }
            }
          }
        });

        (0, _jqmin2.default)(document.body).on("click.ax6grid-" + this.id, function (e) {
          var isPickerClick = false,
              target = _AX6Util2.default.findParentNode(e.target, function (_target) {
            if (isPickerClick = _target.getAttribute("data-ax6grid-inline-edit-picker")) {
              return true;
            }
            return _target.getAttribute("data-ax6grid-container") === "root";
          });

          if (target && target.getAttribute("data-ax6grid-instance") === _this4.id) {
            _this4.focused = true;
          } else {
            _this4.focused = false;
            _AX6UIGrid_body2.default.blur.call(_this4);
          }
        });

        // 그리드 레이아웃이 모든 준비를 마친시점에 onLoad존재 여부를 확인하고 호출하여 줍니다.
        setTimeout(function () {
          if (_this4.onLoad) {
            _this4.onLoad.call({
              self: _this4
            });
          }
        });
      }
    }

    /**
     * @method
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;
    }

    /**
     * 그리드의 각 패널들의 크기를 변경된 설정에 맞추어 다시 그림
     * @method
     * @return {AX6UIGrid}
     */

  }, {
    key: "align",
    value: function align() {
      if (alignGrid.call(this)) {
        _AX6UIGrid_body2.default.repaint.call(this);
        _AX6UIGrid_scroller2.default.resize.call(this);
      }
      return this;
    }

    /**
     * 그리드에 키보드 액션을 전달
     * @method
     * @param _act
     * @param _data
     * @return {AX6UIGrid}
     */

  }, {
    key: "keyDown",
    value: function keyDown(_act, _data) {
      var processor = {
        "KEY_UP": function KEY_UP() {
          _AX6UIGrid_body2.default.moveFocus.call(this, "UP");
        },
        "KEY_DOWN": function KEY_DOWN() {
          _AX6UIGrid_body2.default.moveFocus.call(this, "DOWN");
        },
        "KEY_LEFT": function KEY_LEFT() {
          _AX6UIGrid_body2.default.moveFocus.call(this, "LEFT");
        },
        "KEY_RIGHT": function KEY_RIGHT() {
          _AX6UIGrid_body2.default.moveFocus.call(this, "RIGHT");
        },
        "KEY_HOME": function KEY_HOME() {
          _AX6UIGrid_body2.default.moveFocus.call(this, "HOME");
        },
        "KEY_END": function KEY_END() {
          _AX6UIGrid_body2.default.moveFocus.call(this, "END");
        },
        "INLINE_EDIT": function INLINE_EDIT(_e) {
          _AX6UIGrid_body2.default.inlineEdit.active.call(this, this.focusedColumn, _e);
          if (!/[0-9a-zA-Z]/.test(_e.key)) {
            _AX6Util2.default.stopEvent(_e);
          }
        },
        "ESC": function ESC(_e) {
          _AX6UIGrid_body2.default.inlineEdit.keydown.call(this, "ESC");
        },
        "RETURN": function RETURN(_e) {
          var activeEditLength = 0;
          for (var columnKey in this.inlineEditing) {
            activeEditLength++;

            if (!_AX6UIGrid_body2.default.inlineEdit.keydown.call(this, "RETURN", columnKey)) {
              return false;
              _AX6Util2.default.stopEvent(_e);
            }
            // next focus
            if (activeEditLength == 1) {
              if (_AX6UIGrid_body2.default.moveFocus.call(this, _e.shiftKey ? "UP" : "DOWN")) {
                _AX6UIGrid_body2.default.inlineEdit.keydown.call(this, "RETURN");
              }
            }
          }
          if (activeEditLength == 0) {
            _AX6UIGrid_body2.default.inlineEdit.keydown.call(this, "RETURN");
            _AX6Util2.default.stopEvent(_e);
          } else {}
        },
        "TAB": function TAB(_e) {

          var activeEditLength = 0;
          for (var columnKey in this.inlineEditing) {
            activeEditLength++;

            _AX6UIGrid_body2.default.inlineEdit.keydown.call(this, "RETURN", columnKey, { moveFocus: true });
            // next focus
            if (activeEditLength == 1) {
              if (_AX6UIGrid_body2.default.moveFocus.call(this, _e.shiftKey ? "LEFT" : "RIGHT")) {
                _AX6UIGrid_body2.default.inlineEdit.keydown.call(this, "RETURN", undefined, { moveFocus: true });
              }
            }
          }
        }
      };
      if (_act in processor) processor[_act].call(this, _data);
      return this;
    }

    /**
     * 선택된 셀을 클립보드에 복사합니다
     * @method
     * @return {*}
     */

  }, {
    key: "copySelect",
    value: function copySelect() {
      var copysuccess = void 0,
          $clipBoard = this.$["form"]["clipboard"],
          copyTextArray = [],
          copyText = "",
          _rowIndex = void 0,
          _colIndex = void 0,
          _dindex = void 0,
          _di = 0;

      for (var c in this.selectedColumn) {
        var _column = this.selectedColumn[c];

        if (_column) {
          if (typeof _dindex === "undefined") {
            _dindex = _column.dindex;
            _rowIndex = _column.rowIndex;
            _colIndex = _column.rowIndex;
          }

          if (_dindex != _column.dindex || _rowIndex != _column.rowIndex) {
            _di++;
          }

          if (!copyTextArray[_di]) {
            copyTextArray[_di] = [];
          }
          var originalColumn = this.bodyRowMap[_column.rowIndex + "_" + _column.colIndex];
          if (originalColumn) {
            if (this.list[_column.dindex].__isGrouping) {
              copyTextArray[_di].push(this.list[_column.dindex][_column.colIndex]);
            } else {
              copyTextArray[_di].push(this.list[_column.dindex][originalColumn.key]);
            }
          } else {
            copyTextArray[_di].push("");
          }

          _dindex = _column.dindex;
          _rowIndex = _column.rowIndex;
        }
      }

      copyTextArray.forEach(function (r) {
        copyText += r.join('\t') + "\n";
      });

      $clipBoard.get(0).innerText = copyText;
      $clipBoard.select();

      try {
        copysuccess = document.execCommand("copy");
      } catch (e) {
        copysuccess = false;
      }
      return copysuccess;
    }

    /**
     * @method
     * @param _data
     * @return {AX6UIGrid}
     * @example
     * ```js
     * import {AX6UIGrid as Grid} from "ax6ui";
     *
     * let grid = new Grid({target: el});
     * grid.setData([
     *  {name: "Thomas"}
     * ]);
     *
     * grid.setData({
       *  list: [],
       *  page: {
       *      currentPage: 0,
       *      pageSize: 50,
       *      totalElements: 500,
       *      totalPages: 100
       *  }
       * });
     * ```
     */

  }, {
    key: "setData",
    value: function setData(_data) {
      var isFirstPaint = typeof this.xvar.paintStartRowIndex === "undefined";

      _AX6UIGrid_data2.default.set.call(this, _data);
      alignGrid.call(this);
      _AX6UIGrid_body2.default.repaint.call(this);
      if (!isFirstPaint) _AX6UIGrid_body2.default.scrollTo.call(this, { top: 0 });

      _AX6UIGrid_scroller2.default.resize.call(this);
      _AX6UIGrid_page2.default.navigationUpdate.call(this);

      isFirstPaint = null;
      return this;
    }

    /**
     * @method
     * @param _type
     * @return {*}
     * @example
     * ```js
     * import {AX6UIGrid as Grid} from "ax6ui";
     * let grid = new Grid({target: el});
     * grid.setData([]);
     *
     * grid.getList(); // return all
     * grid.getList("selected");
     * grid.getList("modified");
     * grid.getList("deleted");
     * ```
     */

  }, {
    key: "getList",
    value: function getList(_type) {
      return _AX6UIGrid_data2.default.getList.call(this, _type);
    }

    /**
     * @method
     * @param _height
     * @return {AX6UIGrid}
     * @example
     * ```js
     * grid.setHeight(height);
     * ```
     */

  }, {
    key: "setHeight",
    value: function setHeight(_height) {
      if (_height == "100%") {
        _height = this.$target.offsetParent().innerHeight();
      }
      this.$target.css({ height: _height });
      this.$["container"]["root"].css({ height: _height });
      alignGrid.call(this);
      _AX6UIGrid_body2.default.repaint.call(this, "reset");
      _AX6UIGrid_scroller2.default.resize.call(this);
      return this;
    }

    /**
     * @method
     * @param _row
     * @param {Number|String} [_dindex="last"]
     * @param _options
     * @param {Boolean} [_options.sort]
     * @param {Number|String} [_options.focus] - HOME|END|[dindex]
     * @return {AX6UIGrid}
     * @example
     * ```js
     * grid.addRow($.extend({}, {...}), "first");
     * grid.addRow($.extend({}, {...}), "last", {focus: "END"});
     * grid.addRow($.extend({}, {...}), "last", {focus: "HOME"});
     * grid.addRow($.extend({}, {...}), "last", {focus: 10});
     * ```
     */

  }, {
    key: "addRow",
    value: function addRow(_row, _dindex, _options) {
      _AX6UIGrid_data2.default.add.call(this, _row, _dindex, _options);
      alignGrid.call(this);
      _AX6UIGrid_body2.default.repaint.call(this, "reset");
      if (_options && _options.focus) {
        _AX6UIGrid_body2.default.moveFocus.call(this, _options.focus);
      }
      _AX6UIGrid_scroller2.default.resize.call(this);
      return this;
    }

    /**
     * @method
     * @param _list
     * @return {AX6UIGrid}
     * @example
     * ```js
     * grid.appendToList([{},{},{}]);
     * grid.appendToList([{},{},{}]);
     * ```
     */

  }, {
    key: "appendToList",
    value: function appendToList(_list) {
      _AX6UIGrid_data2.default.append.call(this, _list, function () {
        alignGrid.call(this);
        _AX6UIGrid_body2.default.repaint.call(this);
        _AX6UIGrid_scroller2.default.resize.call(this);
      }.bind(this));
      return this;
    }

    /**
     * @method
     * @param {Number|String} [_dindex=last]
     * @return {AX6UIGrid}
     * @example
     * ```js
     * grid.removeRow();
     * grid.removeRow("first");
     * grid.removeRow("last");
     * grid.removeRow(1);
     * grid.removeRow("selected");
     * ```
     */

  }, {
    key: "removeRow",
    value: function removeRow(_dindex) {
      _AX6UIGrid_data2.default.remove.call(this, _dindex);
      alignGrid.call(this);
      _AX6UIGrid_body2.default.repaint.call(this, "reset");
      _AX6UIGrid_body2.default.moveFocus.call(this, this.config.body.grouping ? "START" : "END");
      _AX6UIGrid_scroller2.default.resize.call(this);
      return this;
    }

    /**
     * @method
     * @param _row
     * @param _dindex
     * @return {AX6UIGrid}
     * @example
     * ```js
     * grid.updateRow({price: 100, amount: 100, cost: 10000}, 1);
     * ```
     */

  }, {
    key: "updateRow",
    value: function updateRow(_row, _dindex) {
      _AX6UIGrid_data2.default.update.call(this, _row, _dindex);
      // todo : mergeCells 옵션에 따라 예외처리
      _AX6UIGrid_body2.default.repaintRow.call(this, _dindex);
      return this;
    }

    /**
     * @method
     * @param {Number} _dindex
     * @param {Object} _updateData
     * @param {Object} [_options]
     * @param {Function} [_options.filter]
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * onDataChanged: function () {
       *      this.self.updateChildRows(this.dindex, {isChecked: this.item.isChecked});
       * }
     *
     * onDataChanged: function () {
       *      this.self.updateChildRows(this.dindex, {isChecked: this.item.isChecked}, {filter: function(){
       *          return this.item.type == "A";
       *      });
       * }
       * ```
       */

  }, {
    key: "updateChildRows",
    value: function updateChildRows(_dindex, _updateData, _options) {
      _AX6UIGrid_data2.default.updateChild.call(this, _dindex, _updateData, _options);
      this.xvar.paintStartRowIndex = undefined;
      this.xvar.paintStartColumnIndex = undefined;
      _AX6UIGrid_body2.default.repaint.call(this);
      return this;
    }

    /**
     * @method
     * @param {Number|String} _dindex
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * grid.deleteRow("first");
     * grid.deleteRow("last");
     * grid.deleteRow(1);
     * grid.deleteRow("selected");
     * ```
     */

  }, {
    key: "deleteRow",
    value: function deleteRow(_dindex) {
      _AX6UIGrid_data2.default.deleteRow.call(this, _dindex);
      alignGrid.call(this);
      _AX6UIGrid_body2.default.repaint.call(this, "reset");

      _AX6UIGrid_scroller2.default.resize.call(this);
      return this;
    }

    /**
     * @method
     * @param _dindex
     * @param _key
     * @param _value
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * grid.setValue(0, "price", 100);
     * ```
     */

  }, {
    key: "setValue",
    value: function setValue(_dindex, _key, _value) {
      var doindex = void 0;

      if (_AX6UIGrid_data2.default.setValue.call(this, _dindex, doindex, _key, _value)) {
        var repaintCell = function repaintCell(_panelName, _rows, __dindex, __doindex, __key, __value) {
          for (var r = 0, rl = _rows.length; r < rl; r++) {
            for (var c = 0, cl = _rows[r].cols.length; c < cl; c++) {
              if (_rows[r].cols[c].key == __key) {
                if (this.xvar.frozenRowIndex > __dindex) {
                  _AX6UIGrid_body2.default.repaintCell.call(this, "top-" + _panelName, __dindex, __doindex, r, c, __value);
                } else {
                  _AX6UIGrid_body2.default.repaintCell.call(this, _panelName + "-scroll", __dindex, __doindex, r, c, __value);
                }
              }
            }
          }
        };

        repaintCell.call(this, "left-body", this.leftBodyRowData.rows, _dindex, doindex, _key, _value);
        repaintCell.call(this, "body", this.bodyRowData.rows, _dindex, doindex, _key, _value);
      }

      return this;
    }

    /**
     * @method
     * @param {Object} _column
     * @param {Number|String} [_cindex=last]
     * @returns {AX6UIGrid}
     */

  }, {
    key: "addColumn",
    value: function addColumn(_column, _cindex) {
      var processor = {
        "first": function first(_column) {
          this.config.columns = [].concat(_column).concat(this.config.columns);
        },
        "last": function last(_column) {
          this.config.columns = this.config.columns.concat([].concat(_column));
        }
      };

      if (typeof _column === "undefined") throw '_column must not be null';
      if (typeof _cindex === "undefined") _cindex = "last";
      if (_cindex in processor) {
        processor[_cindex].call(this, _column);
      } else {
        if (!_AX6Util2.default.isNumber(_cindex)) {
          throw 'invalid argument _cindex';
        }
        if (_AX6Util2.default.isArray(_column)) {
          for (var _i = 0, _l = _column.length; _i < _l; _i++) {
            this.config.columns.splice(_cindex + _i, 0, _column[_i]);
          }
        } else {
          this.config.columns.splice(_cindex, 0, _column);
        }
      }
      onResetColumns.call(this); // 컬럼이 변경되었을 때.
      return this;
    }

    /**
     * @method
     * @param {Number|String} [_cindex=last]
     * @returns {AX6UIGrid}
     */

  }, {
    key: "removeColumn",
    value: function removeColumn(_cindex) {
      var processor = {
        "first": function first(_cindex) {
          this.config.columns.splice(_cindex, 1);
        },
        "last": function last() {
          this.config.columns.splice(this.config.columns.length - 1, 1);
        }
      };
      if (typeof _cindex === "undefined") _cindex = "last";
      if (_cindex in processor) {
        processor[_cindex].call(this, _cindex);
      } else {
        if (!_AX6Util2.default.isNumber(_cindex)) {
          throw 'invalid argument _cindex';
        }
        //
        this.config.columns.splice(_cindex, 1);
      }
      onResetColumns.call(this); // 컬럼이 변경되었을 때.
      return this;
    }

    /**
     * @method
     * @param {Object} _column
     * @param {Number} _cindex
     * @returns {AX6UIGrid}
     */

  }, {
    key: "updateColumn",
    value: function updateColumn(_column, _cindex) {
      if (!_AX6Util2.default.isNumber(_cindex)) {
        throw 'invalid argument _cindex';
      }
      //
      this.config.columns.splice(_cindex, 1, _column);
      onResetColumns.call(this); // 컬럼이 변경되었을 때.
      return this;
    }

    /**
     * @method
     * @param {Number} _width
     * @param {Number} _cindex
     * @returns {AX6UIGrid}
     */

  }, {
    key: "setColumnWidth",
    value: function setColumnWidth(_width, _cindex) {
      this.colGroup[this.xvar.columnResizerIndex]._width = _width;
      this.needToPaintSum = true;

      // 컬럼너비 변경사항 적용.
      _AX6UIGrid_header2.default.repaint.call(this);
      _AX6UIGrid_body2.default.repaint.call(this, true);
      _AX6UIGrid_scroller2.default.resize.call(this);

      alignGrid.call(this);
      return this;
    }

    /**
     * @method
     * @returns {Object} sortInfo
     */

  }, {
    key: "getColumnSortInfo",
    value: function getColumnSortInfo() {
      var that = { sortInfo: [] };
      for (var k in this.sortInfo) {
        that.sortInfo.push({
          key: k,
          orderBy: this.sortInfo[k].orderBy,
          seq: this.sortInfo[k].seq
        });
      }
      that.sortInfo.sort(function (a, b) {
        return a.seq > b.seq;
      });
      return that.sortInfo;
    }

    /**
     * @method
     * @param {Object} _sortInfo
     * @param {Object} _sortInfo.key
     * @param {Number} _sortInfo.key.seq - seq of sortOrder
     * @param {String} _sortInfo.key.orderBy - "desc"|"asc"
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * grid.setColumnSort({a:{seq:0, orderBy:"desc"}, b:{seq:1, orderBy:"asc"}});
     * ```
     */

  }, {
    key: "setColumnSort",
    value: function setColumnSort(_sortInfo) {
      if (typeof _sortInfo !== "undefined") {
        this.sortInfo = _sortInfo;
        _AX6UIGrid_header2.default.applySortStatus.call(this, _sortInfo);
      }

      sortColumns.call(this, _sortInfo || this.sortInfo);
      return this;
    }

    /**
     * @method
     * @param {Number|Object} _selectObject
     * @param {Number} _selectObject.index - index of row
     * @param {Number} _selectObject.rowIndex - rowIndex of columns
     * @param {Number} _selectObject.conIndex - colIndex of columns
     * @param {Object} _options
     * @param {Boolean} _options.selectedClear
     * @param {Boolean} _options.selected
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * grid.select(0);
     * grid.select(0, {selected: true});
     * grid.select(0, {selected: false});
     * grid.select(0, {selectedClear: true});
     * ```
     */

  }, {
    key: "select",
    value: function select(_selectObject, _options) {
      if (_AX6Util2.default.isNumber(_selectObject)) {
        var dindex = _selectObject;

        if (!this.config.multipleSelect) {
          this.clearSelect();
        } else {
          if (_options && _options.selectedClear) {
            this.clearSelect();
          }
        }

        _AX6UIGrid_data2.default.select.call(this, dindex, undefined, _options && _options.selected);
        _AX6UIGrid_body2.default.updateRowState.call(this, ["selected"], dindex, undefined);
      }
      return this;
    }

    /**
     * @method
     * @param _dindex
     * @return {AX6UIGrid}
     */

  }, {
    key: "clickBody",
    value: function clickBody(_dindex) {
      _AX6UIGrid_body2.default.click.call(this, _dindex);
      return this;
    }

    /**
     * @method
     * @param _dindex
     * @return {AX6UIGrid}
     */

  }, {
    key: "DBLClickBody",
    value: function DBLClickBody(_dindex) {
      _AX6UIGrid_body2.default.dblClick.call(this, _dindex);
      return this;
    }

    /**
     * @method
     * @return {AX6UIGrid}
     */

  }, {
    key: "clearSelect",
    value: function clearSelect() {
      _AX6UIGrid_body2.default.updateRowState.call(this, ["selectedClear"]);
      _AX6UIGrid_data2.default.clearSelect.call(this);
      return this;
    }

    /**
     * @method
     * @param {Object} _options
     * @param {Boolean} _options.selected
     * @param {Function} _options.filter
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * grid.selectAll();
     * grid.selectAll({selected: true});
     * grid.selectAll({selected: false});
     * grid.selectAll({filter: function(){
       *      return this["b"] == "A01";
       * });
       * grid.selectAll({selected: true, filter: function(){
       *      return this["b"] == "A01";
       * });
       * ```
       */

  }, {
    key: "selectAll",
    value: function selectAll(_options) {
      _AX6UIGrid_data2.default.selectAll.call(this, _options && _options.selected, _options);
      _AX6UIGrid_body2.default.updateRowStateAll.call(this, ["selected"]);
      return this;
    }

    /**
     * @method
     * @param {String} _fileName
     * @returns {AX6UIGrid|String}
     * @example
     * ```js
     * grid.exportExcel("grid-to-excel.xls");
     * console.log(grid.exportExcel());
     * ```
     */

  }, {
    key: "exportExcel",
    value: function exportExcel(_fileName) {
      var table = [];
      table.push('<table border="1">');
      table.push(_AX6UIGrid_header2.default.getExcelString.call(this));
      table.push(_AX6UIGrid_body2.default.getExcelString.call(this));
      table.push('</table>');

      if (typeof _fileName === "undefined") {
        return table.join('');
      } else {
        EXCEL.export.call(this, [table.join('')], _fileName);
      }

      return this;
    }

    /**
     * @method
     * @param {String|Number} _pos - UP, DOWN, LEFT, RIGHT, HOME, END
     * @returns {AX6UIGrid}
     * @example
     * ```js
     * grid.focus("UP");
     * grid.focus("DOWN");
     * grid.focus("HOME");
     * grid.focus("END");
     * ```
     */

  }, {
    key: "focus",
    value: function focus(_pos) {

      if (_AX6UIGrid_body2.default.moveFocus.call(this, _pos)) {
        var focusedColumn = void 0;
        for (var c in this.focusedColumn) {
          focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
          break;
        }
        if (focusedColumn) {
          this.select(focusedColumn.dindex, { selectedClear: true });
        }
      } else {
        if (typeof this.selectedDataIndexs[0] === "undefined") {
          this.select(0);
        } else {
          var selectedIndex = this.selectedDataIndexs[0];
          var processor = {
            "UP": function UP() {
              if (selectedIndex > 0) {
                this.select(selectedIndex - 1, { selectedClear: true });
                _AX6UIGrid_body2.default.moveFocus.call(this, selectedIndex - 1);
              }
            },
            "DOWN": function DOWN() {
              if (selectedIndex < this.list.length - 1) {
                this.select(selectedIndex + 1, { selectedClear: true });
                _AX6UIGrid_body2.default.moveFocus.call(this, selectedIndex + 1);
              }
            },
            "HOME": function HOME() {
              this.select(0, { selectedClear: true });
              _AX6UIGrid_body2.default.moveFocus.call(this, 0);
            },
            "END": function END() {
              this.select(this.list.length - 1, { selectedClear: true });
              _AX6UIGrid_body2.default.moveFocus.call(this, this.list.length - 1);
            }
          };

          if (_pos in processor) {
            processor[_pos].call(this);
          }
        }
      }
      return this;
    }

    /**
     * @method
     * @return {null}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.$target.empty();
      this.list = [];

      return null;
    }
  }]);

  return AX6UIGrid;
}(_AX6UICore3.default);

exports.default = AX6UIGrid;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(0);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UIGrid_body = __webpack_require__(21);

var _AX6UIGrid_body2 = _interopRequireDefault(_AX6UIGrid_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var edit_text = {
  useReturnToSave: true,
  editMode: "popup",
  getHtml: function getHtml(_root, _columnKey, _editor, _value) {
    if (typeof _editor.attributes !== "undefined") {
      var attributesText = "";
      for (var k in _editor.attributes) {
        attributesText += " " + k + "='" + _editor.attributes[k] + "'";
      }
    }
    return "<input type=\"text\" data-ax6grid-editor=\"text\" value=\"" + _value + "\" " + attributesText + ">";
  },
  init: function init(_root, _columnKey, _editor, _$parent, _value) {
    var $el;
    _$parent.append($el = (0, _jqmin2.default)(this.getHtml(_root, _columnKey, _editor, _value)));
    this.bindUI(_root, _columnKey, $el, _editor, _$parent, _value);
    $el.on("blur", function () {
      _AX6UIGrid_body2.default.inlineEdit.deActive.call(_root, "RETURN", _columnKey);
    });
    return $el;
  },
  bindUI: function bindUI(_root, _columnKey, _$el, _editor, _$parent, _value) {
    _$el.focus().select();
  }
};

var edit_money = {
  useReturnToSave: true,
  editMode: "popup",
  getHtml: function getHtml(_root, _columnKey, _editor, _value) {
    var attributesText = "";
    if (typeof _editor.attributes !== "undefined") {
      for (var k in _editor.attributes) {
        attributesText += " " + k + "='" + _editor.attributes[k] + "'";
      }
    }
    return '<input type="text" data-ax6grid-editor="money" value="' + _value + '" ' + attributesText + '" />';
  },
  init: function init(_root, _columnKey, _editor, _$parent, _value) {
    var $el = void 0;
    _$parent.append($el = (0, _jqmin2.default)(this.getHtml(_root, _columnKey, _editor, _value)));
    this.bindUI(_root, _columnKey, $el, _editor, _$parent, _value);
    $el.on("blur", function () {
      _AX6UIGrid_body2.default.inlineEdit.deActive.call(_root, "RETURN", _columnKey);
    });
    return $el;
  },
  bindUI: function bindUI(_root, _columnKey, _$el, _editor, _$parent, _value) {
    _$el.data("binded-ax5ui", "ax5formater");
    _$el.ax5formatter($.extend(true, {
      pattern: "money"
    }, _editor.config));
    _$el.focus().select();
  }
};

var edit_number = {
  useReturnToSave: true,
  editMode: "popup",
  getHtml: function getHtml(_root, _columnKey, _editor, _value) {
    var attributesText = "";
    if (typeof _editor.attributes !== "undefined") {
      for (var k in _editor.attributes) {
        attributesText += " " + k + "='" + _editor.attributes[k] + "'";
      }
    }
    return '<input type="text" data-ax6grid-editor="number" value="' + _value + '" ' + attributesText + '" />';
  },
  init: function init(_root, _columnKey, _editor, _$parent, _value) {
    var $el;
    _$parent.append($el = (0, _jqmin2.default)(this.getHtml(_root, _columnKey, _editor, _value)));
    this.bindUI(_root, _columnKey, $el, _editor, _$parent, _value);
    $el.on("blur", function () {
      _AX6UIGrid_body2.default.inlineEdit.deActive.call(_root, "RETURN", _columnKey);
    });
    return $el;
  },
  bindUI: function bindUI(_root, _columnKey, _$el, _editor, _$parent, _value) {
    _$el.data("binded-ax5ui", "ax5formater");
    _$el.ax5formatter($.extend(true, {
      pattern: "number"
    }, _editor.config));
    _$el.focus().select();
  }
};

var edit_date = {
  useReturnToSave: true,
  editMode: "popup",
  getHtml: function getHtml(_root, _columnKey, _editor, _value) {
    return '<input type="text" data-ax6grid-editor="calendar" value="' + _value + '" >';
  },
  init: function init(_root, _columnKey, _editor, _$parent, _value) {
    var $el;
    _$parent.append($el = (0, _jqmin2.default)(this.getHtml(_root, _columnKey, _editor, _value)));
    this.bindUI(_root, _columnKey, $el, _editor, _$parent, _value);
    return $el;
  },
  bindUI: function bindUI(_root, _columnKey, _$el, _editor, _$parent, _value) {
    var self = _root;
    _$el.data("binded-ax5ui", "ax5picker");

    _$el.ax5picker($.extend(true, {
      direction: "auto",
      content: {
        type: 'date',
        formatter: {
          pattern: 'date'
        }
      },
      onStateChanged: function onStateChanged() {
        if (this.state == "open") {
          this.self.activePicker.attr("data-ax6grid-inline-edit-picker", "date");
        } else if (this.state == "close") {
          _AX6UIGrid_body2.default.inlineEdit.deActive.call(self, "RETURN", _columnKey);
        }
      }
    }, _editor.config));

    _$el.focus().select();
  }
};

var edit_select = {
  useReturnToSave: false,
  editMode: "popup",
  getHtml: function getHtml(_root, _columnKey, _editor, _value) {
    var po = [];
    po.push('<div data-ax5select="ax5grid-editor" data-ax5select-config="{}">');
    po.push('</div>');

    return po.join('');
  },
  init: function init(_root, _columnKey, _editor, _$parent, _value) {
    var $el;
    _$parent.append($el = (0, _jqmin2.default)(this.getHtml(_root, _columnKey, _editor, _value)));
    this.bindUI(_root, _columnKey, $el, _editor, _$parent, _value);
    return $el;
  },
  bindUI: function bindUI(_root, _columnKey, _$el, _editor, _$parent, _value) {
    var eConfig = {
      columnKeys: {
        optionValue: "value",
        optionText: "text",
        optionSelected: "selected"
      }
    };
    _jqmin2.default.extend(true, eConfig, _editor.config);

    eConfig.options.forEach(function (n) {
      if (n[eConfig.columnKeys.optionValue] == _value) n[eConfig.columnKeys.optionSelected] = true;
    });

    var self = _root;
    _$el.data("binded-ax5ui", "ax5select");
    _$el.ax5select($.extend(true, {
      direction: "auto",
      columnKeys: eConfig.columnKeys,
      options: eConfig.options,
      onStateChanged: function onStateChanged() {
        if (this.state == "open") {
          this.self.activeSelectOptionGroup.attr("data-ax6grid-inline-edit-picker", "select");
        } else if (this.state == "changeValue") {
          _AX6UIGrid_body2.default.inlineEdit.deActive.call(self, "RETURN", _columnKey, this.value[0][eConfig.columnKeys.optionValue]);
        } else if (this.state == "close") {
          _AX6UIGrid_body2.default.inlineEdit.deActive.call(self, "ESC", _columnKey);
        }
      }
    }, _editor.config));
    _$el.ax5select("open");
    _$el.ax5select("setValue", _value);
    _$el.find("a").focus();
  }
};

var edit_checkbox = {
  editMode: "inline",
  getHtml: function getHtml(_root, _editor, _value) {

    var lineHeight = _root.config.body.columnHeight - _root.config.body.columnPadding * 2 - _root.config.body.columnBorderWidth;
    var checked;
    if (_editor.config && _editor.config.trueValue) {
      checked = _value == _editor.config.trueValue ? "true" : "false";
    } else {
      checked = _value == false || _value == "false" || _value < "1" ? "false" : "true";
    }

    var eConfig = {
      marginTop: 2,
      height: lineHeight - 4
    };
    _jqmin2.default.extend(true, eConfig, _editor.config);
    eConfig.marginTop = (lineHeight - eConfig.height) / 2;

    return '<div data-ax6grid-editor="checkbox" data-ax6grid-checked="' + checked + '" style="height:' + eConfig.height + 'px;width:' + eConfig.height + 'px;margin-top:' + eConfig.marginTop + 'px;"></div>';
  }
};

var edit_textarea = {
  useReturnToSave: false,
  editMode: "popup",
  _getHtml: function _getHtml(_root, _columnKey, _editor, _value) {
    // init 에서 사용하게 될 HTML 태그를 만들어 줍니다.
    return "<div data-ax6grid-editor=\"textarea\"></div>";
  },
  _bindUI: function _bindUI(_root, _columnKey, _$el, _editor, _$parent, _value) {
    // 위치와 크기를 구합니다.
    var offset = _$el.offset();
    var box = {
      width: _$el.width()
    };
    var editorHeight = 150;
    var buttonHeight = 30;

    // 새로운 엘리먼트 생성
    var $newDiv = (0, _jqmin2.default)("<div data-ax6grid-popup=\"textarea\" style=\"z-index: 9999;\">\n    <textarea style=\"width:100%;height:" + (editorHeight - buttonHeight) + "px;\" class=\"form-control\">" + _value + "</textarea>\n    <div style=\"height:" + buttonHeight + "px;padding:5px;text-align: right;\">\n        <button class=\"btn btn-default\">OK</button>\n    </div>\n</div>");
    var $newTextarea = $newDiv.find("textarea");
    // 엘리먼트에 CSS 적용
    $newDiv.css({
      position: "absolute",
      left: offset.left,
      top: offset.top,
      width: box.width,
      height: editorHeight
    });
    $newDiv.find("textarea");

    // 새로운 엘리먼트를 document.body에 append
    (0, _jqmin2.default)(document.body).append($newDiv);
    $newTextarea.focus().select();

    $newTextarea.on("blur", function (e) {
      _AX6UIGrid_body2.default.inlineEdit.deActive.call(_root, "RETURN", _columnKey, this.value);
      $newDiv.remove();
      ax5.util.stopEvent(e.originalEvent);
    });
    $newTextarea.on("keydown", function (e) {
      if (e.which == ax5.info.eventKeys.ESC) {
        _AX6UIGrid_body2.default.inlineEdit.deActive.call(_root, "ESC", _columnKey);
        $newDiv.remove();
        ax5.util.stopEvent(e.originalEvent);
      }
    });

    /// 값 변경
    /// BODY.inlineEdit.deActive.call(_root, "RETURN", _columnKey, this.value[0][eConfig.columnKeys.optionValue]);
    /// 에디팅 취소
    /// BODY.inlineEdit.deActive.call(_root, "ESC", _columnKey);
  },

  init: function init(_root, _columnKey, _editor, _$parent, _value) {
    // 인라인 에디팅 활성화 시작
    /**
     * _root : gridInstance
     * _columnKey : di + "_" + col.colIndex + "_" + col.rowIndex
     * _editor : col.editor
     * _$parent : 셀
     * _value : 값
     */
    var $el = void 0;
    _$parent.append($el = (0, _jqmin2.default)(this._getHtml(_root, _columnKey, _editor, _value)));
    // 셀에 HTML 컨텐츠 추가

    this._bindUI(_root, _columnKey, $el, _editor, _$parent, _value);
    // 이벤트 바인딩

    return $el;
  }
};

exports.default = {
  "text": edit_text,
  "money": edit_money,
  "number": edit_number,
  "date": edit_date,
  "select": edit_select,
  "checkbox": edit_checkbox,
  "textarea": edit_textarea
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sum = function sum() {
  var value = 0,
      i = this.list.length;
  while (i--) {
    if (!("__groupingList" in this.list[i])) {
      value += _AX6Util2.default.number(this.list[i][this.key]);
    }
  }
  return value;
};

var avg = function avg() {
  var value = 0,
      i = this.list.length,
      listLength = 0;
  while (i--) {
    if (!("__groupingList" in this.list[i])) {
      value += _AX6Util2.default.number(this.list[i][this.key]);
      listLength++;
    }
  }
  return _AX6Util2.default.number(value / (listLength || 1), { "round": 2 });
};

exports.default = {
  sum: sum,
  avg: avg
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var money = function money() {
  if (typeof this.value !== "undefined") {
    var val = ('' + this.value).replace(/[^0-9^\.^\-]/g, ""),
        regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
        arrNumber = val.split('.'),
        returnValue = void 0;

    arrNumber[0] += '.';

    do {
      arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
    } while (regExpPattern.test(arrNumber[0]));

    return arrNumber.length > 1 ? arrNumber[0] + _AX6Util2.default.left(arrNumber[1], 2) : arrNumber[0].split('.')[0];
  } else {
    return "";
  }
};

exports.default = {
  money: money
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var main = function main() {
    return "<div data-ax6grid-container=\"root\" data-ax6grid-instance=\"{{instanceId}}\">\n            <div data-ax6grid-container=\"hidden\">\n                <textarea data-ax6grid-form=\"clipboard\"></textarea>\n            </div>\n            <div data-ax6grid-container=\"header\">\n                <div data-ax6grid-panel=\"aside-header\"></div>\n                <div data-ax6grid-panel=\"left-header\"></div>\n                <div data-ax6grid-panel=\"header\">\n                    <div data-ax6grid-panel-scroll=\"header\"></div>\n                </div>\n                <div data-ax6grid-panel=\"right-header\"></div>\n            </div>\n            <div data-ax6grid-container=\"body\">\n                <div data-ax6grid-panel=\"top-aside-body\"></div>\n                <div data-ax6grid-panel=\"top-left-body\"></div>\n                <div data-ax6grid-panel=\"top-body\">\n                    <div data-ax6grid-panel-scroll=\"top-body\"></div>\n                </div>\n                <div data-ax6grid-panel=\"top-right-body\"></div>\n                <div data-ax6grid-panel=\"aside-body\">\n                    <div data-ax6grid-panel-scroll=\"aside-body\"></div>\n                </div>\n                <div data-ax6grid-panel=\"left-body\">\n                    <div data-ax6grid-panel-scroll=\"left-body\"></div>\n                </div>\n                <div data-ax6grid-panel=\"body\">\n                    <div data-ax6grid-panel-scroll=\"body\"></div>\n                </div>\n                <div data-ax6grid-panel=\"right-body\">\n                  <div data-ax6grid-panel-scroll=\"right-body\"></div>\n                </div>\n                <div data-ax6grid-panel=\"bottom-aside-body\"></div>\n                <div data-ax6grid-panel=\"bottom-left-body\"></div>\n                <div data-ax6grid-panel=\"bottom-body\">\n                    <div data-ax6grid-panel-scroll=\"bottom-body\"></div>\n                </div>\n                <div data-ax6grid-panel=\"bottom-right-body\"></div>\n            </div>\n            <div data-ax6grid-container=\"page\">\n                <div data-ax6grid-page=\"holder\">\n                    <div data-ax6grid-page=\"navigation\"></div>\n                    <div data-ax6grid-page=\"status\"></div>\n                </div>\n            </div>\n            <div data-ax6grid-container=\"scroller\">\n                <div data-ax6grid-scroller=\"vertical\">\n                    <div data-ax6grid-scroller=\"vertical-bar\"></div>    \n                </div>\n                <div data-ax6grid-scroller=\"horizontal\">\n                    <div data-ax6grid-scroller=\"horizontal-bar\"></div>\n                </div>\n                <div data-ax6grid-scroller=\"corner\"></div>\n            </div>\n            <div data-ax6grid-resizer=\"vertical\"></div>\n            <div data-ax6grid-resizer=\"horizontal\"></div>\n        </div>";
};

var page_navigation = function page_navigation() {
    return "<div data-ax6grid-page-navigation=\"holder\">\n            {{#hasPage}}\n            <div data-ax6grid-page-navigation=\"cell\">    \n                {{#firstIcon}}<button type=\"button\" data-ax6grid-page-move=\"first\">{{{firstIcon}}}</button>{{/firstIcon}}\n                <button type=\"button\" data-ax6grid-page-move=\"prev\">{{{prevIcon}}}</button>\n            </div>\n            <div data-ax6grid-page-navigation=\"cell-paging\">\n                {{#@paging}}\n                <button type=\"button\" data-ax6grid-page-move=\"{{pageNo}}\" data-ax6grid-page-selected=\"{{selected}}\">{{pageNo}}</button>\n                {{/@paging}}\n            </div>\n            <div data-ax6grid-page-navigation=\"cell\">\n                <button type=\"button\" data-ax6grid-page-move=\"next\">{{{nextIcon}}}</button>\n                {{#lastIcon}}<button type=\"button\" data-ax6grid-page-move=\"last\">{{{lastIcon}}}</button>{{/lastIcon}}\n            </div>\n            {{/hasPage}}\n        </div>";
};

var page_status = function page_status() {
    return "<span>{{{progress}}} {{fromRowIndex}} - {{toRowIndex}} of {{dataRowCount}} {{#totalElements}}&nbsp; Total {{.}}{{/totalElements}}</span>";
};

exports.default = {
    "main": main,
    "page_navigation": page_navigation,
    "page_status": page_status
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "[data-ax6ui-grid] {\n  box-sizing: border-box; }\n  [data-ax6ui-grid] *,\n  [data-ax6ui-grid] *:before,\n  [data-ax6ui-grid] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] {\n    margin: 0;\n    padding: 0;\n    position: relative;\n    background: #fff;\n    border: 1px solid #ccc;\n    overflow: hidden; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"hidden\"] {\n      margin: 0;\n      padding: 0;\n      position: absolute;\n      left: -100%;\n      top: -100%;\n      height: 100%;\n      width: 100%; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] {\n      user-select: none;\n      margin: 0;\n      padding: 0;\n      position: relative;\n      overflow: hidden;\n      background-color: #FFFFFF;\n      background-image: -webkit-linear-gradient(top, #FFFFFF, #F0F0F0);\n      background-image: linear-gradient(to bottom,#FFFFFF, #F0F0F0);\n      border: 0 none;\n      border-bottom: 1px solid #ccc;\n      color: #222; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] {\n        margin: 0;\n        padding: 0;\n        position: absolute;\n        overflow: hidden;\n        /*\n    overflow: hidden;\n    -webkit-overflow-scrolling: touch;\n    transform: translate3d(0, 0, 0);\n    */ }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table {\n          table-layout: fixed;\n          border-collapse: separate;\n          border-spacing: 0;\n          border: 0 none;\n          width: 100%;\n          height: 100%; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr {\n            border-bottom: 0 none; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr.tr-0 {\n              background: #f3f3f3; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr.tr-1 {\n              background: #fff; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr.tr-2 {\n              background: #f3f3f3; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr.tr-3 {\n              background: #fff; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr.hover {\n              background: #e1eef8; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-grouping-tr=\"true\"] {\n              background: #ffffe7; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] {\n              background: #e3f1ff; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] td[data-ax6grid-column-attr=\"lineNumber\"] {\n                box-shadow: none; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox:after {\n                opacity: 1; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-disable-selection=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox {\n              cursor: not-allowed;\n              background-color: #d7d7d7;\n              background-image: -webkit-linear-gradient(top, #d7d7d7, #e6e6e6);\n              background-image: linear-gradient(to bottom,#d7d7d7, #e6e6e6); }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr[data-ax6grid-disable-selection=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox:after {\n                opacity: 0; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td.merged {\n              background: #fff; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td {\n              box-sizing: border-box;\n              overflow: hidden;\n              position: relative;\n              padding: 0;\n              font-size: 12px;\n              border: 0 none;\n              border-radius: 0;\n              cursor: pointer;\n              box-shadow: inset 1px 1px 0px 0px #fff; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td.hasBorder {\n                border-right: 1px solid #ccc;\n                border-bottom: 1px solid #ccc; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td.focused {\n                box-shadow: inset 0px 0px 1px 1px #0581f2; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td:hover {\n                background-color: #eee;\n                background-image: -webkit-linear-gradient(top, #eee, #eee);\n                background-image: linear-gradient(to bottom,#eee, #eee); }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-row=\"null\"] {\n                box-shadow: none; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-row=\"null\"] {\n                border-right: 0 none; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-selected] {\n                background: #e3f1ff;\n                border-color: #ccc;\n                color: #000; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-focused] {\n                box-shadow: inset 0px 0px 1px 1px #0581f2;\n                background: #fdfeff;\n                color: #000; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] {\n                cursor: pointer; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] [data-ax6grid-cellHolder] {\n                  padding: 5px; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox {\n                  display: inline-block;\n                  position: relative;\n                  border: 1px solid #ccc;\n                  border-radius: 3px;\n                  background-color: #FFFFFF;\n                  background-image: -webkit-linear-gradient(top, #FFFFFF, #F0F0F0);\n                  background-image: linear-gradient(to bottom,#FFFFFF, #F0F0F0);\n                  height: 100%;\n                  width: 100%; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox:after {\n                    content: '';\n                    width: 60%;\n                    height: 40%;\n                    position: absolute;\n                    top: 20%;\n                    right: 20%;\n                    border: 0.2em solid #3372ff;\n                    border-top: none;\n                    border-right: none;\n                    background: transparent;\n                    opacity: 0.0;\n                    -webkit-transform: rotate(-50deg);\n                    -moz-transform: rotate(-50deg);\n                    -ms-transform: rotate(-50deg);\n                    -o-transform: rotate(-50deg);\n                    transform: rotate(-50deg); }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"][data-ax6grid-selected=\"true\"] .checkBox:after {\n                  opacity: 1; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] {\n                display: block;\n                box-sizing: border-box;\n                padding: 3px 5px;\n                font-size: 12px;\n                white-space: nowrap;\n                overflow: hidden;\n                text-overflow: ellipsis; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-text-align=\"left\"] {\n                  text-align: left; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-text-align=\"center\"] {\n                  text-align: center; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-text-align=\"right\"] {\n                  text-align: right; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-cellHolder=\"multiLine\"] {\n                  white-space: normal; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor] {\n                  position: absolute;\n                  left: 0;\n                  top: 0;\n                  width: 100%;\n                  height: 100%;\n                  border: 0 none;\n                  background: #fff; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor]::-ms-clear {\n                    display: none; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax5select] {\n                  position: absolute;\n                  display: block;\n                  left: 0;\n                  top: 0;\n                  width: 100%;\n                  height: 100%;\n                  border: 0 none;\n                  background: #fff; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax5select] .ax5select-display {\n                    height: 100%;\n                    border-radius: 0; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor=\"checkbox\"] {\n                  display: inline-block;\n                  position: relative;\n                  border: 1px solid #ccc;\n                  border-radius: 3px;\n                  background-color: #FFFFFF;\n                  background-image: -webkit-linear-gradient(top, #FFFFFF, #F0F0F0);\n                  background-image: linear-gradient(to bottom,#FFFFFF, #F0F0F0);\n                  height: 100%; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor=\"checkbox\"]:after {\n                    content: '';\n                    width: 60%;\n                    height: 40%;\n                    position: absolute;\n                    top: 20%;\n                    right: 20%;\n                    border: 0.2em solid #3372ff;\n                    border-top: none;\n                    border-right: none;\n                    background: transparent;\n                    opacity: 0.0;\n                    -webkit-transform: rotate(-50deg);\n                    -moz-transform: rotate(-50deg);\n                    -ms-transform: rotate(-50deg);\n                    -o-transform: rotate(-50deg);\n                    transform: rotate(-50deg); }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor=\"checkbox\"][data-ax6grid-checked=\"true\"]:after {\n                    opacity: 1.0; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-tnode-arrow] {\n                  display: inline-block;\n                  box-sizing: content-box;\n                  text-align: right;\n                  text-shadow: 0 -1px #fff;\n                  padding: 0 5px 0 0; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] a[data-ax6grid-tnode-arrow] {\n                  cursor: pointer;\n                  text-decoration: none; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] a[data-ax6grid-tnode-arrow]:hover {\n                    text-decoration: none; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-tnode-item=\"group\"] {\n                  display: inline-block; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-tnode-item=\"item\"] {\n                  display: inline-block; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-header\"] {\n          border-right: 1px solid #cccccc; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-header\"] table tr td {\n            text-align: center; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"] {\n          border-right: 1px solid #cccccc;\n          background: #f2f2f2; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"] table tr, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-body\"] table tr, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"] table tr {\n            background: #f2f2f2; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"] table tr td, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-body\"] table tr td, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"] table tr td {\n              text-align: center;\n              box-shadow: inset 1px 1px 0px 0px #fff; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"left-header\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-left-body\"] {\n          border-right: 1px solid #b3b3b3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-right-body\"] {\n          border-bottom: 1px solid #b3b3b3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-right-body\"] {\n          border-top: 1px solid #b3b3b3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-right-body\"] {\n          background: #ffe7e2; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-panel] [data-ax6grid-panel-scroll] {\n          position: absolute;\n          left: 0;\n          top: 0; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-resizer] {\n        position: absolute;\n        right: 0;\n        top: 0;\n        width: 4px;\n        height: 100%;\n        cursor: col-resize; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-resizer]:hover {\n          background: #ff3300;\n          opacity: 0.5; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort] {\n        position: relative;\n        width: 10;\n        height: 10;\n        display: inline-block; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort]:before {\n          top: 0;\n          left: 0;\n          position: absolute;\n          content: ' ';\n          width: 0;\n          height: 0;\n          display: inline-block;\n          border-left: 3.6px solid transparent;\n          border-right: 3.6px solid transparent;\n          border-bottom: 4.09091px solid #000;\n          background: transparent;\n          opacity: 0.3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort]:after {\n          bottom: 0;\n          left: 0;\n          position: absolute;\n          content: ' ';\n          width: 0;\n          height: 0;\n          display: inline-block;\n          border-left: 3.6px solid transparent;\n          border-right: 3.6px solid transparent;\n          border-top: 4.09091px solid #000;\n          background: transparent;\n          opacity: 0.3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort][data-ax6grid-column-sort-order=\"asc\"]:before {\n          top: 2px;\n          left: 0;\n          position: absolute;\n          content: ' ';\n          width: 0;\n          height: 0;\n          display: inline-block;\n          border-left: 4px solid transparent;\n          border-right: 4px solid transparent;\n          border-bottom: 5px solid #000;\n          background: transparent;\n          opacity: 0.8; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort][data-ax6grid-column-sort-order=\"asc\"]:after {\n          display: none; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort][data-ax6grid-column-sort-order=\"desc\"]:before {\n          display: none; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-sort][data-ax6grid-column-sort-order=\"desc\"]:after {\n          bottom: 2px;\n          left: 0;\n          position: absolute;\n          content: ' ';\n          width: 0;\n          height: 0;\n          display: inline-block;\n          border-left: 4px solid transparent;\n          border-right: 4px solid transparent;\n          border-top: 5px solid #000;\n          background: transparent;\n          opacity: 0.8; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-filter] {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 10;\n        height: 10;\n        cursor: pointer; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"header\"] [data-ax6grid-column-filter]:before {\n          content: ' ';\n          width: 0;\n          height: 0;\n          display: inline-block;\n          border-left: 5 solid transparent;\n          border-right: 5 solid transparent;\n          border-top: 10 solid #000;\n          background: transparent;\n          opacity: 1; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] {\n      margin: 0;\n      padding: 0;\n      position: relative;\n      overflow: hidden;\n      /*\n      @keyframes fadein {\n          from { opacity: 0; }\n          to   { opacity: 1; }\n      }\n\n      [data-ax6grid-panel-scroll=\"body\"]{\n          table {\n              @include animation(fadein 0.3s);\n          }\n      }\n      */ }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] {\n        margin: 0;\n        padding: 0;\n        position: absolute;\n        overflow: hidden;\n        /*\n    overflow: hidden;\n    -webkit-overflow-scrolling: touch;\n    transform: translate3d(0, 0, 0);\n    */ }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table {\n          table-layout: fixed;\n          border-collapse: separate;\n          border-spacing: 0;\n          border: 0 none;\n          width: 100%; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr {\n            border-bottom: 0 none; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr.tr-0 {\n              background: #f3f3f3; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr.tr-1 {\n              background: #fff; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr.tr-2 {\n              background: #f3f3f3; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr.tr-3 {\n              background: #fff; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr.hover {\n              background: #e1eef8; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-grouping-tr=\"true\"] {\n              background: #ffffe7; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] {\n              background: #e3f1ff; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] td[data-ax6grid-column-attr=\"lineNumber\"] {\n                box-shadow: none; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-selected=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox:after {\n                opacity: 1; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-disable-selection=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox {\n              cursor: not-allowed;\n              background-color: #d7d7d7;\n              background-image: -webkit-linear-gradient(top, #d7d7d7, #e6e6e6);\n              background-image: linear-gradient(to bottom,#d7d7d7, #e6e6e6); }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr[data-ax6grid-disable-selection=\"true\"] td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox:after {\n                opacity: 0; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td.merged {\n              background: #fff; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td {\n              box-sizing: border-box;\n              overflow: hidden;\n              position: relative;\n              padding: 0;\n              font-size: 12px;\n              border: 0 none;\n              border-radius: 0; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td.hasBorder {\n                border-right: 1px solid #ccc;\n                border-bottom: 1px solid #ccc; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td.focused {\n                box-shadow: inset 0px 0px 1px 1px #0581f2; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-row=\"null\"] {\n                border-right: 0 none; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-selected] {\n                background: #e3f1ff;\n                border-color: #ccc;\n                color: #000; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-focused] {\n                box-shadow: inset 0px 0px 1px 1px #0581f2;\n                background: #fdfeff;\n                color: #000; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] {\n                cursor: pointer; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] [data-ax6grid-cellHolder] {\n                  padding: 5px; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox {\n                  display: inline-block;\n                  position: relative;\n                  border: 1px solid #ccc;\n                  border-radius: 3px;\n                  background-color: #FFFFFF;\n                  background-image: -webkit-linear-gradient(top, #FFFFFF, #F0F0F0);\n                  background-image: linear-gradient(to bottom,#FFFFFF, #F0F0F0);\n                  height: 100%;\n                  width: 100%; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"] .checkBox:after {\n                    content: '';\n                    width: 60%;\n                    height: 40%;\n                    position: absolute;\n                    top: 20%;\n                    right: 20%;\n                    border: 0.2em solid #3372ff;\n                    border-top: none;\n                    border-right: none;\n                    background: transparent;\n                    opacity: 0.0;\n                    -webkit-transform: rotate(-50deg);\n                    -moz-transform: rotate(-50deg);\n                    -ms-transform: rotate(-50deg);\n                    -o-transform: rotate(-50deg);\n                    transform: rotate(-50deg); }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td[data-ax6grid-column-attr=\"rowSelector\"][data-ax6grid-selected=\"true\"] .checkBox:after {\n                  opacity: 1; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] {\n                display: block;\n                box-sizing: border-box;\n                padding: 3px 5px;\n                font-size: 12px;\n                white-space: nowrap;\n                overflow: hidden;\n                text-overflow: ellipsis; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-text-align=\"left\"] {\n                  text-align: left; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-text-align=\"center\"] {\n                  text-align: center; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-text-align=\"right\"] {\n                  text-align: right; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder][data-ax6grid-cellHolder=\"multiLine\"] {\n                  white-space: normal; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor] {\n                  position: absolute;\n                  left: 0;\n                  top: 0;\n                  width: 100%;\n                  height: 100%;\n                  border: 0 none;\n                  background: #fff; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor]::-ms-clear {\n                    display: none; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax5select] {\n                  position: absolute;\n                  display: block;\n                  left: 0;\n                  top: 0;\n                  width: 100%;\n                  height: 100%;\n                  border: 0 none;\n                  background: #fff; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax5select] .ax5select-display {\n                    height: 100%;\n                    border-radius: 0; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor=\"checkbox\"] {\n                  display: inline-block;\n                  position: relative;\n                  border: 1px solid #ccc;\n                  border-radius: 3px;\n                  background-color: #FFFFFF;\n                  background-image: -webkit-linear-gradient(top, #FFFFFF, #F0F0F0);\n                  background-image: linear-gradient(to bottom,#FFFFFF, #F0F0F0);\n                  height: 100%; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor=\"checkbox\"]:after {\n                    content: '';\n                    width: 60%;\n                    height: 40%;\n                    position: absolute;\n                    top: 20%;\n                    right: 20%;\n                    border: 0.2em solid #3372ff;\n                    border-top: none;\n                    border-right: none;\n                    background: transparent;\n                    opacity: 0.0;\n                    -webkit-transform: rotate(-50deg);\n                    -moz-transform: rotate(-50deg);\n                    -ms-transform: rotate(-50deg);\n                    -o-transform: rotate(-50deg);\n                    transform: rotate(-50deg); }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-editor=\"checkbox\"][data-ax6grid-checked=\"true\"]:after {\n                    opacity: 1.0; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-tnode-arrow] {\n                  display: inline-block;\n                  box-sizing: content-box;\n                  text-align: right;\n                  text-shadow: 0 -1px #fff;\n                  padding: 0 5px 0 0; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] a[data-ax6grid-tnode-arrow] {\n                  cursor: pointer;\n                  text-decoration: none; }\n                  [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] a[data-ax6grid-tnode-arrow]:hover {\n                    text-decoration: none; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-tnode-item=\"group\"] {\n                  display: inline-block; }\n                [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] table tr td [data-ax6grid-cellHolder] [data-ax6grid-tnode-item=\"item\"] {\n                  display: inline-block; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-header\"] {\n          border-right: 1px solid #cccccc; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-header\"] table tr td {\n            text-align: center; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"] {\n          border-right: 1px solid #cccccc;\n          background: #f2f2f2; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"] table tr, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-body\"] table tr, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"] table tr {\n            background: #f2f2f2; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"] table tr td, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"aside-body\"] table tr td, [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"] table tr td {\n              text-align: center;\n              box-shadow: inset 1px 1px 0px 0px #fff; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"left-header\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-left-body\"] {\n          border-right: 1px solid #b3b3b3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"top-right-body\"] {\n          border-bottom: 1px solid #b3b3b3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-right-body\"] {\n          border-top: 1px solid #b3b3b3; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-aside-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-left-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-body\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel][data-ax6grid-panel=\"bottom-right-body\"] {\n          background: #ffe7e2; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"body\"] [data-ax6grid-panel] [data-ax6grid-panel-scroll] {\n          position: absolute;\n          left: 0;\n          top: 0; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] {\n      margin: 0;\n      padding: 0;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      overflow: hidden;\n      background-color: #FFFFFF;\n      background-image: -webkit-linear-gradient(top, #FFFFFF, #F0F0F0);\n      background-image: linear-gradient(to bottom,#FFFFFF, #F0F0F0);\n      border: 0 none;\n      border-top: 1px solid #ccc; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] {\n        margin: 0;\n        padding: 0;\n        display: table;\n        width: 100%;\n        height: 100%; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] {\n          margin: 0;\n          padding: 0;\n          display: table-cell;\n          vertical-align: middle;\n          text-align: left;\n          padding-left: 5px;\n          font-size: 12px; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] {\n            display: table; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-navigation=\"cell\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-navigation=\"cell-paging\"] {\n              display: table-cell;\n              vertical-align: middle; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-navigation=\"cell-paging\"] {\n              padding: 0 5px; }\n            [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-move] {\n              box-sizing: border-box;\n              min-width: 20px;\n              border-radius: 5px;\n              padding: 1px;\n              border: 0px none;\n              background: transparent;\n              font-size: 11px;\n              color: #222;\n              outline: 0; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-move][data-ax6grid-page-selected=\"true\"], [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-move]:active {\n                background-color: #888;\n                color: #fff; }\n              [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"navigation\"] [data-ax6grid-page-navigation=\"holder\"] [data-ax6grid-page-move]:hover {\n                text-decoration: underline; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"page\"] [data-ax6grid-page=\"holder\"] [data-ax6grid-page=\"status\"] {\n          margin: 0;\n          padding: 0;\n          display: table-cell;\n          text-align: right;\n          vertical-align: middle;\n          padding-right: 10px;\n          font-size: 12px;\n          color: #222; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] {\n      margin: 0;\n      padding: 0;\n      position: absolute;\n      right: 0;\n      bottom: 0; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"vertical\"] {\n        box-sizing: border-box;\n        position: absolute;\n        display: none;\n        right: 0;\n        bottom: 0;\n        width: 15px;\n        height: 100%;\n        background: #f3f3f3;\n        border-left: 1px solid #ccc; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"vertical\"] [data-ax6grid-scroller=\"vertical-bar\"] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          border-top-left-radius: 10px;\n          border-top-right-radius: 10px;\n          border-bottom-left-radius: 10px;\n          border-bottom-right-radius: 10px;\n          box-sizing: border-box;\n          border: 0px solid #fff;\n          background: #ccc;\n          cursor: ns-resize; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"vertical\"] [data-ax6grid-scroller=\"vertical-bar\"]:hover {\n            border: 0px solid #ccc;\n            background: #bababa; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"horizontal\"] {\n        box-sizing: border-box;\n        position: absolute;\n        display: none;\n        right: 0;\n        bottom: 0;\n        height: 15px;\n        width: 100%;\n        background: #f3f3f3;\n        border-top: 1px solid #ccc; }\n        [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"horizontal\"] [data-ax6grid-scroller=\"horizontal-bar\"] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          border-top-left-radius: 10px;\n          border-top-right-radius: 10px;\n          border-bottom-left-radius: 10px;\n          border-bottom-right-radius: 10px;\n          box-sizing: border-box;\n          border: 0px solid #fff;\n          background: #ccc;\n          cursor: ew-resize; }\n          [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"horizontal\"] [data-ax6grid-scroller=\"horizontal-bar\"]:hover {\n            border: 0px solid #ccc;\n            background: #bababa; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-container=\"scroller\"] [data-ax6grid-scroller=\"corner\"] {\n        position: absolute;\n        display: none;\n        right: 0;\n        bottom: 0;\n        width: 15px;\n        height: 15px;\n        background: #EAEDEF;\n        border-top: 1px solid #ccc;\n        border-left: 1px solid #ccc; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-resizer=\"horizontal\"] {\n      display: none; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-resizer=\"horizontal\"].live {\n        display: block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: #ff3300;\n        opacity: 0.5;\n        height: 100%;\n        width: 2px;\n        cursor: col-resize; }\n    [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-resizer=\"vertical\"] {\n      display: none; }\n      [data-ax6ui-grid] [data-ax6grid-container=\"root\"] [data-ax6grid-resizer=\"vertical\"].live {\n        display: block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: #ff3300;\n        opacity: 0.5;\n        height: 2px;\n        width: 100%;\n        cursor: row-resize; }\n", ""]);

// exports


/***/ })
/******/ ]);