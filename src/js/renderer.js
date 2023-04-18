window.onload = () => {
  loadSshButton = document.getElementById("load_ssh");
  createSshButton = document.getElementById("create_ssh_button")

  if (loadSshButton) loadSshButton.addEventListener("click", loadFilePath)
  if (createSshButton) createSshButton.addEventListener("click", createSSH)

};

const loadFilePath = () => {
  if (!file.fileExists()) {
    toastify.failed("No data to show")
  } else {
    let data = file.getFileData();

    createTableContent(data)
  }
};

const deleteSshKey = () => {
  let indexSSH = this.options[this.selectedIndex].value;
  console.log(indexSSH);
};

const createTableContent = (data) => {
  const tableBody = document.getElementById("table-body-content")

  if (data.length === 0) {
    toastify.failed("No data to show")
    return
  }

  for (const object of data) {
    const row = document.createElement("tr")

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

const createSSH = () => {
  let email = document.getElementById('email_ssh').value
  let username = document.getElementById('username_ssh').value

  if (!email || !username) {
    toastify.failed("Please complete the fields")
    return
  } else {
    command.addSSH(`cd ${os.path()}/.ssh/ && ssh-keygen -t rsa -C "${email}" -f "${username}"  && ssh-add -K ${os.path()}/.ssh/${username}`)
  }

  file.updateSshFile(username)
}