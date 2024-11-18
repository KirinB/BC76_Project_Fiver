import { http } from "./config";

export const nguoiDungService = {
  layDanhSachNguoiDung: () => {
    return http.get("/users");
  },
  xoaNguoiDung: (idUser) => {
    return http.delete(`/users?id=${idUser}`);
  },
  themNguoiDung: (data) => {
    return http.post("/users", data);
  },
};
