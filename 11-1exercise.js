//calculator.js
window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

function setupIntialValues() {
  const values  = { amount: 10000, years: 10, rate: 4.5 };
  const amountUI = document.getElementById("loan-amount");
  amountUI.value = values.amount;
  const yearsUI = document.getElementById("loan-years");
  yearsUI.value = values.years;
  const rateUI = document.getElementById("loan-rate");
  rateUI.value = values.rate;
  update();
}

function update() {
  const currentUIValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}

function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);
  return (
    (monthlyRate * values.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2);
}

function updateMonthly(monthly) {
  const monthlyUI = document.getElementById("monthly-payment");
  monthlyUI.innerText = "$" + monthly;
}



//tip-pool/servers.js
let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendDeleteBtn(newTr, 'server');

    serverTbody.append(newTr);
  }
}

afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });



//tip-pool/payments.js
let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener('submit', submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let curPayment = createCurPayment();

  if (curPayment) {
    paymentId += 1;

    allPayments['payment' + paymentId] = curPayment;

    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  if (billAmt === '' || tipAmt === '') return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}

// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;

  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, '%' + curPayment.tipPercent);

  appendDeleteBtn(newTr, 'payment');

  paymentTbody.append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;

  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}


  afterEach(function() {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    serverTbody.innerHTML = '';
    paymentId = 0;
    allPayments = {};
  });

//tip-pool/helpers.js
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// append delete button and click handler for removing server from allServers and DOM td
function appendDeleteBtn(tr, type) {
  let newTd = document.createElement('td');
  newTd.className = 'deleteBtn';
  newTd.innerText = 'X';

  newTd.addEventListener('click', removeEle);

  tr.append(newTd);
}

function removeEle(evt) {
  let ele = evt.target.closest('tr');

  delete allServers[ele.id];

  ele.parentNode.removeChild(ele);
  updateServerTable();
}


  afterEach(function() {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    serverTbody.innerHTML = '';
    allPayments = {};
    paymentId = 0;
  });
