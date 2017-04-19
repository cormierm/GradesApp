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
                console.info("SQL Success: Successfully inserted into program.");
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
                console.info("SQL Success: Successfully updated program.");
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
                console.info("Success: Delete successful");
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
                console.info("SQL Success: Successfully inserted into course.");
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
                console.info("SQL Success: Successfully updated course.");
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
                console.info("Success: Course deleted successful");
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
                console.info("SQL Success: Successfully inserted into grade.");
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
                console.info("SQL Success: Successfully updated grade.");
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
                console.info("Success: Grade deleted successfully");
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
                console.info("Success: Grade deleted successful");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var CalculateDB = {
    selectAll: function() {
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
                    console.info(row['pname'] + " : " + row['cname'] + " : " + row['count'] + " : " + row['sumGrade']);
                    totalGrades += row['sumGrade'];
                }
                var outputHtml = (totalGrades / count);
                console.info("asdf:" + outputHtml);
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
    }
};