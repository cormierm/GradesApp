/**
 * Created by mcormier4319 on 4/11/2017.
 */
function addProgram() {
    var name = $("#txtAddProgName").val();
    var isActive = $("#chkAddProgIsActive").prop("checked");
    var options = [name, isActive];
    Program.insert(options);
}

function updateProgram() {
    var programId = localStorage.getItem("selectedProgramId");
    var programName = $("#txtModifyProgName").val();
    var isActive = $("#chkModifyProgIsActive").prop("checked");
    var options = [programName, isActive, programId];
    Program.update(options);
}

function deleteProgram() {
    var programId = localStorage.getItem("selectedProgramId");
    var options = [programId];
    Program.delete(options);
    $(location).prop('href', "#pageGrades");
}
function addCourse() {
    var programId = $("#selAddCoursePrograms").val();
    var name = $("#txtAddCourseName").val();
    var isActive = $("#chkAddCourseIsActive").prop("checked");
    var options = [programId, name, isActive];
    Course.insert(options);
}

function updateCourse() {
    var programId = $("#selModifyCoursePrograms").val();
    var courseId = localStorage.getItem("selectedCourseId");
    var courseName = $("#txtModifyCourseName").val();
    var isActive = $("#chkModifyCourseIsActive").prop("checked");
    var options = [programId, courseName, isActive, courseId];
    Course.update(options);
}

function deleteCourse() {
    var courseId = localStorage.getItem("selectedCourseId");
    var options = [courseId];
    Course.delete(options);
    $(location).prop('href', "#pageGrades");
}

function updateGrade() {
    var gradeId = localStorage.getItem("selectedGradeId");
    var courseId = $("#selModifyGradeCourses").val();
    var gradeName = $("#txtModifyGradeName").val();
    var weight = $("#txtModifyGradeWeight").val();
    var grade = $("#txtModifyGradeGrade").val();
    var options = [courseId, gradeName, weight, grade, gradeId];
    Grade.update(options);
}

function deleteGrade() {
    var gradeId = localStorage.getItem("selectedGradeId");
    var options = [gradeId];
    Grade.delete(options);
    $(location).prop('href', "#pageGrades");
}

function addGrade() {
    var courseId = $("#selAddGradeCourses").val();
    var name = $("#txtAddGradeName").val();
    var weight = $("#txtAddGradeWeight").val();
    var grade = $("#txtAddGradeGrade").val();
    var options = [courseId, name, weight, grade];
    Grade.insert(options);
}

function generateGradesList() {
    $("#lstGrades").html("");
    function successSelectAll(tx, results) {
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            generateCourseHtmlByProgramId(row['name'],row['id']);
        }
    }
    Program.selectAll(successSelectAll);
}

function generateCourseHtmlByProgramId(programName, programId){
    var courseHtmlCode = "<a class='programListItem' data-row-id=" + programId + " href='#'>" +
        "<h1>" + programName + "</h1></a>";
    function successSelectAllCoursesByProgramId(tx, results) {
        courseHtmlCode += "<ul data-role='listview' id='lstProgram" + programId + "'>";
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            courseHtmlCode += "<li><a class='courseListItem' data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h3>" + row['name'] + "</h3></a>" +
                "<div id='courseId" + row['id'] + "'></div>" +
                "</li>";
            generateGradeHtmlByCourseId(row['id']);
        }
        function clickCourseHandler() {
            localStorage.setItem("selectedCourseId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageModifyCourse");
        }
        function clickProgramHandler() {
            localStorage.setItem("selectedProgramId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageModifyProgram");
        }
        courseHtmlCode += "</ul>";
        var listGrades = $("#lstGrades");
        listGrades.html(listGrades.html() + courseHtmlCode);
        $(".courseListItem").on("click", clickCourseHandler);
        $(".programListItem").on("click", clickProgramHandler);
    }
    var options = [programId];
    Course.selectAllByProgram(successSelectAllCoursesByProgramId, options);
}

function generateGradeHtmlByCourseId(courseId){
    var gradeHtmlCode = "";
    function successSelectAllCoursesByCourseId(tx, results) {
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            gradeHtmlCode += "<p><a class='gradeListItem' data-row-id=" + row['id'] + " href='#'>" +
                row['name'] + " Weight: " + row['weight'] + " Grade: " + row['grade'] + "</a></p>";
        }
        var listCourse = $("#courseId" + courseId);
        listCourse.html(gradeHtmlCode);

        function clickGradeHandler() {
            localStorage.setItem("selectedGradeId", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageModifyGrade");
        }
        $(".gradeListItem").on("click", clickGradeHandler);


    }
    var options = [courseId];
    Grade.selectAllByCourse(successSelectAllCoursesByCourseId, options);
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
    Program.selectAll(successSelectAll);
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
    Course.selectAll(successSelectAll);
}

function loadModifyCoursePage() {
    var courseId = localStorage.getItem("selectedCourseId");
    function successSelectOne(tx, results) {
        var row = results.rows[0];
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
    Course.select(options, successSelectOne);
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
    Program.select(options, successSelectOne);
}

function loadModifyGradePage() {
    var gradeId = localStorage.getItem("selectedGradeId");
    function successSelectOne(tx, results) {
        var row = results.rows[0];
        $("#txtModifyGradeName").val(row['name']);
        $("#txtModifyGradeWeight").val(row['weight']);
        $("#txtModifyGradeGrade").val(row['grade']);
        populateSelectListCourses($("#selModifyGradeCourses"), row['courseId']);
    }

    var options = [gradeId];
    Grade.select(options, successSelectOne);
}