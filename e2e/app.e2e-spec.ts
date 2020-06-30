import {AppPage} from './app.po';

describe('angular-jumpstart App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display orders title message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toContain('Orders');
    });

    it('should contain New order buttons', () => {
        page.navigateTo();
        expect(page.getAddOrderButton()).toBeDefined();
    });

    it('should open modal on button click', () => {
        page.navigateTo();
        page.getAddOrderButton().click();
        expect(page.getOpenModalElement()).toBeTruthy();
    });

    it('should show modal title', () => {
        page.navigateTo();
        page.getAddOrderButton().click();
        expect(page.getOpenModalHeadingElement().getText()).toContain('Add Order - ');
    });

    it('should contain modal form', () => {
        page.navigateTo();
        page.getAddOrderButton().click();
        expect(page.getOpenModalFormElement()).toBeTruthy();
    });

    it('should contain modal selectbox', () => {
        page.navigateTo();
        page.getAddOrderButton().click();
        expect(page.getOpenModalSelectboxElement()).toBeTruthy();
    });

    it('should have a cancel modal button', () => {
        page.navigateTo();
        page.getAddOrderButton().click();
        expect(page.getOpenModalCancelButtonElement()).toBeDefined();
    });

    it('should have a save modal button', () => {
        page.navigateTo();
        page.getAddOrderButton().click();
        expect(page.getOpenModalSaveButtonElement()).toBeDefined();
    });

});
