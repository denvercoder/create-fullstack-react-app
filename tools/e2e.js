#!/usr/bin/env node
import chalk from 'chalk';
import cp from 'child_process';
import { clientChoices, serverChoices } from '../src/utils';

(() => {
  clientChoices.forEach((client) => {
    serverChoices.forEach((server) => {
      console.log(
        chalk.cyan('creating app with'),
        chalk.yellow(client.name),
        chalk.cyan('&'),
        chalk.yellow(server.name),
        chalk.cyan('sample from template...'),
      );
      cp.execSync(`yarn create-sample ${client.value} ${server.value}`, { stdio: 'inherit' });

      console.log(chalk.cyan('Testing frontend...'));
      cp.execSync('yarn test-client', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('Testing server...'));
      cp.execSync('yarn test-server', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('Building frontend...'));
      cp.execSync('yarn build-client', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('Building server...'));
      cp.execSync('yarn build-server', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('cleaning sample...'));
      cp.execSync('yarn clean', { stdio: 'inherit' });
    });
  });
})();
