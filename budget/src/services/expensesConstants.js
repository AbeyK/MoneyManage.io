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
                "USDA Low-Cost Food Plan Average": 267,
                "USDA Moderate-Cost Food Plan Average": 332,
                "Liberal Plan Average": 414
            },
            {
                "title": "2",
                "USDA Thrifty Food Plan Average": 382,
                "USDA Low-Cost Food Plan Average": 488,
                "USDA Moderate-Cost Food Plan Average": 607,
                "Liberal Plan Average": 759
            },
            {
                "title": "3",
                "USDA Thrifty Food Plan Average": 504,
                "USDA Low-Cost Food Plan Average": 657,
                "USDA Moderate-Cost Food Plan Average": 814,
                "Liberal Plan Average": 999
            },
            {
                "title": "4",
                "USDA Thrifty Food Plan Average": 618,
                "USDA Low-Cost Food Plan Average": 811,
                "USDA Moderate-Cost Food Plan Average": 1006,
                "Liberal Plan Average": 1222
            },


            {
                "title": "5",
                "USDA Thrifty Food Plan Average": 717,
                "USDA Low-Cost Food Plan Average": 947,
                "USDA Moderate-Cost Food Plan Average": 1176,
                "Liberal Plan Average": 1423
            },
            {
                "title": "6",
                "USDA Thrifty Food Plan Average": 855,
                "USDA Low-Cost Food Plan Average": 1134,
                "USDA Moderate-Cost Food Plan Average": 1412,
                "Liberal Plan Average": 1698
            },
            {
                "title": "7",
                "USDA Thrifty Food Plan Average": 949,
                "USDA Low-Cost Food Plan Average": 1259,
                "USDA Moderate-Cost Food Plan Average": 1577,
                "Liberal Plan Average": 1887
            },
            {
                "title": "8",
                "USDA Thrifty Food Plan Average": 1080,
                "USDA Low-Cost Food Plan Average": 1436,
                "USDA Moderate-Cost Food Plan Average": 1799,
                "Liberal Plan Average": 2148
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