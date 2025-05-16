import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../components";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-100 text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 text-xl font-semibold">
          <img
            className="h-10"
            src="/assets/task_management_icon.png"
            alt="Task Manager"
          />
          <Link to="/">
            <span>Daily Tasks</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500 transition">
            About
          </Link>
          <Link to="/tasks" className="hover:text-blue-500 transition">
            Tasks
          </Link>
          {user ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-blue-600"
              >
                <UserCircle className="w-7 h-7 text-blue-600 hover:text-blue-800" />
              </button>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-500 transition text-sm"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white bg-blue-500 p-1 rounded"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`absolute top-16 left-0 w-full bg-blue-600 shadow-md transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col text-center py-4 space-y-4 text-white">
          <Link
            to="/"
            className="hover:bg-blue-700 py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:bg-blue-700 py-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/tasks"
            className="hover:bg-blue-700 py-2"
            onClick={() => setIsOpen(false)}
          >
            Tasks
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:bg-blue-700 py-2"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                className="hover:bg-blue-700 py-2"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:bg-blue-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

// import  { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "./Context/AuthContext";

// const Header = () => {
//   const { user, dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/login");
//   };

//   return (
//     <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold text-indigo-600">
//         Tamil Wedding App
//       </Link>

//       <nav className="flex items-center gap-4">
//         {user ? (
//           <>
//             <span className="text-gray-700">
//               Welcome, <strong>{user.name}</strong> ({user.role})
//             </span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link
//             to="/login"
//             className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition"
//           >
//             Login
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;


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
