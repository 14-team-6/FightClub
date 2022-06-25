import React from 'react';
import renderer from 'react-test-renderer';
import { BlackPageLayout } from '../blackPage';

describe('black page layout should render', () => {
  it('should render', () => {
    const tree = renderer
      .create(<BlackPageLayout/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
