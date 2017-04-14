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

function btnModifyCourseUpdate_click() {
    updateCourse();
}

function btnModifyCourseDelete_click() {
    deleteCourse();
}

function btnModifyProgUpdate_click() {
    updateProgram();
}

function btnModifyProgDelete_click() {
    deleteProgram();
}

function btnModifyGradeUpdate_click() {
    updateGrade();
}

function btnModifyGradeDelete_click() {
    deleteGrade();
}

function pageAddGrade_pageshow() {
    populateSelectListCourses($("#selAddGradeCourses"));
}

function pageAddCourse_pageshow() {
    populateSelectListPrograms($("#selAddCoursePrograms"));
}

function pageGrades_pageshow() {
    generateGradesList();
}

function pageModifyCourse_pageshow() {
    loadModifyCoursePage();
}

function pageModifyProgram_pageshow() {
    loadModifyProgramPage();
}

function pageModifyGrade_pageshow() {
    loadModifyGradePage();
}

function init() {
    $("#btnAddProgAdd").on("click", btnAddProgAdd_click);
    $("#btnAddCourseAdd").on("click", btnAddCourseAdd_click);
    $("#btnAddGradeAdd").on("click", btnAddGradeAdd_click);
    $("#btn").on("click", testClass);

    $("#btnModifyCourseUpdate").on("click", btnModifyCourseUpdate_click);
    $("#btnModifyCourseDelete").on("click", btnModifyCourseDelete_click);

    $("#btnModifyProgUpdate").on("click", btnModifyProgUpdate_click);
    $("#btnModifyProgDelete").on("click", btnModifyProgDelete_click);

    $("#btnModifyGradeUpdate").on("click", btnModifyGradeUpdate_click);
    $("#btnModifyGradeDelete").on("click", btnModifyGradeDelete_click);

    $("#pageAddCourse").on("pageshow", pageAddCourse_pageshow);
    $("#pageAddGrade").on("pageshow", pageAddGrade_pageshow);
    $("#pageGrades").on("pageshow", pageGrades_pageshow);
    $("#pageModifyCourse").on("pageshow", pageModifyCourse_pageshow);
    $("#pageModifyProgram").on("pageshow", pageModifyProgram_pageshow);
    $("#pageModifyGrade").on("pageshow", pageModifyGrade_pageshow);
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
