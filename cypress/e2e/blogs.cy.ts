describe("Blog", () => {
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

  it.only("loads blog details", () => {
    console.log("log", Cypress.config("baseUrl"));
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
