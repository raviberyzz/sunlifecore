/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
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
	version = "3.2.1",

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
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
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
	// Support: IE <=9 - 11, Edge 12 - 13
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

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
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
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

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
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
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
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




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


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
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

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
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


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
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


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
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
var documentElement = document.documentElement;



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

	// Support: IE <=10 - 11, Edge 12 - 13
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
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
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

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
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

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
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
	cssProps: {
		"float": "cssFloat"
	},

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

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
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
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
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


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


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




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
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


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

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
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

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
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
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


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


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


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
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


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
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
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
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

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
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
			if ( jQuery.isWindow( elem ) ) {
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

				if ( jQuery.isWindow( elem ) ) {

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


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




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

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
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
return jQuery;
} );
/*!
 * Bootstrap v3.4.0 (https://getbootstrap.com/)
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.4.0'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    selector    = selector === '#' ? [] : selector
    var $parent = $(document).find(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.4.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.4.0'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      if (typeof $next === 'object' && $next.length) {
        $next[0].offsetWidth // force reflow
      }
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    }

    var target  = $this.attr('data-target') || href
    var $target = $(document).find(target)

    if (!$target.hasClass('carousel')) return

    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.4.0'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(document).find(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(document).find(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.4.0'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(document).find(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options
    this.$body = $(document.body)
    this.$element = $(element)
    this.$dialog = this.$element.find('.modal-dialog')
    this.$backdrop = null
    this.isShown = null
    this.originalBodyPad = null
    this.scrollbarWidth = 0
    this.ignoreBackdropClick = false
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION = '3.4.0'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
          this.$element[0] !== e.target &&
          !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    var scrollbarWidth = this.scrollbarWidth
    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth)
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight
        var calculatedPadding = $(element).css('padding-right')
        $(element)
          .data('padding-right', actualPadding)
          .css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')
      })
    }
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right')
      $(element).removeData('padding-right')
      element.style.paddingRight = padding ? padding : ''
    })
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
    var href = $this.attr('href')
    var target = $this.attr('data-target') ||
      (href && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7

    var $target = $(document).find(target)
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.4.0'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.4.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
        o.content.call($e[0]) :
        o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.4.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.0'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

    this.$target = target
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.4.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*!
 * Parsley.js
 * Version 2.9.1 - built Tue, Apr 30th 2019, 1:56 am
 * http://parsleyjs.org
 * Guillaume Potier - <guillaume@wisembly.com>
 * Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
 * MIT Licensed
 */

// The source code below is generated by babel as
// Parsley is written in ECMAScript 6
//

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
        typeof define === 'function' && define.amd ? define(['jquery'], factory) :
        (global.parsley = factory(global.jQuery));
}(this, (function($) {
    'use strict';

    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _extends() {
        _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        }
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }

        return _arr;
    }

    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    var globalID = 1;
    var pastWarnings = {};
    var Utils = {
        // Parsley DOM-API
        // returns object from dom attributes and values
        attr: function attr(element, namespace, obj) {
            var i;
            var attribute;
            var attributes;
            var regex = new RegExp('^' + namespace, 'i');
            if ('undefined' === typeof obj) obj = {};
            else {
                // Clear all own properties. This won't affect prototype's values
                for (i in obj) {
                    if (obj.hasOwnProperty(i)) delete obj[i];
                }
            }
            if (!element) return obj;
            attributes = element.attributes;

            for (i = attributes.length; i--;) {
                attribute = attributes[i];

                if (attribute && attribute.specified && regex.test(attribute.name)) {
                    obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
                }
            }

            return obj;
        },
        checkAttr: function checkAttr(element, namespace, _checkAttr) {
            return element.hasAttribute(namespace + _checkAttr);
        },
        setAttr: function setAttr(element, namespace, attr, value) {
            element.setAttribute(this.dasherize(namespace + attr), String(value));
        },
        getType: function getType(element) {
            return element.getAttribute('type') || 'text';
        },
        generateID: function generateID() {
            return '' + globalID++;
        },

        /** Third party functions **/
        deserializeValue: function deserializeValue(value) {
            var num;

            try {
                return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? JSON.parse(value) : value) : value;
            } catch (e) {
                return value;
            }
        },
        // Zepto camelize function
        camelize: function camelize(str) {
            return str.replace(/-+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },
        // Zepto dasherize function
        dasherize: function dasherize(str) {
            return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
        },
        warn: function warn() {
            var _window$console;

            if (window.console && 'function' === typeof window.console.warn)(_window$console = window.console).warn.apply(_window$console, arguments);
        },
        warnOnce: function warnOnce(msg) {
            if (!pastWarnings[msg]) {
                pastWarnings[msg] = true;
                this.warn.apply(this, arguments);
            }
        },
        _resetWarnings: function _resetWarnings() {
            pastWarnings = {};
        },
        trimString: function trimString(string) {
            return string.replace(/^\s+|\s+$/g, '');
        },
        parse: {
            date: function date(string) {
                var parsed = string.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
                if (!parsed) return null;

                var _parsed$map = parsed.map(function(x) {
                        return parseInt(x, 10);
                    }),
                    _parsed$map2 = _slicedToArray(_parsed$map, 4),
                    _ = _parsed$map2[0],
                    year = _parsed$map2[1],
                    month = _parsed$map2[2],
                    day = _parsed$map2[3];

                var date = new Date(year, month - 1, day);
                if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return null;
                return date;
            },
            string: function string(_string) {
                return _string;
            },
            integer: function integer(string) {
                if (isNaN(string)) return null;
                return parseInt(string, 10);
            },
            number: function number(string) {
                if (isNaN(string)) throw null;
                return parseFloat(string);
            },
            'boolean': function _boolean(string) {
                return !/^\s*false\s*$/i.test(string);
            },
            object: function object(string) {
                return Utils.deserializeValue(string);
            },
            regexp: function regexp(_regexp) {
                var flags = ''; // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern

                if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
                    // Replace the regexp literal string with the first match group: ([gimy]*)
                    // If no flag is present, this will be a blank string
                    flags = _regexp.replace(/.*\/([gimy]*)$/, '$1'); // Again, replace the regexp literal string with the first match group:
                    // everything excluding the opening and closing slashes and the flags

                    _regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
                } else {
                    // Anchor regexp:
                    _regexp = '^' + _regexp + '$';
                }

                return new RegExp(_regexp, flags);
            }
        },
        parseRequirement: function parseRequirement(requirementType, string) {
            var converter = this.parse[requirementType || 'string'];
            if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
            var converted = converter(string);
            if (converted === null) throw "Requirement is not a ".concat(requirementType, ": \"").concat(string, "\"");
            return converted;
        },
        namespaceEvents: function namespaceEvents(events, namespace) {
            events = this.trimString(events || '').split(/\s+/);
            if (!events[0]) return '';
            return $.map(events, function(evt) {
                return "".concat(evt, ".").concat(namespace);
            }).join(' ');
        },
        difference: function difference(array, remove) {
            // This is O(N^2), should be optimized
            var result = [];
            $.each(array, function(_, elem) {
                if (remove.indexOf(elem) == -1) result.push(elem);
            });
            return result;
        },
        // Alter-ego to native Promise.all, but for jQuery
        all: function all(promises) {
            // jQuery treats $.when() and $.when(singlePromise) differently; let's avoid that and add spurious elements
            return $.when.apply($, _toConsumableArray(promises).concat([42, 42]));
        },
        // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
        objectCreate: Object.create || function() {
            var Object = function Object() {};

            return function(prototype) {
                if (arguments.length > 1) {
                    throw Error('Second argument not supported');
                }

                if (_typeof(prototype) != 'object') {
                    throw TypeError('Argument must be an object');
                }

                Object.prototype = prototype;
                var result = new Object();
                Object.prototype = null;
                return result;
            };
        }(),
        _SubmitSelector: 'input[type="submit"], button:submit'
    };

    // All these options could be overriden and specified directly in DOM using
    // `data-parsley-` default DOM-API
    // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
    // eg: `data-parsley-stop-on-first-failing-constraint="false"`
    var Defaults = {
        // ### General
        // Default data-namespace for DOM API
        namespace: 'data-parsley-',
        // Supported inputs by default
        inputs: 'input, textarea, select',
        // Excluded inputs by default
        excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',
        // Stop validating field on highest priority failing constraint
        priorityEnabled: true,
        // ### Field only
        // identifier used to group together inputs (e.g. radio buttons...)
        multiple: null,
        // identifier (or array of identifiers) used to validate only a select group of inputs
        group: null,
        // ### UI
        // Enable\Disable error messages
        uiEnabled: true,
        // Key events threshold before validation
        validationThreshold: 3,
        // Focused field on form validation error. 'first'|'last'|'none'
        focus: 'first',
        // event(s) that will trigger validation before first failure. eg: `input`...
        trigger: false,
        // event(s) that will trigger validation after first failure.
        triggerAfterFailure: 'input',
        // Class that would be added on every failing validation Parsley field
        errorClass: 'parsley-error',
        // Same for success validation
        successClass: 'parsley-success',
        // Return the `$element` that will receive these above success or error classes
        // Could also be (and given directly from DOM) a valid selector like `'#div'`
        classHandler: function classHandler(Field) {},
        // Return the `$element` where errors will be appended
        // Could also be (and given directly from DOM) a valid selector like `'#div'`
        errorsContainer: function errorsContainer(Field) {},
        // ul elem that would receive errors' list
        errorsWrapper: '<ul class="parsley-errors-list"></ul>',
        // li elem that would receive error message
        errorTemplate: '<li></li>'
    };

    var Base = function Base() {
        this.__id__ = Utils.generateID();
    };

    Base.prototype = {
        asyncSupport: true,
        // Deprecated
        _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
            var _this = this;

            var pipe = function pipe() {
                var r = $.Deferred();
                if (true !== _this.validationResult) r.reject();
                return r.resolve().promise();
            };

            return [pipe, pipe];
        },
        actualizeOptions: function actualizeOptions() {
            Utils.attr(this.element, this.options.namespace, this.domOptions);
            if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
            return this;
        },
        _resetOptions: function _resetOptions(initOptions) {
            this.domOptions = Utils.objectCreate(this.parent.options);
            this.options = Utils.objectCreate(this.domOptions); // Shallow copy of ownProperties of initOptions:

            for (var i in initOptions) {
                if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
            }

            this.actualizeOptions();
        },
        _listeners: null,
        // Register a callback for the given event name
        // Callback is called with context as the first argument and the `this`
        // The context is the current parsley instance, or window.Parsley if global
        // A return value of `false` will interrupt the calls
        on: function on(name, fn) {
            this._listeners = this._listeners || {};
            var queue = this._listeners[name] = this._listeners[name] || [];
            queue.push(fn);
            return this;
        },
        // Deprecated. Use `on` instead
        subscribe: function subscribe(name, fn) {
            $.listenTo(this, name.toLowerCase(), fn);
        },
        // Unregister a callback (or all if none is given) for the given event name
        off: function off(name, fn) {
            var queue = this._listeners && this._listeners[name];

            if (queue) {
                if (!fn) {
                    delete this._listeners[name];
                } else {
                    for (var i = queue.length; i--;) {
                        if (queue[i] === fn) queue.splice(i, 1);
                    }
                }
            }

            return this;
        },
        // Deprecated. Use `off`
        unsubscribe: function unsubscribe(name, fn) {
            $.unsubscribeTo(this, name.toLowerCase());
        },
        // Trigger an event of the given name
        // A return value of `false` interrupts the callback chain
        // Returns false if execution was interrupted
        trigger: function trigger(name, target, extraArg) {
            target = target || this;
            var queue = this._listeners && this._listeners[name];
            var result;

            if (queue) {
                for (var i = queue.length; i--;) {
                    result = queue[i].call(target, target, extraArg);
                    if (result === false) return result;
                }
            }

            if (this.parent) {
                return this.parent.trigger(name, target, extraArg);
            }

            return true;
        },
        asyncIsValid: function asyncIsValid(group, force) {
            Utils.warnOnce("asyncIsValid is deprecated; please use whenValid instead");
            return this.whenValid({
                group: group,
                force: force
            });
        },
        _findRelated: function _findRelated() {
            return this.options.multiple ? $(this.parent.element.querySelectorAll("[".concat(this.options.namespace, "multiple=\"").concat(this.options.multiple, "\"]"))) : this.$element;
        }
    };

    var convertArrayRequirement = function convertArrayRequirement(string, length) {
        var m = string.match(/^\s*\[(.*)\]\s*$/);
        if (!m) throw 'Requirement is not an array: "' + string + '"';
        var values = m[1].split(',').map(Utils.trimString);
        if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
        return values;
    };

    var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
        var main = null;
        var extra = {};

        for (var key in requirementSpec) {
            if (key) {
                var value = extraOptionReader(key);
                if ('string' === typeof value) value = Utils.parseRequirement(requirementSpec[key], value);
                extra[key] = value;
            } else {
                main = Utils.parseRequirement(requirementSpec[key], string);
            }
        }

        return [main, extra];
    }; // A Validator needs to implement the methods `validate` and `parseRequirements`


    var Validator = function Validator(spec) {
        $.extend(true, this, spec);
    };

    Validator.prototype = {
        // Returns `true` iff the given `value` is valid according the given requirements.
        validate: function validate(value, requirementFirstArg) {
            if (this.fn) {
                // Legacy style validator
                if (arguments.length > 3) // If more args then value, requirement, instance...
                    requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest

                return this.fn(value, requirementFirstArg);
            }

            if (Array.isArray(value)) {
                if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
                return this.validateMultiple.apply(this, arguments);
            } else {
                var instance = arguments[arguments.length - 1];

                if (this.validateDate && instance._isDateInput()) {
                    arguments[0] = Utils.parse.date(arguments[0]);
                    if (arguments[0] === null) return false;
                    return this.validateDate.apply(this, arguments);
                }

                if (this.validateNumber) {
                    if (!value) // Builtin validators all accept empty strings, except `required` of course
                        return true;
                    if (isNaN(value)) return false;
                    arguments[0] = parseFloat(arguments[0]);
                    return this.validateNumber.apply(this, arguments);
                }

                if (this.validateString) {
                    return this.validateString.apply(this, arguments);
                }

                throw 'Validator `' + this.name + '` only handles multiple values';
            }
        },
        // Parses `requirements` into an array of arguments,
        // according to `this.requirementType`
        parseRequirements: function parseRequirements(requirements, extraOptionReader) {
            if ('string' !== typeof requirements) {
                // Assume requirement already parsed
                // but make sure we return an array
                return Array.isArray(requirements) ? requirements : [requirements];
            }

            var type = this.requirementType;

            if (Array.isArray(type)) {
                var values = convertArrayRequirement(requirements, type.length);

                for (var i = 0; i < values.length; i++) {
                    values[i] = Utils.parseRequirement(type[i], values[i]);
                }

                return values;
            } else if ($.isPlainObject(type)) {
                return convertExtraOptionRequirement(type, requirements, extraOptionReader);
            } else {
                return [Utils.parseRequirement(type, requirements)];
            }
        },
        // Defaults:
        requirementType: 'string',
        priority: 2
    };

    var ValidatorRegistry = function ValidatorRegistry(validators, catalog) {
        this.__class__ = 'ValidatorRegistry'; // Default Parsley locale is en

        this.locale = 'en';
        this.init(validators || {}, catalog || {});
    };

    var typeTesters = {
        email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
        // Follow https://www.w3.org/TR/html5/infrastructure.html#floating-point-numbers
        number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
        integer: /^-?\d+$/,
        digits: /^\d+$/,
        alphanum: /^\w+$/i,
        date: {
            test: function test(value) {
                return Utils.parse.date(value) !== null;
            }
        },
        url: new RegExp("^" + // protocol identifier
            "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
            // user:pass authentication
            "(?:\\S+(?::\\S*)?@)?" + "(?:" + // IP address exclusion
            // private & local networks
            // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
            // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
            // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + // host name
            "(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)" + // domain name
            "(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*" + // TLD identifier
            "(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,}))" + ")" + // port number
            "(?::\\d{2,5})?" + // resource path
            "(?:/\\S*)?" + "$")
    };
    typeTesters.range = typeTesters.number; // See http://stackoverflow.com/a/10454560/8279

    var decimalPlaces = function decimalPlaces(num) {
        var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

        if (!match) {
            return 0;
        }

        return Math.max(0, // Number of digits right of decimal point.
            (match[1] ? match[1].length : 0) - ( // Adjust for scientific notation.
                match[2] ? +match[2] : 0));
    }; // parseArguments('number', ['1', '2']) => [1, 2]


    var parseArguments = function parseArguments(type, args) {
        return args.map(Utils.parse[type]);
    }; // operatorToValidator returns a validating function for an operator function, applied to the given type


    var operatorToValidator = function operatorToValidator(type, operator) {
        return function(value) {
            for (var _len = arguments.length, requirementsAndInput = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                requirementsAndInput[_key - 1] = arguments[_key];
            }

            requirementsAndInput.pop(); // Get rid of `input` argument

            return operator.apply(void 0, [value].concat(_toConsumableArray(parseArguments(type, requirementsAndInput))));
        };
    };

    var comparisonOperator = function comparisonOperator(operator) {
        return {
            validateDate: operatorToValidator('date', operator),
            validateNumber: operatorToValidator('number', operator),
            requirementType: operator.length <= 2 ? 'string' : ['string', 'string'],
            // Support operators with a 1 or 2 requirement(s)
            priority: 30
        };
    };

    ValidatorRegistry.prototype = {
        init: function init(validators, catalog) {
            this.catalog = catalog; // Copy prototype's validators:

            this.validators = _extends({}, this.validators);

            for (var name in validators) {
                this.addValidator(name, validators[name].fn, validators[name].priority);
            }

            window.Parsley.trigger('parsley:validator:init');
        },
        // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
        setLocale: function setLocale(locale) {
            if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');
            this.locale = locale;
            return this;
        },
        // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
        addCatalog: function addCatalog(locale, messages, set) {
            if ('object' === _typeof(messages)) this.catalog[locale] = messages;
            if (true === set) return this.setLocale(locale);
            return this;
        },
        // Add a specific message for a given constraint in a given locale
        addMessage: function addMessage(locale, name, message) {
            if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};
            this.catalog[locale][name] = message;
            return this;
        },
        // Add messages for a given locale
        addMessages: function addMessages(locale, nameMessageObject) {
            for (var name in nameMessageObject) {
                this.addMessage(locale, name, nameMessageObject[name]);
            }

            return this;
        },
        // Add a new validator
        //
        //    addValidator('custom', {
        //        requirementType: ['integer', 'integer'],
        //        validateString: function(value, from, to) {},
        //        priority: 22,
        //        messages: {
        //          en: "Hey, that's no good",
        //          fr: "Aye aye, pas bon du tout",
        //        }
        //    })
        //
        // Old API was addValidator(name, function, priority)
        //
        addValidator: function addValidator(name, arg1, arg2) {
            if (this.validators[name]) Utils.warn('Validator "' + name + '" is already defined.');
            else if (Defaults.hasOwnProperty(name)) {
                Utils.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
                return;
            }
            return this._setValidator.apply(this, arguments);
        },
        hasValidator: function hasValidator(name) {
            return !!this.validators[name];
        },
        updateValidator: function updateValidator(name, arg1, arg2) {
            if (!this.validators[name]) {
                Utils.warn('Validator "' + name + '" is not already defined.');
                return this.addValidator.apply(this, arguments);
            }

            return this._setValidator.apply(this, arguments);
        },
        removeValidator: function removeValidator(name) {
            if (!this.validators[name]) Utils.warn('Validator "' + name + '" is not defined.');
            delete this.validators[name];
            return this;
        },
        _setValidator: function _setValidator(name, validator, priority) {
            if ('object' !== _typeof(validator)) {
                // Old style validator, with `fn` and `priority`
                validator = {
                    fn: validator,
                    priority: priority
                };
            }

            if (!validator.validate) {
                validator = new Validator(validator);
            }

            this.validators[name] = validator;

            for (var locale in validator.messages || {}) {
                this.addMessage(locale, name, validator.messages[locale]);
            }

            return this;
        },
        getErrorMessage: function getErrorMessage(constraint) {
            var message; // Type constraints are a bit different, we have to match their requirements too to find right error message

            if ('type' === constraint.name) {
                var typeMessages = this.catalog[this.locale][constraint.name] || {};
                message = typeMessages[constraint.requirements];
            } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);

            return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
        },
        // Kind of light `sprintf()` implementation
        formatMessage: function formatMessage(string, parameters) {
            if ('object' === _typeof(parameters)) {
                for (var i in parameters) {
                    string = this.formatMessage(string, parameters[i]);
                }

                return string;
            }

            return 'string' === typeof string ? string.replace(/%s/i, parameters) : '';
        },
        // Here is the Parsley default validators list.
        // A validator is an object with the following key values:
        //  - priority: an integer
        //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
        //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
        // Alternatively, a validator can be a function that returns such an object
        //
        validators: {
            notblank: {
                validateString: function validateString(value) {
                    return /\S/.test(value);
                },
                priority: 2
            },
            required: {
                validateMultiple: function validateMultiple(values) {
                    return values.length > 0;
                },
                validateString: function validateString(value) {
                    return /\S/.test(value);
                },
                priority: 512
            },
            type: {
                validateString: function validateString(value, type) {
                    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                        _ref$step = _ref.step,
                        step = _ref$step === void 0 ? 'any' : _ref$step,
                        _ref$base = _ref.base,
                        base = _ref$base === void 0 ? 0 : _ref$base;

                    var tester = typeTesters[type];

                    if (!tester) {
                        throw new Error('validator type `' + type + '` is not supported');
                    }

                    if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

                    if (!tester.test(value)) return false;

                    if ('number' === type) {
                        if (!/^any$/i.test(step || '')) {
                            var nb = Number(value);
                            var decimals = Math.max(decimalPlaces(step), decimalPlaces(base));
                            if (decimalPlaces(nb) > decimals) // Value can't have too many decimals
                                return false; // Be careful of rounding errors by using integers.

                            var toInt = function toInt(f) {
                                return Math.round(f * Math.pow(10, decimals));
                            };

                            if ((toInt(nb) - toInt(base)) % toInt(step) != 0) return false;
                        }
                    }

                    return true;
                },
                requirementType: {
                    '': 'string',
                    step: 'string',
                    base: 'number'
                },
                priority: 256
            },
            pattern: {
                validateString: function validateString(value, regexp) {
                    if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

                    return regexp.test(value);
                },
                requirementType: 'regexp',
                priority: 64
            },
            minlength: {
                validateString: function validateString(value, requirement) {
                    if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

                    return value.length >= requirement;
                },
                requirementType: 'integer',
                priority: 30
            },
            maxlength: {
                validateString: function validateString(value, requirement) {
                    return value.length <= requirement;
                },
                requirementType: 'integer',
                priority: 30
            },
            length: {
                validateString: function validateString(value, min, max) {
                    if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

                    return value.length >= min && value.length <= max;
                },
                requirementType: ['integer', 'integer'],
                priority: 30
            },
            mincheck: {
                validateMultiple: function validateMultiple(values, requirement) {
                    return values.length >= requirement;
                },
                requirementType: 'integer',
                priority: 30
            },
            maxcheck: {
                validateMultiple: function validateMultiple(values, requirement) {
                    return values.length <= requirement;
                },
                requirementType: 'integer',
                priority: 30
            },
            check: {
                validateMultiple: function validateMultiple(values, min, max) {
                    return values.length >= min && values.length <= max;
                },
                requirementType: ['integer', 'integer'],
                priority: 30
            },
            min: comparisonOperator(function(value, requirement) {
                return value >= requirement;
            }),
            max: comparisonOperator(function(value, requirement) {
                return value <= requirement;
            }),
            range: comparisonOperator(function(value, min, max) {
                return value >= min && value <= max;
            }),
            equalto: {
                validateString: function validateString(value, refOrValue) {
                    if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

                    var $reference = $(refOrValue);
                    if ($reference.length) return value === $reference.val();
                    else return value === refOrValue;
                },
                priority: 256
            },
            euvatin: {
                validateString: function validateString(value, refOrValue) {
                    if (!value) {
                        return true; // Builtin validators all accept empty strings, except `required` of course
                    }

                    var re = /^[A-Z][A-Z][A-Za-z0-9 -]{2,}$/;
                    return re.test(value);
                },
                priority: 30
            }
        }
    };

    var UI = {};

    var diffResults = function diffResults(newResult, oldResult, deep) {
        var added = [];
        var kept = [];

        for (var i = 0; i < newResult.length; i++) {
            var found = false;

            for (var j = 0; j < oldResult.length; j++) {
                if (newResult[i].assert.name === oldResult[j].assert.name) {
                    found = true;
                    break;
                }
            }

            if (found) kept.push(newResult[i]);
            else added.push(newResult[i]);
        }

        return {
            kept: kept,
            added: added,
            removed: !deep ? diffResults(oldResult, newResult, true).added : []
        };
    };

    UI.Form = {
        _actualizeTriggers: function _actualizeTriggers() {
            var _this = this;

            this.$element.on('submit.Parsley', function(evt) {
                _this.onSubmitValidate(evt);
            });
            this.$element.on('click.Parsley', Utils._SubmitSelector, function(evt) {
                _this.onSubmitButton(evt);
            }); // UI could be disabled

            if (false === this.options.uiEnabled) return;
            this.element.setAttribute('novalidate', '');
        },
        focus: function focus() {
            this._focusedField = null;
            if (true === this.validationResult || 'none' === this.options.focus) return null;

            for (var i = 0; i < this.fields.length; i++) {
                var field = this.fields[i];

                if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
                    this._focusedField = field.$element;
                    if ('first' === this.options.focus) break;
                }
            }

            if (null === this._focusedField) return null;
            return this._focusedField.focus();
        },
        _destroyUI: function _destroyUI() {
            // Reset all event listeners
            this.$element.off('.Parsley');
        }
    };
    UI.Field = {
        _reflowUI: function _reflowUI() {
            this._buildUI(); // If this field doesn't have an active UI don't bother doing something


            if (!this._ui) return; // Diff between two validation results

            var diff = diffResults(this.validationResult, this._ui.lastValidationResult); // Then store current validation result for next reflow

            this._ui.lastValidationResult = this.validationResult; // Handle valid / invalid / none field class

            this._manageStatusClass(); // Add, remove, updated errors messages


            this._manageErrorsMessages(diff); // Triggers impl


            this._actualizeTriggers(); // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user


            if ((diff.kept.length || diff.added.length) && !this._failedOnce) {
                this._failedOnce = true;

                this._actualizeTriggers();
            }
        },
        // Returns an array of field's error message(s)
        getErrorsMessages: function getErrorsMessages() {
            // No error message, field is valid
            if (true === this.validationResult) return [];
            var messages = [];

            for (var i = 0; i < this.validationResult.length; i++) {
                messages.push(this.validationResult[i].errorMessage || this._getErrorMessage(this.validationResult[i].assert));
            }

            return messages;
        },
        // It's a goal of Parsley that this method is no longer required [#1073]
        addError: function addError(name) {
            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                message = _ref.message,
                assert = _ref.assert,
                _ref$updateClass = _ref.updateClass,
                updateClass = _ref$updateClass === void 0 ? true : _ref$updateClass;

            this._buildUI();

            this._addError(name, {
                message: message,
                assert: assert
            });

            if (updateClass) this._errorClass();
        },
        // It's a goal of Parsley that this method is no longer required [#1073]
        updateError: function updateError(name) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                message = _ref2.message,
                assert = _ref2.assert,
                _ref2$updateClass = _ref2.updateClass,
                updateClass = _ref2$updateClass === void 0 ? true : _ref2$updateClass;

            this._buildUI();

            this._updateError(name, {
                message: message,
                assert: assert
            });

            if (updateClass) this._errorClass();
        },
        // It's a goal of Parsley that this method is no longer required [#1073]
        removeError: function removeError(name) {
            var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref3$updateClass = _ref3.updateClass,
                updateClass = _ref3$updateClass === void 0 ? true : _ref3$updateClass;

            this._buildUI();

            this._removeError(name); // edge case possible here: remove a standard Parsley error that is still failing in this.validationResult
            // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.


            if (updateClass) this._manageStatusClass();
        },
        _manageStatusClass: function _manageStatusClass() {
            if (this.hasConstraints() && this.needsValidation() && true === this.validationResult) this._successClass();
            else if (this.validationResult.length > 0) this._errorClass();
            else this._resetClass();
        },
        _manageErrorsMessages: function _manageErrorsMessages(diff) {
            if ('undefined' !== typeof this.options.errorsMessagesDisabled) return; // Case where we have errorMessage option that configure an unique field error message, regardless failing validators

            if ('undefined' !== typeof this.options.errorMessage) {
                if (diff.added.length || diff.kept.length) {
                    this._insertErrorWrapper();

                    if (0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length) this._ui.$errorsWrapper.append($(this.options.errorTemplate).addClass('parsley-custom-error-message'));
                    return this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage);
                }

                return this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
            } // Show, hide, update failing constraints messages


            for (var i = 0; i < diff.removed.length; i++) {
                this._removeError(diff.removed[i].assert.name);
            }

            for (i = 0; i < diff.added.length; i++) {
                this._addError(diff.added[i].assert.name, {
                    message: diff.added[i].errorMessage,
                    assert: diff.added[i].assert
                });
            }

            for (i = 0; i < diff.kept.length; i++) {
                this._updateError(diff.kept[i].assert.name, {
                    message: diff.kept[i].errorMessage,
                    assert: diff.kept[i].assert
                });
            }
        },
        _addError: function _addError(name, _ref4) {
            var message = _ref4.message,
                assert = _ref4.assert;

            this._insertErrorWrapper();

            this._ui.$errorClassHandler.attr('aria-describedby', this._ui.errorsWrapperId);

            this._ui.$errorsWrapper.addClass('filled').append($(this.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(assert)));
        },
        _updateError: function _updateError(name, _ref5) {
            var message = _ref5.message,
                assert = _ref5.assert;

            this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(assert));
        },
        _removeError: function _removeError(name) {
            this._ui.$errorClassHandler.removeAttr('aria-describedby');

            this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();
        },
        _getErrorMessage: function _getErrorMessage(constraint) {
            var customConstraintErrorMessage = constraint.name + 'Message';
            if ('undefined' !== typeof this.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(this.options[customConstraintErrorMessage], constraint.requirements);
            return window.Parsley.getErrorMessage(constraint);
        },
        _buildUI: function _buildUI() {
            // UI could be already built or disabled
            if (this._ui || false === this.options.uiEnabled) return;
            var _ui = {}; // Give field its Parsley id in DOM

            this.element.setAttribute(this.options.namespace + 'id', this.__id__);
            /** Generate important UI elements and store them in this **/
            // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes

            _ui.$errorClassHandler = this._manageClassHandler(); // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer

            _ui.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__);
            _ui.$errorsWrapper = $(this.options.errorsWrapper).attr('id', _ui.errorsWrapperId); // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly

            _ui.lastValidationResult = [];
            _ui.validationInformationVisible = false; // Store it in this for later

            this._ui = _ui;
        },
        // Determine which element will have `parsley-error` and `parsley-success` classes
        _manageClassHandler: function _manageClassHandler() {
            // Class handled could also be determined by function given in Parsley options
            if ('string' === typeof this.options.classHandler && $(this.options.classHandler).length) return $(this.options.classHandler); // Class handled could also be determined by function given in Parsley options

            var $handlerFunction = this.options.classHandler; // It might also be the function name of a global function

            if ('string' === typeof this.options.classHandler && 'function' === typeof window[this.options.classHandler]) $handlerFunction = window[this.options.classHandler];

            if ('function' === typeof $handlerFunction) {
                var $handler = $handlerFunction.call(this, this); // If this function returned a valid existing DOM element, go for it

                if ('undefined' !== typeof $handler && $handler.length) return $handler;
            } else if ('object' === _typeof($handlerFunction) && $handlerFunction instanceof jQuery && $handlerFunction.length) {
                return $handlerFunction;
            } else if ($handlerFunction) {
                Utils.warn('The class handler `' + $handlerFunction + '` does not exist in DOM nor as a global JS function');
            }

            return this._inputHolder();
        },
        _inputHolder: function _inputHolder() {
            // if simple element (input, texatrea, select...) it will perfectly host the classes and precede the error container
            if (!this.options.multiple || this.element.nodeName === 'SELECT') return this.$element; // But if multiple element (radio, checkbox), that would be their parent

            return this.$element.parent();
        },
        _insertErrorWrapper: function _insertErrorWrapper() {
            var $errorsContainer = this.options.errorsContainer; // Nothing to do if already inserted

            if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();

            if ('string' === typeof $errorsContainer) {
                if ($($errorsContainer).length) return $($errorsContainer).append(this._ui.$errorsWrapper);
                else if ('function' === typeof window[$errorsContainer]) $errorsContainer = window[$errorsContainer];
                else Utils.warn('The errors container `' + $errorsContainer + '` does not exist in DOM nor as a global JS function');
            }

            if ('function' === typeof $errorsContainer) $errorsContainer = $errorsContainer.call(this, this);
            if ('object' === _typeof($errorsContainer) && $errorsContainer.length) return $errorsContainer.append(this._ui.$errorsWrapper);
            return this._inputHolder().after(this._ui.$errorsWrapper);
        },
        _actualizeTriggers: function _actualizeTriggers() {
            var _this2 = this;

            var $toBind = this._findRelated();

            var trigger; // Remove Parsley events already bound on this field

            $toBind.off('.Parsley');
            if (this._failedOnce) $toBind.on(Utils.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function() {
                _this2._validateIfNeeded();
            });
            else if (trigger = Utils.namespaceEvents(this.options.trigger, 'Parsley')) {
                $toBind.on(trigger, function(event) {
                    _this2._validateIfNeeded(event);
                });
            }
        },
        _validateIfNeeded: function _validateIfNeeded(event) {
            var _this3 = this;

            // For keyup, keypress, keydown, input... events that could be a little bit obstrusive
            // do not validate if val length < min threshold on first validation. Once field have been validated once and info
            // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
            if (event && /key|input/.test(event.type))
                if (!(this._ui && this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold) return;

            if (this.options.debounce) {
                window.clearTimeout(this._debounced);
                this._debounced = window.setTimeout(function() {
                    return _this3.validate();
                }, this.options.debounce);
            } else this.validate();
        },
        _resetUI: function _resetUI() {
            // Reset all event listeners
            this._failedOnce = false;

            this._actualizeTriggers(); // Nothing to do if UI never initialized for this field


            if ('undefined' === typeof this._ui) return; // Reset all errors' li

            this._ui.$errorsWrapper.removeClass('filled').children().remove(); // Reset validation class


            this._resetClass(); // Reset validation flags and last validation result


            this._ui.lastValidationResult = [];
            this._ui.validationInformationVisible = false;
        },
        _destroyUI: function _destroyUI() {
            this._resetUI();

            if ('undefined' !== typeof this._ui) this._ui.$errorsWrapper.remove();
            delete this._ui;
        },
        _successClass: function _successClass() {
            this._ui.validationInformationVisible = true;

            this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
        },
        _errorClass: function _errorClass() {
            this._ui.validationInformationVisible = true;

            this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
        },
        _resetClass: function _resetClass() {
            this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
        }
    };

    var Form = function Form(element, domOptions, options) {
        this.__class__ = 'Form';
        this.element = element;
        this.$element = $(element);
        this.domOptions = domOptions;
        this.options = options;
        this.parent = window.Parsley;
        this.fields = [];
        this.validationResult = null;
    };

    var statusMapping = {
        pending: null,
        resolved: true,
        rejected: false
    };
    Form.prototype = {
        onSubmitValidate: function onSubmitValidate(event) {
            var _this = this;

            // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
            if (true === event.parsley) return; // If we didn't come here through a submit button, use the first one in the form

            var submitSource = this._submitSource || this.$element.find(Utils._SubmitSelector)[0];
            this._submitSource = null;
            this.$element.find('.parsley-synthetic-submit-button').prop('disabled', true);
            if (submitSource && null !== submitSource.getAttribute('formnovalidate')) return;
            window.Parsley._remoteCache = {};
            var promise = this.whenValidate({
                event: event
            });

            if ('resolved' === promise.state() && false !== this._trigger('submit'));
            else {
                // Rejected or pending: cancel this submit
                event.stopImmediatePropagation();
                event.preventDefault();
                if ('pending' === promise.state()) promise.done(function() {
                    _this._submit(submitSource);
                });
            }
        },
        onSubmitButton: function onSubmitButton(event) {
            this._submitSource = event.currentTarget;
        },
        // internal
        // _submit submits the form, this time without going through the validations.
        // Care must be taken to "fake" the actual submit button being clicked.
        _submit: function _submit(submitSource) {
            if (false === this._trigger('submit')) return; // Add submit button's data

            if (submitSource) {
                var $synthetic = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', false);
                if (0 === $synthetic.length) $synthetic = $('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element);
                $synthetic.attr({
                    name: submitSource.getAttribute('name'),
                    value: submitSource.getAttribute('value')
                });
            }

            this.$element.trigger(_extends($.Event('submit'), {
                parsley: true
            }));
        },
        // Performs validation on fields while triggering events.
        // @returns `true` if all validations succeeds, `false`
        // if a failure is immediately detected, or `null`
        // if dependant on a promise.
        // Consider using `whenValidate` instead.
        validate: function validate(options) {
            if (arguments.length >= 1 && !$.isPlainObject(options)) {
                Utils.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');

                var _arguments = Array.prototype.slice.call(arguments),
                    group = _arguments[0],
                    force = _arguments[1],
                    event = _arguments[2];

                options = {
                    group: group,
                    force: force,
                    event: event
                };
            }

            return statusMapping[this.whenValidate(options).state()];
        },
        whenValidate: function whenValidate() {
            var _this2 = this,
                _Utils$all$done$fail$;

            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                group = _ref.group,
                force = _ref.force,
                event = _ref.event;

            this.submitEvent = event;

            if (event) {
                this.submitEvent = _extends({}, event, {
                    preventDefault: function preventDefault() {
                        Utils.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`");
                        _this2.validationResult = false;
                    }
                });
            }

            this.validationResult = true; // fire validate event to eventually modify things before every validation

            this._trigger('validate'); // Refresh form DOM options and form's fields that could have changed


            this._refreshFields();

            var promises = this._withoutReactualizingFormOptions(function() {
                return $.map(_this2.fields, function(field) {
                    return field.whenValidate({
                        force: force,
                        group: group
                    });
                });
            });

            return (_Utils$all$done$fail$ = Utils.all(promises).done(function() {
                _this2._trigger('success');
            }).fail(function() {
                _this2.validationResult = false;

                _this2.focus();

                _this2._trigger('error');
            }).always(function() {
                _this2._trigger('validated');
            })).pipe.apply(_Utils$all$done$fail$, _toConsumableArray(this._pipeAccordingToValidationResult()));
        },
        // Iterate over refreshed fields, and stop on first failure.
        // Returns `true` if all fields are valid, `false` if a failure is detected
        // or `null` if the result depends on an unresolved promise.
        // Prefer using `whenValid` instead.
        isValid: function isValid(options) {
            if (arguments.length >= 1 && !$.isPlainObject(options)) {
                Utils.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');

                var _arguments2 = Array.prototype.slice.call(arguments),
                    group = _arguments2[0],
                    force = _arguments2[1];

                options = {
                    group: group,
                    force: force
                };
            }

            return statusMapping[this.whenValid(options).state()];
        },
        // Iterate over refreshed fields and validate them.
        // Returns a promise.
        // A validation that immediately fails will interrupt the validations.
        whenValid: function whenValid() {
            var _this3 = this;

            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                group = _ref2.group,
                force = _ref2.force;

            this._refreshFields();

            var promises = this._withoutReactualizingFormOptions(function() {
                return $.map(_this3.fields, function(field) {
                    return field.whenValid({
                        group: group,
                        force: force
                    });
                });
            });

            return Utils.all(promises);
        },
        refresh: function refresh() {
            this._refreshFields();

            return this;
        },
        // Reset UI
        reset: function reset() {
            // Form case: emit a reset event for each field
            for (var i = 0; i < this.fields.length; i++) {
                this.fields[i].reset();
            }

            this._trigger('reset');
        },
        // Destroy Parsley instance (+ UI)
        destroy: function destroy() {
            // Field case: emit destroy event to clean UI and then destroy stored instance
            this._destroyUI(); // Form case: destroy all its fields and then destroy stored instance


            for (var i = 0; i < this.fields.length; i++) {
                this.fields[i].destroy();
            }

            this.$element.removeData('Parsley');

            this._trigger('destroy');
        },
        _refreshFields: function _refreshFields() {
            return this.actualizeOptions()._bindFields();
        },
        _bindFields: function _bindFields() {
            var _this4 = this;

            var oldFields = this.fields;
            this.fields = [];
            this.fieldsMappedById = {};

            this._withoutReactualizingFormOptions(function() {
                _this4.$element.find(_this4.options.inputs).not(_this4.options.excluded).not("[".concat(_this4.options.namespace, "excluded=true]")).each(function(_, element) {
                    var fieldInstance = new window.Parsley.Factory(element, {}, _this4); // Only add valid and not excluded `Field` and `FieldMultiple` children

                    if ('Field' === fieldInstance.__class__ || 'FieldMultiple' === fieldInstance.__class__) {
                        var uniqueId = fieldInstance.__class__ + '-' + fieldInstance.__id__;

                        if ('undefined' === typeof _this4.fieldsMappedById[uniqueId]) {
                            _this4.fieldsMappedById[uniqueId] = fieldInstance;

                            _this4.fields.push(fieldInstance);
                        }
                    }
                });

                $.each(Utils.difference(oldFields, _this4.fields), function(_, field) {
                    field.reset();
                });
            });

            return this;
        },
        // Internal only.
        // Looping on a form's fields to do validation or similar
        // will trigger reactualizing options on all of them, which
        // in turn will reactualize the form's options.
        // To avoid calling actualizeOptions so many times on the form
        // for nothing, _withoutReactualizingFormOptions temporarily disables
        // the method actualizeOptions on this form while `fn` is called.
        _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
            var oldActualizeOptions = this.actualizeOptions;

            this.actualizeOptions = function() {
                return this;
            };

            var result = fn();
            this.actualizeOptions = oldActualizeOptions;
            return result;
        },
        // Internal only.
        // Shortcut to trigger an event
        // Returns true iff event is not interrupted and default not prevented.
        _trigger: function _trigger(eventName) {
            return this.trigger('form:' + eventName);
        }
    };

    var Constraint = function Constraint(parsleyField, name, requirements, priority, isDomConstraint) {
        var validatorSpec = window.Parsley._validatorRegistry.validators[name];
        var validator = new Validator(validatorSpec);
        priority = priority || parsleyField.options[name + 'Priority'] || validator.priority;
        isDomConstraint = true === isDomConstraint;

        _extends(this, {
            validator: validator,
            name: name,
            requirements: requirements,
            priority: priority,
            isDomConstraint: isDomConstraint
        });

        this._parseRequirements(parsleyField.options);
    };

    var capitalize = function capitalize(str) {
        var cap = str[0].toUpperCase();
        return cap + str.slice(1);
    };

    Constraint.prototype = {
        validate: function validate(value, instance) {
            var _this$validator;

            return (_this$validator = this.validator).validate.apply(_this$validator, [value].concat(_toConsumableArray(this.requirementList), [instance]));
        },
        _parseRequirements: function _parseRequirements(options) {
            var _this = this;

            this.requirementList = this.validator.parseRequirements(this.requirements, function(key) {
                return options[_this.name + capitalize(key)];
            });
        }
    };

    var Field = function Field(field, domOptions, options, parsleyFormInstance) {
        this.__class__ = 'Field';
        this.element = field;
        this.$element = $(field); // Set parent if we have one

        if ('undefined' !== typeof parsleyFormInstance) {
            this.parent = parsleyFormInstance;
        }

        this.options = options;
        this.domOptions = domOptions; // Initialize some properties

        this.constraints = [];
        this.constraintsByName = {};
        this.validationResult = true; // Bind constraints

        this._bindConstraints();
    };

    var statusMapping$1 = {
        pending: null,
        resolved: true,
        rejected: false
    };
    Field.prototype = {
        // # Public API
        // Validate field and trigger some events for mainly `UI`
        // @returns `true`, an array of the validators that failed, or
        // `null` if validation is not finished. Prefer using whenValidate
        validate: function validate(options) {
            if (arguments.length >= 1 && !$.isPlainObject(options)) {
                Utils.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.');
                options = {
                    options: options
                };
            }

            var promise = this.whenValidate(options);
            if (!promise) // If excluded with `group` option
                return true;

            switch (promise.state()) {
                case 'pending':
                    return null;

                case 'resolved':
                    return true;

                case 'rejected':
                    return this.validationResult;
            }
        },
        // Validate field and trigger some events for mainly `UI`
        // @returns a promise that succeeds only when all validations do
        // or `undefined` if field is not in the given `group`.
        whenValidate: function whenValidate() {
            var _this$whenValid$alway,
                _this = this;

            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                force = _ref.force,
                group = _ref.group;

            // do not validate a field if not the same as given validation group
            this.refresh();
            if (group && !this._isInGroup(group)) return;
            this.value = this.getValue(); // Field Validate event. `this.value` could be altered for custom needs

            this._trigger('validate');

            return (_this$whenValid$alway = this.whenValid({
                force: force,
                value: this.value,
                _refreshed: true
            }).always(function() {
                _this._reflowUI();
            }).done(function() {
                _this._trigger('success');
            }).fail(function() {
                _this._trigger('error');
            }).always(function() {
                _this._trigger('validated');
            })).pipe.apply(_this$whenValid$alway, _toConsumableArray(this._pipeAccordingToValidationResult()));
        },
        hasConstraints: function hasConstraints() {
            return 0 !== this.constraints.length;
        },
        // An empty optional field does not need validation
        needsValidation: function needsValidation(value) {
            if ('undefined' === typeof value) value = this.getValue(); // If a field is empty and not required, it is valid
            // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators

            if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;
            return true;
        },
        _isInGroup: function _isInGroup(group) {
            if (Array.isArray(this.options.group)) return -1 !== $.inArray(group, this.options.group);
            return this.options.group === group;
        },
        // Just validate field. Do not trigger any event.
        // Returns `true` iff all constraints pass, `false` if there are failures,
        // or `null` if the result can not be determined yet (depends on a promise)
        // See also `whenValid`.
        isValid: function isValid(options) {
            if (arguments.length >= 1 && !$.isPlainObject(options)) {
                Utils.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');

                var _arguments = Array.prototype.slice.call(arguments),
                    force = _arguments[0],
                    value = _arguments[1];

                options = {
                    force: force,
                    value: value
                };
            }

            var promise = this.whenValid(options);
            if (!promise) // Excluded via `group`
                return true;
            return statusMapping$1[promise.state()];
        },
        // Just validate field. Do not trigger any event.
        // @returns a promise that succeeds only when all validations do
        // or `undefined` if the field is not in the given `group`.
        // The argument `force` will force validation of empty fields.
        // If a `value` is given, it will be validated instead of the value of the input.
        whenValid: function whenValid() {
            var _this2 = this;

            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref2$force = _ref2.force,
                force = _ref2$force === void 0 ? false : _ref2$force,
                value = _ref2.value,
                group = _ref2.group,
                _refreshed = _ref2._refreshed;

            // Recompute options and rebind constraints to have latest changes
            if (!_refreshed) this.refresh(); // do not validate a field if not the same as given validation group

            if (group && !this._isInGroup(group)) return;
            this.validationResult = true; // A field without constraint is valid

            if (!this.hasConstraints()) return $.when(); // Value could be passed as argument, needed to add more power to 'field:validate'

            if ('undefined' === typeof value || null === value) value = this.getValue();
            if (!this.needsValidation(value) && true !== force) return $.when();

            var groupedConstraints = this._getGroupedConstraints();

            var promises = [];
            $.each(groupedConstraints, function(_, constraints) {
                // Process one group of constraints at a time, we validate the constraints
                // and combine the promises together.
                var promise = Utils.all($.map(constraints, function(constraint) {
                    return _this2._validateConstraint(value, constraint);
                }));
                promises.push(promise);
                if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
            });
            return Utils.all(promises);
        },
        // @returns a promise
        _validateConstraint: function _validateConstraint(value, constraint) {
            var _this3 = this;

            var result = constraint.validate(value, this); // Map false to a failed promise

            if (false === result) result = $.Deferred().reject(); // Make sure we return a promise and that we record failures

            return Utils.all([result]).fail(function(errorMessage) {
                if (!(_this3.validationResult instanceof Array)) _this3.validationResult = [];

                _this3.validationResult.push({
                    assert: constraint,
                    errorMessage: 'string' === typeof errorMessage && errorMessage
                });
            });
        },
        // @returns Parsley field computed value that could be overrided or configured in DOM
        getValue: function getValue() {
            var value; // Value could be overriden in DOM or with explicit options

            if ('function' === typeof this.options.value) value = this.options.value(this);
            else if ('undefined' !== typeof this.options.value) value = this.options.value;
            else value = this.$element.val(); // Handle wrong DOM or configurations

            if ('undefined' === typeof value || null === value) return '';
            return this._handleWhitespace(value);
        },
        // Reset UI
        reset: function reset() {
            this._resetUI();

            return this._trigger('reset');
        },
        // Destroy Parsley instance (+ UI)
        destroy: function destroy() {
            // Field case: emit destroy event to clean UI and then destroy stored instance
            this._destroyUI();

            this.$element.removeData('Parsley');
            this.$element.removeData('FieldMultiple');

            this._trigger('destroy');
        },
        // Actualize options and rebind constraints
        refresh: function refresh() {
            this._refreshConstraints();

            return this;
        },
        _refreshConstraints: function _refreshConstraints() {
            return this.actualizeOptions()._bindConstraints();
        },
        refreshConstraints: function refreshConstraints() {
            Utils.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh");
            return this.refresh();
        },

        /**
         * Add a new constraint to a field
         *
         * @param {String}   name
         * @param {Mixed}    requirements      optional
         * @param {Number}   priority          optional
         * @param {Boolean}  isDomConstraint   optional
         */
        addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {
            if (window.Parsley._validatorRegistry.validators[name]) {
                var constraint = new Constraint(this, name, requirements, priority, isDomConstraint); // if constraint already exist, delete it and push new version

                if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);
                this.constraints.push(constraint);
                this.constraintsByName[constraint.name] = constraint;
            }

            return this;
        },
        // Remove a constraint
        removeConstraint: function removeConstraint(name) {
            for (var i = 0; i < this.constraints.length; i++) {
                if (name === this.constraints[i].name) {
                    this.constraints.splice(i, 1);
                    break;
                }
            }

            delete this.constraintsByName[name];
            return this;
        },
        // Update a constraint (Remove + re-add)
        updateConstraint: function updateConstraint(name, parameters, priority) {
            return this.removeConstraint(name).addConstraint(name, parameters, priority);
        },
        // # Internals
        // Internal only.
        // Bind constraints from config + options + DOM
        _bindConstraints: function _bindConstraints() {
            var constraints = [];
            var constraintsByName = {}; // clean all existing DOM constraints to only keep javascript user constraints

            for (var i = 0; i < this.constraints.length; i++) {
                if (false === this.constraints[i].isDomConstraint) {
                    constraints.push(this.constraints[i]);
                    constraintsByName[this.constraints[i].name] = this.constraints[i];
                }
            }

            this.constraints = constraints;
            this.constraintsByName = constraintsByName; // then re-add Parsley DOM-API constraints

            for (var name in this.options) {
                this.addConstraint(name, this.options[name], undefined, true);
            } // finally, bind special HTML5 constraints


            return this._bindHtml5Constraints();
        },
        // Internal only.
        // Bind specific HTML5 constraints to be HTML5 compliant
        _bindHtml5Constraints: function _bindHtml5Constraints() {
            // html5 required
            if (null !== this.element.getAttribute('required')) this.addConstraint('required', true, undefined, true); // html5 pattern

            if (null !== this.element.getAttribute('pattern')) this.addConstraint('pattern', this.element.getAttribute('pattern'), undefined, true); // range

            var min = this.element.getAttribute('min');
            var max = this.element.getAttribute('max');
            if (null !== min && null !== max) this.addConstraint('range', [min, max], undefined, true); // HTML5 min
            else if (null !== min) this.addConstraint('min', min, undefined, true); // HTML5 max
            else if (null !== max) this.addConstraint('max', max, undefined, true); // length

            if (null !== this.element.getAttribute('minlength') && null !== this.element.getAttribute('maxlength')) this.addConstraint('length', [this.element.getAttribute('minlength'), this.element.getAttribute('maxlength')], undefined, true); // HTML5 minlength
            else if (null !== this.element.getAttribute('minlength')) this.addConstraint('minlength', this.element.getAttribute('minlength'), undefined, true); // HTML5 maxlength
            else if (null !== this.element.getAttribute('maxlength')) this.addConstraint('maxlength', this.element.getAttribute('maxlength'), undefined, true); // html5 types

            var type = Utils.getType(this.element); // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise

            if ('number' === type) {
                return this.addConstraint('type', ['number', {
                    step: this.element.getAttribute('step') || '1',
                    base: min || this.element.getAttribute('value')
                }], undefined, true); // Regular other HTML5 supported types
            } else if (/^(email|url|range|date)$/i.test(type)) {
                return this.addConstraint('type', type, undefined, true);
            }

            return this;
        },
        // Internal only.
        // Field is required if have required constraint without `false` value
        _isRequired: function _isRequired() {
            if ('undefined' === typeof this.constraintsByName.required) return false;
            return false !== this.constraintsByName.required.requirements;
        },
        // Internal only.
        // Shortcut to trigger an event
        _trigger: function _trigger(eventName) {
            return this.trigger('field:' + eventName);
        },
        // Internal only
        // Handles whitespace in a value
        // Use `data-parsley-whitespace="squish"` to auto squish input value
        // Use `data-parsley-whitespace="trim"` to auto trim input value
        _handleWhitespace: function _handleWhitespace(value) {
            if (true === this.options.trimValue) Utils.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');
            if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');
            if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = Utils.trimString(value);
            return value;
        },
        _isDateInput: function _isDateInput() {
            var c = this.constraintsByName.type;
            return c && c.requirements === 'date';
        },
        // Internal only.
        // Returns the constraints, grouped by descending priority.
        // The result is thus an array of arrays of constraints.
        _getGroupedConstraints: function _getGroupedConstraints() {
            if (false === this.options.priorityEnabled) return [this.constraints];
            var groupedConstraints = [];
            var index = {}; // Create array unique of priorities

            for (var i = 0; i < this.constraints.length; i++) {
                var p = this.constraints[i].priority;
                if (!index[p]) groupedConstraints.push(index[p] = []);
                index[p].push(this.constraints[i]);
            } // Sort them by priority DESC


            groupedConstraints.sort(function(a, b) {
                return b[0].priority - a[0].priority;
            });
            return groupedConstraints;
        }
    };

    var Multiple = function Multiple() {
        this.__class__ = 'FieldMultiple';
    };

    Multiple.prototype = {
        // Add new `$element` sibling for multiple field
        addElement: function addElement($element) {
            this.$elements.push($element);
            return this;
        },
        // See `Field._refreshConstraints()`
        _refreshConstraints: function _refreshConstraints() {
            var fieldConstraints;
            this.constraints = []; // Select multiple special treatment

            if (this.element.nodeName === 'SELECT') {
                this.actualizeOptions()._bindConstraints();

                return this;
            } // Gather all constraints for each input in the multiple group


            for (var i = 0; i < this.$elements.length; i++) {
                // Check if element have not been dynamically removed since last binding
                if (!$('html').has(this.$elements[i]).length) {
                    this.$elements.splice(i, 1);
                    continue;
                }

                fieldConstraints = this.$elements[i].data('FieldMultiple')._refreshConstraints().constraints;

                for (var j = 0; j < fieldConstraints.length; j++) {
                    this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
                }
            }

            return this;
        },
        // See `Field.getValue()`
        getValue: function getValue() {
            // Value could be overriden in DOM
            if ('function' === typeof this.options.value) return this.options.value(this);
            else if ('undefined' !== typeof this.options.value) return this.options.value; // Radio input case

            if (this.element.nodeName === 'INPUT') {
                var type = Utils.getType(this.element);
                if (type === 'radio') return this._findRelated().filter(':checked').val() || ''; // checkbox input case

                if (type === 'checkbox') {
                    var values = [];

                    this._findRelated().filter(':checked').each(function() {
                        values.push($(this).val());
                    });

                    return values;
                }
            } // Select multiple case


            if (this.element.nodeName === 'SELECT' && null === this.$element.val()) return []; // Default case that should never happen

            return this.$element.val();
        },
        _init: function _init() {
            this.$elements = [this.$element];
            return this;
        }
    };

    var Factory = function Factory(element, options, parsleyFormInstance) {
        this.element = element;
        this.$element = $(element); // If the element has already been bound, returns its saved Parsley instance

        var savedparsleyFormInstance = this.$element.data('Parsley');

        if (savedparsleyFormInstance) {
            // If the saved instance has been bound without a Form parent and there is one given in this call, add it
            if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
                savedparsleyFormInstance.parent = parsleyFormInstance;

                savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
            }

            if ('object' === _typeof(options)) {
                _extends(savedparsleyFormInstance.options, options);
            }

            return savedparsleyFormInstance;
        } // Parsley must be instantiated with a DOM element or jQuery $element


        if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');
        if ('undefined' !== typeof parsleyFormInstance && 'Form' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a Form instance');
        this.parent = parsleyFormInstance || window.Parsley;
        return this.init(options);
    };

    Factory.prototype = {
        init: function init(options) {
            this.__class__ = 'Parsley';
            this.__version__ = '2.9.1';
            this.__id__ = Utils.generateID(); // Pre-compute options

            this._resetOptions(options); // A Form instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute


            if (this.element.nodeName === 'FORM' || Utils.checkAttr(this.element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm'); // Every other element is bound as a `Field` or `FieldMultiple`

            return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
        },
        isMultiple: function isMultiple() {
            var type = Utils.getType(this.element);
            return type === 'radio' || type === 'checkbox' || this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple');
        },
        // Multiples fields are a real nightmare :(
        // Maybe some refactoring would be appreciated here...
        handleMultiple: function handleMultiple() {
            var _this = this;

            var name;
            var parsleyMultipleInstance; // Handle multiple name

            this.options.multiple = this.options.multiple || (name = this.element.getAttribute('name')) || this.element.getAttribute('id'); // Special select multiple input

            if (this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple')) {
                this.options.multiple = this.options.multiple || this.__id__;
                return this.bind('parsleyFieldMultiple'); // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
            } else if (!this.options.multiple) {
                Utils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
                return this;
            } // Remove special chars


            this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ''); // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name

            if (name) {
                $('input[name="' + name + '"]').each(function(i, input) {
                    var type = Utils.getType(input);
                    if (type === 'radio' || type === 'checkbox') input.setAttribute(_this.options.namespace + 'multiple', _this.options.multiple);
                });
            } // Check here if we don't already have a related multiple instance saved


            var $previouslyRelated = this._findRelated();

            for (var i = 0; i < $previouslyRelated.length; i++) {
                parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');

                if ('undefined' !== typeof parsleyMultipleInstance) {
                    if (!this.$element.data('FieldMultiple')) {
                        parsleyMultipleInstance.addElement(this.$element);
                    }

                    break;
                }
            } // Create a secret Field instance for every multiple field. It will be stored in `data('FieldMultiple')`
            // And will be useful later to access classic `Field` stuff while being in a `FieldMultiple` instance


            this.bind('parsleyField', true);
            return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
        },
        // Return proper `Form`, `Field` or `FieldMultiple`
        bind: function bind(type, doNotStore) {
            var parsleyInstance;

            switch (type) {
                case 'parsleyForm':
                    parsleyInstance = $.extend(new Form(this.element, this.domOptions, this.options), new Base(), window.ParsleyExtend)._bindFields();
                    break;

                case 'parsleyField':
                    parsleyInstance = $.extend(new Field(this.element, this.domOptions, this.options, this.parent), new Base(), window.ParsleyExtend);
                    break;

                case 'parsleyFieldMultiple':
                    parsleyInstance = $.extend(new Field(this.element, this.domOptions, this.options, this.parent), new Multiple(), new Base(), window.ParsleyExtend)._init();
                    break;

                default:
                    throw new Error(type + 'is not a supported Parsley type');
            }

            if (this.options.multiple) Utils.setAttr(this.element, this.options.namespace, 'multiple', this.options.multiple);

            if ('undefined' !== typeof doNotStore) {
                this.$element.data('FieldMultiple', parsleyInstance);
                return parsleyInstance;
            } // Store the freshly bound instance in a DOM element for later access using jQuery `data()`


            this.$element.data('Parsley', parsleyInstance); // Tell the world we have a new Form or Field instance!

            parsleyInstance._actualizeTriggers();

            parsleyInstance._trigger('init');

            return parsleyInstance;
        }
    };

    var vernums = $.fn.jquery.split('.');

    if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
        throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
    }

    if (!vernums.forEach) {
        Utils.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
    } // Inherit `on`, `off` & `trigger` to Parsley:


    var Parsley = _extends(new Base(), {
        element: document,
        $element: $(document),
        actualizeOptions: null,
        _resetOptions: null,
        Factory: Factory,
        version: '2.9.1'
    }); // Supplement Field and Form with Base
    // This way, the constructors will have access to those methods


    _extends(Field.prototype, UI.Field, Base.prototype);

    _extends(Form.prototype, UI.Form, Base.prototype); // Inherit actualizeOptions and _resetOptions:


    _extends(Factory.prototype, Base.prototype); // ### jQuery API
    // `$('.elem').parsley(options)` or `$('.elem').psly(options)`


    $.fn.parsley = $.fn.psly = function(options) {
        if (this.length > 1) {
            var instances = [];
            this.each(function() {
                instances.push($(this).parsley(options));
            });
            return instances;
        } // Return undefined if applied to non existing DOM element


        if (this.length == 0) {
            return;
        }

        return new Factory(this[0], options);
    }; // ### Field and Form extension
    // Ensure the extension is now defined if it wasn't previously


    if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {}; // ### Parsley config
    // Inherit from ParsleyDefault, and copy over any existing values

    Parsley.options = _extends(Utils.objectCreate(Defaults), window.ParsleyConfig);
    window.ParsleyConfig = Parsley.options; // Old way of accessing global options
    // ### Globals

    window.Parsley = window.psly = Parsley;
    Parsley.Utils = Utils;
    window.ParsleyUtils = {};
    $.each(Utils, function(key, value) {
        if ('function' === typeof value) {
            window.ParsleyUtils[key] = function() {
                Utils.warnOnce('Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead.');
                return Utils[key].apply(Utils, arguments);
            };
        }
    }); // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley

    var registry = window.Parsley._validatorRegistry = new ValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
    window.ParsleyValidator = {};
    $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator'.split(' '), function(i, method) {
        window.Parsley[method] = function() {
            return registry[method].apply(registry, arguments);
        };

        window.ParsleyValidator[method] = function() {
            var _window$Parsley;

            Utils.warnOnce("Accessing the method '".concat(method, "' through Validator is deprecated. Simply call 'window.Parsley.").concat(method, "(...)'"));
            return (_window$Parsley = window.Parsley)[method].apply(_window$Parsley, arguments);
        };
    }); // ### UI
    // Deprecated global object

    window.Parsley.UI = UI;
    window.ParsleyUI = {
        removeError: function removeError(instance, name, doNotUpdateClass) {
            var updateClass = true !== doNotUpdateClass;
            Utils.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method.");
            return instance.removeError(name, {
                updateClass: updateClass
            });
        },
        getErrorsMessages: function getErrorsMessages(instance) {
            Utils.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly.");
            return instance.getErrorsMessages();
        }
    };
    $.each('addError updateError'.split(' '), function(i, method) {
        window.ParsleyUI[method] = function(instance, name, message, assert, doNotUpdateClass) {
            var updateClass = true !== doNotUpdateClass;
            Utils.warnOnce("Accessing UI is deprecated. Call '".concat(method, "' on the instance directly. Please comment in issue 1073 as to your need to call this method."));
            return instance[method](name, {
                message: message,
                assert: assert,
                updateClass: updateClass
            });
        };
    }); // ### PARSLEY auto-binding
    // Prevent it by setting `ParsleyConfig.autoBind` to `false`

    if (false !== window.ParsleyConfig.autoBind) {
        $(function() {
            // Works only on `data-parsley-validate`.
            if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
        });
    }

    var o = $({});

    var deprecated = function deprecated() {
        Utils.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
    }; // Returns an event handler that calls `fn` with the arguments it expects


    function adapt(fn, context) {
        // Store to allow unbinding
        if (!fn.parsleyAdaptedCallback) {
            fn.parsleyAdaptedCallback = function() {
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift(this);
                fn.apply(context || o, args);
            };
        }

        return fn.parsleyAdaptedCallback;
    }

    var eventPrefix = 'parsley:'; // Converts 'parsley:form:validate' into 'form:validate'

    function eventName(name) {
        if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
        return name;
    } // $.listen is deprecated. Use Parsley.on instead.


    $.listen = function(name, callback) {
        var context;
        deprecated();

        if ('object' === _typeof(arguments[1]) && 'function' === typeof arguments[2]) {
            context = arguments[1];
            callback = arguments[2];
        }

        if ('function' !== typeof callback) throw new Error('Wrong parameters');
        window.Parsley.on(eventName(name), adapt(callback, context));
    };

    $.listenTo = function(instance, name, fn) {
        deprecated();
        if (!(instance instanceof Field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
        if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');
        instance.on(eventName(name), adapt(fn));
    };

    $.unsubscribe = function(name, fn) {
        deprecated();
        if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
        window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
    };

    $.unsubscribeTo = function(instance, name) {
        deprecated();
        if (!(instance instanceof Field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
        instance.off(eventName(name));
    };

    $.unsubscribeAll = function(name) {
        deprecated();
        window.Parsley.off(eventName(name));
        $('form,input,textarea,select').each(function() {
            var instance = $(this).data('Parsley');

            if (instance) {
                instance.off(eventName(name));
            }
        });
    }; // $.emit is deprecated. Use jQuery events instead.


    $.emit = function(name, instance) {
        var _instance;

        deprecated();
        var instanceGiven = instance instanceof Field || instance instanceof Form;
        var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
        args.unshift(eventName(name));

        if (!instanceGiven) {
            instance = window.Parsley;
        }

        (_instance = instance).trigger.apply(_instance, _toConsumableArray(args));
    };

    $.extend(true, Parsley, {
        asyncValidators: {
            'default': {
                fn: function fn(xhr) {
                    // By default, only status 2xx are deemed successful.
                    // Note: we use status instead of state() because responses with status 200
                    // but invalid messages (e.g. an empty body for content type set to JSON) will
                    // result in state() === 'rejected'.
                    return xhr.status >= 200 && xhr.status < 300;
                },
                url: false
            },
            reverse: {
                fn: function fn(xhr) {
                    // If reverse option is set, a failing ajax request is considered successful
                    return xhr.status < 200 || xhr.status >= 300;
                },
                url: false
            }
        },
        addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
            Parsley.asyncValidators[name] = {
                fn: fn,
                url: url || false,
                options: options || {}
            };
            return this;
        }
    });
    Parsley.addValidator('remote', {
        requirementType: {
            '': 'string',
            'validator': 'string',
            'reverse': 'boolean',
            'options': 'object'
        },
        validateString: function validateString(value, url, options, instance) {
            var data = {};
            var ajaxOptions;
            var csr;
            var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');
            if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');
            url = Parsley.asyncValidators[validator].url || url; // Fill current value

            if (url.indexOf('{value}') > -1) {
                url = url.replace('{value}', encodeURIComponent(value));
            } else {
                data[instance.element.getAttribute('name') || instance.element.getAttribute('id')] = value;
            } // Merge options passed in from the function with the ones in the attribute


            var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options); // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`

            ajaxOptions = $.extend(true, {}, {
                url: url,
                data: data,
                type: 'GET'
            }, remoteOptions); // Generate store key based on ajax options

            instance.trigger('field:ajaxoptions', instance, ajaxOptions);
            csr = $.param(ajaxOptions); // Initialise querry cache

            if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {}; // Try to retrieve stored xhr

            var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);

            var handleXhr = function handleXhr() {
                var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
                if (!result) // Map falsy results to rejected promise
                    result = $.Deferred().reject();
                return $.when(result);
            };

            return xhr.then(handleXhr, handleXhr);
        },
        priority: -1
    });
    Parsley.on('form:submit', function() {
        Parsley._remoteCache = {};
    });

    Base.prototype.addAsyncValidator = function() {
        Utils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
        return Parsley.addAsyncValidator.apply(Parsley, arguments);
    };

    // This is included with the Parsley library itself,
    Parsley.addMessages('en', {
        defaultMessage: "This value seems to be invalid.",
        type: {
            email: "This value should be a valid email.",
            url: "This value should be a valid url.",
            number: "This value should be a valid number.",
            integer: "This value should be a valid integer.",
            digits: "This value should be digits.",
            alphanum: "This value should be alphanumeric."
        },
        notblank: "This value should not be blank.",
        required: "This value is required.",
        pattern: "This value seems to be invalid.",
        min: "This value should be greater than or equal to %s.",
        max: "This value should be lower than or equal to %s.",
        range: "This value should be between %s and %s.",
        minlength: "This value is too short. It should have %s characters or more.",
        maxlength: "This value is too long. It should have %s characters or fewer.",
        length: "This value length is invalid. It should be between %s and %s characters long.",
        mincheck: "You must select at least %s choices.",
        maxcheck: "You must select %s choices or fewer.",
        check: "You must select between %s and %s choices.",
        equalto: "This value should be the same.",
        euvatin: "It's not a valid VAT Identification Number."
    });
    Parsley.setLocale('en');

    function InputEvent() {
        var _this = this;

        var globals = window || global; // Slightly odd way construct our object. This way methods are force bound.
        // Used to test for duplicate library.

        _extends(this, {
            // For browsers that do not support isTrusted, assumes event is native.
            isNativeEvent: function isNativeEvent(evt) {
                return evt.originalEvent && evt.originalEvent.isTrusted !== false;
            },
            fakeInputEvent: function fakeInputEvent(evt) {
                if (_this.isNativeEvent(evt)) {
                    $(evt.target).trigger('input');
                }
            },
            misbehaves: function misbehaves(evt) {
                if (_this.isNativeEvent(evt)) {
                    _this.behavesOk(evt);

                    $(document).on('change.inputevent', evt.data.selector, _this.fakeInputEvent);

                    _this.fakeInputEvent(evt);
                }
            },
            behavesOk: function behavesOk(evt) {
                if (_this.isNativeEvent(evt)) {
                    $(document) // Simply unbinds the testing handler
                        .off('input.inputevent', evt.data.selector, _this.behavesOk).off('change.inputevent', evt.data.selector, _this.misbehaves);
                }
            },
            // Bind the testing handlers
            install: function install() {
                if (globals.inputEventPatched) {
                    return;
                }

                globals.inputEventPatched = '0.0.3';
                var _arr = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'];

                for (var _i = 0; _i < _arr.length; _i++) {
                    var selector = _arr[_i];
                    $(document).on('input.inputevent', selector, {
                        selector: selector
                    }, _this.behavesOk).on('change.inputevent', selector, {
                        selector: selector
                    }, _this.misbehaves);
                }
            },
            uninstall: function uninstall() {
                delete globals.inputEventPatched;
                $(document).off('.inputevent');
            }
        });
    }
    var inputevent = new InputEvent();

    inputevent.install();

    return Parsley;

})));
//# sourceMappingURL=parsley.js.map
var currentSignInForm;
var contingencyWidgetDisplayed = false;
var signinDataCallDone = false;
var providerURL;

var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
if (lang == 'fr'){

providerURL="https://www.sunnet.sunlife.com/masunlife/ca/f/signinInfo.wca"; 

}
else{

providerURL="https://www.sunnet.sunlife.com/mysunlife/ca/e/signinInfo.wca"; 

}

$(document).ready(function () {
	// deeplink handler for public pages
	 $('.deeplink').click(function(){
	 console.log("before hiting ping url in mbrportal");
     	 var deepLinkName=$(this).attr('deepLinkname');

     	$.ajax({url:'https://www.sunnet.sunlife.com/mbrportal/req/externalPingServices/ping',xhrFields: {withCredentials: true},

		           
			success: function (data, status, xhr) { 
			console.log("return code "+xhr.status);
			var response;
			try{
		       response = JSON.parse(data);
			    if(xhr.status=="200"&&response.status=="OK")
	            {
	               window.location.href = "https://www.sunnet.sunlife.com/redirectBreak.html?RedirectBreak=1&LINK=PPHP_GBC&FC="+deepLinkName;
		        }
			}
			catch(e)
			{
				$('#signin-widget-modal').on('shown.bs.modal', function() {
                updateSignInFormFromDeeplink('form_signon',deepLinkName);
               });
				$("#signin-widget-modal").modal("show");
			  	
			}			         
		
	 },
			  error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus+ " Error: " + errorThrown);
				$('#signin-widget-modal').on('shown.bs.modal', function() {
                updateSignInFormFromDeeplink('form_signon',deepLinkName);
               });
				$("#signin-widget-modal").modal("show");
    } 
    });
	return false;
	 });

});




/* var section = ''; //setup on page load
var url = ''; //setup on page load
var assetTitle = ''; //setup on page load
var pageSection = ''; //setup on page load */

/* function handleTrackingSetup(data) {

    section = data.id;

    url = data.url;

    //add vgn locale parameter
    if (typeof url != "undefined" && $('html').attr('lang') == 'en') {
        url = updateQueryStringParameter(url, 'vgnLocale', 'en');
    } else if (typeof url != "undefined") {
        url = updateQueryStringParameter(url, 'vgnLocale', 'fr');
    }

    assetTitle = '';
    page_section = '';
    if (section == 'loginFrameTop') {
        assetTitle = 'Sign In - Modal';
        pageSection = 'Modal';
    } else if (section == 'loginFrameBottom') {
        assetTitle = 'Sign In - Pinbar';
        pageSection = 'Pinbar';
    } else { // home
        assetTitle = 'Sign In - Main';
        pageSection = 'Homepage main signin';
    }

    // if EC exists in query param
    if (getQueryParamExists('EC')) {
        var ec = getQueryParamExists('EC');
        var obj = {
            title: 'ERROR-' + ec,
            type: 'On Page Impression'
        };
        handleTrackingEvent(obj);
    }
}

// return value of query parameter, false if it doesn't exist.
function getQueryParamExists(paramName) {

    var urlParams = pmcParseParamsFromUrl();
    var queryParamName = paramName;
    var pValue = false;
    if (urlParams[queryParamName]) {
        pValue = unescape(urlParams[queryParamName]);
    }

    return pValue;

}

function pmcParseParamsFromUrl() {
    var params = {};
    var parts = window.location.search.substr(1).split('\x26');
    for (var i = 0; i < parts.length; i++) {
        var keyValuePair = parts[i].split('=');
        var key = unescape(keyValuePair[0]);
        params[key] = keyValuePair[1] ? unescape(keyValuePair[1].replace(/\+/g, '')) : keyValuePair[1];
    }
    return params;
}

function handleTrackingEvent(data) {
    var type = data.type;
    var eventTitle = data.title

    utag.link({
        "asset_type": "Module",
        "asset_title": assetTitle,
        "event_type": type,
        "canonical_url": url,
        "event_title": eventTitle,
        "page_section": pageSection
    });
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
} */
/* Added by zx32 and z291 for Sunlife ca phase 2 ****/


function InStr(strMainString, strSubPhrase) {
    var iEndPos;
    var iMainLength = strMainString.length;
    var iSubLength = strSubPhrase.length;
    for (i = 0; i < iMainLength; i++) {
        if (i + iSubLength > iMainLength)
            iEndPos = iMainLength;
        else
            iEndPos = i + iSubLength;
        if (strSubPhrase == strMainString.substring(i, iEndPos)) return i;
    }
    return -1;
}

function getBrowserInfo() {
    var getBrowserInfo;
    /* Determine Browser Type and Version */
    var userAgent = navigator.userAgent;
    var browserName = "UNKNOWNBROWSER"; //value to be stored in bName cookie
    var browserVersion = "";
    var bVersionMajor, bVersionMinor;
    var iSearchPos = -1;

    if (InStr(userAgent, "MSIE") >= 0) {
        browserName = "MSIE";
        iSearchPos = InStr(userAgent, "MSIE");

    } else if (InStr(userAgent, "Firefox") >= 0) {
        browserName = "FIREFOX";
        iSearchPos = InStr(userAgent, "Firefox");

    } else if (InStr(userAgent, "Safari") >= 0) {
        browserName = "SAFARI";
        iSearchPos = InStr(userAgent, "Safari");

    } else if (InStr(userAgent, "Netscape6") >= 0) {
        browserName = "NETSCAPE";
        iSearchPos = InStr(userAgent, "Netscape6") + 1;

    } else if (InStr(userAgent, "Netscape") >= 0) {
        browserName = "NETSCAPE";
        iSearchPos = InStr(userAgent, "Netscape");

    } else if ((InStr(userAgent, "Mozilla") >= 0) && (browserVersion >= 4)) {
        browserName = "NETSCAPE";
        iSearchPos = InStr(userAgent, "Netscape");

    } else if (InStr(userAgent, "Opera") >= 0) {
        browserName = "OPERA";
        iSearchPos = InStr(userAgent, "Opera");

    } else if (InStr(userAgent, "BlackBerry") >= 0) {
        browserName = "BLACKBRY";

    } else if (InStr(userAgent, "Nokia") >= 0) {
        browserName = "NOKIA";
    }


    /* Blackberry user agent has a completely different format from other browsers */
    var strOS;
    if (browserName == "BLACKBRY") {
        iSearchPos = InStr(userAgent, "BlackBerry") + 10;
        var agentStr = userAgent.substring(iSearchPos);
        strOS = "BB" + agentStr.split('/')[0];
        var vBV = agentStr.split('/')[1].split('.');
        bVersionMajor = vBV[0];
        bVersionMinor = vBV[1];
        browserVersion = vBV[0] + "." + vBV[1];
    } else if (browserName == "NOKIA") {
        iSearchPos = InStr(userAgent, "Nokia") + 5;
        var agentStr = userAgent.substring(iSearchPos);
        strOS = "NK" + agentStr.split('/')[0];
        var vBV = agentStr.split('/')[1].split('.');
        bVersionMajor = vBV[0];
        bVersionMinor = vBV[1];
        browserVersion = vBV[0] + "." + vBV[1];
    } else {
        browserVersion = navigator.appVersion;
        /* Determine Major and Minor version */
        if (iSearchPos >= 0) {
            iSearchPos = iSearchPos + browserName.length + 1; //search the value after the browser ID in the userAgent string
            browserVersion = userAgent.substring(iSearchPos, iSearchPos + 3);
            var vBV = browserVersion.split('.');
            bVersionMajor = vBV[0];
            bVersionMinor = vBV[1];
        }

        /* Determine Operating System */
        if (InStr(userAgent, "Windows NT 5.2") >= 0) {
            strOS = "Win2003";
        } else if (InStr(userAgent, "Windows NT 5.0") >= 0) {
            strOS = "Win2000";
        } else if ((InStr(userAgent, "Windows XP") >= 0) || (InStr(userAgent, "Windows NT 5.1") >= 0)) {
            strOS = "WinXP";
        } else if ((InStr(userAgent, "Windows 98") >= 0) || (InStr(userAgent, "Win98") >= 0)) {
            strOS = "Win98";
        } else if (InStr(userAgent, "Windows 95") >= 0) {
            strOS = "Win95";
        } else if (InStr(userAgent, "Windows NT") >= 0) {
            strOS = "WinNT";
        } else if (InStr(userAgent, "Windows 3.1") >= 0) {
            strOS = "Win3.1";
        } else if (InStr(userAgent, "Windows") >= 0) {
            strOS = "WinXP";
        } else if ((InStr(userAgent, "Macintosh") >= 0) || (InStr(userAgent, "Mac OS X") >= 0)) {
            strOS = "WinXP";
        } else if (InStr(userAgent, "Linux") >= 0) {
            strOS = "Linux";
        } else if (InStr(userAgent, "X11") >= 0) {
            strOS = "UNIX";
        } else if (InStr(userAgent, "BlackBerry") >= 0) {
            var iOSPos = InStr(userAgent, "BlackBerry");
            // If Blackberry OS5 or lower, then expect to see useragent like:  BlackBerry9700/5.0.0.442 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/100 
            // If Blackberry OS6 or higher, then expect to see useragent like:  
            //     Mozilla/5.0 (BlackBerry; U; BlackBerry 9810; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.261 Mobile Safari/534.11+ 
            if (iOSPos == 0) {
                strOS = userAgent.substring(iOSPos + 10, InStr(userAgent.substring(iOSPos + 10), "/"));
            } else {
                var iBBModel = InStr(userAgent, " BlackBerry ") + 12;
                strOS = "BB" + userAgent.substr(iBBModel, InStr(userAgent.substr(iBBModel), ";"));
            }
        } else {
            strOS = "Unknown Browser";
        }
    }

    /* Determine local time */
    var timeZone;
    var dtime;
    var date = new Date();

    timeZone = Math.round((240 - date.getTimezoneOffset()) / 15) / 4.0;
    dtime = escape(date.toLocaleString());


    /* Determine Screen Size */
    var screenRes = screen.width + ' x ' + screen.height;
    var colorDepth = screen.colorDepth;


    /* Determine Browser Size */
    var browRes;
    if (document.layers) {
        browRes = window.innerWidth + 'x' + window.innerHeight;
    } else {
        browRes = document.body.clientWidth + ' x ' + document.body.clientHeight;
    }

    return "&OS=" + encodeURIComponent(strOS) + "&browserId=" + encodeURIComponent(browserName) + "&browserVersionId=" + encodeURIComponent(browserVersion) + "&screenRes=" + screenRes;

    //return	"&browRes=" + browRes + "&OS=" + encodeURIComponent(strOS) + "&tzone=" + timeZone + "&date=" + dtime + "&browserId=" + encodeURIComponent(browserName) + "&browserVersionId=" + encodeURIComponent(browserVersion) + "&browserVersMaj=" + encodeURIComponent(bVersionMajor) + "&browserVersMin=" + encodeURIComponent(bVersionMinor) + "&screenRes=" + screenRes + "&colorDepth=" + colorDepth;

}

/*** Start Browser check values ****/

function getBrowserValues(parameter) {
    var browserInfo = getBrowserInfo();
    var browserValues = browserInfo.split('&');

    for (var i = 0; i < browserValues.length; i++) {
        var browserParam = browserValues[i].split('=');
        if (browserParam[0] == parameter) {
            return browserParam[1];
        }
    }

}

// similar to "updateSidnInForm", but handles deeplinks
function updateSignInFormFromDeeplink(formName,deepLinkName) {

  setTimeout(function() {
      if (!signinDataCallDone) {
          displayContingencyWidget();
      }
  }, 5000);

   currentSignInForm = formName;
   
    try {
      
          var rpc = new easyXDM.Rpc({
              remote: providerURL+"?deepLink="+deepLinkName
          }, {
              local: {
                  signinInfo: function(successFn, errorFn) {}
              },
      
              remote: {
                  signinInfo: {}
              }
          });
      
      } catch (err) {
          //show some error widget
        //  alert(err.message);
      	displayContingencyWidget();
}
   
   rpc.signinInfo(success, error);

}

     
function updateSignInForm(formName) {

  setTimeout(function() {
      if (!signinDataCallDone) {
          displayContingencyWidget();
      }
  }, 5000);

    
   currentSignInForm = formName;
   
    try {
      
          var rpc = new easyXDM.Rpc({
              remote: providerURL
          }, {
              local: {
                  signinInfo: function(successFn, errorFn) {}
              },
      
              remote: {
                  signinInfo: {}
              }
          });
      
      } catch (err) {
          //show some error widget
        //  alert(err.message);
      	displayContingencyWidget();
      	/*
          if (currentSignInForm == "form_signon") {
              $("#contigency-widget").show();
          } else if (currentSignInForm == "form_signon_mobile") {
              $("#contigency-widget-mobile").show();
      
          } else if (currentSignInForm == "form_signon_pinbar"){
              $("#contigency-widget-pinbar").show();
          }*/
}
   
   rpc.signinInfo(success, error);
   
   /* fix for iOS 11 issue with modal-open */
   if (currentSignInForm == "form_signon_mobile") {
	 		var ua = navigator.userAgent;   		  
	 		if (InStr(ua, "iPhone")>= 0 && InStr(ua, "OS 11_") >= 0) {
	 			$("body").addClass("iOSCursorFix");
	 		}
	 }


}


function success(data) {

    signinDataCallDone = true;
    if (currentSignInForm == "form_signon") {
        apology="APOL_HTML";
		genralerror="generalError";
    } else if (currentSignInForm == "form_signon_mobile") {
        apology="APOL_HTML_mobile";
		genralerror="generalError_mobile";
    } else {
        apology="APOL_HTML_pinbar";
		genralerror="generalError_pinbar";
    }

    if (!contingencyWidgetDisplayed) {
	if(data!=null){
		var decodedApologyOn=decodeURIComponent(data.apologyOn);
        if (decodedApologyOn == 'true') {
		
            // if (data.apologyOn) {

			var decodedApologyMessage=decodeURIComponent(data.apologyMessage);
			decodedApologyMessage=decodedApologyMessage.replace(/\+/g,' ');
				$("#" + currentSignInForm + " #" +apology).html(decodedApologyMessage);
				$("#" + currentSignInForm + " #" +genralerror ).parent(".form-group").addClass("has-error");
				$("#" + currentSignInForm + " #" +genralerror ).css("display","block");
				//disable form fields  as we are on apology...
        $("#" + currentSignInForm + " input").prop('disabled', function(i, v) {
					return true;
				});
        } else {
			var decodedSMagentValue=decodeURIComponent(data.smagentname);
			var decodedClientIP=decodeURIComponent(data.clientIp);
			var decodedRealMOID=decodeURIComponent(data.realmoid);

            $("#" + currentSignInForm + " input[name=SMAGENTNAME]").val(decodedSMagentValue);
            $("#" + currentSignInForm + " input[name=REALMOID]").val(decodedRealMOID);
            $("#" + currentSignInForm + " input[name=ClientIP]").val(decodedClientIP);

            //if saveIdAvailable is true, populate user id with ******

            if (data.saveIdAvailable == 'true') {

				//added to decode encrypted save id
				var decodedSaveIdValue=decodeURIComponent(data.encryptedSaveId);
                //save the encrypted value of user ID into the hidden field.
                $("#" + currentSignInForm + " input[name=ESAVEID]").val(decodedSaveIdValue);
                // put asteriks for visible user ID field.
               

                if (currentSignInForm == "form_signon") {
                    $("#" + currentSignInForm + " #accessIDModal").val("***********");
                } else if (currentSignInForm == "form_signon_mobile") {
                    $("#" + currentSignInForm + " #accessIDMobile").val("***********");

                }

                $("#" + currentSignInForm + " input[name=LOGONUSINGSAVEID]").val("TRUE");
                //ensure the 'remember me' check box is checked, since there is a saved ID available.
               

				
                if (currentSignInForm == "form_signon") {
                 $("#" + currentSignInForm + " #rememberIDModal").prop("checked", true);
                } else if (currentSignInForm == "form_signon_mobile") {
                  $("#" + currentSignInForm + " #rememberIDMobile").prop("checked", true);

                }

            }

            //browser details updation


            $("#" + currentSignInForm + " input[name=SCREENRES]").val(getBrowserValues('screenRes'));
            $("#" + currentSignInForm + " input[name=BROWSERID]").val(getBrowserValues('browserId'));
            $("#" + currentSignInForm + " input[name=BROWSERVER]").val(getBrowserValues('browserVersionId'));
            $("#" + currentSignInForm + " input[name=BROWSERDESC]").val(getBrowserValues('OS'));

            //enable  form fields which are disabled by default--this is for homepage
            $("#" + currentSignInForm + " input").prop('disabled', function(i, v) {
                return false;
            });



        }

        hideLoadingImage();
            $( "#signinclose" ).focus();
	}
	

    }

}



function error(data) {
    displayContingencyWidget();
    //alert("error occurred: " + data);
}
//called when input field 'remember me' is checked. 
function remember(me) {
    if (!me.checked) {
        $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("FALSE");

    } else {
        $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("TRUE");
    }
}


function displayContingencyWidget() {
    signinDataCallDone = true;
    contigencyWidgetDisplayed = true;
    if (currentSignInForm == "form_signon") {
        $("#signin-widget").hide();
        $("#contigency-widget").show();

    } else if (currentSignInForm == "form_signon_mobile") {
        $("#signin-widget-mobile").hide();
        $("#contigency-widget-mobile").show();


    } else {
        $("#signin-widget-pinbar").hide();
        $("#contigency-widget-pinbar").show();

    }
	
    hideLoadingImage();

}


function hideLoadingImage() {
    if (currentSignInForm == "form_signon") {
        $(".loading").hide();
    } else if (currentSignInForm == "form_signon_mobile") {
        $(".loading-mobile").hide();
    } else {
        $(".loading-pinbar").hide();
    }

}



var isSubmitted;
isSubmitted = false;

function CheckClicks(lang) {
		if( isSubmitted == true ) {
				if (lang=="f")
						alert('Veuillez patienter pendant que nous soumettons vos renseignements.');
				else
						alert('Please wait while we submit your information');
				return false;
		} else {
	  		isSubmitted = true;
				var idField;
				var id;
				var i;
				var IsSaveId=false;
				var idLen;

				//idField= $("#" + currentSignInForm + " input[name=USER]");
				id=$("#" + currentSignInForm + " input[name=USER]").val();
				idLen=id.length;
				for (i=0;i<idLen;i++) {
						if (id.charAt(i)!='*') {
								IsSaveId=false;
								if(id.charAt(i)=='&') {
									id=id.replace('&',':');
								} else if(id.charAt(i)=='!') {
									id=id.replace('!',';');
								}
						} else if (id.charAt(i)=='*') {
								if (i==0) IsSaveId=true;
								id=id.replace('*','!');
						}
				}
				if (IsSaveId){
				 			
				 $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("FALSE");
				
				}
				
				$("#" + currentSignInForm + " input[name=USER]").val(id);

				//document.form_signon.submit();
				return true;
		}
}

/* End Sunlife ca phase 2 ****/
//v1.49 Dec 21: z034
// merged with the latest mock up + added left nav fix at last
/*  ===========================================
============== * responsive tabs * =============
=========================================== */

var fakewaffle = ( function ( $, fakewaffle ) {
	'use strict';

	fakewaffle.responsiveTabs = function ( collapseDisplayed ) {

		fakewaffle.currentPosition = 'tabs';

		var tabGroups = $( '.nav-tabs.responsive' );
		var hidden    = '';
		var visible   = '';
		var activeTab = '';

		if ( collapseDisplayed === undefined ) {
			collapseDisplayed = [ 'xs', 'sm' ];
		}

		$.each( collapseDisplayed, function () {
			hidden  += ' hidden-' + this;
			visible += ' visible-' + this;
		} );

		$.each( tabGroups, function () {
			var $tabGroup   = $( this );
			var tabs        = $tabGroup.find( 'li a' );
			var collapseDiv = $( '<div></div>', {
				'class' : 'panel-group responsive' + visible,
				'id'    : 'collapse-' + $tabGroup.attr( 'id' )
			} );

			if(!$tabGroup.hasClass("mobile-tab-group")) {

			$.each( tabs, function () {
				var $this          = $( this );
				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
				var newLinkClass   = 'accordion-toggle';
				if ((typeof  $(this).parent().attr('class') === 'undefined') || ($(this).parent().attr('class').indexOf('active')== -1)) { // added this for the arrows on the collapsable tabs on mobile
					newLinkClass = newLinkClass + ' collapsed';
				}
				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
				var newParentClass = 'panel panel-default';
				var newHash        = $this.get( 0 ).hash.replace( '#', 'collapse-' );

				if ( oldLinkClass.length > 0 ) {
					newLinkClass += ' ' + oldLinkClass;
				}

				if ( oldParentClass.length > 0 ) {
					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
					newParentClass += ' ' + oldParentClass;
					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
				}

				if ( $this.parent().hasClass( 'active' ) ) {
					activeTab = '#' + newHash;
				}

				collapseDiv.append(
					$( '<div>' ).attr( 'class', newParentClass ).html(
						$( '<div>' ).attr( 'class', 'panel-heading' ).html(
							$( '<h4>' ).attr( 'class', 'panel-title' ).html(
								$( '<a>', {
									'class'       : newLinkClass,
									'data-toggle' : 'collapse',
									'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
									'href'        : '#' + newHash,
									'html'        : $this.html()
								} )
							)
						)
					).append(
						$( '<div>', {
							'id'    : newHash,
							'class' : 'panel-collapse collapse'
						} )
					)
				);
			} );

			$tabGroup.next().after( collapseDiv );
			$tabGroup.addClass( hidden );
			$( '.tab-content.responsive' ).addClass( hidden );
			}
		} );


		fakewaffle.checkResize();
		fakewaffle.bindTabToCollapse();

		if ( activeTab ) {
			$( activeTab ).collapse( 'show' );
		}
	};

	fakewaffle.checkResize = function () {

		if ( $( '.panel-group.responsive' ).is( ':visible' ) === true && fakewaffle.currentPosition === 'tabs' ) {
			fakewaffle.tabToPanel();
			fakewaffle.currentPosition = 'panel';
		} else if ( $( '.panel-group.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
			fakewaffle.panelToTab();
			fakewaffle.currentPosition = 'tabs';
		}

	};

	fakewaffle.tabToPanel = function () {

		var tabGroups = $( '.nav-tabs.responsive' );

		$.each( tabGroups, function ( index, tabGroup ) {

			// Find the tab
			var tabContents = $( tabGroup ).next( '.tab-content' ).find( '.tab-pane' );

			$.each( tabContents, function ( index, tabContent ) {
				// Find the id to move the element to
				var destinationId = $( tabContent ).attr( 'id' ).replace ( /^/, '#collapse-' );

				// Convert tab to panel and move to destination
				$( tabContent )
					.removeClass( 'tab-pane' )
					.addClass( 'panel-body' )
					.appendTo( $( destinationId ) );

			} );

		} );

	};

	fakewaffle.panelToTab = function () {

		var panelGroups = $( '.panel-group.responsive' );

		$.each( panelGroups, function ( index, panelGroup ) {

			var destinationId = $( panelGroup ).attr( 'id' ).replace( 'collapse-', '#' );
			var destination   = $( destinationId ).next( '.tab-content' )[ 0 ];

			// Find the panel contents
			var panelContents = $( panelGroup ).find( '.panel-body' );

			// Convert to tab and move to destination
			panelContents
				.removeClass( 'panel-body' )
				.addClass( 'tab-pane' )
				.appendTo( $( destination ) );

		} );

	};

	fakewaffle.bindTabToCollapse = function () {

		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
		var collapse = $( '.panel-group.responsive' ).find( '.panel-collapse' );

		// Toggle the panels when the associated tab is toggled
		tabs.on( 'shown.bs.tab', function ( e ) {
			var $current  = $( e.currentTarget.hash.replace( /#/, '#collapse-' ) );
			$current.collapse( 'show' );

			if ( e.relatedTarget ) {
				var $previous = $( e.relatedTarget.hash.replace( /#/, '#collapse-' ) );
				$previous.collapse( 'hide' );
			}
		} );

		// Toggle the tab when the associated panel is toggled
		collapse.on( 'shown.bs.collapse', function ( e ) {

			// Activate current tabs
			var current = $( e.target ).context.id.replace( /collapse-/g, '#' );
			$( 'a[href="' + current + '"]' ).tab( 'show' );

			// Update the content with active
			var panelGroup = $( e.currentTarget ).closest( '.panel-group.responsive' );
			$( panelGroup ).find( '.panel-body' ).removeClass( 'active' );
			$( e.currentTarget ).find( '.panel-body' ).addClass( 'active' );

		} );
	};

	$( window ).resize( function () {
		fakewaffle.checkResize();
	} );

	return fakewaffle;
}( window.jQuery, fakewaffle || { } ) );

function setResponsiveTabs(){
	//commenting out as we have made chaanges
	//tabfix();
	$("[id^='slf-responsive'] a").click(function(e){
		e.preventDefault();
		$( this ).tab( 'show' );
	});

	(function($){
			fakewaffle.responsiveTabs( [ 'xs' ] );
	})( jQuery );
}

setResponsiveTabs();


/* ===========================================
============== * sunlifeca.js * ====================
=========================================== */
/* Key Code Constants */
var ENTER = 13;
var TAB = 9;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var UP = 38;
var ESC = 27;
var isResponsive = ($(".container").css("min-width") == "0px");

function removeMenuHover(){
	$('.main-nav > .dropdown').unbind('mouseenter').unbind('mouseleave');
}

function setMenuHover(){
	var timer = null;
	var onhover_timer = null;
	var timer_element;
	$('.main-nav > .dropdown').hover(function() {
		if(!isTouchDevice()){
			if($('.nav-item.open').get(0) == $(this).get(0)){
				//$('.nav-item.open').removeClass('open');
				clearTimeout(timer);
				clearTimeout(onhover_timer);
				timer = null;
			}else{
				if(timer == null){
					$('.nav-item.open').removeClass('open');
					$(this).addClass('open');
				}else{
						$this = $(this);
						onhover_timer = setTimeout(function(){
							clearTimeout(timer);
							timer = null;
							$('.nav-item.open').removeClass('open');
							$this.addClass('open');
							onhover_timer = null
						}, 500);
				}
			}

			//set third level nav hover event
			var menucontent = $(this).find('.menu-content').first();
			menucontent.find('.dropdown-submenu').hover(function() {
				var submenu = $(this).find('ul');
				var menucontent = $(this).closest('.menu-content').first();
				var max = Math.max(parseInt(menucontent.css('height')), parseInt(submenu.css('height'))) ;
				submenu.css('height', max -6);
				menucontent.css('height', max);
				var url = document.location.href;
				if(url.indexOf('RESP+calculator')>-1){
					submenu.css('height', max);
					menucontent.css('height', max + 6);
				}
			},function(){
				$(this).find('ul').removeAttr('style');
				 $(this).closest('.menu-content').removeAttr('style');
			});
		}
	}, function() {
		if(!isTouchDevice() && timer == null && $('.nav-item.open').length > 0 ){
			$this = $(this);
			timer = setTimeout(function(){
				$this.removeClass('open');
				timer_element = $this;
				timer = null
			}, 500);
		}
		//clear css formatting
		var menucontent = $(this).find('.menu-content').first();
		menucontent.find('.dropdown-submenu ul').removeAttr('style');
	});

	$('.main-nav > .dropdown > a').focus(function(e){
		if(!isTouchDevice()){
			$('.nav-item').trigger('mouseleave');
			$(this).closest('.dropdown').trigger('mouseover');
		}
	});

	$('.main-nav > .dropdown > a').click(function(e){
		if(!isTouchDevice()){
			location.href = this.href;
		}
		else{
			$('.nav-item.open').removeClass('open');
			$(this).closest('.nav-item').addClass('open');
			var menucontent = $(this).closest('.nav-item').find('.menu-content').first();
			menucontent.find('.dropdown-submenu ul').css('height', menucontent.height());
			e.stopPropagation();
		}
	});

	$('.menu-content a[data-toggle=dropdown]').click(function(e){
		if(!isTouchDevice() && !isMobile()){
			location.href = this.href;
		}
		else{
			e.stopPropagation();
		}
	});

}

function isValidName(str) {
	var matches = str.match(/\d+/g);
	if (matches != null) {
			return false;
	}
	return true;
}

function isEmpty(str){
	return !$.trim(str);
}

function isMobile(size){
	var mobile_breakpoint = 1025;
	if (!isResponsive)
		mobile_breakpoint = 3;

	var viewportWidth = size || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	if(viewportWidth >= mobile_breakpoint){
		return false;
	}
	else{
		return true;
	}
}

function isXS(){
	var mobile_breakpoint = 767;
	var viewportWidth = window.innerWidth ;

	if(viewportWidth > mobile_breakpoint){
		return false;
	}
	else{
		return true;
	}
}

function isTouchDevice() {
 return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}

function setDesktopOnlyEvents(){
	setMenuHover();
	$('.navbar').removeClass('mobile');

	setNewsListingTab();
}

function setNewsListingTab(){
	if(isXS()){
		if(!$('.news-listing .slf-full-tabs > li.active +  .tab-content').length){
			$('.news-listing .tab-content ').insertAfter('.news-listing .slf-full-tabs > li.active');
		}
	}else{
		if(!$('.news-listing > ul +  .tab-content').length){
			$('.news-listing .tab-content ').insertAfter('.news-listing > ul');
		}
	}
}

function setMobileOnlyEvents(){
	removeMenuHover();
	$('.navbar').addClass('mobile');

	$('.slf-tab-container .panel .panel-collapse').each(function(){

    // below code is to ensure first accordion is expanded if a anchored in the URL
    var url = window.location.href;
	if(url.indexOf("#")!=-1){
     	//selecting the content which needs to be collapsed
		var id = url.substring(url.lastIndexOf("#")+1, url.length);
		var accordianBody = $(id).attr('href') +".collapse";
        var firstliid = $('.slf-full-tabs li a').eq(0).attr('id');

        if(id!=firstliid)
        {
                     		  $(this).collapse("hide");
        }
        }else{

        $(this).collapse("hide");
       }

	});

	setNewsListingTab();


	//set mobile back button events
	$('.navbar.mobile .menu-content>div>ul > li.go-back, .language-tab-mobile .go-back').on('click', function(event){
		//$('.sidebar-offcanvas').css('top', '0');
		$('.main-nav').removeClass('moves-out');
		$(this).closest('.dropdown').closable = true;
		$(this).closest('.dropdown').removeClass('open');
	});
	$('.navbar.mobile .menu-content .dropdown-submenu .dropdown-menu .go-back').on('click', function(event){
		//$('.sidebar-offcanvas').css('top', '0');
		$(this).closest('ul').parent().removeClass('moves-out');
		$(this).closest('li').parent().removeClass('moves-out');
		$(this).closest('.nav-item').addClass('open');
		$(this).closest('.nav-item').removeClass('moves-out');
		$(this).closest('.menu-content').removeClass('disableScroll');
		event.stopPropagation();
	});

	//open sub-navigation(s)
	$('.navbar.mobile .main-nav > li > .subnav-trigger').on('click', function(event){
		if(isMobile()){
			event.preventDefault();
			$(".main-nav").scrollTop(0);
			$('.main-nav').addClass('moves-out');
			$(".main-nav .dropdown-menu").scrollTop(0);
		}
	});
	$('.navbar.mobile .subnav-trigger + div .subnav-trigger').on('click', function(event){
		if(isMobile()){
			event.preventDefault();
			$(this).closest('ul').addClass('moves-out');
			$(this).closest('li').addClass('moves-out');
			$(this).closest('.nav-item').addClass('moves-out');
			$(this).closest('.menu-content').addClass('disableScroll');
			$(".main-nav .dropdown-menu").scrollTop(0);
			event.stopPropagation();
		}
	});

	$('.mobile .dropdown').on({
    "shown.bs.dropdown": function() { this.closable = true; },
    "click":             function() { this.closable = false; },
    "hide.bs.dropdown":  function() { return this.closable;  }
	});
	// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
	if ($('.mobile-logo .col-sm-12').children().length > 0) {
		$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
	}
}

/*  ===========================================
============== * page load event * ===============
=========================================== */
jQuery(document).ready(function($){
	var viewportWidth = $(document).width();
	pageLevelNotify();
	 checkCookieExists();
	 checkBrowserCookieExists();
	 LanguageToggle();

	//add content-container class for mobile
	$('.row-offcanvas > .col-xs-12').addClass('content-container');
	if(!isMobile()){
		setDesktopOnlyEvents();
	}
	else{
		setMobileOnlyEvents();
	}

	//enable tooltips
	$('[data-toggle="tooltip"]').tooltip();

	//mega menu accessibility
	$('.mega-menu-col3 a, .mega-menu-col1 a, .mega-menu-col2 a').on('keydown', function(e) {
		if ( e.keyCode == DOWN ) {
			// Show sub menu
			$(this).parent().next().focus();
			$(this).parent().next().find('a').focus();

			if($(this).closest('.menu-content').find('a').last().is($(this))){
				//$(this).closest('.nav-item').next().find('>a').focus();
				//return false;
			} else if($(this).parent().parent().find('a').last().is($(this))){
				$(this).parent().parent().parent().next().find('a:first').focus();
				return false;
			}
			return false;
		}
		if ( e.keyCode == UP ) {
			// Show sub menu
			$(this).prev().find('a').focus();
			$(this).parent().prev().find('a').focus();

			if($(this).parent().parent().find('a').first().is($(this))){
				$(this).parent().parent().parent().prev().find('a:last').focus();
				return false;
			}
			return false;
		}
		if ( e.keyCode == ESC ) {
			// Show sub menu
			$(this).closest('.nav-item').find('>a').focus();
			$(this).closest('.menu-content').dropdown('toggle');
			//return false;
		}
	});

	//if Tab is pressed on the last link in the mega menu section, close the mega menu
	//if Shift + Tab was pressed keep the mega menu open and focus on the link above it
	$('.nav-item .dropdown-menu:last-child div:last-child li:last-child > a').on('keydown',function(e) {
 		if (e.keyCode == TAB && !e.shiftKey) { // if Tab was pressed, but not Shift+Tab
			if ($(this).closest('.mega-menu-category').length == 0) { //if this isn't the first mega-menu-category under Explore products
				$(this).closest('.nav-item').removeClass('open');
			}
		}
	});

	// When interacting with a li that has a sub menu
	$('.nav-item .dropdown-submenu:has(".dropdown-menu") > a').on('keydown', function(e) {
		if ( e.keyCode == RIGHT ) {
			// Show sub menu
			//$(this).children('ul').addClass('show');

			//Reset values before adding new
			$(this).parents().find('.dropdown-submenu').removeClass('open');
			$(this).parents().find('ul.dropdown-menu').removeAttr('style');
			$(this).closest('.menu-content').removeAttr('style');

			var submenu = $(this).parent().find('.dropdown-menu');
			var menucontent = $(this).closest('.menu-content').first();
			var max = Math.max(parseInt(menucontent.css('height')), parseInt(submenu.css('height')));
				submenu.css('height', max -6);
				menucontent.css('height', max);
			$(this).closest('.dropdown-submenu').addClass('open');
			$(this).closest('.dropdown-submenu').find(".dropdown-menu li:not('.go-back')>a:first").focus();
			return false;
		}
	});

	// When using the key down/up or shift/tab to leave the mega menu, close the mega menu. 
	// Key down events don't work when speech readers are on, so using the opposite approach - 
	// when the search or signin buttons are focused, close the mega menu.
	$( "#signinbutton, #search-btn" ).focus(function() {
			$('.nav-item').removeClass('open');
	});

	// If key is pressed while on the last link in a sub menu
	$('.dropdown-submenu:has(".dropdown-menu") li:last-child > a').on('keydown', function(e) {
		// If tabbing out of the last link
		if (e.keyCode == DOWN ) {
			// Close this sub menu
			$(this).closest('.dropdown-submenu').removeClass('open');
			$(this).closest('.dropdown-menu').parent('li').find('a').focus();
			return false;
		}
	});

	$('.nav-item > a').on('keydown', function(e) {
		if(e.keyCode == TAB){
			$(this).closest('.nav-item').removeClass('open');
			$(this).focusout();
		}
	});


	//language region / page notification / search  --  show/hide events (desktop/mobile)
	$('.topCollapse').on('show.bs.collapse', function () {
		$('.topCollapse > .in').collapse('hide');
		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) + 104 +"px");
	});
	$('.topCollapse').on('hide.bs.collapse', function () {
		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - 104 +"px");
	});
	$('.topCollapse .language-region-pad').on('show.bs.collapse', function (e) {
		e.stopPropagation();
	});
	$('#page-notify .alert').on('close.bs.alert', function () {
		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - $('#page-notify').height() +"px");
	});
	$('#browser-alert .alert').on('close.bs.alert', function () {
		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - $('#browser-alert').height() +"px");
	});
	$(".language-region-pad ul").on('hidden.bs.collapse shown.bs.collapse', function () {
		$(this).find("li[aria-expanded='false'] > div a").css("font-weight","normal");
		//$(".language-region-pad ul li[aria-expanded='false'] .fa").removeClass("fa-caret-down").addClass("fa-caret-right");
		$(this).find("li[aria-expanded='true'] > div a").css("font-weight","bold");
		//$(".language-region-pad ul li[aria-expanded='true'] .fa").removeClass("fa-caret-right").addClass("fa-caret-down");
	});

	//switch views between mobile and desktop
/*	$("#desktopview-ok-btn").click(function () {
		//console.log('desktop view clicked');
		$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
	});*/
	$("#mobileview-ok-btn").click(function () {
		//console.log('mobile view clicked');
		$("#viewport").attr('content', 'width=320, initial-scale=1.0');
	});

	$('.footer [data-toggle="collapse"]').click(function(e){
		if (!isXS()) {
			e.stopPropagation();
		}
	});

	//Header language accessibility
	$('#sun-language').on('shown.bs.collapse', function (e) {
		//$(".language-region .language-region-pad:first a:first").focus();
		$(this).find(".fa-remove").focus();
		if(e.target.id == "sun-language")
			$('#language-btn').addClass("language-btn");
	});
	$('#sun-language').on('hidden.bs.collapse', function () {
		$('#language-btn').removeClass("language-btn");
	});
	$(".language-region a:last").on('keydown', function(e) {
		// If tabbing out of the last link
		if ((e.keyCode == 9)) {
			// Close this sub menu
			$(this).closest('#sun-language').collapse('toggle');
			$("#language-btn").focus();
			return false;
		}
	});

	// sun search
	$('#sun-search').on('shown.bs.collapse', function () {
		//$("#globalSearch").focus();
		$(this).find(".fa-remove").focus();
		return false;
	});

	$(".global-search .btn").on('keydown', function(e) {
		// If tabbing out of the last link
		if ((e.keyCode == TAB)) {
			// Close this sub menu
			$("#sun-search").collapse('toggle');
			$(".search-icon-container div").focus();
			return false;
		}
	});

	$('#customerSignInDesk').on('shown.bs.collapse', function () {


		$("#customerSignInDesk").on('keydown', function(e) {
			if(e.keyCode == ESC) {
				// Close this sub menu
				$("#customerSignInDesk").collapse("toggle");
				$('.customer-sign-label').focus();
				return false;
			}
		});

		$('#footer-pin-bar .icon-remove').focus();
		return false;
	});

	/* language-toggle: open nav-selected item by default */
	if ($(".language-region-pad").find(".nav-selected").parent().parent().attr("data-toggle")=="collapse"){
		$(".language-region-pad").find(".nav-selected").parent("ul").parent().click();
		$(".language-region-pad").find(".nav-selected").parent("ul").parent().css('font-weight','700');
	}

	$("#sun-language").find(".collapse").on('shown.bs.collapse', function (e) {
		e.stopPropagation();
	});

	$('.lifestage .fa-remove').click(function(){
		$('li').removeClass("active");
		$('div').removeClass("active in");

		// move focus back to tab, after close
		//var temp = $(this);
		var labelledby = $(this).parents('.tab-pane').attr('aria-labelledby');
		$('#' + labelledby).focus();

		// reset the tabindexes
		$('a[data-toggle="tab"]').attr('tabindex','-1');
		$('#' + labelledby).attr('tabindex','0');
	});

	// used for "tabs" that refresh the page, when a tab is selected
	$('a[data-toggle="reload"]').on('keydown', function (e) {
		if(e.keyCode == ENTER){
			var temp_tab = $(this);
			$(temp_tab.attr("href")).focus();
		}
		if(e.keyCode == RIGHT){
			var temp_tab = $(this);
			var nextTab;

			if (temp_tab.parent().is(':last-child')) {
				nextTab = temp_tab.parent().parent().children().first().children();
			} else {
				nextTab = $(this).parent().next().children();
			}
			nextTab.focus();
		}
		if(e.keyCode == LEFT){
			var temp_tab = $(this);
			var nextTab;
			if (temp_tab.parent().is(':first-child')) {
				nextTab = temp_tab.parent().parent().children().last().children();
			} else {
				nextTab = $(this).parent().prev().children();
			}
			nextTab.focus();
		}

	});

		$(".panel-title").on("click", function(){
			var group = $(this).closest(".panel-group");
			var targetCollapse = $(this).closest(".panel").find(".panel-collapse");
			var collapseElements = group.find(".panel-collapse");
			var indexOpen = collapseElements.index(collapseElements.filter(".in"));
			var curIndex = collapseElements.index(targetCollapse);
			var prevOpenHeight = 0;
			if(indexOpen <curIndex){
				prevOpenHeight = group.find(".panel-collapse.in").height();
			}
			var padding = parseInt($(this).closest(".panel-heading").css("paddingTop"));
			if($(this).closest(".panel").find(".panel-collapse.in").length === 0){
				var offset = $(this).offset();console.log( padding );
				$("html, body").animate({
					scrollTop :offset.top - $(".mobile-navbar").height() - padding - prevOpenHeight
				}, 700);
			}
		});

		$("#accordion-parent .accordion-heading").on("click", function(){
			var group = $(this).closest(".panel").parent();
			var targetCollapse = $(this).closest(".panel").find(".collapse");
			var collapseElements = group.find(".collapse");
			var indexOpen = collapseElements.index(collapseElements.filter(".in"));
			var curIndex = collapseElements.index(targetCollapse);
			var prevOpenHeight = 0;
			if(indexOpen <curIndex){
				var prevCollapse = group.find(".collapse.in").css("display", "table");
				prevOpenHeight = prevCollapse.outerHeight(true);
				prevCollapse.css("display", "");
			}

			if($(this).closest(".panel").find(".collapse.in").length === 0){
				var offset = $(this).offset();
				$("html, body").animate({
					scrollTop :offset.top - $(".mobile-navbar").height() - prevOpenHeight
				}, 700);
			}
		});

	// make tab content non-focusable
	$('div[role="tabpanel"]').focusout(function() {
		$(this).removeAttr('tabindex');
	});

	$('a[data-toggle="tab"]').on('keydown', function (e) {
		if(e.keyCode == ENTER){
			var temp_tab = $(this);
			temp_tab.tab('show');

			$('a[data-toggle="tab"]').attr('tabindex','-1');
			temp_tab.attr('tabindex','0');
			// why if?  can't remember
			$(temp_tab.attr("href")).attr('tabindex','0');
			if (temp_tab.is(":focus")) {

				$(temp_tab.attr("href")).focus();
			}
		}

		if(e.keyCode == RIGHT){
			var temp_tab = $(this);
			var nextTab;
			// if last tab in widget, then wrap to first tab
			if (temp_tab.parent().is(':last-child')) {
				nextTab = temp_tab.parent().parent().children().first().children();
			} else {
				nextTab = $(this).parent().next().children();
			}
			nextTab.focus();
			// if on home page, don't show the tab by default
			if (temp_tab.parents('.lifestage').length <= 0) {
				nextTab.tab('show');
			}

		}
		if(e.keyCode == LEFT){
			var temp_tab = $(this);
			var nextTab;
			// if first tab in widget, then wrap to last tab
			if (temp_tab.parent().is(':first-child')) {
				nextTab = temp_tab.parent().parent().children().last().children();
			} else {
				nextTab = $(this).parent().prev().children();
			}
			nextTab.focus();
			// if on home page, don't show the tab
			if (temp_tab.parents('.lifestage').length <= 0) {
				nextTab.tab('show');
			}

		}
	});

	$('a[data-toggle="tab"]').on('hidden.bs.tab', function () {
		var temp_tab = $(this);
		temp_tab.attr('tabindex', '-1');
		temp_tab.attr('aria-selected','false');
		// need to remove this from <a>, otherwise breaks in Safari on Mac
		temp_tab.removeAttr('aria-expanded');

		$(temp_tab.attr("href")).attr('aria-hidden','true');
		$(temp_tab.attr("href")).attr('aria-expanded','false');
		$(temp_tab.attr("href")).removeAttr('tabindex');

	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
		var temp_tab = $(this);
		temp_tab.attr('tabindex', '0');
		temp_tab.attr('aria-selected','true');
		// need to remove this from <a>, otherwise breaks in Safari on Mac
		temp_tab.removeAttr('aria-expanded');

		$(temp_tab.attr("href")).attr('aria-hidden','false');
		$(temp_tab.attr("href")).attr('aria-expanded','true');

		// this sets the focus to the first link in the tab panel
		//$(temp_tab.attr("href")).find('a:first').focus();

		/*
		// this forces the focus back to the tab after the last link in the tab panel
		$(temp_tab.attr("href")).find('a:last').on('keydown', function(){
			$(temp_tab.attr("href")).find('.fa-remove').click();
			temp_tab.focus();
			return false;
		});
		*/
		$(temp_tab.attr("href")).find('.fa-remove').on('keydown', function(e){
				if(e.keyCode== ENTER){
					$(temp_tab.attr("href")).find('.fa-remove').click();
					temp_tab.focus();
					return false;
				}
			});
			// if home page, then set focus to the "x"
			if (temp_tab.parents('.lifestage').length > 0) {
				$(temp_tab.attr("href")).find('.fa-remove').focus();
			}
			//$(temp_tab.attr("href")).find('.fa-remove').focus();
			return false;
		});

		/* language/search/pinbar accessibility */
		$('#language-btn, #search-btn, #pinbar-signin').on('click keypress', function(e){
			$(this).data('clicked', true);
			if(e.keyCode == 13 || e.keyCode == 32){
				$(this).click();
			}
		});
		if(navigator.userAgent.indexOf("Mac OS X 10_11_") !== -1){//its on a el capitan mac, delay the script
			setTimeout(function(){
				//adjust column heights to be equal
				$(".row div[class^='col-']:first-child .adjust-height").each(function(){
		      if($(this).closest(".collapse").length >0){
		        if($(this).closest(".collapse").hasClass("in") === false ){
		          return false;
		        }
		      }
					var columns = $(this).closest(".row").find(".adjust-height");
					var maxHeight = Math.max.apply(null, columns.map(function() {
							$(this).css("height", "");
							return $(this).height();
					}).get());
					columns.height(maxHeight);
				});
			}, 100);
		}else{
			//adjust column heights to be equal
			$(".row div[class^='col-']:first-child .adjust-height").each(function(){
	      if($(this).closest(".collapse").length >0){
	        if($(this).closest(".collapse").hasClass("in") === false ){
	          return false;
	        }
	      }
				var columns = $(this).closest(".row").find(".adjust-height");
				var maxHeight = Math.max.apply(null, columns.map(function() {
						$(this).css("height", "");
						return $(this).height();
				}).get());
				columns.height(maxHeight);
			});
		}


    // //if there are adjust height stuff inside a panel(accordion)
    // $(".adjust-height").closest(".collapse").on("shown.bs.collapse", function(){
    //   $(this).find(".adjust-height").each(function(){
    //     var columns = $(this).closest(".row").find(".adjust-height");
    //     var maxHeight = Math.max.apply(null, columns.map(function() {
    //         $(this).css("height", "");
    //         return $(this).height();
    //     }).get());
    //     columns.height(maxHeight);
    //   });
		// });

	//adjust column heights to be equal
	var maxHeight = Math.max.apply(null, $(".adjust-height").map(function() {
			return $(this).height();
	}).get());
	$(".adjust-height").height(maxHeight);

	//if the window has tabs or accordions
	//for tabs
	$(".slf-full-tabs > li > a").on("shown.bs.tab",function(){
		var adjustElements = $($(this).attr("href")).find(".adjust-height");
		var maxHeight = 0;
		adjustElements.css("height", "");
		adjustElements.each(function(){
			if($(this).height() > maxHeight){
				maxHeight = $(this).height();
			}
		});
		adjustElements.height(maxHeight);
		console.log("do you see this?" );
	});

	//for panels, going to assume the panel can be empty
	$(".panel-collapse.collapse, .slf-accordion-plus .collapse").on("shown.bs.collapse", function(){
		var adjustElements = $(this).find(".adjust-height");
		var maxHeight = 0;
		adjustElements.css("height", "");
		adjustElements.each(function(){
			if($(this).height() > maxHeight){
				maxHeight = $(this).height();
			}
		});
		adjustElements.height(maxHeight);
	});


	/* open accordion on page load */
	var url = window.location.href;
	if(url.indexOf("#")!=-1){
		//selecting the content which needs to be collapsed
		var id = url.substring(url.lastIndexOf("#"), url.length);
		var accordianBody = $(id).attr('href') +".collapse";
		if(id != "#"){
			$(accordianBody).collapse("toggle");
			//$('#collapse-readyforfuture').addClass('in');
			$('#slf-responsive-tab li:first-child a').tab('show');
		}
	}
	url = document.location.toString();
	if (url.match('#')) {
		var tab_id = url.substring(url.lastIndexOf("#"), url.length);
		if(tab_id != "#"){
			$('.nav-tabs ' + tab_id).tab('show') ;
		}
	}

/* 	$(window).on('hashchange', function(e){
		var id = window.location.hash;
		if($(id).hasClass('accordion-heading')){
			if(id != "#"){
				var accordianBody = $(id).attr('href') +".collapse";
				$(accordianBody).collapse("show");
			}
		}
	});  */

	// Change hash for page-reload
/* 	$('.nav-tabs a').on('shown.bs.tab', function (e) {
			window.location.hash = e.target.hash;
	}) */

	//show IE browser alert if it is IE
	var index = navigator.userAgent.indexOf("MSIE");

	if(index!= -1){

		var endIndex=navigator.userAgent.indexOf(";", index );
		var version = navigator.userAgent.substring(index+4,endIndex);

		if(Number(version)<11){

			$("#ie-alert").removeClass("hidden");
			$("#ie-alert").attr("aria-hidden" , "false");
			$("#alert-ie").attr("aria-hidden" , "false");
		}
	}


});



/* ===========================================
============== * window resize event * ============
=========================================== */
jQuery(document).ready(function($){
	var prevWidth = window.innerWidth;
	$(window).resize(function() {
		//check breakpoint change
		if(isMobile(prevWidth) != isMobile()){
			if(!isMobile()){
				setDesktopOnlyEvents();
			}	else {
				setMobileOnlyEvents();
			}
		}
		prevWidth = window.innerWidth;

			//adjust column heights to be equal
			$(".row div[class^='col-']:first-child .adjust-height").each(function(){
				var columns = $(this).closest(".row").find(".adjust-height");
				var maxHeight = Math.max.apply(null, columns.map(function() {
						$(this).css("height", "");
						return $(this).height();
				}).get());
				columns.height(maxHeight);
			});

	});

	/*  ===========================================
	============= * window scroll event * ==============
	=========================================== */
	/**
	* DAGS2595: need to not add mobile header to signin area in some cases
	* Moved event handler into ready function
	* The mobile logo is part of the top nav collection and output via topNav.jsp
	*  if don't need to add logo, assuming the collection will not have the content - which was position LN 3 of the topNav collection
	*
	**/
	// Check if any child elements exist before initializing handler
	// the element checked comes from topNav.jsp
	if ($('.mobile-logo .col-sm-12').children().length > 0) {
		$(window).on('scroll',function(){
			//mobile header add logo to customer sign in
			topbarheight = $('.mobile-logo').height();
			// we round here to reduce a little workload
			stop = Math.round($(window).scrollTop());

			if (stop > topbarheight) {
				if(!($('#sunlife-logo-image-nav-mobile').length)){
					$('.navbar-toggle').parent().removeClass('col-xs-4').addClass('col-xs-2');
					$('.navbar-toggle').parent().after('<div class=\'col-xs-2 logo-icon\' id=\'sunlife-logo-image-nav-mobile\'><div role=\'math\' tabindex=\'0\' aria-label=\'Sun Life Financial\'><a href=""><svg id=\'sunlife-logo-image-nav-mobile\' class=\'media-middle logo-icon\' width=\'34px\' height=\'34px\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'><image xlink:href=\'//cdn.sunlife.com/static/slfglobal/globalweb/responsive/images/en/logo-icon.svg\' x=\'0\' y=\'0\' height=\'34px\' width=\'34px\'></image> </svg></a></div></div>');
				}
			} else {
				$('#sunlife-logo-image-nav-mobile').remove();
				$('.navbar-toggle').parent().removeClass('col-xs-2').addClass('col-xs-4');
			}
		});
	}
});
/*  ===========================================
============== * window load event * =============
=========================================== */
$(window).load(function() {

	$('body').click(function() {
		//if(!isMobile()){
			//$('.nav-item').removeClass('open');
		//}
		$("#customerSignInDesk, #sun-search").click(function(){
			$(this).data('clicked', true);
		});


		if($("#customerSignInDesk").hasClass("in")){
			if(!$("#customerSignInDesk").data('clicked'))
					$("#customerSignInDesk").collapse("toggle");
		}

		if($("#sun-search").hasClass("in")){
			if(!$("#sun-search").data('clicked'))
				$("#sun-search").collapse("toggle");
		}

		// set focus to search input, after it becomes visible
		$('#sun-search').on('shown.bs.collapse', function () {
			$("#q-top").focus();
		});
	});
});

// update the domains to match the environment
$('#signin-widget-modal').on('show.bs.modal', function() {
	// get host from variable defined in signin.js
	// it is assumed to be defined, if not, then default to prod
	var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
	if (host === null || host === undefined) {
		host = "https://www.sunnet.sunlife.com";
	}

	// update all the domains
	var signinWidget = $('#signin-widget-modal').html();
	var newString = signinWidget.replace (/(https?:\/\/)(.*?)(\/+?)/g, host + '$3');
	$('#signin-widget-modal').html(newString);
	
	// re-initialize these functions
	signinbuttonclick();	
	// this not getting triggered on shown, so call it explicitly, here
	updateSignInForm('form_signon');
})

function createCookie(name,value,days, isSession) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  if(isSession){
		document.cookie = name+"="+value+"; path=/;";
  } else {
		document.cookie = name+"="+value+expires+"; path=/;";
  }
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function pageLevelNotify(){
$('#page-notify button.close[data-dismiss="alert"]').click(function(){
createCookie("pageNotification","true",1,false);
});
$('#browser-alert button.close[data-dismiss="alert"]').click(function(){
	createCookie("browserNotification","true",1,false);
});
}
function checkCookieExists(){
var cookieExists=readCookie("pageNotification");
if(cookieExists){
$("#page-notify").hide();
}
else {
$("#page-notify").show();
}
}
function checkBrowserCookieExists(){
var cookieExists=readCookie("browserNotification");
if(cookieExists){
	$("#browser-alert").hide();
}
else {
	$("#browser-alert").show();
}
}
function getURLSocialMedia(){
	var d = document;
	var l = d.location;
	var URLSocialMedia = l.href;
	var page_lang=$('html').attr('lang');
	var lang=page_lang+"-CA";
	URLSocialMedia = URLSocialMedia.replace('#', '');
	URLSocialMedia = URLSocialMedia.replace(/[\|]/g, '%7C');
	var prefixWT = 'WT.mc_id=';
	var suffixWT = ':Social:Networks:GenericSite:Sharetoolbar';
	var paraAppend = prefixWT + lang + suffixWT;
	if(URLSocialMedia.indexOf(suffixWT) < 0 && URLSocialMedia.indexOf(encodeURIComponent(suffixWT)) < 0){
		if(URLSocialMedia.indexOf('?') > -1){
			URLSocialMedia = URLSocialMedia + '&' + paraAppend;
		} else {
			URLSocialMedia = URLSocialMedia + '?' + paraAppend;
		}
	}
	return URLSocialMedia;
}
function shareFB() {
var d = document,
    f = 'https://www.facebook.com/share',
    l = d.location,
    e = encodeURIComponent,
    p = '.php?src=bm&v=4&i=1354276539&u=' + e(getURLSocialMedia()) + '&t=' + e(d.title);
1;
try {
    if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host)) throw (0);
    share_internal_bookmarklet(p)
} catch (z) {
    a = function () {
        if (!window.open(f + 'r' + p, 'sharer', 'toolbar=0,status=0,resizable=1,width=626,height=436')) l.href = f + p
    };
    if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
    else {
        a();
		if(l.href.indexOf("Tools+and+Resources")>-1){
			utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_facebook" });
		}
    }
  return true;
}
}
function shareTwitter() {
(function () {
    window.twttr = window.twttr || {};
    var D = 550,
        A = 450,
        C = screen.height,
        B = screen.width,
        H = Math.round((B / 2) - (D / 2)),
        G = 0,
        F = document,
	l = F.location,
        E;
    if (C > A) {
        G = Math.round((C / 2) - (A / 2))
    }
    //window.twttr.shareWin = window.open('http://twitter.com/share', '', 'left=' + H + ',top=' + G + ',width=' + D + ',height=' + A + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
    window.twttr.shareWin=window.open('https://twitter.com/intent/tweet?&text=' + encodeURIComponent(F.title) + '&url=' + encodeURIComponent(getURLSocialMedia()),'','left='+H+',top='+G+',width='+D+',height='+A+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
	if(l.href.indexOf("Tools+and+Resources")>-1){
		utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_twitter"    }); 
	}
    //  E = F.createElement('script');
      //E.src = 'http://platform.twitter.com/bookmarklets/share.js?v=1';
      //F.getElementsByTagName('head')[0].appendChild(E)
}());
}
function shareLinkedIn() {
(function () {
    var d = document,
        l = d.location,
        f = 'http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title=' + encodeURIComponent(d.title) + '&url=' + encodeURIComponent(getURLSocialMedia()),
        a = function () {
            if (!window.open(f, 'News', 'width=520,height=570,toolbar=0,location=0,status=0,scrollbars=yes')) {
               // l.href = f;
            }
        };
    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(a, 0);
    } else {
        a();
		if(l.href.indexOf("Tools+and+Resources")>-1){
			utag.link({  ev_type: "other",    ev_action: "clk",    ev_title: "share_linkedin" });
		}
    }
})()
return true;
}
function shareGooglePlus() {
	void(window.open('https://plus.google.com/share?ur\l='+encodeURIComponent(getURLSocialMedia()), 'Google','width=600,height=460,menubar=no,location=no,status=no'))
}
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}
/*Start of language toggle functionality*/
	function LanguageToggle() {
	var langAnchor = document.getElementById("langToggle");
    var langCodeField = document.getElementById("langToggle_lang");
    if (langAnchor && langCodeField && langCodeField.value) {
        var newLocale = langCodeField.value;
        var newUrl = "";
        var currUrl = location.href;
        var hashUrl;
        if (currUrl.indexOf("#") != -1) {
            hashUrl = currUrl.split('#');
        }
        if (currUrl.indexOf("?") != -1){
            equalUrl = currUrl.split('?');
        }
        //http://www.sunlife.ca/Canada/sunlifeCA/Health
        if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") == -1) && (currUrl.indexOf("vgnLocale") == -1)) {
            newUrl = currUrl + '?vgnLocale=' + newLocale;
        }
        //http://www.sunlife.ca/Canada/sunlifeCA/Health#sunlanguage
        if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") == -1) && (currUrl.indexOf("vgnLocale") == -1)) {
            newUrl = hashUrl[0] + '?vgnLocale=' + newLocale + '#' + hashUrl[1];
        }
        //http://www.sunlife.ca/Canada/sunlifeCA/Health?test=abc
        if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") == -1)) {
           if(equalUrl[0]=='https://stage-www.ca.sunlife/' ||equalUrl[0] == 'https://stage-www.sunlife.ca/') {
            	newUrl = "https://stage-www.ca.sunlife/ca?" + 'vgnLocale=' + newLocale  ;
           }
           else if (equalUrl[0] == 'https://www.sunlife.ca/' ){
              newUrl = "https://www.sunlife.ca/ca?" + 'vgnLocale=' + newLocale;
           }
           else{
              newUrl = currUrl + '&vgnLocale=' + newLocale;
           }
           // newUrl = currUrl + '&vgnLocale=' + newLocale;
        }
        //http://www.sunlife.ca/Canada/sunlifeCA/Health?test=abc#
        if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") == -1)) {
            newUrl = hashUrl[0] + '&vgnLocale=' + newLocale + '#' + hashUrl[1];
        }
		var vgnLocaleVal = getQuerystring("vgnLocale");
        if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") != -1)) {
                newUrl = currUrl.replace(vgnLocaleVal, newLocale);
        }
        if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") != -1)) {
		 newUrl = currUrl.replace(vgnLocaleVal, newLocale);
        }
		if(currUrl == 'https://stage-www.sunlife.ca/' || currUrl == 'https://stage-www.sunlife.ca/ca?vgnLocale=en_CA'){
			newUrl = "https://stage-www.sunlife.ca/ca?vgnLocale=fr_CA";
		}

		if(currUrl == 'https://www.sunlife.ca/' || currUrl == 'https://www.sunlife.ca/ca?vgnLocale=en_CA'){
			newUrl = "https://www.sunlife.ca/ca?vgnLocale=fr_CA";
		}

		if(currUrl == 'https://uat-www.ca.sunlife/' || currUrl == 'https://uat-www.ca.sunlife/ca?vgnLocale=en_CA'){
			newUrl = "https://uat-www.ca.sunlife/ca?vgnLocale=fr_CA";
		}

		newUrl =removeParam("pageNo", newUrl);
        $('li.langToggle a').prop('href', newUrl);
    }
}
/*End of language toggle functionality*/
function getQuerystring(key) {
    var query = window.location.search.substring(1);
    var value = 'null';
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
        	value = pair[1];
            return pair[1];
        }
    }
    return value;
}
/*Added for vew desktop */
/** page load event **/
jQuery(document).ready(function($){
	if(!isMobile()){
		$( ".mobile-site" ).css('visibility', 'hidden');
	}
	//Following block of code added for view desktop functionality
	$("#desktopview,#desktopviewmobile").click(function (e) {
		//reading cookie value for mobile-alert-checkbox
		var  checked = readCookie('mobile-alert-checkbox');
//if user already ticked checkbox for not to see message again it won't show popup-message after desktop-view click
		if(checked === 'true') {
			$("#toDesktopPopup").modal('hide');
			$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
		}else{
			//For the first time in session ,after clicking on desktop view link pop-up message appears.Now user ticked checked during proceeding with 'okay' button.
			$("#desktopview-ok-btn").click(function () {
				//if user ticked checkbox new cookie named 'mobile-alert-checkbox' will be created.
				if($('#non-opt-remember').prop('checked')){
					createCookie("mobile-alert-checkbox",true,1, true);
				}
				// after clicking 'desktop-view' link another cookie will create named 'desktopview' and page will appear from top section.
				createCookie("desktopview","true",1,true);
				$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
			});
			$("#toDesktopPopup").modal('show');
		}
		$('body').scrollTop(0);
	});
	$("#mobileview").click(function () {

		createCookie("desktopview","true",-1);
		location.reload(true);	//refresh from server
		$('body').scrollTop(0);
	});
	//Code ends for view desktop functionality
	var status = readCookie('desktopview');
	// need to hide / unhide view desktop / mobile linkes based on cookie
	if(status === 'true') {
		 $( ".mobile-site" ).css('visibility', 'visible');
	}
});
/** Added for Top Navigation Avtive functionality**/
jQuery(document).ready(function(){
    var pathName= window.location.pathname ;
	//console.log(pathName);
	$('ul.main-nav').find('li.nav-item:not(".hidden-lg") > a').each(function(){
		var strLink =  $(this).attr('href');
		if(strLink.indexOf('?') > -1){
			//alert('pathName.indexof(?)='+pathName.indexOf('?'));
			strLink = strLink.substr(1,(strLink.indexOf('?')-1));
			//console.log(strLink);
			if(pathName.indexOf(strLink) > -1 ){
				//console.log('matched for pathName='+pathName);
				$(this).addClass("nav-active");
			}
		}
	});

});
/** END for Top Navigation Avtive functionality**/
/****/
/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);






/*  ===========================================
============== * off canvas * ====================
=========================================== */

// editor adds extra <ul> which needs to be removed
function moveHamburgerSearch() {
	var hamburgerSearch = $('li.hamburgerSearch');
	if (hamburgerSearch.length > 0) {
		var hamParent = hamburgerSearch.parent();
		hamParent.replaceWith(hamburgerSearch);
		//$('.navbar-nav').prepend(hamburgerSearch);
		//hamParent.remove();
	}
}

function moveBodyContentsIn(){
	var prev = ".mobile-navbar";
	if($("#logo").length){
		$("#logo").insertAfter(prev);
		prev = "#logo";
	}

	if($("#breadcrumbs").length){
		$("#breadcrumbs").insertAfter(prev);
		prev = "#breadcrumbs";
	}

	if($("#pageheading").length){
		$("#pageheading").insertAfter(prev);
		prev = "#pageheading";
	}

	if($("#page-content").length){
		$("#page-content").insertAfter(prev);
		prev ="#page-content";
	}

	if($("#footer").length){
		$("#footer").insertAfter(prev);
		prev ="#footer";
	}
/*
	if($("#foot-note").length){
		$("#foot-note").insertAfter(prev);
		prev ="#foot-note";
	}
*/
	if(!$("#mobile-top-container").length){
		$(".navbar .mobile-navbar").prepend("<div class='col-xs-12' id='mobile-top-container'></div>");
		$(".navbar #mobile-top-container").prepend($("#search-top"));
		$(".navbar #mobile-top-container").prepend($("#page-notify"));
	}
		//set mobile logo magin-top
		// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
		if ($('.mobile-logo .col-sm-12').children().length > 0) {
			$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
		}
}
function moveBodyContentsOut(){
	//$("#logo").insertBefore("#footer-pin-bar");
	//$("#breadcrumbs").insertBefore("#footer-pin-bar");
	//$("#pageheading").insertBefore("#footer-pin-bar");

	$("#footer").insertAfter("div[role='banner']");
	$("#page-content").insertAfter("div[role='banner']");
	$("#pageheading").insertAfter("#global-header");
	$("#breadcrumbs").insertAfter("#global-header");
	$("#logo").insertAfter("#global-header");

//	$("#foot-note").insertBefore("#footer-pin-bar");

	if($("#mobile-top-container").length){
		$("#search-top").insertAfter($("#language-top"));
		//$("#page-notify").insertBefore($("#yellow-stripe"));
		$("#page-notify").insertBefore($("#language-top"));
		$("#mobile-top-container").remove();
	}
}
/** On page load **/
jQuery(document).ready(function () {

	if(!isMobile()){
		moveBodyContentsOut();
	}
	else{
		moveBodyContentsIn();
		updateTopOffset();
	}

	// call function to move hamburgerSearch element
	moveHamburgerSearch();

	function updateTopOffset(){
		//set mobile logo magin-top
		// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
		if ($('.mobile-logo .col-sm-12').children().length > 0) {
			$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
		}
	}
	function isBreakpointChanged(){
		return isMobile(prevWidth) != isMobile();
	}
	$('[data-toggle="offcanvas"]').click(function (event) {
		event.preventDefault();
		$('.main-nav').removeClass('moves-out');
		$('body').toggleClass('off-canvas-active');
    $('.row-offcanvas').toggleClass('inactive active');
		//$('.row-offcanvas').toggleClass('inactive');

		if($('.row-offcanvas').hasClass('active')){
			//$('.mobile-logo').css('margin-top', '10px');

			if(!$(".offcanvas-overlay").length){
				$("<div class='offcanvas-overlay'>").css({
					position: "absolute",
					width: "100%",
					height: "100%",
					left: 0,
					top: 0,
					zIndex: 1000000,
					background: 'black',
					opacity: 0.5,
					display: "block"
				}).appendTo($(".content-container"));

				$(".offcanvas-overlay").click(function(){
					$('[data-toggle="offcanvas"]').click();
					$(this).remove();
					//reset nav
					$('.moves-out').removeClass('moves-out');
					$("body, html").css('overflow-y', "auto");
					//set mobile logo margin-top
					//$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
				});
			}
			$("body, html").css('overflow-y', "hidden");
			//$(".content-container").css('position', "fixed");
			$('.content-container').bind('touchmove', function(e){e.preventDefault()});
		}else{
			$('.content-container').unbind('touchmove');
			$(".content-container").css('position', "static");
		}
	});

	$("#close-hamburger").click(function(){
		$('[data-toggle="offcanvas"]').click();
		$(".offcanvas-overlay").remove();
		//reset nav
		$('.moves-out').removeClass('moves-out');
		$("body, html").css('overflow-y', "auto");
	});

	var prevWidth = window.innerWidth;
	/** On page resize **/
	$(window).resize(function() {
		if(!isMobile()){
			if(isBreakpointChanged()){
				moveBodyContentsOut();
			}
			$(".row-offcanvas").removeClass('active');

			if($(".offcanvas-overlay").length > 0){
				$(".offcanvas-overlay").click();
			}
		}
		else{
			if(isBreakpointChanged()){
				var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
				var ios=navigator.userAgent.match('CriOS');
				if(!(isAndroid || ios)){
					moveBodyContentsIn();
				}
			}
			updateTopOffset();
			if(!isMobile() && !isTouchDevice()){
				$('.mobile .nav-item').removeClass('open');
			}
		}
		prevWidth = window.innerWidth;
	});
});
/** Temp fix for leftnav - fr issue **/
/*
$(document).ready(function () {
	var ln =$('html').attr('lang');
    if(ln =="fr") {
		if( $('.breadcrumb').length ){
			var breadcrumbText= $('.breadcrumb').find('li:nth-child(2)').text();
			if($('.left-nav-menu').length){
			   $('.left-nav-menu').find('.menu-header strong').html(breadcrumbText);
			}
		}
	}
});
function tabfix(){
	var tabs = $( '.slf-tab-container:not(.news-listing)' ).find( 'ul.slf-full-tabs > li > a' );
	$.each( tabs, function ( index, tab ) {
		 var contentID = $(this).attr('href').replace('#', '');
		 var contentID_new = contentID + "-content";
			$(this).closest('.slf-tab-container').find('.tab-content').find('#' + contentID).attr('id', contentID_new);
			$( this ).attr('href', "#"+contentID_new);
		 });
}
*/

/** ADOBE SEARCH updated global search js on 5th Jan 2018 RM fix**/
/** SEARCH JS**/

/* globals jQuery, document, window, __slf_search_config, utag */
(function ($) {
    var apiPrefix = __slf_search_config.api_url;

    var stringsEn = {
        filter_names: {
            "": "All",
            "all": "All",
            "articles": "Articles",
            "products": "Products",
            "tools": "Tools",
            "videos": "Videos",
        }
    }
    var stringsFr = {
        filter_names: {
            "": "Tous",
            "all": "Tous",
            "articles": "Articles",
            "products": "Produits",
            "tools": "Outils",
            "videos": "Vidéos",
        }
    }
    /** added on sept 18  **/

    var stringsZh = {
            filter_names: {
                "": "全部",
                "all": "全部",
                "articles": "文章",
                "products": "產品",
                "tools": "工具",
                "videos": "影片",
            }
    }

    var stringsZhSG = {
                    filter_names: {
                        "": "全部",
                        "all": "全部",
                        "articles": "'文章",
                        "products": "产品",
                        "tools": "工具",
                        "videos": "视频",
                    }
    }
    var stringsIn = {
            filter_names: {
                "": "Semua",
                "all": "Semua",
                "articles": "Artikel",
                "products": "Produk",
                "tools": "Fitur",
                "videos": "Video",
            }
    }
    var stringsVn = {
        filter_names: {
            "": "Tất cả",
            "all": "Tất cả",
            "articles": "Bài viết",
            "products": "Sản phẩm",
            "tools": "Công cụ",
            "videos": "Video",
        }
    }
    
        var urlParam = getParams();
                var strings="";
                var vgnLocaleSearch = urlParam.vgnLocale;

           if(vgnLocaleSearch === "fr_CA" ){
        	strings=stringsFr;

            } else if(vgnLocaleSearch === "zh_TW"){
        		strings=stringsZh;
            } else if(vgnLocaleSearch === "zh_SG"){
        		strings=stringsZhSG;
            }else if(vgnLocaleSearch ==="in_ID"){
        		strings=stringsIn;
            }
            else if(vgnLocaleSearch ==="vi_VN"){
	            		strings=stringsVn;
            }
        	else{
        		vgnLocaleSearch ="en_CA";
        		strings=stringsEn;
		}



    /** end **/

    //var strings = document.documentElement.lang.indexOf("fr") >= 0 ? stringsFr : stringsEn;

    var resultTemplate = $($.parseHTML($("#search-result-item").text())).filter(".search-result-item");
    var filterItemTemplate = $($.parseHTML($("#search-result-filter-item").text())).filter(".check-container");
    var paginationFirst = $($.parseHTML($("#search-result-pagination-first").text())).filter("li");
    var paginationItem = $($.parseHTML($("#search-result-pagination-item").text())).filter("li");

    function apiCall(query) {
        var deferred = jQuery.Deferred();
        $.ajax({
            url: apiPrefix,
            data: query,
            dataType: 'jsonp',
            timeout: 5000,
            success: function (data) {
                deferred.resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                deferred.reject(errorThrown)
            }
        });

        return deferred.promise();
    }

    function getParams() {
        var params = {};
        if (!window.location.search) return params;
        window.location.search.substring(1).split("&").map(function (paramStr) {
            return paramStr.split("=");
        }).forEach(function (paramArr) {
            try {
                params[decodeURIComponent(paramArr[0])] = decodeURIComponent(paramArr[1].replace(/\+/g, '%20'));
            } catch (e) {
                // Do not add malformed param to returned object
            }
        });
        return params;
    }

    function resetPage() {
        $("#search-result-items").empty();
        $("#search-result-filter-list").empty();
        $("#search-result-pagination li.pagination-item").remove();
        $("#search-result-none").hide();
        $("#search-result-error").hide();
        $("#search-result-results").hide();
        $("#search-result-banner-top").hide();
    }

    function searchError(err) {
        resetPage();
        console.error("Error populating search!"); // eslint-disable-line
        console.error(err); // eslint-disable-line
        $("#search-result-error").show();
    }

    function getCurrentFilter(filters) {
        var filtered = filters.filter(function (filter) { return filter.selected; })
        if (!filtered.length) return "all";
        return filtered[0].result_type;
    }
    function getCurrentPage(pagination) {
        var filtered = pagination.pages.filter(function (page) { return page.selected === 'true'; })
        if (!filtered.length) return 1;
        return Number(filtered[0].page);
    }

    function buildSearchString(obj) {
        return "?" + Object.keys(obj).map(function (key) {
            if (obj[key] === null || typeof (obj[key]) === 'undefined') return;
            return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]).replace(/%20/g, '+');
        }).filter(function (v) { return !!v; }).join("&");
    }

    function trackingCall(action, filter, totalResults, searchTerm) {
        if (!filter) filter = "all";
        var ev_title;

        if (action === 'input') ev_title = "onsite search_client input";
        else if (action === 'input') ev_title = "onsite search_client input";
        else if (action === 'typeahead') ev_title = "onsite search_typeahead_text";
        else if (action === 'filter') ev_title = "onsite search_filter";
        else return;

        var filterName = stringsEn.filter_names[filter] || stringsEn.filter_names.all;
        var options = {
            ev_type: "other",
            ev_action: "clk",
            ev_title: ev_title,
            ev_data_one: "search_count=" + totalResults + ":search_filter=" + filterName,
            page_search_term: searchTerm
        };
        try {
            utag.link(options);
        } catch(e) {
            console.log("Couldn't perform utag.link() call.") // eslint-disable-line
            console.log(options); // eslint-disable-line
        }
    }

    function populateResults(results, originalSearchTerm, action,vgnLocaleSearch) {
        resetPage();
        var resultItems = results.resultsets[0].results;
        var searchTerm = results.general.query;
        var totalResults = results.general.total;
        var filters = results.result_types;

        var currentResultType = null;
        var currentPage = getCurrentPage(results.pagination[0]);
        var totalPages = Number(results.general.page_total);

        if (filters) {
            currentResultType = getCurrentFilter(filters);
        }

        function setupPaginationItem(paginationItems, page) {
            var el = (page === 1 ? paginationFirst : paginationItem).clone();
            el.find(".txt").text(page)
            el.toggleClass("active", page === currentPage)
            el.find("a")
                .attr("href", buildSearchString({
                    q: results.general.query,
                    filter: currentResultType,
                    page: page,
	       	    vgnLocale: vgnLocaleSearch
                }));
            return paginationItems.add(el);
        }

        if (originalSearchTerm !== searchTerm) {
            $("#search-result-misspelling").show();
            $("#search-result-misspelling-term").text(searchTerm);
        } else {
            $("#search-result-misspelling").hide();
        }

        if (!resultItems.length) {
            $("#search-result-none").show();
            $("#search-result-none-term").text(searchTerm);
			try{
				trackingCall(action, currentResultType, totalResults, searchTerm);
			}catch (e){
				console.log('tracking call failed - no search results');
			}
        } else {
            trackingCall(action, currentResultType, totalResults, searchTerm);
            $("#search-result-results").show();
            $("#search-result-num-results").text(totalResults);
            $("#search-result-num-plural").toggle(totalResults !== "1");
            $("#search-result-num-single").toggle(totalResults === "1");
            var els = resultItems.map(function (result) {
                var el = resultTemplate.clone();
                el.find("a:not(.search-result-display-url)").attr("href", result.url)
                    .find(".txt").text(result.title);
                if (result['file-type'] !== 'pdf') el.find("a > .fa").remove();
                else {
                    el.find("a").attr("target", "_blank");
                }
                el.find("p").text(result.desc);
                el.find(".search-result-display-url").text(result['display-url'] || result.url)
                    .attr({
                        title: result.url,
                        href: result.url
                    });
                return el;
            });

            $("#search-result-items").append(els);

            if (filters) {
                var filterEls = filters.map(function (filter) {
                    if (!filter || !filter.count) return;

                    var el = filterItemTemplate.clone();
                    el.find(".txt").text(strings.filter_names[filter.result_type || "all"])
                    el.find(".num").text(filter.count)
                    var linkEl = el.find("a").toggleClass('active', filter.selected)
                        .attr('href', buildSearchString({
                            q: results.general.query,
                            filter: filter.result_type,
                            action: 'filter',
			vgnLocale: vgnLocaleSearch
                        }))

                    if (filter.selected) {
                        linkEl.click(function (event) {
                            event.preventDefault();
                        })
                    }

                    return el;
                }).filter(function (v) { return v; }) ;
                $("#search-result-filter-list").append(filterEls);
                if (filterEls.length > 1) $("#search-result-filters").show();
	                      else $("#search-result-filters").hide();
	                  } else {
	                      $("#search-result-filters").css("display", "none");
            }

            $("#search-results-pagination-previous")
                .toggleClass("disabled", currentPage < 2)
                .find("a")
                .attr("href", buildSearchString({
                    q: results.general.query,
                    filter: currentResultType,
                    page: currentPage - 1,
		   vgnLocale: vgnLocaleSearch
                }));
            $("#search-results-pagination-next")
                .toggleClass("disabled", currentPage >= totalPages)
                .find("a")
                .attr("href", buildSearchString({
                    q: results.general.query,
                    filter: currentResultType,
                    page: currentPage + 1,
		     vgnLocale: vgnLocaleSearch
                }));
            var paginationItems = $();


            paginationItems = setupPaginationItem(paginationItems, 1);

            if (currentPage >= 5 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

            var startPage = Math.max(currentPage - 2, 2);
            var endPage = currentPage + 2;
            if (currentPage < 3) {
                endPage = Math.min(5, totalPages - 1);
            } else if (totalPages - currentPage < 3) {
                startPage = Math.max(totalPages - 4, 2)
                endPage = totalPages - 1;
            }
            for (var p = startPage; p <= endPage; p++) {
                paginationItems = setupPaginationItem(paginationItems, p);
            }

            if ((totalPages - currentPage) >= 4 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

            paginationItems = setupPaginationItem(paginationItems, totalPages);

            $(paginationItems).insertBefore($("#search-results-pagination-next"));
            $("#search-result-pagination").toggleClass("first-page", currentPage < 2);
            $("#search-result-pagination").toggleClass("last-page", currentPage >= totalPages);
            $("#search-result-pagination").toggle(totalPages > 1);
            $("#search-result-page-num").text(currentPage);
            $("#search-result-page-total").text(results.general.page_total);
        }

        var topBanners = results.banners.filter(function (banner) { return banner.top; });
        if (topBanners[0] && topBanners[0].top) {
            $("#search-result-banner-top").html(topBanners[0].top).show();
        }

        var rightBanners = results.banners.filter(function (banner) { return banner.right; });
        if (rightBanners[0] && rightBanners[0].right) {
            $("#search-result-banner-right").html(rightBanners[0].right).show();
        }
    }

    function init() {
        var urlParams = getParams();
        var searchString = (urlParams.q || urlParams.gq || "").trim();
        var filter = urlParams.filter || "all";
        var page = parseInt(urlParams.page);
        var action = urlParams.action;
	var vgnLocaleSearch = urlParams.vgnLocale;
	if(document.documentElement.lang.indexOf("fr")>=0){
		vgnLocaleSearch = "fr_CA";

	} else if(document.documentElement.lang.indexOf("zh")>=0){
		if(vgnLocaleSearch == "zh_SG"){
			vgnLocaleSearch = "zh_SG";
		}else{
			vgnLocaleSearch = "zh_TW";
		}
	} else if(document.documentElement.lang.indexOf("in")>=0){
		vgnLocaleSearch = "in_ID";
    } else if(document.documentElement.lang.indexOf("vi")>=0){
		vgnLocaleSearch = "vi_VN";
	}
	else{
		vgnLocaleSearch ="en_CA";
		}

        if (isNaN(page)) page = 1;

        $("form.slf-search input[name=q]").val(searchString);
        if (!searchString) {
            resetPage();
            return;
        }
        apiCall({q: searchString, pt: filter, page: page}).then(function (results) {
            try {
                populateResults(results, searchString, action,vgnLocaleSearch);

            } catch(e) {
                searchError(e);
            }
        }, function (err) {
            searchError(err);
        });

        $(".search-filter-btn").click(function () {
            $("#search-result-filter-toggle").addClass("active");
            $("#search-result-filter-toggle .btn-close").focus();
        });
        $("#search-result-filter-toggle .btn-close").click(function () {
            $("#search-result-filter-toggle").removeClass("active");
            $(".search-filter-btn").focus();
        })

        $("[data-refocus]").focus(function () {
            var selector = $(this).attr("data-refocus");
            var el = $(selector);
            if (el.length > 0) {
                el.eq(0).focus();
            }
        })
    }

    init();
}(jQuery));


/* global.search.js*/

/* globals jQuery, setTimeout, clearTimeout, __slf_search_config */
(function ($) {

    var idCnt = 0;
    var autoCompletePrefix = __slf_search_config.autocomplete_url;
    var saytPrefix = __slf_search_config.sayt_url;
    var autocompleteOptions = {
        max_results: 10,
        beginning: 1
    };

    function throttle(cb, delay) {
        var timer = null;
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var thisObj = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                cb.apply(thisObj, args);
                timer = null;
            }, delay);
        }
    }

    function autocompleteCall(query) {
        return $.get(autoCompletePrefix, $.extend({ query: query }, autocompleteOptions), null, 'jsonp');
    }
    function saytCall(query) {
        return $.get(saytPrefix, { q: query, type: 'sayt' }, null, 'jsonp');
    }

    function setupAutocomplete(form, mobile) {
		if (mobile) {
			var inputEl = form.find("input[name=q]");
			var actionEl = form.find("input[name=action]");
			var autocompleteListEl = form.find(".search-autocomplete-list-mobile");
			var saytListEl = form.find(".search-sayt-list-mobile");
			var dropdownEl = form.find(".search-autocomplete-mobile");
			var lastVal = "";
			var suggestionIndex = -1;
			var suggestions = [];
			var idNum = idCnt++;
			var listId = "slf-autocomplete-list-mobile-" + idNum;
		}
		else {
		        var inputEl = form.find("input[name=q]");
		        var actionEl = form.find("input[name=action]");
		        var submitBtn = form.find("input[type=submit]");
		        var autocompleteListEl = form.find(".search-autocomplete-list");
		        var saytListEl = form.find(".search-sayt-list");
		        var dropdownEl = form.find(".search-autocomplete");
		        var lastVal = "";
		        var suggestionIndex = -1;
		        var suggestions = [];
		        var idNum = idCnt++;
		        var listId = "slf-autocomplete-list-" + idNum;
		}
        var submitLock = false;

        inputEl[0].autocomplete = 'off';

        autocompleteListEl.attr("aria-hidden", "true");

        function updateSelection() {
            if (suggestionIndex < 0) {
                if (inputEl.val() !== lastVal) inputEl.val(lastVal);
                actionEl.val("input");
            } else {
                inputEl.val(suggestions[suggestionIndex]);
                actionEl.val("typeahead");
            }
            autocompleteListEl.children().removeClass("active");
            if (suggestionIndex >= 0) autocompleteListEl.children().eq(suggestionIndex).addClass("active");
        }

        function clickSuggestion(event) {
            event.preventDefault();
            var suggestion = $(this).data("slf-search-value");
            updateEmpty();
            actionEl.val("typeahead");
            inputEl.val(suggestion);
            form.submit();
        }

        function updateSuggestions(q, force) {
            return function (results) {
                if (!force && inputEl.val() !== q) return;

                suggestions = results.filter(function (r) {
                    return r !== lastVal;
                });
                if (!suggestions.length) {
                    autocompleteListEl.hide();
                } else {
                    autocompleteListEl.show();
                }
                suggestionIndex = -1;
                autocompleteListEl.empty().append(suggestions.map(function (suggestion, i) {
                    return $("<li role='option'>")
                        .attr("id", listId + "_" + i)
                        .html(suggestion.substring(0, lastVal.length) + "<span class='bold'>" + suggestion.substring(lastVal.length) + "</span>")
                        .data("slf-search-value", suggestion)
                        .click(clickSuggestion).get(0);
                }));
                updateSelection();
            }
        }

        function updateSayt(q, force) {
            return function (results) {
                if (!force && inputEl.val() !== q) return;

                var arr;
                try {
                     arr = results.results;
                } catch(e) {
                    arr = [];
                }

                if (!arr.length) saytListEl.hide();
                else saytListEl.show();
                saytListEl.empty().append(arr.map(function (resultItem) {
                    return $("<li>").append($("<a class='sayt-link'>").append([
                        $("<span class='title'>").text(resultItem.title)[0],
                        $("<span class='desc'>").text(resultItem.desc)[0]
                    ]).attr("href", resultItem.url));
                }))
            }
        }

        function updateEmpty() {
            updateSuggestions([], true)([]);
            updateSayt(null, true)();
        }

        var getSuggestions = throttle(function () {
            var v = inputEl.val();
            if (v === lastVal) return;
            lastVal = v;
            if (v) {
                autocompleteCall(v).then(updateSuggestions(v));
                saytCall(v).then(updateSayt(v))
            }
            else updateEmpty();
        }, 200);

        inputEl.on('focus', function (event) {
            var v = inputEl.val();
            var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget);
            if (v && !stillInDropdown) {
                lastVal = v;
                autocompleteCall(v).then(updateSuggestions(v));
                saytCall(v).then(updateSayt(v))
            } else if (!stillInDropdown) {
                lastVal = v;
            }
        })
        form.on('focusout', function (event) {
            var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget) || event.relatedTarget === inputEl[0];
            if (!submitLock && !stillInDropdown) setTimeout(function () {
        updateEmpty();
      }, 0);

        });
        inputEl.on('keydown', function (event) {
            if (event.key === "ArrowDown" || event.key === "Down") {
                event.preventDefault();
                if (suggestionIndex + 1 === suggestions.length) suggestionIndex = suggestions.length - 1;
                else suggestionIndex += 1;
                updateSelection();
            } else if (event.key === "ArrowUp" || event.key === "Up") {
                event.preventDefault();
                if (suggestionIndex < 0) suggestionIndex = -1;
                else suggestionIndex -= 1;
                updateSelection();
            } else if (event.key === "Escape" || event.key === "Esc") {
                event.preventDefault();
                updateEmpty();
            } else if (event.key === 'Enter') {
                submitLock = true;
                setTimeout(function () {
                   submitLock = false;
                }, 0);
            } else if (event.key !== 'Tab') {
            	getSuggestions();
             }
        });
        
	if (submitBtn) {
	        submitBtn.on('mousedown', function () {
        		submitLock = true;
			setTimeout(function () {
        		        submitLock = false;
	        	}, 0);
        	});
	}

        autocompleteListEl.on('mousedown', function (event) {
            event.preventDefault();
        })
        saytListEl.on('mousedown', function (event) {
            event.preventDefault();
        })

        form.on('submit', function (event) {
            if (!inputEl.val().trim()) {
                event.preventDefault();
            }
        });
    }

    function init() {
        $("form.slf-search").each(function (i, form) {
            form = $(form);
            if (form.data("slf-search-initialized")) return;
            form.data("slf-search-initialized", true);
            setupAutocomplete(form);
        });
	$("form.slf-search-mobile").each(function (i, form) {
            form = $(form);
            if (form.data("slf-search-initialized")) return;
            form.data("slf-search-initialized", true);
            setupAutocomplete(form, 'mobile');
        });
    }

    init();
    $(init);
}(jQuery));


/** ADOBE GlobalSEARCH JS ENDS HERE **/
$( document ).ready(function() {
	//bind the CTA box bottom-aligned buttons to the form submission buttons
	$('#locate-advisors-btn').click(function(){
		var form = $('#locate-advisors-form').parsley({
		});
		form.validate();
		$('#locate-advisors-form').submit();
	});
	
	$('#find-an-advisor-btn').click(function(){
		$('#find-an-advisor-form').submit();
	});
	

//    $('#cta-provider-search-btn').click(function(){
//		$('#cta-provider-search-form').submit();
//	});


	//set the height of the description box to be equal across all CTA boxes
	function setEqualHeight() {
		var cta_desc_height = 0;

		$(".div-one").each(function() {
				$(this).css('height', 'auto'); //allow box to grow to a default height
				if ($(this).height() > cta_desc_height) {
						cta_desc_height = $(this).height();
				}
		});
		$(".div-one").each(function() {
				$(this).css("height", cta_desc_height);
		});
	}

	// only adjust the cta box height if they are not stacked, otherwise, no need
	if (($(window).width()) > 767) {
		setEqualHeight();
	}

	// if orientation changes, also check if the cta box needs to be adjusted
	$(window).on("orientationchange", function(e) {
		//a timeout is required because there completion of orientation change cannot be detected
		window.setTimeout(function() {
				setEqualHeight();
		}, 200);
	});

	//update the Get a quote's form action based on the dropdown selection
	$("#get-a-quote-submit, #get-a-quote-btn").click(function() {
		var action = $('#select-product').val();
		var target = $('#select-product option:selected').data('target');
		$("#get-a-quote-form").attr("action", action);
		$("#get-a-quote-form").attr("target", target);
	});

	//validate the CTA Get a quote select dropdown form and trigger the desktop submit button
	$("#get-a-quote-btn").click(function() {
		var form = $("#get-a-quote-form").parsley({
		});
		form.validate();
		$('#get-a-quote-form').submit();
	});

	//validate the CTA Newsletter subsribe form
	$("#newsletter-subsribe-submit, #newsletter-subsribe-btn").click(function() {
		var form = $("#subsribe-newsletter-form").parsley({
		});
		form.validate();
		$('#subsribe-newsletter-form').submit();
	});
	

    //Initiate parley validation for Provide search CTA
    $("#cta-provider-search-btn").on("click", function() {
		var form = $("#cta-provider-search-form").parsley({
		});
		form.validate();

           if (form.isValid()) {
               	$('#cta-provider-search-form').submit();
           }
	});
    
});


// LnP newsletter subscribe Story
//set cookie that expires after a browser session ends
function setCookie(cname, cvalue, days) {
	var d = new Date();
	var expires = '';
	if (days > 0) {
		var time = d.getTime();
		var expireTime = time + 1000*60*60*24*days;  // ms * secs * mins * hrs * days
		d.setTime(expireTime);
		var expires = "expires="+ d.toUTCString();
	} else {
		var expires = 0; "expires="+ d.toUTCString();
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
					c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
			}
	}
	return "";
}

if (window.location.href.indexOf("/ca/Tools+and+Resources/Money+and+Finances") > -1  //https://www.sunlife.ca/ca/Learn+and+Plan/Money
					|| window.location.href.indexOf("/ca/Tools+and+Resources/Health+and+Wellness") > -1) {
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() >= $(document).height()/2) {
			if (getCookie('subscribecookie') == "") {
				//var url = new URL(window.location.href);
				//var wtmcid = url.searchParams.get("WT.mc_id");
				var wtmcid = getQuerystring("WT.mc_id");
				if ( (wtmcid != null) && (wtmcid.indexOf("Direct:Newsletter") > -1) ) {
					//setCookie('subscribecookie', 'displayed', 180);
					createCookie('subscribecookie', 'displayed', 180, false)
				} else {
					if($("#subscribe").length==1){
						$("#subscribe").modal({show:true});
						//setCookie('subscribecookie', 'displayed', 0);
						// check for IE11: session cookies disabled by default, so for IE, set expiry for 1 day
						if (navigator.userAgent.indexOf("MSIE") > 0) {
							createCookie('subscribecookie', 'displayed', 1, false)
						} else {
							createCookie('subscribecookie', 'displayed', -1, true)
						}
 					}
				}
			}
		}
	});
}

$(document).ready(function(){
	$("#news-overlay-subscribe").on("click", function() {
		var form = $(this).closest("form").parsley({
		});
		if (form.validate()) {
			createCookie('subscribecookie', 'displayed', 180, false)
		}
	});
});
//LnP Subscribe ends

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
} 

// V1.1 Nov 23, 2015 - a211
/* advisor match & region selection forms  */
function amSubmit(){
	var $input = $("#find-advisor-surname");
	var $name = $input.val();
	if(isValidName($name) && !isEmpty($name)){
		$("#advisorMatch").submit();
	} else {
		$input.closest('.form-group').addClass('has-error');
		var helpBlock = $input.closest('form').find('.help-block');
		helpBlock.removeClass('hidden').html( helpBlock.data("msg"));		
		$input.css('margin-bottom', 0);
		return false;	
	}
}
function regionSubmit(){
	var $input = $("#find-advisor-region");
	var $name = $input.val();
	if(isEmpty($name)){
		$input.closest('.form-group').addClass('has-error');
		var helpBlock = $input.closest('form').find('.help-block');
		helpBlock.removeClass('hidden').html( helpBlock.data("msg"));		
		return false;
	} else {
		$("#financialCenter").submit();
	}
}
$('[name=advisorMatch]').on('submit', function(e){
	if ( amSubmit() == false ){
		e.preventDefault();	
	}	
}); 
	
	$('[name=financialCenter]').on('submit', function(e){
	if ( regionSubmit() == false ){
		e.preventDefault();	
	}	
});