const form = document.querySelector('.comment-form');
  const nameInput = document.getElementById('name');
  const textArea = document.getElementById('text');
  const errorMessages = document.querySelectorAll('.error-msg');
  const commentList = document.querySelector('.comment-list');


  //Форматирование времени
  function formatDateTime(date) {
    const now = new Date();
    if (now.getDate() === date.getDate()) {
      return `сегодня, ${date.toLocaleTimeString()}`;
    } else if (now.getDate() === date.getDate() + 1) {
      return `вчера, ${date.toLocaleTimeString()}`;
    } else {
      return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    }
  }


 //Добавление комментария
  function addComment() {
    const name = nameInput.value;
    const text = textArea.value;

    // Валидация имени
    let isValid = true;
    if (!name) {
      errorMessages[0].textContent = 'Введите имя';
      isValid = false;
    }
    // Валидация текста
    if (!text) {
      errorMessages[1].textContent = 'Напишите комментарий';
      isValid = false;
    }

    if (isValid) {
      const now = new Date();
      const comment = document.createElement('li');
      comment.classList.add('comment');
      comment.innerHTML = `
        <div class="comment-header">
          <span class="comment-name">${name}</span>
          <span class="comment-date">${formatDateTime(now)}</span>
          <button class="comment-delete" aria-label="Удалить комментарий">×</button>
          <button class="comment-like" aria-label="Лайкнуть комментарий">❤️</button>
        </div>
        <div class="comment-text">${text}</div>
      `;
      commentList.appendChild(comment);

      nameInput.value = '';
      textArea.value = '';
      errorMessages.forEach(msg => msg.textContent = '');
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addComment();
  });

  errorMessages.forEach(msg => {
    msg.previousElementSibling.addEventListener('input', () => {
      msg.textContent = '';
    });
  });

  commentList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('comment-delete')) {
      target.closest('.comment').remove();
    }
    if (target.classList.contains('comment-like')) {
      target.classList.toggle('liked');
    }
  });

  