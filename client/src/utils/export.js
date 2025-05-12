const csvMaker = function (data) {
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];
    data.forEach((row) => {
        const values = headers.map((e) => row[e]);
        csvRows.push(values.join(","));
    });
    return csvRows.join("\n");
};

const download = (data) => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

module.exports = {
    csvMaker,
    download,
};