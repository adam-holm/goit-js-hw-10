console.log('Timer');
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Елементи інтерфейсу
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minsVal = document.querySelector('[data-minutes]');
const secsVal = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

// Налаштування календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    // Перевірка: чи не в минулому дата?
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

// Логіка кнопки Start
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      updateInterface(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    updateInterface(days, hours, minutes, seconds);
  }, 1000);
});

// Допоміжні функції
function updateInterface(d, h, m, s) {
  daysVal.textContent = String(d).padStart(2, '0');
  hoursVal.textContent = String(h).padStart(2, '0');
  minsVal.textContent = String(m).padStart(2, '0');
  secsVal.textContent = String(s).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}