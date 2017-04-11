/**
 * Created by mcormier4319 on 4/11/2017.
 */
function addProgram() {
    var name = $("#txtAddProgName").val();
    var isActive = $("#chkAddProgIsActive").prop("checked");
    var options = [name, isActive];
    Program.insert(options);
}

function addCourse() {
    var programId = $("#selAddCoursePrograms").val();
    var name = $("#txtAddCourseName").val();
    var isActive = $("#chkAddCourseIsActive").prop("checked");
    var options = [programId, name, isActive];
    Course.insert(options);
}

function addGrade() {
    var courseId = $("#selAddGradeCourses").val();
    var name = $("#txtAddGradeName").val();
    var weight = $("#txtAddGradeWeight").val();
    var grade = $("#txtAddGradeGrade").val();
    var options = [courseId, name, weight, grade];
    Grade.insert(options);
}

function populateSelectListPrograms(selectList) {
    function successSelectAll(tx, results) {
        var htmlCode = "";
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlCode += "<option value='" + row['id'] + "'>" + row['name']
                + "</option>";
        }
        selectList.html(htmlCode);
        // selectList[0].selectedIndex = 2;
        selectList.selectmenu('refresh');
    }
    Program.selectAll(successSelectAll);
}

function populateSelectListCourses(selectList) {
    function successSelectAll(tx, results) {
        var htmlCode = "";
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlCode += "<option value='" + row['id'] + "'>" + row['name']
                + "</option>";
        }
        selectList.html(htmlCode);
        // selectList[0].selectedIndex = 2;
        selectList.selectmenu('refresh');
    }
    Course.selectAll(successSelectAll);
}