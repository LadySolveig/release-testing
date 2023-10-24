describe('Test in backend that the menu list', () => {
  beforeEach(() => {
    cy.doAdministratorLogin();
    cy.visit('/administrator/index.php?option=com_menus&view=items&menutype=mainmenu');
  });

  it('has a title', () => cy.get('h1.page-title').should('contain.text', 'Menus: Items'));

  it('can create a menu item', () => {
    cy.db_createMenuItem({ title: 'Test menu item' }).then(() => {
      cy.reload();
      cy.contains('Test menu item');
    });
  });

  it('can delete the test menu item', () => {
    cy.db_createMenuItem({ title: 'Test menu item' }).then(() => {
      cy.searchForItem('Test menu item');
      cy.checkAllResults();
      cy.clickToolbarButton('Action');
      cy.contains('Trash').click();

      cy.get('#system-message-container').contains('Menu item trashed.').should('exist');
    });
  });
});
