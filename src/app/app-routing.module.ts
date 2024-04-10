import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{path: '', pathMatch: 'full', redirectTo: '/home'},
{path: 'home', component: HomeComponent},
{path: 'auth', 
loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
{path: 'view', 
loadChildren: () => import('./cocktails/cocktails.module').then(v => v.CocktailsModule)},
{path: '**', redirectTo: '/404'},
{path: '404', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
