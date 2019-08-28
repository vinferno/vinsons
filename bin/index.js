#!/usr/bin/env node

const colors = require('colors');
const g = require("../lib/generators");


const args = process.argv.splice(2);

const config = {
    i: 0,
    args,
    current: function () {
        return this.args[this.i];
    },
    next: function () {
        this.i++;
    }
};

// print random greeting
console.log(
    // wraps text with rainbow color formatting
    'Vinson'.underline.green
);

switch (config.current()) {
    case 'g':
        g.generate(config);
        break;
    default:
        console.log('a flag is required');
        console.log('current options are');
        console.log('g : generator');
}

