import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { DetailComponent } from './components/products/detail/detail.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ResultComponent } from './components/products/result/result.component';
import { CartComponent } from './components/products/cart/cart.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { DeliveryTimeComponent } from './components/pages/delivery-time/delivery-time.component';
import { PagesComponent } from './components/pages/pages.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { ReturnsReplacementsComponent } from './components/pages/returns-replacements/returns-replacements.component';



@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HeaderComponent,
    ProductsComponent,
    HomeComponent,
    FooterComponent,
    ProductCardComponent,
    DetailComponent,
    ProductsListComponent,
    RegistrationComponent,
    NewProductComponent,
    UserComponent,
    LoginComponent,
    ProfileComponent,
    ResultComponent,
    CartComponent,
    ContactsComponent,
    DeliveryTimeComponent,
    PagesComponent,
    NotFoundComponent,
    ReturnsReplacementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    RatingModule,
    ImageModule,
    MessagesModule,
    PaginatorModule,
    HttpClientModule,
    ToastModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
