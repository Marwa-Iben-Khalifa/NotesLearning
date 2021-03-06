import { INote } from "../utils/types";
import http from "./http-commun";
class DataService {
  getAll() {
    return http.get<Array<any>>("/");
  }
  create(data: INote) {
    return http.post<INote>("/", data);
  }
  delete(id: any) {
    return http.delete<any>(`/${id}`);
  }
  findByAuthor(author: string) {
    return http.get<Array<INote>>(`/?author=${author}`);
  }
  update(data: INote, id: any) {
    return http.put<any>(`/${id}`, data);
  }
}
export default new DataService();
