@extends("mail.mail-layout")

@section('title', "Password Reset Request -")

<?php
    // $link = "http://localhost:5173/verify-password-reset?link=$obj->userId&expires=$obj->expirationTimestamp&token=$obj->token";
    $link = "https://vote.yelloevents.com/verify-password-reset?link=$obj->userId&expires=$obj->expirationTimestamp&token=$obj->token";
?>

@section("content")

    <h2>Reset Your Yello Events Password</h2>
    <p>You have requested to reset the password for your Yello Events account.</p>
    <p>Click the button below to reset your password:</p>

    <a href="<?= $link; ?>" class="button-primary">Reset Password</a>

    <p>This link will expire in 5 mins.</p>

    <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
    <p class="footer-small">&copy; <?php echo date('Y') ?> Yello Events Production</p>

@endsection
