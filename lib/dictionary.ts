
export type LanguageCode =
    | 'English'
    | 'French'
    | 'Spanish'
    | 'Portuguese'
    | 'Italian'
    | 'German'
    | 'Arabic'
    | 'Dutch'
    | 'Turkish'
    | 'Russian'
    | 'Japanese'
    | 'Chinese'
    | 'Hindi'
    | 'Korean';

export const dictionaries = {
    English: {
        hero: {
            cta: "Get in Touch",
            resume: "Resume",
        },
        sections: {
            about: "About Me",
            skills: "Skills",
            services: "Services",
            experience: "Experience",
            projects: "Projects",
            education: "Education",
            certificates: "Certificates",
            languages: "Spoken Languages",
            contact: "Let's Work Together",
            contactDesc: "Have a project in mind? Reach out to me.",
            contactBtn: "Contact Me",
        },
        footer: "Portfolio generated with",
    },
    French: {
        hero: {
            cta: "Contactez-moi",
            resume: "Mon CV",
        },
        sections: {
            about: "À propos",
            skills: "Compétences",
            services: "Services",
            experience: "Expérience",
            projects: "Projets",
            education: "Formation",
            certificates: "Certifications",
            languages: "Langues",
            contact: "Travaillons ensemble",
            contactDesc: "Un projet en tête ? N'hésitez pas à me contacter.",
            contactBtn: "Me contacter",
        },
        footer: "Portfolio généré avec",
    },
    Spanish: {
        hero: {
            cta: "Contáctame",
            resume: "Currículum",
        },
        sections: {
            about: "Sobre mí",
            skills: "Habilidades",
            services: "Servicios",
            experience: "Experiencia",
            projects: "Proyectos",
            education: "Educación",
            certificates: "Certificados",
            languages: "Idiomas",
            contact: "Trabajemos juntos",
            contactDesc: "¿Tienes un proyecto? Ponte en contacto conmigo.",
            contactBtn: "Contactar",
        },
        footer: "Portafolio generado con",
    },
    Arabic: {
        hero: {
            cta: "تواصل معي",
            resume: "السيرة الذاتية",
        },
        sections: {
            about: "عني",
            skills: "المهارات",
            services: "الخدمات",
            experience: "الخبرة",
            projects: "المشاريع",
            education: "التعليم",
            certificates: "الشهادات",
            languages: "اللغات",
            contact: "لنعمل معاً",
            contactDesc: "هل لديك مشروع؟ تواصل معي.",
            contactBtn: "اتصل بي",
        },
        footer: "تم إنشاء المحفظة بواسطة",
    },
    Portuguese: {
        hero: { cta: "Entre em contato", resume: "Currículo" },
        sections: {
            about: "Sobre mim", skills: "Habilidades", services: "Serviços", experience: "Experiência",
            projects: "Projetos", education: "Educação", certificates: "Certificados", languages: "Idiomas",
            contact: "Vamos trabalhar juntos", contactDesc: "Tem um projeto em mente? Entre em contato.", contactBtn: "Contato"
        },
        footer: "Portfólio gerado com",
    },
    Italian: {
        hero: { cta: "Contattami", resume: "Curriculum" },
        sections: {
            about: "Chi sono", skills: "Competenze", services: "Servizi", experience: "Esperienza",
            projects: "Progetti", education: "Formazione", certificates: "Certificazioni", languages: "Lingue",
            contact: "Lavoriamo insieme", contactDesc: "Hai un progetto in mente? Contattami.", contactBtn: "Contatto"
        },
        footer: "Portfolio generato con",
    },
    German: {
        hero: { cta: "Kontaktieren", resume: "Lebenslauf" },
        sections: {
            about: "Über mich", skills: "Fähigkeiten", services: "Dienstleistungen", experience: "Erfahrung",
            projects: "Projekte", education: "Bildung", certificates: "Zertifikate", languages: "Sprachen",
            contact: "Lass uns zusammenarbeiten", contactDesc: "Hast du ein Projekt im Kopf? Melde dich.", contactBtn: "Kontakt"
        },
        footer: "Portfolio erstellt mit",
    },
    Dutch: {
        hero: { cta: "Neem contact op", resume: "CV" },
        sections: {
            about: "Over mij", skills: "Vaardigheden", services: "Diensten", experience: "Ervaring",
            projects: "Projecten", education: "Opleiding", certificates: "Certificaten", languages: "Talen",
            contact: "Laten we samenwerken", contactDesc: "Heb je een project? Neem contact op.", contactBtn: "Contact"
        },
        footer: "Portfolio gegenereerd met",
    },
    Turkish: {
        hero: { cta: "İletişime Geç", resume: "Özgeçmiş" },
        sections: {
            about: "Hakkımda", skills: "Yetenekler", services: "Hizmetler", experience: "Deneyim",
            projects: "Projeler", education: "Eğitim", certificates: "Sertifikalar", languages: "Diller",
            contact: "Birlikte Çalışalım", contactDesc: "Bir projeniz mi var? Bana ulaşın.", contactBtn: "İletişim"
        },
        footer: "Portföy oluşturuldu",
    },
    Russian: {
        hero: { cta: "Связаться", resume: "Резюме" },
        sections: {
            about: "Обо мне", skills: "Навыки", services: "Услуги", experience: "Опыт",
            projects: "Проекты", education: "Образование", certificates: "Сертификаты", languages: "Языки",
            contact: "Давайте работать вместе", contactDesc: "Есть проект? Свяжитесь со мной.", contactBtn: "Контакт"
        },
        footer: "Портфолио создано с помощью",
    },
    Japanese: {
        hero: { cta: "お問い合わせ", resume: "履歴書" },
        sections: {
            about: "自己紹介", skills: "スキル", services: "サービス", experience: "職歴",
            projects: "プロジェクト", education: "学歴", certificates: "資格", languages: "言語",
            contact: "一緒に働きましょう", contactDesc: "プロジェクトのご相談はこちらまで。", contactBtn: "連絡先"
        },
        footer: "ポートフォリオ作成:",
    },
    Chinese: {
        hero: { cta: "联系我", resume: "简历" },
        sections: {
            about: "关于我", skills: "技能", services: "服务", experience: "经验",
            projects: "项目", education: "教育", certificates: "证书", languages: "语言",
            contact: "让我们一起合作", contactDesc: "有项目想法吗？联系我。", contactBtn: "联系"
        },
        footer: "作品集生成于",
    },
    Hindi: {
        hero: { cta: "संपर्क करें", resume: "बायोडाटा" },
        sections: {
            about: "मेरे बारे में", skills: "कौशल", services: "सेवाएं", experience: "अनुभव",
            projects: "परियोजनाएं", education: "शिक्षा", certificates: "प्रमाणपत्र", languages: "भाषाएं",
            contact: "आइए साथ मिलकर काम करें", contactDesc: "क्या आपके पास कोई परियोजना है? मुझसे संपर्क करें।", contactBtn: "संपर्क"
        },
        footer: "पोर्टफोलियो इसके द्वारा बनाया गया",
    },
    Korean: {
        hero: { cta: "문의하기", resume: "이력서" },
        sections: {
            about: "소개", skills: "기술", services: "서비스", experience: "경력",
            projects: "프로젝트", education: "학력", certificates: "자격증", languages: "언어",
            contact: "함께 일합시다", contactDesc: "프로젝트가 있으신가요? 연락주세요.", contactBtn: "연락처"
        },
        footer: "포트폴리오 생성됨:",
    },
    // Add other languages as needed or fallback to English
};

export const getDictionary = (lang: string) => {
    return dictionaries[lang as LanguageCode] || dictionaries.English;
};
