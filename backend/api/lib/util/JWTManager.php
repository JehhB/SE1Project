<?

namespace Util;

class JWTManager {
    private string $secretKey;

    public function __construct(string $secretKey) {
        $this->secretKey = $secretKey;
    }


    public function createToken($payload)
    {
        $base64UrlHeader = $this->base64UrlEncode(json_encode(["alg" => "HS256", "typ" => "JWT"]));
        $base64UrlPayload = $this->base64UrlEncode(json_encode($payload));
        $base64UrlSignature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, $this->secretKey, true);
        $base64UrlSignature = $this->base64UrlEncode($base64UrlSignature);
        return $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
    }

    public function validateToken($token)
    {
        $list = explode('.', $token);
        if ($list === false or count($list) != 3) return false;

        list($base64UrlHeader, $base64UrlPayload, $base64UrlSignature) = $list;
        $signature = $this->base64UrlDecode($base64UrlSignature);
        $expectedSignature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, $this->secretKey, true);

        return hash_equals($signature, $expectedSignature);
    }

    public function decodeToken($token)
    {
        $list = explode('.', $token);
        if ($list === false or count($list) != 3) return false;
        list(, $base64UrlPayload, ) = $list;

        $payload = $this->base64UrlDecode($base64UrlPayload);
        return json_decode($payload, true);
    }

    private function base64UrlEncode($data)
    {
        $base64 = base64_encode($data);
        $base64Url = strtr($base64, '+/', '-_');
        return rtrim($base64Url, '=');
    }

    private function base64UrlDecode($data)
    {
        $base64 = strtr($data, '-_', '+/');
        $base64Padded = str_pad($base64, strlen($base64) % 4, '=', STR_PAD_RIGHT);
        return base64_decode($base64Padded);
    }

}