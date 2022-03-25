'use strict'

let inputStudent = document.getElementById('students-search');

function findStudent () {
  let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(inputStudent.value.toLowerCase()));

    // För att få studenterna i bokstavsordning på förnamn
    student.sort(function (a, b) {
        if (a.firstName > b.firstName) {
            return 1;
        } 
        if (a.firstName < b.firstName) {
            return -1;
        }
        return 0; 
    });

  return student;
}

// function totalCredits (){
//     let sum = 

//     return sum; 
// }

inputStudent.addEventListener('keyup', function () {
  let foundStudent = findStudent();
  document.getElementById("results").innerHTML = "";
  createHTML(foundStudent);

  if (inputStudent.value == ""){
    document.getElementById("results").innerHTML = "";
  }
});

function renderStudent (student) {
    let results = document.getElementById("results");
    let div = document.createElement("div");

    div.innerText = student.firstName + " " + student.lastName;
    results.appendChild(div);

    let foundCourses = getCourseById(student);
    

    for (let i = 0; i < foundCourses.length; i ++){
        let courseDiv = document.createElement("div");
        
        div.appendChild(courseDiv);
        courseDiv.innerText = foundCourses[i].title + ": " + student.courses[i].passedCredits + " of " + foundCourses[i].totalCredits + " credits";
        
    }
    
}

// Loopar igenom studenterna och adderar HTML

function createHTML (students) {
    for (let student of students){
        renderStudent(student);
    }
}

function getCourseById(student) {
    let foundCourses = [];

    for (let i = 0; i < student.courses.length; i ++) {
        foundCourses.push(DATABASE.courses.find(course => {
            return course.courseId == student.courses[i].courseId; 
        }))
    }
    return foundCourses;
}

// function getStudentCourses (student) {
    
//     let studentCourses = [];

//     for (let studentCourse of student.courses) {
//         for (let dbCourse of DATABASE.courses) {
//             if (studentCourse.courseId == dbCourse.courseId) {
//                 studentCourses.push(studentCourse.passedCredits);
//             }
//         }
//     }
//     return studentCourses;
// }