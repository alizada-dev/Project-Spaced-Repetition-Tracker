# Spaced Repetition Tracker App

A simple JavaScript web application that helps users keep track of topics they need to revise using the **spaced repetition** technique.

The user selects their profile, enters a topic and a revision date, and the application automatically calculates future revision dates at different intervals.

## Features

- Select from 5 different users.
- Each user has their own separate revision agenda.
- Add a topic and choose a revision date.
- Automatically calculate revision dates:
  - 1 week later
  - 1 month later
  - 3 months later
  - 6 months later
  - 1 year later
- Store each user's revision data in `localStorage`.
- Data persists when the page is refreshed or reopened.
- Past revision dates are filtered out of the agenda.
- Upcoming revisions are sorted chronologically.
- Display dates in a user-friendly format.
- Form validation for topic name and revision date.
- Includes unit tests for the revision-date calculation logic.

## How It Works

When a user adds a topic, the application takes the selected date and calculates five future revision dates.

For example, if a topic is added with a revision date of **12 October 2026**, the application creates revisions for:

```text
19 October 2026
12 November 2026
12 January 2027
12 April 2027
12 October 2027
```

The application then stores these revision dates for the selected user.

When the user selects their profile, the application retrieves their saved data from `localStorage`, filters out revisions that have already passed, and sorts the remaining revisions from the earliest to the latest date.

## Technologies Used

- HTML
- CSS
- JavaScript
- ES Modules
- `localStorage`
- Node.js built-in test runner

## Project Structure

```text
project-spaced-repetition/
│
├── index.html
├── app.css
├── script.mjs
├── common.mjs
├── storage.mjs
├── utils.mjs
├── common.test.mjs
└── package.json
```

### Main JavaScript files

**`script.mjs`**

Handles the application's user interface, user selection, form submission, displaying topics, sorting and filtering the revision agenda.

**`utils.mjs`**

Contains the date-calculation logic used to generate future revision dates.

**`storage.mjs`**

Handles saving and retrieving each user's revision data from `localStorage`.

**`common.mjs`**

Provides common application data such as the list of users.

**`common.test.mjs`**

Contains unit tests for the application, including tests for the revision-date calculation function.

## Running the Tests

The project uses Node's built-in test runner.

Run:

```bash
npm test
```

The tests verify that:

- The revision-date calculation function produces the expected dates.

## Purpose

This project was built to practise working with:

- Arrays and objects
- Array methods such as `.map()`, `.filter()` and `.sort()`
- JavaScript `Date` objects
- Functions and modular JavaScript
- DOM manipulation
- Form handling
- `localStorage`
- Data persistence
- Unit testing
- Separating application logic from UI logic
