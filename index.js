const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const git = simpleGit();

const makeCommit = async (date, n) => {
    if (n === 0) return;

    const data = { date };
    await jsonfile.writeFile(FILE_PATH, data);

    await git.add(FILE_PATH);
    await git.commit(date, { '--date': date });
    
    await makeCommit(date, n - 1);
};

const run = async () => {
    for (let dayOffset = 0; dayOffset < 50; dayOffset++) {
        // Date for this day
        const DATE = moment()
            .subtract(dayOffset, 'days')
            .hour(12)
            .minute(0)
            .second(0)
            .format();

        // Random commits between 10 and 20 for the day
        const commitsToday = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

        console.log(`Day: ${DATE} → ${commitsToday} commits`);
        await makeCommit(DATE, commitsToday);
    }

    await git.push();
};

run();
