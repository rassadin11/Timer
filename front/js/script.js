// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle
// copy from github 02.06.2020

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

eel.expose(show_time)

function show_time(wt) {
	wt = Math.round(wt)
	console.log(wt)
	let hours = document.querySelector('.timer__hours')
	let minutes = document.querySelector('.timer__minutes')
	let seconds = document.querySelector('.timer__seconds')

	if (wt > 3600) {
		let active_hours = Math.floor(wt / 3600)
		let active_minutes = Math.floor((wt - active_hours * 3600) / 60)
		let active_seconds = wt - active_hours * 3600 - active_minutes * 60

		if (active_hours < 10) {
			hours.innerHTML = `0${active_hours}`
		} else {
			hours.innerHTML = active_hours
		}

		if (active_minutes < 10) {
			minutes.innerHTML = `0${active_minutes}`
		} else {
			minutes.innerHTML = active_minutes
		}

		if (active_seconds < 10) {
			seconds.innerHTML = `0${active_seconds}`
		} else {
			seconds.innerHTML = active_seconds
		}

	} else if (wt >= 60) {
		let active_minutes = Math.floor(wt / 60)
		let active_seconds = wt - active_minutes * 60

		hours.innerHTML = `00`

		if (active_minutes < 10) {
			minutes.innerHTML = `0${active_minutes}`
		} else {
			minutes.innerHTML = active_minutes
		}

		if (active_seconds < 10) {
			seconds.innerHTML = `0${active_seconds}`
		} else {
			seconds.innerHTML = active_seconds
		}

	} else {

		hours.innerHTML = `00`
		minutes.innerHTML = `00`

		if (wt < 10) {
			seconds.innerHTML = `0${wt}`
		} else {
			seconds.innerHTML = wt
		}
	}
}

let start_timer_check = false
let stop_timer_check = false
let stopOrNot = true
let addTime = false
let addExcelPost = false

eel.expose(check_start)

function check_start() {
	if (start_timer_check == true) {
		start_timer_check = false
		stopOrNot = true
		return true
	} else {
		return false
	}
}

eel.expose(check_stop)

function check_stop() {
	if (stop_timer_check == true) {
		stop_timer_check = false
		return true
	} else {
		return false
	}
}

eel.expose(stop_or_not)

function stop_or_not() {
	if (stopOrNot == false) {
		return false
	} else {
		return true
	}
}

document.querySelector('.buttons__start').addEventListener('click', () => {
	start_timer_check = true
})

document.querySelector('.buttons__stop').addEventListener('click', () => {
	stop_timer_check = true
})

document.querySelector('.buttons__stop_or_not').addEventListener('click', (e) => {
	stopOrNot = !stopOrNot

	if (stopOrNot == true) {
		e.target.innerHTML = 'Disable programmer mode'
	} else {
		e.target.innerHTML = 'Enable programmer mode'
	}
})

eel.expose(add_time)

document.querySelector('.add-time__submit').addEventListener('click', () => {
	addTime = true
})

function add_time() {
	if (addTime == true) {
		let hours = document.querySelector('.add-time__hours').value.trim()
		let minutes = document.querySelector('.add-time__minutes').value.trim()
		let seconds = document.querySelector('.add-time__seconds').value.trim()

		let all_seconds = +hours * 3600 + +minutes * 60 + +seconds

		addTime = false
		return all_seconds
	}

	return 0
}

let excelInput = document.querySelector('.add-excel__text')
let excelDate = document.querySelector('.add-excel__date')
let excelTime = document.querySelector('.add-excel__time')

eel.expose(addExcelPosts)

function addExcelPosts() {
	return {
		'text': excelInput.value,
		'date': `${excelDate.value} 00:00:00`,
		'tm': excelTime.value,
		'local_variable': addExcelPost
	}
}

document.querySelector('.add-excel__btn').addEventListener('click', () => {
	if (excelInput && excelDate && excelTime) {
		addExcelPost = true

		setTimeout(() => {
			excelInput.value = ''
			excelDate.value = ''
			excelTime.value = ''
			addExcelPost = false
		}, 1000)
	}
})

eel.timer()