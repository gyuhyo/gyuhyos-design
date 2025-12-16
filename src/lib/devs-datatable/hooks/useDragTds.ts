import React from "react";

const useDragTds = () => {
  const [tableRef, setTableRef] = React.useState<HTMLTableElement | null>(null);
  const [cells, setCells] = React.useState<HTMLTableCellElement[]>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [cellCount, setCellCount] = React.useState(0);
  const [fields, setFields] = React.useState<string[]>([]);
  const [data, setData] = React.useState<any[][]>([]);
  const [csv, setCsv] = React.useState("");
  const [dragginCount, setDragginCount] = React.useState(0);

  const pointer = React.useRef({
    isDragging: false,
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

  const checkIntersection = React.useCallback(
    (clientX: number, clientY: number) => {
      const tds = tableRef!.querySelectorAll("td");
      if (!tds) return;

      let intersectingCells: HTMLTableCellElement[] = [];
      tds.forEach((td) => {
        const rect = td.getBoundingClientRect();
        const isIntersecting = !(
          rect.right < Math.min(pointer.current.dragStart.x, clientX) ||
          rect.left > Math.max(pointer.current.dragStart.x, clientX) ||
          rect.bottom < Math.min(pointer.current.dragStart.y, clientY) ||
          rect.top > Math.max(pointer.current.dragStart.y, clientY)
        );

        if (isIntersecting) {
          intersectingCells.push(td);
        }
      });

      intersectingCells.sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();

        if (rectA.top < rectB.top) return -1;
        if (rectA.top > rectB.top) return 1;
        if (rectA.left < rectB.left) return -1;
        if (rectA.left > rectB.left) return 1;
        return 0;
      });

      if (intersectingCells.length <= 1) return;
      setCells(intersectingCells);
    },
    [tableRef]
  );

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

    checkIntersection(x, y);

    scrollRafId.current = requestAnimationFrame(scrollStep);
  }, [tableRef, checkIntersection]);

  const handlePointerDown = (e: PointerEvent) => {
    setCells([]);
    pointer.current.isDragging = true;
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

    pointer.current.curr = {
      x: e.clientX,
      y: e.clientY,
    };

    checkIntersection(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: PointerEvent) => {
    setDragginCount(dragginCount + 1);
    pointer.current.isDragging = false;
    pointer.current.dragEnd = {
      x: e.clientX,
      y: e.clientY,
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
    tableRef.addEventListener("pointerup", handlePointerUp);

    return () => {
      tableRef.removeEventListener("pointerdown", handlePointerDown);
      tableRef.removeEventListener("pointermove", handlePointerMove);
      tableRef.removeEventListener("pointerup", handlePointerUp);
      tableRef.style.cursor = "default";
    };
  }, [tableRef]);

  React.useEffect(() => {
    if (!cells.length) return;

    const minX = cells.reduce((min, cell) => {
      const rect = cell.getBoundingClientRect();
      return Math.min(min, rect.left - tableRef!.getBoundingClientRect().x);
    }, Infinity);

    const minY = cells.reduce((min, cell) => {
      const rect = cell.getBoundingClientRect();
      return Math.min(min, rect.top - tableRef!.getBoundingClientRect().y);
    }, Infinity);

    const maxX = cells.reduce((max, cell) => {
      const rect = cell.getBoundingClientRect();
      return Math.max(max, rect.right - tableRef!.getBoundingClientRect().x);
    }, -Infinity);

    const maxY = cells.reduce((max, cell) => {
      const rect = cell.getBoundingClientRect();
      return Math.max(max, rect.bottom - tableRef!.getBoundingClientRect().y);
    }, -Infinity);

    const box = document.createElement("div");
    box.style.position = "absolute";
    box.style.left = `${minX}px`;
    box.style.top = `${minY}px`;
    box.style.width = `${maxX - minX}px`;
    box.style.height = `${maxY - minY}px`;
    box.style.backgroundColor = "rgb(92 161 189 / 50%)";
    box.style.pointerEvents = "none";
    box.style.zIndex = "4";
    box.style.border = "1px solid rgb(47 141 255)";
    (tableRef as HTMLTableElement).appendChild(box);

    const uniqueFields: string[] = [
      ...new Set(
        cells
          .map((cell) => cell.dataset.field!.toString())
          .filter((field) => field !== undefined)
      ),
    ];

    const rowCount = cells.reduce(
      (rows: HTMLTableRowElement[], cell: HTMLTableCellElement) => {
        const row = cell.closest("tr");
        if (!row || rows.includes(row)) return rows;
        return [...rows, row];
      },
      [] as HTMLTableRowElement[]
    ).length;

    const cellCount = uniqueFields.length;
    const cellsTextContent = cells.map((cell) =>
      cell.textContent?.replace(",", "")
    );

    const thead = tableRef!
      .closest("div.dev-table-wrapper")
      ?.querySelector("thead");
    const ths = thead!.querySelectorAll("th");
    const uniqueFieldsThs = uniqueFields.map((field) => {
      const th = [...ths].find((th) => th.dataset.field === field);
      return th
        ?.querySelector("p")
        ?.textContent?.replace(",", "")
        .replace("\n", "");
    });

    const columns = ["No", ...uniqueFields];
    const fields = ["No", ...uniqueFieldsThs];

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

    console.log(csv);

    setRowCount(rowCount);
    setCellCount(cellCount);
    setFields(uniqueFields);
    setData(dataArray);
    setCsv(csv);

    return () => {
      (tableRef as HTMLTableElement).removeChild(box);
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
