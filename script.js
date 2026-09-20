document.addEventListener('DOMContentLoaded', () => {
    const currentNumberDisplay = document.getElementById('currentNumberDisplay');
    const btnSelanjutnya = document.getElementById('btnSelanjutnya');
    const btnPanggilUlang = document.getElementById('btnPanggilUlang');
    const btnPanggilManual = document.getElementById('btnPanggilManual');
    const manualNumber = document.getElementById('manualNumber');
    const btnReset = document.getElementById('btnReset');
    const currentDateDisplay = document.getElementById('currentDate');

    // setting Local Storage
    const STORAGE_KEY = 'queue_number';
    let currentNumber = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;

    // Today date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = new Date().toLocaleDateString('id-ID', options);

    // Update first time open page
    updateDisplay();

    // formatting for 3 digit number
    function formatNumber(num) {
        if (num === 0) return "000"; // Tampilan awal saat belum ada antrian
        if (num < 10) return '00' + num;
        if (num < 100) return '0' + num;
        return num.toString();
    }

    // update number and save to LocalStorage
    function updateDisplay() {
        const formatted = formatNumber(currentNumber);
        currentNumberDisplay.textContent = formatted;
        localStorage.setItem(STORAGE_KEY, currentNumber);
    }

    // get voices from browser
    let availableVoices = [];
    function loadVoices() {
        availableVoices = window.speechSynthesis.getVoices();
    }
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Text-to-Speech)
    function speak(number) {
        window.speechSynthesis.cancel();

        // add "kosong" for numbers less than 100
        let spokenNumber = "";
        if(number < 10){
            spokenNumber = `kosong kosong ${number}`; // example: kosong kosong satu, kosong kosong dua
        }
        else if (number < 100) {
            spokenNumber = `kosong ${number}`; // example: kosong satu, kosong dua, kosong lima belas
        } else {
            spokenNumber = `${number}`;        // example: seratus dua puluh lima
        }

        const textToSpeak = `Nomor antrian, ${spokenNumber}, o so se yo Taeyang Sung inmida.`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // set to bahasa Indonesia
        utterance.lang = 'id-ID';
        utterance.rate = 0.5; // Speech speed (0.1 - 10)
        utterance.pitch = 1;

        // get voices from browser
        let voices = window.speechSynthesis.getVoices();

        if (voices.length === 0) {
            voices = availableVoices;
        }

        // get bahasa Indonesia TTS for Android & ios
        let idVoice = voices.find(voice =>
            voice.lang === 'id-ID' ||
            voice.lang === 'id_ID' ||
            voice.lang === 'in-ID' ||
            voice.name.includes('Indonesia') ||
            voice.name.includes('Damayanti') || // Voice bahasa Indonesia di iOS/Mac
            voice.name.includes('Andika') ||
            voice.name.includes('Gadis')
        );

        if (idVoice) {
            utterance.voice = idVoice;
        } else {
            console.warn("Suara Indonesia tidak terdeteksi. Menggunakan suara default sistem.");
        }

        window.speechSynthesis.speak(utterance);
    }

    // button "Selanjutnya" add 1 to queue
    btnSelanjutnya.addEventListener('click', () => {
        currentNumber++; // add 1 queue
        updateDisplay();
        speak(currentNumber);
    });

    // button "Panggil Ulang" repeat the current queue number
    btnPanggilUlang.addEventListener('click', () => {
        if (currentNumber > 0) {
            speak(currentNumber);
        } else {
            alert("Belum ada antrian yang dipanggil hari ini.");
        }
    });

    // button "Panggil Manual" call a specific queue number
    btnPanggilManual.addEventListener('click', () => {
        const newNumber = parseInt(manualNumber.value);
        if (!isNaN(newNumber) && newNumber > 0) {
            currentNumber = newNumber;
            updateDisplay();
            speak(currentNumber);
            manualNumber.value = '';
        } else {
            alert("Masukkan nomor dan nama yang valid!");
        }
    });

    // Modal Elements for Reset
    const resetModal = document.getElementById('resetModal');
    const btnCancelReset = document.getElementById('btnCancelReset');
    const btnConfirmReset = document.getElementById('btnConfirmReset');

    // button "Reset" show modal confirmation
    btnReset.addEventListener('click', () => {
        resetModal.classList.add('active');
    });

    // button "Batal" in Modal
    btnCancelReset.addEventListener('click', () => {
        resetModal.classList.remove('active');
    });

    // button "Ya" in Modal
    btnConfirmReset.addEventListener('click', () => {
        currentNumber = 0;
        updateDisplay();
        resetModal.classList.remove('active');
    });
});
