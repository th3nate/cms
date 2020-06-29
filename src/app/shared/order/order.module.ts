import {NgModule} from '@angular/core';
import {OrderComponent} from './order.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {TrackByService} from '../../core/services/trackby.service';

@NgModule({
    imports     : [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports     : [OrderComponent],
    declarations: [OrderComponent],
    providers   : [TrackByService]
})
export class OrderModule {
}
