const form = document.querySelector('form');
const searchArea = document.querySelector('#search__area');
const infoContainer = document.querySelector('.info__container');
const loader = document.querySelector('#preloader');
const noBorderCountry = document.createElement('div');
noBorderCountry.classList.add('info__paragraph');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	infoContainer.innerHTML = '';
	loader.style.display = 'block';
	const getCountry = asyncAlt(request, `http://146.185.154.90:8080/restcountries/rest/v2/name/${searchArea.value}`);
	getCountry().then(response => {
		outputInfo(response.countries[0], response.weather);
		const infoParagraph = document.querySelector('.info__paragraph');
		infoParagraph.style.background = 'yellow';
		infoParagraph.style.color = 'black';
		const borderCountry = response.countries[0].borders;
		if (borderCountry.length === 0) {
			const span = document.createElement('span');
			addFn(span, noBorderCountry, `Граничащих стран нет.`);
			infoContainer.append(noBorderCountry);
		}
		else {
			let counter = 0;
			for (let i = 0; i < borderCountry.length; i++) {
				const getBorders = asyncAlt(request, `http://146.185.154.90:8080/restcountries/rest/v2/alpha/${borderCountry[i]}`);
				getBorders().then(response => {
					counter++
					outputInfo(response.countries, response.weather).prepend(`${counter}-ая граничащая страна:`)
				});
			}
		}
		loader.style.display = 'none';
	}).catch(error => {
		console.log(error);
		myAlert('Вы ввели страну неверно!')
		loader.style.display = 'none';
	});
	infoContainer.style.display = 'block';
})
