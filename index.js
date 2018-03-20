/**
 * Created by nhyun.kyung on 2017-01-24.
 */


module.exports = (function() {
    /**
     * Get type of variable
     *
     * @function getType
     * @memberof objectController
     * @param target {*}
     * @returns {String}
     * @public
     */
    var getType = function(target) {
        var targetType = "";
        switch (target) {
            case null:              targetType = "null";        break;
            case undefined:         targetType = "undefined";   break;
            default:
                switch (target.constructor) {
                    case Function:  targetType = "function";    break;
                    case Object:    targetType = "object";      break;
                    case Array:     targetType = "array";       break;
                    case Number:    targetType = "number";      break;
                    case Boolean:   targetType = "boolean";     break;
                    case String:    targetType = "string";      break;
                    case Date:      targetType = "date";        break;
                    case Error:     targetType = "error";       break;
                    case RegExp:    targetType = "regexp";      break;
                    default:                                    break;
                }
        }
        return targetType;
    };


    var __checkRecursive = function(originTarget, originIndex) {
        var index = -1;
        for (var i = 0; i < originIndex.length; i++) {
            if (originTarget === originIndex[i]) {
                index = i;
                break;
            }
        }
        return index;
    };

    var __deepCopyWithRecursive = function(destination, origin, destinationIndex, originIndex) {
        switch (getType(origin)) {
            case "object":
                destinationIndex.push(destination);
                originIndex.push(origin);

                var keys = Object.keys(origin);
                for (var i = 0; i < keys.length; i++) {
                    switch (getType(origin[keys[i]])) {
                        case "object":
                            var recIndex = __checkRecursive(origin[keys[i]], originIndex);
                            if (recIndex === -1) {
                                destination[keys[i]] = {};
                                __deepCopyWithRecursive(destination[keys[i]], origin[keys[i]], destinationIndex, originIndex);

                            } else {
                                destination[keys[i]] = destinationIndex[recIndex];
                            }
                            break;

                        case "array":
                            var recIndex = __checkRecursive(origin[keys[i]], originIndex);
                            if (recIndex === -1) {
                                destination[keys[i]] = [];
                                __deepCopyWithRecursive(destination[keys[i]], origin[keys[i]], destinationIndex, originIndex);

                            } else {
                                destination[keys[i]] = destinationIndex[recIndex];
                            }
                            break;

                        default:
                            destination[keys[i]] = origin[keys[i]];
                            break;
                    }
                }
                break;

            case "array":
                destinationIndex.push(destination);
                originIndex.push(origin);

                for (var i = 0; i < origin.length; i++) {
                    switch (getType(origin[i])) {
                        case "object":
                            var recIndex = __checkRecursive(origin, originIndex);
                            if (recIndex === -1) {
                                destination[i] = {};
                                __deepCopyWithRecursive(destination[i], origin[i], destinationIndex, originIndex);
                            } else {
                                destination[i] = destinationIndex[recIndex];
                            }
                            break;

                        case "array":
                            var recIndex = __checkRecursive(origin, originIndex);
                            if (recIndex === -1) {
                                destination[i] = [];
                                __deepCopyWithRecursive(destination[i], origin[i], destinationIndex, originIndex);
                            }else {
                                destination[i] = destinationIndex[recIndex];   
                            }
                            break;
                        default:
                            destination[i] = origin[i];
                            break;
                    }
                }
                break;

            default:
                destination = origin;
                break;
        }
        return destination;
    };


    /**
     * Deep copy object with recursive
     *
     * @function deepCopyWithRecursive
     * @memberof objectController
     * @param origin {*} 
     * @returns {*}
     * @public
     */
    var deepCopyWithRecursive = function(origin) {
        var destination = null;
        var destinationIndex = [];
        var originIndex = [];
        switch (getType(origin)) {
            case "object":
                destination = {};
                __deepCopyWithRecursive(destination, origin, destinationIndex, originIndex);
                break;
            case "array":
                destination = [];
                __deepCopyWithRecursive(destination, origin, destinationIndex, originIndex);
                break;
            default:
                destination = origin;
                break;
        }
        return destination;
    };


    /**
     * Sort object by key's order
     *
     * @function sortObjectByKey
     * @memberof objectController
     * @param target {Object}
     * @returns {undefined}
     * @public
     */
    var sortObjectByKey = function(target, order) {
        if (getType(target) === "object") {
            var keys = Object.keys(target);
            if (order === -1)   keys.sort(function(a, b) { return (a > b) ? -1 : (a < b) ? 1 : 0; });
            else                keys.sort(function(a, b) { return (a < b) ? -1 : (a > b) ? 1 : 0; });

            for (var i = 0; i < keys.length; i++) {
                var tmp = target[keys[i]];
                delete target[keys[i]];
                target[keys[i]] = tmp;
            }
        }
    };


    /**
     * 1D array is composed of object is arranged by object's value of specific key
     *
     * @function sortListByObjectValue
     * @memberof objectController
     * @param target {Array}
     * @param key {String}
     * @param order {Number}
     * @returns {undefined}
     * @public
     */
    var sortListByObjectValue = function(target, key, order) {
        if(getType(target) === "array") {
            if (_order === -1)  target.sort(function(a, b) { return (a[key] > b[key]) ? -1 : (a[key] < b[key]) ? 1 : 0; });
            else                target.sort(function(a, b) { return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0; });
        }
    };


    /**
     * Get first key of object
     *
     * @function getFirstKey
     * @memberof objectConverter
     * @param target {Object}
     * @returns {String}
     * @public
     */
    var getFirstKey = function(target) {
        if (getType(target) === "object") {
            return Object.keys(target)[0];
        }
    };


    /**
     * Get first key's value of object
     *
     * @function getFirstValue
     * @memberof objectController
     * @param target {Object} 대상 Object
     * @returns {*}
     * @public
     */
    var getFirstValue = function(target) {
        if (getType(target) === "object") {
            return target[Object.keys(target)[0]];
        }
    };


    /**
     * Get last key of object
     *
     * @function getLastKey
     * @memberof objectController
     * @param target {Object}
     * @returns {String}
     * @public
     */
    var getLastKey = function(target) {
        if (getType(target) === "object") {
            var keys = Object.keys(target);
            return keys[keys.length - 1];
        }
    };


    /**
     * Get last key's value of object
     *
     * @function getLastValue
     * @memberof objectController
     * @param target {Object}
     * @returns {*}
     * @public
     */
    var getLastValue = function(target) {
        if (getType(target) === "object") {
            var keys = Object.keys(target);
            return target[keys[keys.length - 1]];
        }
    };



    /**
     * Convert object to string without recursive
     *
     * @function jsonStringify
     * @memberof objectController
     * @param target {Object}
     * @param excludeKeyList {Array} 
     * @returns {String}
     * @public
     */
    var jsonStringify = function(target, excludeKeyList) {
        excludeKeyList = excludeKeyList || [];
        var cache = [];
        return JSON.stringify(target, function(key, value) {
            if (excludeKeyList.indexOf(key) === -1) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) === -1) {
                        // Store value in our collection
                        cache.push(value);
                        return value;
                    } else {
                        // Circular reference found, discard key
                    }
                } else {
                    return value;
                }
            } else {
                // Exclude attribute found, discard key
            }
        });
    };

    var appendValueInSameKey = function(destination, source) {
        if(getType(destination) === "object" && getType(source) === "object") {
            var keys = Object.keys(source);
            for(var i=0 ; i<keys.length ; i++){
                switch(getType(destination[keys[i]])){
                    case "array":
                        if(destination[keys[i]].indexOf(source[keys[i]]) === -1) {
                            destination[keys[i]].push(source[keys[i]]);
                        }
                        break;
                    case "undefined":
                        destination[keys[i]] = [];
                        destination[keys[i]].push(source[keys[i]]);
                        break;
                    default:
                        console.error("Destination's data format is wrong when appending value in same key.");
                        break;
                }
            }
        }
    };


    return {
        "getType": getType,
        "deepCopyWithRecursive": deepCopyWithRecursive,
        "sortObjectByKey": sortObjectByKey,
        "sortListByObjectValue": sortListByObjectValue,
        "getFirstKey": getFirstKey,
        "getFirstValue": getFirstValue,
        "getLastKey": getLastKey,
        "getLastValue": getLastValue,
        "jsonStringify": jsonStringify,
        "appendValueInSameKey": appendValueInSameKey
    };
})();