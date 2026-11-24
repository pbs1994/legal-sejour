<?php
/**
 * Légal Séjour — gestion des formulaires (hébergement PHP 8+, ex. OVH mutualisé).
 *
 * Politique : les envois suspects sont SIGNALÉS dans l'objet, jamais supprimés,
 * et chaque demande est aussi ajoutée à un journal hors de la racine web si possible.
 *
 * Surcharges facultatives (hors git) :
 *   ~/legal-sejour-config.php   (un niveau au-dessus de www/, recommandé)
 *   ou www/api/config.php        (bloqué en HTTP par .htaccess)
 * retournant par ex. ['to' => 'contact@legal-sejour.fr', 'from' => 'site@legal-sejour.fr', 'cc' => '']
 */

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

$config = ['to' => 'contact@legal-sejour.fr', 'from' => 'site@legal-sejour.fr', 'cc' => ''];
foreach ([dirname(__DIR__, 2) . '/legal-sejour-config.php', __DIR__ . '/config.php'] as $file) {
    if (is_file($file)) {
        $extra = include $file;
        if (is_array($extra)) $config = array_merge($config, $extra);
        break;
    }
}

function out(bool $ok, int $code = 200): never {
    http_response_code($code);
    echo json_encode(['ok' => $ok]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(false, 405);

$field = static function (string $k, int $max = 500): string {
    $v = trim((string)($_POST[$k] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
};

$lead = [
    'firstname' => $field('firstname', 80),
    'lastname'  => $field('lastname', 80),
    'email'     => $field('email', 160),
    'phone'     => $field('phone', 40),
    'service'   => $field('service', 80),
    'notified'  => $field('notified', 20),
    'slot'      => $field('slot', 80),
    'mode'      => $field('mode', 20),
    'message'   => $field('message', 4000),
    'page'      => $field('page', 200),
];

if (($lead['firstname'] === '' && $lead['lastname'] === '') || ($lead['email'] === '' && $lead['phone'] === '')) out(false, 422);

// ---- signaux de spam : signaler, ne jamais supprimer
$flags = [];
if ($field('website') !== '') $flags[] = 'honeypot';
$elapsed = (int)$field('elapsed', 10);
if ($elapsed > 0 && $elapsed < 4) $flags[] = "rapide:{$elapsed}s";
if ($lead['email'] !== '' && !filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) $flags[] = 'email-invalide';
if (preg_match_all('~https?://~i', $lead['message']) > 2) $flags[] = 'liens';
if (($_POST['consent'] ?? '') !== '1') $flags[] = 'sans-consentement';

$isOqtf = stripos($lead['service'], 'OQTF') !== false;
$name = trim($lead['firstname'] . ' ' . $lead['lastname']);
$prefix = ($flags ? '[À VÉRIFIER: ' . implode(', ', $flags) . '] ' : '') . ($isOqtf ? '[URGENT OQTF] ' : '');
$subject = $prefix . ($lead['slot'] ? 'Rendez-vous' : 'Demande') . ' — ' . $name . ($lead['service'] ? ' — ' . $lead['service'] : '');

$labels = [
    'firstname' => 'Prénom', 'lastname' => 'Nom', 'email' => 'E-mail', 'phone' => 'Téléphone',
    'service' => 'Demande', 'notified' => 'Notif. OQTF', 'slot' => 'Créneau', 'mode' => 'Mode',
    'message' => 'Message', 'page' => 'Page',
];
$body = '';
foreach ($labels as $k => $label) {
    if ($lead[$k] !== '') $body .= str_pad($label . ':', 14) . $lead[$k] . "\n";
}
$body .= "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\nUA: " . mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '-', 0, 200) . "\n";
if ($flags) $body .= 'Flags: ' . implode(', ', $flags) . "\n";

// ---- journal de secours
$logLine = json_encode(['at' => date('c'), 'flags' => $flags] + $lead, JSON_UNESCAPED_UNICODE) . "\n";
$logFile = is_writable(dirname(__DIR__, 2)) ? dirname(__DIR__, 2) . '/legal-sejour-leads.log' : __DIR__ . '/leads.log';
@file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);

// ---- e-mail
$replyTo = filter_var($lead['email'], FILTER_VALIDATE_EMAIL) ? $lead['email'] : $config['to'];
$headers = [
    'From: Légal Séjour <' . $config['from'] . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($isOqtf) $headers[] = 'X-Priority: 1';
if (!empty($config['cc'])) $headers[] = 'Cc: ' . $config['cc'];

$sent = mail(
    $config['to'],
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . $config['from']
);

out($sent, $sent ? 200 : 500);
