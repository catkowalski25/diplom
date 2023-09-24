document.querySelector('.ticket__title').innerHTML = localStorage.getItem('filmName');
document.querySelector('.ticket__start').innerHTML = localStorage.getItem('seanceStart');
document.querySelector('.ticket__hall').innerHTML = localStorage.getItem('hallName').slice(-1);
document.querySelector('.ticket__chairs').innerHTML = localStorage.getItem('booked');

const qrString = `Фильм "${localStorage.getItem('filmName')}" в ${localStorage.getItem('seanceStart')}, ${localStorage.getItem('hallName')} места: ${localStorage.getItem('booked')}.`;
console.log(qrString);

const qr = QRCreator(qrString);
console.log (qr)
document.querySelector('.ticket__info-qr').append(qr.result);

document.querySelector('.acceptin-button').addEventListener('click', () => qr.download())