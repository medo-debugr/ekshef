// روابط الصور
const uniqueCards = [
    'https://i.postimg.cc/qMkBGqDj/gpt1732802836469.png',
    'https://i.postimg.cc/kGN4gt1t/gpt1732802738661.png',
    'https://i.postimg.cc/kgT2SKnQ/gpt1732802701359.png',
    'https://i.postimg.cc/fRz3kBhW/gpt1732802656444.png',
];

const duplicateCards = Array(28).fill('https://i.postimg.cc/nhT38P84/gpt1732802399621.png');

// دمج الأوراق
const fullDeck = [...uniqueCards, ...duplicateCards];

// اختيار أوراق عشوائية
function shuffleDeck() {
    const selectedUniqueCount = Math.floor(Math.random() * 3) + 1; // اختر 1 أو 2 أو 3 ورقات من الـ 4 أوراق المميزة
    const selectedUnique = uniqueCards.sort(() => 0.5 - Math.random()).slice(0, selectedUniqueCount); // ورقة أو أكثر من الـ 4

    const remainingCards = duplicateCards.sort(() => 0.5 - Math.random()).slice(0, 8 - selectedUniqueCount); // بقية الأوراق من الـ28

    return [...selectedUnique, ...remainingCards].sort(() => 0.5 - Math.random()); // دمج وترتيب عشوائي
}

// عرض الأوراق على الشاشة
function displayCards(cards) {
    const deckElement = document.querySelector('.deck');
    deckElement.innerHTML = ''; // تفريغ المحتوى القديم
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.backgroundImage = `url(${card})`;
        cardElement.dataset.image = card; // تخزين الصورة في البيانات
        deckElement.appendChild(cardElement);
    });
}

// إضافة ورقة إلى القائمة
function addToPlayedCards(cardImage) {
    const playedCardsContainer = document.getElementById('played-cards');
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${cardImage})`;
    playedCardsContainer.appendChild(cardElement);
}

// تشغيل صوت الإنذار لمدة 3 ثوانٍ
function playAlarmSound() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0; // إعادة الصوت من البداية
    }, 3000);
}

// عند الضغط على زر "ابدأ اللعب"
document.getElementById('start-game').addEventListener('click', () => {
    const selectedCards = shuffleDeck();
    displayCards(selectedCards);
    document.getElementById('start-game').style.display = 'none'; // إخفاء الزر
});

// عند النقر على ورقة
document.querySelector('.deck').addEventListener('click', (event) => {
    if (event.target.classList.contains('card')) {
        const cardImage = event.target.dataset.image;
        addToPlayedCards(cardImage);
        event.target.style.visibility = 'hidden'; // إخفاء الورقة
    }
});

// فتح/إغلاق القائمة
document.getElementById('toggle-played-cards').addEventListener('click', () => {
    const playedCards = document.getElementById('played-cards');
    playedCards.classList.toggle('active');
});

// عند الضغط على الزر الأحمر "اكشف"
document.getElementById('evil-button').addEventListener('click', playAlarmSound);