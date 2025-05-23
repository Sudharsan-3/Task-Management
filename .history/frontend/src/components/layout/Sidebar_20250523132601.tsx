import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  FaTh, FaTasks, FaUsers, FaChartBar, FaCog, FaUserCircle,
  FaChevronLeft, FaChevronRight, FaBars
} from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (val: boolean) => void }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const clickHandel = ()=>{
    navia
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  const data = localStorage.getItem("user");
  const value = data ? JSON.parse(data) : null;

  let menuItems:string[]|any[] = [];

  if (value?.role === "admin") {
    menuItems = [
      { path: '/', name: 'Welcome', icon: <FaTh /> },
      { path: '/adminpage', name: 'Admin Page', icon: <FaCog /> },
      { path: '/tasks', name: 'Tasks', icon: <FaTasks /> },
      { path: '/getAllusers', name: 'All Users', icon: <FaUsers /> },
      // { path: '/taskStatus', name: 'Task Status', icon: <FaChartBar /> },
      { path: '/addTasks', name: 'Add Tasks', icon: <FaTasks /> },
      { path: '/profile', name: 'Profile', icon: <FaUserCircle /> },
    ];
  } else if (value?.role === "user") {
    menuItems = [
      { path: '/', name: 'Welcome', icon: <FaTh /> },
      { path: '/userPage', name: 'User Page', icon: <FaCog /> },
      { path: '/userDataPage', name: 'Tasks', icon: <FaTasks /> },
      { path: '/user-tasks-completed', name: 'Completed', icon: <FaChartBar /> },
      { path: '/profile', name: 'Profile', icon: <FaUserCircle /> },
    ];
  }

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
      )}

      <div
  
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg z-40 transition-all duration-300
          flex flex-col
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

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {menuItems.map((item) => (
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
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
            <div onClick={clickHandel} className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <FaUserCircle className="text-2xl" />
            </div>
            {!isCollapsed && !isMobile && user && (
              <div className="ml-3 overflow-hidden">
                <p onClick={clickHandel} className="font-medium truncate">{user.name}</p>
                <p onClick={clickHandel} className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
