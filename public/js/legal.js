// legal.js — Faqat "Xuquqiy yordam" sahifasi uchun tarjima
const legalTranslations = {
    uz: {
        legalPageTitle: "Xuquqiy yordam - Senera",
        legalTitle: "Xuquqiy yordam",
        legalIntro: "Bizning yuqori malakali yuristlarimiz sizning biznesingizni huquqiy jihatdan to‘liq himoya qiladi va rivojlantirishda yordam beradi.",
        service1Title: "Yuridik shaxsni O‘zbekiston Respublikasi hududida ro‘yxatdan o‘tkazish bilan bog‘liq yuridik maslahat",
        service1Price: "2 000 000 so‘mdan boshlab",
        service2Title: "Yangi ro‘yxatdan o‘tkazilayotgan korxonaning firmaviy nomini rezerv qilish",
        service2Price: "3 000 000 so‘mdan boshlab",
        service3Title: "Ro‘yxatdan o‘tkazilayotgan yuridik shaxs uchun ta’sis hujjatlarini ishlab chiqish",
        service3Price: "5 000 000 so‘mdan boshlab",
        service4Title: "IT-Parkda yuridik shaxslar uchun ariza va biznes-reja tayyorlash bo‘yicha konsalting",
        service4Price: "6 000 000 so‘mdan boshlab",
        service5Title: "Korxona xo‘jalik faoliyati bilan bog‘liq turli masalalar bo‘yicha yuridik maslahat",
        service5Price: "500 000 so‘mdan boshlab",
        service6Title: "Shartnomalar, protokollar va ta’sischilar qarorlarini ishlab chiqish va ekspertizasi",
        service6Price: "1 000 000 so‘mdan boshlab",
        service7Title: "Loyiha va turli bitimlarni, shu jumladan notarial shartnomalarni yuridik kuzatuv",
        service7Price: "1 500 000 so‘mdan boshlab",
        service8Title: "Qo'shimcha xizmat 1",
        service8Price: "2 000 000 so‘mdan boshlab",
        service9Title: "Qo'shimcha xizmat 2",
        service9Price: "5 000 000 so‘mdan boshlab",
        consultBtn: "Maslahat olish"
    },
    ru: {
        legalPageTitle: "Юридическая помощь - Senera",
        legalTitle: "Юридическая помощь",
        legalIntro: "Наши высококвалифицированные юристы полностью защищают и помогают развивать ваш бизнес с юридической стороны.",
        service1Title: "Юридическая консультация, связанная с регистрацией юридического лица на территории Республики Узбекистан",
        service1Price: "от 2 000 000 сум",
        service2Title: "Резервирование фирменного наименования вновь регистрируемого предприятия",
        service2Price: "от 3 000 000 сум",
        service3Title: "Разработка учредительных документов для регистрируемого юридического лица",
        service3Price: "от 5 000 000 сум",
        service4Title: "Консалтинговые услуги по подготовке/подачи заявки и бизнес-плана в IT-Парк юридических лиц",
        service4Price: "от 6 000 000 сум",
        service5Title: "Юридические консультации по различным вопросам хозяйственной деятельности предприятия",
        service5Price: "от 500 000 сум",
        service6Title: "Разработка и экспертиза договоров, протоколов и решений учредителей и т.д.",
        service6Price: "от 1 000 000 сум",
        service7Title: "Юридическое сопровождение проектов, различных сделок в том числе и в нотариальных контрах",
        service7Price: "от 1 500 000 сум",
        service8Title: "Дополнительная услуга 1",
        service8Price: "от 2 000 000 сум",
        service9Title: "Дополнительная услуга 2",
        service9Price: "от 5 000 000 сум",
        consultBtn: "Получить консультацию"
    },
    en: {
        legalPageTitle: "Legal Assistance - Senera",
        legalTitle: "Legal Assistance",
        legalIntro: "Our highly qualified lawyers fully protect and help develop your business from a legal perspective.",
        service1Title: "Legal consultation related to registration of a legal entity in the Republic of Uzbekistan",
        service1Price: "from 2,000,000 UZS",
        service2Title: "Reservation of the company name for a newly registered enterprise",
        service2Price: "from 3,000,000 UZS",
        service3Title: "Development of constituent documents for the registered legal entity",
        service3Price: "from 5,000,000 UZS",
        service4Title: "Consulting services for preparation/submission of application and business plan to IT-Park for legal entities",
        service4Price: "from 6,000,000 UZS",
        service5Title: "Legal consultations on various issues of enterprise economic activity",
        service5Price: "from 500,000 UZS",
        service6Title: "Development and examination of contracts, protocols and founders' decisions, etc.",
        service6Price: "from 1,000,000 UZS",
        service7Title: "Legal support of projects, various transactions including notary contracts",
        service7Price: "from 1,500,000 UZS",
        service8Title: "Additional service 1",
        service8Price: "from 2,000,000 UZS",
        service9Title: "Additional service 2",
        service9Price: "from 5,000,000 UZS",
        consultBtn: "Get Consultation"
    }
};

function updateLegalLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = legalTranslations[lang][key];
        if (text !== undefined) {
            el.textContent = text; // innerHTML o'rniga textContent — xavfsizroq
        }
    });

    if (legalTranslations[lang].legalPageTitle) {
        document.title = legalTranslations[lang].legalPageTitle;
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'uz' || lang === 'ru') ? 'ltr' : 'ltr'; // kerak bo'lsa o'zgartirish mumkin
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        const savedLang = localStorage.getItem('selectedLanguage') || 'uz';
        langSelect.value = savedLang;
        updateLegalLanguage(savedLang);

        langSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('selectedLanguage', newLang);
            updateLegalLanguage(newLang);
        });
    } else {
        updateLegalLanguage('uz');
    }
});