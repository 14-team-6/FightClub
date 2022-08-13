import React, { Dispatch, useState } from 'react';
import ButtonElement from '@frontend/src/components/button/button';
import NavList from '@frontend/src/components/navlist/navlist';
import { useThemes } from '@frontend/src/pages/options/hooks/useThemes';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';
import { createSetThemeAction } from '@frontend/src/actionCreators/theme/creators';
import { ThemeItem } from '@frontend/src/services/types';
import { themeService } from '@frontend/src/services/themeService';
import { selectIsUserExists } from '@frontend/src/selectors/user';

const ThemeList: React.FC = () => {
  const themes = useThemes();
  const thunkDispatch = useDispatch();

  const current = useSelector(selectThemeData);
  const [active, setActive] = useState(current.id);

  const isUserExists: boolean = useSelector(selectIsUserExists);

  const setTheme = (themeId: string) => {
    document.cookie = `themeId=${themeId}`;
  };

  const setSelected = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.classList.toggle('active');
    const themeId: string = event.currentTarget.dataset.id ?? '0';

    // only for studying purposes -
    // for me there are better to use plain promises instead of thunks
    thunkDispatch((dispatch: Dispatch<any>) => {
      themeService.setTheme(themeId, isUserExists)
        .then((themeData: ThemeData) => {
          dispatch(createSetThemeAction(themeData));
          setTheme(themeId);
          setActive(parseInt(themeId, 10));
        });
    });
  };

  return (
    <NavList>
    {
    themes
      ? themes.map(
        (theme: ThemeItem) => <li key={theme.id}>
          <ButtonElement
            type="button"
            className={`${active === theme.id && 'active'}`}
            data-id={theme.id}
            text={theme.name}
            onClick={setSelected}
          />
        </li>,
      )
      : null
    }
  </NavList>
  );
};

export default ThemeList;
