let APIKEY = "e3aa5bf1";
 let searchInput = document.getElementById("searchInput");
 let searchButton = document.getElementById("searchBtn");  
 let favourites = document.getElementById("favourites"); 
 let jsonData;
 
 const getData = async (movie) => {
     try {
       let fetchData = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${movie}`);
       jsonData = await fetchData.json();
       console.log(jsonData);
   
       document.querySelector(".card").innerHTML = "";
       searchInput.value = "";
   
       if (jsonData.Response === "True") {
         jsonData.Search.forEach(async (movieItem) => {
 
           let details = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${movieItem.imdbID}`);
           let fullData = await details.json();
           createCard(fullData);
         });
       } else {
         document.querySelector(".card").innerHTML = "<h2>No movies found.</h2>";
       }
   
     } catch (error) {
       console.log(error);
       alert("Something went wrong!");
     }
   };
 
 
 searchButton.addEventListener("click", function () {
     let movieName = searchInput?.value; 
     
    
 
     if (movieName != "") {
         
         getData(movieName);
         
     }
     else {
         document.querySelector
     }
     if (movieName === "") {
        
         alert("Please enter a movie name");
         
     }
     })
 function addtofav()
 {
     let movieArr = JSON.parse(localStorage.getItem("movie")) || [];
     
     isPresent = movieArr.some((movie) => movie.imdbID === jsonData.imdbID); 
     if (isPresent) {
         alert("Movie already in favourites");
         return;
     }
 
 
     movieArr.push(jsonData); 
     localStorage.setItem("movie", JSON.stringify(movieArr));
     alert("Movie added to favourites"); 
 }
 
 function removefromfav()
 {
     let movieArr = JSON.parse(localStorage.getItem("movie")) || []; 
     movieArr = movieArr.filter((movie) => movie.imdbID !== jsonData.imdbID); 
     localStorage.setItem("movie", JSON.stringify(movieArr)); 
     alert("Movie removed from favourites"); 
 }
 
 
 document.addEventListener("keypress",(e)=>{
     if (e.key === "Enter") {
     searchButton.click();
     }
 }
 );
 
 function createCard(jsonData ,infav = false) {
 
     let div = document.createElement("div"); 
     div.classList.add("moviecard")      
  div.innerHTML=`
           <img src=${jsonData.Poster} alt="">
           <div class="cardText">     <!-- adding a class to the div element for styling.. -->
               <h1>${jsonData.Title}</h1>
                <p class ="rating" >Ratings :<span>${jsonData.Ratings && jsonData.Ratings[0] ? jsonData.Ratings[0].Value : "N/A"}</p>   <!--/getting the rating value from the API response -->
                <a href="">${jsonData.Genre}</a><br>  
                 <p>Released Date :<span>${jsonData.Released}</span></p>
                 <p>Writer :<span>${jsonData.Writer}</span></p>
                 <p>Description :<span>${jsonData.Plot}</span></p>
                 <p>Total Time :<span>${jsonData.Runtime}</span></p>
                 <p>Released Year : <span>${jsonData.Year}</span></p> 
 
                 ${infav ? `<button  onClick="removefromfav()" id ="favBtn"> Remove from favourite </button>` : `<button  onClick="addtofav()" id ="favBtn"> Add to favourite </button>`}
                
                
                 <!--checking if the movie is in favourites and displaying the appropriate button -->
             
  
     </div>
  `
  document.querySelector(".card").appendChild(div) ; 
 }
 
 favourites.addEventListener("click", function () 
 {
  
     const favmovies = JSON.parse(localStorage.getItem("movie")) || [];
     console.log(favmovies); 
     document.querySelector(".card").innerHTML = "";  
     favmovies.forEach((movie) => {
         createCard(movie , true); 
     });
 
 
 
 })