describe('ui-card', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cardcomponent--primary'));
  it('should render the component', () => {
    cy.get('taormina-card').should('exist');
  });
});