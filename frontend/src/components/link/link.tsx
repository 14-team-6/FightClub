import React, { AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MAIN_FONT_SIZE } from '../../../consts/styles';

const StyledLink = styled(Link)`
  text-align: center;
  color: ${({ theme }) => theme.colors.mainRed};
  text-shadow:
    2px 2px 2px ${({ theme }) => theme.colors.mainYellow},
    -2px 2px 2px ${({ theme }) => theme.colors.mainYellow},
    2px -2px 2px ${({ theme }) => theme.colors.mainYellow},
    -2px -2px 2px ${({ theme }) => theme.colors.mainYellow};
  font-size: ${MAIN_FONT_SIZE};
  text-decoration: none;

  &:hover,
  &:focus {
    text-shadow: 0 2px 0 ${({ theme }) => theme.colors.mainRed};

    &::before {
      font-size: ${MAIN_FONT_SIZE};
      color: ${({ theme }) => theme.colors.mainYellow};
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
