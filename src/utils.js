```javascript
function generateFileName(baseName, index) {
    return `${baseName}_part${index}.js`;
}

function generateFilePath(basePath, fileName) {
    return `${basePath}/${fileName}`;
}

module.exports = {
    generateFileName,
    generateFilePath
};
```