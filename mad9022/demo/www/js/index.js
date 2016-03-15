/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', init, false);
//     }
// };
document.addEventListener("DOMContentLoaded", init);
function init(ev) {

    var pl = document.querySelectorAll(".page-link");
    [].forEach.call(pl, function (obj, index) {
        //console.log(index, obj);
        //use touchend if this is for mobile only
        var menubar = new Hammer(obj);
        menubar.on('tap', function (ev) {
            console.log("Tapped");
            navigate(ev);
        });
    });
    //add listeners to pages
    var pages = document.querySelectorAll("[data-role=page]");
    [].forEach.call(pages, function (obj, index) {
        obj.className = "inactive-page";
        if (index == 0) {
            obj.className = "active-page";
        }
        //transitionend or animationend listeners
        obj.addEventListener("animationend", pageAnimated);
    });
}

function navigate(ev) {
    // ev.preventDefault();
    var btn = ev.target;
    var href = btn.href;
    var id = href.split("#")[1];
    //history.pushState();
    var pages = document.querySelectorAll('[data-role="page"]');
    for (var p = 0; p < pages.length; p++) {
        //console.log(pages[p].id, page);
        if (pages[p].id === id) {
            pages[p].classList.remove("hidden");
            if (pages[p].className !== "active-page") {
                pages[p].className = "active-page";
            }
            //console.log("active ", page)
        } else {
            if (pages[p].className !== "inactive-page") {
                pages[p].className = "inactive-page";
            }
        }
    }
}

function pageAnimated(ev) {
    //console.log("Transition finished for " + ev.target.id);
    //console.dir(ev);
    var page = ev.target;
    if (page.className == "active-page") {
        console.log(ev.target.id, " has just appeared");
    } else {
        console.log(ev.target.id, " has just disappeared");
        ev.target.classList.add("hidden");
    }
}
//app.initialize();