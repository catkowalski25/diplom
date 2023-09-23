let hallConfiguration = document.getElementsByClassName('conf-step__wrapper')[0];
hallConfiguration.innerHTML = localStorage.getItem('hallConfig');


function GetData(timestamp, hallId, seanceId) {
   fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST', 
    body: `event=get_hallConfig&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}`, 
    headers: {
      'Content-type': '	application/x-www-form-urlencoded',
    },
  })
 .then((response) => response.json())
 .then((data) => {
    console.log(data);
    storedHtml = data;
 });
};

