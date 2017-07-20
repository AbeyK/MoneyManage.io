import $ from 'jquery';
import 'jquery-ui-dist';
import { inject } from 'aurelia-framework';
import { User } from 'services/user';
import 'bootstrap';

@inject(User)
export class App {
  constructor(user) {
    this.user = user;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Budget Tool";
    config.map([
      {
        route: ['', 'home'], moduleId: 'home/home',
        name: 'home', title: ' &#xe021', nav: false
      },
      {
        route: 'personalinfo', moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'PERSONAL', nav: true
      },
      {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'EXPENSES', nav: true
      },

      {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'RESULTS', nav: true
      },
      {
        route: 'logout', moduleId: 'logout/logout',
        name: 'logout', title: 'Logout', nav: false
      }
    ]);
  }
}
