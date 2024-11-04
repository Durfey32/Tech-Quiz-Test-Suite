describe("Quiz E2E Test", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should begin with the quiz and display the first question", () => {
        cy.contains("Start Quiz").click();
        cy.get("h2").should("be.visible");
    });

    it("should answer a question and proceed to the next", () => {
        cy.contains("Start Quiz").click();
        cy.get("h2").invoke("text").then((initialQuestion) => {
            cy.get(".btn-primary").first().click();
            cy.get("h2").should(($newQuestion) => {
                expect($newQuestion.text()).not.to.eq(initialQuestion);
            });
        });
    });

    it("should complete each question in the quiz until it is finished", () => {
        cy.contains("Start Quiz").click();

        const totalQuestions = 10;
        for (let i = 0; i < totalQuestions; i++) {
            cy.get("h2").should("not.be.empty");
            cy.get(".btn-primary").first().click();
            cy.wait(500);
        }

        cy.contains("Quiz Complete").should("be.visible");
        cy.get(".alert-success").should("contain", "Your score");
        cy.contains("Take New Quiz").click();
        cy.get("h2").should("not.be.empty");
    });
});
