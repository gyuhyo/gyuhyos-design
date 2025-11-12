export var getIsLastStickyCol = function (_a) {
    var lastNodes = _a.lastNodes, field = _a.field;
    var filteredLastNodes = lastNodes.filter(function (node) { return node.sticky; });
    var index = filteredLastNodes.findIndex(function (node) { return node.field === field; });
    return index === filteredLastNodes.length - 1;
};
