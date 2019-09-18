import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RECAPTCHA_LANGUAGE, RecaptchaModule } from 'ng-recaptcha';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/app.module';
import { PageRoutingModule } from './pages.routing.module';

import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error/error-page.component';
import { HelpComponent } from './help/help.component';
import { CertificateComponent } from './certificate/certificate.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CourseComponent } from './course/course.component';
import { RecoverPassComponent } from './recoverpass/recoverpass.component';
import { OfflineComponent } from './offline/offline.component';

import { PagesService } from './pages.service';
import { UserService } from '@shared/services/user.service';
import { RecoverPassService } from './recoverpass/recoverpass.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
		HomeComponent,
		ErrorPageComponent,
		HelpComponent,
		CertificateComponent,
		TimeAgoPipe,
		LoginComponent,
		PrivacyComponent,
		CatalogComponent,
		CourseComponent,
		RecoverPassComponent,
		OfflineComponent,
		LogoutComponent
	],
  imports: [
		MaterialModule,
    CommonModule,
		PageRoutingModule,
		FormsModule,
		RecaptchaModule.forRoot()
  ],
	providers: [
		PagesService,
		UserService,
		RecoverPassService,
		{
			provide: RECAPTCHA_LANGUAGE,
			useValue: 'es-419'
		}
	]
})
export class PagesModule { }
