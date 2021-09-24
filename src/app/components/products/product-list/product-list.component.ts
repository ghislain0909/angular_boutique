import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsType} from "../../../state/product.state";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products$?: Observable<AppDataState<Product[]>> | null = null;
  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum =  DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsType.SELECT_PRODUCT, payload: p});
  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsType.DELETE_PRODUCT, payload: p});
  }

  onEdit(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsType.EDIT_PRODUCT, payload: p});
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
}
