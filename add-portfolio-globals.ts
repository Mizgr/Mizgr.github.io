const DIRECTUS_URL = "https://sandbox.directus.com";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2Mzg3MjE4LWQyNTMtNDdlMi04ODBmLWQ0NTg1YmEzOWQ1NyIsInJvbGUiOiIzNTdhYTE3Yi05ODA4LTQ0YzItYTQyMy01NDU2MThiNWY2NjIiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsInNlc3Npb24iOiJuYnE4MFFGdG9lZklTM2ZFQ0s1cWRnMnQydUF1bF9mWWVHRmVBMmpKb283MGV4VlIyR21kZHRFWnBlVmg5QUtUIiwiaWF0IjoxNzgwOTM2MDA4LCJleHAiOjE3ODEwMjI0MDgsImlzcyI6ImRpcmVjdHVzIn0.Bremib9pj_3cO3oWWbOf5S3SGB_qQY_Tpv09jRnJrhE";

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${DIRECTUS_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`,
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function addField(field: string, type: string, interfaceType: string, note: string) {
  try {
    await request("/fields/globals", {
      method: "POST",
      body: JSON.stringify({
        field,
        type,
        schema: {},
        meta: {
          interface: interfaceType,
          width: "half",
          note
        }
      })
    });
    console.log(`Added field '${field}' to 'globals'.`);
  } catch (err: any) {
    console.log(`Field '${field}' might already exist:`, err.message);
  }
}

async function main() {
  console.log("Adding portfolio global fields to Directus...");

  // 1. Add fields for English/Russian text blocks and links
  await addField("role_en", "string", "input", "Job title in English");
  await addField("role_ru", "string", "input", "Job title in Russian");
  await addField("about_en", "text", "textarea", "Short bio in English");
  await addField("about_ru", "text", "textarea", "Short bio in Russian");
  await addField("telegram_link", "string", "input", "Telegram Link (full URL)");
  await addField("github_link", "string", "input", "GitHub Profile Link (full URL)");
  await addField("quote_en", "string", "input", "Quote in English");
  await addField("quote_ru", "string", "input", "Quote in Russian");
  await addField("footer_en", "text", "textarea", "Footer text in English");
  await addField("footer_ru", "text", "textarea", "Footer text in Russian");

  // 2. Initialize the globals data with actual portfolio content
  console.log("Initializing globals with portfolio content...");
  await request("/items/globals", {
    method: "PATCH",
    body: JSON.stringify({
      title: "MIZGR",
      url: "https://mizgr.github.io/",
      tagline: "Software Engineer & DevOps Expert",
      description: "Portfolio website configurations",
      role_en: "Go & Python Backend & DevOps Engineer",
      role_ru: "Go / Python Backend & DevOps Разработчик",
      about_en: "I build high-performance backend systems in Go and Python, architect robust automated workflows with Playwright, configure Docker environments, and implement reliable DevOps practices tailored for business needs.",
      about_ru: "Я разрабатываю надежные бэкенд-системы на языках Go и Python, проектирую автоматизацию веб-процессов с использованием Playwright, настраиваю надежные Docker-окружения и внедряю лучшие практики DevOps для бизнеса.",
      telegram_link: "https://t.me/Mizgtelegram",
      github_link: "https://github.com/Mizgr",
      quote_en: "Eliminating operational friction through clean, robust automation.",
      quote_ru: "Устраняю операционную нагрузку с помощью чистой автоматизации процессов.",
      footer_en: "High-performance backend engineering and robust system automation. Crafted with precision and minimalist aesthetics.",
      footer_ru: "Разработка бэкенда высокой производительности и автоматизация инфраструктуры. Создано для стабильности."
    })
  });

  console.log("Directus portfolio globals configuration completed!");
}

main().catch(console.error);
