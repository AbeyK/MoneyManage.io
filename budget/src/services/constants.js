export class Constants {
    constructor() {
        //PERSONAL INFO CONSTANTS
        this.wishes = [
            {
                "title" : "Private School",
                "check" : "checkSchool",
                "value" : "PrivateSchool"
            },
            {
                "title" : "College",
                "check" : "checkCollege",
                "value" : "College"
            },
            {
                "title" : "Wedding",
                "check" : "checkWedding",
                "value" : "Wedding"
            },
            {
                "title" : "Vacation",
                "check" : "checkVacation",
                "value" : "Vacation"
            },
            {
                "title" : "Boat",
                "check" : "checkBoat",
                "value" : "Boat"
            },
            {
                "title" : "New Car",
                "check" : "checkCar",
                "value" : "NewCar"
            },
            {
                "title" : "Other",
                "check" : "checkOther",
                "value" : "Other"
            }
        ];

        //EXPENSES CONSTANTS
        this.HomeExpenses = [
            {
                "title" : "Mortgage/Rent (monthly)",
                "value" : "mortgage"
            },
            {
                "title" : "Property tax (per year)",
                "value" : "propertyTax"
            },
            {
                "title" : "Homeowner's Insurance",
                "value" : "homeownerInsurance"
            },
            {
                "title" : "Phone Payment",
                "value" : "phone"
            },
            {
                "title" : "Internet",
                "value" : "internet"
            },
            {
                "title" : "Cable",
                "value" : "cable"
            },
            {
                "title" : "Netflix",
                "value" : "netfix"
            },
            {
                "title" : "Groceries",
                "value" : "groceries"
            },
            {
                "title" : "Utilities",
                "value" : "utilities"
            },
            {
                "title" : "Maintenance",
                "value" : "homeMaintenance"
            },
            {
                "title" : "Clothes (per year)",
                "value" : "clothes"
            }
        ];
        this.homeCategories = ['Mortgage/Rent (monthly)', 'Property tax (per year)', "Homeowner's Insurace",
            'Phone Payment', 'Internet', 'Cable', 'Netflix', 'Groceries',
            'Utilities', 'Maintenance', 'Clothes (per year)'];

        this.CarExpenses = [
            {
                "title" : "Car Payment",
                "value" : "carPayment"
            },
            {
                "title" : "Car Insurance",
                "value" : "carInsurance"
            },
            {
                "title" : "Public Transport",
                "value" : "publicTransport"
            },
            {
                "title" : "Gas",
                "value" : "gas"
            },
            {
                "title" : "Maintenance",
                "value" : "carMaintenance"
            }
        ];
        this.carCategories = ['Car Payment', 'Car Insurance', 'Public Transport',
            'Gas', 'Maintenance'];

        this.HealthExpenses = [
            {
                "title" : "Health Insurance",
                "value" : "healthInsurance"
            },
            {
                "title" : "Medication",
                "value" : "medication"
            },
            {
                "title" : "Unexpected Medical Problems",
                "value" : "unexpectedMedicalProblems"
            },
            {
                "title" : "Eye Care",
                "value" : "eyeCare"
            },
            {
                "title" : "Dental Insurance",
                "value" : "dentalInsurance"
            },
            {
                "title" : "Cavities/Dental Work",
                "value" : "cavities"
            },
            {
                "title" : "Braces",
                "value" : "braces"
            }
        ];
        this.healthCategories = ['Health Insurance', 'Medication', 'Unexpected Medical Problems',
            'Eye Care', 'Dental Insurance', 'Cavities/Dental Work', 'Braces'];

        this.DiscretionaryExpenses = [
            {
                "title" : "Eating Out",
                "value" : "eatingOut"
            },
            {
                "title" : "Bars/Drinks",
                "value" : "bars"
            },
            {
                "title" : "Fun Money (golf, movies, etc.)",
                "value" : "funMoney"
            },
            {
                "title" : "Other",
                "value" : "other"
            }
        ];
        this.discretionaryCategories = ['Eating Out', 'Bars/Drinks', 'Fun Money (golf, movies, etc.)',
            'Other'];
    }
}