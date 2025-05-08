describe("Add Item", () => {
  it("should add a new item", () => {
    // Visit the website
    cy.visit("http://localhost:5173/");

    // Click the 'Add' button
    cy.get("nav").contains("Add").click();

    // Verify that the form page is loaded
    cy.url().should("include", "/add");

    // Enter values into the form fields
    cy.get('input[name="mealName"]').type("name");
    cy.get('select[name="dayOfWeek"]').select("Monday");
    cy.get('input[name="ingredients"]').type("ingredients");
    cy.get('select[name="preparedStatus"]').select("Prepared");
    // cy.get('input[name="preparedStatus"]').type("preparedStatus");
    cy.get('textarea[name="instruction"]').type("instruction");

    // Submit the form
    cy.get("button").contains("Add Meal").click();

    // Verify that the new item is added to the main table
    cy.visit("http://localhost:5173");
    // Navigate through pagination to find the new item
    const checkLastPage = () => {
      cy.get("table tbody tr")
        .last()
        .within(() => {
          cy.get("td").eq(1).should("contain.text", "name");
          cy.get("td").eq(2).should("contain.text", "Monday");
          cy.get("td").eq(3).should("contain.text", "ingredients");
          cy.get("td").eq(4).should("contain.text", "Prepared");
          cy.get("td").eq(5).should("contain.text", "instruction");
        });
    };

    // Loop to click 'Next' until the button is disabled
    const clickNextUntilDisabled = () => {
      cy.get("button")
        .contains("Next")
        .then(($btn) => {
          if (!$btn.is(":disabled")) {
            cy.wrap($btn).click();
            clickNextUntilDisabled();
          } else {
            checkLastPage();
          }
        });
    };
    clickNextUntilDisabled();
  });
});
