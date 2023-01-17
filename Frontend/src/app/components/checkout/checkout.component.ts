import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  sameBillingShippings: boolean = true;

  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shipping: this.formBuilder.group({
        zipCode: [''],
        state: [''],
        country: [''],
        city: [''],
        street: ['']
      }),
      billing: this.formBuilder.group({
        zipCode: [''],
        state: [''],
        country: [''],
        city: [''],
        street: ['']
      }),
      payment: this.formBuilder.group({
        cardName: [''],
        cardNumber: [''],
        cvc: [''],
        expMonth: [''],
        expYear: ['']
      })
    });
  }

  onSubmit(): void {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);
    console.log('Shipping:');
    console.log(this.checkoutFormGroup.get('shipping').value);
    console.log('Billing:');
    console.log(this.checkoutFormGroup.get('billing').value);
  }

  copyShippingToBillingAddress(event) {
    if(event.target.checked) {
      this.checkoutFormGroup.controls['billing'].setValue(this.checkoutFormGroup.controls['shipping'].value)
      this.sameShippingAndBilling(false);
    }else{
      this.checkoutFormGroup.controls['billing'].reset();
      this.sameShippingAndBilling(true);
    }
  }

  sameShippingAndBilling(checked: boolean) {
    this.sameBillingShippings = checked;
  }

}
