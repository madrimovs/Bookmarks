"use strict"

import findElement from "./helpers/findElement.js";
import API_KEY from "./helpers/apiKey.js";

import { renderCards } from "./helpers/render.js";
import { renderBookmark } from "./helpers/render.js";
import { renderInfoModal } from "./helpers/render.js";

const token = window.localStorage.getItem('token');

if (!token) {
    window.location.replace('/login.html');
}

const elLoader = findElement(".square-wrap");


const elForm = findElement('.form-search');
const elSearch = findElement('.search-input');
const elOrderNew = findElement('.results__order');
const elList = findElement('.main-card');
const elModal = findElement('.info__modal');
const elOverlay = findElement('.info__overlay');
const elCard = findElement('.main-left__table');
const elPrevBtn=findElement('.prev');
const elNextBtn=findElement('.next')
const elResults=findElement('.results__num');
const elPagination=findElement('.numbers');
const elError = findElement( '.error' );
const backHomeBtn = findElement(".back-home");
const elNumbers = document.querySelectorAll(".numbers .numbers__link");

console.log(backHomeBtn);

backHomeBtn.addEventListener('click', () => {
    window.location.href="index.html";
})

let orderName='relevance';
let bookName='frontend'
let parsedData=JSON.parse(window.localStorage.getItem('bookmarks'));
let fullArr = [];
let bookmarkArr=parsedData||[];
let page=0;

let pages;

let renderPage=(data)=>{
    pages=0;
    let txt='';
    pages=(Number(data)%10===0)?Math.floor(data/10):Math.floor(data/10)+1

    for(let item=0;item<pages;item++){
        let page=`
        <li class="number"><a href="#" class="numbers__link" data-pageid=${item}>${item+1}</a></li>
        `
        txt+=page;
    }


    elPagination.innerHTML=txt;
}

const closeModal = () => {
    elModal.classList.remove('modal-active');
    elOverlay.classList.remove('overlay-active')
}

const openModal = () => {
    elModal.classList.add('modal-active');
    elOverlay.classList.add('overlay-active')
}

const renderError=()=>{
    elResults.textContent=0;
    elError.classList.add('error-active');
    elList.innerHTML="";
    elPagination.innerHTML="";
    openNextBtn()
    openPrevBtn()
    page=0;
}

elResults.textContent=fullArr.totalItems;

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    elError.classList.remove('error-active');
    bookName = elSearch.value;
    orderName='relevance'
    elSearch.value = null;
    page=0;
    closeNextBtn();
    fullData();
})

elOrderNew.addEventListener('click',()=>{
    orderName='newest';
    elError.classList.remove('error-active');
    fullData();
})

elList.addEventListener('click', evt => {

    if (evt.target.matches('.main-card__info')) {
        let InfoBtnId = evt.target.dataset.more;
        let resetElement = fullArr.find(item => item.id === InfoBtnId);
        openModal();
        renderInfoModal(resetElement, elModal)

    } else if (evt.target.matches('.main-card__bookmark')) {
        let bookmarkId = evt.target.dataset.bookmark;
        let resetElement = fullArr.find(item => item.id === bookmarkId);
        if (!bookmarkArr.includes(resetElement)) bookmarkArr.push(resetElement);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        renderBookmark(bookmarkArr, elCard);
    }
})

elCard.addEventListener('click',evt => {

    if(evt.target.matches('.bookmark-delete')){
        let DeleteBtnId=evt.target.dataset.delete;
        let findDeletedBtnIndex=bookmarkArr.findIndex(item => item.id === DeleteBtnId);
        bookmarkArr.splice(findDeletedBtnIndex,1);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));

        if(bookmarkArr.length===0){
            window.localStorage.removeItem('bookmarks');
        }
        renderBookmark(bookmarkArr,elCard);
    }
})

elModal.addEventListener('click',(evt) => {

    if(evt.target.matches('.x-mark')){
        closeModal();
    }
})

elOverlay.addEventListener('click', closeModal)

document.addEventListener('keydown', (evt) => {

    if (evt.keyCode === 27) {
        closeModal();
    }
})

elPagination.addEventListener('click',evt => {

    if(evt.target.matches('.numbers__link')){
        let pageBtnId=evt.target.dataset.pageid*1;
        page=pageBtnId*10;

        if(page>0){
            closeBtn();
        }

        else{
            openPrevBtn();
        }
        fullData();
    }
})

const openPrevBtn=()=>{
    elPrevBtn.classList.add('prev--active');
    elPrevBtn.disabled=true;
}


const closePrevBtn=()=>{
    elPrevBtn.classList.remove('prev--active')
    elPrevBtn.disabled=false;
}

const closeNextBtn=()=>{
    elNextBtn.classList.remove('prev--active');
    elNextBtn.disabled=false;
}

const openNextBtn=()=>{
    elNextBtn.classList.add('prev--active');
    elNextBtn.disabled=true;
}

const closeBtn=()=>{
    closeNextBtn()
    closePrevBtn()
}

elPrevBtn.addEventListener('click',(evt)=>{
    closeNextBtn()
    page>10?
    (page-=10,fullData())
    :( 
    page=0,
    openPrevBtn(),
    fullData()
    )
})
elNextBtn.addEventListener('click',()=>{
    closePrevBtn();
    page+=10;

    if(page===res*10){
        openNextBtn();
        page=res;
    }
    fullData()
})
elNumbers.forEach(item=>{

    item.addEventListener('click',()=>{
        resetLinks();
        item.classList.add('active')
    })
})

const fullData = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&orderBy=${orderName}&startIndex=${page}`)
        .then(req => req.json())
        .then(data => {
            fullArr = data.items;
            elResults.textContent=data.totalItems
            renderPage(data.totalItems);
            renderCards( data.items, elList )
            
            elLoader.style.display="none"

        })
        .catch(err=>{
            renderError();
        })
}
renderBookmark(bookmarkArr,elCard);
fullData();