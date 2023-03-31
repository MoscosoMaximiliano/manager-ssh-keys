
window.onload = () => {
  loadSshButton = document.getElementById("load_ssh");
  createSshButton = document.getElementById("create_ssh_button")
  
  if (loadSshButton) loadSshButton.addEventListener("click", loadFilePath)  
  if (createSshButton) createSshButton.addEventListener("click", createSSH)
 
};

const loadFilePath = () => {
  checkFileExist();

  let data = file.getFileData();
  let table = "";

  createTableContent(data);
};

const checkFileExist = () => !file.fileExists() ? file.createFile() : true

const deleteSshKey = () => {
  let indexSSH = this.options[this.selectedIndex].value;
  console.log(indexSSH);
};

const createTableContent = (data) => {
    let table = ""
  data.forEach((object, index) => {
    console.log(object);
    table += "<tr>";
    table += `<td>${object.Host}</td>`;
    table += `<td>${object.HostName}</td>`;
    table += `<td>${object.User}</td>`;
    table += `<td>${object.IdentityFile}</td>`;

    //TODO: Create the delete button on table

    // const deleteButton = document.createElement("button");
    // deleteButton.innerText = "Delete";
    // deleteButton.value = index;
    // deleteButton.id = "delete_ssh_key";
    // deleteButton.addEventListener("click", deleteSshKey);

    // table += `<td>${deleteButton}</td>`;
    table += "</tr>";
  });

  document.getElementById("table-body-content").innerHTML = table;
};


const createSSH = () => {
  let email = document.getElementById('email_ssh').value
  let username = document.getElementById('username_ssh').value

  console.log(os.path())

  if(!email || !username) {
    toastify.failed("Please complete the fields")
    return
  } else {
    command.console(`cd ${os.path()}/.ssh/ && ssh-keygen -t rsa -C "${email}" -f "${username}"  && ssh-add -K ${os.path()}/.ssh/${username}`)

    console.log(email, username)
  }
   
  file.updateSshFile(username)

  // TODO: Create the multi task terminal command
}