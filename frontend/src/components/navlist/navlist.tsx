import styled from 'styled-components';
import {
  MAIN_FONT_SIZE, MAIN_BLUE, MAIN_YELLOW, MAIN_RED,
} from '@frontend/consts/styles';

const NavList = styled.ul`
  margin: 30px 0;

  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li a {
    font-size: ${MAIN_FONT_SIZE};
    background-color: transparent;
    text-shadow: 0 2px 0 ${MAIN_BLUE};
    border: none;
    color: ${MAIN_YELLOW};
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 10px;
    display: flex;
    position: relative;
  }

  li a::before {
    content: "";
    text-shadow: 0 2px 0 ${MAIN_RED};
    width: 15px;
    display: block;
    position: absolute;
    left: -15px;
  }

  li a:hover,
  li a:focus {
    text-shadow: 0 2px 0 ${MAIN_RED};

    &::before {
      content: "*";
      font-size: ${MAIN_FONT_SIZE};
      color: ${MAIN_YELLOW};
    }
  }
`;

export default NavList;
