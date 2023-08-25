import { Component, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { IUser } from "src/app/Models/iuser";
import { UserAuthService } from "src/app/Services/user-auth.service";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-signup-modal",
  templateUrl: "./signup-modal.component.html",
  styleUrls: ["./signup-modal.component.css"],
})
export class SignupModalComponent {
  modalRef!: BsModalRef;
  userForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: UserAuthService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(3)]],
        lastName: [
          "",
          [Validators.required, Validators.pattern("[A-Za-z]{4,}")],
        ],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;

    if (password !== confirmPassword) {
      control.get("confirmPassword")?.setErrors({ passwordMismatch: true });
    } else {
      control.get("confirmPassword")?.setErrors(null);
    }
  }

  get firstName() {
    return this.userForm.get("firstName");
  }
  get lastName() {
    return this.userForm.get("lastName");
  }
  get email() {
    return this.userForm.get("email");
  }
  get password() {
    return this.userForm.get("password");
  }
  get confirmPassword() {
    return this.userForm.get("confirmPassword");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  addUser() {
    if (this.userForm.valid) {
      this.userService.checkEmailExists(this.userForm.value.email).subscribe({
        next: (emailExists) => {
          if (emailExists) {
            this.email?.setErrors({ emailExists: true });
          } else {
            const user: IUser = {
              id: Math.trunc(Math.random() * 100000000),
              firstName: this.userForm.value.firstName.toLowerCase(),
              lastName: this.userForm.value.lastName.toLowerCase(),
              email: this.userForm.value.email.toLowerCase(),
              password: this.userForm.value.password.toLowerCase(),
            };
            this.userService.signUpUser(user).subscribe({
              next: (user) => {
                this.submitted = true;
                this.router.navigate(["/home"]);
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {
                setTimeout(() => {
                  this.modalRef.hide();
                  this.userForm.reset();
                  this.submitted = false;
                }, 3000);
                this.userService.login(user.email, user.password);
              },
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
