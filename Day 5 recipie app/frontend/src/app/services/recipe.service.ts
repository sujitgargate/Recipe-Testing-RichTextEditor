import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class RecipeService {
  constructor(private _http: HttpClient) {

  }
  add(recipe: any, file:File) {
    var dateToDB = moment(recipe.recipeCreatedDate).format("YYYY-MM-DD");

    const formData = new FormData();
    //debugger;
    //console.log(recipe.ingredient.name);

    formData.append('file', file);
    formData.append('name', recipe.name);
    formData.append('calories', recipe.calories);
    formData.append('description', recipe.description)
    formData.append('recipeCreatedDate', dateToDB)
    formData.append('ingredient', recipe.ingredient)
    return this._http.post('http://localhost:5000/recipe',formData);
  }

  get(){
      return this._http.get('http://localhost:5000/recipe');
  }

  getById(id){
    console.log(id);

    return this._http.get('http://localhost:5000/recipe/' +id)
  }
  
  update(recipe: any, file:File) {
    var dateToDB = moment(recipe.recipeCreatedDate).format("YYYY-MM-DD");

    const formData = new FormData();
    debugger;

    formData.append('file', file);
    formData.append('name', recipe.name);
    formData.append('calories', recipe.calories);
    formData.append('description', recipe.description)
    formData.append('recipeCreatedDate', dateToDB)
    formData.append('ingredient', recipe.ingredient)
    formData.append('_id', recipe._id)
    return this._http.put('http://localhost:5000/recipe',formData);
  }

  delete(id){
    return this._http.delete('http://localhost:5000/recipe/'+id)
  }

  search(search){
    console.log(search);
    return this._http.post('http://localhost:5000/recipe/search', search)
  }
}
