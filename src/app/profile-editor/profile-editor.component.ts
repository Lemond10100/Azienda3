import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

 onSubmit() {
      // TODO: Use EventEmitter with form value
      console.warn(this.profileForm.value);
    }

    updateProfile() {
      this.profileForm.patchValue({
        firstName: 'Nancy',
        address: {
          street: '123 Drew Street'
        }
      });
    }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
