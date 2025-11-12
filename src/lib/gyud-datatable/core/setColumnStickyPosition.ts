import { IDataTableOptions } from "../store/create-dt-store";
import { IDataTableColumn } from "../types";

export const setColumnStickyPosition = ({
  tableRef,
  lastNodes,
  field,
  options,
}: {
  tableRef: HTMLTableElement;
  lastNodes: IDataTableColumn[];
  field: string;
  options: IDataTableOptions;
}) => {
  const filteredLastNodes = lastNodes.filter((node) => node.sticky);
  const index = filteredLastNodes.findIndex((node) => node.field === field);
  const splitLastNodes = filteredLastNodes.slice(
    index + 1,
    filteredLastNodes.length
  );

  let fixedOffsetLeft = 0;
  if (options.isShowRowNumber) fixedOffsetLeft += 55;
  if (options.isRowCheckable) fixedOffsetLeft += 25;

  for (let i = 0; i < splitLastNodes.length; i++) {
    let currentOffsetLeft = 0;
    const currentIndex = filteredLastNodes.indexOf(splitLastNodes[i]);
    const previousNodes = filteredLastNodes.slice(0, currentIndex);
    for (let j = 0; j < previousNodes.length; j++) {
      const elem = tableRef.querySelector(
        `thead th[data-field="${previousNodes[j].field}"]`
      );
      if (elem) {
        currentOffsetLeft += (elem as HTMLElement).getBoundingClientRect()
          .width;
      }
    }
    fixedOffsetLeft += currentOffsetLeft;
    const currentElem = tableRef.querySelectorAll(
      `thead th[data-field="${splitLastNodes[i].field}"], tbody td[data-field="${splitLastNodes[i].field}"]`
    );
    if (currentElem) {
      currentElem.forEach((elem) => {
        (elem as HTMLElement).style.left = `${fixedOffsetLeft}px`;
      });
    }
  }
};
