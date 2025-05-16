import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { AuthContext } from "."

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = () => {
      if (isOpen) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <header className="bg-blue-100 text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <img className="h-10" src="../src/assets/task_management_icon.png" alt="Task Manager" />
          <Link to="/"> <span>Daily Tasks</span></Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-300 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-300 transition">About</Link>
          <Link to="/tasks" className="hover:text-blue-300 transition">Tasks</Link>
          {token ? (
            <User onClick={goToProfile} className="cursor-pointer hover:text-blue-500" />
          ) : (
            <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
          )}
        </nav>

        <button className="md:hidden text-white focus:outline-none bg-blue-500" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`absolute top-16 left-0 w-full bg-blue-600 shadow-md transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col text-center py-4 space-y-4">
          <Link to="/" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/tasks" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Tasks</Link>
          {token ? (
            <span onClick={goToProfile} className="hover:bg-blue-700 py-2 cursor-pointer">Profile</span>
          ) : (
            <Link to="/login" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;


// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X, UserCircle } from "lucide-react";

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const toggleMenu = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="bg-blue-100 text-black shadow-md">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         {/* Logo */}
//         <div className="flex items-center gap-3 text-xl font-semibold">
//           <img className="h-10" src="../src/assets/task_management_icon.png" alt="Task Manager" />
//           <Link to="/"><span>Daily Tasks</span></Link>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-6">
//           <Link to="/" className="hover:text-blue-300 transition">Home</Link>
//           <Link to="/about" className="hover:text-blue-300 transition">About</Link>
//           <Link to="/tasks" className="hover:text-blue-300 transition">Tasks</Link>
//           {user ? (
//             <button onClick={() => navigate("/profile")}>
//               <UserCircle className="w-7 h-7 text-blue-600 hover:text-blue-800" />
//             </button>
//           ) : (
//             <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
//           )}
//         </nav>

//         {/* Mobile menu toggle */}
//         <button className="md:hidden text-white focus:outline-none bg-blue-500" onClick={toggleMenu}>
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       <div
//         className={`absolute top-16 left-0 w-full bg-blue-600 shadow-md transform transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:hidden`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <nav className="flex flex-col text-center py-4 space-y-4">
//           <Link to="/" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Home</Link>
//           <Link to="/about" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>About</Link>
//           <Link to="/tasks" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Tasks</Link>
//           {user ? (
//             <>
//               <Link to="/profile" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Profile</Link>
//               <button className="hover:bg-blue-700 py-2" onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button>
//             </>
//           ) : (
//             <Link to="/login" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

  
//   useEffect(() => {
//     const handleOutsideClick = () => {
//       if (isOpen) setIsOpen(false);
//     };
//     document.addEventListener("click", handleOutsideClick);
//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [isOpen]);

//   const toggleMenu = (e: React.MouseEvent) => {
//     e.stopPropagation(); 
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="bg-blue-100 text-black shadow-md">
//       <div className="container mx-auto flex items-center justify-between p-4">
        
//         <div className="flex items-center gap-3 text-xl font-semibold">
//           <img className="h-10" src="../src/assets/task_management_icon.png" alt="Task Manager" />
//          <Link to="/"> <span >Daily Tasks</span></Link> 
//         </div>

       
//         <nav className="hidden md:flex gap-6 ">
//           <Link to="/" className="hover:text-blue-300 transition">Home</Link>
//           <Link to="/about" className="hover:text-blue-300 transition">About</Link>
//           <Link to="/tasks" className="hover:text-blue-300 transition">Tasks</Link>
//           <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
//         </nav>

       
//         <button className="md:hidden text-white focus:outline-none bg-blue-500"  onClick={toggleMenu}>
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

     
//       <div
//         className={`absolute top-16 left-0 w-full bg-blue-600 shadow-md transform transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:hidden`}
//         onClick={(e) => e.stopPropagation()} 
//       >
//         <nav className="flex flex-col text-center py-4 space-y-4">
//           <Link to="/" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Home</Link>
//           <Link to="/about" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>About</Link>
//           <Link to="/tasks" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Tasks</Link>
//           <Link to="/login" className="hover:bg-blue-700 py-2" onClick={() => setIsOpen(false)}>Login</Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
