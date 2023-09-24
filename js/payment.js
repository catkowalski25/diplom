document.querySelector('.ticket__title').innerHTML = localStorage.getItem('filmName');
document.querySelector('.ticket__start').innerHTML = localStorage.getItem('seanceStart');
document.querySelector('.ticket__hall').innerHTML = localStorage.getItem('hallName').slice(-1);
document.querySelector('.ticket__cost').innerHTML = localStorage.getItem('bookedPrice');
document.querySelector('.ticket__chairs').innerHTML = localStorage.getItem('booked');
const button = document.querySelector('.acceptin-button');

button.addEventListener('click', getBooking);
function getBooking() {
   const timestamp = localStorage.getItem('timestamp');
   const hallId = localStorage.getItem('hallId');
   const seanceId = localStorage.getItem('seanceId');
   const hallConfiguration = localStorage.getItem('hallConfigBooked');
   const body = `event=sale_add&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}&hallConfiguration=${hallConfiguration}`
   requestData(body, checkUnswer); 
};

function checkUnswer(data) {
   if (data){
      document.location.href='ticket.html';
   } else {
      console.log("Error: server not unswered");
   };
};