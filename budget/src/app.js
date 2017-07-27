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

  save() {
    var currentUser = firebase.database().ref('Users/' + this.currentKey);

    //PERSONAL INFO
    var personalInfo = firebase.database().ref('Users/' + this.currentKey + '/personalInfo');
    personalInfo.update({
      "age" : parseInt(this.user.personalInfo.age),
      "income" : parseInt(this.user.personalInfo.income),
      "savingsPerMonth" : parseInt(this.user.personalInfo.savingsPerMonth),
      "householdSize" : parseInt(this.user.personalInfo.householdSize),
      "squareFootHome" : parseInt(this.user.personalInfo.squareFootHome)
    });

    //GOALS
    var goals = firebase.database().ref('Users/' + this.currentKey + '/goals');
    goals.update({
      "goalsList" : this.user.personalInfo.goalsList,
      "currentGoals" : this.user.personalInfo.currentGoals,
      "currentGoalsRanks" : this.user.personalInfo.currentGoalsRanks,
      
      "PrivateSchool" : parseInt(this.user.personalInfo.PrivateSchool),
      "College" : parseInt(this.user.personalInfo.College),
      "Vacation" : parseInt(this.user.personalInfo.Vacation),
      "Wedding" : parseInt(this.user.personalInfo.Wedding),
      "Boat" : parseInt(this.user.personalInfo.Boat),
      "NewCar" : parseInt(this.user.personalInfo.NewCar),
      "Other" : parseInt(this.user.personalInfo.Other),

      "checkSchool" : this.user.personalInfo.checkSchool,
      "checkCollege" : this.user.personalInfo.checkCollege,
      "checkVacation" : this.user.personalInfo.checkVacation,
      "checkWedding" : this.user.personalInfo.checkWedding,
      "checkBoat" : this.user.personalInfo.checkBoat,
      "checkCar" : this.user.personalInfo.checkCar,
      "checkOther" : this.user.personalInfo.checkOther,

      "rankPrivateSchool" : parseInt(this.user.personalInfo.rankPrivateSchool),
      "rankCollege" : parseInt(this.user.personalInfo.rankCollege),
      "rankVacation" : parseInt(this.user.personalInfo.rankVacation),
      "rankWedding" : parseInt(this.user.personalInfo.rankWedding),
      "rankBoat" : parseInt(this.user.personalInfo.rankBoat),
      "rankNewCar" : parseInt(this.user.personalInfo.rankNewCar),
      "rankOther" : parseInt(this.user.personalInfo.rankOther)
    });

    //EXPENSES
    var homeExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/home');
    homeExpenses.update({
      "mortgage" : parseInt(this.user.expenses.mortgage),
      "propertyTax" : parseInt(this.user.expenses.propertyTax),
      "homeownerInsurance" : parseInt(this.user.expenses.homeownerInsurance),
      "phone" : parseInt(this.user.expenses.phone),
      "internet" : parseInt(this.user.expenses.internet),
      "cable" : parseInt(this.user.expenses.cable),
      "streaming" : parseInt(this.user.expenses.streaming),
      "groceries" : parseInt(this.user.expenses.groceries),
      "utilities" : parseInt(this.user.expenses.utilities),
      "homeMaintenance" : parseInt(this.user.expenses.homeMaintenance),
      "clothes" : parseInt(this.user.expenses.clothes),

      "mortgagelock" : this.user.expenses.mortgagelock,
      "propertyTaxlock" : this.user.expenses.propertyTaxlock,
      "homeownerInsurancelock" : this.user.expenses.homeownerInsurancelock,
      "phonelock" : this.user.expenses.phonelock,
      "internetlock" : this.user.expenses.internetlock,
      "cablelock" : this.user.expenses.cablelock,
      "streaminglock" : this.user.expenses.streaminglock,
      "grocerieslock" : this.user.expenses.grocerieslock,
      "utilitieslock" : this.user.expenses.utilitieslock,
      "homeMaintenancelock" : this.user.expenses.homeMaintenancelock,
      "clotheslock" : this.user.expenses.clotheslock
    });

    var carExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/car');
    carExpenses.update({
      "carPayment" : parseInt(this.user.expenses.carPayment),
      "carInsurance" : parseInt(this.user.expenses.carInsurance),
      "publicTransport" : parseInt(this.user.expenses.publicTransport),
      "gas" : parseInt(this.user.expenses.gas),
      "carMaintenance" : parseInt(this.user.expenses.carMaintenance),

      "carPaymentlock" : this.user.expenses.carPaymentlock,
      "carInsurancelock" : this.user.expenses.carInsurancelock,
      "publicTransportlock" : this.user.expenses.publicTransportlock,
      "gaslock" : this.user.expenses.gaslock,
      "carMaintenancelock" : this.user.expenses.carMaintenancelock
    });

    var healthExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/health');
    healthExpenses.update({
      "healthInsurance" : parseInt(this.user.expenses.healthInsurance),
      "medication" : parseInt(this.user.expenses.medication),
      "unexpectedMedicalProblems" : parseInt(this.user.expenses.unexpectedMedicalProblems),
      "visualInsurance" : parseInt(this.user.expenses.visualInsurance),
      "eyeCare" : parseInt(this.user.expenses.eyeCare),
      "dentalInsurance" : parseInt(this.user.expenses.dentalInsurance),
      "cavities" : parseInt(this.user.expenses.cavities),
      "braces" : parseInt(this.user.expenses.braces),

      "healthInsurancelock" : this.user.expenses.healthInsurancelock,
      "medicationlock" : this.user.expenses.medicationlock,
      "unexpectedMedicalProblemslock" : this.user.expenses.unexpectedMedicalProblemslock,
      "visualInsurancelock" : this.user.expenses.visualInsurancelock,
      "eyeCarelock" : this.user.expenses.eyeCarelock,
      "dentalInsurancelock" : this.user.expenses.dentalInsurancelock,
      "cavitieslock" : this.user.expenses.cavitieslock,
      "braceslock" : this.user.expenses.braceslock
    });

    var discretionaryExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/discretionary');
    discretionaryExpenses.update({
      "eatingOut" : parseInt(this.user.expenses.eatingOut),
      "bars" : parseInt(this.user.expenses.bars),
      "funMoney" : parseInt(this.user.expenses.funMoney),
      "other" : parseInt(this.user.expenses.other),

      "eatingOutlock" : this.user.expenses.eatingOutlock,
      "barslock" : this.user.expenses.barslock,
      "funMoneylock" : this.user.expenses.funMoneylock,
      "otherlock" : this.user.expenses.otherlock
    });

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

                //PERSONAL INFO
                var personalInfo = firebase.database().ref('Users/' + this.currentKey + '/personalInfo');
                personalInfo.on('value', (personalSnap) => {
                  personalSnap.forEach( (data) => {
                    this.user.personalInfo[data.key] = data.val();
                  });
                });

                //GOALS
                var goals = firebase.database().ref('Users/' + this.currentKey + '/goals');
                goals.on('value', (goalSnap) => {
                  goalSnap.forEach( (data) => {
                    this.user.personalInfo[data.key] = data.val();
                  });
                });
                
                //EXPENSES
                var homeExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/home');
                homeExpenses.on('value', (homeExpenseSnap) => {
                  homeExpenseSnap.forEach( (data) => {
                    this.user.expenses[data.key] = data.val();
                  });
                });

                var carExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/car');
                carExpenses.on('value', (carExpenseSnap) => {
                  carExpenseSnap.forEach( (data) => {
                    this.user.expenses[data.key] = data.val();
                  });
                });

                var healthExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/health');
                healthExpenses.on('value', (healthExpenseSnap) => {
                  healthExpenseSnap.forEach( (data) => {
                    this.user.expenses[data.key] = data.val();
                  });
                });

                var discretionaryExpenses = firebase.database().ref('Users/' + this.currentKey + '/expenses/discretionary');
                discretionaryExpenses.on('value', (discretionaryExpenseSnap) => {
                  discretionaryExpenseSnap.forEach( (data) => {
                    this.user.expenses[data.key] = data.val();
                  });
                });
              }
            });
        });
      }
      else this.signedIn = false; //Let program know that the user is not signed in
    });
  }
}
