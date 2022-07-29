import styled from 'styled-components';
import {  MAIN_FONT_SIZE } from '@frontend/consts/styles';

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
    text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainBlue};
    border: none;
    color: ${({ theme }) => theme.colors.mainYellow};
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 10px;
    display: flex;
    position: relative;
  }

  li a::before {
    content: "";
    text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainRed};
    width: 15px;
    display: block;
    position: absolute;
    left: -15px;
  }

  li a:hover,
  li a:focus {
    text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainRed};

    &::before {
      content: "*";
      font-size: ${MAIN_FONT_SIZE};
      color: ${({ theme }) => theme.colors.mainYellow};
    }
  }
`;

export default NavList;
