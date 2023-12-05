import loginPage from "../pages/login";

describe("login", () => {
  it("logs in", () => {
    cy.intercept({
      method: "POST",
      url: "/login",
    }).as("loginApi");

    cy.visit("http://localhost:3000/login").then(() => {
      loginPage.elements.usernameField().type("username4");
      loginPage.elements.passwordField().type("password");
      loginPage.elements.submitButton().click();
      cy.wait("@loginApi").its("response.statusCode").should("eq", 200);
    });
  });
});
