/**
 * Created by Matt on 4/13/2017.
 */
function Programs(id, name) {
    this.id = id;
    this.name = name;
    this.courses = [];
}

function Courses(id, name) {
    this.id = id;
    this.name = name;
    this.grades = [];
}

function Grades(id, name, weight, grade) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.grade = grade;
}

function testClass() {
    function successSelectAll(tx, results) {
        var asdf = [];
        for (var i=0; i < results.rows.length; i++) {
            var row = results.rows[i];
            // console.info(row['name']);
            asdf.push(new Programs(row['id'], row['name']));

        }
        for (var j=0; j < asdf.length; j++) {
            console.info(asdf[j].name); // asdf[j].name);
        }
    }
    Program.selectAll(successSelectAll);
}