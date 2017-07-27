import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
var bootbox = require('bootbox');

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
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then( () => {
                console.log("new user signed in");
            })
            .catch((error) => {
                console.log(error.message);
            });
            
            bootbox.alert({
                title: "MoneyManage",
                message: "User created and signed in!",
                backdrop: true
            });

            this.router.navigate('#/personalinfo');
        })
        .catch( () => {
            console.log(error.message);
        });
    }
    
    login(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
            bootbox.alert({
                title: "MoneyManage",
                message: "You are signed in!",
                backdrop: true
            });

            this.router.navigate('#/personalinfo');
        })
        .catch((error) => {
            console.log(error.message);
        });
        
    }

    facebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            var token = result.credential.accessToken;

            var user = result.user;
        })
        .catch( (error) => {
            console.log(error.message);
        });
    }

    twitterLogin() {
        var provider = new firebase.auth.TwitterAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            var token = result.credential.accessToken;
            var secret = result.credential.secret;

            var user = result.user;
        })
        .catch( (error) => {
            console.log(error.message);
        });
    }

    googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            var token = result.credential.accessToken;

            var user = result.user;
        })
        .catch( (error) => {
            console.log(error.message);
        });
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
    }
}