
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds, cycle=0;

//start on click
startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  //ambil waktu dari form (default 1 menit)
  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 1;
  } else if (btn === "break") {
    mins = +localStorage.getItem("breakTime") || 1;
  } else if (btn === "longbreak"){
    mins = +localStorage.getItem("longbreakTime") || 1;
  }

  seconds = mins * 1;
  totalsecs = mins * 1;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
});

//timer
function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  // if (circle.classList.contains("danger")) {
  //   circle.classList.remove("danger");
  // }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    // if (seconds < 10) {
    //   circle.classList.add("danger");
    // }
  } else {
    mins = 0;
    seconds = 0;
    bell.play();
    
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      //ke mode break
      // startBtn.textContent = "start break";
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
      cycle++;
      autoStart();
    } else if (btn === "break") {
      if (cycle == localStorage.getItem("cycle")){
        //ke mode long break abis ini selese
        localStorage.setItem("btn", "longbreak");
        autoStart();
      } else {
        //ke mode focus
        startBtn.classList.remove("break");
        //startBtn.textContent = "start focus";
        localStorage.setItem("btn", "focus");
        autoStart();
      }
    } else if (btn === "longbreak"){
      cycle = 0;
      startBtn.style.transform = "scale(1)";
      setProgress(100);
      localStorage.setItem("btn", "focus");
    }
    
    // else{
    // if (btn === "focus") {
    //   // startBtn.textContent = "start break";
    //   startBtn.classList.add("break");
    //   localStorage.setItem("btn", "break");
    //   autoStart();
    // } else {
    //   startBtn.classList.remove("break");
    //   startBtn.textContent = "start focus";
    //   localStorage.setItem("btn", "focus");
    //   autoStart();
    // }
    // // startBtn.style.transform = "scale(1)";
    // }
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
  seconds = mins * 1;
  totalsecs = mins * 1;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
}

// //ini abis long break
// function resetCycle(cycle){
//   mins = 0;
//   seconds = 0;
//   bell.play();
//   cycle = 0;
//   startBtn.style.transform = "scale(1)";
// }