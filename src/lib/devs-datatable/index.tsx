/** @jsxImportSource @emotion/react */

import React from "react";
import {
  DevsDataTableRef,
  IDataSource,
  IDataTableProps,
  IFormsRef,
} from "./_types";
import { DevsDtProvider } from "./context/devs-dt-context";
import "./dev.datatable.style.css";
import DevsDtButtons from "./devs-dt-component/buttons";
import DevsDtTBody from "./devs-dt-tbody";
import DevsDtTHead from "./devs-dt-thead";
import { useInitDt } from "./hooks/useInitDt";
import { css } from "@emotion/react";
import useDtUtils from "./hooks/useDtUtils";
import DevsDtHeader from "./devs-dt-header";
import DevsDtSliderForm from "./devs-dt-slider-form/devs-dt-slider-form";

// DevsDataTable 컴포넌트 타입 설정 및 구현
const DevsDataTable: React.FC<IDataTableProps> = (props) => {
  if (
    props.options?.showEditModeSelector &&
    props.options?.editType === "cell"
  ) {
    throw new Error(
      "showEditModeSelector and editType cannot be used together."
    );
  }
  const [headerWidth, setHeaderWidth] = React.useState<number>(0);
  const [innerLoading, setInnerLoading] = React.useState<boolean>(false);
  const [focusedCell, setFocusedCell] = React.useState<null | string>(null);
  const [focusedRow, setFocusedRow] = React.useState<null | IDataSource>(null);
  const formsRef = React.useRef<IFormsRef>({});
  const table = React.useRef<HTMLDivElement>(null);
  const thead = React.useRef<HTMLDivElement>(null);
  const tbody = React.useRef<HTMLDivElement>(null);
  const [, DtForceUpdate] = React.useState(false);
  const init = useInitDt({
    table: table,
    tbody: tbody,
    thead: thead,
    columns: props.columns,
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

  const getCheckedRows = async () => {
    await Promise.all(
      Object.values(formsRef.current).map((form) => form.trigger("checked"))
    );

    return Object.values(formsRef.current)
      .filter((form) => form.getValues("checked"))
      .map((form) => form.getValues());
  };

  React.useImperativeHandle(
    props.ref,
    (): DevsDataTableRef => ({
      api: {
        validate: async () => {
          const forms = Object.values(formsRef.current);

          // 모든 에러 초기화
          forms.forEach((form) => form.clearErrors());

          // 유효성 검사 수행
          const validations: { valid: boolean; data: any }[] =
            await Promise.all(
              forms
                .filter((form) => form.getValues("checked"))
                .map(async (form) => {
                  return new Promise((resolve) => {
                    form.handleSubmit(
                      (data) => resolve({ valid: true, data }),
                      (error) => resolve({ valid: false, data: error })
                    )();
                  });
                })
            );

          // 검증 결과 확인
          const allValid = validations.every((result) => result.valid);

          if (allValid) {
            const allData = validations.map((result) => result.data);
            const allDataBlankToNull = allData.map((data) =>
              Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                  key,
                  value === "" ? undefined : value ?? undefined,
                ])
              )
            );
            return { valid: true, data: allDataBlankToNull };
          } else {
            const allData = validations
              .filter((result) => !result.valid)
              .map((result) => result.data);
            return { valid: false, data: allData };
          }
        },
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
            const allDataBlankToNull = allData.map((data) =>
              Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                  key,
                  value === "" ? undefined : value ?? undefined,
                ])
              )
            );
            return { valid: true, data: allDataBlankToNull };
          } else {
            const allData = validations
              .filter((f) => !f.valid)
              .map((result) => result.data);
            return { valid: false, data: allData };
          }
        },
        getFocusedRow: focusedRow,
        getFocusedRowIndex:
          focusedRow === null ? null : props.dataSource.indexOf(focusedRow),
        getFocusedCell: { row: focusedRow, field: focusedCell },
        getCheckedRows: Object.values(formsRef.current)
          .filter((f) => f.getValues("checked"))
          .map((x) => x.getValues()),
        getCheckedRowsData: async () => await getCheckedRows(),
        focusedRowIndex: (index: number) => {
          if (props.dataSource.length > index) {
            setFocusedRow(props.dataSource[index]);
          }
        },
        focusedRow: (row: IDataSource) => setFocusedRow(row),
        addRow: (defaultValues?: IDataSource) =>
          props.setDataSource((prev) => [
            { checked: true, mode: "c", ...defaultValues },
            ...prev,
          ]),

        setValue: ({ rowId, field, value }) => {
          const form = formsRef.current[rowId];

          if (form) {
            form.setValue(field, value);
            form.trigger();
          }
        },
      },
    }),
    [props.dataSource, props.options, focusedRow, focusedCell]
  );

  React.useEffect(() => {
    if (focusedRow !== null && props.focusedRowChanged !== undefined) {
      props.focusedRowChanged(focusedRow);
    }
  }, [focusedRow]);

  React.useEffect(() => {
    if (
      focusedRow !== null &&
      focusedCell !== null &&
      props.focusedCellChanged !== undefined
    ) {
      props.focusedCellChanged({ row: focusedRow, field: focusedCell });
    }
  }, [focusedCell, focusedRow]);

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
      tbody={tbody}
    >
      {(props.loading === true || innerLoading === true) && (
        <div className="loader-backdrop">
          <div className="loader-container">
            <span className="spinner"></span>
            <span style={{ fontWeight: "bold" }}>데이터 불러오는 중...</span>
          </div>
        </div>
      )}
      <DevsDtHeader
        title={props.title}
        buttons={props.buttons}
        options={props.options}
        setInnerLoading={setInnerLoading}
      />
      <div
        ref={table}
        className="dev-table-wrapper"
        css={css({ minWidth: props.options?.minWidth ?? 0 })}
      >
        <DevsDtTHead thead={thead} setHeaderWidth={setHeaderWidth} />
        <DevsDtTBody tbody={tbody} headerWidth={headerWidth} />
        {(props.options?.editMode === "slider" ||
          props.options?.showEditModeSelector) && <DevsDtSliderForm />}
      </div>
    </DevsDtProvider>
  );
};

export default React.memo(DevsDataTable);
