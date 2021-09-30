// const e = require("express");

//--------------------------show the popup signup on clicking signup link---------------------------- 
document.querySelector(".show-signup").addEventListener("click", showSignup)

function showSignup() {
  document.querySelector(".container-signup").classList.add("container-signup-active");
  // console.log("okay")
  // console.log(document.querySelector(".container-signup"))

}

document.querySelector(".close-btn").addEventListener("click", closeSignup)

function closeSignup() {
  // console.log("clicked cross");
  document.querySelector(".container-signup").classList.remove("container-signup-active")
  // console.log(document.querySelector(".container-signup"))


};


//--------------------------show the popup forgot password on clicking forgot password link---------------------------- 
document.querySelector(".show-fpass").addEventListener("click", showFpass)
// console.log("okay")
function showFpass() {
  document.querySelector(".container-fpass").classList.add("container-fpass-active");
  // console.log("okay1")
  // console.log(document.querySelector(".container-fpass"))
}

document.querySelector(".close-btn-fpass").addEventListener("click", closeFpass)

function closeFpass() {
  // console.log("clicked cross");
  document.querySelector(".container-fpass").classList.remove("container-fpass-active")
  // console.log(document.querySelector(".container-fpass"))


};


/*---------------------------- Start : show errors on signup popup (validate form) -------------------------------------------*/

// console.log(eFirstName, eLastName, eSignEmail, eSignPass, eCSignPass)

//function to reset all errors everytime form submits
function clrerrors() {
  eReset = document.getElementsByClassName("signuperror");
  console.log(eReset)
  for (let items of eReset) {

    items.innerHTML = "";
  }

}

//function to set error into the span with the respective id
function setError(id, error) {
  Element = document.getElementById(id)
  Element.innerHTML = error;
}

function validateForm() {
  var returnVal = true;
  clrerrors();

  //perform validation . if false then set returnVal =  false !

  // ----------------firstName & lastName Validation----------------------
  var eFirstName = document.forms["signupForm"]["firstName"].value
  var eLastName = document.forms["signupForm"]["lastName"].value
  var spChar = /[^a-zA-Z]/; // check name for numbers and sp.chars
  var resFirst = spChar.test(eFirstName);
  var resLast = spChar.test(eLastName)

  //chech firstName for less than 3 char
  if (eFirstName.length < 3) {
    setError("eFirstName", "**Too short First Name !")
    returnVal = false;
  }
  // check names for numbers and sp.chars
  if (resFirst) {
    setError("eFirstName", "**Name should contain letters only !")
    returnVal = false;
  }
  if (resLast) {
    setError("eLastName", "**Name should contain letters only !")
    returnVal = false;
  }


  // ---------------- email validation----------------------
  var eSignEmail = document.forms["signupForm"]["email"].value;
  if (eSignEmail.length > 40) {
    setError("eSignEmail", "**Too long Email !")
    returnVal = false;
  }


  // ---------------- password validation----------------------
  var eSignPass = document.forms["signupForm"]["password"].value
  var eCSignPass = document.forms["signupForm"]["confirmPassword"].value
  if (eCSignPass != eSignPass) {
    setError("eCSignPass", "**Passwords not matching !")
    returnVal = false;
  }

  //check sp.characters
  var strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var result = strongPass.test(eSignPass);
  console.log(result);
  if (result == false) {
    setError("eSignPass", "**password must be min 8 char long, contain atleast one no. , one sp char & one upperCase char")
    returnVal = false;
  }
  return returnVal
}


  //getting elemennts by name syntax
  // var firstName = document.getElementsByName("firstName")[0].value;
  // var lastName = document.getElementsByName("lastName")[0].value;
  // var email = document.getElementsByName("email")[1].value;
  // var password = document.getElementsByName("password")[1].value;
  // var cpassword = document.getElementsByName("confirmPassword")[0].value;
  // console.log(firstName,lastName,email,password,cpassword);



