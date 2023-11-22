import { NewsletterAPI } from '../../core/api/newsletter.api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../app/core/services/modal.service';
import { NewsletterRequest } from '../../../app/core/models/INewsletterRequest';
import { NewsletterResponse } from '../../../app/core/models/INewsletterResponse';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class NewsletterSubscriptionComponent {
  public newsletterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private newsletterAPI: NewsletterAPI
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    this.loaderService.setLoading(true);
    this.newsletterAPI
      .post<NewsletterRequest, NewsletterResponse>(
        this.newsletterForm.value.email
      )
      .then((response) => {
        this.modalService.showDialog({
          title: 'Sucesso',
          message: response.data.message,
          feedback: 'success',
        });
      })
      .catch((error) => {
        this.modalService.showDialog({
          title: 'Falha!',
          message: error,
          feedback: 'error',
        });
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}
