import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Ingridient} from '../../shared/ingridient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;

  constructor( private slService: ShoppingListService) { }

  ngOnInit() {

  }

  onAddItem(event:Event){
  	event.preventDefault();
  	const ingName = this.nameInputRef.nativeElement.value;
  	const ingAmount = this.amountInputRef.nativeElement.value;
  	const newIngridient = new Ingridient(ingName, ingAmount);
    this.slService.addIngridient(newIngridient);
  }

}
