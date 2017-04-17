/**
 * File: database.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 11, 2017
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.code + ") --" + error.message);
}

function successTransaction() {
    console.info("SQL Success: Transaction is successful.");
}

var DB = {
    createDatabase: function () {
        var shortName = "GradesDB";
        var version = "1.0";
        var displayName = "Database for Grades App";
        var dbSize = 2 * 1024 * 1024;
        console.info("Creating Database..");
        function dbCreateSuccess() {
            console.info("SQL Success: Database creation was successful");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {
            var options = [];

            console.info("Creating table program..");
            var sql = "CREATE TABLE IF NOT EXISTS program( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL," +
                "isActive VARCHAR(1) DEFAULT true);";
            function successCreateProgramTable() {
                console.info("SQL Success: Table program creation was successful.");
            }
            tx.executeSql(sql, options, successCreateProgramTable, errorHandler);

            console.info("Creating table course..");
            sql = "CREATE TABLE IF NOT EXISTS course( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "programId INTEGER NOT NULL," +
                "name VARCHAR(20) NOT NULL," +
                "isActive VARCHAR(1) DEFAULT true," +
                "FOREIGN KEY(programId) REFERENCES program(id));";
            function successCreateCourseTable() {
                console.info("SQL Success: Table course creation was successful.");
            }
            tx.executeSql(sql, options, successCreateCourseTable, errorHandler);

            console.info("Creating table grade..");
            sql = "CREATE TABLE IF NOT EXISTS grade( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "courseId INTEGER NOT NULL," +
                "name VARCHAR(20) NOT NULL," +
                "weight DECIMAL(9,2) NOT NULL," +
                "grade DECIMAL(9,2) NOT NULL," +
                "FOREIGN KEY(courseId) REFERENCES course(id));"
            function successCreateReview() {
                console.info("SQL Success: Table grade creation was successful.");
            }
            tx.executeSql(sql, options, successCreateReview, errorHandler);

        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            console.info("Dropping tables..");
            var options = [];
            function successDrop() {
                console.info("SQL Success: Dropping table was successful.");
            }
            var sql = "DROP TABLE IF EXISTS program;";
            tx.executeSql(sql, options, successDrop, errorHandler);
            sql = "DROP TABLE IF EXISTS course;";
            tx.executeSql(sql, options, successDrop, errorHandler);
            sql = "DROP TABLE IF EXISTS grade;";
            tx.executeSql(sql, options, successDrop, errorHandler);

        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
