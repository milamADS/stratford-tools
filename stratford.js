/* Stratford Tools — shared runtime: injects aurora bg, cursor glow, home button, scroll reveals */
(function(){
  if(document.querySelector('.s-aurora')) return;
  const mk=(cls,html)=>{const d=document.createElement('div'); d.className=cls; if(html)d.innerHTML=html; return d;};

  document.body.prepend(mk('s-cg'));
  document.body.prepend(mk('s-grid'));
  document.body.prepend(mk('s-aurora','<span class="a1"></span><span class="a2"></span><span class="a3"></span><span class="a4"></span>'));

  // Home button (skip on index itself)
  const isIndex=/(^|\/)index\.html?$/.test(location.pathname) || location.pathname.endsWith('/');
  if(!isIndex){
    const a=document.createElement('a'); a.className='s-home'; a.href='index.html';
    a.innerHTML='<span class="lg">◈</span> All tools';
    document.body.appendChild(a);
  }

  // Cursor glow
  const cg=document.querySelector('.s-cg');
  window.addEventListener('pointermove',e=>{cg.style.opacity=1; cg.style.left=e.clientX+'px'; cg.style.top=e.clientY+'px';},{passive:true});
  window.addEventListener('pointerleave',()=>cg.style.opacity=0);

  // Scroll reveals for anything tagged .s-reveal
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)en.target.classList.add('in')}),{threshold:.12});
  document.querySelectorAll('.s-reveal').forEach((el,i)=>{el.style.transitionDelay=(i*60)+'ms'; io.observe(el);});
})();
