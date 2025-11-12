import { IDataTableColumn } from "../types";

export const getIsLastStickyCol = ({
  lastNodes,
  field,
}: {
  lastNodes: IDataTableColumn[];
  field: string;
}) => {
  const filteredLastNodes = lastNodes.filter((node) => node.sticky);
  const index = filteredLastNodes.findIndex((node) => node.field === field);
  return index === filteredLastNodes.length - 1;
};
