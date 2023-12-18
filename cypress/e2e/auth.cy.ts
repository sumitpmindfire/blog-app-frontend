import loginPage from "../pages/login";

describe("auth", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept({
      method: "POST",
      url: "/login",
    }).as("loginApi");

    cy.visit("http://localhost:3000/login").then(() => {
      loginPage.elements.usernameField().type("username4");
      loginPage.elements.passwordField().type("password");
      loginPage.elements.submitButton().click();
      cy.wait("@loginApi").its("response.statusCode").should("eq", 200);
      cy.url().should("contain", "/blogs");
    });
  });

  it("logs out on 401", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/blogs*",
      },
      {
        statusCode: 401,
      }
    ).as("getBlogsApi");

    cy.wait("@getBlogsApi").then(() => {
      cy.url().should("include", "/login");
    });
  });
});
