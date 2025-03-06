import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuarioForm!: FormGroup;
  isEditMode = false; 

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true; 
      this.usuarioService.obtenerUsuario(id).subscribe({
        next: (data) => this.usuarioForm.patchValue(data),
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
          alert('Error al cargar el usuario. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      const id = this.route.snapshot.params['id'];
      this.usuarioService.actualizarUsuario(id, this.usuarioForm.value).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente.');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
          alert('Error al actualizar el usuario. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      this.usuarioService.guardarUsuario(this.usuarioForm.value).subscribe({
        next: () => {
          alert('Usuario creado correctamente.');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          alert('Error al crear el usuario. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
