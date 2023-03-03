import { create } from 'zustand';

// Default products data
const productsData = {
	name: 'products',
	quantity: 0
}

//#region State Management
const useStore = create((set) => ({
	products: productsData,
	storeProducts: (data) => {
		set({ products: data })
	}
}));
//#endregion

export { useStore };
