import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  //Declaration Variable

  constructor() { }

  //Fonction de chiffrement - Algorithme de chiffrement: AES Advanced Encryption Standard,
  //                                               mode: Electronic Codebook  en AES,
  //                                        rembourrage: Pkcs7
  encryption(item: string) {
    const paddedKey = CryptoJS.enc.Utf8.parse(environment.secretKey);
    const encrypted = CryptoJS.AES.encrypt(item, paddedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();                  //renvoie une chaine de caractère
  }

}
