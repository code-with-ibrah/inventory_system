<?php

    namespace App\Utils;

    use Illuminate\Support\Str;
    use Illuminate\Support\Facades\Storage;

class ImageUpload
{

    public static function init($imageFile)
    {
        $filename = Str::uuid() . '_' . $imageFile->getClientOriginalName() . '.jpeg';
        $uploadDirectory = 'uploads/images';
        $imageFile->storeAs($uploadDirectory, $filename, 'public');
        $imagePath = env("APP_URL") . "/storage/$uploadDirectory/$filename";
        return $imagePath;
    }


    public static function removePreviousImage($oldPath)
    {
        $filePath = self::removeUrlFromPath($oldPath);

        if (Storage::disk('public')->exists($filePath)) {
            return Storage::disk('public')->delete($filePath);
        }
        return false;
    }


    private static function removeUrlFromPath($url)
    {
        $urlWithoutProtocolAndHost = preg_replace('#^(https?:)?//[^/]+#', '', $url);
        $filePath = str_replace('/storage/', '', $urlWithoutProtocolAndHost);
        $filePath = ltrim($filePath, '/');
        return $filePath;
    }

}
