<?php
// Get the uploaded file
$file = $_FILES['file'];

// Validate file type (allowing only text files)
$allowedTypes = ['text/plain'];
if (!in_array($file['type'], $allowedTypes)) {
  die('Error: Invalid file type. Only text files are allowed.');
}

// Scan the file for inappropriate content and text
// Add your scanning logic here

// Store the file in Google Drive
require_once 'vendor/autoload.php'; // Include the required Google Drive API library

use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;

$apiKey = 'AIzaSyCJ3pEMLIEnYhU7DJ6L0olSyx7MzwPzwSY'; // Replace with your Google API key

$client = new Client();
$client->setApplicationName('File Upload');
$client->setDeveloperKey($apiKey);

$service = new Drive($client);

$folderName = $_SERVER['DOCUMENT_ROOT'] . '/' . pathinfo($file['name'], PATHINFO_FILENAME);
$folderMetadata = new DriveFile(['name' => $folderName, 'mimeType' => 'application/vnd.google-apps.folder']);
$folder = $service->files->create($folderMetadata, ['fields' => 'id']);

$fileMetadata = new DriveFile([
  'name' => $file['name'],
  'parents' => [$folder->id]
]);

$content = file_get_contents($file['tmp_name']);
$file = $service->files->create($fileMetadata, [
  'data' => $content,
  'mimeType' => 'text/plain',
  'uploadType' => 'multipart',
  'fields' => 'id'
]);

echo 'File uploaded successfully!';
