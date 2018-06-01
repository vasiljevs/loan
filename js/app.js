const form = document.querySelector('#loan-form'),
amount = document.querySelector('#amount'),
interest = document.querySelector('#interest'),
years = document.querySelector('#years'),
monthly = document.querySelector('#monthly-payment'),
totalPayment = document.querySelector('#total-payment'),
totalInterest = document.querySelector('#total-interest');

form.addEventListener('submit', calculateResults);

function calculateResults(e) {
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly payment
  const calc = Math.pow(1 + calculatedInterest, calculatedPayments);
  const calcMonthly = (principal * calc * calculatedInterest) / (calc - 1);

  if (isFinite(calcMonthly)) {
    monthly.value = calcMonthly.toFixed(2);
    totalPayment.value = (calcMonthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((calcMonthly * calculatedPayments) - principal).toFixed(2);
  } else {
    showError('Please check your numbers!');
  }

  e.preventDefault();
}

function showError(err) {
  const div = document.createElement('div');

  const card = document.querySelector('.card'),
  heading = document.querySelector('.heading');

  div.className = 'alert alert-danger';
  div.appendChild(document.createTextNode(err));

  card.insertBefore(div, heading);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}