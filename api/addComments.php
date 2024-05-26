<?php
// api/add_comment.php
include '../db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['post_id']) && isset($data['name']) && isset($data['content'])) {
    $post_id = $data['post_id'];
    $name = $data['name'];
    $content = $data['content'];

    $stmt = $pdo->prepare('INSERT INTO comments (post_id, name, content) VALUES (?, ?, ?)');
    $stmt->execute([$post_id, $name, $content]);

    echo json_encode(['id' => $pdo->lastInsertId(), 'post_id' => $post_id, 'name' => $name, 'content' => $content]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
}
?>
