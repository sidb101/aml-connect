module.exports = {
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ],
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', {runtime: 'automatic'}],
        '@babel/preset-typescript',
    ],
};