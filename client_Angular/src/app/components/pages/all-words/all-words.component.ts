import { Component, OnInit } from "@angular/core";

import { WordsService } from "src/app/service/words.service";

@Component({
  selector: "app-all-words",
  templateUrl: "./all-words.component.html",
  styleUrls: ["./all-words.component.scss"],
})
export class AllWordsComponent implements OnInit {
  words: any;

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {
    this.wordsService.getAllWords().subscribe({
      next: (value) => {
        console.log(value);
        this.words = value;
      },
    });
  }
}
