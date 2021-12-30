
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
const progCircleBg = document.querySelector("progress-ring__circle__background");
const progCircle = document.querySelector(".progress-ring__circle");

localStorage.setItem("btn", "focus");

//secOrMin 60 buat jadiin menit, 1 buat jadiin detik
//jadiin detik buat live demo aja ntar kelamaan
let initial, totalsecs, perc, paused, mins, seconds, cycle = 0, secOrMin = 1;

//start on click
startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  //ambil waktu dari form (default ada di placeholder di index.html)
  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 20;
  } else if (btn === "break") {
    mins = +localStorage.getItem("breakTime") || 5;
  } else if (btn === "longbreak"){
    mins = +localStorage.getItem("longbreakTime") || 15;
  }

  //timer jalan
  seconds = mins * secOrMin;
  totalsecs = mins * secOrMin;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
  progCircle.style.stroke = "rgb(255, 59, 69)";
});

//timernya
function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

  if (seconds > 0) {
    // perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    perc = ((totalsecs - seconds) / totalsecs) * 100;
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);

  } else {
    mins = 0;
    seconds = 0;
    bell.play();
    
    let btn = localStorage.getItem("btn");
    let totalCycle = localStorage.getItem("cycle");
    
    
    if (btn === "focus") {
      cycle++;
      // startBtn.textContent = "start break";
      
      // alert debug
      // alert(cycle);
      if (cycle == totalCycle){ // ke mode long break
        localStorage.setItem("btn", "longbreak");
        progCircle.style.stroke ="rgb(66, 155, 245)"
        autoStart();
      } else{ // ke mode break
        // startBtn.classList.add("break");
        localStorage.setItem("btn", "break");
        progCircle.style.stroke ="rgb(0, 255, 34)"
        autoStart();
      }
    } else if (btn === "break") {
      
      if (cycle == totalCycle){ // ke mode long break abis ini selese
        localStorage.setItem("btn", "longbreak");
        progCircle.style.stroke ="rgb(66, 155, 245)"
        autoStart();
      } else { // ke mode focus
        // startBtn.classList.remove("break");
        // startBtn.textContent = "start focus";
        localStorage.setItem("btn", "focus");
        progCircle.style.stroke ="rgb(255, 59, 69)";
        autoStart();
      }
    } else if (btn === "longbreak"){ // udah selese
      cycle = 0;
      startBtn.style.transform = "scale(1)";
      setProgress(100);
      localStorage.setItem("btn", "focus");
    }
    
      // startBtn.style.transform = "scale(1)";
  }
}

//otomatis gas
function autoStart(){
  let btn = localStorage.getItem("btn");
  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 1;
  } else if (btn === "break") {
    mins = +localStorage.getItem("breakTime") || 1;
  } else if (btn === "longbreak"){
    mins = +localStorage.getItem("longbreakTime") || 1;
  }
  seconds = mins * secOrMin;
  totalsecs = mins * secOrMin;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
}

//ini rencananya buat skip button tapi nanti aja lah males
// function startToSkip(){
//   startBtn.textContent = "skip";
//   startBtn.classList.add("skip");
//   startBtn.addEventListener("click", () =>{
//     setProgress(100);
//     seconds = 0;
//   })
// }

// function skipToStart(){

// }