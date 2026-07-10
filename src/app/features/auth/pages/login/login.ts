import { Component, OnInit } from "@angular/core";
import {  ReactiveFormsModule, FormGroup, FormBuilder, FormControl,  Validators } from "@angular/forms";
// importation du service Auth
import {AuthService} from '../../services/auth';
// importation de
@Component({
  selector:'app-login',
  standalone:false,
  templateUrl:'./login.html',
  styleUrls:[
    './login.css']
})
export class Login implements OnInit{
  //Création de nos régles de regex en readonly
  private readonly REGEX_EMAIL =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  private readonly REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,15}$/;

  // création de notre formGroup
  public LoginForm!:FormGroup;

  // injection des dépendances dans le constructor
  constructor(
    private fb:FormBuilder,
    private auth:AuthService
  ){}

  // création de notre méthode ngOninit()
  ngOnInit(): void {
    //création du méthode qui créé et charge le formulaire de connexion
    this.initForm();
  }

  // création de notre formulaire dans notre méthode iniForm()
  private initForm(): void {
    this.LoginForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern(this.REGEX_EMAIL)]],
      password:['',[Validators.required, Validators.pattern(this.REGEX_PASSWORD)]]
    })
  }

  // Création de guetteurs pour l'affichage des erreurs
  get emailControl(){
    return this.LoginForm.get('email');
  }

  get passwordControl(){
    return this.LoginForm.get('password');
  }

  // la fonction onSubmit() qui s'éxécute aprés tentative de connexion
  public onSubmit():void{
    const credentials = this.LoginForm.value;

    this.auth.verifierConnexion(
      credentials
    ).subscribe({
      // méthode next si la connexion est réussie
      next:(reponse) => {
        console.log("Bravo, vous êtes connecté !",reponse);
      },
      // methode erreur pour les erreurs de connexions
      error:(erreur) => {
        console.log("Erreur de connexion...",erreur);
      },
      complete:() => {
        console.log('Requette terminée !');
      }
    }) 
  }


}