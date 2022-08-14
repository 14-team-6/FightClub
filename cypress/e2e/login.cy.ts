describe('Login page', () => {

  it('should open page', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });
    cy.visit('http://fightclub.lo:9001/login');
  });

  it('should login with valid credentials', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });
    cy.visit('http://fightclub.lo:9001/login');
    cy.get('[data-cy="login"]').type('catfight19');
    cy.get('[data-cy="password"]').type('qqqQQQqqqQQQ111');
    cy.get('[data-cy="submit"]').click();

    cy.wait(1000);

    cy.get('[data-cy="logout"]').should('exist');
  });

  it('should not login with bad credentials', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });
    cy.visit('http://fightclub.lo:9001/login');
    cy.get('[data-cy="login"]').type('catfight19');
    cy.get('[data-cy="password"]').type('badpassword');
    cy.get('[data-cy="submit"]').click();

    cy.wait(1000);

    cy.get('[data-cy="login-error"]').should('be.visible');
  });

  it('should open registration page', () => {
    // @ts-ignore
    cy.clearCookies({ domain: null });
    cy.visit('http://fightclub.lo:9001/login');
    cy.get('[data-cy="register"]').click();

    cy.wait(1000);

    cy.url().should('include', 'registration');
  });
})
