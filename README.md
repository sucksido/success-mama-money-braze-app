
# Success Mama Money Braze Inbox App

An Ionic Angular application integrating Braze push notifications and inbox features.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Development](#development)  
- [Building APK](#building-apk)  
- [Project Structure](#project-structure)  
- [Services](#services)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  
- [License](#license)

---

## Project Overview

This project is an Ionic Angular mobile application that integrates Braze services for push notifications and inbox messaging. It uses Capacitor for native mobile builds and supports lazy loading for efficient module management.

---

## Features

- Home Page with Braze integration  
- Inbox Page with unread message count  
- Push notifications with Braze  
- Modular architecture with lazy loading  
- Capacitor integration for building Android APKs

---

## Tech Stack

- Angular  
- Ionic Framework  
- Capacitor  
- RxJS  
- Braze SDK (custom service integration)  
- TypeScript

---

## Prerequisites

- Node.js (>=14.x) and npm  
- Angular CLI  
- Ionic CLI  
- Java Development Kit (JDK) for Android build  
- Android Studio (for APK generation)  
- Capacitor CLI  

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/success-braze-inbox-app.git
cd success-braze-inbox-app
```

2. Install dependencies:

```bash
npm install
```

3. Add Android platform (if not already added):

```bash
npx cap add android
```

---

## Development

To run the app in development mode:

- **For web (Angular app):**

```bash
ng serve
```

This starts the Angular development server at `http://localhost:4200` with live reload.

- **For Ionic (mobile app simulator/browser):**

```bash
ionic serve
```

This launches the Ionic development server with native-like UI components in the browser.

To build the Angular app for production:

```bash
ionic build --prod
```

To sync latest web assets to native platforms:

```bash
npx cap copy
```

---

## Building APK

1. Build the Angular app:

```bash
ionic build --prod
```

2. Copy web assets to native Android project:

```bash
npx cap copy android
```

3. Open Android Studio:

```bash
npx cap open android
```

4. Build APK from Android Studio:  
   - Select **Build > Build Bundle(s) / APK(s) > Build APK(s)**  
   - Locate the generated APK to install or distribute

---

## Project Structure

```
src/
├── app/
│   ├── home/
│   │   ├── home.module.ts
│   │   ├── home-routing.module.ts
│   │   ├── home.page.ts
│   ├── inbox/
│   ├── components/
│   │   └── inbox-button/
│   ├── services/
│   │   ├── braze.service.ts
│   │   ├── inbox.service.ts
│   ├── shared/
│   ├── app-routing.module.ts
│   └── app.module.ts
```

---

## Services

- **BrazeService**: Handles interaction with Braze push notifications and inbox  
- **InboxService**: Manages unread message counts and inbox updates  
- **PushNotificationService**: Manages device push token registration and notification handling  

---

## Troubleshooting

- **Component declared in multiple modules**: Ensure components like `InboxButtonComponent` are declared in exactly one NgModule and imported via a shared module where needed.  
- **Injection token errors**: Avoid using `import type` for injectable services; use regular imports.  
- **Lazy loading errors**: Verify module and routing module names and exports match exactly.  
- **Build errors**: Delete `node_modules` and reinstall dependencies if needed.

![image](https://github.com/user-attachments/assets/6960e78c-7c89-417e-bf7d-57a400ba4141)
![image](https://github.com/user-attachments/assets/c3a9b985-35cc-46a9-b2a4-ff78bc761751)

