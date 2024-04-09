export function calculateTotalSpentThisMonth(expenses) {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	const currentMonthExpenses = expenses.filter((expense) => {
		const expenseDate = new Date(expense.createdAt);
		return (
			expenseDate.getMonth() + 1 === currentMonth &&
			expenseDate.getFullYear() === currentYear
		);
	});

	const totalSpentThisMonth = currentMonthExpenses.reduce(
		(total, expense) => total + expense.amount,
		0
	);

	return totalSpentThisMonth;
}
