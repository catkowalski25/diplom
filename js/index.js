//Рисуем навигацию
let storedData;
let currTime = new Date();
let zeroTime = new Date();
zeroTime.setHours(0, 0, 0, 0);
let currMinutes =  Math.round((currTime-zeroTime)/1000/60);

const weekDays = {
  0: 'Вс',
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб' 
};

const nav = document.querySelector('.page-nav');
let date = new Date();
nav.innerHTML = `
<a class="page-nav__day page-nav__day_today page-nav__day_chosen" href="#">
    <span class="page-nav__day-week">${weekDays[date.getDay()]}</span><span class="page-nav__day-number">${date.getDate()}</span>
</a>
`
for (let i = 0; i < 6; i++) {
  date.setDate(date.getDate() + 1);
nav.insertAdjacentHTML('beforeend',`
<a class="page-nav__day" href="#">
    <span class="page-nav__day-week">${weekDays[date.getDay()]}</span><span class="page-nav__day-number">${date.getDate()}</span>
</a>
`);
};

// Функция для переключения навигации по дням
nav.addEventListener('click', changeDay);
// Функция для переключения навигации по дням
function changeDay(event) {
  event.preventDefault();
  nav.querySelector('.page-nav__day_chosen').classList.remove('page-nav__day_chosen');
  let day = event.target.closest('.page-nav__day');
  day.classList.add('page-nav__day_chosen');
  if (day.classList.contains('page-nav__day_today')) {
    currTime = new Date();
    currMinutes =  Math.round((currTime-zeroTime)/1000/60);
    mainPainting(storedData, currMinutes);
  } else {
    mainPainting(storedData, 0);
  };
};

// рисуем раздел Main 1 раз через запрос данных с сервера
mainGetData(currMinutes);

// Функция для запроса данных с сервера
function mainGetData(currMinutes = 0) {
  fetch('https://jscp-diplom.netoserver.ru/', {
   method: 'POST', 
   body: 'event=update', 
   headers: {
     'Content-type': '	application/x-www-form-urlencoded',
   },
 })
.then((response) => response.json())
.then((data) => {
   console.log(data);
   storedData = data;
   mainPainting(data, currMinutes);
});
};

// Функция для отрисовки раздела main
function mainPainting(data, currMinutes) {
   const films = data.films.result;
   const seances = data.seances.result;
   const halls = data.halls.result;
   const main = document.querySelector('main');
   main.innerText = "";


   for (let i = 0; i < films.length; i++) {
    let sectionTag = document.createElement('section');
    sectionTag.className = 'movie';
       
    sectionTag.insertAdjacentHTML('beforeend',`
      <div class="movie__info">
        <div class="movie__poster">
          <img class="movie__poster-image" alt="${films[i].film_name} постер" src=${films[i].film_poster}>
        </div>
        <div class="movie__description">
          <h2 class="movie__title">${films[i].film_name}</h2>
          <p class="movie__synopsis">${films[i].film_description}</p>
          <p class="movie__data">
            <span class="movie__data-duration">${films[i].film_duration}</span>
            <span class="movie__data-origin">${films[i].film_origin}</span>
          </p>
        </div>
      </div>  
    `);

    let isFilminHall;
    for (let j = 0; j < halls.length; j++) {
      isFilminHall = false;
      if (halls[j].hall_open == 0) continue;

      let hallTag = document.createElement('div');
      hallTag.className = 'movie-seances__hall';
      hallTag.insertAdjacentHTML('beforeend',`
        <h3 class="movie-seances__hall-title">${halls[j].hall_name}</h3>
      `);

      let ulTag = document.createElement('ul');
      ulTag.className = "movie-seances__list";

      for (let k = 0; k < seances.length; k++) {
        if (seances[k].seance_hallid === halls[j].hall_id &&
            seances[k].seance_filmid === films[i].film_id &&
            seances[k].seance_start > currMinutes) {
          isFilminHall = true;
          ulTag.insertAdjacentHTML('beforeend',`
          <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html" data-seanceid = ${seances[k].seance_id} data-hallid = ${seances[k].seance_hallid} data-filmid = ${seances[k].seance_filmid}>${seances[k].seance_time}</a></li>
          `);
        };   
      };
      if (isFilminHall){
        hallTag.appendChild(ulTag);
        sectionTag.appendChild(hallTag);
      };
    };
     main.appendChild(sectionTag);
   };
  document.querySelectorAll('.movie-seances__time').forEach(a => a.addEventListener('click', chooseSession));
};

// Функция для 
function chooseSession(event) {
  //event.preventDefault();
  const selectedSeance = event.target.dataset;
  localStorage.clear();

  storedData.films.result.forEach(film => {
    if (film.film_id === selectedSeance.filmid){
      localStorage.setItem('filmName',film.film_name);      
    };
  });
  storedData.seances.result.forEach(seance => {
    if (seance.seance_id === selectedSeance.seanceid){
      localStorage.setItem('seanceStart',seance.seance_time);      
    };
  });
  storedData.halls.result.forEach(hall => {
    if (hall.hall_id === selectedSeance.hallid){
      localStorage.setItem('hallName', hall.hall_name);
      localStorage.setItem('hallPrice', hall.hall_price_standart);
      localStorage.setItem('hallPriceVip', hall.hall_price_vip);
      localStorage.setItem('hallConfig', hall.hall_config);    
    };
  }); 
};
