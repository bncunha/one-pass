import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export class CriptografiaService {

    criptografarTwoWay(valor: string, secretKey: string, data: Date): string {
        let criptografado = valor;
        criptografado = AES.encrypt(criptografado, this.gerarFraseSecreta(secretKey, data)).toString();
        return criptografado;
    }
    
    descriptografarTwoWay(hash: string, secretKey: string, data: Date) {
        const bytes = AES.decrypt(hash, this.gerarFraseSecreta(secretKey, data));
        const descripgrafado = bytes.toString(Utf8);
        return descripgrafado;
    }

    gerarFraseSecreta(valor: string, data: Date) {
        const dataNumbers = data.getTime();
        return '!@#*&()ruhfuwefh!' + this.reverseString(valor) + dataNumbers + 'qwe123';
    }

    private reverseString(str: string) {
        const splitString = str.split(""); // var splitString = "hello".split("");
        const reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
        const joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
        return joinArray; // "olleh"
    }
}