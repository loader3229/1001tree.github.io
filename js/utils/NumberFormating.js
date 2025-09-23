
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !== 0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function nm_format(decimal, precision = 2, small, informat = false) {
    let oc = options.count
    if (oc == 6) return null

    small = small || modInfo.allowSmall
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + nm_format(decimal.neg(), precision, small, informat)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"

    if (informat || [0, 3, 5].includes(oc)) {
        if (decimal.gte("eeee1000")) {
            var slog = decimal.slog()
            if (slog.gte(1e6)) return "F" + format(slog.floor(), informat = true)
            else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
        }
        else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false)
        else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
        else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
        else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
        else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
        else if (decimal.eq(0)) return (0).toFixed(precision)
    } else if ([1, 2].includes(oc)) {
        let root = { 1: 2, 2: 10 }[oc]

        if (decimal.eq(0)) return (0).toFixed(precision)

        let power = decimal.log(root)
        if (power.gte(1000)) return `${root}^${nm_format(power, 0, small, true)}`
        else if (power.gte(0)) return `${root}^${nm_format(power, 3, small, true)}`
        else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    } else if (oc == 4) {
        return "🦊"
    }

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")) {
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else
        return format(decimal, precision, null, true) + "⁻¹"
}

const fc = [
    "null", "undefined", "NaN", "Infinity", "-Infinity", "true", "false", "Object", "Array", "String", "Number", "Boolean", "Symbol", "BigInt", "Function", "Date", "RegExp", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "Map", "Set", "WeakMap", "WeakSet", "Promise", "Proxy", "Reflect", "JSON", "Math", "Intl", "ArrayBuffer", "DataView", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", "Arguments", "Generator", "GeneratorFunction", "AsyncFunction", "globalThis", "this", "{}", "[]", "\"\"", "''", "``", "//", "1n", "1", "function() {}", "class {}", "Document", "Window", "Navigator", "Location", "History", "Console", "Event", "Image", "Option", "FormData", "URL", "URLSearchParams", "Blob", "File", "FileReader", "Audio", "Video", "CanvasRenderingContext2D", "WebSocket", "XMLHttpRequest", "MutationObserver", "IntersectionObserver", "Process", "Buffer", "Module", "Exports", "Require", "SetTimeout", "SetInterval", "SetImmediate", "__dirname", "__filename"
]
function format(decimal, precision = 2, small, informat = false) {
    let oc = options.count
    if (oc == 0 || informat) return nm_format(decimal, precision, small, true)

    const origin = nm_format(decimal, precision, small, false)

    let result = origin

    if ([1, 2].includes(oc)) {
        // no trans
    } else if ([3, 5].includes(oc)) {
        result = transNum(result, getFormatFun(oc), precision)
    } else if ([6].includes(oc)) {
        result = chooseOneInArray(fc, random(Math.floor(Date.now() / 1000 + 0.25 * Math.random())))
        function random(x) {
            function hash(seed) {
                let h = seed;
                h = ((h >> 16) ^ h) * 0x45d9f3b;
                h = ((h >> 16) ^ h) * 0x45d9f3b;
                h = (h >> 16) ^ h;
                return h;
            }
            const hashed = hash(x);
            const randomValue = Math.abs(hashed) / Math.pow(2, 31);
            return Math.floor(randomValue * 10001);
        }
    }

    return result
}

function getFormatFun(id) {
    return {
        3: function (num, precision) {
            return nm_format(num.sin(), 3, false, true)
        },
        5: function (num, precision) {
            return "|".repeat(num.toString().length)
        }
    }[id]
}

function isNumber(obj) {
    if (obj[0] === ".") return false;
    return obj == +obj;
}

function transNum(input, tFunc, precision) {
    const numberRegex = /([0-9\.]+)/g;

    let result = '';
    let lastIndex = 0;
    let match;

    input = input.replace(/,/g, "")

    while ((match = numberRegex.exec(input)) !== null) {
        const numberStr = match[0];
        const startIndex = match.index;

        if (isNumber(numberStr)) {
            result += input.slice(lastIndex, startIndex);

            const number = _D(numberStr);
            const transformed = tFunc(number, precision);
            result += transformed.toString();

            lastIndex = startIndex + numberStr.length;
        }
    }
    result += input.slice(lastIndex);

    return result;
}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && decimal.gt(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 1) return formatWhole(s * 1000) + "毫秒"
    else if (s < 60) return format(s) + "秒"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "分 " + format(s % 60) + "秒"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "小时 " + formatWhole(Math.floor(s / 60) % 60) + "分 " + format(s % 60) + "秒"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "天 " + formatWhole(Math.floor(s / 3600) % 24) + "小时 " + formatWhole(Math.floor(s / 60) % 60) + "分 " + format(s % 60) + "秒"
    else return formatWhole(Math.floor(s / 31536000)) + "年 " + formatWhole(Math.floor(s / 86400) % 365) + "天 " + formatWhole(Math.floor(s / 3600) % 24) + "时 " + formatWhole(Math.floor(s / 60) % 60) + "分 " + format(s % 60) + "秒"
}

function formatPersent(n, d) {
    return `${format(_D(n).mul(100), d, false, true)}%`
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision = 3) {
    return format(x, precision, true)
}

function invertOOM(x) {
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}

function showTime(time) {
    if (time.lte(new Decimal(86400))) {
        const totalSeconds = time.toNumber();
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (time.lt(new Decimal(31536000))) {
        const totalSeconds = time.toNumber();
        const days = Math.floor(totalSeconds / 86400);
        const remainingSeconds = totalSeconds % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        return `${days}天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else if (time.lt(new Decimal(315360000000))) {
        const totalSeconds = time.toNumber();
        const years = Math.floor(totalSeconds / 31536000);
        const remainingSeconds = totalSeconds % 31536000;
        const days = Math.floor(remainingSeconds / 86400);
        const hours = Math.floor(remainingSeconds / 3600 % 24);
        return `${years}年 ${days}天 ${hours.toString().padStart(2, '0')}时`;
    } else {
        const years = time.div(31536000);
        return `${ChineseCount(years)}年`;
    }
}