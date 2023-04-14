import { NewProductComponent } from './components/products/new-product/new-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/products/detail/detail.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsComponent } from './components/products/products.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ResultComponent } from './components/products/result/result.component';
import { LoggedInGuard } from './logged-in.guard';
import { CartComponent } from './components/products/cart/cart.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DeliveryTimeComponent } from './components/delivery-time/delivery-time.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'prodotti', component: ProductsComponent, children: [
    { path: 'dettaglio/:title/:_id', component: DetailComponent},
    { path: 'nuovo-prodotto', component: NewProductComponent, canActivate: [LoggedInGuard]},
    { path: 'cerca/:testo', component: ResultComponent},
    { path: '', pathMatch: 'full', component: ProductsListComponent}
  ]},
  { path: 'cart', component: CartComponent },
  { path: 'registrazione', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
  { path: 'contatti', component: ContactsComponent},
  { path: 'tempi-di-consegna-e-costi', component: DeliveryTimeComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
