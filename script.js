const BASE_URL = "https://api.frankfurter.app/latest?";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
    select.innerHTML = ""; // 🔥 clear old options

    for (let code in countryList) {
        let option = document.createElement("option");
        option.value = code;
        option.innerText = code;
        select.append(option);
    }

    // change flag when currency changes
    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    });
}

fromCurr.value = "USD";
toCurr.value = "INR";


changeFlag(fromCurr);
changeFlag(toCurr);


function changeFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");

    img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = Number(amount.value);

    if (!amtVal || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    

    let URL = `${BASE_URL}amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    let finalAmt = data.rates[toCurr.value];

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
});