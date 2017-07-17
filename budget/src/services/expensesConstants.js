import { User } from '../services/user';
@inject(User)

export class ExpensesConstants {
    constructor(user) {
        this.user = user;
        this.homeExpenseConstants = [
            {
                "title": "Eating out",
                "value": Math.floor(this.user.personalInfo.squareFootHome / 12)
            },
            {
                "title": "Clothes",
                "value": Math.floor(this.user.personalInfo.income * .05)
            },
            {
                "title": "Mortgage",
                "20-30": 461,
                "30-40": 493,
                "40-50": 614,
                "50-70": 678,
                "70-80": 759,
                "80-100": 939,
                "100-120": 1037,
                "120-150": 1211,
                "150+": 1686,
            }

        ];
        this.cableConstants = [
            {
                "title": "Streaming Services",
                "value": 9
            },
            {
                "title": "Basic Service",
                "value": 24
            },
                        {
                "title": "Expanded Basic",
                "value": 69
            },
            {
                "title": "Next Most Popular",
                "value": 82
            },
        ];
        this.grocery = [
            {
                "title": "1",
                "USDA Thrifty Food Plan Average": 201,
                "USDA Thrifty Food Plan Average": 201,
                "USDA Thrifty Food Plan Average": 201,
                "USDA Thrifty Food Plan Average": 201,
                "USDA Thrifty Food Plan Average": 201
            },
        ];
        this.carExpenseConstants = [
            {
                "title": "Car payment",
                "value": 479
            },
            {
                "title": "Gas",
                "value": 250
            },
            {
                "title": "Maintenance",
                "value": 76
            }
        ];
        this.healthExpenseConstants = [
            {
                "title": "Single Emergency Fund",
                "value": 275
            },
            {
                "title": "Family Emergency Fund",
                "value": 545
            }
        ];
        this.discretionaryExpenseConstants = [
            {
                "title": "Eating out",
                "value": Math.floor(this.user.personalInfo.income * .045)
            },
            {
                "title": "Club Goer",
                "value": 702
            }
        ];
    }
}