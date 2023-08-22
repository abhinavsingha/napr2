import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportComponent } from './Reports/report/report.component';
import { AuthGuard } from './services/authGuard/auth-guard.guard';
import { OutboxComponent } from './outbox/outbox.component';
import { PetTypeReportComponent } from './Reports/pet-type-report/pet-type-report.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: 'outbox', component: OutboxComponent, canActivate: [AuthGuard] },
  { path: 'manage-society', component: ManageSocietyComponent, canActivate: [AuthGuard] },
  { path: 'manage-manager', component: ManageManagerComponent, canActivate: [AuthGuard] },
  { path: 'all-user', component: AllUserComponent, canActivate: [AuthGuard] },
  { path: 'approved', component: ApprovedComponent, canActivate: [AuthGuard] },
  { path: 'rejected', component: RejectedComponent, canActivate: [AuthGuard] },
  { path: 'view-form', component: ViewFormComponent, canActivate: [AuthGuard] },
  { path: 'raise-complaint', component: RaiseComplaintComponent, canActivate: [AuthGuard] },
  { path: 'view-complaint', component: ViewComplaintComponent, canActivate: [AuthGuard] },
  { path: 'manage-notification', component: ManageNotificationComponent, canActivate: [AuthGuard] },
  { path: 'manage-sector', component: ManageSectorComponent, canActivate: [AuthGuard] },
  { path: 'manage-village', component: ManageVillageComponent, canActivate: [AuthGuard] },
  { path: 'manage-breeds', component: ManageBreedsComponent, canActivate: [AuthGuard] },
  { path: 'complaint-history', component: ComplaintHistoryComponent, canActivate: [AuthGuard] },
  { path: 'change-passowrd', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'pet-type-report', component: PetTypeReportComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
