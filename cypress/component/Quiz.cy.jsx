import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/api/questions/random'
        },
        {
            fixture: 'questions.json',
            statusCode: 200
        }).as('getRandomQuestion');
    })

    it ('should begin with the quiz and the question one should appear', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.get('.card').should('be.visible');
        cy.get('h2').contains('be.visible');
    });

    it ('should answer question one', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.get('button').contains('2').click();
        cy.get('h2').contains('Which of the following is a mutable data type in Python?');
    });

    it ('should start the quiz over after answering the last question', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.get('button').contains('2').click();
        cy.get('button').contains('3').click();
        cy.get('button').contains('3').click();
        cy.get('.card').contains('Quiz Completed');
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score is 3/3');
        cy.get('button').contains('Take New Quiz').should('be.visible');
        cy.get('button').contains('Take New Quiz').click();
        cy.get('h2').contains('Which is the output of print(2 ** 3)?');
    })
})