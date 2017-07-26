import $ from 'jquery';
import 'jquery-ui-dist';
import { inject } from 'aurelia-framework';
import { User } from 'services/user';
import 'bootstrap';
//import firebase from '../node_modules/firebase/firebase';

var firebase = require('../node_modules/firebase/firebase');

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
  
  attached() {
    // var config = {
    //   apiKey: "AIzaSyDSnN1wO56xgVDshPH6GTZcDeGzNY1AyIQ",
    //   authDomain: "moneymanage-f79cc.firebaseapp.com",
    //   databaseURL: "https://moneymanage-f79cc.firebaseio.com",
    //   projectId: "moneymanage-f79cc",
    //   storageBucket: "moneymanage-f79cc.appspot.com",
    //   messagingSenderId: "466558174283"
    // };

    // firebase.initializeApp(config);
  }
}
