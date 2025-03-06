import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocheService } from '../../services/coche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coche-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './coche-form.component.html',
  styleUrls: ['./coche-form.component.css'],
})
export class CocheFormComponent implements OnInit {
  cocheForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private cocheService: CocheService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cocheForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      color: ['', Validators.required],
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.cocheService.obtenerCoche(id).subscribe({
        next: (data) => this.cocheForm.patchValue(data),
        error: (err) => {
          console.error('Error al obtener el coche:', err);
          alert('Error al cargar el coche. Por favor, inténtalo de nuevo.');
        },
      });
    }
  }

  guardarCoche(): void {
    if (this.cocheForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      const id = this.route.snapshot.params['id'];
      this.cocheService.actualizarCoche(id, this.cocheForm.value).subscribe({
        next: () => {
          alert('Coche actualizado correctamente.');
          this.router.navigate(['/coches']);
        },
        error: (err) => {
          console.error('Error al actualizar el coche:', err);
          alert('Error al actualizar el coche. Por favor, inténtalo de nuevo.');
        },
      });
    } else {
      this.cocheService.guardarCoche(this.cocheForm.value).subscribe({
        next: () => {
          alert('Coche creado correctamente.');
          this.router.navigate(['/coches']);
        },
        error: (err) => {
          console.error('Error al crear el coche:', err);
          alert('Error al crear el coche. Por favor, inténtalo de nuevo.');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/coches']);
  }
}