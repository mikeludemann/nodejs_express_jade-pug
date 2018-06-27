// Setup for using Babel as Transpiler

require('babel-register')({
    presets: ['es2015']
});

require('./app');