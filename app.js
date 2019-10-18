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
  const li = createElement('li');
  const span = createElement('span', text);  
  const label = createElement('label', 'Confirmed');
  const checkbox = createElement('input', null, [{attr: 'type', value: 'checkbox'}]);
  const editButton = createElement('button', 'edit');
  const removeButton = createElement('button', 'remove');
  
  label.append(checkbox);
  li.append(span, label, editButton, removeButton);

  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.append(li);
});
  
ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  
  if (checked) listItem.className = 'responded';
  else listItem.className = '';
});
  
const buttonActions = {
  edit: ()=>{
    const span = li.firstElementChild;
    const input = createElement('input', null, [{attr: 'type', value: 'text'}, {attr: 'value', value: span.textContent}]);
    //li.insertBefore(input, span);
    span.before(input);
    //li.removeChild(span);
    li.remove(span)
    button.textContent = 'save';
  },
  save: ()=>{
    const input = li.firstElementChild;
    const span = createElement('span', input.value);
    //li.insertBefore(span, input);
    input.before(span);
    //li.removeChild(input);
    li.remove(input);
    button.textContent = 'edit';
  },
  remove: ()=>{
    //ul.removeChild(li);
    ul.remove(li)
  }
} 

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const buttonText = button.textContent
    buttonActions[buttonText];
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
  
// addIt takes a destination element, destination descriptor, and a new element and the new element before, after, prepended, or appended to the destination element  
  
  
  
  
  
  