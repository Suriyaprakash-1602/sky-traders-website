/* SKY TRADERS - ENQUIRY FORM & WHATSAPP INTEGRATION */

document.addEventListener('DOMContentLoaded', () => {
  initEnquiryForm();
  initQuoteModal();
});

function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('field-name').value.trim();
    const company = document.getElementById('field-company').value.trim();
    const gstin = document.getElementById('field-gstin').value.trim();
    const phone = document.getElementById('field-phone').value.trim();
    const email = document.getElementById('field-email').value.trim();
    const location = document.getElementById('field-location').value.trim();
    const message = document.getElementById('field-message').value.trim();

    if (!name || !phone || !email) {
      alert("Please fill in all required fields (Name, Contact Number, Mail ID).");
      return;
    }

    // Format WhatsApp Message Payload
    const waMessage = `*NEW EXPORT ENQUIRY - SKY TRADERS*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Company:* ${encodeURIComponent(company || 'N/A')}%0A` +
      `*GSTIN:* ${encodeURIComponent(gstin || 'N/A')}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Location/Address:* ${encodeURIComponent(location || 'N/A')}%0A` +
      `*Message:* ${encodeURIComponent(message || 'Requesting Coconut Export Quotation')}`;

    // Open WhatsApp
    const waUrl = `https://wa.me/916380849351?text=${waMessage}`;
    window.open(waUrl, '_blank');

    // Show Success Modal / Alert
    showSuccessToast();
    form.reset();
  });
}

function initQuoteModal() {
  const modal = document.getElementById('quote-modal');
  const openBtns = document.querySelectorAll('.btn-get-quote');
  const closeBtn = document.getElementById('quote-modal-close');
  const selectedProductField = document.getElementById('quote-product-name');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodName = btn.getAttribute('data-product') || 'General Export Inquiry';
      if (selectedProductField) {
        selectedProductField.innerText = `Product Selected: ${prodName}`;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

function showSuccessToast() {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <div>
      <strong>Enquiry Transmitted Successfully!</strong>
      <p>Our export manager will contact you shortly.</p>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
