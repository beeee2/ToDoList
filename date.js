const dateContainer = document.querySelector(".date");
const clockContent = dateContainer.querySelector(".date__realTime");
const dateContent = dateContainer.querySelector(".date__today");

function getTime() {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
   
    const dayArray = ['SUN','MON','TUE','WED','THU','FRI','SAT','SUN'];
    const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthNumber = date.getMonth();
    const dayNumber = date.getDay();
    const day = dayArray[dayNumber];
    const month = monthArray[monthNumber];
    const dt = date.getDate();

    clockContent.innerText = `
    ${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}`:seconds}`;

    dateContent.innerText = `${day} ${month} ${dt}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();