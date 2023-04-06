export const downloadFile = (content, filename, filetype = { type: 'text/plain' }) => {
    var a = document.createElement("a");
    var file = new Blob([content], filetype);
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}