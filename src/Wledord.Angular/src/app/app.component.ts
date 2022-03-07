import { Component, OnInit } from "@angular/core"

import { AppService } from "./app.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  allWords: string[] = []
  exclude = ""
  excludes: string[] = []
  include = ""
  includes: string[] = []
  loading = false
  wledord = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  }
  wordle = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  }
  wordleKeys: number[] = [0, 1, 2, 3, 4]
  words: string[] = []

  constructor(private service: AppService) { }

  async initWords() {
    try {
      this.loading = true
      let rs = await this.service.get().toPromise()
      this.words = Object.keys(rs).filter(x => rs[x].length == 5).map(x => rs[x].toUpperCase())
      this.allWords = this.words
      localStorage.setItem("words", JSON.stringify(this.words))
      this.loading = false
    } catch (err) {
      console.error(err)
      this.loading = false
    }
  }

  async ngOnInit() {
    this.words = JSON.parse(localStorage.getItem("words") || "[]")
    this.allWords = this.words
  }

  wordleChange() {
    let excludes = Array.from(this.exclude)
    let includes = Array.from(this.include)
    this.words = this.allWords
    excludes.forEach(x => {
      this.words = this.words.filter(y => !y.includes(x.toUpperCase()))
    })
    includes.forEach(x => {
      this.words = this.words.filter(y => y.includes(x.toUpperCase()))
    })
    this.words = this.words.filter(x => this.wordleKeys.every(y => x.charAt(y).includes(this.wordle[y].toUpperCase())))
    this.words = this.words.filter(x => this.wordleKeys.every(y => x.charAt(y) != this.wledord[y].toUpperCase()))
  }
}
