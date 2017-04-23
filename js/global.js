/**
 * File: global.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */

function btnHomeGrades_click(){
    $(location).prop('href', "#pageGrades");
}

function btnHomeAbout_click() {
    $(location).prop('href', "#pageAbout");
}

function btnAddProgAdd_click() {
    if(doValidate_frmAddProg()) {
        addProgram();
    }
}

function btnAddProgCancel_click() {
    $(location).prop('href', "#pageGrades");
}

function btnAddCourseAdd_click() {
    if(doValidate_frmAddCourse()){
        addCourse();
    }
}

function btnAddCourseCancel_click() {
    $(location).prop('href', "#pageGrades");
}

function btnAddGradeAdd_click() {
    if(doValidate_frmAddGrade()){
        addGrade();
    }
}

function btnAddGradeCancel_click() {
    $(location).prop('href', "#pageModifyCourse");
}

function btnProfileSaveTarget_click() {
    setTargetGrade();
}

function btnProfileRestoreDatabase_click() {
    restoreDatabase();
}

function btnProfileBackupDatabase_click() {
    backupDatabase();
}


function btnProfileClearDatabase_click() {
    clearDatabase();
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

function btnModifyProgCancel_click() {
    $(location).prop('href', "#pageGrades");
}

function btnModifyProgDelete_click() {
    deleteProgram();
}

function btnModifyGradeUpdate_click() {
    if(doValidate_frmModifyGrade()){
        updateGrade();
    }
}

function btnModifyGradeCancel_click() {
    $(location).prop('href', "#pageModifyCourse");
}

function btnModifyGradeDelete_click() {
    deleteGrade();
}

function pageAddGrade_pageshow() {
    calculateSumOfWeightsForAddGrade();
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

function pageHome_pageshow() {
    UtilDB.calculateHomePageCourseAverage();
}

function pageSettings_pageshow() {
    $("#txtProfileGoal").val(localStorage.getItem("targetGrade"));
}

function init() {
    UtilDB.calculateHomePageCourseAverage();

    $("#btnHomeGrades").on("click", btnHomeGrades_click);
    $("#btnHomeAbout").on("click", btnHomeAbout_click);

    $("#btnAddProgAdd").on("click", btnAddProgAdd_click);
    $("#btnAddProgCancel").on("click", btnAddProgCancel_click);
    $("#btnAddCourseAdd").on("click", btnAddCourseAdd_click);
    $("#btnAddCourseCancel").on("click", btnAddCourseCancel_click);
    $("#btnAddGradeAdd").on("click", btnAddGradeAdd_click);
    $("#btnAddGradeCancel").on("click", btnAddGradeCancel_click);

    $("#btnGradesAddNewProgram").on("click", btnGradesAddNewProgram_click);
    $("#chkGradesShowActive").on("change", chkGradesShowActive_change);

    $("#btnProfileSaveTarget").on("click", btnProfileSaveTarget_click);
    $("#btnProfileRestoreDatabase").on("click", btnProfileRestoreDatabase_click);
    $("#btnProfileBackupDatabase").on("click", btnProfileBackupDatabase_click);
    $("#btnProfileClearDatabase").on("click", btnProfileClearDatabase_click);

    $("#btnModifyCourseUpdate").on("click", btnModifyCourseUpdate_click);
    $("#btnModifyCourseDelete").on("click", btnModifyCourseDelete_click);
    $("#btnModifyCourseAddGrade").on("click", btnModifyCourseAddGrade_click);
    $("#btnModifyCourseEdit").on("click", btnModifyCourseEdit_click);
    $("#btnModifyCourseCancel").on("click", btnModifyCourseCancel_click);

    $("#btnModifyProgUpdate").on("click", btnModifyProgUpdate_click);
    $("#btnModifyProgCancel").on("click", btnModifyProgCancel_click);
    $("#btnModifyProgDelete").on("click", btnModifyProgDelete_click);

    $("#btnModifyGradeUpdate").on("click", btnModifyGradeUpdate_click);
    $("#btnModifyGradeCancel").on("click", btnModifyGradeCancel_click);
    $("#btnModifyGradeDelete").on("click", btnModifyGradeDelete_click);

    $("#pageAddCourse").on("pageshow", pageAddCourse_pageshow);
    $("#pageAddGrade").on("pageshow", pageAddGrade_pageshow);
    $("#pageGrades").on("pageshow", pageGrades_pageshow);
    $("#pageModifyCourse").on("pageshow", pageModifyCourse_pageshow);
    $("#pageModifyProgram").on("pageshow", pageModifyProgram_pageshow);
    $("#pageModifyGrade").on("pageshow", pageModifyGrade_pageshow);
    $("#pageHome").on("pageshow", pageHome_pageshow);
    $("#pageSettings").on("pageshow", pageSettings_pageshow);

    $("#frmAddProg").submit(btnAddProgAdd_click);
    $("#frmAddCourse").submit(btnAddCourseAdd_click);
    $("#frmAddGrade").submit(btnAddGradeAdd_click);
    $("#frmModifyProg").submit(btnModifyProgUpdate_click);
    $("#frmModifyCourse").submit(btnModifyCourseUpdate_click);
    $("#frmModifyGrade").submit(btnModifyGradeUpdate_click);

    if(localStorage.getItem("showIsActiveOnly") === null){
        localStorage.setItem("showIsActiveOnly", false);
    }
    if(localStorage.getItem("targetGrade") === null){
        localStorage.setItem("targetGrade", 90);
    }
}

function initDB() {
    console.info("WebSQL: Initializing database..");
    try {
        DB.createDatabase();
        if (db) {
            console.info("WebSQL: Initializing tables..");
            DB.createTables();
        }
    } catch (e) {
        console.error("WebSQL Error: (Fatal) Error in initDB, cannot proceed.");
    }
}

$(document).ready(function () {
    initDB();
    init();
});