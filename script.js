
let tableData = [];

function validateInputs(inputs) {
  let isValid = true;
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      isValid = false;
    }
    if (input.getAttribute('data-type') === 'number' && isNaN(input.value)) {
      isValid = false;
    }
    if (input.getAttribute('data-type') === 'email' && !input.value.includes('@')) {
      isValid = false;
    }
  });
  return isValid;
}

function createRow() {
  const tbody = document.querySelector('#myTable tbody');
  const newRow = document.createElement('tr');
  const newRowData = {
    id: tableData.length + 1,
    student_name: '',
    student_roll: '',
    subject: '',
    marks: '',
    markedBy: ''
  };
  for (let key in newRowData) {
    const newCell = document.createElement('td');
    newCell.classList.add("new-cell");
    if (key === 'id') {
      newCell.textContent = newRowData[key];
    } else {
      const newInput = document.createElement('input');
      newInput.setAttribute('type', 'text');
      newInput.setAttribute('data-key', key);
      newInput.setAttribute('data-type', key === 'marks' ? 'number' : (key === 'markedBy' ? 'email' : 'text'));
      newInput.value = newRowData[key];
      newCell.appendChild(newInput);
    }
    newRow.appendChild(newCell);
  }
  const saveButton = document.createElement('button');
  saveButton.classList.add('save-button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => {
    const inputs = newRow.querySelectorAll('input');
    if (validateInputs(inputs)) {
      newRowData.id = tableData.length + 1;
      inputs.forEach(input => {
        newRowData[input.getAttribute('data-key')] = input.value;
      });
      tableData.push(newRowData);
      console.log(tableData);
    } else {
      alert('Please enter valid data for all fields.');
    }
  });
  const saveCell = document.createElement('td');
  saveCell.appendChild(saveButton);
  newRow.appendChild(saveCell);
  tbody.appendChild(newRow);
}

document.querySelector('#addRow').addEventListener('click', createRow);
