import { useEffect, useRef, useState } from "react";
import { tabsConfig } from "../tabsConfig.jsx";
import "./Tabs.css";

const Tab = ({ tabs = tabsConfig, defaultTab }) => {
  /*
   * Find the first enabled tab.
   *
   * This gives us a safe fallback when:
   * - defaultTab is not provided
   * - defaultTab doesn't exist
   * - defaultTab points to a disabled tab
   */
  const firstEnabledTab = tabs.find((tab) => !tab.disabled);

  /*
   * Decide which tab should be selected initially.
   *
   * Example:
   *
   * <Tabs defaultTab="settings" />
   *
   * will open Settings initially.
   */
  const initialTab =
    tabs.find((tab) => tab.id === defaultTab && !tab.disabled)?.id ||
    firstEnabledTab?.id;

  // Stores the currently active tab.
  const [activeTab, setActiveTab] = useState(initialTab);

  /*
   * Store references to all tab buttons.
   *
   * We use refs for keyboard navigation so that
   * ArrowLeft / ArrowRight can move focus between tabs.
   */
  const tabRefs = useRef({});

  /*
   * When the active tab changes, make sure the active tab
   * receives focus when focus was moved programmatically.
   *
   * This is particularly useful for keyboard navigation.
   */
  useEffect(() => {
    tabRefs.current[activeTab]?.focus();
  }, [activeTab]);

  /*
   * Handle clicking a tab.
   */
  const handleTabClick = (tab) => {
    // Don't do anything if the tab is disabled.
    if (tab.disabled) {
      return;
    }

    setActiveTab(tab.id);
  };

  /*
   * Get only the tabs that can actually be selected.
   *
   * Disabled tabs are excluded from keyboard navigation.
   */
  const enabledTabs = tabs.filter((tab) => !tab.disabled);

  /*
   * Handle keyboard navigation.
   *
   * ArrowRight → next tab
   * ArrowLeft  → previous tab
   * Home       → first tab
   * End        → last tab
   */
  const handleKeyDown = (event, currentTabId) => {
    const currentIndex = enabledTabs.findIndex(
      (tab) => tab.id === currentTabId,
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();

        // % makes navigation circular.
        nextIndex = (currentIndex + 1) % enabledTabs.length;
        break;

      case "ArrowLeft":
        event.preventDefault();

        // + length prevents a negative number.
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;

      case "Home":
        event.preventDefault();

        nextIndex = 0;
        break;

      case "End":
        event.preventDefault();

        nextIndex = enabledTabs.length - 1;
        break;

      default:
        return;
    }

    const nextTab = enabledTabs[nextIndex];

    /*
     * Change active tab.
     *
     * Because activeTab is also used for aria-selected
     * and panel rendering, everything stays synchronized.
     */
    setActiveTab(nextTab.id);
  };

  /*
   * Find the currently active tab object.
   *
   * This gives us the content to render.
   */
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="tabs">
      {/* 
        TAB LIST

        role="tablist" tells screen readers that this
        container contains a group of tabs.
      */}
      <div className="tabsList" role="tablist" aria-label="Account settings">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                // Store the DOM reference for keyboard navigation.
                tabRefs.current[tab.id] = element;
              }}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              /*
               * aria-selected tells assistive technology
               * which tab is currently active.
               */
              aria-selected={isActive}
              /*
               * Connect the tab to its corresponding panel.
               */
              aria-controls={`panel-${tab.id}`}
              /*
               * Disabled tabs should not be selectable.
               */
              disabled={tab.disabled}
              /*
               * Only the active tab is in the normal tab order.
               *
               * This is a common accessible tabs pattern.
               */
              tabIndex={isActive ? 0 : -1}
              className={`tab ${isActive ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 
        TAB PANEL

        Only the active tab's content is rendered.
      */}
      {activeTabData && (
        <div
          id={`panel-${activeTabData.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTabData.id}`}
          className="tabPanel"
          tabIndex={0}
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export default Tab;
