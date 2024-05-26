<?php
// api/vote_post.php
include '../db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['vote'])) {
    $id = $data['id'];
    $vote = $data['vote'];

    $stmt = $pdo->prepare('UPDATE posts SET votes = votes + ? WHERE id = ?');
    $stmt->execute([$vote, $id]);

    $stmt = $pdo->prepare('SELECT votes FROM posts WHERE id = ?');
    $stmt->execute([$id]);
    $post = $stmt->fetch();

    echo json_encode($post);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
}
?>
