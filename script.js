const html = `<div class="container__text--header">
                       <p class="container__text--header--para">Edit Off</p>
                       <div class="toggle">
                         <div class="toggle__cir"></div>
                       </div>
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         class="delete-icon"
                       >
                         <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                         />
                       </svg>
                     </div>
                     <textarea
                       name="text"
                       class="container__text--text-area text-area"
                       value=""
                     ></textarea>`;

/*     FUNCTION                         */
function runMulFun(itm, id) {
  deleteBtnFun();
  toggleBtn();
  addStyleToToggle(itm, id);
}

function getElementArray(ele) {
  return document.querySelectorAll(ele);
}

function updateEntry(arr) {
  if (!arr.toggle) localStorage.setItem("notesArray", JSON.stringify(arr));
}

const createNote = (e) => {
  e.preventDefault();
  createEle();
  // GET INPUT FROM TEXTAREA
  let obj = { inputText: "", toggle: false };
  localData = [...localData, obj];
  inputField();
  updateEntry(localData);
};

// FUNCTION FOR DELETE BUTTON
function deleteBtnFun() {
  document.querySelectorAll(".delete-icon").forEach((itm, i) => {
    itm.addEventListener("click", function (e) {
      e.preventDefault();

      localData = localData.filter((itm, x) => localData.indexOf(itm) != i);

      updateEntry(localData);

      const parent = itm.parentElement.parentElement;
      localStorage.removeItem("mytime");
      parent.remove();
    });
  });
}

function inputField() {
  getElementArray(".text-area").forEach((itm, ind) => {
    itm.addEventListener("input", (e) => {
      // e.preventDefault();

      let { inputText, toggle } = localData[ind];
      // if (toggle) {
      // itm.setAttribute("readonly", true);
      // } else {
      console.log(inputText,toggle);

      // itm.setAttribute("readonly", false);
      localData[ind].inputText = e.target.value;
      updateEntry(localData);
      // }
    });
  });
}

function createEle(text = "") {
  // create element
  const divEle = document.createElement("div");
  divEle.innerHTML = html;
  divEle.classList.add("container__text--items");
  const textContainer = document.querySelector(".container__text");
  textContainer.appendChild(divEle);

  // ASSIGN VALUE

  if (text != "") {
    let textEle = getElementArray(".text-area");
    textEle[textEle.length - 1].value = text;
  }
}

//TOGGLE BUTTON
function addStyleToToggle(itm, ind = 0) {
  const allToggleCir = getElementArray(".toggle__cir");
  allToggleCir[ind].style.left = localData[ind].toggle ? "-1px" : "2rem";
  allToggleCir[ind].style.backgroundColor = localData[ind].toggle
    ? "rgb(44, 150, 192)"
    : "#fff";

  itm.style.backgroundColor = localData[ind].toggle
    ? "whitesmoke"
    : "rgb(44, 150, 192)";
}

function toggleBtn() {
  let toggleEle = getElementArray(".toggle");
  toggleEle.forEach((itm, ind) => {
    itm.addEventListener("click", function (e) {
      e.preventDefault();
      localData[ind].toggle = !localData[ind].toggle;

      addStyleToToggle(itm, ind);
      updateEntry(localData);
    });
  });
}

// //
const addBtn = document.querySelector(".container__btn");

let localData = JSON.parse(localStorage.getItem("notesArray"));

if (localData) {
  localData = localData.flatMap((num) => num);
  localData.forEach((itm, id) => {
    let { inputText } = itm;
    createEle(inputText);
    // runMulFun(itm, id);
  });
}

//ADD EVENT ON ADDBTN
addBtn.addEventListener("click", createNote);
window.addEventListener("click", inputField);
window.addEventListener("load", runMulFun);
