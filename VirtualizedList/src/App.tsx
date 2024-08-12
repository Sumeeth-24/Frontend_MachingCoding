import VirtualizedList from "./components/VirtualizedList";


const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

const App = () => {
  return (
    <VirtualizedList list={LIST} height={400} width={300} itemHeight={35} />
  );
}

export default App