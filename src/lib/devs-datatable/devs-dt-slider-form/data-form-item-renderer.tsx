import React from "react";
import { IDataSource, IDataTableColumn } from "../_types";
import DataRender from "./data-render";
import TextInput from "./text-input";
import NumberInput from "./number-input";
import DateInput from "./date-input";
import DateTimeInput from "./date-time-input";
import SelectInput from "./select-input";
import TextAreaInput from "./text-area-input";
import DataEditor from "./data-editor";
import { FieldErrors } from "react-hook-form";

interface DataFormItemRendererProps {
  focusedRow: IDataSource;
  node: IDataTableColumn;
}

const DataFormItemRenderer: React.FC<DataFormItemRendererProps> = React.memo(
  ({ focusedRow, node }) => {
    const isNotUpdate =
      (focusedRow?.mode === "r" || focusedRow?.mode === "u") &&
      node.updatable === false;
    const isNotInsert =
      (focusedRow?.mode === "r" || focusedRow?.mode === "c") &&
      node.editable === false;

    const isNotEditing = isNotUpdate || isNotInsert;
    const isRender = node.render !== undefined;

    if (isNotEditing) {
      return isRender ? <DataRender col={node} /> : focusedRow![node.field];
    }

    if (node.editor !== undefined) return <DataEditor col={node} />;
    if (node.type === undefined) return <TextInput col={node} />;
    if (node.type === "number") return <NumberInput col={node} />;
    if (node.type === "date") return <DateInput col={node} />;
    if (node.type === "datetime") return <DateTimeInput col={node} />;
    if (node.type === "select") return <SelectInput col={node} />;
    if (node.type === "textarea") return <TextAreaInput col={node} />;
  }
);

export default DataFormItemRenderer;
