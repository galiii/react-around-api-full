export const settings = {
  // pass all the settings on call
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__input_error",
};

export const buttonsSettings = {
  loading: "Saving ...",
  edit: "Save",
  create: "Create",
};

//Card Template
export const cardTemplate = "#card-template";

//Card List
export const cardListSelector = ".cards__list";

//User Profile
export const nameProfileUserSelector = ".profile__name";
export const jobProfileUserSelector = ".profile__job";
export const imageProfileUserSelector = ".profile__image";

//Popup
export const editProfilePopupSelector = ".popup_type_edit-profile";
export const addCardPopupSelector = ".popup_type_add-card";
export const deleteCardPopupSelector = ".popup_type_delete-card";
export const updateUserInfoPopupSelector = ".popup_type_update-image-profile";

export const imagePopupSelector = ".popup_type_image";

//Image popup
export const imageSelector = ".popup__image";
export const captionSelector = ".popup__caption";

//Input
export const nameProfileEditInput = document.querySelector(
  ".form__input_type_name"
);
export const jobProfileEditInput = document.querySelector(
  ".form__input_type_job"
);
//const titleInput = document.querySelector(".form__input_type_card-title");
//const linkInput = document.querySelector(".form__input_type_card-link");

//Open Buttons
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".profile__add-button");

export const updateImageProfileButton = document.querySelector(
  ".profile__update-image"
);

//Models
export const editProfileModel = document.querySelector(
  ".popup_type_edit-profile"
);
export const addCardModel = document.querySelector(".popup_type_add-card");
export const updateImageModel = document.querySelector(
  ".popup_type_update-image-profile"
);

//Form
//export const formEditProfile = editProfileModel.querySelector(
  //settings.formSelector
//);
//export const formUpdateImage = updateImageModel.querySelector(
  //settings.formSelector
//);
//export const formAddCard = addCardModel.querySelector(settings.formSelector);

//Close buttons
//export const editModelCloseButton = editProfileModel.querySelector(
  //".popup__close-button"
//);

//export const addCardModelCloseButton = addCardModel.querySelector(
//  ".popup__close-button"
//);

//export const updateImageModelCloseButton = updateImageModel.querySelector(
  //".popup__close-button"
//);

//Input
/*export const profileNameInput = editProfileModel.querySelector(
  ".form__input_type_name"
);
export const profileJobInput = editProfileModel.querySelector(
  ".form__input_type_job"
);

export const profileImageInput = updateImageModel.querySelector(
  ".form__input_type_avatar"
);

export const cardTitleInput = addCardModel.querySelector(
  ".form__input_type_card-title"
);
export const cardLinkInput = addCardModel.querySelector(
  ".form__input_type_card-link"
);
//User
export const userNameElement = document.querySelector(".profile__name");
export const userJobElement = document.querySelector(".profile__job");
*/
export const SUCCESS = "Success! You have now been registered.";
export const FAILURE = "Oops, something went wrong! Please try again.";

