/* eslint-disable no-undef */
const createSSH = () => {
  const email = document.getElementById('email_ssh').value
  const username = document.getElementById('username_ssh').value

  if (!email || !username) {
    toastify.failed('Please complete the fields')
    return
  } else {
    command.addSSH(email, username)
  }

  file.updateSshFile(username)
}

const createSshButton = document.getElementById('create_ssh_button')

if (createSshButton) createSshButton.addEventListener('click', createSSH)
