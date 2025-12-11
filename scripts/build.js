#!/usr/bin/env node
// Build script that conditionally runs i18nexus pull
const { execSync } = require("child_process");

const hasApiKey = !!process.env.I18NEXUS_API_KEY;

if (hasApiKey) {
  console.log("I18NEXUS_API_KEY found, pulling translations...");
  try {
    execSync("i18nexus pull", { stdio: "inherit" });
  } catch (error) {
    console.error("Error pulling translations:", error.message);
    process.exit(1);
  }
} else {
  console.log(
    "I18NEXUS_API_KEY not found, skipping translation pull (using existing files)"
  );
}

try {
  execSync("next build", { stdio: "inherit" });
} catch (error) {
  console.error("Error building:", error.message);
  process.exit(1);
}
