<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Registration Confirmation</title>
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
    <h1>🎉 You're in, {{ $user->name }}!</h1>
    <p>You've successfully registered for <strong>{{ $event->name }}</strong> happening on <strong>{{ $event->start_date }}</strong>.</p>
    
    <div class="event-details">
      <p><strong>Event:</strong> {{ $event->name }}</p>
      <p><strong>Date:</strong> {{ $event->start_date }}</p>
      <p><strong>Location:</strong> {{ $event->location }}</p>
    </div>

    <p>Click below to view event details:</p>
    <a href="http://localhost:5173/events/{{ $event->id }}" class="btn" target="_blank">View Event</a>

    <p class="footer">If you have any questions, feel free to reach out. See you soon!</p>
    <p class="footer"><strong>EventPulse</strong></p>
  </div>
</body>
</html>

