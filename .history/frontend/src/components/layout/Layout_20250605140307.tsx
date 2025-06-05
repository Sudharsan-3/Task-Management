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
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    <div className="flex-1 min-h-screen overflow-y-auto p-4 md:p-6">
      {children}
    </div>
  </div>
  
  );
};

export default Layout;

