# manager-ssh-keys

A project created with the objective to create new ssk-key more easy

## references

[https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3]

## steps

- Check if exist file
  - In case this not exist create a new one
- Get all SSH data
- Create SSH keys for all accounts
- Add SSH keys to SSH Agent
- Add SSH public key to the Github
- Create a Config File and Make Host Entries
- Cloning GitHub repositories using different accounts

## commands

`cd ~/.ssh`

`ssh-keygen -t rsa -C "your-email-address" -f "github-username"`

`ssh-add -K ~/.ssh/<name-ssh-file>`


## possibles next steps

- Copy on clipboard the ssh public key after create
- Link with github and add the ssh key to correct account (need researchment for see if this is possible)
- Autocomplete the path link when try to clone the repo
