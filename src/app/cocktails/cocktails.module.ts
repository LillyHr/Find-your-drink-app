import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailsRoutingModule } from './cocktails-routing.module';
import { CocktailsListComponent } from './cocktails-list/cocktails-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCocktailComponent } from './create-cocktail/create-cocktail.component';
import { CurrentCocktailComponent } from './current-cocktail/current-cocktail.component';



@NgModule({
  declarations: [
    MainComponent, 
    CocktailsComponent, 
    CocktailsListComponent,
    CreateCocktailComponent,
    CurrentCocktailComponent,
  ],
  imports: [
    CommonModule, CocktailsRoutingModule, ReactiveFormsModule, FormsModule
  ]
})
export class CocktailsModule { }
