const form = document.querySelector('form');

// Input fields
const amount = document.querySelector('#amount'),
    interest = document.querySelector('#interest'),
      period = document.querySelector('#period');

function getLoanResult () {
  // GET  values
  const principal = parseFloat(amount.value),
    loanInterest = parseFloat(interest.value) / 100 / 12;
    loanPayment = parseFloat(period.value) * 12;

  // Calculate monthly payment
  const calculate = Math.pow(1 + loanInterest, loanPayment),
    calculateMonthly = (principal * calculate * loanInterest) / (calculate - 1);

  // Check if the supplied number is finite
  if (isFinite(calculateMonthly)) {
    console.log(`Monthly: ${calculateMonthly.toFixed(2)} USD`);
    console.log(`Interest: ${((calculateMonthly * loanPayment) - principal).toFixed(2)} USD`);
    console.log(`Total: ${(calculateMonthly * loanPayment).toFixed(2)} USD`);
  }
}

form.addEventListener('submit', (e) => {
  setTimeout(getLoanResult, 3000);
  e.preventDefault();
});