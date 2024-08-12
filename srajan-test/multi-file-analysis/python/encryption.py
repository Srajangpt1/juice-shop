from Crypto.Cipher import DES

# Weak encryption example (DES)
def encrypt_data(data, key):
    des = DES.new(key, DES.MODE_ECB)
    padded_data = data + ' ' * (8 - len(data) % 8)
    return des.encrypt(padded_data.encode())

# Decrypt function (DES)
def decrypt_data(encrypted_data, key):
    des = DES.new(key, DES.MODE_ECB)
    return des.decrypt(encrypted_data).strip()
