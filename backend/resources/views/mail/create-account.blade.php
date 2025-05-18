@extends('mail.mail-layout')


<?php
    $link = "https://jessden.com/login?email=$obj->email";
//     $link = "http://localhost:5173/login?email=$obj->email";
?>



@section('content')
    <h2>Welcome to {{ $obj->companyName }}, {{ $obj->name }}</h2>
    <p>Your new account is now ready.</p>

    <div class="important-info">
        <p><strong>Email:</strong> {{ $obj->email }}</p>
        <p><strong>Default Password:</strong> <span class="password">{{ env("DEFAULT_USER_PASSWORD") }}</span></p>
        <p class="info-paragraph">Please keep this password secure and change it after your first login.</p>
    </div>

    <p>Click the link below to get started:</p>
    <a href="<?= $link ?>" class="button-primary">Access Your Account</a>
    <p class="footer-small">If you not aware of this account, please ignore this email.</p>
    <p class="footer-small">&copy; <?php echo date('Y'); ?> {{ $obj->companyName }}</p>
@endsection




