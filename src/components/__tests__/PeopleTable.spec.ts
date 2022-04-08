import { mount } from '@cypress/vue'
import PeopleTable from '../PeopleTable.vue'

describe('PeopleTable', () => {
  it('playground', () => {
    mount(PeopleTable, { props: { list: [] } })
  })

  // it('renders properly', () => {
  //   mount(PeopleTable, { props: { msg: 'Hello Cypress' } })
  //   cy.get('h1').should('contain', 'Hello Cypress')
  // })
})
