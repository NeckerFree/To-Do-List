import _ from 'lodash';
import './style.css';
import TaskStore from './modules/taskStore.js';
import enterImg from './icons/enter.png';
import loadingImg from './icons/loading.png';
import menuImg from './icons/menuVertical.png';
// import moveImg from './icons/move.png';
 import trashImg from './icons/trash.png';

let taskStore=new TaskStore();

let deleteTask=(event)=>{
  debugger;
  let rowTask=event.target.parentElement;
  let divRow=rowTask.childNodes[0];
  let check=divRow.childNodes[0];
  taskStore.remove(check.id);
  window.location.reload();
}
let deleteSelectedTasks=()=>{
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (var checkbox of checkboxes) {
        taskStore.remove(checkbox.id);
    }
    window.location.reload();
}
let editionMode=(event)=>{
  let inputTask=event.target;
  let divTask=inputTask.parentElement;
  let rowTask=divTask.parentElement;
  rowTask.classList.add('highlighted');
  inputTask.classList.add('highlighted');
  let img=rowTask.childNodes[1];
  img.src=trashImg;
  img.addEventListener('click', deleteTask);
}
let updateDescription=(event)=> {
  let inputTask=event.target;
  let divTask=inputTask.parentElement;
  let rowTask=divTask.parentElement;
  rowTask.classList.remove('highlighted');
  inputTask.classList.remove('highlighted');
  let check=divTask.childNodes[0];
  let img=rowTask.childNodes[1];
  if (inputTask.value!=''){
    taskStore.update(check.id, inputTask.value);
  }
  img.src=menuImg;
  window.location.reload();
}
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
  
  let enter= document.getElementsByClassName('enter')[0];
  
  enter.addEventListener('click', () => {
    let rowInsert = enter.parentElement;
    let inputTask = rowInsert.childNodes[0];
    if (inputTask.value !== '') {
      taskStore.add(inputTask.value);
      inputTask.value = '';
      window.location.reload();
    }
  });
  let inputInsert=div.childNodes[0];
  inputInsert.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      enter.click();
    }
  });
  const section = document.getElementsByTagName('section')[0];
  section.classList.add('sectionContainer');
  const footer = document.getElementsByTagName('footer')[0];
  footer.classList.add('footerContainer');
  let divFooter = footer.childNodes[1];
  let anchor = divFooter.childNodes[0];
  anchor.addEventListener('click', deleteSelectedTasks);
  const ul = document.getElementsByTagName('ul')[0];
  ul.classList.add('tasksContainer');
  let tasksArray = taskStore.gettasks();
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
      //const textNode = document.createTextNode(`${tasksArray[i].description}`);
      inputEdit.value=`${tasksArray[i].description}`;
      //label.setAttribute('for', 'completed');
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
      li.appendChild(img);
      ul.appendChild(li);
    }
  }
});
