import React from "react";
var DynamicLoadComponent = function (_component) {
    return React.lazy(function () {
        return Promise.resolve({ default: _component });
    });
};
export default DynamicLoadComponent;
