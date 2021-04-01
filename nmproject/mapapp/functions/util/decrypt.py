from Crypto.Cipher import AES
import base64

class Crypt :
    def decrypt_from_cryptoJS(self,encrypted, iv):
        key = base64.b64decode("cXH34Fdcu94wun8cauwCAa==")                # Base64でエンコードする 適宜文字列変更 
        aes = AES.new(key, AES.MODE_CBC, iv)                              # CBCモードを使用する
        encrypted = aes.decrypt(encrypted)                                # デクリプトする
        return encrypted

    def unpadPkcs7(self,data):
        return data[:-data[-1]]

    def decrypt(ciphertext11):
        crypt = Crypt()
        try:    
            joinedDataB64 = ciphertext11
            joinedData = base64.b64decode(joinedDataB64)
            iv = joinedData[:16]                                                # 連結されたデータからIV（初期化ベクトル）を取得
            encrypted = joinedData[16:]                                         # 連結されたデータから暗号文を取得
            encrypted_JS = crypt.decrypt_from_cryptoJS(encrypted, iv)           # CryptJSに合わせてデクリプトする
            decrypted = crypt.unpadPkcs7(encrypted_JS)                          # PKCS7パディングを手動で復号化して削除する
            return decrypted.decode()
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return null