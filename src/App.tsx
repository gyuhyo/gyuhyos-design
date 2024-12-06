import React from "react";
import "./App.css";
import { Button, useMessage } from "./lib/index";
import uuid from "react-uuid";
import { IDataSource, IDataTableColumn } from "./lib/devs-datatable/_types";
import DevsDataTable from "./lib/devs-datatable";
import { DatePicker } from "antd";

const dummyData = [
  {
    "1": "Group 1",
    "2": "Option A123123123123123",
    "3": "2024-11-01",
    "4": "Batch A",
    "5": "Category X",
    "6": "2024-12-01",
    "112": 1,
  },
  {
    "1": "Group 1",
    "2": "Option A",
    "3": "2024-11-01",
    "4": "Batch A",
    "5": "Category Y",
    "6": "2024-12-02",
    "112": 3,
  },
  {
    "1": "Group 1",
    "2": "Option B\naaaaaaa\naaaaaaaaaaaaaaaaaa\naaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaa\naaaaaaa",
    "3": "2024-11-02",
    "4": "Batch A",
    "5": "Category Z",
    "6": "2024-12-03",
    "112": 2,
  },
  {
    "1": "Group 2",
    "2": "Option A",
    "3": "2024-11-03",
    "4": "Batch B",
    "5": "Category X",
    "6": "2024-12-04",
  },
  {
    "1": "Group 2",
    "2": "Option A",
    "3": "2024-11-03",
    "4": "Batch B",
    "5": "Category Y",
    "6": "2024-12-05",
  },
  {
    "1": "Group 2",
    "2": "Option B",
    "3": "2024-11-04",
    "4": "Batch B",
    "5": "Category Z",
    "6": "2024-12-06",
  },
  {
    "1": "Group 3",
    "2": "Option C",

    "4": "Batch C",
    "5": "Category X",
    "6": "2024-12-07",
  },
  {
    "1": "Group 3",
    "2": "Option C",

    "4": "Batch C",
    "5": "Category Y",
    "6": "2024-12-08",
  },
  {
    "1": "Group 3",
    "2": "Option C",

    "4": "Batch C",
    "5": "Category Z",
    "6": "2024-12-09",
  },
];

function generateDummyData() {
  const options = ["0", "1", "2"];
  const data: { "1": any; "2": any; "3": any; "4": any; "5": any; "6": any }[] =
    [];

  for (let i = 1; i <= 30; i++) {
    data.push({
      "1": i % 3 === 0 ? `Group ${Math.ceil(i / 3)}` : `Item ${i}`,
      "2": options[i % options.length],
      "3": i % 2 === 0 ? `2024-11-${(i % 30) + 1}` : `2024-10-${(i % 30) + 1}`,
      "4": i % 5 === 0 ? `Batch ${Math.ceil(i / 5)}` : `Detail ${i}`,
      "5": options[(i + 1) % options.length],
      "6": i % 2 === 1 ? `2024-12-${(i % 30) + 1}` : `2024-09-${(i % 30) + 1}`,
    });
  }

  return data;
}

function App() {
  const { showMessage } = useMessage();
  const tb = React.useRef<any>(null);
  const tb2 = React.useRef<any>(null);
  const [dataSource, setDataSource] = React.useState<IDataSource[]>(dummyData);
  const [columns, setColumns] = React.useState<IDataTableColumn[]>([
    {
      key: true,
      field: "1",
      title: "1",
      width: 200,
      required: true,
      resizing: false,
      merge: true,
      updatable: false,
    },
    {
      key: true,
      field: "112",
      title: "1",
      width: 200,
      type: "number",
      isNotNullSort: true,
    },
    {
      field: "4",
      title: "4",
      width: 200,
      merge: true,
    },
    {
      field: "5",
      title: "5",
      type: "select",
      options: [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
    },
    {
      field: "mergedheader",
      title: "merge",
      style: () => ({
        borderRight: "2px solid #000",
        color: "red",
      }),
      children: [
        {
          field: "11",
          title: "1",
          type: "select",
          options: [
            { value: "0", label: "0" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ],
        },
        {
          field: "2",
          title: "2",
          type: "select",
          options: [
            { value: "0", label: "0" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ],
        },
        {
          field: "3",
          title: "3",
          width: 150,
          type: "date",
          required: true,
          style: () => ({
            borderRight: "2px solid #000",
            color: "red",
          }),
        },
      ],
    },
    {
      field: "6",
      title: "6",
      children: [
        {
          field: "111",
          title: "1",
          type: "select",
          options: [
            { value: "0", label: "0" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ],
        },
        {
          field: "22",
          title: "2",
          type: "select",
          options: [
            { value: "0", label: "0" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ],
        },
        {
          field: "33",
          title: "3",
          width: 150,
          type: "date",
          required: true,
        },
      ],
    },
  ]);

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  const handleAddClick = () => {
    setDataSource((prev) => {
      return [{ checked: true, mode: "c" }, ...prev];
    });
  };

  const handleSaveClick = async () => {
    if (!tb.current) return;

    const { valid, data } = await tb.current.api.onValidationCheck();
    console.log(valid);

    if (!valid) {
      showMessage({
        title: "필수 입력값 누락",
        type: "error",
        message: "필수 입력값이 누락되었습니다.",
        isCancelButtonVisible: false,
        onOkClick: (e: any) => {},
      });
      return;
    }

    showMessage({
      title: "저장 완료",
      type: "success",
      message: "저장되었습니다.",
      isCancelButtonVisible: false,
      onOkClick: (e: any) => {
        dummyData[0]["1"] = "123123";
        setDataSource(dummyData);
      },
    });
    console.log(data);
  };

  const handleDeleteClick = async () => {
    if (!tb.current) return;

    const checkedRows = tb.current.api.getCheckedRows;

    setDataSource((prev) => prev.filter((f) => !checkedRows.includes(f)));
  };

  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        padding: "12px 7px 20px 7px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/*<DevsDataTable
        ref={tb2}
        title="생산 계획 등록"
        columns={columns}
        setColumns={setColumns}
        dataSource={dataSource}
        setDataSource={setDataSource}
        options={{
          showRowNumber: true,
          enabledRowOrder: true,
          rowOrderEnd: (data) => {
            console.log(data);
          },
        }}
        buttons={{
          isVisible: true,
          export: {
            visible: true,
            excel: true,
            print: true,
          },
          onSaveClick: handleSaveClick,
          onAddClick: handleAddClick,
          onDeleteClick: handleDeleteClick,
        }}
      />*/}
      <DevsDataTable
        ref={tb}
        title="생산 계획 등록"
        columns={columns}
        setColumns={setColumns}
        dataSource={dataSource}
        setDataSource={setDataSource}
        focusedRowChanged={(row) => {
          console.log(row);
        }}
        options={{
          readonly: false,
          showRowNumber: true,
          enabledRowOrder: true,
          enabledRowCheck: true,
          multipleRowCheck: false,
          multipleEdit: true,
          rowOrderEnd: (data) => {
            console.log(data);
          },
        }}
        buttons={{
          isVisible: true,
          export: {
            visible: true,
            excel: true,
            print: true,
          },
          onSearchClick: () => tb.current.api.focusedRowIndex(2),
          onSaveClick: handleSaveClick,
          onAddClick: handleAddClick,
          onDeleteClick: handleDeleteClick,
        }}
      />
    </div>
  );
}

export default App;
