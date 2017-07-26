import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Constants} from '../services/constants';
import {Slider} from '../utilities/slider';
import { ExpensesConstants } from '../services/expensesConstants';

@inject(Router, User, Slider, Constants, ExpensesConstants)
export class personalinfo {
    constructor(router, user, slider, constants, expensesConstants) {
        this.router = router;
        this.user = user;
        this.slider = slider;
        this.constants = constants;
        this.expensesConstants = expensesConstants;
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

            //Push goal onto user goals list
            this.user.personalInfo.currentGoals.push(data);

            //Remove goal from available list
            var arr = this.user.personalInfo.goalsList;
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] === data) {
                    this.user.personalInfo.goalsList.splice(i, 1);
                }
            }

            //Get which goal input needs to be shown
            data = data.split(" ");
            var check = "check" + data[data.length - 1];
            this.user.personalInfo[check] = !this.user.personalInfo[check];
        }
    }

    remove(title) {
        //Push the value back onto the available goals list
        this.user.personalInfo.goalsList.push(title);

        //Remove selected goal from current goals list
        var arr = this.user.personalInfo.currentGoals;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] === title) {
                this.user.personalInfo.currentGoals.splice(i, 1);
            }
        }

        //Make check value false so we know it isn't in the list of user goals
        title = title.split(" ");
        var check = "check" + title[title.length - 1];
        this.user.personalInfo[check] = !this.user.personalInfo[check];
    }
    //END DRAG AND DROP


    //INPUT VALIDATION
    checkIncome() {
        if(this.user.personalInfo.income < 0 || isNaN(this.user.personalInfo.income)) this.user.personalInfo.validIncome = false;
        else this.user.personalInfo.validIncome = true;
    }

    checkSavings() {
        if(this.user.personalInfo.savingsPerMonth < 0 || isNaN(this.user.personalInfo.savingsPerMonth)) this.user.personalInfo.validSavings = false;
        else this.user.personalInfo.validSavings = true;
    }

    checkHouseholdSize() {
        if(this.user.personalInfo.householdSize <= 0 || isNaN(this.user.personalInfo.householdSize)) this.user.personalInfo.validHouseholdSize = false;
        else this.user.personalInfo.validHouseholdSize = true;
    }

    checkHomeSize() {
        if(this.user.personalInfo.squareFootHome <= 0 || isNaN(this.user.personalInfo.squareFootHome)) this.user.personalInfo.validHomeSize = false;
        else this.user.personalInfo.validHomeSize = true;
    }
    //END INPUT VALIDATION

    next() {
        //GET GOAL RANKINGS
        var arr = [];
        for(var i = 0; i < this.user.personalInfo.currentGoals.length; i++) {
            var str = this.user.personalInfo.currentGoals[i];
            str = str.replace(/\s/g, '');
            arr.push([parseInt(this.user.personalInfo['rank' + str]), str]);
        }

        arr.sort(sortFunction);
        function sortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }

        this.user.personalInfo.currentGoalsRanks = arr;
        this.expensesConstants.getExpenseConstants();
        
        //INPUT VALIDATION
        console.log(this.user.personalInfo);
        if(this.user.personalInfo.income < 0 || isNaN(this.user.personalInfo.income)) alert('Enter valid income');
        else if(this.user.personalInfo.savingsPerMonth < 0 || isNaN(this.user.personalInfo.savingsPerMonth)) alert('Enter valid income');
        else if(this.user.personalInfo.householdSize < 0 || isNaN(this.user.personalInfo.householdSize)) alert('Enter valid household size');
        else if(this.user.personalInfo.householdSize == 0) alert('Household size must be greater than 0');
        else if(this.user.personalInfo.squareFootHome < 0 || isNaN(this.user.personalInfo.squareFootHome)) alert('Enter valid size of home');
        else this.router.navigate('#/expenses');
    }

    back() {
        this.router.navigate('#/home');
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
        this.slider.createAgeSlider();

        $('#wishesTooltip').tooltip({
            content: "Add the wishes you would like to reach for in the future.Rank your wishes based on priority (1 being highest priority)."
        });
    }
}