<?php
// api/create_post.php
include '../db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['title']) && isset($data['content'])) {
    $title = $data['title'];
    $content = $data['content'];

    $stmt = $pdo->prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
    $stmt->execute([$title, $content]);

    echo json_encode(['id' => $pdo->lastInsertId(), 'title' => $title, 'content' => $content, 'votes' => 0]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
}
?>
