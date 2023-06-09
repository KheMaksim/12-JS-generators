const errorOverlay = document.querySelector('.overlay');
const errorAlert = document.querySelector('.alert');
const errorAlertBtn = document.querySelector('.alert__btn');

const myAlert = (text) => {
	errorOverlay.style.display = 'block';
	const title = document.querySelector('.alert__title');
	title.innerText = text;
	errorAlert.style.display = 'flex'
}
const closeAlert = () => {
	errorOverlay.style.display = 'none';
	errorAlert.style.display = 'none';
}
errorAlertBtn.addEventListener("click", closeAlert);
errorOverlay.addEventListener("click", closeAlert);