import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_FONT_SIZE } from '@frontend/consts/styles';
import { convertEmoji } from '@frontend/src/utils/convertEmoji';

interface EmojiProps {
  onClick: (value: string) => void
}

const EmojiesWrapper = styled.div`

`;

const EmojiButton = styled.button`
  height: 45px;
  width: 45px;
  font-size: ${MAIN_FONT_SIZE};
  background-color: transparent;
  border: none;
  margin-right: 10px;
  cursor: pointer;
`;

const emojies: string[] = [
  'U+1F60D',
  'U+1F62D',
  'U+1F626',
  'U+1F621',
  'U+1F61C',
  'U+1F623',
];

const Emoji: FC<EmojiProps> = ({ onClick }) => (
    <EmojiesWrapper>
      {emojies.map((emoji) => {
        const convertedEmoji: string = convertEmoji(emoji);

        return <EmojiButton
          key={emoji}
          onClick={() => onClick(convertedEmoji)}
        >{convertedEmoji}</EmojiButton>;
      })}
    </EmojiesWrapper>
);

export default React.memo(Emoji);
