describe('register page', () => {

  const goodData = [
    ['register-firstname', 'catfighter10'],
    ['register-secondname', 'catfighter11'],
    ['register-login', 'catfighter12'],
    ['register-email', 'catfighter10@main.cn'],
    ['register-password', 'qqqQQQqqqQQQ111'],
    ['register-phone', '87778887788'],
  ];

  const badData = [
    ['register-firstname', 'catfr10'],
    ['register-secondname', 'catfighter11'],
    ['register-login', 'catfighter12'],
    ['register-email', 'catfighter10@'],
    ['register-password', 'qqqQQQqqqQQQ'],
    ['register-phone', '87778887788'],
  ];

  const getUserResponseBody = {
    'id': 5255,
    'first_name': 'cat',
    'second_name': 'fight',
    'display_name': 'catfight19',
    'login': 'catfight19',
    'avatar': null,
    'email': 'catfight19@main.cn',
    'phone': '888777666555'
  };

  it ('should register with good data', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });

    cy.intercept({
      method: 'POST',
      url: '/api/v2/auth/signup',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: {
        id: 58454,
      },
    });

    cy.visit('http://fightclub.lo:9001/registration');

    goodData.map(x => cy.get(`[data-cy="${x[0]}"`).type(x[1]));

    cy.intercept({
      method: 'GET',
      url: '/api/v2/auth/user',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: getUserResponseBody,
    });

    cy.get('[data-cy="register-submit"]').click();
    cy.url().should('equal', 'http://fightclub.lo:9001/');

  });
  it ('should not register with bad data', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });

    cy.intercept({
      method: 'POST',
      url: '/api/v2/auth/signup',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: {
        id: 58454,
      },
    });

    cy.visit('http://fightclub.lo:9001/registration');

    badData.map(x => cy.get(`[data-cy="${x[0]}"`).type(x[1]));

    cy.intercept({
      method: 'GET',
      url: '/api/v2/auth/user',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: getUserResponseBody,
    });

    cy.get('[data-cy="register-submit"]').click();
    cy.url().should('not.equal', 'http://fightclub.lo:9001/');
  });

  it ('should not register with no data', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });

    cy.intercept({
      method: 'POST',
      url: '/api/v2/auth/signup',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: {
        id: 58454,
      },
    });

    cy.visit('http://fightclub.lo:9001/registration');

    cy.intercept({
      method: 'GET',
      url: '/api/v2/auth/user',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: getUserResponseBody,
    });

    cy.get('[data-cy="register-submit"]').click();
    cy.url().should('not.equal', 'http://fightclub.lo:9001/');
  });
});
