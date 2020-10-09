var currencyOne = document.getElementById('currency-one');
var currencyTwo = document.getElementById('currency-two');
var amountOne = document.getElementById('amount-one');
var amountTwo = document.getElementById('amount-two');
var swap = document.getElementById('swap');
var rateEl = document.getElementById('rate');
var reset = document.getElementById('reset');

function calculate() {
    var currencyOneVal = currencyOne.value;
    var currencyTwoVal = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/36f0509845556c5f41d06fee/latest/${currencyOneVal}`)
        .then(res => res.json())
        .then(data => {
            var rate = data.conversion_rates[currencyTwoVal];
            rateEl.innerHTML = `1 ${currencyOne.value} = ${rate} ${currencyTwo.value}`;
            amountTwo.value = (amountOne.value * rate).toFixed(2);
        });


}

swap.addEventListener('click', () => {
    var temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});

reset.addEventListener('click', () => {
    amountOne.value = 0;
    amountTwo.value = 0;
    currencyOne.value = "USD";
    currencyTwo.value = "EUR";
    rateEl.innerHTML = "";
});



currencyTwo.addEventListener('change', calculate);
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);