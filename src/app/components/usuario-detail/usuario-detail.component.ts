import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  imports: [CommonModule, FormsModule], // Solo CommonModule
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el ID del usuario desde la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.usuarioService.obtenerUsuario(id).subscribe(
        (usuario) => {
          this.usuario = usuario;
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
          alert('No se pudo cargar el usuario.');
        }
      );
    }
  }

  // Método para eliminar al usuario
  eliminarUsuario(id: number | null): void {
    if (id === null || id === undefined) {
      console.error('ID inválido para eliminación');
      alert('Error: No se puede eliminar un usuario sin ID.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente.');
          this.router.navigate(['/usuarios']); // Redirige a la lista de usuarios
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
          alert('Error al eliminar el usuario. Inténtalo de nuevo.');
        }
      });
    }
  }

  // Función para redirigir a la edición de un usuario
  editarUsuario(id: number | null): void {
    if (id === null || id === undefined) {
      console.error('ID inválido para edición');
      alert('Error: El usuario no tiene un ID válido.');
      return;
    }
    this.router.navigate(['/usuarios/editar', id]);
  }

  // Función para redirigir a la lista de usuarios
  cancelar(): void {
    this.router.navigate(['/usuarios']); // Redirige a la lista de usuarios
  }

}
