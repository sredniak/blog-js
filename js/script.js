'use strict';


const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};


const select = {
  all: {
    class: {
      active: 'active',
    },
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
    articles: '.post',
    title: '.post-title',
  },
  article: {
    author: '.post-author',
    tags: '.post-tags .list',
  },
  listOf: {
    tags: '.tags.list',
    titles: '.titles',
    authors: '.list.authors',
  },
};

const opts = {
  ArticleSelector: '.post',
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  //console.log('Link was clicked!');

  /* [done] remove class active from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove(select.all.class.active);
  }

  /* [done] add class active to the clicked link */
  clickedElement.classList.add(select.all.class.active);
  //console.log('clickedElement:', clickedElement);

  /* [done] remove active from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove(select.all.class.active);
  }

  /* [done] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);

  /* [done] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);

  /* [done] add class active to the correct article */
  targetArticle.classList.add(select.all.class.active);
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

// Generating title list

function generateTitleLinks(customSelector = ''){
  //console.log('customSelector =' ,customSelector = '');
  /* [done] remove contents of titleList */
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';

  /* [done] for each article */
  const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);
  //console.log(opts.ArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    /* [done] get the article id */
    const articleId = article.getAttribute('id');

    /* [done] find the title element */
    /* [done] get the title from the title element */
    const articleTitle = article.querySelector(select.all.title).innerHTML;

    /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // this code we replace this code when applying the Handlebars template
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //console.log(linkHTML);



    /* [done] insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  //console.log(html);

  const links = document.querySelectorAll('.titles a');
  //console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    else(tags[tag] < params.min); {
      params.min = tags[tag];
    }
    //console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count,params){
  const normalizedCount = count - params.min;
  //console.log('normalizedCount:', normalizedCount);
  const normalizedMax = params.max - params.min;
  //console.log('normalizedMax:', normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  //console.log('precentage:',percentage);
  const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );
  //console.log('classNumber:', classNumber);
  return opts.tagSizes.classPrefix + classNumber;
}

function generateTags(){
  /* [NEW] creat a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.ArticleSelector);
  //console.log(articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(select.article.tags);
    //console.log(tagsWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* [DONE] generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleTagsLink(linkHTMLData);
      //console.log(linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [DONE] END LOOP: for each tag */
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      //console.log(allTags);
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    //console.log(tagsWrapper);
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams);

  //let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + ' ('+ allTags[tag] + ') ';
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';
    //console.log(tagLinkHTML);
    //allTagsHTML += tagLinkHTML; //'<li><a href="#tag-' + tag + '"class="'+ tagLinkHTML +'">' + tag + ' ('+ allTags[tag] + ')</a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData); //tagList.innerHTML = allTagsHTML;
  //tagList.innerHTML = allTags.join(' ');
  //console.log(allTagsData);

}
generateTags();

function tagClickHandler(event){
  /* [done] prevent default action for this event */
  event.preventDefault();

  /* [done] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [done] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* [done] find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [done] START LOOP: for each active tag link */
  for (let tagActiveLink of tagActiveLinks) {
    /* [done] remove class active */
    tagActiveLink.classList.remove(select.all.class.active);
  /* [done] END LOOP: for each active tag link */
  }

  /* [done] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [done] START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* [done] add class active */
    tagLink.classList.add(select.all.class.active);
  /* [done] END LOOP: for each found tag link */
  }
  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [done] find all links to tags */
  const allTagsLinks = document.querySelectorAll(select.all.linksTo.tags);

  /* [done] START LOOP: for each link */
  for(let allTagLink of allTagsLinks) {
    /* [done] add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
  /* [done] END LOOP: for each link */
  }
}
addClickListenersToTags();

//[DONE] Add authors to articles

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthorsList = {};

  /*[DONE] Find all article*/
  const articles = document.querySelectorAll(opts.ArticleSelector);
  //console.log(articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find authors wrapper */
    const authorWrapper = article.querySelector(select.article.author);
    //console.log(authorWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);

    /* [DONE] generate HTML of the link */
    //const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>by ' + articleAuthor + '</span></a></li>';
    // html = linkHTML;
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;
    //console.log(html);
    if (!allAuthorsList.hasOwnProperty(articleAuthor)) {
      allAuthorsList[articleAuthor] = 1;
    } else {
      allAuthorsList[articleAuthor]++;
    }

    authorWrapper.innerHTML = html;
  }
  const authorList = document.querySelector(select.listOf.authors);
  /* [NEW] create variable for all links HTML code */
  //let authorListHTML = '';
  const allAuthorsData = {authors: []};

  for (let author in allAuthorsList) {
    //authorListHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthorsList[author] + ')</span></a></li>';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthorsList[author],
    });
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData); //authorList.innerHTML = authorListHTML;

  //console.log(authorList);
}

generateAuthors();

//authorClickHandler - the function is the same as tagClickHandler function

function authorClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;

  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [done] make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-' ,'');
  //console.log(author);

  /* [done] find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [done] START LOOP: for each active author link */
  for (let authorActiveLink of authorActiveLinks) {
    authorActiveLink.classList.remove(select.all.class.active);
  }

  /* [done] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [done] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    authorLink.classList.add(select.all.class.active);
  }

  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {

  /* [done] find all links to author */
  const allAuthorLinks = document.querySelectorAll(select.all.linksTo.authors);

  /* [done] START LOOP: for each link */
  for (let allAuhorLink of allAuthorLinks ) {
    /* [done] add tagClickHandler as event listener for that link */
    allAuhorLink.addEventListener('click', authorClickHandler);
    /* [done] END LOOP: for each link */
  }
}

addClickListenersToAuthors();
