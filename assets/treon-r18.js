/* Open the containing detail panels before following an in-page reference. */
(()=>{'use strict';
function reveal(hash){if(!hash||hash==='#')return;let id;try{id=decodeURIComponent(hash.slice(1))}catch{return}const target=document.getElementById(id);if(!target)return;let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement}if(target.tagName==='DETAILS')target.open=true;}
document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link)return;const url=new URL(link.href,location.href);if(url.origin===location.origin&&url.pathname===location.pathname&&url.hash)reveal(url.hash)});
window.addEventListener('hashchange',()=>reveal(location.hash));reveal(location.hash);
})();
