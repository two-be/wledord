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

  wordleChange() {
    let excludes = Array.from(this.exclude)
    let includes = [...Object.keys(this.wordle).filter(x => this.wordle[x]).map(x => this.wordle[x]), ...Object.keys(this.wledord).filter(x => this.wledord[x]).map(x => this.wledord[x])]
    this.words = this.allWords
    excludes.filter(x => !includes.includes(x)).forEach(x => {
      this.words = this.words.filter(y => !y.includes(x.toUpperCase()))
    })
    includes.forEach(x => {
      this.words = this.words.filter(y => y.includes(x.toUpperCase()))
    })
    this.words = this.words.filter(x => this.wordleKeys.every(y => x.charAt(y).includes(this.wordle[y].toUpperCase())))
    this.words = this.words.filter(x => this.wordleKeys.every(y => x.charAt(y) != this.wledord[y].toUpperCase()))
  }
}
