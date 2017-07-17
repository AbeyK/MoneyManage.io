import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import * as ionRangeSlider from "ion-rangeslider";

@inject(User)
export class Slider {
    constructor(user) {
        this.user = user;
    }
    
    createAgeSlider() {
        $("#age").ionRangeSlider({
            grid: true,
            min: 18,
            max: 100,
            from: this.user.personalInfo.age,
            step: 1,
            onFinish: (data) => {
                this.user.personalInfo.age = data.from;
            }
        });
    }
}