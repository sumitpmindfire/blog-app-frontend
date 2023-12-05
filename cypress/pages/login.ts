class Login {
  elements = {
    usernameField: () => cy.get("[data-testid=usernameField]"),
    passwordField: () => cy.get("[data-testid=passwordField]"),
    submitButton: () => cy.get("[data-testid=loginSubmitBtn]"),
  };
}

export default new Login();
