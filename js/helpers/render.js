// ========================== GENERATE ERROR / LOGIN ===============================//

export const generateError=(element, text)=> {
	element.textContent = text;
	element.style.display = "block";

	const timer = setTimeout(() => {
		element.style.display = "none";

		clearTimeout(timer);
	}, 3000);
}

// ========================== RENDER CARDS ===============================//

export const renderCards = (dataArr, htmlElement) => {
    
    let txt = "";

    dataArr.forEach(element => {
        let item = `
            <li class="main-card__item">
                <div class="main-card__img">
                    <img src="${element.volumeInfo.imageLinks?.thumbnail || "https://images.squarespace-cdn.com/content/v1/58d20c79725e25b221549193/1534608307598-UPP2X3OSLOUQ5ZHPXD7E/images.png"}" width="200" height="200" alt="an image">
                </div>
                <div class="card-body">
                    <h4 class="main-card__title">
                        ${element.volumeInfo?.title}
                    </h4>
                    <p class="main-card__text">
                        ${element.volumeInfo?.authors}
                    </p>
                    <span class="main-card__year">${element.volumeInfo?.publishedDate}</span>
                    <div class="main-card__btns">
                        <button class=" main-card__bookmark" data-bookmark=${element?.id}>
                            Bookmark
                        </button>
                        <button class=" main-card__info" data-more=${element?.id}>
                        More Info
                        </button>
                        <a href='${element.volumeInfo?.previewLink}' class="main-card__read"
                            data-read=${element?.id}>
                            Read
                        </a>
                    </div>
                </div>
            </li>
        `

        txt += item;
    });

    htmlElement.innerHTML = txt;
}


// export const renderSwiper = (data,elementHTML)=>{

//     let elem="";

//     data.forEach(element => {
//         let item=`
        
// 			<div class="swiper-wrapper">
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 				<div class="swiper-slide"><img class="swiper-slide" src="${element.volumeInfo.imageLinks?.thumbnail}" alt="" /></div>
// 			</div>

// 			<div class="swiper-button-prev"></div>
// 			<div class="swiper-button-next"></div>

//         `
//         elem +=item
//     });

//     elementHTML=elem
// }






// ========================== RENDER BOOKMARKS ===============================//

export const renderBookmark = (bookArr, htmlElement) => {
    let txt = '';

    bookArr.forEach(item => {
        let element = `
                    <div class="main-left__table-row">
                        <div class="main-left__table-data">
                            <h4 class="book-title">
                                ${item.volumeInfo?.title}
                            </h4>
                            <p class="book-text">${item.volumeInfo?.authors}</p>
                        </div>
                        <div class="main-left__table-icons">
                            <a href="${item.volumeInfo?.previewLink}">
                            <img src="./imgs/book-open.svg" class="bookmark-read" alt="book open" width="24" height="24" data-read='${item?.id}'>
                            </a>
                            <img src="./imgs/delete.svg" class=" bookmark-delete" alt='delete icon' width="24"
                                height="24" data-delete='${item?.id}'>
                        </div>
                    </div>
        `
        
        txt += element;

    })

    htmlElement.innerHTML = txt;
}





// ========================== RENDER MODAL ===============================//

export const renderInfoModal = (item, htmlElement) => {
    htmlElement.innerHTML=""

    const infoDiv=document.createElement('div')
    const infoTitle=document.createElement('h4')
    const infoXmark=document.createElement('img');
    const infoImg=document.createElement('img');
    const infoDesc=document.createElement('p');
    const infoAuthors=document.createElement('p');
    const infoPublished=document.createElement('p');
    const infoPublishers=document.createElement('p');
    const infoCategories=document.createElement('p');
    const infoPage=document.createElement('p');
    const infoBtnBox=document.createElement('div');
    const infoBtn=document.createElement('a');
    const infoPublishedBox=document.createElement('span')
    const infoPublishersBox=document.createElement('span')
    const infoPageBox=document.createElement('span');

    infoDiv.setAttribute('class','more-flex');
    infoTitle.setAttribute('class','more-title');
    infoXmark.setAttribute('class','x-mark')
    infoXmark.setAttribute('src','./imgs/x-mark.svg');
    infoImg.setAttribute('src',item.volumeInfo.imageLinks?.thumbnail)
    infoImg.setAttribute('class','more-info__img')
    infoImg.setAttribute('alt','something went wrong')
    infoDesc.setAttribute('class','more-info__text')
    infoAuthors.setAttribute('class','more__author')
    infoPublished.setAttribute('class','more__author');
    infoPublishers.setAttribute('class','more__author');
    infoCategories.setAttribute('class','more__author');
    infoPage.setAttribute('class','more__author');
    infoBtn.setAttribute('class','more-info__btn')
    infoBtn.setAttribute('href',item.volumeInfo.previewLink)
    infoBtnBox.setAttribute('class','more-btn__wrapper')

    infoTitle.textContent=item.volumeInfo?.title;
    infoDesc.textContent=item.volumeInfo?.description;

    infoAuthors.textContent="Authors :";
    infoPublished.textContent="Published :";
    infoPublishers.textContent="Publishers :";
    infoCategories.textContent="Categories :";
    infoPage.textContent="Pages Count :"
    infoBtn.textContent = "Read"
    
    item.volumeInfo.authors?.forEach(element=>{
        let name=document.createElement('span');
        name.setAttribute('class','more-name')
        name.textContent=element;
        infoAuthors.appendChild(name)
    })
    
    item.volumeInfo.categories?.forEach(element=>{
        let name=document.createElement('span');
        name.setAttribute('class','more-name')
        name.textContent=element;
        infoCategories.appendChild(name)
    } )
    
    infoPublishedBox.setAttribute('class','more-name')
    infoPublishedBox.textContent=item.volumeInfo?.publishedDate;
    infoPublished.appendChild(infoPublishedBox)

    infoPublishersBox.setAttribute('class','more-name')
    infoPublishersBox.textContent=item.volumeInfo?.publisher;
    infoPublishers.appendChild(infoPublishersBox);

    infoPageBox.setAttribute('class','more-name');
    infoPageBox.textContent=item.volumeInfo?.pageCount;
    infoPage.appendChild(infoPageBox)

    htmlElement.appendChild(infoDiv);
    infoDiv.append(infoTitle)
    infoDiv.append(infoXmark);
    htmlElement.appendChild(infoImg);
    htmlElement.appendChild(infoDesc);
    htmlElement.appendChild(infoAuthors);
    htmlElement.appendChild(infoPublished);
    htmlElement.appendChild(infoPublishers);
    htmlElement.appendChild(infoCategories);
    htmlElement.appendChild(infoPage);
    htmlElement.appendChild(infoBtnBox)
    infoBtnBox.appendChild(infoBtn)
}