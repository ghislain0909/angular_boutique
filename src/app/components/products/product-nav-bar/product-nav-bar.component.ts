import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsType} from "../../../state/product.state";

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.productEventEmitter.emit({type: ProductActionsType.GET_ALL_PRODUCTS});
  }

  onGetAvailableProduct() {
    this.productEventEmitter.emit({type: ProductActionsType.GET_AVAILABLE_PRODUCTS});
  }

  onGetSelectedProduct() {
    this.productEventEmitter.emit({type: ProductActionsType.GET_SELECTED_PRODUCTS});
  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({type: ProductActionsType.SEARCH_PRODUCTS, payload: dataForm });
 }

  onCreateProduct() {
    this.productEventEmitter.emit({type: ProductActionsType.NEW_PRODUCT});
  }
}
