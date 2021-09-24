import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsType} from "../../state/product.state";
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum =  DataStateEnum;
//products : Product[] | null= null;
  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data => {
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );

}
  onGetSelectedProduct() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => {
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetAvailableProduct() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data => {
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data => {
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSelect(product: Product) {
    this.productsService.select(product)
    .subscribe(data => {
      product.selected =data.selected;
    })
  }

  onDelete(product: Product) {
    let v = confirm("Etes-vous sûr de vouloir supprimer ?")
    if (v == true)
    this.productsService.delete(product)
      .subscribe(data => {
        this.onGetAllProducts();
      })
  }

  onCreateProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)
  }


  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsType.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsType.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProduct(); break;
      case ProductActionsType.GET_SELECTED_PRODUCTS: this.onGetSelectedProduct(); break;
      case ProductActionsType.SEARCH_PRODUCTS: this.onSearch($event.payload ); break;
      case ProductActionsType.NEW_PRODUCT: this.onCreateProduct(); break;
      case ProductActionsType.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProductActionsType.EDIT_PRODUCT: this.onEdit($event.payload); break;
      case ProductActionsType.DELETE_PRODUCT: this.onDelete($event.payload); break;
    }
  }
}

