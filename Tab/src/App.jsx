import Tab from "./components/Tab";
import "./components/Tabs.css";

const App = () => {
  return (
    <div className="container">
      <Tab defaultTab="settings" />
    </div>
  );
};

export default App;
