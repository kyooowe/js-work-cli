//#region Import
import { useFormik } from 'formik';
import * as yup from 'yup';
//#endregion

//#region Interface
interface IProducts {
	name: string;
	type: string;
}
//#endregion

//#region Validation Schema
const validationSchema = yup.object({
	name: yup
		.string()
		.required('Product Name is Required'),
	type: yup.string().required('Product Type is Required')
});

const ProductsForm = () => {

	//#region Formik
	const formik = useFormik<IProducts>({
		initialValues: {
			name: '',
			type: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {

			// Return object values in form
			console.log(values)
		}
	});
	//#endregion

	return (
		<form onSubmit={formik.handleSubmit}>
			<input
				name="name"
				type="text"
				onChange={formik.handleChange}
				value={formik.values.name}
			/>
			{
				formik.touched.name && Boolean(formik.errors.name) ? (
					<span style={{ color: 'red' }}>{formik.errors.name}</span>
				) : (
					null
				)
			}
			<input
				name="type"
				type="text"
				onChange={formik.handleChange}
				value={formik.values.type}
			/>
			{
				formik.touched.type && Boolean(formik.errors.type) ? (
					<span style={{ color: 'red' }}>{formik.errors.type}</span>
				) : (
					null
				)
			}

			<button type="submit">Submit</button>
		</form>
	)
}

export default ProductsForm;