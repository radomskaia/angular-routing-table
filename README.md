# Network Routes Table

A web application that displays a sortable and paginated table of network routes. Built with **Angular (v18+)**, **TypeScript**, and **RxJS**.

## 📸 Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/622a0913-2521-4425-af79-84e9bc5ba36c" width="300"/>
  <img src="https://github.com/user-attachments/assets/7dc560fb-ba2a-4cbe-b773-2a5831e052e6" width="300"/>
  <img src="https://github.com/user-attachments/assets/d9216c60-4e18-4764-9489-ba38fd1eaad3" width="300"/>
</p>

## 🔗 Live Demo

👉 [View it on GitHub Pages](https://radomskaia.github.io/angular-routing-table/main)

## Features

- 📋 Sortable table with custom sorting logic:
  - **Address**: sorted by IP address
  - **Gateway**: sorted by IP address
  - **Interface**: sorted as a regular string
- 🔢 Pagination and the ability to select how many routes to show per page
- 🚫 404 Page for undefined routes
- 📱 Responsive layout
- 🌗 Theme adapts automatically based on the system preference (light/dark)

## 📦 Data Model

Each route is represented as an object with the following structure:

```ts
interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}
```

## Technical Stack

- **Framework**: Angular 19.2.0
- **Language**: TypeScript 5.7.2
- **State Management**: RxJS 7.8.0
- **Styling**: SCSS with modular architecture
- **Testing**: Jasmine + Karma

## IP Address Processing

The application uses sophisticated algorithms to process and sort IP addresses properly:

- IP addresses are converted to numerical values for accurate sorting
- Subnet masks are converted to prefix lengths (CIDR notation)
- Validation ensures that IP addresses and subnet masks follow standard formats

## Architecture

The application follows a modular architecture with:

- **Core Module**: Contains essential services and models
  - Network Route Service: Handles API interactions and data processing
  - Route Sort Service: Manages complex sorting logic for IP addresses

- **Shared Module**: Contains reusable components and utilities
  - IP Utilities: Functions for processing IP addresses and subnet masks
  - Pipes: Custom formatting for table data

- **Feature Modules**: Contain specific application features
  - Network Routes Table: Main component for displaying route information
  - Pagination Controls: Component for navigating through pages of routes

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/username/network-routes-manager.git
   cd network-routes-manager
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:4200`

## Build

To build the application for production:

```bash
npm run build
```

The built application will be in the `dist/` directory.

## Testing

Run tests with:

```bash
npm test
```
