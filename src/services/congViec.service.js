import { http } from "./config";

export const congViecService = {
  getCongViecTheoTen: (keyword) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`);
  },
  getDanhSachCongViec: () => {
    return http.get("/cong-viec");
  },
  postCongViec: (data, token) => {
    return http.post("/cong-viec", data, { headers: { token } });
  },
  deleteCongViec: (keyword, token) => {
    return http.delete(`/cong-viec/${keyword}`, { headers: { token } });
  },
  getCongViec: (keyword) => {
    return http.get(`/cong-viec/${keyword}`);
  },
  putCongViec: (keyword, data, token) => {
    return http.put(`/cong-viec/${keyword}`, data, { headers: { token } });
  },
  uploadHinhCongViec: (keyword, data, token) => {
    return http.post(`/cong-viec/upload-hinh-cong-viec/${keyword}`, data, {
      headers: { token },
    });
  },
};
