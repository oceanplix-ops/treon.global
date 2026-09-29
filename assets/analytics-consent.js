/* TREON optional Google Analytics 4, loaded only after visitor choice. */
(function(){
  'use strict';
  var key='treon_analytics_choice_v1';
  var id='G-C9NBT5KFZB';
  var siteRoot=new URL('../',document.currentScript.src);
  var lang=(document.documentElement.lang||'en').toLowerCase().startsWith('de')?'de':'en';
  var copy=lang==='de'?{
    text:'Wir verwenden Google Analytics nur mit Ihrer Zustimmung, um Besuche und die Nutzung der Website zu messen. Sie können Ihre Wahl später unter Datenschutz ändern.',
    accept:'Statistik zulassen',decline:'Ablehnen',settings:'Statistik-Einstellungen',privacy:'Datenschutz'
  }:{
    text:'We use Google Analytics only with your permission to measure visits and website use. You can change your choice later on the Privacy page.',
    accept:'Allow analytics',decline:'Decline',settings:'Analytics settings',privacy:'Privacy'
  };
  function store(v){try{localStorage.setItem(key,v)}catch(e){}}
  function read(){try{return localStorage.getItem(key)}catch(e){return null}}
  function start(){
    if(window.__treonGAStarted)return;
    window.__treonGAStarted=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments)};
    window.gtag('js',new Date());
    window.gtag('config',id);
    var tag=document.createElement('script');tag.async=true;
    tag.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(tag);
  }
  function banner(){
    if(document.getElementById('treon-consent'))return;
    var box=document.createElement('section');box.id='treon-consent';
    box.setAttribute('role','dialog');box.setAttribute('aria-label',copy.settings);
    box.style.cssText='position:fixed;z-index:99999;left:16px;right:16px;bottom:16px;max-width:920px;margin:auto;background:#082d53;color:#fff;padding:20px 22px;border:1px solid #4b758e;border-radius:12px;box-shadow:0 12px 35px rgba(0,0,0,.28);font:16px/1.5 Arial,Helvetica,sans-serif';
    var p=document.createElement('p');p.textContent=copy.text;p.style.cssText='margin:0 0 14px;color:#fff';box.appendChild(p);
    var row=document.createElement('div');row.style.cssText='display:flex;gap:10px;flex-wrap:wrap;align-items:center';
    function button(label,value){var b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='font:inherit;font-weight:700;cursor:pointer;border-radius:7px;border:1px solid #fff;padding:9px 14px;background:'+(value==='yes'?'#fff':'transparent')+';color:'+(value==='yes'?'#082d53':'#fff');b.onclick=function(){store(value);box.remove();if(value==='yes')start();else if(window.__treonGAStarted)location.reload()};row.appendChild(b)}
    button(copy.accept,'yes');button(copy.decline,'no');
    var link=document.createElement('a');link.href=new URL(lang==='de'?'de/privacy/index.html':'privacy/index.html',siteRoot).href;link.textContent=copy.privacy;link.style.cssText='color:#fff;text-decoration:underline;padding:8px 2px';row.appendChild(link);
    box.appendChild(row);document.body.appendChild(box);
  }
  function ready(){
    var prior=read();if(prior==='yes')start();else if(prior!=='no')banner();
    var settings=document.getElementById('treon-cookie-settings');
    if(settings)settings.addEventListener('click',function(){banner()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
