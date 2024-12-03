import { http } from "./config";

export const loaiCongViecService = {
  getChiTietLoaiCongViecById: (id) => {
    return http.get(`/chi-tiet-loai-cong-viec/${id}`);
  },
  getListChiTietLoaiCongViec: () => {
    return http.get("/loai-cong-viec");
  },
};
