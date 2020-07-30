import { Component } from '@angular/core';
import { slideInAnimation, zoomAnimation } from "./animations/routeAnimation.animation";
import { RouterOutlet, OutletContext } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation, zoomAnimation]
})


export class AppComponent {
    title = 'frontEnd';
    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    };
}
