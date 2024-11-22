import { http } from "./config";

export const congViecService = {
  getCongViecTheoTen: (keyword) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`);
  },
  getDanhSachCongViec: () => {
    return http.get("/cong-viec");
  },
  postCongViec: (data) => {
    return http.post("/cong-viec", data);
  },
};
