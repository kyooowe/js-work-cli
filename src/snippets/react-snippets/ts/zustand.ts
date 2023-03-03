import { create } from 'zustand';

//#region Products Config

// Interface
interface IProducts {
	name: string;
	quantity: number;
}

// Default products data
const productsData: IProducts = {
	name: 'products',
	quantity: 0
}
//#endregion

//#region Store Config
interface IProductsStore {
	products: IProducts;
	storeProducts: (data: IProducts) => void;
}
//#endregion

//#region State Management
const useStore = create<IProductsStore>((set) => ({
	products: productsData,
	storeProducts: (data: IProducts) => {
		set({ products: data })
	}
}));
//#endregion

export { useStore };
