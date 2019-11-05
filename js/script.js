/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/*** 
   global variables that store the DOM elements
***/

//variable to hold all list items with class name `student-item`
const studentList = document.getElementsByClassName('student-item');

//variable to hold number of items to be displayed on each page
const itemsPerPage = 10;

//array of students that match search input
let studentDisplay = [];

//variables containing DOM elements
const page = document.querySelector('.page');
const studentUl = document.querySelector('ul.student-list');
const noStudent = document.createElement('span');

/*** 
  `showPage` function to hide all of the items in the 
   list except for the ten you want to show.
***/

function showPage (list, page){
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;
  for (let i = 0;  i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}



/*** 
  `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks (list) {
  //create div and ul elements and add them to the page
  const page = document.querySelector('.page');
  const div = document.createElement('div');
  div.className = ('pagination')
  const ul = document.createElement('ul');
  page.appendChild(div);
  div.appendChild(ul);
  //calculate how many page links need to be created, and append them to the ul
  for (let i = 1; i <= (Math.ceil(list.length/itemsPerPage)); i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = i;
    li.appendChild(a);
    ul.appendChild(li);
  }
  //conditional statement to check if the list contains any list items
  if (ul.firstElementChild === null) {
    noStudent.style.display = 'block';
  } else {
      ul.firstElementChild.firstElementChild.className = 'active';
      noStudent.style.display = 'none';
    }
  //event listener removes the active styling and adds the active styling to the target
  ul.addEventListener('click', (e) => {
    let active = document.querySelector('a.active');
    active.className = '';
    e.target.className = 'active';
    showPage(list, e.target.textContent);
    })
}


/*** 
  `createSearchBar function` to generate search bar and paginate results.
***/

function createSearchBar() {
  const page = document.querySelector('.page');
  const pageHeader = document.querySelector('div.page-header');
  const searchDiv = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');
  searchDiv.className = 'student-search';
  searchButton.textContent = 'Search';
  searchInput.setAttribute('placeholder', 'Search for students...');
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
  pageHeader.appendChild(searchDiv);
  //event listener clears the sutdentDisplay array and adds the list items that contain the search
  //input and then displays the new list upon clicking the search button
  searchButton.addEventListener('click', (e) => {
    studentDisplay = [];
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].children[0].children[1].textContent.includes(searchInput.value)) {
        studentDisplay.push(studentList[i]);
        showPage(studentDisplay, 1);
      } else {
         studentList[i].style.display = 'none';
      }
    }
    const pagDiv = document.querySelector('.pagination');
    page.removeChild(pagDiv);
    appendPageLinks(studentDisplay);
  })
  //event listener clears the sutdentDisplay array and adds the list items that contain the search
  //input and then displays the new list as the input is being typed
  searchInput.addEventListener('keyup', (e) => {
    studentDisplay = [];
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].children[0].children[1].textContent.includes(searchInput.value)) {
        studentDisplay.push(studentList[i]);
        showPage(studentDisplay, 1);
      } else {
         studentList[i].style.display = 'none';
      }
    }
    const pagDiv = document.querySelector('.pagination');
    page.removeChild(pagDiv);
    appendPageLinks(studentDisplay);
  })
}


//adds the `noStudent` message to the HTML and sets the default display to `none`
noStudent.textContent = 'No student(s) found.';
page.insertBefore(noStudent, studentUl);
noStudent.style.display = 'none';

//initiates list and search bar
createSearchBar();
showPage(studentList, 1);
appendPageLinks(studentList);



