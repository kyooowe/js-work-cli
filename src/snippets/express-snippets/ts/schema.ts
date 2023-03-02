//#region Import
import { model, Schema } from "mongoose";
//#endregion

// Interface
interface IProducts {
    name: string;
    quantity: number;
}

//#region Schema and Model
const productsSchema = new Schema<IProducts>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
})

const ProductsModel = model<IProducts>('Products', productsSchema)
//#endregion

export { ProductsModel };


