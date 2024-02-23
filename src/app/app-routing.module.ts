import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { ShopComponent } from './page/shop/shop.component';
import { ContactUsComponent } from './page/contact-us/contact-us.component';
import { AboutComponent } from './page/about/about.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:category/:type', component: ShopComponent },
  { path: 'shop/:category/:type/:id', component: ShopComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
