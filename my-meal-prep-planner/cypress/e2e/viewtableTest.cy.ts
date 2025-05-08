describe("Main Page", () => {
  it("should display the table", () => {
    // check if it can load the page
    cy.visit("http://localhost:5173/");

    // Check if it has table
    cy.get("table").should("exist");

    // Verify that the table has rows
    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // Check if everyrow in the column in filled

    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row)
        .find("td")
        .each(($cell) => {
          // Ensure each cell is not empty
          cy.wrap($cell).should("not.be.empty");
        });
    });
  });
});
