// script.js

// ========== INIZIALIZZAZIONE ==========
const userLang = navigator.language || navigator.userLanguage;
const isItalian = userLang.toLowerCase().startsWith('it');
const lang = isItalian ? 'it' : 'en';
let audioEnabled = true;

// ========== ELEMENTI DOM ==========
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const wishInput = document.getElementById('wishInput');
const throwButton = document.getElementById('throwButton');
const headerIt = document.getElementById('header-it');
const headerEn = document.getElementById('header-en');
const charCount = document.getElementById('charCount');
const submitEmailButton = document.getElementById('submitEmailButton');
const skipButton = document.getElementById('skipButton');
const userEmailInput = document.getElementById('userEmailInput');
const thankYouMsg = document.getElementById('thankYouMsg');
const returnHomeButton = document.getElementById('returnHomeButton');
const coinsContainer = document.getElementById('coinsContainer');
const wellImage = document.getElementById('wellImage');
const audioToggle = document.getElementById('audioToggle');

// Elementi audio
const coinSound = document.getElementById('coinSound');
const waterSound = document.getElementById('waterSound');
const magicSound = document.getElementById('magicSound');
const successSound = document.getElementById('successSound');
const ambientMusic = document.getElementById('ambientMusic');

// Messaggi di stato
const loadingMessage = document.getElementById('loadingMessage');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// ========== TESTI BILINGUE ==========
const texts = {
  it: {
    placeholder: "Scrivi qui il tuo desiderio... ✨\n\nLa Dea Bendata ascolta ogni parola\nsenza giudizio, senza preferenze.\nLa sua bilancia misura solo l'intensità\ncon cui lo consegni all'universo.",
    button: "🪙 GETTA NELLA BILANCIA 🪙",
    privacy: "La Dea è bendata: il tuo desiderio è anonimo e sacro",
    step2Title: "DESIDERIO PESATO E ACCETTATO",
    step2Text1: "La bilancia della Dea ha ricevuto il tuo desiderio.",
    step2Text2: "Si è unito ai milioni di speranze che pendono\ndai piatti della giustizia cosmica.",
    step2Quote: "Ora respira profondamente e senti\nil controppeso che si aggiusta nell'universo.",
    step3Title: "CUSTODIA DEL DESIDERIO",
    step3Text: "La Dea offre di custodire il tuo desiderio nel Libro dei Giuramenti.\nTra 7 notti, una stella-bilancia ti visiterà per ricordartelo.",
    emailPlaceholder: "la.tua@email.com",
    acceptButton: "ACCETTO LA CUSTODIA",
    skipButton: "LASCIALO VOLARE LIBERO",
    thankYouTitle: "DESIDERIO CUSTODITO!",
    thankYouText: "La Dea ha accettato la tua offerta.\nLa stella-bilancia arriverà tra 7 cicli lunari.",
    restartButton: "Compi un altro rito",
    loadingText: "La Dea sta registrando il tuo desiderio nel Libro degli Oracoli...",
    successText: "Il desiderio è stato custodito. La stella-bilancia è in viaggio verso di te.",
    errorTexts: {
      shortWish: "Scrivi un desiderio di almeno 5 caratteri!",
      invalidEmail: "Inserisci un'email valida!",
      genericError: "Si è verificato un errore. Riprova più tardi."
    }
  },
  en: {
    placeholder: "Write your wish here... ✨\n\nThe Blind Goddess hears every word\nwithout judgment, without preference.\nHer scales measure only the intensity\nwith which you deliver it to the universe.",
    button: "🪙 CAST INTO THE SCALES 🪙",
    privacy: "The Goddess is blind: your wish is anonymous and sacred",
    step2Title: "WISH WEIGHED AND ACCEPTED",
    step2Text1: "The Goddess's scales have received your wish.",
    step2Text2: "It has joined the millions of hopes hanging\nfrom the plates of cosmic justice.",
    step2Quote: "Now breathe deeply and feel\nthe counterweight adjusting in the universe.",
    step3Title: "WISH CUSTODY",
    step3Text: "The Goddess offers to keep your wish in the Book of Oaths.\nIn 7 nights, a scale-star will visit you to remind you.",
    emailPlaceholder: "your@email.com",
    acceptButton: "ACCEPT CUSTODY",
    skipButton: "LET IT FLY FREE",
    thankYouTitle: "WISH KEPT!",
    thankYouText: "The Goddess has accepted your offering.\nThe scale-star will arrive in 7 lunar cycles.",
    restartButton: "Perform another rite",
    loadingText: "The Goddess is recording your wish in the Book of Oracles...",
    successText: "The wish has been kept. The scale-star is on its way to you.",
    errorTexts: {
      shortWish: "Write a wish of at least 5 characters!",
      invalidEmail: "Please enter a valid email!",
      genericError: "An error occurred. Please try again later."
    }
  }
};

// ========== FUNZIONI UTILITY ==========
function applyLanguage() {
  const t = texts[lang];
  
  // Header
  if (isItalian) {
    headerEn.classList.add('hidden');
  } else {
    headerIt.classList.add('hidden');
  }
  
  // Testi dinamici
  wishInput.placeholder = t.placeholder;
  throwButton.innerHTML = `<i class="fas fa-circle"></i> ${t.button}`;
  document.querySelector('#step1 p').innerHTML = `<i class="fas fa-eye-slash"></i> ${t.privacy}`;
  
  document.querySelector('#step2 h2').innerHTML = `<i class="fas fa-balance-scale"></i> ${t.step2Title}`;
  document.querySelector('#step2 .gold-text').textContent = t.step2Text1;
  document.querySelectorAll('#step2 p')[1].innerHTML = t.step2Text2.replace(/\n/g, '<br>');
  document.querySelectorAll('#step2 p')[2].innerHTML = `"${t.step2Quote.replace(/\n/g, '<br>')}"`;
  
  document.querySelector('#step3 .offer-title').innerHTML = `<i class="fas fa-book"></i> ${t.step3Title}`;
  document.querySelector('#offer-text').innerHTML = t.step3Text
    .replace('Libro dei Giuramenti', '<span class="purple-text">' + (lang === 'it' ? 'Libro dei Giuramenti' : 'Book of Oaths') + '</span>')
    .replace('stella-bilancia', '<span class="gold-text">' + (lang === 'it' ? 'stella-bilancia' : 'scale-star') + '</span>');
  userEmailInput.placeholder = t.emailPlaceholder;
  submitEmailButton.innerHTML = `<i class="fas fa-scroll"></i> ${t.acceptButton}`;
  skipButton.innerHTML = `<i class="fas fa-feather-alt"></i> ${t.skipButton}`;
  
  // Messaggi di stato
  document.querySelector('#loadingMessage p').textContent = t.loadingText;
  document.querySelector('#successMessage p').textContent = t.successText;
  thankYouMsg.querySelector('h3').innerHTML = `<i class="fas fa-check-circle"></i> ${t.thankYouTitle}`;
  thankYouMsg.querySelector('p').innerHTML = t.thankYouText.replace(/\n/g, '<br>');
  returnHomeButton.innerHTML = `<i class="fas fa-redo"></i> ${t.restartButton}`;
}

function playSound(audioElement, volume = 0.5) {
  if (!audioEnabled) return;
  
  try {
    audioElement.currentTime = 0;
    audioElement.volume = volume;
    audioElement.play().catch(e => console.log("Audio play failed:", e));
  } catch (e) {
    console.log("Sound error:", e);
  }
}

function showMessage(element) {
  element.style.display = 'block';
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);
}

function hideMessage(element) {
  element.style.opacity = '0';
  element.style.transform = 'translate(-50%, -50%) scale(0.9)';
  setTimeout(() => {
    element.style.display = 'none';
  }, 300);
}

function closeMessage() {
  hideMessage(loadingMessage);
  hideMessage(successMessage);
  hideMessage(errorMessage);
}

function showError(message) {
  errorText.textContent = message;
  showMessage(errorMessage);
}

// ========== ANIMAZIONI ==========
function createCoins() {
  for (let i = 0; i < 15; i++) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = Math.random() * 100 + 'vw';
    coin.style.animationDelay = Math.random() * 10 + 's';
    coin.style.animationDuration = (Math.random() * 3 + 2) + 's';
    coinsContainer.appendChild(coin);
  }
}

function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = '-100px';
  document.body.appendChild(star);
  
  star.animate([
    { opacity: 0, transform: 'rotate(45deg) translateX(0)' },
    { opacity: 1, transform: 'rotate(45deg) translateX(0)' },
    { opacity: 0, transform: `rotate(45deg) translateX(${window.innerWidth}px) translateY(${window.innerHeight}px)` }
  ], {
    duration: 3000,
    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
  });
  
  setTimeout(() => star.remove(), 3000);
}

// ========== FLUSSO PRINCIPALE ==========
function throwWish() {
  const wish = wishInput.value.trim();
  const t = texts[lang];
  
  if (wish.length < 5) {
    showError(t.errorTexts.shortWish);
    return;
  }
  
  // Animazione pozzo
  wellImage.style.transform = 'scale(1.1)';
  wellImage.style.transition = 'transform 0.5s ease';
  
  // Suoni
  setTimeout(() => playSound(coinSound, 0.4), 300);
  setTimeout(() => playSound(waterSound, 0.3), 1000);
  playSound(magicSound, 0.2);
  
  // Animazione moneta
  const coin = document.createElement('div');
  coin.className = 'coin';
  coin.style.position = 'fixed';
  coin.style.left = '50%';
  coin.style.top = '50%';
  coin.style.transform = 'translate(-50%, -50%) scale(2)';
  coin.style.animation = 'none';
  coin.style.zIndex = '1000';
  document.body.appendChild(coin);
  
  const wellRect = wellImage.getBoundingClientRect();
  coin.animate([
    { top: '50%', opacity: 1, transform: 'translate(-50%, -50%) scale(2)' },
    { top: wellRect.top + wellRect.height/2 + 'px', opacity: 0.8, transform: 'translate(-50%, -50%) scale(1)' }
  ], {
    duration: 1000,
    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
  });
  
  // Transizione a step2
  setTimeout(() => {
    coin.remove();
    wellImage.style.transform = 'scale(1)';
    
    step1.classList.add('fade-out');
    setTimeout(() => {
      step1.style.display = 'none';
      step2.style.display = 'block';
      
      // Stelle cadenti
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createShootingStar(), i * 800);
      }
      
      // Transizione a step3
      setTimeout(() => {
        step2.classList.add('fade-out');
        setTimeout(() => {
          step2.style.display = 'none';
          step3.style.display = 'block';
          
          // Salva il desiderio in sessionStorage per l'invio successivo
          sessionStorage.setItem('currentWish', wish);
          sessionStorage.setItem('wishLanguage', lang);
          
        }, 800);
      }, 4000);
      
    }, 800);
  }, 1200);
}

// ========== GESTIONE EMAIL ==========
function submitEmail() {
  const email = userEmailInput.value.trim();
  const wish = sessionStorage.getItem('currentWish') || '';
  const t = texts[lang];
  
  if (!email || !email.includes('@') || !email.includes('.')) {
    showError(t.errorTexts.invalidEmail);
    return;
  }
  
  showMessage(loadingMessage);
  
  // Crea form temporaneo per inviare i dati
  const tempForm = document.createElement('form');
  tempForm.method = 'POST';
  tempForm.action = 'https://script.google.com/macros/s/AKfycbw126YUNifMB95tjpfqAgzZrdI40-Ox6KswjyrGvjJkzYYRrnaqHk5mKJnCQG7kXYoW_A/exec';
  tempForm.target = 'hiddenFrame';
  tempForm.style.display = 'none';
  
  // Aggiungi campi
  const fields = [
    { name: 'email', value: email },
    { name: 'wish_text', value: wish },
    { name: 'language', value: lang },
    { name: 'action', value: 'register' },
    { name: 'timestamp', value: new Date().toISOString() }
  ];
  
  fields.forEach(field => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = field.name;
    input.value = field.value;
    tempForm.appendChild(input);
  });
  
  document.body.appendChild(tempForm);
  
  // Invia e gestisci risposta
  setTimeout(() => {
    tempForm.submit();
    
    hideMessage(loadingMessage);
    showMessage(successMessage);
    playSound(successSound, 0.3);
    
    // Nascondi form e mostra messaggio di successo
    document.getElementById('emailForm').style.display = 'none';
    thankYouMsg.classList.remove('hidden');
    
    // Pulisci sessionStorage
    sessionStorage.removeItem('currentWish');
    sessionStorage.removeItem('wishLanguage');
    
  }, 1500);
}

function skipRegistration() {
  const wish = sessionStorage.getItem('currentWish') || '';
  const t = texts[lang];
  
  showMessage(loadingMessage);
  
  // Invia desiderio anonimo
  const tempForm = document.createElement('form');
  tempForm.method = 'POST';
  tempForm.action = 'https://script.google.com/macros/s/AKfycbw126YUNifMB95tjpfqAgzZrdI40-Ox6KswjyrGvjJkzYYRrnaqHk5mKJnCQG7kXYoW_A/exec';
  tempForm.target = 'hiddenFrame';
  tempForm.style.display = 'none';
  
  const fields = [
    { name: 'wish_text', value: wish },
    { name: 'language', value: lang },
    { name: 'action', value: 'anonymous' },
    { name: 'timestamp', value: new Date().toISOString() }
  ];
  
  fields.forEach(field => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = field.name;
    input.value = field.value;
    tempForm.appendChild(input);
  });
  
  document.body.appendChild(tempForm);
  
  setTimeout(() => {
    tempForm.submit();
    hideMessage(loadingMessage);
    
    // Mostra messaggio finale
    document.querySelector('.container').classList.add('fade-out');
    setTimeout(() => {
      document.body.innerHTML = createFinalPage('anonymous');
    }, 800);
  }, 1500);
}

function createFinalPage(type) {
  const t = texts[lang];
  const isRegistered = type === 'registered';
  
  return `
    <div style="text-align: center; padding: 100px 20px; color: white; background: linear-gradient(135deg, #0a0e2a 0%, #1a1f4b 100%); min-height: 100vh;">
      <div style="font-size: 6rem; margin-bottom: 30px; color: #ffd700; animation: float 3s ease-in-out infinite;">
        ${isRegistered ? '⚖️✨' : '🕊️⚖️'}
      </div>
      <h1 style="font-size: 2.5rem; margin-bottom: 30px; color: #ffd700;">
        ${isRegistered 
          ? (lang === 'it' ? 'IL RITO È COMPIUTO' : 'THE RITE IS COMPLETE')
          : (lang === 'it' ? 'LIBERO DI VOLARE' : 'FREE TO FLY')}
      </h1>
      <p style="font-size: 1.3rem; max-width: 600px; margin: 0 auto 40px; line-height: 1.8;">
        ${isRegistered
          ? (lang === 'it' 
            ? 'La Dea Bendata ha ricevuto il tuo desiderio e la tua offerta.<br>Attendi nella quiete la visita della stella-bilancia.' 
            : 'The Blind Goddess has received your wish and your offering.<br>Wait in stillness for the scale-star\'s visit.')
          : (lang === 'it'
            ? 'Il tuo desiderio è stato affidato al vento della bilancia cosmica.<br>Viaggia libero, senza legami, nell\'universo.'
            : 'Your wish has been entrusted to the wind of the cosmic scales.<br>It travels free, unbound, through the universe.')}
      </p>
      <div style="margin-top: 30px; padding: 20px; background: rgba(255, 215, 0, 0.05); border-radius: 10px; max-width: 400px; margin-left: auto; margin-right: auto;">
        <p style="color: #b8a07e; font-size: 0.9rem;">
          ${isRegistered
            ? (lang === 'it' 
              ? 'Il desiderio è custodito nel Libro dei Giuramenti.' 
              : 'The wish is kept in the Book of Oaths.')
            : (lang === 'it'
              ? 'Il desiderio è registrato nel Libro degli Anonimi.'
              : 'The wish is recorded in the Book of the Anonymous.')}
        </p>
      </div>
      <p style="margin-top: 50px;">
        <a href="/" style="color: #d4af37; text-decoration: none; border: 2px solid #d4af37; padding: 15px 30px; border-radius: 10px; display: inline-block; transition: all 0.3s; font-size: 1.1rem;">
          ${lang === 'it' ? '🔁 Compi un altro rito' : '🔁 Perform another rite'}
        </a>
      </p>
    </div>
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
    </style>
  `;
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
  createCoins();
  
  // Contatore caratteri
  wishInput.addEventListener('input', () => {
    charCount.textContent = wishInput.value.length;
  });
  
  // Bottone getta desiderio
  throwButton.addEventListener('click', throwWish);
  
  // Invio con Enter
  wishInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      throwWish();
    }
  });
  
  // Bottone invio email
  submitEmailButton.addEventListener('click', submitEmail);
  
  // Invio email con Enter
  userEmailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitEmail();
    }
  });
  
  // Bottone salta
  skipButton.addEventListener('click', skipRegistration);
  
  // Bottone ricomincia
  returnHomeButton.addEventListener('click', () => {
    location.reload();
  });
  
  // Controllo audio
  audioToggle.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    
    if (audioEnabled) {
      audioToggle.classList.remove('muted');
      audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      ambientMusic.volume = 0.1;
      ambientMusic.play().catch(e => console.log("Ambient music error:", e));
    } else {
      audioToggle.classList.add('muted');
      audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      ambientMusic.pause();
    }
  });
  
  // Stelle cadenti casuali
  setInterval(() => {
    if (Math.random() > 0.7) createShootingStar();
  }, 5000);
  
  // Avvia musica ambientale
  setTimeout(() => {
    if (audioEnabled) {
      ambientMusic.volume = 0.1;
      ambientMusic.play().catch(e => console.log("Ambient music autoplay blocked"));
    }
  }, 1000);
});

// Funzioni globali per i messaggi
window.closeMessage = closeMessage;

// ========== CSS AGGIUNTIVO ==========
const additionalCSS = `
  /* RESPONSIVE */
  @media (max-width: 768px) {
    .container {
      padding: 30px 15px;
      margin: 20px;
      border-radius: 20px;
    }
    
    h1 {
      font-size: 2.2rem;
    }
    
    .well-container {
      width: 250px;
      height: 300px;
    }
    
    .wish-form {
      padding: 20px;
    }
    
    .coin-button {
      padding: 18px 35px;
      font-size: 1.2rem;
    }
    
    .button-group {
      flex-direction: column;
      align-items: center;
    }
    
    .email-input {
      width: 90%;
    }
  }
  
  /* UTILITY */
  .hidden {
    display: none !important;
  }
  
  .gold-text {
    color: #ffd700;
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
  
  .purple-text {
    color: #9400d3;
    text-shadow: 0 0 5px rgba(148, 0, 211, 0.5);
  }
  
  /* PULSANTE AUDIO */
  .audio-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: rgba(255, 215, 0, 0.2);
    border: 2px solid #ffd700;
    border-radius: 50%;
    color: #ffd700;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .audio-toggle:hover {
    background: rgba(255, 215, 0, 0.3);
    transform: scale(1.1);
  }
  
  .audio-toggle.muted {
    opacity: 0.5;
    border-color: #666;
    color: #666;
  }
`;

// Aggiungi CSS aggiuntivo
const styleElement = document.createElement('style');
styleElement.textContent = additionalCSS;
document.head.appendChild(styleElement);