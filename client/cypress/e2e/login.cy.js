describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  

  it('should show password length error', () => {
    cy.get('input[type="email"]').type('emmanuelmose1@gmail.com');
    cy.get('input[type="password"]').type('123'); 
    cy.get('button[type="submit"]').click();

    
    cy.contains('Min 6 characters').should('exist');
  });

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: {
          email: 'emmanuelmose1@gmail.com',
          role: 'Admin',
        },
      },
    }).as('loginRequest');

    cy.get('input[type="email"]').clear().type('emmanuelmose1@gmail.com');
    cy.get('input[type="password"]').clear().type('@Mose2022');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.contains('Login successful!').should('exist');
    cy.url().should('include', '/admin/dashboard');
  });

  it('should show error message on failed login', () => {
    cy.intercept('POST', '/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginFail');

    cy.get('input[type="email"]').clear().type('wrong@example.com');
    cy.get('input[type="password"]').clear().type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.contains('Login failed. Please check your credentials and try again.').should('exist');
  });

  it('should navigate to register and home links', () => {
    cy.contains('SignUp').click();
    cy.url().should('include', '/register');

    cy.visit('/login');
    cy.contains('Back to Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
