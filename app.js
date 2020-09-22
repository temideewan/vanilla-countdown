// first select all the elements that we need from the page
const head = document.querySelector(".head");
const message = head.querySelector("span");
const form = document.querySelector("#countdown-form");

const input = document.querySelector("#eventName");

const label = document.querySelector(".label>span");

const name = form.querySelector(".name #eventName");
const dayDOM = document.querySelector(".days");
const hourDOM = document.querySelector(".hours");
const minuteDOM = document.querySelector(".minutes");
const secondDOM = document.querySelector(".seconds");

const dateDom = form.querySelector("#end");
let timer;

label.classList.remove("span-up");

// carry out actions as the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the value of the name element and make it the text content of the message
  message.textContent = name.value;
  name.value = "";
  name.focus();

  const targetDate = dateDom.value;

  //   take this value and pass it into a function

  //create a timer for a new now every second.
  timer = setInterval(() => {
    if (targetDate) {
      startCountdown(targetDate);
    } else {
      controlError();
    }
  }, 1000);

  // remove the class for focused input
  label.classList.remove("span-up");
});

const startCountdown = (date) => {
  // we get the time in milliseconds using getTime() function

  const actualDate = new Date(date);
  const dateInMilliseconds = actualDate.getTime();

  const now = new Date();
  const nowInMilliseconds = now.getTime();

  const remainingTime = dateInMilliseconds - nowInMilliseconds;

  // breaking the remaining time into days hours mintes and seconds

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  if (remainingTime <= 0) {
    // this block happens if the user enters a date before the present day.

    controlError();

    clearInterval(timer);
  } else {
    updateDom({ seconds, minutes, hours, days });
  }
};

const updateDom = ({ seconds, minutes, hours, days }) => {
  // Update the dom with the right values
  dayDOM.innerHTML = `${days} <span>days</span>`;
  secondDOM.innerHTML = `${seconds} <span>seconds</span>`;
  minuteDOM.innerHTML = `${minutes} <span>minutes</span>`;
  hourDOM.innerHTML = `${hours} <span>hours</span>`;
};

const controlError = () => {
  // we send different values to be updated in the DOM
  updateDom({ seconds: "S", minutes: "m", hours: "h", days: "d" });
  head.innerHTML = `You really should try a <span>future</span> date`;
  head.classList.add("error");
};

// make sure our input field remains focused as long as it is not empty
console.log({ name });
form.addEventListener("click", (e) => {
  // if the target of the click is an input
  if (e.target === input) {
    label.classList.add("span-up");
  } else if (input.value) {
    return;
  } else {
    label.classList.remove("span-up");
  }
});

/**break down
 *  // start the counter
  // we'll getting the date that was entered
  // then make a countdown from now till that particular date.
  // that means we'll subtract present from future
  // get the remaining time and split it into seconds minute and hour
  // then at every second minute or hour we update our countdown accordingly
 */
