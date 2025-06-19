import React from "react";
import "./App.css";
import {
  Button,
  DevsSplitContainer,
  LayerPopup,
  MesButton,
  useMessage,
} from "./lib/index";
import uuid from "react-uuid";
import { IDataSource, IDataTableColumn } from "./lib/devs-datatable/_types";
import DevsDataTable from "./lib/devs-datatable";
import { DatePicker } from "antd";
import DevsDatePicker from "./lib/devs-date-picker";
import DevSplitContainer from "./lib/devs-split-container";
import dayjs from "dayjs";

const cols = [
  {
    field: "prdCode",
    title: "제품 코드",
    merge: true,
    width: 150,
    sticky: true,
  },
  {
    field: "prdName",
    title: "제품명",
    merge: true,
    width: 200,
    sticky: true,
  },
  {
    field: "prodType",
    title: "생산 구분",
    merge: true,
    width: 100,
    sticky: true,
    sortable: false,
    resizing: false,
    align: "center",
  },
  {
    field: "dayNightType",
    title: "주야 구분",
    width: 100,
    sticky: true,
    sortable: false,
    resizing: false,
    align: "center",
  },
];

const App = () => {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [jsonData, setJsonData] = React.useState([]);
  const [dataColumns, setDataColumns] = React.useState([]);
  const { showMessage } = useMessage();
  const getJsonData = () => {
    fetch("http://localhost:3095/quality.chart/month.production.error")
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    getJsonData();
  }, []);

  React.useEffect(() => {
    const lastDate = selectedDate.daysInMonth();

    const dates = Array.from({ length: lastDate }, (_, i) => {
      const date = i + 1;

      return {
        field: `day-${date}-err`,
        title: `${date}일`,
        align: "right",
        width: 70,
        sortable: false,
        resizing: false,
        children: [
          {
            field: `day-${date}-err-count`,
            title: `불량 수량`,
            align: "right",
            width: 70,
            sortable: false,
            resizing: false,
          },
          {
            field: `day-${date}-err-ppm`,
            title: `ppm`,
            align: "right",
            width: 70,
            sortable: false,
            resizing: false,
          },
        ],
      };
    });
  }, [selectedDate]);

  const onButtonClick = () => {
    showMessage({
      type: "success",
      title: "a",
      message: "d",
      input: true,
      inputOption: {
        type: "number",
        placeholder: "입력",
      },
      onOkClick: (e) => console.log(e),
    });
  };
  return <Button onClick={onButtonClick}>123</Button>;
};

export default App;
