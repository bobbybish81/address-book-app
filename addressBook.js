// fetch contacts from server
const url = 'http://localhost:3000/api/addressbook';

function getContacts(bookElement) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const contactList = createContactList(data)
            bookElement.appendChild(contactList);
        });
};

function createContactList(contacts) {
const contactList = document.createElement('div');
contactList.classList.add('listElement');
const emptySpaces = 10-contacts.length;
for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.appendChild(createContactHeading(contact));
    contactList.appendChild(contactDiv);
}
for (let i = 1; i <= emptySpaces; i++) {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactList.appendChild(contactDiv);
}
return contactList;
}

function createContactHeading(contact) {
const contactHeading = document.createElement('h3');
contactHeading.classList.add('contactText');
contactHeading.textContent = `${contact.name}: ${contact.address}, ${contact.city} Email:${contact.email} Tel No: ${contact.telNo}`
return contactHeading;
}

// update address book with contacts
document.addEventListener('DOMContentLoaded', () => {
    const bookElement = document.querySelector('.bookElement');
    const header = document.createElement('h1');
    header.textContent = "My Address Book";
    header.classList.add('header');
    bookElement.append(header);
    getContacts(bookElement);
});

// form inputs
const types = ['text', 'text', 'text', 'text', 'number', ];
const inputs = ['name', 'address', 'city', 'email', 'telNo'];
const placeholders = ['Name (required)', 'Address', 'City', 'Email', 'Tel No:'];
const maxLength = ['25', '50', '25', '50', '25'];
// key elements
const mainElement = document.querySelector('main');
const containerElement = document.querySelector('.containerElement');
const formElement = document.querySelector('.formElement');
const newPost = document.getElementById('post');
const newUpdate = document.getElementById('update');
const newDelete = document.getElementById('delete');

const createInputs = function(form) {
for(let i = 0; i < inputs.length; i++) {
    const input = document.createElement('input');
    input.classList.add(`${form.classList.value}Input`);
    input.setAttribute('type', types[0]);
    input.setAttribute('id', `${form.classList.value}Input_${inputs[i]}`);
    input.setAttribute('name', inputs[i]);
    input.setAttribute('placeholder', `Enter ${placeholders[i]}`);
    input.setAttribute('maxlength', maxLength[i]);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('required', '');
    form.append(input);
    };
    formElement.append(form);
};

const createUpdateInputs = function(form) { // for pre patch and delete forms
    const input = document.createElement('input');
    input.classList.add(`${form.classList.value}Input`);
    input.setAttribute('type', types[0]);
    input.setAttribute('id', `${form.classList.value}Input_${inputs[0]}`);
    input.setAttribute('name', inputs[0]);
    input.setAttribute('placeholder', `Enter ${placeholders[0]}`);
    input.setAttribute('maxlength', maxLength[0]);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('required', '');
    form.append(input);
    formElement.append(form);
};
    
// create buttons function
const createButtons = function(form, button1, button2) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    button1.classList.add('submitButton');
    button1.setAttribute('id', `${form.classList.value}SubmitButton`);
    button1.setAttribute('type', 'submit');
    button2.classList.add('cancelButton');
    button2.setAttribute('id', `${form.classList.value}CancelButton`);
    button2.setAttribute('type', 'button');
    button2.innerText = 'Cancel';
    buttonDiv.append(button1);
    buttonDiv.append(button2);
    return buttonDiv;
};

// toggle Postit notes
const removePostit = function() {
    newPost.style.display = 'none';
    newUpdate.style.display = 'none';
    newDelete.style.display = 'none';
};
const displayPostit = function() {
    newPost.style.display = 'flex';
    newUpdate.style.display = 'flex';
    newDelete.style.display = 'flex';
};

// create Post Form
const postForm = document.createElement('form');
postForm.classList.add('postForm');
postForm.setAttribute('id', 'postForm');
postForm.style.display = 'none';
const postFormHeader = document.createElement('h2');
postFormHeader.textContent = "Enter new contact details";
postFormHeader.classList.add('formHeader');
postForm.append(postFormHeader);
createInputs(postForm);
const postFormButton = document.createElement('button');
const postFormCancelButton = document.createElement('button');
postForm.append(createButtons(postForm, postFormButton, postFormCancelButton));

// send post form
newPost.addEventListener('click', function() {
    removePostit();
    postForm.style.display = 'grid';
    postFormButton.innerText = 'Add New Contact';
});
postFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = {};
    const postInputs = document.querySelectorAll('.postFormInput');
    postInputs.forEach(element => {
            formData[element.name] = element.value;
        });
    const postObject = {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url, postObject)
        .then(response => {
            if (response.status === 400) {
                alert(`${formData.name} already exists in Address Book!`);
            }
            if (response.status === 404) {
                alert(`Could not add contact for ${formData.name}. Address Book is full!`);
            }
            if (response.status === 201) {
                alert(`Contact for ${formData.name} added to Address Book!`);
            };
        })
    postForm.reset();
    postForm.style.display = 'none';
    displayPostit();
    setTimeout( () => location.reload(), 500);
});
postFormCancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    postForm.reset();
    postForm.style.display = 'none';
    displayPostit();
});
        
// Create Update Form
const updateForm = document.createElement('form');
updateForm.classList.add('updateForm');
updateForm.setAttribute('id', 'updateForm');
updateForm.style.display = 'none';
const updateFormHeader = document.createElement('h2');
updateFormHeader.textContent = "Enter contact name to update";
updateFormHeader.classList.add('formHeader');
updateForm.append(updateFormHeader);
createUpdateInputs(updateForm);
const updateFormButton = document.createElement('button');
const updateFormCancelButton = document.createElement('button');
updateForm.append(createButtons(updateForm, updateFormButton, updateFormCancelButton));
let updateId = null;

// Create Patch Form
const patchForm = document.createElement('form');
patchForm.classList.add('patchForm');
patchForm.setAttribute('id', 'patchForm');
patchForm.style.display = 'none';
const patchFormHeader = document.createElement('h2');
patchFormHeader.textContent = "Update contact details below";
patchFormHeader.classList.add('formHeader');
patchForm.append(patchFormHeader);
createInputs(patchForm);
const patchFormButton = document.createElement('button');
const patchFormCancelButton = document.createElement('button');
patchForm.append(createButtons(patchForm, patchFormButton, patchFormCancelButton));

// send data for patch
const updateFormInputName = document.querySelector('#updateFormInput_name');
const patchFormInputName = document.querySelector('#patchFormInput_name');
newUpdate.addEventListener('click', function() {
    removePostit();
    updateForm.style.display = 'grid';
    updateFormButton.innerText = 'Continue';
});
updateFormCancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    updateForm.reset();
    updateForm.style.display = 'none';
    displayPostit();
});
updateFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    const updateFormInput = document.querySelector('#updateFormInput_name');
    const patchName = document.querySelector('#patchFormInput_name');
    const patchAddess = document.querySelector('#patchFormInput_address');
    const patchCity = document.querySelector('#patchFormInput_city');
    const patchEmail = document.querySelector('#patchFormInput_email');
    const patchTelNo = document.querySelector('#patchFormInput_telNo');
    fetch(`${url}/${updateFormInput.value}`)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            patchName.value = data.name;
            patchAddess.value = data.address;
            patchCity.value = data.city;
            patchEmail.value = data.email;
            patchTelNo.value = data.telNo;
            updateId = data.id;
            console.log(updateId)
            updateForm.reset();
            updateForm.style.display = 'none';
            patchForm.style.display = 'grid';
            patchFormButton.innerText = 'Update Contact';
            })
    .catch(response => {
        alert(`Name not found in Address Book!`);
        updateForm.reset();
        updateForm.style.display = 'none';
        displayPostit();
        }
    )
});
patchFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    const patchName = document.querySelector('#patchFormInput_name');
    const patchAddess = document.querySelector('#patchFormInput_address');
    const patchCity = document.querySelector('#patchFormInput_city');
    const patchEmail = document.querySelector('#patchFormInput_email');
    const patchTelNo = document.querySelector('#patchFormInput_telNo');
    const formData = {id: `${updateId}`};
    formData.name = patchName.value;
    formData.address = patchAddess.value;
    formData.city = patchCity.value;
    formData.email = patchEmail.value;
    formData.telNo = patchTelNo.value;
    const postObject = {
    method: 'PATCH',
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(`${url}/${updateId}`, postObject)
    .then(response => {
        alert(`Contact for ${formData.name} has been updated!`);
        patchForm.reset();
        patchForm.style.display = 'none';
        displayPostit();
        setTimeout( () => location.reload(), 500);
    })
    .catch(response => {
            alert(`${formData.name} not found in Address Book!`);
            alert(`Contact for ${formData.name} has been updated!`);
            patchForm.reset();
            patchForm.style.display = 'none';
            displayPostit();
    })
});
patchFormCancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    patchForm.reset();
    patchForm.style.display = 'none';
    displayPostit();
});

// Create Delete Form
const deleteForm = document.createElement('form');
deleteForm.classList.add('deleteForm');
deleteForm.setAttribute('id', 'deleteForm');
deleteForm.style.display = 'none';
const deleteFormHeader = document.createElement('h2');
deleteFormHeader.textContent = "Enter contact name to delete";
deleteFormHeader.classList.add('formHeader');
deleteForm.append(deleteFormHeader);
createUpdateInputs(deleteForm);
const deleteFormButton = document.createElement('button');
const deleteFormCancelButton = document.createElement('button');
deleteForm.append(createButtons(deleteForm, deleteFormButton, deleteFormCancelButton));
deleteFormButton.innerText = 'Delete Contact';  

// send data for delete
newDelete.addEventListener('click', function() {
    deleteForm.style.display = 'grid';
    patchFormButton.innerText = 'Delete Contact';
    removePostit();
});
deleteFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    const deleteFormInput = document.querySelector('#deleteFormInput_name');
    const formData = {name: `${deleteFormInput.value}`};
    const postObject = {
    method: 'DELETE',
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(`${url}/${deleteFormInput.value}`, postObject)
        .then(response => {
            if (response.status === 404) {
                alert(`${formData.name} not found in Address Book!`);
            }
            if (response.status === 204) {
                alert(`Contact for ${formData.name} has been deleted!`);
            };
        })
    deleteForm.reset();
    deleteForm.style.display = 'none';
    displayPostit();
    setTimeout( () => location.reload(), 500);
});
deleteFormCancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    deleteForm.reset();
    deleteForm.style.display = 'none';
    displayPostit();
});