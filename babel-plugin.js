module.exports = function replacePaths({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path) {
                const importPath = path.node.source.value;
                if (importPath === '../package.json') {
                    path.node.source = t.stringLiteral('../../package.json');
                }
            },
        },
    };
};
