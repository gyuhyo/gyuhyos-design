import dayjs from "dayjs";
import { DevsDataTable, DevsDatePicker, messages, useMessage } from "./lib";
import React from "react";
import { Button } from "./lib";
import { IDataTableColumn } from "./lib";
import { useDevsXlsx } from "./lib/hooks";

const NumberFormatter = (number) => {
  const parse = parseInt(number);
  return isNaN(parse) ? null : parse.toLocaleString();
};

const IsNum = (number) => {
  return (
    number !== undefined && number !== null && number !== 0 && !isNaN(number)
  );
};

const generateFoundryProductionColumns = [
  {
    field: "prdCode",
    title: "제품 코드",
    sticky: true,
    updatable: false,
    width: 150,
    align: "center",
    message: "가나다라",
  },
  {
    field: "prdName",
    title: "제품명",
    sticky: true,
    updatable: false,
    width: 150,
  },
  {
    field: "totalProductionPlanCount",
    title: "계획량",
    sticky: true,
    updatable: false,
    align: "right",
    type: "number",
    render: ({ value }) => (IsNum(value) ? value?.toLocaleString() : "-"),
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          background: "#E0F2FE",
        };
      }
    },
  },
  {
    field: "remainingCount",
    title: "잔량",
    sticky: true,
    updatable: false,
    align: "right",
    type: "number",
    render: ({ value }) => (IsNum(value) ? value?.toLocaleString() : "-"),
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          background: "#E0F2FE",
        };
      }
    },
  },
  {
    field: "profRate",
    title: "계획대비",
    sticky: true,
    updatable: false,
    align: "center",
    width: 75,
    render: ({ value }) => (IsNum(value) ? `${value}%` : "-"),
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          background: "#E0F2FE",
        };
      }
    },
  },
  {
    field: "totalCount",
    title: "총 생산",
    sticky: true,
    updatable: false,
    align: "right",
    type: "number",
    message: "가나다라",
    render: ({ value }) => (IsNum(value) ? value?.toLocaleString() : "-"),
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          color: "#1D4ED8",
          background: "#BBF7D0",
        };
      }
    },
  },
  {
    field: "totalOkCount",
    title: "총 양품",
    sticky: true,
    updatable: false,
    align: "right",
    type: "number",
    render: ({ row }) => {
      const totalOkCount = row.totalCount - row.totalNgCount;
      return IsNum(totalOkCount) ? totalOkCount?.toLocaleString() : "-";
    },
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          color: "#1D4ED8",
          background: "#BBF7D0",
        };
      }
    },
  },
  {
    field: "totalNgCount",
    title: "총 불량",
    sticky: true,
    updatable: false,
    align: "right",
    type: "number",
    width: 75,
    render: ({ value }) => (IsNum(value) ? value?.toLocaleString() : "-"),
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          background: "#FEE2E2",
          color: "#FF0000",
        };
      }
    },
  },
  {
    field: "foundryProductionErrorPPMRate",
    title: "불량율\n(PPM)",
    sticky: true,
    updatable: false,
    align: "right",
    type: "number",
    render: ({ row }) => {
      const ppm = (row.totalNgCount / row.totalCount) * 100 * 10000;
      return IsNum(ppm) ? parseInt(ppm.toString())?.toLocaleString() : "-";
    },
    style: ({ target }) => {
      if (target === "tbody") {
        return {
          background: "#FEE2E2",
          color: "#FF0000",
        };
      }
    },
  },
];

const App = () => {
  const { sheets, utils, xlsx, onSave } = useDevsXlsx({
    fileName: "test",
    sheets: ["test1", "test2"],
  });
  const gridRef = React.useRef(null);
  const { showMessage } = useMessage();
  const [selectedMonth, setSelectedMonth] = React.useState(dayjs());
  const [dataSource, setDataSource] = React.useState([]);
  const [columns, setColumns] = React.useState<IDataTableColumn[]>([]);
  const [isHideFixColumn, setIsHideFixColumn] = React.useState(false);

  const getDataList = () => {
    fetch(
      `http://sqw.iptime.org:3095/production/foundry/${selectedMonth.format(
        "YYYY-MM"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch(() => {
        showMessage({
          type: "error",
          title: messages.search.error.title,
          message: messages.search.error.body,
          isCancelButtonVisible: false,
        });
      });
  };

  const getColumn = () => {
    return [
      ...generateFoundryProductionColumns.filter((f) =>
        isHideFixColumn
          ? f.sticky != true || f.field === "prdCode" || f.field === "prdName"
          : true
      ),
      ...Array.from(Array(dayjs(selectedMonth).daysInMonth()), (_, day) => {
        const date = dayjs(selectedMonth)
          .set("date", day + 1)
          .format("YYYY-MM-DD");

        const dateProductionCount = (row) =>
          (row.dates[date]?.day?.profCount ?? 0) +
          (row.dates[date]?.night?.profCount ?? 0);

        const dateProductionNgCount = (row) =>
          (row.dates[date]?.day?.profNgCount ?? 0) +
          (row.dates[date]?.night?.profNgCount ?? 0);

        return {
          field: `profDay_${day + 1}`,
          title: `${day + 1}일`,
          align: "right",
          type: "number",
          //editorWidth: 400,
          render: ({ row }) => {
            const totalCount = dateProductionCount(row);
            const totalNgCount = dateProductionNgCount(row);
            if (totalCount === 0 && totalNgCount === 0) return "-";

            return (
              <div style={{ display: "flex", justifyContent: "end" }}>
                <p>{totalCount?.toLocaleString()}</p>/
                <p style={{ color: "red" }}>{totalNgCount?.toLocaleString()}</p>
              </div>
            );
          },
        };
      }),
    ];
  };

  React.useEffect(() => {
    setColumns(getColumn());

    getDataList();
  }, [selectedMonth, isHideFixColumn]);

  const onHideFixColumnClick = () => {
    if (!gridRef.current) return;

    const replaceDataSource = dataSource.map((d: any) => {
      const dateData = Object.keys(d.dates).reduce((prev, curr) => {
        const day = d.dates[curr].day;
        const night = d.dates[curr].night;
        const success = (day?.profCount || 0) + (night?.profCount || 0);
        const error = (day?.profNgCount || 0) + (night?.profNgCount || 0);

        const text = `${success === 0 ? "-" : success} / ${
          error === 0 ? "-" : error
        }`;
        prev[`profDay_${dayjs(curr).format("D")}`] = text;
        return prev;
      }, {});

      const getPPM = () => {
        const ppm = (d.totalNgCount / d.totalCount) * 100 * 10000;
        return IsNum(ppm) ? parseInt(ppm.toString())?.toLocaleString() : "-";
      };
      return {
        ...d,
        foundryProductionErrorPPMRate: getPPM(),
        ...dateData,
      };
    });

    // 스타일 예제
    const headerStyle = {
      font: { name: "Arial", sz: 14, bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };

    // 병합 (예: A1~C1 병합)
    //ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];

    gridRef.current.api.export({
      data: replaceDataSource,
      fileName: `${selectedMonth.format("YYYY년 MM월 주조 생산")}`,
      sheetName: "주조",
      onBefore: (ws, utils) => {
        ws["!cols"] = [];
        ws["!rows"] = [];
        ws["!cols"][0] = { wch: 20 };
        ws["!cols"][1] = { wch: 30 };
        ws["!cols"][8] = { wch: 15 };
        ws["!rows"][0] = { hpt: 30 };
        // utils.sheet_add_aoa(
        //   ws,
        //   [
        //     ["사용자명", "홍길동"],
        //     ["생성일", new Date().toLocaleString()],
        //   ],
        //   { origin: "A1" }
        // );
      },
      onAfter: (ws, utils, xlsx) => {
        const range = utils.decode_range(ws["!ref"]);
        console.log(ws, ws["!ref"], range);

        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = utils.encode_cell({ r: 0, c: col });

          ws[cellAddress].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "ececec" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }

        for (let row = range.s.r + 1; row <= range.e.r; row++) {
          for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = utils.encode_cell({ r: row, c: col });

            if (!ws[cellAddress]) {
              ws[cellAddress] = { t: "s", v: "" }; // string 타입, 빈 값
            }

            ws[cellAddress].s = {
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          }
        }
      },
    });
  };

  return (
    <DevsDataTable
      ref={gridRef}
      title="주조 생산 등록"
      columns={columns}
      setColumns={setColumns}
      dataSource={dataSource}
      setDataSource={setDataSource}
      onCheckedRowsChanged={(rows) => {
        console.log(rows);
      }}
      options={{
        editType: "cell",
        cellEditClickType: "click",
        showRowNumber: true,
        enabledRowCheck: true,
      }}
      buttons={{
        custom: (
          <>
            <Button
              bgColor="#df4873"
              color="#fff"
              borderColor="#df4873"
              border={true}
              compact={false}
              onClick={onHideFixColumnClick}
            >
              asd
            </Button>
            <DevsDatePicker
              picker="month"
              selectedDate={selectedMonth}
              setSelectedDate={setSelectedMonth}
            />
          </>
        ),
        onSearchClick: getDataList,
      }}
    />
  );
};

export default App;
