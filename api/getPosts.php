<?php
// api/get_posts.php
include '../db.php';

$stmt = $pdo->query('SELECT * FROM posts');
$posts = $stmt->fetchAll();

echo json_encode($posts);
?>
