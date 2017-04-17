/**
 * File: gradesDAL.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */

var ProgramDB = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM program;";
            if (localStorage.getItem("showIsActiveOnly") == 'true') {
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
                alert("New Program Added");
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
                alert("Program Updated");
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
                alert ("Program deleted successfully");
            }
            tx.executeSql(sql, options, successCourseDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}

var CourseDB = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM course;";
            if (localStorage.getItem("showIsActiveOnly") == 'true') {
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
            if (localStorage.getItem("showIsActiveOnly") == 'true') {
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
                alert("New Course Added");
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
                alert("Course Updated");
            }
            tx.executeSql(sql, options, successUpdateCourse, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM course WHERE id=?;";
            function successCourseDelete() {
                console.info("Success: Delete successful");
                alert ("Course deleted successfully");
            }
            tx.executeSql(sql, options, successCourseDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

}

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
                console.info("SQL Success: Successfully inserted into course.");
                alert("New Course Added");
            }
            tx.executeSql(sql, options, successInsertCourse, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options) {
        function txFunction(tx) {
            var sql = "UPDATE grade SET courseId=?, name=?, weight=?, grade=? WHERE id=?;";
            function successUpdate() {
                console.info("SQL Success: Successfully updated course.");
                alert("Course Updated");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM grade WHERE id=?;";
            function successDelete() {
                console.info("Success: Delete successful");
                alert ("Grade deleted successfully");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}

var CalculateDB = {
    selectAll: function() {
        function txFunction(tx) {
            var sql = "" +
                "SELECT p.name AS pname, c.name AS cname, " +
                "g.name AS gname, grade " +
                "FROM program p " +
                "JOIN course c ON p.id = c.programId " +
                "JOIN grade g ON c.id = g.courseId;";
            var options = [];
            function successSelectAll(tx, results) {
                for (var i=0; i < results.rows.length; i++) {
                    var row = results.rows[i];
                    console.info(row['pname'] + " : " + row['cname'] + " : " + row['gname'] + " : " + row['grade']);
                }
            }
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}