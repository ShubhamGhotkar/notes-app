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
const createNote = (e) => {
  e.preventDefault();
  createEle();
  // GET INPUT FROM TEXTAREA
  let obj = { inputText: "", toggle: false };
  localData.push(obj);
  inputField();
  updateEntry(localData);
};

function inputField() {
  const allTextArea = document.querySelectorAll(".text-area");
  allTextArea.forEach((itm, ind) => {
    itm.addEventListener("input", (e) => {
      e.preventDefault();
      if (localData[ind].toggle) {
        itm.setAttribute("editable", false);
        // return;
      } else {
        itm.setAttribute("editable", true);
        localData[ind].inputText = e.target.value;
        updateEntry(localData);
      }
    });
  });
}

function updateEntry(arr) {
  if (!arr.toggle) localStorage.setItem("notesArray", JSON.stringify(arr));
}

window.addEventListener("click", inputField);
function createEle(text = "") {
  // create element
  const divEle = document.createElement("div");
  divEle.innerHTML = html;
  divEle.classList.add("container__text--items");
  const textContainer = document.querySelector(".container__text");
  textContainer.appendChild(divEle);

  // ASSIGN VALUE
  const allTextArea = document.querySelectorAll(".text-area");
  if (text != "") {
    allTextArea[allTextArea.length - 1].value = text.inputText;
  }
}
//
const addBtn = document.querySelector(".container__btn");

let localData = JSON.parse(localStorage.getItem("notesArray"));

if (localData) {
  localData = localData.flatMap((num) => num);
  localData.forEach((itm, ind) => createEle(itm));
}

//ADD EVENT ON ADDBTN
addBtn.addEventListener("click", createNote);

// EVENT LISTENER FOR DELETE OPERATION
document.querySelectorAll(".delete-icon").forEach((itm, i) => {
  itm.addEventListener("click", function (e) {
    e.preventDefault();

    // TO DELETE ENTRY
    localData = localData.filter((itm, x) => localData.indexOf(itm) != i);
    // TO UPDATE ENTRY
    updateEntry(localData);
    // TO DELTE ELEMENT
    const parent = itm.parentElement.parentElement;
    localStorage.removeItem("mytime");
    parent.remove();
  });
});
