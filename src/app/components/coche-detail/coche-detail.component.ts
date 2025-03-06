import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocheService } from '../../services/coche.service';
import { Coche } from '../../models/coche.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coche-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coche-detail.component.html',
  styleUrls: ['./coche-detail.component.css'],
})
export class CocheDetailComponent implements OnInit {
  coche: Coche | null = null;

  constructor(
    private cocheService: CocheService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cocheService.obtenerCoche(id).subscribe(
        (coche) => (this.coche = coche),
        (error) => {
          console.error('Error al obtener el coche', error);
          alert('No se pudo cargar el coche.');
        }
      );
    }
  }

  eliminarCoche(id: number | null): void {
    if (id === null || id === undefined) {
      console.error('ID inválido para eliminación');
      alert('Error: No se puede eliminar un coche sin ID.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este coche?')) {
      this.cocheService.eliminarCoche(id).subscribe({
        next: () => {
          alert('Coche eliminado correctamente.');
          this.router.navigate(['/coches']);
        },
        error: (err) => {
          console.error('Error al eliminar el coche:', err);
          alert('Error al eliminar el coche. Inténtalo de nuevo.');
        },
      });
    }
  }

  editarCoche(id: number | null): void {
    if (id === null || id === undefined) {
      console.error('ID inválido para edición');
      alert('Error: El coche no tiene un ID válido.');
      return;
    }
    this.router.navigate(['/coches/editar', id]);
  }

  cancelar(): void {
    this.router.navigate(['/coches']);
  }
}