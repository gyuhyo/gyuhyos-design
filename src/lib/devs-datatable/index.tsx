import React from "react";
import { IDataSource, IDataTableProps, IFormsRef } from "./_types";
import { DevsDtProvider } from "./context/devs-dt-context";
import "./dev.datatable.style.css";
import DevsDtTBody from "./devs-dt-tbody";
import DevsDtTHead from "./devs-dt-thead";
import { useInitDt } from "./hooks/useInitDt";
import DevsDtButtons from "./devs-dt-component/buttons";

// 1. DevsDataTable Ref 타입 정의
interface DevsDataTableRef {
  api: {
    onValidationCheck: () => Promise<{ valid: boolean; data?: any }>;
  };
}

// DevsDataTable 컴포넌트 타입 설정 및 구현
const DevsDataTable = React.forwardRef<DevsDataTableRef, IDataTableProps>(
  (props, ref) => {
    const [isMerged, setIsMerged] = React.useState(false);
    const [headerWidth, setHeaderWidth] = React.useState<number>(0);

    const [focusedCell, setFocusedCell] = React.useState<null | string>(null);
    const [focusedRow, setFocusedRow] = React.useState<null | IDataSource>(
      null
    );
    const formsRef = React.useRef<IFormsRef>({});
    const thead = React.useRef<HTMLDivElement>(null);
    const tbody = React.useRef<HTMLDivElement>(null);
    const [, DtForceUpdate] = React.useState(false);
    const init = useInitDt({
      tbody: tbody,
      thead: thead,
      isMerged,
    });

    React.useEffect(() => {
      if (!thead.current) return;

      const allCheck = thead.current.querySelector(
        "input[name='allCheck']"
      ) as HTMLInputElement;

      if (!allCheck) return;

      const { dataSource: data } = props;

      const checked = data.filter((d) => d.checked);
      const unChecked = data.filter((d) => !d.checked);

      if (checked.length > 0 && unChecked.length > 0) {
        allCheck.indeterminate = true;
      } else {
        allCheck.indeterminate = false;
      }

      if (checked.length > 0 && unChecked.length === 0) {
        allCheck.checked = true;
      }

      if (checked.length === 0 && unChecked.length > 0) {
        allCheck.checked = false;
      }
    }, [props.dataSource]);

    React.useImperativeHandle(
      ref,
      () => ({
        api: {
          onValidationCheck: async () => {
            const forms = Object.values(formsRef.current);
            await Promise.all(
              forms.map(async (form) => {
                return new Promise((resolve) => resolve(form.clearErrors()));
              })
            );

            const validations: { valid: boolean; data: any }[] =
              await Promise.all(
                forms
                  .filter((f) => f.getValues("checked"))
                  .map(async (form) => {
                    return new Promise((resolve) =>
                      form.handleSubmit(
                        (data) => resolve({ valid: true, data }),
                        (error) => resolve({ valid: false, data: error })
                      )()
                    );
                  })
              );

            const allValid = validations.every((result) => result.valid);

            if (allValid) {
              const allData = validations.map((result) => result.data);
              return { valid: true, data: allData };
            } else {
              const allData = validations
                .filter((f) => !f.valid)
                .map((result) => result.data);
              return { valid: false, data: allData };
            }
          },
          getFocusedRow: focusedRow,
          getCheckedRows: props.dataSource.filter((f) => f.checked === true),
        },
      }),
      [props.dataSource, props.options, focusedRow]
    );

    if (!init) return <>loading...</>;

    return (
      <DevsDtProvider
        columns={props.columns}
        setColumns={props.setColumns}
        dataSource={props.dataSource}
        setDataSource={props.setDataSource}
        options={props.options}
        formsRef={formsRef}
        focusedRow={focusedRow}
        setFocusedRow={setFocusedRow}
        focusedCell={focusedCell}
        setFocusedCell={setFocusedCell}
      >
        {props.loading !== undefined && props.loading === true && (
          <div className="loader-backdrop">
            <div className="loader-container">
              <span className="spinner"></span>
              <span>데이터 불러오는 중...</span>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 7,
            flexWrap: "wrap",
            gap: "7px",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: "bold" }}>
            {props.title !== undefined && props.title !== "" && (
              <>&#x27a4; {props.title}</>
            )}
            <span
              style={{
                fontSize: 12,
                color: "#7a7a7a",
                marginLeft:
                  props.title !== undefined && props.title !== ""
                    ? "7px"
                    : "0px",
              }}
            >
              (*) 입력 가능 (<span style={{ color: "red" }}>*</span>) 필수입력
            </span>
          </p>
          <DevsDtButtons buttons={props.buttons} options={props.options} />
        </div>
        <div className="dev-table-wrapper">
          <DevsDtTHead thead={thead} setHeaderWidth={setHeaderWidth} />
          <DevsDtTBody tbody={tbody} headerWidth={headerWidth} />
        </div>
      </DevsDtProvider>
    );
  }
);

export default React.memo(DevsDataTable);
