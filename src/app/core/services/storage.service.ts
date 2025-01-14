import { Injectable } from '@angular/core';
import { EnumStorageType } from '../common/enums/enum.storage.type.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Armazena token em uma área de armazenamento especificada (local ou de sessão).
   * @param key A chave sob a qual o valor será armazenado.
   * @param value O token a ser armazenado.
   * @param storage O tipo de armazenamento (local ou de sessão). O padrão é local.
   */
  public setItem(
    key: string,
    value: string,
    storage: EnumStorageType = EnumStorageType.LOCAL
  ): void {
    window[storage].setItem(key, encrypt(value, key));
  }

  /**
   * Recupera token armazenado em uma área de armazenamento (local ou de sessão) com base na chave fornecida.
   * @param key A chave usada para buscar o token.
   * @returns O token armazenado sob a chave especificada ou nulo se a chave não existir.
   */
  public getItem(key: string): string | null {
    const { value, storageType } = this.checkStorage(key);
    return value && storageType
      ? decrypt(window[storageType].getItem(key), key)
      : null;
  }

  /**
   * Remove o token armazenado em uma área de armazenamento (local ou de sessão) com base na chave fornecida.
   * @param key A chave usada para identificar o token a ser removido.
   */
  public removeItem(key: string): void {
    const { value, storageType } = this.checkStorage(key);

    value && storageType ? window[storageType].removeItem(key) : null;
  }

  /**
   * Verifica se a chave especificada existe em alguma das áreas de armazenamento (local ou de sessão).
   * @param key A chave a ser verificada.
   * @returns Um objeto contendo o token associado à chave, se encontrado, e o tipo de armazenamento (local ou de sessão).
   */
  private checkStorage(key: string): {
    value: string | null;
    storageType?: EnumStorageType;
  } {
    const localValue = localStorage.getItem(key);
    const sessionValue = sessionStorage.getItem(key);

    if (sessionValue !== null) {
      return { value: sessionValue, storageType: EnumStorageType.SESSION };
    }

    return { value: localValue, storageType: EnumStorageType.LOCAL };
  }
}

/**
 * Criptografa o valor fornecido usando a chave fornecida.
 * @param value O valor a ser criptografado.
 * @param key A chave a ser usada na criptografia.
 * @returns O valor criptografado.
 */
const encrypt = (value: string, key: string): string => {
  return value
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) + key.length))
    .join('');
};

/**
 * Descriptografa o valor fornecido usando a chave fornecida.
 * @param value O valor a ser descriptografado.
 * @param key A chave a ser usada na descriptografia.
 * @returns O valor descriptografado.
 */
const decrypt = (value: string | null, key: string): string => {
  if (!value) return '';

  return value
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - key.length))
    .join('');
};
