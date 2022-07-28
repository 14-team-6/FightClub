import { ThemeActions } from '@frontend/src/actionCreators/theme/action';
import { PayloadAction } from '@frontend/src/actionCreators/models/action';
import { transformToThemeData } from '@frontend/src/utils/apiTransformers';
import { themeDefaultState } from '@frontend/src/reducers/defaultState/theme';
import { ThemeDataDTO } from '../services/types';

type ThemeAction = PayloadAction<ThemeActions.SET_THEME, ThemeDataDTO>;

// eslint-disable-next-line @typescript-eslint/default-param-last
function themeReducer(state: ThemeData = transformToThemeData(themeDefaultState), action: ThemeAction): ThemeData {
  switch (action.type) {
    case ThemeActions.SET_THEME:
      return {
        ...transformToThemeData(action.payload),
      };
    default:
      return state;
  }
}

export default themeReducer;
