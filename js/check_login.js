window.addEventListener('DOMContentLoaded', function() {

	let bookItem = document.getElementsByClassName('books'),
		containerBook = document.querySelector('.book-item'),
		nameBookValue = document.getElementById('bookName'),
		deleteElement = document.getElementById('delete'),
		// hideClose = deleteElement.querySelector('.close'),
		containerValueAndBook = document.querySelector('.container-bookList'),
		blockBook = document.querySelector('.block-book'),
		sch = 0,
		borderSch = 0;

	// // --------------------------------------------------------
	
	getResource("http://localhost:3000/bookElements")
		.then(data => {
			createBooks(data.reverse());
			sch = data.length;
		})
		.catch(err => console.log(err));

	async function getResource(url) {
		const res = await fetch(`${url}`); 

		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	function createBooks(response) {
		for (let i = 0; i < response.length; i++){
			let newBook = document.createElement('li'),
	    		newSpan = document.createElement('span'),
	    		close = document.createElement('div'),
				link = document.createElement('a');

			link.href = response[i].link;
			link.textContent = response[i].name;
			newBook.id = response[i].id;
	    	newBook.classList.add('books');
	    	close.classList.add('close');
			newBook.append(link);
			newBook.append(newSpan);
			newSpan.textContent = response[i].time;

			newBook.append(close);
			blockBook.style.opacity = '1';
			containerBook.appendChild(newBook);
			borderSch = response.length - 1;
		}

		bookItem[borderSch].style.borderBottom = "none";
	}

	// // ---------------------

	nameBookValue.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			if (nameBookValue.value == '') {
				alert('Введите название учебника');
			} else {
				let newBook = document.createElement('li'),
	    			newSpan = document.createElement('span'),
	    			close = document.createElement('div'),
					link = document.createElement('a');

				reqValue = nameBookValue.value;
				// s = bookItem[bookItem.length - 1].querySelector('li').id;
				link.href = '/WYSIWYG/index.html';
				link.textContent = `${nameBookValue.value} `;
				sch += 1;
				newBook.id = sch;
		    	newBook.classList.add('books');
		    	close.classList.add('close');

		    	let Data = new Date(),
				Year = Data.getFullYear(),
				Month = ((Data.getMonth() + 1) < 9) ? '0' + (Data.getMonth() + 1) : (Data.getMonth() + 1),
				Day = (Data.getDate() < 9) ? '0' + Data.getDate() : Data.getDate(),
				Hours = (Data.getHours() < 9) ? '0' + Data.getHours() : Data.getHours(),
				Minutes = (Data.getMinutes() < 9) ? '0' + Data.getMinutes() : Data.getMinutes(),
				Seconds = (Data.getSeconds() < 9) ? '0' + Data.getSeconds() : Data.getSeconds();

				let time = `${Hours}:${Minutes}:${Seconds}`,
					yearMonthDay = `${Day}-${Month}-${Year}`;

				newBook.append(link);
		    	newBook.append(newSpan);
		    	newSpan.textContent = ` ${time} ${yearMonthDay}`;

		    	newBook.append(close);
		    	// containerBook.appendChild(newBook);
				// bookItem[0].before(newBook);
				nameBookValue.value = "";
				blockBook.style.opacity = '1';
		    	console.log(bookItem);

	    		if(bookItem.length == 0) {
					containerBook.appendChild(newBook);
				} else {
					bookItem[0].before(newBook);
					console.log(bookItem.length);
				}
				bookItem[bookItem.length - 1].style.borderBottom = "none";
				console.log(bookItem);

				// Отправка запросов

				// --------------------------------------------------------
	
				function req() {
					// event.preventDefault();

					let obj = {
						name: reqValue,
						link: "/WYSIWYG/index.html",
						time: ` ${time} ${yearMonthDay}`,
						id: sch
					};

					postResource("http://localhost:3000/bookElements", obj);
				}

				req();

				async function postResource(url, data) {
					const res = await fetch(`${url}`, {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(data)
					});

					if(!res.ok) {
						throw new Error(`Could not fetch ${url}, status: ${res.status}`);
					}

					// return await res.json();
				}

				// ---------------------

			}
		}
	});

	function checkItem(n) {
		if(n == 0) {
			blockBook.style.opacity = '0';
		} else if (n > 0) {
			blockBook.style.opacity = '1';
		}
	}
	checkItem(bookItem.length);


	// Remove Element

	let removeId = document.getElementsByClassName('close');

	containerValueAndBook.addEventListener('click', function(event) {
		target = event.target;
		if (target && target.classList.contains('close')){
			for (let i = 0; i < removeId.length; i++) {
				if (target == removeId[i]) {

					// remove JSON elements - START

					getResource("http://localhost:3000/bookElements")
						.then(data => {
							data.reverse().splice(i, 1);
							console.log(data);
							postReq(data);

						})
						.catch(err => console.log(err));

					async function getResource(url) {
						const res = await fetch(`${url}`); 

						if(!res.ok) {
							throw new Error(`Could not fetch ${url}, status: ${res.status}`);
						}

						return await res.json();
					}

					function postReq(response) {
						function req(e) {
							// event.preventDefault();
							
							postResource("http://localhost:3000/bookElements", response);
						}

						req();

						async function postResource(url, data) {
							const res = await fetch(`${url}`, {
								method: "POST",
								headers: {
									"Content-type": "application/json"
								},
								body: JSON.stringify(response)
							});

							if(!res.ok) {
								throw new Error(`Could not fetch ${url}, status: ${res.status}`);
							}

							// return await res.json();
						}
					}

					// remove JSON elements - END

					bookItem[i].remove();
					console.log(bookItem);

					if (bookItem.length != 0){
						bookItem[bookItem.length - 1].style.borderBottom = "none";
					}
					checkItem(bookItem.length);

					break;
				}
			}
		}
	});

});
