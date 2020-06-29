import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    OnInit
} from '@angular/core';

import {DataService} from '../core/services/data.service';
import {ICustomer, IOrder, IOrderDialog, IPagedResults} from '../shared/interfaces';
import {TrackByService} from '../core/services/trackby.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GrowlerMessageType, GrowlerService} from '../core/growler/growler.service';

@Component({
    selector   : 'cm-customers-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    customers: ICustomer[];
    products: IOrder[];
    totalRecords = 0;
    pageSize     = 5;
    orderForm: FormGroup;

    constructor(private dataService: DataService,
                public trackbyService: TrackByService,
                private growler: GrowlerService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getProducts();
        this.getCustomersPage(1);
    }

    pageChanged(page: number) {
        this.getCustomersPage(page);
    }

    getCustomersPage(page: number) {
        this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
                .subscribe((response: IPagedResults<ICustomer[]>) => {
                    this.totalRecords = response.totalRecords;
                    this.customers    = response.results;
                });
    }

    getProducts(): void {
        this.dataService.getProducts()
                .subscribe((response: IOrder[]) => {
                    this.products = response;
                });
    }

    async lazyLoadOrderComponent(): Promise<ComponentFactory<unknown>> {
        const {OrderComponent} = await import('../shared/order/order.component');
        return this.componentFactoryResolver.resolveComponentFactory(OrderComponent);
    }

    async addOrder(customer: ICustomer): Promise<void> {
        const component = await this.lazyLoadOrderComponent();

        const dialogRef = this.dialog.open(component.componentType, {
            data: {
                form        : this.orderForm,
                products    : this.products,
                customerName: customer.firstName + ' ' + customer.lastName
            } as IOrderDialog
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(async (result): Promise<FormGroup> => {
            if (!result) {
                this.initForm(); // reset form after cancel
                return;
            }
            customer.orders     = this.mergeCustomerOrders(result.controls.selectedProducts.value, customer.orders); // update orders
            customer.orderTotal = this.calcCurrentCustomerOrders(customer.orders); // calculate the new orders total
            this.updateCustomer(customer); // update the customer for persistence
        });
        console.log('Lazy loaded modal with order component');
    }

    calcCurrentCustomerOrders(orders: IOrder[]): number {
        return this.dataService.calculateOrdersaTotal(orders);
    }

    mergeCustomerOrders(newProducts: IOrder[], currentPoducts: IOrder[] = [] as IOrder[]): IOrder[] {
        return Array.prototype.concat.apply(newProducts, currentPoducts);
    }

    updateCustomer(customer: ICustomer): void {
        this.dataService
                .updateCustomer(customer)
                .subscribe((status: boolean) => {
                    if (status) {
                        this.initForm(); // reset form after save
                        this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
                    } else {
                        const msg = 'Unable to update customer';
                        this.growler.growl(msg, GrowlerMessageType.Danger);
                    }
                }, (err: any) => console.log(err));

    }

    initForm(): void {
        this.orderForm = new FormGroup({
            selectedProducts: new FormControl('', [Validators.required])
        });
    }

}
