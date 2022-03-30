import _ from 'lodash';
import './style.css';
import enterImg from './icons/enter.png';
import loadingImg from './icons/loading.png';
import menuImg from './icons/menuVertical.png';
// import moveImg from './icons/move.png';
// import trashImg from './icons/trash.png';

const tasksArray = [];
tasksArray.push({ index: 1, completed: false, description: 'Morning running session' });
tasksArray.push({ index: 2, completed: false, description: 'MV Morning program time session' });
tasksArray.push({ index: 3, completed: false, description: 'Lunch break' });
tasksArray.push({ index: 4, completed: false, description: 'MV Afternoon program time session' });
tasksArray.push({ index: 5, completed: false, description: 'MV Standup team meeting' });

// const validateCheckbox= (evt) =>{
//   const bookid = parseInt(ev.target.id, 10);
//   let elem = evt.target;
//   let container=elem.parent;
//   let label=container.getElementsByTagName('label')[0];
//   if (this.checked) {
//     label.classList.add('strike');
//   } else {
//     label.classList.remove('strike');
//   }
// };
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
  imgEnter.setAttribute('src', enterImg);
  imgEnter.setAttribute('alt', 'reload list');
  div.appendChild(imgEnter);

  const section = document.getElementsByTagName('section')[0];
  section.classList.add('sectionContainer');
  const footer = document.getElementsByTagName('footer')[0];
  footer.classList.add('footerContainer');
  const ul = document.getElementsByTagName('ul')[0];
  ul.classList.add('tasksContainer');
  for (let i = 0; i < tasksArray.length; i += 1) {
    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('id', 'completed');
    inputCheckbox.addEventListener('change', () => {
      const container = inputCheckbox.parentElement;
      const label = container.childNodes[1];
      if (inputCheckbox.checked) {
        label.classList.add('strike');
      } else {
        label.classList.remove('strike');
      }
    });
    const label = document.createElement('label');
    if (tasksArray[i].completed) {
      label.classList.toggle('strike');
      inputCheckbox.setAttribute('checked', true);
    }
    const textNode = document.createTextNode(`${tasksArray[i].description}`);
    label.appendChild(textNode);
    label.setAttribute('for', 'completed');
    const li = document.createElement('li');
    li.classList.add('tasks');
    const divContainer = document.createElement('div');
    divContainer.appendChild(inputCheckbox);
    divContainer.appendChild(label);
    li.appendChild(divContainer);
    const img = document.createElement('img');
    img.setAttribute('src', menuImg);
    img.setAttribute('alt', 'menu vertical');
    li.appendChild(img);
    ul.appendChild(li);
  }
});
