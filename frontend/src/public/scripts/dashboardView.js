function generatePasswordsTable(jsonData) {
  if(jsonData == 'null') {
    return;
  }

  jsonData = jsonData.replaceAll('&quot;', '"');
  jsonData = jsonData.replaceAll('\\', '\\\\');
  jsonData = JSON.parse(jsonData);
  
  let col = [];

  for (let i = 0; i < jsonData.length; i++) {
    for(let key in jsonData[i]) {
      if(col.indexOf(key) == -1) {
        col.push(key);
      }
    }
  }

  const table = document.createElement('table');
  const thead = table.createTHead();
  const tbody = table.createTBody();

  table.setAttribute('id', 'json-table');

  let tr = thead.insertRow(-1);
  let headers = ['Website', 'Encrypted password', 'Options'];

  for (let i = 0; i < headers.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = headers[i];
    tr.appendChild(th);
  }

  for (let i = 0; i < jsonData.length; i++) {
    tr = tbody.insertRow(-1);

    let j = 0
    let tabCell;
    for (; j < col.length; j++) {
      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = jsonData[i][col[j]];
    }
    tabCell.setAttribute('id', `password ${i}`);

    let lastCell = tr.insertCell(-1);
    
    let editButton = "<input type='button' value='Edit' onclick='openUpdateForm()'/>";
    
    let decryptAndCopyButton = `<input type='button' id=${i} onClick='copyToClipboard(id)' value='Decrypt & Copy'/>`;
    
    lastCell.innerHTML = editButton + decryptAndCopyButton;
  }

  document.querySelector('.json-table-container').appendChild(table);
}

function saveValue() {
  sessionStorage.setItem('secretKey', document.getElementById('secretKey').value);
}

function restoreStateOnReload() {
  let secretKey = sessionStorage.getItem('secretKey');
  
  if (secretKey == '') {
    return;
  }

  document.getElementById('secretKey').value = secretKey;
}

function copyToClipboard(id){
  let password = document.getElementById('password ' + id);
  navigator.clipboard.writeText(password.textContent);
};
  
function openUpdateForm() {
  document.getElementById('updatePasswordForm').style.display = 'block';
};

function openNewForm() {
  document.getElementById('newPasswordForm').style.display = 'block';
};

function closeForm(id) {
  document.getElementById(id).style.display = 'none';
};

function openUpdatePassword() {
  document.getElementById('update-popup').style.display = 'block';
};

function closeUpdatePassword() {
  document.getElementById('update-popup').style.display = 'none';
};