// PASSWORD PROTECTION
const PASSWORD = "kiran";

function checkPassword() {
  const input = document.getElementById("passwordInput");
  const message = document.getElementById("passwordMessage");

  const enteredPassword = input.value.trim().toLowerCase();

  if (enteredPassword === PASSWORD.toLowerCase()) {
    document.getElementById("passwordScreen").classList.add("hidden");
    document.getElementById("mainWebsite").classList.remove("hidden");

    // Start at the top of the website
    window.scrollTo({ top: 0, behavior: "smooth" });

  } else {
    message.textContent = "Hmm… that's not it 😭 Try again.";
    input.value = "";
    input.focus();
  }
}
const TOTAL = 5;
let found = 0;
let unlocked = 1;
const birthdaySite = "https://nadha-q123.github.io/mychuchaapis-b-day/";

const data = {
  1: {
    kicker:"FOUND: ONE MEMORY",
    title:"The old photograph",
    body:`Some photographs are just photographs. Others somehow keep a whole little piece of time inside them.`,
    photo:"photo1.jpeg",
    clue:`I am not a photograph, but a photograph can bring me back. You cannot hold me in your hands, yet you keep collecting me. College kayyumbol koode kond pokan pattum varshanglk sheshavum ith matrhe koode indavu. What am I?`,
    answers:["memory","memories","ormakal"],
    next:"A little message"
  },
  2: {
    kicker:"FOUND: A LITTLE MESSAGE",
    title:"Listen carefully…",
    body:`There is something about hearing a familiar voice that makes a tiny message feel much bigger than it is.`,
    audio:"voice-note.mp4",
    icon:"♫",
    clue:`I disappear the moment you hear me, but you can replay me whenever you want.  What am I?`,
    answers:["voice","voice note","voice message","voicenote","voicemessage"],
    next:"A folded note"
  },
  3: {
    kicker:"FOUND: A FOLDED NOTE",
    title:"One name",
    body:`A tiny note, folded up like it has something important to hide.`,
    icon:"✉",
    clue:`A name can belong to millions. But a nickname can belong to just one. It is the name that appears in my messages to you. What is it?`,
    answers:["chuchapi","chuchaapi","susapi","chuchapan","chuchi"],
    next:"Something playing"
  },
  4: {
    kicker:"FOUND: SOMETHING PLAYING",
    title:"A little soundtrack",
    body:`Some feelings are easier to hear than to explain. So this one comes with a question instead of a speech.`,
    icon:"♫",
    clue:`I have no footsteps, yet I can bring two people closer. I have no hands, yet I can hold a whole playlist. I have no voice of my own, yet I can say what words sometimes cannot. What am I?`,
    answers:["music","song","playlist","music playlist"],
    next:"A tiny key"
  },
  5: {
    kicker:"FOUND: THE TINY KEY",
    title:"One last question",
    body:`You have found the photograph, the voice, the note and the music. The little key is the last thing left in the box.`,
    icon:"⚿",
    clue:`What do you think this tiny key opens?`,
    answers:["birthday website","birthday surprise","website","surprise","birthday","birthday webpage","webpage"],
    next:"the sealed envelope"
  }
};

function openBox(){
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("boxSection").classList.remove("hidden");
  document.getElementById("obj1").classList.remove("locked");
  updateProgress();
  window.scrollTo({top:0,behavior:"smooth"});
}

function openObject(n){
  if(n !== unlocked){
    toast("Ayyoo chuchapi 😭 First the unlocked one!");
    return;
  }
  const d=data[n];
  let visual="";
  if(d.photo) visual=`<img class="modal-photo" src="${d.photo}" alt="A memory">`;
  else if(d.audio) visual=`<div class="audio-wrap">
      <div class="big-heart">${d.icon}</div>
      <audio class="voice-player" controls preload="metadata">
        <source src="${d.audio}" type="audio/mp4">
        Your browser does not support audio playback.
      </audio>
    </div>`;
  else visual=`<div class="big-heart">${d.icon}</div>`;
  document.getElementById("modalContent").innerHTML=`
    <div class="modal-kicker">${d.kicker}</div>
    <h3>${d.title}</h3>
    ${visual}
    <p>${d.body}</p>
    <div class="clue-box">${d.clue}</div>
    <div class="answer-form">
      <input id="answerInput" autocomplete="off" placeholder="type your answer…">
      <button onclick="checkAnswer(${n})">UNLOCK</button>
    </div>
    <p class="answer-message" id="answerMessage"></p>
  `;
  document.getElementById("modal").classList.remove("hidden");
  setTimeout(()=>document.getElementById("answerInput")?.focus(),100);
}

function checkAnswer(n){
  const input=document.getElementById("answerInput");
  const msg=document.getElementById("answerMessage");
  const value=input.value.trim().toLowerCase().replace(/[’']/g,"").replace(/\s+/g," ");
  if(!value){msg.textContent="Answer parayeda chuchapi 😭";return;}
  if(data[n].answers.includes(value)){
    found++;
    confetti();
    msg.textContent="Correct. ♡";
    document.getElementById("obj"+n).classList.remove("locked");
    document.getElementById("obj"+n).classList.add("found");
    if(n<TOTAL){
      unlocked=n+1;
      document.getElementById("obj"+(n+1)).classList.remove("locked");
      setTimeout(()=>{
        closeModal();
        toast("You found it. The next thing is ready.");
      },850);
    }else{
      document.getElementById("finalEnvelope").classList.add("unlocked");
      setTimeout(()=>{
        closeModal();
        toast("The key fits. One envelope remains…");
      },850);
    }
    updateProgress();
  }else{
    msg.textContent="Entha chuchapi ith 😭😂 Try again! You know this one.";
  }
}

function openFinal(){
  if(found<TOTAL){toast("The envelope is sealed until all five things are found.");return;}
  document.getElementById("modalContent").innerHTML=`
    <div class="final-card">
      <div class="modal-kicker">THE LAST THING IN THE BOX</div>
      <div class="big-heart">♡</div>
      <h3>Okay.<br>No more clues.</h3>
      <p>You've found all the random little things.</p>
      <p>Now there is one last surprise waiting outside this box.</p>
      <p class="hand">Made especially for Kiran. ♡</p>
      <a class="final-button" href="${birthdaySite}" target="_blank" rel="noopener">OPEN THE REAL SURPRISE →</a>
    </div>
  `;
  document.getElementById("modal").classList.remove("hidden");
  confetti(70);
}

function closeModal(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

function updateProgress(){
  document.getElementById("progressText").textContent=`${found} of ${TOTAL} found`;
  document.getElementById("progressBar").style.width=(found/TOTAL*100)+"%";
}

function toast(text){
  const t=document.getElementById("toast");
  t.textContent=text;t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}

function confetti(count=95){
  const colors=["#9b655e","#b48b55","#795642","#d8a7a0","#ead1a5","#6f8a7a"];
  for(let i=0;i<count;i++){
    const p=document.createElement("span");
    p.className="confetti";
    p.style.left=(45+Math.random()*10)+"vw";
    p.style.top=(42+Math.random()*10)+"vh";
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.setProperty("--x",((Math.random()-.5)*100)+"vw");
    p.style.setProperty("--y",(35+Math.random()*55)+"vh");
    p.style.setProperty("--r",((Math.random()-.5)*900)+"deg");
    p.style.animationDelay=(Math.random()*.18)+"s";
    document.getElementById("paperBits").appendChild(p);
    setTimeout(()=>p.remove(),2100);
  }
}
