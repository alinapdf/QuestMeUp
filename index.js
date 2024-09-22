const menuBtn = document.querySelector(".header__menu");
const closedMenuItems = document.querySelectorAll(".item-inactive");
const headerWrapperOuter = document.querySelector(".header__wrapper-outer");

menuBtn.addEventListener("click", () => {
  closedMenuItems.forEach((menuItem) => {
    menuItem.classList.toggle("item-inactive");
  });
  headerWrapperOuter.classList.toggle("header__wrapper-outer-mobile");
  if (document.querySelector(".header__wrapper-outer-mobile")) {
    menuBtn.classList.add("header__menu_mobiile-active");
  } else {
    menuBtn.classList.remove("header__menu_mobiile-active");
  }
});

// profile photo

const fileInput = document.getElementById("fileInput");
const deleteBtn = document.getElementById("deletePhotoBtn");
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const profilePictures = document.querySelectorAll(".profile-picture");
      const initialsHeaders = document.querySelectorAll(".user__initial");
      const initialsProfiles = document.querySelectorAll(
        ".profile-initials_item"
      );

      profilePictures.forEach((picture) => {
        picture.src = e.target.result;
        picture.style.display = "block";
      });

      initialsHeaders.forEach((initial) => {
        initial.style.display = "none";
      });

      initialsProfiles.forEach((initial) => {
        initial.style.display = "none";
      });

      deleteBtn.classList.remove("disabled");
      deleteBtn.classList.add("btn", "mini-btn");
      deleteBtn.disabled = false;
    };

    reader.readAsDataURL(file);
  }
});

deleteBtn.addEventListener("click", function () {
  const profilePictures = document.querySelectorAll(".profile-picture");
  const initialsHeaders = document.querySelectorAll(".user__initial");
  const initialsProfiles = document.querySelectorAll(".profile-initials_item");

  profilePictures.forEach((picture) => {
    picture.style.display = "none";
  });

  initialsHeaders.forEach((initial) => {
    initial.style.display = "block";
  });

  initialsProfiles.forEach((initial) => {
    initial.style.display = "block";
  });

  deleteBtn.classList.add("disabled");
  deleteBtn.classList.remove("btn", "mini-btn");
  deleteBtn.disabled = true;
});

//дата
const dateInputs = document.querySelectorAll(".dateInput");

dateInputs.forEach((dateInput) => {
  dateInput.addEventListener("input", function () {
    const input = dateInput.value.replace(/\D/g, "");

    let formattedDate = "";
    if (input.length > 0) {
      formattedDate += input.substring(0, 2); // ДД
    }
    if (input.length >= 3) {
      formattedDate += "/" + input.substring(2, 4); // ММ
    }
    if (input.length >= 5) {
      formattedDate += "/" + input.substring(4, 8); // ГГГГ
    }

    dateInput.value = formattedDate;
  });
});

// modal window
const userNumerology = {
  name: "",
  dateOfBirth: "",
};
const numerologyInput = document.querySelector(".numerology-checkbox");
const popUp = document.querySelector(".pop-up");
const saveChanges = document.querySelector(".pop-up__form-btn");

const fioInput = document.querySelector("#fio");
const dateNumerologyInput = document.querySelector("#dateInput2");

numerologyInput.addEventListener("click", () => {
  if (numerologyInput.checked) {
    popUp.classList.remove("display-none");
  } else {
    popUp.classList.add("display-none");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".white-cross")) {
    popUp.classList.add("display-none");
  }
});

saveChanges.addEventListener("click", () => {
  popUp.classList.add("display-none");
  userNumerology.name = fioInput.value;
  userNumerology.dateOfBirth = dateNumerologyInput.value;
  alert(
    "Ваши данные про нумерологию: Полное имя:" +
      userNumerology.name +
      " Дата рождения: " +
      userNumerology.dateOfBirth
  );
});

//выбор пола

const genderForm = document.querySelector(".profile-form__gender");
const genderFormCurrent = document.querySelector(
  ".profile-form__gender-current"
);
const genderOptions = document.querySelectorAll(
  ".profile-form__gender-body-option"
);

genderFormCurrent.addEventListener("click", () => {
  genderForm.classList.toggle("profile-form__gender-active");
});

genderOptions.forEach((genderOption) => {
  genderOption.addEventListener("click", () => {
    genderFormCurrent.textContent = genderOption.textContent;
  });
});

// пароль

const newPasswordInput = document.querySelector("#change-password");
const confirmPassword = document.querySelector("#confirm-password");

const showPasswordBtn = document.querySelector(".show-password");
const hidePasswordBtn = document.querySelector(".hide-password");

showPasswordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newPasswordInput.type = "text";
  hidePasswordBtn.classList.remove("display-none");
  showPasswordBtn.classList.add("display-none");
});

hidePasswordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newPasswordInput.type = "password";
  hidePasswordBtn.classList.add("display-none");
  showPasswordBtn.classList.remove("display-none");
});

//валидация

const mainForm = document.querySelector(".profile__form");
const userName = document.querySelector("#name");
const surName = document.querySelector("#surname");
const phoneNumber = document.querySelector("#phone-number");
const dateInput = document.querySelector("#dateInput");
const mail = document.querySelector("#email");
const labels = document.querySelectorAll(".profile-form_label");

const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function handleValidationErrors(isValid, errorMessageText, index) {
  const errorMessage = labels[index].querySelector(".error-message");

  if (!isValid) {
    labels[index].classList.add("profile-form_label-active");
    errorMessage.classList.add("error-message-active");
    errorMessage.textContent = errorMessageText;
  } else {
    labels[index].classList.remove("profile-form_label-active");
    errorMessage.classList.remove("error-message-active");
    errorMessage.textContent = ""; // Очищаем текст сообщения
  }
}

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Проверка имени
  if (userName.value.trim() === "") {
    handleValidationErrors(false, "*Пустое поле", 0);
    isValid = false;
  } else if (!nameRegex.test(userName.value.trim())) {
    handleValidationErrors(false, "*Неверный формат имени", 0);
    isValid = false;
  } else {
    handleValidationErrors(true, " ", 0);
  }

  // Проверка фамилии
  if (surName.value.trim() === "") {
    handleValidationErrors(false, "*Пустое поле", 1);
    isValid = false;
  } else if (!nameRegex.test(surName.value.trim())) {
    handleValidationErrors(false, "*Неверный формат фамилии", 1);
    isValid = false;
  } else {
    handleValidationErrors(true, " ", 1);
  }

  // Проверка даты рождения
  if (dateInput.value.trim() === "") {
    handleValidationErrors(false, "*Пустое поле", 2);
    isValid = false;
  } else if (!dateRegex.test(dateInput.value.trim())) {
    handleValidationErrors(false, "*Неверный формат даты", 2);
    isValid = false;
  } else {
    const [day, month, year] = dateInput.value.split("/").map(Number);
    const currentYear = new Date().getFullYear();

    if (year > 2024 || !isValidDate(day, month, year)) {
      handleValidationErrors(
        false,
        "*Несуществующая дата или год позже 2024",
        2
      );
      isValid = false;
    } else {
      handleValidationErrors(true, " ", 2);
    }
  }

  // Проверка номера телефона
  if (phoneNumber.value.trim() === "") {
    handleValidationErrors(false, "*Пустое поле", 3);
    isValid = false;
  } else if (!phoneRegex.test(phoneNumber.value.trim())) {
    handleValidationErrors(false, "*Неверный формат телефона", 3);
    isValid = false;
  } else {
    handleValidationErrors(true, " ", 3);
  }

  //Проверка имейла
  if (mail.value.trim() === "") {
    handleValidationErrors(false, "*Пустое поле", 4);
    isValid = false;
  } else if (!emailRegex.test(mail.value.trim())) {
    handleValidationErrors(false, "*Неверный формат e-mail", 4);
    isValid = false;
  } else {
    handleValidationErrors(true, " ", 4);
  }

  // Проверка пола
  if (genderFormCurrent.textContent === "Выберите пол") {
    handleValidationErrors(false, "*Пол не выбран", 5);
    isValid = false;
  } else {
    handleValidationErrors(true, " ", 5);
  }

  //Проверка пароля
  if (newPasswordInput.value != confirmPassword.value) {
    handleValidationErrors(false, "*Пароли не совпадают", 10);
    isValid = false;
  } else {
    handleValidationErrors(true, " ", 7);
  }

  if (isValid) {
    alert("Форма валидна");
  }
});

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
