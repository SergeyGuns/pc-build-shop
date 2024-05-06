(async()=>{var e;let t,r=100,n=document.querySelector(".corousel");if(null===n)return;let a=n.getContext("2d"),l=[].map.call(document.querySelector(".preload-images").querySelectorAll("img"),e=>e.src),o=0,u=1,c=(e=()=>{requestAnimationFrame(()=>{let e=n.getBoundingClientRect();if((xPercentCurr=parseInt(e.bottom/(window.innerHeight+400)*100))>99&&(xPercentCurr=99),xPercentCurr<0&&(xPercentCurr=0),r===xPercentCurr)return;r=xPercentCurr;let t=Math.floor(l.length/100*r);o=t,(u=1)<1&&(u=1)})},t=null,function(...r){// Если таймер есть, то функция уже была вызвана,
// и значит новый вызов следует пропустить.
t||// Если таймера нет, значит мы можем вызвать функцию:
(t=setTimeout(()=>{// Аргументы передаём неизменными в функцию-аргумент:
e(...r),// По окончании очищаем таймер:
clearTimeout(t),t=null},100))});document.addEventListener("scroll",c);let i=await Promise.all(l.map(e=>new Promise(t=>{let r=new Image;r.addEventListener("load",()=>{t(r)},!1),r.src=e}))).then(e=>e.map(e=>{let t=document.createElement("canvas");t.width=1920,t.height=1038;let r=t.getContext("2d");r.drawImage(e,0,0);let n=r.getImageData(0,0,1920,1038),a=n.data;for(let e=0;e<a.length;e+=4){let t=a[e],r=a[e+1],n=a[e+2];a[e+3],t>240&&r>240&&n>240&&(a[e]=0,a[e+1]=0,a[e+2]=0,a[e+3]=1),t>200&&r>200&&n>200&&(a[e]=0,a[e+1]=0,a[e+2]=0,a[e+3]=.5)}var e=new Image;return n}));!function e(){a.putImageData(i[o],0,0),n.style.transform=`scale(${u})`,window.requestAnimationFrame(e)}()})();//# sourceMappingURL=index.bda94cab.js.map

//# sourceMappingURL=index.bda94cab.js.map
