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

//Address Class
class Addresses {
  constructor(
    id,
    firstName,
    lastName,
    email,
    phone,
    streetAddr,
    postCode,
    city,
    country,
    labels
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.streetAddr = streetAddr;
    this.postCode = postCode;
    this.city = city;
    this.country = country;
    this.labels = labels;
  }

  static getAddresses() {
    // from locslStaorage
    let addresses;
    if (localStorage.getItem("addresses") == null) {
      addresses = [];
    } else {
      addresses = JSON.parse(localStorage.getItem("addresses"));
    }
    return addresses;
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
      let isFormValid = getFormData();
      if (!isFormValid) {
        form.querySelectorAll("input").forEach((input) => {
          setTimeout(() => {
            input.classList.remove("errorMsg");
          }, 1500);
        });
      } else {
        let allItem = Addresses.getAddresses(); //this will create an empty array
        console.log(allItem);
      }
    }
  });
}

// Get form data
function getFormData() {
  let inputValidStatus = [];
  // console.log(
  //   form.addr_ing_name.value,
  //   form.first_name.value,
  //   form.last_name.value,
  //   form.email.value,
  //   form.phone.value,
  //   form.street_addr.value,
  //   form.postal_code.value,
  //   form.city.value,
  //   form.country.value
  // );
  if (
    !strRegex.test(form.addr_ing_name.value) ||
    form.addr_ing_name.value.trim().length == 0
  ) {
    errMsg(form.addr_ing_name);
    inputValidStatus[0] = false;
  } else {
    addrName = form.addr_ing_name.value;
    inputValidStatus[0] = true;
  }

  if (
    !strRegex.test(form.first_name.value) ||
    form.first_name.value.trim().length == 0
  ) {
    errMsg(form.first_name);
    inputValidStatus[1] = false;
  } else {
    firstName = form.first_name.value;
    inputValidStatus[1] = true;
  }

  if (
    !strRegex.test(form.last_name.value) ||
    form.last_name.value.trim().length == 0
  ) {
    errMsg(form.last_name);
    inputValidStatus[2] = false;
  } else {
    lastName = form.last_name.value;
    inputValidStatus[2] = true;
  }

  if (!emailRegex.test(form.email.value)) {
    errMsg(form.email);
    inputValidStatus[3] = false;
  } else {
    email = form.email.value;
    inputValidStatus[3] = true;
  }

  if (!phoneRegex.test(form.phone.value)) {
    errMsg(form.phone);
    inputValidStatus[4] = false;
  } else {
    phone = form.phone.value;
    inputValidStatus[4] = true;
  }

  if (!(form.street_addr.value.trim().length > 0)) {
    errMsg(form.street_addr);
    inputValidStatus[5] = false;
  } else {
    streetAddr = form.street_addr.value;
    inputValidStatus[5] = true;
  }

  if (!digitRegex.test(form.postal_code.value)) {
    errMsg(form.postal_code);
    inputValidStatus[6] = false;
  } else {
    postCode = form.postal_code.value;
    inputValidStatus[6] = true;
  }

  if (!strRegex.test(form.city.value) || form.city.value.trim().length == 0) {
    errMsg(form.city);
    inputValidStatus[7] = false;
  } else {
    city = form.city.value;
    inputValidStatus[7] = true;
  }

  // console.table(
  //   addrName,
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   streetAddr,
  //   postCode,
  //   city,
  //   country,
  //   labels
  // );
  country = form.country.value;
  labels = form.labels.value;
  return inputValidStatus.includes(false) ? false : true;
}

function errMsg(inputBox) {
  inputBox.classList.add("errorMsg");
}
