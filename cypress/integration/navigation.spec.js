describe("Navigation", () => {
  it("should login", () => {
    let position = 0;
    const squares = [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23];
    const chance = [3, 9, 15, 21];
    const go = [0, 12];
    const train = [6, 18];
    let bookPosition = 0;
    const books = ["Title"]
    let reviewPosition = 0;
    const reviews = ["Review"]

    cy.visit("/");

    cy.get(".users").contains("Avvai").click();
    cy.get(".community-chest").click();
    cy.get('input[name=title]').type('New Game')
    cy.contains('Submit').click();

    var genArr = Array.from({length:250},(v,k)=>k+1)
    cy.wrap(genArr).each(() => {
      cy.get(".dice").click().then(() => console.log(position));
      cy.wait(3000).then(() => {
        position = (position + 5) % 24
        if (squares.includes(position)) {
          cy.get(".small-token").click({ force: true });
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
        // else if (chance.includes(position)) {
          
        // }
        // else if (go.includes(position)) {
          
        // }
        // else if (train.includes(position)) {
  
        // }
      })
    })
  });
});