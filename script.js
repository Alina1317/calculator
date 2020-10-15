const numbers = document.querySelectorAll('[data-number]'),
	operations = document.querySelectorAll('[data-operation]'),
	decimal = document.getElementById('dat'),
	display = document.getElementById('display'),
	clearRes = document.getElementById('reset'),
	del = document.getElementById('del'),
	sqrt = document.getElementById('sqrt'),
	pows = document.getElementById('expo');

let result = document.getElementById('result'),
	memoryCurrentNumber = '',
	newMemoryNumber = false,
	memoryPendingOperation = '';

const clickNumbers = e => {
	let num = e.target.textContent;
	if(newMemoryNumber) {
		display.innerHTML = num;
		newMemoryNumber = false;
	} else {
		if(display.innerHTML === '0') {
			display.innerHTML = num;
		} else {
			display.innerHTML += num;
		}
	}	
};
numbers.forEach(button => {
	button.addEventListener('click', clickNumbers);
});

const clickOperations = e => {
	let symbol = e.target.textContent;
	let localOperationMemory = display.innerHTML;

	if(newMemoryNumber && memoryPendingOperation !== '=') {
		display.innerHTML = memoryCurrentNumber;
		newMemoryNumber = false;
	} else {
		newMemoryNumber = true;
		if(memoryPendingOperation === '+') {
			memoryCurrentNumber += +localOperationMemory;
		} else if (memoryPendingOperation === '-') {
			memoryCurrentNumber -= +localOperationMemory;
		} else if (memoryPendingOperation === '*') {
			memoryCurrentNumber *= +localOperationMemory;
		} else if (memoryPendingOperation === '÷') {
			memoryCurrentNumber /= +localOperationMemory;
		} else {
			memoryCurrentNumber = +localOperationMemory;
		}

		display.innerHTML = memoryCurrentNumber;
		memoryPendingOperation = symbol;
	};
};
operations.forEach(operation => {
	operation.addEventListener('click', clickOperations);
});
result.addEventListener('click', clickOperations);

const clear = () => {
	memoryCurrentNumber = '';
	newMemoryNumber = '';
	memoryPendingOperation = null;
	display.innerHTML = '0';
};
clearRes.addEventListener('click', clear);

const decimalClick = () => {
	let localDecimalMemory = display.innerHTML;
	if (newMemoryNumber) {
		localDecimalMemory = '0.';
		newMemoryNumber = false;
	} else {
		if (localDecimalMemory.indexOf('.') === -1) {
			localDecimalMemory += '.';
		};
		console.log(localDecimalMemory);
	};
	display.innerHTML = localDecimalMemory;
};
decimal.addEventListener('click', decimalClick);

const clickDel = () => {
	memoryCurrentNumber = display.innerHTML;
	memoryCurrentNumber = memoryCurrentNumber.substring(0, memoryCurrentNumber.length - 1);

	 if (memoryCurrentNumber == '') {
	 	memoryCurrentNumber = '0';
	 }
	 display.innerHTML = memoryCurrentNumber;
};
del.addEventListener('click', clickDel);