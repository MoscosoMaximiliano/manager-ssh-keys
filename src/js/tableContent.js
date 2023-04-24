/* eslint-disable no-undef */
const loadFilePath = () => {
  if (!file.fileExists()) {
    toastify.failed('No data to show')
  } else {
    const data = file.getFileData()

    createTableContent(data)
  }
}

const createTableContent = (data) => {
  const tableBody = document.getElementById('table-body-content-ssh')

  tableBody.innerHTML = ''

  if (data.length === 0) {
    toastify.failed('No data to show')
    return
  }

  for (const object of data) {
    const row = document.createElement('tr')

    // TODO: Check the object.index return undefined

    row.innerHTML = `
      <td>${object.Host}</td>
      <td>${object.HostName}</td>
      <td>${object.User}</td>
      <td>${object.IdentityFile}</td>
      <td>
      <button class="delete is-fullwidth" id="delete_ssh_key" onClick=${file.deleteSshKey(object.index)} />
      </td>`

    tableBody.appendChild(row)
  }
}

const loadSshButton = document.getElementById('load_ssh')

if (loadSshButton) loadSshButton.addEventListener('click', loadFilePath)
