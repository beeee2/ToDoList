const clockContainer = document.querySelector(".clock");
const clockContent = clockContainer.querySelector(".clock__realTime");

function getTime() {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    clockContent.innerText = `
    ${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}`:seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();