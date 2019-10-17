const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = createElement('div');
const filterLabel = createElement('label', 'Hide those who haven\'t responded' );
const filterCheckBox = createElement('input', null, [{attr: 'type', value: 'checkbox'}]);

div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);
filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if(isChecked) {
    for (let i = 0; i < lis.length; i += 1) {
      let li = lis[i];
      if (li.className === 'responded') {
        li.style.display = '';  
      } else {
        li.style.display = 'none';                        
      }
    }
  } else {
    for (let i = 0; i < lis.length; i += 1) {
      let li = lis[i];
      li.style.display = '';
    }                                 
  }
});

function createLI(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');  
  span.textContent = text;
  li.appendChild(span);
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);  
  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  li.appendChild(editButton);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});
  
ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});
  
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'edit') { 
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'save';
    } else if (button.textContent === 'save') { 
      const input = li.firstElementChild;
      const span = document.createElement('span');
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = 'edit';
    }
  }
});  
  
// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
function createElement(element, text, attributes){
  const theElem = document.createElement(element);
  if(text && typeof text === 'string' && text.length > 0){
    theElem.textContent = text;
  }
  if(attributes && isArray(attributes) && attributes.length > 0) {
    attributes.forEach( (attr) => {
      theElem.setAttribute(attr.attribute, attr.value);
    });
  }
  return theElem;
}  
  
  
  
  
  
  
  
  