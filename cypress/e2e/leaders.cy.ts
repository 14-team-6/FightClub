const leadersResponse = [
  {
    'data': {
      'id': 5255,
      'name': 'cypress10',
      'score': 83944,
      'teamName': 'vegas14'
    }
  },
  {
    'data':
      {
        'id': 17, 'name': 'HamsterSpb', 'score': 51838, 'teamName': 'vegas14'
      }
  },
  {
    'data': {
      'id': 10545,
      'name': 'adan02202',
      'score': 10000,
      'teamName': 'vegas14'
    }
  },
  {
    'data': {'id': 977, 'name': 'dr666', 'score': 400, 'teamName': 'vegas14'}
  }
]

describe('leaders page', () => {
  it ('should display leaders page and sort names and scores', () => {

    cy.intercept({
      method: 'POST',
      url: '/api/v2/leaderboard/vegas14',
      hostname: 'ya-praktikum.tech',
    }, {
      statusCode: 200,
      body: leadersResponse,
    });

    // @ts-ignore
    cy.clearCookies({ domain: null });

    cy.visit('http://fightclub.lo:9001/');
    cy.get('[data-cy="login"]').type('catfight19');
    cy.get('[data-cy="password"]').type('qqqQQQqqqQQQ111');
    cy.get('[data-cy="submit"]').click();
    cy.wait(1000);
    cy.visit('http://fightclub.lo:9001/results');

    cy.get('[data-cy="leaders-title"]').should('exist');
    cy.wait(1000);

    cy.get('[data-cy="leaders-item-login"]')
      .then((data) => {
        const leadersFromDOM = Array.from(data).map(x => x.innerText);
        expect([...leadersFromDOM]).to.not.deep.equal(leadersFromDOM.sort());
      });

    cy.get('[data-cy="sort-login"]').click();

    cy.get('[data-cy="leaders-item-login"]')
      .then((data) => {
        const leadersFromDOM = Array.from(data).map(x => x.innerText);
        expect([...leadersFromDOM]).to.deep.equal(leadersFromDOM.sort());
      });
  });
});
