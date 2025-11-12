import React from "react";
import { GyudDtContainer } from "./components";
import { GyudDtProvider } from "./context";
import { GyudDataTableRef, IDataTableProps } from "./types";
import { IDtStore } from "./store";
import "./style.css";

const GyudDataTable = React.forwardRef<GyudDataTableRef, IDataTableProps>(
  (props, ref) => {
    const tableRef = React.useRef<HTMLDivElement & { store: IDtStore }>(null);

    React.useImperativeHandle<any, GyudDataTableRef>(ref, () => ({
      tbody: null,
      thead: null,
      table: tableRef.current,
      store: tableRef.current?.store as IDtStore,
    }));

    return (
      <GyudDtProvider
        dataSource={props.data}
        columns={props.columns}
        options={props.options || {}}
      >
        <GyudDtContainer ref={tableRef} />
      </GyudDtProvider>
    );
  }
);

export default GyudDataTable;
