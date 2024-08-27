// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
// import { UserDetailComponent } from './components/user-management/user-detail/user-detail.component';
import { OrderListComponent } from './components/order-management/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-management/order-detail/order-detail.component';
import { AdminGuard } from '../guards/admin.guard';


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent }, // Link for dashboard
      { path: 'users', component: UserListComponent },            // Link for user list
      { path: 'orders', component: OrderListComponent },          // Link for order list
      { path: 'orders/:id', component: OrderDetailComponent },    // Detailed order view
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}