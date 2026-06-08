import { PROJECTS, SKILLS } from "./src/data";

const DIRECTUS_URL = "http://194.226.187.67:8055";
const TOKEN = "MizgrStaticAdminToken2026";

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

async function main() {
  console.log("Starting Directus migration...");

  // 1. Delete existing collections if they exist to start fresh
  console.log("Cleaning up existing collections...");
  try {
    await request("/collections/projects", { method: "DELETE" });
    console.log("Deleted old 'projects' collection.");
  } catch (err) {
    // Ignore error if collection doesn't exist
  }

  try {
    await request("/collections/skills", { method: "DELETE" });
    console.log("Deleted old 'skills' collection.");
  } catch (err) {
    // Ignore error if collection doesn't exist
  }

  // 2. Create projects collection
  console.log("Creating 'projects' collection...");
  const projectsSchema = {
    collection: "projects",
    meta: {
      icon: "work",
      note: "Projects list for the portfolio website",
    },
    schema: {},
    fields: [
      {
        field: "id",
        type: "string",
        schema: { is_primary_key: true, is_nullable: false },
        meta: { interface: "input", readonly: false, hidden: false, width: "full" }
      },
      {
        field: "titleEn",
        type: "string",
        schema: { is_nullable: false },
        meta: { interface: "input", width: "half" }
      },
      {
        field: "titleRu",
        type: "string",
        schema: { is_nullable: false },
        meta: { interface: "input", width: "half" }
      },
      {
        field: "descEn",
        type: "text",
        schema: {},
        meta: { interface: "textarea", width: "half" }
      },
      {
        field: "descRu",
        type: "text",
        schema: {},
        meta: { interface: "textarea", width: "half" }
      },
      {
        field: "detailsEn",
        type: "json",
        schema: {},
        meta: { interface: "list", width: "half" }
      },
      {
        field: "detailsRu",
        type: "json",
        schema: {},
        meta: { interface: "list", width: "half" }
      },
      {
        field: "tags",
        type: "json",
        schema: {},
        meta: { interface: "list", width: "full" }
      },
      {
        field: "category",
        type: "string",
        schema: { is_nullable: false },
        meta: {
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Backend", value: "backend" },
              { text: "DevOps", value: "devops" },
              { text: "Automation", value: "automation" },
              { text: "Frontend", value: "frontend" }
            ]
          },
          width: "half"
        }
      },
      {
        field: "link",
        type: "string",
        schema: {},
        meta: { interface: "input", width: "half" }
      },
      {
        field: "github",
        type: "string",
        schema: {},
        meta: { interface: "input", width: "half" }
      },
      {
        field: "sort",
        type: "integer",
        schema: {},
        meta: { interface: "input", width: "half" }
      }
    ]
  };
  await request("/collections", {
    method: "POST",
    body: JSON.stringify(projectsSchema)
  });
  console.log("Created 'projects' collection successfully.");

  // 3. Create skills collection
  console.log("Creating 'skills' collection...");
  const skillsSchema = {
    collection: "skills",
    meta: {
      icon: "grade",
      note: "Expertise categories and details for the portfolio",
    },
    schema: {},
    fields: [
      {
        field: "id",
        type: "string",
        schema: { is_primary_key: true, is_nullable: false },
        meta: { interface: "input", width: "full" }
      },
      {
        field: "titleEn",
        type: "string",
        schema: { is_nullable: false },
        meta: { interface: "input", width: "half" }
      },
      {
        field: "titleRu",
        type: "string",
        schema: { is_nullable: false },
        meta: { interface: "input", width: "half" }
      },
      {
        field: "skills",
        type: "json",
        schema: {},
        meta: { interface: "list", width: "full" }
      },
      {
        field: "sort",
        type: "integer",
        schema: {},
        meta: { interface: "input", width: "half" }
      }
    ]
  };
  await request("/collections", {
    method: "POST",
    body: JSON.stringify(skillsSchema)
  });
  console.log("Created 'skills' collection successfully.");

  // 4. Grant public read permissions
  console.log("Setting public read permissions...");
  await request("/permissions", {
    method: "POST",
    body: JSON.stringify({
      policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
      collection: "projects",
      action: "read",
      fields: ["*"]
    })
  });
  await request("/permissions", {
    method: "POST",
    body: JSON.stringify({
      policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
      collection: "skills",
      action: "read",
      fields: ["*"]
    })
  });
  console.log("Public permissions set successfully.");

  // 5. Populate initial data
  console.log("Populating initial projects...");
  const projectsData = PROJECTS.map((proj, idx) => ({
    ...proj,
    sort: idx + 1
  }));
  await request("/items/projects", {
    method: "POST",
    body: JSON.stringify(projectsData)
  });
  console.log(`Imported ${projectsData.length} projects.`);

  console.log("Populating initial skills...");
  const skillsData = SKILLS.map((skillCat, idx) => ({
    ...skillCat,
    sort: idx + 1
  }));
  await request("/items/skills", {
    method: "POST",
    body: JSON.stringify(skillsData)
  });
  console.log(`Imported ${skillsData.length} skill categories.`);

  console.log("Directus migration finished successfully!");
}

main().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
