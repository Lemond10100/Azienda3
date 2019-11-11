import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProvaHttp } from './prova-http';

@Injectable({
  providedIn: 'root'
})
export class RichiestaService {

  // dichiaro privata una variabile che contiene l'indirizzo del server
  private qualcosaltro = 'unurlchenonso';

  // nel costruttore metto privato una variabile chiamata http che sarà di tipo HttpClient (ovvero la classe)
  constructor(private http: HttpClient) { }


  // questo è il metodo per ricevere dati dal server
  // ovviamento è incompleto perche bisogna fare le stesse cose fatte negli altri component, per la post
  getQualcosa() {
  return this.http.get(this.qualcosaltro);
  }

  // questo è il metodo per inviare qualcosa al server
  // nome della variabile che avrà tipo ProvaHttp
  postQualcosa(qualcosaCheAvraTipo: ProvaHttp) {
    this.http.post<ProvaHttp>(this.qualcosaltro, qualcosaCheAvraTipo).subscribe();
    // gli passo come parametri l'url che voglio e il parametro che ho nomiato nella riga prima
    // in subscribe va inserita una funzione che voglio che gli venga mandata, puo anche rimanere vuoto
  }

}
