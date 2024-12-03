import { http } from "./config";
export const binhLuanService = {
  getBinhLuan: () => {
    return http.get("/binh-luan");
  },
};
