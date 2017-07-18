define('app',['exports', 'jquery', 'jquery-ui-dist', 'bootstrap'], function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "Budget Calculator";
      config.map([{
        route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      }, {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'Expenses', nav: true
      }, {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/constants', '../utilities/slider'], function (exports, _aureliaFramework, _aureliaRouter, _user, _constants, _slider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _slider.Slider, _constants.Constants), _dec(_class = function () {
        function personalinfo(router, user, slider, constants) {
            _classCallCheck(this, personalinfo);

            this.router = router;
            this.user = user;
            this.slider = slider;
            this.constants = constants;
        }

        personalinfo.prototype.allowDrop = function allowDrop(ev) {
            ev.preventDefault();
        };

        personalinfo.prototype.drag = function drag(ev) {
            ev.dataTransfer.setData("goal-name", ev.target.innerText);
            return true;
        };

        personalinfo.prototype.drop = function drop(ev) {
            if (ev.target.id == "myGoals") {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("goal-name");
                var elements = document.getElementsByClassName("current-buttons");
                this.user.personalInfo.currentGoals.push(data);

                var arr = this.user.personalInfo.goalsList;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === data) {
                        this.user.personalInfo.goalsList.splice(i, 1);
                    }
                }

                data = data.split(" ");
                var check = "check" + data[data.length - 1];
                this.user.personalInfo[check] = !this.user.personalInfo[check];
            }
        };

        personalinfo.prototype.remove = function remove(title) {
            this.user.personalInfo.goalsList.push(title);
            title = title.split(" ");
            var check = "check" + title[title.length - 1];
            this.user.personalInfo[check] = !this.user.personalInfo[check];
        };

        personalinfo.prototype.checkIncome = function checkIncome() {
            if (this.user.personalInfo.income < 0 || isNaN(this.user.personalInfo.income)) this.user.personalInfo.validIncome = false;else this.user.personalInfo.validIncome = true;
        };

        personalinfo.prototype.checkSavings = function checkSavings() {
            if (this.user.personalInfo.savingsPerMonth < 0 || isNaN(this.user.personalInfo.savingsPerMonth)) this.user.personalInfo.validSavings = false;else this.user.personalInfo.validSavings = true;
        };

        personalinfo.prototype.checkHouseholdSize = function checkHouseholdSize() {
            if (this.user.personalInfo.householdSize <= 0 || isNaN(this.user.personalInfo.householdSize)) this.user.personalInfo.validHouseholdSize = false;else this.user.personalInfo.validHouseholdSize = true;
        };

        personalinfo.prototype.checkHomeSize = function checkHomeSize() {
            if (this.user.personalInfo.squareFootHome <= 0 || isNaN(this.user.personalInfo.squareFootHome)) this.user.personalInfo.validHomeSize = false;else this.user.personalInfo.validHomeSize = true;
        };

        personalinfo.prototype.next = function next() {
            var arr = [];
            for (var i = 0; i < this.user.personalInfo.currentGoals.length; i++) {
                var str = this.user.personalInfo.currentGoals[i];
                str = str.replace(/\s/g, '');
                arr.push([parseInt(this.user.personalInfo['rank' + str]), str]);
            }

            arr.sort(sortFunction);
            function sortFunction(a, b) {
                if (a[0] === b[0]) {
                    return 0;
                } else {
                    return a[0] < b[0] ? -1 : 1;
                }
            }

            this.user.personalInfo.currentGoalsRanks = arr;

            console.log(this.user.personalInfo);
            if (this.user.personalInfo.income < 0 || isNaN(this.user.personalInfo.income)) alert('Enter valid income');else if (this.user.personalInfo.savingsPerMonth < 0 || isNaN(this.user.personalInfo.savingsPerMonth)) alert('Enter valid income');else if (this.user.personalInfo.householdSize < 0 || isNaN(this.user.personalInfo.householdSize)) alert('Enter valid household size');else if (this.user.personalInfo.householdSize == 0) alert('Household size must be greater than 0');else if (this.user.personalInfo.squareFootHome < 0 || isNaN(this.user.personalInfo.squareFootHome)) alert('Enter valid size of home');else this.router.navigate('#/expenses');
        };

        personalinfo.prototype.attached = function attached() {
            this.slider.createAgeSlider();

            $('#wishesTooltip').tooltip({
                content: "Add what goals you would like to reach for in the future.<br>" + "Rank your wishes based on priority (1 being highest priority)."
            });
        };

        return personalinfo;
    }()) || _class);
});
define('expenses/expenses',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/constants', '../services/expensesConstants', '../utilities/calculateExpenses'], function (exports, _aureliaFramework, _aureliaRouter, _user, _constants, _expensesConstants, _calculateExpenses) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.expenses = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var expenses = exports.expenses = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _constants.Constants, _calculateExpenses.calculateExpenses, _expensesConstants.ExpensesConstants), _dec(_class = function () {
        function expenses(router, user, constants, calculateExpenses, expensesConstants) {
            _classCallCheck(this, expenses);

            this.router = router;
            this.user = user;
            this.constants = constants;
            this.calculateExpenses = calculateExpenses;
            this.expensesConstants = expensesConstants;
        }

        expenses.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        expenses.prototype.next = function next() {
            console.log(this.user.expenses);
            this.router.navigate('#/results');
        };

        return expenses;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/constants',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Constants = exports.Constants = function Constants() {
        _classCallCheck(this, Constants);

        this.wishes = [{
            "title": "Private School",
            "check": "checkSchool",
            "value": "PrivateSchool"
        }, {
            "title": "College",
            "check": "checkCollege",
            "value": "College"
        }, {
            "title": "Wedding",
            "check": "checkWedding",
            "value": "Wedding"
        }, {
            "title": "Vacation",
            "check": "checkVacation",
            "value": "Vacation"
        }, {
            "title": "Boat",
            "check": "checkBoat",
            "value": "Boat"
        }, {
            "title": "New Car",
            "check": "checkCar",
            "value": "NewCar"
        }, {
            "title": "Other",
            "check": "checkOther",
            "value": "Other"
        }];

        this.HomeExpenses = [{
            "title": "Mortgage/Rent (monthly)",
            "value": "mortgage"
        }, {
            "title": "Property tax (per year)",
            "value": "propertyTax"
        }, {
            "title": "Phone Payment",
            "value": "phone"
        }, {
            "title": "Internet",
            "value": "internet"
        }, {
            "title": "Cable",
            "value": "cable"
        }, {
            "title": "Netflix",
            "value": "netfix"
        }, {
            "title": "Groceries",
            "value": "groceries"
        }, {
            "title": "Utilities",
            "value": "utilities"
        }, {
            "title": "Maintenance",
            "value": "homeMaintenance"
        }, {
            "title": "Clothes (per year)",
            "value": "clothes"
        }];
        this.homeCategories = ['Mortgage/Rent (monthly)', 'Property tax (per year)', 'Phone Payment', 'Internet', 'Cable', 'Netflix', 'Groceries', 'Utilities', 'Maintenance', 'Clothes (per year)'];

        this.CarExpenses = [{
            "title": "Car Payment",
            "value": "carPayment"
        }, {
            "title": "Car Insurance",
            "value": "carInsurance"
        }, {
            "title": "Public Transport",
            "value": "publicTransport"
        }, {
            "title": "Gas",
            "value": "gas"
        }, {
            "title": "Maintenance",
            "value": "carMaintenance"
        }];
        this.carCategories = ['Car Payment', 'Car Insurance', 'Public Transport', 'Gas', 'Maintenance'];

        this.HealthExpenses = [{
            "title": "Health Insurance",
            "value": "healthInsurance"
        }, {
            "title": "Medication",
            "value": "medication"
        }, {
            "title": "Unexpected Medical Problems",
            "value": "unexpectedMedicalProblems"
        }, {
            "title": "Eye Care",
            "value": "eyeCare"
        }, {
            "title": "Dental Insurance",
            "value": "dentalInsurance"
        }, {
            "title": "Cavities/Dental Work",
            "value": "cavities"
        }, {
            "title": "Braces",
            "value": "braces"
        }];
        this.healthCategories = ['Health Insurance', 'Medication', 'Unexpected Medical Problems', 'Eye Care', 'Dental Insurance', 'Cavities/Dental Work', 'Braces'];

        this.DiscretionaryExpenses = [{
            "title": "Eating Out",
            "value": "eatingOut"
        }, {
            "title": "Bars/Drinks",
            "value": "bars"
        }, {
            "title": "Fun Money (golf, movies, etc.)",
            "value": "funMoney"
        }, {
            "title": "Other",
            "value": "other"
        }];
        this.discretionaryCategories = ['Eating Out', 'Bars/Drinks', 'Fun Money (golf, movies, etc.)', 'Other'];
    };
});
define('services/expensesConstants',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ExpensesConstants = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ExpensesConstants = exports.ExpensesConstants = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function ExpensesConstants(user) {
        _classCallCheck(this, ExpensesConstants);

        this.user = user;
        this.homeExpenseConstants = {
            "Maintenance": this.user.personalInfo.squareFootHome / 12,
            "Clothes": Math.floor(this.user.personalInfo.income * .05),
            "Mortgage": [461, 461, 461, 493, 614, 678, 678, 759, 939, 939, 1037, 1037, 1211, 1211, 1211, 1686][Math.min(15, Math.floor(this.user.personalInfo.income / 10000))],
            "Grocery": [332, 332, 607, 814, 1006, 1176, 1412, 1577, 1799, 1985, 2286, 2341][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            "Netflix": 9,
            "Cable": 50
        };
        this.healthExpenseConstants = {
            "Emergency": this.user.personalInfo.householdSize * 250,
            "Braces": 6000
        };
        this.carExpenseConstants = {
            "Payment": 479,
            "Gas": 250,
            "Maintenance": 76
        };
        this.discretionaryExpenseConstants = {
            "Eating": Math.floor(this.user.personalInfo.income * .045),
            "Club": 300
        };
    }) || _class);
});
define('services/user',['exports', '../services/data/personalInfoData', '../services/data/goalsData', '../services/data/expensesData', '../services/data/resultsData'], function (exports, _personalInfoData, _goalsData, _expensesData, _resultsData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.User = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var User = exports.User = function User() {
        _classCallCheck(this, User);

        this.personalInfo = new _personalInfoData.PersonalInfoData();
        this.goals = new _goalsData.GoalsData();
        this.expenses = new _expensesData.ExpensesData();
        this.results = new _resultsData.ResultsData();
    };
});
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/chart', '../services/constants', '../utilities/calculateExpenses', '../utilities/calculatePercentages'], function (exports, _aureliaFramework, _aureliaRouter, _user, _chart, _constants, _calculateExpenses, _calculatePercentages) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _chart.Chart, _constants.Constants, _calculateExpenses.calculateExpenses, _calculatePercentages.calculatePercentages), _dec(_class = function () {
        function results(router, user, chart, constants, calculateExpenses, calculatePercentages) {
            _classCallCheck(this, results);

            this.router = router;
            this.user = user;
            this.chart = chart;
            this.constants = constants;
            this.calculateExpenses = calculateExpenses;
            this.calculatePercentages = calculatePercentages;
        }

        results.prototype.checkValue = function checkValue(expenses, value, category, overallCategory) {
            var val = parseInt(value);
            if (val < 0) expenses[category.value + 'check'] = false;else if (val > 0) expenses[category.value + 'check'] = true;

            if (overallCategory == 'Home') this.calculateExpenses.homeExpenses();else if (overallCategory == 'Car') this.calculateExpenses.carExpenses();else if (overallCategory == 'Health') this.calculateExpenses.healthExpenses();else if (overallCategory == 'Discretionary') this.calculateExpenses.discretionaryExpenses();
        };

        results.prototype.getChartData = function getChartData() {
            this.calculatePercentages.calculateAllPercentages();
            console.log(this.user.results);

            this.user.results.expensesResults = [];
            this.user.results.expensesResults.push(['Home', this.user.expenses.totalHomeExpense + 1]);
            this.user.results.expensesResults.push(['Car', this.user.expenses.totalCarExpense + 1]);
            this.user.results.expensesResults.push(['Health', this.user.expenses.totalHealthExpense + 1]);
            this.user.results.expensesResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense + 1]);

            this.user.results.recommendedResults = [];
            this.user.results.recommendedResults.push(['Home', this.user.expenses.totalHomeExpense + 30]);
            this.user.results.recommendedResults.push(['Car', this.user.expenses.totalCarExpense + 31]);
            this.user.results.recommendedResults.push(['Health', this.user.expenses.totalHealthExpense + 32]);
            this.user.results.recommendedResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense + 33]);

            this.chart.createChart('resultsContainer', this.user.results);
            this.chart.createAdvancedChart('resultsContainerAdvanced');
            this.chart.createRecommendedChart('recommendedContainer', this.user.results);
            this.chart.createAdvancedRecommendedChart('recommendedContainerAdvanced');
        };

        results.prototype.checkAdvanced = function checkAdvanced() {
            this.user.results.showAdvanced = !this.user.results.showAdvanced;
        };

        results.prototype.checkAdvancedRecommended = function checkAdvancedRecommended() {
            this.user.results.showAdvancedRecommended = !this.user.results.showAdvancedRecommended;
        };

        results.prototype.back = function back() {
            this.router.navigate('#/expenses');
        };

        results.prototype.attached = function attached() {
            this.getChartData();

            if (this.user.personalInfo.currentGoals.length > 0) this.user.results.showGoals = true;else this.user.results.showGoals = false;
        };

        return results;
    }()) || _class);
});
define('utilities/calculateExpenses',['exports', 'aurelia-framework', '../services/user', '../services/expensesConstants'], function (exports, _aureliaFramework, _user, _expensesConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.calculateExpenses = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var calculateExpenses = exports.calculateExpenses = (_dec = (0, _aureliaFramework.inject)(_user.User, _expensesConstants.ExpensesConstants), _dec(_class = function () {
        function calculateExpenses(user, expensesConstants) {
            _classCallCheck(this, calculateExpenses);

            this.user = user;
            this.expensesConstants = expensesConstants;
        }

        calculateExpenses.prototype.homeExpenses = function homeExpenses() {
            var tempHomeTotal = parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertyTax) + parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) + parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.netfix) + parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) + parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes);

            if (isNaN(tempHomeTotal)) alert("Please enter a valid input");else {
                this.user.expenses.totalHomeExpense = tempHomeTotal;
                if (this.user.expenses.mortgage > this.expensesConstants.homeExpenseConstants["Mortgage"]) {
                    this.user.expenses.mortgagecheck = false;
                }
                if (this.user.expenses.clothes > this.expensesConstants.homeExpenseConstants["Clothes"]) {
                    this.user.expenses.clothescheck = false;
                }
                if (this.user.expenses.homeMaintenance > this.expensesConstants.homeExpenseConstants["Maintenance"]) {
                    this.user.expenses.homeMaintenancecheck = false;
                }
                if (this.user.expenses.netfix > this.expensesConstants.homeExpenseConstants["Netflix"]) {
                    this.user.expenses.netfixcheck = false;
                }
                if (this.user.expenses.cable > this.expensesConstants.homeExpenseConstants["Cable"]) {
                    this.user.expenses.cablecheck = false;
                }
            }
        };

        calculateExpenses.prototype.carExpenses = function carExpenses() {
            var tempCarTotal = parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) + parseInt(this.user.expenses.publicTransport) + parseInt(this.user.expenses.gas) + parseInt(this.user.expenses.carMaintenance);

            if (isNaN(tempCarTotal)) alert("Please enter a valid input");else {
                this.user.expenses.totalCarExpense = tempCarTotal;
                if (this.user.expenses.carPayment > this.expensesConstants.carExpenseConstants["Payment"]) {
                    this.user.expenses.carPaymentcheck = false;
                }
                if (this.user.expenses.gas > this.expensesConstants.carExpenseConstants["Gas"]) {
                    this.user.expenses.gascheck = false;
                }
                if (this.user.expenses.carMaintenance > this.expensesConstants.carExpenseConstants["Maintenance"]) {
                    this.user.expenses.carMaintenancecheck = false;
                }
            }
        };

        calculateExpenses.prototype.healthExpenses = function healthExpenses() {
            var tempHealthTotal = parseInt(this.user.expenses.healthInsurance) + parseInt(this.user.expenses.medication) + parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.dentalInsurance) + parseInt(this.user.expenses.cavities) + parseInt(this.user.expenses.eyeCare) + parseInt(this.user.expenses.braces);

            if (isNaN(tempHealthTotal)) alert("Please enter a valid input");else {
                this.user.expenses.totalHealthExpense = tempHealthTotal;
                if (this.user.expenses.unexpectedMedicalProblems > this.expensesConstants.healthExpenseConstants["Emergency"]) {
                    this.user.expenses.unexpectedMedicalProblemscheck = false;
                }
                if (this.user.expenses.braces > this.expensesConstants.healthExpenseConstants["Braces"]) {
                    this.user.expenses.bracescheck = false;
                }
            }
        };

        calculateExpenses.prototype.discretionaryExpenses = function discretionaryExpenses() {
            var tempDiscretionaryTotal = parseInt(this.user.expenses.eatingOut) + parseInt(this.user.expenses.bars) + parseInt(this.user.expenses.funMoney) + parseInt(this.user.expenses.other);

            if (isNaN(tempDiscretionaryTotal)) alert("Please enter a valid input");else {
                this.user.expenses.totalDiscretionaryExpense = tempDiscretionaryTotal;
                if (this.user.expenses.eatingOut > this.expensesConstants.discretionaryExpenseConstants["Eating"]) {
                    this.user.expenses.eatingOutcheck = false;
                }
                if (this.user.expenses.bars > this.expensesConstants.discretionaryExpenseConstants["Club"]) {
                    this.user.expenses.barscheck = false;
                }
            }
        };

        return calculateExpenses;
    }()) || _class);
});
define('utilities/calculatePercentages',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.calculatePercentages = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var calculatePercentages = exports.calculatePercentages = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function calculatePercentages(user) {
            _classCallCheck(this, calculatePercentages);

            this.user = user;
        }

        calculatePercentages.prototype.calculateAllPercentages = function calculateAllPercentages() {
            var home = this.user.expenses.totalHomeExpense;
            var car = this.user.expenses.totalCarExpense;
            var health = this.user.expenses.totalHealthExpense;
            var discretionary = this.user.expenses.totalDiscretionaryExpense;

            this.user.expenses.totalExpense = home + car + health + discretionary;
            var total = this.user.expenses.totalExpense;

            this.calculateHomePercentages(home, total);
            this.calculateCarPercentages(car, total);
            this.calculateHealthPercentages(health, total);
            this.calculateDiscretionaryPercentages(discretionary, total);
        };

        calculatePercentages.prototype.calculateHomePercentages = function calculateHomePercentages(home, total) {
            this.user.results.homePercentageArray = [];
            this.user.results.homePercentage = home / total * 100;
            this.user.results.homePercentageArray.push(this.user.results.mortgagePercentage = this.user.expenses.mortgage / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.propertyTaxPercentage = this.user.expenses.propertyTax / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.phonePercentage = this.user.expenses.phone / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.internetPercentage = this.user.expenses.internet / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.cablePercentage = this.user.expenses.cable / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.netflixPercentage = this.user.expenses.netfix / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.groceriesPercentage = this.user.expenses.groceries / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.utilitiesPercentage = this.user.expenses.utilities / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.homeMaintenancePercentage = this.user.expenses.homeMaintenance / home * this.user.results.homePercentage);
            this.user.results.homePercentageArray.push(this.user.results.clothesPercentage = this.user.expenses.clothes / home * this.user.results.homePercentage);
        };

        calculatePercentages.prototype.calculateCarPercentages = function calculateCarPercentages(car, total) {
            this.user.results.carPercentageArray = [];
            this.user.results.carPercentage = car / total * 100;
            this.user.results.carPercentageArray.push(this.user.results.carPaymentPercentage = this.user.expenses.carPayment / car * this.user.results.carPercentage);
            this.user.results.carPercentageArray.push(this.user.results.carInsurancePercentage = this.user.expenses.carInsurance / car * this.user.results.carPercentage);
            this.user.results.carPercentageArray.push(this.user.results.publicTransportPercentage = this.user.expenses.publicTransport / car * this.user.results.carPercentage);
            this.user.results.carPercentageArray.push(this.user.results.gasPercentage = this.user.expenses.gas / car * this.user.results.carPercentage);
            this.user.results.carPercentageArray.push(this.user.results.carMaintenancePercentage = this.user.expenses.carMaintenance / car * this.user.results.carPercentage);
        };

        calculatePercentages.prototype.calculateHealthPercentages = function calculateHealthPercentages(health, total) {
            this.user.results.healthPercentageArray = [];
            this.user.results.healthPercentage = health / total * 100;
            this.user.results.healthPercentageArray.push(this.user.results.healthInsurancePercentage = this.user.expenses.healthInsurance / health * this.user.results.healthPercentage);
            this.user.results.healthPercentageArray.push(this.user.results.medicationPercentage = this.user.expenses.medication / health * this.user.results.healthPercentage);
            this.user.results.healthPercentageArray.push(this.user.results.unexpectedMedicalProblemsPercentage = this.user.expenses.unexpectedMedicalProblems / health * this.user.results.healthPercentage);
            this.user.results.healthPercentageArray.push(this.user.results.eyeCarePercentage = this.user.expenses.eyeCare / health * this.user.results.healthPercentage);
            this.user.results.healthPercentageArray.push(this.user.results.dentalInsurancePercentage = this.user.expenses.dentalInsurance / health * this.user.results.healthPercentage);
            this.user.results.healthPercentageArray.push(this.user.results.cavitiesPercentage = this.user.expenses.cavities / health * this.user.results.healthPercentage);
            this.user.results.healthPercentageArray.push(this.user.results.bracesPercentage = this.user.expenses.braces / health * this.user.results.healthPercentage);
        };

        calculatePercentages.prototype.calculateDiscretionaryPercentages = function calculateDiscretionaryPercentages(discretionary, total) {
            this.user.results.discretionaryPercentageArray = [];
            this.user.results.discretionaryPercentage = discretionary / total * 100;
            this.user.results.discretionaryPercentageArray.push(this.user.results.eatingOutPercentage = this.user.expenses.eatingOut / discretionary * this.user.results.discretionaryPercentage);
            this.user.results.discretionaryPercentageArray.push(this.user.results.barsPercentage = this.user.expenses.bars / discretionary * this.user.results.discretionaryPercentage);
            this.user.results.discretionaryPercentageArray.push(this.user.results.funMoneyPercentage = this.user.expenses.funMoney / discretionary * this.user.results.discretionaryPercentage);
            this.user.results.discretionaryPercentageArray.push(this.user.results.otherPercentage = this.user.expenses.other / discretionary * this.user.results.discretionaryPercentage);
        };

        return calculatePercentages;
    }()) || _class);
});
define('utilities/chart',['exports', 'aurelia-framework', '../services/user', 'highcharts', 'node_modules/highcharts/modules/exporting.js', '../services/constants'], function (exports, _aureliaFramework, _user, _highcharts, _exporting, _constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Chart = undefined;

    var HighCharts = _interopRequireWildcard(_highcharts);

    var _exporting2 = _interopRequireDefault(_exporting);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Chart = exports.Chart = (_dec = (0, _aureliaFramework.inject)(_user.User, _constants.Constants), _dec(_class = function () {
        function Chart(user, constants) {
            _classCallCheck(this, Chart);

            this.user = user;
            this.constants = constants;
        }

        Chart.prototype.createChart = function createChart(containerID, results) {
            Highcharts.chart(containerID, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Your Budget Plan'
                },
                subtitle: {
                    text: 'Your Expenses'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Delivered amount',
                    data: results.expensesResults
                }]
            });
        };

        Chart.prototype.createAdvancedChart = function createAdvancedChart(containerID) {
            var categories = ['Home', 'Car', 'Health', 'Discretionary'],
                data = [{
                y: this.user.results.homePercentage,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: this.user.results.homePercentageArray
                }
            }, {
                y: this.user.results.carPercentage,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: this.user.results.carPercentageArray
                }
            }, {
                y: this.user.results.healthPercentage,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: this.user.results.healthPercentageArray
                }
            }, {
                y: this.user.results.discretionaryPercentage,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: this.user.results.discretionaryPercentageArray
                }
            }],
                browserData = [],
                versionsData = [],
                i,
                j,
                dataLen = data.length,
                drillDataLen,
                brightness;

            for (i = 0; i < dataLen; i += 1) {
                browserData.push({
                    name: categories[i],
                    y: data[i].y
                });

                drillDataLen = data[i].drilldown.data.length;
                for (j = 0; j < drillDataLen; j += 1) {
                    brightness = 0.2 - j / drillDataLen / 5;
                    versionsData.push({
                        name: data[i].drilldown.categories[j],
                        y: data[i].drilldown.data[j]
                    });
                }
            }

            Highcharts.chart(containerID, {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Your Advanced Budet Plan'
                },
                subtitle: {
                    text: 'Your Expenses'
                },
                yAxis: {
                    title: {
                        text: 'Total percent of budget'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        center: ['50%', '50%']
                    }
                },
                tooltip: {
                    valueSuffix: '%',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Percentage of Total Expense',
                    data: browserData,
                    size: '50%',
                    dataLabels: {
                        formatter: function formatter() {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: '#ffffff',
                        distance: -30
                    }
                }, {
                    name: 'Amount',
                    data: versionsData,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        formatter: function formatter() {
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                        }
                    },
                    id: 'versions'
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 400
                        },
                        chartOptions: {
                            series: [{
                                id: 'versions',
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        }
                    }]
                }
            });
        };

        Chart.prototype.createRecommendedChart = function createRecommendedChart(containerID, results) {
            Highcharts.chart(containerID, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Recommended Budget Plan'
                },
                subtitle: {
                    text: 'Recommended Expenses'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>'
                        }
                    }
                },
                series: [{
                    name: 'Expense amount',
                    data: results.recommendedResults
                }]
            });
        };

        Chart.prototype.createAdvancedRecommendedChart = function createAdvancedRecommendedChart(containerID) {
            var categories = ['Home', 'Car', 'Health', 'Discretionary'],
                data = [{
                y: this.user.results.homePercentage,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: this.user.results.homePercentageArray
                }
            }, {
                y: this.user.results.carPercentage,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: this.user.results.carPercentageArray
                }
            }, {
                y: this.user.results.healthPercentage,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: this.user.results.healthPercentageArray
                }
            }, {
                y: this.user.results.discretionaryPercentage,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: this.user.results.discretionaryPercentageArray
                }
            }],
                browserData = [],
                versionsData = [],
                i,
                j,
                dataLen = data.length,
                drillDataLen,
                brightness;

            for (i = 0; i < dataLen; i += 1) {
                browserData.push({
                    name: categories[i],
                    y: data[i].y
                });

                drillDataLen = data[i].drilldown.data.length;
                for (j = 0; j < drillDataLen; j += 1) {
                    brightness = 0.2 - j / drillDataLen / 5;
                    versionsData.push({
                        name: data[i].drilldown.categories[j],
                        y: data[i].drilldown.data[j]
                    });
                }
            }

            Highcharts.chart(containerID, {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Your Advanced Budet Plan'
                },
                subtitle: {
                    text: 'Your Expenses'
                },
                yAxis: {
                    title: {
                        text: 'Total percent of budget'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        center: ['50%', '50%']
                    }
                },
                tooltip: {
                    valueSuffix: '%',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Percentage of Total Expense',
                    data: browserData,
                    size: '50%',
                    dataLabels: {
                        formatter: function formatter() {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: '#ffffff',
                        distance: -30
                    }
                }, {
                    name: 'Amount',
                    data: versionsData,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        formatter: function formatter() {
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                        }
                    },
                    id: 'versions'
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 400
                        },
                        chartOptions: {
                            series: [{
                                id: 'versions',
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        }
                    }]
                }
            });
        };

        return Chart;
    }()) || _class);
});
define('utilities/slider',['exports', 'aurelia-framework', '../services/user', 'ion-rangeslider'], function (exports, _aureliaFramework, _user, _ionRangeslider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Slider = undefined;

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Slider = exports.Slider = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function Slider(user) {
            _classCallCheck(this, Slider);

            this.user = user;
        }

        Slider.prototype.createAgeSlider = function createAgeSlider() {
            var _this = this;

            $("#age").ionRangeSlider({
                grid: true,
                min: 18,
                max: 100,
                from: this.user.personalInfo.age,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.user.personalInfo.age = data.from;
                }
            });
        };

        return Slider;
    }()) || _class);
});
define('aboutyou/compose/compose-goals',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeGoals = exports.ComposeGoals = function ComposeGoals() {
        _classCallCheck(this, ComposeGoals);
    };
});
define('aboutyou/compose/compose-personal-info',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposePersonalInfo = exports.ComposePersonalInfo = function ComposePersonalInfo() {
        _classCallCheck(this, ComposePersonalInfo);
    };
});
define('expenses/compose/compose-car-expenses',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeCarExpenses = exports.ComposeCarExpenses = function ComposeCarExpenses() {
        _classCallCheck(this, ComposeCarExpenses);
    };
});
define('expenses/compose/compose-discretionary-expenses',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeDiscretionaryExpenses = exports.ComposeDiscretionaryExpenses = function ComposeDiscretionaryExpenses() {
        _classCallCheck(this, ComposeDiscretionaryExpenses);
    };
});
define('expenses/compose/compose-health-expenses',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeHealthExpenses = exports.ComposeHealthExpenses = function ComposeHealthExpenses() {
        _classCallCheck(this, ComposeHealthExpenses);
    };
});
define('expenses/compose/compose-home-expenses',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeHomeExpenses = exports.ComposeHomeExpenses = function ComposeHomeExpenses() {
        _classCallCheck(this, ComposeHomeExpenses);
    };
});
define('services/data/expensesData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var ExpensesData = exports.ExpensesData = function ExpensesData() {
                _classCallCheck(this, ExpensesData);

                this.totalExpense = 0;
                this.totalHomeExpense = 0;
                this.totalCarExpense = 0;
                this.totalHealthExpense = 0;
                this.totalDiscretionaryExpense = 0;

                this.mortgage = 0;
                this.propertyTax = 0;
                this.phone = 0;
                this.internet = 0;
                this.cable = 0;
                this.netfix = 0;
                this.groceries = 0;
                this.utilities = 0;
                this.homeMaintenance = 0;
                this.clothes = 0;

                this.mortgagecheck = true;
                this.propertyTaxcheck = true;
                this.phonecheck = true;
                this.internetcheck = true;
                this.cablecheck = true;
                this.netfixcheck = true;
                this.groceriescheck = true;
                this.utilitiescheck = true;
                this.homeMaintenancecheck = true;
                this.clothescheck = true;

                this.carPayment = 0;
                this.carInsurance = 0;
                this.publicTransport = 0;
                this.gas = 0;
                this.carMaintenance = 0;

                this.carPaymentcheck = true;
                this.carInsurancecheck = true;
                this.publicTransportcheck = true;
                this.gascheck = true;
                this.carMaintenancecheck = true;

                this.healthInsurance = 0;
                this.medication = 0;
                this.unexpectedMedicalProblems = 0;
                this.eyeCare = 0;
                this.dentalInsurance = 0;
                this.cavities = 0;
                this.braces = 0;

                this.healthInsurancecheck = true;
                this.medicationcheck = true;
                this.unexpectedMedicalProblemscheck = true;
                this.eyeCarecheck = true;
                this.dentalInsurancecheck = true;
                this.cavitiescheck = true;
                this.bracescheck = true;

                this.eatingOut = 0;
                this.bars = 0;
                this.funMoney = 0;
                this.other = 0;

                this.eatingOutcheck = true;
                this.barscheck = true;
                this.funMoneycheck = true;
                this.othercheck = true;
        };
});
define('services/data/goalsData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var GoalsData = exports.GoalsData = function GoalsData() {
        _classCallCheck(this, GoalsData);

        this.goal = 10;
    };
});
define('services/data/personalInfoData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var PersonalInfoData = exports.PersonalInfoData = function PersonalInfoData() {
                _classCallCheck(this, PersonalInfoData);

                this.age = 50;
                this.income = 0;
                this.savingsPerMonth = 0;
                this.householdSize = 1;
                this.squareFootHome = 0;

                this.validIncome = true;
                this.validSavings = true;
                this.validHouseholdSize = true;
                this.validHomeSize = true;

                this.goalsList = ["Private School", "College", "Wedding", "Vacation", "Boat", "New Car", "Other"];
                this.checkSchool = false;
                this.PrivateSchool = 0;
                this.rankPrivateSchool = 0;

                this.checkCollege = false;
                this.College = 0;
                this.rankCollege = 0;

                this.checkWedding = false;
                this.Wedding = 0;
                this.rankWedding = 0;

                this.checkVacation = false;
                this.Vacation = 0;
                this.rankVacation = 0;

                this.checkBoat = false;
                this.Boat = 0;
                this.rankBoat = 0;

                this.checkCar = false;
                this.NewCar = 0;
                this.rankNewCar = 0;

                this.checkOther = false;
                this.Other = 0;
                this.rankOther = 0;

                this.currentGoals = [];
                this.currentGoalsRanks = [];
        };
});
define('services/data/resultsData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var ResultsData = exports.ResultsData = function ResultsData() {
                _classCallCheck(this, ResultsData);

                this.expensesResults = [];
                this.recommendedResults = [];
                this.showGoals = false;
                this.showAdvanced = false;
                this.showAdvancedRecommended = false;

                this.homePercentage = 0;
                this.mortgagePercentage = 0;
                this.propertyTaxPercentage = 0;
                this.phonePercentage = 0;
                this.internetPercentage = 0;
                this.cablePercentage = 0;
                this.netflixPercentage = 0;
                this.groceriesPercentage = 0;
                this.utilitiesPercentage = 0;
                this.homeMaintenancePercentage = 0;
                this.clothesPercentage = 0;
                this.homePercentageArray = [];

                this.carPercentage = 0;
                this.carPaymentPercentage = 0;
                this.carInsurancePercentage = 0;
                this.publicTransportPercentage = 0;
                this.gasPercentage = 0;
                this.carMaintenancePercentage = 0;
                this.carPercentageArray = [];

                this.healthPercentage = 0;
                this.healthInsurancePercentage = 0;
                this.medicationPercentage = 0;
                this.unexpectedMedicalProblemsPercentage = 0;
                this.eyeCarePercentage = 0;
                this.dentalInsurancePercentage = 0;
                this.cavitiesPercentage = 0;
                this.bracesPercentage = 0;
                this.healthPercentageArray = [];

                this.discretionaryPercentage = 0;
                this.eatingOutPercentage = 0;
                this.barsPercentage = 0;
                this.funMoneyPercentage = 0;
                this.otherPercentage = 0;
                this.discretionaryPercentageArray = [];
        };
});
define('results/compose/compose-chart',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeChart = exports.ComposeChart = function ComposeChart() {
        _classCallCheck(this, ComposeChart);
    };
});
define('results/compose/compose-table',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeTable = exports.ComposeTable = function ComposeTable() {
        _classCallCheck(this, ComposeTable);
    };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"highcharts/css/highcharts.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/style.css\"></require><div id=\"app\"><div id=\"content\"><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><h4 style=\"padding-right:15px\">MyBudget</h4></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div></div></nav><router-view></router-view></div><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
define('text!css/drag-and-drop.css', ['module'], function(module) { module.exports = ".goalOverflow {\r\n    height: 600px;\r\n    overflow-y:scroll;\r\n}\r\n\r\n#myGoals {\r\n    width: 100%; \r\n    height: 30%; \r\n    background-color: #428bca;\r\n    text-align: center; \r\n    color: white;\r\n    vertical-align: middle; \r\n    line-height: 150px;\r\n}"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><div id=\"personalinfo\"><form submit.delegate=\"next()\"><compose view-model=\"./compose/compose-personal-info\"></compose><compose view-model=\"./compose/compose-goals\"></compose><hr style=\"margin-top:60%\"><button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></form></div></template>"; });
define('text!css/style.css', ['module'], function(module) { module.exports = "#personalinfo, #expenses, #results {\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    width: 60%;\r\n}\r\n\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n\r\n.glyphicon-question-sign {\r\n\tcolor: #006dcc;\r\n}"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1></div><compose view-model=\"./compose/compose-chart\"></compose><compose view-model=\"./compose/compose-table\"></compose><hr><div id=\"results\"><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button> <button class=\"btn btn-primary\" click.delegate=\"getChartData()\">Make New Chart</button></div></template>"; });
define('text!expenses/expenses.html', ['module'], function(module) { module.exports = "<template><div id=\"expenses\"><h1>Expenses</h1></div><form submit.delegate=\"next()\"><div class=\"container\" style=\"width:60%\"><div class=\"panel-group\" id=\"accordion\"><compose view-model=\"./compose/compose-home-expenses\"></compose><compose view-model=\"./compose/compose-car-expenses\"></compose><compose view-model=\"./compose/compose-health-expenses\"></compose><compose view-model=\"./compose/compose-discretionary-expenses\"></compose></div></div><div id=\"expenses\"><hr><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button> <button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></div></form></template>"; });
define('text!aboutyou/compose/compose-goals.html', ['module'], function(module) { module.exports = "<template><require from=\"css/drag-and-drop.css\"></require><hr><div class=\"col-md-4 container\" id=\"availableGoals\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h2>Wishes</h2></div><div class=\"panel-body\" dragstart.trigger=\"drag($event)\"><div repeat.for=\"goal of user.personalInfo.goalsList\" class=\"row\"><div class=\"current-buttons btn btn-primary\" draggable=\"true\">${goal}</div><br><br></div></div></div></div><div class=\"col-md-8 container ${user.personalInfo.currentGoals.length >= 3 ? 'goalOverflow' : 'none'}\" id=\"currentGoals\" drop.trigger=\"drop($event)\" dragover.trigger=\"allowDrop($event)\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h2>My Wishes <span id=\"wishesTooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></h2></div><div class=\"panel-body\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group col-md-2 col-md-push-2\"><label for=\"rank\">Rank</label><select class=\"form-control\" value.bind=\"user.personalInfo['rank' + wish.value]\"><option repeat.for=\"rank of user.personalInfo.currentGoals.length\">${rank + 1}</option></select></div><div class=\"col-md-6 col-md-push-1\"><h3>${wish.title}</h3></div><div style=\"margin-top:2%\" class=\"col-md-2 col-md-pull-1\"><button click.delegate=\"remove(wish.title)\" class=\"btn btn-danger\">X</button></div><div class=\"form-group\"><br><br><br><br><label style=\"left:100%\" for=\"wish\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\"></div></div><hr></div></div><div id=\"myGoals\"><span class=\"glyphicon glyphicon-plus\"></span> Add Wish Here</div><br></div></div></div></template>"; });
define('text!aboutyou/compose/compose-personal-info.html', ['module'], function(module) { module.exports = "<template><h2>Personal Info</h2><div class=\"form-group\"><label for=\"age\">Age</label><input style=\"width:400px\" id=\"age\"></div><div class=\"form-group col-md-6\"><label for=\"salary\">Income Per Year</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.income\" change.delegate=\"checkIncome()\" class=\"form-control ${user.personalInfo.validIncome ? 'none' : 'btn-danger'}\"></div></div><div class=\"form-group col-md-6\"><label for=\"savings\">Savings Per Month</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" change.delegate=\"checkSavings()\" class=\"form-control ${user.personalInfo.validSavings ? 'none' : 'btn-danger'}\"></div></div><br><br><br><hr><h2>Household Info</h2><div class=\"form-group col-md-6\"><label for=\"householdSize\">Household Size</label><input type=\"text\" value.bind=\"user.personalInfo.householdSize\" change.delegate=\"checkHouseholdSize()\" class=\"form-control ${user.personalInfo.validHouseholdSize ? 'none' : 'btn-danger'}\"></div><div class=\"form-group col-md-6\"><label for=\"householdSize\">Size of Home (in square feet)?</label><input type=\"text\" value.bind=\"user.personalInfo.squareFootHome\" change.delegate=\"checkHomeSize()\" class=\"form-control ${user.personalInfo.validHomeSize ? 'none' : 'btn-danger'}\"></div><br><br><br></template>"; });
define('text!results/compose/compose-chart.html', ['module'], function(module) { module.exports = "<template><div class=\"col-md-4\" style=\"margin-left:30%\"><div class=\"btn-group\" click.delegate=\"checkAdvanced()\" data-toggle=\"buttons\"><label class=\"btn ${!user.results.showAdvanced ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Simple Budget</label><label class=\"btn ${user.results.showAdvanced ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Advanced Budget</label></div></div><div class=\"col-md-4\"><div class=\"btn-group\" click.delegate=\"checkAdvancedRecommended()\" data-toggle=\"buttons\"><label class=\"btn ${!user.results.showAdvancedRecommended ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Simple Budget</label><label class=\"btn ${user.results.showAdvancedRecommended ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Advanced Budget</label></div></div><div show.bind=\"!user.results.showAdvanced\" style=\"float:left;margin-left:20%\" id=\"resultsContainer\"></div><div show.bind=\"user.results.showAdvanced\" style=\"float:left;margin-left:20%\" id=\"resultsContainerAdvanced\"></div><div show.bind=\"!user.results.showAdvancedRecommended\" style=\"float:left\" id=\"recommendedContainer\"></div><div show.bind=\"user.results.showAdvancedRecommended\" style=\"float:left\" id=\"recommendedContainerAdvanced\"></div></template>"; });
define('text!results/compose/compose-table.html', ['module'], function(module) { module.exports = "<template><hr style=\"clear:both\"><h3 style=\"text-align:center\">Expenses Table</h3><div style=\"width:1500px;margin:0 auto\" class=\"table-outter\"><table class=\"table table-bordered search-table\"><thead><tr><th>Expense</th><th style=\"text-align:center\" repeat.for=\"expense of user.results.recommendedResults.length\">${user.results.recommendedResults[expense][0]}</th><th style=\"text-align:center\">Yearly Savings & Goals</th></tr></thead><tbody><tr><th>Amount</th><td style=\"\" repeat.for=\"amount of user.results.recommendedResults.length\"><div style=\"text-align:center\">${user.expenses['total' + user.results.recommendedResults[amount][0] + 'Expense']}</div><hr><div style=\"height:300px;overflow-y:scroll\"><div repeat.for=\"expense of constants[user.results.recommendedResults[amount][0] + 'Expenses']\" class=\"form-group\"><label>${expense.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[expense.value]\" change.delegate=\"checkValue(user.expenses, user.expenses[expense.value], expense, user.results.recommendedResults[amount][0])\" class=\"form-control ${user.expenses[expense.value + 'check'] ? 'none' : 'btn-danger'}\"></div><br></div></div></td><td><div style=\"text-align:center\">${user.personalInfo.savingsPerMonth * 12}</div><hr><div class=\"form-group\"><label for=\"privateSchool\">Savings Per Month</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" class=\"form-control\"></div><br></div><div show.bind=\"user.results.showGoals\" style=\"height:200px;overflow-y:scroll\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group\"><label for=\"privateSchool\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\"></div></div><br></div></div></div></td></tr></tbody></table></div></template>"; });
define('text!expenses/compose/compose-car-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#carExpenseCollapse\">Car/Transportation<div style=\"float:right\">Total: $${user.expenses.totalCarExpense}</div></a></h4></div><div id=\"carExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"car of constants.CarExpenses\" class=\"form-group\"><label>${car.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[car.value]\" change.delegate=\"calculateExpenses.carExpenses()\" class=\"form-control\"></div><br></div><br></div></div></div></template>"; });
define('text!expenses/compose/compose-discretionary-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#discretionaryExpenseCollapse\">Discretionary Expenses<div style=\"float:right\">Total: $${user.expenses.totalDiscretionaryExpense}</div></a></h4></div><div id=\"discretionaryExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"discretionary of constants.DiscretionaryExpenses\" class=\"form-group\"><label>${discretionary.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[discretionary.value]\" change.delegate=\"calculateExpenses.discretionaryExpenses()\" class=\"form-control\"></div><br></div></div></div></div></template>"; });
define('text!expenses/compose/compose-health-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#healthExpenseCollapse\">Health<div style=\"float:right\">Total: $${user.expenses.totalHealthExpense}</div></a></h4></div><div id=\"healthExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"health of constants.HealthExpenses\" class=\"form-group\"><label>${health.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[health.value]\" change.delegate=\"calculateExpenses.healthExpenses()\" class=\"form-control\"></div><br></div></div></div></div></template>"; });
define('text!expenses/compose/compose-home-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#homeExpenseCollapse\">Home<div style=\"float:right\">Total: $${user.expenses.totalHomeExpense}</div></a></h4></div><div id=\"homeExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"home of constants.HomeExpenses\" class=\"form-group\"><label>${home.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[home.value]\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\"></div><br></div></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map