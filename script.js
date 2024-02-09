const API_KEY="6ef56216c194452ca5af9590b58027d1";

const url="https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=> fetchNews("all"));


function reload(){
    window.location.reload();
}

// this part is for nav-links news 
let curselectednav =null;
function onNavItemclick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    curselectednav?.classList.remove('active');
    curselectednav=navitem;
    curselectednav.classList.add('active');
}


// for search query 

const searchbutton =document.getElementById('search-button');
const searchtext = document.getElementById('news-input');

searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
})




async function fetchNews(query){
    const resp=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await resp.json();
    bindData(data.articles);
}



function bindData(articles){
    const cardcontainer=document.getElementById('cards-container');
    const newscardtemplate=document.getElementById('template-news-cards');
    

    cardcontainer.innerHTML=" ";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        let cardclone =newscardtemplate.content.cloneNode(true);
        // cardclone.setAttribute('id', 'help');
        filldataincard(cardclone,article);
        cardcontainer.appendChild(cardclone); 
        
        
    });    
}

function filldataincard(cardclone,article){
    const newsimg = cardclone.querySelector('#news-img')
    const newstitle = cardclone.querySelector('#news-title')
    const newssource = cardclone.querySelector('#news-source')
    const newsdesc = cardclone.querySelector('#news-desc')
    const bgh=cardclone.querySelector('#cards-h')
    // bgh.id='help';

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    // newssource.innerHTML="Source: "+article.source.name ;
    newsdesc.innerHTML= article.description;

    const date =new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newssource.innerHTML=`Source: ${article.source.name} ${date}`

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

// dark mode 

function changemode() {
    let element = document.body;
    element.classList.toggle("Dark");

}