import { format } from "date-fns";
import arraySort from "array-sort";

export const Products = [];

export const orderChartData = (orders) => {
	orders = arraySort(orders, "orderDate");
	if (orders.length > 5) {
		let counter = 0;
		while (orders.length < 5) {
			orders.push(orders[counter]);
			++counter;
		}
	}

	const chartLabels = orders.map((o) =>
		format(new Date(o.orderDate), "EEE, MMM d")
	);
	const values = orders.map((o) => o.orderTotal);
	return {
		labels: chartLabels,
		datasets: [
			{
				label: "Orders",
				data: values,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
				],
				borderWidth: 1,
			},
		],
	};
};
