function extractDateAndTime(dateTimeString) {
	const dateObj = new Date(dateTimeString);
	const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
		dateObj.getDay()
	];
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const date = dateObj.getDate().toString().padStart(2, '0');
	const year = dateObj.getFullYear();
	const hours = dateObj.getHours() % 12 || 12;
	const minutes = dateObj.getMinutes().toString().padStart(2, '0');
	const ampm = dateObj.getHours() >= 12 ? 'p.m' : 'a.m';

	const formattedDateTime = `${hours}:${minutes} ${ampm} ${dayOfWeek}, ${date}/${month}/${year}`;

	return formattedDateTime;
}

export default extractDateAndTime;
