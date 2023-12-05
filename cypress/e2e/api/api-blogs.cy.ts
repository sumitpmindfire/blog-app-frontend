import Ajv from "ajv";

const ajv = new Ajv();

const blogJsonSchema = {
  title: "Generated schema for Root",
  type: "object",
  properties: {
    createdBy: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
      },
      required: ["userId"],
    },
    _id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
    category: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
    __v: {
      type: "number",
    },
  },
  required: [
    "createdBy",
    "_id",
    "title",
    "content",
    "category",
    "createdAt",
    "updatedAt",
    "__v",
  ],
};

describe("blog API tests", () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.task("getStore").then((newBlogData) => {
      const user = Cypress.env("user");
      cy.request({
        url: `/blog/${newBlogData.newBlogId}/delete`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    });
  });

  it("get all blogs", () => {
    const user = Cypress.env("user");
    cy.request({
      url: "/blogs",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then((response) => {
      cy.wrap(response).its("status").should("eq", 200);
      cy.wrap(response).its("body").should("have.a.property", "blogs");
    });
  });

  /**
   * should create a new blog
   */
  it("create new blog", () => {
    const user = Cypress.env("user");
    cy.request({
      url: "/blogs",
      method: "POST",
      body: {
        title: `[test-${new Date().getTime()}] blog title`,
        content: "blog content",
        category: "FOOD",
      },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then((response) => {
      cy.wrap(response).its("status").should("eq", 201);
      console.log("response", response);
      const newBlogId = { newBlogId: response.body.newBlog._id };
      cy.task("setStore", newBlogId);
    });
  });

  /**
   * should get blog details
   */
  it("get blog details", function () {
    const user = Cypress.env("user");
    cy.task("getStore").then((newBlogData) => {
      cy.request({
        url: `/blogs/${newBlogData.newBlogId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }).then((response) => {
        cy.wrap(response).its("status").should("eq", 200);
        cy.wrap(response)
          .its("body")
          .then((responseBody) => {
            const validate = ajv.compile(blogJsonSchema);
            return validate(responseBody.blogDetails);
          })
          .should("be.true");
      });
    });
  });
});
