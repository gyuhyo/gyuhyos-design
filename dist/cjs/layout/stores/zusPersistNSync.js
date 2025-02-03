"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zusPersistNSync = void 0;
var persist_and_sync_1 = require("persist-and-sync");
var middleware_1 = require("zustand/middleware");
var zusPersistNSync = function (child, _a) {
    var name = _a.name, storage = _a.storage, include = _a.include, version = _a.version;
    return (0, persist_and_sync_1.persistNSync)((0, middleware_1.persist)(child, {
        name: name,
        partialize: function (state) {
            return Object.fromEntries(include.map(function (s) { return [s, state[s]]; }));
        },
        storage: (0, middleware_1.createJSONStorage)(function () { return storage !== null && storage !== void 0 ? storage : "localStorage"; }),
        version: version,
        skipHydration: false,
    }), {
        name: name,
        storage: storage,
        include: include,
        initDelay: 0,
        version: version,
    });
};
exports.zusPersistNSync = zusPersistNSync;
