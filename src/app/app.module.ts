import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FooterComponent } from './component/footer/footer.component';
import { IncludePipe } from './pipe/include.pipe';
import { ShopComponent } from './page/shop/shop.component';
import { ConvertToLinkPipe } from './pipe/convert-to-link.pipe';
import { SplitPipe } from './pipe/split.pipe';
import { ContactUsComponent } from './page/contact-us/contact-us.component';
import { AboutComponent } from './page/about/about.component';
import { DetailComponent } from './page/detail/detail.component';
import { ProductComponent } from './page/dashboard/product/product.component';
import { LoginDashboardComponent } from './admin/login-dashboard/login-dashboard.component';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { StoreModule } from '@ngrx/store';
import { cartCountReducer, cartReducer, totalReducer } from './redux/data.reducers';
import { CartComponent } from './page/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavBarComponent,
    FooterComponent,
    IncludePipe,
    ShopComponent,
    ConvertToLinkPipe,
    SplitPipe,
    ContactUsComponent,
    AboutComponent,
    DetailComponent,
    ProductComponent,
    LoginDashboardComponent,
    ControlPanelComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot(
      {
        cart: cartReducer,
        total: totalReducer,
        cart_count: cartCountReducer,
      }
    ),
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
