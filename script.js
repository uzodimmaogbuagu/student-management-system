/* =========================================
   STUDENT MANAGEMENT SYSTEM
========================================= */


/* =========================================
   VARIABLES
========================================= */

let students = [];

let nextId = 1;


/* Login details */

const correctUsername = "admin";

const correctPassword = "12345";


/* =========================================
   DATA TYPES
========================================= */


/* String */

let schoolName =
    "Student Management System";


/* Number */

let schoolYear = 2026;


/* Boolean */

let systemActive = true;


/* Array */

let courses = [

    "Computer Science",

    "Accounting",

    "Economics",

    "Engineering"

];


/* Object */

let school = {

    name: schoolName,

    year: schoolYear,

    active: systemActive

};


/* =========================================
   LOGIN PAGE
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {


    /* DOM ELEMENTS */

    const usernameInput =
        document.getElementById("username");


    const passwordInput =
        document.getElementById("password");


    const showPassword =
        document.getElementById("showPassword");


    const loginMessage =
        document.getElementById("loginMessage");


    const resetLogin =
        document.getElementById("resetLogin");


    /* =====================================
       SHOW PASSWORD
    ===================================== */

    showPassword.addEventListener(
        "change",
        function () {

            if (showPassword.checked) {

                passwordInput.type =
                    "text";

            }

            else {

                passwordInput.type =
                    "password";

            }

        }
    );


    /* =====================================
       LOGIN
    ===================================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get values */

            let username =
                usernameInput.value.trim();


            let password =
                passwordInput.value.trim();


            /* String manipulation */

            username =
                username.toLowerCase();


            /* =================================
               VALIDATION
            ================================= */

            if (
                username === "" ||
                password === ""
            ) {

                loginMessage.textContent =
                    "Please complete all fields.";

                loginMessage.className =
                    "message error";

            }


            else if (
                username === correctUsername &&
                password === correctPassword
            ) {

                loginMessage.textContent =
                    "Login successful! Redirecting...";

                loginMessage.className =
                    "message success";


                /* Navigate after 2 seconds */

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    2000
                );

            }


            else {

                loginMessage.textContent =
                    "Incorrect username or password.";

                loginMessage.className =
                    "message error";

            }

        }
    );


    /* =====================================
       RESET LOGIN
    ===================================== */

    resetLogin.addEventListener(
        "click",
        function () {

            loginMessage.textContent = "";

            usernameInput.focus();

        }
    );

}


/* =========================================
   DASHBOARD
========================================= */

const studentForm =
    document.getElementById("studentForm");


if (studentForm) {


    /* =====================================
       DOM ELEMENTS
    ===================================== */

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    const studentCount =
        document.getElementById(
            "studentCount"
        );


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const studentMessage =
        document.getElementById(
            "studentMessage"
        );


    const dashboardHeading =
        document.getElementById(
            "dashboardHeading"
        );


    /* =====================================
       MESSAGE FUNCTION
    ===================================== */

    function showMessage(
        text,
        type
    ) {

        studentMessage.textContent =
            text;


        studentMessage.className =
            "message " + type;


        setTimeout(
            function () {

                studentMessage.textContent =
                    "";

                studentMessage.className =
                    "message";

            },
            2500
        );

    }


    /* =====================================
       DISPLAY STUDENTS
    ===================================== */

    function displayStudents(
        list
    ) {

        /* Clear table */

        tableBody.innerHTML = "";


        /* =================================
           LOOP THROUGH STUDENTS
        ================================= */

        list.forEach(
            function (student) {


                /* Create table row */

                const row =
                    document.createElement(
                        "tr"
                    );


                /* Add student information */

                row.innerHTML = `

                    <td>
                        ${student.id}
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.email}
                    </td>

                    <td>
                        ${student.phone}
                    </td>

                    <td>
                        ${student.age}
                    </td>

                    <td>
                        ${student.gender}
                    </td>

                    <td>
                        ${student.course}
                    </td>

                    <td>
                        ${student.date}
                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            data-id="${student.id}"
                        >
                            Delete
                        </button>

                    </td>

                `;


                /* Add row */

                tableBody.appendChild(row);

            }
        );


        /* Update student counter */

        studentCount.textContent =
            students.length;


        /* =================================
           DELETE BUTTONS
        ================================= */

        const deleteButtons =
            document.querySelectorAll(
                ".delete-btn"
            );


        deleteButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        const id =
                            Number(
                                button.dataset.id
                            );


                        const answer =
                            confirm(
                                "Are you sure you want to delete this student?"
                            );


                        if (answer) {

                            deleteStudent(id);

                        }

                    }
                );

            }
        );

    }


    /* =====================================
       ADD STUDENT
    ===================================== */

    function addStudent() {


        /* Get form values */

        const name =
            document
                .getElementById(
                    "studentName"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "email"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "phone"
                )
                .value
                .trim();


        const age =
            document
                .getElementById(
                    "age"
                )
                .value
                .trim();


        const genderElement =
            document.querySelector(
                'input[name="gender"]:checked'
            );


        const course =
            document
                .getElementById(
                    "course"
                )
                .value;


        /* =================================
           VALIDATION
        ================================= */

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            age === "" ||
            !genderElement ||
            course === ""
        ) {

            showMessage(
                "Please complete all required fields.",
                "error"
            );

            return;

        }


        /* Convert age to number */

        const studentAge =
            Number(age);


        /* =================================
           DATE
        ================================= */

        const currentDate =
            new Date();


        const registrationDate =
            currentDate.toLocaleDateString();


        /* =================================
           CREATE STUDENT OBJECT
        ================================= */

        const student = {

            id: nextId++,

            name: name,

            email: email,

            phone: phone,

            age: studentAge,

            gender:
                genderElement.value,

            course: course,

            date:
                registrationDate

        };


        /* =================================
           ADD TO ARRAY
        ================================= */

        students.push(student);


        /* =================================
           CHANGE HEADING
        ================================= */

        if (students.length === 1) {

            dashboardHeading.textContent =
                "Registered Students";

        }


        /* =================================
           DISPLAY
        ================================= */

        displayStudents(students);


        /* Clear form */

        studentForm.reset();


        /* Success */

        showMessage(
            "Student registered successfully!",
            "success"
        );

    }


    /* =====================================
       DELETE STUDENT
    ===================================== */

    function deleteStudent(id) {


        students =
            students.filter(
                function (student) {

                    return student.id !== id;

                }
            );


        displayStudents(students);


        showMessage(
            "Student deleted successfully.",
            "success"
        );

    }


    /* =====================================
       SEARCH STUDENTS
    ===================================== */

    function searchStudents() {


        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        const filteredStudents =
            students.filter(
                function (student) {

                    return student.name
                        .toLowerCase()
                        .includes(searchText);

                }
            );


        displayStudents(
            filteredStudents
        );

    }


    /* =====================================
       FORM SUBMIT EVENT
    ===================================== */

    studentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            addStudent();

        }
    );


    /* =====================================
       SEARCH EVENT
    ===================================== */

    searchInput.addEventListener(
        "input",
        function () {

            searchStudents();

        }
    );


    /* =====================================
       LOGOUT
    ===================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const logout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (logout) {

                    window.location.href =
                        "index.html";

                }

            }
        );

    }


    /* =====================================
       INITIAL TABLE
    ===================================== */

    displayStudents(students);

}