import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUrlPath: any
  option: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.option = false

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = event.url.slice(1).split(urlDelimitators)[0];

        this.currentUrlPath = currentUrlPath

        var route = ['']
        for (var i = 0; i <= route.length; i++) {
          if (route[i] != currentUrlPath) {
            this.option = false
          } else {
            this.option = true
            break
          }
        }

      }
    });


  }

}
