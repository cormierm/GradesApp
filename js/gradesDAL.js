/**
 * File: gradesDAL.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */

var ProgramDB = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM program;";
            if (localStorage.getItem("showIsActiveOnly") === 'true') {
                sql = "SELECT * FROM program WHERE isActive='true';";
            }
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, successSelectOne) {
        function txFunction(tx) {
            var sql = "SELECT * FROM program WHERE id=?;";
            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    insert: function(options) {
        function txFunction(tx) {
            var sql = "INSERT INTO program " +
                "(name, isActive) " +
                "VALUES (?, ?);";
            function successInsertProgram() {
                console.info("WebSQL Success: Inserted into program.");
                alert("New Program Created.");
            }
            tx.executeSql(sql, options, successInsertProgram, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options) {
        function txFunction(tx) {
            var sql = "UPDATE program SET name=?, isActive=? WHERE id=?;";
            function successUpdateCourse() {
                console.info("WebSQL Success: Updated program.");
                alert("Program Successfully Updated.");
            }
            tx.executeSql(sql, options, successUpdateCourse, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM program WHERE id=?;";

            function successCourseDelete() {
                console.info("WebSQL Success: Deleted program.");
                alert ("Program Deleted Successfully.");
            }
            tx.executeSql(sql, options, successCourseDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var CourseDB = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM course;";
            if (localStorage.getItem("showIsActiveOnly") === 'true') {
                sql = "SELECT * FROM course WHERE isActive='true';";
            }
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAllByProgram: function (successSelectAll, options) {
        function txFunction(tx) {
            var sql = "SELECT * FROM course WHERE programId=?;";
            if (localStorage.getItem("showIsActiveOnly") === 'true') {
                sql = "SELECT * FROM course WHERE programId=? AND isActive='true';";
            }
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, successSelectOne) {
        function txFunction(tx) {
            var sql = "SELECT * FROM course WHERE id=?;";
            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    insert: function(options) {
        function txFunction(tx) {
            var sql = "INSERT INTO course " +
                "(programId, name, isActive) " +
                "VALUES (?, ?, ?);";
            function successInsertCourse() {
                console.info("WebSQL Success: Inserted into course.");
                alert("New Course Created.");
            }
            tx.executeSql(sql, options, successInsertCourse, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options) {
        function txFunction(tx) {
            var sql = "UPDATE course SET programId=?, name=?, isActive=? WHERE id=?;";
            function successUpdateCourse() {
                console.info("WebSQL Success: Updated course.");
                alert("Course Successfully Updated.");
            }
            tx.executeSql(sql, options, successUpdateCourse, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM course WHERE id=?;";
            function successCourseDelete() {
                console.info("WebSQL Success: Deleted course.");
                alert ("Course Deleted Successfully.");
            }
            tx.executeSql(sql, options, successCourseDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    deleteAllByProgramId: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM course WHERE programId=?;";
            function successCourseDelete() {
                console.info("Success: Course deleted successful");
            }
            tx.executeSql(sql, options, successCourseDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};

var GradeDB = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM grade;";
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAllByCourse: function (successSelectAll, options) {
        function txFunction(tx) {
            var sql = "SELECT * FROM grade WHERE courseId=?;";
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, successSelectOne) {
        function txFunction(tx) {
            var sql = "SELECT * FROM grade WHERE id=?;";
            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    insert: function(options) {
        function txFunction(tx) {
            var sql = "INSERT INTO grade " +
                "(courseId, name, weight, grade) " +
                "VALUES (?, ?, ?, ?);";
            function successInsertCourse() {
                console.info("WebSQL Success: Inserted into grade.");
                alert("New Grade Created.");
            }
            tx.executeSql(sql, options, successInsertCourse, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options) {
        function txFunction(tx) {
            var sql = "UPDATE grade SET courseId=?, name=?, weight=?, grade=? WHERE id=?;";
            function successUpdate() {
                console.info("WebSQL Success: Updated grade.");
                alert("Grade Successfully Updated.");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM grade WHERE id=?;";
            function successDelete() {
                console.info("WebSQL Success: Deleted from grade");
                alert ("Grade Deleted Successfully.");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    deleteAllByCourseId: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM grade WHERE courseId=?;";
            function successDelete() {
                console.info("WebSQL Success: Deleted from grade by courseId.");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var dbBackup;

var UtilDB = {
    calculateHomePageCourseAverage: function() {
        function txFunction(tx) {
            var sql = "" +
                "SELECT p.name AS pname, c.name AS cname, " +
                "g.name AS gname, SUM(CAST(weight AS DOUBLE) / 100 * grade) / (SUM(CAST(weight AS DOUBLE)) / 100) AS sumGrade," +
                "COUNT(p.id) AS count " +
                "FROM program p " +
                "JOIN course c ON p.id = c.programId " +
                "JOIN grade g ON c.id = g.courseId " +
                "GROUP BY c.id " +
                "HAVING p.isActive='true' AND c.isActive='true';";
            var options = [];
            function successSelectAll(tx, results) {
                var totalGrades = 0;
                var count = results.rows.length;
                for (var i=0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    totalGrades += row['sumGrade'];
                }
                var outputHtml = (totalGrades / count);
                if (isNaN(outputHtml)) {
                    outputHtml = "N/A";
                }
                else {
                    outputHtml = outputHtml.toFixed(0).toString() + "%";
                }
                $("#calculatedTotalGrade").html(outputHtml);
            }
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    backupDatabase: function () {
        function txFunction(tx) {
            console.info("Creating Backup.");
            var options = [];
            dbBackup = [];
            var sql = "SELECT * FROM program;";
            function successProgramSelectAll(tx, results) {
                dbBackup.push(JSON.stringify(results.rows));
            }
            tx.executeSql(sql, options, successProgramSelectAll, errorHandler);

            sql = "SELECT * FROM course;";
            function successCourseSelectAll(tx, results) {
                dbBackup.push(JSON.stringify(results.rows));
            }
            tx.executeSql(sql, options, successCourseSelectAll, errorHandler);

            sql = "SELECT * FROM grade;";
            function successGradeSelectAll(tx, results) {
                dbBackup.push(JSON.stringify(results.rows));
                alert(JSON.stringify(dbBackup));
                localStorage.setItem("backup", JSON.stringify(dbBackup));
            }
            tx.executeSql(sql, options, successGradeSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    restoreDatabase: function () {
        function txFunction(tx) {
            console.info("Restoring Backup");
            dbBackup = JSON.parse(localStorage.getItem("backup"));

            var sql = "INSERT INTO program " +
                "(id, name, isActive) " +
                "VALUES (?, ?, ?);";
            function successProgramInsert() {
                console.info("WebSQL Success: Backup Inserted record into program");
            }
            var rows = JSON.parse(dbBackup[0]);
            var rowCount = Object.keys(rows).length;
            for (var i=0; i < rowCount; i++) {
                console.info("Inserted program: " + rows[i].id + ":" + rows[i].name + ":" + rows[i].isActive);
                var options = [rows[i].id, rows[i].name, rows[i].isActive];
                tx.executeSql(sql, options, successProgramInsert, errorHandler);
            }

            sql = "INSERT INTO course " +
                "(id, programId, name, isActive) " +
                "VALUES (?, ?, ?, ?);";
            function successCourseInsert() {
                console.info("WebSQL Success: Backup Inserted record into course");
            }
            var courseRows = JSON.parse(dbBackup[1]);
            var courseRowCount = Object.keys(courseRows).length;
            for (var i=0; i < courseRowCount; i++) {
                console.info("Inserted course: " + courseRows[i].id + ":" + courseRows[i].programId + ":" + courseRows[i].name + ":" +
                    courseRows[i].isActive);
                options = [courseRows[i].id, courseRows[i].programId, courseRows[i].name, courseRows[i].isActive];
                tx.executeSql(sql, options, successCourseInsert, errorHandler);
            }

            sql = "INSERT INTO grade " +
                "(id, courseId, name, weight, grade) " +
                "VALUES (?, ?, ?, ?, ?);";
            function successGradeInsert() {
                console.info("WebSQL Success: Backup Inserted record into grade");
            }
            var gradeRows = JSON.parse(dbBackup[2]);
            var gradeRowCount = Object.keys(gradeRows).length;
            for (var i=0; i < gradeRowCount; i++) {
                console.info("Inserted grade: " + gradeRows[i].id + ":" + gradeRows[i].courseId + ":" + gradeRows[i].name + ":" +
                    gradeRows[i].weight + ":" + gradeRows[i].grade);
                options = [gradeRows[i].id, gradeRows[i].courseId, gradeRows[i].name, gradeRows[i].weight, gradeRows[i].grade];
                tx.executeSql(sql, options, successGradeInsert, errorHandler);
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};