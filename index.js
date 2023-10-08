
var titles = {'posters': "Posters", "flyers": "Flyers", "logos": "Logos", "web_design": "Web Design", "photo_processing": "Photo processing"}
var imageIndex = 0;
var galeryList = [];
var timeoutID = 0;
var imageList = {}
function fetchImages() {
    setUpGalaryList();
}

function setUpGalaryList(){
    fetch('https://livavilsone.github.io/portfolio/images.json')
    .then((response) => response.json())
    .then((json) => {
        this.imageList = json;
        for(key in json){
            this.galeryList = this.galeryList.concat(json[key]);
        }
        setUpGallery();
        showNextImage();

    });
}
function setUpGallery() {
    var imageContainer = document.getElementById("imageContainerList");
    var img = null;

    for(var key in this.imageList){
        document.querySelector('div.navbar').innerHTML += "<a href='#" + key + "'>" + titles[key] + "</a>"
        imageContainer.innerHTML += "<div type="+key+" id="+key+"><p>"+titles[key]+"</p></div>";
        active_node = document.querySelector('#imageContainerList div[type="'+key+'"]')
        for(i in this.imageList[key]){
              img = '<a href="images/'+this.imageList[key][i]+'" target="_blank"> <img id="portfolioImage" class="gallery-image" src="images/'+this.imageList[key][i]+'" alt="Portfolio Image"></a>'
              active_node.innerHTML += img;
        }
    }
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
        imageIndex = 0;
    }

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
fetchImages();