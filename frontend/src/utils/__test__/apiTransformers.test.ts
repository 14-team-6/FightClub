import { transformToUser } from '@frontend/src/utils/apiTransformers';
import '@testing-library/jest-dom';

const testData = {
  id: 1,
  login: 'string',
  first_name: 'string',
  second_name: 'string',
  display_name: 'string',
  avatar: 'string',
  phone: 'string',
  email: 'string',
};

describe('apiTransformers', () => {
  it('should transform model', () => {
    const result = transformToUser(testData);

    expect(result)
      .toEqual({
        id: 1,
        avatar: 'string',
        displayName: 'string',
        email: 'string',
        firstName: 'string',
        secondName: 'string',
        login: 'string',
        phone: 'string',
      });
  });
});
