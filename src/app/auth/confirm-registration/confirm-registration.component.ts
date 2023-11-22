import { ActivatedRoute, Router } from '@angular/router';
import { UserVerificationService } from './../../core/api/user-verification.api';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { IRegisterResponse } from 'src/app/core/models/iRegisterResponse';
import { IRequestUserVerification } from 'src/app/core/models/IRequestUserVerification';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss'],
})
export class ConfirmRegistrationComponent implements OnInit {

  constructor(
    private userVerificationService: UserVerificationService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {}

  /**
   * Método do ciclo de vida chamado quando o componente é inicializado.
   * Chama o método de confirmação de registro.
   */
  public ngOnInit(): void {
    this.confirmRegistration();
    
  }
  
  /**
   * Realiza a confirmação de registro utilizando o token da URL.
   * Se o token estiver presente, faz uma requisição POST para confirmar o registro do usuário.
   * Em caso de sucesso, redireciona para a página home e exibe uma caixa de diálogo de sucesso.
   * Em caso de falha, exibe uma caixa de diálogo de erro.
  */
 public confirmRegistration(): void {
   const {token} = this.route.snapshot.params;   
    if (token) {
      this.userVerificationService
        .post<IRequestUserVerification, IRegisterResponse>({token})
        .then((response) => {
          this.router.navigate(['/home']);
          this.modalService.showDialog({
            title: 'Sucesso',
            message: response.data.message,
            feedback: 'success',
          });
        })
        .catch((error) => {
          this.router.navigate(['/login']);
          this.modalService.showDialog({
            title: 'Falha!',
            message: error,
            feedback: 'error',
          });
        });
    }
  }
}
