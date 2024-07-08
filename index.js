//const jsonfile = require('jsonfile');
//const moment = require('moment');
//const simpleGit = require('simple-git');
//
//const FILE_PATH = './data.json';
//
//const makeCommit = async n => {
//    if (n === 0) return simpleGit().push();
//
//    const { default: random } = await import('random');
//
//    const x = random.int(0, 54);
//    const y = random.int(0, 6);
//
//    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();
//
//    const data = {
//        date: DATE
//    };
//
//    console.log(DATE);
//
//    jsonfile.writeFile(FILE_PATH, data, async () => {
//        await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });
//        makeCommit(n - 1);
//    });
//};
//
//makeCommit(1500);


const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const makeCommit = async n => {
    if (n === 0) return simpleGit().push('origin', 'master', {
        '--repo': `https://github.com/OPanurag/GreenCalendar.git`
    });

    const { default: random } = await import('random');

    const x = random.int(0, 54);
    const y = random.int(0, 6);

    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();

    const data = {
        date: DATE
    };

    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, async () => {
        await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });
        makeCommit(n - 1);
    });
};

makeCommit(100);