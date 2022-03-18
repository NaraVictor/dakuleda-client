import Dexie from "dexie";

export const db = new Dexie("cart");
db.version(1).stores({
	products: "++id, productName, price, quantity", // Primary key and indexed props
});
