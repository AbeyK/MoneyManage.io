import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Slider} from '../utilities/slider';

@inject(Router, User, Slider)
export class personalinfo {
    constructor(router, user, slider) {
        this.router = router;
        this.user = user;
        this.slider = slider;
    }

    //DRAG AND DROP
    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("goal-name", ev.target.innerText);
        return true;
    }

    drop(ev) {
        //GET NAME OF GOAL AND PUSH IT ONTO CURRENT GOALS ARRAY
        ev.preventDefault();
        var data = ev.dataTransfer.getData("goal-name");
        var elements = document.getElementsByClassName("current-buttons");
        this.user.personalInfo.currentGoals.push(data);

        for(var i = 0; i < elements.length; i++) {
            if(elements[i].textContent === data) {
                var current = elements[i];
                ev.currentTarget.appendChild(current);
            }
        }

        //GET WHICH GOAL INPUT NEEDS TO BE SHOWN
        data = data.split(" ");
        var check = "check" + data[data.length - 1];
        this.user.personalInfo[check] = !this.user.personalInfo[check];
    }

    dropBack(ev) {
        //GET NAME OF GOAL AND GET IT OUT OF CURRENT GOALS ARRAY
        ev.preventDefault();
        var data = ev.dataTransfer.getData("goal-name");
        var elements = document.getElementsByClassName("current-buttons");

        var arr = this.user.personalInfo.currentGoals;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] === data) {
                this.user.personalInfo.currentGoals.splice(i, 1);
            }
        }

        for(var i = 0; i < elements.length; i++) {
            if(elements[i].textContent === data) {
                var current = elements[i];
                ev.currentTarget.appendChild(current);
            }
        }

        //GET WHICH GOAL INPUT NEEDS TO BE SHOWN
        data = data.split(" ");
        var check = "check" + data[data.length - 1];
        this.user.personalInfo[check] = !this.user.personalInfo[check];
    }
    //END DRAG AND DROP

    attached() {
        this.slider.createAgeSlider();
    }
}