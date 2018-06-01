const form = document.querySelector('#loan-form'),
amount = document.querySelector('#amount'),
interest = document.querySelector('#interest'),
years = document.querySelector('#years'),
monthly = document.querySelector('#monthly-payment'),
totalPayment = document.querySelector('#total-payment'),
totalInterest = document.querySelector('#total-interest');

form.addEventListener('submit', (e) => {
  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
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
    // Show 
    document.querySelector('#results').style.display = 'block';
    // Hide
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers!');
  }
}

function showError(err) {
  // Show 
  document.querySelector('#results').style.display = 'none';
    
  // Hide
  document.querySelector('#loading').style.display = 'none';
  
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