import {browser, by, element} from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/orders');
    }

    getParagraphText() {
        return element(by.tagName('h3')).getText();
    }

    getAddOrderButton() {
        return element.all(by.buttonText('Add Order')).first();
    }

    getOpenModalElement() {
        return element(by.tagName('mat-dialog-container'));
    }

    getOpenModalHeadingElement() {
        return element(by.css('mat-dialog-container h2'));
    }

    getOpenModalFormElement() {
        return element(by.css('mat-dialog-container form'));
    }

    getOpenModalSelectboxElement() {
        return element(by.css('mat-dialog-container form mat-select'));
    }

    getOpenModalCancelButtonElement() {
        return element(by.buttonText('Cancel'));
    }

    getOpenModalSaveButtonElement() {
        return element(by.buttonText('Save'));
    }

}
