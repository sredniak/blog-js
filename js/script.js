'use strict';

function titleClickHandler(event){
    
    
  event.preventDefault();

  const clickedElement = this;
  //console.log('Link was clicked!');
    
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE]add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  
  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
    
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);
  
  /*[DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);
  
  /* [DONE] add class 'active' to the correct article */
    
  targetArticle.classList.add('active');
  
}
  


//GENEROWANIE LISTY TYTUŁÓW

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';



function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('ARTICLES' , articles);
  console.log('CUSTOM SELECTOR' , customSelector);


  let html = '';
  
  for(let article of articles){

    /*[DONE] get the article id */

    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;

    //console.log(html);
  }
    
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log('asd'+links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
  
    /* START LOOP: for every article: */
    for(let article of articles){
        /* find tags wrapper */
        const titleTag = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        //console.log(articleTagsArray);

        /* START LOOP: for each tag */
        for(let tag of articleTagsArray){

          /* generate HTML of the link */
          //console.log(tag);

           /* add generated code to html variable */
           const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'
          html = html + ' ' + linkTag;
          //console.log(html);

            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
      titleTag.innerHTML = html;
    }
  
    /* END LOOP: for every article: */
  }
  
  generateTags();


  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]')

    /* START LOOP: for each active tag link */
    for (const activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('.active');

      /* END LOOP: for each active tag link */
    }
      
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('href');

    /* START LOOP: for each found tag link */
    for( let tagLink of tagLinks ){
    /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  
  function addClickListenersToTags(){
    /* find all links to tags */
  
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log('TAG LINKS: ', tagLinks);
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler)
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();


function generateAuthors(){

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

    /* [DONE] find authors wrapper */
    const titleAuthor = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* get tags from data-author attribute */  
    const author = article.getAttribute('data-author');


    /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li> ';

    html = html + linkHTML;

    titleAuthor.innerHTML = html;
  }
  
}

generateAuthors();



function addClickListenersToAuthors(){
  
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);

  }
}

addClickListenersToAuthors();


function authorClickHandler(event){
  //prevent default action for this event
    event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
 /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
/* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthorLinks = document.querySelectorAll('.post-author a.active');

    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove('active');
    }

   /* find all tag links with "href" attribute equal to the "href" constant */
    
    const authorLinks = document.querySelectorAll('href');

/* START LOOP: for each found tag link */
    for(let authorLink of authorLinks){
      //add class active
      authorLink.classList.add('active');
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  
  }
  
  authorClickHandler();