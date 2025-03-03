<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Created Confirmation</title>
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
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #333;
    }
    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
    .event-details {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      background: #007bff;
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      margin-top: 15px;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎉 Your Event Has Been Created, {{ $user->name }}!</h1>
    <p>Congratulations! Your event <strong>{{ $event->title }}</strong> has been successfully created and is scheduled for <strong>{{ $event->start_date }}</strong>.</p>

    <div class="event-details">
      <p><strong>Event:</strong> {{ $event->title }}</p>
      <p><strong>Date:</strong> {{ $event->start_date }}</p>
      <p><strong>Location:</strong> {{ $event->location }}</p>
    </div>

    <p>You can manage your event here:</p>
    <a href="{{ config('app.frontend_url') }}/events/{{ $event->id }}" class="btn" target="_blank">Manage Event</a>

    <p class="footer">If you have any questions, feel free to reach out. Good luck with your event!</p>
    <p class="footer"><strong>EventPulse</strong></p>
  </div>
</body>
</html>
