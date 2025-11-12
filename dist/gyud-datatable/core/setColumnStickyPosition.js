export var setColumnStickyPosition = function (_a) {
    var tableRef = _a.tableRef, lastNodes = _a.lastNodes, field = _a.field, options = _a.options;
    var filteredLastNodes = lastNodes.filter(function (node) { return node.sticky; });
    var index = filteredLastNodes.findIndex(function (node) { return node.field === field; });
    var splitLastNodes = filteredLastNodes.slice(index + 1, filteredLastNodes.length);
    var fixedOffsetLeft = 0;
    if (options.isShowRowNumber)
        fixedOffsetLeft += 55;
    if (options.isRowCheckable)
        fixedOffsetLeft += 25;
    for (var i = 0; i < splitLastNodes.length; i++) {
        var currentOffsetLeft = 0;
        var currentIndex = filteredLastNodes.indexOf(splitLastNodes[i]);
        var previousNodes = filteredLastNodes.slice(0, currentIndex);
        for (var j = 0; j < previousNodes.length; j++) {
            var elem = tableRef.querySelector("thead th[data-field=\"".concat(previousNodes[j].field, "\"]"));
            if (elem) {
                currentOffsetLeft += elem.getBoundingClientRect()
                    .width;
            }
        }
        fixedOffsetLeft += currentOffsetLeft;
        var currentElem = tableRef.querySelectorAll("thead th[data-field=\"".concat(splitLastNodes[i].field, "\"], tbody td[data-field=\"").concat(splitLastNodes[i].field, "\"]"));
        if (currentElem) {
            currentElem.forEach(function (elem) {
                elem.style.left = "".concat(fixedOffsetLeft, "px");
            });
        }
    }
};
