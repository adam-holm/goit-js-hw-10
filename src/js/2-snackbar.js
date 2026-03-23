console.log('Snackbar');
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Зупиняємо перезавантаження сторінки

  // Дістаємо значення з форми
  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  // Створюємо проміс
  createPromise(delay, state)
    .then((delay) => {
      // Цей блок спрацює, якщо проміс виконається успішно (resolve)
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch((delay) => {
      // Цей блок спрацює, якщо проміс буде відхилено (reject)
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
    
    form.reset(); // Очищаємо форму після натискання
});

// Функція, яка створює проміс
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Успіх
      } else {
        reject(delay); // Помилка
      }
    }, delay);
  });
}