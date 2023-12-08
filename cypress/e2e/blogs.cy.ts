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
});
