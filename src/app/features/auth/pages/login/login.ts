import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from "@angular/forms";
@Component({
  selector:'app-login',
  standalone:false,
  templateUrl:'./login.html',
  styleUrls:[
    './login.css']
})
export class Login implements OnInit{

  // Création de nos régles de validators en readonly
  private readonly REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,15}$/;
  private readonly REGEX_EMAIL= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
 
  // Créons notre objet FormGroup en not Null
  public LoginForm!:FormGroup;

  //injection des dépendances dans le constructor
  constructor(private fb:FormBuilder){}

  // Création de la méthode ngOnInit
  ngOnInit():void{
    this.initForm(); // méthode qui créé et charge les champs du formulaire de connexion
  }
  
  // Création de notre formulaire dans initForm
  private initForm():void{
    this.LoginForm = this.fb.group({
      email:['',
        [Validators.required, Validators.pattern(this.REGEX_EMAIL)]
      ],
      password:['',
        [Validators.required, Validators.pattern(this.REGEX_PASSWORD)]
      ]
    }) 
  }

  // créations de getters pour les affichages d'erreurs
  get emailControl(){
    return this.LoginForm.get('email');
  }
  get passwordControl(){
    return this.LoginForm.get('password');
  }

  // la fonction onSubmit() qui s'éxécute aprés tentative de connexion
  public onSubmit():void{
    if(this.LoginForm.invalid){
      this.LoginForm.markAllAsTouched();
      return
    }
    const credentials = this.LoginForm.value;
    console.log("Les infos de connexions prets à etre envoyé coté backend: ", credentials);
  }

}