import React from "react";

const DynamicLoadComponent = (_component: React.FunctionComponent) =>
  React.lazy(() =>
    Promise.resolve({ default: _component })
  ) as React.FunctionComponent;

export default DynamicLoadComponent;
