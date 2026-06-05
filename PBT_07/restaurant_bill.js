// restaurant_bill.js

function tinhHoaDon(dsMon, dayOfWeek, coTip = false) {
    let tongTien = 0;

    console.log("╔══════════════════════════════════════════════╗");
    console.log("║              HÓA ĐƠN NHÀ HÀNG               ║");
    console.log("╠══════════════════════════════════════════════╣");

    dsMon.forEach((mon, index) => {
        const thanhTien = mon.gia * mon.soLuong;
        tongTien += thanhTien;

        console.log(
            `║ ${index + 1}. ${mon.ten.padEnd(12)} x${mon.soLuong} @${(mon.gia / 1000)}k = ${(thanhTien / 1000)}k`
        );
    });

    // Tính giảm giá
    let giamGiaPhanTram = 0;

    if (tongTien > 1000000) {
        giamGiaPhanTram = 15;
    } else if (tongTien > 500000) {
        giamGiaPhanTram = 10;
    }

    if (dayOfWeek === "Wednesday") {
        giamGiaPhanTram += 5;
    }

    const tienGiam = tongTien * giamGiaPhanTram / 100;
    const sauGiam = tongTien - tienGiam;

    // VAT
    const vat = sauGiam * 0.08;

    // Tip
    const tip = coTip ? sauGiam * 0.05 : 0;

    const thanhToan = sauGiam + vat + tip;

    console.log("╠══════════════════════════════════════════════╣");
    console.log(
        `║ Tổng cộng:          ${tongTien.toLocaleString("vi-VN")}đ`
    );
    console.log(
        `║ Giảm giá (${giamGiaPhanTram}%):      ${tienGiam.toLocaleString("vi-VN")}đ`
    );
    console.log(
        `║ VAT (8%):           ${vat.toLocaleString("vi-VN")}đ`
    );
    console.log(
        `║ Tip (5%):           ${tip.toLocaleString("vi-VN")}đ`
    );
    console.log("╠══════════════════════════════════════════════╣");
    console.log(
        `║ THANH TOÁN:         ${thanhToan.toLocaleString("vi-VN")}đ`
    );
    console.log("╚══════════════════════════════════════════════╝");
}

// Test
const dsMon = [
    {
        ten: "Phở bò",
        gia: 65000,
        soLuong: 2
    },
    {
        ten: "Trà đá",
        gia: 5000,
        soLuong: 3
    },
    {
        ten: "Bún chả",
        gia: 55000,
        soLuong: 1
    }
];

tinhHoaDon(dsMon, "Wednesday", true);