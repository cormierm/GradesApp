/**
 * File: gradesDAL.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */

var Program = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM program;";
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
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
    }
}

var Course = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM course;";
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
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
    }
}

var Grade = {
    selectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM course;";
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
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
    }
}