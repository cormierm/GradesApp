/**
 * Created by mcormier4319 on 4/11/2017.
 */

function btnAddProgAdd_click() {
    addProgram();
}

function btnAddCourseAdd_click() {
    addCourse();
}

function btnAddGradeAdd_click() {
    addGrade();
}

function pageAddGrade_pageshow() {
    populateSelectListCourses($("#selAddGradeCourses"));
}

function pageAddCourse_pageshow() {
    populateSelectListPrograms($("#selAddCoursePrograms"));
}

function init() {
    $("#btnAddProgAdd").on("click", btnAddProgAdd_click);
    $("#btnAddCourseAdd").on("click", btnAddCourseAdd_click);
    $("#btnAddGradeAdd").on("click", btnAddGradeAdd_click);


    $("#pageAddCourse").on("pageshow", pageAddCourse_pageshow);
    $("#pageAddGrade").on("pageshow", pageAddGrade_pageshow)
}

function initDB() {
    console.info("Initializing database..");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Initializing tables..");
            DB.createTables();
        }
    } catch (e) {
        console.error("SQL Error: (Fatal) Error in initDB, cannot proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});
