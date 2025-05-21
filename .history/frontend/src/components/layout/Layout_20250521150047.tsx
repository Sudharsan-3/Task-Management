import { ReactNode, useState, useContext } from 'react';
import Sidebar from './Sidebar';
import { AuthContext } from '../Context/AuthContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  if (!user) {
    return <main className="p-4 h-screen overflow-y-auto bg-gray-100">{children}</main>;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`
          transition-all duration-300
          ${isCollapsed ? 'ml-20' : 'ml-64'}
          flex-1
        `}
      >
        <main className="p-4 md:p-6 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

