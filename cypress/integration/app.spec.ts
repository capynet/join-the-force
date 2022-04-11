describe('Side selection', () => {
    it('Splash screen works', () => {
        cy.visit('/')
        cy.get('#app > :nth-child(3)').contains('Light side');
        cy.get('#app > :nth-child(4)').contains('Dark side');
    })
})
