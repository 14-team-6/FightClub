import { TextDecoder, TextEncoder } from 'util';
import React from 'react';
// eslint-disable-next-line import/first
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
// eslint-disable-next-line import/first
import { render } from '@testing-library/react';
// eslint-disable-next-line import/first
import { JSDOM } from 'jsdom';
// eslint-disable-next-line import/first
import LoginPageForm from '@frontend/src/components/loginPageForm/loginPageForm';

describe('black page layout should render', () => {
  beforeAll(() => {
    const template: string = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Чат</title>
        </head>
        <body>
            <div id="app"></div>
        </body>
        </html>`;

    const fakeDOM = new JSDOM(template);

    // eslint-disable-next-line no-console
    console.log(fakeDOM.window.document);
    (global as any).window = fakeDOM.window;
    (global as any).document = fakeDOM.window.document;
  });

  it('renders button without crashing', () => {
    render(<LoginPageForm/>);
  });
});
