window.onload = () => {
  loadSshButton = document.getElementById("load_ssh");

  if (loadSshButton) loadSshButton.addEventListener("click", loadFilePath);

  console.log(loadSshButton)
};

const loadFilePath = () => {
  checkFileExist();

  let data = ssh.getFileData();
  let table = "";

  console.log("ASD")

  createTableContent(data);
};

const checkFileExist = () => {
  if (ssh.fileExists()) {
    toastify.success("Exists");
  } else {
    ssh.createFile();
  }
};

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

  // TODO: Create the multi task terminal command

  console.log(email, username)
}