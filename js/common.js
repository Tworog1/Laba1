showList (1);
function showResults() {
	// Variables
	let currentMaxStudent, 
			currentMinStudent, 
			currentAvgStudent,
			max = 0, 
			min = getAvg(students[0].rating);

	// Find min & max values from [students.rating]
	for (let i = 0; i < students.length; i++) {
		if (getAvg(students[i].rating) > max) {
			max = getAvg(students[i].rating);
			currentMaxStudent = `${students[i].lastName} ${students[i].firstName}`;
		}
		if (getAvg(students[i].rating) < min) {
			min = getAvg(students[i].rating);
			currentMinStudent = `${students[i].lastName} ${students[i].firstName}`;
		}
	}

	// Get average value from [students.rating]
	let sum = 0;
	for (let i = 0; i < students.length; i++) {
		sum += getAvg(students[i].rating);
	}

	// Find average value from all [students.rating]
	let minAvg = Math.abs(getAvg(students[0].rating) - (sum / students.length));
	for (let i = 0; i < students.length; i++) {
		if ((Math.abs(getAvg(students[i].rating) - (sum / students.length))) < minAvg) {
			minAvg = Math.abs(getAvg(students[i].rating) - (sum / students.length));
			avg = getAvg(students[i].rating);
			currentAvgStudent = `${students[i].lastName} ${students[i].firstName}`;
		}
	}
	 
	// Input result values 
	getId("_1").innerHTML = `${currentMaxStudent} - ${max}`;
	getId("_2").innerHTML = `${currentAvgStudent} - ${avg}`;
	getId("_3").innerHTML = `${currentMinStudent} - ${min}`;
}

function createList(id) {
	// Create header before general list
	let $header = document.createElement("div");
	$header.className = "header student";
	$header.innerHTML = 
	`
		<div class="header__fullname"> Прізвище, Ім'я </div>
		<div class="header__mark"> Середній бал </div>
		<div class="header__rate"> Рейтинг </div>
	`;
	getId(id).append($header);

	// Find max value from [students.rating]
	let max = 0;
	for (let i = 0; i < students.length; i++) {
		if (getAvg(students[i].rating) > max) max = getAvg(students[i].rating);
	}

	// Create new area [students.rate] & input rate values
	for (let i = 0; i < students.length; i++) {
		students[i].rate = Math.floor(100 - ((getAvg(students[i].rating) / max) * 100));
	}
	
	// Create general list
	for (let i = 0; i < students.length; i++) {
		let $el = document.createElement("div");
		$el.className =`student_${i+1} student`;
		$el.innerHTML = 
		`
			<div class="fullname"> ${students[i].lastName} ${students[i].firstName} </div>
			<div class="mark"> ${getAvg(students[i].rating)} </div>
			<div class="rate"> ${students[i].rate}% </div>
		`;
		getId(id).append($el);
	}
}

function clearList(id) {
	// Delete general list
	while (getId(id).firstChild) {
		getId(id).removeChild(getId(id).firstChild);
	}
}

function changeSortType() {
	// Change type of sorting list
	if (getId("listbox").selectedIndex === 0) showList(1);
	else if (getId("listbox").selectedIndex === 1) showList(2);
}

function showList(type) {
	clearList("list");
	getSortByType(students, type);
	createList("list");
	showResults();
}