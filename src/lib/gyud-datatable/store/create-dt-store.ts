import { createStore, StoreApi } from "zustand";
import { IDataSource, IDataTableColumn } from "../types";
import uuid from "react-uuid";

export interface IDtStore {
  columns: IDataTableColumn[];
  setColumns: (
    columns:
      | IDataTableColumn[]
      | ((prev: IDataTableColumn[]) => IDataTableColumn[])
  ) => void;
  initializeColumns: (columns: IDataTableColumn[]) => void;
  findColumn: (field: string) => IDataTableColumn;
  setColumnWidth: (field: string, width: number) => void;
  dataSource: IDataSource[];
  setDataSource: (dataSource: IDataSource[]) => void;
  findData: (rowKey: string, field: string) => any;
  getLastNodes: () => IDataTableColumn[];
  getMaxDepth: () => number;
  getFlatColumns: () => IDataTableColumn[];
  options: {
    isShowRowNumber?: boolean;
  };
  scrollOffset: number;
  setScrollOffset: (scrollOffset: number) => void;
  tableRef: React.RefObject<HTMLTableElement> | null;
  tbodyRef: React.RefObject<HTMLTableSectionElement> | null;
  theadRef: React.RefObject<HTMLTableSectionElement> | null;
  setTheadRef: (ref: HTMLTableSectionElement | null) => void;
  setTbodyRef: (ref: HTMLTableSectionElement | null) => void;
  setTableRef: (ref: HTMLTableElement | null) => void;
  focusedCell: string;
  focusedRow: string;
  setFocusedCell: (cell: string) => void;
  setFocusedRow: (row: string) => void;
}

export const createDtStore = (): StoreApi<IDtStore> =>
  createStore<IDtStore>((set, get) => ({
    columns: [],
    dataSource: [],
    options: {
      isShowRowNumber: false,
    },
    scrollOffset: 0,
    tbodyRef: null,
    theadRef: null,
    tableRef: null,
    focusedCell: "",
    focusedRow: "",
    setFocusedCell: (cell: string) => {
      set((state: IDtStore) => ({ ...state, focusedCell: cell }));
    },
    setFocusedRow: (row: string) => {
      set((state: IDtStore) => ({ ...state, focusedRow: row }));
    },
    setTableRef: (ref: HTMLTableElement | null) => {
      if (!get().tableRef) {
        set((state: IDtStore) => ({ ...state, tableRef: { current: ref } }));
      }
    },
    setTheadRef: (ref: HTMLTableSectionElement | null) => {
      if (!get().theadRef) {
        set((state: IDtStore) => ({ ...state, theadRef: { current: ref } }));
      }
    },
    setTbodyRef: (ref: HTMLTableSectionElement | null) => {
      if (!get().tbodyRef) {
        set((state: IDtStore) => ({ ...state, tbodyRef: { current: ref } }));
      }
    },
    setColumns: (updater) =>
      set((prev) => ({
        ...prev,
        columns:
          typeof updater === "function"
            ? (updater as (prev: IDataTableColumn[]) => IDataTableColumn[])(
                prev.columns
              )
            : updater,
      })),
    initializeColumns: (columns: IDataTableColumn[]) => {
      set((state: IDtStore) => {
        const calcHeader = (nodes: IDataTableColumn[]): IDataTableColumn[] => {
          const maxDepth = getMaxDepth(nodes);

          const dfs = (
            node: IDataTableColumn,
            depth: number
          ): IDataTableColumn => {
            if (!node.children?.length) {
              return {
                ...node,
                width: node.width ?? 100,
                depth,
                colSpan: 1,
                rowSpan: maxDepth - depth + 1,
              };
            }
            const children = node.children.map((c) => dfs(c, depth + 1));
            return {
              ...node,
              width: node.width ?? 100,
              depth,
              colSpan: children.reduce((s, c) => s + (c.colSpan || 0), 0),
              rowSpan: 1,
              children,
            };
          };

          return nodes.map((n) => dfs(n, 1));
        };

        const getMaxDepth = (nodes: IDataTableColumn[], d = 1): number => {
          return nodes.reduce(
            (m, n) =>
              Math.max(m, n.children ? getMaxDepth(n.children, d + 1) : d),
            d
          );
        };

        return { ...state, columns: calcHeader(columns) };
      });
    },
    findColumn: (field: string) => {
      const columns = get().columns.flatMap((column) => column.children || []);
      return columns.find((column) => column.field === field)!;
    },
    setColumnWidth: (field: string, width: number) => {
      const setFindColumnWidth = (
        columns: IDataTableColumn[]
      ): IDataTableColumn[] => {
        return columns.map((column) => {
          if (column.children && column.children.length > 0) {
            return { ...column, children: setFindColumnWidth(column.children) };
          }

          if (column.field === field) {
            return { ...column, width };
          }

          return column;
        });
      };
      set((state: IDtStore) => ({
        ...state,
        columns: setFindColumnWidth(state.columns),
      }));
    },
    setDataSource: (dataSource: IDataSource[]) => {
      set((state: IDtStore) => {
        const newDataSource = dataSource.map((row) => ({
          rowKey: row.rowKey || uuid(),
          mode: "r",
          checked: false,
          ...row,
        }));
        return { ...state, dataSource: newDataSource };
      });
    },
    findData: (rowKey: string, field: string) => {
      const dataSource = get().dataSource || [];
      return dataSource.find((row) => row.rowKey === rowKey)?.[
        field as keyof IDataSource
      ];
    },
    getLastNodes: () => {
      const columns = get().columns;
      const lastNodes: IDataTableColumn[] = [];
      const findLastNodes = (column: IDataTableColumn) => {
        if (column.children && column.children.length > 0) {
          column.children.forEach(findLastNodes);
        } else {
          lastNodes.push(column);
        }
      };
      columns.forEach(findLastNodes);
      return lastNodes;
    },
    getFlatColumns: () => {
      const flattenAll = (nodes: IDataTableColumn[]): IDataTableColumn[] => {
        return nodes.flatMap((n) => [
          n,
          ...(n.children ? flattenAll(n.children) : []),
        ]);
      };
      return flattenAll(get().columns);
    },
    getMaxDepth: () => {
      const flattenAll = (nodes: IDataTableColumn[]): IDataTableColumn[] => {
        return nodes.flatMap((n) => [
          n,
          ...(n.children ? flattenAll(n.children) : []),
        ]);
      };
      return flattenAll(get().columns).reduce(
        (max, column) => Math.max(max, column.depth || 0),
        0
      );
    },
    setOptions: (options: { isShowRowNumber?: boolean }) => {
      set((state: IDtStore) => ({ ...state, options }));
    },
    setScrollOffset: (scrollOffset: number) => {
      set((state: IDtStore) => ({ ...state, scrollOffset }));
    },
  }));
