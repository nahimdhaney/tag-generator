#!/usr/bin/env node
const shell = require('shelljs');
const simpleGit = require('simple-git');
const git = simpleGit();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).option('release', {
    alias: 'r',
    type: 'boolean',
    description: 'Generate a release tag',
}).option('branch', {
    alias: 'b',
    type: 'boolean',
    description: 'Generate a branch tag',
}).argv;

async function generateTag() {
    const branchName = (await git.revparse(['--abbrev-ref', 'HEAD'])).trim();
    let baseTag = argv.release ? 'release-' : 'branch-';
    if (!argv.release && !argv.branch) {
        baseTag = branchName.startsWith('version') ? 'release-' : 'branch-';
    }

    const tagsResult = shell.exec('git tag', { silent: true }).stdout;
    const branchTags = tagsResult.split('\n').filter(tag => tag.startsWith(`${baseTag}${branchName}`));

    const nextTagNumber = branchTags.length + 1;
    const newTag = `${baseTag}${branchName}-${nextTagNumber}`;

    if (shell.exec(`git tag ${newTag}`).code === 0) {
        console.log(`Tag creado exitosamente: ${newTag}`);
    } else {
        console.error('Error al crear el tag.');
    }
}

generateTag().catch(console.error);
