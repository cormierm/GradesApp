/**
 * File: util.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 14, 2017
 */

function calculateGrade(courseId){
    function successSelectAllCoursesByCourseId(tx, results) {
        var totalGrades = 0;
        var totalWeights = 0;
        if (results.rows.length === 0) {
            $("#spanGradeStats" + courseId).html("No grades added.");
        }
        else {
            for (var i=0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                totalGrades += (row.weight / 100) * row.grade;
                totalWeights += row.weight;
            }
            var totalAverageGrade = totalGrades / (totalWeights / 100);
            var targetGoal = parseFloat(localStorage.getItem("targetGrade"));
            var goal = (targetGoal - totalGrades) / ((100 - totalWeights) / 100);
            $("#spanAverageGrade" + courseId).html(totalAverageGrade.toFixed(1));
            $("#spanCurrentProgress" + courseId).html(totalWeights.toFixed(1));
            $("#spanCurrentGradesTotal" + courseId).html(totalGrades.toFixed(1));
            if (goal < 0) {
                $("#spanCalculatedGoal" + courseId).html("Required for Goal: 0.0%");
            }
            else if (goal < 100) {
                $("#spanCalculatedGoal" + courseId).html("Required for Goal: " + goal.toFixed(1) + "%");
            }
            else {
                $("#spanCalculatedGoal" + courseId).html("Goal is not attainable.");
            }

        }
    }
    var options = [courseId];
    GradeDB.selectAllByCourse(successSelectAllCoursesByCourseId, options);
}

function doValidate_frmAddProg() {
    var form = $("#frmAddProg");
    form.validate({
        rules: {
            txtAddProgName: {
                required: true,
                minlength: 2,
                maxlength: 30
            }
        },
        messages: {
            txtAddProgName: {
                required: "Program name is required",
                minlength: "Program name must be at least 2 characters.",
                maxlength: "Program name must be shorter than 30 characters"
            }
        }
    });
    return form.valid();
}

function doValidate_frmAddCourse() {
    var form = $("#frmAddCourse");
    form.validate({
        rules: {
            selAddCoursePrograms: {
                required: true
            },
            txtAddCourseName: {
                required: true,
                minlength: 2,
                maxlength: 30
            }
        },
        messages: {
            selAddCoursePrograms: {
                required: "Please select program name"
            },
            txtAddCourseName: {
                required: "Course name is required",
                minlength: "Course name must be at least 2 characters.",
                maxlength: "Course name must be shorter than 30 characters"
            }
        }
    });
    return form.valid();
}

function doValidate_frmAddGrade() {
    var form = $("#frmAddGrade");
    form.validate({
        rules: {
            selAddGradeCourses: {
                required: true
            },
            txtAddGradeName: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            txtAddGradeWeight: {
                required: true,
                min: 0,
                max: 100,
                weightcheck: true
            },
            txtAddGradeGrade: {
                required: true,
                min: 0,
                max: 100
            }
        },
        messages: {
            selAddGradeCourses: {
                required: "Please select course name"
            },
            txtAddGradeName: {
                required: "Grade name is required",
                minlength: "Grade name must be at least 2 characters",
                maxlength: "Grade name must be shorter than 30 characters"
            },
            txtAddGradeWeight: {
                required: "Grade weight is required",
                min: "Grade weight cannot be less than 0%",
                max: "Grade weight cannot surpass 100%"
            },
            txtAddGradeGrade: {
                required: "Grade is required",
                min: "Grade cannot be less than 0%",
                max: "Grade cannot surpass 100%"
            }
        }
    });
    return form.valid();
}

//-- Edit Forms --
function doValidate_frmModifyProg() {
    var form = $("#frmModifyProg");
    form.validate({
        rules: {
            txtModifyProgName: {
                required: true,
                minlength: 2,
                maxlength: 30
            }
        },
        messages: {
            txtModifyProgName: {
                required: "Program name is required",
                minlength: "Program name must be at least 2 characters.",
                maxlength: "Program name must be shorter than 30 characters"
            }
        }
    });
    return form.valid();
}

function doValidate_frmModifyCourse() {
    var form = $("#frmModifyCourse");
    form.validate({
        rules: {
            selModifyCoursePrograms: {
                required: true
            },
            txtModifyCourseName: {
                required: true,
                minlength: 2,
                maxlength: 30
            }
        },
        messages: {
            selModifyCoursePrograms: {
                required: "Please select program name"
            },
            txtModifyCourseName: {
                required: "Course name is required",
                minlength: "Course name must be at least 2 characters.",
                maxlength: "Course name must be shorter than 30 characters"
            }
        }
    });
    return form.valid();
}

function doValidate_frmModifyGrade() {
    var form = $("#frmModifyGrade");
    form.validate({
        rules: {
            selModifyGradeCourses: {
                required: true
            },
            txtModifyGradeName: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            txtModifyGradeWeight: {
                required: true,
                min: 0,
                max: 100,
                weightcheck: true
            },
            txtModifyGradeGrade: {
                required: true,
                min: 0,
                max: 100
            }
        },
        messages: {
            selModifyGradeCourses: {
                required: "Please select course name"
            },
            txtModifyGradeName: {
                required: "Grade name is required",
                minlength: "Grade name must be at least 2 characters.",
                maxlength: "Grade name must be shorter than 30 characters"
            },
            txtModifyGradeWeight: {
                required: "Grade weight is required",
                min: "Grade weight cannot be less than 0%",
                max: "Grade weight cannot surpass 100%"
            },
            txtModifyGradeGrade: {
                required: "Grade is required",
                min: "Grade cannot be less than 0%",
                max: "Grade cannot surpass 100%"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("weightcheck",
    function (value, element) {
        var sumOfWeights = parseFloat(localStorage.getItem("sumOfWeights"));
        value = parseFloat(value);
        return this.optional(element) || (value + sumOfWeights) <= 100;
    },
    "Total Weight for course cannot exceed 100.");
