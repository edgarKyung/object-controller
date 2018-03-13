/**
 * Created by nhyun.kyung on 2017-01-24.
 */


/**
 * Object의 깊은 복사를 위한 재귀함수
 *
 * @function _recursiveDeepCopy
 * @memberof objectConverter
 * @param _destination {object} 복사대상
 * @param _target {object} 복사타겟
 * @param _excludeAttrList {Array} 제외할 속성
 * @returns {undefined}
 * @private
 */
var _recursiveDeepCopy = function (_destination, _target, _excludeAttrList) {
    switch (getType(_target)) {
        case "object":
            var keys = Object.keys(_target);
            for (var i = 0; i < keys.length; i++) {
                if (_excludeAttrList.indexOf(keys[i]) === -1) {
                    switch (getType(_target[keys[i]])) {
                        case "object":
                            _destination[keys[i]] = {};
                            _recursiveDeepCopy(_destination[keys[i]], _target[keys[i]], _excludeAttrList);
                            break;
                        case "array":
                            _destination[keys[i]] = [];
                            _recursiveDeepCopy(_destination[keys[i]], _target[keys[i]], _excludeAttrList);
                            break;
                        default:
                            _destination[keys[i]] = _target[keys[i]];
                            break;
                    }
                }
            }
            break;
        case "array":
            for (var i = 0; i < _target.length; i++) {
                switch (getType(_target[i])) {
                    case "object":
                        _destination[i] = {};
                        _recursiveDeepCopy(_destination[i], _target[i], _excludeAttrList);
                        break;
                    case "array":
                        _destination[i] = [];
                        _recursiveDeepCopy(_destination[i], _target[i], _excludeAttrList);
                        break;
                    default:
                        _destination[i] = _target[i];
                        break;
                }
            }
            break;
    }
};


/**
 * 변수가 어떤 타입인지 획득
 *
 * @function getType
 * @memberof objectConverter
 * @param target {*} 검사할 변수
 * @returns {string}
 * @public
 */
var getType = function (target) {
    var type = typeof target;
    switch (type) {
        case "object":
            if (target === null) return "null";
            else {
                if (target.constructor === Object) return "object";
                else return "array";
            }
            break;
        default:
            return type;
    }
};


/**
 * 깊은복사하여 새로운 변수를 리턴
 *
 * @function deepCopy
 * @memberof objectConverter
 * @param target {*} 복사할 대상
 * @param excludeAttrList {Array} 제외할 속성
 * @returns {*}
 * @public
 */
var deepCopy = function (target, excludeAttrList) {
    excludeAttrList = excludeAttrList || [];
    var destination = null;
    switch (getType(target)) {
        case "object":
            destination = {};
            _recursiveDeepCopy(destination, target, excludeAttrList);
            break;
        case "array":
            destination = [];
            _recursiveDeepCopy(destination, target, excludeAttrList);
            break;
        default:
            destination = target;
            break;
    }
    return destination;
};


/**
 * Object를 String으로 변환
 *
 * @function jsonStringify
 * @memberof objectConverter
 * @param jsonData {object} string 으로 변경할 타겟
 * @param excludeAttrList {Array} 제외할 속성 이름
 * @returns {string}
 * @public
 */
var jsonStringify = function (jsonData, excludeAttrList) {
    excludeAttrList = excludeAttrList || [];
    var cache = [];
    return JSON.stringify(jsonData, function (key, value) {
        if (excludeAttrList.indexOf(key) === -1) {
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


/**
 * 두 Object를 합침
 *
 * @function mergeObject
 * @memberof objectConverter
 * @param _destObject {object} 합쳐지는 Object
 * @param _srcObject {object} 합칠 Object
 * @returns {undefined}
 * @public
 */
var mergeObject = function (_destObject, _srcObject) {
    try {
        if (getType(_destObject) === "object" && getType(_srcObject) === "object") {
            var keys = Object.keys(_srcObject);

            for (var i = 0; i < keys.length; i++) {
                if (_destObject[keys[i]] === undefined) {
                    _destObject[keys[i]] = _srcObject[keys[i]];
                }
            }
        }
    } catch (ex) {
        throw ex;
    }
};


/**
 * Key를 기준으로 Object를 재귀적으로 정렬
 *
 * @function sortObject
 * @memberof objectConverter
 * @param _object {object} 정렬을 수행할 Object
 * @returns {undefined}
 * @public
 */
var sortObject = function (_object) {
    try {
        if (getType(_object) === "object") {
            var keys = Object.keys(_object);
            keys.sort();

            for (var i = 0; i < keys.length; i++) {
                var tmp = _object[keys[i]];
                delete _object[keys[i]];
                _object[keys[i]] = tmp;
            }

            for (var j = 0; j < keys.length; j++) {
                sortObject(_object[keys[j]]);
            }
        }
    } catch (ex) {
        throw ex;
    }
};


/**
 * Object로 구성된 배열을 Object의 특정 Value 값을 기준으로 정렬
 *
 * @function sortListByObjectValue
 * @memberof objectConverter
 * @param _list {Array} 정렬할 대상
 * @param _key {string} 기준으로 설정할 Object 의 Key
 * @param _order {number} 오름차순, 내림차순 설정
 * @returns {undefined}
 * @public
 */
var sortListByObjectValue = function (_list, _key, _order) {
    try {
        if (_order === -1) {
            _list.sort(function (a, b) {
                return (a[_key] > b[_key]) ? -1 : (a[_key] < b[_key]) ? 1 : 0;
            });

        } else {
            _list.sort(function (a, b) {
                return (a[_key] < b[_key]) ? -1 : (a[_key] > b[_key]) ? 1 : 0;
            });
        }

    } catch (ex) {
        throw ex;
    }
};


/**
 * Object의 첫번째 Key를 획득
 *
 * @function getFirstKey
 * @memberof objectConverter
 * @param _object {object} 대상 Object
 * @returns {string}
 * @public
 */
var getFirstKey = function (_object) {
    try {
        if (getType(_object) === "object") {
            return Object.keys(_object)[0];
        }
    } catch (ex) {
        throw ex;
    }
};


/**
 * Object의 첫번째 Key의 Value를 획득
 *
 * @function getFirstValue
 * @memberof objectConverter
 * @param _object {object} 대상 Object
 * @returns {*}
 * @public
 */
var getFirstValue = function (_object) {
    try {
        if (getType(_object) === "object") {
            return _object[Object.keys(_object)[0]];
        }
    } catch (ex) {
        throw ex;
    }
};


/**
 * Object의 마지막 Key를 획득
 *
 * @function getLastKey
 * @memberof objectConverter
 * @param _object {object} 대상 Object
 * @returns {string}
 * @public
 */
var getLastKey = function (_object) {
    try {
        if (getType(_object) === "object") {
            var keys = Object.keys(_object);
            return keys[keys.length - 1];
        }
    } catch (ex) {
        throw ex;
    }
};


/**
 * Object의 마지막 Key의 Value를 획득
 *
 * @function getLastValue
 * @memberof objectConverter
 * @param _object {object} 대상 Object
 * @returns {*}
 * @public
 */
var getLastValue = function (_object) {
    try {
        if (getType(_object) === "object") {
            var keys = Object.keys(_object);
            return _object[keys[keys.length - 1]];
        }
    } catch (ex) {
        throw ex;
    }
};


/**
 * Object에 특정 Key가 존재하는지 검사 (null 검사는 하지 않음)
 *
 * @function checkAttribute
 * @memberof objectConverter
 * @param _object {object} 검사할 대상 Object
 * @param _checkList {Array} 검사할 속성 리스트
 * @returns {boolean}
 * @public
 */
var checkAttribute = function (_object, _checkList) {
    try {
        if (_object === null || _object === undefined) {
            return false;

        } else {
            for (var i = 0; i < _checkList.length; i++) {
                if (_object[_checkList[i]] === undefined) {
                    return false;
                }

            }
            return true;
        }

    } catch (ex) {
        throw ex;
    }
};


module.exports = {
    getType: getType,
    deepCopy: deepCopy,
    mergeObject: mergeObject,
    jsonStringify: jsonStringify,
    sortObject: sortObject,
    sortListByObjectValue: sortListByObjectValue,
    getFirstKey: getFirstKey,
    getFirstValue: getFirstValue,
    getLastKey: getLastKey,
    getLastValue: getLastValue,
    checkAttribute: checkAttribute
};
