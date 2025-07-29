import { persistNSync } from "persist-and-sync";
import { persist, createJSONStorage } from "zustand/middleware";
export var zusPersistNSync = function (child, _a) {
    var name = _a.name, storage = _a.storage, include = _a.include, version = _a.version;
    return persistNSync(persist(child, {
        name: name,
        partialize: function (state) {
            return Object.fromEntries(include.map(function (s) { return [s, state[s]]; }));
        },
        storage: createJSONStorage(function () { return storage !== null && storage !== void 0 ? storage : "localStorage"; }),
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
