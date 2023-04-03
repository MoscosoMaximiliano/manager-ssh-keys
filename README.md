## manager-ssh-keys

A project created with the objective to create new ssk-key more easy and create multiples ssh key profiles for people who has multiples github (at the moment) profiles.

## Framework

- Electron

## Dependencies

- toastify-js
- electromon
- electron-builder
- eslint

## How to navigate on files

At the moment i'm not going to explain these because i'm learning about Electron and the structure files, so the current project can change drastically.

## How to run

`npm ci` for install all dependencies

`npm run start` for start the app

`npm run start:electromon` for start the app with hot reload

## How to compile

First at all we need to run the next command for get the neccesary files to package the app

`npm run package-<distro>`

The possibles distros are:

- mac
- win
- linux

After this, we need to run the next command for create the executable

`npm run dist`

## references

[Steps for create a new SSH](https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3)

[How to create a app without context isolation](https://webninjadeveloper.com/electronjs/build-a-electron-js-mysql-crud-app-in-browser-using-html5-css3-javascript/)

[Video of MiduDEV for create a Electron App](https://www.youtube.com/watch?v=ir9yaSgbOdY)

## possibles steps on dev

- Check if exist file
  - In case this not exist create a new one
- Get all SSH data
- Create SSH keys for all accounts
- Add SSH keys to SSH Agent
- Add SSH public key to the Github
- Create a Config File and Make Host Entries
- Cloning GitHub repositories using different accounts

## commands used for creation of the SSH Keys

`cd ~/.ssh`

`ssh-keygen -t rsa -C "your-email-address" -f "github-username"`

`ssh-add -K ~/.ssh/<name-ssh-file>`

## possibles next functionalities

- Copy on clipboard the ssh public key after create
- Link with github and add the ssh key to correct account (need researchment for see if this is possible)
- Autocomplete the path link when try to clone the repo
  - Maybe a system who need to select a profile and with that can complete the SSH path when clone the repo
- Delete a SSH Key
