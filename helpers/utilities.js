// import * as yup from "yup";
import axios from "axios";
import { urls } from "./config";
import { getToken } from "./auth";
import XLSX from "xlsx";

// default url
export const appUrl = urls.prodApi;
export const CSR = typeof window !== "undefined"; //CSR = Client Side Rendering

// export const validateSignUp = (data) => {
// 	const schema = yup.object().shape({
// 		email: yup.string().email().lowercase().required(),
// 		username: yup.string().min(3).required(),
// 		password: yup.string().min(5).required(),
// 	});

// 	return schema.isValid(data, { stripUnknown: true });
// };

// export const validateLogin = (data) => {
// 	const schema = yup.object().shape({
// 		email: yup.string().min(3).lowercase().required(),
// 		password: yup.string().min(5).required(),
// 	});

// 	return schema.isValid(data);
// };

export const fetchData = async (url = "", auth = false, config) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.get(`${appUrl}/${url}`, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const postData = async (url = "", data = {}, config, auth = true) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.post(`${appUrl}/${url}`, data, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const updateData = async (url = "", data = {}, config, auth = true) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.put(`${appUrl}/${url}`, data, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const deleteData = async (url = "", config, auth = true) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.delete(`${appUrl}/${url}`, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const toUrl = (text) => {
	// let url;
	// for ( let index = 0; index < text.length; index++ )
	// {
	// 	if ( text[ index ] === " " || "" )
	// 	{
	// no time
	// 	}
	// }

	if (text === undefined || text.length === 0 || text === "") return;
	return text.trim().toLowerCase().replace(" ", "-");
};

export const cedisLocale = Intl.NumberFormat("en-GH");

export const exportToExcel = (
	tableId,
	fileName = "Dakuleda Workbook",
	sheetName = "sheet1"
) => {
	try {
		var elt = document.getElementById(tableId);
		var wb = XLSX.utils.table_to_book(elt, { sheet: sheetName });
		return XLSX.writeFile(wb, `${fileName}.xlsx`);
	} catch (ex) {
		alert("there was an error");
		// console.log(ex);
	}
};

export const toTitleCase = (word) => {
	let firstChar = word.slice(0, 1),
		remainder = word.slice(1);

	return `${firstChar.toUpperCase()}${remainder.toLowerCase()}`;
};

export const generateSlug = (text) => {
	if (!text) return;
	let slug = text.toLowerCase();
	slug = slug.replace(/\s+/g, "-");
	return slug;
};

export const generateFileUrl = (fileName, isImage = true) => {
	if (!fileName) return null;

	let url = "";
	if (isImage) {
		url = appUrl.slice(0, -3) + "uploads/images";
	} else {
		url = appUrl.slice(0, -3) + "uploads/videos";
	}
	return `${url}/${fileName}`;
};

export const uploadFile = async (url, file, fileName) => {
	const formData = new FormData();
	formData.append(fileName, file);

	try {
		const res = await postData(url, formData);
		if (res.status === 200) return res;
		throw new Error("file upload failed");
	} catch (ex) {
		console.log("error ");
	}
};

export const priceChangePercentage = (oldPrice, newPrice) => {
	// new price - old price
	// divide answer by old price
	// multiply answer by 100
	if (oldPrice === null || undefined) return;
	if (newPrice === null || undefined) return;

	const change = oldPrice - newPrice;
	if (change <= 0) return 0;

	const percentage = change / oldPrice;
	return (percentage * 100).toFixed(0);
};

export function getRandomNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
