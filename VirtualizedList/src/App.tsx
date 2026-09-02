import VirtualizedList from "./components/VirtualizedList";

// "This implementation assumes every row has a fixed height. If rows have dynamic heights, we can't calculate the visible index simply using scrollTop / itemHeight. We'd need to measure row heights and maintain a mapping of indexes to offsets, typically using ResizeObserver and a more sophisticated positioning/search strategy."

// "I'm using overscan so that a few items outside the viewport are already mounted, reducing blank frames during fast scrolling."

const LIST = Array.from(
  { length: 100000 },
  (_, index) => index + 1
);

const App = () => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems: 'center', padding: 140 }}>
      <VirtualizedList
        list={LIST}
        height={400}
        width={300}
        itemHeight={35}
        overscan={5}
      />
    </div>
  );
}

export default App