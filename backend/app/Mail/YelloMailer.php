<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class YelloMailer extends Mailable
{
    use Queueable, SerializesModels;


    public $obj;
    public $subject;
    public $templatePath;
    public function __construct($subject, $obj, $templatePath)
    {
        $this->obj = $obj;
        $this->subject = $subject;
        $this->templatePath = $templatePath;
    }


    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }


    public function content(): Content
    {
        return new Content(
            view: "mail." . $this->templatePath,
            with: [
        'obj' => $this->obj
    ],
        );
    }


    public function attachments(): array
    {
        return [];
    }
}
