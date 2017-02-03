import { } from '../../node_modules/reflect-metadata';

const deserializeKey = Symbol("whymatter:deserializeMetaData");
const deserializeLog = false;

class Deserialisation {
    static d<T>(type: any, json: any): T {
        return new (type as any)()._deserialize(json) as T;
    }
}

interface DeserializeMetaData {
    deserialize: boolean,
    type?: any,
    arrayType?: any
}

function log(message?: any, ...optionalParams: any[]): void {
    if (deserializeLog)
        console.log(message, ...optionalParams);
}

function warn(message?: any, ...optionalParams: any[]): void {
    if (deserializeLog)
        console.warn(message, ...optionalParams);
}

function deserialize(meta: DeserializeMetaData = { deserialize: true, type: undefined, arrayType: undefined }) {
    return (target: Object, targetKey: string | symbol) => {
        let propertyType = Reflect.getMetadata("design:type", target, targetKey);
        if (!meta.type) meta.type = propertyType;
        Reflect.metadata(deserializeKey, meta)(target, targetKey);
    }
}

function getDeserializeMetaData(target: Object, targetKey: string | symbol) {
    return (Reflect.getMetadata(deserializeKey, target, targetKey) || {}) as DeserializeMetaData;
}

let deserialisation = function (json: any) {
    if (!json) return;

    for (let key of Object.getOwnPropertyNames(json)) {
        log("==> New property: " + key);

        let metaData = getDeserializeMetaData(this, key);
        if (!metaData.deserialize) continue;
        log("-> valid deserializeKey");

        let propertyType = metaData.type;
        let arrayType = metaData.arrayType;
        log("-> propertyType: " + propertyType);

        let getValue = (propertyType: any, jsonValue: any, metaData: DeserializeMetaData): any => {
            if (propertyType === String || propertyType === Number || propertyType === Boolean) {
                log("-> compare simple: " + typeof propertyType() + "<->" + typeof jsonValue);
                if (typeof propertyType() === typeof jsonValue)
                    return jsonValue;
            } else if (new propertyType()._deserialize) {
                log("-> _deserialize found");
                return new propertyType()._deserialize(jsonValue);
            } else if (propertyType === Array) {
                if (!arrayType) {
                    warn("-> array needs type provided");
                    return undefined;
                }

                log("-> array found, type provided: ", metaData.type);
                log("-> jsonValue, %o", jsonValue);
                return jsonValue.map((x: any) => getValue(arrayType, x, { deserialize: true }));
            } else if (propertyType === Object) {
                warn("-> json property cannot deserialized: %o", Object.getOwnPropertyNames(jsonValue));
            } else {
                warn("-> unknown property");
            }

            return undefined;
        }

        this[key] = getValue(propertyType, json[key], metaData);
    }

    return this;
}

function deserializeAbel(target: any): any {
    log("deserializeAbel. %o", target);
    target.prototype._deserialize = deserialisation;
    return target;

    // // save a reference to the original constructor
    // var original = target;

    // // a utility function to generate instances of a class
    // function construct(constructor: any, args: any) {
    //     // var newConst: any = function () { return constructor.apply(this, args); }

    //     // newConst.prototype = constructor.prototype;
    //     // newConst.prototype._deserialize = deserialisation;

    //     // return new newConst();

    //     constructor.prototype._deserialize = deserialisation;
    //     return  new constructor();
    // }

    // // the new constructor behaviour
    // var f: any = function (...args: any[]) {
    //     return construct(original, args);
    // }

    // f.prototype = original.prototype;

    // return f;
}

export { deserializeAbel, deserialize, Deserialisation };