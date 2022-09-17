document.addEventListener("DOMContentLoaded", () => {
	// VIDEOS
	const userAgentString = navigator.userAgent;
	let chromeAgent = userAgentString.indexOf("Chrome") > -1;
	let safariAgent = userAgentString.indexOf("Safari") > -1;

	// Discard Safari since it also matches Chrome
	if (chromeAgent && safariAgent) safariAgent = false;

	function playVideo(videoElem) {
		if (videoElem.tagName !== "VIDEO") return;

		videoElem.play();
	}

	const eggVideo = document.querySelector(".about__egg");
	const eggImg = document.querySelector(".about__egg--img");
	const bgVideo = document.querySelector(".preview__iframe");
	const playVideoBtn = document.querySelector("#playVideo");

	playVideoBtn.addEventListener("click", () => {
		bgVideo.play();
		playVideoBtn.classList.add("preview__play--hiden");
		playVideoBtn.disabled = true;
	});

	if (window.matchMedia("(min-width: 1024px)").matches) {
		playVideoBtn.classList.add("preview__play--hiden");
		playVideoBtn.disabled = true;

		const sourseThree = document.createElement("source");
		sourseThree.src = "./img/videos/egg.webm";
		sourseThree.type = "video/webm";

		if (!safariAgent) {
			eggImg.classList.add("about__egg--img--none");
			eggVideo.classList.add("about__egg--visible");
			eggVideo.appendChild(sourseThree);
			playVideo(eggVideo);
		}
	}

	// TIMER
	const timerContainer = document.querySelector(".timer__time");

	const finalDate = new Date("October 14, 2022 00:01:00");

	function updateCounter() {
		const currentTime = new Date();
		const diff = finalDate - currentTime;

		let daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);
		let hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;
		let minutesLeft = Math.floor(diff / 1000 / 60) % 60;

		daysLeft < 0 ? (daysLeft = 0) : daysLeft;

		if (hoursLeft < 10 && hoursLeft > 0) {
			hoursLeft = "0" + hoursLeft;
		} else if (hoursLeft < 0) {
			hoursLeft = 0;
		}

		if (minutesLeft < 10 && minutesLeft > 0) {
			minutesLeft = "0" + minutesLeft;
		} else if (minutesLeft < 0) {
			minutesLeft = 0;
		}

		const finalTime = `${daysLeft} : ${hoursLeft} : ${minutesLeft}`;
		const metaTime = `${daysLeft}:${hoursLeft}:${minutesLeft}`;

		timerContainer.innerHTML = finalTime;
		timerContainer.dateTime = metaTime;
	}

	updateCounter();
	setInterval(updateCounter, 1000);

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

	// Observers
	const roadmapOptions = {
		root: null,
		rootMargin: "0px",
		treshold: 0.3,
	};

	const roadmapCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("roadmap__visible");
				observer.unobserve(entry.target);
			}
		});
	};

	const roadmapObserver = new IntersectionObserver(roadmapCallback, roadmapOptions);

	const roadmapElements = document.querySelectorAll(".roadmap__block, .roadmap__number");
	roadmapElements.forEach((el) => roadmapObserver.observe(el));

	const videoOptions = {
		root: null,
		rootMargin: "0px",
		treshold: 0.1,
	};

	const videoCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.play();
			} else {
				entry.target.pause();
			}
		});
	};

	let videoObserver = new IntersectionObserver(videoCallback, videoOptions);

	const video = document.querySelector(".preview__iframe");
	videoObserver.observe(video);

	// MODAL & ROLL
	const modal = document.querySelector(".modal");
	const closeButton = document.querySelector(".modal__close");
	const confirmButton = document.querySelector(".modal__btn");
	const openModalBtn = document.querySelector("#getDuck");
	const getRows = document.querySelectorAll(".get__row");
	const modalImg = document.querySelector(".modal__img");

	setTimeout(() => {
		modal.style.display = "flex";
	}, 20);

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
	});
});
