import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

export interface Item {
  key: string;
  email: string;
  marca: string;
  modelo: string;
  ano: number;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  email = '' as string;
  password = '' as string;

  formNewMarca = '' as string;
  formNewModelo = '' as string;
  formNewAno = '' as string;

  listRef: any;
  list: Observable<Item[]>;

  constructor(public auth: AuthService, private database: AngularFireDatabase) {
    this.listRef = database.list('list');
    this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<Item>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  ngOnInit() {}

  errorMessage: string = '';

  addItem() {
    this.list.subscribe((items) => {
      const emailExist = items.some((item) => item.email === this.auth.user.email);
      if (emailExist) {
        this.errorMessage = 'Você só pode cadastrar um carro por vez.';
        return;
      }

      this.listRef.push({
        marca: this.formNewMarca,
        modelo: this.formNewModelo,
        ano: this.formNewAno,
        email: this.auth.user.email,
      });
      this.formNewMarca = '';
      this.formNewModelo = '';
      this.formNewAno = '';
    });
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }
}
