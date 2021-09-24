export enum ProductActionsType {
  GET_ALL_PRODUCTS= "[Product] Get All Products",
  GET_SELECTED_PRODUCTS= "[Product] Get selected Products",
  GET_AVAILABLE_PRODUCTS= "[Product] Get available Products",
  SEARCH_PRODUCTS = "[Product] Search Products",
  NEW_PRODUCT = "[Product] New Products",
  SELECT_PRODUCT = "[Product] Select Products",
  EDIT_PRODUCT = "[Product] Edit Products",
  DELETE_PRODUCT = "[Product] Delete Products",

}

export interface ActionEvent {
  type: ProductActionsType,
  payload?: any
}

export interface AppDataState<T> {
  dataState: DataStateEnum,
  data ?: T,
  errorMessage ?: string
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}
