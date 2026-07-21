document.addEventListener('DOMContentLoaded', () => {
    // Referensi ke elemen-elemen HTML
    const currentNumberDisplay = document.getElementById('currentNumberDisplay');
    const btnSelanjutnya = document.getElementById('btnSelanjutnya');
    const btnPanggilUlang = document.getElementById('btnPanggilUlang');
    const btnPanggilManual = document.getElementById('btnPanggilManual');
    const inputManual = document.getElementById('inputManual');
    const btnReset = document.getElementById('btnReset');
    const currentDateDisplay = document.getElementById('currentDate');

    // Menyiapkan penyimpanan lokal (Local Storage)
    const STORAGE_KEY = 'puskesmas_antrian_number';
    let currentNumber = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;

    // Menampilkan tanggal hari ini
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = new Date().toLocaleDateString('id-ID', options);

    // Update tampilan awal saat pertama kali dibuka
    updateDisplay();

    // Fungsi pembantu: Menyesuaikan tampilan dengan suara (hanya tambah satu '0' jika < 100)
    function formatNumber(num) {
        if (num === 0) return "000"; // Tampilan awal saat belum ada antrian
        if (num < 100) return '0' + num;
        return num.toString();
    }

    // Fungsi pembantu: Update angka di layar dan simpan ke LocalStorage
    function updateDisplay() {
        const formatted = formatNumber(currentNumber);
        currentNumberDisplay.textContent = formatted;
        localStorage.setItem(STORAGE_KEY, currentNumber);
    }

    // Global penampung suara (voices) agar bisa di-load sempurna
    let availableVoices = [];
    function loadVoices() {
        availableVoices = window.speechSynthesis.getVoices();
    }
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Fungsi Utama: Mengubah Teks menjadi Suara (Text-to-Speech)
    function speak(number) {
        window.speechSynthesis.cancel();

        // Menentukan cara membaca agar "kosong" (nol di depan) juga disebut,
        // tapi angka puluhan/ratusan tetap dibaca secara natural.
        // Sesuai request: Jika angka masih satuan (1-9) atau puluhan (10-99), sebut "kosong" 1 kali saja
        let spokenNumber = "";
        if (number < 100) {
            spokenNumber = `kosong ${number}`; // contoh: kosong satu, kosong dua, kosong lima belas
        } else {
            spokenNumber = `${number}`;        // contoh: seratus dua puluh lima
        }

        const textToSpeak = `Nomor antrian, ${spokenNumber}, silakan menuju loket pendaftaran.`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // Paksa ke Bahasa Indonesia
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        // Ambil daftar suara terbaru dari browser
        let voices = window.speechSynthesis.getVoices();

        // Jika masih kosong, pakai availableVoices dari atas
        if (voices.length === 0) {
            voices = availableVoices;
        }

        // Mencari suara yang PASTI berbahasa Indonesia (dukungan untuk Android & iOS)
        let idVoice = voices.find(voice =>
            voice.lang === 'id-ID' ||
            voice.lang === 'id_ID' ||
            voice.lang === 'in-ID' ||
            voice.name.includes('Indonesia') ||
            voice.name.includes('Damayanti') || // Suara bahasa Indonesia di iOS/Mac
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

    // Event Listener: Jika tombol "Panggil Selanjutnya" diklik
    btnSelanjutnya.addEventListener('click', () => {
        currentNumber++; // Tambah angka 1
        updateDisplay();
        speak(currentNumber);
    });

    // Event Listener: Jika tombol "Panggil Ulang" diklik
    btnPanggilUlang.addEventListener('click', () => {
        if (currentNumber > 0) {
            speak(currentNumber);
        } else {
            alert("Belum ada antrian yang dipanggil hari ini.");
        }
    });

    // Event Listener: Jika tombol panggil manual diklik
    btnPanggilManual.addEventListener('click', () => {
        const val = parseInt(inputManual.value);
        if (!isNaN(val) && val > 0) {
            currentNumber = val; // Set antrian ke angka yang diketik
            updateDisplay();
            speak(currentNumber);
            inputManual.value = ''; // Kosongkan kotak input setelah dipanggil
        } else {
            alert("Masukkan nomor antrian yang valid!");
        }
    });

    // Modal Elements untuk Reset
    const resetModal = document.getElementById('resetModal');
    const btnCancelReset = document.getElementById('btnCancelReset');
    const btnConfirmReset = document.getElementById('btnConfirmReset');

    // Event Listener: Jika tombol reset diklik (tampilkan modal custom)
    btnReset.addEventListener('click', () => {
        resetModal.classList.add('active');
    });

    // Tombol Batal di Modal
    btnCancelReset.addEventListener('click', () => {
        resetModal.classList.remove('active');
    });

    // Tombol Ya di Modal
    btnConfirmReset.addEventListener('click', () => {
        currentNumber = 0;
        updateDisplay();
        resetModal.classList.remove('active');
    });

    // (Logika pemuatan suara dipindah ke atas)
});
