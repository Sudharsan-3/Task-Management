import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
} from 'react';

interface User {
  id?: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | string | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User | string }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { user: null };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch({ type: 'LOGIN', payload: storedToken });
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
