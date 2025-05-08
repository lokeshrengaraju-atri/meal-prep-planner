describe("Edit an existing Meal", () => {
  it("edit and check the updated one", () => {
    // Visit the website
    cy.visit("http://localhost:5173/");
    // cy.get("tbody tr")
    //   .contains("Beef Tacos")
    //   .parent()
    //   .within(() => {
    //     cy.get("button").contains("Edit").click();
    //   });
    cy.get("button#edit").first().click();

    cy.get('input[name="mealName"]').clear().type("name");
    cy.get('select[name="dayOfWeek"]').select("Wednesday");
    cy.get('input[name="ingredients"]').clear().type("ingredients");
    cy.get('select[name="preparedStatus"]').select("Prepared");
    cy.get('textarea[name="instruction"]').clear().type("instruction");
    cy.contains("Save Changes").click();
    //

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("td").eq(1).should("contain.text", "name");
        cy.get("td").eq(2).should("contain.text", "Wednesday");
        cy.get("td").eq(3).should("contain.text", "ingredients");
        cy.get("td").eq(4).should("contain.text", "Prepared");
        cy.get("td").eq(5).should("contain.text", "instruction");
      });
    // cy.get("tbody tr")
    //   .contains("name")
    //   .parent()
    //   .within(() => {
    //     cy.contains("Wednesday").should("exist");
    //     cy.contains("ingredients").should("exist");
    //     cy.contains("preparedStatus").select("Prepared");
    //     cy.contains("instruction").type("instruction");
    //   });
    // should("exist");
  });
});
