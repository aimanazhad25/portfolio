(()=>{'use strict';
const $=(s)=>document.querySelector(s),$$=(s)=>Array.from(document.querySelectorAll(s));
const doc=document.documentElement;
const theme=$('#themeToggle');
function setTheme(mode){doc.dataset.theme=mode;theme.querySelector('use').setAttribute('href',mode==='dark'?'#i-sun':'#i-moon');theme.setAttribute('aria-label',mode==='dark'?'Switch to light mode':'Switch to dark mode');try{localStorage.setItem('aiman-theme',mode)}catch(e){}}
try{if(localStorage.getItem('aiman-theme')==='light')setTheme('light')}catch(e){}
theme.addEventListener('click',()=>setTheme(doc.dataset.theme==='dark'?'light':'dark'));
const menu=$('#menuToggle'),nav=$('#mobileNav');
function setMenu(open){nav.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.querySelector('use').setAttribute('href',open?'#i-x':'#i-menu')}
menu.addEventListener('click',()=>setMenu(nav.hidden));
$$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
window.addEventListener('resize',()=>{if(innerWidth>850)setMenu(false)});
const filters=$$('.filter-button'),cards=$$('.project-card');
filters.forEach(b=>b.addEventListener('click',()=>{const category=b.dataset.filter;filters.forEach(other=>{const active=other===b;other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active))});cards.forEach(card=>card.hidden=category!=='all'&&!card.dataset.category.split(' ').includes(category))}));
const copy=$('#copyEmail'),copyText=$('#copyText'),toast=$('#toast');let toastTimer;
copy.addEventListener('click',async()=>{const email='aimanazhad4@gmail.com';try{await navigator.clipboard.writeText(email);copyText.textContent='Copied!';toast.textContent='Email copied to clipboard'}catch(e){copyText.textContent=email;toast.textContent='Email: '+email}toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.classList.remove('is-visible');copyText.textContent='Copy email address'},3000)});
if($('#copyrightYear'))$('#copyrightYear').textContent=new Date().getFullYear();
if('IntersectionObserver'in window){const sections=$$('main section[id]'),links=$$('.desktop-nav a');const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});sections.forEach(s=>obs.observe(s))}
})();