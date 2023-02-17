import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<any>("https://cdn.twobe.net/json/wordle.json")
    }
}