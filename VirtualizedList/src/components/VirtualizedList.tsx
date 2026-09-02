import { useState, useMemo, useCallback } from "react";

const VirtualizedList = ({
  list,
  height,
  width,
  itemHeight,
  overscan = 5,
}) => {
  // scrollTop is the ONLY piece of state we really need.
  // Everything else can be calculated from it.
  const [scrollTop, setScrollTop] = useState(0);

  /*
   * Total height of the virtual list.
   *
   * Example:
   * 100,000 items × 35px = 3,500,000px
   *
   * We don't render 100,000 DOM nodes.
   * We only create a container with this height
   * so that the browser gives us the correct scrollbar.
   */
  const totalHeight = list.length * itemHeight;

  /*
   * Number of items that can actually fit inside the viewport.
   *
   * Example:
   * height = 400
   * itemHeight = 35
   *
   * 400 / 35 ≈ 11.4
   *
   * So roughly 12 items are visible.
   */
  const visibleCount = Math.ceil(height / itemHeight);

  /*
   * Which item should be the first visible item?
   *
   * Example:
   * scrollTop = 700
   * itemHeight = 35
   *
   * 700 / 35 = 20
   *
   * Therefore item #20 is at the top.
   */
  const firstVisibleIndex = Math.floor(scrollTop / itemHeight);

  /*
   * OVERSCAN
   *
   * We render a few extra items above and below the viewport.
   *
   * Why?
   *
   * Imagine the user scrolls extremely fast.
   * Without overscan, React might briefly have no DOM
   * node ready for the newly visible area.
   *
   * Overscan gives us a small rendering buffer.
   */
  const startIndex = Math.max(
    0,
    firstVisibleIndex - overscan
  );

  const endIndex = Math.min(
    list.length - 1,
    firstVisibleIndex + visibleCount + overscan - 1
  );

  /*
   * Number of items we actually render.
   *
   * With 100,000 items we might render only:
   *
   * 12 visible + 5 above + 5 below = ~22 items
   */
  const visibleItems = useMemo(() => {
    if (list.length === 0) {
      return [];
    }

    return list.slice(startIndex, endIndex + 1);
  }, [list, startIndex, endIndex]);

  /*
   * Handle scrolling.
   *
   * Important:
   * We don't calculate startIndex/endIndex here.
   *
   * We only update scrollTop.
   *
   * React renders again and the indexes are derived from
   * the latest scrollTop.
   */
  const handleScroll = useCallback((event) => {
    // scrollTop is a browser-provided property of a scrollable element.
    // the browser tells you:
    // "How many pixels has this element been scrolled vertically from the top?"
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  /*
   * The vertical offset of the first rendered item.
   *
   * Suppose:
   *
   * startIndex = 95
   * itemHeight = 35
   *
   * The first rendered item should appear at:
   *
   * 95 × 35 = 3325px
   */
  const offsetY = startIndex * itemHeight;

  return (
    <div
      onScroll={handleScroll}
      style={{
        height,
        width,
        overflowY: "auto",
        overflowX: "hidden",
        border: "1px solid #ccc",
      }}
    >
      {/*
       * SPACER / VIRTUAL CONTENT
       *
       * This element represents the complete list height.
       *
       * We need this even though only a small number of items
       * are actually rendered.
       */}
      <div
        style={{
          height: totalHeight,
          position: "relative",
        }}
      >
        {/*
         * Move our small rendered window to its correct
         * location inside the huge virtual list.
         */}
        <div
          style={{
            position: "absolute",
            top: offsetY,
            left: 0,
            width: "100%",
          }}
        >
          {visibleItems.map((item, index) => {
            /*
             * IMPORTANT:
             *
             * `index` here is relative to visibleItems.
             *
             * Actual index in the original list:
             *
             * startIndex + index
             */
            const actualIndex = startIndex + index;

            return (
              <div
                key={actualIndex}
                style={{
                  height: itemHeight,
                  boxSizing: "border-box",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Item {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;