// fetch contacts from server

function getContacts(bookElement) {
    fetch('http://localhost:3000/api/addressbook')
        .then(response => response.json())
        .then(data => {
            const contactList = createContactList(data)
            bookElement.appendChild(contactList);
        });
    };

function createContactList(contacts) {
const contactList = document.createElement('div');
contactList.classList.add('listElement');
for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.appendChild(createContactHeading(contact));
    contactList.appendChild(contactDiv);
}
return contactList;
}

function createContactHeading(contact) {
const contactHeading = document.createElement('h3');
contactHeading.classList.add('contactText');
contactHeading.textContent = `${contact.name}: ${contact.address}, ${contact.city} Email: ${contact.email} Tel No: ${contact.telNo}`
return contactHeading;
}

const mainElement = document.querySelector('main');
const containerElement = document.querySelector('.containerElement');
const formElement = document.querySelector('.formElement');

// update address with contacts
document.addEventListener('DOMContentLoaded', () => {
    const bookElement = document.querySelector('.bookElement');
    const header = document.createElement('h1');
    header.textContent = "My Address Book";
    header.classList.add('header');
    bookElement.append(header);
    getContacts(bookElement);
});

// hide form element function
const hideForm = function(form) {
    form.style.display = 'none';
}
    
// form arrays
const inputs = ['name', 'address', 'city', 'email', 'telNo:'];
const placeholders = ['Name', 'Address', 'City', 'Email', 'Tel No:'];

// Create Buttons Function
const createButtons = function(element) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    const button = document.createElement('button');
    button.classList.add('button');
    button.setAttribute('id', 'submitButton');
    button.setAttribute('type', 'submit');
    button.innerText = 'Submit';
    const cancelButtonDiv = document.createElement('div');
    cancelButtonDiv.classList.add('buttonDiv');
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('button');
    cancelButton.setAttribute('id', 'cancelButton');
    cancelButton.setAttribute('type', 'button');
    cancelButton.innerText = 'Cancel';
    buttonDiv.append(button);
    buttonDiv.append(cancelButton);
    return buttonDiv;
};

// Create Post Form
const postForm = document.createElement('form');
postForm.classList.add('postForm');
postForm.setAttribute('method', 'post');
postForm.setAttribute('action', 'http://localhost:3000/api/addressbook');
postForm.style.display = 'none';
postForm.setAttribute('id', 'postForm');
const postFormHeader = document.createElement('h2');
postFormHeader.textContent = "Enter New Contact Details";
postFormHeader.classList.add('formHeader');
postForm.append(postFormHeader);
for(let i = 0; i < inputs.length; i++) {
    const input = document.createElement('input');
    input.classList.add('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', inputs[i]);
    input.setAttribute('name', inputs[i]);
    input.setAttribute('placeholder', `Enter ${placeholders[i]}`);
    postForm.append(input);
    formElement.append(postForm);
};
postForm.append(createButtons());

// Create Patch Form
const patchForm = document.createElement('form');
patchForm.classList.add('patchForm');
patchForm.setAttribute('method', 'patch');
patchForm.setAttribute('action', 'http://localhost:3000/api/addressbook');
patchForm.style.display = 'none';
patchForm.setAttribute('id', 'patchForm');
const patchFormHeader = document.createElement('h2');
patchFormHeader.textContent = "Update Contact Details";
patchFormHeader.classList.add('formHeader');
patchForm.append(patchFormHeader);
for(let i = 0; i < inputs.length; i++) {
    const input = document.createElement('input');
    input.classList.add('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', inputs[i]);
    input.setAttribute('name', inputs[i]);
    input.setAttribute('placeholder', `Enter ${placeholders[i]}`);
    patchForm.append(input);
    formElement.append(patchForm);
};
patchForm.append(createButtons());

// Create Delete Form
const deleteForm = document.createElement('form');
deleteForm.classList.add('deleteForm');
deleteForm.setAttribute('method', 'delete');
deleteForm.setAttribute('action', 'http://localhost:3000/api/addressbook/:name');
deleteForm.style.display = 'none';
deleteForm.setAttribute('id', 'deleteForm');
const deleteFormHeader = document.createElement('h2');
deleteFormHeader.textContent = "Delete Contact";
deleteFormHeader.classList.add('formHeader');
deleteForm.append(deleteFormHeader);
const input = document.createElement('input');
input.classList.add('input');
input.setAttribute('type', 'text');
input.setAttribute('id', inputs[0]);
input.setAttribute('name', inputs[0]);
input.setAttribute('placeholder', `Enter ${placeholders[0]}`);
deleteForm.append(input);
formElement.append(deleteForm);
deleteForm.append(createButtons());

// send data for post
const newPost = document.getElementById('post');
newPost.addEventListener('click', function() {
    postForm.style.display = 'grid';
    const cancelButton = document.querySelector('#cancelButton');
    cancelButton.addEventListener('click', function(e) {
    });
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideForm(postForm);
    });
});

// send data for patch
const updatePatch = document.getElementById('patch');
updatePatch.addEventListener('click', function() {
    patchForm.style.display = 'grid';
    const cancelButton = document.querySelector('#cancelButton');
    cancelButton.addEventListener('click', function(e) {
    });
    patchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideForm(patchForm);
    });
});

// send data for delete
const deleteReq = document.getElementById('delete');
deleteReq.addEventListener('click', function() {
    deleteForm.style.display = 'grid';
    const cancelButton = document.querySelector('#cancelButton');
    cancelButton.addEventListener('click', function(e) {
    });
    deleteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideForm(deleteForm);
    });
});

