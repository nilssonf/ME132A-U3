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
    let courseTitle = document.createElement("h2");
    div.classList.add("studentContainer");

    courseTitle.innerText = course.title + " (" + course.totalCredits + " credits)";
    results.appendChild(courseTitle);
    results.appendChild(div);

    let foundStudents = getStudentsById(course);
    let theResponsibleTeacher = getResponsibleTeacher(course);
    let allTeachers = getAllTeachers(course);
    let studentCourses = [];
    
    for (let student of foundStudents){
        for (let studentCourse of student.courses){
            if (studentCourse.courseId == course.courseId){
                studentCourses.push(studentCourse);
            }
        }
    }

    for (let i = 0; i < foundStudents.length; i ++){
        let studentDiv = document.createElement("div");
        studentDiv.classList.add("studentDiv");

        div.appendChild(studentDiv);
        studentDiv.innerText = foundStudents[i].firstName + " " + foundStudents[i].lastName + " (" + studentCourses[i].passedCredits +" credits)" + "\n" 
        + "Started: "+ studentCourses[i].started.semester + " " + studentCourses[i].started.year; 
        
        if (studentCourses[i].passedCredits == course.totalCredits){
            studentDiv.style.backgroundColor = "blue";
        }
    }

    let repsonsibleDiv = document.createElement("div"); 
    repsonsibleDiv.innerHTML = "Course responsible: ";
    repsonsibleDiv.classList.add("responsibleDiv");
    div.appendChild(repsonsibleDiv);


    for (let i = 0; i < theResponsibleTeacher.length; i++) {
        let respP = document.createElement("p");
        respP.classList.add("respP");
        repsonsibleDiv.appendChild(respP);
        respP.innerText = theResponsibleTeacher[i].firstName + " " + theResponsibleTeacher[i].lastName + " (" + theResponsibleTeacher[i].post + ")";
    }

    let teacherDiv = document.createElement("div");
    teacherDiv.classList.add("teacherDiv");
    div.appendChild(teacherDiv);
    teacherDiv.innerText = "Teachers: ";

    for(let i = 0; i < allTeachers.length; i++){
        let teacherP = document.createElement("p");
        teacherDiv.appendChild(teacherP);
        teacherP.innerText =  allTeachers[i].firstName + " " + allTeachers[i].lastName + " (" + allTeachers[i].post + ")";
    }
}

function createHTML (courses) {
    for (let course of courses){
        renderCourse(course);
    }
}

// hitta rätt student via studentID
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

// hitta rätt ansvariga lärare
function getResponsibleTeacher (course) {
    let responsibleTeacher = [];

    for (let teacher of DATABASE.teachers) {
         if (teacher.teacherId == course.courseResponsible) {
            responsibleTeacher.push(teacher);
        }  
    }
    return responsibleTeacher;
}


// hitta alla lärare involverade i kursen
function getAllTeachers (course){
    let allTeachers = [];

    for (let teacher of DATABASE.teachers){
        for(let oneTeacher of course.teachers)
        if (teacher.teacherId == oneTeacher){
            allTeachers.push(teacher);
        }
    }
    return allTeachers;
}
