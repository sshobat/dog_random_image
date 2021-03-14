// ***** JS AJAX HOMEWORK *****


// WHAT SHOULD YOU DO ?

// - Use https://dog.ceo/dog-api/ API

// - Create a page which should have one select field, where you could choose between 5 dog breeds

// - When breed is selected, page should load random image from that breed, every 5 seconds

// STEPS:

// STEP 1:

// Create HTML page, with select field predefined. It should contain 5 options, and each of them should be one breed. Each option should have a value (make sure that those values of breeds exist in that format on Dog API). First option should be defined by default.
//OK

// STEP 2:

// Create global variable for breed, and by default set it's value to value of first option inside select
//OK

// STEP 3:

// Add event listener on select, for changing a value. Each time value is changed you should get event target value, and set it as a value of already defined breed variable.
//OK

// STEP 4:

// Create new HTTP request, open it, and create load function that should handle response. When you open request, you should pass there an url, however, since we want to have different breeds, so url will be dynamic. 

// First find needed URL structure on Dog API website. 

// Then, in request open method, define url like this:

//   "Part of an url" + breed + "Part of an url"

//OK

// STEP 5:

// Create a function that should get image url as an argument, if there is no dog image on the page it should add it, and if it exist, it should change it's src to value you get as an parameter.

// STEP 6:

// Call this function inside of request load method, and pass image URL into this function as an parameter. You should first JSON.parse response in order to get image url from it.

// STEP 7:

// Set interval, which should, every 5 seconds, send request

var breed = document.querySelector('body > main > form > label > select').value;
var select = document.querySelector('body > main > form > label > select');
// set event listener for changing the breed
select.addEventListener('change', function(event) {
    // delete all previous interval functions
    for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
    // define breed and api url
    breed = event.currentTarget.value;
    var url = 'https://dog.ceo/api/breed/' + breed + '/images/random';
    // send request now and every 5s till next breed (event)
    sendRequest(url);
    setInterval(function() {
        sendRequest(url)
    }, 5000);
});
// send request function with image url extraction
function sendRequest(url) {
    var newRequest = new XMLHttpRequest();
    newRequest.open('GET', url);
    newRequest.onload = function(event) {
        if (newRequest.status === 200) {
            var obj = JSON.parse(newRequest.responseText);
            var src = obj.message;    
        }
        addDog(src);  
    }
    newRequest.send();
}
// add image on the screen
function addDog(src) {
    var image = document.querySelector('img');
    var div = document.querySelector('main > div');
    
    if(!image) {
        var image = document.createElement('img');
        image.setAttribute('src', src);
        div.append(image);
    } else {
        image.setAttribute('src', src);
    }
}