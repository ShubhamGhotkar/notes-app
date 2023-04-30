const addBtn = document.querySelector(".container__btn");
const textContainer = document.querySelector(".container__text");
const deleteBtn = document.querySelector(".delete-icon");
const toggleDiv = document.querySelector(".toggle");
const toggleCir = document.querySelector(".toggle__cir");
const textArea = document.querySelector(".container__text--text-area");

// toggle
let toggle = false;
let inpString = "";

addBtn.addEventListener("click", function () {
  textContainer.classList.remove("hidden");
});
deleteBtn.addEventListener("click", function () {
  textContainer.classList.add("hidden");
});
toggleDiv.addEventListener("click", function () {
  toggleCir.style.left = toggle ? "-1px" : "2rem";
  toggle = !toggle;
});
