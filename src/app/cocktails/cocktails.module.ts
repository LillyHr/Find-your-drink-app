import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { CocktailsComponent } from './cocktails/cocktails.component';



@NgModule({
  declarations: [MainComponent, CocktailsComponent,],
  imports: [
    CommonModule
  ]
})
export class CocktailsModule { }
