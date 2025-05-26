/**
 * Reads a CSV file with 2 columns and returns two arrays, skipping the header row.
 * @param {File} file - The File object (from an <input type="file">).
 * @returns {Promise<[string[], string[]]>} - Promise resolving to two arrays, one for each column.
 */
export function readPasswordsFileCSV(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = event.target.result;
            const lines = data.trim().split("\n");
            const col1 = [];
            const col2 = [];
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const [first = "", second = ""] = lines[i]
                    .split(",")
                    .map((s) => s.trim());
                col1.push(first);
                col2.push(second);
            }
            resolve([col1, col2]);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
