'use strict'

let inputStudent = document.getElementById('students-search');

function findStudent () {
  let student = DATABASE.students
    .filter(student => student.lastName.toLowerCase().includes(inputStudent.value))
    .map(student => student.firstName + ' ' + student.lastName + " (total: " + "x" + " credits)");

  return student;
}

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

    div.innerHTML = student;
    results.appendChild(div);
}

function createHTML (students) {
    for (let student of students){
        renderStudent(student);
    }
}
