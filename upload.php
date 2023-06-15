<?php
// Get the uploaded file
$file = $_FILES['file'];

// Validate file type (allowing text and image files)
$allowedTypes = ['text/plain', 'image/png', 'image/jpeg', 'image/gif'];
if (!in_array($file['type'], $allowedTypes)) {
  die('Error: Invalid file type. Only text files and images are allowed.');
}

// Scan the file for inappropriate content and text
// Add your scanning logic here

// Store the file in Google Drive
require_once 'vendor/autoload.php'; // Include the required Google Drive API library

use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;

$apiKey = 'AIzaSyCJ3pEMLIEnYhU7DJ6L0olSyx7MzwPzwSY'; // Replace with your Google API key
$folderId = '1zIlxzmc3ma8juxZl1MTxc1CeHwx4REDZ'; // Replace with the ID of the destination folder in Google Drive

$client = new Client();
$client->setApplicationName('File Upload');
$client->setDeveloperKey($apiKey);

$service = new Drive($client);

$fileMetadata = new DriveFile([
  'name' => $file['name'],
  'parents' => [$folderId]
]);

$content = file_get_contents($file['tmp_name']);
$file = $service->files->create($fileMetadata, [
  'data' => $content,
  'mimeType' => $file['type'],
  'uploadType' => 'multipart',
  'fields' => 'id'
]);

echo 'File uploaded successfully!';
