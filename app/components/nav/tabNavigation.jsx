import { Tabs, Icon } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "@remix-run/react";
import appConfig from "../../config/app";

const { IDENTIFIER_PREFIX } = appConfig;

function TabIcon({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
      {children}
    </div>
  );
}

const TabNavigation = ({ menuData }) => {
  const [selected, setSelected] = useState();
  const [isChanging, setIsChanging] = useState(false);
  const pageClass = appConfig.fullWidthPageLayout ? 'Polaris-Page Polaris-Page--fullWidth' : 'Polaris-Page';

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    menuData.forEach((tab, index) => {
      if (location.pathname.includes(`${tab.destination}`)) {
        setSelected(index);
      }
    });
  }, [location, menuData]);

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      navigate(`${menuData[selectedTabIndex].destination}`);
      shopify.loading(true);
      setIsChanging(true);
      setSelected(selectedTabIndex);
      setTimeout(() => setIsChanging(false), 100);
    },
    [menuData],
  );

  const generateTabsData = (tabs) => {
    let tempTabs = [];
    tabs.forEach((tab) => {
      tempTabs.push({
        id: `${IDENTIFIER_PREFIX} ${tab.label}`,
        content: (
          <TabIcon>
            {tab.icon && <Icon source={tab.icon} color="base" />}
            {tab.label}
          </TabIcon>
        ),
        badge: tab?.badge && tab.badge,
        accessibilityLabel: `Main ${tab.label}`,
        panelID: IDENTIFIER_PREFIX + `${tab.label}-content`,
      });
    });
    return tempTabs;
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className={pageClass}>
        <Tabs
          tabs={generateTabsData(menuData)}
          selected={selected}
          onSelect={handleTabChange}
          disclosureText="More views"
        ></Tabs>
      </div>
    </div>
  );
};

export default TabNavigation;
