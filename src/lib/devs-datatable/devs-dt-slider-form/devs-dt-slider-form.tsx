import styled from "@emotion/styled";
import React from "react";
import { FieldErrors, UseFormGetValues } from "react-hook-form";
import Button from "../../button";
import { IDataSource, IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import DataFormItemRenderer from "./data-form-item-renderer";
import { DataFormErrorProvider } from "./data-form-error-context";
import { useMediaQuery } from "usehooks-ts";

export const getDefaultValue = ({
  val,
  col,
  row,
  rowIndex,
  getValue,
}: {
  val: any;
  col: IDataTableColumn;
  row: IDataSource;
  rowIndex: number;
  getValue: UseFormGetValues<IDataSource>;
}) => {
  if (col?.defaultValue === undefined) return val;

  return col.defaultValue({
    row,
    value: val,
    index: rowIndex,
    getValue,
  });
};

const DataFormComponent: React.FC<any> = React.memo(
  ({ children, panelWidth }) => {
    const { focusedRow, columns, sliderFormOpen, focusedRowForm } = useDt();

    const getLastNodes = (columns: IDataTableColumn[]): IDataTableColumn[] => {
      let lastNodes: IDataTableColumn[] = [];

      const findLastNodes = (column: IDataTableColumn) => {
        if (column.children && column.children.length > 0) {
          column.children.forEach(findLastNodes);
        } else {
          lastNodes.push(column);
        }
      };

      columns.forEach(findLastNodes);
      return lastNodes;
    };

    const lastNode = React.useMemo(() => getLastNodes(columns), [columns]);

    if (lastNode.length === 0 || !sliderFormOpen || !focusedRowForm)
      return <DataForm />;

    return (
      <DataForm>
        <table style={{ width: "100%" }}>
          <tbody>
            {lastNode.map((node) => {
              const maxWidth = panelWidth / 3;

              return (
                <tr key={node.field}>
                  <th
                    data-field={node.field}
                    style={{
                      minWidth: "75px",
                      width: "auto",
                      maxWidth: `${maxWidth}px`,
                      textAlign: "left",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {node.title}
                  </th>
                  <td
                    style={{
                      height: "32px",
                      lineHeight: "32px",
                    }}
                  >
                    <DataFormItemRenderer
                      focusedRow={focusedRow!}
                      node={node}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {children}
      </DataForm>
    );
  }
);

const FormPanelResizer: React.FC<any> = ({ width, setWidth }) => {
  const startX = React.useRef(0);
  // 마우스 이동 핸들러
  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      const deltaX = startX.current - e.clientX;
      const newWidth = Math.max(width + deltaX, 300); // 최소 너비 50px
      const screenWidth = document.body.clientWidth;

      if (screenWidth / 2 < newWidth) return;
      // columns 배열을 자식 컬럼까지 고려하여 업데이트
      setWidth(newWidth);
    },
    [width]
  );

  // 마우스 업 핸들러
  const handleMouseUp = React.useCallback(
    (e: MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setTimeout(() => {}, 100);
    },
    [handleMouseMove]
  );

  // 마우스 다운 핸들러
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      startX.current = e.clientX;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  return <Resizer onMouseDown={handleMouseDown} />;
};

const Resizer = styled.div({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "5px",
  "&:hover": {
    cursor: "e-resize",
  },
});

const DevsDtSliderForm: React.FC<any> = () => {
  const matches = useMediaQuery("(max-width: 600px)");
  const beforeEditValues = React.useRef<null | IDataSource>(null);
  const [panelWidth, setPanelWidth] = React.useState(300);
  const {
    focusedRow,
    sliderFormOpen,
    setSliderFormOpen,
    focusedRowForm,
    setDataSource,
  } = useDt();
  const [errors, setErrors] = React.useState<null | FieldErrors<IDataSource>>(
    null
  );

  React.useEffect(() => {
    if (!focusedRowForm) return;

    beforeEditValues.current = focusedRowForm.getValues();
  }, [focusedRowForm]);

  const onCloseSliderFormPanel = async () => {
    setDataSource((prev) =>
      prev.map((p) =>
        p.rowId === focusedRow!.rowId
          ? Object.assign(p, beforeEditValues.current)
          : p
      )
    );

    focusedRowForm?.reset(undefined, {
      keepErrors: true,
    });

    setSliderFormOpen(false);
  };

  const onValidationCheck = async () => {
    if (focusedRowForm === null) return;

    focusedRowForm.handleSubmit(
      () => {
        setErrors(null);
        setSliderFormOpen(false);
        setDataSource((prev) =>
          prev.map((p) => {
            return p.rowId === focusedRow!.rowId
              ? { ...p, mode: p.mode === "c" ? "c" : "u", checked: true }
              : { ...p };
          })
        );
      },
      (err) => {
        setErrors(err);
      }
    )();
    //await focusedRowForm.trigger();
  };

  return (
    <FormPanel
      sliderFormOpen={sliderFormOpen}
      width={panelWidth}
      matches={matches}
    >
      <FormTitle>
        <p>데이터 수정</p>
        <CloseFormPanelButton onClick={onCloseSliderFormPanel}>
          &#x2715;
        </CloseFormPanelButton>
      </FormTitle>
      <DataFormErrorProvider errors={errors}>
        <DataFormComponent panelWidth={panelWidth} />
      </DataFormErrorProvider>
      <ButtonContainer>
        <Button
          bgColor="#22cb5f"
          border={true}
          borderColor="#03cf00"
          color="#ffffff"
          style={{
            padding: "12px",
            width: "100%",
            flex: "1 1 0%",
          }}
          onClick={onValidationCheck}
        >
          확인
        </Button>
        <Button
          bgColor="#df4873"
          border={true}
          borderColor="#f15151"
          color="#ffffff"
          style={{
            width: "100%",
            flex: "1 1 0%",
          }}
          onClick={onCloseSliderFormPanel}
        >
          취소
        </Button>
      </ButtonContainer>
      <FormPanelResizer width={panelWidth} setWidth={setPanelWidth} />
    </FormPanel>
  );
};

export default React.memo(DevsDtSliderForm);

interface FormPanelComponentProps {
  width: number;
  sliderFormOpen: boolean;
  matches: boolean;
}

const FormPanel = styled.div<FormPanelComponentProps>((props) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  top: 0,
  right: props.sliderFormOpen
    ? 0
    : `-${props.matches ? 1000 : props.width + 17}px`,
  width: props.matches ? "100%" : `${props.width}px`,
  transition: "right 200ms ease-in-out",
  transitionDelay: "150ms",
  height: "100%",
  zIndex: 3,
  boxShadow: "-5px 0px 12px #00000040",
  borderLeft: "1px solid #bbb",
  overflow: "hidden",
}));

const FormTitle = styled.div({
  flex: "none",
  padding: "5px 7px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  borderBottom: "1px solid #bbb",
  background:
    "linear-gradient(rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
});

const CloseFormPanelButton = styled.p({
  cursor: "pointer",
  "&:hover": {
    color: "#f150a8",
  },
});

const DataForm = styled.div({
  flex: "1 1 0%",
  position: "relative",
  padding: "5px 7px",
  overflow: "hidden",
  overflowY: "auto",
  background: "#fff",
});

const ButtonContainer = styled.div({
  flex: "none",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  columnGap: "7px",
  padding: "5px 7px",
  borderTop: "1px solid #bbb",
  background:
    "linear-gradient(rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
});
