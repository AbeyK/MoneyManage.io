import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Constants} from '../services/constants';
import {Slider} from '../utilities/slider';

@inject(Router, User, Slider, Constants)
export class personalinfo {
    constructor(router, user, slider, constants) {
        this.router = router;
        this.user = user;
        this.slider = slider;
        this.constants = constants;
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
        if(ev.target.id=="myGoals") {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("goal-name");
            var elements = document.getElementsByClassName("current-buttons");
            this.user.personalInfo.currentGoals.push(data);

            var arr = this.user.personalInfo.goalsList;
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] === data) {
                    this.user.personalInfo.goalsList.splice(i, 1);
                }
            }

            //GET WHICH GOAL INPUT NEEDS TO BE SHOWN
            data = data.split(" ");
            var check = "check" + data[data.length - 1];
            this.user.personalInfo[check] = !this.user.personalInfo[check];
        }
    }

    remove(title) {
        this.user.personalInfo.goalsList.push(title);
        title = title.split(" ");
        var check = "check" + title[title.length - 1];
        this.user.personalInfo[check] = !this.user.personalInfo[check];
    }
    //END DRAG AND DROP

    next() {
        this.router.navigate('#/expenses');
    }

    attached() {
        this.slider.createAgeSlider();
    }
}