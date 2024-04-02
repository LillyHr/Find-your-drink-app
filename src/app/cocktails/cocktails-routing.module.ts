import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { CreateCocktailComponent } from "./create-cocktail/create-cocktail.component";
// import { CocktailsListComponent } from "./cocktails-list/cocktails-list.component";
// import { HomeComponent } from "../home/home.component";

const routes: Routes = [
    {path: 'cocktails', children: [
        {path: '', pathMatch: 'full', component: MainComponent},

    ]}, {
        path: 'create-cocktail', component: CreateCocktailComponent
    },        {
        path: 'dashboard', component: MainComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CocktailsRoutingModule {}