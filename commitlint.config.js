const scopes = [
  // {
  //   name: "",
  //   description: "",
  // },
];

const types = [
  {
    name: "build",
    description: "Changes that affect the build system or dependencies",
  },
  {
    name: "chore",
    description: "Other changes that don't modify src or test files",
  },
  {
    name: "ci",
    description: "Changes to CI configuration files and scripts",
  },
  {
    name: "docs",
    description: "Documentation only changes",
  },
  {
    name: "feat",
    description: "A new feature",
  },
  {
    name: "fix",
    description: "A bug fix",
  },
  {
    name: "perf",
    description: "A code change that improves performance",
  },
  {
    name: "refactor",
    description: "A code change that neither fixes a bug nor adds a feature",
  },
  {
    name: "revert",
    description: "Reverts a previous commit",
  },
  {
    name: "style",
    description: "Changes that do not affect the meaning of the code",
  },
  {
    name: "test",
    description: "Adding missing tests or correcting existing tests",
  },
];

/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "scope-enum": [2, "always", scopes.map((s) => s.name)],
    "subject-case": [
      2,
      "always",
      [
        "lower-case", // default
        "sentence-case", // Sentence case
        "start-case", // Start Case
      ],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", types.map((t) => t.name)],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: types.reduce(
          (acc, { name, description }) => ({ ...acc, [name]: { description } }),
          {},
        ),
      },
      scope: {
        description:
          "\x1b[36mAdded new scopable code to this project? Edit " +
          "commitlint.config.js to add a new scope to the list of scopes.\x1b[0m\n" +
          "\x1b[32m?\x1b[0m Which scope does this commit effect? (empty if none)",
        enum: scopes.reduce(
          (acc, { name, description }) => ({ ...acc, [name]: { description } }),
          {},
        ),
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change",
      },
      body: {
        description: "Provide a longer description of the change",
      },
      isBreaking: {
        description: "Are there any breaking changes?",
      },
      breakingBody: {
        description:
          "A BREAKING CHANGE commit requires a body. " +
          "Please enter a longer description of the commit itself",
      },
      breaking: {
        description: "Describe the breaking changes",
      },
      isIssueAffected: {
        description: "Does this change affect any open issues?",
      },
      issuesBody: {
        description:
          "If issues are closed, the commit requires a body. " +
          "Please enter a longer description of the commit itself",
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
