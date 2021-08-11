import { NavLink } from "react-router-dom";
import routes, { RouteType } from "../../routes";
import layoutStyle from "../index.module.scss";

const Item = (props: any) => {
  const { name, path } = props;
  return (
    <NavLink
      className={layoutStyle.navlink}
      activeClassName={layoutStyle.active}
      to={path}
    >
      {name}
    </NavLink>
  );
};

const Menu = () => {
  return (
    <ul>
      {routes.map((route: RouteType, index: number) => {
        return (
          <li key={index}>
            <Item {...route} />
          </li>
        );
      })}
    </ul>
  );
};

const Sidebar = () => {
  return (
    <div className={layoutStyle.sidebar}>
      <h1>Sidebar</h1>
      <Menu />
    </div>
  );
};

export default Sidebar;
