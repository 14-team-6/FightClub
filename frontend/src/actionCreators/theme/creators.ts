import { ThemeActions } from '@frontend/src/actionCreators/theme/actions';
import { defaultTheme, Theme, ThemeActionType } from '@frontend/src/reducers/theme';

export const setCurrentTheme = (settings: Theme): ThemeActionType => (
  {
    type: ThemeActions.SET_CURRENT_THEME,
    payload: { ...defaultTheme, ...settings },
  }
);
