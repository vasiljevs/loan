'use strict';

const amount = document.querySelector('.payment-amount'),
    interest = document.querySelector('.payment-interest'),
      period = document.querySelector('.payment-period');

const setHeading = name => {
  const heading = document.querySelector('.heading');
  heading.textContent = name;
};

const setOverlayClass = (stClass, ndClass) => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.replace(stClass, ndClass);
};

const loan = {
  getPrincipal: function () {
    return parseFloat(amount.value);
  },
  getInterest: function () {
    return parseFloat(interest.value) / 100 / 12;
  },
  getPeriod: function () {
    return parseFloat(period.value) * 12;
  }
};

document.querySelector('.application').addEventListener('submit', (e) => {
  setOverlayClass('d-none', 'd-block');
  setHeading('Results');

  // GET  values
  const principal = loan.getPrincipal();
  const loanInterest = loan.getInterest();
  const loanPayment = loan.getPeriod();

  // Calculate monthly payment
  const calculate = Math.pow(1 + loanInterest, loanPayment);
  const calculateMonthly = (principal * calculate * loanInterest) / (calculate - 1);

  // Check if the supplied number is finite
  if (isFinite(calculateMonthly)) {
    const calcMonthly = calculateMonthly.toFixed(2);
    const calcInterest = ((calculateMonthly * loanPayment) - principal).toFixed(2);
    const calcTotal = (calculateMonthly * loanPayment).toFixed(2);

    const monthly = document.querySelector('.monthly');
    monthly.textContent = `${calcMonthly} USD`;

    const interest = document.querySelector('.interest');
    interest.textContent = `${calcInterest} USD`;

    const total = document.querySelector('.total');
    total.textContent = `${calcTotal} USD`;
  }

  e.preventDefault();
});

document.querySelector('.overlay button').addEventListener('click', () => {
  setOverlayClass('d-block', 'd-none');
  setHeading('Loan Calculator');
});