document.querySelector('.ticket__title').innerHTML = localStorage.getItem('filmName');
document.querySelector('.ticket__start').innerHTML = localStorage.getItem('seanceStart');
document.querySelector('.ticket__hall').innerHTML = localStorage.getItem('hallName').slice(-1);
document.querySelector('.ticket__cost').innerHTML = localStorage.getItem('bookedPrice');
document.querySelector('.ticket__chairs').innerHTML = localStorage.getItem('booked');
const button = document.querySelector('.acceptin-button');

button.addEventListener('click', getBooking);
function getBooking(event) {
   event.preventDefault();
   const timestamp = localStorage.getItem('timestamp');
   const hallId = localStorage.getItem('hallId');
   const seanceId = localStorage.getItem('seanceId');
   const hallConfiguration = localStorage.getItem('hallConfigBooked');
   fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST', 
    body: `event=sale_add&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}&hallConfiguration=${hallConfiguration}`, 
    headers: {
      'Content-type': '	application/x-www-form-urlencoded',
    },
  })
 .then((response) => response.json())
 .then((data) => {
    console.log(data);
 });
};