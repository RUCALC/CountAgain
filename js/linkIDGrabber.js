const subjectURL = window.location.href;

sessionStorage.setItem('subjectURL', subjectURL);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const subjectID = urlParams.get('a1');

const indexlink = 'index.html?a1='+subjectID;
