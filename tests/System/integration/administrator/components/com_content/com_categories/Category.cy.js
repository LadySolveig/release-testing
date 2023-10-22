describe('Test in backend that the category component', () => {
  beforeEach(() => {
    cy.doAdministratorLogin();
    // Clear the filter
    cy.visit('/administrator/index.php?option=com_categories&extension=com_content&filter=');
  });
  afterEach(() => cy.task('queryDB', "DELETE FROM #__categories WHERE title = 'Test category'"));

  it('can create a category', () => {
    cy.visit('/administrator/index.php?option=com_categories&task=category.add&extension=com_content');
    cy.get('#jform_title').should('exist').type('Test category');
    cy.clickToolbarButton('Save & Close');

    cy.get('#system-message-container').contains('Category saved.').should('exist');
    cy.contains('Test category');
  });

  it('can delete the test category', () => {
    // The category needs to be created through the form so proper assets are created
    cy.visit('/administrator/index.php?option=com_categories&task=category.add&extension=com_content');
    cy.get('#jform_title').type('Test category');
    cy.get('#jform_published').select('Trashed');
    cy.clickToolbarButton('Save & Close');
    cy.setFilter('published', 'Trashed');
    cy.searchForItem('Test category');
    cy.checkAllResults();
    cy.clickToolbarButton('empty trash');
    cy.get('.button-primary').click();
    cy.get('#system-message-container').contains('Category deleted.').should('exist');
  });
});
