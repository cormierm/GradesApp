/**
 * File: gradesDAL.js
 * Author: Matt Cormier & Margo Tavares
 * Created On: April 14, 2017
 */

function doValidate_frmAddProg() {
    var form = $("#frmAddProg");
    form.validate({
        rules: {
            txtAddProgName: {
                required: true,
                minlength: 2,
                maxlength: 20
            }
        },
        messages: {
            txtAddProgName: {
                required: "Program name is required",
                minlength: "Program name must be at least 2 characters.",
                maxlength: "Program name must be shorter than 20 characters"
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
                maxlength: 20
            }
        },
        messages: {
            selAddCoursePrograms: {
                required: "Please select program name"
            },
            txtAddCourseName: {
                required: "Course name is required",
                minlength: "Course name must be at least 2 characters.",
                maxlength: "Course name must be shorter than 20 characters"
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
                maxlength: 20
            },
            txtAddGradeWeight: {
                required: true,
                min: 0,
                max: 100
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
                maxlength: "Grade name must be shorter than 20 characters"
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
                maxlength: 20
            }
        },
        messages: {
            txtModifyProgName: {
                required: "Program name is required",
                minlength: "Program name must be at least 2 characters.",
                maxlength: "Program name must be shorter than 20 characters"
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
                maxlength: 20
            }
        },
        messages: {
            selModifyCoursePrograms: {
                required: "Please select program name"
            },
            txtModifyCourseName: {
                required: "Course name is required",
                minlength: "Course name must be at least 2 characters.",
                maxlength: "Course name must be shorter than 20 characters"
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
                maxlength: 20
            },
            txtModifyGradeWeight: {
                required: true,
                min: 0,
                max: 100
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
                maxlength: "Grade name must be shorter than 20 characters"
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