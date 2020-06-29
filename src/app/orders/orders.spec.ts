import {Component, NgModule} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderComponent} from '../shared/order/order.component';
import {ICustomer, IOrder, IOrderDialog} from '../shared/interfaces';
import {TrackByService} from '../core/services/trackby.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

describe('Orders Component', () => {
    const customers: ICustomer[] = require('../../../data/customers.json');
    const products: IOrder[]     = require('../../../data/products.json');

    const customerName: string = customers[0].firstName + ' ' + customers[0].lastName;
    const orderForm: FormGroup = new FormGroup({
        selectedProducts: new FormControl('', [Validators.required])
    });

    const config = {
        data: {
            form: orderForm,
            products,
            customerName
        } as IOrderDialog
    } as MatDialogConfig;

    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;
    let noop: ComponentFixture<NoopComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports  : [DialogTestModule],
            providers: [
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatSelectModule,
                MatInputModule,
                TrackByService,
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return {getContainerElement: () => overlayContainerElement};
                    }
                }
            ]
        });

        dialog = TestBed.get(MatDialog);

        noop = TestBed.createComponent(NoopComponent);

    });

    it('Modal - Open order dialog window and validate methods', () => {
        const dialogInstance = dialog.open(OrderComponent, config);

        expect(typeof dialog.open).toBe('function');
        expect(typeof dialogInstance.afterClosed).toBe('function');
    });

    it('Modal - Contain DOM elements according to design', () => {
        dialog.open(OrderComponent, config);

        noop.detectChanges(); // Updates the dialog in the overlay

        const h2     = overlayContainerElement.querySelector('#mat-dialog-title-0');
        const form   = overlayContainerElement.querySelector('form');
        const button = overlayContainerElement.querySelectorAll('button');

        expect(h2.textContent).toBe('Add Order - ' + customerName);
        expect(form).toBeDefined();
        expect(button[0].textContent).toBe('Cancel');
        expect(button[1].textContent).toBe('Save');
    });

    it('Modal - form invalid when empty', () => {
        expect(orderForm.valid).toBeFalsy();
    });

    it('Modal - form selectedProducts field validity', () => {
        let errors             = {};
        const selectedProducts = orderForm.controls['selectedProducts'];
        expect(selectedProducts.valid).toBeFalsy();

        // Email field is required
        errors = selectedProducts.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email to something
        selectedProducts.setValue([products[0]]);
        errors = selectedProducts.errors || {};
        expect(errors['required']).toBeFalsy();

    });

});

// Noop component is only a workaround to trigger change detection
@Component({
    template: ''
})
class NoopComponent {
}

const TEST_DIRECTIVES = [
    OrderComponent,
    NoopComponent
];

@NgModule({
    imports        : [MatDialogModule, NoopAnimationsModule],
    exports        : TEST_DIRECTIVES,
    declarations   : TEST_DIRECTIVES,
    entryComponents: [
        OrderComponent
    ],
})
class DialogTestModule {
}
