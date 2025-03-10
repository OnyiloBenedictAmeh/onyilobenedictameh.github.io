let menu = document.querySelector('#menu-btn');
let navbarLinks = document.querySelector('.header .navbar .links');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbarLinks.classList.toggle('active');
}

window.onscroll = () =>{
   menu.classList.remove('fa-times');
   navbarLinks.classList.remove('active');

   if(window.scrollY > 60){
      document.querySelector('.header .navbar').classList.add('active');
   }else{
      document.querySelector('.header .navbar').classList.remove('active');
   }
}
document.getElementById("toggleButton").addEventListener("click", function() {
   const moreText = document.querySelector(".more-text");
   if (moreText.style.display === "none" || moreText.style.display === "") {
      moreText.style.display = "block";
      this.textContent = "Read Less";
   } else {
      moreText.style.display = "none";
      this.textContent = "Read More";
   }
});