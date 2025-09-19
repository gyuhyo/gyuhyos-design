import React from "react";
import { GyudDtContainer } from "./components";
import { GyudDtProvider } from "./context";
import { GyudDataTableRef, IDataTableProps } from "./types";

const GyudDataTable = React.forwardRef<GyudDataTableRef, IDataTableProps>(
  (props, ref) => {
    React.useImperativeHandle(ref, () => ({
      tbody: null,
      thead: null,
    }));

    return (
      <GyudDtProvider dataSource={props.data} columns={props.columns}>
        <GyudDtContainer />
      </GyudDtProvider>
    );
  }
);

export default GyudDataTable;
