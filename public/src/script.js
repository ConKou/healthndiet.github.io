function myFunction() {
    let x = document.getElementById("mytopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// var modal = document.getElementById('id01');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

window.onscroll = function () { myFunction2() };

  var navbar = document.getElementById("mytopnav");
  var sticky = navbar.offsetTop;

  function myFunction2() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }

const book = document.querySelector(".topnav a:nth-child(5)")
console.log(book)
book.addEventListener("click", active)
function active(e) {
  let check = document.querySelector(".active")
  check.classList.remove("active")
  e.target.classList.add("active")
}
