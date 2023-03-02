//#region Import
import { model, Schema } from "mongoose";
import { IProducts } from "./products.interface"
//#endregion

//#region Schema and Model
const productsSchema = new Schema<IProducts>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
})

const ProductsModel = model<IProducts>('Products', productsSchema)
//#endregion

export { ProductsModel };


