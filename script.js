const strRegex = /^[a-zA-Z\s]*$/; // contains only letters
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

// ---------------------------------------
const countryList = document.getElementById("country-list");
const fullscreenDiv = document.getElementById("bg-overlay");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");
const modalBtns = document.getElementById("modal-btns");
const form = document.getElementById("modal");
const addrBookList = document.querySelector("#addr-book-list tbody");
// --------------------------------------------

let addrName =
  (firstName =
  lastName =
  email =
  phone =
  streetAddr =
  postCode =
  city =
  country =
  labels =
    "");

// --------------------------
// UI CLASS
class UI {
  static showModal() {
    modal.style.display = "block";
    fullscreenDiv.style.display = "block";
  }

  static closeModal() {
    modal.style.display = "none";
    fullscreenDiv.style.display = "none";
  }
}

// ------------------------------
window.addEventListener("DOMContentLoaded", () => {
  loadJson(); //loading the countirs json
  eventListener();
});

//loading countries list
function loadJson() {
  fetch("countries.json")
    .then((res) => res.json())
    .then((data) => {
      //   console.table(data);
      let html = "";
      data.forEach((country) => {
        // console.log(country.country);
        html += `<option>${country.country}</option>`;
      });
      countryList.innerHTML = html;
    });
}

function eventListener() {
  //shoe modal

  addBtn.addEventListener("click", () => {
    // console.log("click");
    form.reset();
    document.getElementById("modal-title").innerHTML = "Add Address";
    UI.showModal();
    document.getElementById(
      "modal-btns"
    ).innerHTML = `<button type = "submit" id="save-btn">Save</button>`;
  });

  //closeModal
  closeBtn.addEventListener("click", UI.closeModal);

  //add an addres item
  modalBtns.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id == "save-btn") {
      let isFormValid = getFprmData();
    }
  });
}
