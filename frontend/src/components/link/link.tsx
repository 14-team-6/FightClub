import React, { AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MAIN_FONT_SIZE, MAIN_RED, MAIN_YELLOW } from '../../../consts/styles';

const StyledLink = styled(Link)`
  text-align: center;
  color: ${MAIN_RED};
  text-shadow:
    2px 2px 2px ${MAIN_YELLOW},
    -2px 2px 2px ${MAIN_YELLOW},
    2px -2px 2px ${MAIN_YELLOW},
    -2px -2px 2px ${MAIN_YELLOW};
  font-size: ${MAIN_FONT_SIZE};
  text-decoration: none;

  &:hover,
  &:focus {
    text-shadow: 0 2px 0 ${MAIN_RED};

    &::before {
      font-size: ${MAIN_FONT_SIZE};
      color: ${MAIN_YELLOW};
    }
  }
`;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string,
  children: string | number
}

const LinkElement: React.FC<LinkProps> = ({
  to,
  children,
  ...props
}) => (
    <StyledLink {...props} to={to}>{children}</StyledLink>
);

export default React.memo(LinkElement);
