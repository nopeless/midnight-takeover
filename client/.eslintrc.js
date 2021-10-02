module.exports = {
  root: true,
  extends: [`react-app`, `eslint:recommended`],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "linebreak-style": [`error`, `unix`],
    semi: [`error`, `always`],
    quotes: [`error`, `backtick`],
    indent: [`error`, 2],
    "quote-props": [`error`, `as-needed`],
    strict: 0,
    "comma-dangle": [`error`, `always-multiline`],
    "space-infix-ops": [`error`, { int32Hint: false }],
    "max-len": [`error`, { 
      code: 100,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: false,
    }],
    "require-jsdoc": [`off`],
    "new-cap": [`error`, { newIsCap: true}],
  },
  overrides: [
    {
      files: [
        `**/__tests__/*.{j,t}s?(x)`,
        `**/tests/unit/**/*.spec.{j,t}s?(x)`,
      ],
      env: {
        // use jest instead
        jest: true,
      },
    },
  ],
};
