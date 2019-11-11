import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {

  name = new FormControl(''); // istanzio un nuovo elemento chiamato name di tipo form control

  updateName() { // creo una funzione con questo nome
    this.name.setValue('Nancy'); // la funzione setta il valore del contenuto di name in Nancy
  }

  constructor() { }

  ngOnInit() {
  }

}
