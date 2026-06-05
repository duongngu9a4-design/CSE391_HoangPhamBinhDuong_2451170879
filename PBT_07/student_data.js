const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Đếm xếp loại
let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

// Tìm cao nhất, thấp nhất
let maxStudent = null;
let minStudent = null;

// Tính TB các môn
let tongMath = 0;
let tongPhysics = 0;
let tongCS = 0;

// Bonus: TB theo giới tính
let tongNam = 0;
let demNam = 0;
let tongNu = 0;
let demNu = 0;

console.log("STT\tTên\tTB\tXếp loại");
console.log("--------------------------------");

for (let i = 0; i < students.length; i++) {
    let s = students[i];

    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;

    let rank;

    if (avg >= 8.0) {
        rank = "Giỏi";
        gioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        trungBinh++;
    } else {
        rank = "Yếu";
        yeu++;
    }

    console.log(
        (i + 1) +
        "\t" +
        s.name +
        "\t" +
        avg.toFixed(1) +
        "\t" +
        rank
    );

    // Tìm cao nhất
    if (maxStudent === null || avg > maxStudent.avg) {
        maxStudent = {
            name: s.name,
            avg: avg
        };
    }

    // Tìm thấp nhất
    if (minStudent === null || avg < minStudent.avg) {
        minStudent = {
            name: s.name,
            avg: avg
        };
    }

    // Tổng môn học
    tongMath += s.math;
    tongPhysics += s.physics;
    tongCS += s.cs;

    // Bonus giới tính
    if (s.gender === "M") {
        tongNam += avg;
        demNam++;
    } else {
        tongNu += avg;
        demNu++;
    }
}

console.log("\n=== Thống kê xếp loại ===");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

console.log("\n=== Sinh viên cao điểm nhất ===");
console.log(maxStudent.name, "-", maxStudent.avg.toFixed(1));

console.log("\n=== Sinh viên thấp điểm nhất ===");
console.log(minStudent.name, "-", minStudent.avg.toFixed(1));

console.log("\n=== Điểm trung bình từng môn ===");
console.log("Math:", (tongMath / students.length).toFixed(2));
console.log("Physics:", (tongPhysics / students.length).toFixed(2));
console.log("CS:", (tongCS / students.length).toFixed(2));

console.log("\n=== Bonus: Điểm TB theo giới tính ===");
console.log("Nam:", (tongNam / demNam).toFixed(2));
console.log("Nữ:", (tongNu / demNu).toFixed(2));