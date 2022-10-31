import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient) {
  }

  retrieveQuestions() {
    //return this.httpClient.get<any>("assets/questions.json", {observe: "body"});
    return this.httpClient.get<any>("assets/water-cycle-questions.json", {observe: "body"});
  }
}
