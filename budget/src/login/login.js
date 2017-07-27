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
        var users = firebase.database().ref('Users/');

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( () => {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then( (user) => {
                var checkIfIn = false;
                
                users.on('value', (snap) => {
                    snap.forEach( (currentSnap) => {
                        if(currentSnap.val().uid == user.uid) {
                            checkIfIn = true;
                        }
                    });

                    if(!checkIfIn) this.addNewUserToDatabase(users, user.email, user.uid);
                });

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

    addNewUserToDatabase(users, email, uid) {
        users.push({
            "username" : email,
            "uid" : uid
        });
    }

    facebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();
        var users = firebase.database().ref('Users/');

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            var token = result.credential.accessToken;

            var user = result.user;
            var checkIfIn = false;

            users.on('value', (snap) => {
                snap.forEach( (currentSnap) => {
                    if(currentSnap.val().uid == user.uid) {
                        checkIfIn = true;
                    }
                });

                if(!checkIfIn) this.addNewUserToDatabase(users, user.email, user.uid);
            });

            bootbox.alert({
                title: "MoneyManage",
                message: "You are signed in!",
                backdrop: true
            });

            this.router.navigate('#/personalinfo');
        })
        .catch( (error) => {
            console.log(error.message);
        });
    }

    googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        var users = firebase.database().ref('Users/');

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            var token = result.credential.accessToken;

            var user = result.user;
            var checkIfIn = false;

            users.on('value', (snap) => {
                snap.forEach( (currentSnap) => {
                    if(currentSnap.val().uid == user.uid) {
                        checkIfIn = true;
                    }
                });

                if(!checkIfIn) this.addNewUserToDatabase(users, user.email, user.uid);
            });

            bootbox.alert({
                title: "MoneyManage",
                message: "You are signed in!",
                backdrop: true
            });

            this.router.navigate('#/personalinfo');
        })
        .catch( (error) => {
            console.log(error.message);
        });
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
    }
}