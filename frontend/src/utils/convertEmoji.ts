// eslint-disable-next-line max-len
export const convertEmoji = (emoji: string) => String.fromCodePoint(parseInt(emoji.replace('U', ''), 16));
