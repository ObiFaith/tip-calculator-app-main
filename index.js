const zero = document.querySelector('#zero');
const resetBtn = document.querySelector('button');
const tips = Array.from(document.querySelectorAll('.tip'));
const inputs = Array.from(document.querySelectorAll('input'));
const tipAmt = document.querySelector('#tip-amt').firstElementChild;
const totalAmt = document.querySelector('#total-amt').firstElementChild;
let numberOfPersons = 1,
	prev_value,
	prev_percent;

const calcTipAndTotalAmt = (value, percent) => {
	tipAmt.innerText = (
		(value * percent.replace('%', '')) /
		(100 * numberOfPersons)
	).toFixed(2);
	totalAmt.innerText =
		Number(tipAmt.innerText) + Number(inputs[0].value) / numberOfPersons;
	totalAmt.innerText = Number(totalAmt.innerText).toFixed(2);
	tips.forEach(tip => {
		if (tip.innerText == percent)
			tip.style.backgroundColor = 'hsl(172, 67%, 45%)';
		else tip.style.backgroundColor = 'hsl(183, 100%, 15%)';
	});
	prev_value = value;
	prev_percent = percent;
};

inputs[1].addEventListener('input', () =>
	calcTipAndTotalAmt(inputs[0].value, inputs[1].value)
);

const reset = () => {
	tipAmt.innerText = '0.00';
	totalAmt.innerText = '0.00';
};

inputs[2].addEventListener('input', () => {
	if (inputs[2].value < 1 || inputs[2].value.trim() === '') reset();
	else {
		numberOfPersons = inputs[2].value !== 1 ? Number(inputs[2].value) : 1;
		calcTipAndTotalAmt(prev_value, prev_percent);
	}
	if (inputs[2].value == 0) {
		zero.style.display = 'block';
		inputs[2].style.borderColor = '#FC3A3A';
	} else {
		zero.style.display = 'none';
		inputs[2].style.borderColor = 'hsl(172, 67%, 45%)';
	}
});

tips.forEach(tip => {
	tip.addEventListener('click', e => {
		calcTipAndTotalAmt(inputs[0].value, tip.innerText);
		inputs[1].value = '';
	});
});

resetBtn.addEventListener('click', () => {
	reset();
	inputs.forEach(input => (input.value = ''));
});
