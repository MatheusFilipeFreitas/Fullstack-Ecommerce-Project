import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentFormService } from './../../services/payment-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  sameBillingShippings: boolean = true;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingStates: State[] = [];
  billingStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private paymentFormService: PaymentFormService){

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
        country: [''],
        state: [''],
        city: [''],
        street: ['']
      }),
      billing: this.formBuilder.group({
        zipCode: [''],
        country: [''],
        state: [''],
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

    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('Start month: ' + startMonth);

    this.paymentFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    //populate credit card years
    this.paymentFormService.getCreditCardYears().subscribe(
      data => {
        console.log('Retrieved credit card years: ' + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //populate countries
    this.paymentFormService.getCountries().subscribe(
      data => {
        console.log('Retrieved countries: ' + JSON.stringify(data));
        this.countries = data;
      }
    );


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

      //bug fix for states
      this.billingStates = this.shippingStates;
    }else{
      this.checkoutFormGroup.controls['billing'].reset();
      this.sameShippingAndBilling(true);

      //bug fix for states
      this.billingStates = [];
    }
  }

  sameShippingAndBilling(checked: boolean) {
    this.sameBillingShippings = checked;
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('payment');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expYear);

    //if the current year equals the selected year, then start with current month
    let startMonth: number;

    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }

    this.paymentFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country code: ${countryName}`);

    this.paymentFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shipping'){
          this.shippingStates = data;
        }else{
          this.billingStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}
