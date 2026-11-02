# VDAB Quiz

An interactive quiz application built with **Nuxt 4, Vue 3, TypeScript and Pinia** as part of a technical development assignment. The interface is based on a provided Figma design, while the questions are retrieved dynamically from an external API.

The goal was to deliver a clear, functional quiz experience while making thoughtful decisions about component structure, state management and answer validation.

## Features

- Multiple-choice questions loaded from an external API
- A countdown timer for each question, with automatic submission when time runs out
- Immediate visual feedback after submitting answers
- Question-by-question navigation and score tracking
- A final results screen and the option to restart the quiz
- A few extra interactions — **try all the buttons and icons to discover them!** 😉

## Tech stack

- **Nuxt 4 / Vue 3** — application framework and UI
- **TypeScript** — typed application logic and API contracts
- **Pinia** — quiz state management
- **Nuxt Nitro** — server API routes and session storage
- **Tailwind CSS / SCSS** — styling based on the supplied design
- **canvas-confetti** — results animation

## Requirements

- Node.js 22 or later (LTS recommended)
- [pnpm](https://pnpm.io/installation)
- Git
- Internet access to retrieve the quiz data

## Installation

### 1. Clone the repository

The latest completed version of the project is available on the **`master`** branch.

```bash
git clone https://github.com/pacifiquebayisenge/vdab-quiz.git
cd vdab-quiz
git checkout master
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Add the environment configuration

The project requires a **`.env`** file containing the API endpoint and the configuration for additional interactions.

**The `.env` file is provided upon request.** Place the supplied file in the project root, alongside `package.json` and `nuxt.config.ts`.

For security and configuration management, the `.env` file is not included in the repository. No manual changes to the supplied values are required for normal local use.

### 4. Start the application

```bash
pnpm dev
```

Open **http://localhost:3000** in your browser.

## How to play

1. The quiz automatically loads its questions when the application starts.
2. Select the answer or answers you think are correct.
3. Click **Klaar!** to submit, or wait for the timer to run out.
4. Review the feedback: correct answers appear in green and incorrectly selected answers in red.
5. Click **Doorgaan** to continue to the next question.
6.

**Tip:** Don't limit yourself to the main quiz flow. Try the other buttons and icons too — there may be a few surprises. 😉

## Technical approach

### Why validate answers on the backend?

One of my main design decisions was to **avoid exposing correct answers to the browser before a question has been submitted**.

The external API includes both the available answers and information indicating which answers are correct. Sending that response directly to the frontend would make it easy for a technically experienced user to inspect the network response, Vue state or browser developer tools and discover the correct answers without playing the quiz.

To reduce that risk, I implemented the following flow:

1. **Fetch on the server:** The Nuxt backend retrieves the original questions from the external API.
2. **Store the original data:** The backend associates the complete questions, including the correct-answer information, with a quiz session in Nitro storage.
3. **Transform the response:** Before returning questions to the frontend, the backend removes the correct-answer flags and sends only the question text, time limit and answer options.
4. **Validate on the server:** When the player submits an answer, the frontend sends the session ID, question ID and selected answer IDs to the backend.
5. **Return feedback:** The backend compares the selection with the stored original data and returns the validation result. Only then can the frontend display the correct and incorrect answers.

This means that **the initial frontend data does not contain the answer key**, making simple cheating through the browser's Inspect/Network tools significantly harder.

This is a deliberate separation of responsibilities: **Pinia manages the user-facing quiz state, while Nitro remains responsible for retrieving and validating the original answer data.** It is not intended to be a fully tamper-proof examination platform, but it provides a more appropriate boundary for this assignment than trusting client-side validation.

### Main API endpoints

| Endpoint         | Method | Purpose                                                                   |
| ---------------- | ------ | ------------------------------------------------------------------------- |
| `/api/questions` | `GET`  | Creates a quiz session and returns questions without correct-answer flags |
| `/api/answers`   | `POST` | Validates selected answers against the original server-side questions     |

## Scope and priorities

**Automated tests and responsive design were intentionally left outside the scope of this implementation.**

Given the limited time available for the assignment, I chose to prioritise:

- Reproducing the provided Figma interface for the intended desktop experience
- Integrating the external API
- Building the complete interactive quiz flow
- Keeping answer validation on the server rather than exposing the answer key to the client
- Maintaining a readable component structure and clear state management

This was a conscious **time-management and prioritisation decision**, rather than an assumption that testing or responsiveness are unimportant. With additional time, the next steps would be automated tests for the API and quiz logic, followed by responsive layouts and further accessibility and usability checks.

## Production build

To build the application:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

The application uses Nitro storage for quiz sessions. A production deployment with multiple server instances would require an appropriately configured shared storage solution.

## Author

**Pacifique Bayisenge**  
Technical development assignment — VDAB Quiz
