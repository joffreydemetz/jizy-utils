
const Types = {};

Types.isNull = (x) => x === null;

Types.isUndefined = (x) => x === undefined;

Types.isNil = (x) => Types.isNull(x) || Types.isUndefined(x);

// check for strings and string literal type. e.g: 's', "s", `str`, new String()
Types.isString = (x) => !Types.isNil(x) && (typeof x === 'string' || x instanceof String);

// check for number or number literal type. e.g: 12, 30.5, new Number()
Types.isNumber = (x) => !Types.isNil(x) && ((!isNaN(x) && isFinite(x) && typeof x === 'number') || x instanceof Number);

// check for boolean or boolean literal type. e.g: true, false, new Boolean()
Types.isBoolean = (x) => !Types.isNil(x) && (typeof x === 'boolean' || x instanceof Boolean);

Types.isArray = (x) => !Types.isNil(x) && Array.isArray(x);

// check for object or object literal type. e.g: {}, new Object(), Object.create(null)
Types.isObject = (x) => !Types.isNil(x) && ({}).toString.call(x) === '[object Object]';

// check for provided type instance
Types.is = (x, X) => !Types.isNil(x) && x instanceof X;
Types.isSet = (x) => Types.is(x, Set);
Types.isMap = (x) => Types.is(x, Map);
Types.isDate = (x) => Types.is(x, Date);

// check for provided type
Types.isA = (x, X) => !Types.isNil(x) && typeof x === X;
Types.isFunction = (x) => Types.isA(x, 'function');

export default Types;