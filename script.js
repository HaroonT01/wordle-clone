let guess;
let hint;
let attempts = 0;
const i = 3;
const rand = Math.floor(Math.random() * 21);
const inputs = document.querySelectorAll('input[type="text"]');
let correctWord = false;

async function getData() {
  const response = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv"
    }
  });

  const data = await response.json();
  const { dictionary } = data;

  guess = dictionary[rand].word.toUpperCase();
  hint = dictionary[rand].hint;

  console.log(dictionary[rand]);
}

function getHint() {
  const hintText = document.getElementById("hintText");
  hintText.innerHTML = hint;
}

function input() {
  if (!correctWord) {
    inputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        if (index < i && event.target.value.length === 1) {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          } else {
            event.target.blur();
          }
        }
      });

      input.addEventListener('keydown', (event) => {
        if (index === 0 && event.key === "Backspace") {
          return;
        }

        if (event.key === "Backspace") {
          if (input.value.length > 0) {
            input.value = "";
          } else {
            inputs[index - 1].focus();
          }
        } else if (index === i && event.key === "Enter") {
          event.preventDefault();
          inputs[index].blur();
          compareWord();
        }
      });
    });
  } else {
    attempts++;
  }
}

let input1;
let input2;
let input3;
let input4;
let inputWord;


inputs[0].addEventListener('input', (event) => {
  input1 = event.target.value;
  console.log(input1);
});

inputs[1].addEventListener('input', (event) => {
  input2 = event.target.value;
  console.log(input2);
});

inputs[2].addEventListener('input', (event) => {
  input3 = event.target.value;
  console.log(input3);
});

inputs[3].addEventListener('input', (event) => {
  input4 = event.target.value;
  console.log(input4);
  
  inputWord = input1 + input2 + input3 + input4;
  console.log(inputWord);
});




function compareWord() {
  if (inputWord == guess) {
    console.log("Correct!");
    correctWord = true;
    alert("Correct!");
  } else {
    attempts++;
    console.log("Wrong!");
    console.log(guess);
    console.log(inputWord);
    alert("Wrong!");
  }

}

async function startGame() {
  await getData();
  getHint();

  input();
  
}

startGame();





