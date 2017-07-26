import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';

@inject(Router, User)

export class login {
    constructor(router, user) {
        this.router = router;
        this.user = user;

        this.emailInput = "";
        this.passwordInput = "";

        this.newEmail = "";
        this.newPassword = "";
    }

    newUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( () => {
            console.log("created user:", email, password);
        })
        .catch( () => {
            console.log(error.message);
        });
    }
    
    login(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
            console.log("signed in:", email, password);
        })
        .catch((error) => {
            console.log(error.message);
        });
        //this.router.navigate('#/personalinfo');
    }

    logout() {
        firebase.auth().signOut()
        .then( () => {
            console.log("signed out");
        })
        .catch( (error) => {
            console.log(error.message);
        });
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
    }
}