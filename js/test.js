const date = Date.now();
console.log(date);

setTimeout(() => {
  const date2 = Date.now(); //в ms
  console.log(date2);

  const delta = date2 - date;
  console.log(delta);
}, 3000);

const timer = {
  start() {
    const startTime = Date.now();

    setInterval(() => {
      console.log("hello");
    }, 1000);
  },
};
timer.start();

function getTimeComponents(time) {
  const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}
