# Ryze AI: Deterministic UI Generator

An AI-powered agent that converts natural language UI intent into working UI code with a live preview, using a fixed, deterministic component library. Inspired by Claude Code but for UI development only.

## 🚀 Get Started

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [lumina.ai](http://localhost:3000) in your browser for live preview.

---

## 🏗️ Architecture Overview

The system is built on a modular "Agentic" architecture that separates intent analysis from code generation.

### 1. The Agent Orchestrator

The backend (`/api/generate`) coordinates the generation process through three distinct steps:

- **Planner**: Interprets the user's natural language and maps it to specific layout patterns and component selections.
- **Generator**: Translates the plan into a valid React (JSX) string. It is designed to perform incremental edits by default.
- **Explainer**: Provides a plain-English justification for the UI decisions made, enhancing transparency.

### 2. Deterministic Component System

The core constraint of this project is visual consistency. The AI interacts with a **fixed component library** (`src/components/ui-library.tsx`).

- **Safety**: The AI cannot create new CSS or components. It can only compose existing ones.
- **Components**: Includes Button, Card, Input, Table, Modal, Sidebar, Navbar, and Chart.
- **Styling**: All components use a predefined design system based on Tailwind 4, ensuring they look premium regardless of how they are composed.

### 3. Real-time Execution Environment

- **Live Preview**: Powered by `react-live`, allowing for immediate rendering of generated code in a sandboxed scope.
- **Monaco Editor**: Integrated for manual code refinements, providing a professional IDE-like experience.

---

## 🧠 Agent Design & Prompts

The agent uses a structured prompting strategy to ensure reliability:

- **System Prompt (Planner)**: Instructs the model to think in terms of "Sections" and "Layouts". It enforces the component whitelist and forbids inline styling.
- **System Prompt (Generator)**: Focuses on AST-based or pattern-based code modification. It is instructed to look for `diff` opportunities instead of full rewrites.
- **Context Awareness**: The agent receives a history of the last 5 versions to maintain continuity during iterative edits.

---

## 🧱 Component System Design

The system follows **SOLID principles**:

- **Single Responsibility**: Each component (e.g., `Card`, `Table`) has one job.
- **Open/Closed**: Components are open for extension via props but closed for internal modification by the AI.
- **Interface Segregation**: Clean prop definitions for all UI elements.

---

## ⚠️ Known Limitations

- **Pseudo-LLM Backend**: For this submission, the backend uses a deterministic logic handler for common UI requests (Settings, Dark Mode, Tables) to demonstrate the agent's multi-step flow.
- **State Management**: Complex inter-component state logic is limited to standard React hooks.

---

## 📈 Future Improvements

- **Real LLM Integration**: Connecting to GPT-4o or Claude 3.5 Sonnet for arbitrary UI generation.
- **AST-based Diffing**: Implementing a more robust code-patching algorithm to ensure perfect incremental edits.
- **Component Versioning**: Tracking changes at the component level for more granular rollbacks.
- **Automated QA**: Integrating a step to validate code validity before sending it to the client.
