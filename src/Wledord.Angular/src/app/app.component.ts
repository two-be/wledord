import { Component, OnInit } from "@angular/core"

import { AppService } from "./app.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  allWords: string[] = []
  correct = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  }
  exclude = ""
  include = ""
  incorrect = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  }
  loading = false
  wordleKeys: number[] = [0, 1, 2, 3, 4]
  words: string[] = []

  constructor(private service: AppService) { }

  async initWords() {
    try {
      this.loading = true
      let rs = await this.service.get().toPromise()
      this.allWords = Object.keys(rs).filter(x => rs[x].length == 5).map(x => rs[x].toUpperCase())
      this.wordleChange()
      localStorage.setItem("words", JSON.stringify(this.allWords))
      this.loading = false
    } catch (err) {
      console.error(err)
      this.loading = false
    }
  }

  async ngOnInit() {
    this.words = JSON.parse(localStorage.getItem("words") || "[]")
    if (this.words.length) {
      this.allWords = this.words
      this.initWords()
      this.loading = false
    } else {
      await this.initWords()
    }
  }

  wordClick(e: string) {
    this.exclude += e
    this.wordleChange()
  }

  wordleChange() {
    let corrects = this.wordleKeys.filter(x => this.correct[x]).map(x => this.correct[x].toUpperCase())
    let incorrects = this.wordleKeys.filter(x => this.incorrect[x]).flatMap(x => Array.from(this.incorrect[x].toUpperCase()))
    let excludes = Array.from(this.exclude.toUpperCase())
    let includes = [...corrects, ...incorrects]
    this.words = this.allWords
    excludes.filter(x => !includes.includes(x)).forEach(x => {
      this.words = this.words.filter(y => !y.includes(x))
    })
    includes.forEach(x => {
      this.words = this.words.filter(y => y.includes(x))
    })
    this.words = this.words.filter(x => this.wordleKeys.every(y => x.charAt(y).includes(this.correct[y].toUpperCase())))
    this.words = this.words.filter(x => this.wordleKeys.every(y => !this.incorrect[y].toUpperCase().includes(x.charAt(y))))
  }
}
