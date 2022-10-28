import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../service/quiz.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  private _user: string = "";
  private _questions: any = [];
  private _currentQuestion: number = 0;
  private _points: number = 0;
  private _counter = 60;
  private _correctAnswer: number = 0;
  private _inCorrectAnswer: number = 0;
  private _interval$: any;
  private _progress: string = "0";
  private _isQuizCompleted: boolean = false;

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user")!;
    this.retrieveQuestions();
    this.startCounter();
  }

  retrieveQuestions() {
    this.quizService.retrieveQuestions()
      .subscribe(response => {
        this.questions = response.questions;
      })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    if (currentQno === this.questions.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.progressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.progressPercent();
      }, 1000);

      this.points -= 10;
    }
  }

  progressPercent() {
    this.progress = ((this.currentQuestion / this.questions.length) * 100).toString();
    return this.progress;
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.retrieveQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  /** getters & setters **/
  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get questions(): any {
    return this._questions;
  }

  set questions(value: any) {
    this._questions = value;
  }

  get currentQuestion(): number {
    return this._currentQuestion;
  }

  set currentQuestion(value: number) {
    this._currentQuestion = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  get counter(): number {
    return this._counter;
  }

  set counter(value: number) {
    this._counter = value;
  }

  get correctAnswer(): number {
    return this._correctAnswer;
  }

  set correctAnswer(value: number) {
    this._correctAnswer = value;
  }

  get inCorrectAnswer(): number {
    return this._inCorrectAnswer;
  }

  set inCorrectAnswer(value: number) {
    this._inCorrectAnswer = value;
  }

  get interval$(): any {
    return this._interval$;
  }

  set interval$(value: any) {
    this._interval$ = value;
  }

  get progress(): string {
    return this._progress;
  }

  set progress(value: string) {
    this._progress = value;
  }

  get isQuizCompleted(): boolean {
    return this._isQuizCompleted;
  }

  set isQuizCompleted(value: boolean) {
    this._isQuizCompleted = value;
  }

}
