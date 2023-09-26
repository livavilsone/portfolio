
var titles = {'posters': "Posters", "flyers": "Flyers", "logos": "Logos", "web_design": "Web Design", "photo_processing": "Photo processing"}
var imageIndex = 0;
var galeryList = [];
var timeoutID = 0;
var imageList = [
      {"posters": ["./posters/P.png", "./posters/PLAKATS.jpg", "./posters/poster_sagatave.png", "./posters/vaakidoone.png"]}, 
      {"flyers": ["./flyers/Alk1.png","./flyers/Alk2.png","./flyers/Alk3.png","./flyers/Alk4.png","./flyers/Alk5.png","./flyers/A5-flyer_front-1.png","./flyers/A5-flyer_back-1.png", "./flyers/A5-flyer_front.png", "./flyers/A5-flyer_back.png"]},
      {"web_design": ["./phone-design/Splash_screen.png", "./phone-design/List_of_foods.png"]},
      {"photo_processing": ["./photo-processing/IMG_20180227.jpg"]},
      {"logos": ["./logo/LBJC_KNIFS_PNG.png", "./logo/Geometric.jpg", "./logo/sports-low-resolution-logo-black-on-transparent-background.png", "./logo/sports-low-resolution-logo-white-on-transparent-background.png"]}
      ]
function fetchImages() {
    setUpGalaryList();
    setUpGallery();
    showNextImage();
}

function setUpGalaryList(){
  imageList.forEach( (element, _k)=> {
      for( i in element){                
        for(var x=0; x<element[i].length; x++){
          galeryList.push(element[i][x])
        }
      }
    });
}
function setUpGallery() {
    var imageContainer = document.getElementById("imageContainerList");
    var img = null;
    imageList.forEach( (element, _k)=> {
      for( i in element){  
        document.querySelector('div.navbar').innerHTML += "<a href='#" + i + "'>" + titles[i] + "</a>"
        imageContainer.innerHTML += "<div type="+i+" id="+i+"><p>"+titles[i]+"</p></div>";
        active_node = document.querySelector('#imageContainerList div[type="'+i+'"]')
        for(var x=0; x<element[i].length; x++){
          img = '<a href="images/'+element[i][x]+'" target="_blank"> <img id="portfolioImage" class="gallery-image" src="images/'+element[i][x]+'" alt="Portfolio Image"></a>'
          active_node.innerHTML += img;
        }
      }
    });
}
// Function to display the next image
function showNextImage() {
    var imageContainer = document.getElementById("imageContainer");
    var portfolioImage = document.getElementById("portfolioImage");
    if (imageIndex < galeryList.length) {
        var imageUrl = "./images/" + galeryList[imageIndex];
        portfolioImage.src = imageUrl;
        imageIndex++;
    } else {
        // If all images have been displayed, reset the index
        imageIndex = 0;
    }

    // Automatically show the next image after 3 seconds
    clearTimeout(timeoutID);
    timeoutID = setTimeout(showNextImage, 3000);
}


function showPrevImage() {
    if (imageIndex > 1){
      imageIndex -= 2;
    } else {
      imageIndex = galeryList.length-1;
    }
    clearTimeout(timeoutID);
    timeoutID = setTimeout(showNextImage, 0);
}
document.querySelector('div.header .prev').addEventListener('click', function(e) {showPrevImage()});
document.querySelector('div.header .next').addEventListener('click', function(e) {showNextImage()});

// Call the fetchImages function to start fetching the image file names
import data from './images.json' assert { type: 'json' };
fetchImages();