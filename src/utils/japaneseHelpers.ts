/**
 * Converts full-width numbers and English characters to half-width.
 * e.g., "１２３ＡＢＣ" -> "123ABC"
 */
export const toHalfWidth = (str: string): string => {
    return str.replace(/[！-～]/g, (char) => {
        return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
    }).replace(/　/g, " ");
};

/**
 * Detects if a string contains full-width numbers or basic latin characters
 * that should be converted for JSON validity.
 */
export const hasFullWidthChars = (str: string): boolean => {
    return /[！-～]/.test(str);
};

/**
 * Exports data to CSV with BOM for Excel compatibility (UTF-8).
 * Note: For Shift-JIS, we might need more complex handling, 
 * but UTF-8 with BOM is generally supported by modern Excel.
 */
export const exportToCSV = (data: any[], filename: string) => {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = [
        header.join(','), // header row first
        ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');

    // Add BOM for Excel utf-8 compatibility
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
