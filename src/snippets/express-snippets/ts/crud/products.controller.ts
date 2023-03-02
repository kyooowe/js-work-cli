//#region Import
import { ProductsModel } from "./products.model"
import { Request, Response } from 'express';
import { IProducts } from "./products.interface";

//#region Action
const FetchAllProducts = async (res: Response) => {
    try {
        // Fetch Products
        const products = await ProductsModel.find();
        res.status(200).json({ data: products })
    } catch (err: unknown) {
        res.status(500).json({ data: null })

    }
};

const FetchProduct = async (req: Request, res: Response) => {
    try {
        // Fetch Product
        const products = await ProductsModel.findOne<IProducts>({ _id: req.body._id });
        res.status(200).json({ data: products })
    } catch (err: unknown) {
        res.status(500).json({ data: null })

    }
};

const CreateProduct = async (req: Request, res: Response) => {
    try {

        const isProductNameExisting = await ProductsModel.findOne<IProducts>({
            name: req.body.name
        });

        if (isProductNameExisting)
            res.status(409).json({ data: null });

        // Create new product
        const product = new ProductsModel({
            name: req.body.name,
            quantity: req.body.quantity
        });

        // Save then Return the latest
        const newProduct = await product.save();
        res.status(200).json({ data: newProduct });
    } catch (err: unknown) {
        res.status(500).json({ data: null });
    }
};

const UpdateProduct = async (req: Request, res: Response) => {
    try {

        // Find user using email
        const product = await ProductsModel.findOne<IProducts>({ _id: req.body._id });

        if (!product)
            res.status(409).json({ data: null });

        const updateProduct = await ProductsModel.findOneAndUpdate({ _id: req.body._id }, { name: product?.name, quantity: product?.quantity })
        res.status(200).json({ data: updateProduct });
    } catch (error) {
        res.status(500).json({ data: null });
    }
}
//#endregion

export { FetchAllProducts, FetchProduct, CreateProduct, UpdateProduct };
