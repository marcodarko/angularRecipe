import {Ingridient} from '../shared/ingridient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService{

	ingridientsChanged = new EventEmitter<Ingridient[]>();

	private ingridients: Ingridient[]=[
		new Ingridient('Apple', '4'),
		new Ingridient('Tomatoe', '6')
	];

	getIngridients(){
		return this.ingridients.slice();
	}

	addIngridient(ingridient: Ingridient){
		this.ingridients.push(ingridient);
		this.ingridientsChanged.emit( this.ingridients.slice() );
	}

	addIngridients( ingridients: Ingridient[] ){
		// pushes an array of the array we have using the ES6 spread operator
		// pushing an array to an array is not possible but using this 
		// operator makes it possible by turning the array into single elements and then pushing them
		this.ingridients.push(...ingridients);
		this.ingridientsChanged.emit( this.ingridients.slice() );
	}
}