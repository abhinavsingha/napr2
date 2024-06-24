import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {LocationStrategy, HashLocationStrategy, DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { InboxComponent } from './inbox/inbox.component';
import { ManageSocietyComponent } from './Society/manage-society/manage-society.component';
import { ManageManagerComponent } from './Society/manage-manager/manage-manager.component';
import { AllUserComponent } from './all-user/all-user.component';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { RaiseComplaintComponent } from './Complaints/raise-complaint/raise-complaint.component';
import { ViewComplaintComponent } from './Complaints/view-complaint/view-complaint.component';
import { ComplaintHistoryComponent } from './Complaints/complaint-history/complaint-history.component';
import { ManageNotificationComponent } from './manage-notification/manage-notification.component';
import { ManageBreedsComponent } from './Settings/manage-breeds/manage-breeds.component';
import { ManageSectorComponent } from './Settings/manage-sector/manage-sector.component';
import { ManageVillageComponent } from './Settings/manage-village/manage-village.component';
import { HttpClientModule } from '@angular/common/http';
// import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportComponent } from './Reports/report/report.component';
import { PetTypeReportComponent } from './Reports/pet-type-report/pet-type-report.component';


import { OutboxComponent } from './outbox/outbox.component';
import { MailListSearchPipePipe } from './services/pipe/mailSearch/mail-list-search-pipe.pipe';
import { AllUserSearchPipe } from './services/pipe/mailSearch/all-user-search.pipe';
import { NotificationSearchPipe } from './services/pipe/notificationSearch/notification-search.pipe';
import { ComplaintSearchPipe } from './services/pipe/complaint/complaint-search.pipe';
import { SocietySearchPipe } from './services/pipe/society/society-search.pipe';
import { BreedSearchPipe } from './services/pipe/breed/breed-search.pipe';
import { SectorSearchPipe } from './services/pipe/sector/sector-search.pipe';
import { VillageSearchPipe } from './services/pipe/villagr/village-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    InboxComponent,
    ManageSocietyComponent,
    ManageManagerComponent,
    AllUserComponent,
    ApprovedComponent,
    RejectedComponent,
    ViewFormComponent,
    RaiseComplaintComponent,
    ViewComplaintComponent,
    ComplaintHistoryComponent,
    ManageNotificationComponent,
    ManageBreedsComponent,
    ManageSectorComponent,
    ManageVillageComponent,
    ChangePasswordComponent,
    ReportComponent,
    PetTypeReportComponent,
    OutboxComponent,
    MailListSearchPipePipe,
    AllUserSearchPipe,
    NotificationSearchPipe,
    ComplaintSearchPipe,
    SocietySearchPipe,
    BreedSearchPipe,
    SectorSearchPipe,
    VillageSearchPipe
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,{ provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
