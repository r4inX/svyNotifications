import { notificationService } from './notification.service';
import { NgModule } from '@angular/core';
import { ServoyPublicModule } from '@servoy/public';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@NgModule({
    declarations: [
    ],
    providers: [
		notificationService,],
    imports: [
      ServoyPublicModule,
      CommonModule,
      FormsModule
    ],
    exports: [ 
      ]
})
export class notificationsModule {}