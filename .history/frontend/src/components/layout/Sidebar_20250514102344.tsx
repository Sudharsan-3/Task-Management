import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  FaTh, FaTasks, FaUsers, FaChartBar, FaCog, FaUserCircle,
  FaChevronLeft, FaChevronRight, FaBars, 
} from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setIsSidebarOpen(!mobile);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: '/', name: 'Welcome', icon: <FaTh /> },
    
   
    { path: '/adminpage', name: 'Admin Page', icon: <FaCog />, auth: true },
    
    { path: '/tasks', name: 'Tasks', icon: <FaTasks />, auth: true },
    { path: '/getAllusers', name: 'All Users', icon: <FaUsers />, auth: true },
    { path: '/taskStatus', name: 'Task Status', icon: <FaChartBar />, auth: true },
    { path: '/addTasks', name: 'Add Tasks', icon: <FaTasks />, auth: true },
    { path: '/profile', name: 'Profile', icon: <FaUserCircle />, auth: true },
  ];

  const data = localStorage.getItem("user")
  console.log(data,"sidebar")
  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-all duration-300 z-40
          ${isMobile ? (isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden') : isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && !isMobile && <h2 className="text-xl font-bold">Task Manager</h2>}
          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-full hover:bg-gray-700"
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {menuItems.map((item) => {
              if (item.auth && !user) return null;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center p-3 rounded-lg transition-colors
                      ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}
                      ${isCollapsed && !isMobile ? 'justify-center' : ''}
                    `}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <span className={`${isCollapsed && !isMobile ? '' : 'mr-3'}`}>{item.icon}</span>
                    {!isCollapsed && !isMobile && <span className="truncate">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-700">
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <FaUserCircle className="text-2xl" />
            </div>
            {!isCollapsed && !isMobile && user && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">{user.name || 'User'}</p>
                <p className="text-xs text-gray-400 truncate">{user.email || 'user@example.com'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
