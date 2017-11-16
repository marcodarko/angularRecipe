import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingridient} from '../shared/ingridient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService{

	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[]=[
	new Recipe('Salad', 
		'Some Description for salad', 
		'http://images.media-allrecipes.com/userphotos/250x250/00/00/14/1486.jpg',
		[
			new Ingridient('Lettuce', '9'),
			new Ingridient('Tomatoe','2'),
			new Ingridient('Pineapple', '1')
		]),
	new Recipe('Spaghetti', 
		'Some Description for spaghetti', 
		'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/10/2/2/FNM_110112-Spaghetti-Squash-and-Meatballs-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1433667656211.jpeg',
		[
			new Ingridient('Meat', '3'),
			new Ingridient('Noodles','5')
		])
	];

	constructor(private slService: ShoppingListService){

	}

	getRecipes(){
		return this.recipes.slice();
	}

	getRecipe(index: number){
		return this.recipes[index];
	}

	addIngridientsToShoppingList(ingridients: Ingridient[]){
		this.slService.addIngridients(ingridients);
	}
}