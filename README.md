# MagicConchShell

This is a school project from M306 in BBZW Sursee 04/2022.<br>
Firebase was used as backend for it.<br><br>

With this Angular web app users can create questions and have them assigned to other random users.<br>
In a history page one can see their own questions and answers.<br>
Both can be rated with a thumb up or down.<br><br>

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run

Run `npm start`

## Live reloading

To get live reloading, replace `mainWindow.loadFile(path.join(__dirname, "../dist/magic-conch-shell/index.html"));`
in the `src-backend/main.ts` with `mainWindow.loadURL('http://localhost:4200/');` and run `ng serve`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
<br><br>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.
