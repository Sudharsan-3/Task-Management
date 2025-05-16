import { ReactNode } from 'react';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const user = localStorage.getItem("user")



  return (
    {}
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-20 lg:ml-64 transition-all duration-300">
        <main className="p-4 md:p-6 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;


// import { ReactNode } from 'react';
// import Sidebar from './Sidebar';

// type LayoutProps = {
//   children: ReactNode;
// };

// const Layout = ({ children }: LayoutProps) => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 overflow-y-auto ml-20 lg:ml-64 transition-all duration-300">
//         <main className="p-4 md:p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;