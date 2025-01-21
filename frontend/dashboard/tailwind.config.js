const sharedConfig = require("../../shared/tailwind/tailwind.config");

module.exports = {
    ...sharedConfig,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        ...sharedConfig.content,
    ],
};
