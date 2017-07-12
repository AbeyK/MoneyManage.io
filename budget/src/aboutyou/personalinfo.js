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

    attached() {
        this.slider.createAgeSlider();
    }
}