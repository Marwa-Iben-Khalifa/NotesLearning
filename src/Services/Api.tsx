import { INote } from "../utils/types";
import http from "./http-commun";
class DataService {
    getAll() {
      return http.get<Array<any>>("/");
    }
    create(data: INote) {
        return http.post<INote>("/tutorials", data);
      }
  }
  export default new DataService();