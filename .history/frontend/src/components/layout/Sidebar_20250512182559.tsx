// src/components/Sidebar.tsx
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";



const AppSidebar = () => {
  return (
    <Sidebar breakPoint="md" backgroundColor="#f0f4ff">
      <Menu iconShape="circle">
        <MenuItem icon={<i className="fas fa-home"></i>}>
          Home
          <Link to="/" />
        </MenuItem>
        <MenuItem icon={<i className="fas fa-tasks"></i>}>
          Tasks
          <Link to="/tasks" />
        </MenuItem>
        <MenuItem icon={<i className="fas fa-info-circle"></i>}>
          About
          <Link to="/about" />
        </MenuItem>
        <MenuItem icon={<i className="fas fa-user-circle"></i>}>
          Profile
          <Link to="/profile" />
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
