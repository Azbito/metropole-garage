const prettierConfig = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    endOfLine: 'lf',
    embeddedLanguageFormatting: 'auto',
    singleAttributePerLine: false,
    importOrder: [
        '^react$',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/stores/(.*)$',
        '',
        '^@/components/(.*)$',
        '',
        '^@/hooks/(.*)$',
        '',
        '^@/services/(.*)$',
        '',
        '^@/utils/(.*)$',
        '',
        '^@/18n/(.*)$',
        '',
        '^[./]',
    ],

    plugins: [
        'prettier-plugin-tailwindcss',
        '@ianvs/prettier-plugin-sort-imports',
    ],
};

export default prettierConfig;
