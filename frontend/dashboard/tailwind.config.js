const path = require('path');
const sharedConfig = require(path.resolve(__dirname, '../shared/tailwind/tailwind.config'));


module.exports = {
    ...sharedConfig,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        ...sharedConfig.content,
    ],
};
