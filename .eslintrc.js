// https://docs.expo.dev/guides/using-eslint/

//https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#recommended
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      fragment: "Fragment",
      version: "detect",
      defaultVersion: "",
      flowVersion: "0.53",
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Turn off the rule requiring React in scope
    },
    propWrapperFunctions: [
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
      { property: "forbidExtraProps", exact: true },
    ],
    componentWrapperFunctions: [
      "observer",
      { property: "styled" },
      { property: "observer", object: "Mobx" },
      { property: "observer", object: "<pragma>" },
    ],
    formComponents: [
      "CustomForm",
      { name: "SimpleForm", formAttribute: "endpoint" },
      { name: "Form", formAttribute: ["registerEndpoint", "loginEndpoint"] },
    ],
    linkComponents: [
      "Hyperlink",
      { name: "MyLink", linkAttribute: "to" },
      { name: "Link", linkAttribute: ["to", "href"] },
    ],
  },
};
