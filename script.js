const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const defaults = {
  name: "Deepika",
  sender: "Mohan",
  date: "",
  message: `Wishing you a very Happy Birthday!

May this new year of your life bring you happiness, success, peace, exciting opportunities, and plenty of beautiful memories.

Keep smiling, keep believing in yourself, and keep moving toward everything you want to achieve.

Have an amazing birthday and a wonderful year ahead!`
};

let data = JSON.parse(localStorage.getItem("deepikaBirthday") || "null") || {...defaults};

function saveData(){
  localStorage.setItem("deepikaBirthday", JSON.stringify(data));
}

function toast(text){
  const el=$("#toast");
  if(!el)return;
  el.textContent=text;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2200);
}

function applyData(){
  const hero=$("#heroName"), uni=$("#universeName"), final=$("#finalName");
  if(hero) hero.textContent=data.name;
  if(uni) uni.textContent=data.name+" ✨";
  if(final) final.textContent=data.name;
  if($("#senderName")) $("#senderName").textContent=data.sender;
  if($("#finalSender")) $("#finalSender").textContent=data.sender;
  if($("#letterTitle")) $("#letterTitle").textContent="Dear "+data.name+",";
  const message=$("#letterMessage");
  if(message){
    message.innerHTML=data.message.split(/\n\s*\n/)
      .map(x=>`<p>${x.replace(/\n/g,"<br>")}</p>`).join("");
  }
}

function openModal(id){
  const el=$("#"+id);
  if(el) el.classList.add("open");
}
function closeModal(id){
  const el=$("#"+id);
  if(el) el.classList.remove("open");
}

applyData();

/* Preloader */
window.addEventListener("load",()=>{
  setTimeout(()=>{
    const p=$("#preloader");
    if(p)p.style.display="none";
  },500);
});

/* Hero particles */
const particles=$("#heroParticles");
if(particles){
  for(let i=0;i<35;i++){
    const p=document.createElement("i");
    p.className="particle";
    p.style.left=Math.random()*100+"%";
    p.style.top=Math.random()*100+"%";
    p.style.animationDelay=Math.random()*6+"s";
    particles.appendChild(p);
  }
}

/* Navigation */
const menuToggle=$(".menu-toggle");
const navLinks=$(".nav-links");
if(menuToggle && navLinks){
  menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
}
$$(".nav-links a").forEach(a=>{
  a.addEventListener("click",()=>navLinks?.classList.remove("open"));
});

function transitionTo(target){
  const overlay=$("#pageTransition");
  if(overlay) overlay.classList.add("active");
  setTimeout(()=>{
    document.querySelector(target)?.scrollIntoView({behavior:"auto",block:"start"});
  },350);
  setTimeout(()=>overlay?.classList.remove("active"),800);
}

$$(".nav-links a").forEach(a=>{
  a.addEventListener("click",(e)=>{
    const target=a.getAttribute("href");
    if(target && target.startsWith("#")){
      e.preventDefault();
      navLinks?.classList.remove("open");
      transitionTo(target);
    }
  });
});

$("#openSurprise")?.addEventListener("click",()=>transitionTo("#birthday"));
$("#replay")?.addEventListener("click",()=>transitionTo("#home"));

/* Modal close buttons */
$$("[data-close]").forEach(btn=>{
  btn.addEventListener("click",()=>closeModal(btn.dataset.close));
});

/* Letter editor */
$("#editLetter")?.addEventListener("click",()=>{
  if($("#editName")) $("#editName").value=data.name;
  if($("#editSender")) $("#editSender").value=data.sender;
  if($("#editMessage")) $("#editMessage").value=data.message;
  openModal("letterModal");
});
$("#saveLetter")?.addEventListener("click",()=>{
  data.name=$("#editName")?.value.trim() || "Deepika";
  data.sender=$("#editSender")?.value.trim() || "Mohan";
  data.message=$("#editMessage")?.value.trim() || defaults.message;
  saveData();
  applyData();
  closeModal("letterModal");
  toast("Birthday message saved ✨");
});
$("#resetLetter")?.addEventListener("click",()=>{
  if($("#editName")) $("#editName").value=defaults.name;
  if($("#editSender")) $("#editSender").value=defaults.sender;
  if($("#editMessage")) $("#editMessage").value=defaults.message;
});

/* Countdown */
function updateCountdown(){
  const title=$("#countTitle");
  if(!data.date){
    if(title) title.textContent="Choose a birthday date in Creator Mode";
    return;
  }
  let target=new Date(data.date+"T00:00:00");
  const now=new Date();
  if(target<now) target.setFullYear(now.getFullYear()+1);
  const diff=Math.max(0,target-now);
  const values=[
    Math.floor(diff/86400000),
    Math.floor(diff%86400000/3600000),
    Math.floor(diff%3600000/60000),
    Math.floor(diff%60000/1000)
  ];
  $("#countdown")?.querySelectorAll("strong").forEach((el,i)=>{
    el.textContent=String(values[i]).padStart(2,"0");
  });
  if(title) title.textContent="Your next birthday";
}
updateCountdown();
setInterval(updateCountdown,1000);

/* Birthday cake wish */
$("#wishBtn")?.addEventListener("click",()=>{
  const line=$(".candle-line");
  if(line) line.style.opacity="0";
  $$(".flame").forEach(x=>x.style.display="none");
  const result=$("#wishResult");
  if(result) result.textContent="May all your wishes come true! ✨";
  for(let i=0;i<35;i++){
    const c=document.createElement("span");
    c.style.cssText=`position:fixed;z-index:180;left:${Math.random()*100}%;top:-10px;width:7px;height:12px;background:${["#ff4f91","#ffd6e7","#fff","#c9185b"][i%4]};border-radius:3px;animation:fall ${2+Math.random()*2}s linear forwards;`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4500);
  }
  toast("Wish made ✨");
});
const fallStyle=document.createElement("style");
fallStyle.textContent="@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}";
document.head.appendChild(fallStyle);

/* Music — starts on the first touch/click anywhere (mobile-safe) */
const audio=$("#audio");
const playBtn=$("#playBtn");
const record=$(".record");
const musicStartPrompt=$("#musicStartPrompt");
let musicStarted=false;

function updateMusicUI(){
  if(!audio)return;
  const playing=!audio.paused;
  if(playBtn) playBtn.textContent=playing?"Ⅱ":"▶";
  if(record) record.style.animationPlayState=playing?"running":"paused";
  if(musicStartPrompt) musicStartPrompt.classList.toggle("hidden", musicStarted);
}

async function startBirthdayMusic(){
  if(!audio || musicStarted)return;
  musicStarted=true;
  updateMusicUI();
  try{
    audio.volume=0.58;
    audio.muted=false;
    await audio.play();
    updateMusicUI();
  }catch(err){
    /* Browser-blocked playback should not prevent the page from being used. */
  }
}

// A real user gesture is required by mobile browsers before audio can play.
["pointerdown","touchstart","click","keydown"].forEach(eventName=>{
  document.addEventListener(eventName,(event)=>{
    if(eventName==="keydown" && !["Enter"," "].includes(event.key))return;
    startBirthdayMusic();
  },{passive:eventName!=="keydown"});
});

musicStartPrompt?.addEventListener("click",startBirthdayMusic);
musicStartPrompt?.addEventListener("keydown",e=>{
  if(e.key==="Enter" || e.key===" "){e.preventDefault();startBirthdayMusic();}
});

playBtn?.addEventListener("click",(e)=>{
  e.stopPropagation();
  if(!audio)return;
  if(audio.paused){
    audio.play().then(()=>{musicStarted=true;updateMusicUI();}).catch(()=>toast("Tap the page once to start music 🎵"));
  }else{
    audio.pause();
    updateMusicUI();
  }
});

audio?.addEventListener("timeupdate",()=>{
  if(audio.duration && $("#progressBar"))
    $("#progressBar").style.width=(audio.currentTime/audio.duration*100)+"%";
});

$("#muteBtn")?.addEventListener("click",(e)=>{
  e.stopPropagation();
  if(audio){
    audio.muted=!audio.muted;
    if(!audio.muted && audio.paused) startBirthdayMusic();
  }
  updateMusicUI();
});

/* Photo upload - only creator mode should use it */
$("#photoInput")?.addEventListener("change",(e)=>{
  const files=[...e.target.files];
  if(!files.length)return;
  $("#universe")?.classList.add("hidden");
  const gallery=$("#gallery");
  gallery?.classList.remove("hidden");
  if(gallery)gallery.innerHTML="";
  files.forEach(file=>{
    const img=document.createElement("img");
    img.alt="Birthday memory";
    img.src=URL.createObjectURL(file);
    gallery?.appendChild(img);
  });
  toast(files.length+" photo"+(files.length>1?"s":"")+" added 📸");
});

/* Wish wall */
function escapeHtml(s){
  return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function renderWishes(){
  const wall=$("#wishWall");
  if(!wall)return;
  const wishes=JSON.parse(localStorage.getItem("wishWall")||"[]");
  wall.innerHTML=wishes.map(x=>`<span class="wish-note">${escapeHtml(x)}</span>`).join("");
}
$("#addWish")?.addEventListener("click",()=>{
  const input=$("#wishInput");
  const value=input?.value.trim();
  if(!value)return;
  const wishes=JSON.parse(localStorage.getItem("wishWall")||"[]");
  wishes.push(value);
  localStorage.setItem("wishWall",JSON.stringify(wishes));
  if(input)input.value="";
  renderWishes();
});
renderWishes();

/* Theme */
function applyTheme(){
  const dark=localStorage.getItem("deepikaTheme")==="dark";
  document.body.classList.toggle("dark",dark);
  if($("#themeToggle")) $("#themeToggle").textContent=dark?"☀":"☾";
}
$("#themeToggle")?.addEventListener("click",()=>{
  const dark=!document.body.classList.contains("dark");
  localStorage.setItem("deepikaTheme",dark?"dark":"light");
  applyTheme();
});
applyTheme();

/* Visible Creator Mode */
const CREATOR_PASSWORD="deepika2026";

function openCreatorLogin(){
  const pass=$("#creatorPassword");
  const err=$("#loginError");
  if(pass)pass.value="";
  if(err)err.textContent="";
  openModal("creatorLoginModal");
}

$("#creatorEntry")?.addEventListener("click",openCreatorLogin);

function refreshCreatorUI(){
  if($("#creatorDate"))$("#creatorDate").value=data.date||"";
  const musicName=localStorage.getItem("deepikaCustomMusicName");
  if($("#creatorMusicStatus"))
    $("#creatorMusicStatus").textContent=musicName?"Selected: "+musicName:"Default: music/website.mp3";
}

$("#creatorLogin")?.addEventListener("click",()=>{
  const entered=$("#creatorPassword")?.value || "";
  if(entered===CREATOR_PASSWORD){
    document.body.classList.remove("visitor-mode");
    document.body.classList.add("creator-mode");
    closeModal("creatorLoginModal");
    refreshCreatorUI();
    openModal("creatorPanelModal");
    toast("Creator Mode unlocked 🔐");
  }else{
    if($("#loginError"))$("#loginError").textContent="Incorrect password.";
  }
});

$("#creatorEditMessage")?.addEventListener("click",()=>{
  closeModal("creatorPanelModal");
  $("#editLetter")?.click();
});

$("#creatorMusicInput")?.addEventListener("change",(e)=>{
  const file=e.target.files?.[0];
  if(!file)return;
  if(window._customMusicUrl)URL.revokeObjectURL(window._customMusicUrl);
  window._customMusicUrl=URL.createObjectURL(file);
  if(audio){
    audio.src=window._customMusicUrl;
    audio.load();
  }
  localStorage.setItem("deepikaCustomMusicName",file.name);
  if($("#creatorMusicStatus"))$("#creatorMusicStatus").textContent="Selected: "+file.name;
  if($("#selectedTrack"))$("#selectedTrack").textContent=file.name;
  toast("Music selected 🎵");
});

$("#creatorRemoveMusic")?.addEventListener("click",()=>{
  localStorage.removeItem("deepikaCustomMusicName");
  if(window._customMusicUrl)URL.revokeObjectURL(window._customMusicUrl);
  window._customMusicUrl=null;
  if(audio){audio.src="music/website.mp3";audio.load();}
  if($("#creatorMusicStatus"))$("#creatorMusicStatus").textContent="Default: music/website.mp3";
  if($("#selectedTrack"))$("#selectedTrack").textContent="Default: music/website.mp3";
  toast("Default music restored");
});

$("#saveCreator")?.addEventListener("click",()=>{
  data.date=$("#creatorDate")?.value || "";
  saveData();
  updateCountdown();
  document.body.classList.remove("creator-mode");
  document.body.classList.add("visitor-mode");
  closeModal("creatorPanelModal");
  toast("Saved and locked 🎀");
});

$("#previewVisitor")?.addEventListener("click",()=>{
  document.body.classList.remove("creator-mode");
  document.body.classList.add("visitor-mode");
  closeModal("creatorPanelModal");
  transitionTo("#home");
  toast("Visitor Mode");
});

/* Keep visitor mode as the default. Creator button stays visible so the owner can access it. */
document.body.classList.add("visitor-mode");

/* Keyboard shortcut backup */
document.addEventListener("keydown",(e)=>{
  if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==="e") openCreatorLogin();
});
