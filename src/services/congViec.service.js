import { http } from "./config";

export const congViecService = {
  getCongViecTheoTen: (keyword) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`);
  },
  getCongViecTheoId: (id) => {
    return http.get(`/cong-viec/${id}`);
  },
};
