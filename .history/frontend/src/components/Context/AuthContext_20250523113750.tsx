import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// Initialize context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => {},
});

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      return { user: null };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

// Auth context provider component
const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [state, dispatch] = useReducer(authReducer, {
    user: initialUser,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// import React, {
//   createContext,
//   useReducer,
//   useEffect,
//   ReactNode,
//   Dispatch,
// } from "react";

// interface User {
//   id?: string;
//   name?: string;
//   email?: string;
//   role?: string;
//   [key: string]: any;
// }

// interface AuthState {
//   user: User | null;
// }

// type AuthAction =
//   | { type: "LOGIN"; payload: User }
//   | { type: "LOGOUT" };

// interface AuthContextType extends AuthState {
//   dispatch: Dispatch<AuthAction>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   dispatch: () => {},
// });

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload };
//     case "LOGOUT":
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("id");
//       return {user:null};
     
//     default:
//       return state;
//   }
// };

// interface Props {
//   children: ReactNode;
// }

// const AuthContextProvider: React.FC<Props> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, { user: null });

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const parsedUser: User = JSON.parse(userData);
//       dispatch({ type: "LOGIN", payload: parsedUser });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;


