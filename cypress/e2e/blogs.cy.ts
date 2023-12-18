describe("Blog", () => {
  const getIframeBody = () => {
    return cy
      .get('iframe[data-testid="iframe"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap);
  };

  it.only("iframe loads", () => {
    cy.visit("http://localhost:3000/blogs");
    getIframeBody()
      .find("#run-button")
      .then((el) => el["0"].click());
  });

  it("renders blog page", () => {
    cy.visit("http://localhost:3000/blogs");
    cy.contains("Blogs");
  });

  it("loads blogs", () => {
    cy.intercept("GET", "/blogs*").as("getBlogs");
    cy.visit("http://localhost:3000/blogs").then(() => {
      cy.wait("@getBlogs").its("response.statusCode").should("eq", 200);
    });
  });

  it("loads blog details", () => {
    cy.intercept(
      "GET",
      `${Cypress.config("baseUrl")}/blogs/656ed85ca6c899e8ca2b79a5`,
      {
        fixture: "getBlogDetails",
      }
    ).as("getBlogDetails");

    cy.visit("http://localhost:3000/blogs/656ed85ca6c899e8ca2b79a5").then(
      () => {
        cy.wait("@getBlogDetails").then((response) => {
          cy.wrap(response).its("response.statusCode").should("eq", 200);
        });
      }
    );
  });
});
