
  //SA ANIMATED ICONS
   const logoutAnimation = document.getElementById("logout-animation");
   const generateAnimation = document.getElementById("generate-animation");

   document.querySelector(".logout").addEventListener("mouseenter", () => {
       logoutAnimation.setAttribute("loop", "true");
       logoutAnimation.play();
   });

   document.querySelector(".logout").addEventListener("mouseleave", () => {
       logoutAnimation.removeAttribute("loop");
   });

   document.querySelector(".generate").addEventListener("mouseenter", () => {
       generateAnimation.setAttribute("loop", "true");
       generateAnimation.play();
   });

   document.querySelector(".generate").addEventListener("mouseleave", () => {
       generateAnimation.removeAttribute("loop");
       generateAnimation.stop();
   });

   //POPUP
   document.querySelector(".logout").addEventListener("click", () => togglePopup("popup-logout"));
   document.querySelector(".generate").addEventListener("click", () => togglePopup("popup-generate"));
   function togglePopup(popupId) {
       document.getElementById(popupId).classList.toggle("active");
   }

    //COPY NG GENERATE
   let copyText = document.querySelector(".copy-text");
   copyText.querySelector("button").addEventListener("click",function(){
       let input = copyText.querySelector("input.text");
       input.select();
       document.execCommand("copy");
       copyText.classList.add("active");
       window.getSelection().removeAllRanges();
       setTimeout(function(){
           copyText.classList.remove("active");
       },2500);
   })