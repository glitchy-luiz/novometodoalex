import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from 'src/app/services/auth.service';
import { DadosextraService } from 'src/app/services/dadosextra.service';
import { Dadouser } from 'src/models/Dadouser';
import { collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { provideFirestore, getFirestore } from '@angular/fire/firestore'


@Component({
  selector: 'app-tipofamilia',
  templateUrl: './tipofamilia.page.html',
  styleUrls: ['./tipofamilia.page.scss'],
})
export class TipofamiliaPage implements OnInit {
  @Input() uid:string
  dadous =[]

 user:any|undefined;

 public listausers: Dadouser[] = []

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private route: Router,
    private rotaativa: ActivatedRoute,
    private dadosService: DadosextraService,
    private dadouser: Dadouser
  ) { }

  ngOnInit() {
    this.testebusca();

    this.user = this.rotaativa.snapshot.params['uid: dadous.uid']
    console.log(this.user)

      this.dadosService.buscarPorId(this.user).subscribe((dados:any) => {
        this.user.nome = dados['nome']
      })

      console.log(this.listausers)
      
      this.dadosService.getUsersById(this.uid).subscribe(res => {
        this.dadouser = res
      })
  }

  testebusca(){

    this.dadosService.testebusca().subscribe(dadosretorno =>{
      this.listausers =dadosretorno.map((registro:any) => (
        {
          uid: registro.payload.doc.id,
          nome: registro.payload.doc.data()['nome']
        }
        ))
      })
      console.log(this.listausers)
  }

  async logout() {
    await this.authService.logout()
    this.route.navigateByUrl('/', { replaceUrl:true});
  }

}