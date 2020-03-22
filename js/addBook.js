window.addEventListener('DOMContentLoaded', function() {

	let bookName = document.getElementById('book-name'),
		btnName = document.querySelector('.btn-name'),
		booksList = document.querySelector('.books'),
		bookItems = booksList.getElementsByTagName('li');

	console.log(bookName);
	console.log(btnName);
	console.log(booksList);
	console.log(bookItems);


	btnName.addEventListener('click', function() {
		if (bookName.value == '') {
			alert('Ошибка! Введите название');
		} else {
			let newBook = document.createElement('li'),
				newLink = document.createElement('a'),
				newDelete = document.createElement('div'),
				newSpan = document.createElement('span');

			newLink.href = "/WYSIWYG/index.html";
			newLink.textContent = bookName.value;
			newBook.append(newLink);
			newDelete.textContent = 'Удалить';
			newDelete.classList.add('delete');
			newBook.append(newDelete);

			let Data = new Date(),
				Year = Data.getFullYear(),
				Month = ((Data.getMonth() + 1) < 9) ? '0' + (Data.getMonth() + 1) : (Data.getMonth() + 1),
				Day = (Data.getDate() < 9) ? '0' + Data.getDate() : Data.getDate(),
				Hours = (Data.getHours() < 9) ? '0' + Data.getHours() : Data.getHours(),
				Minutes = (Data.getMinutes() < 9) ? '0' + Data.getMinutes() : Data.getMinutes(),
				Seconds = (Data.getSeconds() < 9) ? '0' + Data.getSeconds() : Data.getSeconds();

			let time = `${Hours}:${Minutes}:${Seconds}`,
				yearMonthDay = `${Day}-${Month}-${Year}`;

			newSpan.textContent = ` ${time} ${yearMonthDay}`;
			newBook.append(newSpan);

			if(bookItems.length == 0) {
				booksList.append(newBook);
			} else {
				bookItems[0].before(newBook);
			}

			bookName.value = '';
		};
	});

	let removeId = document.getElementsByClassName('delete');

	booksList.addEventListener('click', function(event) {
		target = event.target;
		console.log(target);
		if (target && target.classList.contains('delete')) {
			for (let i = 0; i < removeId.length; i++) {
				if (target == removeId[i]) {
					bookItems[i].remove();
					break;
				}
			}
		}
	});
});