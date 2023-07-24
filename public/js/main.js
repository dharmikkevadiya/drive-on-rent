var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

if (myModal)
  myModal.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });

function validateForm() {
  let name = document.forms["myForm"]["name"].value;
  let email = document.forms["myForm"]["email"].value;
  let password = document.forms["myForm"]["password"].value;

  var atposition = email.indexOf("@");
  var dotposition = email.lastIndexOf(".");

  if (name == "" || name == null) {
    alert("Name must be filled out");
    document.myForm.name.focus();
    return false;
  }
  if (email == "" || email == null) {
    alert("Email must be filled out");
    document.myForm.email.focus();
    return false;
  }
  if (password == "" || password == null) {
    alert("Password must be filled out");
    document.myForm.password.focus();
    return false;
  }
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= x.length
  ) {
    alert("Please enter valid email !!");
    document.myForm.email.focus();
    return false;
  }
}
