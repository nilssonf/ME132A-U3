'use strict'

let inputCourse = document.getElementById('courses-search');

function findCourse () {
  let course = DATABASE.courses
    .filter((course) => course.title.toLowerCase().includes(inputCourse.value));

    course.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        } 
        if (a.title < b.title) {
            return -1;
        }
        return 0; 
    });
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

    div.innerText = course.title + " (" + course.totalCredits + " credits)";
    results.appendChild(div);


    let foundStudents = getStudentsById(course);
    // let theResponsibleTeacher = getResponsibleTeacher(course);
   
    let passedCredits = [];
    
    for (let student of foundStudents){
        for (let studentCourse of student.courses){
            if (studentCourse.courseId == course.courseId){
                passedCredits.push(studentCourse.passedCredits);
            }
        }
    }

    for (let i = 0; i < foundStudents.length; i ++){
        let studentDiv = document.createElement("div");
        
        div.appendChild(studentDiv);
        studentDiv.innerText = foundStudents[i].firstName + " " + foundStudents[i].lastName + " (" + passedCredits[i] +" credits)"; 
        
        if (passedCredits[i] == course.totalCredits){
            studentDiv.style.backgroundColor = "blue";
        }
    }
}

function createHTML (courses) {
    for (let course of courses){
        renderCourse(course);
    }
}

function getStudentsById(course) {
    let foundStudents = [];

    for (let student of DATABASE.students) {
        for (let studentCourse of student.courses) {
            if (studentCourse.courseId == course.courseId) {
                foundStudents.push(student);
            }
        }
    }
   
    return foundStudents;
}


// function getResponsibleTeacher(course){

//     let responsibleTeacher = [];

//     for (let teacher of DATABASE.teachers){
//         for (let respTeacher of course.teachers){
//             if (respTeacher.teacherId == course.teachers){
//                 responsibleTeacher.push(teacher);
//             }
//         }
//     }

//     console.log(responsibleTeacher);
//     return responsibleTeacher;
// }

