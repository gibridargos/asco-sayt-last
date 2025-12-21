// ishonch.js — Faqat "Bizga ishoning" sahifasi uchun tarjimalar
const trustTranslations = {
    uz: {
        trustPageTitle: "Bizga ishoning - Senera",
        trustTitle: "Bizga ishoning",
        trustIntro: "Yuzlab kompaniyalar va tadbirkorlar Senera ga o‘z bizneslarining xuquqiy va buxgalteriya masalalarini ishonib topshirishmoqda. Bizning hamkorlarimiz va mijozlarimizning fikrlari — eng yaxshi isbot.",
        partnersTitle: "Bizning hamkorlarimiz",
        partner1: "Hamkor kompaniya 1",
        partner1Desc: "IT sohasida yetakchi korxona",
        partner2: "Hamkor kompaniya 2",
        partner2Desc: "Qurilish va loyihalar",
        partner3: "Hamkor kompaniya 3",
        partner3Desc: "Savdo va logistika",
        partner4: "Hamkor kompaniya 4",
        partner4Desc: "Ishlab chiqarish",
        partner5: "Hamkor kompaniya 5",
        partner5Desc: "Xizmat ko'rsatish",
        partner6: "Hamkor kompaniya 6",
        partner6Desc: "Moliya va investitsiya",
        testimonialsTitle: "Mijozlarimiz fikri",
        testimonial1: "Senera jamoasi bizning kompaniyamizni ro'yxatdan o'tkazish va buxgalteriya masalalarida katta yordam berdi. Tezkor va professional!",
        client1: "Azizbek M. — IT kompaniyasi direktori",
        testimonial2: "Yuridik maslahatlar va soliq hisobotlari uchun eng yaxshi tanlov. Tavsiya qilaman!",
        client2: "Dilnoza K. — Savdo korxonasi egasi",
        testimonial3: "Xorijiy investorlar bilan ishlaganda Senera ning yordami bebaho bo'ldi.",
        client3: "Jamshid R. — Qo'shma korxona rahbari",
        trustStatsTitle: "Nega bizga ishonishadi?",
        clientsDesc: "Doimiy mijozlar",
        partnersCountDesc: "Hamkor tashkilotlar",
        successRateDesc: "Muvaffaqiyatli loyihalar"
    },
    ru: {
        trustPageTitle: "Нам доверяют - Senera",
        trustTitle: "Нам доверяют",
        trustIntro: "Сотни компаний и предпринимателей доверяют Senera решение юридических и бухгалтерских вопросов своего бизнеса. Отзывы наших партнеров и клиентов — лучшее доказательство.",
        partnersTitle: "Наши партнеры",
        partner1: "Партнерская компания 1",
        partner1Desc: "Ведущая компания в IT-сфере",
        partner2: "Партнерская компания 2",
        partner2Desc: "Строительство и проекты",
        partner3: "Партнерская компания 3",
        partner3Desc: "Торговля и логистика",
        partner4: "Партнерская компания 4",
        partner4Desc: "Производство",
        partner5: "Партнерская компания 5",
        partner5Desc: "Сфера услуг",
        partner6: "Партнерская компания 6",
        partner6Desc: "Финансы и инвестиции",
        testimonialsTitle: "Отзывы клиентов",
        testimonial1: "Команда Senera оказала огромную помощь в регистрации компании и бухгалтерских вопросах. Быстро и профессионально!",
        client1: "Азизбек М. — Директор IT-компании",
        testimonial2: "Лучший выбор для юридических консультаций и налоговой отчетности. Рекомендую!",
        client2: "Дилноза К. — Владелец торговой компании",
        testimonial3: "Помощь Senera была неоценима при работе с иностранными инвесторами.",
        client3: "Жамшид Р. — Руководитель совместного предприятия",
        trustStatsTitle: "Почему нам доверяют?",
        clientsDesc: "Постоянные клиенты",
        partnersCountDesc: "Партнерских организаций",
        successRateDesc: "Успешно завершенных проектов"
    },
    en: {
        trustPageTitle: "They Trust Us - Senera",
        trustTitle: "They Trust Us",
        trustIntro: "Hundreds of companies and entrepreneurs trust Senera with legal and accounting matters of their business. Feedback from our partners and clients is the best proof.",
        partnersTitle: "Our Partners",
        partner1: "Partner Company 1",
        partner1Desc: "Leading company in IT sector",
        partner2: "Partner Company 2",
        partner2Desc: "Construction and projects",
        partner3: "Partner Company 3",
        partner3Desc: "Trade and logistics",
        partner4: "Partner Company 4",
        partner4Desc: "Manufacturing",
        partner5: "Partner Company 5",
        partner5Desc: "Service sector",
        partner6: "Partner Company 6",
        partner6Desc: "Finance and investment",
        testimonialsTitle: "Client Testimonials",
        testimonial1: "The Senera team provided great help in company registration and accounting matters. Fast and professional!",
        client1: "Azizbek M. — Director of IT Company",
        testimonial2: "The best choice for legal advice and tax reporting. Highly recommend!",
        client2: "Dilnoza K. — Owner of trading company",
        testimonial3: "Senera’s assistance was invaluable when working with foreign investors.",
        client3: "Jamshid R. — Head of joint venture",
        trustStatsTitle: "Why they trust us",
        clientsDesc: "Regular clients",
        partnersCountDesc: "Partner organizations",
        successRateDesc: "Successfully completed projects"
    }
};

function updateTrustLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = trustTranslations[lang][key];
        if (text !== undefined) {
            el.textContent = text;
        }
    });

    if (trustTranslations[lang].trustPageTitle) {
        document.title = trustTranslations[lang].trustPageTitle;
    }

    document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        const savedLang = localStorage.getItem('selectedLanguage') || 'uz';
        langSelect.value = savedLang;
        updateTrustLanguage(savedLang);

        langSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('selectedLanguage', newLang);
            updateTrustLanguage(newLang);
        });
    } else {
        updateTrustLanguage('uz');
    }
});