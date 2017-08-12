webpackJsonp([12],{

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UICalendar = __webpack_require__(77);

var _AX6UICalendar2 = _interopRequireDefault(_AX6UICalendar);

__webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div id=\"calendar-target-0\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-1\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div style=\"clear: both;\"></div>\n<div id=\"calendar-target-2\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-3\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-4\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-5\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var today = new Date();

    var myCalendar_0 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      dimensions: {
        itemPadding: 1,
        height: 250
      },
      target: document.getElementById("calendar-target-0"),
      displayDate: new Date(),
      startOfWeek: 1,
      mode: "day",
      selectMode: "day",
      onClick: function onClick() {
        console.log(myCalendar_0.getSelection());
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
      },
      multipleSelect: 2
    });

    // setSelection
    var myCalendar_1 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      dimensions: {
        itemPadding: 1,
        height: 250
      },
      target: document.getElementById("calendar-target-1"),
      displayDate: today,
      startOfWeek: 0,
      mode: "day",
      selectMode: "day",
      multipleSelect: 2
    });

    myCalendar_1.setSelection([_AX6Util2.default.date(today, { 'add': { d: -2 } }), _AX6Util2.default.date(today, { 'add': { d: -3 } })]);

    console.log(myCalendar_1.getSelection());

    var myCalendar_2 = new _AX6UICalendar2.default({
      target: document.getElementById("calendar-target-2"),
      marker: function () {
        var marker = {};
        marker[_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: -1 } })] = true;
        marker[_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 0 } })] = true;
        marker[_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 1 } })] = true;
        return marker;
      }()
    });

    // Selectable
    var myCalendar_3 = new _AX6UICalendar2.default({
      target: document.getElementById("calendar-target-3"),
      selectable: [_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: -1 } }), _AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 0 } }), _AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 1 } })],
      onClick: function onClick() {
        console.log(this);
      }
    });

    // Period
    var myCalendar_4 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      target: document.getElementById("calendar-target-4"),
      multipleSelect: 2,
      onClick: function onClick() {
        var dates = this.self.getSelection();
        if (dates.length > 1) {
          var minDate = new Date(Math.min(_AX6Util2.default.date(dates[0]).getTime(), _AX6Util2.default.date(dates[1]).getTime()));
          var maxDate = new Date(Math.max(_AX6Util2.default.date(dates[0]).getTime(), _AX6Util2.default.date(dates[1]).getTime()));

          this.self.setPeriod({
            range: [{ from: minDate, to: maxDate, fromLabel: 'S', toLabel: 'E' }]
          });
        }
      }
    });

    // changeMode
    var myCalendar_5 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      dimensions: {
        itemPadding: 1,
        height: 250
      },
      target: document.getElementById("calendar-target-5"),
      displayDate: new Date(),
      startOfWeek: 1,
      mode: "day",
      selectMode: "day",
      onClick: function onClick() {
        console.log(myCalendar_0.getSelection());
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
      },
      multipleSelect: 2
    });
    myCalendar_5.changeMode("y");
  },
  moduleDestroy: function moduleDestroy($body) {
    $body.off("click");
  }
};

exports.default = {
  html: html,
  fn: fn
};

/***/ }),

/***/ 40:
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

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(40);

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

/***/ 43:
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

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
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

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-moz-keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-webkit-keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n@-moz-keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n@keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n[data-ax6ui-calendar] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-calendar] * {\n    box-sizing: border-box; }\n  [data-ax6ui-calendar] .calendar-control {\n    position: relative;\n    box-sizing: content-box;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5);\n    border: 1px solid #ddd;\n    border-radius: 5px;\n    font-size: 18px;\n    margin-bottom: 5px;\n    padding: 0;\n    color: #333; }\n    [data-ax6ui-calendar] .calendar-control .date-move-left, [data-ax6ui-calendar] .calendar-control .date-move-right {\n      display: block;\n      position: absolute;\n      overflow: hidden;\n      text-align: center;\n      font-size: 22px;\n      cursor: pointer;\n      text-decoration: none;\n      padding: 0; }\n      [data-ax6ui-calendar] .calendar-control .date-move-left i, [data-ax6ui-calendar] .calendar-control .date-move-left span, [data-ax6ui-calendar] .calendar-control .date-move-right i, [data-ax6ui-calendar] .calendar-control .date-move-right span {\n        line-height: inherit; }\n    [data-ax6ui-calendar] .calendar-control .date-move-left {\n      left: 0px;\n      top: 0px; }\n    [data-ax6ui-calendar] .calendar-control .date-move-right {\n      right: 0px;\n      top: 0px; }\n    [data-ax6ui-calendar] .calendar-control .date-display {\n      text-align: center; }\n      [data-ax6ui-calendar] .calendar-control .date-display [data-calendar-display] {\n        margin: 0px 10px;\n        cursor: pointer;\n        text-decoration: underline; }\n    [data-ax6ui-calendar] .calendar-control a {\n      color: #333; }\n    [data-ax6ui-calendar] .calendar-control a:hover {\n      color: #337ab7; }\n  [data-ax6ui-calendar] .calendar-body.fadein {\n    -webkit-animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    opacity: 1.0; }\n  [data-ax6ui-calendar] .calendar-body.fadeout {\n    -webkit-animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    opacity: 0.0; }\n  [data-ax6ui-calendar] .calendar-body table {\n    box-sizing: border-box;\n    table-layout: fixed;\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 0 none; }\n    [data-ax6ui-calendar] .calendar-body table thead {\n      border: 0 none; }\n      [data-ax6ui-calendar] .calendar-body table thead td, [data-ax6ui-calendar] .calendar-body table thead th {\n        box-sizing: border-box;\n        vertical-align: middle;\n        line-height: 1em;\n        cursor: pointer;\n        text-align: center;\n        font-size: 12px;\n        padding: 0px 2px;\n        border: 0px none;\n        overflow: hidden;\n        background-color: #FFFFFF;\n        background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n        background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n        color: #6D6E70; }\n        [data-ax6ui-calendar] .calendar-body table thead td.calendar-col-0, [data-ax6ui-calendar] .calendar-body table thead th.calendar-col-0 {\n          color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table thead td.calendar-col-6, [data-ax6ui-calendar] .calendar-body table thead th.calendar-col-6 {\n          color: #32B4DC; }\n    [data-ax6ui-calendar] .calendar-body table tbody {\n      border: 0 none; }\n      [data-ax6ui-calendar] .calendar-body table tbody td, [data-ax6ui-calendar] .calendar-body table tbody th {\n        box-sizing: border-box;\n        vertical-align: middle;\n        line-height: 1em;\n        cursor: pointer;\n        text-align: center;\n        font-size: 14px;\n        border: 0px none;\n        background-color: #FFFFFF;\n        background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n        background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n        overflow: hidden;\n        /*\n          &.calendar-col-0 {\n              .calendar-item-day.live {\n                  color: $ax6ui-calendar-sun-text-color;\n                  @include extend-item-theme();\n              }\n          }\n          &.calendar-col-6 {\n              .calendar-item-day.live {\n                  color: $ax6ui-calendar-sat-text-color;\n                  @include extend-item-theme();\n              }\n          }\n          */ }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day {\n          position: relative;\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon {\n            position: absolute;\n            width: 100%;\n            text-align: center;\n            line-height: 11.2px;\n            font-size: 11.2px; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon.addon-header, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon.addon-header {\n              left: 0px;\n              top: 1px; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon.addon-footer, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon.addon-footer {\n              left: 0px;\n              bottom: 1px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live span.addon {\n              color: #A1A1A1; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live.sunday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live.sunday {\n              color: #C78B81; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live.saturday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live.saturday {\n              color: #32B4DC; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus.hover {\n              background-color: #32B4DC;\n              background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n              background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n              color: #fff !important; }\n              [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus.hover span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus.hover span.addon {\n                color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.period, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.period {\n            background-color: #82d3fa;\n            background-image: -webkit-linear-gradient(bottom, #82d3fa, #82d3fa);\n            background-image: linear-gradient(to top,#82d3fa, #82d3fa);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.period span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.period span.addon {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.selected-day, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.selected-day {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.selected-day span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.selected-day span.addon {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.holiday {\n            color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month {\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.hover {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month span.lunar, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month span.lunar {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.holiday {\n            color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year {\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.hover {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year span.lunar, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year span.lunar {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.holiday {\n            color: #C78B81; }\n", ""]);

// exports


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(40);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(42);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = __webpack_require__(3);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(43);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var tmpl = {
  frame: function frame(columnKeys) {
    return "\n<div data-ax6ui-calendar=\"\" class=\"ax6-ui-calendar {{theme}}\" data-calendar-els=\"root\" onselectstart=\"return false;\">\n    {{#control}}\n    <div class=\"calendar-control\" data-calendar-els=\"control\" style=\"{{controlCSS}}\">\n        <a class=\"date-move-left\" data-calendar-move=\"left\" style=\"{{controlButtonCSS}}\">{{{left}}}</a>\n        <div class=\"date-display\" data-calendar-els=\"control-display\" style=\"{{controlCSS}}\"></div>\n        <a class=\"date-move-right\" data-calendar-move=\"right\" style=\"{{controlButtonCSS}}\">{{{right}}}</a>\n    </div>\n    {{/control}}\n    <div class=\"calendar-body\" data-calendar-els=\"body\"></div>\n</div>\n";
  },
  day: function day(columnKeys) {
    return "\n<table data-calendar-table=\"day\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n        {{#weekNames}}\n            <td class=\"calendar-col-{{col}}\" style=\"height: {{colHeadHeight}}\">\n            {{label}}\n            </td>\n        {{/weekNames}}\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfWeek}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfWeek}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-day {{addClass}}\" data-calendar-item-date=\"{{thisDate}}\">\n                    <span class=\"addon addon-header\"></span>\n                    {{thisDataLabel}}\n                    <span class=\"addon addon-footer\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
  },
  month: function month(columnKeys) {
    return "\n<table data-calendar-table=\"month\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n            <td class=\"calendar-col-0\" colspan=\"3\" style=\"height: {{colHeadHeight}}\">\n            {{colHeadLabel}}\n            </td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfRow}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfRow}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-month {{addClass}}\" data-calendar-item-month=\"{{thisMonth}}\">\n                    <span class=\"addon\"></span>\n                    {{thisMonthLabel}}\n                    <span class=\"lunar\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
  },
  year: function year(columnKeys) {
    return "\n<table data-calendar-table=\"year\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n            <td class=\"calendar-col-0\" colspan=\"4\" style=\"height: {{colHeadHeight}}\">\n            {{colHeadLabel}}\n            </td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfRow}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfRow}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-year {{addClass}}\" data-calendar-item-year=\"{{thisYear}}\">\n                    <span class=\"addon\"></span>\n                    {{thisYearLabel}}\n                    <span class=\"lunar\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
  }
};

var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  that = null;
};
var getFrame = function getFrame() {
  var data = _jqmin2.default.extend(true, {}, this.config, {
    controlCSS: {},
    controlButtonCSS: {}
  });

  data.controlButtonCSS["height"] = data.controlCSS["height"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);
  data.controlButtonCSS["line-height"] = data.controlCSS["line-height"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);
  data.controlButtonCSS["width"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);

  data.controlCSS = _AX6Util2.default.css(data.controlCSS);
  data.controlButtonCSS = _AX6Util2.default.css(data.controlButtonCSS);

  try {
    return _AX6Mustache2.default.render(tmpl.frame.call(this), data);
  } finally {
    data = null;
  }
};
var setDisplay = function setDisplay() {
  var _this = this;

  var myDate = _AX6Util2.default.date(this.config.displayDate),
      yy = "",
      mm = "",
      yy1 = void 0,
      yy2 = void 0;

  if (this.config.control) {
    if (this.config.mode == "day" || this.config.mode == "d") {
      yy = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
      mm = this.config.control.monthTmpl ? this.config.control.monthTmpl.replace('%s', this.config.lang.months[myDate.getMonth()]) : this.config.lang.months[myDate.getMonth()];

      this.$["control-display"].html(function () {
        if (_this.config.control.yearFirst) {
          return '<span data-calendar-display="year">' + yy + '</span>' + '<span data-calendar-display="month">' + mm + '</span>';
        } else {
          return '<span data-calendar-display="month">' + mm + '</span>' + '<span data-calendar-display="year">' + yy + '</span>';
        }
      }());
    } else if (this.config.mode == "month" || this.config.mode == "m") {
      yy = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
      this.$["control-display"].html('<span data-calendar-display="year">' + yy + '</span>');
    } else if (this.config.mode == "year" || this.config.mode == "y") {
      yy1 = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear() - 10) : myDate.getFullYear() - 10;
      yy2 = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', Number(myDate.getFullYear()) + 9) : Number(myDate.getFullYear()) + 9;
      this.$["control-display"].html(yy1 + ' ~ ' + yy2);
    }

    this.$["control-display"].off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-display]', function (e) {
      var target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-calendar-display")) {
          return true;
        }
      }),
          mode = void 0;
      if (target) {
        mode = target.getAttribute("data-calendar-display");
        this.changeMode(mode);
      }
      target = null;
      mode = null;
    }.bind(this));
  }

  myDate = null;
  yy = null;
  mm = null;
  yy1 = null;
  yy2 = null;
  return this;
};
var printDay = function printDay(nowDate) {
  var _this2 = this;

  var dotDate = _AX6Util2.default.date(nowDate),
      monthStratDate = new Date(dotDate.getFullYear(), dotDate.getMonth(), 1, 12),
      _today = this.config.displayDate,
      tableStartDate = function () {
    var day = monthStratDate.getDay();
    if (day == 0) day = 7;
    day -= _this2.config.startOfWeek;

    try {
      return _AX6Util2.default.date(monthStratDate, { add: { d: -day } });
    } finally {
      day = null;
    }
  }(),
      loopDate = void 0,
      thisMonth = dotDate.getMonth(),
      itemStyles = {},
      i = void 0,
      k = void 0,
      _k = void 0,
      frameWidth = this.$["body"].width(),
      frameHeight = Math.floor(frameWidth * (6 / 7)),
      // 1week = 7days, 1month = 6weeks
  data = void 0;

  if (this.config.dimensions.height) {
    frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
  }

  itemStyles['height'] = Math.floor(frameHeight / 6) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
  itemStyles['line-height'] = itemStyles['height'];
  itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

  data = {
    weekNames: [].concat(_AX6Info2.default.weekNames),
    list: []
  };

  if (this.config.startOfWeek) {
    data.weekNames = data.weekNames.concat(data.weekNames.slice(0, this.config.startOfWeek)).splice(this.config.startOfWeek);
  }

  data.weekNames.forEach(function (n) {
    n.colHeadHeight = _AX6Util2.default.cssNumber(_this2.config.dimensions.colHeadHeight);
  });

  loopDate = tableStartDate;
  i = 0;
  while (i < 6) {
    k = 0;

    var _loop = function _loop() {
      _k = (7 + (k - _this2.config.startOfWeek)) % 7;
      var thisDate = '' + _AX6Util2.default.date(loopDate, { "return": _this2.config.dateFormat }),
          _date = {
        'row': i,
        'col': k,
        isStartOfWeek: k == 0,
        thisDate: '' + thisDate,
        thisDataLabel: _this2.config.lang.dayTmpl.replace('%s', loopDate.getDate()),
        itemStyles: _AX6Util2.default.css(itemStyles),
        addClass: function () {
          var classNames = "";

          if (_this2.config.selectable) {
            if (_this2.selectableMap[thisDate]) {
              classNames += loopDate.getMonth() == thisMonth ? " live" : "";
            } else {
              classNames += " disable";
            }
          } else {
            if (loopDate.getMonth() == thisMonth) {
              if (thisDate == _AX6Util2.default.date(_today, { "return": "yyyyMMdd" })) {
                classNames += " focus";
              } else {
                classNames += " live";
              }

              if (loopDate.getDay() == 0) {
                classNames += " sunday";
              }
              if (loopDate.getDay() == 6) {
                classNames += " saturday";
              }
            }
          }

          return classNames;
        }() + ' ' + function () {
          return _this2.markerMap[thisDate] ? _this2.markerMap[thisDate].theme || _this2.config.defaultMarkerTheme : '';
        }() + ' ' + function () {
          return _this2.selectionMap[thisDate] ? "selected-day" : '';
        }()
      };
      data.list.push(_date);

      k++;
      loopDate = _AX6Util2.default.date(loopDate, { add: { d: 1 } });

      thisDate = null;
      _date = null;
    };

    while (k < 7) {
      _loop();
    }
    i++;
  }

  this.$["body"].html(_AX6Mustache2.default.render(tmpl.day.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-date]', function (e) {
    e = e || window.event;
    onclick.call(_this2, e, 'date');
    _AX6Util2.default.stopEvent(e);
  });

  this.printedDay = {
    start: tableStartDate, end: loopDate
  };

  onStateChanged.call(this, null, {
    self: this,
    action: "printDay",
    printedDay: this.printedDay
  });
  setDisplay.call(this);

  dotDate = null;
  monthStratDate = null;
  _today = null;
  tableStartDate = null;
  loopDate = null;
  thisMonth = null;
  itemStyles = null;
  i = null;
  k = null;
  frameWidth = null;
  frameHeight = null;
  data = null;
};
var printMonth = function printMonth(nowDate) {
  var _this3 = this;

  var dotDate = _AX6Util2.default.date(nowDate),
      nMonth = dotDate.getMonth(),
      itemStyles = {},
      i = void 0,
      k = void 0,
      m = void 0,
      tableStartMonth = void 0,
      frameWidth = this.$["body"].width(),
      frameHeight = Math.floor(frameWidth * (6 / 7)),
      data = void 0;

  if (this.config.dimensions.height) {
    frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
  }

  itemStyles['height'] = Math.floor(frameHeight / 4) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
  itemStyles['line-height'] = itemStyles['height'];
  itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

  data = {
    colHeadHeight: _AX6Util2.default.cssNumber(this.config.dimensions.colHeadHeight),
    colHeadLabel: this.config.lang.monthHeading,
    list: []
  };

  tableStartMonth = 0;
  m = 0;
  i = 0;
  while (i < 4) {
    k = 0;
    while (k < 3) {
      var _month = {
        row: i,
        col: k,
        isStartOfRow: k == 0,
        thisMonth: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(m + 1, 2) + '-' + _AX6Util2.default.setDigit(dotDate.getDate(), 2),
        thisMonthLabel: this.config.lang.months[m],
        itemStyles: _AX6Util2.default.css(itemStyles),
        addClass: function () {
          if (_this3.config.selectable) {
            return _this3.selectableMap[m] ? 'live' : 'disable';
          } else {
            return 'live';
          }
        }() + ' ' + function () {
          return m == nMonth ? "focus" : "";
        }() + ' ' + function () {
          return _this3.markerMap[m] ? _this3.markerMap[m].theme || _this3.config.defaultMarkerTheme : '';
        }()
      };
      data.list.push(_month);
      m++;
      k++;
      _month = null;
    }
    i++;
  }

  this.$["body"].html(_AX6Mustache2.default.render(tmpl.month.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-month]', function (e) {
    e = e || window.event;
    onclick.call(_this3, e, 'month');
    _AX6Util2.default.stopEvent(e);
  });

  this.printedDay = {
    start: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(tableStartMonth + 1, 2),
    end: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(m, 2)
  };

  onStateChanged.call(this, null, {
    self: this,
    action: "printMonth",
    printedDay: this.printedDay
  });
  setDisplay.call(this);

  dotDate = null;
  nMonth = null;
  itemStyles = null;
  i = null;
  k = null;
  m = null;
  tableStartMonth = null;
  frameWidth = null;
  frameHeight = null;
  data = null;
};
var printYear = function printYear(nowDate) {
  var _this4 = this;

  var dotDate = _AX6Util2.default.date(nowDate),
      nYear = dotDate.getFullYear(),
      itemStyles = {},
      i = void 0,
      k = void 0,
      y = void 0,
      tableStartYear = void 0,
      frameWidth = this.$["body"].width(),
      frameHeight = Math.floor(frameWidth * (6 / 7)),
      data = void 0;

  if (this.config.dimensions.height) {
    frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
  }

  itemStyles['height'] = Math.floor(frameHeight / 5) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
  itemStyles['line-height'] = itemStyles['height'];
  itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

  data = {
    colHeadHeight: _AX6Util2.default.cssNumber(this.config.dimensions.colHeadHeight),
    colHeadLabel: this.config.lang.yearHeading,
    list: []
  };

  tableStartYear = nYear - 10;
  y = nYear - 10;
  i = 0;
  while (i < 5) {
    k = 0;
    while (k < 4) {
      var _year = {
        row: i,
        col: k,
        isStartOfRow: k == 0,
        thisYear: y + '-' + _AX6Util2.default.setDigit(dotDate.getMonth() + 1, 2) + '-' + _AX6Util2.default.setDigit(dotDate.getDate(), 2),
        thisYearLabel: this.config.lang.yearTmpl.replace('%s', y),
        itemStyles: _AX6Util2.default.css(itemStyles),
        addClass: function () {
          if (_this4.config.selectable) {
            return _this4.selectableMap[y] ? 'live' : 'disable';
          } else {
            return 'live';
          }
        }() + ' ' + function () {
          return y == nYear ? "focus" : "";
        }() + ' ' + function () {
          return _this4.selectableMap[y] ? _this4.selectableMap[y].theme || _this4.config.defaultMarkerTheme : '';
        }()
      };
      data.list.push(_year);
      y++;
      k++;
      _year = null;
    }
    i++;
  }

  this.$["body"].html(_AX6Mustache2.default.render(tmpl.year.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-year]', function (e) {
    e = e || window.event;
    onclick.call(_this4, e, 'year');
    _AX6Util2.default.stopEvent(e);
  });

  this.printedDay = {
    start: tableStartYear, end: y - 1
  };

  onStateChanged.call(this, null, {
    self: this,
    action: "printYear",
    printedDay: this.printedDay
  });
  setDisplay.call(this);

  dotDate = null;
  nYear = null;
  itemStyles = null;
  i = null;
  k = null;
  y = null;
  tableStartYear = null;
  frameWidth = null;
  frameHeight = null;
  data = null;
};
var onclick = function onclick(e, mode, target, value) {
  var _this5 = this;

  var removed = void 0,
      dt = void 0,
      selectable = void 0;

  mode = mode || "date";
  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-calendar-item-" + mode)) {
      return true;
    }
  });
  if (target) {
    value = target.getAttribute("data-calendar-item-" + mode);

    dt = _AX6Util2.default.date(value, { "return": this.config.dateFormat });
    selectable = true;
    this.selectableCount = this.config.multipleSelect ? _AX6Util2.default.isNumber(this.config.multipleSelect) ? this.config.multipleSelect : 2 : 1;

    if (this.config.selectable) {
      if (!this.selectableMap[dt]) selectable = false;
    }

    if (mode == "date") {
      if (selectable) {

        if (this.selection.length >= this.selectableCount) {
          removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
          removed.forEach(function (d) {
            _this5.$["body"].find('[data-calendar-item-date="' + _AX6Util2.default.date(d, { "return": _this5.config.dateFormat }) + '"]').removeClass("selected-day");
          });
        }

        (0, _jqmin2.default)(target).addClass("selected-day");
        this.selection.push(value);

        if (this.onClick) {
          this.onClick.call({
            self: this, date: value, target: this.target, dateElement: target
          });
        }
      }
    } else if (mode == "month") {
      if (this.config.selectMode == "month") {
        if (selectable) {
          if (this.selection.length >= this.selectableCount) {
            removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
            removed.forEach(function (d) {
              _this5.$["body"].find('[data-calendar-item-month="' + _AX6Util2.default.date(d, { "return": 'yyyy-MM-dd' }) + '"]').removeClass("selected-month");
            });
          }

          (0, _jqmin2.default)(target).addClass("selected-month");
          this.selection.push(value);

          if (this.onClick) {
            this.onClick.call({
              self: this, date: value, target: this.target, dateElement: target
            });
          }
        }
      } else {
        this.changeMode("day", value);
      }
    } else if (mode == "year") {
      if (this.config.selectMode == "year") {
        if (selectable) {
          if (this.selection.length >= this.selectableCount) {
            removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
            removed.forEach(function (d) {
              _this5.$["body"].find('[data-calendar-item-year="' + _AX6Util2.default.date(d, { "return": 'yyyy-MM-dd' }) + '"]').removeClass("selected-year");
            });
          }

          (0, _jqmin2.default)(target).addClass("selected-year");
          this.selection.push(value);

          if (this.onClick) {
            this.onClick.call({
              self: this, date: value, target: this.target, dateElement: target
            });
          }
        }
      } else {
        this.changeMode("month", value);
      }
    }
  }

  mode = null;
  target = null;
  value = null;
  removed = null;
  dt = null;
  selectable = null;
};
var move = function move(e, target, value) {
  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-calendar-move")) {
      return true;
    }
  });
  if (target) {
    value = target.getAttribute("data-calendar-move");
    if (this.config.mode == "day" || this.config.mode == "d") {
      if (value == "left") {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { m: -1 } });
      } else {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { m: 1 } });
      }
      printDay.call(this, this.config.displayDate);
    } else if (this.config.mode == "month" || this.config.mode == "m") {
      if (value == "left") {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: -1 } });
      } else {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: 1 } });
      }
      printMonth.call(this, this.config.displayDate);
    } else if (this.config.mode == "year" || this.config.mode == "y") {
      if (value == "left") {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: -10 } });
      } else {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: 10 } });
      }
      printYear.call(this, this.config.displayDate);
    }
  }

  target = null;
  value = null;
};
var applyMarkerMap = function applyMarkerMap() {
  setTimeout(function () {
    if (this.config.mode === "day" || this.config.mode === "d") {
      for (var k in this.markerMap) {
        this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.markerMap[k].theme || this.config.defaultMarkerTheme);
      }
    }
  }.bind(this));
};
var applySelectionMap = function applySelectionMap() {
  setTimeout(function () {
    for (var k in this.selectionMap) {
      this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass("selected-day");
    }
  }.bind(this));
};
var applyPeriodMap = function applyPeriodMap() {
  setTimeout(function () {
    if (this.config.mode === "day" || this.config.mode === "d") {
      for (var k in this.periodMap) {
        if (this.periodMap[k].label) {
          this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").html(this.periodMap[k].label);
        }
        this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.periodMap[k].theme);
      }
    }
  }.bind(this));
};
var clearPeriodMap = function clearPeriodMap() {
  if (this.config.mode === "day" || this.config.mode === "d") {
    for (var k in this.periodMap) {
      this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").empty();
      this.$["body"].find('[data-calendar-item-date="' + k + '"]').removeClass(this.periodMap[k].theme);
    }
  }
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UICalendar = function (_AX6UICore) {
  _inherits(AX6UICalendar, _AX6UICore);

  /**
   * @constructor
   * @param {object} config
   * @param {string} [config.theme = 'default']
   * @param {!(object|string)} [config.target]
   * @param {number} [config.animateTime = 100]
   * @param {function} [config.onStateChanged]
   * @param {function} [config.onClick]
   * @param [config.content]
   * @example
   * ```js
   * var myCalendar = new AX6UICalendar();
   * ```
   */
  function AX6UICalendar(config) {
    _classCallCheck(this, AX6UICalendar);

    var _this6 = _possibleConstructorReturn(this, (AX6UICalendar.__proto__ || Object.getPrototypeOf(AX6UICalendar)).call(this));

    _this6.config = {
      clickEventName: "click",
      theme: 'default',
      startOfWeek: 0,
      mode: 'day', // day|month|year,
      dateFormat: 'yyyy-MM-dd',
      displayDate: new Date(),
      animateTime: 100,
      dimensions: {
        controlHeight: '40',
        controlButtonWidth: '40',
        colHeadHeight: '30',
        itemPadding: 2
      },
      lang: {
        yearHeading: "Choose the year",
        monthHeading: "Choose the month",
        yearTmpl: "%s",
        months: _AX6Info2.default.months || ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        dayTmpl: "%s"
      },
      multipleSelect: false,
      selectMode: 'day',
      defaultMarkerTheme: 'holiday',
      defaultPeriodTheme: 'period'
    };
    _jqmin2.default.extend(true, _this6.config, config);

    // 멤버 변수 초기화
    _this6.$target = null;
    _this6.selection = [];
    _this6.selectionMap = {};
    _this6.selectableMap = {};
    _this6.markerMap = {};
    _this6.printedDay = {
      start: "", end: ""
    };
    _this6.selectableCount = 1;

    _this6.init();
    return _this6;
  }

  /**
   * @method AX6UICalendar.init
   * @example
   * ```js
   * myCalendar.init();
   * ```
   */


  _createClass(AX6UICalendar, [{
    key: "init",
    value: function init() {
      var _this7 = this;

      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;

      if (!this.config.target) {
        console.log(_AX6Info2.default.getError("ax6calendar", "401", "setConfig"));
      }
      this.$target = (0, _jqmin2.default)(this.config.target);
      this.config.displayDate = _AX6Util2.default.date(this.config.displayDate);

      this.$target.html(getFrame.call(this));

      // 부속수집
      this.$ = {
        "root": this.$target.find('[data-calendar-els="root"]'),
        "control": this.$target.find('[data-calendar-els="control"]'),
        "control-display": this.$target.find('[data-calendar-els="control-display"]'),
        "body": this.$target.find('[data-calendar-els="body"]')
      };

      if (this.config.control) {
        this.$["root"].on(this.config.clickEventName, '[data-calendar-move]', function (e) {
          move.call(_this7, e || window.event);
        });
      }

      // collect selectableMap
      if (this.config.selection) {
        this.setSelection(this.config.selection, false);
      }
      // collect selectableMap
      if (this.config.selectable) {
        this.setSelectable(this.config.selectable, false);
      }
      // collect markerMap
      if (this.config.marker) {
        this.setMarker(this.config.marker, false);
      }

      setTimeout(function () {
        if (this.config.mode === "day" || this.config.mode === "d") {
          printDay.call(this, this.config.displayDate);
        } else if (this.config.mode === "month" || this.config.mode === "m") {
          printMonth.call(this, this.config.displayDate);
        } else if (this.config.mode === "year" || this.config.mode === "y") {
          printYear.call(this, this.config.displayDate);
        }
      }.bind(this));

      // init 호출 여부
      this.initOnce();
    }

    /**
     * @method AX6UICalendar.initOnce
     * @example
     * ```js
     * myCalendar.initOnce();
     * ```
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;
    }

    /**
     * Outputs to the screen in the output mode defined in the Calendar. If you pass an argument, you can change the output mode and output reference date.
     * 캘린더의 모드를 변경합니다.
     * @method AX6UICalendar.changeMode
     * @param {string} mode - day, d, month, m , year, y
     * @param {(Date|string)} [changeDate]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.changeMode("y");
     * myCalendar.changeMode("year");
     * myCalendar.changeMode("month");
     * myCalendar.changeMode("m");
     * myCalendar.changeMode("day");
     * myCalendar.changeMode("d");
     * ```
     */

  }, {
    key: "changeMode",
    value: function changeMode(mode, changeDate) {
      var _this8 = this;

      if (typeof changeDate != "undefined") this.config.displayDate = changeDate;
      if (mode) this.config.mode = mode;

      this.$["body"].removeClass("fadein").addClass("fadeout");

      setTimeout(function () {
        if (_this8.config.mode == "day" || _this8.config.mode == "d") {
          printDay.call(_this8, _this8.config.displayDate);
        } else if (_this8.config.mode == "month" || _this8.config.mode == "m") {
          printMonth.call(_this8, _this8.config.displayDate);
        } else if (_this8.config.mode == "year" || _this8.config.mode == "y") {
          printYear.call(_this8, _this8.config.displayDate);
        }
        _this8.$["body"].removeClass("fadeout").addClass("fadein");
      }, this.config.animateTime);

      return this;
    }

    /**
     * Changes to state a date is selected, which is included in the selection.
     * 캘린더에 해당일자를 선택된 상태로 설정합니다.
     * @method AX6UICalendar.setSelection
     * @param {Array} selection
     * @param {boolean} [isPrint]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setSelection([new Date()]);
     * ```
     */

  }, {
    key: "setSelection",
    value: function setSelection(selection, isPrint) {
      this.selectionMap = {};
      var result = {};
      var processor = {
        'arr': function arr(v, map, count) {
          var _this9 = this;

          map = {};
          if (!_AX6Util2.default.isArray(v)) return map;
          this.selection = v = v.splice(0, count);
          v.forEach(function (n) {
            if (_AX6Util2.default.isDate(n)) n = _AX6Util2.default.date(n, { 'return': _this9.config.dateFormat });
            map[n] = true;
          });
          return map;
        }
      };

      this.selectableCount = this.config.multipleSelect ? _AX6Util2.default.isNumber(this.config.multipleSelect) ? this.config.multipleSelect : 2 : 1;

      if (this.config.selection = selection) {
        if (_AX6Util2.default.isArray(selection)) {
          result = processor.arr.call(this, selection, {}, this.selectableCount);
        } else {
          return this;
        }
      }

      this.selectionMap = _jqmin2.default.extend({}, result);
      // 변경내용 적용하여 출력

      if (isPrint !== false) applySelectionMap.call(this);

      result = null;

      return this;
    }

    /**
     * 캘린더에서 선택된 일자를 반환합니다.
     * @method AX6UICalendar.getSelection
     * @return {Array}
     * @example
     * ```js
     * myCalendar.getSelection();
     * ```
     */

  }, {
    key: "getSelection",
    value: function getSelection() {
      return this.selection;
    }

    /**
     * Set the date / year / month that can be selected from the Calendar. selectable is, Array and Object({from: '', to: ''}) is made up of.
     * 캘린더에 해당일자를 선택할 수 있는 상태로 설정합니다.
     * @method AX6UICalendar.setSelectable
     * @param {Array} selectable
     * @param {boolean} [isPrint]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setSelectable(['2016-01-01', ...]);
     * myCalendar.setSelectable([new Date(), ...]);
     * myCalendar.setSelectable({ range: [{from: '2016-01-01', to: '2016-01-10'}] });
     * myCalendar.setSelectable({ range: [{from: new Date(), to: new Date()}] });
     * myCalendar.setSelectable({ '2016-01-01': true, '2016-01-02': true });
     * ```
     */

  }, {
    key: "setSelectable",
    value: function setSelectable(selectable, isPrint) {
      this.selectableMap = {};
      var key = void 0,
          result = {};
      var processor = {
        'arr': function arr(v, map) {
          var _this10 = this;

          map = {};
          if (!_AX6Util2.default.isArray(v)) return map;
          v.forEach(function (n) {
            if (_AX6Util2.default.isDate(n)) n = _AX6Util2.default.date(n, { 'return': _this10.config.dateFormat });
            map[n] = true;
          });
          return map;
        },
        'obj': function obj(v, map) {
          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (v.range) return map;
          for (var k in v) {
            map[k] = v[k];
          }
          return map;
        },
        'range': function range(v, map) {
          var _this11 = this;

          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (!v.range) return map;

          v.range.forEach(function (n) {
            if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
              for (var d = _AX6Util2.default.date(n.from); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                map[_AX6Util2.default.date(d, { "return": _this11.config.dateFormat })] = true;
              }
            } else {
              for (var i = n.from; i <= n.to; i++) {
                map[i] = true;
              }
            }
          });

          return map;
        }
      };

      if (this.config.selectable = selectable) {
        if (_AX6Util2.default.isArray(selectable)) {
          result = processor.arr.call(this, selectable);
        } else {
          for (key in processor) {
            if (selectable[key]) {
              result = processor[key].call(this, selectable);
              break;
            }
          }
          if (Object.keys(result).length === 0) {
            result = processor.obj.call(this, selectable);
          }
        }
      }

      this.selectableMap = result;
      // 변경내용 적용하여 출력
      if (isPrint !== false) this.changeMode();

      return this;
    }

    /**
     * 캘린더에 휴일을 표시합니다.
     * @method AX6UICalendar.marker
     * @param {Object} marker
     * @param {boolean} [isApply]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setMarker({
       * '2016-02-07': {theme: 'holiday', label: '설날'},
       * '2016-02-08': {theme: 'holiday', label: '설날'},
       * '2016-02-09': {theme: 'holiday', label: '설날'},
       * '2016-02-10': {theme: 'holiday', label: '대체휴일'}
       *  });
     * ```
     */

  }, {
    key: "setMarker",
    value: function setMarker(marker, isApply) {
      this.markerMap = {};
      var key = void 0,
          result = {};
      var processor = {
        'obj': function obj(v, map) {
          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (v.range) return map;
          for (var k in v) {
            map[k] = v[k];
          }

          v = null;
          return map;
        },
        'range': function range(v, map) {
          var _this12 = this;

          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (!v.range) return map;

          v.range.forEach(function (n) {
            if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
              for (var d = _AX6Util2.default.date(n.from); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                map[_AX6Util2.default.date(d, { "return": _this12.config.dateFormat })] = { theme: n.theme, label: n.label };
              }
            } else {
              for (var i = n.from; i <= n.to; i++) {
                map[i] = { theme: n.theme, label: n.label };
              }
            }
          });

          v = null;
          return map;
        }
      };

      if (this.config.marker = marker) {
        for (key in processor) {
          if (marker[key]) {
            result = processor[key].call(this, marker);
            break;
          }
        }
        if (Object.keys(result).length === 0) {
          result = processor.obj.call(this, marker);
        }
      }

      this.markerMap = result;
      // 변경내용 적용하여 출력
      if (isApply !== false) applyMarkerMap.call(this);
      return this;
    }

    /**
     * @method AX6UICalendar.setPeriod
     * @param {Object} period
     * @param {boolean} [isApply]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setPeriod({
       *  range: [
       *      {from: '2016-07-05', to: '2016-07-09', fromLabel: '시작', toLabel: '종료'},
       *      {from: '2016-07-11', to: '2016-07-15', fromLabel: '시작', toLabel: '종료'}
       *  ]
       * });
     * ```
     */

  }, {
    key: "setPeriod",
    value: function setPeriod(period, isApply) {
      var key = void 0,
          result = {};
      var processor = {
        'range': function range(v, map) {
          var _this13 = this;

          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (!v.range) return map;

          v.range.forEach(function (n) {
            if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
              for (var d = new Date(_AX6Util2.default.date(n.from)); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                if (d.getTime() == _AX6Util2.default.date(n.from).getTime()) {
                  map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = {
                    theme: n.theme || _this13.config.defaultPeriodTheme,
                    label: n.fromLabel
                  };
                } else if (d.getTime() == _AX6Util2.default.date(n.to).getTime()) {
                  map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = {
                    theme: n.theme || _this13.config.defaultPeriodTheme,
                    label: n.toLabel
                  };
                } else {
                  map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = { theme: n.theme || _this13.config.defaultPeriodTheme };
                }
              }
            }
          });

          v = null;
          return map;
        }
      };

      // 변경내용 적용하여 출력
      if (isApply !== false) {
        clearPeriodMap.call(this);
      }

      if (this.config.period = period) {
        result = processor.range.call(this, period);
      }

      this.periodMap = result;

      // 변경내용 적용하여 출력
      if (isApply !== false) {
        applyPeriodMap.call(this);
      }
      return this;
    }
  }]);

  return AX6UICalendar;
}(_AX6UICore3.default);

exports.default = AX6UICalendar;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9qcW1pbi9qcXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSUNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2Nzcz9iZDQ3Iiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlDYWxlbmRhci9zdHlsZS5zY3NzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlDYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsInRvZGF5IiwiRGF0ZSIsIm15Q2FsZW5kYXJfMCIsImNvbnRyb2wiLCJsZWZ0IiwieWVhclRtcGwiLCJtb250aFRtcGwiLCJyaWdodCIsInllYXJGaXJzdCIsImRpbWVuc2lvbnMiLCJpdGVtUGFkZGluZyIsImhlaWdodCIsInRhcmdldCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwbGF5RGF0ZSIsInN0YXJ0T2ZXZWVrIiwibW9kZSIsInNlbGVjdE1vZGUiLCJvbkNsaWNrIiwiY29uc29sZSIsImxvZyIsImdldFNlbGVjdGlvbiIsIm9uU3RhdGVDaGFuZ2VkIiwibXVsdGlwbGVTZWxlY3QiLCJteUNhbGVuZGFyXzEiLCJzZXRTZWxlY3Rpb24iLCJkYXRlIiwiZCIsIm15Q2FsZW5kYXJfMiIsIm1hcmtlciIsIm15Q2FsZW5kYXJfMyIsInNlbGVjdGFibGUiLCJteUNhbGVuZGFyXzQiLCJkYXRlcyIsInNlbGYiLCJsZW5ndGgiLCJtaW5EYXRlIiwiTWF0aCIsIm1pbiIsImdldFRpbWUiLCJtYXhEYXRlIiwibWF4Iiwic2V0UGVyaW9kIiwicmFuZ2UiLCJmcm9tIiwidG8iLCJmcm9tTGFiZWwiLCJ0b0xhYmVsIiwibXlDYWxlbmRhcl81IiwiY2hhbmdlTW9kZSIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJVSV9JTlNUQU5DRV9JRCIsIkFYNlVJQ29yZSIsImluaXRpYWxpemVkIiwiaW5zdGFuY2VJZCIsImdldEluc3RhbmNlSWQiLCJjb25maWciLCJleHRlbmQiLCJpbml0IiwiaW5pdE9uY2UiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidHlwZSIsInZhbHVlIiwiY2hyIiwidG9rZW4iLCJvcGVuU2VjdGlvbiIsImVvcyIsInBvcyIsInNjYW5VbnRpbCIsImkiLCJ2YWx1ZUxlbmd0aCIsImNoYXJBdCIsInB1c2giLCJzY2FuIiwibmVzdFRva2VucyIsInNxdWFzaFRva2VucyIsInNxdWFzaGVkVG9rZW5zIiwibGFzdFRva2VuIiwibnVtVG9rZW5zIiwibmVzdGVkVG9rZW5zIiwiY29sbGVjdG9yIiwic2VjdGlvbiIsInRhaWwiLCJtYXRjaCIsImluZGV4Iiwic3Vic3RyaW5nIiwic2VhcmNoIiwiQ29udGV4dCIsInZpZXciLCJwYXJlbnRDb250ZXh0IiwiY2FjaGUiLCJyZXR1cm5zIiwiayIsInBhcmVudCIsImxvb2t1cCIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJ0bXBsIiwiZnJhbWUiLCJjb2x1bW5LZXlzIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwib3B0cyIsInRoYXQiLCJnZXRGcmFtZSIsImRhdGEiLCJjb250cm9sQ1NTIiwiY29udHJvbEJ1dHRvbkNTUyIsImNzc051bWJlciIsImNvbnRyb2xIZWlnaHQiLCJjc3MiLCJzZXREaXNwbGF5IiwibXlEYXRlIiwieXkiLCJtbSIsInl5MSIsInl5MiIsImdldEZ1bGxZZWFyIiwibGFuZyIsIm1vbnRocyIsImdldE1vbnRoIiwiJCIsIk51bWJlciIsImNsaWNrRXZlbnROYW1lIiwib24iLCJlIiwiZmluZFBhcmVudE5vZGUiLCJnZXRBdHRyaWJ1dGUiLCJiaW5kIiwicHJpbnREYXkiLCJub3dEYXRlIiwiZG90RGF0ZSIsIm1vbnRoU3RyYXREYXRlIiwiX3RvZGF5IiwidGFibGVTdGFydERhdGUiLCJnZXREYXkiLCJhZGQiLCJsb29wRGF0ZSIsInRoaXNNb250aCIsIml0ZW1TdHlsZXMiLCJfayIsImZyYW1lV2lkdGgiLCJ3aWR0aCIsImZyYW1lSGVpZ2h0IiwiZmxvb3IiLCJudW1iZXIiLCJjb2xIZWFkSGVpZ2h0Iiwid2Vla05hbWVzIiwiY29uY2F0IiwibGlzdCIsInNwbGljZSIsImZvckVhY2giLCJuIiwidGhpc0RhdGUiLCJkYXRlRm9ybWF0IiwiX2RhdGUiLCJpc1N0YXJ0T2ZXZWVrIiwidGhpc0RhdGFMYWJlbCIsImRheVRtcGwiLCJnZXREYXRlIiwiYWRkQ2xhc3MiLCJjbGFzc05hbWVzIiwic2VsZWN0YWJsZU1hcCIsIm1hcmtlck1hcCIsInRoZW1lIiwiZGVmYXVsdE1hcmtlclRoZW1lIiwic2VsZWN0aW9uTWFwIiwid2luZG93IiwiZXZlbnQiLCJvbmNsaWNrIiwic3RvcEV2ZW50IiwicHJpbnRlZERheSIsImVuZCIsImFjdGlvbiIsInByaW50TW9udGgiLCJuTW9udGgiLCJtIiwidGFibGVTdGFydE1vbnRoIiwiY29sSGVhZExhYmVsIiwibW9udGhIZWFkaW5nIiwiX21vbnRoIiwicm93IiwiY29sIiwiaXNTdGFydE9mUm93Iiwic2V0RGlnaXQiLCJ0aGlzTW9udGhMYWJlbCIsInByaW50WWVhciIsIm5ZZWFyIiwieSIsInRhYmxlU3RhcnRZZWFyIiwieWVhckhlYWRpbmciLCJfeWVhciIsInRoaXNZZWFyIiwidGhpc1llYXJMYWJlbCIsInJlbW92ZWQiLCJkdCIsInNlbGVjdGFibGVDb3VudCIsImlzTnVtYmVyIiwic2VsZWN0aW9uIiwiZmluZCIsInJlbW92ZUNsYXNzIiwiZGF0ZUVsZW1lbnQiLCJtb3ZlIiwiYXBwbHlNYXJrZXJNYXAiLCJzZXRUaW1lb3V0IiwiYXBwbHlTZWxlY3Rpb25NYXAiLCJhcHBseVBlcmlvZE1hcCIsInBlcmlvZE1hcCIsImxhYmVsIiwiY2xlYXJQZXJpb2RNYXAiLCJlbXB0eSIsIkFYNlVJQ2FsZW5kYXIiLCJhbmltYXRlVGltZSIsImNvbnRyb2xCdXR0b25XaWR0aCIsImRlZmF1bHRQZXJpb2RUaGVtZSIsIiR0YXJnZXQiLCJnZXRFcnJvciIsInNldFNlbGVjdGFibGUiLCJzZXRNYXJrZXIiLCJjaGFuZ2VEYXRlIiwiaXNQcmludCIsInByb2Nlc3NvciIsInYiLCJtYXAiLCJjb3VudCIsImlzRGF0ZSIsImFyciIsImtleSIsImlzRGF0ZUZvcm1hdCIsInNldERhdGUiLCJrZXlzIiwiaXNBcHBseSIsInBlcmlvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0EsSUFBSUEsaTNCQUFKO0FBU0EsSUFBSUMsS0FBSztBQUNQQyxhQUFXLG1CQUFVQyxLQUFWLEVBQWlCO0FBQzFCLFFBQUlDLFFBQVEsSUFBSUMsSUFBSixFQUFaOztBQUVBLFFBQUlDLGVBQWUsNEJBQWE7QUFDOUJDLGVBQVM7QUFDUEMsY0FBTSxtREFEQztBQUVQQyxrQkFBVSxJQUZIO0FBR1BDLG1CQUFXLElBSEo7QUFJUEMsZUFBTyxvREFKQTtBQUtQQyxtQkFBVztBQUxKLE9BRHFCO0FBUTlCQyxrQkFBWTtBQUNWQyxxQkFBYSxDQURIO0FBRVZDLGdCQUFRO0FBRkUsT0FSa0I7QUFZOUJDLGNBQVFDLFNBQVNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBWnNCO0FBYTlCQyxtQkFBYyxJQUFJZCxJQUFKLEVBYmdCO0FBYzlCZSxtQkFBYSxDQWRpQjtBQWU5QkMsWUFBTSxLQWZ3QjtBQWdCOUJDLGtCQUFZLEtBaEJrQjtBQWlCOUJDLGVBQVMsbUJBQVk7QUFDbkJDLGdCQUFRQyxHQUFSLENBQVluQixhQUFhb0IsWUFBYixFQUFaO0FBQ0QsT0FuQjZCO0FBb0I5QkMsc0JBQWdCLDBCQUFZO0FBQzFCSCxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDRCxPQXRCNkI7QUF1QjlCRyxzQkFBZ0I7QUF2QmMsS0FBYixDQUFuQjs7QUEwQkE7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RUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxZQUFZOztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUYsb0JBQW9COztBQUVwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLFNBQVM7QUFDbEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLFlBQVk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFlBQVk7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxRQUFRLE1BQU07QUFDOUMsMEJBQTBCLFdBQVcsU0FBUztBQUM5QyxvQ0FBb0MsVUFBVSxTQUFTO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLFFBQVEsR0FBRztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOzs7O0FBSUE7O0FBRUE7O0FBRUE7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUEsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakIsMEJBQTBCLHdCQUF3Qjs7QUFFbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsMENBQTBDO0FBQzFDLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLGFBQWE7QUFDcEMsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsU0FBUztBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7QUFDRDs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGOztBQUVBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLE9BQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxPQUFPO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0JBQWdCO0FBQ2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXOztBQUVYOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDs7QUFFQTtBQUNBOztBQUVBLGNBQWMsc0JBQXNCO0FBQ3BDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrREFBK0Q7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLGNBQWM7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUNBQXVDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1REFBdUQ7QUFDOUU7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOzs7QUFHRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsZ0JBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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ZUFBZTtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtEQUErRDtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsT0FBTzs7QUFFZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUEsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7OztBQUtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7QUFLRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBLGlDQUFpQztBQUNqQztBQUNBOztBQUVBLElBQUk7QUFDSjs7QUFFQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFNBQVM7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7O0FBS0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxLQUFLO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7O0FBS0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYixLQUFLO0FBQ0w7O0FBRUEsV0FBVztBQUNYLEdBQUc7QUFDSDtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EscURBQXFEO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxjQUFjLHNEQUFzRDtBQUNwRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBLGNBQWMsbUNBQW1DO0FBQ2pELGVBQWUsNkRBQTZEO0FBQzVFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUFBO0FBQ0Y7Ozs7O0FBS0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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IjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFUgZnJvbSBcIi4uLy4uL3NyYy9BWDZVdGlsXCI7XG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSUNhbGVuZGFyXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlDYWxlbmRhci9zdHlsZS5zY3NzXCI7XG5cblxubGV0IGh0bWwgPSBgXG48ZGl2IGlkPVwiY2FsZW5kYXItdGFyZ2V0LTBcIiBzdHlsZT1cIndpZHRoOjI3MHB4O3BhZGRpbmc6IDEwcHg7Ym9yZGVyLXJhZGl1czogNXB4O2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OiAyMHB4O1wiIGNsYXNzPVwiY2FyZFwiPjwvZGl2PlxuPGRpdiBpZD1cImNhbGVuZGFyLXRhcmdldC0xXCIgc3R5bGU9XCJ3aWR0aDoyNzBweDtwYWRkaW5nOiAxMHB4O2JvcmRlci1yYWRpdXM6IDVweDtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDogMjBweDtcIiBjbGFzcz1cImNhcmRcIj48L2Rpdj5cbjxkaXYgc3R5bGU9XCJjbGVhcjogYm90aDtcIj48L2Rpdj5cbjxkaXYgaWQ9XCJjYWxlbmRhci10YXJnZXQtMlwiIHN0eWxlPVwid2lkdGg6MjcwcHg7cGFkZGluZzogMTBweDtib3JkZXItcmFkaXVzOiA1cHg7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6IDIwcHg7XCIgY2xhc3M9XCJjYXJkXCI+PC9kaXY+XG48ZGl2IGlkPVwiY2FsZW5kYXItdGFyZ2V0LTNcIiBzdHlsZT1cIndpZHRoOjI3MHB4O3BhZGRpbmc6IDEwcHg7Ym9yZGVyLXJhZGl1czogNXB4O2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OiAyMHB4O1wiIGNsYXNzPVwiY2FyZFwiPjwvZGl2PlxuPGRpdiBpZD1cImNhbGVuZGFyLXRhcmdldC00XCIgc3R5bGU9XCJ3aWR0aDoyNzBweDtwYWRkaW5nOiAxMHB4O2JvcmRlci1yYWRpdXM6IDVweDtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDogMjBweDtcIiBjbGFzcz1cImNhcmRcIj48L2Rpdj5cbjxkaXYgaWQ9XCJjYWxlbmRhci10YXJnZXQtNVwiIHN0eWxlPVwid2lkdGg6MjcwcHg7cGFkZGluZzogMTBweDtib3JkZXItcmFkaXVzOiA1cHg7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6IDIwcHg7XCIgY2xhc3M9XCJjYXJkXCI+PC9kaXY+XG5gO1xubGV0IGZuID0ge1xuICBtb2R1bGVSdW46IGZ1bmN0aW9uICgkYm9keSkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBsZXQgbXlDYWxlbmRhcl8wID0gbmV3IENhbGVuZGFyKHtcbiAgICAgIGNvbnRyb2w6IHtcbiAgICAgICAgbGVmdDogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPicsXG4gICAgICAgIHllYXJUbXBsOiAnJXMnLFxuICAgICAgICBtb250aFRtcGw6ICclcycsXG4gICAgICAgIHJpZ2h0OiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9pPicsXG4gICAgICAgIHllYXJGaXJzdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgaXRlbVBhZGRpbmc6IDEsXG4gICAgICAgIGhlaWdodDogMjUwXG4gICAgICB9LFxuICAgICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGVuZGFyLXRhcmdldC0wXCIpLFxuICAgICAgZGlzcGxheURhdGU6IChuZXcgRGF0ZSgpKSxcbiAgICAgIHN0YXJ0T2ZXZWVrOiAxLFxuICAgICAgbW9kZTogXCJkYXlcIixcbiAgICAgIHNlbGVjdE1vZGU6IFwiZGF5XCIsXG4gICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG15Q2FsZW5kYXJfMC5nZXRTZWxlY3Rpb24oKSk7XG4gICAgICB9LFxuICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICB9LFxuICAgICAgbXVsdGlwbGVTZWxlY3Q6IDJcbiAgICB9KTtcblxuICAgIC8vIHNldFNlbGVjdGlvblxuICAgIGxldCBteUNhbGVuZGFyXzEgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgY29udHJvbDoge1xuICAgICAgICBsZWZ0OiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+JyxcbiAgICAgICAgeWVhclRtcGw6ICclcycsXG4gICAgICAgIG1vbnRoVG1wbDogJyVzJyxcbiAgICAgICAgcmlnaHQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+JyxcbiAgICAgICAgeWVhckZpcnN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICBpdGVtUGFkZGluZzogMSxcbiAgICAgICAgaGVpZ2h0OiAyNTBcbiAgICAgIH0sXG4gICAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsZW5kYXItdGFyZ2V0LTFcIiksXG4gICAgICBkaXNwbGF5RGF0ZTogdG9kYXksXG4gICAgICBzdGFydE9mV2VlazogMCxcbiAgICAgIG1vZGU6IFwiZGF5XCIsXG4gICAgICBzZWxlY3RNb2RlOiBcImRheVwiLFxuICAgICAgbXVsdGlwbGVTZWxlY3Q6IDJcbiAgICB9KTtcblxuICAgIG15Q2FsZW5kYXJfMS5zZXRTZWxlY3Rpb24oW1xuICAgICAgVS5kYXRlKHRvZGF5LCB7J2FkZCc6IHtkOiAtMn19KSxcbiAgICAgIFUuZGF0ZSh0b2RheSwgeydhZGQnOiB7ZDogLTN9fSlcbiAgICBdKTtcblxuICAgIGNvbnNvbGUubG9nKG15Q2FsZW5kYXJfMS5nZXRTZWxlY3Rpb24oKSk7XG5cblxuICAgIGxldCBteUNhbGVuZGFyXzIgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGVuZGFyLXRhcmdldC0yXCIpLFxuICAgICAgbWFya2VyOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgbWFya2VyID0ge307XG4gICAgICAgIG1hcmtlcltVLmRhdGUodG9kYXksIHsncmV0dXJuJzogJ3l5eXktTU0tZGQnLCAnYWRkJzoge2Q6IC0xfX0pXSA9IHRydWU7XG4gICAgICAgIG1hcmtlcltVLmRhdGUodG9kYXksIHsncmV0dXJuJzogJ3l5eXktTU0tZGQnLCAnYWRkJzoge2Q6IDB9fSldID0gdHJ1ZTtcbiAgICAgICAgbWFya2VyW1UuZGF0ZSh0b2RheSwgeydyZXR1cm4nOiAneXl5eS1NTS1kZCcsICdhZGQnOiB7ZDogMX19KV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgfSkoKVxuICAgIH0pO1xuXG4gICAgLy8gU2VsZWN0YWJsZVxuICAgIGxldCBteUNhbGVuZGFyXzMgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGVuZGFyLXRhcmdldC0zXCIpLFxuICAgICAgc2VsZWN0YWJsZTogW1xuICAgICAgICBVLmRhdGUodG9kYXksIHsncmV0dXJuJzogJ3l5eXktTU0tZGQnLCAnYWRkJzoge2Q6IC0xfX0pLFxuICAgICAgICBVLmRhdGUodG9kYXksIHsncmV0dXJuJzogJ3l5eXktTU0tZGQnLCAnYWRkJzoge2Q6IDB9fSksXG4gICAgICAgIFUuZGF0ZSh0b2RheSwgeydyZXR1cm4nOiAneXl5eS1NTS1kZCcsICdhZGQnOiB7ZDogMX19KVxuICAgICAgXSxcbiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcylcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFBlcmlvZFxuICAgIGxldCBteUNhbGVuZGFyXzQgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgY29udHJvbDoge1xuICAgICAgICBsZWZ0OiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+JyxcbiAgICAgICAgeWVhclRtcGw6ICclcycsXG4gICAgICAgIG1vbnRoVG1wbDogJyVzJyxcbiAgICAgICAgcmlnaHQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+JyxcbiAgICAgICAgeWVhckZpcnN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGVuZGFyLXRhcmdldC00XCIpLFxuICAgICAgbXVsdGlwbGVTZWxlY3Q6IDIsXG4gICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRlcyA9IHRoaXMuc2VsZi5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgaWYgKGRhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBsZXQgbWluRGF0ZSA9IG5ldyBEYXRlKE1hdGgubWluKFUuZGF0ZShkYXRlc1swXSkuZ2V0VGltZSgpLCBVLmRhdGUoZGF0ZXNbMV0pLmdldFRpbWUoKSkpO1xuICAgICAgICAgIGxldCBtYXhEYXRlID0gbmV3IERhdGUoTWF0aC5tYXgoVS5kYXRlKGRhdGVzWzBdKS5nZXRUaW1lKCksIFUuZGF0ZShkYXRlc1sxXSkuZ2V0VGltZSgpKSk7XG5cbiAgICAgICAgICB0aGlzLnNlbGYuc2V0UGVyaW9kKHtcbiAgICAgICAgICAgIHJhbmdlOiBbXG4gICAgICAgICAgICAgIHtmcm9tOiBtaW5EYXRlLCB0bzogbWF4RGF0ZSwgZnJvbUxhYmVsOiAnUycsIHRvTGFiZWw6ICdFJ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIGNoYW5nZU1vZGVcbiAgICBsZXQgbXlDYWxlbmRhcl81ID0gbmV3IENhbGVuZGFyKHtcbiAgICAgIGNvbnRyb2w6IHtcbiAgICAgICAgbGVmdDogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPicsXG4gICAgICAgIHllYXJUbXBsOiAnJXMnLFxuICAgICAgICBtb250aFRtcGw6ICclcycsXG4gICAgICAgIHJpZ2h0OiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9pPicsXG4gICAgICAgIHllYXJGaXJzdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgaXRlbVBhZGRpbmc6IDEsXG4gICAgICAgIGhlaWdodDogMjUwXG4gICAgICB9LFxuICAgICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGVuZGFyLXRhcmdldC01XCIpLFxuICAgICAgZGlzcGxheURhdGU6IChuZXcgRGF0ZSgpKSxcbiAgICAgIHN0YXJ0T2ZXZWVrOiAxLFxuICAgICAgbW9kZTogXCJkYXlcIixcbiAgICAgIHNlbGVjdE1vZGU6IFwiZGF5XCIsXG4gICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG15Q2FsZW5kYXJfMC5nZXRTZWxlY3Rpb24oKSk7XG4gICAgICB9LFxuICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICB9LFxuICAgICAgbXVsdGlwbGVTZWxlY3Q6IDJcbiAgICB9KTtcbiAgICBteUNhbGVuZGFyXzUuY2hhbmdlTW9kZShcInlcIik7XG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jYWxlbmRhci5qcyIsIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2My4yLjIgLWFqYXgsLWFqYXgvanNvbnAsLWFqYXgvbG9hZCwtYWpheC9wYXJzZVhNTCwtYWpheC9zY3JpcHQsLWFqYXgvdmFyL2xvY2F0aW9uLC1hamF4L3Zhci9ub25jZSwtYWpheC92YXIvcnF1ZXJ5LC1hamF4L3hociwtbWFuaXB1bGF0aW9uL19ldmFsVXJsLC1ldmVudC9hamF4LC1hdHRyaWJ1dGVzL3Byb3AsLWF0dHJpYnV0ZXMvc3VwcG9ydCwtZGVwcmVjYXRlZCwtZWZmZWN0cywtZWZmZWN0cy9Ud2VlbiwtZWZmZWN0cy9hbmltYXRlZFNlbGVjdG9yLC13cmFwLC1kZWZlcnJlZCwtZGVmZXJyZWQvZXhjZXB0aW9uSG9vaywtcXVldWUsLXF1ZXVlL2RlbGF5LC1jb3JlL3JlYWR5LC1ldmVudC9mb2N1c2luLC1jc3Mvc2hvd0hpZGUsLWNzcy9oaWRkZW5WaXNpYmxlU2VsZWN0b3JzXG4gKiBodHRwczovL2pxdWVyeS5jb20vXG4gKlxuICogSW5jbHVkZXMgU2l6emxlLmpzXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNy0wNy0yMVQwNTo1NVpcbiAqL1xuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlmICggdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBGb3IgQ29tbW9uSlMgYW5kIENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHdoZXJlIGEgcHJvcGVyIGB3aW5kb3dgXG5cdFx0Ly8gaXMgcHJlc2VudCwgZXhlY3V0ZSB0aGUgZmFjdG9yeSBhbmQgZ2V0IGpRdWVyeS5cblx0XHQvLyBGb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IGhhdmUgYSBgd2luZG93YCB3aXRoIGEgYGRvY3VtZW50YFxuXHRcdC8vIChzdWNoIGFzIE5vZGUuanMpLCBleHBvc2UgYSBmYWN0b3J5IGFzIG1vZHVsZS5leHBvcnRzLlxuXHRcdC8vIFRoaXMgYWNjZW50dWF0ZXMgdGhlIG5lZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiBhIHJlYWwgYHdpbmRvd2AuXG5cdFx0Ly8gZS5nLiB2YXIgalF1ZXJ5ID0gcmVxdWlyZShcImpxdWVyeVwiKSh3aW5kb3cpO1xuXHRcdC8vIFNlZSB0aWNrZXQgIzE0NTQ5IGZvciBtb3JlIGluZm8uXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuZG9jdW1lbnQgP1xuXHRcdFx0ZmFjdG9yeSggZ2xvYmFsLCB0cnVlICkgOlxuXHRcdFx0ZnVuY3Rpb24oIHcgKSB7XG5cdFx0XHRcdGlmICggIXcuZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImpRdWVyeSByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWN0b3J5KCB3ICk7XG5cdFx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGZhY3RvcnkoIGdsb2JhbCApO1xuXHR9XG5cbi8vIFBhc3MgdGhpcyBpZiB3aW5kb3cgaXMgbm90IGRlZmluZWQgeWV0XG59ICkoIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiggd2luZG93LCBub0dsb2JhbCApIHtcblxuLy8gRWRnZSA8PSAxMiAtIDEzKywgRmlyZWZveCA8PTE4IC0gNDUrLCBJRSAxMCAtIDExLCBTYWZhcmkgNS4xIC0gOSssIGlPUyA2IC0gOS4xXG4vLyB0aHJvdyBleGNlcHRpb25zIHdoZW4gbm9uLXN0cmljdCBjb2RlIChlLmcuLCBBU1AuTkVUIDQuNSkgYWNjZXNzZXMgc3RyaWN0IG1vZGVcbi8vIGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyICh0cmFjLTEzMzM1KS4gQnV0IGFzIG9mIGpRdWVyeSAzLjAgKDIwMTYpLCBzdHJpY3QgbW9kZSBzaG91bGQgYmUgY29tbW9uXG4vLyBlbm91Z2ggdGhhdCBhbGwgc3VjaCBhdHRlbXB0cyBhcmUgZ3VhcmRlZCBpbiBhIHRyeSBibG9jay5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyID0gW107XG5cbnZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG52YXIgc2xpY2UgPSBhcnIuc2xpY2U7XG5cbnZhciBjb25jYXQgPSBhcnIuY29uY2F0O1xuXG52YXIgcHVzaCA9IGFyci5wdXNoO1xuXG52YXIgaW5kZXhPZiA9IGFyci5pbmRleE9mO1xuXG52YXIgY2xhc3MydHlwZSA9IHt9O1xuXG52YXIgdG9TdHJpbmcgPSBjbGFzczJ0eXBlLnRvU3RyaW5nO1xuXG52YXIgaGFzT3duID0gY2xhc3MydHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGZuVG9TdHJpbmcgPSBoYXNPd24udG9TdHJpbmc7XG5cbnZhciBPYmplY3RGdW5jdGlvblN0cmluZyA9IGZuVG9TdHJpbmcuY2FsbCggT2JqZWN0ICk7XG5cbnZhciBzdXBwb3J0ID0ge307XG5cbnZhciBpc1dpbmRvdyA9IGZ1bmN0aW9uIGlzV2luZG93KCBvYmogKSB7XG5cdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqLndpbmRvdztcblx0fTtcblxuXG5cblxuXHRmdW5jdGlvbiBET01FdmFsKCBjb2RlLCBkb2MgKSB7XG5cdFx0ZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG5cdFx0dmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCBcInNjcmlwdFwiICk7XG5cblx0XHRzY3JpcHQudGV4dCA9IGNvZGU7XG5cdFx0ZG9jLmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHR9XG4vKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuXG5cbnZhclxuXHR2ZXJzaW9uID0gXCIzLjIuMiAtYWpheCwtYWpheC9qc29ucCwtYWpheC9sb2FkLC1hamF4L3BhcnNlWE1MLC1hamF4L3NjcmlwdCwtYWpheC92YXIvbG9jYXRpb24sLWFqYXgvdmFyL25vbmNlLC1hamF4L3Zhci9ycXVlcnksLWFqYXgveGhyLC1tYW5pcHVsYXRpb24vX2V2YWxVcmwsLWV2ZW50L2FqYXgsLWF0dHJpYnV0ZXMvcHJvcCwtYXR0cmlidXRlcy9zdXBwb3J0LC1kZXByZWNhdGVkLC1lZmZlY3RzLC1lZmZlY3RzL1R3ZWVuLC1lZmZlY3RzL2FuaW1hdGVkU2VsZWN0b3IsLXdyYXAsLWRlZmVycmVkLC1kZWZlcnJlZC9leGNlcHRpb25Ib29rLC1xdWV1ZSwtcXVldWUvZGVsYXksLWNvcmUvcmVhZHksLWV2ZW50L2ZvY3VzaW4sLWNzcy9zaG93SGlkZSwtY3NzL2hpZGRlblZpc2libGVTZWxlY3RvcnNcIixcblxuXHQvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuXHRqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cblx0XHQvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcblx0XHQvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuXHRcdHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuXHRydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuXHQvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcblx0cm1zUHJlZml4ID0gL14tbXMtLyxcblx0cmRhc2hBbHBoYSA9IC8tKFthLXpdKS9nLFxuXG5cdC8vIFVzZWQgYnkgalF1ZXJ5LmNhbWVsQ2FzZSBhcyBjYWxsYmFjayB0byByZXBsYWNlKClcblx0ZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKCBhbGwsIGxldHRlciApIHtcblx0XHRyZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cdH07XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cblx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0aWYgKCBudW0gPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdHJldHVybiBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdO1xuXHR9LFxuXG5cdC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcblx0Ly8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG5cdHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG5cdFx0Ly8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cblx0XHQvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuXHRcdHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuXHRcdC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHQvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjayApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCggdGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdH0gKSApO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbIGogXSBdIDogW10gKTtcblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcigpO1xuXHR9LFxuXG5cdC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cblx0Ly8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG5cdHB1c2g6IHB1c2gsXG5cdHNvcnQ6IGFyci5zb3J0LFxuXHRzcGxpY2U6IGFyci5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIDAgXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbiggdGFyZ2V0ICkgKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHQvLyBFeHRlbmQgalF1ZXJ5IGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcblx0aWYgKCBpID09PSBsZW5ndGggKSB7XG5cdFx0dGFyZ2V0ID0gdGhpcztcblx0XHRpLS07XG5cdH1cblxuXHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblxuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoICggb3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdICkgIT0gbnVsbCApIHtcblxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbIG5hbWUgXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbIG5hbWUgXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdGlmICggZGVlcCAmJiBjb3B5ICYmICggalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvcHkgKSB8fFxuXHRcdFx0XHRcdCggY29weUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBBcnJheS5pc0FycmF5KCBzcmMgKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBzcmMgKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0galF1ZXJ5LmV4dGVuZCggZGVlcCwgY2xvbmUsIGNvcHkgKTtcblxuXHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNvcHkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGNvcHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIFVuaXF1ZSBmb3IgZWFjaCBjb3B5IG9mIGpRdWVyeSBvbiB0aGUgcGFnZVxuXHRleHBhbmRvOiBcImpRdWVyeVwiICsgKCB2ZXJzaW9uICsgTWF0aC5yYW5kb20oKSApLnJlcGxhY2UoIC9cXEQvZywgXCJcIiApLFxuXG5cdC8vIEFzc3VtZSBqUXVlcnkgaXMgcmVhZHkgd2l0aG91dCB0aGUgcmVhZHkgbW9kdWxlXG5cdGlzUmVhZHk6IHRydWUsXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcblx0fSxcblxuXHRub29wOiBmdW5jdGlvbigpIHt9LFxuXG5cdGlzRnVuY3Rpb246IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD01NywgRmlyZWZveCA8PTUyXG5cdFx0Ly8gSW4gc29tZSBicm93c2VycywgdHlwZW9mIHJldHVybnMgXCJmdW5jdGlvblwiIGZvciBIVE1MIDxvYmplY3Q+IGVsZW1lbnRzXG5cdFx0Ly8gKGkuZS4sIGB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJvYmplY3RcIiApID09PSBcImZ1bmN0aW9uXCJgKS5cblx0XHQvLyBXZSBkb24ndCB3YW50IHRvIGNsYXNzaWZ5ICphbnkqIERPTSBub2RlIGFzIGEgZnVuY3Rpb24uXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2Ygb2JqLm5vZGVUeXBlICE9PSBcIm51bWJlclwiO1xuXHR9LFxuXG5cdGlzTnVtZXJpYzogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8vIEFzIG9mIGpRdWVyeSAzLjAsIGlzTnVtZXJpYyBpcyBsaW1pdGVkIHRvXG5cdFx0Ly8gc3RyaW5ncyBhbmQgbnVtYmVycyAocHJpbWl0aXZlcyBvciBvYmplY3RzKVxuXHRcdC8vIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gZmluaXRlIG51bWJlcnMgKGdoLTI2NjIpXG5cdFx0dmFyIHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cdFx0cmV0dXJuICggdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiICkgJiZcblxuXHRcdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKFwiXCIpXG5cdFx0XHQvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG5cdFx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHRcdCFpc05hTiggb2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKTtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHZhciBwcm90bywgQ3RvcjtcblxuXHRcdC8vIERldGVjdCBvYnZpb3VzIG5lZ2F0aXZlc1xuXHRcdC8vIFVzZSB0b1N0cmluZyBpbnN0ZWFkIG9mIGpRdWVyeS50eXBlIHRvIGNhdGNoIGhvc3Qgb2JqZWN0c1xuXHRcdGlmICggIW9iaiB8fCB0b1N0cmluZy5jYWxsKCBvYmogKSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRwcm90byA9IGdldFByb3RvKCBvYmogKTtcblxuXHRcdC8vIE9iamVjdHMgd2l0aCBubyBwcm90b3R5cGUgKGUuZy4sIGBPYmplY3QuY3JlYXRlKCBudWxsIClgKSBhcmUgcGxhaW5cblx0XHRpZiAoICFwcm90byApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIE9iamVjdHMgd2l0aCBwcm90b3R5cGUgYXJlIHBsYWluIGlmZiB0aGV5IHdlcmUgY29uc3RydWN0ZWQgYnkgYSBnbG9iYWwgT2JqZWN0IGZ1bmN0aW9uXG5cdFx0Q3RvciA9IGhhc093bi5jYWxsKCBwcm90bywgXCJjb25zdHJ1Y3RvclwiICkgJiYgcHJvdG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIHR5cGVvZiBDdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgZm5Ub1N0cmluZy5jYWxsKCBDdG9yICkgPT09IE9iamVjdEZ1bmN0aW9uU3RyaW5nO1xuXHR9LFxuXG5cdGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvNjEyNVxuXHRcdHZhciBuYW1lO1xuXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdHR5cGU6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0aWYgKCBvYmogPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBvYmogKyBcIlwiO1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seSAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKCBvYmogKSBdIHx8IFwib2JqZWN0XCIgOlxuXHRcdFx0dHlwZW9mIG9iajtcblx0fSxcblxuXHQvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxuXHRnbG9iYWxFdmFsOiBmdW5jdGlvbiggY29kZSApIHtcblx0XHRET01FdmFsKCBjb2RlICk7XG5cdH0sXG5cblx0Ly8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSwgRWRnZSAxMiAtIDE1XG5cdC8vIE1pY3Jvc29mdCBmb3Jnb3QgdG8gaHVtcCB0aGVpciB2ZW5kb3IgcHJlZml4ICgjOTU3Milcblx0Y2FtZWxDYXNlOiBmdW5jdGlvbiggc3RyaW5nICkge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSggcm1zUHJlZml4LCBcIm1zLVwiICkucmVwbGFjZSggcmRhc2hBbHBoYSwgZmNhbWVsQ2FzZSApO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrICkge1xuXHRcdHZhciBsZW5ndGgsIGkgPSAwO1xuXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlMaWtlKCBPYmplY3QoIGFyciApICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LFxuXHRcdFx0XHRcdHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFsgYXJyIF0gOiBhcnJcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0cmV0dXJuIGFyciA9PSBudWxsID8gLTEgOiBpbmRleE9mLmNhbGwoIGFyciwgZWxlbSwgaSApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG5cdFx0XHRqID0gMCxcblx0XHRcdGkgPSBmaXJzdC5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaiBdO1xuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xuXHRcdHZhciBjYWxsYmFja0ludmVyc2UsXG5cdFx0XHRtYXRjaGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGNhbGxiYWNrRXhwZWN0ID0gIWludmVydDtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCBvbmx5IHNhdmluZyB0aGUgaXRlbXNcblx0XHQvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuXHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XG5cdFx0XHRcdG1hdGNoZXMucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9LFxuXG5cdC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcblx0XHR2YXIgbGVuZ3RoLCB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0cmV0ID0gW107XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuXHRcdGlmICggaXNBcnJheUxpa2UoIGVsZW1zICkgKSB7XG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBHbyB0aHJvdWdoIGV2ZXJ5IGtleSBvbiB0aGUgb2JqZWN0LFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIGVsZW1zICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0cmV0dXJuIGNvbmNhdC5hcHBseSggW10sIHJldCApO1xuXHR9LFxuXG5cdC8vIEEgZ2xvYmFsIEdVSUQgY291bnRlciBmb3Igb2JqZWN0c1xuXHRndWlkOiAxLFxuXG5cdC8vIEJpbmQgYSBmdW5jdGlvbiB0byBhIGNvbnRleHQsIG9wdGlvbmFsbHkgcGFydGlhbGx5IGFwcGx5aW5nIGFueVxuXHQvLyBhcmd1bWVudHMuXG5cdHByb3h5OiBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XG5cdFx0dmFyIHRtcCwgYXJncywgcHJveHk7XG5cblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dG1wID0gZm5bIGNvbnRleHQgXTtcblx0XHRcdGNvbnRleHQgPSBmbjtcblx0XHRcdGZuID0gdG1wO1xuXHRcdH1cblxuXHRcdC8vIFF1aWNrIGNoZWNrIHRvIGRldGVybWluZSBpZiB0YXJnZXQgaXMgY2FsbGFibGUsIGluIHRoZSBzcGVjXG5cdFx0Ly8gdGhpcyB0aHJvd3MgYSBUeXBlRXJyb3IsIGJ1dCB3ZSB3aWxsIGp1c3QgcmV0dXJuIHVuZGVmaW5lZC5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggZm4gKSApIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gU2ltdWxhdGVkIGJpbmRcblx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAyICk7XG5cdFx0cHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBmbi5hcHBseSggY29udGV4dCB8fCB0aGlzLCBhcmdzLmNvbmNhdCggc2xpY2UuY2FsbCggYXJndW1lbnRzICkgKSApO1xuXHRcdH07XG5cblx0XHQvLyBTZXQgdGhlIGd1aWQgb2YgdW5pcXVlIGhhbmRsZXIgdG8gdGhlIHNhbWUgb2Ygb3JpZ2luYWwgaGFuZGxlciwgc28gaXQgY2FuIGJlIHJlbW92ZWRcblx0XHRwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuXHRcdHJldHVybiBwcm94eTtcblx0fSxcblxuXHRub3c6IERhdGUubm93LFxuXG5cdC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuXHQvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuXHRzdXBwb3J0OiBzdXBwb3J0XG59ICk7XG5cbmlmICggdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRqUXVlcnkuZm5bIFN5bWJvbC5pdGVyYXRvciBdID0gYXJyWyBTeW1ib2wuaXRlcmF0b3IgXTtcbn1cblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaCggXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFwiLnNwbGl0KCBcIiBcIiApLFxuZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSApO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSggb2JqICkge1xuXG5cdC8vIFN1cHBvcnQ6IHJlYWwgaU9TIDguMiBvbmx5IChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gISFvYmogJiYgXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9iaiApIHx8IGlzV2luZG93KCBvYmogKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuXHRcdHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuLypcbiAqIE9wdGlvbmFsIChub24tU2l6emxlKSBzZWxlY3RvciBtb2R1bGUgZm9yIGN1c3RvbSBidWlsZHMuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgRE9FUyBOT1QgU1VQUE9SVCBtYW55IGRvY3VtZW50ZWQgalF1ZXJ5XG4gKiBmZWF0dXJlcyBpbiBleGNoYW5nZSBmb3IgaXRzIHNtYWxsZXIgc2l6ZTpcbiAqXG4gKiBBdHRyaWJ1dGUgbm90IGVxdWFsIHNlbGVjdG9yXG4gKiBQb3NpdGlvbmFsIHNlbGVjdG9ycyAoOmZpcnN0OyA6ZXEobik7IDpvZGQ7IGV0Yy4pXG4gKiBUeXBlIHNlbGVjdG9ycyAoOmlucHV0OyA6Y2hlY2tib3g7IDpidXR0b247IGV0Yy4pXG4gKiBTdGF0ZS1iYXNlZCBzZWxlY3RvcnMgKDphbmltYXRlZDsgOnZpc2libGU7IDpoaWRkZW47IGV0Yy4pXG4gKiA6aGFzKHNlbGVjdG9yKVxuICogOm5vdChjb21wbGV4IHNlbGVjdG9yKVxuICogY3VzdG9tIHNlbGVjdG9ycyB2aWEgU2l6emxlIGV4dGVuc2lvbnNcbiAqIExlYWRpbmcgY29tYmluYXRvcnMgKGUuZy4sICRjb2xsZWN0aW9uLmZpbmQoXCI+ICpcIikpXG4gKiBSZWxpYWJsZSBmdW5jdGlvbmFsaXR5IG9uIFhNTCBmcmFnbWVudHNcbiAqIFJlcXVpcmluZyBhbGwgcGFydHMgb2YgYSBzZWxlY3RvciB0byBtYXRjaCBlbGVtZW50cyB1bmRlciBjb250ZXh0XG4gKiAgIChlLmcuLCAkZGl2LmZpbmQoXCJkaXYgPiAqXCIpIG5vdyBtYXRjaGVzIGNoaWxkcmVuIG9mICRkaXYpXG4gKiBNYXRjaGluZyBhZ2FpbnN0IG5vbi1lbGVtZW50c1xuICogUmVsaWFibGUgc29ydGluZyBvZiBkaXNjb25uZWN0ZWQgbm9kZXNcbiAqIHF1ZXJ5U2VsZWN0b3JBbGwgYnVnIGZpeGVzIChlLmcuLCB1bnJlbGlhYmxlIDpmb2N1cyBvbiBXZWJLaXQpXG4gKlxuICogSWYgYW55IG9mIHRoZXNlIGFyZSB1bmFjY2VwdGFibGUgdHJhZGVvZmZzLCBlaXRoZXIgdXNlIFNpenpsZSBvclxuICogY3VzdG9taXplIHRoaXMgc3R1YiBmb3IgdGhlIHByb2plY3QncyBzcGVjaWZpYyBuZWVkcy5cbiAqL1xuXG52YXIgaGFzRHVwbGljYXRlLCBzb3J0SW5wdXQsXG5cdHNvcnRTdGFibGUgPSBqUXVlcnkuZXhwYW5kby5zcGxpdCggXCJcIiApLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oIFwiXCIgKSA9PT0galF1ZXJ5LmV4cGFuZG8sXG5cdG1hdGNoZXMgPSBkb2N1bWVudEVsZW1lbnQubWF0Y2hlcyB8fFxuXHRcdGRvY3VtZW50RWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2N1bWVudEVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jdW1lbnRFbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2N1bWVudEVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IsXG5cblx0Ly8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cblx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNjb21tb24tc2VyaWFsaXppbmctaWRpb21zXG5cdHJjc3Nlc2NhcGUgPSAvKFtcXDAtXFx4MWZcXHg3Zl18Xi0/XFxkKXxeLSR8W15cXHg4MC1cXHVGRkZGXFx3LV0vZyxcblx0ZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG5cdFx0aWYgKCBhc0NvZGVQb2ludCApIHtcblxuXHRcdFx0Ly8gVSswMDAwIE5VTEwgYmVjb21lcyBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSXG5cdFx0XHRpZiAoIGNoID09PSBcIlxcMFwiICkge1xuXHRcdFx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG5cdFx0XHRyZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArIGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyIHBvdGVudGlhbGx5LXNwZWNpYWwgQVNDSUkgY2hhcmFjdGVycyBnZXQgYmFja3NsYXNoLWVzY2FwZWRcblx0XHRyZXR1cm4gXCJcXFxcXCIgKyBjaDtcblx0fTtcblxuZnVuY3Rpb24gc29ydE9yZGVyKCBhLCBiICkge1xuXG5cdC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG5cdGlmICggYSA9PT0gYiApIHtcblx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHR2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG5cdGlmICggY29tcGFyZSApIHtcblx0XHRyZXR1cm4gY29tcGFyZTtcblx0fVxuXG5cdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0MTtcblxuXHQvLyBEaXNjb25uZWN0ZWQgbm9kZXNcblx0aWYgKCBjb21wYXJlICYgMSApIHtcblxuXHRcdC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuXHRcdGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBkb2N1bWVudCAmJlxuXHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2N1bWVudCwgYSApICkge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRpZiAoIGIgPT09IGRvY3VtZW50IHx8IGIub3duZXJEb2N1bWVudCA9PT0gZG9jdW1lbnQgJiZcblx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jdW1lbnQsIGIgKSApIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0cmV0dXJuIHNvcnRJbnB1dCA/XG5cdFx0XHQoIGluZGV4T2YuY2FsbCggc29ydElucHV0LCBhICkgLSBpbmRleE9mLmNhbGwoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0MDtcblx0fVxuXG5cdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcbn1cblxuZnVuY3Rpb24gdW5pcXVlU29ydCggcmVzdWx0cyApIHtcblx0dmFyIGVsZW0sXG5cdFx0ZHVwbGljYXRlcyA9IFtdLFxuXHRcdGogPSAwLFxuXHRcdGkgPSAwO1xuXG5cdGhhc0R1cGxpY2F0ZSA9IGZhbHNlO1xuXHRzb3J0SW5wdXQgPSAhc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG5cdHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cblx0aWYgKCBoYXNEdXBsaWNhdGUgKSB7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSByZXN1bHRzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSggc2VsICkge1xuXHRyZXR1cm4gKCBzZWwgKyBcIlwiICkucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHVuaXF1ZVNvcnQ6IHVuaXF1ZVNvcnQsXG5cdHVuaXF1ZTogdW5pcXVlU29ydCxcblx0ZXNjYXBlU2VsZWN0b3I6IGVzY2FwZSxcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHRcdHZhciBlbGVtLCBub2RlVHlwZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHQvLyBTYW1lIGJhc2ljIHNhZmVndWFyZCBhcyBTaXp6bGVcblx0XHRpZiAoICFzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9XG5cblx0XHQvLyBFYXJseSByZXR1cm4gaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuXHRcdGlmICggKCBub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGUgKSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSApIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHNlZWRbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApICkge1xuXHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpRdWVyeS5tZXJnZSggcmVzdWx0cywgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH0sXG5cdHRleHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBub2RlLFxuXHRcdFx0cmV0ID0gXCJcIixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0aWYgKCAhbm9kZVR5cGUgKSB7XG5cblx0XHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0XHR3aGlsZSAoICggbm9kZSA9IGVsZW1bIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdFx0cmV0ICs9IGpRdWVyeS50ZXh0KCBub2RlICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuXG5cdFx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0XHR9XG5cblx0XHQvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cdGNvbnRhaW5zOiBmdW5jdGlvbiggYSwgYiApIHtcblx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0YnVwID0gYiAmJiBiLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiBhZG93bi5jb250YWlucyggYnVwICkgKTtcblx0fSxcblx0aXNYTUxEb2M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gZG9jdW1lbnRFbGVtZW50IGlzIHZlcmlmaWVkIGZvciBjYXNlcyB3aGVyZSBpdCBkb2Vzbid0IHlldCBleGlzdFxuXHRcdC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuXHRcdHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKS5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0cmV0dXJuIGRvY3VtZW50RWxlbWVudCA/IGRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgOiBmYWxzZTtcblx0fSxcblx0ZXhwcjoge1xuXHRcdGF0dHJIYW5kbGU6IHt9LFxuXHRcdG1hdGNoOiB7XG5cdFx0XHRib29sOiBuZXcgUmVnRXhwKCBcIl4oPzpjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlclwiICtcblx0XHRcdFx0XCJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWQpJFwiLCBcImlcIiApLFxuXHRcdFx0bmVlZHNDb250ZXh0OiAvXltcXHgyMFxcdFxcclxcblxcZl0qWz4rfl0vXG5cdFx0fVxuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIGpRdWVyeS5maW5kLCB7XG5cdG1hdGNoZXM6IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XG5cdH0sXG5cdG1hdGNoZXNTZWxlY3RvcjogZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XG5cdFx0cmV0dXJuIG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHR2YXIgZm4gPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcblxuXHRcdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0XHR2YWx1ZSA9IGZuICYmIGhhc093bi5jYWxsKCBqUXVlcnkuZXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdGZuKCBlbGVtLCBuYW1lLCBqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIDpcblx0XHRcdFx0dW5kZWZpbmVkO1xuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXHR9XG59ICk7XG5cblxuXG52YXIgZGlyID0gZnVuY3Rpb24oIGVsZW0sIGRpciwgdW50aWwgKSB7XG5cdHZhciBtYXRjaGVkID0gW10sXG5cdFx0dHJ1bmNhdGUgPSB1bnRpbCAhPT0gdW5kZWZpbmVkO1xuXG5cdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSAmJiBlbGVtLm5vZGVUeXBlICE9PSA5ICkge1xuXHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdGlmICggdHJ1bmNhdGUgJiYgalF1ZXJ5KCBlbGVtICkuaXMoIHVudGlsICkgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgc2libGluZ3MgPSBmdW5jdGlvbiggbiwgZWxlbSApIHtcblx0dmFyIG1hdGNoZWQgPSBbXTtcblxuXHRmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuXHRcdGlmICggbi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBlbGVtICkge1xuXHRcdFx0bWF0Y2hlZC5wdXNoKCBuICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xuXG5cblxuZnVuY3Rpb24gbm9kZU5hbWUoIGVsZW0sIG5hbWUgKSB7XG5cbiAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbn07XG52YXIgcnNpbmdsZVRhZyA9ICggL148KFthLXpdW15cXC9cXDA+OlxceDIwXFx0XFxyXFxuXFxmXSopW1xceDIwXFx0XFxyXFxuXFxmXSpcXC8/Pig/OjxcXC9cXDE+fCkkL2kgKTtcblxuXG5cbnZhciByaXNTaW1wbGUgPSAvXi5bXjojXFxbXFwuLF0qJC87XG5cbi8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XG5mdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2luZ2xlIGVsZW1lbnRcblx0aWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEFycmF5bGlrZSBvZiBlbGVtZW50cyAoalF1ZXJ5LCBhcmd1bWVudHMsIEFycmF5KVxuXHRpZiAoIHR5cGVvZiBxdWFsaWZpZXIgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIFNpbXBsZSBzZWxlY3RvciB0aGF0IGNhbiBiZSBmaWx0ZXJlZCBkaXJlY3RseSwgcmVtb3Zpbmcgbm9uLUVsZW1lbnRzXG5cdGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcblx0fVxuXG5cdC8vIENvbXBsZXggc2VsZWN0b3IsIGNvbXBhcmUgdGhlIHR3byBzZXRzLCByZW1vdmluZyBub24tRWxlbWVudHNcblx0cXVhbGlmaWVyID0galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cyApO1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90ICYmIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKTtcbn1cblxualF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuXHR2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cblx0aWYgKCBub3QgKSB7XG5cdFx0ZXhwciA9IFwiOm5vdChcIiArIGV4cHIgKyBcIilcIjtcblx0fVxuXG5cdGlmICggZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzKCBleHByLCBqUXVlcnkuZ3JlcCggZWxlbXMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHR9ICkgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBpLCByZXQsXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeSggc2VsZWN0b3IgKS5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCBzZWxmWyBpIF0sIHRoaXMgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSApICk7XG5cdFx0fVxuXG5cdFx0cmV0ID0gdGhpcy5wdXNoU3RhY2soIFtdICk7XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCBzZWxmWyBpIF0sIHJldCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZVNvcnQoIHJldCApIDogcmV0O1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlICkgKTtcblx0fSxcblx0bm90OiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlICkgKTtcblx0fSxcblx0aXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gISF3aW5ub3coXG5cdFx0XHR0aGlzLFxuXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG5cdFx0XHQvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG5cdFx0XHR0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvciApIDpcblx0XHRcdFx0c2VsZWN0b3IgfHwgW10sXG5cdFx0XHRmYWxzZVxuXHRcdCkubGVuZ3RoO1xuXHR9XG59ICk7XG5cblxuLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcblxuXG4vLyBBIGNlbnRyYWwgcmVmZXJlbmNlIHRvIHRoZSByb290IGpRdWVyeShkb2N1bWVudClcbnZhciByb290alF1ZXJ5LFxuXG5cdC8vIEEgc2ltcGxlIHdheSB0byBjaGVjayBmb3IgSFRNTCBzdHJpbmdzXG5cdC8vIFByaW9yaXRpemUgI2lkIG92ZXIgPHRhZz4gdG8gYXZvaWQgWFNTIHZpYSBsb2NhdGlvbi5oYXNoICgjOTUyMSlcblx0Ly8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKCMxMTI5MDogbXVzdCBzdGFydCB3aXRoIDwpXG5cdC8vIFNob3J0Y3V0IHNpbXBsZSAjaWQgY2FzZSBmb3Igc3BlZWRcblx0cnF1aWNrRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSspKSQvLFxuXG5cdGluaXQgPSBqUXVlcnkuZm4uaW5pdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcm9vdCApIHtcblx0XHR2YXIgbWF0Y2gsIGVsZW07XG5cblx0XHQvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcblx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdC8vIE1ldGhvZCBpbml0KCkgYWNjZXB0cyBhbiBhbHRlcm5hdGUgcm9vdGpRdWVyeVxuXHRcdC8vIHNvIG1pZ3JhdGUgY2FuIHN1cHBvcnQgalF1ZXJ5LnN1YiAoZ2gtMjEwMSlcblx0XHRyb290ID0gcm9vdCB8fCByb290alF1ZXJ5O1xuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclsgMCBdID09PSBcIjxcIiAmJlxuXHRcdFx0XHRzZWxlY3Rvclsgc2VsZWN0b3IubGVuZ3RoIC0gMSBdID09PSBcIj5cIiAmJlxuXHRcdFx0XHRzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcblxuXHRcdFx0XHQvLyBBc3N1bWUgdGhhdCBzdHJpbmdzIHRoYXQgc3RhcnQgYW5kIGVuZCB3aXRoIDw+IGFyZSBIVE1MIGFuZCBza2lwIHRoZSByZWdleCBjaGVja1xuXHRcdFx0XHRtYXRjaCA9IFsgbnVsbCwgc2VsZWN0b3IsIG51bGwgXTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1hdGNoIGh0bWwgb3IgbWFrZSBzdXJlIG5vIGNvbnRleHQgaXMgc3BlY2lmaWVkIGZvciAjaWRcblx0XHRcdGlmICggbWF0Y2ggJiYgKCBtYXRjaFsgMSBdIHx8ICFjb250ZXh0ICkgKSB7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG5cdFx0XHRcdGlmICggbWF0Y2hbIDEgXSApIHtcblx0XHRcdFx0XHRjb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIGpRdWVyeSA/IGNvbnRleHRbIDAgXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcblx0XHRcdFx0XHRcdG1hdGNoWyAxIF0sXG5cdFx0XHRcdFx0XHRjb250ZXh0ICYmIGNvbnRleHQubm9kZVR5cGUgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IGRvY3VtZW50LFxuXHRcdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHRcdCkgKTtcblxuXHRcdFx0XHRcdC8vIEhBTkRMRTogJChodG1sLCBwcm9wcylcblx0XHRcdFx0XHRpZiAoIHJzaW5nbGVUYWcudGVzdCggbWF0Y2hbIDEgXSApICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb250ZXh0ICkgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBtYXRjaCBpbiBjb250ZXh0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWyAyIF0gKTtcblxuXHRcdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSW5qZWN0IHRoZSBlbGVtZW50IGRpcmVjdGx5IGludG8gdGhlIGpRdWVyeSBvYmplY3Rcblx0XHRcdFx0XHRcdHRoaXNbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG5cdFx0XHR9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcblx0XHRcdFx0cmV0dXJuICggY29udGV4dCB8fCByb290ICkuZmluZCggc2VsZWN0b3IgKTtcblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG5cdFx0XHQvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuXHRcdH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuXHRcdFx0dGhpc1sgMCBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiByb290LnJlYWR5ICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyb290LnJlYWR5KCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcblx0fTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxuaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XG5cbi8vIEluaXRpYWxpemUgY2VudHJhbCByZWZlcmVuY2VcbnJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cblxudmFyIHJwYXJlbnRzcHJldiA9IC9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLFxuXG5cdC8vIE1ldGhvZHMgZ3VhcmFudGVlZCB0byBwcm9kdWNlIGEgdW5pcXVlIHNldCB3aGVuIHN0YXJ0aW5nIGZyb20gYSB1bmlxdWUgc2V0XG5cdGd1YXJhbnRlZWRVbmlxdWUgPSB7XG5cdFx0Y2hpbGRyZW46IHRydWUsXG5cdFx0Y29udGVudHM6IHRydWUsXG5cdFx0bmV4dDogdHJ1ZSxcblx0XHRwcmV2OiB0cnVlXG5cdH07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0aGFzOiBmdW5jdGlvbiggdGFyZ2V0ICkge1xuXHRcdHZhciB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcblx0XHRcdGwgPSB0YXJnZXRzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCB0aGlzLCB0YXJnZXRzWyBpIF0gKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRjbG9zZXN0OiBmdW5jdGlvbiggc2VsZWN0b3JzLCBjb250ZXh0ICkge1xuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aCxcblx0XHRcdG1hdGNoZWQgPSBbXSxcblx0XHRcdHRhcmdldHMgPSB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiICYmIGpRdWVyeSggc2VsZWN0b3JzICk7XG5cblx0XHQvLyBQb3NpdGlvbmFsIHNlbGVjdG9ycyBuZXZlciBtYXRjaCwgc2luY2UgdGhlcmUncyBubyBfc2VsZWN0aW9uXyBjb250ZXh0XG5cdFx0aWYgKCAhcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvcnMgKSApIHtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zm9yICggY3VyID0gdGhpc1sgaSBdOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblxuXHRcdFx0XHRcdC8vIEFsd2F5cyBza2lwIGRvY3VtZW50IGZyYWdtZW50c1xuXHRcdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlIDwgMTEgJiYgKCB0YXJnZXRzID9cblx0XHRcdFx0XHRcdHRhcmdldHMuaW5kZXgoIGN1ciApID4gLTEgOlxuXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcblx0XHRcdFx0XHRcdGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGN1ciwgc2VsZWN0b3JzICkgKSApIHtcblxuXHRcdFx0XHRcdFx0bWF0Y2hlZC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZC5sZW5ndGggPiAxID8galF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKSA6IG1hdGNoZWQgKTtcblx0fSxcblxuXHQvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBzZXRcblx0aW5kZXg6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuICggdGhpc1sgMCBdICYmIHRoaXNbIDAgXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuXHRcdH1cblxuXHRcdC8vIEluZGV4IGluIHNlbGVjdG9yXG5cdFx0aWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBpbmRleE9mLmNhbGwoIGpRdWVyeSggZWxlbSApLCB0aGlzWyAwIF0gKTtcblx0XHR9XG5cblx0XHQvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcblx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCB0aGlzLFxuXG5cdFx0XHQvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcblx0XHRcdGVsZW0uanF1ZXJ5ID8gZWxlbVsgMCBdIDogZWxlbVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKFxuXHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoXG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcy5nZXQoKSwgalF1ZXJ5KCBzZWxlY3RvciwgY29udGV4dCApIClcblx0XHRcdClcblx0XHQpO1xuXHR9LFxuXG5cdGFkZEJhY2s6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGQoIHNlbGVjdG9yID09IG51bGwgP1xuXHRcdFx0dGhpcy5wcmV2T2JqZWN0IDogdGhpcy5wcmV2T2JqZWN0LmZpbHRlciggc2VsZWN0b3IgKVxuXHRcdCk7XG5cdH1cbn0gKTtcblxuZnVuY3Rpb24gc2libGluZyggY3VyLCBkaXIgKSB7XG5cdHdoaWxlICggKCBjdXIgPSBjdXJbIGRpciBdICkgJiYgY3VyLm5vZGVUeXBlICE9PSAxICkge31cblx0cmV0dXJuIGN1cjtcbn1cblxualF1ZXJ5LmVhY2goIHtcblx0cGFyZW50OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAxMSA/IHBhcmVudCA6IG51bGw7XG5cdH0sXG5cdHBhcmVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiICk7XG5cdH0sXG5cdHBhcmVudHNVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCApO1xuXHR9LFxuXHRuZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0cHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0c2libGluZ3M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggKCBlbGVtLnBhcmVudE5vZGUgfHwge30gKS5maXJzdENoaWxkLCBlbGVtICk7XG5cdH0sXG5cdGNoaWxkcmVuOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoIGVsZW0uZmlyc3RDaGlsZCApO1xuXHR9LFxuXHRjb250ZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIGlmICggbm9kZU5hbWUoIGVsZW0sIFwiaWZyYW1lXCIgKSApIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLmNvbnRlbnREb2N1bWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5LCBpT1MgNyBvbmx5LCBBbmRyb2lkIEJyb3dzZXIgPD00LjMgb25seVxuICAgICAgICAvLyBUcmVhdCB0aGUgdGVtcGxhdGUgZWxlbWVudCBhcyBhIHJlZ3VsYXIgb25lIGluIGJyb3dzZXJzIHRoYXRcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCBpdC5cbiAgICAgICAgaWYgKCBub2RlTmFtZSggZWxlbSwgXCJ0ZW1wbGF0ZVwiICkgKSB7XG4gICAgICAgICAgICBlbGVtID0gZWxlbS5jb250ZW50IHx8IGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG5cdH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuXHRcdHZhciBtYXRjaGVkID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cblx0XHRpZiAoIG5hbWUuc2xpY2UoIC01ICkgIT09IFwiVW50aWxcIiApIHtcblx0XHRcdHNlbGVjdG9yID0gdW50aWw7XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRtYXRjaGVkID0galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIG1hdGNoZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZXNcblx0XHRcdGlmICggIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSApIHtcblx0XHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV2ZXJzZSBvcmRlciBmb3IgcGFyZW50cyogYW5kIHByZXYtZGVyaXZhdGl2ZXNcblx0XHRcdGlmICggcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdFx0bWF0Y2hlZC5yZXZlcnNlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkICk7XG5cdH07XG59ICk7XG52YXIgcm5vdGh0bWx3aGl0ZSA9ICggL1teXFx4MjBcXHRcXHJcXG5cXGZdKy9nICk7XG5cblxuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0gKTtcblx0cmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxuICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxuICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHQvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG5cdC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcblx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cblx0XHRjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcblx0XHRmaXJpbmcsXG5cblx0XHQvLyBMYXN0IGZpcmUgdmFsdWUgZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0c1xuXHRcdG1lbW9yeSxcblxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG5cdFx0ZmlyZWQsXG5cblx0XHQvLyBGbGFnIHRvIHByZXZlbnQgZmlyaW5nXG5cdFx0bG9ja2VkLFxuXG5cdFx0Ly8gQWN0dWFsIGNhbGxiYWNrIGxpc3Rcblx0XHRsaXN0ID0gW10sXG5cblx0XHQvLyBRdWV1ZSBvZiBleGVjdXRpb24gZGF0YSBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuXHRcdHF1ZXVlID0gW10sXG5cblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSBhZGQvcmVtb3ZlIGFzIG5lZWRlZClcblx0XHRmaXJpbmdJbmRleCA9IC0xLFxuXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuZm9yY2Ugc2luZ2xlLWZpcmluZ1xuXHRcdFx0bG9ja2VkID0gbG9ja2VkIHx8IG9wdGlvbnMub25jZTtcblxuXHRcdFx0Ly8gRXhlY3V0ZSBjYWxsYmFja3MgZm9yIGFsbCBwZW5kaW5nIGV4ZWN1dGlvbnMsXG5cdFx0XHQvLyByZXNwZWN0aW5nIGZpcmluZ0luZGV4IG92ZXJyaWRlcyBhbmQgcnVudGltZSBjaGFuZ2VzXG5cdFx0XHRmaXJlZCA9IGZpcmluZyA9IHRydWU7XG5cdFx0XHRmb3IgKCA7IHF1ZXVlLmxlbmd0aDsgZmlyaW5nSW5kZXggPSAtMSApIHtcblx0XHRcdFx0bWVtb3J5ID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdFx0d2hpbGUgKCArK2ZpcmluZ0luZGV4IDwgbGlzdC5sZW5ndGggKSB7XG5cblx0XHRcdFx0XHQvLyBSdW4gY2FsbGJhY2sgYW5kIGNoZWNrIGZvciBlYXJseSB0ZXJtaW5hdGlvblxuXHRcdFx0XHRcdGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggbWVtb3J5WyAwIF0sIG1lbW9yeVsgMSBdICkgPT09IGZhbHNlICYmXG5cdFx0XHRcdFx0XHRvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBKdW1wIHRvIGVuZCBhbmQgZm9yZ2V0IHRoZSBkYXRhIHNvIC5hZGQgZG9lc24ndCByZS1maXJlXG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvcmdldCB0aGUgZGF0YSBpZiB3ZSdyZSBkb25lIHdpdGggaXRcblx0XHRcdGlmICggIW9wdGlvbnMubWVtb3J5ICkge1xuXHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cblx0XHRcdC8vIENsZWFuIHVwIGlmIHdlJ3JlIGRvbmUgZmlyaW5nIGZvciBnb29kXG5cdFx0XHRpZiAoIGxvY2tlZCApIHtcblxuXHRcdFx0XHQvLyBLZWVwIGFuIGVtcHR5IGxpc3QgaWYgd2UgaGF2ZSBkYXRhIGZvciBmdXR1cmUgYWRkIGNhbGxzXG5cdFx0XHRcdGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIHRoaXMgb2JqZWN0IGlzIHNwZW50XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGlzdCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3Rcblx0XHRzZWxmID0ge1xuXG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBoYXZlIG1lbW9yeSBmcm9tIGEgcGFzdCBydW4sIHdlIHNob3VsZCBmaXJlIGFmdGVyIGFkZGluZ1xuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdHF1ZXVlLnB1c2goIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCggZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3MsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goIGFyZyApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggYXJnICYmIGFyZy5sZW5ndGggJiYgalF1ZXJ5LnR5cGUoIGFyZyApICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSW5zcGVjdCByZWN1cnNpdmVseVxuXHRcdFx0XHRcdFx0XHRcdGFkZCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9ICkoIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHR3aGlsZSAoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcblx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRcdGZpcmluZ0luZGV4LS07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cblx0XHRcdC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxuXHRcdFx0aGFzOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdHJldHVybiBmbiA/XG5cdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6XG5cdFx0XHRcdFx0bGlzdC5sZW5ndGggPiAwO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuXHRcdFx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZSBhbmQgLmFkZFxuXHRcdFx0Ly8gQWJvcnQgYW55IGN1cnJlbnQvcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHQvLyBDbGVhciBhbGwgY2FsbGJhY2tzIGFuZCB2YWx1ZXNcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlXG5cdFx0XHQvLyBBbHNvIGRpc2FibGUgLmFkZCB1bmxlc3Mgd2UgaGF2ZSBtZW1vcnkgKHNpbmNlIGl0IHdvdWxkIGhhdmUgbm8gZWZmZWN0KVxuXHRcdFx0Ly8gQWJvcnQgYW55IHBlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGlmICggIW1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdGxvY2tlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWxvY2tlZDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcmd1bWVudHNcblx0XHRcdGZpcmVXaXRoOiBmdW5jdGlvbiggY29udGV4dCwgYXJncyApIHtcblx0XHRcdFx0aWYgKCAhbG9ja2VkICkge1xuXHRcdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRcdGFyZ3MgPSBbIGNvbnRleHQsIGFyZ3Muc2xpY2UgPyBhcmdzLnNsaWNlKCkgOiBhcmdzIF07XG5cdFx0XHRcdFx0cXVldWUucHVzaCggYXJncyApO1xuXHRcdFx0XHRcdGlmICggIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFRvIGtub3cgaWYgdGhlIGNhbGxiYWNrcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxsZWQgYXQgbGVhc3Qgb25jZVxuXHRcdFx0ZmlyZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gISFmaXJlZDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdHJldHVybiBzZWxmO1xufTtcblxuXG5qUXVlcnkucmVhZHlFeGNlcHRpb24gPSBmdW5jdGlvbiggZXJyb3IgKSB7XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHR0aHJvdyBlcnJvcjtcblx0fSApO1xufTtcblxuXG5cblxuLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cbnZhciBhY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBlbGVtcy5sZW5ndGgsXG5cdFx0YnVsayA9IGtleSA9PSBudWxsO1xuXG5cdC8vIFNldHMgbWFueSB2YWx1ZXNcblx0aWYgKCBqUXVlcnkudHlwZSgga2V5ICkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblx0XHRmb3IgKCBpIGluIGtleSApIHtcblx0XHRcdGFjY2VzcyggZWxlbXMsIGZuLCBpLCBrZXlbIGkgXSwgdHJ1ZSwgZW1wdHlHZXQsIHJhdyApO1xuXHRcdH1cblxuXHQvLyBTZXRzIG9uZSB2YWx1ZVxuXHR9IGVsc2UgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJhdyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBidWxrICkge1xuXG5cdFx0XHQvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdGlmICggcmF3ICkge1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0Zm4gPSBudWxsO1xuXG5cdFx0XHQvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWxrID0gZm47XG5cdFx0XHRcdGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRmbihcblx0XHRcdFx0XHRlbGVtc1sgaSBdLCBrZXksIHJhdyA/XG5cdFx0XHRcdFx0dmFsdWUgOlxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIGVsZW1zWyBpIF0sIGksIGZuKCBlbGVtc1sgaSBdLCBrZXkgKSApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBjaGFpbmFibGUgKSB7XG5cdFx0cmV0dXJuIGVsZW1zO1xuXHR9XG5cblx0Ly8gR2V0c1xuXHRpZiAoIGJ1bGsgKSB7XG5cdFx0cmV0dXJuIGZuLmNhbGwoIGVsZW1zICk7XG5cdH1cblxuXHRyZXR1cm4gbGVuID8gZm4oIGVsZW1zWyAwIF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xudmFyIGFjY2VwdERhdGEgPSBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0Ly8gQWNjZXB0cyBvbmx5OlxuXHQvLyAgLSBOb2RlXG5cdC8vICAgIC0gTm9kZS5FTEVNRU5UX05PREVcblx0Ly8gICAgLSBOb2RlLkRPQ1VNRU5UX05PREVcblx0Ly8gIC0gT2JqZWN0XG5cdC8vICAgIC0gQW55XG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIERhdGEoKSB7XG5cdHRoaXMuZXhwYW5kbyA9IGpRdWVyeS5leHBhbmRvICsgRGF0YS51aWQrKztcbn1cblxuRGF0YS51aWQgPSAxO1xuXG5EYXRhLnByb3RvdHlwZSA9IHtcblxuXHRjYWNoZTogZnVuY3Rpb24oIG93bmVyICkge1xuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIG93bmVyIG9iamVjdCBhbHJlYWR5IGhhcyBhIGNhY2hlXG5cdFx0dmFyIHZhbHVlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0Ly8gSWYgbm90LCBjcmVhdGUgb25lXG5cdFx0aWYgKCAhdmFsdWUgKSB7XG5cdFx0XHR2YWx1ZSA9IHt9O1xuXG5cdFx0XHQvLyBXZSBjYW4gYWNjZXB0IGRhdGEgZm9yIG5vbi1lbGVtZW50IG5vZGVzIGluIG1vZGVybiBicm93c2Vycyxcblx0XHRcdC8vIGJ1dCB3ZSBzaG91bGQgbm90LCBzZWUgIzgzMzUuXG5cdFx0XHQvLyBBbHdheXMgcmV0dXJuIGFuIGVtcHR5IG9iamVjdC5cblx0XHRcdGlmICggYWNjZXB0RGF0YSggb3duZXIgKSApIHtcblxuXHRcdFx0XHQvLyBJZiBpdCBpcyBhIG5vZGUgdW5saWtlbHkgdG8gYmUgc3RyaW5naWZ5LWVkIG9yIGxvb3BlZCBvdmVyXG5cdFx0XHRcdC8vIHVzZSBwbGFpbiBhc3NpZ25tZW50XG5cdFx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdmFsdWU7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHNlY3VyZSBpdCBpbiBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5XG5cdFx0XHRcdC8vIGNvbmZpZ3VyYWJsZSBtdXN0IGJlIHRydWUgdG8gYWxsb3cgdGhlIHByb3BlcnR5IHRvIGJlXG5cdFx0XHRcdC8vIGRlbGV0ZWQgd2hlbiBkYXRhIGlzIHJlbW92ZWRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIG93bmVyLCB0aGlzLmV4cGFuZG8sIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSxcblx0c2V0OiBmdW5jdGlvbiggb3duZXIsIGRhdGEsIHZhbHVlICkge1xuXHRcdHZhciBwcm9wLFxuXHRcdFx0Y2FjaGUgPSB0aGlzLmNhY2hlKCBvd25lciApO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCBrZXksIHZhbHVlIF0gYXJnc1xuXHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Y2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIGRhdGEgKSBdID0gdmFsdWU7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIHsgcHJvcGVydGllcyB9IF0gYXJnc1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb25lLWJ5LW9uZSB0byB0aGUgY2FjaGUgb2JqZWN0XG5cdFx0XHRmb3IgKCBwcm9wIGluIGRhdGEgKSB7XG5cdFx0XHRcdGNhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBwcm9wICkgXSA9IGRhdGFbIHByb3AgXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhY2hlO1xuXHR9LFxuXHRnZXQ6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHR0aGlzLmNhY2hlKCBvd25lciApIDpcblxuXHRcdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdICYmIG93bmVyWyB0aGlzLmV4cGFuZG8gXVsgalF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICkgXTtcblx0fSxcblx0YWNjZXNzOiBmdW5jdGlvbiggb3duZXIsIGtleSwgdmFsdWUgKSB7XG5cblx0XHQvLyBJbiBjYXNlcyB3aGVyZSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIE5vIGtleSB3YXMgc3BlY2lmaWVkXG5cdFx0Ly8gICAyLiBBIHN0cmluZyBrZXkgd2FzIHNwZWNpZmllZCwgYnV0IG5vIHZhbHVlIHByb3ZpZGVkXG5cdFx0Ly9cblx0XHQvLyBUYWtlIHRoZSBcInJlYWRcIiBwYXRoIGFuZCBhbGxvdyB0aGUgZ2V0IG1ldGhvZCB0byBkZXRlcm1pbmVcblx0XHQvLyB3aGljaCB2YWx1ZSB0byByZXR1cm4sIHJlc3BlY3RpdmVseSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIFRoZSBlbnRpcmUgY2FjaGUgb2JqZWN0XG5cdFx0Ly8gICAyLiBUaGUgZGF0YSBzdG9yZWQgYXQgdGhlIGtleVxuXHRcdC8vXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoICgga2V5ICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgKSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkgKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLmdldCggb3duZXIsIGtleSApO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gdGhlIGtleSBpcyBub3QgYSBzdHJpbmcsIG9yIGJvdGggYSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly8gYXJlIHNwZWNpZmllZCwgc2V0IG9yIGV4dGVuZCAoZXhpc3Rpbmcgb2JqZWN0cykgd2l0aCBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIEFuIG9iamVjdCBvZiBwcm9wZXJ0aWVzXG5cdFx0Ly8gICAyLiBBIGtleSBhbmQgdmFsdWVcblx0XHQvL1xuXHRcdHRoaXMuc2V0KCBvd25lciwga2V5LCB2YWx1ZSApO1xuXG5cdFx0Ly8gU2luY2UgdGhlIFwic2V0XCIgcGF0aCBjYW4gaGF2ZSB0d28gcG9zc2libGUgZW50cnkgcG9pbnRzXG5cdFx0Ly8gcmV0dXJuIHRoZSBleHBlY3RlZCBkYXRhIGJhc2VkIG9uIHdoaWNoIHBhdGggd2FzIHRha2VuWypdXG5cdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGtleTtcblx0fSxcblx0cmVtb3ZlOiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHR2YXIgaSxcblx0XHRcdGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0aWYgKCBjYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICgga2V5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBrZXlzXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIGtleSApICkge1xuXG5cdFx0XHRcdC8vIElmIGtleSBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzZXQgY2FtZWxDYXNlIGtleXMsIHNvIHJlbW92ZSB0aGF0LlxuXHRcdFx0XHRrZXkgPSBrZXkubWFwKCBqUXVlcnkuY2FtZWxDYXNlICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRrZXkgPSBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKTtcblxuXHRcdFx0XHQvLyBJZiBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzLCB1c2UgaXQuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgY3JlYXRlIGFuIGFycmF5IGJ5IG1hdGNoaW5nIG5vbi13aGl0ZXNwYWNlXG5cdFx0XHRcdGtleSA9IGtleSBpbiBjYWNoZSA/XG5cdFx0XHRcdFx0WyBrZXkgXSA6XG5cdFx0XHRcdFx0KCBrZXkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpID0ga2V5Lmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5WyBpIF0gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgdGhlIGV4cGFuZG8gaWYgdGhlcmUncyBubyBtb3JlIGRhdGFcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1XG5cdFx0XHQvLyBXZWJraXQgJiBCbGluayBwZXJmb3JtYW5jZSBzdWZmZXJzIHdoZW4gZGVsZXRpbmcgcHJvcGVydGllc1xuXHRcdFx0Ly8gZnJvbSBET00gbm9kZXMsIHNvIHNldCB0byB1bmRlZmluZWQgaW5zdGVhZFxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzc4NjA3IChidWcgcmVzdHJpY3RlZClcblx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRoYXNEYXRhOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0dmFyIGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdHJldHVybiBjYWNoZSAhPT0gdW5kZWZpbmVkICYmICFqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKTtcblx0fVxufTtcbnZhciBkYXRhUHJpdiA9IG5ldyBEYXRhKCk7XG5cbnZhciBkYXRhVXNlciA9IG5ldyBEYXRhKCk7XG5cblxuXG4vL1x0SW1wbGVtZW50YXRpb24gU3VtbWFyeVxuLy9cbi8vXHQxLiBFbmZvcmNlIEFQSSBzdXJmYWNlIGFuZCBzZW1hbnRpYyBjb21wYXRpYmlsaXR5IHdpdGggMS45LnggYnJhbmNoXG4vL1x0Mi4gSW1wcm92ZSB0aGUgbW9kdWxlJ3MgbWFpbnRhaW5hYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBzdG9yYWdlXG4vL1x0XHRwYXRocyB0byBhIHNpbmdsZSBtZWNoYW5pc20uXG4vL1x0My4gVXNlIHRoZSBzYW1lIHNpbmdsZSBtZWNoYW5pc20gdG8gc3VwcG9ydCBcInByaXZhdGVcIiBhbmQgXCJ1c2VyXCIgZGF0YS5cbi8vXHQ0LiBfTmV2ZXJfIGV4cG9zZSBcInByaXZhdGVcIiBkYXRhIHRvIHVzZXIgY29kZSAoVE9ETzogRHJvcCBfZGF0YSwgX3JlbW92ZURhdGEpXG4vL1x0NS4gQXZvaWQgZXhwb3NpbmcgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvbiB1c2VyIG9iamVjdHMgKGVnLiBleHBhbmRvIHByb3BlcnRpZXMpXG4vL1x0Ni4gUHJvdmlkZSBhIGNsZWFyIHBhdGggZm9yIGltcGxlbWVudGF0aW9uIHVwZ3JhZGUgdG8gV2Vha01hcCBpbiAyMDE0XG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG5cdHJtdWx0aURhc2ggPSAvW0EtWl0vZztcblxuZnVuY3Rpb24gZ2V0RGF0YSggZGF0YSApIHtcblx0aWYgKCBkYXRhID09PSBcInRydWVcIiApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmICggZGF0YSA9PT0gXCJmYWxzZVwiICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmICggZGF0YSA9PT0gXCJudWxsXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xuXHRpZiAoIGRhdGEgPT09ICtkYXRhICsgXCJcIiApIHtcblx0XHRyZXR1cm4gK2RhdGE7XG5cdH1cblxuXHRpZiAoIHJicmFjZS50ZXN0KCBkYXRhICkgKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoIGRhdGEgKTtcblx0fVxuXG5cdHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuXHR2YXIgbmFtZTtcblxuXHQvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG5cdC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuXHRpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJCZcIiApLnRvTG93ZXJDYXNlKCk7XG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGdldERhdGEoIGRhdGEgKTtcblx0XHRcdH0gY2F0Y2ggKCBlICkge31cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHdlIHNldCB0aGUgZGF0YSBzbyBpdCBpc24ndCBjaGFuZ2VkIGxhdGVyXG5cdFx0XHRkYXRhVXNlci5zZXQoIGVsZW0sIGtleSwgZGF0YSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRoYXNEYXRhOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuaGFzRGF0YSggZWxlbSApIHx8IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKTtcblx0fSxcblxuXHRkYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVVzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH0sXG5cblx0Ly8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcblx0Ly8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YVByaXYgbWV0aG9kcywgdGhlc2UgY2FuIGJlIGRlcHJlY2F0ZWQuXG5cdF9kYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0X3JlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGRhdGEsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0YXR0cnMgPSBlbGVtICYmIGVsZW0uYXR0cmlidXRlcztcblxuXHRcdC8vIEdldHMgYWxsIHZhbHVlc1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHRoaXMubGVuZ3RoICkge1xuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFkYXRhUHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBUaGUgYXR0cnMgZWxlbWVudHMgY2FuIGJlIG51bGwgKCMxNDg5NClcblx0XHRcdFx0XHRcdGlmICggYXR0cnNbIGkgXSApIHtcblx0XHRcdFx0XHRcdFx0bmFtZSA9IGF0dHJzWyBpIF0ubmFtZTtcblx0XHRcdFx0XHRcdFx0aWYgKCBuYW1lLmluZGV4T2YoIFwiZGF0YS1cIiApID09PSAwICkge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lLnNsaWNlKCA1ICkgKTtcblx0XHRcdFx0XHRcdFx0XHRkYXRhQXR0ciggZWxlbSwgbmFtZSwgZGF0YVsgbmFtZSBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcblx0XHRpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZGF0YTtcblxuXHRcdFx0Ly8gVGhlIGNhbGxpbmcgalF1ZXJ5IG9iamVjdCAoZWxlbWVudCBtYXRjaGVzKSBpcyBub3QgZW1wdHlcblx0XHRcdC8vIChhbmQgdGhlcmVmb3JlIGhhcyBhbiBlbGVtZW50IGFwcGVhcnMgYXQgdGhpc1sgMCBdKSBhbmQgdGhlXG5cdFx0XHQvLyBgdmFsdWVgIHBhcmFtZXRlciB3YXMgbm90IHVuZGVmaW5lZC4gQW4gZW1wdHkgalF1ZXJ5IG9iamVjdFxuXHRcdFx0Ly8gd2lsbCByZXN1bHQgaW4gYHVuZGVmaW5lZGAgZm9yIGVsZW0gPSB0aGlzWyAwIF0gd2hpY2ggd2lsbFxuXHRcdFx0Ly8gdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFuIGF0dGVtcHQgdG8gcmVhZCBhIGRhdGEgY2FjaGUgaXMgbWFkZS5cblx0XHRcdGlmICggZWxlbSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcblx0XHRcdFx0Ly8gVGhlIGtleSB3aWxsIGFsd2F5cyBiZSBjYW1lbENhc2VkIGluIERhdGFcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSwga2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBcImRpc2NvdmVyXCIgdGhlIGRhdGEgaW5cblx0XHRcdFx0Ly8gSFRNTDUgY3VzdG9tIGRhdGEtKiBhdHRyc1xuXHRcdFx0XHRkYXRhID0gZGF0YUF0dHIoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlIHRyaWVkIHJlYWxseSBoYXJkLCBidXQgdGhlIGRhdGEgZG9lc24ndCBleGlzdC5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGRhdGEuLi5cblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHN0b3JlIHRoZSBjYW1lbENhc2VkIGtleVxuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGtleSwgdmFsdWUgKTtcblx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGF0YVVzZXIucmVtb3ZlKCB0aGlzLCBrZXkgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcbnZhciBwbnVtID0gKCAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLyApLnNvdXJjZTtcblxudmFyIHJjc3NOdW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApO1xuXG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuV2l0aGluVHJlZSA9IGZ1bmN0aW9uKCBlbGVtLCBlbCApIHtcblxuXHRcdC8vIGlzSGlkZGVuV2l0aGluVHJlZSBtaWdodCBiZSBjYWxsZWQgZnJvbSBqUXVlcnkjZmlsdGVyIGZ1bmN0aW9uO1xuXHRcdC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxuXHRcdGVsZW0gPSBlbCB8fCBlbGVtO1xuXG5cdFx0Ly8gSW5saW5lIHN0eWxlIHRydW1wcyBhbGxcblx0XHRyZXR1cm4gZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fFxuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmXG5cblx0XHRcdC8vIE90aGVyd2lzZSwgY2hlY2sgY29tcHV0ZWQgc3R5bGVcblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MyAtIDQ1XG5cdFx0XHQvLyBEaXNjb25uZWN0ZWQgZWxlbWVudHMgY2FuIGhhdmUgY29tcHV0ZWQgZGlzcGxheTogbm9uZSwgc28gZmlyc3QgY29uZmlybSB0aGF0IGVsZW0gaXNcblx0XHRcdC8vIGluIHRoZSBkb2N1bWVudC5cblx0XHRcdGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgJiZcblxuXHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCI7XG5cdH07XG5cbnZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIGFkanVzdENTUyggZWxlbSwgcHJvcCwgdmFsdWVQYXJ0cywgdHdlZW4gKSB7XG5cdHZhciBhZGp1c3RlZCxcblx0XHRzY2FsZSA9IDEsXG5cdFx0bWF4SXRlcmF0aW9ucyA9IDIwLFxuXHRcdGN1cnJlbnRWYWx1ZSA9IHR3ZWVuID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uY3VyKCk7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgcHJvcCwgXCJcIiApO1xuXHRcdFx0fSxcblx0XHRpbml0aWFsID0gY3VycmVudFZhbHVlKCksXG5cdFx0dW5pdCA9IHZhbHVlUGFydHMgJiYgdmFsdWVQYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0Ly8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcblx0XHRpbml0aWFsSW5Vbml0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICtpbml0aWFsICkgJiZcblx0XHRcdHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cblx0aWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuXHRcdC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3Ncblx0XHR1bml0ID0gdW5pdCB8fCBpbml0aWFsSW5Vbml0WyAzIF07XG5cblx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0dmFsdWVQYXJ0cyA9IHZhbHVlUGFydHMgfHwgW107XG5cblx0XHQvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbCB8fCAxO1xuXG5cdFx0ZG8ge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKi5cblx0XHRcdC8vIFVzZSBzdHJpbmcgZm9yIGRvdWJsaW5nIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG5cdFx0XHRzY2FsZSA9IHNjYWxlIHx8IFwiLjVcIjtcblxuXHRcdFx0Ly8gQWRqdXN0IGFuZCBhcHBseVxuXHRcdFx0aW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgLyBzY2FsZTtcblx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgaW5pdGlhbEluVW5pdCArIHVuaXQgKTtcblxuXHRcdC8vIFVwZGF0ZSBzY2FsZSwgdG9sZXJhdGluZyB6ZXJvIG9yIE5hTiBmcm9tIHR3ZWVuLmN1cigpXG5cdFx0Ly8gQnJlYWsgdGhlIGxvb3AgaWYgc2NhbGUgaXMgdW5jaGFuZ2VkIG9yIHBlcmZlY3QsIG9yIGlmIHdlJ3ZlIGp1c3QgaGFkIGVub3VnaC5cblx0XHR9IHdoaWxlIChcblx0XHRcdHNjYWxlICE9PSAoIHNjYWxlID0gY3VycmVudFZhbHVlKCkgLyBpbml0aWFsICkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zXG5cdFx0KTtcblx0fVxuXG5cdGlmICggdmFsdWVQYXJ0cyApIHtcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWxJblVuaXQgfHwgK2luaXRpYWwgfHwgMDtcblxuXHRcdC8vIEFwcGx5IHJlbGF0aXZlIG9mZnNldCAoKz0vLT0pIGlmIHNwZWNpZmllZFxuXHRcdGFkanVzdGVkID0gdmFsdWVQYXJ0c1sgMSBdID9cblx0XHRcdGluaXRpYWxJblVuaXQgKyAoIHZhbHVlUGFydHNbIDEgXSArIDEgKSAqIHZhbHVlUGFydHNbIDIgXSA6XG5cdFx0XHQrdmFsdWVQYXJ0c1sgMiBdO1xuXHRcdGlmICggdHdlZW4gKSB7XG5cdFx0XHR0d2Vlbi51bml0ID0gdW5pdDtcblx0XHRcdHR3ZWVuLnN0YXJ0ID0gaW5pdGlhbEluVW5pdDtcblx0XHRcdHR3ZWVuLmVuZCA9IGFkanVzdGVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gYWRqdXN0ZWQ7XG59XG52YXIgcmNoZWNrYWJsZVR5cGUgPSAoIC9eKD86Y2hlY2tib3h8cmFkaW8pJC9pICk7XG5cbnZhciBydGFnTmFtZSA9ICggLzwoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0rKS9pICk7XG5cbnZhciByc2NyaXB0VHlwZSA9ICggL14kfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSApO1xuXG5cblxuLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbnZhciB3cmFwTWFwID0ge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdG9wdGlvbjogWyAxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIiBdLFxuXG5cdC8vIFhIVE1MIHBhcnNlcnMgZG8gbm90IG1hZ2ljYWxseSBpbnNlcnQgZWxlbWVudHMgaW4gdGhlXG5cdC8vIHNhbWUgd2F5IHRoYXQgdGFnIHNvdXAgcGFyc2VycyBkby4gU28gd2UgY2Fubm90IHNob3J0ZW5cblx0Ly8gdGhpcyBieSBvbWl0dGluZyA8dGJvZHk+IG9yIG90aGVyIHJlcXVpcmVkIGVsZW1lbnRzLlxuXHR0aGVhZDogWyAxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiIF0sXG5cdGNvbDogWyAyLCBcIjx0YWJsZT48Y29sZ3JvdXA+XCIsIFwiPC9jb2xncm91cD48L3RhYmxlPlwiIF0sXG5cdHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcblx0dGQ6IFsgMywgXCI8dGFibGU+PHRib2R5Pjx0cj5cIiwgXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXG5cdF9kZWZhdWx0OiBbIDAsIFwiXCIsIFwiXCIgXVxufTtcblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbndyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcblxud3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcbndyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cbmZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0Ly8gVXNlIHR5cGVvZiB0byBhdm9pZCB6ZXJvLWFyZ3VtZW50IG1ldGhvZCBpbnZvY2F0aW9uIG9uIGhvc3Qgb2JqZWN0cyAoIzE1MTUxKVxuXHR2YXIgcmV0O1xuXG5cdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0ID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnIHx8IFwiKlwiICk7XG5cblx0fSBlbHNlIGlmICggdHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXQgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApO1xuXG5cdH0gZWxzZSB7XG5cdFx0cmV0ID0gW107XG5cdH1cblxuXHRpZiAoIHRhZyA9PT0gdW5kZWZpbmVkIHx8IHRhZyAmJiBub2RlTmFtZSggY29udGV4dCwgdGFnICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5tZXJnZSggWyBjb250ZXh0IF0sIHJldCApO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn1cblxuXG4vLyBNYXJrIHNjcmlwdHMgYXMgaGF2aW5nIGFscmVhZHkgYmVlbiBldmFsdWF0ZWRcbmZ1bmN0aW9uIHNldEdsb2JhbEV2YWwoIGVsZW1zLCByZWZFbGVtZW50cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGRhdGFQcml2LnNldChcblx0XHRcdGVsZW1zWyBpIF0sXG5cdFx0XHRcImdsb2JhbEV2YWxcIixcblx0XHRcdCFyZWZFbGVtZW50cyB8fCBkYXRhUHJpdi5nZXQoIHJlZkVsZW1lbnRzWyBpIF0sIFwiZ2xvYmFsRXZhbFwiIClcblx0XHQpO1xuXHR9XG59XG5cblxudmFyIHJodG1sID0gLzx8JiM/XFx3KzsvO1xuXG5mdW5jdGlvbiBidWlsZEZyYWdtZW50KCBlbGVtcywgY29udGV4dCwgc2NyaXB0cywgc2VsZWN0aW9uLCBpZ25vcmVkICkge1xuXHR2YXIgZWxlbSwgdG1wLCB0YWcsIHdyYXAsIGNvbnRhaW5zLCBqLFxuXHRcdGZyYWdtZW50ID0gY29udGV4dC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0bm9kZXMgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsID0gZWxlbXMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRlbGVtID0gZWxlbXNbIGkgXTtcblxuXHRcdGlmICggZWxlbSB8fCBlbGVtID09PSAwICkge1xuXG5cdFx0XHQvLyBBZGQgbm9kZXMgZGlyZWN0bHlcblx0XHRcdGlmICggalF1ZXJ5LnR5cGUoIGVsZW0gKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCBlbGVtLm5vZGVUeXBlID8gWyBlbGVtIF0gOiBlbGVtICk7XG5cblx0XHRcdC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxuXHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0bm9kZXMucHVzaCggY29udGV4dC5jcmVhdGVUZXh0Tm9kZSggZWxlbSApICk7XG5cblx0XHRcdC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dG1wID0gdG1wIHx8IGZyYWdtZW50LmFwcGVuZENoaWxkKCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXG5cdFx0XHRcdC8vIERlc2VyaWFsaXplIGEgc3RhbmRhcmQgcmVwcmVzZW50YXRpb25cblx0XHRcdFx0dGFnID0gKCBydGFnTmFtZS5leGVjKCBlbGVtICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHR0bXAuaW5uZXJIVE1MID0gd3JhcFsgMSBdICsgalF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIGVsZW0gKSArIHdyYXBbIDIgXTtcblxuXHRcdFx0XHQvLyBEZXNjZW5kIHRocm91Z2ggd3JhcHBlcnMgdG8gdGhlIHJpZ2h0IGNvbnRlbnRcblx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdFx0dG1wID0gdG1wLmxhc3RDaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIHRtcC5jaGlsZE5vZGVzICk7XG5cblx0XHRcdFx0Ly8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcblx0XHRcdFx0dG1wID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0XHQvLyBFbnN1cmUgdGhlIGNyZWF0ZWQgbm9kZXMgYXJlIG9ycGhhbmVkICgjMTIzOTIpXG5cdFx0XHRcdHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmVtb3ZlIHdyYXBwZXIgZnJvbSBmcmFnbWVudFxuXHRmcmFnbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cblx0aSA9IDA7XG5cdHdoaWxlICggKCBlbGVtID0gbm9kZXNbIGkrKyBdICkgKSB7XG5cblx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgaW4gdGhlIGNvbnRleHQgY29sbGVjdGlvbiAodHJhYy00MDg3KVxuXHRcdGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSA+IC0xICkge1xuXHRcdFx0aWYgKCBpZ25vcmVkICkge1xuXHRcdFx0XHRpZ25vcmVkLnB1c2goIGVsZW0gKTtcblx0XHRcdH1cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnRhaW5zID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdC8vIEFwcGVuZCB0byBmcmFnbWVudFxuXHRcdHRtcCA9IGdldEFsbCggZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGVsZW0gKSwgXCJzY3JpcHRcIiApO1xuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGlmICggY29udGFpbnMgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCB0bXAgKTtcblx0XHR9XG5cblx0XHQvLyBDYXB0dXJlIGV4ZWN1dGFibGVzXG5cdFx0aWYgKCBzY3JpcHRzICkge1xuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRtcFsgaisrIF0gKSApIHtcblx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBlbGVtLnR5cGUgfHwgXCJcIiApICkge1xuXHRcdFx0XHRcdHNjcmlwdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZyYWdtZW50O1xufVxuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRkaXYgPSBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICksXG5cdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdC8vIENoZWNrIHN0YXRlIGxvc3QgaWYgdGhlIG5hbWUgaXMgc2V0ICgjMTEyMTcpXG5cdC8vIFN1cHBvcnQ6IFdpbmRvd3MgV2ViIEFwcHMgKFdXQSlcblx0Ly8gYG5hbWVgIGFuZCBgdHlwZWAgbXVzdCB1c2UgLnNldEF0dHJpYnV0ZSBmb3IgV1dBICgjMTQ5MDEpXG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwicmFkaW9cIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcInRcIiApO1xuXG5cdGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4xIG9ubHlcblx0Ly8gT2xkZXIgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG5cdHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0gKSgpO1xuXG5cbnZhclxuXHRya2V5RXZlbnQgPSAvXmtleS8sXG5cdHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcCl8Y2xpY2svLFxuXHRydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KS87XG5cbmZ1bmN0aW9uIHJldHVyblRydWUoKSB7XG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuLy8gU2VlICMxMzM5MyBmb3IgbW9yZSBpbmZvXG5mdW5jdGlvbiBzYWZlQWN0aXZlRWxlbWVudCgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0fSBjYXRjaCAoIGVyciApIHsgfVxufVxuXG5mdW5jdGlvbiBvbiggZWxlbSwgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgb25lICkge1xuXHR2YXIgb3JpZ0ZuLCB0eXBlO1xuXG5cdC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuXHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vICggdHlwZXMtT2JqZWN0LCBzZWxlY3RvciwgZGF0YSApXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRvbiggZWxlbSwgdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG5cblx0XHQvLyAoIHR5cGVzLCBmbiApXG5cdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMsIHNlbGVjdG9yLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vICggdHlwZXMsIGRhdGEsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHR9IGVsc2UgaWYgKCAhZm4gKSB7XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIG9uZSA9PT0gMSApIHtcblx0XHRvcmlnRm4gPSBmbjtcblx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG5cdFx0XHRyZXR1cm4gb3JpZ0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9O1xuXG5cdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcblx0fVxuXHRyZXR1cm4gZWxlbS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG5cdH0gKTtcbn1cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIG1hbmFnaW5nIGV2ZW50cyAtLSBub3QgcGFydCBvZiB0aGUgcHVibGljIGludGVyZmFjZS5cbiAqIFByb3BzIHRvIERlYW4gRWR3YXJkcycgYWRkRXZlbnQgbGlicmFyeSBmb3IgbWFueSBvZiB0aGUgaWRlYXMuXG4gKi9cbmpRdWVyeS5ldmVudCA9IHtcblxuXHRnbG9iYWw6IHt9LFxuXG5cdGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcblxuXHRcdHZhciBoYW5kbGVPYmpJbiwgZXZlbnRIYW5kbGUsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYnV0IGFsbG93IHBsYWluIG9iamVjdHMpXG5cdFx0aWYgKCAhZWxlbURhdGEgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXG5cdFx0aWYgKCBoYW5kbGVyLmhhbmRsZXIgKSB7XG5cdFx0XHRoYW5kbGVPYmpJbiA9IGhhbmRsZXI7XG5cdFx0XHRoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcblx0XHRcdHNlbGVjdG9yID0gaGFuZGxlT2JqSW4uc2VsZWN0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gRW5zdXJlIHRoYXQgaW52YWxpZCBzZWxlY3RvcnMgdGhyb3cgZXhjZXB0aW9ucyBhdCBhdHRhY2ggdGltZVxuXHRcdC8vIEV2YWx1YXRlIGFnYWluc3QgZG9jdW1lbnRFbGVtZW50IGluIGNhc2UgZWxlbSBpcyBhIG5vbi1lbGVtZW50IG5vZGUgKGUuZy4sIGRvY3VtZW50KVxuXHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGRvY3VtZW50RWxlbWVudCwgc2VsZWN0b3IgKTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcblx0XHRpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3Rcblx0XHRpZiAoICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0ZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzID0ge307XG5cdFx0fVxuXHRcdGlmICggISggZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgKSApIHtcblx0XHRcdGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlID0gZnVuY3Rpb24oIGUgKSB7XG5cblx0XHRcdFx0Ly8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcblx0XHRcdFx0Ly8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICE9PSBlLnR5cGUgP1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5kaXNwYXRjaC5hcHBseSggZWxlbSwgYXJndW1lbnRzICkgOiB1bmRlZmluZWQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIEhhbmRsZSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIGJ5IGEgc3BhY2Vcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVGhlcmUgKm11c3QqIGJlIGEgdHlwZSwgbm8gYXR0YWNoaW5nIG5hbWVzcGFjZS1vbmx5IGhhbmRsZXJzXG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cblx0XHRcdC8vIFVwZGF0ZSBzcGVjaWFsIGJhc2VkIG9uIG5ld2x5IHJlc2V0IHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xuXHRcdFx0aGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKVxuXHRcdFx0fSwgaGFuZGxlT2JqSW4gKTtcblxuXHRcdFx0Ly8gSW5pdCB0aGUgZXZlbnQgaGFuZGxlciBxdWV1ZSBpZiB3ZSdyZSB0aGUgZmlyc3Rcblx0XHRcdGlmICggISggaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSApICkge1xuXHRcdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdID0gW107XG5cdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQgPSAwO1xuXG5cdFx0XHRcdC8vIE9ubHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIgaWYgdGhlIHNwZWNpYWwgZXZlbnRzIGhhbmRsZXIgcmV0dXJucyBmYWxzZVxuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnNldHVwIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBldmVudEhhbmRsZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNwZWNpYWwuYWRkICkge1xuXHRcdFx0XHRzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblxuXHRcdFx0XHRpZiAoICFoYW5kbGVPYmouaGFuZGxlci5ndWlkICkge1xuXHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyLmd1aWQgPSBoYW5kbGVyLmd1aWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcblx0XHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaGFuZGxlcnMuZGVsZWdhdGVDb3VudCsrLCAwLCBoYW5kbGVPYmogKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXG5cdFx0XHRqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xuXHRcdH1cblxuXHR9LFxuXG5cdC8vIERldGFjaCBhbiBldmVudCBvciBzZXQgb2YgZXZlbnRzIGZyb20gYW4gZWxlbWVudFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgc2VsZWN0b3IsIG1hcHBlZFR5cGVzICkge1xuXG5cdFx0dmFyIGosIG9yaWdDb3VudCwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdGlmICggIWVsZW1EYXRhIHx8ICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE9uY2UgZm9yIGVhY2ggdHlwZS5uYW1lc3BhY2UgaW4gdHlwZXM7IHR5cGUgbWF5IGJlIG9taXR0ZWRcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVW5iaW5kIGFsbCBldmVudHMgKG9uIHRoaXMgbmFtZXNwYWNlLCBpZiBwcm92aWRlZCkgZm9yIHRoZSBlbGVtZW50XG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICsgdHlwZXNbIHQgXSwgaGFuZGxlciwgc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdIHx8IFtdO1xuXHRcdFx0dG1wID0gdG1wWyAyIF0gJiZcblx0XHRcdFx0bmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fFxuXHRcdFx0XHRcdFx0c2VsZWN0b3IgPT09IFwiKipcIiAmJiBoYW5kbGVPYmouc2VsZWN0b3IgKSApIHtcblx0XHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGosIDEgKTtcblxuXHRcdFx0XHRcdGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIHNwZWNpYWwucmVtb3ZlICkge1xuXHRcdFx0XHRcdFx0c3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3Rcblx0XHRcdC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxuXHRcdFx0aWYgKCBvcmlnQ291bnQgJiYgIWhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fFxuXHRcdFx0XHRcdHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBlbGVtRGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBldmVudHNbIHR5cGUgXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgZGF0YSBhbmQgdGhlIGV4cGFuZG8gaWYgaXQncyBubyBsb25nZXIgdXNlZFxuXHRcdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGV2ZW50cyApICkge1xuXHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImhhbmRsZSBldmVudHNcIiApO1xuXHRcdH1cblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIG5hdGl2ZUV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0dmFyIGV2ZW50ID0galF1ZXJ5LmV2ZW50LmZpeCggbmF0aXZlRXZlbnQgKTtcblxuXHRcdHZhciBpLCBqLCByZXQsIG1hdGNoZWQsIGhhbmRsZU9iaiwgaGFuZGxlclF1ZXVlLFxuXHRcdFx0YXJncyA9IG5ldyBBcnJheSggYXJndW1lbnRzLmxlbmd0aCApLFxuXHRcdFx0aGFuZGxlcnMgPSAoIGRhdGFQcml2LmdldCggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG5cdFx0Ly8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcblx0XHRhcmdzWyAwIF0gPSBldmVudDtcblxuXHRcdGZvciAoIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoIG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRldmVudC5jdXJyZW50VGFyZ2V0ID0gbWF0Y2hlZC5lbGVtO1xuXG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSApICYmXG5cdFx0XHRcdCFldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRcdC8vIFRyaWdnZXJlZCBldmVudCBtdXN0IGVpdGhlciAxKSBoYXZlIG5vIG5hbWVzcGFjZSwgb3IgMikgaGF2ZSBuYW1lc3BhY2Uocylcblx0XHRcdFx0Ly8gYSBzdWJzZXQgb3IgZXF1YWwgdG8gdGhvc2UgaW4gdGhlIGJvdW5kIGV2ZW50IChib3RoIGNhbiBoYXZlIG5vIG5hbWVzcGFjZSkuXG5cdFx0XHRcdGlmICggIWV2ZW50LnJuYW1lc3BhY2UgfHwgZXZlbnQucm5hbWVzcGFjZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoIGpRdWVyeS5ldmVudC5zcGVjaWFsWyBoYW5kbGVPYmoub3JpZ1R5cGUgXSB8fCB7fSApLmhhbmRsZSB8fFxuXHRcdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIgKS5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cblx0XHRcdFx0XHRpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGV2ZW50LnJlc3VsdCA9IHJldCApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbCB0aGUgcG9zdERpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZVxuXHRcdGlmICggc3BlY2lhbC5wb3N0RGlzcGF0Y2ggKSB7XG5cdFx0XHRzcGVjaWFsLnBvc3REaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0aGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XG5cdFx0dmFyIGksIGhhbmRsZU9iaiwgc2VsLCBtYXRjaGVkSGFuZGxlcnMsIG1hdGNoZWRTZWxlY3RvcnMsXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuXHRcdFx0Y3VyID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCAmJlxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTlcblx0XHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICh0cmFjLTEzMTgwKVxuXHRcdFx0Y3VyLm5vZGVUeXBlICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MlxuXHRcdFx0Ly8gU3VwcHJlc3Mgc3BlYy12aW9sYXRpbmcgY2xpY2tzIGluZGljYXRpbmcgYSBub24tcHJpbWFyeSBwb2ludGVyIGJ1dHRvbiAodHJhYy0zODYxKVxuXHRcdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtdHlwZS1jbGlja1xuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0Ly8gLi4uYnV0IG5vdCBhcnJvdyBrZXkgXCJjbGlja3NcIiBvZiByYWRpbyBpbnB1dHMsIHdoaWNoIGNhbiBoYXZlIGBidXR0b25gIC0xIChnaC0yMzQzKVxuXHRcdFx0ISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGV2ZW50LmJ1dHRvbiA+PSAxICkgKSB7XG5cblx0XHRcdGZvciAoIDsgY3VyICE9PSB0aGlzOyBjdXIgPSBjdXIucGFyZW50Tm9kZSB8fCB0aGlzICkge1xuXG5cdFx0XHRcdC8vIERvbid0IGNoZWNrIG5vbi1lbGVtZW50cyAoIzEzMjA4KVxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPT09IDEgJiYgISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGN1ci5kaXNhYmxlZCA9PT0gdHJ1ZSApICkge1xuXHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnMgPSB7fTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID4gLTEgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkSGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggbWF0Y2hlZEhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IGN1ciwgaGFuZGxlcnM6IG1hdGNoZWRIYW5kbGVycyB9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHRoZSByZW1haW5pbmcgKGRpcmVjdGx5LWJvdW5kKSBoYW5kbGVyc1xuXHRcdGN1ciA9IHRoaXM7XG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50IDwgaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogaGFuZGxlcnMuc2xpY2UoIGRlbGVnYXRlQ291bnQgKSB9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZXJRdWV1ZTtcblx0fSxcblxuXHRhZGRQcm9wOiBmdW5jdGlvbiggbmFtZSwgaG9vayApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGpRdWVyeS5FdmVudC5wcm90b3R5cGUsIG5hbWUsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cblx0XHRcdGdldDogalF1ZXJ5LmlzRnVuY3Rpb24oIGhvb2sgKSA/XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaG9vayggdGhpcy5vcmlnaW5hbEV2ZW50ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IDpcblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm9yaWdpbmFsRXZlbnRbIG5hbWUgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIG5hbWUsIHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRmaXg6IGZ1bmN0aW9uKCBvcmlnaW5hbEV2ZW50ICkge1xuXHRcdHJldHVybiBvcmlnaW5hbEV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdG9yaWdpbmFsRXZlbnQgOlxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCggb3JpZ2luYWxFdmVudCApO1xuXHR9LFxuXG5cdHNwZWNpYWw6IHtcblx0XHRsb2FkOiB7XG5cblx0XHRcdC8vIFByZXZlbnQgdHJpZ2dlcmVkIGltYWdlLmxvYWQgZXZlbnRzIGZyb20gYnViYmxpbmcgdG8gd2luZG93LmxvYWRcblx0XHRcdG5vQnViYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRmb2N1czoge1xuXG5cdFx0XHQvLyBGaXJlIG5hdGl2ZSBldmVudCBpZiBwb3NzaWJsZSBzbyBibHVyL2ZvY3VzIHNlcXVlbmNlIGlzIGNvcnJlY3Rcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cyApIHtcblx0XHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxuXHRcdH0sXG5cdFx0Ymx1cjoge1xuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyA9PT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmJsdXIgKSB7XG5cdFx0XHRcdFx0dGhpcy5ibHVyKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcblx0XHR9LFxuXHRcdGNsaWNrOiB7XG5cblx0XHRcdC8vIEZvciBjaGVja2JveCwgZmlyZSBuYXRpdmUgZXZlbnQgc28gY2hlY2tlZCBzdGF0ZSB3aWxsIGJlIHJpZ2h0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiAmJiB0aGlzLmNsaWNrICYmIG5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmNsaWNrKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHJldHVybiBub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmV1bmxvYWQ6IHtcblx0XHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG5cdFx0XHRcdC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG5cblx0Ly8gVGhpcyBcImlmXCIgaXMgbmVlZGVkIGZvciBwbGFpbiBvYmplY3RzXG5cdGlmICggZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuXHRcdGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQgKSApIHtcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gRXZlbnQgb2JqZWN0XG5cdGlmICggc3JjICYmIHNyYy50eXBlICkge1xuXHRcdHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcblx0XHR0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuXHRcdC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG5cdFx0Ly8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG5cdFx0dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuXHRcdFx0XHRzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5XG5cdFx0XHRcdHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0cmV0dXJuVHJ1ZSA6XG5cdFx0XHRyZXR1cm5GYWxzZTtcblxuXHRcdC8vIENyZWF0ZSB0YXJnZXQgcHJvcGVydGllc1xuXHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA8PTYgLSA3IG9ubHlcblx0XHQvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuXHRcdHRoaXMudGFyZ2V0ID0gKCBzcmMudGFyZ2V0ICYmIHNyYy50YXJnZXQubm9kZVR5cGUgPT09IDMgKSA/XG5cdFx0XHRzcmMudGFyZ2V0LnBhcmVudE5vZGUgOlxuXHRcdFx0c3JjLnRhcmdldDtcblxuXHRcdHRoaXMuY3VycmVudFRhcmdldCA9IHNyYy5jdXJyZW50VGFyZ2V0O1xuXHRcdHRoaXMucmVsYXRlZFRhcmdldCA9IHNyYy5yZWxhdGVkVGFyZ2V0O1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXG5qUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LkV2ZW50LFxuXHRpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuXHRpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNTaW11bGF0ZWQ6IGZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn07XG5cbi8vIEluY2x1ZGVzIGFsbCBjb21tb24gZXZlbnQgcHJvcHMgaW5jbHVkaW5nIEtleUV2ZW50IGFuZCBNb3VzZUV2ZW50IHNwZWNpZmljIHByb3BzXG5qUXVlcnkuZWFjaCgge1xuXHRhbHRLZXk6IHRydWUsXG5cdGJ1YmJsZXM6IHRydWUsXG5cdGNhbmNlbGFibGU6IHRydWUsXG5cdGNoYW5nZWRUb3VjaGVzOiB0cnVlLFxuXHRjdHJsS2V5OiB0cnVlLFxuXHRkZXRhaWw6IHRydWUsXG5cdGV2ZW50UGhhc2U6IHRydWUsXG5cdG1ldGFLZXk6IHRydWUsXG5cdHBhZ2VYOiB0cnVlLFxuXHRwYWdlWTogdHJ1ZSxcblx0c2hpZnRLZXk6IHRydWUsXG5cdHZpZXc6IHRydWUsXG5cdFwiY2hhclwiOiB0cnVlLFxuXHRjaGFyQ29kZTogdHJ1ZSxcblx0a2V5OiB0cnVlLFxuXHRrZXlDb2RlOiB0cnVlLFxuXHRidXR0b246IHRydWUsXG5cdGJ1dHRvbnM6IHRydWUsXG5cdGNsaWVudFg6IHRydWUsXG5cdGNsaWVudFk6IHRydWUsXG5cdG9mZnNldFg6IHRydWUsXG5cdG9mZnNldFk6IHRydWUsXG5cdHBvaW50ZXJJZDogdHJ1ZSxcblx0cG9pbnRlclR5cGU6IHRydWUsXG5cdHNjcmVlblg6IHRydWUsXG5cdHNjcmVlblk6IHRydWUsXG5cdHRhcmdldFRvdWNoZXM6IHRydWUsXG5cdHRvRWxlbWVudDogdHJ1ZSxcblx0dG91Y2hlczogdHJ1ZSxcblxuXHR3aGljaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdHZhciBidXR0b24gPSBldmVudC5idXR0b247XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRpZiAoIGV2ZW50LndoaWNoID09IG51bGwgJiYgcmtleUV2ZW50LnRlc3QoIGV2ZW50LnR5cGUgKSApIHtcblx0XHRcdHJldHVybiBldmVudC5jaGFyQ29kZSAhPSBudWxsID8gZXZlbnQuY2hhckNvZGUgOiBldmVudC5rZXlDb2RlO1xuXHRcdH1cblxuXHRcdC8vIEFkZCB3aGljaCBmb3IgY2xpY2s6IDEgPT09IGxlZnQ7IDIgPT09IG1pZGRsZTsgMyA9PT0gcmlnaHRcblx0XHRpZiAoICFldmVudC53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCAmJiBybW91c2VFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDEgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDIgKSB7XG5cdFx0XHRcdHJldHVybiAzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDQgKSB7XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQud2hpY2g7XG5cdH1cbn0sIGpRdWVyeS5ldmVudC5hZGRQcm9wICk7XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gc28gdGhhdCBldmVudCBkZWxlZ2F0aW9uIHdvcmtzIGluIGpRdWVyeS5cbi8vIERvIHRoZSBzYW1lIGZvciBwb2ludGVyZW50ZXIvcG9pbnRlcmxlYXZlIGFuZCBwb2ludGVyb3Zlci9wb2ludGVyb3V0XG4vL1xuLy8gU3VwcG9ydDogU2FmYXJpIDcgb25seVxuLy8gU2FmYXJpIHNlbmRzIG1vdXNlZW50ZXIgdG9vIG9mdGVuOyBzZWU6XG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NzAyNThcbi8vIGZvciB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGJ1ZyAoaXQgZXhpc3RlZCBpbiBvbGRlciBDaHJvbWUgdmVyc2lvbnMgYXMgd2VsbCkuXG5qUXVlcnkuZWFjaCgge1xuXHRtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuXHRtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG5cdHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuXHRwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuXHRcdGRlbGVnYXRlVHlwZTogZml4LFxuXHRcdGJpbmRUeXBlOiBmaXgsXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciByZXQsXG5cdFx0XHRcdHRhcmdldCA9IHRoaXMsXG5cdFx0XHRcdHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuXHRcdFx0XHRoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cblx0XHRcdC8vIEZvciBtb3VzZWVudGVyL2xlYXZlIGNhbGwgdGhlIGhhbmRsZXIgaWYgcmVsYXRlZCBpcyBvdXRzaWRlIHRoZSB0YXJnZXQuXG5cdFx0XHQvLyBOQjogTm8gcmVsYXRlZFRhcmdldCBpZiB0aGUgbW91c2UgbGVmdC9lbnRlcmVkIHRoZSBicm93c2VyIHdpbmRvd1xuXHRcdFx0aWYgKCAhcmVsYXRlZCB8fCAoIHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSApICkge1xuXHRcdFx0XHRldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuXHRcdFx0XHRyZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBmaXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID9cblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUgKyBcIi5cIiArIGhhbmRsZU9iai5uYW1lc3BhY2UgOlxuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzIFssIGZuXSApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxudmFyXG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvMzIyOVxuXHRyeGh0bWxUYWcgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopW14+XSopXFwvPi9naSxcblxuXHQvKiBlc2xpbnQtZW5hYmxlICovXG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExLCBFZGdlIDEyIC0gMTMgb25seVxuXHQvLyBJbiBJRS9FZGdlIHVzaW5nIHJlZ2V4IGdyb3VwcyBoZXJlIGNhdXNlcyBzZXZlcmUgc2xvd2Rvd25zLlxuXHQvLyBTZWUgaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy8xNzM2NTEyL1xuXHRybm9Jbm5lcmh0bWwgPSAvPHNjcmlwdHw8c3R5bGV8PGxpbmsvaSxcblxuXHQvLyBjaGVja2VkPVwiY2hlY2tlZFwiIG9yIGNoZWNrZWRcblx0cmNoZWNrZWQgPSAvY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLFxuXHRyc2NyaXB0VHlwZU1hc2tlZCA9IC9edHJ1ZVxcLyguKikvLFxuXHRyY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2c7XG5cbi8vIFByZWZlciBhIHRib2R5IG92ZXIgaXRzIHBhcmVudCB0YWJsZSBmb3IgY29udGFpbmluZyBuZXcgcm93c1xuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdG5vZGVOYW1lKCBjb250ZW50Lm5vZGVUeXBlICE9PSAxMSA/IGNvbnRlbnQgOiBjb250ZW50LmZpcnN0Q2hpbGQsIFwidHJcIiApICkge1xuXG5cdFx0cmV0dXJuIGpRdWVyeSggXCI+dGJvZHlcIiwgZWxlbSApWyAwIF0gfHwgZWxlbTtcblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG4vLyBSZXBsYWNlL3Jlc3RvcmUgdGhlIHR5cGUgYXR0cmlidXRlIG9mIHNjcmlwdCBlbGVtZW50cyBmb3Igc2FmZSBET00gbWFuaXB1bGF0aW9uXG5mdW5jdGlvbiBkaXNhYmxlU2NyaXB0KCBlbGVtICkge1xuXHRlbGVtLnR5cGUgPSAoIGVsZW0uZ2V0QXR0cmlidXRlKCBcInR5cGVcIiApICE9PSBudWxsICkgKyBcIi9cIiArIGVsZW0udHlwZTtcblx0cmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuXHR2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcblxuXHRpZiAoIG1hdGNoICkge1xuXHRcdGVsZW0udHlwZSA9IG1hdGNoWyAxIF07XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIFwidHlwZVwiICk7XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblx0dmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cblx0aWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIDEuIENvcHkgcHJpdmF0ZSBkYXRhOiBldmVudHMsIGhhbmRsZXJzLCBldGMuXG5cdGlmICggZGF0YVByaXYuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0cGRhdGFPbGQgPSBkYXRhUHJpdi5hY2Nlc3MoIHNyYyApO1xuXHRcdHBkYXRhQ3VyID0gZGF0YVByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuXHRcdGV2ZW50cyA9IHBkYXRhT2xkLmV2ZW50cztcblxuXHRcdGlmICggZXZlbnRzICkge1xuXHRcdFx0ZGVsZXRlIHBkYXRhQ3VyLmhhbmRsZTtcblx0XHRcdHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG5cdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gMi4gQ29weSB1c2VyIGRhdGFcblx0aWYgKCBkYXRhVXNlci5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHR1ZGF0YU9sZCA9IGRhdGFVc2VyLmFjY2Vzcyggc3JjICk7XG5cdFx0dWRhdGFDdXIgPSBqUXVlcnkuZXh0ZW5kKCB7fSwgdWRhdGFPbGQgKTtcblxuXHRcdGRhdGFVc2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcblx0fVxufVxuXG4vLyBGaXggSUUgYnVncywgc2VlIHN1cHBvcnQgdGVzdHNcbmZ1bmN0aW9uIGZpeElucHV0KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBub2RlTmFtZSA9IGRlc3Qubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHQvLyBGYWlscyB0byBwZXJzaXN0IHRoZSBjaGVja2VkIHN0YXRlIG9mIGEgY2xvbmVkIGNoZWNrYm94IG9yIHJhZGlvIGJ1dHRvbi5cblx0aWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmIHJjaGVja2FibGVUeXBlLnRlc3QoIHNyYy50eXBlICkgKSB7XG5cdFx0ZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWQ7XG5cblx0Ly8gRmFpbHMgdG8gcmV0dXJuIHRoZSBzZWxlY3RlZCBvcHRpb24gdG8gdGhlIGRlZmF1bHQgc2VsZWN0ZWQgc3RhdGUgd2hlbiBjbG9uaW5nIG9wdGlvbnNcblx0fSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiB8fCBub2RlTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiICkge1xuXHRcdGRlc3QuZGVmYXVsdFZhbHVlID0gc3JjLmRlZmF1bHRWYWx1ZTtcblx0fVxufVxuXG5mdW5jdGlvbiBkb21NYW5pcCggY29sbGVjdGlvbiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKSB7XG5cblx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRhcmdzID0gY29uY2F0LmFwcGx5KCBbXSwgYXJncyApO1xuXG5cdHZhciBmcmFnbWVudCwgZmlyc3QsIHNjcmlwdHMsIGhhc1NjcmlwdHMsIG5vZGUsIGRvYyxcblx0XHRpID0gMCxcblx0XHRsID0gY29sbGVjdGlvbi5sZW5ndGgsXG5cdFx0aU5vQ2xvbmUgPSBsIC0gMSxcblx0XHR2YWx1ZSA9IGFyZ3NbIDAgXSxcblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0Ly8gV2UgY2FuJ3QgY2xvbmVOb2RlIGZyYWdtZW50cyB0aGF0IGNvbnRhaW4gY2hlY2tlZCwgaW4gV2ViS2l0XG5cdGlmICggaXNGdW5jdGlvbiB8fFxuXHRcdFx0KCBsID4gMSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0IXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkgKSB7XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZWFjaCggZnVuY3Rpb24oIGluZGV4ICkge1xuXHRcdFx0dmFyIHNlbGYgPSBjb2xsZWN0aW9uLmVxKCBpbmRleCApO1xuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHRhcmdzWyAwIF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcblx0XHRcdH1cblx0XHRcdGRvbU1hbmlwKCBzZWxmLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggbCApIHtcblx0XHRmcmFnbWVudCA9IGJ1aWxkRnJhZ21lbnQoIGFyZ3MsIGNvbGxlY3Rpb25bIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgY29sbGVjdGlvbiwgaWdub3JlZCApO1xuXHRcdGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdGlmICggZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgKSB7XG5cdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdH1cblxuXHRcdC8vIFJlcXVpcmUgZWl0aGVyIG5ldyBjb250ZW50IG9yIGFuIGludGVyZXN0IGluIGlnbm9yZWQgZWxlbWVudHMgdG8gaW52b2tlIHRoZSBjYWxsYmFja1xuXHRcdGlmICggZmlyc3QgfHwgaWdub3JlZCApIHtcblx0XHRcdHNjcmlwdHMgPSBqUXVlcnkubWFwKCBnZXRBbGwoIGZyYWdtZW50LCBcInNjcmlwdFwiICksIGRpc2FibGVTY3JpcHQgKTtcblx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0Ly8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbVxuXHRcdFx0Ly8gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG5cdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRub2RlID0gZnJhZ21lbnQ7XG5cblx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cblx0XHRcdFx0XHQvLyBLZWVwIHJlZmVyZW5jZXMgdG8gY2xvbmVkIHNjcmlwdHMgZm9yIGxhdGVyIHJlc3RvcmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWxsYmFjay5jYWxsKCBjb2xsZWN0aW9uWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHNjcmlwdHNcblx0XHRcdFx0alF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG5cdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IHNjcmlwdHNbIGkgXTtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdCFkYXRhUHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiZcblx0XHRcdFx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cblx0XHRcdFx0XHRcdGlmICggbm9kZS5zcmMgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gT3B0aW9uYWwgQUpBWCBkZXBlbmRlbmN5LCBidXQgd29uJ3QgcnVuIHNjcmlwdHMgaWYgbm90IHByZXNlbnRcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuX2V2YWxVcmwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5Ll9ldmFsVXJsKCBub2RlLnNyYyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRET01FdmFsKCBub2RlLnRleHRDb250ZW50LnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApLCBkb2MgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKCBlbGVtLCBzZWxlY3Rvciwga2VlcERhdGEgKSB7XG5cdHZhciBub2RlLFxuXHRcdG5vZGVzID0gc2VsZWN0b3IgPyBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgZWxlbSApIDogZWxlbSxcblx0XHRpID0gMDtcblxuXHRmb3IgKCA7ICggbm9kZSA9IG5vZGVzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0aWYgKCAha2VlcERhdGEgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggbm9kZSApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBub2RlLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRpZiAoIGtlZXBEYXRhICYmIGpRdWVyeS5jb250YWlucyggbm9kZS5vd25lckRvY3VtZW50LCBub2RlICkgKSB7XG5cdFx0XHRcdHNldEdsb2JhbEV2YWwoIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHR9XG5cdFx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIG5vZGUgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRodG1sUHJlZmlsdGVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRyZXR1cm4gaHRtbC5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdHZhciBpLCBsLCBzcmNFbGVtZW50cywgZGVzdEVsZW1lbnRzLFxuXHRcdFx0Y2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApLFxuXHRcdFx0aW5QYWdlID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdC8vIEZpeCBJRSBjbG9uaW5nIGlzc3Vlc1xuXHRcdGlmICggIXN1cHBvcnQubm9DbG9uZUNoZWNrZWQgJiYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGVsZW0ubm9kZVR5cGUgPT09IDExICkgJiZcblx0XHRcdFx0IWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXG5cdFx0XHQvLyBXZSBlc2NoZXcgU2l6emxlIGhlcmUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnM6IGh0dHBzOi8vanNwZXJmLmNvbS9nZXRhbGwtdnMtc2l6emxlLzJcblx0XHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUgKTtcblx0XHRcdHNyY0VsZW1lbnRzID0gZ2V0QWxsKCBlbGVtICk7XG5cblx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmaXhJbnB1dCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXG5cdFx0aWYgKCBkYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0aWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdFx0c3JjRWxlbWVudHMgPSBzcmNFbGVtZW50cyB8fCBnZXRBbGwoIGVsZW0gKTtcblx0XHRcdFx0ZGVzdEVsZW1lbnRzID0gZGVzdEVsZW1lbnRzIHx8IGdldEFsbCggY2xvbmUgKTtcblxuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRjbG9uZUNvcHlFdmVudCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIGVsZW0sIGNsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcblx0XHRpZiAoIGRlc3RFbGVtZW50cy5sZW5ndGggPiAwICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggZGVzdEVsZW1lbnRzLCAhaW5QYWdlICYmIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9LFxuXG5cdGNsZWFuRGF0YTogZnVuY3Rpb24oIGVsZW1zICkge1xuXHRcdHZhciBkYXRhLCBlbGVtLCB0eXBlLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IGVsZW1zWyBpIF0gKSAhPT0gdW5kZWZpbmVkOyBpKysgKSB7XG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblx0XHRcdFx0aWYgKCAoIGRhdGEgPSBlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0Zm9yICggdHlwZSBpbiBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGRhdGEuaGFuZGxlICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSApIHtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZGV0YWNoOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciApO1xuXHR9LFxuXG5cdHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS50ZXh0KCB0aGlzICkgOlxuXHRcdFx0XHR0aGlzLmVtcHR5KCkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRwcmVwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0YXJnZXQuZmlyc3RDaGlsZCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRiZWZvcmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGFmdGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcy5uZXh0U2libGluZyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGVsZW0sXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKCBlbGVtID0gdGhpc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXG5cdFx0XHRcdGVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0ZGF0YUFuZEV2ZW50cyA9IGRhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGZhbHNlIDogZGF0YUFuZEV2ZW50cztcblx0XHRkZWVwRGF0YUFuZEV2ZW50cyA9IGRlZXBEYXRhQW5kRXZlbnRzID09IG51bGwgPyBkYXRhQW5kRXZlbnRzIDogZGVlcERhdGFBbmRFdmVudHM7XG5cblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcblx0XHR9ICk7XG5cdH0sXG5cblx0aHRtbDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBlbGVtID0gdGhpc1sgMCBdIHx8IHt9LFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0bCA9IHRoaXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uaW5uZXJIVE1MO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZWUgaWYgd2UgY2FuIHRha2UgYSBzaG9ydGN1dCBhbmQganVzdCB1c2UgaW5uZXJIVE1MXG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAhcm5vSW5uZXJodG1sLnRlc3QoIHZhbHVlICkgJiZcblx0XHRcdFx0IXdyYXBNYXBbICggcnRhZ05hbWUuZXhlYyggdmFsdWUgKSB8fCBbIFwiXCIsIFwiXCIgXSApWyAxIF0udG9Mb3dlckNhc2UoKSBdICkge1xuXG5cdFx0XHRcdHZhbHVlID0galF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIHZhbHVlICk7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0XHRlbGVtID0gdGhpc1sgaSBdIHx8IHt9O1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgZWxlbWVudCBub2RlcyBhbmQgcHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cdFx0XHRcdFx0XHRcdGVsZW0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWxlbSA9IDA7XG5cblx0XHRcdFx0Ly8gSWYgdXNpbmcgaW5uZXJIVE1MIHRocm93cyBhbiBleGNlcHRpb24sIHVzZSB0aGUgZmFsbGJhY2sgbWV0aG9kXG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge31cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHR0aGlzLmVtcHR5KCkuYXBwZW5kKCB2YWx1ZSApO1xuXHRcdFx0fVxuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0cmVwbGFjZVdpdGg6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpZ25vcmVkID0gW107XG5cblx0XHQvLyBNYWtlIHRoZSBjaGFuZ2VzLCByZXBsYWNpbmcgZWFjaCBub24taWdub3JlZCBjb250ZXh0IGVsZW1lbnQgd2l0aCB0aGUgbmV3IGNvbnRlbnRcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZiAoIGpRdWVyeS5pbkFycmF5KCB0aGlzLCBpZ25vcmVkICkgPCAwICkge1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIHRoaXMgKSApO1xuXHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblx0XHRcdFx0XHRwYXJlbnQucmVwbGFjZUNoaWxkKCBlbGVtLCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEZvcmNlIGNhbGxiYWNrIGludm9jYXRpb25cblx0XHR9LCBpZ25vcmVkICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIHtcblx0YXBwZW5kVG86IFwiYXBwZW5kXCIsXG5cdHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG5cdGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcblx0aW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcblx0cmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBlbGVtcyxcblx0XHRcdHJldCA9IFtdLFxuXHRcdFx0aW5zZXJ0ID0galF1ZXJ5KCBzZWxlY3RvciApLFxuXHRcdFx0bGFzdCA9IGluc2VydC5sZW5ndGggLSAxLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IGkgPD0gbGFzdDsgaSsrICkge1xuXHRcdFx0ZWxlbXMgPSBpID09PSBsYXN0ID8gdGhpcyA6IHRoaXMuY2xvbmUoIHRydWUgKTtcblx0XHRcdGpRdWVyeSggaW5zZXJ0WyBpIF0gKVsgb3JpZ2luYWwgXSggZWxlbXMgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHQvLyAuZ2V0KCkgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRwdXNoLmFwcGx5KCByZXQsIGVsZW1zLmdldCgpICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcblx0fTtcbn0gKTtcbnZhciBybWFyZ2luID0gKCAvXm1hcmdpbi8gKTtcblxudmFyIHJudW1ub25weCA9IG5ldyBSZWdFeHAoIFwiXihcIiArIHBudW0gKyBcIikoPyFweClbYS16JV0rJFwiLCBcImlcIiApO1xuXG52YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHksIEZpcmVmb3ggPD0zMCAoIzE1MDk4LCAjMTQxNTApXG5cdFx0Ly8gSUUgdGhyb3dzIG9uIGVsZW1lbnRzIGNyZWF0ZWQgaW4gcG9wdXBzXG5cdFx0Ly8gRkYgbWVhbndoaWxlIHRocm93cyBvbiBmcmFtZSBlbGVtZW50cyB0aHJvdWdoIFwiZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZVwiXG5cdFx0dmFyIHZpZXcgPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5cblx0XHRpZiAoICF2aWV3IHx8ICF2aWV3Lm9wZW5lciApIHtcblx0XHRcdHZpZXcgPSB3aW5kb3c7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuXHR9O1xuXG5cblxuKCBmdW5jdGlvbigpIHtcblxuXHQvLyBFeGVjdXRpbmcgYm90aCBwaXhlbFBvc2l0aW9uICYgYm94U2l6aW5nUmVsaWFibGUgdGVzdHMgcmVxdWlyZSBvbmx5IG9uZSBsYXlvdXRcblx0Ly8gc28gdGhleSdyZSBleGVjdXRlZCBhdCB0aGUgc2FtZSB0aW1lIHRvIHNhdmUgdGhlIHNlY29uZCBjb21wdXRhdGlvbi5cblx0ZnVuY3Rpb24gY29tcHV0ZVN0eWxlVGVzdHMoKSB7XG5cblx0XHQvLyBUaGlzIGlzIGEgc2luZ2xldG9uLCB3ZSBuZWVkIHRvIGV4ZWN1dGUgaXQgb25seSBvbmNlXG5cdFx0aWYgKCAhZGl2ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRpdi5zdHlsZS5jc3NUZXh0ID1cblx0XHRcdFwiYm94LXNpemluZzpib3JkZXItYm94O1wiICtcblx0XHRcdFwicG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztcIiArXG5cdFx0XHRcIm1hcmdpbjphdXRvO2JvcmRlcjoxcHg7cGFkZGluZzoxcHg7XCIgK1xuXHRcdFx0XCJ0b3A6MSU7d2lkdGg6NTAlXCI7XG5cdFx0ZGl2LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0ZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCBjb250YWluZXIgKTtcblxuXHRcdHZhciBkaXZTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYgKTtcblx0XHRwaXhlbFBvc2l0aW9uVmFsID0gZGl2U3R5bGUudG9wICE9PSBcIjElXCI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5LCBGaXJlZm94IDw9MyAtIDQ0XG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0VmFsID0gZGl2U3R5bGUubWFyZ2luTGVmdCA9PT0gXCIycHhcIjtcblx0XHRib3hTaXppbmdSZWxpYWJsZVZhbCA9IGRpdlN0eWxlLndpZHRoID09PSBcIjVweFwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSBvbmx5XG5cdFx0Ly8gRGV0ZWN0IG1pc3JlcG9ydGluZyBvZiBjb250ZW50IGRpbWVuc2lvbnMgZm9yIGJvcmRlci1ib3ggZWxlbWVudHMgKGdoLTM2OTkpXG5cdFx0Ym9yZGVyQm94UmVsaWFibGVWYWwgPSBkaXZTdHlsZS53aWR0aFsgMCBdID09PSBcIjVcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHlcblx0XHQvLyBTb21lIHN0eWxlcyBjb21lIGJhY2sgd2l0aCBwZXJjZW50YWdlIHZhbHVlcywgZXZlbiB0aG91Z2ggdGhleSBzaG91bGRuJ3Rcblx0XHRkaXYuc3R5bGUubWFyZ2luUmlnaHQgPSBcIjUwJVwiO1xuXHRcdHBpeGVsTWFyZ2luUmlnaHRWYWwgPSBkaXZTdHlsZS5tYXJnaW5SaWdodCA9PT0gXCI1cHhcIjtcblxuXHRcdGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHQvLyBOdWxsaWZ5IHRoZSBkaXYgc28gaXQgd291bGRuJ3QgYmUgc3RvcmVkIGluIHRoZSBtZW1vcnkgYW5kXG5cdFx0Ly8gaXQgd2lsbCBhbHNvIGJlIGEgc2lnbiB0aGF0IGNoZWNrcyBhbHJlYWR5IHBlcmZvcm1lZFxuXHRcdGRpdiA9IG51bGw7XG5cdH1cblxuXHR2YXIgcGl4ZWxQb3NpdGlvblZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsIGJvcmRlckJveFJlbGlhYmxlVmFsLCBwaXhlbE1hcmdpblJpZ2h0VmFsLFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdFZhbCxcblx0XHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG5cdFx0ZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXG5cdC8vIEZpbmlzaCBlYXJseSBpbiBsaW1pdGVkIChub24tYnJvd3NlcikgZW52aXJvbm1lbnRzXG5cdGlmICggIWRpdi5zdHlsZSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFN0eWxlIG9mIGNsb25lZCBlbGVtZW50IGFmZmVjdHMgc291cmNlIGVsZW1lbnQgY2xvbmVkICgjODkwOClcblx0ZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuXHRkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuXHRzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MDt3aWR0aDoxMHB4O2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweDtcIiArXG5cdFx0XCJwYWRkaW5nOjA7bWFyZ2luLXRvcDoxcHg7cG9zaXRpb246YWJzb2x1dGVcIjtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuXHRqUXVlcnkuZXh0ZW5kKCBzdXBwb3J0LCB7XG5cdFx0Ym9yZGVyQm94UmVsaWFibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBib3JkZXJCb3hSZWxpYWJsZVZhbDtcblx0XHR9LFxuXHRcdGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XG5cdFx0fSxcblx0XHRwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcblx0XHR9LFxuXHRcdHBpeGVsTWFyZ2luUmlnaHQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBwaXhlbE1hcmdpblJpZ2h0VmFsO1xuXHRcdH0sXG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0OiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcmVsaWFibGVNYXJnaW5MZWZ0VmFsO1xuXHRcdH1cblx0fSApO1xufSApKCk7XG5cblxuZnVuY3Rpb24gY3VyQ1NTKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcblx0dmFyIHdpZHRoLCBtaW5XaWR0aCwgbWF4V2lkdGgsIHJldCxcblxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggNTErXG5cdFx0Ly8gUmV0cmlldmluZyBzdHlsZSBiZWZvcmUgY29tcHV0ZWQgc29tZWhvd1xuXHRcdC8vIGZpeGVzIGFuIGlzc3VlIHdpdGggZ2V0dGluZyB3cm9uZyB2YWx1ZXNcblx0XHQvLyBvbiBkZXRhY2hlZCBlbGVtZW50c1xuXHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuXG5cdC8vIGdldFByb3BlcnR5VmFsdWUgaXMgbmVlZGVkIGZvcjpcblx0Ly8gICAuY3NzKCdmaWx0ZXInKSAoSUUgOSBvbmx5LCAjMTI1MzcpXG5cdC8vICAgLmNzcygnLS1jdXN0b21Qcm9wZXJ0eSkgKCMzMTQ0KVxuXHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdHJldCA9IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoIG5hbWUgKSB8fCBjb21wdXRlZFsgbmFtZSBdO1xuXG5cdFx0aWYgKCByZXQgPT09IFwiXCIgJiYgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XG5cdFx0XHRyZXQgPSBqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG5cdFx0Ly8gQW5kcm9pZCBCcm93c2VyIHJldHVybnMgcGVyY2VudGFnZSBmb3Igc29tZSB2YWx1ZXMsXG5cdFx0Ly8gYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVscy5cblx0XHQvLyBUaGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6XG5cdFx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNyZXNvbHZlZC12YWx1ZXNcblx0XHRpZiAoICFzdXBwb3J0LnBpeGVsTWFyZ2luUmlnaHQoKSAmJiBybnVtbm9ucHgudGVzdCggcmV0ICkgJiYgcm1hcmdpbi50ZXN0KCBuYW1lICkgKSB7XG5cblx0XHRcdC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcblx0XHRcdHdpZHRoID0gc3R5bGUud2lkdGg7XG5cdFx0XHRtaW5XaWR0aCA9IHN0eWxlLm1pbldpZHRoO1xuXHRcdFx0bWF4V2lkdGggPSBzdHlsZS5tYXhXaWR0aDtcblxuXHRcdFx0Ly8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuXHRcdFx0c3R5bGUubWluV2lkdGggPSBzdHlsZS5tYXhXaWR0aCA9IHN0eWxlLndpZHRoID0gcmV0O1xuXHRcdFx0cmV0ID0gY29tcHV0ZWQud2lkdGg7XG5cblx0XHRcdC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcblx0XHRcdHN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IG1pbldpZHRoO1xuXHRcdFx0c3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmV0ICE9PSB1bmRlZmluZWQgP1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHRcdC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG5cdFx0cmV0ICsgXCJcIiA6XG5cdFx0cmV0O1xufVxuXG5cbmZ1bmN0aW9uIGFkZEdldEhvb2tJZiggY29uZGl0aW9uRm4sIGhvb2tGbiApIHtcblxuXHQvLyBEZWZpbmUgdGhlIGhvb2ssIHdlJ2xsIGNoZWNrIG9uIHRoZSBmaXJzdCBydW4gaWYgaXQncyByZWFsbHkgbmVlZGVkLlxuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIGNvbmRpdGlvbkZuKCkgKSB7XG5cblx0XHRcdFx0Ly8gSG9vayBub3QgbmVlZGVkIChvciBpdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgaXQgZHVlXG5cdFx0XHRcdC8vIHRvIG1pc3NpbmcgZGVwZW5kZW5jeSksIHJlbW92ZSBpdC5cblx0XHRcdFx0ZGVsZXRlIHRoaXMuZ2V0O1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhvb2sgbmVlZGVkOyByZWRlZmluZSBpdCBzbyB0aGF0IHRoZSBzdXBwb3J0IHRlc3QgaXMgbm90IGV4ZWN1dGVkIGFnYWluLlxuXHRcdFx0cmV0dXJuICggdGhpcy5nZXQgPSBob29rRm4gKS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fVxuXHR9O1xufVxuXG5cbnZhclxuXG5cdC8vIFN3YXBwYWJsZSBpZiBkaXNwbGF5IGlzIG5vbmUgb3Igc3RhcnRzIHdpdGggdGFibGVcblx0Ly8gZXhjZXB0IFwidGFibGVcIiwgXCJ0YWJsZS1jZWxsXCIsIG9yIFwidGFibGUtY2FwdGlvblwiXG5cdC8vIFNlZSBoZXJlIGZvciBkaXNwbGF5IHZhbHVlczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9DU1MvZGlzcGxheVxuXHRyZGlzcGxheXN3YXAgPSAvXihub25lfHRhYmxlKD8hLWNbZWFdKS4rKS8sXG5cdHJjdXN0b21Qcm9wID0gL14tLS8sXG5cdGNzc1Nob3cgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiB9LFxuXHRjc3NOb3JtYWxUcmFuc2Zvcm0gPSB7XG5cdFx0bGV0dGVyU3BhY2luZzogXCIwXCIsXG5cdFx0Zm9udFdlaWdodDogXCI0MDBcIlxuXHR9LFxuXG5cdGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk1velwiLCBcIm1zXCIgXSxcblx0ZW1wdHlTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKS5zdHlsZTtcblxuLy8gUmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB7XG5cblx0Ly8gU2hvcnRjdXQgZm9yIG5hbWVzIHRoYXQgYXJlIG5vdCB2ZW5kb3IgcHJlZml4ZWRcblx0aWYgKCBuYW1lIGluIGVtcHR5U3R5bGUgKSB7XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH1cblxuXHQvLyBDaGVjayBmb3IgdmVuZG9yIHByZWZpeGVkIG5hbWVzXG5cdHZhciBjYXBOYW1lID0gbmFtZVsgMCBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKCAxICksXG5cdFx0aSA9IGNzc1ByZWZpeGVzLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRuYW1lID0gY3NzUHJlZml4ZXNbIGkgXSArIGNhcE5hbWU7XG5cdFx0aWYgKCBuYW1lIGluIGVtcHR5U3R5bGUgKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH1cbn1cblxuLy8gUmV0dXJuIGEgcHJvcGVydHkgbWFwcGVkIGFsb25nIHdoYXQgalF1ZXJ5LmNzc1Byb3BzIHN1Z2dlc3RzIG9yIHRvXG4vLyBhIHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eS5cbmZ1bmN0aW9uIGZpbmFsUHJvcE5hbWUoIG5hbWUgKSB7XG5cdHZhciByZXQgPSBqUXVlcnkuY3NzUHJvcHNbIG5hbWUgXTtcblx0aWYgKCAhcmV0ICkge1xuXHRcdHJldCA9IGpRdWVyeS5jc3NQcm9wc1sgbmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB8fCBuYW1lO1xuXHR9XG5cdHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG5cblx0Ly8gQW55IHJlbGF0aXZlICgrLy0pIHZhbHVlcyBoYXZlIGFscmVhZHkgYmVlblxuXHQvLyBub3JtYWxpemVkIGF0IHRoaXMgcG9pbnRcblx0dmFyIG1hdGNoZXMgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICk7XG5cdHJldHVybiBtYXRjaGVzID9cblxuXHRcdC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIFwic3VidHJhY3RcIiwgZS5nLiwgd2hlbiB1c2VkIGFzIGluIGNzc0hvb2tzXG5cdFx0TWF0aC5tYXgoIDAsIG1hdGNoZXNbIDIgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSA6XG5cdFx0dmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJveE1vZGVsQWRqdXN0bWVudCggZWxlbSwgZGltZW5zaW9uLCBib3gsIGlzQm9yZGVyQm94LCBzdHlsZXMsIGNvbXB1dGVkVmFsICkge1xuXHR2YXIgaSA9IGRpbWVuc2lvbiA9PT0gXCJ3aWR0aFwiID8gMSA6IDAsXG5cdFx0ZXh0cmEgPSAwLFxuXHRcdGRlbHRhID0gMDtcblxuXHQvLyBBZGp1c3RtZW50IG1heSBub3QgYmUgbmVjZXNzYXJ5XG5cdGlmICggYm94ID09PSAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICkgKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG5cblx0XHQvLyBCb3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW5cblx0XHRpZiAoIGJveCA9PT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIGJveCArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHQvLyBJZiB3ZSBnZXQgaGVyZSB3aXRoIGEgY29udGVudC1ib3gsIHdlJ3JlIHNlZWtpbmcgXCJwYWRkaW5nXCIgb3IgXCJib3JkZXJcIiBvciBcIm1hcmdpblwiXG5cdFx0aWYgKCAhaXNCb3JkZXJCb3ggKSB7XG5cblx0XHRcdC8vIEFkZCBwYWRkaW5nXG5cdFx0XHRkZWx0YSArPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblxuXHRcdFx0Ly8gRm9yIFwiYm9yZGVyXCIgb3IgXCJtYXJnaW5cIiwgYWRkIGJvcmRlclxuXHRcdFx0aWYgKCBib3ggIT09IFwicGFkZGluZ1wiICkge1xuXHRcdFx0XHRkZWx0YSArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBCdXQgc3RpbGwga2VlcCB0cmFjayBvZiBpdCBvdGhlcndpc2Vcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV4dHJhICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cblx0XHQvLyBJZiB3ZSBnZXQgaGVyZSB3aXRoIGEgYm9yZGVyLWJveCAoY29udGVudCArIHBhZGRpbmcgKyBib3JkZXIpLCB3ZSdyZSBzZWVraW5nIFwiY29udGVudFwiIG9yXG5cdFx0Ly8gXCJwYWRkaW5nXCIgb3IgXCJtYXJnaW5cIlxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIEZvciBcImNvbnRlbnRcIiwgc3VidHJhY3QgcGFkZGluZ1xuXHRcdFx0aWYgKCBib3ggPT09IFwiY29udGVudFwiICkge1xuXHRcdFx0XHRkZWx0YSAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIFwiY29udGVudFwiIG9yIFwicGFkZGluZ1wiLCBzdWJ0cmFjdCBib3JkZXJcblx0XHRcdGlmICggYm94ICE9PSBcIm1hcmdpblwiICkge1xuXHRcdFx0XHRkZWx0YSAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEFjY291bnQgZm9yIHBvc2l0aXZlIGNvbnRlbnQtYm94IHNjcm9sbCBndXR0ZXIgd2hlbiByZXF1ZXN0ZWQgYnkgcHJvdmlkaW5nIGNvbXB1dGVkVmFsXG5cdGlmICggIWlzQm9yZGVyQm94ICYmIGNvbXB1dGVkVmFsID49IDAgKSB7XG5cblx0XHQvLyBvZmZzZXRXaWR0aC9vZmZzZXRIZWlnaHQgaXMgYSByb3VuZGVkIHN1bSBvZiBjb250ZW50LCBwYWRkaW5nLCBzY3JvbGwgZ3V0dGVyLCBhbmQgYm9yZGVyXG5cdFx0Ly8gQXNzdW1pbmcgaW50ZWdlciBzY3JvbGwgZ3V0dGVyLCBzdWJ0cmFjdCB0aGUgcmVzdCBhbmQgcm91bmQgZG93blxuXHRcdGRlbHRhICs9IE1hdGgubWF4KCAwLCBNYXRoLmNlaWwoXG5cdFx0XHRlbGVtWyBcIm9mZnNldFwiICsgZGltZW5zaW9uWyAwIF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSggMSApIF0gLVxuXHRcdFx0Y29tcHV0ZWRWYWwgLVxuXHRcdFx0ZGVsdGEgLVxuXHRcdFx0ZXh0cmEgLVxuXHRcdFx0MC41XG5cdFx0KSApO1xuXHR9XG5cblx0cmV0dXJuIGRlbHRhO1xufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICkge1xuXG5cdC8vIFN0YXJ0IHdpdGggY29tcHV0ZWQgc3R5bGVcblx0dmFyIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuXHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgZGltZW5zaW9uLCBzdHlsZXMgKSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94O1xuXG5cdC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXG5cdGlmICggcm51bW5vbnB4LnRlc3QoIHZhbCApICkge1xuXHRcdHJldHVybiB2YWw7XG5cdH1cblxuXHQvLyBDaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuXHQvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG5cdHZhbHVlSXNCb3JkZXJCb3ggPSB2YWx1ZUlzQm9yZGVyQm94ICYmXG5cdFx0KCBzdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlKCkgfHwgdmFsID09PSBlbGVtLnN0eWxlWyBkaW1lbnNpb24gXSApO1xuXG5cdC8vIEZhbGwgYmFjayB0byBvZmZzZXRXaWR0aC9IZWlnaHQgd2hlbiB2YWx1ZSBpcyBcImF1dG9cIlxuXHQvLyBUaGlzIGhhcHBlbnMgZm9yIGlubGluZSBlbGVtZW50cyB3aXRoIG5vIGV4cGxpY2l0IHNldHRpbmcgKGdoLTM1NzEpXG5cdGlmICggdmFsID09PSBcImF1dG9cIiApIHtcblx0XHR2YWwgPSBlbGVtWyBcIm9mZnNldFwiICsgZGltZW5zaW9uWyAwIF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSggMSApIF07XG5cdH1cblxuXHQvLyBOb3JtYWxpemUgXCJcIiBhbmQgYXV0b1xuXHR2YWwgPSBwYXJzZUZsb2F0KCB2YWwgKSB8fCAwO1xuXG5cdC8vIEFkanVzdCBmb3IgdGhlIGVsZW1lbnQncyBib3ggbW9kZWxcblx0cmV0dXJuICggdmFsICtcblx0XHRib3hNb2RlbEFkanVzdG1lbnQoXG5cdFx0XHRlbGVtLFxuXHRcdFx0ZGltZW5zaW9uLFxuXHRcdFx0ZXh0cmEgfHwgKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApLFxuXHRcdFx0dmFsdWVJc0JvcmRlckJveCxcblx0XHRcdHN0eWxlcyxcblxuXHRcdFx0Ly8gUHJvdmlkZSB0aGUgY3VycmVudCBjb21wdXRlZCBzaXplIHRvIHJlcXVlc3Qgc2Nyb2xsIGd1dHRlciBjYWxjdWxhdGlvbiAoZ2gtMzU4OSlcblx0XHRcdHZhbFxuXHRcdClcblx0KSArIFwicHhcIjtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIEFkZCBpbiBzdHlsZSBwcm9wZXJ0eSBob29rcyBmb3Igb3ZlcnJpZGluZyB0aGUgZGVmYXVsdFxuXHQvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcblx0Y3NzSG9va3M6IHtcblx0XHRvcGFjaXR5OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHRcdC8vIFdlIHNob3VsZCBhbHdheXMgZ2V0IGEgbnVtYmVyIGJhY2sgZnJvbSBvcGFjaXR5XG5cdFx0XHRcdFx0dmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcblx0Y3NzTnVtYmVyOiB7XG5cdFx0XCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiB0cnVlLFxuXHRcdFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcblx0XHRcImZpbGxPcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJmbGV4R3Jvd1wiOiB0cnVlLFxuXHRcdFwiZmxleFNocmlua1wiOiB0cnVlLFxuXHRcdFwiZm9udFdlaWdodFwiOiB0cnVlLFxuXHRcdFwibGluZUhlaWdodFwiOiB0cnVlLFxuXHRcdFwib3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwib3JkZXJcIjogdHJ1ZSxcblx0XHRcIm9ycGhhbnNcIjogdHJ1ZSxcblx0XHRcIndpZG93c1wiOiB0cnVlLFxuXHRcdFwiekluZGV4XCI6IHRydWUsXG5cdFx0XCJ6b29tXCI6IHRydWVcblx0fSxcblxuXHQvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG5cdC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcblx0Y3NzUHJvcHM6IHt9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0dmFyIHJldCwgdHlwZSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdGlzQ3VzdG9tUHJvcCA9IHJjdXN0b21Qcm9wLnRlc3QoIG5hbWUgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZS4gV2UgZG9uJ3Rcblx0XHQvLyB3YW50IHRvIHF1ZXJ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcblx0XHQvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG5cdFx0aWYgKCAhaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0bmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvbiwgdGhlbiB1bnByZWZpeGVkIHZlcnNpb25cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRcdC8vIENvbnZlcnQgXCIrPVwiIG9yIFwiLT1cIiB0byByZWxhdGl2ZSBudW1iZXJzICgjNzM0NSlcblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoIHJldCA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmIHJldFsgMSBdICkge1xuXHRcdFx0XHR2YWx1ZSA9IGFkanVzdENTUyggZWxlbSwgbmFtZSwgcmV0ICk7XG5cblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQgKCM3MTE2KVxuXHRcdFx0aWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgdGhlIHVuaXQgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcblx0XHRcdGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG5cdFx0XHRcdCggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRpZiAoIGlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdFx0XHRzdHlsZS5zZXRQcm9wZXJ0eSggbmFtZSwgdmFsdWUgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBub24tY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuXHRcdHZhciB2YWwsIG51bSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdGlzQ3VzdG9tUHJvcCA9IHJjdXN0b21Qcm9wLnRlc3QoIG5hbWUgKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZS4gV2UgZG9uJ3Rcblx0XHQvLyB3YW50IHRvIG1vZGlmeSB0aGUgdmFsdWUgaWYgaXQgaXMgYSBDU1MgY3VzdG9tIHByb3BlcnR5XG5cdFx0Ly8gc2luY2UgdGhleSBhcmUgdXNlci1kZWZpbmVkLlxuXHRcdGlmICggIWlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdG5hbWUgPSBmaW5hbFByb3BOYW1lKCBvcmlnTmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIFRyeSBwcmVmaXhlZCBuYW1lIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIG5hbWVcblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG5cdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBcIm5vcm1hbFwiIHRvIGNvbXB1dGVkIHZhbHVlXG5cdFx0aWYgKCB2YWwgPT09IFwibm9ybWFsXCIgJiYgbmFtZSBpbiBjc3NOb3JtYWxUcmFuc2Zvcm0gKSB7XG5cdFx0XHR2YWwgPSBjc3NOb3JtYWxUcmFuc2Zvcm1bIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIG51bWVyaWMgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcblx0XHRpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuXHRcdFx0bnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG5cdFx0XHRyZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgaXNGaW5pdGUoIG51bSApID8gbnVtIHx8IDAgOiB2YWw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbDtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcImhlaWdodFwiLCBcIndpZHRoXCIgXSwgZnVuY3Rpb24oIGksIGRpbWVuc2lvbiApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBkaW1lbnNpb24gXSA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdC8vIENlcnRhaW4gZWxlbWVudHMgY2FuIGhhdmUgZGltZW5zaW9uIGluZm8gaWYgd2UgaW52aXNpYmx5IHNob3cgdGhlbVxuXHRcdFx0XHQvLyBidXQgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdFxuXHRcdFx0XHRyZXR1cm4gcmRpc3BsYXlzd2FwLnRlc3QoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKSAmJlxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrXG5cdFx0XHRcdFx0Ly8gVGFibGUgY29sdW1ucyBpbiBTYWZhcmkgaGF2ZSBub24temVybyBvZmZzZXRXaWR0aCAmIHplcm9cblx0XHRcdFx0XHQvLyBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB1bmxlc3MgZGlzcGxheSBpcyBjaGFuZ2VkLlxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHRcdFx0XHRcdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGEgZGlzY29ubmVjdGVkIG5vZGVcblx0XHRcdFx0XHQvLyBpbiBJRSB0aHJvd3MgYW4gZXJyb3IuXG5cdFx0XHRcdFx0KCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCB8fCAhZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCApID9cblx0XHRcdFx0XHRcdHN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgZGltZW5zaW9uLCBleHRyYSApO1xuXHRcdFx0XHRcdFx0fSApIDpcblx0XHRcdFx0XHRcdGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIGRpbWVuc2lvbiwgZXh0cmEgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIGV4dHJhICkge1xuXHRcdFx0dmFyIG1hdGNoZXMsXG5cdFx0XHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuXHRcdFx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG5cdFx0XHRcdHN1YnRyYWN0ID0gZXh0cmEgJiYgYm94TW9kZWxBZGp1c3RtZW50KFxuXHRcdFx0XHRcdGVsZW0sXG5cdFx0XHRcdFx0ZGltZW5zaW9uLFxuXHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdGlzQm9yZGVyQm94LFxuXHRcdFx0XHRcdHN0eWxlc1xuXHRcdFx0XHQpO1xuXG5cdFx0XHQvLyBBY2NvdW50IGZvciB1bnJlbGlhYmxlIGJvcmRlci1ib3ggZGltZW5zaW9ucyBieSBjb21wYXJpbmcgb2Zmc2V0KiB0byBjb21wdXRlZCBhbmRcblx0XHRcdC8vIGZha2luZyBhIGNvbnRlbnQtYm94IHRvIGdldCBib3JkZXIgYW5kIHBhZGRpbmcgKGdoLTM2OTkpXG5cdFx0XHRpZiAoIGlzQm9yZGVyQm94ICYmICFzdXBwb3J0LmJvcmRlckJveFJlbGlhYmxlKCkgKSB7XG5cdFx0XHRcdHN1YnRyYWN0IC09IE1hdGguY2VpbChcblx0XHRcdFx0XHRlbGVtWyBcIm9mZnNldFwiICsgZGltZW5zaW9uWyAwIF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSggMSApIF0gLVxuXHRcdFx0XHRcdHBhcnNlRmxvYXQoIHN0eWxlc1sgZGltZW5zaW9uIF0gKSAtXG5cdFx0XHRcdFx0Ym94TW9kZWxBZGp1c3RtZW50KCBlbGVtLCBkaW1lbnNpb24sIFwiYm9yZGVyXCIsIGZhbHNlLCBzdHlsZXMgKSAtXG5cdFx0XHRcdFx0MC41XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnZlcnQgdG8gcGl4ZWxzIGlmIHZhbHVlIGFkanVzdG1lbnQgaXMgbmVlZGVkXG5cdFx0XHRpZiAoIHN1YnRyYWN0ICYmICggbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmXG5cdFx0XHRcdCggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApICE9PSBcInB4XCIgKSB7XG5cblx0XHRcdFx0ZWxlbS5zdHlsZVsgZGltZW5zaW9uIF0gPSB2YWx1ZTtcblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuY3NzKCBlbGVtLCBkaW1lbnNpb24gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKTtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5jc3NIb29rcy5tYXJnaW5MZWZ0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luTGVmdCxcblx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4gKCBwYXJzZUZsb2F0KCBjdXJDU1MoIGVsZW0sIFwibWFyZ2luTGVmdFwiICkgKSB8fFxuXHRcdFx0XHRlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuXHRcdFx0XHRcdHN3YXAoIGVsZW0sIHsgbWFyZ2luTGVmdDogMCB9LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cdFx0XHRcdFx0fSApXG5cdFx0XHRcdCkgKyBcInB4XCI7XG5cdFx0fVxuXHR9XG4pO1xuXG4vLyBUaGVzZSBob29rcyBhcmUgdXNlZCBieSBhbmltYXRlIHRvIGV4cGFuZCBwcm9wZXJ0aWVzXG5qUXVlcnkuZWFjaCgge1xuXHRtYXJnaW46IFwiXCIsXG5cdHBhZGRpbmc6IFwiXCIsXG5cdGJvcmRlcjogXCJXaWR0aFwiXG59LCBmdW5jdGlvbiggcHJlZml4LCBzdWZmaXggKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0gPSB7XG5cdFx0ZXhwYW5kOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgaSA9IDAsXG5cdFx0XHRcdGV4cGFuZGVkID0ge30sXG5cblx0XHRcdFx0Ly8gQXNzdW1lcyBhIHNpbmdsZSBudW1iZXIgaWYgbm90IGEgc3RyaW5nXG5cdFx0XHRcdHBhcnRzID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUuc3BsaXQoIFwiIFwiICkgOiBbIHZhbHVlIF07XG5cblx0XHRcdGZvciAoIDsgaSA8IDQ7IGkrKyApIHtcblx0XHRcdFx0ZXhwYW5kZWRbIHByZWZpeCArIGNzc0V4cGFuZFsgaSBdICsgc3VmZml4IF0gPVxuXHRcdFx0XHRcdHBhcnRzWyBpIF0gfHwgcGFydHNbIGkgLSAyIF0gfHwgcGFydHNbIDAgXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV4cGFuZGVkO1xuXHRcdH1cblx0fTtcblxuXHRpZiAoICFybWFyZ2luLnRlc3QoIHByZWZpeCApICkge1xuXHRcdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgc3R5bGVzLCBsZW4sXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBuYW1lICkgKSB7XG5cdFx0XHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuXHRcdFx0XHRsZW4gPSBuYW1lLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbWFwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG5cdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHR9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fVxufSApO1xuXG5cbnZhciBib29sSG9vayxcblx0YXR0ckhhbmRsZSA9IGpRdWVyeS5leHByLmF0dHJIYW5kbGU7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCB0aGlzLCBuYW1lICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBhdHRyaWJ1dGVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRmFsbGJhY2sgdG8gcHJvcCB3aGVuIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRpZiAoIHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcblx0XHR9XG5cblx0XHQvLyBBdHRyaWJ1dGUgaG9va3MgYXJlIGRldGVybWluZWQgYnkgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uXG5cdFx0Ly8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXHRcdFx0aG9va3MgPSBqUXVlcnkuYXR0ckhvb2tzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHQoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApID8gYm9vbEhvb2sgOiB1bmRlZmluZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHZhbHVlID09PSBudWxsICkge1xuXHRcdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCB2YWx1ZSArIFwiXCIgKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cblx0XHRyZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHQvLyBOb24tZXhpc3RlbnQgYXR0cmlidXRlcyByZXR1cm4gbnVsbCwgd2Ugbm9ybWFsaXplIHRvIHVuZGVmaW5lZFxuXHRcdHJldHVybiByZXQgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJldDtcblx0fSxcblxuXHRhdHRySG9va3M6IHtcblx0XHR0eXBlOiB7XG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiZcblx0XHRcdFx0XHRub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dmFyIHZhbCA9IGVsZW0udmFsdWU7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xuXHRcdFx0XHRcdGlmICggdmFsICkge1xuXHRcdFx0XHRcdFx0ZWxlbS52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHR2YXIgbmFtZSxcblx0XHRcdGkgPSAwLFxuXG5cdFx0XHQvLyBBdHRyaWJ1dGUgbmFtZXMgY2FuIGNvbnRhaW4gbm9uLUhUTUwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzXG5cdFx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcblx0XHRcdGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICk7XG5cblx0XHRpZiAoIGF0dHJOYW1lcyAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0d2hpbGUgKCAoIG5hbWUgPSBhdHRyTmFtZXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBuYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIEhvb2tzIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcblx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGJvb2xlYW4gYXR0cmlidXRlcyB3aGVuIHNldCB0byBmYWxzZVxuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH1cbn07XG5cbmpRdWVyeS5lYWNoKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCggL1xcdysvZyApLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG5cdGF0dHJIYW5kbGVbIG5hbWUgXSA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgcmV0LCBoYW5kbGUsXG5cdFx0XHRsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cblx0XHRcdC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcblx0XHRcdGhhbmRsZSA9IGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXTtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IHJldDtcblx0XHRcdHJldCA9IGdldHRlciggZWxlbSwgbmFtZSwgaXNYTUwgKSAhPSBudWxsID9cblx0XHRcdFx0bG93ZXJjYXNlTmFtZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSBoYW5kbGU7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH07XG59ICk7XG5cblxuXG5cblx0Ly8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2UgYWNjb3JkaW5nIHRvIEhUTUwgc3BlY1xuXHQvLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jc3RyaXAtYW5kLWNvbGxhcHNlLWFzY2lpLXdoaXRlc3BhY2Vcblx0ZnVuY3Rpb24gc3RyaXBBbmRDb2xsYXBzZSggdmFsdWUgKSB7XG5cdFx0dmFyIHRva2VucyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cdFx0cmV0dXJuIHRva2Vucy5qb2luKCBcIiBcIiApO1xuXHR9XG5cblxuZnVuY3Rpb24gZ2V0Q2xhc3MoIGVsZW0gKSB7XG5cdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSAmJiBlbGVtLmdldEF0dHJpYnV0ZSggXCJjbGFzc1wiICkgfHwgXCJcIjtcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhZGRDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGN1clZhbHVlLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUgKSB7XG5cdFx0XHRjbGFzc2VzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGN1clZhbHVlICkgKyBcIiBcIiApO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBjbGF6eiA9IGNsYXNzZXNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciArPSBjbGF6eiArIFwiIFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHN0cmlwQW5kQ29sbGFwc2UoIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGN1clZhbHVlID0gZ2V0Q2xhc3MoIGVsZW0gKTtcblxuXHRcdFx0XHQvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHN0cmlwQW5kQ29sbGFwc2UoIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG5cdFx0dmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkudG9nZ2xlQ2xhc3MoXG5cdFx0XHRcdFx0dmFsdWUuY2FsbCggdGhpcywgaSwgZ2V0Q2xhc3MoIHRoaXMgKSwgc3RhdGVWYWwgKSxcblx0XHRcdFx0XHRzdGF0ZVZhbFxuXHRcdFx0XHQpO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNsYXNzTmFtZSwgaSwgc2VsZiwgY2xhc3NOYW1lcztcblxuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdC8vIFRvZ2dsZSBpbmRpdmlkdWFsIGNsYXNzIG5hbWVzXG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRzZWxmID0galF1ZXJ5KCB0aGlzICk7XG5cdFx0XHRcdGNsYXNzTmFtZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRcdHdoaWxlICggKCBjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0aWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcblx0XHRcdH0gZWxzZSBpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRcdGNsYXNzTmFtZSA9IGdldENsYXNzKCB0aGlzICk7XG5cdFx0XHRcdGlmICggY2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0Ly8gU3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIGNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcblx0XHRcdFx0Ly8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcblx0XHRcdFx0Ly8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuXHRcdFx0XHRpZiAoIHRoaXMuc2V0QXR0cmlidXRlICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID9cblx0XHRcdFx0XHRcdFwiXCIgOlxuXHRcdFx0XHRcdFx0ZGF0YVByaXYuZ2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSwgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Y2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiO1xuXHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHQoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggZ2V0Q2xhc3MoIGVsZW0gKSApICsgXCIgXCIgKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+IC0xICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSApO1xuXG5cblxuXG52YXIgcnJldHVybiA9IC9cXHIvZztcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR2YWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgaG9va3MsIHJldCwgaXNGdW5jdGlvbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgZWxlbS50eXBlIF0gfHxcblx0XHRcdFx0XHRqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiZcblx0XHRcdFx0XHRcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIFwidmFsdWVcIiApICkgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHQvLyBIYW5kbGUgbW9zdCBjb21tb24gc3RyaW5nIGNhc2VzXG5cdFx0XHRcdGlmICggdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0LnJlcGxhY2UoIHJyZXR1cm4sIFwiXCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEhhbmRsZSBjYXNlcyB3aGVyZSB2YWx1ZSBpcyBudWxsL3VuZGVmIG9yIG51bWJlclxuXHRcdFx0XHRyZXR1cm4gcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHR2YXIgdmFsO1xuXG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZS5jYWxsKCB0aGlzLCBpLCBqUXVlcnkoIHRoaXMgKS52YWwoKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHZhbCA9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBBcnJheS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0dmFsID0galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyB0aGlzLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIHRoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHQvLyBJZiBzZXQgcmV0dXJucyB1bmRlZmluZWQsIGZhbGwgYmFjayB0byBub3JtYWwgc2V0dGluZ1xuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8IGhvb2tzLnNldCggdGhpcywgdmFsLCBcInZhbHVlXCIgKSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHZhbEhvb2tzOiB7XG5cdFx0b3B0aW9uOiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHRcdHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAhPSBudWxsID9cblx0XHRcdFx0XHR2YWwgOlxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExIG9ubHlcblx0XHRcdFx0XHQvLyBvcHRpb24udGV4dCB0aHJvd3MgZXhjZXB0aW9ucyAoIzE0Njg2LCAjMTQ4NTgpXG5cdFx0XHRcdFx0Ly8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2Vcblx0XHRcdFx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNzdHJpcC1hbmQtY29sbGFwc2Utd2hpdGVzcGFjZVxuXHRcdFx0XHRcdHN0cmlwQW5kQ29sbGFwc2UoIGpRdWVyeS50ZXh0KCBlbGVtICkgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNlbGVjdDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHZhbHVlLCBvcHRpb24sIGksXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRpbmRleCA9IGVsZW0uc2VsZWN0ZWRJbmRleCxcblx0XHRcdFx0XHRvbmUgPSBlbGVtLnR5cGUgPT09IFwic2VsZWN0LW9uZVwiLFxuXHRcdFx0XHRcdHZhbHVlcyA9IG9uZSA/IG51bGwgOiBbXSxcblx0XHRcdFx0XHRtYXggPSBvbmUgPyBpbmRleCArIDEgOiBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHRpZiAoIGluZGV4IDwgMCApIHtcblx0XHRcdFx0XHRpID0gbWF4O1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aSA9IG9uZSA/IGluZGV4IDogMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIHNlbGVjdGVkIG9wdGlvbnNcblx0XHRcdFx0Zm9yICggOyBpIDwgbWF4OyBpKysgKSB7XG5cdFx0XHRcdFx0b3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHRcdFx0XHQvLyBJRTgtOSBkb2Vzbid0IHVwZGF0ZSBzZWxlY3RlZCBhZnRlciBmb3JtIHJlc2V0ICgjMjU1MSlcblx0XHRcdFx0XHRpZiAoICggb3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4ICkgJiZcblxuXHRcdFx0XHRcdFx0XHQvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHRcdFx0XHRcdCFvcHRpb24uZGlzYWJsZWQgJiZcblx0XHRcdFx0XHRcdFx0KCAhb3B0aW9uLnBhcmVudE5vZGUuZGlzYWJsZWQgfHxcblx0XHRcdFx0XHRcdFx0XHQhbm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgb3B0aW9uU2V0LCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHR2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuXHRcdFx0XHRcdGkgPSBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXG5cdFx0XHRcdFx0aWYgKCBvcHRpb24uc2VsZWN0ZWQgPVxuXHRcdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGpRdWVyeS52YWxIb29rcy5vcHRpb24uZ2V0KCBvcHRpb24gKSwgdmFsdWVzICkgPiAtMVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0b3B0aW9uU2V0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSBicm93c2VycyB0byBiZWhhdmUgY29uc2lzdGVudGx5IHdoZW4gbm9uLW1hdGNoaW5nIHZhbHVlIGlzIHNldFxuXHRcdFx0XHRpZiAoICFvcHRpb25TZXQgKSB7XG5cdFx0XHRcdFx0ZWxlbS5zZWxlY3RlZEluZGV4ID0gLTE7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gUmFkaW9zIGFuZCBjaGVja2JveGVzIGdldHRlci9zZXR0ZXJcbmpRdWVyeS5lYWNoKCBbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSggZWxlbSApLnZhbCgpLCB2YWx1ZSApID4gLTEgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcblx0XHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXS5nZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbnZhciByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcblx0c3RvcFByb3BhZ2F0aW9uQ2FsbGJhY2sgPSBmdW5jdGlvbiggZSApIHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9O1xuXG5qUXVlcnkuZXh0ZW5kKCBqUXVlcnkuZXZlbnQsIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggZXZlbnQsIGRhdGEsIGVsZW0sIG9ubHlIYW5kbGVycyApIHtcblxuXHRcdHZhciBpLCBjdXIsIHRtcCwgYnViYmxlVHlwZSwgb250eXBlLCBoYW5kbGUsIHNwZWNpYWwsIGxhc3RFbGVtZW50LFxuXHRcdFx0ZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG5cdFx0XHR0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KCBcIi5cIiApIDogW107XG5cblx0XHRjdXIgPSBsYXN0RWxlbWVudCA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gRG9uJ3QgZG8gZXZlbnRzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcblx0XHRpZiAoIHJmb2N1c01vcnBoLnRlc3QoIHR5cGUgKyBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlLmluZGV4T2YoIFwiLlwiICkgPiAtMSApIHtcblxuXHRcdFx0Ly8gTmFtZXNwYWNlZCB0cmlnZ2VyOyBjcmVhdGUgYSByZWdleHAgdG8gbWF0Y2ggZXZlbnQgdHlwZSBpbiBoYW5kbGUoKVxuXHRcdFx0bmFtZXNwYWNlcyA9IHR5cGUuc3BsaXQoIFwiLlwiICk7XG5cdFx0XHR0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xuXHRcdFx0bmFtZXNwYWNlcy5zb3J0KCk7XG5cdFx0fVxuXHRcdG9udHlwZSA9IHR5cGUuaW5kZXhPZiggXCI6XCIgKSA8IDAgJiYgXCJvblwiICsgdHlwZTtcblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhIGpRdWVyeS5FdmVudCBvYmplY3QsIE9iamVjdCwgb3IganVzdCBhbiBldmVudCB0eXBlIHN0cmluZ1xuXHRcdGV2ZW50ID0gZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuXHRcdFx0ZXZlbnQgOlxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCggdHlwZSwgdHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiICYmIGV2ZW50ICk7XG5cblx0XHQvLyBUcmlnZ2VyIGJpdG1hc2s6ICYgMSBmb3IgbmF0aXZlIGhhbmRsZXJzOyAmIDIgZm9yIGpRdWVyeSAoYWx3YXlzIHRydWUpXG5cdFx0ZXZlbnQuaXNUcmlnZ2VyID0gb25seUhhbmRsZXJzID8gMiA6IDM7XG5cdFx0ZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApO1xuXHRcdGV2ZW50LnJuYW1lc3BhY2UgPSBldmVudC5uYW1lc3BhY2UgP1xuXHRcdFx0bmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICkgOlxuXHRcdFx0bnVsbDtcblxuXHRcdC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxuXHRcdGV2ZW50LnJlc3VsdCA9IHVuZGVmaW5lZDtcblx0XHRpZiAoICFldmVudC50YXJnZXQgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBlbGVtO1xuXHRcdH1cblxuXHRcdC8vIENsb25lIGFueSBpbmNvbWluZyBkYXRhIGFuZCBwcmVwZW5kIHRoZSBldmVudCwgY3JlYXRpbmcgdGhlIGhhbmRsZXIgYXJnIGxpc3Rcblx0XHRkYXRhID0gZGF0YSA9PSBudWxsID9cblx0XHRcdFsgZXZlbnQgXSA6XG5cdFx0XHRqUXVlcnkubWFrZUFycmF5KCBkYXRhLCBbIGV2ZW50IF0gKTtcblxuXHRcdC8vIEFsbG93IHNwZWNpYWwgZXZlbnRzIHRvIGRyYXcgb3V0c2lkZSB0aGUgbGluZXNcblx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgc3BlY2lhbC50cmlnZ2VyICYmIHNwZWNpYWwudHJpZ2dlci5hcHBseSggZWxlbSwgZGF0YSApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgZXZlbnQgcHJvcGFnYXRpb24gcGF0aCBpbiBhZHZhbmNlLCBwZXIgVzNDIGV2ZW50cyBzcGVjICgjOTk1MSlcblx0XHQvLyBCdWJibGUgdXAgdG8gZG9jdW1lbnQsIHRoZW4gdG8gd2luZG93OyB3YXRjaCBmb3IgYSBnbG9iYWwgb3duZXJEb2N1bWVudCB2YXIgKCM5NzI0KVxuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhc3BlY2lhbC5ub0J1YmJsZSAmJiAhaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0YnViYmxlVHlwZSA9IHNwZWNpYWwuZGVsZWdhdGVUeXBlIHx8IHR5cGU7XG5cdFx0XHRpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuXHRcdFx0XHRjdXIgPSBjdXIucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHRcdGZvciAoIDsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIGN1ciApO1xuXHRcdFx0XHR0bXAgPSBjdXI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9ubHkgYWRkIHdpbmRvdyBpZiB3ZSBnb3QgdG8gZG9jdW1lbnQgKGUuZy4sIG5vdCBwbGFpbiBvYmogb3IgZGV0YWNoZWQgRE9NKVxuXHRcdFx0aWYgKCB0bXAgPT09ICggZWxlbS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50ICkgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKCB0bXAuZGVmYXVsdFZpZXcgfHwgdG1wLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGaXJlIGhhbmRsZXJzIG9uIHRoZSBldmVudCBwYXRoXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGV2ZW50UGF0aFsgaSsrIF0gKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdGxhc3RFbGVtZW50ID0gY3VyO1xuXHRcdFx0ZXZlbnQudHlwZSA9IGkgPiAxID9cblx0XHRcdFx0YnViYmxlVHlwZSA6XG5cdFx0XHRcdHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZTtcblxuXHRcdFx0Ly8galF1ZXJ5IGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9ICggZGF0YVByaXYuZ2V0KCBjdXIsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gJiZcblx0XHRcdFx0ZGF0YVByaXYuZ2V0KCBjdXIsIFwiaGFuZGxlXCIgKTtcblx0XHRcdGlmICggaGFuZGxlICkge1xuXHRcdFx0XHRoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOYXRpdmUgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gb250eXBlICYmIGN1clsgb250eXBlIF07XG5cdFx0XHRpZiAoIGhhbmRsZSAmJiBoYW5kbGUuYXBwbHkgJiYgYWNjZXB0RGF0YSggY3VyICkgKSB7XG5cdFx0XHRcdGV2ZW50LnJlc3VsdCA9IGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnR5cGUgPSB0eXBlO1xuXG5cdFx0Ly8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cblx0XHRcdGlmICggKCAhc3BlY2lhbC5fZGVmYXVsdCB8fFxuXHRcdFx0XHRzcGVjaWFsLl9kZWZhdWx0LmFwcGx5KCBldmVudFBhdGgucG9wKCksIGRhdGEgKSA9PT0gZmFsc2UgKSAmJlxuXHRcdFx0XHRhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cblx0XHRcdFx0Ly8gQ2FsbCBhIG5hdGl2ZSBET00gbWV0aG9kIG9uIHRoZSB0YXJnZXQgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIHRoZSBldmVudC5cblx0XHRcdFx0Ly8gRG9uJ3QgZG8gZGVmYXVsdCBhY3Rpb25zIG9uIHdpbmRvdywgdGhhdCdzIHdoZXJlIGdsb2JhbCB2YXJpYWJsZXMgYmUgKCM2MTcwKVxuXHRcdFx0XHRpZiAoIG9udHlwZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggZWxlbVsgdHlwZSBdICkgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG5cdFx0XHRcdFx0dG1wID0gZWxlbVsgb250eXBlIF07XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXG5cdFx0XHRcdFx0aWYgKCBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0XHRcdFx0bGFzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgc3RvcFByb3BhZ2F0aW9uQ2FsbGJhY2sgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtWyB0eXBlIF0oKTtcblxuXHRcdFx0XHRcdGlmICggZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdFx0XHRcdGxhc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcblx0Ly8gVXNlZCBvbmx5IGZvciBgZm9jdXMoaW4gfCBvdXQpYCBldmVudHNcblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWVcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIGUsIG51bGwsIGVsZW0gKTtcblx0fVxuXG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSApO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cblxualF1ZXJ5LmVhY2goICggXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgcmVzaXplIHNjcm9sbCBjbGljayBkYmxjbGljayBcIiArXG5cdFwibW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgXCIgK1xuXHRcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgY29udGV4dG1lbnVcIiApLnNwbGl0KCBcIiBcIiApLFxuXHRmdW5jdGlvbiggaSwgbmFtZSApIHtcblxuXHQvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuXHRcdFx0dGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XG5cdFx0XHR0aGlzLnRyaWdnZXIoIG5hbWUgKTtcblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG5cdH1cbn0gKTtcblxuXG5cblxuc3VwcG9ydC5mb2N1c2luID0gXCJvbmZvY3VzaW5cIiBpbiB3aW5kb3c7XG5cblxudmFyXG5cdHJicmFja2V0ID0gL1xcW1xcXSQvLFxuXHRyQ1JMRiA9IC9cXHI/XFxuL2csXG5cdHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcblx0cnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XG5cdHZhciBuYW1lO1xuXG5cdGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cblx0XHRcdFx0Ly8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuXHRcdFx0XHRhZGQoIHByZWZpeCwgdiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEl0ZW0gaXMgbm9uLXNjYWxhciAoYXJyYXkgb3Igb2JqZWN0KSwgZW5jb2RlIGl0cyBudW1lcmljIGluZGV4LlxuXHRcdFx0XHRidWlsZFBhcmFtcyhcblx0XHRcdFx0XHRwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPSBudWxsID8gaSA6IFwiXCIgKSArIFwiXVwiLFxuXHRcdFx0XHRcdHYsXG5cdFx0XHRcdFx0dHJhZGl0aW9uYWwsXG5cdFx0XHRcdFx0YWRkXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG5cdFx0YWRkKCBwcmVmaXgsIG9iaiApO1xuXHR9XG59XG5cbi8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcbmpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcblx0dmFyIHByZWZpeCxcblx0XHRzID0gW10sXG5cdFx0YWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWVPckZ1bmN0aW9uICkge1xuXG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHVzZSBpdHMgcmV0dXJuIHZhbHVlXG5cdFx0XHR2YXIgdmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWVPckZ1bmN0aW9uICkgP1xuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb24oKSA6XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbjtcblxuXHRcdFx0c1sgcy5sZW5ndGggXSA9IGVuY29kZVVSSUNvbXBvbmVudCgga2V5ICkgKyBcIj1cIiArXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCggdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSApO1xuXHRcdH07XG5cblx0Ly8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cblx0aWYgKCBBcnJheS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG5cdFx0alF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xuXHRcdFx0YWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcblx0XHR9ICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG5cdFx0Ly8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG5cdFx0Zm9yICggcHJlZml4IGluIGEgKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cblx0cmV0dXJuIHMuam9pbiggXCImXCIgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0c2VyaWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5LnBhcmFtKCB0aGlzLnNlcmlhbGl6ZUFycmF5KCkgKTtcblx0fSxcblx0c2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcblx0XHRcdHZhciBlbGVtZW50cyA9IGpRdWVyeS5wcm9wKCB0aGlzLCBcImVsZW1lbnRzXCIgKTtcblx0XHRcdHJldHVybiBlbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIGVsZW1lbnRzICkgOiB0aGlzO1xuXHRcdH0gKVxuXHRcdC5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cblx0XHRcdC8vIFVzZSAuaXMoIFwiOmRpc2FibGVkXCIgKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuXHRcdFx0XHRyc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcblx0XHR9IClcblx0XHQubWFwKCBmdW5jdGlvbiggaSwgZWxlbSApIHtcblx0XHRcdHZhciB2YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcblxuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdH0gKS5nZXQoKTtcblx0fVxufSApO1xuXG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA4IG9ubHlcbi8vIEluIFNhZmFyaSA4IGRvY3VtZW50cyBjcmVhdGVkIHZpYSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnRcbi8vIGNvbGxhcHNlIHNpYmxpbmcgZm9ybXM6IHRoZSBzZWNvbmQgb25lIGJlY29tZXMgYSBjaGlsZCBvZiB0aGUgZmlyc3Qgb25lLlxuLy8gQmVjYXVzZSBvZiB0aGF0LCB0aGlzIHNlY3VyaXR5IG1lYXN1cmUgaGFzIHRvIGJlIGRpc2FibGVkIGluIFNhZmFyaSA4LlxuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNzMzN1xuc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgPSAoIGZ1bmN0aW9uKCkge1xuXHR2YXIgYm9keSA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApLmJvZHk7XG5cdGJvZHkuaW5uZXJIVE1MID0gXCI8Zm9ybT48L2Zvcm0+PGZvcm0+PC9mb3JtPlwiO1xuXHRyZXR1cm4gYm9keS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMjtcbn0gKSgpO1xuXG5cbi8vIEFyZ3VtZW50IFwiZGF0YVwiIHNob3VsZCBiZSBzdHJpbmcgb2YgaHRtbFxuLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LFxuLy8gZGVmYXVsdHMgdG8gZG9jdW1lbnRcbi8vIGtlZXBTY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcbmpRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwga2VlcFNjcmlwdHMgKSB7XG5cdGlmICggdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGtlZXBTY3JpcHRzID0gY29udGV4dDtcblx0XHRjb250ZXh0ID0gZmFsc2U7XG5cdH1cblxuXHR2YXIgYmFzZSwgcGFyc2VkLCBzY3JpcHRzO1xuXG5cdGlmICggIWNvbnRleHQgKSB7XG5cblx0XHQvLyBTdG9wIHNjcmlwdHMgb3IgaW5saW5lIGV2ZW50IGhhbmRsZXJzIGZyb20gYmVpbmcgZXhlY3V0ZWQgaW1tZWRpYXRlbHlcblx0XHQvLyBieSB1c2luZyBkb2N1bWVudC5pbXBsZW1lbnRhdGlvblxuXHRcdGlmICggc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgKSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICk7XG5cblx0XHRcdC8vIFNldCB0aGUgYmFzZSBocmVmIGZvciB0aGUgY3JlYXRlZCBkb2N1bWVudFxuXHRcdFx0Ly8gc28gYW55IHBhcnNlZCBlbGVtZW50cyB3aXRoIFVSTHNcblx0XHRcdC8vIGFyZSBiYXNlZCBvbiB0aGUgZG9jdW1lbnQncyBVUkwgKGdoLTI5NjUpXG5cdFx0XHRiYXNlID0gY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImJhc2VcIiApO1xuXHRcdFx0YmFzZS5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblx0XHRcdGNvbnRleHQuaGVhZC5hcHBlbmRDaGlsZCggYmFzZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0cGFyc2VkID0gcnNpbmdsZVRhZy5leGVjKCBkYXRhICk7XG5cdHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cblx0Ly8gU2luZ2xlIHRhZ1xuXHRpZiAoIHBhcnNlZCApIHtcblx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsgMSBdICkgXTtcblx0fVxuXG5cdHBhcnNlZCA9IGJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cblx0aWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuXHRcdGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbmpRdWVyeS5vZmZzZXQgPSB7XG5cdHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XG5cdFx0dmFyIGN1clBvc2l0aW9uLCBjdXJMZWZ0LCBjdXJDU1NUb3AsIGN1clRvcCwgY3VyT2Zmc2V0LCBjdXJDU1NMZWZ0LCBjYWxjdWxhdGVQb3NpdGlvbixcblx0XHRcdHBvc2l0aW9uID0galF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICksXG5cdFx0XHRjdXJFbGVtID0galF1ZXJ5KCBlbGVtICksXG5cdFx0XHRwcm9wcyA9IHt9O1xuXG5cdFx0Ly8gU2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuXHRcdGlmICggcG9zaXRpb24gPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHRcdH1cblxuXHRcdGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCk7XG5cdFx0Y3VyQ1NTVG9wID0galF1ZXJ5LmNzcyggZWxlbSwgXCJ0b3BcIiApO1xuXHRcdGN1ckNTU0xlZnQgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImxlZnRcIiApO1xuXHRcdGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJlxuXHRcdFx0KCBjdXJDU1NUb3AgKyBjdXJDU1NMZWZ0ICkuaW5kZXhPZiggXCJhdXRvXCIgKSA+IC0xO1xuXG5cdFx0Ly8gTmVlZCB0byBiZSBhYmxlIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbiBpZiBlaXRoZXJcblx0XHQvLyB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcblx0XHRpZiAoIGNhbGN1bGF0ZVBvc2l0aW9uICkge1xuXHRcdFx0Y3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG5cdFx0XHRjdXJUb3AgPSBjdXJQb3NpdGlvbi50b3A7XG5cdFx0XHRjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuXHRcdFx0Y3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcblxuXHRcdFx0Ly8gVXNlIGpRdWVyeS5leHRlbmQgaGVyZSB0byBhbGxvdyBtb2RpZmljYXRpb24gb2YgY29vcmRpbmF0ZXMgYXJndW1lbnQgKGdoLTE4NDgpXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucy5jYWxsKCBlbGVtLCBpLCBqUXVlcnkuZXh0ZW5kKCB7fSwgY3VyT2Zmc2V0ICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdGlvbnMudG9wICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy50b3AgPSAoIG9wdGlvbnMudG9wIC0gY3VyT2Zmc2V0LnRvcCApICsgY3VyVG9wO1xuXHRcdH1cblx0XHRpZiAoIG9wdGlvbnMubGVmdCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMubGVmdCA9ICggb3B0aW9ucy5sZWZ0IC0gY3VyT2Zmc2V0LmxlZnQgKSArIGN1ckxlZnQ7XG5cdFx0fVxuXG5cdFx0aWYgKCBcInVzaW5nXCIgaW4gb3B0aW9ucyApIHtcblx0XHRcdG9wdGlvbnMudXNpbmcuY2FsbCggZWxlbSwgcHJvcHMgKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJFbGVtLmNzcyggcHJvcHMgKTtcblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHQvLyBvZmZzZXQoKSByZWxhdGVzIGFuIGVsZW1lbnQncyBib3JkZXIgYm94IHRvIHRoZSBkb2N1bWVudCBvcmlnaW5cblx0b2Zmc2V0OiBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHRcdC8vIFByZXNlcnZlIGNoYWluaW5nIGZvciBzZXR0ZXJcblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0dGhpcyA6XG5cdFx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5Lm9mZnNldC5zZXRPZmZzZXQoIHRoaXMsIG9wdGlvbnMsIGkgKTtcblx0XHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHZhciByZWN0LCB3aW4sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gemVyb3MgZm9yIGRpc2Nvbm5lY3RlZCBhbmQgaGlkZGVuIChkaXNwbGF5OiBub25lKSBlbGVtZW50cyAoZ2gtMjMxMClcblx0XHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0XHQvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhXG5cdFx0Ly8gZGlzY29ubmVjdGVkIG5vZGUgaW4gSUUgdGhyb3dzIGFuIGVycm9yXG5cdFx0aWYgKCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiB7IHRvcDogMCwgbGVmdDogMCB9O1xuXHRcdH1cblxuXHRcdC8vIEdldCBkb2N1bWVudC1yZWxhdGl2ZSBwb3NpdGlvbiBieSBhZGRpbmcgdmlld3BvcnQgc2Nyb2xsIHRvIHZpZXdwb3J0LXJlbGF0aXZlIGdCQ1Jcblx0XHRyZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHR3aW4gPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG5cdFx0XHRsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXRcblx0XHR9O1xuXHR9LFxuXG5cdC8vIHBvc2l0aW9uKCkgcmVsYXRlcyBhbiBlbGVtZW50J3MgbWFyZ2luIGJveCB0byBpdHMgb2Zmc2V0IHBhcmVudCdzIHBhZGRpbmcgYm94XG5cdC8vIFRoaXMgY29ycmVzcG9uZHMgdG8gdGhlIGJlaGF2aW9yIG9mIENTUyBhYnNvbHV0ZSBwb3NpdGlvbmluZ1xuXHRwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAhdGhpc1sgMCBdICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCwgZG9jLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cblx0XHQvLyBwb3NpdGlvbjpmaXhlZCBlbGVtZW50cyBhcmUgb2Zmc2V0IGZyb20gdGhlIHZpZXdwb3J0LCB3aGljaCBpdHNlbGYgYWx3YXlzIGhhcyB6ZXJvIG9mZnNldFxuXHRcdGlmICggalF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICkgPT09IFwiZml4ZWRcIiApIHtcblxuXHRcdFx0Ly8gQXNzdW1lIHBvc2l0aW9uOmZpeGVkIGltcGxpZXMgYXZhaWxhYmlsaXR5IG9mIGdldEJvdW5kaW5nQ2xpZW50UmVjdFxuXHRcdFx0b2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRvZmZzZXQgPSB0aGlzLm9mZnNldCgpO1xuXG5cdFx0XHQvLyBBY2NvdW50IGZvciB0aGUgKnJlYWwqIG9mZnNldCBwYXJlbnQsIHdoaWNoIGNhbiBiZSB0aGUgZG9jdW1lbnQgb3IgaXRzIHJvb3QgZWxlbWVudFxuXHRcdFx0Ly8gd2hlbiBhIHN0YXRpY2FsbHkgcG9zaXRpb25lZCBlbGVtZW50IGlzIGlkZW50aWZpZWRcblx0XHRcdGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudDtcblx0XHRcdG9mZnNldFBhcmVudCA9IGVsZW0ub2Zmc2V0UGFyZW50IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHR3aGlsZSAoIG9mZnNldFBhcmVudCAmJlxuXHRcdFx0XHQoIG9mZnNldFBhcmVudCA9PT0gZG9jLmJvZHkgfHwgb2Zmc2V0UGFyZW50ID09PSBkb2MuZG9jdW1lbnRFbGVtZW50ICkgJiZcblx0XHRcdFx0alF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcblxuXHRcdFx0XHRvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHRcdGlmICggb2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCAhPT0gZWxlbSAmJiBvZmZzZXRQYXJlbnQubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0Ly8gSW5jb3Jwb3JhdGUgYm9yZGVycyBpbnRvIGl0cyBvZmZzZXQsIHNpbmNlIHRoZXkgYXJlIG91dHNpZGUgaXRzIGNvbnRlbnQgb3JpZ2luXG5cdFx0XHRcdHBhcmVudE9mZnNldCA9IGpRdWVyeSggb2Zmc2V0UGFyZW50ICkub2Zmc2V0KCk7XG5cdFx0XHRcdHBhcmVudE9mZnNldC50b3AgKz0galF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcImJvcmRlclRvcFdpZHRoXCIsIHRydWUgKTtcblx0XHRcdFx0cGFyZW50T2Zmc2V0LmxlZnQgKz0galF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU3VidHJhY3QgcGFyZW50IG9mZnNldHMgYW5kIGVsZW1lbnQgbWFyZ2luc1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IG9mZnNldC50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5Ub3BcIiwgdHJ1ZSApLFxuXHRcdFx0bGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luTGVmdFwiLCB0cnVlIClcblx0XHR9O1xuXHR9LFxuXG5cdC8vIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGRvY3VtZW50RWxlbWVudCBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOlxuXHQvLyAxKSBGb3IgdGhlIGVsZW1lbnQgaW5zaWRlIHRoZSBpZnJhbWUgd2l0aG91dCBvZmZzZXRQYXJlbnQsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuXG5cdC8vICAgIGRvY3VtZW50RWxlbWVudCBvZiB0aGUgcGFyZW50IHdpbmRvd1xuXHQvLyAyKSBGb3IgdGhlIGhpZGRlbiBvciBkZXRhY2hlZCBlbGVtZW50XG5cdC8vIDMpIEZvciBib2R5IG9yIGh0bWwgZWxlbWVudCwgaS5lLiBpbiBjYXNlIG9mIHRoZSBodG1sIG5vZGUgLSBpdCB3aWxsIHJldHVybiBpdHNlbGZcblx0Ly9cblx0Ly8gYnV0IHRob3NlIGV4Y2VwdGlvbnMgd2VyZSBuZXZlciBwcmVzZW50ZWQgYXMgYSByZWFsIGxpZmUgdXNlLWNhc2VzXG5cdC8vIGFuZCBtaWdodCBiZSBjb25zaWRlcmVkIGFzIG1vcmUgcHJlZmVyYWJsZSByZXN1bHRzLlxuXHQvL1xuXHQvLyBUaGlzIGxvZ2ljLCBob3dldmVyLCBpcyBub3QgZ3VhcmFudGVlZCBhbmQgY2FuIGNoYW5nZSBhdCBhbnkgcG9pbnQgaW4gdGhlIGZ1dHVyZVxuXHRvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQ7XG5cblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRcdG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnRFbGVtZW50O1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG4vLyBDcmVhdGUgc2Nyb2xsTGVmdCBhbmQgc2Nyb2xsVG9wIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IHNjcm9sbExlZnQ6IFwicGFnZVhPZmZzZXRcIiwgc2Nyb2xsVG9wOiBcInBhZ2VZT2Zmc2V0XCIgfSwgZnVuY3Rpb24oIG1ldGhvZCwgcHJvcCApIHtcblx0dmFyIHRvcCA9IFwicGFnZVlPZmZzZXRcIiA9PT0gcHJvcDtcblxuXHRqUXVlcnkuZm5bIG1ldGhvZCBdID0gZnVuY3Rpb24oIHZhbCApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbWV0aG9kLCB2YWwgKSB7XG5cblx0XHRcdC8vIENvYWxlc2NlIGRvY3VtZW50cyBhbmQgd2luZG93c1xuXHRcdFx0dmFyIHdpbjtcblx0XHRcdGlmICggaXNXaW5kb3coIGVsZW0gKSApIHtcblx0XHRcdFx0d2luID0gZWxlbTtcblx0XHRcdH0gZWxzZSBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHdpbiA9IGVsZW0uZGVmYXVsdFZpZXc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiB3aW4gPyB3aW5bIHByb3AgXSA6IGVsZW1bIG1ldGhvZCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHdpbiApIHtcblx0XHRcdFx0d2luLnNjcm9sbFRvKFxuXHRcdFx0XHRcdCF0b3AgPyB2YWwgOiB3aW4ucGFnZVhPZmZzZXQsXG5cdFx0XHRcdFx0dG9wID8gdmFsIDogd2luLnBhZ2VZT2Zmc2V0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1bIG1ldGhvZCBdID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0sIG1ldGhvZCwgdmFsLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH07XG59ICk7XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA8PTcgLSA5LjEsIENocm9tZSA8PTM3IC0gNDlcbi8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXG4vLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcbi8vIEJsaW5rIGJ1ZzogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NTg5MzQ3XG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0O1xuLy8gcmF0aGVyIHRoYW4gbWFrZSB0aGUgY3NzIG1vZHVsZSBkZXBlbmQgb24gdGhlIG9mZnNldCBtb2R1bGUsIGp1c3QgY2hlY2sgZm9yIGl0IGhlcmVcbmpRdWVyeS5lYWNoKCBbIFwidG9wXCIsIFwibGVmdFwiIF0sIGZ1bmN0aW9uKCBpLCBwcm9wICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByb3AgXSA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5waXhlbFBvc2l0aW9uLFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGNvbXB1dGVkID0gY3VyQ1NTKCBlbGVtLCBwcm9wICk7XG5cblx0XHRcdFx0Ly8gSWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XG5cdFx0XHRcdHJldHVybiBybnVtbm9ucHgudGVzdCggY29tcHV0ZWQgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBlbGVtICkucG9zaXRpb24oKVsgcHJvcCBdICsgXCJweFwiIDpcblx0XHRcdFx0XHRjb21wdXRlZDtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59ICk7XG5cblxuLy8gQ3JlYXRlIGlubmVySGVpZ2h0LCBpbm5lcldpZHRoLCBoZWlnaHQsIHdpZHRoLCBvdXRlckhlaWdodCBhbmQgb3V0ZXJXaWR0aCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBIZWlnaHQ6IFwiaGVpZ2h0XCIsIFdpZHRoOiBcIndpZHRoXCIgfSwgZnVuY3Rpb24oIG5hbWUsIHR5cGUgKSB7XG5cdGpRdWVyeS5lYWNoKCB7IHBhZGRpbmc6IFwiaW5uZXJcIiArIG5hbWUsIGNvbnRlbnQ6IHR5cGUsIFwiXCI6IFwib3V0ZXJcIiArIG5hbWUgfSxcblx0XHRmdW5jdGlvbiggZGVmYXVsdEV4dHJhLCBmdW5jTmFtZSApIHtcblxuXHRcdC8vIE1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuXHRcdGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuXHRcdFx0dmFyIGNoYWluYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKCBkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIgKSxcblx0XHRcdFx0ZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG5cdFx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgdHlwZSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBkb2M7XG5cblx0XHRcdFx0aWYgKCBpc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRcdFx0Ly8gJCggd2luZG93ICkub3V0ZXJXaWR0aC9IZWlnaHQgcmV0dXJuIHcvaCBpbmNsdWRpbmcgc2Nyb2xsYmFycyAoZ2gtMTcyOSlcblx0XHRcdFx0XHRyZXR1cm4gZnVuY05hbWUuaW5kZXhPZiggXCJvdXRlclwiICkgPT09IDAgP1xuXHRcdFx0XHRcdFx0ZWxlbVsgXCJpbm5lclwiICsgbmFtZSBdIDpcblx0XHRcdFx0XHRcdGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBcImNsaWVudFwiICsgbmFtZSBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gR2V0IGRvY3VtZW50IHdpZHRoIG9yIGhlaWdodFxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0ZG9jID0gZWxlbS5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRcdFx0XHQvLyBFaXRoZXIgc2Nyb2xsW1dpZHRoL0hlaWdodF0gb3Igb2Zmc2V0W1dpZHRoL0hlaWdodF0gb3IgY2xpZW50W1dpZHRoL0hlaWdodF0sXG5cdFx0XHRcdFx0Ly8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcInNjcm9sbFwiICsgbmFtZSBdLCBkb2NbIFwic2Nyb2xsXCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGRvY1sgXCJjbGllbnRcIiArIG5hbWUgXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cblx0XHRcdFx0XHQvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgdHlwZSwgZXh0cmEgKSA6XG5cblx0XHRcdFx0XHQvLyBTZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50XG5cdFx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCB0eXBlLCB2YWx1ZSwgZXh0cmEgKTtcblx0XHRcdH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlICk7XG5cdFx0fTtcblx0fSApO1xufSApO1xuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeTtcblx0fSApO1xufVxuXG5cblxuXG52YXJcblxuXHQvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0X2pRdWVyeSA9IHdpbmRvdy5qUXVlcnksXG5cblx0Ly8gTWFwIG92ZXIgdGhlICQgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0XyQgPSB3aW5kb3cuJDtcblxualF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcblx0aWYgKCB3aW5kb3cuJCA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy4kID0gXyQ7XG5cdH1cblxuXHRpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeTtcbn07XG5cbi8vIEV4cG9zZSBqUXVlcnkgYW5kICQgaWRlbnRpZmllcnMsIGV2ZW4gaW4gQU1EXG4vLyAoIzcxMDIjY29tbWVudDoxMCwgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC81NTcpXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXG5pZiAoICFub0dsb2JhbCApIHtcblx0d2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xufVxuXG5cblxuXG5cbnZhciByZWFkeUNhbGxiYWNrcyA9IFtdLFxuXHR3aGVuUmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cdFx0cmVhZHlDYWxsYmFja3MucHVzaCggZm4gKTtcblx0fSxcblx0ZXhlY3V0ZVJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXG5cdFx0Ly8gUHJldmVudCBlcnJvcnMgZnJvbSBmcmVlemluZyBmdXR1cmUgY2FsbGJhY2sgZXhlY3V0aW9uIChnaC0xODIzKVxuXHRcdC8vIE5vdCBiYWNrd2FyZHMtY29tcGF0aWJsZSBhcyB0aGlzIGRvZXMgbm90IGV4ZWN1dGUgc3luY1xuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdGZuLmNhbGwoIGRvY3VtZW50LCBqUXVlcnkgKTtcblx0XHR9ICk7XG5cdH07XG5cbmpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblx0d2hlblJlYWR5KCBmbiApO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxuXHRpc1JlYWR5OiBmYWxzZSxcblxuXHQvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXG5cdC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXG5cdHJlYWR5V2FpdDogMSxcblxuXHRyZWFkeTogZnVuY3Rpb24oIHdhaXQgKSB7XG5cblx0XHQvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XG5cdFx0aWYgKCB3YWl0ID09PSB0cnVlID8gLS1qUXVlcnkucmVhZHlXYWl0IDogalF1ZXJ5LmlzUmVhZHkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmVtZW1iZXIgdGhhdCB0aGUgRE9NIGlzIHJlYWR5XG5cdFx0alF1ZXJ5LmlzUmVhZHkgPSB0cnVlO1xuXG5cdFx0Ly8gSWYgYSBub3JtYWwgRE9NIFJlYWR5IGV2ZW50IGZpcmVkLCBkZWNyZW1lbnQsIGFuZCB3YWl0IGlmIG5lZWQgYmVcblx0XHRpZiAoIHdhaXQgIT09IHRydWUgJiYgLS1qUXVlcnkucmVhZHlXYWl0ID4gMCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR3aGVuUmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRyZWFkeUNhbGxiYWNrcy5wdXNoKCBmbiApO1xuXG5cdFx0XHR3aGlsZSAoIHJlYWR5Q2FsbGJhY2tzLmxlbmd0aCApIHtcblx0XHRcdFx0Zm4gPSByZWFkeUNhbGxiYWNrcy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuXHRcdFx0XHRcdGV4ZWN1dGVSZWFkeSggZm4gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR3aGVuUmVhZHkoKTtcblx0fVxufSApO1xuXG4vLyBNYWtlIGpRdWVyeS5yZWFkeSBQcm9taXNlIGNvbnN1bWFibGUgKGdoLTE3NzgpXG5qUXVlcnkucmVhZHkudGhlbiA9IGpRdWVyeS5mbi5yZWFkeTtcblxuLyoqXG4gKiBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuICovXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcblx0alF1ZXJ5LnJlYWR5KCk7XG59XG5cbi8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkXG4vLyBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cbi8vIFN1cHBvcnQ6IElFOS0xMCBvbmx5XG4vLyBPbGRlciBJRSBzb21ldGltZXMgc2lnbmFscyBcImludGVyYWN0aXZlXCIgdG9vIHNvb25cbmlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8XG5cdCggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXG5cdC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuXHR3aW5kb3cuc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cbn0gZWxzZSB7XG5cblx0Ly8gVXNlIHRoZSBoYW5keSBldmVudCBjYWxsYmFja1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkICk7XG5cblx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcbn1cblxuXG5cbnJldHVybiBqUXVlcnk7XG59ICk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvanFtaW4vanF1ZXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuXG5sZXQgVUlfSU5TVEFOQ0VfSUQgPSAwO1xuXG4vKipcbiAqICBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlDb3JlIHtcblxuICBzdGF0aWMgZ2V0SW5zdGFuY2VJZCgpIHtcbiAgICByZXR1cm4gVUlfSU5TVEFOQ0VfSUQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmluc3RhbmNlSWQgPSBBWDZVSUNvcmUuZ2V0SW5zdGFuY2VJZCgpO1xuXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqIEByZXR1cm4ge0FYNlVJQ29yZX1cbiAgICovXG4gIHNldENvbmZpZyhjb25maWcpIHtcbiAgICBqUXVlcnkuZXh0ZW5kKHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVUnqsIAg7IOd7ISx65CgIOuVjCwgY29uZmlnIOyGjeyEseydtCDrsJTrgJTrlYwg7Zi47LacIOuQmOuKlCDrgrTrtoAg66mU7ISc65OcXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXQoKSB7IC8vIOy0iOq4sO2ZlCDtlajsiJgsXG5cbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogVUnqsIAg656c642U66eBIOuQoCDrlYwgMe2ajOunjCDtmLjstpzrkJjripQg66mU7IaM65OcIHJlcGFpbnTqsIAg7ZWE7JqU7ZWcIOyDge2ZqeyXlCDrs4Trj4TsnZggcmVwYWludCDrqZTshJzrk5zrpbwg7J207Jqp7ZWgIOqyg+ydhCDqtozsnqVcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7IC8vIDHtmozrp4wg7Zi47Lac65CY7Ja07JW8IO2VmOuKlCDstIjquLDtmZQg7ZWo7IiYXG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIC8vXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgZGVzdG9yeSgpIHtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJQ29yZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJQ29yZS5qcyIsIi8qIVxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdGhvbWFzSmFuZy9tdXN0YWNoZS5qcyAtLSBpbXBvcm92ZSBzb21lIHZhcmlhYmxlc1xuICovXG5cblxuLyoqXG4gKiBBWDZNdXN0YWNoZeuKlCBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpz7JeQIOuqh+qwgOyngCDstZzshoztlZzsnZgg6riw64ql7J2EIO2KnOuLne2VmOyXrCDsgqzsmqntlZjripQg7YWc7ZSM66a/IOyXlOynhOyeheuLiOuLpC5cbiAqIEBuYW1lc3BhY2UgQVg2TXVzdGFjaGVcbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgQVg2TXVzdGFjaGUucmVuZGVyXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGF4NS5tdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcpXG4gKlxuICpcbiAqIC8vQXJyYXkgQGlcbiAqIC8ve3sjYmVhdGxlc319XG4gKiAvL3t7Zmlyc3ROYW1lfX0ge3tsYXN0TmFtZX19ICh7e0BpfX0pICh7e0BmaXJzdH19KVxuICogLy97ey9iZWF0bGVzfX1cbiAqXG4gKiAvL09iamVjdCBAZWFjaFxuICoge3sjYmVhdGxlc319XG4gKiAge3sjQGVhY2h9fVxuICogICAgICB7e0BrZXl9fSA6IHt7QHZhbHVlLmZpcnN0TmFtZX19IHt7QHZhbHVlLmxhc3ROYW1lfX1cbiAqICB7ey9AZWFjaH19XG4gKiB7ey9iZWF0bGVzfX1cbiAqXG4gKiBgYGBcbiAqL1xuXG5cblxubGV0IEFYNiA9IHt9O1xuXG4oZnVuY3Rpb24gZGVmaW5lTXVzdGFjaGUoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cbiAgZmFjdG9yeShnbG9iYWwubXVzdGFjaGUgPSB7fSk7XG5cbn0oQVg2LCBmdW5jdGlvbiBtdXN0YWNoZUZhY3RvcnkobXVzdGFjaGUpIHtcblxuICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0cihvYmopIHtcbiAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ2FycmF5JyA6IHR5cGVvZiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFwtXFxbXFxde30oKSorPy4sXFxcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICB9XG5cbiAgLyoqXG4gICAqIE51bGwgc2FmZSB3YXkgb2YgY2hlY2tpbmcgd2hldGhlciBvciBub3QgYW4gb2JqZWN0LFxuICAgKiBpbmNsdWRpbmcgaXRzIHByb3RvdHlwZSwgaGFzIGEgZ2l2ZW4gcHJvcGVydHlcbiAgICovXG4gIGZ1bmN0aW9uIGhhc1Byb3BlcnR5KG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuXG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAocmUsIHN0cmluZykge1xuICAgIHJldHVybiByZWdFeHBUZXN0LmNhbGwocmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbm9uU3BhY2VSZSA9IC9cXFMvO1xuXG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZWdFeHAobm9uU3BhY2VSZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLCAnPCc6ICcmbHQ7JywgJz4nOiAnJmd0OycsICdcIic6ICcmcXVvdDsnLCBcIidcIjogJyYjMzk7JywgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAocykge1xuICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIGVxdWFsc1JlID0gL1xccyo9LztcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XG4gIHZhciB0YWdSZSA9IC8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO1xuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2Vucy4gSWYgdGhlIGB0YWdzYFxuICAgKiBhcmd1bWVudCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gbXVzdGFjaGUudGFncykuXG4gICAqXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcbiAgICogbXVzdGFjaGUgc3ltYm9sIHRoYXQgd2FzIHVzZWQgaW5zaWRlIHRoZSB0YWcsIGUuZy4gXCIjXCIgb3IgXCImXCIuIElmIHRoZSB0YWdcbiAgICogZGlkIG5vdCBjb250YWluIGEgc3ltYm9sIChpLmUuIHt7bXlWYWx1ZX19KSB0aGlzIGVsZW1lbnQgaXMgXCJuYW1lXCIuIEZvclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIHRva2VuIGlzIGl0cyBcInZhbHVlXCIuIEZvciBtdXN0YWNoZSB0YWdzIHRoaXMgaXNcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xuICAgKiB0aGlzIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxuICAgKiByZXNwZWN0aXZlbHksIG9mIHRoZSB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxuICAgKiBhcnJheSBvZiB0b2tlbnMgaW4gdGhlIHN1YnRyZWUgYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgYXRcbiAgICogd2hpY2ggdGhlIGNsb3NpbmcgdGFnIGZvciB0aGF0IHNlY3Rpb24gYmVnaW5zLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIGlmICghdGVtcGxhdGUpXG4gICAgICByZXR1cm4gW107XG5cbiAgICB2YXIgc2VjdGlvbnMgPSBbXTsgICAgIC8vIFN0YWNrIHRvIGhvbGQgc2VjdGlvbiB0b2tlbnNcbiAgICB2YXIgdG9rZW5zID0gW107ICAgICAgIC8vIEJ1ZmZlciB0byBob2xkIHRoZSB0b2tlbnNcbiAgICB2YXIgc3BhY2VzID0gW107ICAgICAgIC8vIEluZGljZXMgb2Ygd2hpdGVzcGFjZSB0b2tlbnMgb24gdGhlIGN1cnJlbnQgbGluZVxuICAgIHZhciBoYXNUYWcgPSBmYWxzZTsgICAgLy8gSXMgdGhlcmUgYSB7e3RhZ319IG9uIHRoZSBjdXJyZW50IGxpbmU/XG4gICAgdmFyIG5vblNwYWNlID0gZmFsc2U7ICAvLyBJcyB0aGVyZSBhIG5vbi1zcGFjZSBjaGFyIG9uIHRoZSBjdXJyZW50IGxpbmU/XG5cbiAgICAvLyBTdHJpcHMgYWxsIHdoaXRlc3BhY2UgdG9rZW5zIGFycmF5IGZvciB0aGUgY3VycmVudCBsaW5lXG4gICAgLy8gaWYgdGhlcmUgd2FzIGEge3sjdGFnfX0gb24gaXQgYW5kIG90aGVyd2lzZSBvbmx5IHNwYWNlLlxuICAgIGZ1bmN0aW9uIHN0cmlwU3BhY2UoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3BhY2VzID0gW107XG4gICAgICB9XG5cbiAgICAgIGhhc1RhZyA9IGZhbHNlO1xuICAgICAgbm9uU3BhY2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgb3BlbmluZ1RhZ1JlLCBjbG9zaW5nVGFnUmUsIGNsb3NpbmdDdXJseVJlO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3ModGFnc1RvQ29tcGlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcbiAgICAgICAgdGFnc1RvQ29tcGlsZSA9IHRhZ3NUb0NvbXBpbGUuc3BsaXQoc3BhY2VSZSwgMik7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzVG9Db21waWxlKTtcblxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XG4gICAgICBjbG9zaW5nVGFnUmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICAgIGNsb3NpbmdDdXJseVJlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgfVxuXG4gICAgY29tcGlsZVRhZ3ModGFncyB8fCBtdXN0YWNoZS50YWdzKTtcblxuICAgIHZhciBzY2FubmVyID0gbmV3IFNjYW5uZXIodGVtcGxhdGUpO1xuXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XG4gICAgd2hpbGUgKCFzY2FubmVyLmVvcygpKSB7XG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCBhbnkgdGV4dCBiZXR3ZWVuIHRhZ3MuXG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGkgPCB2YWx1ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjaHIpKSB7XG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWyd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxXSk7XG4gICAgICAgICAgc3RhcnQgKz0gMTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciB3aGl0ZXNwYWNlIG9uIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgICAgaWYgKGNociA9PT0gJ1xcbicpXG4gICAgICAgICAgICBzdHJpcFNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIG9wZW5pbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4ob3BlbmluZ1RhZ1JlKSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGhhc1RhZyA9IHRydWU7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHR5cGUuXG4gICAgICB0eXBlID0gc2Nhbm5lci5zY2FuKHRhZ1JlKSB8fCAnbmFtZSc7XG4gICAgICBzY2FubmVyLnNjYW4od2hpdGVSZSk7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHZhbHVlLlxuICAgICAgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIGNsb3NpbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4oY2xvc2luZ1RhZ1JlKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCB0YWcgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgICAgdG9rZW4gPSBbdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvc107XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuXG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnbmFtZScgfHwgdHlwZSA9PT0gJ3snIHx8IHR5cGUgPT09ICcmJykge1xuICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0YWdzIGZvciB0aGUgbmV4dCB0aW1lIGFyb3VuZC5cbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gb3BlbiBzZWN0aW9ucyB3aGVuIHdlJ3JlIGRvbmUuXG4gICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgIGlmIChvcGVuU2VjdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zKHRva2Vucykge1xuICAgIHZhciBzcXVhc2hlZFRva2VucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd0ZXh0JyAmJiBsYXN0VG9rZW4gJiYgbGFzdFRva2VuWzBdID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW5bMV0gKz0gdG9rZW5bMV07XG4gICAgICAgICAgbGFzdFRva2VuWzNdID0gdG9rZW5bM107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3F1YXNoZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgbGFzdFRva2VuID0gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXNoZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIGludG8gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUgd2hlcmVcbiAgICogdG9rZW5zIHRoYXQgcmVwcmVzZW50IGEgc2VjdGlvbiBoYXZlIHR3byBhZGRpdGlvbmFsIGl0ZW1zOiAxKSBhbiBhcnJheSBvZlxuICAgKiBhbGwgdG9rZW5zIHRoYXQgYXBwZWFyIGluIHRoYXQgc2VjdGlvbiBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbFxuICAgKiB0ZW1wbGF0ZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVuZCBvZiB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBuZXN0VG9rZW5zKHRva2Vucykge1xuICAgIHZhciBuZXN0ZWRUb2tlbnMgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gbmVzdGVkVG9rZW5zO1xuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBzZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJyMnOlxuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgY29sbGVjdG9yID0gdG9rZW5bNF0gPSBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSBzZWN0aW9ucy5sZW5ndGggPiAwID8gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV1bNF0gOiBuZXN0ZWRUb2tlbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXN0ZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgc3RyaW5nIHNjYW5uZXIgdGhhdCBpcyB1c2VkIGJ5IHRoZSB0ZW1wbGF0ZSBwYXJzZXIgdG8gZmluZFxuICAgKiB0b2tlbnMgaW4gdGVtcGxhdGUgc3RyaW5ncy5cbiAgICovXG4gIGZ1bmN0aW9uIFNjYW5uZXIoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiBlb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFpbCA9PT0gJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIFJldHVybnMgdGhlIG1hdGNoZWQgdGV4dCBpZiBpdCBjYW4gbWF0Y2gsIHRoZSBlbXB0eSBzdHJpbmcgb3RoZXJ3aXNlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIHNjYW4ocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xuXG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCAhPT0gMClcbiAgICAgIHJldHVybiAnJztcblxuICAgIHZhciBzdHJpbmcgPSBtYXRjaFswXTtcblxuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNraXBzIGFsbCB0ZXh0IHVudGlsIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gY2FuIGJlIG1hdGNoZWQuIFJldHVybnNcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVW50aWwgPSBmdW5jdGlvbiBzY2FuVW50aWwocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcbiAgICAgICAgdGhpcy50YWlsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtYXRjaCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQodmlldywgcGFyZW50Q29udGV4dCkge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5jYWNoZSA9IHtcbiAgICAgICcuJzogdGhpcy52aWV3LFxuICAgICAgJ0BlYWNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0dXJucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMpIHtcbiAgICAgICAgICByZXR1cm5zLnB1c2goeydAa2V5JzogaywgJ0B2YWx1ZSc6IHRoaXNba119KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJucztcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbnRleHQgdXNpbmcgdGhlIGdpdmVuIHZpZXcgd2l0aCB0aGlzIGNvbnRleHRcbiAgICogYXMgdGhlIHBhcmVudC5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuXG4gICAgdmFyIHZhbHVlO1xuICAgIGlmIChjYWNoZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgdmFsdWUgPSBjYWNoZVtuYW1lXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIG5hbWVzLCBpbmRleCwgbG9va3VwSGl0ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlldztcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBVc2luZyB0aGUgZG90IG5vdGlvbiBwYXRoIGluIGBuYW1lYCwgd2UgZGVzY2VuZCB0aHJvdWdoIHRoZVxuICAgICAgICAgICAqIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVG8gYmUgY2VydGFpbiB0aGF0IHRoZSBsb29rdXAgaGFzIGJlZW4gc3VjY2Vzc2Z1bCwgd2UgaGF2ZSB0b1xuICAgICAgICAgICAqIGNoZWNrIGlmIHRoZSBsYXN0IG9iamVjdCBpbiB0aGUgcGF0aCBhY3R1YWxseSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhpcyBpcyBzcGVjaWFsbHkgbmVjZXNzYXJ5IGZvciB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQgdG9cbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cbiAgICAgICAgICAgKiovXG4gICAgICAgICAgd2hpbGUgKHZhbHVlICE9IG51bGwgJiYgaW5kZXggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkodmFsdWUsIG5hbWVzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaW5kZXgrK11dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eShjb250ZXh0LnZpZXcsIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvb2t1cEhpdClcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGNhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKVxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKHRoaXMudmlldyk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgV3JpdGVyIGtub3dzIGhvdyB0byB0YWtlIGEgc3RyZWFtIG9mIHRva2VucyBhbmQgcmVuZGVyIHRoZW0gdG8gYVxuICAgKiBzdHJpbmcsIGdpdmVuIGEgY29udGV4dC4gSXQgYWxzbyBtYWludGFpbnMgYSBjYWNoZSBvZiB0ZW1wbGF0ZXMgdG9cbiAgICogYXZvaWQgdGhlIG5lZWQgdG8gcGFyc2UgdGhlIHNhbWUgdGVtcGxhdGUgdHdpY2UuXG4gICAqL1xuICBmdW5jdGlvbiBXcml0ZXIoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2YgdG9rZW5zXG4gICAqIHRoYXQgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIHBhcnNlLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICB2YXIgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKHRva2VucyA9PSBudWxsKVxuICAgICAgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncyk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdoLWxldmVsIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHdpdGhcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIGBwYXJ0aWFsc2AgYXJndW1lbnQgbWF5IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcbiAgICogYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBsb2FkIHBhcnRpYWwgdGVtcGxhdGVzIG9uIHRoZSBmbHlcbiAgICogdGhhdCB0YWtlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlIG5hbWUgb2YgdGhlIHBhcnRpYWwuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICdeJykgdmFsdWUgPSB0aGlzLnJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAndGV4dCcpIHZhbHVlID0gdGhpcy5yYXdWYWx1ZSh0b2tlbik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiByZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVuZGVyIGFuIGFyYml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlcih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmICh2YWx1ZVtqXSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVbal0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZVtqXVsnQGknXSA9IGo7XG4gICAgICAgICAgICB2YWx1ZVtqXVsnQGZpcnN0J10gPSAoaiA9PT0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWVbal0pLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFRlbXBsYXRlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucyB3aXRob3V0IHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZScpO1xuXG4gICAgICAvLyBFeHRyYWN0IHRoZSBwb3J0aW9uIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHRoZSBzZWN0aW9uIGNvbnRhaW5zLlxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKGNvbnRleHQudmlldywgb3JpZ2luYWxUZW1wbGF0ZS5zbGljZSh0b2tlblszXSwgdG9rZW5bNV0pLCBzdWJSZW5kZXIpO1xuXG4gICAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVySW52ZXJ0ZWQgPSBmdW5jdGlvbiByZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg2XG4gICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSlcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzKSB7XG4gICAgaWYgKCFwYXJ0aWFscykgcmV0dXJuO1xuXG4gICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvbihwYXJ0aWFscykgPyBwYXJ0aWFscyh0b2tlblsxXSkgOiBwYXJ0aWFsc1t0b2tlblsxXV07XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModGhpcy5wYXJzZSh2YWx1ZSksIGNvbnRleHQsIHBhcnRpYWxzLCB2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS51bmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIHVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIG11c3RhY2hlLmVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlKHRva2VuKSB7XG4gICAgcmV0dXJuIHRva2VuWzFdO1xuICB9O1xuXG4gIG11c3RhY2hlLm5hbWUgPSAnbXVzdGFjaGUuanMnO1xuICBtdXN0YWNoZS52ZXJzaW9uID0gJzIuMS4zJztcbiAgbXVzdGFjaGUudGFncyA9IFsne3snLCAnfX0nXTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY2xlYXJDYWNoZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gdGVtcGxhdGUgaW4gdGhlIGRlZmF1bHQgd3JpdGVyIGFuZCByZXR1cm5zIHRoZVxuICAgKiBhcnJheSBvZiB0b2tlbnMgaXQgY29udGFpbnMuIERvaW5nIHRoaXMgYWhlYWQgb2YgdGltZSBhdm9pZHMgdGhlIG5lZWQgdG9cbiAgICogcGFyc2UgdGVtcGxhdGVzIG9uIHRoZSBmbHkgYXMgdGhleSBhcmUgcmVuZGVyZWQuXG4gICAqL1xuICBtdXN0YWNoZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBgdGVtcGxhdGVgIHdpdGggdGhlIGdpdmVuIGB2aWV3YCBhbmQgYHBhcnRpYWxzYCB1c2luZyB0aGVcbiAgICogZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICsgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC4sXG4gIC8qZXNsaW50LWRpc2FibGUgKi8gLy8gZXNsaW50IHdhbnRzIGNhbWVsIGNhc2VkIGZ1bmN0aW9uIG5hbWVcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzLCBzZW5kKSB7XG4gICAgLyplc2xpbnQtZW5hYmxlKi9cblxuICAgIHZhciByZXN1bHQgPSBtdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKHNlbmQpKSB7XG4gICAgICBzZW5kKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBFeHBvcnQgdGhlc2UgbWFpbmx5IGZvciB0ZXN0aW5nLCBidXQgYWxzbyBmb3IgYWR2YW5jZWQgdXNhZ2UuXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xuICBtdXN0YWNoZS5Db250ZXh0ID0gQ29udGV4dDtcbiAgbXVzdGFjaGUuV3JpdGVyID0gV3JpdGVyO1xuXG59KSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFYNi5tdXN0YWNoZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgMTIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBheDYtdWktY2FsZW5kYXItZmFkZW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC41OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC41OyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlaW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfSB9XFxuXFxuW2RhdGEtYXg2dWktY2FsZW5kYXJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAqIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjZjVmNWY1KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZjVmNWY1KTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgY29sb3I6ICMzMzM7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtbGVmdCwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtcmlnaHQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LXNpemU6IDIycHg7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtbGVmdCBpLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtbW92ZS1sZWZ0IHNwYW4sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLXJpZ2h0IGksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLXJpZ2h0IHNwYW4ge1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtbGVmdCB7XFxuICAgICAgbGVmdDogMHB4O1xcbiAgICAgIHRvcDogMHB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLXJpZ2h0IHtcXG4gICAgICByaWdodDogMHB4O1xcbiAgICAgIHRvcDogMHB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1kaXNwbGF5IHtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtZGlzcGxheSBbZGF0YS1jYWxlbmRhci1kaXNwbGF5XSB7XFxuICAgICAgICBtYXJnaW46IDBweCAxMHB4O1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIGEge1xcbiAgICAgIGNvbG9yOiAjMzMzOyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzMzN2FiNzsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5LmZhZGVpbiB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZWluIDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZWluIDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIGFuaW1hdGlvbjogYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiAwLjNzIGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keS5mYWRlb3V0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZW91dCAwLjNzIGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpO1xcbiAgICBhbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxuICAgIGJvcmRlcjogMCBub25lOyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB7XFxuICAgICAgYm9yZGVyOiAwIG5vbmU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGQsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB0aCB7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICBwYWRkaW5nOiAwcHggMnB4O1xcbiAgICAgICAgYm9yZGVyOiAwcHggbm9uZTtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICBjb2xvcjogIzZENkU3MDsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRoZWFkIHRkLmNhbGVuZGFyLWNvbC0wLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGguY2FsZW5kYXItY29sLTAge1xcbiAgICAgICAgICBjb2xvcjogI0M3OEI4MTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRoZWFkIHRkLmNhbGVuZGFyLWNvbC02LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGguY2FsZW5kYXItY29sLTYge1xcbiAgICAgICAgICBjb2xvcjogIzMyQjREQzsgfVxcbiAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkge1xcbiAgICAgIGJvcmRlcjogMCBub25lOyB9XFxuICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGgge1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICBsaW5lLWhlaWdodDogMWVtO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgYm9yZGVyOiAwcHggbm9uZTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAvKlxcbiAgICAgICAgICAmLmNhbGVuZGFyLWNvbC0wIHtcXG4gICAgICAgICAgICAgIC5jYWxlbmRhci1pdGVtLWRheS5saXZlIHtcXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJGF4NnVpLWNhbGVuZGFyLXN1bi10ZXh0LWNvbG9yO1xcbiAgICAgICAgICAgICAgICAgIEBpbmNsdWRlIGV4dGVuZC1pdGVtLXRoZW1lKCk7XFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgIH1cXG4gICAgICAgICAgJi5jYWxlbmRhci1jb2wtNiB7XFxuICAgICAgICAgICAgICAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZSB7XFxuICAgICAgICAgICAgICAgICAgY29sb3I6ICRheDZ1aS1jYWxlbmRhci1zYXQtdGV4dC1jb2xvcjtcXG4gICAgICAgICAgICAgICAgICBAaW5jbHVkZSBleHRlbmQtaXRlbS10aGVtZSgpO1xcbiAgICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuICAgICAgICAgICovIH1cXG4gICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkge1xcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBjb2xvcjogI0MzQzRDNjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMS4ycHg7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxMS4ycHg7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24uYWRkb24taGVhZGVyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24uYWRkb24taGVhZGVyIHtcXG4gICAgICAgICAgICAgIGxlZnQ6IDBweDtcXG4gICAgICAgICAgICAgIHRvcDogMXB4OyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uLmFkZG9uLWZvb3RlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uLmFkZG9uLWZvb3RlciB7XFxuICAgICAgICAgICAgICBsZWZ0OiAwcHg7XFxuICAgICAgICAgICAgICBib3R0b206IDFweDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0YwRjBGMDtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGMEYwRjAsICNGMEYwRjApO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0YwRjBGMCwgI0YwRjBGMCk7XFxuICAgICAgICAgICAgY29sb3I6ICM2RDZFNzA7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5saXZlIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNBMUExQTE7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc3VuZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc3VuZGF5IHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjQzc4QjgxOyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5saXZlLnNhdHVyZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc2F0dXJkYXkge1xcbiAgICAgICAgICAgICAgY29sb3I6ICMzMkI0REM7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cywgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cyB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U2NzI0MTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFNjcyNDEsICNFNjcyNDEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzIHNwYW4uYWRkb24sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMgc3Bhbi5hZGRvbiB7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMuaG92ZXIsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMuaG92ZXIge1xcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cy5ob3ZlciBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzLmhvdmVyIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5wZXJpb2Qge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM4MmQzZmE7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjODJkM2ZhLCAjODJkM2ZhKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCM4MmQzZmEsICM4MmQzZmEpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LnNlbGVjdGVkLWRheSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5IHNwYW4uYWRkb24sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5IHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5kaXNhYmxlLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmRpc2FibGUge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZGRkZWRmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuaG9saWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5ob2xpZGF5IHtcXG4gICAgICAgICAgICBjb2xvcjogI0M3OEI4MTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGgge1xcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgY29sb3I6ICNDM0M0QzY7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGgubGl2ZSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmxpdmUge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGMEYwRjA7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRjBGMEYwLCAjRjBGMEYwKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGMEYwRjAsICNGMEYwRjApO1xcbiAgICAgICAgICAgIGNvbG9yOiAjNkQ2RTcwOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5ob3ZlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmhvdmVyIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzJCNERDO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguZm9jdXMsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1tb250aC5mb2N1cyB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U2NzI0MTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFNjcyNDEsICNFNjcyNDEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLnNlbGVjdGVkLW1vbnRoLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGgge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMkI0REM7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGggc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLnNlbGVjdGVkLW1vbnRoIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGggc3Bhbi5sdW5hciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLnNlbGVjdGVkLW1vbnRoIHNwYW4ubHVuYXIge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLmRpc2FibGUsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1tb250aC5kaXNhYmxlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgICBjb2xvcjogI2RkZGVkZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguaG9saWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmhvbGlkYXkge1xcbiAgICAgICAgICAgIGNvbG9yOiAjQzc4QjgxOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIge1xcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgY29sb3I6ICNDM0M0QzY7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5saXZlLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5saXZlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjBGMEYwO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0YwRjBGMCwgI0YwRjBGMCk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRjBGMEYwLCAjRjBGMEYwKTtcXG4gICAgICAgICAgICBjb2xvcjogIzZENkU3MDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5ob3ZlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuaG92ZXIge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMkI0REM7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLmZvY3VzLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5mb2N1cyB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U2NzI0MTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFNjcyNDEsICNFNjcyNDEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLnNlbGVjdGVkLXllYXIgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciBzcGFuLmx1bmFyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5zZWxlY3RlZC15ZWFyIHNwYW4ubHVuYXIge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuZGlzYWJsZSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuZGlzYWJsZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgICAgY29sb3I6ICNkZGRlZGY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuaG9saWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuaG9saWRheSB7XFxuICAgICAgICAgICAgY29sb3I6ICNDNzhCODE7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgMTIiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmVcIjtcbmltcG9ydCBpbmZvIGZyb20gXCIuL0FYNkluZm9cIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWxcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZVwiO1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBpbXBvcnQgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbmxldCB0bXBsID0ge1xuICBmcmFtZShjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjxkaXYgZGF0YS1heDZ1aS1jYWxlbmRhcj1cIlwiIGNsYXNzPVwiYXg2LXVpLWNhbGVuZGFyIHt7dGhlbWV9fVwiIGRhdGEtY2FsZW5kYXItZWxzPVwicm9vdFwiIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+XG4gICAge3sjY29udHJvbH19XG4gICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWNvbnRyb2xcIiBkYXRhLWNhbGVuZGFyLWVscz1cImNvbnRyb2xcIiBzdHlsZT1cInt7Y29udHJvbENTU319XCI+XG4gICAgICAgIDxhIGNsYXNzPVwiZGF0ZS1tb3ZlLWxlZnRcIiBkYXRhLWNhbGVuZGFyLW1vdmU9XCJsZWZ0XCIgc3R5bGU9XCJ7e2NvbnRyb2xCdXR0b25DU1N9fVwiPnt7e2xlZnR9fX08L2E+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLWRpc3BsYXlcIiBkYXRhLWNhbGVuZGFyLWVscz1cImNvbnRyb2wtZGlzcGxheVwiIHN0eWxlPVwie3tjb250cm9sQ1NTfX1cIj48L2Rpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJkYXRlLW1vdmUtcmlnaHRcIiBkYXRhLWNhbGVuZGFyLW1vdmU9XCJyaWdodFwiIHN0eWxlPVwie3tjb250cm9sQnV0dG9uQ1NTfX1cIj57e3tyaWdodH19fTwvYT5cbiAgICA8L2Rpdj5cbiAgICB7ey9jb250cm9sfX1cbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItYm9keVwiIGRhdGEtY2FsZW5kYXItZWxzPVwiYm9keVwiPjwvZGl2PlxuPC9kaXY+XG5gO1xuICB9LFxuICBkYXkoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG48dGFibGUgZGF0YS1jYWxlbmRhci10YWJsZT1cImRheVwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHN0eWxlPVwid2lkdGg6MTAwJTtcIj5cbiAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAge3sjd2Vla05hbWVzfX1cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNvbC17e2NvbH19XCIgc3R5bGU9XCJoZWlnaHQ6IHt7Y29sSGVhZEhlaWdodH19XCI+XG4gICAgICAgICAgICB7e2xhYmVsfX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIHt7L3dlZWtOYW1lc319XG4gICAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHt7I2xpc3R9fSAgICBcbiAgICAgICAgICAgIHt7I2lzU3RhcnRPZldlZWt9fVxuICAgICAgICAgICAge3teQGZpcnN0fX1cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3svQGZpcnN0fX1cbiAgICAgICAgICAgIHt7L2lzU3RhcnRPZldlZWt9fVxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLXt7Y29sfX1cIiBzdHlsZT1cInt7aXRlbVN0eWxlc319XCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjYWxlbmRhci1pdGVtLWRheSB7e2FkZENsYXNzfX1cIiBkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZT1cInt7dGhpc0RhdGV9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uIGFkZG9uLWhlYWRlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3t0aGlzRGF0YUxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvbiBhZGRvbi1mb290ZXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIHt7L2xpc3R9fVxuICAgICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG48L3RhYmxlPlxuYDtcbiAgfSxcbiAgbW9udGgoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG48dGFibGUgZGF0YS1jYWxlbmRhci10YWJsZT1cIm1vbnRoXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLTBcIiBjb2xzcGFuPVwiM1wiIHN0eWxlPVwiaGVpZ2h0OiB7e2NvbEhlYWRIZWlnaHR9fVwiPlxuICAgICAgICAgICAge3tjb2xIZWFkTGFiZWx9fVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3sjbGlzdH19ICAgIFxuICAgICAgICAgICAge3sjaXNTdGFydE9mUm93fX1cbiAgICAgICAgICAgIHt7XkBmaXJzdH19XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHt7L0BmaXJzdH19XG4gICAgICAgICAgICB7ey9pc1N0YXJ0T2ZSb3d9fVxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLXt7Y29sfX1cIiBzdHlsZT1cInt7aXRlbVN0eWxlc319XCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjYWxlbmRhci1pdGVtLW1vbnRoIHt7YWRkQ2xhc3N9fVwiIGRhdGEtY2FsZW5kYXItaXRlbS1tb250aD1cInt7dGhpc01vbnRofX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3t0aGlzTW9udGhMYWJlbH19XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibHVuYXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIHt7L2xpc3R9fVxuICAgICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG48L3RhYmxlPlxuYDtcbiAgfSxcbiAgeWVhcihjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjx0YWJsZSBkYXRhLWNhbGVuZGFyLXRhYmxlPVwieWVhclwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHN0eWxlPVwid2lkdGg6MTAwJTtcIj5cbiAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNvbC0wXCIgY29sc3Bhbj1cIjRcIiBzdHlsZT1cImhlaWdodDoge3tjb2xIZWFkSGVpZ2h0fX1cIj5cbiAgICAgICAgICAgIHt7Y29sSGVhZExhYmVsfX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHt7I2xpc3R9fSAgICBcbiAgICAgICAgICAgIHt7I2lzU3RhcnRPZlJvd319XG4gICAgICAgICAgICB7e15AZmlyc3R9fVxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICB7ey9AZmlyc3R9fVxuICAgICAgICAgICAge3svaXNTdGFydE9mUm93fX1cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNvbC17e2NvbH19XCIgc3R5bGU9XCJ7e2l0ZW1TdHlsZXN9fVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiY2FsZW5kYXItaXRlbS15ZWFyIHt7YWRkQ2xhc3N9fVwiIGRhdGEtY2FsZW5kYXItaXRlbS15ZWFyPVwie3t0aGlzWWVhcn19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRkb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHt7dGhpc1llYXJMYWJlbH19XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibHVuYXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIHt7L2xpc3R9fVxuICAgICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG48L3RhYmxlPlxuYDtcbiAgfVxufTtcblxuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAob3B0cywgdGhhdCkge1xuICBpZiAob3B0cyAmJiBvcHRzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgb3B0cy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG4gIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbn07XG5jb25zdCBnZXRGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRhdGEgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbmZpZywge1xuICAgIGNvbnRyb2xDU1M6IHt9LFxuICAgIGNvbnRyb2xCdXR0b25DU1M6IHt9XG4gIH0pO1xuXG4gIGRhdGEuY29udHJvbEJ1dHRvbkNTU1tcImhlaWdodFwiXSA9IGRhdGEuY29udHJvbENTU1tcImhlaWdodFwiXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29udHJvbEhlaWdodCk7XG4gIGRhdGEuY29udHJvbEJ1dHRvbkNTU1tcImxpbmUtaGVpZ2h0XCJdID0gZGF0YS5jb250cm9sQ1NTW1wibGluZS1oZWlnaHRcIl0gPSBVLmNzc051bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbnRyb2xIZWlnaHQpO1xuICBkYXRhLmNvbnRyb2xCdXR0b25DU1NbXCJ3aWR0aFwiXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29udHJvbEhlaWdodCk7XG5cbiAgZGF0YS5jb250cm9sQ1NTID0gVS5jc3MoZGF0YS5jb250cm9sQ1NTKTtcbiAgZGF0YS5jb250cm9sQnV0dG9uQ1NTID0gVS5jc3MoZGF0YS5jb250cm9sQnV0dG9uQ1NTKTtcblxuICB0cnkge1xuICAgIHJldHVybiBtdXN0YWNoZS5yZW5kZXIodG1wbC5mcmFtZS5jYWxsKHRoaXMpLCBkYXRhKTtcbiAgfVxuICBmaW5hbGx5IHtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxufTtcbmNvbnN0IHNldERpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBteURhdGUgPSBVLmRhdGUodGhpcy5jb25maWcuZGlzcGxheURhdGUpLFxuICAgIHl5ID0gXCJcIixcbiAgICBtbSA9IFwiXCIsXG4gICAgeXkxLCB5eTI7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmNvbnRyb2wpIHtcbiAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJkXCIpIHtcbiAgICAgIHl5ID0gKHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwpID8gdGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbC5yZXBsYWNlKCclcycsIG15RGF0ZS5nZXRGdWxsWWVhcigpKSA6IG15RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgbW0gPSAodGhpcy5jb25maWcuY29udHJvbC5tb250aFRtcGwpID8gdGhpcy5jb25maWcuY29udHJvbC5tb250aFRtcGwucmVwbGFjZSgnJXMnLCB0aGlzLmNvbmZpZy5sYW5nLm1vbnRoc1tteURhdGUuZ2V0TW9udGgoKV0pIDogdGhpcy5jb25maWcubGFuZy5tb250aHNbbXlEYXRlLmdldE1vbnRoKCldO1xuXG4gICAgICB0aGlzLiRbXCJjb250cm9sLWRpc3BsYXlcIl0uaHRtbCgoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbC55ZWFyRmlyc3QpIHtcbiAgICAgICAgICByZXR1cm4gJzxzcGFuIGRhdGEtY2FsZW5kYXItZGlzcGxheT1cInllYXJcIj4nICsgeXkgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGRhdGEtY2FsZW5kYXItZGlzcGxheT1cIm1vbnRoXCI+JyArIG1tICsgJzwvc3Bhbj4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwibW9udGhcIj4nICsgbW0gKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGRhdGEtY2FsZW5kYXItZGlzcGxheT1cInllYXJcIj4nICsgeXkgKyAnPC9zcGFuPic7XG4gICAgICAgIH1cbiAgICAgIH0pKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwibW9udGhcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwibVwiKSB7XG4gICAgICB5eSA9ICh0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsKSA/IHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwucmVwbGFjZSgnJXMnLCBteURhdGUuZ2V0RnVsbFllYXIoKSkgOiBteURhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIHRoaXMuJFtcImNvbnRyb2wtZGlzcGxheVwiXS5odG1sKCc8c3BhbiBkYXRhLWNhbGVuZGFyLWRpc3BsYXk9XCJ5ZWFyXCI+JyArIHl5ICsgJzwvc3Bhbj4nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcInllYXJcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwieVwiKSB7XG4gICAgICB5eTEgPSAodGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsLnJlcGxhY2UoJyVzJywgbXlEYXRlLmdldEZ1bGxZZWFyKCkgLSAxMCkgOiBteURhdGUuZ2V0RnVsbFllYXIoKSAtIDEwO1xuICAgICAgeXkyID0gKHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwpID8gdGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbC5yZXBsYWNlKCclcycsIE51bWJlcihteURhdGUuZ2V0RnVsbFllYXIoKSkgKyA5KSA6IE51bWJlcihteURhdGUuZ2V0RnVsbFllYXIoKSkgKyA5O1xuICAgICAgdGhpcy4kW1wiY29udHJvbC1kaXNwbGF5XCJdLmh0bWwoeXkxICsgJyB+ICcgKyB5eTIpO1xuICAgIH1cblxuICAgIHRoaXMuJFtcImNvbnRyb2wtZGlzcGxheVwiXVxuICAgICAgLm9mZih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSlcbiAgICAgIC5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWNhbGVuZGFyLWRpc3BsYXldJywgKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBVLmZpbmRQYXJlbnROb2RlKGUudGFyZ2V0LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbGVuZGFyLWRpc3BsYXlcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIG1vZGU7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICBtb2RlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItZGlzcGxheVwiKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZU1vZGUobW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgbW9kZSA9IG51bGw7XG4gICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG15RGF0ZSA9IG51bGw7XG4gIHl5ID0gbnVsbDtcbiAgbW0gPSBudWxsO1xuICB5eTEgPSBudWxsO1xuICB5eTIgPSBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBwcmludERheSA9IGZ1bmN0aW9uIChub3dEYXRlKSB7XG4gIGxldCBkb3REYXRlID0gVS5kYXRlKG5vd0RhdGUpLFxuICAgIG1vbnRoU3RyYXREYXRlID0gbmV3IERhdGUoZG90RGF0ZS5nZXRGdWxsWWVhcigpLCBkb3REYXRlLmdldE1vbnRoKCksIDEsIDEyKSxcbiAgICBfdG9kYXkgPSB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSxcbiAgICB0YWJsZVN0YXJ0RGF0ZSA9ICgoKSA9PiB7XG4gICAgICBsZXQgZGF5ID0gbW9udGhTdHJhdERhdGUuZ2V0RGF5KCk7XG4gICAgICBpZiAoZGF5ID09IDApIGRheSA9IDc7XG4gICAgICBkYXkgLT0gdGhpcy5jb25maWcuc3RhcnRPZldlZWs7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBVLmRhdGUobW9udGhTdHJhdERhdGUsIHthZGQ6IHtkOiAtZGF5fX0pO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7XG4gICAgICAgIGRheSA9IG51bGw7XG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBsb29wRGF0ZSxcbiAgICB0aGlzTW9udGggPSBkb3REYXRlLmdldE1vbnRoKCksXG4gICAgaXRlbVN0eWxlcyA9IHt9LFxuICAgIGksXG4gICAgaywgX2ssXG4gICAgZnJhbWVXaWR0aCA9IHRoaXMuJFtcImJvZHlcIl0ud2lkdGgoKSxcbiAgICBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoZnJhbWVXaWR0aCAqICg2IC8gNykpLCAvLyAxd2VlayA9IDdkYXlzLCAxbW9udGggPSA2d2Vla3NcbiAgICBkYXRhO1xuXG4gIGlmICh0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkge1xuICAgIGZyYW1lSGVpZ2h0ID0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5oZWlnaHQpIC0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KTtcbiAgfVxuXG4gIGl0ZW1TdHlsZXNbJ2hlaWdodCddID0gTWF0aC5mbG9vcihmcmFtZUhlaWdodCAvIDYpIC0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5pdGVtUGFkZGluZykgKiAyICsgJ3B4JztcbiAgaXRlbVN0eWxlc1snbGluZS1oZWlnaHQnXSA9IGl0ZW1TdHlsZXNbJ2hlaWdodCddO1xuICBpdGVtU3R5bGVzWydwYWRkaW5nJ10gPSBVLmNzc051bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKTtcblxuICBkYXRhID0ge1xuICAgIHdlZWtOYW1lczogW10uY29uY2F0KGluZm8ud2Vla05hbWVzKSxcbiAgICBsaXN0OiBbXVxuICB9O1xuXG4gIGlmICh0aGlzLmNvbmZpZy5zdGFydE9mV2Vlaykge1xuICAgIGRhdGEud2Vla05hbWVzID0gZGF0YS53ZWVrTmFtZXMuY29uY2F0KGRhdGEud2Vla05hbWVzLnNsaWNlKDAsIHRoaXMuY29uZmlnLnN0YXJ0T2ZXZWVrKSkuc3BsaWNlKHRoaXMuY29uZmlnLnN0YXJ0T2ZXZWVrKTtcbiAgfVxuXG4gIGRhdGEud2Vla05hbWVzLmZvckVhY2goKG4pID0+IHtcbiAgICBuLmNvbEhlYWRIZWlnaHQgPSBVLmNzc051bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9KTtcblxuICBsb29wRGF0ZSA9IHRhYmxlU3RhcnREYXRlO1xuICBpID0gMDtcbiAgd2hpbGUgKGkgPCA2KSB7XG4gICAgayA9IDA7XG4gICAgd2hpbGUgKGsgPCA3KSB7XG4gICAgICBfayA9ICg3ICsgKGsgLSB0aGlzLmNvbmZpZy5zdGFydE9mV2VlaykpICUgNztcbiAgICAgIGxldCB0aGlzRGF0ZSA9ICcnICsgVS5kYXRlKGxvb3BEYXRlLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pLFxuICAgICAgICBfZGF0ZSA9IHtcbiAgICAgICAgICAncm93JzogaSxcbiAgICAgICAgICAnY29sJzogayxcbiAgICAgICAgICBpc1N0YXJ0T2ZXZWVrOiAoayA9PSAwKSxcbiAgICAgICAgICB0aGlzRGF0ZTogJycgKyB0aGlzRGF0ZSxcbiAgICAgICAgICB0aGlzRGF0YUxhYmVsOiB0aGlzLmNvbmZpZy5sYW5nLmRheVRtcGwucmVwbGFjZSgnJXMnLCBsb29wRGF0ZS5nZXREYXRlKCkpLFxuICAgICAgICAgIGl0ZW1TdHlsZXM6IFUuY3NzKGl0ZW1TdHlsZXMpLFxuICAgICAgICAgIGFkZENsYXNzOiAoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RhYmxlTWFwW3RoaXNEYXRlXSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gKCBsb29wRGF0ZS5nZXRNb250aCgpID09IHRoaXNNb250aCApID8gXCIgbGl2ZVwiIDogXCJcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiIGRpc2FibGVcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChsb29wRGF0ZS5nZXRNb250aCgpID09IHRoaXNNb250aCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzRGF0ZSA9PSBVLmRhdGUoX3RvZGF5LCB7XCJyZXR1cm5cIjogXCJ5eXl5TU1kZFwifSkpIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCIgZm9jdXNcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSBcIiBsaXZlXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxvb3BEYXRlLmdldERheSgpID09IDApIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCIgc3VuZGF5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb29wRGF0ZS5nZXREYXkoKSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiIHNhdHVyZGF5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWVzO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgICArICcgJ1xuICAgICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5tYXJrZXJNYXBbdGhpc0RhdGVdKSA/IHRoaXMubWFya2VyTWFwW3RoaXNEYXRlXS50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0TWFya2VyVGhlbWUgOiAnJztcbiAgICAgICAgICB9KSgpXG4gICAgICAgICAgKyAnICdcbiAgICAgICAgICArICgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0aW9uTWFwW3RoaXNEYXRlXSkgPyBcInNlbGVjdGVkLWRheVwiIDogJyc7XG4gICAgICAgICAgfSkoKVxuICAgICAgICB9O1xuICAgICAgZGF0YS5saXN0LnB1c2goX2RhdGUpO1xuXG4gICAgICBrKys7XG4gICAgICBsb29wRGF0ZSA9IFUuZGF0ZShsb29wRGF0ZSwge2FkZDoge2Q6IDF9fSk7XG5cbiAgICAgIHRoaXNEYXRlID0gbnVsbDtcbiAgICAgIF9kYXRlID0gbnVsbDtcbiAgICB9XG4gICAgaSsrO1xuICB9XG5cbiAgdGhpcy4kW1wiYm9keVwiXVxuICAgIC5odG1sKG11c3RhY2hlLnJlbmRlcih0bXBsLmRheS5jYWxsKHRoaXMpLCBkYXRhKSlcbiAgICAub2ZmKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lKVxuICAgIC5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZV0nLCAoZSkgPT4ge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgb25jbGljay5jYWxsKHRoaXMsIGUsICdkYXRlJyk7XG4gICAgICBVLnN0b3BFdmVudChlKTtcbiAgICB9KTtcblxuICB0aGlzLnByaW50ZWREYXkgPSB7XG4gICAgc3RhcnQ6IHRhYmxlU3RhcnREYXRlLCBlbmQ6IGxvb3BEYXRlXG4gIH07XG5cbiAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBudWxsLCB7XG4gICAgc2VsZjogdGhpcyxcbiAgICBhY3Rpb246IFwicHJpbnREYXlcIixcbiAgICBwcmludGVkRGF5OiB0aGlzLnByaW50ZWREYXlcbiAgfSk7XG4gIHNldERpc3BsYXkuY2FsbCh0aGlzKTtcblxuICBkb3REYXRlID0gbnVsbDtcbiAgbW9udGhTdHJhdERhdGUgPSBudWxsO1xuICBfdG9kYXkgPSBudWxsO1xuICB0YWJsZVN0YXJ0RGF0ZSA9IG51bGw7XG4gIGxvb3BEYXRlID0gbnVsbDtcbiAgdGhpc01vbnRoID0gbnVsbDtcbiAgaXRlbVN0eWxlcyA9IG51bGw7XG4gIGkgPSBudWxsO1xuICBrID0gbnVsbDtcbiAgZnJhbWVXaWR0aCA9IG51bGw7XG4gIGZyYW1lSGVpZ2h0ID0gbnVsbDtcbiAgZGF0YSA9IG51bGw7XG59O1xuY29uc3QgcHJpbnRNb250aCA9IGZ1bmN0aW9uIChub3dEYXRlKSB7XG4gIGxldCBkb3REYXRlID0gVS5kYXRlKG5vd0RhdGUpLFxuICAgIG5Nb250aCA9IGRvdERhdGUuZ2V0TW9udGgoKSxcbiAgICBpdGVtU3R5bGVzID0ge30sXG4gICAgaSxcbiAgICBrLFxuICAgIG0sXG4gICAgdGFibGVTdGFydE1vbnRoLFxuICAgIGZyYW1lV2lkdGggPSB0aGlzLiRbXCJib2R5XCJdLndpZHRoKCksXG4gICAgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKGZyYW1lV2lkdGggKiAoNiAvIDcpKSxcbiAgICBkYXRhO1xuXG4gIGlmICh0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkge1xuICAgIGZyYW1lSGVpZ2h0ID0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5oZWlnaHQpIC0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KTtcbiAgfVxuXG4gIGl0ZW1TdHlsZXNbJ2hlaWdodCddID0gTWF0aC5mbG9vcihmcmFtZUhlaWdodCAvIDQpIC0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5pdGVtUGFkZGluZykgKiAyICsgJ3B4JztcbiAgaXRlbVN0eWxlc1snbGluZS1oZWlnaHQnXSA9IGl0ZW1TdHlsZXNbJ2hlaWdodCddO1xuICBpdGVtU3R5bGVzWydwYWRkaW5nJ10gPSBVLmNzc051bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKTtcblxuICBkYXRhID0ge1xuICAgIGNvbEhlYWRIZWlnaHQ6IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29sSGVhZEhlaWdodCksXG4gICAgY29sSGVhZExhYmVsOiB0aGlzLmNvbmZpZy5sYW5nLm1vbnRoSGVhZGluZyxcbiAgICBsaXN0OiBbXVxuICB9O1xuXG4gIHRhYmxlU3RhcnRNb250aCA9IDA7XG4gIG0gPSAwO1xuICBpID0gMDtcbiAgd2hpbGUgKGkgPCA0KSB7XG4gICAgayA9IDA7XG4gICAgd2hpbGUgKGsgPCAzKSB7XG4gICAgICBsZXQgX21vbnRoID0ge1xuICAgICAgICByb3c6IGksXG4gICAgICAgIGNvbDogayxcbiAgICAgICAgaXNTdGFydE9mUm93OiAoayA9PSAwKSxcbiAgICAgICAgdGhpc01vbnRoOiBkb3REYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyBVLnNldERpZ2l0KG0gKyAxLCAyKSArICctJyArIFUuc2V0RGlnaXQoZG90RGF0ZS5nZXREYXRlKCksIDIpLFxuICAgICAgICB0aGlzTW9udGhMYWJlbDogdGhpcy5jb25maWcubGFuZy5tb250aHNbbV0sXG4gICAgICAgIGl0ZW1TdHlsZXM6IFUuY3NzKGl0ZW1TdHlsZXMpLFxuICAgICAgICBhZGRDbGFzczogKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNlbGVjdGFibGVNYXBbbV0pID8gJ2xpdmUnIDogJ2Rpc2FibGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbGl2ZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKCBtID09IG5Nb250aCApID8gXCJmb2N1c1wiIDogXCJcIjtcbiAgICAgICAgfSkoKVxuICAgICAgICArICcgJ1xuICAgICAgICArICgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLm1hcmtlck1hcFttXSkgPyB0aGlzLm1hcmtlck1hcFttXS50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0TWFya2VyVGhlbWUgOiAnJztcbiAgICAgICAgfSkoKVxuICAgICAgfTtcbiAgICAgIGRhdGEubGlzdC5wdXNoKF9tb250aCk7XG4gICAgICBtKys7XG4gICAgICBrKys7XG4gICAgICBfbW9udGggPSBudWxsO1xuICAgIH1cbiAgICBpKys7XG4gIH1cblxuICB0aGlzLiRbXCJib2R5XCJdXG4gICAgLmh0bWwobXVzdGFjaGUucmVuZGVyKHRtcGwubW9udGguY2FsbCh0aGlzKSwgZGF0YSkpXG4gICAgLm9mZih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSlcbiAgICAub24odGhpcy5jb25maWcuY2xpY2tFdmVudE5hbWUsICdbZGF0YS1jYWxlbmRhci1pdGVtLW1vbnRoXScsIChlKSA9PiB7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBvbmNsaWNrLmNhbGwodGhpcywgZSwgJ21vbnRoJyk7XG4gICAgICBVLnN0b3BFdmVudChlKTtcbiAgICB9KTtcblxuICB0aGlzLnByaW50ZWREYXkgPSB7XG4gICAgc3RhcnQ6IGRvdERhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIFUuc2V0RGlnaXQodGFibGVTdGFydE1vbnRoICsgMSwgMiksXG4gICAgZW5kOiBkb3REYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyBVLnNldERpZ2l0KG0sIDIpXG4gIH07XG5cbiAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBudWxsLCB7XG4gICAgc2VsZjogdGhpcyxcbiAgICBhY3Rpb246IFwicHJpbnRNb250aFwiLFxuICAgIHByaW50ZWREYXk6IHRoaXMucHJpbnRlZERheVxuICB9KTtcbiAgc2V0RGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gIGRvdERhdGUgPSBudWxsO1xuICBuTW9udGggPSBudWxsO1xuICBpdGVtU3R5bGVzID0gbnVsbDtcbiAgaSA9IG51bGw7XG4gIGsgPSBudWxsO1xuICBtID0gbnVsbDtcbiAgdGFibGVTdGFydE1vbnRoID0gbnVsbDtcbiAgZnJhbWVXaWR0aCA9IG51bGw7XG4gIGZyYW1lSGVpZ2h0ID0gbnVsbDtcbiAgZGF0YSA9IG51bGw7XG59O1xuY29uc3QgcHJpbnRZZWFyID0gZnVuY3Rpb24gKG5vd0RhdGUpIHtcbiAgbGV0IGRvdERhdGUgPSBVLmRhdGUobm93RGF0ZSksXG4gICAgblllYXIgPSBkb3REYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgaXRlbVN0eWxlcyA9IHt9LFxuICAgIGksXG4gICAgayxcbiAgICB5LFxuICAgIHRhYmxlU3RhcnRZZWFyLFxuICAgIGZyYW1lV2lkdGggPSB0aGlzLiRbXCJib2R5XCJdLndpZHRoKCksXG4gICAgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKGZyYW1lV2lkdGggKiAoNiAvIDcpKSxcbiAgICBkYXRhO1xuXG4gIGlmICh0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkge1xuICAgIGZyYW1lSGVpZ2h0ID0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5oZWlnaHQpIC0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KTtcbiAgfVxuXG4gIGl0ZW1TdHlsZXNbJ2hlaWdodCddID0gTWF0aC5mbG9vcihmcmFtZUhlaWdodCAvIDUpIC0gVS5udW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5pdGVtUGFkZGluZykgKiAyICsgJ3B4JztcbiAgaXRlbVN0eWxlc1snbGluZS1oZWlnaHQnXSA9IGl0ZW1TdHlsZXNbJ2hlaWdodCddO1xuICBpdGVtU3R5bGVzWydwYWRkaW5nJ10gPSBVLmNzc051bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKTtcblxuICBkYXRhID0ge1xuICAgIGNvbEhlYWRIZWlnaHQ6IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29sSGVhZEhlaWdodCksXG4gICAgY29sSGVhZExhYmVsOiB0aGlzLmNvbmZpZy5sYW5nLnllYXJIZWFkaW5nLFxuICAgIGxpc3Q6IFtdXG4gIH07XG5cbiAgdGFibGVTdGFydFllYXIgPSBuWWVhciAtIDEwO1xuICB5ID0gblllYXIgLSAxMDtcbiAgaSA9IDA7XG4gIHdoaWxlIChpIDwgNSkge1xuICAgIGsgPSAwO1xuICAgIHdoaWxlIChrIDwgNCkge1xuICAgICAgbGV0IF95ZWFyID0ge1xuICAgICAgICByb3c6IGksXG4gICAgICAgIGNvbDogayxcbiAgICAgICAgaXNTdGFydE9mUm93OiAoayA9PSAwKSxcbiAgICAgICAgdGhpc1llYXI6IHkgKyAnLScgKyBVLnNldERpZ2l0KGRvdERhdGUuZ2V0TW9udGgoKSArIDEsIDIpICsgJy0nICsgVS5zZXREaWdpdChkb3REYXRlLmdldERhdGUoKSwgMiksXG4gICAgICAgIHRoaXNZZWFyTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcueWVhclRtcGwucmVwbGFjZSgnJXMnLCAoeSkpLFxuICAgICAgICBpdGVtU3R5bGVzOiBVLmNzcyhpdGVtU3R5bGVzKSxcbiAgICAgICAgYWRkQ2xhc3M6ICgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RhYmxlTWFwW3ldKSA/ICdsaXZlJyA6ICdkaXNhYmxlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2xpdmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgICAgICArICcgJ1xuICAgICAgICArICgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICggeSA9PSBuWWVhciApID8gXCJmb2N1c1wiIDogXCJcIjtcbiAgICAgICAgfSkoKVxuICAgICAgICArICcgJ1xuICAgICAgICArICgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLnNlbGVjdGFibGVNYXBbeV0pID8gdGhpcy5zZWxlY3RhYmxlTWFwW3ldLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRNYXJrZXJUaGVtZSA6ICcnO1xuICAgICAgICB9KSgpXG4gICAgICB9O1xuICAgICAgZGF0YS5saXN0LnB1c2goX3llYXIpO1xuICAgICAgeSsrO1xuICAgICAgaysrO1xuICAgICAgX3llYXIgPSBudWxsO1xuICAgIH1cbiAgICBpKys7XG4gIH1cblxuICB0aGlzLiRbXCJib2R5XCJdXG4gICAgLmh0bWwobXVzdGFjaGUucmVuZGVyKHRtcGwueWVhci5jYWxsKHRoaXMpLCBkYXRhKSlcbiAgICAub2ZmKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lKVxuICAgIC5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWNhbGVuZGFyLWl0ZW0teWVhcl0nLCAoZSkgPT4ge1xuICAgICAgZSA9IChlIHx8IHdpbmRvdy5ldmVudCk7XG4gICAgICBvbmNsaWNrLmNhbGwodGhpcywgZSwgJ3llYXInKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgIH0pO1xuXG4gIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICBzdGFydDogdGFibGVTdGFydFllYXIsIGVuZDogeSAtIDFcbiAgfTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGFjdGlvbjogXCJwcmludFllYXJcIixcbiAgICBwcmludGVkRGF5OiB0aGlzLnByaW50ZWREYXlcbiAgfSk7XG4gIHNldERpc3BsYXkuY2FsbCh0aGlzKTtcblxuICBkb3REYXRlID0gbnVsbDtcbiAgblllYXIgPSBudWxsO1xuICBpdGVtU3R5bGVzID0gbnVsbDtcbiAgaSA9IG51bGw7XG4gIGsgPSBudWxsO1xuICB5ID0gbnVsbDtcbiAgdGFibGVTdGFydFllYXIgPSBudWxsO1xuICBmcmFtZVdpZHRoID0gbnVsbDtcbiAgZnJhbWVIZWlnaHQgPSBudWxsO1xuICBkYXRhID0gbnVsbDtcbn07XG5jb25zdCBvbmNsaWNrID0gZnVuY3Rpb24gKGUsIG1vZGUsIHRhcmdldCwgdmFsdWUpIHtcbiAgbGV0IHJlbW92ZWQsXG4gICAgZHQsXG4gICAgc2VsZWN0YWJsZTtcblxuICBtb2RlID0gbW9kZSB8fCBcImRhdGVcIjtcbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1pdGVtLVwiICsgbW9kZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB2YWx1ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbGVuZGFyLWl0ZW0tXCIgKyBtb2RlKTtcblxuICAgIGR0ID0gVS5kYXRlKHZhbHVlLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pO1xuICAgIHNlbGVjdGFibGUgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0YWJsZUNvdW50ID0gKHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0KSA/IChVLmlzTnVtYmVyKHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0KSkgPyB0aGlzLmNvbmZpZy5tdWx0aXBsZVNlbGVjdCA6IDIgOiAxO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdGFibGUpIHtcbiAgICAgIGlmICghdGhpcy5zZWxlY3RhYmxlTWFwW2R0XSkgc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChtb2RlID09IFwiZGF0ZVwiKSB7XG4gICAgICBpZiAoc2VsZWN0YWJsZSkge1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5sZW5ndGggPj0gdGhpcy5zZWxlY3RhYmxlQ291bnQpIHtcbiAgICAgICAgICByZW1vdmVkID0gdGhpcy5zZWxlY3Rpb24uc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtICh0aGlzLnNlbGVjdGFibGVDb3VudCAtIDEpKTtcbiAgICAgICAgICByZW1vdmVkLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwiJyArIFUuZGF0ZShkLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pICsgJ1wiXScpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtZGF5XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgalF1ZXJ5KHRhcmdldCkuYWRkQ2xhc3MoXCJzZWxlY3RlZC1kYXlcIik7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLnB1c2godmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uQ2xpY2spIHtcbiAgICAgICAgICB0aGlzLm9uQ2xpY2suY2FsbCh7XG4gICAgICAgICAgICBzZWxmOiB0aGlzLCBkYXRlOiB2YWx1ZSwgdGFyZ2V0OiB0aGlzLnRhcmdldCwgZGF0ZUVsZW1lbnQ6IHRhcmdldFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG1vZGUgPT0gXCJtb250aFwiKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0TW9kZSA9PSBcIm1vbnRoXCIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGFibGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24ubGVuZ3RoID49IHRoaXMuc2VsZWN0YWJsZUNvdW50KSB7XG4gICAgICAgICAgICByZW1vdmVkID0gdGhpcy5zZWxlY3Rpb24uc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtICh0aGlzLnNlbGVjdGFibGVDb3VudCAtIDEpKTtcbiAgICAgICAgICAgIHJlbW92ZWQuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tbW9udGg9XCInICsgVS5kYXRlKGQsIHtcInJldHVyblwiOiAneXl5eS1NTS1kZCd9KSArICdcIl0nKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLW1vbnRoXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgalF1ZXJ5KHRhcmdldCkuYWRkQ2xhc3MoXCJzZWxlY3RlZC1tb250aFwiKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgIGlmICh0aGlzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljay5jYWxsKHtcbiAgICAgICAgICAgICAgc2VsZjogdGhpcywgZGF0ZTogdmFsdWUsIHRhcmdldDogdGhpcy50YXJnZXQsIGRhdGVFbGVtZW50OiB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW9kZShcImRheVwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG1vZGUgPT0gXCJ5ZWFyXCIpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RNb2RlID09IFwieWVhclwiKSB7XG4gICAgICAgIGlmIChzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxlbmd0aCA+PSB0aGlzLnNlbGVjdGFibGVDb3VudCkge1xuICAgICAgICAgICAgcmVtb3ZlZCA9IHRoaXMuc2VsZWN0aW9uLnNwbGljZSgwLCB0aGlzLnNlbGVjdGlvbi5sZW5ndGggLSAodGhpcy5zZWxlY3RhYmxlQ291bnQgLSAxKSk7XG4gICAgICAgICAgICByZW1vdmVkLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLXllYXI9XCInICsgVS5kYXRlKGQsIHtcInJldHVyblwiOiAneXl5eS1NTS1kZCd9KSArICdcIl0nKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXllYXJcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBqUXVlcnkodGFyZ2V0KS5hZGRDbGFzcyhcInNlbGVjdGVkLXllYXJcIik7XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5vbkNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2suY2FsbCh7XG4gICAgICAgICAgICAgIHNlbGY6IHRoaXMsIGRhdGU6IHZhbHVlLCB0YXJnZXQ6IHRoaXMudGFyZ2V0LCBkYXRlRWxlbWVudDogdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmNoYW5nZU1vZGUoXCJtb250aFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW9kZSA9IG51bGw7XG4gIHRhcmdldCA9IG51bGw7XG4gIHZhbHVlID0gbnVsbDtcbiAgcmVtb3ZlZCA9IG51bGw7XG4gIGR0ID0gbnVsbDtcbiAgc2VsZWN0YWJsZSA9IG51bGw7XG59O1xuY29uc3QgbW92ZSA9IGZ1bmN0aW9uIChlLCB0YXJnZXQsIHZhbHVlKSB7XG4gIHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItbW92ZVwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKHRhcmdldCkge1xuICAgIHZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItbW92ZVwiKTtcbiAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJkXCIpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBcImxlZnRcIikge1xuICAgICAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSwge2FkZDoge206IC0xfX0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7bTogMX19KTtcbiAgICAgIH1cbiAgICAgIHByaW50RGF5LmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwibW9udGhcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwibVwiKSB7XG4gICAgICBpZiAodmFsdWUgPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZGlzcGxheURhdGUgPSBVLmRhdGUodGhpcy5jb25maWcuZGlzcGxheURhdGUsIHthZGQ6IHt5OiAtMX19KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSwge2FkZDoge3k6IDF9fSk7XG4gICAgICB9XG4gICAgICBwcmludE1vbnRoLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwieWVhclwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5XCIpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBcImxlZnRcIikge1xuICAgICAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSwge2FkZDoge3k6IC0xMH19KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSwge2FkZDoge3k6IDEwfX0pO1xuICAgICAgfVxuICAgICAgcHJpbnRZZWFyLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHRhcmdldCA9IG51bGw7XG4gIHZhbHVlID0gbnVsbDtcbn07XG5jb25zdCBhcHBseU1hcmtlck1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZFwiKSB7XG4gICAgICBmb3IgKGxldCBrIGluIHRoaXMubWFya2VyTWFwKSB7XG4gICAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwiJyArIGsgKyAnXCJdJykuYWRkQ2xhc3ModGhpcy5tYXJrZXJNYXBba10udGhlbWUgfHwgdGhpcy5jb25maWcuZGVmYXVsdE1hcmtlclRoZW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmJpbmQodGhpcykpO1xufTtcbmNvbnN0IGFwcGx5U2VsZWN0aW9uTWFwID0gZnVuY3Rpb24gKCkge1xuICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChsZXQgayBpbiB0aGlzLnNlbGVjdGlvbk1hcCkge1xuICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5hZGRDbGFzcyhcInNlbGVjdGVkLWRheVwiKTtcbiAgICB9XG4gIH0pLmJpbmQodGhpcykpO1xufTtcbmNvbnN0IGFwcGx5UGVyaW9kTWFwID0gZnVuY3Rpb24gKCkge1xuICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PT0gXCJkXCIpIHtcbiAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5wZXJpb2RNYXApIHtcbiAgICAgICAgaWYgKHRoaXMucGVyaW9kTWFwW2tdLmxhYmVsKSB7XG4gICAgICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5maW5kKFwiLmFkZG9uLWZvb3RlclwiKS5odG1sKHRoaXMucGVyaW9kTWFwW2tdLmxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZT1cIicgKyBrICsgJ1wiXScpLmFkZENsYXNzKHRoaXMucGVyaW9kTWFwW2tdLnRoZW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmJpbmQodGhpcykpO1xufTtcbmNvbnN0IGNsZWFyUGVyaW9kTWFwID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJkYXlcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcImRcIikge1xuICAgIGZvciAobGV0IGsgaW4gdGhpcy5wZXJpb2RNYXApIHtcbiAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwiJyArIGsgKyAnXCJdJykuZmluZChcIi5hZGRvbi1mb290ZXJcIikuZW1wdHkoKTtcbiAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwiJyArIGsgKyAnXCJdJykucmVtb3ZlQ2xhc3ModGhpcy5wZXJpb2RNYXBba10udGhlbWUpO1xuICAgIH1cbiAgfVxufTtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlDYWxlbmRhciBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbmZpZy50aGVtZSA9ICdkZWZhdWx0J11cbiAgICogQHBhcmFtIHshKG9iamVjdHxzdHJpbmcpfSBbY29uZmlnLnRhcmdldF1cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb25maWcuYW5pbWF0ZVRpbWUgPSAxMDBdXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb25maWcub25TdGF0ZUNoYW5nZWRdXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb25maWcub25DbGlja11cbiAgICogQHBhcmFtIFtjb25maWcuY29udGVudF1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIG15Q2FsZW5kYXIgPSBuZXcgQVg2VUlDYWxlbmRhcigpO1xuICAgKiBgYGBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGNsaWNrRXZlbnROYW1lOiBcImNsaWNrXCIsXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgc3RhcnRPZldlZWs6IDAsXG4gICAgICBtb2RlOiAnZGF5JywgLy8gZGF5fG1vbnRofHllYXIsXG4gICAgICBkYXRlRm9ybWF0OiAneXl5eS1NTS1kZCcsXG4gICAgICBkaXNwbGF5RGF0ZTogKG5ldyBEYXRlKCkpLFxuICAgICAgYW5pbWF0ZVRpbWU6IDEwMCxcbiAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgY29udHJvbEhlaWdodDogJzQwJyxcbiAgICAgICAgY29udHJvbEJ1dHRvbldpZHRoOiAnNDAnLFxuICAgICAgICBjb2xIZWFkSGVpZ2h0OiAnMzAnLFxuICAgICAgICBpdGVtUGFkZGluZzogMlxuICAgICAgfSxcbiAgICAgIGxhbmc6IHtcbiAgICAgICAgeWVhckhlYWRpbmc6IFwiQ2hvb3NlIHRoZSB5ZWFyXCIsXG4gICAgICAgIG1vbnRoSGVhZGluZzogXCJDaG9vc2UgdGhlIG1vbnRoXCIsXG4gICAgICAgIHllYXJUbXBsOiBcIiVzXCIsXG4gICAgICAgIG1vbnRoczogaW5mby5tb250aHMgfHwgWydKQU4nLCAnRkVCJywgJ01BUicsICdBUFInLCAnTUFZJywgJ0pVTicsICdKVUwnLCAnQVVHJywgJ1NFUCcsICdPQ1QnLCAnTk9WJywgJ0RFQyddLFxuICAgICAgICBkYXlUbXBsOiBcIiVzXCJcbiAgICAgIH0sXG4gICAgICBtdWx0aXBsZVNlbGVjdDogZmFsc2UsXG4gICAgICBzZWxlY3RNb2RlOiAnZGF5JyxcbiAgICAgIGRlZmF1bHRNYXJrZXJUaGVtZTogJ2hvbGlkYXknLFxuICAgICAgZGVmYXVsdFBlcmlvZFRoZW1lOiAncGVyaW9kJ1xuICAgIH07XG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIC8vIOuppOuyhCDrs4DsiJgg7LSI6riw7ZmUXG4gICAgdGhpcy4kdGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IFtdO1xuICAgIHRoaXMuc2VsZWN0aW9uTWFwID0ge307XG4gICAgdGhpcy5zZWxlY3RhYmxlTWFwID0ge307XG4gICAgdGhpcy5tYXJrZXJNYXAgPSB7fTtcbiAgICB0aGlzLnByaW50ZWREYXkgPSB7XG4gICAgICBzdGFydDogXCJcIiwgZW5kOiBcIlwiXG4gICAgfTtcbiAgICB0aGlzLnNlbGVjdGFibGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIEFYNlVJQ2FsZW5kYXIuaW5pdFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLmluaXQoKTtcbiAgICogYGBgXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQgPSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgdGhpcy5vbkNsaWNrID0gdGhpcy5jb25maWcub25DbGljaztcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25DbGljaztcblxuICAgIGlmICghdGhpcy5jb25maWcudGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2Y2FsZW5kYXJcIiwgXCI0MDFcIiwgXCJzZXRDb25maWdcIikpO1xuICAgIH1cbiAgICB0aGlzLiR0YXJnZXQgPSBqUXVlcnkodGhpcy5jb25maWcudGFyZ2V0KTtcbiAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG5cbiAgICB0aGlzLiR0YXJnZXQuaHRtbChnZXRGcmFtZS5jYWxsKHRoaXMpKTtcblxuICAgIC8vIOu2gOyGjeyImOynkVxuICAgIHRoaXMuJCA9IHtcbiAgICAgIFwicm9vdFwiOiB0aGlzLiR0YXJnZXQuZmluZCgnW2RhdGEtY2FsZW5kYXItZWxzPVwicm9vdFwiXScpLFxuICAgICAgXCJjb250cm9sXCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1jYWxlbmRhci1lbHM9XCJjb250cm9sXCJdJyksXG4gICAgICBcImNvbnRyb2wtZGlzcGxheVwiOiB0aGlzLiR0YXJnZXQuZmluZCgnW2RhdGEtY2FsZW5kYXItZWxzPVwiY29udHJvbC1kaXNwbGF5XCJdJyksXG4gICAgICBcImJvZHlcIjogdGhpcy4kdGFyZ2V0LmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWVscz1cImJvZHlcIl0nKVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcuY29udHJvbCkge1xuICAgICAgdGhpcy4kW1wicm9vdFwiXS5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWNhbGVuZGFyLW1vdmVdJywgKGUpID0+IHtcbiAgICAgICAgbW92ZS5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNvbGxlY3Qgc2VsZWN0YWJsZU1hcFxuICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuY29uZmlnLnNlbGVjdGlvbiwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyBjb2xsZWN0IHNlbGVjdGFibGVNYXBcbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RhYmxlKHRoaXMuY29uZmlnLnNlbGVjdGFibGUsIGZhbHNlKTtcbiAgICB9XG4gICAgLy8gY29sbGVjdCBtYXJrZXJNYXBcbiAgICBpZiAodGhpcy5jb25maWcubWFya2VyKSB7XG4gICAgICB0aGlzLnNldE1hcmtlcih0aGlzLmNvbmZpZy5tYXJrZXIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJkYXlcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcImRcIikge1xuICAgICAgICBwcmludERheS5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT09IFwibW9udGhcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcIm1cIikge1xuICAgICAgICBwcmludE1vbnRoLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJ5ZWFyXCIgfHwgdGhpcy5jb25maWcubW9kZSA9PT0gXCJ5XCIpIHtcbiAgICAgICAgcHJpbnRZZWFyLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5pbml0T25jZVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLmluaXRPbmNlKCk7XG4gICAqIGBgYFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE91dHB1dHMgdG8gdGhlIHNjcmVlbiBpbiB0aGUgb3V0cHV0IG1vZGUgZGVmaW5lZCBpbiB0aGUgQ2FsZW5kYXIuIElmIHlvdSBwYXNzIGFuIGFyZ3VtZW50LCB5b3UgY2FuIGNoYW5nZSB0aGUgb3V0cHV0IG1vZGUgYW5kIG91dHB1dCByZWZlcmVuY2UgZGF0ZS5cbiAgICog7LqY66aw642U7J2YIOuqqOuTnOulvCDrs4Dqsr3tlanri4jri6QuXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5jaGFuZ2VNb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlIC0gZGF5LCBkLCBtb250aCwgbSAsIHllYXIsIHlcbiAgICogQHBhcmFtIHsoRGF0ZXxzdHJpbmcpfSBbY2hhbmdlRGF0ZV1cbiAgICogQHJldHVybiB7QVg2VUlDYWxlbmRhcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwieVwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwieWVhclwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwibW9udGhcIik7XG4gICAqIG15Q2FsZW5kYXIuY2hhbmdlTW9kZShcIm1cIik7XG4gICAqIG15Q2FsZW5kYXIuY2hhbmdlTW9kZShcImRheVwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwiZFwiKTtcbiAgICogYGBgXG4gICAqL1xuICBjaGFuZ2VNb2RlKG1vZGUsIGNoYW5nZURhdGUpIHtcbiAgICBpZiAodHlwZW9mIGNoYW5nZURhdGUgIT0gXCJ1bmRlZmluZWRcIikgdGhpcy5jb25maWcuZGlzcGxheURhdGUgPSBjaGFuZ2VEYXRlO1xuICAgIGlmIChtb2RlKSB0aGlzLmNvbmZpZy5tb2RlID0gbW9kZTtcblxuICAgIHRoaXMuJFtcImJvZHlcIl1cbiAgICAgIC5yZW1vdmVDbGFzcyhcImZhZGVpblwiKVxuICAgICAgLmFkZENsYXNzKFwiZmFkZW91dFwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJkYXlcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwiZFwiKSB7XG4gICAgICAgIHByaW50RGF5LmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcIm1vbnRoXCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcIm1cIikge1xuICAgICAgICBwcmludE1vbnRoLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcInllYXJcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwieVwiKSB7XG4gICAgICAgIHByaW50WWVhci5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJFtcImJvZHlcIl0ucmVtb3ZlQ2xhc3MoXCJmYWRlb3V0XCIpLmFkZENsYXNzKFwiZmFkZWluXCIpO1xuICAgIH0sIHRoaXMuY29uZmlnLmFuaW1hdGVUaW1lKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdG8gc3RhdGUgYSBkYXRlIGlzIHNlbGVjdGVkLCB3aGljaCBpcyBpbmNsdWRlZCBpbiB0aGUgc2VsZWN0aW9uLlxuICAgKiDsupjrprDrjZTsl5Ag7ZW064u57J287J6Q66W8IOyEoO2DneuQnCDsg4Htg5zroZwg7ISk7KCV7ZWp64uI64ukLlxuICAgKiBAbWV0aG9kIEFYNlVJQ2FsZW5kYXIuc2V0U2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1ByaW50XVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGlvbihbbmV3IERhdGUoKV0pO1xuICAgKiBgYGBcbiAgICovXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24sIGlzUHJpbnQpIHtcbiAgICB0aGlzLnNlbGVjdGlvbk1hcCA9IHt9O1xuICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAnYXJyJzogZnVuY3Rpb24gKHYsIG1hcCwgY291bnQpIHtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGlmICghVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHYgPSB2LnNwbGljZSgwLCBjb3VudCk7XG4gICAgICAgIHYuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZShuKSlcbiAgICAgICAgICAgIG4gPSBVLmRhdGUobiwgeydyZXR1cm4nOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSk7XG4gICAgICAgICAgbWFwW25dID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0YWJsZUNvdW50ID0gKHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0KSA/IChVLmlzTnVtYmVyKHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0KSkgPyB0aGlzLmNvbmZpZy5tdWx0aXBsZVNlbGVjdCA6IDIgOiAxO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdGlvbiA9IHNlbGVjdGlvbikge1xuICAgICAgaWYgKFUuaXNBcnJheShzZWxlY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdCA9IHByb2Nlc3Nvci5hcnIuY2FsbCh0aGlzLCBzZWxlY3Rpb24sIHt9LCB0aGlzLnNlbGVjdGFibGVDb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGlvbk1hcCA9IGpRdWVyeS5leHRlbmQoe30sIHJlc3VsdCk7XG4gICAgLy8g67OA6rK964K07JqpIOyggeyaqe2VmOyXrCDstpzroKVcblxuICAgIGlmIChpc1ByaW50ICE9PSBmYWxzZSkgYXBwbHlTZWxlY3Rpb25NYXAuY2FsbCh0aGlzKTtcblxuICAgIHJlc3VsdCA9IG51bGw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiDsupjrprDrjZTsl5DshJwg7ISg7YOd65CcIOydvOyekOulvCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5nZXRTZWxlY3Rpb25cbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuZ2V0U2VsZWN0aW9uKCk7XG4gICAqIGBgYFxuICAgKi9cbiAgZ2V0U2VsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRhdGUgLyB5ZWFyIC8gbW9udGggdGhhdCBjYW4gYmUgc2VsZWN0ZWQgZnJvbSB0aGUgQ2FsZW5kYXIuIHNlbGVjdGFibGUgaXMsIEFycmF5IGFuZCBPYmplY3Qoe2Zyb206ICcnLCB0bzogJyd9KSBpcyBtYWRlIHVwIG9mLlxuICAgKiDsupjrprDrjZTsl5Ag7ZW064u57J287J6Q66W8IOyEoO2Dne2VoCDsiJgg7J6I64qUIOyDge2DnOuhnCDshKTsoJXtlanri4jri6QuXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5zZXRTZWxlY3RhYmxlXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGFibGVcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNQcmludF1cbiAgICogQHJldHVybiB7QVg2VUlDYWxlbmRhcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5zZXRTZWxlY3RhYmxlKFsnMjAxNi0wMS0wMScsIC4uLl0pO1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoW25ldyBEYXRlKCksIC4uLl0pO1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoeyByYW5nZTogW3tmcm9tOiAnMjAxNi0wMS0wMScsIHRvOiAnMjAxNi0wMS0xMCd9XSB9KTtcbiAgICogbXlDYWxlbmRhci5zZXRTZWxlY3RhYmxlKHsgcmFuZ2U6IFt7ZnJvbTogbmV3IERhdGUoKSwgdG86IG5ldyBEYXRlKCl9XSB9KTtcbiAgICogbXlDYWxlbmRhci5zZXRTZWxlY3RhYmxlKHsgJzIwMTYtMDEtMDEnOiB0cnVlLCAnMjAxNi0wMS0wMic6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0U2VsZWN0YWJsZShzZWxlY3RhYmxlLCBpc1ByaW50KSB7XG4gICAgdGhpcy5zZWxlY3RhYmxlTWFwID0ge307XG4gICAgbGV0IGtleSwgcmVzdWx0ID0ge307XG4gICAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgICAgJ2Fycic6IGZ1bmN0aW9uICh2LCBtYXApIHtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGlmICghVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICB2LmZvckVhY2goKG4pID0+IHtcbiAgICAgICAgICBpZiAoVS5pc0RhdGUobikpIG4gPSBVLmRhdGUobiwgeydyZXR1cm4nOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSk7XG4gICAgICAgICAgbWFwW25dID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9LFxuICAgICAgJ29iaic6IGZ1bmN0aW9uICh2LCBtYXApIHtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGlmIChVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIGlmICh2LnJhbmdlKSByZXR1cm4gbWFwO1xuICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcbiAgICAgICAgICBtYXBba10gPSB2W2tdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9LFxuICAgICAgJ3JhbmdlJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKFUuaXNBcnJheSh2KSkgcmV0dXJuIG1hcDtcbiAgICAgICAgaWYgKCF2LnJhbmdlKSByZXR1cm4gbWFwO1xuXG4gICAgICAgIHYucmFuZ2UuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZUZvcm1hdChuLmZyb20pICYmIFUuaXNEYXRlRm9ybWF0KG4udG8pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkID0gVS5kYXRlKG4uZnJvbSk7IGQgPD0gVS5kYXRlKG4udG8pOyBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKSkge1xuICAgICAgICAgICAgICBtYXBbVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gbi5mcm9tOyBpIDw9IG4udG87IGkrKykge1xuICAgICAgICAgICAgICBtYXBbaV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlKSB7XG4gICAgICBpZiAoVS5pc0FycmF5KHNlbGVjdGFibGUpKSB7XG4gICAgICAgIHJlc3VsdCA9IHByb2Nlc3Nvci5hcnIuY2FsbCh0aGlzLCBzZWxlY3RhYmxlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGtleSBpbiBwcm9jZXNzb3IpIHtcbiAgICAgICAgICBpZiAoc2VsZWN0YWJsZVtrZXldKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBwcm9jZXNzb3Jba2V5XS5jYWxsKHRoaXMsIHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3Nvci5vYmouY2FsbCh0aGlzLCBzZWxlY3RhYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0YWJsZU1hcCA9IHJlc3VsdDtcbiAgICAvLyDrs4Dqsr3rgrTsmqkg7KCB7Jqp7ZWY7JesIOy2nOugpVxuICAgIGlmIChpc1ByaW50ICE9PSBmYWxzZSkgdGhpcy5jaGFuZ2VNb2RlKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiDsupjrprDrjZTsl5Ag7Zy07J287J2EIO2RnOyLnO2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLm1hcmtlclxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFya2VyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzQXBwbHldXG4gICAqIEByZXR1cm4ge0FYNlVJQ2FsZW5kYXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuc2V0TWFya2VyKHtcbiAgICAgKiAnMjAxNi0wMi0wNyc6IHt0aGVtZTogJ2hvbGlkYXknLCBsYWJlbDogJ+yEpOuCoCd9LFxuICAgICAqICcyMDE2LTAyLTA4Jzoge3RoZW1lOiAnaG9saWRheScsIGxhYmVsOiAn7ISk64KgJ30sXG4gICAgICogJzIwMTYtMDItMDknOiB7dGhlbWU6ICdob2xpZGF5JywgbGFiZWw6ICfshKTrgqAnfSxcbiAgICAgKiAnMjAxNi0wMi0xMCc6IHt0aGVtZTogJ2hvbGlkYXknLCBsYWJlbDogJ+uMgOyytO2ctOydvCd9XG4gICAgICogIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHNldE1hcmtlcihtYXJrZXIsIGlzQXBwbHkpIHtcbiAgICB0aGlzLm1hcmtlck1hcCA9IHt9O1xuICAgIGxldCBrZXksIHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHByb2Nlc3NvciA9IHtcbiAgICAgICdvYmonOiBmdW5jdGlvbiAodiwgbWFwKSB7XG4gICAgICAgIG1hcCA9IHt9O1xuICAgICAgICBpZiAoVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICBpZiAodi5yYW5nZSkgcmV0dXJuIG1hcDtcbiAgICAgICAgZm9yIChsZXQgayBpbiB2KSB7XG4gICAgICAgICAgbWFwW2tdID0gdltrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHYgPSBudWxsO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfSxcbiAgICAgICdyYW5nZSc6IGZ1bmN0aW9uICh2LCBtYXApIHtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGlmIChVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIGlmICghdi5yYW5nZSkgcmV0dXJuIG1hcDtcblxuICAgICAgICB2LnJhbmdlLmZvckVhY2goKG4pID0+IHtcbiAgICAgICAgICBpZiAoVS5pc0RhdGVGb3JtYXQobi5mcm9tKSAmJiBVLmlzRGF0ZUZvcm1hdChuLnRvKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgZCA9IFUuZGF0ZShuLmZyb20pOyBkIDw9IFUuZGF0ZShuLnRvKTsgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSkpIHtcbiAgICAgICAgICAgICAgbWFwW1UuZGF0ZShkLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pXSA9IHt0aGVtZTogbi50aGVtZSwgbGFiZWw6IG4ubGFiZWx9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBuLmZyb207IGkgPD0gbi50bzsgaSsrKSB7XG4gICAgICAgICAgICAgIG1hcFtpXSA9IHt0aGVtZTogbi50aGVtZSwgbGFiZWw6IG4ubGFiZWx9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdiA9IG51bGw7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXJrZXIgPSBtYXJrZXIpIHtcbiAgICAgIGZvciAoa2V5IGluIHByb2Nlc3Nvcikge1xuICAgICAgICBpZiAobWFya2VyW2tleV0pIHtcbiAgICAgICAgICByZXN1bHQgPSBwcm9jZXNzb3Jba2V5XS5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXN1bHQgPSBwcm9jZXNzb3Iub2JqLmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1hcmtlck1hcCA9IHJlc3VsdDtcbiAgICAvLyDrs4Dqsr3rgrTsmqkg7KCB7Jqp7ZWY7JesIOy2nOugpVxuICAgIGlmIChpc0FwcGx5ICE9PSBmYWxzZSkgYXBwbHlNYXJrZXJNYXAuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIEFYNlVJQ2FsZW5kYXIuc2V0UGVyaW9kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwZXJpb2RcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNBcHBseV1cbiAgICogQHJldHVybiB7QVg2VUlDYWxlbmRhcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5zZXRQZXJpb2Qoe1xuICAgICAqICByYW5nZTogW1xuICAgICAqICAgICAge2Zyb206ICcyMDE2LTA3LTA1JywgdG86ICcyMDE2LTA3LTA5JywgZnJvbUxhYmVsOiAn7Iuc7J6RJywgdG9MYWJlbDogJ+yiheujjCd9LFxuICAgICAqICAgICAge2Zyb206ICcyMDE2LTA3LTExJywgdG86ICcyMDE2LTA3LTE1JywgZnJvbUxhYmVsOiAn7Iuc7J6RJywgdG9MYWJlbDogJ+yiheujjCd9XG4gICAgICogIF1cbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBzZXRQZXJpb2QocGVyaW9kLCBpc0FwcGx5KSB7XG4gICAgbGV0IGtleSwgcmVzdWx0ID0ge307XG4gICAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgICAgJ3JhbmdlJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKFUuaXNBcnJheSh2KSkgcmV0dXJuIG1hcDtcbiAgICAgICAgaWYgKCF2LnJhbmdlKSByZXR1cm4gbWFwO1xuXG4gICAgICAgIHYucmFuZ2UuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZUZvcm1hdChuLmZyb20pICYmIFUuaXNEYXRlRm9ybWF0KG4udG8pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkID0gbmV3IERhdGUoVS5kYXRlKG4uZnJvbSkpOyBkIDw9IFUuZGF0ZShuLnRvKTsgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSkpIHtcbiAgICAgICAgICAgICAgaWYgKGQuZ2V0VGltZSgpID09IFUuZGF0ZShuLmZyb20pLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgIG1hcFtVLmRhdGUoZCwge1wicmV0dXJuXCI6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KV0gPSB7XG4gICAgICAgICAgICAgICAgICB0aGVtZTogbi50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0UGVyaW9kVGhlbWUsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogbi5mcm9tTGFiZWxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGQuZ2V0VGltZSgpID09IFUuZGF0ZShuLnRvKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICBtYXBbVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSldID0ge1xuICAgICAgICAgICAgICAgICAgdGhlbWU6IG4udGhlbWUgfHwgdGhpcy5jb25maWcuZGVmYXVsdFBlcmlvZFRoZW1lLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IG4udG9MYWJlbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFwW1UuZGF0ZShkLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pXSA9IHt0aGVtZTogbi50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0UGVyaW9kVGhlbWV9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8g67OA6rK964K07JqpIOyggeyaqe2VmOyXrCDstpzroKVcbiAgICBpZiAoaXNBcHBseSAhPT0gZmFsc2UpIHtcbiAgICAgIGNsZWFyUGVyaW9kTWFwLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnBlcmlvZCA9IHBlcmlvZCkge1xuICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLnJhbmdlLmNhbGwodGhpcywgcGVyaW9kKTtcbiAgICB9XG5cbiAgICB0aGlzLnBlcmlvZE1hcCA9IHJlc3VsdDtcblxuICAgIC8vIOuzgOqyveuCtOyaqSDsoIHsmqntlZjsl6wg7Lac66ClXG4gICAgaWYgKGlzQXBwbHkgIT09IGZhbHNlKSB7XG4gICAgICBhcHBseVBlcmlvZE1hcC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSUNhbGVuZGFyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlDYWxlbmRhci5qcyJdLCJzb3VyY2VSb290IjoiIn0=