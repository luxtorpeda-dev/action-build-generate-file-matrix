const core = require('@actions/core');
const { context, GitHub } = require('@actions/github');
const fs = require('fs').promises;
const path = require('path');

console.log('Starting.');

async function run() {
    try {
        const folderName = core.getInput('name');
        const files = await fs.readdir(folderName);
        console.log(files);
        const matrix = {
            include: []
        };
        
        for(let i = 0; i < files.length; i++) {
            matrix.include.push({
                name: path.parse(files[i]).name,
                fileName: path.join(folderName, files[i])
            });
        }
        
        
        core.setOutput('matrix', JSON.stringify(matrix));
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();
