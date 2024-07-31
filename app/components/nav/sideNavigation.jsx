import { NavMenu } from "@shopify/app-bridge-react";
import { Link } from "@remix-run/react";
import appConfig from "../../config/app";

const { IDENTIFIER_PREFIX } = appConfig;

const SideNavigation = ({ menuData }) => {
  return (
    <NavMenu>
      {menuData.map((item) => (
        <Link
          key={`${IDENTIFIER_PREFIX} ${item.label}`}
          to={item.destination}
          rel={item.rel}
        >
          {item.label}
        </Link>
      ))}
    </NavMenu>
  );
};

export default SideNavigation;
