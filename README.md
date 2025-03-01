# Event Management App

## Description

A web platform that allows users to organize and participate in events. The platform includes features like event creation, event joining, real-time notifications, email notifications, and a user dashboard to track hosted and joined events.

## Features

- **User Authentication**: Login, register, logout, and protected routes.
- **Event Management**: Create, join, update, and delete events.
- **User Dashboard**: View hosted events, joined events, and participation statistics.
- **Notifications**: Real-time notifications (Sonner.js) and email notifications (configurable in `.env` file).
- **Mobile Responsive**: Optimized for both mobile and desktop views.
- **Customizable Email Notifications**: Ability to enable/disable email notifications through the `.env` file.

## Technologies Used

- **Front-end**: React.js with Vite
- **Back-end**: Laravel (PHP)
- **Notifications**: Sonner.js (real-time notifications)
- **Email**: Laravel Mail
- **Database**: MySQL (or other as configured)

## Installation

### 1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Set up the front-end (React with Vite):

#### Install dependencies:

```bash
cd frontend
npm install
```

#### Run the development server:

```bash
npm run dev
```

The front-end will be accessible at `http://localhost:5173`.

### 3. Set up the back-end (Laravel):

#### Install dependencies:

```bash
cd backend
composer install
```

#### Set up environment variables:

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your database and mail configuration.

#### Generate the application key:

Run this command to generate the Laravel application key:

```bash
php artisan key:generate
```

#### Link the storage:

Since events have images stored in `storage`, link the storage directory:

```bash
php artisan storage:link
```

#### Run the Laravel server:

```bash
php artisan serve
```

The back-end will be accessible at `http://localhost:8000`.

### 4. Database Migration:

Run the migrations to set up the database:

```bash
php artisan migrate
```

## Configuration

### Email Notifications

To disable email notifications, set the following in the `.env` file:

```env
SEND_EMAIL_NOTIFICATIONS=false
```

To enable email notifications:

```env
SEND_EMAIL_NOTIFICATIONS=true
```

### Real-time Notifications

Notifications are displayed in real-time using Sonner.js when users join events or perform key actions.

## Testing

To test the application:

- Register a user account.
- Create an event and join it as a participant.
- Test the join/leave event functionality.
- Check that email notifications are sent for actions like joining an event (if enabled).
- Verify real-time notifications in the app.
