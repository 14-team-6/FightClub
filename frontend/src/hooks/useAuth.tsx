import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContext {
  user: User | null,
  login: (user: User) => void,
  logout: () => void,
  profile: (user: User) => void,
}

const authContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider ({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (userDetails: User) => {
    setUser(userDetails);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const profile = (userDetails: User) => {
    setUser(userDetails);
    navigate('/profile');
  };

  return (
    <authContext.Provider value={{
      user, login, logout, profile,
    }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
