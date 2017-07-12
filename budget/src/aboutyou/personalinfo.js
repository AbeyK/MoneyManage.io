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
        ev.dataTransfer.setData("tonberry", ev.target.innerText);
        ev.dataTransfer.setData("occu-name", ev.srcElement.textContent);
        return true;
    }

    removeDrop(ev) {
        ev.dataTransfer.set
    }

    drop(ev) {
        ev.preventDefault();
        var current;
        var data = ev.dataTransfer.getData("tonberry");
        var elements = document.getElementsByClassName("current-buttons");
        var occupationName;
        for(var i = 0; i < elements.length; i++) {
            if((elements[i].textContent).trim() === data.trim()) {
                current = elements[i];
                occupationName = elements[i].textContent.trim();
            }
        }
        ev.currentTarget.appendChild(current);
    }

    attached() {
        this.slider.createAgeSlider();
    }
}