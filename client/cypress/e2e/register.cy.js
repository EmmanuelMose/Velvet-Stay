
describe("Register Page", () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it("should display validation errors on empty submit", () => {
    cy.getDataTest('signup-submitbtn').click();

    cy.contains(/First name is required/i);
    cy.contains(/Last name is required/i);
    cy.contains(/Email is required/i);
    cy.contains(/Password is required/i);
    cy.contains(/Confirm password is required/i);
  });

  it("should show email format and password mismatch errors", () => {
    cy.getDataTest('signup-firstname').type('Emmanuel');
    cy.getDataTest('signup-lastname').type('Mose');
    cy.getDataTest('signup-email').type('emmanuelmose5@gmail'); 
    cy.getDataTest('signup-password').type('@Mose2022');
    cy.getDataTest('signup-confirmpassword').type('@Mose2021'); 
    cy.getDataTest('signup-submitbtn').click();

    cy.contains(/Enter a valid email/i);
    cy.contains(/Passwords must match/i);
  });

  it("should register user with valid inputs", () => {
    cy.intercept('POST', '/auth/register', {
      statusCode: 201,
      body: {
        message: 'User created successfully',
        user: {
          firstName: 'Emmanuel',
          lastName: 'Mose',
          email: 'emmanuelmose7@gmail.com',
        },
      },
    }).as('registerUser');

    cy.getDataTest('signup-firstname').type('Emmanuel');
    cy.getDataTest('signup-lastname').type('Mose');
    cy.getDataTest('signup-email').type('emmanuelmose7@gmail.com');
    cy.getDataTest('signup-password').type('@Emmanuel2022');
    cy.getDataTest('signup-confirmpassword').type('@Emmanuel2022');
    cy.getDataTest('signup-submitbtn').click();

    cy.wait('@registerUser');
    cy.contains(/Registration successful/i).should('exist');
    cy.url().should('include', '/auth/verify');
  });

  it("should show error if passwords do not match", () => {
    cy.getDataTest('signup-firstname').type('Emmanuel');
    cy.getDataTest('signup-lastname').type('Mose');
    cy.getDataTest('signup-email').type('emmanuelmose1@gmail.com');
    cy.getDataTest('signup-password').type('@Mose2022');
    cy.getDataTest('signup-confirmpassword').type('@Wrong2022');
    cy.getDataTest('signup-submitbtn').click();

    cy.contains(/Passwords must match/i);
  });

  it("should navigate to login from register", () => {
    cy.contains('SignIn').click();
    cy.url().should('include', '/login');
  });
});
