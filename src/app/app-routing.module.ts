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
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { DeliveryTimeComponent } from './components/pages/delivery-time/delivery-time.component';
import { PagesComponent } from './components/pages/pages.component';
import { UserComponent } from './components/user/user.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { ReturnsReplacementsComponent } from './components/pages/returns-replacements/returns-replacements.component';

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
  { path: 'account', component: UserComponent, children: [
    { path: 'registrazione', component: RegistrationComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
  ]},
  { path: 'pages', children: [
    { path: 'contatti', component: ContactsComponent},
    { path: 'tempi-di-consegna-e-costi', component: DeliveryTimeComponent},
    { path: 'resi-e-sostituzioni', component: ReturnsReplacementsComponent},
    { path: '', pathMatch: 'full', component: NotFoundComponent},
  ]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
