import React, { useState } from 'react';
import ButtonElement from '@frontend/src/components/button/button';
import NavList from '@frontend/src/components/navlist/navlist';
import { useThemes } from '@frontend/src/pages/options/hooks/useThemes';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeData } from '@frontend/src/selectors/theme';
import { createSetThemeAction } from '@frontend/src/actionCreators/theme/creators';
import { ThemeItem } from '@frontend/src/services/types';
import { themeService } from '@frontend/src/services/themeService';

const ThemeList: React.FC = () => {
  const themes = useThemes();
  const dispatch = useDispatch();

  const current = useSelector(selectThemeData);
  const [active, setActive] = useState(current.id);

  const setTheme = (themeData: ThemeData | {}) => {
    document.cookie = `theme=${JSON.stringify(themeData)}`;
    dispatch(createSetThemeAction(themeData));
  };

  const setSelected = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.classList.toggle('active');
    const themeId: string = event.currentTarget.dataset.id ?? '0';
    themeService.setTheme(themeId)
      .then((themeData: ThemeData) => {
        setTheme(themeData);
        setActive(parseInt(themeId, 10));
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
