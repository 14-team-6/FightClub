import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@frontend/src/services';
import { UserDTO } from '@frontend/src/services/types';
import { transformToUser } from '@frontend/src/utils/apiTransformers';
import { AuthError } from '@frontend/src/services/authService';
import { useDispatch } from 'react-redux';
import { createSetUserAction } from '@frontend/src/actionCreators/user/creators';

interface AuthContext {
  login: (user: User) => void,
  logout: () => void,
}

const authContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider ({ children }: any) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (userDetails: User) => {
    dispatch(createSetUserAction(userDetails));
    navigate('/');
  };

  const logout = () => {
    dispatch(createSetUserAction({}));
    navigate('/login');
  };

  useEffect(() => {
    authService.getUser()
      .then((userDTO: UserDTO | AuthError) => {
        if (!authService.isCookieInvalid(userDTO)) {
          dispatch(createSetUserAction(transformToUser(userDTO)));
        }
        setLoading(false);
      });
  }, []);

  return (
    <authContext.Provider value={{ login, logout }}>
      {!isLoading && children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
