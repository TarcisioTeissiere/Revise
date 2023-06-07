import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

export interface ItemPeca {
  key: string;
  tipo: string;
  modelo: string;
  tempo: number;
}
@Component({
  selector: 'app-pecas',
  templateUrl: './pecas.component.html',
  styleUrls: ['./pecas.component.css'],
})
export class PecasComponent implements OnInit {
  email = '' as string;
  password = '' as string;

  formPneus = '' as string;
  formAnoPneus = '' as string;

  formFarois = '' as string;
  formAnoFarois = '' as string;

  formBateria = '' as string;
  formAnoBateria = '' as string;

  listRef: any;
  list: Observable<ItemPeca[]>;

  constructor(public auth: AuthService, private database: AngularFireDatabase) {
    this.listRef = database.list('list');
    this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<ItemPeca>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  ngOnInit() {}

  addItemPeca(tipo: string, modelo: string, tempo: string) {
    this.listRef.push({
      tipo: tipo,
      modelo: modelo,
      tempo: parseInt(tempo),
    });

    // Limpar os campos após adicionar o item
    if (tipo === 'Pneus') {
      this.formPneus = '';
      this.formAnoPneus = '';
    } else if (tipo === 'Faróis') {
      this.formFarois = '';
      this.formAnoFarois = '';
    } else if (tipo === 'Bateria') {
      this.formBateria = '';
      this.formAnoBateria = '';
    }
  }

  deleteItemPeca(key: string) {
    this.listRef.remove(key);
  }
}
