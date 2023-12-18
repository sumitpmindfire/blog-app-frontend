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

const getHeaders = () => {
  const user = Cypress.env("user");
  return user
    ? {
        Authorization: `Bearer ${user.accessToken}`,
      }
    : {};
};

describe("blog API tests", () => {
  it("get all blogs", () => {
    cy.request({
      url: "/blogs",
      headers: {
        ...getHeaders(),
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
    cy.request({
      url: "/blogs",
      method: "POST",
      body: {
        title: `[test-${new Date().getTime()}] blog title`,
        content: "blog content",
        category: "FOOD",
      },
      headers: {
        ...getHeaders(),
      },
    }).then((response) => {
      cy.wrap(response).its("status").should("eq", 201);
      const newBlogId = { newBlogId: response.body.newBlog._id };
      cy.task("setStore", newBlogId);
    });
  });

  /**
   * should get blog details
   */
  it("get blog details", function () {
    cy.task("getStore").then((newBlogData) => {
      cy.request({
        url: `/blogs/${newBlogData.newBlogId}`,
        method: "GET",
        headers: {
          ...getHeaders(),
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

  /**
   * delete the created blog
   *
   */
  it("deletes the blog", () => {
    cy.task("getStore").then((newBlogData) => {
      cy.request({
        url: `/blog/${newBlogData.newBlogId}/delete`,
        method: "POST",
        headers: {
          ...getHeaders(),
        },
      }).then((response) => {
        cy.wrap(response).its("status").should("eq", 200);
      });
    });
  });
});
