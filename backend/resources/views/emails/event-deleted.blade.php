<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Event Deleted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #d32f2f;
        }
        p {
            font-size: 16px;
            color: #333;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #d32f2f;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #b71c1c;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Event Deleted</h1>
        <p>Hi {{ $user->name }},</p>
        <p>Your event <strong>{{ $event->title }}</strong> scheduled for <strong>{{ $event->start_date }}</strong> has been successfully deleted.</p>
        <p>If this was a mistake, you may create a new event anytime.</p>
        <a href="{{ config('app.frontend_url') }}/events/create" class="button">Create a New Event</a>
        <p class="footer">If you have any questions, feel free to contact us.</p>
    </div>
</body>
</html>
