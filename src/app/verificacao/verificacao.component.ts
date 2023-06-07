import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  tipo: string;
  marcaModelo: string;
  ano: number;
}

@Component({
  selector: 'app-verificacao',
  templateUrl: './verificacao.component.html',
  styleUrls: ['./verificacao.component.css'],
})
export class VerificacaoComponent implements OnInit {
  items: Item[] = [];

  constructor(private database: AngularFireDatabase) {}

  ngOnInit() {
    this.database
      .list<unknown>('list')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c: SnapshotAction<unknown>) => {
            const payload = c.payload.val() as {
              tipo: string;
              marcaModelo: string;
              ano: number;
            };
            return {
              tipo: payload.tipo,
              marcaModelo: `${payload.marcaModelo}`,
              ano: payload.ano,
            };
          })
        )
      )
      .subscribe((items) => {
        this.items = items;
      });
  }

  getStatus(ano: number): string {
    if (ano < 2) {
      return 'Não é necessário a troca';
    } else {
      return 'Precisa realizar a troca urgentemente';
    }
  }
}
