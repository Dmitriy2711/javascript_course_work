window.addEventListener('load', (e) => {
	let array = ["img/nature/barley.jpg", "img/nature/blacktop-water.jpg", "img/nature/converse-fields.jpg", "img/nature/e76494ac.jpg", "img/nature/palm-trees.jpg", "img/nature/photo-1423768164017-3f27c066407f.jpg", "img/nature/photo-1427464407917-c817c9a0a6f6.jpg", "img/nature/photo-1434871619871-1f315a50efba.jpg", "img/nature/photo-1442512595331-e89e73853f31.jpg", "img/nature/photo-1445346366695-5bf62de05412.jpg", "img/nature/sky-rose.jpg"]
	let arrayAuto = ["img/car/110C9.jpg", "img/car/1540546122.jpg", "img/car/1540546123.jpg", "img/car/3814662420.jpg", "img/car/car.jpg", "img/car/dt1.0-720x405.jpg", "img/car/NSX.jpg"]
	let arrayAnimal = ["img/animal/380-popugaj-oboi-zhivotnye-1366x768.jpg", "img/animal/a-small-elephant-wallpaper-1366x768.jpg", "img/animal/colorful-fish-wallpaper-1366x768.jpg", "img/animal/ezhik-wallpaper-1366x768.jpg", "img/animal/fish-wallpaper-1366x768.jpg", "img/animal/photo-1440227537815-f4476b789291.jpg", "img/animal/photo-1453227588063-bb302b62f50b.jpg", "img/animal/photo-1458324124043-7803d4fec380.jpg", "img/animal/seals-wallpaper-1366x768.jpg", "img/animal/squirrel-wallpaper-1366x768.jpg", "img/animal/white-tiger-wallpaper-1366x768.jpg"]
	let arrayAll = [array, arrayAuto, arrayAnimal];
	if(localStorage.getItem('posImg')){
		let storageArray = JSON.parse(localStorage.getItem('posImg'));
	   	arrayAll = storageArray;
	}
	else{
		localStorage.setItem('posImg', JSON.stringify(arrayAll))
		let storageArray = JSON.parse(localStorage.getItem('posImg'));
	   	arrayAll = storageArray;
	}
	
	let popularWraper = document.querySelectorAll('.popular__wraper')
		popularWraper.forEach( (elem,item) => {
			let blockGallary = `
				<button data-name="prev" class='hover'>Prev</button>
					<div class="popular__img-block">
						<img src="" alt="img-1" class="popular__img">
					</div>
					<div class="popular__img-block">
						<img src="" alt="img-2" class="popular__img">
					</div>
					<div class="popular__img-block">
						<img src="" alt="img-3" class="popular__img">
					</div>
					<div class="popular__img-block">
						<img src="" alt="img-4" class="popular__img">
					</div>
				<button data-name="next">Next</button>
	            `
		elem.innerHTML = blockGallary;

	
	let popularWraperImg = elem.querySelectorAll('img');
	let count = 0;
	let popularWraperButton = elem.querySelectorAll('button');
	const changePosImg = () => {
	 	let el = arrayAll[item].splice(-1,1).join();
			arrayAll[item].unshift(el);
	 	 	popularWraperImg.forEach( (elem, it ) => {
  	 			elem.src = arrayAll[item][it];
	 	 	})			
	}
 	const toOverImage = (e) => {
 		localStorage.setItem('posImg', JSON.stringify(arrayAll))
		let storageArray = JSON.parse(localStorage.getItem('posImg'));
		// arrayAll = storageArray
		if(count > 0) elem.removeEventListener('mouseout', toOverImage)
		count ++;
	let interval = setInterval(changePosImg, 2000)	

		// e.stopPropagation();
		// if(count > 0) popularWraper.removeEventListener('mouseover', toOverImage)
	elem.addEventListener('mouseout', () => {
		clearInterval(interval);
		})
		popularWraperButton.forEach( (elem, it) => {
			elem.addEventListener('click', (e) => {
				clearInterval(interval);
			})
		})	
	}

	const setBigImg = (e) => {
		let arrayAllCopy = Object.assign([],arrayAll[item]);	
		let imgSRC = e.target.src;

		let viewImg = document.querySelector('.viewImg img')
		let viewImgButton = document.querySelectorAll('.viewImg button')
		let regV = /img\/[a-z]{1,6}\/([a-zA-Z0-9-]{1,}){1,}\.(jpg){0,}(gif){0,}(png){0,}/g
		let pregM = imgSRC.match(regV);
		let str = pregM.join();
		let indexEl = arrayAllCopy.findIndex( (el, it) => {
			if(el == str) {
				return it + 1;
			}
		});
		viewImg.src = arrayAllCopy[indexEl]; 	
		let hide = document.getElementById('hide')
		let hideButton = hide.querySelector('div #close')
		
			
			hide.setAttribute('style', 'display: block')
		let targetElem = e.target;
			
		const hideFunc = (e) => {
			hide.setAttribute('style', 'display: none')
		}
		hideButton.addEventListener('click', hideFunc)
		viewImgButton.forEach( (elem) => {
			elem.addEventListener('click', (e) => {
			    if(e.target.className == 'pr'){
			    	let unsetElem = arrayAllCopy.splice(0, 1).join();
			    	arrayAllCopy.push(unsetElem)
			    	viewImg.src = arrayAllCopy[indexEl];	
			    }
			    if(e.target.className == 'nx'){
			    	let unset = arrayAllCopy.splice(-1, 1).join();
			    	arrayAllCopy.unshift(unset)
			    	viewImg.src = arrayAllCopy[indexEl];	
			    }
			})
		})
	}
	const funcButton = (e) => {
		localStorage.setItem('posImg', JSON.stringify(arrayAll))
		let storageArray = JSON.parse(localStorage.getItem('posImg'));
		// arrayAll = storageArray
		// e.stopPropagation()
		let buttonData = e.target.dataset.name;

		if(buttonData == 'prev'){
			let elFirst = arrayAll[item].splice(0, 1).join();
				arrayAll[item].push(elFirst);

				popularWraperImg.forEach( (elem, it ) => {
					elem.src = arrayAll[item][it];

				})			
		}
		else if(buttonData == 'next'){
			let elLast = arrayAll[item].splice(-1,1).join();
				arrayAll[item].unshift(elLast);
				popularWraperImg.forEach( (elem, it ) => {
 					elem.src = arrayAll[item][it];

				})			
		}
	}
	const plusButton = (e) => {
		let elem = e.target;
			elem.style.transform = 'scale(1, 1)';
	}
	const minusButton = (e) => {
		let elem = e.target;
			elem.style.transform = 'scale(1, 1)';
	}
	popularWraperImg.forEach( (elem, it ) => {
		elem.src = arrayAll[item][it];

	})
	elem.addEventListener('mouseover', toOverImage)
	
	popularWraperButton.forEach( (elem, item) => {
		elem.addEventListener('click' , funcButton)
		// elem.addEventListener('mouseover', plusButton)
		// elem.addEventListener('mouseout', minusButton)
	})
	popularWraperImg.forEach( (elem, item) => {
		elem.addEventListener('click', setBigImg)
	})		
		})
})	
	