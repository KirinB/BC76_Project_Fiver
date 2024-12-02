import { http } from "./config";

export const nguoiDungService = {
  layDanhSachNguoiDung: () => {
    return http.get("/users");
  },
  getNguoiDungById: (id) => {
    return http.get(`/users/${id}`);
  },
  xoaNguoiDung: (idUser) => {
    return http.delete(`/users?id=${idUser}`);
  },
  themNguoiDung: (data) => {
    return http.post("/users", data);
  },
  suaNguoiDung: (id, data) => {
    return http.put(`/users/${id}`, data);
  },
};
