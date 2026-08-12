document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservation-form');
  const modal = document.getElementById('reservation-modal');
  const closeModalBtn = document.getElementById('close-res-modal');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove('hidden');
      }
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      if (form) form.reset();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        if (form) form.reset();
      }
    });
  }
});
