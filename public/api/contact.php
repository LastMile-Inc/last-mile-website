<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$rawBody = file_get_contents("php://input");
$payload = is_string($rawBody) ? json_decode($rawBody, true) : null;

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Invalid JSON payload"]);
    exit;
}

function clean_header_value(string $value): string {
    return trim(str_replace(["\r", "\n", "\0"], " ", $value));
}

function clean_field(mixed $value, string $fallback = "Not provided"): string {
    if (!is_string($value)) {
        return $fallback;
    }
    $trimmed = trim($value);
    return $trimmed !== "" ? $trimmed : $fallback;
}

$recipient = "contact@lastmileinc.ai";

$firstname = clean_field($payload["firstname"] ?? null, "");
$lastname = clean_field($payload["lastname"] ?? null, "");
$fullName = clean_field($payload["name"] ?? trim($firstname . " " . $lastname), "Website Visitor");
$email = clean_header_value(clean_field($payload["email"] ?? null, ""));
$company = clean_field($payload["company"] ?? null);
$role = clean_field($payload["role"] ?? null);
$industry = clean_field($payload["industry"] ?? null);
$intent = clean_field($payload["intent"] ?? null, "general-inquiry");
$intentLabel = clean_field($payload["intentLabel"] ?? null, $intent);
$operatingIssue = clean_field($payload["operatingIssue"] ?? ($payload["message"] ?? null));
$systemsInvolved = clean_field($payload["systemsInvolved"] ?? null);
$recoveryMeasurement = clean_field($payload["recoveryMeasurement"] ?? null);
$businessConsequence = clean_field($payload["businessConsequence"] ?? null);
$apiDocsUrl = clean_field($payload["apiDocsUrl"] ?? null);
$fileName = clean_field($payload["fileName"] ?? null);
$pageUri = clean_field($payload["pageUri"] ?? null);
$pageName = clean_field($payload["pageName"] ?? null, "Website Contact Form");
$submittedAt = gmdate("Y-m-d\TH:i:s\Z");

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "A valid email address is required"]);
    exit;
}

$subject = clean_header_value(sprintf(
    "[Last Mile Inquiry: %s] %s - %s",
    $intentLabel,
    $company,
    $fullName
));

$structuredRecord = [
    "recipient" => $recipient,
    "submittedAtUtc" => $submittedAt,
    "intent" => $intent,
    "intentLabel" => $intentLabel,
    "pageName" => $pageName,
    "pageUri" => $pageUri,
    "contact" => [
        "firstName" => $firstname !== "" ? $firstname : null,
        "lastName" => $lastname !== "" ? $lastname : null,
        "fullName" => $fullName,
        "email" => $email,
        "company" => $company,
        "role" => $role,
        "industry" => $industry,
    ],
    "details" => [
        "operatingIssueOrMessage" => $operatingIssue,
        "systemsInvolved" => $systemsInvolved,
        "recoveryMeasurement" => $recoveryMeasurement,
        "businessConsequence" => $businessConsequence,
        "apiDocsUrl" => $apiDocsUrl !== "Not provided" ? $apiDocsUrl : null,
        "fileName" => $fileName !== "Not provided" ? $fileName : null,
    ],
];

$lines = [
    "New Last Mile website inquiry submitted to contact@lastmileinc.ai",
    "================================================================",
    "",
    "Inquiry type: " . $intentLabel . " (" . $intent . ")",
    "Submitted at (UTC): " . $submittedAt,
    "Source page: " . $pageName . " (" . $pageUri . ")",
    "",
    "Contact details",
    "---------------",
    "Name: " . $fullName,
    "Work email: " . $email,
    "Organization: " . $company,
    "Role: " . $role,
    "Industry: " . $industry,
    "",
    "Operating context / message",
    "---------------------------",
    $operatingIssue,
    "",
    "Systems involved",
    "----------------",
    $systemsInvolved,
    "",
    "Measurement that would prove recovery",
    "-------------------------------------",
    $recoveryMeasurement,
    "",
    "Business consequence",
    "--------------------",
    $businessConsequence,
];

if ($apiDocsUrl !== "Not provided" || $fileName !== "Not provided") {
    $lines[] = "";
    $lines[] = "Technical attachment metadata";
    $lines[] = "-----------------------------";
    $lines[] = "API Docs URL: " . $apiDocsUrl;
    $lines[] = "Attached file name: " . $fileName;
}

$lines[] = "";
$lines[] = "--- BEGIN STRUCTURED JSON PAYLOAD ---";
$lines[] = json_encode($structuredRecord, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
$lines[] = "--- END STRUCTURED JSON PAYLOAD ---";

$body = implode("\r\n", $lines);

$headers = [
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "From: Last Mile Website <contact@lastmileinc.ai>",
    sprintf("Reply-To: %s <%s>", clean_header_value($fullName), $email),
    "X-Mailer: LastMile-Website-Contact/1.0",
    "X-LastMile-Inquiry-Type: " . clean_header_value($intent),
    "X-LastMile-Organization: " . clean_header_value($company),
    "X-LastMile-Source-Page: " . clean_header_value($pageUri),
];

$headerString = implode("\r\n", $headers);
$sent = @mail($recipient, $subject, $body, $headerString, "-f " . $recipient);
if (!$sent) {
    $sent = @mail($recipient, $subject, $body, $headerString);
}

if (!$sent) {
    http_response_code(502);
    echo json_encode([
        "ok" => false,
        "error" => "Mail transport unavailable on host",
        "recipient" => $recipient,
    ]);
    exit;
}

echo json_encode([
    "ok" => true,
    "recipient" => $recipient,
    "submittedAtUtc" => $submittedAt,
]);
