import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  INPUT_BORDER_BLUE, NAV_FONT_SIZE, MAIN_RED, MAIN_YELLOW,
} from '../../../consts/styles';

const StyledLink = styled(Link)`
  font-family: Pixeboy, sans-serif;
  font-size: ${NAV_FONT_SIZE};
  background-color: transparent;
  text-shadow: 0 2px 0 ${INPUT_BORDER_BLUE};
  color: ${MAIN_YELLOW};
  margin: 15px 15px 0 15px;
  text-decoration: none;
  display: flex;
  position: relative;

  &:hover,
  &:focus {
    text-shadow: 0 2px 0 ${MAIN_RED};

    &::before {
      content: "*";
      font-size: ${NAV_FONT_SIZE};
      color: ${MAIN_YELLOW};
      width: 15px;
      display: block;
      position: absolute;
      left: -15px;
    }
  }
`;

export default StyledLink;
