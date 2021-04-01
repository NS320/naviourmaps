import CryptoJS from 'crypto-js' // npm install crypto-js  

// AES
export const PublicEncrypt = (word) =>{
    var iv = CryptoJS.lib.WordArray.random(16);                         // 初期化ベクトル
    var key = CryptoJS.enc.Base64.parse('cXH34Fdcu94wun8cauwCAa==');    // Base64でエンコードする 適宜文字列変更 
    
    var encrypted = CryptoJS.AES.encrypt(word, key, {iv: iv});          // CBCモードとPKCS7パディングを使用して暗号化
    var joinedData = iv.clone().concat(encrypted.ciphertext);           // IVと暗号化文を結合  
    var joinedDataB64 = CryptoJS.enc.Base64.stringify(joinedData);      // Base64でエンコード
    return joinedDataB64;                                               // joinedDataB64.replace(/(.{64})/g, "$1\n")
}