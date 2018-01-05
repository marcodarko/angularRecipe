import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

	id: number;
	editMode= false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
  	this.route.params.subscribe(
  		(params: Params) =>{
  			this.id = +params['id'];
  			this.editMode = params['id'] != null;
        this.initForm();
  		}
  		)
  }

  onSubmit(){
    // const newRecipe= new Recipe(
    //  this.recipeForm.value['name'],
    //  this.recipeForm.value['description'],
    //  this.recipeForm.value['imagePath'],
    //  this.recipeForm.value['ingridients'])
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, 
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
      )
  }

  private initForm(){

    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngridients = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeDescription= recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingridients']){
        for (let ingridient of recipe.ingridients){
          recipeIngridients.push(
            new FormGroup({
              'name': new FormControl(ingridient.name, Validators.required),
              'amount': new FormControl(ingridient.amount, 
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] )
            })
            )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingridients': recipeIngridients
    });
  }

}
