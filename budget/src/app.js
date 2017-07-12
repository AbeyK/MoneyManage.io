import $ from 'jquery';
import 'bootstrap';

export class App {
  constructor() {
    this.message = 'Hello World!';
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = "Budget Calculator";
    config.map([
      {
        route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      },

      {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'Expenses', nav: true
      },

      {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      }
    ]);
  }
}
