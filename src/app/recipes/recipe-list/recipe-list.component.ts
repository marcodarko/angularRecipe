import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

@Output() recipeWasSelected= new EventEmitter <Recipe>();

recipes: Recipe[]=[
	new Recipe('Salad', 'Some Description for salad', 'http://images.media-allrecipes.com/userphotos/250x250/00/00/14/1486.jpg'),
	new Recipe('Spaghetti', 'Some Description for spaghetti', 'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/10/2/2/FNM_110112-Spaghetti-Squash-and-Meatballs-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1433667656211.jpeg')
];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
  	this.recipeWasSelected.emit(recipe);
  }

}
