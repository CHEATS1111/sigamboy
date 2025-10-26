export type Language = 'ru' | 'en'

const translations = {
  ru: {
    nav: {
      home: 'Главная',
      features: 'Скачать чит',
      about: 'О нас',
    },
    hero: {
      title: 'Добро пожаловать в',
      brand: 'IDIRENT-CHEATS',
      subtitle: 'Лучшие читы',
      getStarted: 'Скачать чит',
      learnMore: 'О нас',
    },
    features: {
      title: 'Наши',
      brandedTitle: 'Возможности',
      subtitle: 'Всё что нужно для выдающегося опыта',
      lightning: {
        title: 'Молниеносная скорость',
        desc: 'Оптимизировано для производительности с передовыми технологиями.',
      },
      design: {
        title: 'Красивый дизайн',
        desc: 'Современный, адаптивный дизайн, который отлично выглядит на всех устройствах.',
      },
      secure: {
        title: 'Безопасность',
        desc: 'Построено с учётом безопасности, защищая ваши данные.',
      },
      responsive: {
        title: 'Адаптивность',
        desc: 'Работает безупречно на всех устройствах - десктоп, планшет и мобильный.',
      },
      scalable: {
        title: 'Масштабируемость',
        desc: 'Растёт вместе с вашими потребностями, легко справляясь с возросшим трафиком.',
      },
      innovative: {
        title: 'Инновации',
        desc: 'Построено на новейших технологиях и постоянно обновляется новыми функциями.',
      },
    },
    about: {
      title: 'О',
      brandedTitle: 'Нас',
      desc1: 'Мы увлечены созданием цифровых решений, которые захватывают и вдохновляют. Наша команда сочетает креативность с технической экспертизой для доставки решений, которые выделяются.',
      desc2: 'С многолетним опытом в веб-разработке и дизайне, мы специализируемся на создании современных, адаптивных сайтов, которые не только отлично выглядят, но и работают исключительно хорошо.',
      mission: 'Наша миссия',
      missionDesc: 'Доставлять выдающиеся цифровые решения, которые приносят результаты и превосходят ожидания',
      modern: 'Современный дизайн',
      performance: 'Высокая производительность',
      focused: 'Ориентация на пользователя',
    },
    footer: {
      brand: 'IDERENT-CHEATS',
      desc: 'Лучшие чит клиенты на данный момент',
      quickLinks: 'Быстрые ссылки',
      connect: 'Связаться',
      copyright: 'Все права защищены.',
      terms: 'Условия соглашения',
    },
    terms: {
      title: 'Условия использования',
      disclaimer: 'Заходя на сайт мы не несём ни какой ответсвенности за действия сайта',
      content: 'Используя данный сайт, вы соглашаетесь с условиями использования. Мы не несём ответственности за ваши действия.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      features: 'Download cheat',
      about: 'About',
    },
    hero: {
      title: 'Welcome to',
      brand: 'IDIRENT-CHEATS',
      subtitle: 'Best cheats',
      getStarted: 'Download cheat',
      learnMore: 'About Us',
    },
    features: {
      title: 'Our',
      brandedTitle: 'Features',
      subtitle: 'Everything you need for amazing experiences',
      lightning: {
        title: 'Lightning Fast',
        desc: 'Optimized for performance with cutting-edge technology and best practices.',
      },
      design: {
        title: 'Beautiful Design',
        desc: 'Modern, responsive design that looks great on all devices and screen sizes.',
      },
      secure: {
        title: 'Secure',
        desc: 'Built with security in mind, keeping your data safe and protected.',
      },
      responsive: {
        title: 'Responsive',
        desc: 'Works seamlessly across all devices - desktop, tablet, and mobile.',
      },
      scalable: {
        title: 'Scalable',
        desc: 'Grows with your needs, handling increased traffic and users effortlessly.',
      },
      innovative: {
        title: 'Innovative',
        desc: 'Built with the latest technologies and constantly updated with new features.',
      },
    },
    about: {
      title: 'About',
      brandedTitle: 'Us',
      desc1: 'We are passionate about creating digital experiences that captivate and inspire. Our team combines creativity with technical expertise to deliver solutions that stand out from the crowd.',
      desc2: 'With years of experience in web development and design, we specialize in building modern, responsive websites that not only look great but also perform exceptionally well.',
      mission: 'Our Mission',
      missionDesc: 'To deliver exceptional digital experiences that drive results and exceed expectations',
      modern: 'Modern Design',
      performance: 'High Performance',
      focused: 'User Focused',
    },
    footer: {
      brand: 'IDERENT-CHEATS',
      desc: 'Best cheat clients available',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      copyright: 'All rights reserved.',
      terms: 'Terms of Agreement',
    },
    terms: {
      title: 'Terms of Use',
      disclaimer: 'By accessing this site, we do not bear any responsibility for the actions of the site',
      content: 'By using this site, you agree to the terms of use. We are not responsible for your actions.',
    },
  },
}

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('ru') ? 'ru' : 'en'
}

export function getTranslations(lang: Language) {
  return translations[lang]
}

export const t = translations

