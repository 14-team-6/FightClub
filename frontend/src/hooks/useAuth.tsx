import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@frontend/src/services';
import { useDispatch } from 'react-redux';
import { createSetUserAction } from '@frontend/src/actionCreators/user/creators';
import { userDefaultState } from '@frontend/src/reducers/user';

interface AuthContext {
  login: (user: User) => void,
  logout: () => void,
  profile: (user: User) => void,
}

const authContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: any) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (userDetails: User) => {
    document.cookie = `user=${JSON.stringify(userDetails)}`;
    dispatch(createSetUserAction(userDetails));
    navigate('/');
  };

  const logout = () => {
    document.cookie = 'user= ; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    dispatch(createSetUserAction(userDefaultState));
    navigate('/login');
  };

  const profile = (userDetails: User) => {
    dispatch(createSetUserAction(userDetails));
    navigate('/profile');
  };

  useEffect(() => {
    authService.getUser()
      .then((user: User) => {
        if (authService.isCookieInvalid(user)) {
          document.cookie = 'user= ; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          dispatch(createSetUserAction(userDefaultState));
        } else {
          document.cookie = `user=${JSON.stringify(user)}; path=/`;
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
