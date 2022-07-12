import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSetUserAction } from '@frontend/src/actionCreators/user/creators';
import store from '@frontend/src/store/store';

interface AuthContext {
  user: User | null,
  login: (user: User) => void,
  logout: () => void,
}

const authContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider ({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (userDetails: User) => {
    setUser(userDetails);
    store.dispatch(createSetUserAction(userDetails));
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
