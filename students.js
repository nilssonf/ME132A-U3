'use strict'

let inputStudent = document.getElementById('students-search')

// för att sökfältet ska vara tomt vid reload
window.onload = function () {
  inputStudent.value = ''
}

// hitta rätt student
function findStudent () {
  let student = DATABASE.students.filter(student =>
    student.lastName.toLowerCase().includes(inputStudent.value.toLowerCase())
  )

  // För att få studenterna i bokstavsordning på förnamn
  student.sort(function (a, b) {
    if (a.lastName > b.lastName) {
      return 1
    }
    if (a.lastName < b.lastName) {
      return -1
    }
    return 0
  })

  return student
}

// eventlyssnare för när användaren söker i input-fältet
inputStudent.addEventListener('keyup', function () {
  let foundStudent = findStudent()
  document.getElementById('results').innerHTML = ''
  createHTML(foundStudent)

  if (inputStudent.value == '') {
    document.getElementById('results').innerHTML = ''
  }
})

// visa rätt student med rätt innehåll i resultat-diven
function renderStudent (student) {
  let results = document.getElementById('results')
  let div = document.createElement('div')
  let studentName = document.createElement('h2')
  div.classList.add('studentContainer')

  let studentCourse = getStudentCourses(student)
  let totalCredits = studentCourse.reduce(function (a, b) {
    return a + b
  }, 0)

  studentName.innerText =
    student.firstName +
    ' ' +
    student.lastName +
    ' (total credits: ' +
    totalCredits +
    ')'
  results.appendChild(studentName)
  results.appendChild(div)

  let foundCourses = getCourseById(student)

  for (let i = 0; i < foundCourses.length; i++) {
    let courseDiv = document.createElement('div')
    courseDiv.classList.add('courseDiv')

    div.appendChild(courseDiv)
    courseDiv.innerText =
      foundCourses[i].title +
      '\n' +
      student.courses[i].started.semester +
      ' ' +
      student.courses[i].started.year +
      ' / ' +
      student.courses[i].passedCredits +
      ' of ' +
      foundCourses[i].totalCredits +
      ' credits'

    if (foundCourses[i].totalCredits == student.courses[i].passedCredits) {
      courseDiv.style.backgroundColor = 'blue'
    }
  }
}

// Loopar igenom studenterna och adderar HTML

function createHTML (students) {
  for (let student of students) {
    renderStudent(student)
  }
}

// hitta rätt kurs baserat på dess id
function getCourseById (student) {
  let foundCourses = []

  for (let i = 0; i < student.courses.length; i++) {
    foundCourses.push(
      DATABASE.courses.find(course => {
        return course.courseId == student.courses[i].courseId
      })
    )
  }
  return foundCourses
}

// hitta rätt avklarade hp till varje student
function getStudentCourses (student) {
  let studentCourses = []

  for (let studentCourse of student.courses) {
    for (let dbCourse of DATABASE.courses) {
      if (studentCourse.courseId == dbCourse.courseId) {
        studentCourses.push(studentCourse.passedCredits)
      }
    }
  }
  return studentCourses
}


// försök till att få till local storage för dark-mode

// let mode = localStorage.getItem("mode");

// const chooseDark = () => {
//     document.body.classList.add("dark-theme");
//     document.body.classList.remove("light-theme");

//     localStorage.setItem("mode", "dark-theme");
// }

// const chooseLight = () => {
//     document.body.classList.add("light-theme");
//     document.body.classList.remove("dark-theme");

//     localStorage.setItem("mode", "light-theme");

// }

// if (mode === "dark-theme"){
//     chooseDark();
// } else if (mode === "light-theme"){
//     chooseLight();
// }

let themeSwitch = document.querySelector('input')

themeSwitch.addEventListener('change', () => {
  let wrapper = document.getElementById('wrapper')
  let results = document.getElementById('results')
  let body = document.querySelector('body')
  wrapper.classList.toggle('dark-theme')
  results.classList.toggle('dark-theme')
  body.classList.toggle('dark-theme')
})
