const refs = {
    startBtn: document.querySelector('button[data-action-start]'),
    stopBtn: document.querySelector('button[data-action-stop]'),
    clockface: document.querySelector('.js-clockface'),
};

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        this.init();
    }

    init() {
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    start() {
        if (this.isActive) {
            return;
        }

        const startTime = new Date('May 1 2021');
        console.log(startTime);
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            // console.log('currentTime', currentTime);
            const deltaTime = currentTime - startTime;
            // console.log('deltaTime', deltaTime);
            const time = this.getTimeComponents(-deltaTime);

            this.onTick(time);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    /*
     * - Принимает время в миллисекундах
     * - Высчитывает сколько в них вмещается часов/минут/секунд
     * - Возвращает обьект со свойствами hours, mins, secs
     * - Адская копипаста со стека 💩
     */
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    /*
     * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
     */
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается часов/минут/секунд
 * - Рисует интерфейс
 */
function updateClockface({ days, hours, mins, secs }) {
    refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}
//==========наглядные диаграммы==================
(function() {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let birthday = 'May 1, 2021 00:00:00',
        countDown = new Date(birthday).getTime(),
        x = setInterval(function() {
            let now = new Date().getTime(),
                distance = countDown - now;

            (document.getElementById('days').innerText = Math.floor(distance / day)),
            (document.getElementById('hours').innerText = Math.floor(
                (distance % day) / hour,
            )),
            (document.getElementById('minutes').innerText = Math.floor(
                (distance % hour) / minute,
            )),
            (document.getElementById('seconds').innerText = Math.floor(
                (distance % minute) / second,
            ));

            //do something later when date is reached
            if (distance < 0) {
                let headline = document.getElementById('headline'),
                    countdown = document.getElementById('countdown'),
                    content = document.getElementById('content');

                headline.innerText = "It's my birthday!";
                countdown.style.display = 'none';
                content.style.display = 'block';

                clearInterval(x);
            }
            //seconds
        }, 0);
})();