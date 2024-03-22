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

    console.log('getting tags from remote repository...');
    await git.fetch('--tags');

    const branchName = (await git.revparse(['--abbrev-ref', 'HEAD'])).trim();
    let baseTag = argv.release ? 'release-' : 'branch-';
    if (!argv.release && !argv.branch) {
        baseTag = branchName.startsWith('version') ? 'release-' : 'branch-';
    }

    const tagsResult = shell.exec('git tag', { silent: true }).stdout;
    const branchTags = tagsResult.split('\n').filter(tag => tag.startsWith(`${baseTag}${branchName}`));
    // get the next tag number
    const branchNumber = branchTags.map(tag => tag.replace(`${baseTag}${branchName}-`, ''))
        .map(tag => parseInt(tag))
        .sort((a, b) => a - b)
        .pop() || 0;
    const nextTagNumber = branchNumber + 1;
    const newTag = `${baseTag}${branchName}-${nextTagNumber}`;

    if (shell.exec(`git tag ${newTag}`).code === 0) {
        console.log(`Tag created successful: ${newTag}`);
        // Hacer push del tag into remote repository
        if (shell.exec(`git push origin ${newTag}`).code === 0) {
            console.log(`Tag '${newTag}' pushed successfully into remote repository.`);
        } else {
            console.error(`Error pushing tag '${newTag}' into remote repository.`);
        }
    } else {
        console.error('Error creating the tag.');
    }
}

generateTag().catch(console.error);
