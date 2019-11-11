import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProvaHttp } from '../prova-http';
import { RichiestaService } from '../richiesta.service';

@Component({
  selector: 'app-controllo-lettera',
  templateUrl: './controllo-lettera.component.html',
  styleUrls: ['./controllo-lettera.component.css']
})
export class ControlloLetteraComponent implements OnInit {

  // creo un nuovo form builder di "tipo group" chiamato profileForm
  // fb è il nome del formbuilder che ho dichiarato nel costruttore
  profileForm = this.fb.group({
    // con questo metodo di scrittura dei vari campi con '' ho l'istanza
    // nel caso io abbia piu validatori devo inserirli in un array fra []

    //Validators.pattern(/^\S*$/) -> spazio nei campi

    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    genderm: ['', Validators.required],
    birthday: ['', Validators.required],
    cf: ['', [Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$'), Validators.required]],
    ciNumber: ['', Validators.pattern('^[a-zA-Z]{2}[0-9]{7}')],
    ciEmission: ['', [Validators.required]],
    ciEspire: ['', [Validators.required]],
    email: ['', Validators.pattern("[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")],
    route: ['', Validators.pattern('[a-zA-Z ]*')],
    civicNumber: ['', Validators.pattern('[0-9]*')],
    cityResidence: ['', Validators.pattern('[a-zA-Z ]*')],
    cap: ['', Validators.pattern('([0-9]{5})')],
  });


  // istanzio un oggetto chiamato persona da una classa chiamata ProvaHttp
  // ProvaHttp è una classe
  persona = new ProvaHttp();



  // nel costruttore dichiaro privata, quindi non modificabile, la variabile fb di tipo formbuilder (tipo di angular)
  // e dichiaro privata anche la variabile rich che è di tipo RichiestaService, ovvero il servizio
  constructor(private fb: FormBuilder, private rich: RichiestaService) { }


  // funzione che controlla che la terza lettera del parametro passato (cognome) sia p
  // restituisce null se vero e errore se falso
  /*
  validatoreLettera(cognome) {
    if (cognome.value.charAt(3) === 'p') {
      return null;
    } else {
      return 'errore';
    }
  }
  */


  ngOnInit() {
  }

  msgNome='';

  onSubmit() {

    let flag = true;

    this.controlloCodice();
    console.log(this.profileForm);
    console.warn(this.profileForm.value); // consol log con il valore del profile form
    console.log(new Date(this.profileForm.get('birthday').value) < new Date() );


    console.log(this.profileForm)

    if (this.profileForm.get('firstName').invalid) {
      this.msgNome = 'nome non valido';
      flag = false;
    }

    // qui inizia la parte che comunica con il server
    // ho istanziato prima persona dalla classe ProvaHttp ed ora voglio assegnare al valore nome della classe persona il valore
    // di firstname
    this.persona.nome = this.profileForm.get('firstName').value;
    // ora dico che la variabile rich di tipo richiestaService mi chiami la funzione postQualcosa con parametro la persona

    if ( flag ) {
      this.rich.postQualcosa(this.persona);
    }
    
  }

  // check su nome e cognome per il controllo fiscale
  controlloFiscaleNome(): string {
    let i = 0;
    const stringaNome: string = this.profileForm.get('firstName').value.toLowerCase().trim();
    let stringaConsonanti = '';
    let stringaVocali = '';
    let differenza: number;

    for ( i = 0; i < stringaNome.length; i++) {
      if (stringaNome[i] !== 'a' && stringaNome[i] !== 'e' && stringaNome[i] !== 'i' && stringaNome[i]
                    !== 'o' && stringaNome[i] !== 'u') {
        stringaConsonanti += stringaNome[i];
      } else {
        stringaVocali += stringaNome[i];
      }
    }
    if (stringaConsonanti.length < 3) {
      differenza = 3 - stringaConsonanti.length;
      if (differenza === 3) {
        if (stringaVocali.length === 2) {
          return stringaVocali + 'x';
        } else {
        return stringaVocali[0] + stringaVocali[1] + stringaVocali[2];
        }
      } else if (differenza === 2) {
        if (stringaVocali.length === 1) {
          return stringaConsonanti[0] + stringaVocali[0] + 'x';
        }
        return stringaConsonanti[0] + stringaVocali[0] + stringaVocali[1];
      } else if (differenza === 1) {
        if ( stringaVocali.length === 0 ) {
          return stringaConsonanti[0] + stringaConsonanti[1] + 'x';
        }
        return stringaConsonanti[0] + stringaConsonanti[1] + stringaVocali[0];
      }
    } else {
        if (stringaConsonanti.length === 3) {
        return stringaConsonanti;
        } else {
          return stringaConsonanti[0] + stringaConsonanti[2] + stringaConsonanti[3];
        }
      }
    }

  controlloFiscaleCognome(): string {
    let i = 0;
    const stringaCognome: string = this.profileForm.get('lastName').value.toLowerCase().trim();
    let stringaConsonanti = '';
    let stringaVocali = '';
    let differenza: number;

    for ( i = 0; i < stringaCognome.length; i++) {
      if (stringaCognome[i] !== 'a' && stringaCognome[i] !== 'e' && stringaCognome[i] !== 'i' && stringaCognome[i]
                    !== 'o' && stringaCognome[i] !== 'u') {
        stringaConsonanti += stringaCognome[i];
      } else {
        stringaVocali += stringaCognome[i];
      }
    }
    if (stringaConsonanti.length < 3) {
      differenza = 3 - stringaConsonanti.length;
      if (differenza === 3) {
        if (stringaVocali.length === 2) {
          return stringaVocali + 'x';
        } else {
        return stringaVocali[0] + stringaVocali[1] + stringaVocali[2];
        }
      } else if (differenza === 2) {
        if (stringaVocali.length === 1) {
          return stringaConsonanti[0] + stringaVocali[0] + 'x';
        }
        return stringaConsonanti[0] + stringaVocali[0] + stringaVocali[1];
      } else if (differenza === 1) {
        if ( stringaVocali.length === 0 ) {
          return stringaConsonanti[0] + stringaConsonanti[1] + 'x';
        }
        return stringaConsonanti[0] + stringaConsonanti[1] + stringaVocali[0];
      }
    } else {
      return stringaConsonanti[0] + stringaConsonanti[1] + stringaConsonanti[2];
    }
  }

  cotrolloFiscaleData() {
    const mesi = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm', 'p', 'r', 's', 't'];
    const mesi2 = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
    const mese: number = new Date(this.profileForm.get('birthday').value).getMonth();
    if (mesi[mese] === this.profileForm.get('cf').value[8] || mesi2[mese] === this.profileForm.get('cf').value[8]) {
      return true;
    } else {
      return false;
    }
  }

  controlloCodice(): boolean {
    const stringaCodice: string = this.profileForm.get('cf').value;

    const cfc = this.controlloFiscaleCognome();
    const cfc2 = this.controlloFiscaleNome();

    const stringaCf: string = this.profileForm.get('cf').value;

    const data: string = this.profileForm.get('birthday').value;

    // posizione 8 e 9 sono uguali a f se quello che hai inserito è f true
    if ( stringaCodice[0] === cfc[0]
      && stringaCodice[1] === cfc[1]
      && stringaCodice[2] === cfc[2]
      && stringaCodice[3] === cfc2[0]
      && stringaCodice[4] === cfc2[1]
      && stringaCodice[5] === cfc2[2]
      && stringaCf[6] === data[2]
      && stringaCf[7] === data[3]
      && stringaCf[10] === data[9] ) {
        console.log(new String( parseInt(data[8], 10) + 4));
        console.log(stringaCf[9]);
        if ( this.profileForm.get('genderm').value === 'f' && stringaCf[9] === new String( parseInt(data[8], 10) + 4))  {
          return true;
        } else if (this.profileForm.get('genderm').value === 'm' && stringaCf[9] === data[8]) {
        return true;
        } else {
          return false;
        }
      } else {
        return false;
    }
  }


 // get month
  data(): boolean {
    if  (new Date(this.profileForm.get('birthday').value) < new Date()) {
      return true;
    } else {
      return false;
    }
  }

  dataStringata(): number {
    return new Date(this.profileForm.get('birthday').value).getMonth() + 1;
    }

  /*codiciCatastali() {
    const pippo = this.profileForm.get('cf').value;
    const pluto = this.profileForm.get('cityBD').value;
    console.log(this.catasto[pippo[11] + pippo[12] + pippo[13] + pippo[14]]);
    console.log(pippo[11] + pippo[12] + pippo[13] + pippo[14]);
    console.log(this.catasto);

    if (this.catasto[pippo[11] + pippo[12] + pippo[13] + pippo[14]] === pluto) {
      return true;
    } else {
      return false;
    }
  }*/

  dataMinoreMaggiore() {
    const rilascio = new Date(this.profileForm.get('ciEmission').value);
    const scadenza = new Date(this.profileForm.get('ciEspire').value);

    if (rilascio < scadenza) {
      return true;
    } else {
      return false;
    }
  }

  differenza() {
    const rilascio = new Date(this.profileForm.get('ciEmission').value).getFullYear();
    const scadenza = new Date(this.profileForm.get('ciEspire').value).getFullYear();
    const rilascioMese = new Date(this.profileForm.get('ciEmission').value).getMonth();
    const scadenzaMese = new Date(this.profileForm.get('ciEspire').value).getMonth();
    const rilascioGg = new Date(this.profileForm.get('ciEmission').value).getDay();
    const scadenzaGg = new Date(this.profileForm.get('ciEspire').value).getDay();

    return ('la validità è di ' + (scadenza - rilascio) + 'anni, ' + (scadenzaMese - rilascioMese)
    + 'mesi e ' + (scadenzaGg - rilascioGg) + 'giorni.');
  }

  anni() {
    var milliNasc = new Date(this.profileForm.get('birthday').value).getTime();
    /*  var oggi = new Date().getMilliseconds(); */

    var d = new Date();
    var milliOggi = d.getTime();

    let milliAnni =( milliOggi - milliNasc);
    let giorno = (milliAnni/86400000);
    let anno = (giorno/365);
    let nAnno = anno + (anno*0.00000167);
  
    var arrnAnno = Math.floor(nAnno);
    var arrAnno = Math.floor(anno);
    var arrGiorno = Math.floor(giorno); 

    return arrnAnno;
 }

}
