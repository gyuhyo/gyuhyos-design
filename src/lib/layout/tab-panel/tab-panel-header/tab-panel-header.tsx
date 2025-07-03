/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import TabPanelHeaderItem from "../tab-panel-header-item/tab-panel-header-item";
import { useMenuStore } from "../../stores/menu-store";
import Button from "../../../button";
import {
  DragDropContext,
  Draggable,
  DragUpdate,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

let mainKey = {
  group: "",
  key: "",
  title: "",
};

function TabPanelHeader() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hasScrollbar, setHasScrollbar] = React.useState(false);
  const [isDrop, setIsDrop] = React.useState<boolean>(false);
  const {
    menus,
    openMenu,
    openedMenus,
    selectedMenu,
    changeSelectedMenu,
    menuOrderChanges,
  } = useMenuStore();
  const searchParams = new URLSearchParams(window.location.search);

  const pageNotFound = () => {
    alert("페이지를 찾을 수 없습니다.");
    changeSelectedMenu(mainKey);
  };

  React.useEffect(() => {
    if (menus.length === 0) return;

    const gm = searchParams.get("gm");

    const flatMaps = menus.flatMap((x) =>
      x.children === undefined ? x : x.children
    );
    const mainMenu = flatMaps.find((x) => x.main === true);
    mainKey = {
      group: mainMenu!.group ?? "",
      key: mainMenu!.key,
      title: mainMenu!.title,
    };

    if (!gm) {
      changeSelectedMenu(mainKey);
      return;
    }

    if (gm === "/") {
      changeSelectedMenu(mainKey);
    } else if (gm !== "/") {
      const gms = gm.split("/");

      if (!gms || gms.length === 1) {
        pageNotFound();
        return;
      }

      const group = gms[0];
      const menuKey = gms[1];

      const om = openedMenus.find(
        (f) => f.group === group && f.key === menuKey
      );
      if (!om) {
        const mg = menus.find((m) => m.key === group);

        if (!mg || !mg.children) {
          pageNotFound();
          return;
        }

        const mc = mg.children.find((g: any) => g.key === menuKey);

        if (mc) {
          openMenu(mc);
        } else {
          pageNotFound();
        }
      } else {
        if (selectedMenu.gr !== group || selectedMenu.mn !== menuKey) {
          const findNewMenuGroup = menus.find((m) => m.key === group);
          const findNewMenu = findNewMenuGroup!.children!.find(
            (c: any) => c.key === menuKey
          );
          changeSelectedMenu(findNewMenu!);
        }
      }
    }
  }, [menus]);

  React.useEffect(() => {
    const checkForScrollbar = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setHasScrollbar(scrollWidth > clientWidth);
      }
    };

    const observer = new MutationObserver(() => {
      checkForScrollbar();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Initial check
    checkForScrollbar();
    window.addEventListener("resize", checkForScrollbar);
    // Cleanup observer on component unmount
    return () => {
      window.removeEventListener("resize", checkForScrollbar);
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const onRightScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 150,
        behavior: "smooth",
      });
    }
  };

  const onLeftScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 150,
        behavior: "smooth",
      });
    }
  };

  const setRowOrderChange = React.useCallback(
    (e: DropResult<string>) => {
      setIsDrop(false);
      if (!e.destination) return;

      const startIndex = e.source.index;
      const endIndex = e.destination.index;

      if (startIndex === endIndex || openedMenus[endIndex].main === true)
        return;

      // 데이터 순서 변경
      const newDataSource = [...openedMenus];
      const [removed] = newDataSource.splice(startIndex, 1);
      newDataSource.splice(endIndex, 0, removed);

      menuOrderChanges(newDataSource);
    },
    [openedMenus]
  );

  React.useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    if (element) {
      // 'wheel' 이벤트 리스너 추가
      const onWheel = (e: any) => {
        // 기본 세로 스크롤 동작을 막음
        e.preventDefault();
        // 휠의 Y축 움직임(e.deltaY)을 X축 스크롤(element.scrollLeft)에 더해줌
        element.scrollTo({
          left: element.scrollLeft + e.deltaY,
          behavior: "smooth", // 부드럽게 스크롤
        });
      };

      element.addEventListener("wheel", onWheel);

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거 (메모리 누수 방지)
      return () => element.removeEventListener("wheel", onWheel);
    }
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <DragDropContext onDragEnd={setRowOrderChange}>
      <Droppable
        droppableId="droppable"
        mode="standard"
        type=""
        direction="horizontal"
        isDropDisabled={isDrop}
      >
        {(provided) => {
          const combinedRef = (element: HTMLDivElement | null) => {
            if (containerRef && containerRef.current !== element) {
              containerRef.current = element;
            }

            if (provided.innerRef) {
              provided.innerRef(element); // provided.innerRef를 합쳐서 사용
            }
          };
          return (
            <div
              ref={combinedRef}
              {...provided.droppableProps}
              css={css({
                flex: "none",
                height: "35px",
                background: "#fff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                overflowY: "hidden",
                overflowX: "auto",
                position: "relative",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
              })}
            >
              {openedMenus &&
                openedMenus.map((menu, index) => (
                  <Draggable
                    draggableId={`${menu.group}-${menu.key}`}
                    index={index}
                    key={`${menu.group}-${menu.key}`}
                    isDragDisabled={menu.main}
                  >
                    {(provided2, snapshot) => {
                      var style = provided2.draggableProps.style;
                      if (style !== undefined) {
                        var transform =
                          provided2.draggableProps.style!.transform;
                        if (transform) {
                          // 기존에는 transform의 Y축을 분리하여 사용했으므로, 이제 X축으로 변경
                          var t = transform.split(",")[0]; // X축 값을 가져옵니다.
                          provided2.draggableProps.style!.transform =
                            t + ", 0px)"; // X축만 조정
                        }
                      }
                      return (
                        <TabPanelHeaderItem
                          key={`tab-${menu.group}-${menu.key}`}
                          menu={menu}
                          active={
                            selectedMenu.gr === menu.group &&
                            selectedMenu.mn === menu.key
                          }
                          dragProvided={provided2}
                          dragSnapshot={snapshot}
                        />
                      );
                    }}
                  </Draggable>
                ))}
              <div
                css={css({
                  display: hasScrollbar ? "flex" : "none",
                  flexDirection: "row",
                  columnGap: "3px",
                  position: "sticky",
                  right: 0,
                  top: 0,
                  padding: "5px 7px",
                  height: "100%",
                  background: "#fff",
                  boxShadow: "-1px 0px 15px 7px rgba(0, 0, 0, 0.5)",
                  zIndex: 2,
                })}
              >
                <Button
                  bgColor="#a0a0a0"
                  color="#fff"
                  css={css({ height: "100%" })}
                  onClick={onLeftScroll}
                >
                  &#x276E;
                </Button>
                <Button
                  bgColor="#a0a0a0"
                  color="#fff"
                  css={css({ height: "100%" })}
                  onClick={onRightScroll}
                >
                  &#x276F;
                </Button>
              </div>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(TabPanelHeader);
