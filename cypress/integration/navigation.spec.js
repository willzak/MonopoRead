describe("Navigation", () => {
  it("should login", () => {
    let bookPosition = 0;
    const books = ["Title"]
    let reviewPosition = 0;
    const reviews = ["Review"]

    cy.visit("/");

    cy.contains("Login").click();
    cy.contains("Marco").click();
    cy.visit("/");
    cy.get(".community-chest").click();
    cy.get('input[name=title]').type("Marco's Game")
    cy.contains('Submit').click();
    cy.wait(4000)
    cy.get(".small-token").click({ force: true });

    var genArr = Array.from({length:30},(v,k)=>k+1)
    cy.wrap(genArr).each(() => {
      cy.get(".dice").click();
      cy.wait(4000)
      cy.get(".small-token").click({ force: true });
      cy.url().then((response) => {
        if (response.includes('board/tiles')) {
          cy.contains('Completed').click();
          cy.get('input[name=title]').type(books[bookPosition % books.length]);
          bookPosition++;
          cy.get('textarea[name=review]').type(reviews[reviewPosition % reviews.length]);
          reviewPosition++;
          cy.contains(/^Submit$/).click();
          cy.get('.individual-congrats-header');
          cy.wait(4000)
          cy.get('.MuiSvgIcon-root').click();
        }
        else {
          cy.wait(4000)
        }
      })
    })
  });
});