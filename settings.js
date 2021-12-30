const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const longbreakTimeInput = document.querySelector("#longbreakTime");
const cycleInput = document.querySelector("#cycle");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset")

focusTimeInput.value = localStorage.getItem("focusTime");
breakTimeInput.value = localStorage.getItem("breakTime");
longbreakTimeInput.value = localStorage.getItem("longbreakTime");
cycleInput.value = localStorage.getItem("cycle");


document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("focusTime", focusTimeInput.value);
  localStorage.setItem("breakTime", breakTimeInput.value);
  localStorage.setItem("longbreakTime", longbreakTimeInput.value);
  localStorage.setItem("cycle", cycleInput.value);
  alert("timer saved successfully. press 'start' to start the timer");
});

document.querySelector(".reset").addEventListener("click", () => {
  startBtn.style.transform = "scale(1)";
  clearTimeout(initial);
  setProgress(100);
  mindiv.textContent = 0;
  secdiv.textContent = 00;
  localStorage.setItem("btn", "focus");
  progCircle.style.stroke = "rgb(255, 59, 69)";
  paused = undefined;
  cycle = 0;
});

// tambahin skip
// jika paused maka reset jika tidak paused maka skip
// kapan2 aja dah pusing

pauseBtn.addEventListener("click", () => {
  if (paused === undefined) {
    return;
  }
  if (paused) {
    paused = false;
    resetBtn.style.transform = "scale(1)"
    initial = setTimeout("decremenT()", 60);
    pauseBtn.textContent = "pause";
    pauseBtn.classList.remove("resume");
  } else {
    clearTimeout(initial);
    resetBtn.style.transform = "scale(0)"
    //resetBtn.textContent = "skip"
    pauseBtn.textContent = "resume";
    pauseBtn.classList.add("resume");
    paused = true;
  }
});