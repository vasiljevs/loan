'use strict';

const application = document.querySelector('.application'),
amount = document.querySelector('.payment-amount'),
interest = document.querySelector('.payment-interest'),
period = document.querySelector('.payment-period'),
overlayButton = document.querySelector('.overlay-btn');

// Change heading
const setHeading = name => {
  const heading = document.querySelector('.heading');
  heading.textContent = name;
};

// Change overlay class name
const setOverlayClass = (stClass, ndClass) => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.replace(stClass, ndClass);
};

const loan = {
  // Get amount value
  getPrincipal ()
  {
    return parseFloat(amount.value);
  },
  // Get percentage value
  getInterest ()
  {
    return parseFloat(interest.value) / 100 / 12;
  },
  // Get period value
  getPeriod ()
  {
    return parseFloat(period.value) * 12;
  },
  // Get interest rate
  getPeriodicInterestRate ()
  {
    return Math.pow(
      1 + this.getInterest(), this.getPeriod()
    );
  },
  // Get discount factor
  getDiscountFactor ()
  {
    return (
      this.getPrincipal() * 
      this.getPeriodicInterestRate() * 
      this.getInterest()) / (this.getPeriodicInterestRate() - 1
    );
  },
  // Get monthly amount
  getMonthlyAmount ()
  {
    return this.getDiscountFactor().toFixed(2);
  },
  // Get total interest amount
  getInterestAmount ()
  {
    return ((this.getDiscountFactor() * 
    this.getPeriod()) - this.getPrincipal()).toFixed(2);
  },
  // Get total payment amount
  getTotalPayment ()
  {
    return (
      this.getDiscountFactor() * 
      this.getPeriod()
    ).toFixed(2);
  }
};

const getResult = (e) => {
  setOverlayClass('d-none', 'd-block');
  setHeading('Results');

  // Set total payment amount
  const total = document.querySelector('.total');
  total.textContent = `${loan.getTotalPayment()} USD`;
  // Set monthly payment amount
  const monthly = document.querySelector('.monthly');
  monthly.textContent = `${loan.getMonthlyAmount()} USD`;
  // Set total interest amount
  const interest = document.querySelector('.interest');
  interest.textContent = `${loan.getInterestAmount()} USD`;

  e.preventDefault();
};

const getPreview = () => {
  setOverlayClass('d-block', 'd-none');
  setHeading('Loan Calculator');
};

application.addEventListener('submit', getResult);
overlayButton.addEventListener('click', getPreview);