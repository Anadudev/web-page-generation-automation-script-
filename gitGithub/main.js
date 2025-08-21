const {simpleGit, CleanOptions} = require("simple-git");

simpleGit().clean(CleanOptions.FORCE);

const options = {
    baseDir: process.cwd(),
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false
};

const git = simpleGit(options);

const gitPull = async () => await git.pull();

const gitCommit = async (message) => await git.commit(message);

const gitPush = async () => await git.push();

const remoteUpdate = async (message) => {
    Promise.all([git.add("*"),
        git.commit(message),
        git.push("origin", "main")]);
};

module.exports = {gitPull, gitPush, gitCommit, remoteUpdate};
