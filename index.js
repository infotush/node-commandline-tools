#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
// const util = require("util");
// const lstat = util.promisify(fs.lstat);

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, files) => {
  if (err) {
    console.log(err);
  }
  //   for (let filename of files) {
  //     try {
  //       const stats = await lstat(filename);
  //       console.log(filename, stats.isFile());
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  const statPromises = files.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStat = await Promise.all(statPromises);

  for (let stat of allStat) {
    const index = allStat.indexOf(stat);
    if (stat.isFile()) {
      console.log(chalk.blue(files[index]));
    } else {
      console.log(chalk.green(files[index]));
    }
  }
});

//method one using promise
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };
