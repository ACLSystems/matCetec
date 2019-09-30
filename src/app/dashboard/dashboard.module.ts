import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/app.module';
import { MdModule } from '@md/md.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { AccesoriesModule } from '@shared/accesories/accesories.module';

import { DashboardComponent } from './dashboard.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
		DashboardComponent,
		DemoComponent
	],
  imports: [
    CommonModule,
		DashboardRoutingModule,
		FormsModule,
		MaterialModule,
		MdModule,
		AccesoriesModule
  ]
})
export class DashboardModule { }
