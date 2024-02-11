import { MMKV } from "react-native-mmkv";
import { MMKV_SECRET } from "@env";

export const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: MMKV_SECRET,
});
