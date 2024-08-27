import { Routes } from '@angular/router';
import { LandingComponent } from './public/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SimpleLayoutComponent } from './core/components/layouts/simple-layout/simple-layout.component';
import { PricingComponent } from './public/pricing/pricing.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { PageBuilderComponent } from './user/page-builder/page-builder.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactComponent } from './public/contact/contact.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CartComponent } from './public/cart/cart.component';
import { CheckoutComponent } from './public/checkout/checkout.component';

// Import your Admin components
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './admin/components/user-management/user-list/user-list.component';
import { OrderListComponent } from './admin/components/order-management/order-list/order-list.component';
import { CardTypeComponent } from './user/card-type/card-type.component';
import { UserLandingPageComponent } from './user/user-landing/user-landing.component';
import { PublicLayoutComponent } from './core/components/layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './core/components/layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './core/components/layouts/admin-layout/admin-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: LandingComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'user/:id/landing', component: UserLandingPageComponent }, // Dynamic route with user ID
    ],
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: SimpleLayoutComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user-dashboard', component: UserDashboardComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'page-builder', component: PageBuilderComponent },
      { path: 'card-type', component: CardTypeComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'orders', component: OrderListComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
