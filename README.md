# HR Workflow Designer

## Overview
This project is a prototype HR Workflow Designer built using React and React Flow. It allows HR admins to visually create and test workflows such as onboarding, task assignment, approvals, and automated steps.

## Features
- Drag and drop workflow nodes (Start, Task, Approval, Automated, End)
- Connect nodes using edges
- Dynamic node editing panel with configurable forms
- Mock API integration for automated actions
- Workflow testing panel with execution logs
- Basic workflow validation

## Tech Stack
- React (Vite)
- React Flow
- JavaScript
- CSS
- Mock API (local functions)

## Folder Structure

src/
components/
nodes/
panels/
api/
hooks/


## How to Run

npm install
npm run dev


## Design Decisions
- Modular architecture separating nodes, panels, and API logic
- Controlled components used for form handling
- Local mock API used instead of backend for simplicity
- Focus on functionality over UI styling

## What’s Completed
- Workflow canvas with drag-and-drop
- Node connection and editing
- Dynamic forms for each node type
- Mock API and workflow simulation

## Future Improvements
- Backend integration
- Better UI/UX
- Workflow validation enhancements
- Export/import workflows
