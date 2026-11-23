import{mkdirSync,readFileSync,readdirSync,writeFileSync}from'node:fs';
eval(readFileSync(import.meta.dirname+'/vm.src.js','utf8'));
