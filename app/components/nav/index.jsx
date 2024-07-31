import appConfig from "../../config/app";
import SideNavigation from "./sideNavigation";
import TabNavigation from "./tabNavigation";

export default function Nav() {
  const { menuData, showSideNavigation, showTabNavigation } = appConfig;

  return (
    <>
      {showSideNavigation && <SideNavigation menuData={menuData} />}
      {showTabNavigation && <TabNavigation menuData={menuData} />}
    </>
  );
}
