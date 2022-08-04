document.addEventListener("DOMContentLoaded", () => {
	const eggVideo = document.querySelector(".about__egg");
	const bgVideo = document.querySelector(".preview__iframe");

	function videoFallback(video) {
		var img = video.querySelector("img");
		if (img) video.parentNode.replaceChild(img, video);
	}

	eggVideo.onerror = function () {
		videoFallback(eggVideo);
	};

	async function playVideo(videoElem) {
		if (videoElem.tagName !== "VIDEO") return;

		try {
			await videoElem.play();
		} catch (err) {
			console.log(err);
		}
	}

	playVideo(eggVideo);
	playVideo(bgVideo);

	function onTab(wrapper, focusableElements) {
		const block = wrapper;
		const elements = focusableElements;

		return function (event) {
			if (event.key === "Escape") {
				modal.hidden = true;
				configureButton.focus();
			}

			if (event.key === "Tab") {
				event.preventDefault();

				let index = elements.findIndex((f) => f === block.querySelector(":focus"));

				if (event.shiftKey === true) {
					index--;
				} else {
					index++;
				}
				if (index >= elements.length) {
					index = 0;
				}
				if (index < 0) {
					index = elements.length - 1;
				}

				elements[index].focus();
			}
		};
	}

	// MOBILE NAVIGATION
	const mobileNav = document.querySelector(".mobile-nav");
	const headerOpenBtn = document.querySelector("#openHeader");
	const headerCloseBtn = document.querySelector("#closeHeader");

	let searchSectionElements = [];
	searchSectionElements = Array.from(mobileNav.querySelectorAll("button, a"));

	const handlesearchSectionKeyboard = onTab(mobileNav, searchSectionElements);

	headerOpenBtn.addEventListener("click", () => {
		document.addEventListener("keydown", handlesearchSectionKeyboard);

		for (let i = 0; i < searchSectionElements.length; i++) {
			searchSectionElements[i].hidden = false;
		}

		mobileNav.classList.add("mobile-nav--active");
		mobileNav.setAttribute("aria-hidden", false);
		document.body.classList.remove("body__overflow--visible");
		document.body.classList.add("body__overflow--hidden");
		mobileNav.focus();
	});

	headerCloseBtn.addEventListener("click", () => {
		document.removeEventListener("keydown", handlesearchSectionKeyboard);

		for (let i = 0; i < searchSectionElements.length; i++) {
			searchSectionElements[i].hidden = true;
		}

		mobileNav.classList.remove("mobile-nav--active");
		mobileNav.setAttribute("aria-hidden", true);
		document.body.classList.remove("body__overflow--hidden");
		document.body.classList.add("body__overflow--visible");
		headerOpenBtn.focus();
	});

	mobileNav.addEventListener("click", (event) => {
		const target = event.target;

		if (target.tagName === "A") {
			document.removeEventListener("keydown", handlesearchSectionKeyboard);

			for (let i = 0; i < searchSectionElements.length; i++) {
				searchSectionElements[i].hidden = true;
			}

			mobileNav.classList.remove("mobile-nav--active");
			mobileNav.setAttribute("aria-hidden", true);
			document.body.classList.remove("body__overflow--hidden");
			document.body.classList.add("body__overflow--visible");
		}
	});

	// MODAL & ROLL
	const modal = document.querySelector(".modal");
	const closeButton = document.querySelector(".modal__close");
	const confirmButton = document.querySelector(".modal__btn");
	const openModalBtn = document.querySelector("#getDuck");
	const getRows = document.querySelectorAll(".get__row");
	const modalImg = document.querySelector(".modal__img");

	const getRowsAnimationDuration = 3500;

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let focusables = [];
	focusables = Array.from(modal.querySelectorAll("button"));

	const handleModalKeyboard = onTab(modal, focusables);

	openModalBtn.addEventListener("click", () => {
		openModalBtn.disabled = true;

		for (const row of getRows) {
			row.classList.remove("get__row--paused");
			row.classList.add("get__row--runnig");
		}

		const randomNumber = getRandomInt(1, 41);
		modalImg.src = `./img/all-ducks/${randomNumber}.png`;

		setTimeout(() => {
			for (const row of getRows) {
				row.classList.add("get__row--paused");
			}

			for (let i = 0; i < focusables.length; i++) {
				focusables[i].hidden = false;
			}

			modal.setAttribute("aria-hidden", false);
			modal.classList.add("modal--visible");
			closeButton.focus();
			document.body.classList.remove("body__overflow--visible");
			document.body.classList.add("body__overflow--hidden");
			document.addEventListener("keydown", handleModalKeyboard);
		}, getRowsAnimationDuration);
	});

	/* Close modal on close */
	closeButton.addEventListener("click", () => {
		openModalBtn.disabled = false;

		for (const row of getRows) {
			row.classList.remove("get__row--runnig");
		}

		for (let i = 0; i < focusables.length; i++) {
			focusables[i].hidden = true;
		}

		modal.setAttribute("aria-hidden", true);
		modal.classList.remove("modal--visible");
		document.body.classList.remove("body__overflow--hidden");
		document.body.classList.add("body__overflow--visible");
		document.removeEventListener("keydown", handleModalKeyboard);
		openModalBtn.focus();
	});

	/* Close modal on confirm */
	confirmButton.addEventListener("click", () => {
		for (const row of getRows) {
			row.classList.remove("get__row--runnig");
		}

		for (let i = 0; i < focusables.length; i++) {
			focusables[i].hidden = true;
		}

		modal.setAttribute("aria-hidden", true);
		modal.classList.remove("modal--visible");
		document.body.classList.remove("body__overflow--hidden");
		document.body.classList.add("body__overflow--visible");
		document.removeEventListener("keydown", handleModalKeyboard);
	});
});
