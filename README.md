# MagicConchShell

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run

Run `npm start`

## Live reloading

To get live reloading, replace `mainWindow.loadFile(path.join(__dirname, "../dist/magic-conch-shell/index.html"));`
in the `src-backend/main.ts` with `mainWindow.loadURL('http://localhost:4200/');` and run `ng serve`.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.
