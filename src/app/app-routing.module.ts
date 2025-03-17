import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component'
import { SignInComponent } from './user/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from './user/template-form-controls/template-form-controls.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes : Routes = [
  {path:"home", component: HomeComponent , title:"Home - Joes Robot Shop"},
  {path:"catalog", component: CatalogComponent , title:"Catalog - Joes Robot Shop"},
  {path: "sign-in", component: SignInComponent , title:"Sign In - Joes Robot Shop"},
  {path:"cart", component: CartComponent , title:"Cart - Joes Robot Shop"},
  {path:"form-controls", component: TemplateFormControlsComponent},
  {path: "sign-up", component: SignUpComponent, title:"Sign Up - Joes Robot Shop"},
  {path: '' , redirectTo:'/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
