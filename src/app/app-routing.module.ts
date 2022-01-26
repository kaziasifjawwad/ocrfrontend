import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./users/register/register.component";
import { LoginComponent } from "./users/login/login.component";
import { UsersModule } from "./users/users.module";
import { UserfilesModule } from "./userfiles/userfiles.module";
import { UserFilesGuard } from "./users/guards/userfiles.guard";
import {AuthGuard} from "./users/guards/auth.guard"

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        loadChildren: () =>
            UsersModule,
            canActivate: [AuthGuard]
    },
    {
        path: 'userfiles',
        loadChildren: () => UserfilesModule,
        canActivate: [UserFilesGuard],
        canLoad: [UserFilesGuard]
    }
]

@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [
    HomeComponent,
    LoginComponent,
    RegisterComponent
]