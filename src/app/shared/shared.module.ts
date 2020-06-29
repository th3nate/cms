import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FilterTextboxModule} from './filter-textbox/filter-textbox.module';
import {PaginationModule} from './pagination/pagination.module';

import {CapitalizePipe} from './pipes/capitalize.pipe';
import {TrimPipe} from './pipes/trim.pipe';
import {SortByDirective} from './directives/sortby.directive';
import {MaterialModule} from './material.module';
import {OrderModule} from './order/order.module';

@NgModule({
    imports     : [CommonModule, FormsModule, FilterTextboxModule, PaginationModule, OrderModule, MaterialModule, ReactiveFormsModule],
    exports     : [CommonModule, FormsModule, CapitalizePipe, TrimPipe, SortByDirective,
        FilterTextboxModule, PaginationModule, OrderModule, MaterialModule, ReactiveFormsModule],
    declarations: [CapitalizePipe, TrimPipe, SortByDirective]
})
export class SharedModule {
}
