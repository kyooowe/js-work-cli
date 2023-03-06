//#region Import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//#endregion

//#region Interface
interface IProducts {
    name: string;
    type: string;
}
//#endregion

//#region Validation Schema
const validationSchema = yup
    .object({
        name: yup.string().required("Product name is required"),
        type: yup.string().required("Product type is required")
    })
    .required();
//#endregion

const ProductForm = () => {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<IProducts>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: IProducts) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} />
            {errors.name ? (
                <span style={{ color: "red" }}>Product name is required</span>
            ) : null}
            <input {...register("type")} />
            {errors.type && (
                <span style={{ color: "red" }}>Product type is required</span>
            )}
            <button type="submit">Submit</button>
        </form>
    );
}

export default ProductForm;