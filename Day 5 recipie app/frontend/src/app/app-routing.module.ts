import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeListComponent} from './Components/recipe-list/recipe-list.component'
import{CreateRecipeComponent} from './Components/create-recipe/create-recipe.component'
const routes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: 'list', component: RecipeListComponent},
  {path:'create', component:CreateRecipeComponent},
  {path:'edit/:id', component:CreateRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
