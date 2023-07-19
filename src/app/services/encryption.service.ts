import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  //Declaration Variable
  readonly ENCRYPTIONKEY = '7774010B5615E1A4';

  constructor() { }

  //Fonction de chiffrement - Algorithme de chiffrement: AES Advanced Encryption Standard,
  //                                               mode: Electronic Codebook  en AES,
  //                                        rembourrage: Pkcs7
  encryption(item: string) {
    const paddedKey = CryptoJS.enc.Utf8.parse(this.ENCRYPTIONKEY);
    const encrypted = CryptoJS.AES.encrypt(item, paddedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();                  //renvoie une chaine de caractère
  }

}
