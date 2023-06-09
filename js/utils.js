const addFn = (firstParent, secondParent, value) => {
	firstParent.append(value);
	secondParent.append(firstParent);
}

const request = function* (url) {
	const response = yield fetch(url);
	const countries = yield response.json();
	const responseWeather = yield fetch(`https://wttr.in/${countries.capital}?format=j1`);
	const weatherArray = yield responseWeather.json();
	const weather = weatherArray.current_condition[0];
	return { countries, weather };
}

const asyncAlt = function (generatorFn, url) {
	return () => {
		const generator = generatorFn(url);
		function resolve(next) {
			if (next.done) {
				return Promise.resolve(next.value);
			}
			return Promise.resolve(next.value).then(response => {
				return resolve(generator.next(response))
			});
		}
		return resolve(generator.next());
	}
};

const outputInfo = (country, weather) => {
	const receivedData = [`Страна: ${country.name}`, `Столица: ${country.capital},`, `Температура в цельсиях: ${weather.temp_C} C°,`, `Направление ветра: ${weather.winddir16Point},`, `Скорость ветра: ${weather.windspeedKmph} км/ч,`, `Описание погоды: ${weather.weatherDesc[0].value}.`];
	const paragraph = document.createElement('div');
	const ul = document.createElement('ul');
	paragraph.classList.add('info__paragraph');
	ul.classList.add('info__ul');
	for (let i = 0; i < receivedData.length; i++) {
		const list = document.createElement('li');
		list.classList.add('info__li');
		addFn(list, ul, receivedData[i]);
		ul.append(list);
	};
	addFn(paragraph, infoContainer, ul);
	return ul;
}