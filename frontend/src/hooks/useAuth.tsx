import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@frontend/src/services';
import { RequestError } from '@frontend/src/services/types';
import { useDispatch } from 'react-redux';
import { createSetUserAction } from '@frontend/src/actionCreators/user/creators';

interface AuthContext {
  login: (user: User) => void,
  logout: () => void,
  profile: (user: User) => void,
}

const authContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: any) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (userDetails: User) => {
    document.cookie = `user=${JSON.stringify(userDetails)}`;
    dispatch(createSetUserAction(userDetails));
    navigate('/');
  };

  const logout = () => {
    document.cookie = `user= ; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    dispatch(createSetUserAction({}));
    navigate('/login');
  };

  const profile = (userDetails: User) => {
    dispatch(createSetUserAction(userDetails));
    navigate('/profile');
  };

  useEffect(() => {
    authService.getUser()
      .then((user: User | RequestError) => {
        if (authService.isCookieInvalid(user)) {
          document.cookie = `user= ; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          dispatch(createSetUserAction({}));
        } else {
          document.cookie = `user=${JSON.stringify(user)}`;
          dispatch(createSetUserAction(user));
        }
        setLoading(false);
      });
  }, []);

  return (
    <authContext.Provider value={{
      login,
      logout,
      profile,
    }}>
      {!isLoading && children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
