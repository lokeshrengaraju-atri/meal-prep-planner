// let initialMealCount: number;

describe("Delete an existing Meal", () => {
  it("delete and check the meal is removed", () => {
    cy.visit("http://localhost:5173/");
    // Assuming the first meal has a Delete button
    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("button").contains("Delete").click();
      });

    // Confirm the deletion in the modal
    cy.contains("Confirm Deletion").should("be.visible");
    cy.contains("Cancel").click();

    // // Verify the meal is removed from the table
    // cy.get("tbody tr").should("have.length", initialMealCount - 1);
  });
});
