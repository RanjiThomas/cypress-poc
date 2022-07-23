import * as url from "url";

class HotlistPage {

    constructor() {
        this.url = "#/hotlist";
    }

    get pageContainer() { return cy.get('app-hotlist') };
    spinner() { return cy.get('.modal-body .spinner') };
    actionButtons() { return cy.get('.action-buttons') };
    //     this.confirmChangeButton() { return cy.get('#confirmation-ok-btn') };

    // Heading
    // this.headingHotlist = this.pageContainer.get('#hotlist-heading');

    // Buttons
    // this.btnFilterToggle = this.pageContainer.get('#show-filter');
    get btnCreateHotlist() { return this.pageContainer.find('#create-hotlist') };
    get btnSaveChanges() { return this.pageContainer.find('#save-hotlist') };
    get btnSaveChangesDisabled() { return cy.get('#save-hotlist.disabled') };
    // Table
    get tableContainer() { return this.pageContainer.find('#hotlistTable') };
    // this.tableHeader1 = this.tableContainer.get('th:nth-child(1)');
    // this.tableHeader2 = this.tableContainer.get('th:nth-child(2)');
    // this.tableHeader3 = this.tableContainer.get('th:nth-child(3)');
    // this.tableHeader4 = this.tableContainer.get('th:nth-child(4)');
    // this.tableHeader5 = this.tableContainer.get('th:nth-child(5)');
    // this.tableHeader6 = this.tableContainer.get('th:nth-child(6)');

    // Table Filters
    // this.tableFilterContainer = this.tableContainer.get('tr.filters');
    // this.nameFilter = this.tableFilterContainer.get('#name-filter');
    // this.lastUpdatedFilter = this.tableFilterContainer.get('#last-updated-filter');
    // this.clearFilter = this.tableFilterContainer.get('a');

    get tableR1Container() { return this.tableContainer.find('tbody tr:nth-child(1)') };
    get tableR1NameInput() { return this.tableR1Container.find('td:nth-child(1) input') };
    get tableR1NameField() { return this.tableR1Container.find('td:nth-child(1) span') };
    get tableR1DescriptionInput() { return this.tableR1Container.find('td:nth-child(2) span') };
    get tableR1DescriptionField() { return this.tableR1Container.find('td:nth-child(2) input') };
    // this.tableR1HotlistEntryField = this.tableR1Container.get('td:nth-child(1) span');
    // this.tableR1ActionsMenu = this.tableR1Container.get('button');

    get tableNameEntries() { return cy.get('#hotlistTable tbody td:nth-child(4)') };
    get tableR2Container() { return this.tableContainer.find('tbody tr:nth-child(2)') };
    get tableR3Container() { return this.tableContainer.find('tbody tr:nth-child(3)') };


    tableName1() { return this.tableR1Container.find('td:nth-child(1)').invoke('text') };
    tableName2() { return this.tableR2Container.find('td:nth-child(1)').invoke('text')};
    tableText1() {
        const text = new Cypress.Promise<string>((resolve) => {
            cy.get('tbody tr:nth-child(1) td:nth-child(1)').text()
                .then((txt) => resolve(txt.toString()))
        });
        return text;
    };

    // this.tableName3 = this.tableR3Container.get('td:nth-child(1)');
    // this.tableR2Container = this.tableContainer.get('tbody tr:nth-child(2)');
    // this.tableR2HotlistEntryField = this.tableR2Container.get('td:nth-child(1) span');

    // Pagination Index
    // this.paginationIndex = cy.get('#paginationContent span:first-child');
    // this.pagination = cy.get('#paginationContent');

    // Pagination Controls
    // this.paginationControlsContainer = cy.get('#paginationButtons');
    // this.paginationButton = this.paginationControlsContainer.get('button');
    // this.pageSize = this.paginationControlsContainer.get('.results-per-page select option:checked');
    // this.gotoPreviousPageButton = cy.get('#previous-page-navigation');
    // this.gotoPreviousPageButtonDisabled = cy.get('#prev-page-navigation.disabled');
    // this.gotoNextPageButton = cy.get('#next-page-navigation');
    // this.gotoNextPageButtonDisabled = cy.get('#next-page-navigation.disabled');

    // Profile Menu
    profileMenuContainer() { return cy.get('#right-options') };
    profileMenuToggle() { return cy.get('#right-options a.dropdown-toggle') };
    profileMenuLogout() { return cy.get('#right-options ul.dropdown-menu a') };

    footer() { return cy.get('#falconx-footer') };
    actionColumn() { return cy.get('#column-Actions') };

    testDataSetup() {
        cy.log("************ TEST DATA SETUP ************")
        let hotlistNames = ['A','B','C','D','E']
        cy.log('Creating test data for Hotlist');
        hotlistNames.forEach( (item) => {
            let hotlistName = 'TestList' + item;
            // try {
                this.tableR1Container().contains(hotlistName).then( $x => {
                    if ($x.length = 0 ) {
                        this.btnCreateHotlist().click()
                            .wait(500)
                            .then(() => {
                                this.tableR1NameInput().type(hotlistName);
                                this.tableR1DescriptionInput().click();
                                this.tableR1DescriptionField().type("Test Hotlist " + Date.now());
                                this.btnSaveChanges()
                                    .click()
                                    .wait(3000);
                            });
                    }
                });
        });
    }
    getTRRowCount() {
        let count;
        let rows = cy.$$('#hotlistTable tbody tr')
        count = rows.length;
        return count;
    }
    go() {
        cy.once('uncaught:exception', () => false);
        cy.origin(this.GATEWAY_URL, ()=>{
            cy
                .visit('/')
                .wait(3000);
        });
        cy
            .visit(this.url)
            .wait(8000);
    }
}

export default new HotlistPage();