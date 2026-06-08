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
  console.log("Setting up media fields in Directus...");

  // 1. Add fields to globals collection if they don't exist
  try {
    await request("/fields/globals", {
      method: "POST",
      body: JSON.stringify({
        field: "profile_photo",
        type: "uuid",
        schema: {},
        meta: {
          interface: "file",
          width: "half",
          note: "Main profile picture displayed on the homepage"
        }
      })
    });
    console.log("Added 'profile_photo' field to 'globals'.");
  } catch (err: any) {
    console.log("Field 'profile_photo' might already exist or failed:", err.message);
  }

  try {
    await request("/fields/globals", {
      method: "POST",
      body: JSON.stringify({
        field: "background_photo",
        type: "uuid",
        schema: {},
        meta: {
          interface: "file",
          width: "half",
          note: "Background image displayed behind the content"
        }
      })
    });
    console.log("Added 'background_photo' field to 'globals'.");
  } catch (err: any) {
    console.log("Field 'background_photo' might already exist or failed:", err.message);
  }

  // 2. Set public permissions
  console.log("Configuring public read permissions for globals and files...");
  
  // Grant public read permission to 'globals'
  try {
    await request("/permissions", {
      method: "POST",
      body: JSON.stringify({
        policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
        collection: "globals",
        action: "read",
        fields: ["*"]
      })
    });
    console.log("Granted public read to 'globals'.");
  } catch (err: any) {
    console.log("Permission for 'globals' already exists or failed:", err.message);
  }

  // Grant public read permission to 'directus_files'
  try {
    await request("/permissions", {
      method: "POST",
      body: JSON.stringify({
        policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
        collection: "directus_files",
        action: "read",
        fields: ["*"]
      })
    });
    console.log("Granted public read to 'directus_files'.");
  } catch (err: any) {
    console.log("Permission for 'directus_files' already exists or failed:", err.message);
  }

  console.log("Directus media setup completed!");
}

main().catch(console.error);
