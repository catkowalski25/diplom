document.querySelector('.buying__info-title').innerHTML = localStorage.getItem('filmName');
document.querySelector('.buying__info-start').innerHTML = `Начало сеанса: ${localStorage.getItem('seanceStart')}`;
document.querySelector('.buying__info-hall').innerHTML = localStorage.getItem('hallName');
document.querySelector('.price-standart').innerHTML = localStorage.getItem('hallPrice');
document.querySelector('.price-vip').innerHTML = localStorage.getItem('hallPriceVip');
const hallConfiguration = document.querySelector('.conf-step__wrapper');
const button = document.querySelector('.acceptin-button');
button.setAttribute('disabled', '');

const body = `event=get_hallConfig&timestamp=${localStorage.getItem('timestamp')}&hallId=${localStorage.getItem('hallId')}&seanceId=${localStorage.getItem('seanceId')}`;

requestData(body, showHall, localStorage.getItem('hallConfig'));

// Функция для отрисовки конфигурации зала
function showHall(data, emptyHallConfig) {
  if (data) {
    hallConfiguration.innerHTML = data;
  } else {
    hallConfiguration.innerHTML = emptyHallConfig;
  };
  
  hallConfiguration.querySelectorAll('.conf-step__chair').forEach(span => span.addEventListener('click', plaseChoose)); 
};

// Функция выбора мест 
function plaseChoose(event) {
  let chair = event.target;
  if (!chair.classList.contains('conf-step__chair_taken')) {
    chair.classList.toggle('conf-step__chair_selected');
  };
  let isSelected = false;
  hallConfiguration.querySelectorAll('.conf-step__chair').forEach(span => {
    if (span.classList.contains('conf-step__chair_selected')) {
      isSelected = true;
    };
  });
  if (isSelected) {
    button.removeAttribute('disabled');
  } else{
    button.setAttribute('disabled', '');
   };
};

button.addEventListener('click', bookChairs);
// Функция бронирования мест
function bookChairs(event) {

  let booked = '';
  let price = 0;
  hallConfiguration.querySelectorAll('.conf-step__row').forEach((row, rowIndex) =>{
    let chairCounter = 0;
    row.querySelectorAll('.conf-step__chair').forEach(chair => {
      if (!chair.classList.contains('conf-step__chair_disabled')) {
        chairCounter++;
      };
      if (chair.classList.contains('conf-step__chair_selected')) {
        booked += `${rowIndex + 1}/${chairCounter}, `;
        chair.classList.add('conf-step__chair_taken');
        chair.classList.remove('conf-step__chair_selected');
        if (chair.classList.contains('conf-step__chair_standart')){
          chair.classList.remove('conf-step__chair_standart');
          price += +localStorage.getItem('hallPrice');
        }
        if (chair.classList.contains('conf-step__chair_vip')){
          chair.classList.remove('conf-step__chair_vip');
          price += +localStorage.getItem('hallPriceVip');
        };
      };
    });
  });
  if (booked !=='' && price > 0) {
    localStorage.setItem('hallConfigBooked', document.querySelector('.conf-step__wrapper').innerHTML);
    localStorage.setItem('booked', booked.slice(0,-2));
    localStorage.setItem('bookedPrice', price);
    document.location.href = 'payment.html';
  };
};