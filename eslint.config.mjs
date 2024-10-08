import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
            },
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: ["@babel/preset-react"],
                },
            },
        },

        plugins: {
            js: pluginJs,
            react: pluginReact,
            jest: pluginJest,
            prettier: eslintPluginPrettier
        },

        rules: {
            ...pluginJs.configs.recommended.rules,
            ...pluginReact.configs.flat.recommended.rules,
            ...pluginJest.configs.recommended.rules,
            ...eslintPluginPrettier.configs.recommended.rules,
        },

        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
