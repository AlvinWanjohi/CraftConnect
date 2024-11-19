const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "craftconnect-3c6b8",
    private_key_id: "4c0e17ceb66b8d17c5fc7b267a481b78964b8d61",
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGfitOLshu+kT8
Ne3zJd61J54GU9cSMUNjBoiaU0xQS4qzR2WRC9tBMwF0XW6uneYYjMLmxwM4rhKI
kn+VVzbLyPP9iQrzD2eviKMvzZowBnR9PFm9gaB1dqMZjiMj4o9DsrgOajSkEcMP
MkHGXIBayl5ocIEuXp7LOre0mdfSxfOzSKSK3ZEnRgoMZ0GHhL+rp9zWSeDlflb1
mx9p5i81wUMpw56Vy2hhamZGwKwmjmPtLkScqccH3qh16zn0iVrxrgkyHYV3Aa3A
JMjt/TGO/DBsCpFWjskZX1+vQ4Vpcxjz4Tr6nJj9AwqEF8yRABjByIe3A2/WXHqj
3lrTRFGdAgMBAAECggEAA8AqEtGmw6MvK3cxvlLrgU+jBqUVFe4cpqrJWtedfRF7
dvy2zOeIlpr/YHSMgnE6bL4NuYfK4ophEFROVZTUG+C5ut/KvmyiSh/M7Aj1EApr
Lz8uDQk9mN8PC6JS9gzSUHnqPnwm/agdQ5g30jxODyWSDytRRujyFEBKM/f0VcCh
vcSQFlrMVybNnnk3bsF2zhZfM2W/SO2esJ0tDwJf7njquQpr/i/cvkJNls4xk8J7
KTt4+iWYwRN3bQoGM7OGlA/EeArGQV7+8/88gYmuUfHFgfmJzC7fXGxKkLo5OreW
pYjqfWZ/3Bq4gn+0QzfB/tbP7jnSAyoF+g8TD8ow6QKBgQD7IVdjnHiWEHgwjGxt
4U0ld+Q5Y2ZnXxWneok2beS/Q7Aty4ofRr+GkEfFr6hZRrz6BBkq9OM8IumzC9iY
zCF6sqWVb7UE4zaIE4C61HxKOB9R8miBB6oaOuCmJhXUDGOS/xPQn26Eii88yYmI
SRCjKIWSRfLg0whi1X15nBgAFQKBgQDKV4aUQK1otaXvm7QTzYoLVsXzU6NP5xKN
7nYtGKx62PPJK4Yt9RCd43SOYzHPQfRPJa1Gen5Isfn+iav5qgJ3LulhNfUQufCT
5n8BOGMxgTAewX6xIPiQw5bcvn503lpeXDWVGxSNkV2kfNgmuVe8lrBEJO6s6TGB
oGUANNRlaQKBgFXfXsyXErztwMuJGQKxyfmH96iQDtJGN1dflU/hYBjvAm2GbiKn
xJI0//XfTQfKIpCzmg+QUaucnKE26cfF9aTJNcnVuuaC84CwepJoWl/etQcGhymn
/0ic3XizCT/LRLldM99gxR/ZSLHWkIrjwSapkpMkDBtIzlNNgWx2LdbJAoGAYx9X
fT7l9FqwLF4hbGYPTxi2Jkp9wYHYVBFScSsaK6AmZRFeTRs1hbNMgQhU+Uw9C5zQ
cqtFPAV8C1aUGd1QEeS4TXfqUsRT95A9/XILHdBEq3xsvQcC3aADQqZLOqNGr90K
Hr5CZkulDRRfqzC2q1tChE93YNtn9jGF6QD4X6kCgYEA9Lf/nNSiIHEqrDUaPqCk
iuAPV7VU8+adSvDRwlxJtsDgy+UBrOfnmkrZlU/TPGgUBhtI9ICc2zdXhWYE1f/v
nA++adpS9Xs5XA1LelO2tjI5Po2d+w6ExEoXohUcZ4QPHPckxWgqKeoJnULLz8dj
gxD6O6Z5uh/63GYoE444RT8=
-----END PRIVATE KEY-----`,
    client_email: "firebase-adminsdk-c28k5@craftconnect-3c6b8.iam.gserviceaccount.com",
    client_id: "104115905492445425991",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-c28k5%40craftconnect-3c6b8.iam.gserviceaccount.com",
  }),
});

// Example: Retrieve and log Firestore data
const db = admin.firestore();

// Retrieve documents from a collection
async function getDocuments() {
  const snapshot = await db.collection('your_collection_name').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

getDocuments().catch(err => console.error('Error fetching documents:', err));
