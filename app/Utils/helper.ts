import { DateTime } from 'luxon'

export function serializeDateTime(value?: DateTime) {
  return value ? value.toFormat('yyyy-MM-dd HH:mm:ss') : value
}

export function passwordGenerator(length: number): string {
  var result = "";
  var characters = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function accessKeyGenerator(imei: string): string {
  let hash = 2311;
  for (let i = 0; i < imei.length; i++) {
    hash = 33 * hash ^ imei.charCodeAt(i);
  }
  return 'RSIOGATE-' + (hash >>> 0).toString(16).toUpperCase();
}
