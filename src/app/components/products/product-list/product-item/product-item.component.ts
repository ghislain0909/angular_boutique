import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ActionEvent, ProductActionsType} from "../../../../state/product.state";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product
  @Output() eventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type: ProductActionsType.DELETE_PRODUCT, payload: product})
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type: ProductActionsType.EDIT_PRODUCT, payload: product})
  }

  onSelect(product: Product) {
    this.eventEmitter.emit({type: ProductActionsType.SELECT_PRODUCT, payload: product})
  }
}
