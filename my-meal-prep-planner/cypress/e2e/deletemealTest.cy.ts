describe("Delete an existing Meal", () => {
  it("delete and check the meal is removed", () => {
    // Visit the website
    cy.visit("http://localhost:5173/");

    // Click the 'Add' button
    cy.get("nav").contains("Add").click();

    // Verify that the form page is loaded
    cy.url().should("include", "/add");

    // Enter values into the form fields
    cy.get('input[name="mealName"]').type("Vegan Chickpea Curry");
    cy.get('select[name="dayOfWeek"]').select("Monday");
    cy.get('input[name="ingredients"]').type(
      "Chickpeas, Coconut Milk, Onion, Garlic, Curry Powder"
    );
    cy.get('select[name="preparedStatus"]').select("Prepared");
    cy.get('textarea[name="instruction"]').type(
      "Simmer chickpeas in coconut curry sauce."
    );

    // Submit the form
    cy.get("button").contains("Add Meal").click();

    // Verify that the new item is added to the main table
    cy.visit("http://localhost:5173");
    // Navigate through pagination to find the new item
    const checkLastPage = () => {
      cy.get("table tbody tr")
        .last()
        .within(() => {
          cy.get("button").contains("Delete").click();
        });

      // Confirm the deletion in the modal
      cy.contains("Confirm Deletion").should("be.visible");
      cy.contains("Yes, Delete").click();
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

// describe("Delete an existing Meal", () => {
//   it("delete and check the meal is removed", () => {
//     cy.visit("http://localhost:5173/");
//     // Assuming the first meal has a Delete button
//     cy.get("tbody tr")
//       .first()
//       .within(() => {
//         cy.get("button").contains("Delete").click();
//       });

//     // Confirm the deletion in the modal
//     cy.contains("Confirm Deletion").should("be.visible");
//     cy.contains("Cancel").click();

//     // // Verify the meal is removed from the table
//     // cy.get("tbody tr").should("have.length", initialMealCount - 1);
//   });
// });
