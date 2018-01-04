import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingridient} from '../../shared/ingridient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('myForm') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex :number;
  editedItem: Ingridient;

  constructor( private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting.subscribe(
        (index: number)=>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngridient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onAddItem(form : NgForm){
  	// event.preventDefault();
    const value = form.value;
  	const newIngridient = new Ingridient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngridient(this.editedItemIndex, newIngridient);
    }
   else{
     this.slService.addIngridient(newIngridient);
   }
   this.editMode = false;
    form.reset()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.slService.deleteIngridient(this.editedItemIndex);
    this.onClear();
  }

}
