import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const Tabs = ({ tabs }) => {
  const location = useLocation();

  // Extract tab ID from the URL hash
  const getActiveTabFromHash = () => {
    return location.hash ? location.hash.replace("#", "") : tabs[0].id;
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromHash());

  // Update tab when URL hash changes
  useEffect(() => {
    setActiveTab(getActiveTabFromHash());
  }, [location.hash]);

  return (
    <div className="w-full overflow-scroll">
      {tabs.map((tab) =>
        activeTab === tab.id ? (
          <div className="w-full" key={tab.id}>
            {tab.content}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Tabs;
