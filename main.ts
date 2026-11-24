import{mkdirSync,readFileSync,readdirSync,writeFileSync}from'node:fs';
eval(readFileSync(import.meta.dirname+'/vm.js','utf8'));
