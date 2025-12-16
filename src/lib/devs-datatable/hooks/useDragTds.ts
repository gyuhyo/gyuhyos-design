import React from "react";

const boxTop = document.createElement("div");
boxTop.className = "devs-dt-box-top";
boxTop.style.position = "absolute";
boxTop.style.left = `-1px`;
boxTop.style.top = `-1px`;
boxTop.style.width = `calc(100% + 2px)`;
boxTop.style.height = `calc(100% + 2px)`;
boxTop.style.pointerEvents = "none";
boxTop.style.borderTop = "1px solid rgb(47 141 255)";

const boxLeft = document.createElement("div");
boxLeft.className = "devs-dt-box-left";
boxLeft.style.position = "absolute";
boxLeft.style.left = `-1px`;
boxLeft.style.top = `-1px`;
boxLeft.style.width = `calc(100% + 2px)`;
boxLeft.style.height = `calc(100% + 2px)`;
boxLeft.style.pointerEvents = "none";
boxLeft.style.borderLeft = "1px solid rgb(47 141 255)";

const boxRight = document.createElement("div");
boxRight.className = "devs-dt-box-right";
boxRight.style.position = "absolute";
boxRight.style.left = `-1px`;
boxRight.style.top = `-1px`;
boxRight.style.width = `calc(100% + 2px)`;
boxRight.style.height = `calc(100% + 2px)`;
boxRight.style.pointerEvents = "none";
boxRight.style.borderRight = "1px solid rgb(47 141 255)";

const boxBottom = document.createElement("div");
boxBottom.className = "devs-dt-box-bottom";
boxBottom.style.position = "absolute";
boxBottom.style.left = `-1px`;
boxBottom.style.top = `-1px`;
boxBottom.style.width = `calc(100% + 2px)`;
boxBottom.style.height = `calc(100% + 2px)`;
boxBottom.style.pointerEvents = "none";
boxBottom.style.borderBottom = "1px solid rgb(47 141 255)";

const boxInner = document.createElement("div");
boxInner.className = "devs-dt-box-inner";
boxInner.style.position = "absolute";
boxInner.style.left = `-1px`;
boxInner.style.top = `-1px`;
boxInner.style.width = `calc(100% + 2px)`;
boxInner.style.height = `calc(100% + 2px)`;
boxInner.style.backgroundColor = "rgb(92 161 189 / 50%)";
boxInner.style.pointerEvents = "none";

const useDragTds = () => {
  const [tableRef, setTableRef] = React.useState<HTMLTableElement | null>(null);
  const [cells, setCells] = React.useState<HTMLTableCellElement[]>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [cellCount, setCellCount] = React.useState(0);
  const [fields, setFields] = React.useState<string[]>([]);
  const [data, setData] = React.useState<any[][]>([]);
  const [csv, setCsv] = React.useState("");
  const [dragginCount, setDragginCount] = React.useState(0);

  const pointer = React.useRef<{
    isDragging: boolean;
    dragStartTd: HTMLTableCellElement | null;
    dragEndTd: HTMLTableCellElement | null;
    dragStart: {
      x: number;
      y: number;
    };
    dragEnd: {
      x: number;
      y: number;
    };
    curr: {
      x: number;
      y: number;
    };
  }>({
    isDragging: false,
    dragStartTd: null,
    dragEndTd: null,
    dragStart: {
      x: 0,
      y: 0,
    },
    dragEnd: {
      x: 0,
      y: 0,
    },
    curr: {
      x: 0,
      y: 0,
    },
  });

  const scrollRafId = React.useRef<number | null>(null);

  const checkIntersection = React.useCallback(() => {
    const tds = tableRef!.querySelectorAll("td");
    if (!tds) return;

    if (!pointer.current.dragStartTd || !pointer.current.dragEndTd) return;

    const dragStart = pointer.current.dragStartTd as HTMLTableCellElement;
    const dragEnd = pointer.current.dragEndTd as HTMLTableCellElement;

    const dsri = [...tableRef!.querySelectorAll("tr")].indexOf(
      dragStart.closest("tr") as HTMLTableRowElement
    );
    const deri = [...tableRef!.querySelectorAll("tr")].indexOf(
      dragEnd.closest("tr") as HTMLTableRowElement
    );

    const dragStartRowIndex = Math.min(dsri, deri);
    const dragEndRowIndex = Math.max(dsri, deri);

    const dsci = [...dragStart.closest("tr")!.querySelectorAll("td")].indexOf(
      dragStart
    );
    const deci = [...dragEnd.closest("tr")!.querySelectorAll("td")].indexOf(
      dragEnd
    );

    const dragStartCellIndex = Math.min(dsci, deci);
    const dragEndCellIndex = Math.max(dsci, deci);

    let intersectingCells: HTMLTableCellElement[] = [];

    tableRef!.querySelectorAll("tr").forEach((tr, rowIndex) => {
      if (rowIndex < dragStartRowIndex || rowIndex > dragEndRowIndex) return;
      const cells = [...tr.querySelectorAll("td")];
      cells.forEach((cell, cellIndex) => {
        if (cellIndex < dragStartCellIndex || cellIndex > dragEndCellIndex)
          return;
        intersectingCells.push(cell);
      });
    });

    if (intersectingCells.length <= 1) return;
    setCells(intersectingCells);
  }, [tableRef]);

  const scrollStep = React.useCallback(() => {
    if (!pointer.current.isDragging || !tableRef) return;

    const wrapper = tableRef.closest("div.devs-dt-tbody-wrapper");
    if (!wrapper) return;

    const { top, bottom, left, right } = wrapper.getBoundingClientRect();
    const { x, y } = pointer.current.curr;

    const threshold = 50;
    const speed = 10;

    if (y < top + threshold) {
      wrapper.scrollTop -= speed;
    } else if (y > bottom - threshold) {
      wrapper.scrollTop += speed;
    }

    if (x < left + threshold) {
      wrapper.scrollLeft -= speed;
    } else if (x > right - threshold) {
      wrapper.scrollLeft += speed;
    }

    checkIntersection();

    scrollRafId.current = requestAnimationFrame(scrollStep);
  }, [tableRef, checkIntersection]);

  const handlePointerDown = (e: PointerEvent) => {
    setCells([]);
    pointer.current.isDragging = true;
    pointer.current.dragStartTd =
      e.target instanceof HTMLTableCellElement
        ? e.target
        : (e.target as HTMLElement).closest("td");
    pointer.current.dragStart = {
      x: e.clientX,
      y: e.clientY,
    };
    pointer.current.curr = {
      x: e.clientX,
      y: e.clientY,
    };
    tableRef!.style.cursor = "cell";

    scrollRafId.current = requestAnimationFrame(scrollStep);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!pointer.current.isDragging) return;

    pointer.current.dragEndTd =
      e.target instanceof HTMLTableCellElement
        ? e.target
        : (e.target as HTMLElement).closest("td");
    pointer.current.curr = {
      x: e.clientX,
      y: e.clientY,
    };

    checkIntersection();
  };

  const handlePointerUp = (e: PointerEvent) => {
    setDragginCount(dragginCount + 1);
    pointer.current.isDragging = false;
    pointer.current.dragEndTd = null;
    pointer.current.dragStartTd = null;
    pointer.current.dragEnd = {
      x: 0,
      y: 0,
    };
    tableRef!.style.cursor = "default";

    if (scrollRafId.current) {
      cancelAnimationFrame(scrollRafId.current);
      scrollRafId.current = null;
    }
  };

  const handleDownloadCsv = () => {
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    if (!dragginCount) return;
    //handleDownloadCsv();
    setDragginCount(0);
  }, [dragginCount]);

  React.useEffect(() => {
    if (!tableRef) return;

    tableRef.addEventListener("pointerdown", handlePointerDown);
    tableRef.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      tableRef.removeEventListener("pointerdown", handlePointerDown);
      tableRef.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      tableRef.style.cursor = "default";
    };
  }, [tableRef]);

  React.useEffect(() => {
    if (!cells.length) return;

    const thead = tableRef!
      .closest("div.dev-table-wrapper")
      ?.querySelector("thead");
    const ths = thead!.querySelectorAll("th");

    const uniqueFields: string[] = [
      ...new Set(
        cells
          .map((cell) => cell.dataset.field!.toString())
          .filter((field) => field !== undefined)
      ),
    ];

    const uniqueFieldsThs = uniqueFields.map((field) => {
      const th = [...ths].find((th) => th.dataset.field === field);
      return th
        ?.querySelector("p")
        ?.textContent?.replace(",", "")
        .replace("\n", "");
    });

    const rowCount = cells.reduce(
      (rows: HTMLTableRowElement[], cell: HTMLTableCellElement) => {
        const row = cell.closest("tr");
        if (!row || rows.includes(row)) return rows;
        return [...rows, row];
      },
      [] as HTMLTableRowElement[]
    ).length;

    const cellCount = uniqueFields.length;

    for (let row = 0; row < rowCount; row++) {
      for (let cell = 0; cell < cellCount; cell++) {
        const targetCell = cells[row * cellCount + cell];

        if (row === 0) {
          targetCell.appendChild(boxTop.cloneNode(true));
        }

        if (cell === 0) {
          targetCell.appendChild(boxLeft.cloneNode(true));
        }

        if (row === rowCount - 1) {
          targetCell.appendChild(boxBottom.cloneNode(true));
        }

        if (cell === cellCount - 1) {
          targetCell.appendChild(boxRight.cloneNode(true));
        }

        targetCell.appendChild(boxInner.cloneNode(true));
      }
    }

    const columns = ["No", ...uniqueFields];
    const fields = ["No", ...uniqueFieldsThs];

    const cellsTextContent = cells.map((cell) =>
      cell.textContent?.replace(",", "")
    );

    let datas: any[][] = [];
    for (let i = 0; i < rowCount; i++) {
      let row: any[] = [i + 1];
      for (let j = 0; j < cellCount; j++) {
        row.push(cellsTextContent[i * cellCount + j]);
      }
      datas.push(row);
    }
    const dataArray = [columns, fields, ...datas];

    const csv = dataArray
      .slice(1)
      .map((row) => row.join(","))
      .join("\n");

    setRowCount(rowCount);
    setCellCount(cellCount);
    setFields(uniqueFields);
    setData(dataArray);
    setCsv(csv);

    return () => {
      const tds = tableRef!.querySelectorAll("td");

      tds.forEach((td) => {
        const top = td.querySelector(".devs-dt-box-top");
        const left = td.querySelector(".devs-dt-box-left");
        const bottom = td.querySelector(".devs-dt-box-bottom");
        const right = td.querySelector(".devs-dt-box-right");
        const inner = td.querySelector(".devs-dt-box-inner");

        if (top) td.removeChild(top);
        if (left) td.removeChild(left);
        if (bottom) td.removeChild(bottom);
        if (right) td.removeChild(right);
        if (inner) td.removeChild(inner);
      });

      setRowCount(0);
      setCellCount(0);
      setFields([]);
      setData([]);
      setCsv("");
    };
  }, [cells.length]);

  return {
    setTableRef,
    cells,
    rowCount,
    cellCount,
    fields,
    data,
    csv,
  };
};

export default useDragTds;
