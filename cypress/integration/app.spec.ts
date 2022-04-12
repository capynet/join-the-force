describe('Side selection', () => {
    it('Splash screen works', () => {
        cy.visit('/')
        cy.get('#app .btn-light').contains('Light side');
        cy.get('#app .btn-dark').contains('Dark side');
    })
})
