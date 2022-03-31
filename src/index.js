import _ from 'lodash';
import './style.css';
import TaskStore from './modules/taskStore.js';
import enterImg from './icons/enter.png';
import loadingImg from './icons/loading.png';
import menuImg from './icons/menuVertical.png';
// import moveImg from './icons/move.png';
import trashImg from './icons/trash.png';

const taskStore = new TaskStore();

// let deleteTask=(event)=>{
//   let rowTask=event.target.parentElement;
//   let divRow=rowTask.childNodes[0];
//   let check=divRow.childNodes[0];
//   taskStore.remove(check.id);
//   window.location.reload();
// }
const deleteSelectedTasks = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  [].forEach.call(checkboxes, (checkbox) => {
    taskStore.remove(checkbox.id);
  });
  window.location.reload();
};
const editionMode = (event) => {
  const inputTask = event.target;
  const divTask = inputTask.parentElement;
  const rowTask = divTask.parentElement;
  rowTask.classList.add('highlighted');
  inputTask.classList.add('highlighted');
  const img = rowTask.childNodes[1];
  img.src = trashImg;
  img.alt = 'trash img';
};
const updateDescription = (event) => {
  const inputTask = event.target;
  const inputValue = inputTask.value;
  if (inputValue === '') {
    event.preventDefault();
  } else {
    const divTask = inputTask.parentElement;
    const rowTask = divTask.parentElement;
    rowTask.classList.remove('highlighted');
    inputTask.classList.remove('highlighted');
    const check = divTask.childNodes[0];
    const img = rowTask.childNodes[1];
    if (inputTask.value !== '') {
      taskStore.update(check.id, inputValue);
    }
    img.src = menuImg;
    img.alt = 'menu vertical';
    window.location.reload();
  }
};
window.addEventListener('load', () => {
  // article
  const article = document.getElementsByTagName('article')[0];
  article.classList.add('articleContainer');
  const imgLoading = document.createElement('img');
  imgLoading.setAttribute('src', loadingImg);
  imgLoading.setAttribute('alt', 'reload list');
  article.appendChild(imgLoading);
  // inputRow
  const div = document.getElementsByTagName('div')[0];
  div.classList.add('inputRow');

  const imgEnter = document.createElement('img');
  imgEnter.classList.add('enter');
  imgEnter.setAttribute('src', enterImg);
  imgEnter.setAttribute('alt', 'enter task');
  div.appendChild(imgEnter);

  const enter = document.getElementsByClassName('enter')[0];

  enter.addEventListener('click', () => {
    const rowInsert = enter.parentElement;
    const inputTask = rowInsert.childNodes[0];
    if (inputTask.value !== '') {
      taskStore.add(inputTask.value);
      inputTask.value = '';
      window.location.reload();
    }
  });
  const inputInsert = div.childNodes[0];
  inputInsert.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      enter.click();
    }
  });
  const section = document.getElementsByTagName('section')[0];
  section.classList.add('sectionContainer');
  const footer = document.getElementsByTagName('footer')[0];
  footer.classList.add('footerContainer');
  const divFooter = footer.childNodes[1];
  const anchor = divFooter.childNodes[0];
  anchor.addEventListener('click', deleteSelectedTasks);
  const ul = document.getElementsByTagName('ul')[0];
  ul.classList.add('tasksContainer');
  const tasksArray = taskStore.gettasks();
  if (tasksArray !== null) {
    for (let i = 0; i < tasksArray.length; i += 1) {
      const inputCheckbox = document.createElement('input');
      inputCheckbox.setAttribute('type', 'checkbox');
      inputCheckbox.setAttribute('id', `${tasksArray[i].index}`);
      inputCheckbox.addEventListener('change', () => {
        const container = inputCheckbox.parentElement;
        const inputEdit = container.childNodes[1];
        if (inputCheckbox.checked) {
          inputEdit.classList.add('strike');
        } else {
          inputEdit.classList.remove('strike');
        }
      });
      const inputEdit = document.createElement('input');
      inputEdit.setAttribute('type', 'text');
      if (tasksArray[i].completed) {
        inputEdit.classList.toggle('strike');
        inputCheckbox.setAttribute('checked', true);
      }
      inputEdit.classList.add('inputFocus');
      // const textNode = document.createTextNode(`${tasksArray[i].description}`);
      inputEdit.value = `${tasksArray[i].description}`;
      // label.setAttribute('for', 'completed');
      inputEdit.addEventListener('click', editionMode);
      inputEdit.addEventListener('focusout', updateDescription);
      const li = document.createElement('li');
      li.classList.add('tasks');
      const divContainer = document.createElement('div');
      divContainer.appendChild(inputCheckbox);
      divContainer.appendChild(inputEdit);
      li.appendChild(divContainer);
      const img = document.createElement('img');
      img.setAttribute('src', menuImg);
      img.setAttribute('alt', 'menu vertical');
      img.addEventListener('click', () => {
        if (img.alt !== 'menu vertical') {
          const rowTask = img.parentElement;
          const divRow = rowTask.childNodes[0];
          const check = divRow.childNodes[0];
          taskStore.remove(check.id);
          window.location.reload();
        }
      });
      li.appendChild(img);
      ul.appendChild(li);
    }
  }
});
