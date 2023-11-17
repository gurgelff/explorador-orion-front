import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss'],
})
export class NewsletterSubscriptionComponent {
  newsletterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      // Implemente a lógica para enviar o e-mail ou fazer o que for necessário
      console.log('E-mail enviado:', this.newsletterForm.value.email);
    } else {
      // Trate os erros ou faça algo apropriado
      console.log('Formulário inválido');
    }
  }
}
