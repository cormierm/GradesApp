/**
 * File: global.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */

function btnAddProgAdd_click() {
    if(doValidate_frmAddProg()) {
        addProgram();
    }
}

function btnAddCourseAdd_click() {
    if(doValidate_frmAddCourse()){
        addCourse();
    }
}

function btnAddGradeAdd_click() {
    if(doValidate_frmAddGrade()){
        addGrade();
    }
}

function btnGradesAddNewProgram_click() {
    $(location).prop('href', "#pageAddProgram");
}
function chkGradesShowActive_change() {
    localStorage.setItem("showIsActiveOnly", $("#chkGradesShowActive").prop("checked"));
    location.reload();
}


function btnModifyCourseUpdate_click() {
    if(doValidate_frmModifyCourse()){
        updateCourse();
    }
}

function btnModifyCourseDelete_click() {
    deleteCourse();
}

function btnModifyCourseAddGrade_click() {
    $(location).prop('href', "#pageAddGrade");
}

function btnModifyCourseEdit_click() {
    $("#frmModifyCourse").prop("hidden", false);
}

function btnModifyCourseCancel_click() {
    $("#frmModifyCourse").prop("hidden", true);
}

function btnModifyProgUpdate_click() {
    if(doValidate_frmModifyProg()){
        updateProgram();
    }
}

function btnModifyProgDelete_click() {
    deleteProgram();
}

function btnModifyGradeUpdate_click() {
    if(doValidate_frmModifyGrade()){
        updateGrade();
    }

}

function btnModifyGradeDelete_click() {
    deleteGrade();
}

function pageAddGrade_pageshow() {
    populateSelectListCourses($("#selAddGradeCourses"), localStorage.getItem("selectedCourseId"));
}

function pageAddCourse_pageshow() {
    populateSelectListPrograms($("#selAddCoursePrograms"), localStorage.getItem("selectedProgramId"));
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

    $("#btnGradesAddNewProgram").on("click", btnGradesAddNewProgram_click);
    $("#chkGradesShowActive").on("change", chkGradesShowActive_change);

    $("#btnModifyCourseUpdate").on("click", btnModifyCourseUpdate_click);
    $("#btnModifyCourseDelete").on("click", btnModifyCourseDelete_click);
    $("#btnModifyCourseAddGrade").on("click", btnModifyCourseAddGrade_click);
    $("#btnModifyCourseEdit").on("click", btnModifyCourseEdit_click);
    $("#btnModifyCourseCancel").on("click", btnModifyCourseCancel_click);

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

    if(localStorage.getItem("showIsActiveOnly") == null){
        localStorage.setItem("showIsActiveOnly", false);
    }
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
