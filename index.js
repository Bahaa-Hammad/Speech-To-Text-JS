const texts = document.querySelector('.texts'); // DOM 

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const arabicButton = document.querySelector('#arabic'); // DOM 
const englishButton = document.querySelector('#english'); // DOM 

arabicButton.addEventListener('click', ()=>{
  
  recognition.lang = 'ar';
  arabicButton.classList.add("d-none");

  
  englishButton.classList.remove("d-none");

})

englishButton.addEventListener('click', ()=>{
  
  recognition.lang = 'en-US';
  englishButton.classList.add("d-none");

  
  arabicButton.classList.remove("d-none");

})

let p = document.createElement('p'); // DOM 

recognition.addEventListener('result', (e)=>{
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.innerText = text;
  if(e.results[0].isFinal){
    // Specilized responses:

    if (text.includes('how are you')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'I am fine';
      texts.appendChild(p)
    }
    if (text.includes("what's your name") || text.includes('what is your name')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'My Name is Bahaa';
      texts.appendChild(p)
    }
    if (text.includes('open Smart methods')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'opening smart methods website';
      texts.appendChild(p)
      console.log('opening smart methods website')
      window.open('https://s-m.com.sa/ar/index.html')
    }
    p = document.createElement('p');
  }
});


recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();