import React from "react";
import Tab from "./components/Tab";

const tabsData = [
  {
    label: "Profile",
    content: <div>Profile Info Content</div>,
  },
  {
    label: "Dashboard",
    content: <div>Dashboard Content</div>,
  },
  {
    label: "Settings",
    content: <div>Settings Content</div>,
  },
  {
    label: "Invoice",
    content: <div>Invoice Content</div>,
  },
];

const App = () => {
  const onTabChangeHandler = (index) => {
    console.log("Tab Changed");
  };

  return (
    <div>
      <Tab tabsData={tabsData} onChange={onTabChangeHandler} />
    </div>
  );
};

export default App;
