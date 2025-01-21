const path = require('path');
const tailwindConfig = path.resolve(__dirname, '../shared/tailwind/tailwind.config');

module.exports = {
  plugins: {
    tailwindcss: { config: tailwindConfig },
    autoprefixer: {},
  },
};
