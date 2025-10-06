const jwt = require('jsonwebtoken');
// Your secret key (must be kept secure on the server)
const SECRET_KEY = 'my-ultra-secret-key-12345';
//  Token expiration time (e.g., 1 hour)
const EXPIRY_TIME = '1h'; 
//  User data to put in the payload
const userData = {
  id: 42,
  username: 'api-user',
  role: 'admin'
}
// Function to generate a JWT 
function generateToken(payload) {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  const token = jwt.sign(
    payload, 
    SECRET_KEY, 
    { 
      expiresIn: EXPIRY_TIME, // 'exp' claim is added automatically
      audience: 'my-api',    // 'aud' claim
      issuer: 'auth-server'  // 'iss' claim
    }
  );
  return token;
}

const jwToken = generateToken(userData);

console.log("--- 1. TOKEN GENERATION ---");
console.log("User Data (Payload):", userData);
console.log(`Secret Key: ${SECRET_KEY}`);
console.log(`Generated JWT:\n${jwToken}\n`); 


// 2nd file 

// Assume this is the token received from the client in the Authorization header
const receivedToken = jwToken; 

function verifyToken(token) {
  try {
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    const decodedPayload = jwt.verify(
      token, 
      SECRET_KEY,
      {
        audience: 'my-api',    // Must match the 'aud' claim
        issuer: 'auth-server'  // Must match the 'iss' claim
      }
    );
    
    console.log("✅ Token is VALID!");
    console.log("Decoded Payload/Claims:", decodedPayload);
    
  } catch (err) {
    // This catches errors like 'TokenExpiredError' or 'JsonWebTokenError'
    console.log("❌ Token is INVALID or EXPIRED.");
    console.error("Verification Error:", err.message);
  }
}

console.log("--- 2. TOKEN VERIFICATION ---");
console.log(`Verifying Token: ${receivedToken}`);
verifyToken(receivedToken);

// --- SIMULATING FAILURE (e.g., Tampering) ---
const tamperedToken = receivedToken.slice(0, -5) + 'zzzzz'; // Change the last 5 chars of the signature

console.log("\n--- 3. SIMULATING TAMPERING ---");
console.log(`Verifying Tampered Token: ${tamperedToken}`);
verifyToken(tamperedToken); 
// Output: ❌ Token is INVALID or EXPIRED. Verification Error: invalid signature

// --- SIMULATING FAILURE (e.g., Wrong Secret) ---
try {
  jwt.verify(receivedToken, 'a-wrong-secret');
} catch (err) {
  console.log("\n--- 4. SIMULATING WRONG SECRET ---");
  console.log("Verification Error (Wrong Secret):", err.message);
  // Output: Verification Error (Wrong Secret): invalid signature
}