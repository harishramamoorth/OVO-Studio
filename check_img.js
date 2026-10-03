const fs = require('fs');
const path = require('path');
console.log('image.png size:', fs.statSync(path.join(__dirname, 'public', 'image.png')).size);
