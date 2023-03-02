//#region Import
import { ProductsModel } from "./products.model"

//#region Action
const FetchAllProducts = async (res) => {
    try {
        // Fetch Products
        const products = await ProductsModel.find();
        res.status(200).json({ data: products })
    } catch (err: unknown) {
        res.status(500).json({ data: null })

    }
};

const FetchProduct = async (req, res) => {
    try {
        // Fetch Product
        const products = await ProductsModel.findOne({ _id: req.body._id });
        res.status(200).json({ data: products })
    } catch (err: unknown) {
        res.status(500).json({ data: null })

    }
};

const CreateProduct = async (req, res) => {
    try {

        const isProductNameExisting = await ProductsModel.findOne({
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

const UpdateProduct = async (req, res) => {
    try {

        // Find user using email
        const product = await ProductsModel.findOne({ _id: req.body._id });

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
