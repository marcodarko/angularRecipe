import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import {Ingridient} from '../../shared/ingridient.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;
	@Output() ingridientAdded = new EventEmitter<Ingridient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(event:Event){
  	event.preventDefault();
  	const ingName = this.nameInputRef.nativeElement.value;
  	const ingAmount = this.amountInputRef.nativeElement.value;
  	const newIngridient = new Ingridient(ingName, ingAmount);
  	this.ingridientAdded.emit(newIngridient);
  }

}
