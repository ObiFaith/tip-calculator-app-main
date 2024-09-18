const zero = document.querySelector('#zero');
const resetBtn = document.querySelector('button');
const tips = Array.from(document.querySelectorAll('.tip'));
const inputs = Array.from(document.querySelectorAll('input'));
const tipAmt = document.querySelector('#tip-amt').firstElementChild;
const totalAmt = document.querySelector('#total-amt').firstElementChild;

let numberOfPersons = 1,
	prev_bill,
	prev_tip;

const calcTipAndTotalAmt = (bill, tip) => {
	// remove % to get tip value
	const tipValue = tip.replace('%', '');
	// calculate tip amount (in 2dp)
	tipAmt.innerText = ((bill * tipValue) / 100 / numberOfPersons).toFixed(2);

	// calculate total amount
	totalAmt.innerText =
		Number(tipAmt.innerText) + Number(inputs[0].value) / numberOfPersons;
	// convert total amount to 2dp (decimal point)
	totalAmt.innerText = Number(totalAmt.innerText).toFixed(2);

	// style each tip elements
	tips.forEach(tipElem => {
		// style for selected tip element
		if (tipElem.innerText == tip) {
			tipElem.style.backgroundColor = 'hsl(172, 67%, 45%)';
			tipElem.style.color = 'hsl(183, 100%, 15%)';
		}
		// style for other tip elements
		else {
			tipElem.style.backgroundColor = 'hsl(183, 100%, 15%)';
			tipElem.style.color = '#FFF';
		}
	});

	prev_bill = bill;
	prev_tip = tip;
};

// calculate tip amount and total amount when there's a change in bill (inputted) value
inputs[0].addEventListener('input', () =>
	calcTipAndTotalAmt(inputs[0].value, prev_tip)
);

// calculate tip and total amount for custom tip value
inputs[1].addEventListener('input', () =>
	calcTipAndTotalAmt(inputs[0].value, inputs[1].value)
);

// set tip and total amount to zeros
const reset = () => {
	tipAmt.innerText = '0.00';
	totalAmt.innerText = '0.00';
};

inputs[2].addEventListener('input', () => {
	// when number of people is < 1 or empty, reset the tip and total amount to zero
	if (inputs[2].value < 1 || inputs[2].value.trim() === '') reset();
	else {
		numberOfPersons = inputs[2].value;
		// using the prev bill and tip, calc tip amt and total amt now that the value of numberOfPerson have changed
		calcTipAndTotalAmt(prev_bill, prev_tip);
	}

	if (inputs[2].value == 0) {
		// input style for invalid number of people
		zero.style.display = 'block';
		inputs[2].style.borderColor = '#FC3A3A';
	} else {
		// default input number of people
		zero.style.display = 'none';
		inputs[2].style.borderColor = 'hsl(172, 67%, 45%)';
	}
});

// calculate the tip and total amount when a tip is clicked
tips.forEach(tip => {
	tip.addEventListener('click', () => {
		calcTipAndTotalAmt(inputs[0].value, tip.innerText);
	});
});

// set tip amout, total amount and input values to zeros
resetBtn.addEventListener('click', () => {
	reset();
	inputs.forEach(input => (input.value = ''));
});
