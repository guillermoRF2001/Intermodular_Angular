import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  vistaActual: string = 'usuarios';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.vistaActual = this.router.url.includes('usuarios') ? 'usuarios' : 'coches';
    });
  }

  cambiarVista() {
    const nuevaRuta = this.vistaActual === 'usuarios' ? '/coches' : '/usuarios';
    this.router.navigate([nuevaRuta]);
  }
}