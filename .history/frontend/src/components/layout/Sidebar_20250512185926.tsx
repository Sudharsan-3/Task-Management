import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaTh, 
  FaTasks, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

type MenuItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
};

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const datas:string = localStorage.getItem("user")

  console.log()
  

  const menuItems: MenuItem[] = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaTh className="text-lg" /> },
    { path: '/tasks', name: 'Tasks', icon: <FaTasks className="text-lg" /> },
    { path: '/users', name: 'Users', icon: <FaUsers className="text-lg" /> },
    { path: '/reports', name: 'Reports', icon: <FaChartBar className="text-lg" /> },
    { path: '/settings', name: 'Settings', icon: <FaCog className="text-lg" /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`
        fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        flex flex-col z-50 shadow-lg
      `}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-xl font-bold">Task Manager</h2>}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center p-3 rounded-lg transition-colors
                  ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <span className={`${isCollapsed ? '' : 'mr-3'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <FaUserCircle className="text-2xl" />
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="font-medium truncate">{datas.}</p>
              <p className="text-xs text-gray-400 truncate">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;