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

    this.currentUser = {};
    this.currentKey;
  }

  configureRouter(config, router) {
    var widthLimit = true;
    if ($(window).width() < 800){
      widthLimit=false;
    }
    this.router = router;
    config.title = "Budget Tool";
    config.map([
      {
        route: ['', 'home'], moduleId: 'home/home',
        name: 'home', title: ' MoneyManage: Budgeting Tool ', nav: widthLimit, settings: 'Home'
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
        name: 'about', title: 'MoneyManage: About', nav: widthLimit, settings: 'About'
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

  save() {
    var currentUser = firebase.database().ref('Users/' + this.currentKey);
    
    currentUser.on('value', (snap) => {
      console.log(snap.val());
    });

    currentUser.update({"name" : "Joseph C"});

    bootbox.alert({
        title: "MoneyManage",
        message: "Content saved!",
        backdrop: true
    });
  }
  
  attached() {
    firebase.initializeApp(configFB);
    var users = firebase.database().ref('Users/');
    
    //When authorization is changed, call this function
    firebase.auth().onAuthStateChanged( (user) => {
      //If signed in, do this stuff
      if(user) {
        this.signedIn = true;
        var currentUid = user.uid;
        this.currentUser = {};

        //Get current key and user
        users.on('value', (snap) => {            
            snap.forEach( (currentSnap) => {
              if(currentSnap.val().uid == currentUid) { //Check for the signed in user
                this.currentKey = currentSnap.key; //Get key for changes
              }
            });
        });
      }
      else this.signedIn = false; //Let program know that the user is not signed in
    });
  }
}
