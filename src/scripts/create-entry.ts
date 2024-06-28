import fs from "fs";
import { exec } from "node:child_process";
import path from "path";

import inquirer from "inquirer";

import { BaseEntryMetadata } from "@/types";

const CONTENT_DIRECTORY = path.join(__dirname, "..", "content");
const EXPERIMENTS_DIRECTORY = path.join(CONTENT_DIRECTORY, "experiments");
const NOTES_DIRECTORY = path.join(CONTENT_DIRECTORY, "notes");
const WORK_DIRECTORY = path.join(CONTENT_DIRECTORY, "work");

// Helper function to generate a slug from the title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .split(" ")
    .slice(0, 5)
    .join(" ")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

function runLint(): Promise<void> {
  return new Promise((resolve, reject) => {
    exec("npm run lint", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing lint command: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Lint stderr: ${stderr}`);
      }
      console.log(`Lint stdout: ${stdout}`);
      resolve();
    });
  });
}

async function createEntry(): Promise<void> {
  let title: string;
  let slug: string;
  let entryDirectory: string = ""; // Initialize as an empty string
  let entryPath: string;

  // Ensure the base content directory exists
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    fs.mkdirSync(CONTENT_DIRECTORY, { recursive: true });
  }

  // Prompt the user for the entry type
  const entryTypeAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "entryType",
      message: "Select the entry type:",
      choices: ["experiment", "note", "work"],
      default: "experiment",
    },
  ]);
  const entryType = entryTypeAnswer.entryType;

  // Set the directory based on entry type
  switch (entryType) {
    case "experiment":
      entryDirectory = EXPERIMENTS_DIRECTORY;
      break;
    case "note":
      entryDirectory = NOTES_DIRECTORY;
      break;
    case "work":
      entryDirectory = WORK_DIRECTORY;
      break;
  }

  // Ensure the selected directory exists
  if (!fs.existsSync(entryDirectory)) {
    fs.mkdirSync(entryDirectory, { recursive: true });
  }

  while (true) {
    // 1. Prompt the user for a title
    const titleAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the entry:",
        default: "New Entry",
      },
    ]);
    title = titleAnswer.title;

    // 2. Generate the slug from the title
    slug = generateSlug(title);

    // 3. Create the entry file path
    entryPath = path.join(entryDirectory, `${slug}.mdx`);

    // Check if the file already exists
    if (!fs.existsSync(entryPath)) {
      break; // If file doesn't exist, proceed to create it
    } else {
      console.log(
        `An entry with the title "${title}" already exists. Please choose a different title.`,
      );
    }
  }

  // Prompt for additional metadata
  let metadataAnswers = await inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: "Enter the description:",
      default: "A short description of the entry.",
    },
    {
      type: "input",
      name: "tags",
      message: "Enter tags (comma separated):",
    },
  ]);

  if (entryType === "work") {
    const companyAnswers = await inquirer.prompt([
      {
        type: "input",
        name: "company",
        message: "Enter the company name:",
      },
    ]);
    const rolesAnswers = await inquirer.prompt([
      {
        type: "input",
        name: "roles",
        message: "Enter roles (comma separated):",
      },
    ]);
    const startDateAnswers = await inquirer.prompt([
      {
        type: "input",
        name: "startDate",
        message: "Enter the start date:",
      },
    ]);
    const endDateAnswers = await inquirer.prompt([
      {
        type: "input",
        name: "endDate",
        message: "Enter the end date:",
      },
    ]);

    metadataAnswers = {
      ...metadataAnswers,
      company: companyAnswers.company,
      roles: rolesAnswers.roles,
      startDate: startDateAnswers.startDate,
      endDate: endDateAnswers.endDate,
    };
  }

  const tags = metadataAnswers.tags.split(",").map((tag: string) => tag.trim());

  if (entryType === "work") {
    tags.push(metadataAnswers.company.toLowerCase().replace(/\s+/g, "-"));
  }

  const metadata: BaseEntryMetadata = {
    title,
    description: metadataAnswers.description,
    image: "/og-share.png",
    published: false,
    tags,
    createdAt: new Date().toISOString(),
  };

  if (entryType === "work") {
    metadata.company = metadataAnswers.company;
    metadata.roles = metadataAnswers.roles
      .split(",")
      .map((role: string) => role.trim());
    metadata.startDate = metadataAnswers.startDate;
    metadata.endDate = metadataAnswers.endDate;
  }

  const content = `
import PageTitle, { PageTitleHighlight } from "../../components/PageTitle";
import EntryImage from "../../components/EntryImage";

export const meta = ${JSON.stringify(metadata, null, 2)};

<PageTitle>lorem ipsum dolor sit amet, consectetur <PageTitleHighlight>adipiscing elit.</PageTitleHighlight></PageTitle>

<EntryImage src={meta.image} />

## Overview
${metadataAnswers.description}
  `;

  const labContent = `
export const meta = ${JSON.stringify(metadata, null, 2)};

# ${metadataAnswers.title}

${metadataAnswers.description}

<img src={'/og-share.png'} />
  `;

  const contentToWrite = entryType === "experiment" ? labContent : content;

  // Write the file
  try {
    fs.writeFileSync(entryPath, contentToWrite, "utf8");
    console.log(`Entry created at ${entryPath}`);

    // Run linting
    await runLint();
    console.log("Linting complete.");
  } catch (error) {
    console.error("An error occurred while writing the file:", error);
  }
}

// Run the function
void createEntry();
