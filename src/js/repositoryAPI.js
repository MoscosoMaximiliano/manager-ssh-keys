/* eslint-disable no-undef */
const BASEURL = (name) => `https://api.github.com/users/${name}/repos`

const Clipboard = (value) => {
  console.log(value)
  try {
    navigator.clipboard.writeText(value)
    toastify.success('Copied!!')
  } catch (error) {
    toastify.failed(error)
  }
}

const createClipboardButton = (text, value) => {
  const clipboardButton = document.createElement('button')
  clipboardButton.classList.add('button', 'is-info', 'is-small')
  clipboardButton.textContent = text
  clipboardButton.addEventListener('click', () => Clipboard(value))

  return clipboardButton
}

const GetRepositoriesGithub = async (url) => {
  const username = document.getElementById('check_user').value

  const URL = BASEURL(username)
  try {
    const response = await fetch(URL)
    const data = await response.json()

    const tableBody = document.getElementById('table-body-content-repo')

    tableBody.innerHTML = ''

    if (data.length === 0) {
      toastify.failed('No found any repository')
      return
    }

    for (const object of data) {
      const row = document.createElement('tr')

      const sshtr = document.createElement('td')
      const sshButton = createClipboardButton('Copy SSH', object.ssh_url)
      sshtr.appendChild(sshButton)

      const clonetr = document.createElement('td')
      const urlButton = createClipboardButton('Copy URL', object.clone_url)

      clonetr.appendChild(urlButton)

      const nameCell = document.createElement('td')
      nameCell.textContent = object.name

      const descriptionCell = document.createElement('td')
      descriptionCell.textContent = object.description

      row.appendChild(nameCell)
      row.appendChild(descriptionCell)
      row.appendChild(sshtr)
      row.appendChild(clonetr)

      tableBody.appendChild(row)
    }
  } catch (error) {
    toastify.failed(error)
  }
}

const checkUserButton = document.getElementById('check_repos')

if (checkUserButton) checkUserButton.addEventListener('click', GetRepositoriesGithub)
