import { useState } from "react";
import "./Tabs.css";
import React from "react";

const Tab = ({tabsData, onChange}) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const handleChangeTab = (index: number): void => {
        setCurrentTabIndex(index);
    };
  return (
    <div className="tabs">
      <div className="tabs__container">
        {tabsData.map((item, index) => {
          return (
            <button
              key={index}
              className={`${currentTabIndex === index ? "active" : ""}`}
              onClick={() => {
                setCurrentTabIndex(index);
                onChange(index);
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="tabs__content">{tabsData[currentTabIndex].content}</div>
    </div>
  )
}

export default Tab