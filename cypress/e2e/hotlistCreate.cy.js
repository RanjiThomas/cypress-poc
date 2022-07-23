import hotlistPage from "../pages/hotlistPage";
const GATEWAY_URL = Cypress.config('baseUrl');
let firstRun = true;

describe('hotlist.hotlistCreation: Hotlist Page during Hotlist Creation', () => {

    before( ()=> {
        cy.login("hotlistadmin@fico.com", "@Fraud123456");
        cy.log("Creating Test Data");
        // hotlistPage.testDataSetup();
        firstRun = false;
        });

    beforeEach(()=>{
        cy.once('uncaught:exception', () => false);
        cy.login("hotlistadmin@fico.com", "@Fraud123456");
        cy.origin(GATEWAY_URL, () => {
            cy.visit('/#/hotlist').wait(10000);
        })
    });

    it('should make the first row editable after clicking Create Hotlist', () => {
        hotlistPage.btnCreateHotlist.click();
        hotlistPage.tableR1NameInput.should('be.visible');
        hotlistPage.tableR1DescriptionInput.should('be.visible');
    });

    it('should enable Save Changes button on adding valid Name', () => {
        hotlistPage.btnCreateHotlist.click()
            .then( ()=> {
                hotlistPage.btnSaveChangesDisabled.should('be.visible');
            });

        // Enter Valid Hotlist Name
        hotlistPage.tableR1NameInput.clear()
            .type('AutoTestCreateHotlist' + String.fromCharCode(Math.floor(65 + (Math.random() * 25))))
            .wait(500)
            .then( ()=> {
                // Validate that Save Changes button is enabled
                hotlistPage.btnSaveChanges.should('be.visible', "SaveChanges button enabled after valid Hotlist name");
                hotlistPage.btnSaveChangesDisabled.should('not.exist', "SaveChanges button is not disabled after valid Hotlist name");
            });
    });

    it('should not enable Save Changes button on adding invalid Names', () => {
        hotlistPage.btnCreateHotlist.click()
            .then(() => {
                hotlistPage.btnSaveChangesDisabled.should('be.visible', "Save changes button is not disabled");

                cy.log("Invalid Name 1: Empty hotlist name")
                // Enter empty Hotlist Name
                hotlistPage.tableR1NameInput.clear();

                // Validate that Save Changes button is disabled
                hotlistPage.btnSaveChangesDisabled.should('be.visible', "SaveChanges button enabled for Empty Hotlist name");

                // Enter numeric in Hotlist Name
                cy.log("Invalid Name 2: Hotlist name with numeric character")
                hotlistPage.tableR1NameInput.clear();
                hotlistPage.tableR1NameInput.type("Test@123");

                // Validate that Save Changes button is disabled
                hotlistPage.btnSaveChangesDisabled.should('be.visible', "SaveChanges button enabled for Hotlist name with numbers");

                // Enter duplicate Hotlist Name
                cy.log("Invalid Name 3: Duplicate hotlist name")

                //Test assumes TestListA already exists. Else get the existing entry from the second row.
                let existingHotlistName = "TestListA";//hotlistPage.tableText2();
                hotlistPage.tableR1NameInput.clear();
                hotlistPage.tableR1NameInput.type(existingHotlistName);

                // Validate that Save Changes button is disabled
                hotlistPage.btnSaveChangesDisabled.should('be.visible', "SaveChanges button enabled for duplicate Hotlist name");
            });
    });

    it('gets value',() => {

        let hotlistName;
        hotlistPage.tableName1().then(name => {
            cy.log("Existing hotlist name: " + name)
        });
        cy.log("Outer hotlist name: " + hotlistName)
    });

});