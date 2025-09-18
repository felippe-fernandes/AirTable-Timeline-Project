# Interactive Timeline Component

This project features an interactive timeline component designed to visualize items compactly and interactively, ideal for managing tasks or events with specific durations. It allows efficient visualization and direct manipulation of items.

## �� Technologies Used

The development of this component utilized modern technologies to ensure an agile development experience and a performant final product:

-   **Vite**: A highly efficient build tool that optimizes front-end development, providing instant hot module replacement and efficient production builds.
-   **Tailwind CSS**: A utility-first CSS framework that enabled rapid and responsive styling of the component, keeping the CSS lightweight and highly configurable.
-   **Date-fns**: A modular library for date manipulation in JavaScript, used for parsing, formatting, and calculating differences between event dates in a lightweight and performant manner.

## ✨ Implemented Features

The timeline component offers the following key functionalities:

1.  **Compact Timeline Visualization**:
    -   Display of items organized in horizontal lanes.
    -   Implementation of intelligent compaction logic: items that do not overlap can share the same lane, optimizing vertical space usage and minimizing the number of required lanes.
    -   Items are arranged horizontally based on their start and end dates.

2.  **Interactive Zoom (In/Out)**:
    -   Allows users to adjust the zoom level on the timeline, enabling both an overview of long-term periods and a detailed view of specific intervals.
    -   Zoom affects the timeline's granularity and the visual width of items, adapting to display more spaced or denser dates.

3.  **Drag and Drop of Items**:
    -   Intuitive functionality that allows users to drag individual items along the timeline.
    -   During dragging, the start and end dates of the item are dynamically adjusted and reflected, facilitating easy reorganization of tasks or events.

## 🚧 Planned Future Features

Considering the time available for the challenge, some improvements have been identified for future iterations:

-   **Inline Name Editing**: Add the ability to edit item names directly on the timeline, eliminating the need to open modals or external forms for minor changes.
-   **Item Resizing**: Implement functionality to resize the start and/or end of items, allowing precise adjustment of task durations directly in the interface. This would complement the drag and drop functionality for complete time manipulation.

## 🧪 How I Would Test This with More Time

With more time, a comprehensive testing strategy would be implemented to ensure the robustness and reliability of the component:

-   **Unit Tests (using Vitest)**:
    -   **`assignLanes.js`**: Tests to ensure that the lane assignment logic works correctly for different input scenarios (non-overlapping items, partially overlapping items, fully overlapping items, etc.), verifying that the `laneIndex` is assigned compactly.
    -   **Date Functions**: Tests for the `date-fns` utility functions that convert dates, calculate durations, and pixel positions.

-   **End-to-End (E2E) Tests (using Playwright)**:
    -   Simulate real user scenarios, such as navigating, applying zoom, dragging multiple items, and verifying that the overall experience is smooth and bug-free.
    -   Check the persistence of states after complex interactions.

## ⚙️ Installation and Execution Instructions

To set up and run the project locally, follow the steps below:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/felippe-fernandes/AirTable-Timeline-Project.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd AirTable-Timeline-Project # Or the name of the created folder
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # Or yarn install, if you're using yarn
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    # Or yarn dev, if you're using yarn
    ```

The project will be available in your browser at `http://localhost:8001`.

## 🔧 Enhancing GitHub Repository Rules

To improve the management and collaboration within this repository, I plan to implement and refine GitHub repository rules. This includes:

-   **Branch Protection Rules**: Enforcing rules to protect the main branch, such as requiring pull request reviews before merging and restricting force pushes. [Learn more about managing rulesets for a repository.](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository)

-   **Commit Signing**: Requiring signed commits to ensure the authenticity and integrity of contributions. [Learn more about available rules for rulesets.](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)

-   **Issue and Pull Request Templates**: Creating standardized templates to guide contributors in reporting issues and submitting pull requests, ensuring consistency and completeness.

-   **Code of Conduct and Contribution Guidelines**: Establishing clear guidelines to foster a welcoming and productive community.

By implementing these rules and guidelines, we aim to enhance the quality, security, and collaboration within the project.
