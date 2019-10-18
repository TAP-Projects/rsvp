// Global variables
// DOM references
const registrarForm = document.getElementById('registrar');
const inviteesUl = document.getElementById('invitedList');

// createFilter creates the filter div and inserts it before the invitee list ul
function createFilter() {
	// Create the div, lable, and input elements with their attributes
	const filterDiv = createElement('div');
	const filterLabel = createElement('label', 'Hide those who haven\'t responded', [
		{ attribute: 'for', value: 'filter' }
	]);
	const filterCheckBox = createElement('input', null, [
		{ attribute: 'type', value: 'checkbox' },
		{ attribute: 'id', value: 'filterCheckBox' }
	]);

	// Append the label for the checkbox to the filter div
	filterDiv.append(filterLabel);
	// Append the checkbox itself to the filter div
	filterDiv.append(filterCheckBox);

	return filterDiv
}

// Insert the filter div before the invitee list ul
inviteesUl.before(createFilter());

// Checkbox handler
function checkBoxHandler(e) {
	[...inviteesUl.children].forEach(li => {
		// If a invitee hasn't responded, then hide that invitee
		if (!li.classList.contains('responded')) {
			li.classList.toggle('hide');
		}
	});
}

// Add a change listener and handler to so that when the filter checkbox is checked, we toggle the hide class
const filterCheckBox = document.getElementById('filterCheckBox');
filterCheckBox.addEventListener('change', checkBoxHandler);

// createInvitee creates a new invitee list item
function createInvitee(text) {
	const li = createElement('li');
	const span = createElement('span', text);
	const label = createElement('label', 'Confirmed');
	const checkbox = createElement('input', null, [{ attribute: 'type', value: 'checkbox' }]);
	const editButton = createElement('button', 'edit');
	const removeButton = createElement('button', 'remove');

	label.append(checkbox);
	li.append(span, label, editButton, removeButton);

	return li;
}

function inviteHandler(e){
	e.preventDefault();
	const nameInput = document.getElementById('invitee');
	// Temp holder for text value. 
	const text = nameInput.value
	// Clear the name field
	nameInput.value = '';
	// Create the new list item, passing in the text
	const newInvitee = createInvitee(text);
	// And append it to the list
	inviteesUl.append(newInvitee);
}

// Add a submit listener and handler. On submit, the handler creates and appends a new invitee list item to the invitee list
registrarForm.addEventListener('submit', inviteHandler);

// responseHandler adds a "responded" class to the invitee list item
function responseHandler(e){
	const li = e.target.parentNode.parentNode;
	if (e.target.checked) li.className = 'responded';
		else li.className = '';
}

// Add a change listener and handler. If the checkbox is checked, add a style to the invitee list item to indicate that the invitee is confirmed
inviteesUl.addEventListener('change', responseHandler);

// Create an object for our button handlers: edits, save, remove
const buttonClickHandlers = {
	edit: (e) => {
		// Editing the invitee's name
		// Create a new input field and add the unedited invitee's name as a placeholder
		const span = e.target.parentNode.firstElementChild;
		const input = createElement('input', null, [
			{ attribute: 'type', value: 'text' },
			{ attribute: 'value', value: span.textContent },
			{ attribute: 'placeholder', value: span.textContent }
		]);
		// Insert the input element before the span
		span.before(input);
		// Now remove the span
		span.remove()
		// And change the button's text content to 'save'
		e.target.textContent = 'save';
	},
	save: (e) => {
		// Saving the edited, invitee's name
		// Create a new span whose text content is the input's value
		const input = e.target.parentNode.firstElementChild;
		const span = createElement('span', input.value);
		// Insert the span before the input
		input.before(span);
		// Now remove the input
		input.remove();
		// And change the button's text content back to edit
		e.target.textContent = 'edit';
	},
	remove: (e) => {
		// Remove the list item from the list
		e.target.parentNode.remove()
	}
}

// Add the click event listener and handler. The handler uses our buttonClickHandlers object and calls the correct methods depending on the buttons clicked. 
inviteesUl.addEventListener('click', (e) => {
	// There's a checkbox in this list, so we need to make sure we're getting the button
	if (e.target.tagName === 'BUTTON') {
		buttonClickHandlers[e.target.textContent](e);
	}
});

// HELPER FUNCTIONS

// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
function createElement(element, text, attributes) {
	const theElem = document.createElement(element);
	if (text && typeof text === 'string' && text.length > 0) {
		theElem.textContent = text;
	}
	if (attributes && Array.isArray(attributes) && attributes.length > 0) {
		attributes.forEach((attr) => {
			theElem.setAttribute(attr.attribute, attr.value);
		});
	}
	return theElem;
}
