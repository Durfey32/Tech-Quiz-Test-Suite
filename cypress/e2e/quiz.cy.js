describe('Quiz Component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it ('should begin with the quiz and the question one should appear', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('.card').should('be.visible');
        cy.get('h2').should('be.visible');
    });

    it ('should answer question one', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('button').contains('2').click();
    });

    it ('should complete the entire quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        for(let i = 0; i < 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('.card').contains('Quiz Completed');
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    });

    it ('should start the quiz over after answering the last question', () => {
        cy.get('button').contains('Start Quiz').click();
        for(let i = 0; i < 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('.card').contains('Quiz Completed');
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
        cy.get('button').contains('Take New Quiz').should('be.visible');
        cy.get('button').contains('Take New Quiz').click();
        cy.get('h2').should('be.visible');
    });
});

