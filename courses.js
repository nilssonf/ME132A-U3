'use strict'

let inputCourse = document.getElementById('courses-search');

function findCourse () {
  let course = DATABASE.courses
    .filter(course => course.title.toLowerCase().includes(inputCourse.value))
    .map(course => course.title);

    return course; 
}

inputCourse.addEventListener("keyup", function(){
    let foundCourse = findCourse ();
    document.getElementById("results").innerHTML = "";
    createHTML(foundCourse);

    if (inputCourse.value == ""){
        document.getElementById("results").innerHTML = "";
    }
});

function renderCourse (course) {
    let results = document.getElementById("results");
    let div = document.createElement("div");

    div.innerHTML = course;
    results.appendChild(div);
}

function createHTML (courses) {
    for (let course of courses){
        renderCourse(course);
    }
}