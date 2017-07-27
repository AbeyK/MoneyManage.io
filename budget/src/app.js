import $ from 'jquery';
import 'jquery-ui-dist';
import { inject } from 'aurelia-framework';
import { User } from 'services/user';
import 'bootstrap';
import {configFB} from './config';
var bootbox = require('bootbox');

@inject(User)
export class App {
  constructor(user) {
    this.user = user;
    this.signedIn;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Budget Tool";
    config.map([
      {
        route: ['', 'home'], moduleId: 'home/home',
        name: 'home', title: ' MoneyManage: Budgeting Tool ', nav: false, settings: 'Home'
      },
      {
        route: 'personalinfo', moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'MoneyManage: Personal Info', nav: true, settings: 'Personal'
      },
      {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'MoneyManage: Spending Habits', nav: true, settings: 'Spending'
      },

      {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'MoneyManage: Results', nav: true, settings: 'Results'
      },
      {
        route: 'logout', moduleId: 'logout/logout',
        name: 'logout', title: 'MoneyManage: Logout', nav: false, settings: 'Logout'
      },
      {
        route: 'login', moduleId: 'login/login',
        name: 'login', title: 'MoneyManage: Login', nav: false, settings: 'Login'
      },
      {
        route: 'about', moduleId: 'about/about',
        name: 'about', title: 'MoneyManage: About', nav: false, settings: 'About'
      }
    ]);
  }

  logout() {
      firebase.auth().signOut()
      .then( () => {
          console.log("signed out");
          bootbox.alert({
              title: "MoneyManage",
              message: "You are signed out!",
              backdrop: true
          });

      })
      .catch( (error) => {
          console.log(error.message);
      });
  }
  
  attached() {
    firebase.initializeApp(configFB);

    var users = firebase.database().ref('Users');
    
    firebase.auth().onAuthStateChanged( (user) => {
      if(user) this.signedIn = true;
      else this.signedIn = false;
    });
  }
}
