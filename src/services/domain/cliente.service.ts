import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-utils.service";

@Injectable()
export class ClienteService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService
  ) {}

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  uploadPicture(picture) {
    let pictureBlog = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set("file", pictureBlog, "file.png");
    return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData, {
      observe: "response",
      responseType: "text"
    });
  }
}
