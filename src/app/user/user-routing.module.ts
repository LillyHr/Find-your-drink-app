import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'profile', component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}