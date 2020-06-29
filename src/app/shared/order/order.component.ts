import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IOrderDialog} from '../interfaces';
import {TrackByService} from '../../core/services/trackby.service';

@Component({
    selector   : 'cm-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent {

    constructor(
            public trackbyService: TrackByService,
            public dialogRef: MatDialogRef<unknown>,
            @Inject(MAT_DIALOG_DATA) public dialogData: IOrderDialog) {
    }

    dismissDialogData(): void {
        this.dialogRef.close(false);
    }

    saveDialogData(): void {
        this.dialogRef.close(this.dialogData.form);
    }

    // @ts-ignore
    get formIsValid(): boolean {
        return (this.dialogData.form.valid && !this.dialogData.form.pristine);
    }

}
