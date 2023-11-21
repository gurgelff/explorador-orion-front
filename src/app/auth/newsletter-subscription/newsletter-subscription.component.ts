import { BaseAPI } from './../../core/api/base.api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../app/core/services/modal.service';
import { NewsletterRequest } from '../../../app/core/models/INewsletterRequest';
import { NewsletterResponse } from '../../../app/core/models/INewsletterResponse';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss'],
})
export class NewsletterSubscriptionComponent {
  newsletterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private baseAPI: BaseAPI
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    this.loaderService.setLoading(true);
    this.baseAPI
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
