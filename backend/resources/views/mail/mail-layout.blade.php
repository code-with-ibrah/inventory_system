<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> @yield('title') Yello Events Production</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f8f8;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 550px;
            margin: 0 auto;
        }
        .logo {
            text-align: center;
            margin-bottom: 15px;
            display: block;
        }
        .logo img {
            max-width: 120px;
            height: auto;
        }
        h2 {
            color: #223D80;
            margin-top: 0;
            text-align: center;
        }
        p {
            margin-bottom: 15px;
        }
        .button-primary {
            display: block;
            background-color: #F6C216;
            color: #fff !important;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
            margin-top: 15px;
        }
        .button-primary:hover {
            background-color: #223D80;
            color: white !important;
        }
        .footer-small {
            color: #777;
            font-size: 0.8em;
            margin-top: 30px;
        }


        .important-info {
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: left;
        }

        .password{
            font-size: 18px;
            font-weight: bold;
            font-family: 'Segoe UI';
            color: #dc3545;
        }

    </style>
</head>
<body>
    <div class="container" style="text-align: center">
        <main>
            <a href="https://vote.yelloevents.com" style="text-decoration: none; color: white;" class="logo">
                <img src="https://vote.yelloevents.com/assets/logo-CrB2V9mQ.png" alt="Logo">
            </a>


            @yield('content')
        </main>
    </div>
</body>
</html>