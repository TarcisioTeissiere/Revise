import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PecasComponent } from './pecas/pecas.component';
import { VerificacaoComponent } from './verificacao/verificacao.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'cadastro', component: CadastroComponent },
      { path: 'pecas', component: PecasComponent },
      { path: 'verificacao', component: VerificacaoComponent },
    ]),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDgemol9u4nSBU9i71yIbHyirCoYL8hgcI',
      authDomain: 'angularcar-17300.firebaseapp.com',
      databaseURL: 'https://angularcar-17300-default-rtdb.firebaseio.com',
      projectId: 'angularcar-17300',
      storageBucket: 'angularcar-17300.appspot.com',
      messagingSenderId: '767991644645',
      appId: '1:767991644645:web:12aa9f05213c418fa36f0c',
      measurementId: 'G-PK92DGTYJ9',
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    RootComponent,
    CadastroComponent,
    NavbarComponent,
    PecasComponent,
    VerificacaoComponent,
  ],
  bootstrap: [RootComponent],
  providers: [AuthService],
})
export class AppModule {}
