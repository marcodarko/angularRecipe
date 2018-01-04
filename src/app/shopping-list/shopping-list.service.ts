import {Ingridient} from '../shared/ingridient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService{

	ingridientsChanged = new Subject<Ingridient[]>();
	startedEditting = new Subject<number>();
	private ingridients: Ingridient[]=[
		new Ingridient('Apple', '4'),
		new Ingridient('Tomatoe', '6')
	];

	getIngridients(){
		return this.ingridients.slice();
	}

	getIngridient(index: number){
		return this.ingridients[index];
	}

	addIngridient(ingridient: Ingridient){
		this.ingridients.push(ingridient);
		this.ingridientsChanged.next( this.ingridients.slice() );
	}

	updateIngridient(index: number,  newIngridient: Ingridient){
		this.ingridients[index] = newIngridient;
		this.ingridientsChanged.next(this.ingridients.slice());
	}

	deleteIngridient(index: number){
		this.ingridients.splice(index, 1);
		this.ingridientsChanged.next(this.ingridients.slice());
	}

	addIngridients( ingridients: Ingridient[] ){
		// pushes an array of the array we have using the ES6 spread operator
		// pushing an array to an array is not possible but using this 
		// operator makes it possible by turning the array into single elements and then pushing them
		this.ingridients.push(...ingridients);
		this.ingridientsChanged.next( this.ingridients.slice() );
	}
}