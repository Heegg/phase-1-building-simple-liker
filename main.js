// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const errorModal = document.querySelector("#modal")

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Has Loaded")
  //* Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
  errorModal.classList.add("hidden")

  // CALL FIND LIKES
  //1.
  // findLikes()
  //2.
  clickListener()
})

function hideError(){
  errorModal.classList.add("hidden")
}

 //1. This is ok but it has too many eventListener
  function findLikes(){
    const likeArr = document.querySelectorAll(".like-glyph")

    likeArr.forEach((singularLike) => {
      singularLike.addEventListener("click", () => console.log("YOU FOUND ME! LIKE!"))
    })
  }
  //2.
  // function clickListener(){
  //   document.addEventListener('click', (e) => {
  //     // if I click on the heart then console.log("YOU FOUND ME! LIKE!") otherwise do nothing
  //     if (e.target.classList.value === 'like-glyph'){
  //       console.log("YOU FOUND ME! LIKE!")
  //     }
  //   })
  // }

  //* When a user clicks on an empty heart:
  //* Invoke `mimicServerCall` to simulate making a server request
    function clickListener(){
    document.addEventListener("click", (e) => {
      // if I click on the heart then console.log("YOU FOUND ME! LIKE!") otherwise do nothing
      if (e.target.classList[0] === "like-glyph"){
        //PROMISE!! ASYNC WE NEED A .THEN
        //* When the "server" returns a failure status:
        // * Respond to the error using a `.catch(() => {})` block after your `.then(() => {})` block.
        // * When the "server" returns a success status:
        // * Change the heart to a full heart
        // * Add the `.activated-heart` class to make the heart appear red
        mimicServerCall()
          .then((resp) => {
            const activated = e.target.classList.contains("activated-heart")
            if(activated){
              e.target.classList.remove("activated-heart")
              e.target.innerHTML = EMPTY_HEART
            } else {
              e.target.classList.add("activated-heart")
              e.target.innerHTML = FULL_HEART
            }
            activated
          }) //.300 ms
          .catch(error => {
            console.log(error)
            errorModal.remove("hidden")
            
            // // * Display the error modal by removing the `.hidden` class
            // // * Display the server error message in the modal
            // errorModal.classList.remove("hidden")

            // * Use `setTimeout` to hide the modal after 3 seconds (add the `.hidden` class)
            setTimeout(() => {
              hideError()
            }, 3000)
          }) //PROMISE FAILS, .catch -> catches it. 
      }
    })
  }


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
