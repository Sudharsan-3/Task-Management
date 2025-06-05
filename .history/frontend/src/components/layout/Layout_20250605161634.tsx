import { ReactNode, useState, useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import { AuthContext } from '../Context/AuthContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) {
    return <main className="p-4 h-screen overflow-y-auto bg-gray-100">{children}</main>;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* ✅ Backdrop for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
  <div
    className="fixed inset-0 bg-transparent z-30"
    onClick={() => setIsSidebarOpen(false)}
  ></div>
)}


      <div
        className={`
          transition-all duration-300 flex-1
          ${isMobile ? '' : isCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        <main className="p-4 md:p-6 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
