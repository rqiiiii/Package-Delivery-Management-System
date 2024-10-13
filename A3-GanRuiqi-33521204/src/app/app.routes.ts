import { Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { TranslateComponent } from './translate/translate.component';
import { Text2speechComponent } from './text2speech/text2speech.component';
import { AiComponent } from './ai/ai.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    // {path:"",redirectTo:"login",pathMatch: "full"},
    {path:"",component:DashboardComponent,canActivate:[authGuard]},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"add-driver",component:AddDriverComponent,canActivate:[authGuard]},
    {path:"list-drivers",component:ListDriversComponent,canActivate:[authGuard]},
    {path:"delete-driver",component:DeleteDriverComponent,canActivate:[authGuard]},
    {path:"update-driver",component:UpdateDriverComponent,canActivate:[authGuard]},
    {path:"add-package",component:AddPackageComponent,canActivate:[authGuard]},
    {path:"list-packages",component:ListPackagesComponent,canActivate:[authGuard]},
    {path:"delete-package",component:DeletePackageComponent,canActivate:[authGuard]},
    {path:"update-package",component:UpdatePackageComponent,canActivate:[authGuard]},
    {path:"statistics",component:StatisticsComponent,canActivate:[authGuard]},
    {path:"translate",component:TranslateComponent,canActivate:[authGuard]},
    {path:"text2speech",component:Text2speechComponent,canActivate:[authGuard]},
    {path:"ai",component:AiComponent,canActivate:[authGuard]},
    // { path: "", redirectTo: "/list-drivers", pathMatch: "full" },
    {path:"invalid-data",component:InvalidDataComponent,canActivate:[authGuard]},
    { path: '**', component: PageNotFoundComponent,canActivate:[authGuard]},
];
