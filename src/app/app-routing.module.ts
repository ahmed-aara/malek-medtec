import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { ShopComponent } from './page/shop/shop.component';
import { ContactUsComponent } from './page/contact-us/contact-us.component';
import { AboutComponent } from './page/about/about.component';
import { DetailComponent } from './page/detail/detail.component';
import { LoginDashboardComponent } from './admin/login-dashboard/login-dashboard.component';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { IsNotLoginService } from './services/auth-guard/is-not-login.service';
import { IsLoginService } from './services/auth-guard/is-login.service';
import { IsAdminService } from './services/auth-guard/is-admin.service';
import { ProductComponent } from './admin/product/product.component';
import { CartComponent } from './page/cart/cart.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:category/:type', component: ShopComponent },
  { path: 'shop/:category/:type/:id', component: ShopComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent, canActivate: [IsNotLoginService] },
  { path: 'register', component: RegisterComponent, canActivate: [IsNotLoginService] },
  { path: 'admin/login', component: LoginDashboardComponent, canActivate: [IsNotLoginService] },
  {
    path: 'admin', component: ControlPanelComponent, canActivate: [IsLoginService, IsAdminService],
    children: [
      // { path: 'setting', component: SettingComponent },
      { path: 'product', component: ProductComponent },
      // { path: 'messages', component: MessagesComponent },
      // { path: 'order', component: OrdersComponent },
      // { path: 'category', component: CategoryComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
