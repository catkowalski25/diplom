function requestData(bodyStr, callbackFn, params = 0) {
   fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST', 
    body: bodyStr, 
    headers: {
      'Content-type': '	application/x-www-form-urlencoded',
    },
   })
   .then((response) => response.json())
   .then((data) => {
      callbackFn(data, params);
   });
 };