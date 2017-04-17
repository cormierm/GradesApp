/**
 * File: facade.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */
function addProgram() {
    var name = $("#txtAddProgName").val();
    var isActive = $("#chkAddProgIsActive").prop("checked");
    var options = [name, isActive];
    ProgramDB.insert(options);
    $(location).prop('href', "#pageGrades");
}

function updateProgram() {
    var programId = localStorage.getItem("selectedProgramId");
    var programName = $("#txtModifyProgName").val();
    var isActive = $("#chkModifyProgIsActive").prop("checked");
    var options = [programName, isActive, programId];
    ProgramDB.update(options);
    $(location).prop('href', "#pageGrades");
}

function deleteProgram() {
    var programId = localStorage.getItem("selectedProgramId");
    var options = [programId];
    ProgramDB.delete(options);
    $(location).prop('href', "#pageGrades");
}
function addCourse() {
    var programId = $("#selAddCoursePrograms").val();
    var name = $("#txtAddCourseName").val();
    var isActive = $("#chkAddCourseIsActive").prop("checked");
    var options = [programId, name, isActive];
    CourseDB.insert(options);
    $(location).prop('href', "#pageGrades");
}

function updateCourse() {
    var programId = $("#selModifyCoursePrograms").val();
    var courseId = localStorage.getItem("selectedCourseId");
    var courseName = $("#txtModifyCourseName").val();
    var isActive = $("#chkModifyCourseIsActive").prop("checked");
    var options = [programId, courseName, isActive, courseId];
    CourseDB.update(options);
    $(location).prop('href', "#pageModifyCourse");
}

function deleteCourse() {
    var courseId = localStorage.getItem("selectedCourseId");
    var options = [courseId];
    CourseDB.delete(options);
    $(location).prop('href', "#pageGrades");
}

function updateGrade() {
    var gradeId = localStorage.getItem("selectedGradeId");
    var courseId = $("#selModifyGradeCourses").val();
    var gradeName = $("#txtModifyGradeName").val();
    var weight = $("#txtModifyGradeWeight").val();
    var grade = $("#txtModifyGradeGrade").val();
    var options = [courseId, gradeName, weight, grade, gradeId];
    GradeDB.update(options);
    $(location).prop('href', "#pageModifyCourse");
}

function deleteGrade() {
    var gradeId = localStorage.getItem("selectedGradeId");
    var options = [gradeId];
    GradeDB.delete(options);
    $(location).prop('href', "#pageModifyCourse");
}

function addGrade() {
    var courseId = $("#selAddGradeCourses").val();
    var name = $("#txtAddGradeName").val();
    var weight = $("#txtAddGradeWeight").val();
    var grade = $("#txtAddGradeGrade").val();
    var options = [courseId, name, weight, grade];
    GradeDB.insert(options);
    $(location).prop('href', "#pageModifyCourse");
}

function generateGradesList() {
    var chkbox = $("#chkGradesShowActive");
    if (localStorage.getItem("showIsActiveOnly") == 'true'){
        chkbox.prop("checked", true);
    }
    else {
        chkbox.prop("checked", false);
    }
    chkbox.checkboxradio("refresh");
    $("#lstGrades").html("");
    function successSelectAll(tx, results) {
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            generateCourseHtmlByProgramId(row['name'],row['id']);
        }
    }
    ProgramDB.selectAll(successSelectAll);
}

function generateCourseHtmlByProgramId(programName, programId){
    var courseHtmlCode = "<a class='programListItem' data-row-id=" + programId + " href='#'>" +
        "<h3>" + programName + "</h3></a>";
    function successSelectAllCoursesByProgramId(tx, results) {
        courseHtmlCode += "<ul data-role='listview' id='lstProgram" + programId + "'>";
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            courseHtmlCode += "<a class='courseListItem' data-role='button' data-row-id=" + row['id'] + " href='#'><li>" +
                "<h3>" + row['name'] + "</h3>" +
                "<p></p><span class='spanGrade'>Total Average: <span id='spanCalculatedGrade"+ row['id'] + "'></span>% " +
                "Sum of Grades: <span id='spanCalculatedSumGrade"+ row['id'] + "'></span>%</span></p>" +
                "</li></a>";
            calculateGrade(row['id'], "spanCalculatedGrade" + row['id'], "spanCalculatedSumGrade" + row['id']);
        }
        courseHtmlCode += "</ul>" +
            "<button data-role='button' data-icon='plus' data-inline='true' data-row-id=" + programId +
            " data-iconpos='left' class='btnGradesAddCourse'>Add Course</button>" +
            "<button data-role='button' data-icon='gear' data-inline='true' data-row-id=" + programId +
            " data-iconpos='left' class='btnGradesEditProgram'>Edit Program</button>";

        var listGrades = $("#lstGrades");
        listGrades.html(listGrades.html() + courseHtmlCode);

        function clickCourseHandler() {
            localStorage.setItem("selectedCourseId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageModifyCourse");
        }
        function clickProgramHandler() {
            localStorage.setItem("selectedProgramId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageModifyProgram");
        }
        function btnGradesAddCourse_click() {
            localStorage.setItem("selectedProgramId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageAddCourse");
        }

        $(".courseListItem").on("click", clickCourseHandler);
        $(".programListItem").on("click", clickProgramHandler);
        $(".btnGradesAddCourse").on("click", btnGradesAddCourse_click);
        $(".btnGradesEditProgram").on("click", clickProgramHandler);
    }
    var options = [programId];
    CourseDB.selectAllByProgram(successSelectAllCoursesByProgramId, options);
}

function generateGradeHtmlByCourseId(courseId){
    var gradeHtmlCode = "";
    function successSelectAllCoursesByCourseId(tx, results) {
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            gradeHtmlCode += "<li><a class='gradeListItem' data-row-id=" + row['id'] + " href='#'>" +
                row['name'] + " Weight: " + row['weight'] + " Grade: " + row['grade'] + "</a></li>";
        }
        var list = $("#courseGradeList");
        list.html(gradeHtmlCode);
        list.listview("refresh");

        //var listCourse = $("#courseId" + courseId);
        //listCourse.html(gradeHtmlCode);

        function clickGradeHandler() {
            localStorage.setItem("selectedGradeId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageModifyGrade");
        }
        $(".gradeListItem").on("click", clickGradeHandler);


    }
    var options = [courseId];
    GradeDB.selectAllByCourse(successSelectAllCoursesByCourseId, options);
}

function populateSelectListPrograms(selectList, programId) {
    function successSelectAll(tx, results) {
        var htmlCode = "";
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (programId == row['id']) {
                htmlCode += "<option value='" + row['id'] + "' selected>" + row['name']
                    + "</option>";
            }
            else {
                htmlCode += "<option value='" + row['id'] + "'>" + row['name']
                    + "</option>";
            }
        }
        selectList.html(htmlCode);
        selectList.selectmenu('refresh');
    }
    ProgramDB.selectAll(successSelectAll);
}

function populateSelectListCourses(selectList, courseId) {
    function successSelectAll(tx, results) {
        var htmlCode = "";
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (courseId == row['id']){
                htmlCode += "<option value='" + row['id'] + "' selected>" + row['name']
                    + "</option>";
            }
            else{
                htmlCode += "<option value='" + row['id'] + "'>" + row['name']
                    + "</option>";
            }
        }
        selectList.html(htmlCode);
        selectList.selectmenu('refresh');
    }
    CourseDB.selectAll(successSelectAll);
}

function loadModifyCoursePage() {
    $("#frmModifyCourse").prop("hidden", true);
    var courseId = localStorage.getItem("selectedCourseId");

    generateGradeHtmlByCourseId(courseId);
    function successSelectOne(tx, results) {
        var row = results.rows[0];
        $("#headerModifyCourseName").html(row['name']);
        $("#txtModifyCourseName").val(row['name']);
        if (row['isActive'] == 'true') {
            $("#chkModifyCourseIsActive").prop("checked", true).checkboxradio("refresh");
        }
        else {
            $("#chkModifyCourseIsActive").prop("checked", false).checkboxradio("refresh");
        }
        populateSelectListPrograms($("#selModifyCoursePrograms"), row['programId']);
    }

    var options = [courseId];
    CourseDB.select(options, successSelectOne);
}

function loadModifyProgramPage() {
    var programId = localStorage.getItem("selectedProgramId");
    function successSelectOne(tx, results) {
        var row = results.rows[0];
        $("#txtModifyProgName").val(row['name']);
        if (row['isActive'] == 'true') {
            $("#chkModifyProgIsActive").prop("checked", true).checkboxradio("refresh");
        }
        else {
            $("#chkModifyProgIsActive").prop("checked", false).checkboxradio("refresh");
        }
    }

    var options = [programId];
    ProgramDB.select(options, successSelectOne);
}

function loadModifyGradePage() {
    var gradeId = localStorage.getItem("selectedGradeId");
    function successSelectOne(tx, results) {
        var row = results.rows[0];
        $("#txtModifyGradeName").val(row['name']);
        $("#txtModifyGradeWeight").val(row['weight']);
        $("#txtModifyGradeGrade").val(row['grade']);
        calculateSumOfWeightsForModifyGrade();
        populateSelectListCourses($("#selModifyGradeCourses"), row['courseId']);
    }

    var options = [gradeId];
    GradeDB.select(options, successSelectOne);
}

function calculateSumOfWeightsForAddGrade() {
    var courseId = localStorage.getItem("selectedCourseId");
    function successSelectAll(tx, results){
        var sumOfWeights = 0;
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            sumOfWeights += row['weight'];
        }
        localStorage.setItem("sumOfWeights", sumOfWeights);
    }
    var options = [courseId];
    GradeDB.selectAllByCourse(successSelectAll, options);
}

function calculateSumOfWeightsForModifyGrade() {
    var courseId = localStorage.getItem("selectedCourseId");
    function successSelectAll(tx, results){
        var sumOfWeights = 0 - $("#txtModifyGradeWeight").val();
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            sumOfWeights += row['weight'];
        }
        localStorage.setItem("sumOfWeights", sumOfWeights);
    }
    var options = [courseId];
    GradeDB.selectAllByCourse(successSelectAll, options);
}