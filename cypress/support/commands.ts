import credentials from "../config/credentials";

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

beforeEach(() => {
  // if auth tests are not running
  if (!Cypress.currentTest.titlePath[0].includes("auth")) {
    cy.intercept(`https://blog-app-express.onrender.com/*`, (req) => {
      const user = Cypress.env("user");
      req.headers["Authorization"] = `Bearer ${user.accessToken}`;
      req.continue();
    });

    cy.session(
      ["userSession"],
      () => {
        cy.request("POST", "/login", {
          username: credentials.username,
          password: credentials.password,
        }).then((resp) => {
          const user = resp.body;
          Cypress.env("user", user);
          cy.setCookie("user", JSON.stringify(user));
          // cy.intercept(`https://blog-app-express.onrender.com/*`, (req) => {
          //   req.headers["Authorization"] = `Bearer ${user.accessToken}`;
          //   req.continue();
          // });
        });
      },
      {
        validate: () => {
          let user = Cypress.env("user");
          if (!user) {
            cy.getCookie("user").then((cookieData) => {
              user = JSON.parse(cookieData.value);
              Cypress.env("user", user);
              cy.intercept(`https://blog-app-express.onrender.com/*`, (req) => {
                req.headers["Authorization"] = `Bearer ${user.accessToken}`;
                req.continue();
              });

              fetch(`${Cypress.config("baseUrl")}/blogs`);
            });
          } else {
            fetch(`${Cypress.config("baseUrl")}/blogs`);
          }
        },
      }
    );
  }
});
