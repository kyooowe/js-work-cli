//#region Import
import { model, Schema } from "mongoose";
//#endregion

//#region Schema and Model
const productsSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
})

const ProductsModel = model('Products', productsSchema)
//#endregion

export { ProductsModel };


