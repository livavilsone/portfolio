
var titles = {'posters': "Posters", "flyers": "Flyers", "logos": "Logos", "web_design": "Web Design", "photo_processing": "Photo processing"}
var imageIndex = 0;
var galeryList = [];
var timeoutID = 0;
var imageList = {}
function fetchImages() {
    setUpGalaryList();
}

function setUpGalaryList(){
    fetch('https://livavilsone.github.io/portfolio/images-info.json')
    .then((response) => response.json())
    .then((data_json) => {
        for(key in data_json){
            if(this.imageList[key] === undefined){
                this.imageList[key] = []
            }
            for (x in data_json[key]){
                this.imageList[key].push(data_json[key][x]);
                this.galeryList.push(key + '/' + data_json[key][x]['name']);
            }
        }
        setUpGallery();
        setUpModalWindow();
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
              img = '<span href="images/'+key+'/'+this.imageList[key][i]['name']+'" description="'+ this.imageList[key][i]['description'] +'" class=\"open-modal\" > <img id="portfolioImage" class="gallery-image" src="images/'+key+'/'+this.imageList[key][i]['name']+'" alt="Portfolio Image"></span>'
              active_node.innerHTML += img;
        }
    }
}

function setUpModalWindow() {
    // document.querySelectorAll('open-modal');
    // document.querySelector('div.modal-view-window');
    document.querySelectorAll('.open-modal').forEach(function(node){
        node.addEventListener('click', function(e){
            document.querySelector('div.modal-view-window').classList.remove('hidden');
            document.querySelector('div.modal-view-window img').setAttribute('src', e.currentTarget.getAttribute('href'));

            var image_field = document.querySelector('div.modal-view-window img');
            var text_field = document.querySelector('.modal-view-window div');

            if(e.currentTarget.getAttribute('description') !== 'undefined' ){
                document.querySelector('div.modal-view-window .description').innerHTML= e.currentTarget.getAttribute('description');
            } else {
                document.querySelector('div.modal-view-window .description').innerHTML= '';
            }

            var width = image_field.getBoundingClientRect().right - image_field.getBoundingClientRect().left; // - text_field.getBoundingClientRect().right - text_field.getBoundingClientRect().left;
            var height = text_field.getBoundingClientRect().height;

            image_field.addEventListener('mouseenter', function(event){
                if(text_field.textContent != ""){
                    text_field.classList.remove('hidden');
                    image_field.style.opacity=0.5;
                    text_field.style.top = image_field.getBoundingClientRect().top + 'px';
                    text_field.style.left = image_field.getBoundingClientRect().left + 'px';
                    text_field.style.width = width + 'px';
                    text_field.style.paddingTop =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                    text_field.style.paddingBottom  =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                    text_field.style.marginTop =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                    text_field.style.marginTop  =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                }
            });
            image_field.addEventListener('mouseover', function(event){
                if(text_field.textContent != ""){
                    document.querySelector('.modal-view-window div').classList.remove('hidden');
                    image_field.style.opacity=0.5;
                    text_field.style.top = image_field.getBoundingClientRect().top + 'px';
                    text_field.style.left = image_field.getBoundingClientRect().left + 'px';
                    text_field.style.width = width + 'px';
                    text_field.style.paddingTop =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                    text_field.style.paddingBottom  =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                    text_field.style.marginTop =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                    text_field.style.marginTop  =  (image_field.getBoundingClientRect().height - text_field.getBoundingClientRect().height)/2  + 'px';
                }
            });
            image_field.addEventListener('mouseleave', function(event){
                if(text_field.textContent != ""){
                    document.querySelector('.modal-view-window div').classList.add('hidden');
                    image_field.style.opacity=1;
                }
            });
            document.querySelector('div.modal-view-window .close').addEventListener('click', function(event){
                event.currentTarget.parentElement.classList.add('hidden');
            });
        });
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