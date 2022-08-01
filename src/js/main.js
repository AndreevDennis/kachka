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
	mobileNav.focus();
});

headerCloseBtn.addEventListener("click", () => {
	document.removeEventListener("keydown", handlesearchSectionKeyboard);

	for (let i = 0; i < searchSectionElements.length; i++) {
		searchSectionElements[i].hidden = true;
	}

	mobileNav.classList.remove("mobile-nav--active");
	mobileNav.setAttribute("aria-hidden", true);
	headerOpenBtn.focus();
});

// MODAL
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const confirmButton = document.querySelector(".modal__btn");
const openModalBtn = document.querySelector("#getDuck");

let focusables = [];
focusables = Array.from(modal.querySelectorAll("button"));

const handleModalKeyboard = onTab(modal, focusables);

openModalBtn.addEventListener("click", () => {
	for (let i = 0; i < focusables.length; i++) {
		focusables[i].hidden = false;
	}

	modal.setAttribute("aria-hidden", false);
	modal.classList.add("modal--visible");
	closeButton.focus();
	document.body.style.overflowY = "hidden";
	document.addEventListener("keydown", handleModalKeyboard);
});

/* Close modal on close */
closeButton.addEventListener("click", () => {
	for (let i = 0; i < focusables.length; i++) {
		focusables[i].hidden = true;
	}

	modal.setAttribute("aria-hidden", true);
	modal.classList.remove("modal--visible");
	document.body.style.overflowY = "initial";
	document.removeEventListener("keydown", handleModalKeyboard);
	openModalBtn.focus();
});

/* Close modal on confirm */
confirmButton.addEventListener("click", () => {
	for (let i = 0; i < focusables.length; i++) {
		focusables[i].hidden = true;
	}

	modal.setAttribute("aria-hidden", true);
	modal.classList.remove("modal--visible");
	document.body.style.overflowY = "initial";
	document.removeEventListener("keydown", handleModalKeyboard);
});
