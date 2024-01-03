
# Carland - Car Rental Web Application

![image](https://github.com/RobertRobii/carland/assets/108672392/04dfd47b-1135-4d07-823f-bd2302bff2f1)

Carland is a modern and user-friendly web application designed for car rentals. It allows users to easily browse available cars, make reservations for specific vehicles, and create an account to manage their reservation history. The application also features a homepage with all the essential information users need, and it includes the option to switch between light and dark mode for enhanced user experience.

## Features

- **Browse Available Cars**: Explore a wide range of available cars with detailed information such as make, model, and rental options.

- **Make Reservations**: Reserve a car of your choice quickly and easily. Specify the dates and times for your rental period.

- **User Accounts**: Create a personal account to access additional features, including viewing your reservation history and managing your profile.

- **Homepage Information**: Find all the necessary information on the homepage, providing a seamless user experience.

- **Light and Dark Mode**: Customize your viewing experience with the option to switch between light and dark mode.

## Getting Started

First, we need to install all the dependencies.

```bash
npm install
```

Then crate a .env file and create the following variables:

```bash
MONGODB_URI="your mongodb uri"
NEXTAUTH_SECRET="some hard string to guess"
NEXTAUTH_URL=http://localhost:3000/
```

After, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
