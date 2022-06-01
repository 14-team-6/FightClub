import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../button/button';

const MenuItemsWrapper = styled.div`
  display: flex;
`;

export interface MenuItem {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
}

interface MenuItemsProps {
  items: MenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }) => {
  return (
    <MenuItemsWrapper>
      {items.map(({ text, action }) => {
        return (
        <Button
          key={text}
          text={text}
          onClick={action}/>
        );
      })}
    </MenuItemsWrapper>
  );
};

export default MenuItems;
