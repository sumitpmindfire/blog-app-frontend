import Button from "components/Button";

describe("button component tests", () => {
  it("mounts the button", () => {
    cy.mount(<Button>Test button</Button>);
  });

  it("disabled button cannot be clicked", () => {
    cy.mount(<Button disabled>Test button</Button>);
    cy.get("button").should("have.attr", "disabled");
  });
});
