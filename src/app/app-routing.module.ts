import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {QuizComponent} from "./component/quiz/quiz.component";

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"quiz", component:QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
