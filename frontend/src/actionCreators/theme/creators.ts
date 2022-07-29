import { ThemeActions } from '@frontend/src/actionCreators/theme/action';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';

export function createSetThemeAction(theme: ThemeData | {}): PayloadAction<ThemeActions, ThemeData | {}> {
  return {
    type: ThemeActions.SET_THEME,
    payload: theme,
  };
}
