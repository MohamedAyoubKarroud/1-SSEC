<?php
declare(strict_types=1);

/*
 * Seed des comptes de démonstration.
 *
 * Usage : php backend/sql/seed.php
 *
 * Idempotent : ré-exécutable sans dupliquer les comptes. Si l'email existe
 * déjà, le mot de passe et le statut sont rafraîchis.
 */

require_once __DIR__ . '/../config/database.php';

$users = [
    ['nom' => 'Karoui',  'prenom' => 'Direction', 'email' => 'direction@ssec.local', 'role' => 'direction'],
    ['nom' => 'Bennani', 'prenom' => 'Employé',   'email' => 'employe@ssec.local',   'role' => 'employe'],
    ['nom' => 'Tahiri',  'prenom' => 'Admin',     'email' => 'admin@ssec.local',     'role' => 'admin_it'],
];

$password = 'password';
$hash     = password_hash($password, PASSWORD_DEFAULT);

try {
    $pdo = Database::connection();
} catch (Throwable $e) {
    fwrite(STDERR, "Connexion à la base impossible : " . $e->getMessage() . PHP_EOL);
    exit(1);
}

$stmt = $pdo->prepare(
    'INSERT INTO employee (nom, prenom, email, password, role, statut)
     VALUES (:nom, :prenom, :email, :password, :role, "actif")
     ON DUPLICATE KEY UPDATE
        nom      = VALUES(nom),
        prenom   = VALUES(prenom),
        password = VALUES(password),
        role     = VALUES(role),
        statut   = "actif"'
);

foreach ($users as $u) {
    $stmt->execute([
        ':nom'      => $u['nom'],
        ':prenom'   => $u['prenom'],
        ':email'    => $u['email'],
        ':password' => $hash,
        ':role'     => $u['role'],
    ]);
    echo "OK  {$u['email']}  ({$u['role']})" . PHP_EOL;
}

echo PHP_EOL . "Mot de passe pour tous les comptes : {$password}" . PHP_EOL;
