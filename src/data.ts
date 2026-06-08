export interface Project {
  id: string;
  titleEn: string;
  titleRu: string;
  descEn: string;
  descRu: string;
  detailsEn: string[];
  detailsRu: string[];
  tags: string[];
  category: 'all' | 'backend' | 'devops' | 'automation' | 'frontend';
  link?: string;
  github?: string;
}

export interface SkillCategory {
  id: string;
  titleEn: string;
  titleRu: string;
  skills: { name: string; level: number; info?: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "sudroom",
    titleEn: "Sudroom",
    titleRu: "Sudroom",
    descEn: "Premium Turkish cotton bedding builder and order management platform with a lightning-fast Go backend.",
    descRu: "Приложение заказа премиального постельного белья из турецкого хлопка со сложным интерактивным конструктором комплектов и быстрым бэкендом на Go.",
    detailsEn: [
      "Designed and implemented high-performance Go-based backend services.",
      "Engineered an interactive 3D/2D visual configuration constructor for customized bedding materials.",
      "Optimized query performance and checkout workflows for highly concurrent traffic."
    ],
    detailsRu: [
      "Разработал и внедрил высокопроизводительный бэкенд на языке Go.",
      "Создал интерактивный визуальный конструктор комплектов белья с выбором тканей и размеров.",
      "Оптимизировал скорость загрузки страниц и систему оформления заказов под высокие нагрузки."
    ],
    tags: ["Go", "Vite", "Tailwind CSS", "REST API", "Docker"],
    category: "backend",
    link: "https://sudroom.ru"
  },
  {
    id: "hunterhouse",
    titleEn: "Hunter House Arkhyz",
    titleRu: "Hunter House Архыз",
    descEn: "Clean, SEO-optimized booking site for a luxury Arkhyz guest house featuring custom automated sitemap/robots engines in Go.",
    descRu: "Сайт бронирования охотничьего гостевого дома в Архызе. Реализованы адаптивная верстка, SEO-оптимизация, автоматические генераторы в бэкенде на Go.",
    detailsEn: [
      "Created fully responsive frontend with precise typography matching industrial elements.",
      "Programmed self-generating SEO pipelines (sitemaps, robot metadata controllers) built in Go.",
      "Engineered an elegant lead-capture backend notifying administrators instantly via Telegram integrations."
    ],
    detailsRu: [
      "Создал полностью адаптивную верстку с аккуратным минималистичным визуалом.",
      "Написал автоматический генератор обновляемых sitemaps и robots.txt на Go.",
      "Разработал бэкенд сбора заявок с мгновенным информированием администрации через Telegram-интеграцию."
    ],
    tags: ["Go", "SEO Optimization", "Telegram Bot API", "Responsive Web", "Linux"],
    category: "frontend",
    link: "https://hunterhousehotel.ru"
  },
  {
    id: "wbsorter",
    titleEn: "WB Sorter Automatic Agent",
    titleRu: "Wb sorter (Бот-автоловщик)",
    descEn: "Autonomous Wildberries seller residue catcher with Playwright, continuous background monitoring, and lightning action execution.",
    descRu: "Бот для автоловли заявок на перенос остатков в личном кабинете продавца Wildberries. Использует автоматизацию браузера с помощью Playwright.",
    detailsEn: [
      "Engineered Chromium-headless automation framework with advanced anti-detection profiling.",
      "Implemented a 24/7 scanning cycle with instant feedback routing to prevent inventory locks.",
      "Created logging channels and control panels to track successful transfer capture rates."
    ],
    detailsRu: [
      "Спроектировал систему браузерной автоматизации с защитой от алгоритмов детекции ботов.",
      "Реализовал круглосуточный цикл сканирования кабинета WB с мгновенной скоростью реакции (до 150мс).",
      "Организовал отчетные каналы логирования в Telegram для оперативного отслеживания перенесенного товара."
    ],
    tags: ["Python", "Playwright", "Automation", "Docker", "Headless Chrome"],
    category: "automation",
    github: "https://github.com/Mizgr"
  },
  {
    id: "tgparser",
    titleEn: "TGParser Engine",
    titleRu: "TGParser (Парсер Telegram)",
    descEn: "High-performance Telegram crawler and channel forwarding tool built in Go with state persistence and rules filtering.",
    descRu: "Высокопроизводительный парсер Telegram-каналов на Go. Обеспечивает сбор, контентную фильтрацию и автоперенаправление в реальном времени.",
    detailsEn: [
      "Engineered multi-threaded Go routine parser to stream incoming channel messages concurrently.",
      "Built rigorous pattern matcher filtering posts by regex criteria, content type, or media status.",
      "Designed file-based credentials/session keeper allowing smooth background persistence."
    ],
    detailsRu: [
      "Написал многопоточный парсер на Go для параллельного обслуживания сотен Telegram-сообществ в реальном времени.",
      "Реализовал гибкие регулярные выражения (regex) и текстовые анализаторы для продвинутой фильтрации спама.",
      "Интегрировал безопасный менеджер сессий аккаунтов (session persistence) с шифрованием кэша."
    ],
    tags: ["Go", "Telegram Database Library", "Concurrency", "Regular Expressions", "DevOps"],
    category: "backend",
    github: "https://github.com/Mizgr"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    id: "devops",
    titleEn: "DevOps & Security",
    titleRu: "DevOps и Безопасность",
    skills: [
      { name: "Docker & Docker Compose", level: 95, info: "Containerization, absolute isolation & complex service bridging" },
      { name: "CI/CD Pipelines", level: 88, info: "Automating testing, secure packing, and remote deploy rollouts" },
      { name: "Linux System Administration", level: 90, info: "Uptime monitoring, bash utility scripting, process management" },
      { name: "Nginx & Reverse Proxies", level: 85, info: "Load balancing, SSL configuration, rate-limiting & router rules" },
      { name: "DevSecOps Auditing", level: 82, info: "Code scanning, security policy configuration, container shield protection" }
    ]
  },
  {
    id: "backend",
    titleEn: "Backend Development",
    titleRu: "Бэкенд разработка",
    skills: [
      { name: "Go (Golang)", level: 92, info: "Highly concurrent routines, REST APIs, net/http native engineering" },
      { name: "Python / FastAPI", level: 88, info: "Asynchronous backend APIs, automated tools, microservice design" },
      { name: "Relational Databases", level: 85, info: "PostgreSQL, Gorm, SQLite, complex subqueries, indexing" },
      { name: "In-Memory Stores (Redis)", level: 80, info: "Fast caching, session tracking, messaging queues" },
      { name: "Architecture & API", level: 90, info: "Clean architecture foundations, SOLID principles, RESTful standard" }
    ]
  },
  {
    id: "automation",
    titleEn: "Automation & Scraping",
    titleRu: "Автоматизация и Парсинг",
    skills: [
      { name: "Playwright Automation", level: 94, info: "Dynamic browser workflows, Chromium/WebKit handling, selectors" },
      { name: "Anti-Detect Scraping", level: 87, info: "Bypassing cloudflare limits, custom headers, human-like activity simulation" },
      { name: "Telegram Bot API", level: 90, info: "High performance interactions, inline interfaces, rich-media updates" },
      { name: "Web Scrapers & Crawlers", level: 89, info: "High-volume data collection, state retention, asynchronous parsers" }
    ]
  },
  {
    id: "frontend",
    titleEn: "Frontend & UI Design",
    titleRu: "Фронтенд и Интерфейс",
    skills: [
      { name: "HTML5 / CSS3 / ES6", level: 85, info: "Semantic markups, modern layouts, robust modular JavaScript" },
      { name: "TypeScript", level: 80, info: "Strict type-safe React structures, type mapping, clean code guidelines" },
      { name: "Tailwind CSS", level: 90, info: "Utility-first clean themes, spacing rhythms, absolute responsiveness" },
      { name: "Vite & React", level: 82, info: "Fast bundling, functional hooks framework, component modularly" }
    ]
  }
];

export const TRANSLATIONS = {
  en: {
    navHome: "Home",
    navProjects: "Projects",
    navSkills: "Expertise",
    navContact: "Contact",
    role: "Go & Python Backend & DevOps Engineer",
    shortAbout: "I build high-performance backend systems in Go and Python, architect robust automated workflows with Playwright, configure Docker environments, and implement reliable DevOps practices tailored for business needs.",
    viewProjects: "View Projects",
    contactMe: "Get in Touch",
    projectsHeader: "SELECTED WORK",
    projectsSub: "Sleek backend architectures, automated web scrapers, and high-performance booking engines.",
    filterAll: "ALL WORK",
    filterBackend: "BACKEND GO/PYTHON",
    filterFrontend: "WEB APPLICATIONS",
    filterAutomation: "AUTOMATION & BOT",
    stackHeader: "PROFESSIONAL EXPERTISE",
    stackSub: "A robust technical stack focused on automation, reliability, and container security.",
    contactHeader: "LET'S WORK TOGETHER",
    contactSub: "Have a project request, consultation query, or looking to automate your workflow? Drop me a line.",
    formName: "YOUR NAME",
    formEmail: "YOUR EMAIL",
    formSubject: "SUBJECT",
    formMessage: "MESSAGE",
    formSubmit: "SEND MESSAGE",
    formSubmitting: "SENDING MESSAGE...",
    formSuccessTitle: "MESSAGE RECEIVED",
    formSuccessDesc: "Your message has been logged in the real-time client ledger database below.",
    terminalTitle: "mizgr.io:~",
    contactMethodHeader: "DIRECT CHANNELS",
    githubTitle: "GITHUB PROFILE",
    telegramTitle: "TELEGRAM CHAT",
    footerText: "High-performance backend engineering and robust system automation. Crafted with precision and minimalist aesthetics.",
    langLabel: "LANGUAGE",
    categoryLabel: "Category",
    linkText: "Launch Application",
    repoText: "View Source Code",
    sentMessagesTitle: "LIVE DEMO DATABASE",
    sentMessagesSubtitle: "This live section demonstrates real-time client side persistence. Your message is immediately committed below.",
    ledgerEmpty: "No messages committed in this session yet. Submit the form above to test real-time logging.",
    statusLabel: "STATUS",
    timestampLabel: "TIME_STAMP",
    viewDetails: "View Details",
    hideDetails: "Hide Details",
    pipelineStatus: "SYSTEM: STABLE",
    dockerImg: "docker pull mizgr/inbox:latest",
    quoteText: "Eliminating operational friction through clean, robust automation."
  },
  ru: {
    navHome: "Главная",
    navProjects: "Проекты",
    navSkills: "Навыки",
    navContact: "Контакты",
    role: "Go / Python Backend & DevOps Разработчик",
    shortAbout: "Я разрабатываю надежные бэкенд-системы на языках Go и Python, проектирую автоматизацию веб-процессов с использованием Playwright, настраиваю надежные Docker-окружения и внедряю лучшие практики DevOps для бизнеса.",
    viewProjects: "Проекты",
    contactMe: "Связаться со мной",
    projectsHeader: "ИЗБРАННЫЕ РАБОТЫ",
    projectsSub: "Отказоустойчивые бэкенд-системы, автоматизированные парсеры и веб-сервисы.",
    filterAll: "ВСЕ РАБОТЫ",
    filterBackend: "БЭКЕНД GO/PYTHON",
    filterFrontend: "ВЕБ-ПРИЛОЖЕНИЯ",
    filterAutomation: "АВТОМАТИЗАЦИЯ И БОТЫ",
    stackHeader: "ПРОФЕССИОНАЛЬНЫЙ СТЕК",
    stackSub: "Инструменты и технологии для стабильной работы бэкенд-решений и автоматизации.",
    contactHeader: "ДАВАЙТЕ СОТРУДНИЧАТЬ",
    contactSub: "Нужна автоматизация, бэкенд на Go/Python или настройка инфраструктуры? Напишите мне.",
    formName: "ВАШЕ ИМЯ",
    formEmail: "ВАШ EMAIL",
    formSubject: "ТЕМА",
    formMessage: "СООБЩЕНИЕ",
    formSubmit: "ОТПРАВИТЬ СООБЩЕНИЕ",
    formSubmitting: "ОТПРАВКА...",
    formSuccessTitle: "СООБЩЕНИЕ ПОЛУЧЕНО",
    formSuccessDesc: "Ваше сообщение зафиксировано в реестре базы данных и отображено в таблице ниже.",
    terminalTitle: "mizgr.io:~",
    contactMethodHeader: "ПРЯМАЯ СВЯЗЬ",
    githubTitle: "ПРОФИЛЬ GITHUB",
    telegramTitle: "СВЯЗЬ В TELEGRAM",
    footerText: "Разработка бэкенда высокой производительности и автоматизация инфраструктуры. Создано для стабильности.",
    langLabel: "ЯЗЫК",
    categoryLabel: "Категория",
    linkText: "Открыть приложение",
    repoText: "Исходный код",
    sentMessagesTitle: "ДЕМО БАЗА ДАННЫХ",
    sentMessagesSubtitle: "Этот интерактивный лог симулирует запись в БД в реальном времени. Ваше обращение запишется ниже.",
    ledgerEmpty: "В этой сессии сообщений еще нет. Заполните форму выше, чтобы протестировать внесение записи.",
    statusLabel: "СТАТУС",
    timestampLabel: "ВРЕМЯ",
    viewDetails: "Сведения",
    hideDetails: "Скрыть",
    pipelineStatus: "СТАТУС: СТАБИЛЕН",
    dockerImg: "docker pull mizgr/inbox:latest",
    quoteText: "Устраняю операционную нагрузку с помощью чистой автоматизации процессов."
  }
};
