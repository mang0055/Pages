var app = {
    UUID: "e6e7dec5e25c572c",
    image: null,
    imgOptions: null,
    cameraview1: null,
    cameraview2: null,
    rawCamera: "",
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', app.init, false);
        //document.addEventListener("DOMContentLoaded", app.init);
    },

    init: function init(ev) {
        app.UUID = device.uuid;
        app.setTap(document.querySelector(".fab"), app.navigate);
        app.setTap(document.getElementById("back_home"), app.navigate);
        app.setTap(document.getElementById("btn_cancel"), app.navigate);
        app.setTap(document.getElementById("btn_save"), app.saveData);
        app.setTap(document.getElementById("btn_camera"), app.callCamera);
        cameraview1 = document.getElementById("cameraview1");
        cameraview1.style.display = "block";
        cameraview2 = document.getElementById("cameraview2");
        cameraview2.style.display = "none";
        app.image = document.getElementById("imageView");
        var elements = document.getElementsByClassName('fa fa-arrow-left');
        for (var i = 0; i < elements.length; i++) {
            app.setTap(elements[i], app.navigate);
        }
        app.fetchListReview(ev);
        window.addEventListener("popstate",app.popPop)
    },
    setTap: function (btn, eventobj) {
        var dmHammer = new Hammer(btn);
        dmHammer.on("tap", function (ea) {
            eventobj(btn);
        });

    },
    popPop: function (ev) {
        ev.preventDefault();
    },
    navigate: function (ev) {
        var url = ev.getAttribute("data-href");
        history.pushState({
            "page": url
        }, null, "#" + url);
    [].forEach.call(document.querySelectorAll("[data-role=page]"), function (item, index) {
            item.classList.remove("active-page");
            if (item.id == url) {
                item.classList.add("active-page");
            }

        });
    },
    fetchListReview: function (ev) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/reviews/get/");
        xhr.addEventListener("load", function () {
            var data = JSON.parse(xhr.responseText);
            for (var i = data.reviews.length - 1; i >= 0; i--) {
                // for (var i = 0; i < data.reviews.length; i++) {
                var leftDiv = document.createElement("div");
                //leftDiv.setAttribute("class", "left");
                var rightDiv = document.createElement("div");
                //rightDiv.setAttribute("class", "right");
                //var li = document.createElement("div");
                var listDiv = document.createElement("li");
                listDiv.setAttribute("data-id", data.reviews[i].id);
                listDiv.setAttribute("data-href", "review");
                leftDiv.textContent = data.reviews[i].title;
                app.setStar(data.reviews[i].rating, rightDiv);
                listDiv.appendChild(leftDiv);
                listDiv.appendChild(rightDiv);
                //listDiv.appendChild(li);
                document.querySelector("#home ul").appendChild(listDiv);
                var mc = new Hammer(listDiv);
                mc.on("tap panleft", function (hammerev) {
                    hammerev.preventDefault();
                    //alert(hammerev.srcEvent.currentTarget.getAttribute("data-href"));
                    //alert(hammerev.srcEvent.target.tagName + " " + hammerev.srcEvent.currentTarget.tagName);
                    var datahref = hammerev.srcEvent.currentTarget.getAttribute("data-href");
                    var id = hammerev.srcEvent.currentTarget.getAttribute("data-id");
                    if (hammerev.type == "tap") {
                        app.navigate(listDiv);
                        app.fetchReviewData(id);
                    } else if (hammerev.type == "panleft") {
                        var iiid = hammerev.srcEvent.currentTarget.getAttribute("data-id");
                        app.deleteReview(iiid);
                    }
                });
            }

        });
        xhr.addEventListener("error", function () {
            app.showError(ev.message);
        });
        //collect data to send to the php page
        var params = new FormData();
        params.append("uuid", app.UUID);
        xhr.send(params);
    },
    saveData: function (ev) {
        var url = ev.getAttribute("data-href");
        var title = document.getElementById("title");
        var description = document.getElementById("description");
        var rat = document.querySelector('.rating > input:checked');
        var errorMsg = "Please solve below issues.\n";
        if (title.value.length == 0) {
            alert(errorMsg + " Title is required.");
            return;
        } else if (description.value.length == 0) {
            alert(errorMsg + " Description is required.");
            return;
        } else if ((rat == null) || (rat.value == 0)) {
            alert(errorMsg + " Rating is required.");
            return;
        } else if (app.rawCamera == "") {
            alert(errorMsg + "Camera Picture required.");
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/review/set/");
        xhr.addEventListener("load", function () {

            var data = JSON.parse(xhr.responseText);
            if (data.code == 0) {
                rawCamera = "";
                app.navigate(ev);
                setTimeout(location.reload(), 100);
            } else {
                alert("Something went wrong. Please try later.");
            }
            //app.navigate(ev);
        });
        xhr.addEventListener("error", function (ev) {
            app.showError("Unable to save data on the server...");
        });
        //collect data to send to the php page
        var params = new FormData();
        params.append("uuid", app.UUID);
        params.append("action", "insert");
        params.append("title", title.value);
        params.append("review_txt", description.value);
        params.append("rating", rat.value);
        params.append("img", app.rawCamera);
        xhr.send(params);
    },
    showError: function (msg) {
        //create an overlay
        //create a message div
        //display both with "msg" to user
        alert(msg);
    },
    setStar: function (count, rDiv) {
        for (var c = count; c > 0; c--) {
            var star = document.createElement("span");
            star.innerHTML = '&#9734';
            rDiv.appendChild(star);
        }
    },
    fetchReviewData: function (id) {
        console.log(id);
        var review_details = document.getElementById("review_details");
        document.getElementsByTagName("h2").remove();
        document.getElementsByTagName("p").remove();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/review/get/");
        xhr.addEventListener("load", function () {
            var data = JSON.parse(xhr.responseText);
            var h3 = document.createElement("h2");
            h3.textContent = data.review_details.title;
            var p2 = document.createElement("p");
            p2.setAttribute("class", "summary_text");
            p2.textContent = data.review_details.review_txt;

            review_details.appendChild(h3);
            review_details.appendChild(p2);
            var imageContainer = document.querySelector(".image_container");
            imageContainer.innerHTML = "";
            var img = document.createElement("img");
            img.setAttribute("src", decodeURIComponent(data.review_details.img));
            imageContainer.appendChild(img);
            review_details.appendChild(imageContainer);
            var ratStar = document.querySelector(".right");
            ratStar.innerHTML = "";
            app.setStar(data.review_details.rating, ratStar);
            //review_details.appendChild(ratingStrings);
        });
        xhr.addEventListener("error", function () {
            app.showError(ev.message);
        });
        //collect data to send to the php page
        var params = new FormData();
        params.append("uuid", app.UUID);
        params.append("review_id", id);
        xhr.send(params);
    },
    clearContainer: function (divContainer) {
        divContainer.innerHTML = "";
    },
    callCamera: function () {
        alert("cam");
        app.imgOptions = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            targetWidth: 200,
            cameraDirection: Camera.Direction.FRONT,
            saveToPhotoAlbum: false
        };

        navigator.camera.getPicture(app.imgSuccess, app.imgFail, app.imgOptions);
    },

    imgSuccess: function (imageData) {
        //got an image back from the camera
        app.image.src = "data:image/jpeg;base64," + imageData;
        console.log("Image loaded into interface");
        //clear memory in app
        var base64 = encodeURIComponent(app.image.src);
        app.rawCamera = base64;
        navigator.camera.cleanup();
        cameraview1.style.display = "none";
        cameraview2.style.display = "block";
    },

    imgFail: function (msg) {
        console.log("Failed to get image: " + msg);
    },
    deleteReview: function (raid) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/review/set/");
        xhr.addEventListener("load", function () {
            var data = JSON.parse(xhr.responseText);
            if (data.code == 0) {
                setTimeout(location.reload(), 100);
            } else {
                alert(xhr.responseText);
            }
        });
        xhr.addEventListener("error", function () {
            app.showError(ev.message);
        });
        var params = new FormData();
        params.append("uuid", app.UUID);
        params.append("action", "delete");
        params.append("review_id", raid);
        xhr.send(params);
    }
};
app.initialize();
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}