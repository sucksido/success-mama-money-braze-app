import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InboxButtonComponent } from '../components/inbox-button/inbox-button.component';

@NgModule({
  declarations: [InboxButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [InboxButtonComponent],
})
export class SharedModule {}
