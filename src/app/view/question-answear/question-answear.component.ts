import { Component, OnInit } from '@angular/core';

export interface AnswearsAndQuestions {
  question: string;
  answear: string;
}

@Component({
  selector: 'app-question-answear',
  templateUrl: './question-answear.component.html',
  styleUrls: ['./question-answear.component.scss'],
})
export class QuestionAnswearComponent implements OnInit {
  public indexExpanded: number;
  public isHidden = true;

  public displayContents: AnswearsAndQuestions[];

  public ngOnInit(): void {
    this.displayContents = [
      {
        question: 'Ce este Marity.ro? ',
        answear: `
          Marity.ro este o platformă online dedicată organizării de evenimente, special concepută pentru a conecta mirii
          cu o varietate largă de furnizori profesioniști din industria evenimentelor. De la locații, fotografi,
          până la florari și muzicieni, Marity.ro oferă acces la toate resursele necesare pentru a planifica un eveniment memorabil.
        `,
      },
      {
        question: 'Cât costă utilizarea Marity.ro? ',
        answear: `
          Utilizarea Marity.ro este complet <strong>gratuită</strong> pentru mirii în căutarea furnizorilor
          și va rămâne gratuită pentru totdeauna.
          </br>
          Vă oferim acces la o gamă largă de resurse pentru organizarea evenimentului perfect, <strong>fără niciun cost</strong>.
        `,
      },
      {
        question: 'Pot contacta direct furnizorii prin Marity.ro?',
        answear: `
          Conectarea clienților cu cei mai buni furnizori din industrie este principala funcționalitate a Marity.ro.
          Pe lângă detaliile de contact clasice, număr de telefon și email,
          ai acces la un serviciu dedicat de chat și la un sistem unic în România de negociere a ofertelor
        `,
      },
      {
        question:
          'Cum pot să mă asigur de calitatea serviciilor oferite de furnizorii de pe Marity.ro?',
        answear: `Recomandăm vizitarea paginilor de prezentare a furnizorilor, vizualizarea recenziilor și ratingurilor 
        lăsate de alți utilizatori, precum și studierea portofoliilor furnizorilor pentru a te asigura de calitatea serviciilor lor.`,
      },
      {
        question: 'Pot vedea atunci când un furnizor este disponibil la o dată anume?',
        answear: `Da, majoritatea furnizorilor au calendarele de evenimente publicate pe pagina de prezentare. 
        </br><strong>Te rugăm să reții faptul că publicarea calendarelor de evenimente reprezintă opțiunea fiecărui furnizor, 
        unii dintre aceștia alegând să nu îl facă public.</strong> 
        Pentru oricare dintre cazuri, poți folosi chestionarul de pe pagina furnizorilor pentru a verifica disponibilitatea datelor`,
      },
      {
        question: 'Care sunt avantajele creării unui cont pe Marity.ro?',
        answear: `
          Crearea unui cont pe Marity.ro ca mire sau mireasă oferă acces la o serie de beneficii
          și funcționalități esențiale pentru planificarea evenimentului perfect.
          De la accesul la o gamă largă de furnizori de servicii, la primirea și negocierea de oferte,
          Marity.ro este instrumentul perfect pentru o planificare 
          exactă cât și pentru economii substanțiale de timp și de bani
        `,
      },
      {
        question: 'Cum pot lăsa o recenzie pentru un furnizor cu care am colaborat prin Marity.ro?',
        answear: `
          După eveniment, te poți autentifica în contul tău și poți lăsa o recenzie pe pagina
          furnizorului folosind serviciul Google Reviews,
          împărtășind experiența ta pentru a ajuta și alțe persoane în alegerea lor.
        `,
      },
      {
        question: 'Ai o alta întrebare?',
        answear:
          'Îți stăm la dispoziție pentru orice informație sau detaliu suplimentar prin serviciul de Marity Support.',
      },
    ];
  }

  public toggleElement() {
    this.isHidden = !this.isHidden;
  }

  public showAnswearDetails(index: number): void {
    this.indexExpanded = this.indexExpanded === index ? -1 : index;
  }
}
