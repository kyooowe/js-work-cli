//#region Import
import { Router } from "express";
import { FetchAllProducts, FetchProduct, CreateProduct, UpdateProduct } from "./products.controller";
//#endregion

//#region Action
const ProductsRouter = Router()
ProductsRouter.post('/', CreateProduct)
ProductsRouter.put('/', UpdateProduct)
ProductsRouter.get('/', FetchProduct)
ProductsRouter.get('/', FetchAllProducts)
//#endregion

export { ProductsRouter }