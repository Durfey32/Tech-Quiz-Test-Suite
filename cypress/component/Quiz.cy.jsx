import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('<Quiz />', () => {
    beforeEach(() => {
        cy.fixture('questions').then('questions');
            cy.intercept('GET', '**/questions', {
                statusCode: 200,
                body: questions,
            });
         });


    it('should begin with the quiz and display the first question', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').should('exist');
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').should('be.visible');
    });

    it('should answer a question and proceed to the next', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').contains('not.be.empty'); 
    });

    it("should complete each question in the quiz until it is finished", () => {
        cy.contains("Start Quiz").click();
    
        const totalQuestions = 10; 
        for (let i = 0; i < totalQuestions; i++) {
            cy.get("h2").should("not.be.empty"); 
            cy.get(".btn-primary").first().click(); 
        }
            cy.contains("Quiz Complete").should("be.visible");
        cy.get(".alert-success").should("contain", "Your score");
    });
});
    
