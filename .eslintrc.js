export default {
    root: true,
    extends: "@react-native-community",
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                quotes: ["error", "double", { allowTemplateLiterals: true }],
                "@typescript-eslint/no-shadow": ["error"],
                "no-shadow": "off",
                "no-undef": "off",
                "react-native/no-inline-styles": 0,
            },
        },
    ],
};