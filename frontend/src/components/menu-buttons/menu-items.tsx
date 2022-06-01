import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../button/button';

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface MenuItem {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface MenuItemsProps {
  items: MenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }) => {
  return (
    <MenuItemsWrapper>
      {items.map(({ text, onClick }) => {
        return (
          <Button
            key={text}
            text={text}
            onClick={onClick}/>
        );
      })}
    </MenuItemsWrapper>
  );
};

export default MenuItems;
