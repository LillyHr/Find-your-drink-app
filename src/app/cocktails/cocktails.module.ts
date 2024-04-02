import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailsRoutingModule } from './cocktails-routing.module';
import { CocktailsListComponent } from './cocktails-list/cocktails-list.component';
import { FormsModule } from '@angular/forms';
import { CreateCocktailComponent } from './create-cocktail/create-cocktail.component';



@NgModule({
  declarations: [
    MainComponent, 
    CocktailsComponent, 
    CocktailsListComponent,
    CreateCocktailComponent,
  ],
  imports: [
    CommonModule, CocktailsRoutingModule, FormsModule
  ]
})
export class CocktailsModule { }
