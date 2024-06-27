import fs from "fs";
import path from "path";

import inquirer from "inquirer";

const CONTENT_DIRECTORY = path.join(__dirname, "..", "content");
const EXPERIMENTS_DIRECTORY = path.join(CONTENT_DIRECTORY, "experiments");
const NOTES_DIRECTORY = path.join(CONTENT_DIRECTORY, "notes");
const WORK_DIRECTORY = path.join(CONTENT_DIRECTORY, "work");

// Helper function to generate a slug from the title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
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
  const metadataAnswers = await inquirer.prompt([
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
      default: "react,typescript,javascript",
    },
    {
      type: "input",
      name: "company",
      message: "Enter the company name:",
      default: "btn0s",
    },
  ]);

  const tags = metadataAnswers.tags.split(",").map((tag: string) => tag.trim());

  // Template content
  const content = `
import AtHandle from "../../components/AtHandle";
import PageTitle, {PageTitleHighlight} from "../../components/PageTitle";
import EntryImageWithCaption from "../../components/EntryImageWithCaption";

export const meta = {
  title: "${title}",
  description: "${metadataAnswers.description}",
  image: "/og-share-new.png",
  published: false,
  tags: ${JSON.stringify(tags)},
  company: "${metadataAnswers.company}",
};

<AtHandle className={"mb-4"} value={meta.company} />

<PageTitle>
  Lorem ipsum dolor{" "}<PageTitleHighlight block>sit amet, consectetur adipiscing.</PageTitleHighlight>
</PageTitle>

<EntryImageWithCaption
  src={meta.image}
  caption="DEFAULT_CAPTION"
/>

# ${title}
${metadataAnswers.description}
`;

  // Write the file
  fs.writeFileSync(entryPath, content, "utf8");
  console.log(`Entry created at ${entryPath}`);
}

// Run the function
void createEntry();
