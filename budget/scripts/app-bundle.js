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
        route: ['', 'home'], moduleId: 'home/home',
        name: 'home', title: 'Welcome', nav: true
      }, {
        route: 'personalinfo', moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      }, {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'Expenses', nav: true
      }, {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      }, {
        route: 'logout', moduleId: 'logout/logout',
        name: 'logout', title: 'Logout', nav: true
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

        expenses.prototype.lockStateChange = function lockStateChange(myElement) {
            if (this.user.expenses[myElement + 'lock']) this.user.expenses[myElement + 'lock'] = false;else this.user.expenses[myElement + 'lock'] = true;
        };

        expenses.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        expenses.prototype.next = function next() {
            console.log(this.user.expenses);

            if (!this.user.expenses.homeCanGoToNext) alert('Please enter valid home expenses');else if (!this.user.expenses.carCanGoToNext) alert('Please enter valid car expenses');else if (!this.user.expenses.healthCanGoToNext) alert('Please enter valid health expenses');else if (!this.user.expenses.discretionaryCanGoToNext) alert('Please enter valid discretionary expenses');else this.router.navigate('#/results');
        };

        return expenses;
    }()) || _class);
});
define('home/home',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var results = exports.results = function () {
    function results() {
      _classCallCheck(this, results);
    }

    results.prototype.attached = function attached() {
      var header = $('.stats__header');
      var bar = $('.stats__item-bar');
      var nums = $('.stats__item-num');
      var overlay = $('.stats__overlay');
      var back = $('.stats__overlay-back');
      var isOpen = false;

      var vYear = $('#year');
      var vAvg = $('#avg');
      var vGames = $('#games');
      var vGoal = $('#goals');

      $(document).on('ready', function () {
        entrance();
      });

      bar.on('click', showOverlay);
      back.on('click', showOverlay);

      function entrance() {
        bar.addClass('active');
        header.addClass('active');
        header.on('transitionend webkitTransitionend', function () {
          nums.css('opacity', '1');
          bar.css('transition-delay', '0');
          header.off('transitionend webkitTransitionend');
        });
      }

      function showOverlay() {
        if (!isOpen) {
          overlay.addClass('active').removeAttr('style');
          bar.css('transition', 'all 0.4s cubic-bezier(0.86, 0, 0.07, 1)').removeClass('active');
          header.removeClass('active');
          nums.css('opacity', '0');
          isOpen = true;

          updateInfo($(this).parent().index());
        } else {
          overlay.css('transition', 'all 0.4s cubic-bezier(0.755, 0.05, 0.855, 0.06)').removeClass('active');
          bar.addClass('active').removeAttr('style');
          header.addClass('active');
          nums.css('opacity', '1');
          isOpen = false;
        }
      }

      var data = [{
        year: '2007-2008',
        goals: '65',
        games: '82',
        avg: '0.79'

      }, {
        year: '2008-2009',
        goals: '56',
        games: '79',
        avg: '0.7'

      }, {
        year: '2009-2010',
        goals: '50',
        games: '72',
        avg: '0.69'

      }, {
        year: '2010-2011',
        goals: '32',
        games: '79',
        avg: '0.40'

      }, {
        year: '2011-2012',
        goals: '38',
        games: '78',
        avg: '0.48'

      }, {
        year: '2012-2013',
        goals: '32',
        games: '48',
        avg: '0.66'

      }, {
        year: '2013-2014',
        goals: '51',
        games: '78',
        avg: '0.65'

      }, {
        year: '2014-2015',
        goals: '50',
        games: '76',
        avg: '0.66'

      }];

      function updateInfo(index) {
        vYear.text(data[index].year);
        vAvg.text(data[index].avg);
        vGoal.text(data[index].goals);
        vGames.text(data[index].games);
      }
    };

    return results;
  }();
});
define('logout/logout',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logout = exports.logout = function logout() {
    _classCallCheck(this, logout);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
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

            this.selectedOptions = {};
            this.someOptions = [];

            this.router = router;
            this.user = user;
            this.chart = chart;
            this.constants = constants;
            this.calculateExpenses = calculateExpenses;
            this.calculatePercentages = calculatePercentages;
            this.selectedOptions = [];
            this.someOptions = [{ "text": "Expenses Over 5 Years" }, { "text": "Simple Budget" }, { "text": "Advanced Budget" }];
            this.selectedOption = { "text": "Expenses Over 5 Years" };
        }

        results.prototype.checkValue = function checkValue(expenses, value, category, overallCategory) {
            var val = parseInt(value);
            if (val < 0) expenses[category.value + 'check'] = false;else if (val > 0) expenses[category.value + 'check'] = true;

            if (overallCategory == 'Home') this.calculateExpenses.homeExpenses();else if (overallCategory == 'Car') this.calculateExpenses.carExpenses();else if (overallCategory == 'Health') this.calculateExpenses.healthExpenses();else if (overallCategory == 'Discretionary') this.calculateExpenses.discretionaryExpenses();
        };

        results.prototype.getChartData = function getChartData() {
            this.calculatePercentages.calculateAllPercentages();
            console.log(this.user.results);

            this.calculateExpenses.get5YearEstimates();

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

            this.chart.createFiveYearChart('fiveYearContainer', this.user.results);
            this.chart.createChart('resultsContainer', this.user.results);
            this.chart.createAdvancedChart('resultsContainerAdvanced');
            this.chart.createRecommendedChart('recommendedContainer', this.user.results);
            this.chart.createAdvancedRecommendedChart('recommendedContainerAdvanced');
        };

        results.prototype.test = function test(option) {
            if (option == "Expenses Over 5 Years") {
                this.user.results.showExpenses = true;
                this.user.results.showBudget = false;
                this.user.results.showAdvanced = false;
            } else if (option == "Simple Budget") {
                this.user.results.showBudget = true;
                this.user.results.showExpenses = false;
                this.user.results.showAdvanced = false;
            } else if (option == "Advanced Budget") {
                this.user.results.showAdvanced = true;
                this.user.results.showExpenses = false;
                this.user.results.showBudget = false;
            }

            this.selectedOption.text = option;
            return true;
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
            "title": "Homeowner's Insurance",
            "value": "homeownerInsurance"
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
        this.homeCategories = ['Mortgage/Rent (monthly)', 'Property tax (per year)', "Homeowner's Insurace", 'Phone Payment', 'Internet', 'Cable', 'Netflix', 'Groceries', 'Utilities', 'Maintenance', 'Clothes (per year)'];

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

        calculateExpenses.prototype.get5YearEstimates = function get5YearEstimates() {
            this.user.results.homeFiveYears = [];
            this.user.results.carFiveYears = [];
            this.user.results.healthFiveYears = [];
            this.user.results.discretionaryFiveYears = [];

            for (var i = 0; i < 5; i++) {
                var tempHomeTotal = parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertyTax) + parseInt(this.user.expenses.homeownerInsurance) * Math.pow(1 + .0250, i) + parseInt(this.user.expenses.phone) * Math.pow(1 - .012, i) + parseInt(this.user.expenses.internet) * Math.pow(1 - .018, i) + parseInt(this.user.expenses.cable) * Math.pow(1 + .029, i) + parseInt(this.user.expenses.netfix) + parseInt(this.user.expenses.groceries) * Math.pow(1 + 0.01, i) + parseInt(this.user.expenses.utilities) * Math.pow(1 + .018, i) + parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes) * Math.pow(1 - 0.001, i);
                this.user.results.homeFiveYears.push(tempHomeTotal);

                var tempCarTotal = parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) * Math.pow(1 + .052, i) + parseInt(this.user.expenses.publicTransport) * Math.pow(1 - .003, i) + parseInt(this.user.expenses.gas) * Math.pow(1 + 0.026, i) + parseInt(this.user.expenses.carMaintenance);
                this.user.results.carFiveYears.push(tempCarTotal);

                var tempHealthTotal = parseInt(this.user.expenses.healthInsurance) * Math.pow(1 + .035, i) + parseInt(this.user.expenses.medication) * Math.pow(1 + .025, i) + parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.dentalInsurance) * Math.pow(1 + .02, i) + parseInt(this.user.expenses.cavities) * Math.pow(1 + .027, i) + parseInt(this.user.expenses.eyeCare) + parseInt(this.user.expenses.braces) * Math.pow(1 + .011, i);
                this.user.results.healthFiveYears.push(tempHealthTotal);

                var tempDiscretionaryTotal = parseInt(this.user.expenses.eatingOut) * Math.pow(1 + .024, i) + parseInt(this.user.expenses.bars) * Math.pow(1 + .02, i) + parseInt(this.user.expenses.funMoney) * Math.pow(1 + .003, i) + parseInt(this.user.expenses.other);
                this.user.results.discretionaryFiveYears.push(tempDiscretionaryTotal);
            }
        };

        calculateExpenses.prototype.homeExpenses = function homeExpenses() {
            var tempHomeTotal = parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertyTax) + parseInt(this.user.expenses.homeownerInsurance) + parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) + parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.netfix) + parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) + parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes);

            if (isNaN(tempHomeTotal)) {
                alert("Please enter a valid input");
                this.user.expenses.homeCanGoToNext = false;
            } else {
                if (this.user.expenses.mortgage > this.expensesConstants.homeExpenseConstants["Mortgage"]) this.user.expenses.mortgagecheck = false;else this.user.expenses.mortgagecheck = true;

                if (this.user.expenses.cable > this.expensesConstants.homeExpenseConstants["Cable"]) this.user.expenses.cablecheck = false;else this.user.expenses.cablecheck = true;

                if (this.user.expenses.netfix > this.expensesConstants.homeExpenseConstants["Netflix"]) this.user.expenses.netfixcheck = false;else this.user.expenses.netfixcheck = true;

                if (this.user.expenses.homeMaintenance > this.expensesConstants.homeExpenseConstants["Maintenance"]) this.user.expenses.homeMaintenancecheck = false;else this.user.expenses.homeMaintenancecheck = true;

                if (this.user.expenses.clothes > this.expensesConstants.homeExpenseConstants["Clothes"]) this.user.expenses.clothescheck = false;else this.user.expenses.clothescheck = true;

                this.user.expenses.homeCanGoToNext = true;
                this.user.expenses.totalHomeExpense = tempHomeTotal;
            }
        };

        calculateExpenses.prototype.carExpenses = function carExpenses() {
            var tempCarTotal = parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) + parseInt(this.user.expenses.publicTransport) + parseInt(this.user.expenses.gas) + parseInt(this.user.expenses.carMaintenance);

            if (isNaN(tempCarTotal)) {
                alert("Please enter a valid input");
                this.user.expenses.carCanGoToNext = false;
            } else {
                if (this.user.expenses.carPayment > this.expensesConstants.carExpenseConstants["Payment"]) this.user.expenses.carPaymentcheck = false;else this.user.expenses.carPaymentcheck = true;

                if (this.user.expenses.gas > this.expensesConstants.carExpenseConstants["Gas"]) this.user.expenses.gascheck = false;else this.user.expenses.gascheck = true;

                if (this.user.expenses.carMaintenance > this.expensesConstants.carExpenseConstants["Maintenance"]) this.user.expenses.carMaintenancecheck = false;else this.user.expenses.carMaintenancecheck = true;

                this.user.expenses.carCanGoToNext = true;
                this.user.expenses.totalCarExpense = tempCarTotal;
            }
        };

        calculateExpenses.prototype.healthExpenses = function healthExpenses() {
            var tempHealthTotal = parseInt(this.user.expenses.healthInsurance) + parseInt(this.user.expenses.medication) + parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.dentalInsurance) + parseInt(this.user.expenses.cavities) + parseInt(this.user.expenses.eyeCare) + parseInt(this.user.expenses.braces);

            if (isNaN(tempHealthTotal)) {
                alert("Please enter a valid input");
                this.user.expenses.healthCanGoToNext = false;
            } else {
                if (this.user.expenses.unexpectedMedicalProblems > this.expensesConstants.healthExpenseConstants["Emergency"]) this.user.expenses.unexpectedMedicalProblemscheck = false;else this.user.expenses.unexpectedMedicalProblemscheck = true;

                if (this.user.expenses.braces > this.expensesConstants.healthExpenseConstants["Braces"]) this.user.expenses.bracescheck = false;else this.user.expenses.bracescheck = true;

                this.user.expenses.healthCanGoToNext = true;
                this.user.expenses.totalHealthExpense = tempHealthTotal;
            }
        };

        calculateExpenses.prototype.discretionaryExpenses = function discretionaryExpenses() {
            var tempDiscretionaryTotal = parseInt(this.user.expenses.eatingOut) + parseInt(this.user.expenses.bars) + parseInt(this.user.expenses.funMoney) + parseInt(this.user.expenses.other);

            if (isNaN(tempDiscretionaryTotal)) {
                alert("Please enter a valid input");
                this.user.expenses.discretionaryCanGoToNext = false;
            } else {
                if (this.user.expenses.eatingOut > this.expensesConstants.discretionaryExpenseConstants["Eating"]) this.user.expenses.eatingOutcheck = false;else this.user.expenses.eatingOutcheck = true;

                if (this.user.expenses.bars > this.expensesConstants.discretionaryExpenseConstants["Club"]) this.user.expenses.barscheck = false;else this.user.expenses.barscheck = true;

                this.user.expenses.discretionaryCanGoToNext = true;
                this.user.expenses.totalDiscretionaryExpense = tempDiscretionaryTotal;
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

        Chart.prototype.createFiveYearChart = function createFiveYearChart(containerID, results) {
            Highcharts.chart(containerID, {

                title: {
                    text: 'Your Expenses Over the Next 5 Years'
                },

                yAxis: {
                    title: {
                        text: 'Expenses'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        pointStart: 2017
                    }
                },

                series: [{
                    name: 'Home',
                    data: this.user.results.homeFiveYears
                }, {
                    name: 'Car',
                    data: this.user.results.carFiveYears
                }, {
                    name: 'Health',
                    data: this.user.results.healthFiveYears
                }, {
                    name: 'Discretionary',
                    data: this.user.results.discretionaryFiveYears
                }]

            });
        };

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
                    },
                    shadow: true
                },
                title: {
                    text: 'Recommended Budget Plan'
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

                this.homeCanGoToNext = true;
                this.carCanGoToNext = true;
                this.healthCanGoToNext = true;
                this.discretionaryCanGoToNext = true;

                this.mortgage = 0;
                this.propertyTax = 0;
                this.homeownerInsurance = 0;
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
                this.homeownerInsurancecheck = true;
                this.phonecheck = true;
                this.internetcheck = true;
                this.cablecheck = true;
                this.netfixcheck = true;
                this.groceriescheck = true;
                this.utilitiescheck = true;
                this.homeMaintenancecheck = true;
                this.clothescheck = true;

                this.mortgagelock = true;
                this.propertyTaxlock = true;
                this.homeownerInsurancelock = true;
                this.phonelock = true;
                this.internetlock = true;
                this.cablelock = true;
                this.netfixlock = true;
                this.grocerieslock = true;
                this.utilitieslock = true;
                this.homeMaintenancelock = true;
                this.clotheslock = true;

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

                this.carPaymentlock = true;
                this.carInsurancelock = true;
                this.publicTransportlock = true;
                this.gaslock = true;
                this.carMaintenancelock = true;

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

                this.healthInsurancelock = true;
                this.medicationlock = true;
                this.unexpectedMedicalProblemslock = true;
                this.eyeCarelock = true;
                this.dentalInsurancelock = true;
                this.cavitieslock = true;
                this.braceslock = true;

                this.eatingOut = 0;
                this.bars = 0;
                this.funMoney = 0;
                this.other = 0;

                this.eatingOutcheck = true;
                this.barscheck = true;
                this.funMoneycheck = true;
                this.othercheck = true;

                this.eatingOutlock = true;
                this.barslock = true;
                this.funMoneylock = true;
                this.otherlock = true;
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

                this.showExpenses = true;
                this.showChart = false;
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
                this.homeFiveYears = [];

                this.carPercentage = 0;
                this.carPaymentPercentage = 0;
                this.carInsurancePercentage = 0;
                this.publicTransportPercentage = 0;
                this.gasPercentage = 0;
                this.carMaintenancePercentage = 0;
                this.carPercentageArray = [];
                this.carFiveYears = [];

                this.healthPercentage = 0;
                this.healthInsurancePercentage = 0;
                this.medicationPercentage = 0;
                this.unexpectedMedicalProblemsPercentage = 0;
                this.eyeCarePercentage = 0;
                this.dentalInsurancePercentage = 0;
                this.cavitiesPercentage = 0;
                this.bracesPercentage = 0;
                this.healthPercentageArray = [];
                this.healthFiveYears = [];

                this.discretionaryPercentage = 0;
                this.eatingOutPercentage = 0;
                this.barsPercentage = 0;
                this.funMoneyPercentage = 0;
                this.otherPercentage = 0;
                this.discretionaryPercentageArray = [];
                this.discretionaryFiveYears = [];
        };
});
<<<<<<< HEAD
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"highcharts/css/highcharts.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/style.css\"></require><require from=\"css/navbar.css\"></require><div id=\"app\"><div id=\"content\"><nav><ul style=\"margin-left:0\" class=\"dropdown\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></nav><br><br><br><br><hr><router-view></router-view></div><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
=======
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"highcharts/css/highcharts.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/style.css\"></require><require from=\"css/navbar.css\"></require><div id=\"app\"><div id=\"content\"><nav><ul style=\"margin-left:15%\" class=\"dropdown\"><li><a><span class=\"glyphicon glyphicon-home\"></span></a></li><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></nav><br><br><br><br><hr><router-view></router-view></div><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
>>>>>>> 36ca68a5c3207bf149703475bb0ba63e972d68e0
define('text!css/drag-and-drop.css', ['module'], function(module) { module.exports = ".goalOverflow {\r\n    height: 600px;\r\n    overflow-y:scroll;\r\n}\r\n\r\n#myGoals {\r\n    width: 100%; \r\n    height: 30%; \r\n    background-color: #337ab7;\r\n    text-align: center; \r\n    color: white;\r\n    vertical-align: middle; \r\n    line-height: 150px;\r\n}"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><div id=\"personalinfo\"><form submit.delegate=\"next()\"><compose view-model=\"./compose/compose-personal-info\"></compose><compose view-model=\"./compose/compose-goals\"></compose><hr style=\"margin-top:60%\"><button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></form></div></template>"; });
define('text!css/navbar.css', ['module'], function(module) { module.exports = "\r\nnav{\r\n  width: 750px;\r\n  margin: 1em auto;\r\n}\r\n\r\nul{\r\n  margin: 0px;\r\n  padding: 0px;\r\n  list-style: none;\r\n}\r\n\r\nul.dropdown{ \r\n  position: relative; \r\n  width: 100%; \r\n}\r\n\r\nul.dropdown li{ \r\n  font-weight: bold; \r\n  float: left; \r\n  width: 180px; \r\n  position: relative;\r\n  background: #ecf0f1;\r\n}\r\n\r\nul.dropdown a:hover{ \r\n  color: #000; \r\n}\r\n\r\nul.dropdown li a { \r\n  display: block; \r\n  padding: 20px 8px;\r\n  color: #34495e; \r\n  position: relative; \r\n  z-index: 2000; \r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-weight: 300;\r\n}\r\n\r\nul.dropdown li a:hover,\r\nul.dropdown li a.hover{ \r\n  background: #337ab7;\r\n  position: relative;\r\n  color: #fff;\r\n}\r\n\r\n\r\nul.dropdown ul{ \r\n display: none;\r\n position: absolute; \r\n  top: 0; \r\n  left: 0; \r\n  width: 180px; \r\n  z-index: 1000;\r\n}\r\n\r\nul.dropdown ul li { \r\n  font-weight: normal; \r\n  background: #f6f6f6; \r\n  color: #000; \r\n  border-bottom: 1px solid #ccc; \r\n}\r\n\r\nul.dropdown ul li a{ \r\n  display: block; \r\n  color: #34495e !important;\r\n  background: #eee !important;\r\n} \r\n\r\nul.dropdown ul li a:hover{\r\n  display: block; \r\n  background: #3498db !important;\r\n  color: #fff !important;\r\n} \r\n\r\n.drop > a{\r\n  position: relative;\r\n}\r\n\r\n.drop > a:after{\r\n  content:\"\";\r\n  position: absolute;\r\n  right: 10px;\r\n  top: 40%;\r\n  border-left: 5px solid transparent;\r\n  border-top: 5px solid #333;\r\n  border-right: 5px solid transparent;\r\n  z-index: 999;\r\n}\r\n\r\n.drop > a:hover:after{\r\n  content:\"\";\r\n   border-left: 5px solid transparent;\r\n  border-top: 5px solid #fff;\r\n  border-right: 5px solid transparent;\r\n}\r\n\r\n"; });
define('text!css/style.css', ['module'], function(module) { module.exports = "#personalinfo, #expenses, #results {\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    width: 60%;\r\n}\r\n\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n.btn-sample:active {\r\n  color: blue; \r\n}\r\ni{\r\n\twidth:10px;\r\n}\r\n\r\n.expensesInput{\r\n\twidth:90%;\r\n\t margin: 0 auto;\r\n}\r\n\r\n.glyphicon-question-sign {\r\n\tcolor: #337ab7;\r\n}\r\n\r\n.box-shadow--6dp {\r\n    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2)\r\n}\r\n\r\n.highcharts-series-group {\r\n\tbox-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2)\r\n}\r\n"; });
define('text!expenses/expenses.html', ['module'], function(module) { module.exports = "<template><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"><div id=\"expenses\"><h1>Expenses</h1></div><form submit.delegate=\"next()\"><div class=\"container\" style=\"width:60%\"><div class=\"panel-group\" id=\"accordion\"><compose view-model=\"./compose/compose-home-expenses\"></compose><compose view-model=\"./compose/compose-car-expenses\"></compose><compose view-model=\"./compose/compose-health-expenses\"></compose><compose view-model=\"./compose/compose-discretionary-expenses\"></compose></div></div><div id=\"expenses\"><hr><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button> <button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></div></form></template>"; });
define('text!logout/logout.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template><require from=\"home/home.css\"></require><div class=\"bg\"><svg version=\"1.1\" baseProfile=\"tiny\" id=\"chart\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"366.037px\" height=\"261.026px\" viewBox=\"0 0 366.037 261.026\" xml:space=\"preserve\"><g><path fill=\"#D7F073\" d=\"M106.628,235.698l2.871-2.597c1.266-1.155,1.705-1.815,1.705-2.63c0-1.001-0.813-1.649-1.738-1.649\r\n\t\tc-0.979,0-1.617,0.506-2.255,1.43l-0.43-0.286c0.672-1.022,1.387-1.65,2.74-1.65c1.309,0,2.288,0.913,2.288,2.112v0.022\r\n\t\tc0,1.056-0.572,1.76-1.926,2.992l-2.354,2.135h4.356v0.55h-5.259V235.698z\"/><path fill=\"#D7F073\" d=\"M113.172,234.873l0.44-0.363c0.616,0.781,1.386,1.232,2.398,1.232c1.034,0,1.903-0.693,1.903-1.705v-0.022\r\n\t\tc0-1.078-1.013-1.672-2.398-1.672h-0.418l-0.144-0.319l2.651-3.059h-4.037v-0.539h4.818v0.407l-2.607,2.981\r\n\t\tc1.464,0.088,2.729,0.77,2.729,2.178v0.022c0,1.342-1.177,2.244-2.508,2.244C114.746,236.259,113.799,235.687,113.172,234.873z\"/><path fill=\"#D7F073\" d=\"M119.795,230.329v-0.022c0-1.033,0.682-1.969,1.705-1.969c1.012,0,1.683,0.936,1.683,1.947v0.021\r\n\t\tc0,1.034-0.682,1.97-1.705,1.97C120.466,232.276,119.795,231.353,119.795,230.329z M120.367,230.285v0.021\r\n\t\tc0,0.869,0.518,1.497,1.134,1.497c0.648,0,1.111-0.649,1.111-1.475v-0.022c0-0.857-0.518-1.496-1.134-1.496\r\n\t\tC120.83,228.811,120.367,229.482,120.367,230.285z M126.253,228.426h0.594l-2.938,3.993l-2.718,3.708h-0.594l2.915-3.961\r\n\t\tL126.253,228.426z M124.261,234.268v-0.021c0-1.034,0.683-1.97,1.706-1.97c1.012,0,1.683,0.936,1.683,1.947v0.022\r\n\t\tc0,1.034-0.682,1.969-1.705,1.969C124.933,236.215,124.261,235.291,124.261,234.268z M127.078,234.268v-0.021\r\n\t\tc0-0.858-0.517-1.497-1.133-1.497c-0.649,0-1.111,0.672-1.111,1.475v0.022c0,0.869,0.518,1.496,1.134,1.496\r\n\t\tC126.616,235.742,127.078,235.093,127.078,234.268z\"/><path fill=\"#D7F073\" d=\"M132.115,234.499v-0.022c0-1.166,1.001-1.826,2.453-1.826c0.781,0,1.32,0.099,1.859,0.242v-0.242\r\n\t\tc0-1.133-0.693-1.716-1.849-1.716c-0.682,0-1.243,0.187-1.76,0.451l-0.198-0.474c0.616-0.286,1.221-0.484,1.991-0.484\r\n\t\tc0.759,0,1.364,0.209,1.771,0.616c0.374,0.374,0.571,0.892,0.571,1.585v3.498h-0.527v-0.936c-0.386,0.539-1.078,1.067-2.146,1.067\r\n\t\tC133.237,236.259,132.115,235.665,132.115,234.499z M136.438,234.025v-0.638c-0.473-0.121-1.101-0.253-1.903-0.253\r\n\t\tc-1.188,0-1.849,0.527-1.849,1.309v0.022c0,0.814,0.771,1.287,1.629,1.287C135.458,235.753,136.438,235.049,136.438,234.025z\"/><path fill=\"#D7F073\" d=\"M138.043,230.517h0.627l2.123,5.005l2.146-5.005h0.605l-2.52,5.654h-0.462L138.043,230.517z\"/><path fill=\"#D7F073\" d=\"M144.357,233.333v-0.022c0-1.628,1.145-2.927,2.663-2.927c1.573,0,2.574,1.276,2.574,2.938\r\n\t\tc0,0.1,0,0.132-0.011,0.221h-4.654c0.1,1.396,1.101,2.211,2.2,2.211c0.869,0,1.464-0.385,1.926-0.88l0.374,0.33\r\n\t\tc-0.572,0.616-1.243,1.056-2.321,1.056C145.633,236.259,144.357,235.082,144.357,233.333z M149.011,233.058\r\n\t\tc-0.077-1.133-0.727-2.179-2.014-2.179c-1.111,0-1.969,0.936-2.068,2.179H149.011z\"/><path fill=\"#D7F073\" d=\"M151.244,230.517h0.539v1.595c0.439-1.001,1.375-1.728,2.486-1.684v0.595h-0.056\r\n\t\tc-1.298,0-2.431,0.979-2.431,2.805v2.3h-0.539V230.517z\"/><path fill=\"#D7F073\" d=\"M155.16,234.499v-0.022c0-1.166,1.001-1.826,2.453-1.826c0.781,0,1.32,0.099,1.859,0.242v-0.242\r\n\t\tc0-1.133-0.693-1.716-1.849-1.716c-0.682,0-1.243,0.187-1.76,0.451l-0.198-0.474c0.616-0.286,1.221-0.484,1.991-0.484\r\n\t\tc0.759,0,1.364,0.209,1.771,0.616c0.374,0.374,0.571,0.892,0.571,1.585v3.498h-0.527v-0.936c-0.386,0.539-1.078,1.067-2.146,1.067\r\n\t\tC156.282,236.259,155.16,235.665,155.16,234.499z M159.483,234.025v-0.638c-0.473-0.121-1.101-0.253-1.903-0.253\r\n\t\tc-1.188,0-1.849,0.527-1.849,1.309v0.022c0,0.814,0.771,1.287,1.629,1.287C158.503,235.753,159.483,235.049,159.483,234.025z\"/><path fill=\"#D7F073\" d=\"M161.836,237.051l0.319-0.439c0.671,0.517,1.441,0.792,2.266,0.792c1.288,0,2.201-0.737,2.201-2.179v-0.813\r\n\t\tc-0.484,0.692-1.232,1.298-2.344,1.298c-1.354,0-2.695-1.034-2.695-2.641v-0.021c0-1.617,1.342-2.663,2.695-2.663\r\n\t\tc1.122,0,1.881,0.595,2.344,1.255v-1.122h0.539v4.741c0,0.814-0.265,1.452-0.716,1.903c-0.483,0.484-1.21,0.748-2.035,0.748\r\n\t\tC163.476,237.909,162.607,237.623,161.836,237.051z M166.655,233.058v-0.022c0-1.298-1.154-2.134-2.321-2.134\r\n\t\tc-1.177,0-2.167,0.813-2.167,2.123v0.022c0,1.265,1.012,2.145,2.167,2.145C165.5,235.191,166.655,234.334,166.655,233.058z\"/><path fill=\"#D7F073\" d=\"M168.875,233.333v-0.022c0-1.628,1.145-2.927,2.663-2.927c1.573,0,2.574,1.276,2.574,2.938\r\n\t\tc0,0.1,0,0.132-0.011,0.221h-4.654c0.1,1.396,1.101,2.211,2.2,2.211c0.869,0,1.464-0.385,1.926-0.88l0.374,0.33\r\n\t\tc-0.572,0.616-1.243,1.056-2.321,1.056C170.152,236.259,168.875,235.082,168.875,233.333z M173.53,233.058\r\n\t\tc-0.077-1.133-0.727-2.179-2.014-2.179c-1.111,0-1.969,0.936-2.068,2.179H173.53z\"/><path fill=\"#D7F073\" d=\"M178.524,234.499v-0.022c0-1.166,1.001-1.826,2.453-1.826c0.781,0,1.32,0.099,1.859,0.242v-0.242\r\n\t\tc0-1.133-0.693-1.716-1.849-1.716c-0.682,0-1.243,0.187-1.76,0.451l-0.198-0.474c0.616-0.286,1.221-0.484,1.991-0.484\r\n\t\tc0.759,0,1.364,0.209,1.771,0.616c0.374,0.374,0.571,0.892,0.571,1.585v3.498h-0.527v-0.936c-0.386,0.539-1.078,1.067-2.146,1.067\r\n\t\tC179.646,236.259,178.524,235.665,178.524,234.499z M182.847,234.025v-0.638c-0.473-0.121-1.101-0.253-1.903-0.253\r\n\t\tc-1.188,0-1.849,0.527-1.849,1.309v0.022c0,0.814,0.771,1.287,1.629,1.287C181.868,235.753,182.847,235.049,182.847,234.025z\"/><path fill=\"#D7F073\" d=\"M185.343,230.517h0.539v1.045c0.374-0.66,1.001-1.178,2.024-1.178c1.419,0,2.244,0.969,2.244,2.311v3.433\r\n\t\th-0.539v-3.333c0-1.155-0.649-1.915-1.782-1.915c-1.101,0-1.947,0.836-1.947,2.003v3.245h-0.539V230.517z\"/><path fill=\"#D7F073\" d=\"M192.13,230.517h0.539v1.045c0.374-0.66,1.001-1.178,2.024-1.178c1.419,0,2.244,0.969,2.244,2.311v3.433\r\n\t\th-0.539v-3.333c0-1.155-0.649-1.915-1.782-1.915c-1.101,0-1.947,0.836-1.947,2.003v3.245h-0.539V230.517z\"/><path fill=\"#D7F073\" d=\"M198.807,233.948v-3.432h0.539v3.333c0,1.155,0.649,1.914,1.782,1.914c1.101,0,1.947-0.836,1.947-2.002\r\n\t\tv-3.245h0.539v5.61h-0.539v-1.045c-0.374,0.66-1.001,1.177-2.024,1.177C199.632,236.259,198.807,235.291,198.807,233.948z\"/><path fill=\"#D7F073\" d=\"M205.209,234.499v-0.022c0-1.166,1.001-1.826,2.453-1.826c0.781,0,1.32,0.099,1.859,0.242v-0.242\r\n\t\tc0-1.133-0.693-1.716-1.849-1.716c-0.682,0-1.243,0.187-1.76,0.451l-0.198-0.474c0.616-0.286,1.221-0.484,1.991-0.484\r\n\t\tc0.759,0,1.364,0.209,1.771,0.616c0.374,0.374,0.571,0.892,0.571,1.585v3.498h-0.527v-0.936c-0.386,0.539-1.078,1.067-2.146,1.067\r\n\t\tC206.332,236.259,205.209,235.665,205.209,234.499z M209.533,234.025v-0.638c-0.473-0.121-1.101-0.253-1.903-0.253\r\n\t\tc-1.188,0-1.849,0.527-1.849,1.309v0.022c0,0.814,0.771,1.287,1.629,1.287C208.553,235.753,209.533,235.049,209.533,234.025z\"/><path fill=\"#D7F073\" d=\"M212.073,228.096h0.539v8.031h-0.539V228.096z\"/><path fill=\"#D7F073\" d=\"M217.55,235.423l0.319-0.429c0.616,0.473,1.298,0.736,2.013,0.736c0.76,0,1.354-0.418,1.354-1.066v-0.022\r\n\t\tc0-0.66-0.704-0.902-1.485-1.122c-0.913-0.264-1.925-0.539-1.925-1.54v-0.022c0-0.901,0.759-1.551,1.848-1.551\r\n\t\tc0.671,0,1.431,0.242,1.991,0.616l-0.286,0.451c-0.517-0.342-1.133-0.562-1.727-0.562c-0.771,0-1.276,0.418-1.276,0.979v0.021\r\n\t\tc0,0.627,0.759,0.858,1.562,1.09c0.901,0.253,1.848,0.583,1.848,1.573v0.021c0,1.001-0.857,1.64-1.936,1.64\r\n\t\tC219.036,236.237,218.144,235.907,217.55,235.423z\"/><path fill=\"#D7F073\" d=\"M223.094,234.499v-0.022c0-1.166,1.001-1.826,2.453-1.826c0.781,0,1.32,0.099,1.859,0.242v-0.242\r\n\t\tc0-1.133-0.693-1.716-1.849-1.716c-0.682,0-1.243,0.187-1.76,0.451l-0.198-0.474c0.616-0.286,1.221-0.484,1.991-0.484\r\n\t\tc0.759,0,1.364,0.209,1.771,0.616c0.374,0.374,0.571,0.892,0.571,1.585v3.498h-0.527v-0.936c-0.386,0.539-1.078,1.067-2.146,1.067\r\n\t\tC224.216,236.259,223.094,235.665,223.094,234.499z M227.417,234.025v-0.638c-0.473-0.121-1.101-0.253-1.903-0.253\r\n\t\tc-1.188,0-1.849,0.527-1.849,1.309v0.022c0,0.814,0.771,1.287,1.629,1.287C226.438,235.753,227.417,235.049,227.417,234.025z\"/><path fill=\"#D7F073\" d=\"M229.023,230.517h0.627l2.123,5.005l2.146-5.005h0.605l-2.52,5.654h-0.462L229.023,230.517z\"/><path fill=\"#D7F073\" d=\"M235.92,228.315h0.671v0.737h-0.671V228.315z M235.987,230.517h0.539v5.61h-0.539V230.517z\"/><path fill=\"#D7F073\" d=\"M238.616,230.517h0.539v1.045c0.374-0.66,1.001-1.178,2.024-1.178c1.419,0,2.244,0.969,2.244,2.311v3.433\r\n\t\th-0.539v-3.333c0-1.155-0.649-1.915-1.782-1.915c-1.101,0-1.947,0.836-1.947,2.003v3.245h-0.539V230.517z\"/><path fill=\"#D7F073\" d=\"M245.259,237.051l0.319-0.439c0.671,0.517,1.441,0.792,2.266,0.792c1.288,0,2.201-0.737,2.201-2.179v-0.813\r\n\t\tc-0.484,0.692-1.232,1.298-2.344,1.298c-1.354,0-2.695-1.034-2.695-2.641v-0.021c0-1.617,1.342-2.663,2.695-2.663\r\n\t\tc1.122,0,1.881,0.595,2.344,1.255v-1.122h0.539v4.741c0,0.814-0.265,1.452-0.716,1.903c-0.483,0.484-1.21,0.748-2.035,0.748\r\n\t\tC246.899,237.909,246.03,237.623,245.259,237.051z M250.078,233.058v-0.022c0-1.298-1.155-2.134-2.321-2.134\r\n\t\tc-1.177,0-2.167,0.813-2.167,2.123v0.022c0,1.265,1.012,2.145,2.167,2.145C248.922,235.191,250.078,234.334,250.078,233.058z\"/><path fill=\"#D7F073\" d=\"M252.112,235.423l0.319-0.429c0.616,0.473,1.298,0.736,2.013,0.736c0.76,0,1.354-0.418,1.354-1.066v-0.022\r\n\t\tc0-0.66-0.704-0.902-1.485-1.122c-0.913-0.264-1.925-0.539-1.925-1.54v-0.022c0-0.901,0.759-1.551,1.848-1.551\r\n\t\tc0.671,0,1.431,0.242,1.991,0.616l-0.286,0.451c-0.517-0.342-1.133-0.562-1.727-0.562c-0.771,0-1.276,0.418-1.276,0.979v0.021\r\n\t\tc0,0.627,0.759,0.858,1.562,1.09c0.901,0.253,1.848,0.583,1.848,1.573v0.021c0,1.001-0.857,1.64-1.936,1.64\r\n\t\tC253.597,236.237,252.706,235.907,252.112,235.423z\"/></g><path fill=\"#FFFFFF\" d=\"M297.813,187.789c-0.414,0-0.75-0.336-0.75-0.75V41.398c0-0.689-0.561-1.25-1.25-1.25H61.049\r\n\tc-0.689,0-1.25,0.561-1.25,1.25v145.641c0,0.414-0.336,0.75-0.75,0.75s-0.75-0.336-0.75-0.75V41.398c0-1.517,1.234-2.75,2.75-2.75\r\n\th234.764c1.516,0,2.75,1.233,2.75,2.75v145.641C298.563,187.453,298.227,187.789,297.813,187.789z M327.25,187.977\r\n\tc0-0.414-0.336-0.75-0.75-0.75H30.363c-0.414,0-0.75,0.336-0.75,0.75c0,10.002,8.137,18.139,18.138,18.139h261.367\r\n\tC319.116,206.115,327.25,197.979,327.25,187.977z M325.733,188.727c-0.394,8.828-7.696,15.889-16.615,15.889H47.75\r\n\tc-8.923,0-16.228-7.061-16.621-15.889H325.733z\"/><g><line class=\"dash\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"84.662\" y1=\"168.215\" x2=\"84.662\" y2=\"140.473\"/><line class=\"dash\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"105.592\" y1=\"168.215\" x2=\"105.592\" y2=\"149.795\"/><line class=\"dash three\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"126.523\" y1=\"168.215\" x2=\"126.523\" y2=\"159.118\"/><line class=\"dash four\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"147.453\" y1=\"168.215\" x2=\"147.453\" y2=\"140.473\"/><line class=\"dash five\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"168.382\" y1=\"168.215\" x2=\"168.382\" y2=\"149.795\"/><line class=\"dash six\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"189.313\" y1=\"168.215\" x2=\"189.313\" y2=\"140.473\"/><line class=\"dash seven\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"210.244\" y1=\"168.215\" x2=\"210.244\" y2=\"135.812\"/><line class=\"dash eight\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"231.173\" y1=\"168.215\" x2=\"231.173\" y2=\"163.779\"/><line class=\"dash nine\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"252.104\" y1=\"168.215\" x2=\"252.104\" y2=\"154.457\"/><line class=\"dash ten\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"272.201\" y1=\"168.215\" x2=\"272.201\" y2=\"163.779\"/></g><polyline fill=\"none\" points=\"84.295,72.647 104.795,97.147 147.795,75.147 189.295,110.647 231.795,102.147 270.795,122.147 \"/><polyline class=\"zigzag\" fill=\"none\" stroke=\"#AFCA5D\" stroke-width=\"5\" stroke-miterlimit=\"10\" points=\"84.295,72.647 104.795,97.147 \r\n\t147.795,75.147 189.295,110.647 231.795,102.147 270.795,122.147 \"/></svg></div></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1></div><compose view-model=\"./compose/compose-chart\"></compose><compose view-model=\"./compose/compose-table\"></compose><hr><div id=\"results\"><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button> <button class=\"btn btn-primary\" click.delegate=\"getChartData()\">Make New Chart</button></div></template>"; });
define('text!aboutyou/compose/compose-goals.html', ['module'], function(module) { module.exports = "<template><require from=\"css/drag-and-drop.css\"></require><hr><div class=\"col-md-4 container\" id=\"availableGoals\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h2>Wishes</h2></div><div class=\"panel-body\" dragstart.trigger=\"drag($event)\"><div repeat.for=\"goal of user.personalInfo.goalsList\" class=\"row\"><div class=\"current-buttons btn btn-primary\" draggable=\"true\">${goal}</div><br><br></div></div></div></div><div class=\"col-md-8 container ${user.personalInfo.currentGoals.length >= 3 ? 'goalOverflow' : 'none'}\" id=\"currentGoals\" drop.trigger=\"drop($event)\" dragover.trigger=\"allowDrop($event)\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h2>My Wishes <span id=\"wishesTooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></h2></div><div class=\"panel-body\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group col-md-2 col-md-push-2\"><label for=\"rank\">Rank</label><select class=\"form-control\" value.bind=\"user.personalInfo['rank' + wish.value]\"><option repeat.for=\"rank of user.personalInfo.currentGoals.length\">${rank + 1}</option></select></div><div class=\"col-md-6 col-md-push-1\"><h3>${wish.title}</h3></div><div style=\"margin-top:2%\" class=\"col-md-2 col-md-pull-1\"><button click.delegate=\"remove(wish.title)\" class=\"btn btn-danger\">X</button></div><div class=\"form-group\"><br><br><br><br><label style=\"left:100%\" for=\"wish\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\"></div></div><hr></div></div><div id=\"myGoals\"><span class=\"glyphicon glyphicon-plus\"></span> Add Wish Here</div><br></div></div></div></template>"; });
define('text!aboutyou/compose/compose-personal-info.html', ['module'], function(module) { module.exports = "<template><h2>Personal Info</h2><div class=\"form-group\"><label for=\"age\">Age</label><input style=\"width:400px\" id=\"age\"></div><div class=\"form-group col-md-6\"><label for=\"salary\">Income Per Year</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.income\" change.delegate=\"checkIncome()\" class=\"form-control ${user.personalInfo.validIncome ? 'none' : 'btn-danger'}\"></div></div><div class=\"form-group col-md-6\"><label for=\"savings\">Savings Per Month</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" change.delegate=\"checkSavings()\" class=\"form-control ${user.personalInfo.validSavings ? 'none' : 'btn-danger'}\"></div></div><br><br><br><hr><h2>Household Info</h2><div class=\"form-group col-md-6\"><label for=\"householdSize\">Household Size</label><input type=\"text\" value.bind=\"user.personalInfo.householdSize\" change.delegate=\"checkHouseholdSize()\" class=\"form-control ${user.personalInfo.validHouseholdSize ? 'none' : 'btn-danger'}\"></div><div class=\"form-group col-md-6\"><label for=\"householdSize\">Size of Home (in square feet)?</label><input type=\"text\" value.bind=\"user.personalInfo.squareFootHome\" change.delegate=\"checkHomeSize()\" class=\"form-control ${user.personalInfo.validHomeSize ? 'none' : 'btn-danger'}\"></div><br><br><br></template>"; });
define('text!expenses/compose/compose-car-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#carExpenseCollapse\">Car/Transportation<div style=\"float:right\">Total: $${user.expenses.totalCarExpense}</div></a></h4></div><div id=\"carExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"car of constants.CarExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${car.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[car.value]\" change.delegate=\"calculateExpenses.carExpenses()\" class=\"form-control\" id=\"${car.value}\" disabled.bind=\"!user.expenses[car.value + 'lock']\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[car.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(car.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[car.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[car.value + 'lock']\"></i></button></div></div><br></div><br></div></div></div></template>"; });
define('text!expenses/compose/compose-discretionary-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#discretionaryExpenseCollapse\">Discretionary Expenses<div style=\"float:right\">Total: $${user.expenses.totalDiscretionaryExpense}</div></a></h4></div><div id=\"discretionaryExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"discretionary of constants.DiscretionaryExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${discretionary.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[discretionary.value]\" change.delegate=\"calculateExpenses.discretionaryExpenses()\" class=\"form-control\" id=\"${discretionary.value}\" disabled.bind=\"!user.expenses[discretionary.value + 'lock']\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[discretionary.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(discretionary.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[discretionary.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[discretionary.value + 'lock']\"></i></button></div></div><br></div></div></div></div></template>"; });
define('text!expenses/compose/compose-health-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#healthExpenseCollapse\">Health<div style=\"float:right\">Total: $${user.expenses.totalHealthExpense}</div></a></h4></div><div id=\"healthExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"health of constants.HealthExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${health.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[health.value]\" change.delegate=\"calculateExpenses.healthExpenses()\" class=\"form-control\" id=\"${health.value}\" disabled.bind=\"!user.expenses[health.value + 'lock']\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[health.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(health.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[health.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[health.value + 'lock']\"></i></button></div></div></div><br></div></div></div></template>"; });
define('text!expenses/compose/compose-home-expenses.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#homeExpenseCollapse\">Home<div style=\"float:right\">Total: $${user.expenses.totalHomeExpense}</div></a></h4></div><div id=\"homeExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"home of constants.HomeExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${home.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[home.value]\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" id=\"${home.value}\" disabled.bind=\"!user.expenses[home.value + 'lock']\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[home.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(home.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[home.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[home.value + 'lock']\"></i></button></div></div><br></div></div></div></div></template>"; });
define('text!results/compose/compose-chart.html', ['module'], function(module) { module.exports = "<template><div class=\"col-md-4\" style=\"margin-left:21%;margin-right:5%\"><div class=\"btn-group\" data-toggle=\"buttons\"><label repeat.for=\"option of someOptions\" class=\"btn btn-primary\" click.delegate=\"test(option.text)\"><input type=\"radio\" autocomplete=\"off\" model.bind=\"option\" checked.bind=\"$parent.selectedOptions\"> ${option.text}</label></div><br><br></div><div class=\"col-md-4\"><div class=\"btn-group\" click.delegate=\"checkAdvancedRecommended()\" data-toggle=\"buttons\"><label class=\"btn btn-primary ${!user.results.showAdvancedRecommended ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Recommended Simple Budget</label><label class=\"btn btn-primary ${user.results.showAdvancedRecommended ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Recommended Advanced Budget</label></div></div><div class=\"box-shadow--6dp\" show.bind=\"user.results.showExpenses\" style=\"float:left;margin-left:17%;margin-right:10%\" id=\"fiveYearContainer\"></div><div class=\"box-shadow--6dp\" show.bind=\"user.results.showBudget\" style=\"float:left;margin-left:17%;margin-right:10%\" id=\"resultsContainer\"></div><div class=\"box-shadow--6dp\" show.bind=\"user.results.showAdvanced\" style=\"float:left;margin-left:17%;margin-right:10%\" id=\"resultsContainerAdvanced\"></div><div class=\"box-shadow--6dp\" show.bind=\"!user.results.showAdvancedRecommended\" style=\"float:left\" id=\"recommendedContainer\"></div><div class=\"box-shadow--6dp\" show.bind=\"user.results.showAdvancedRecommended\" style=\"float:left\" id=\"recommendedContainerAdvanced\"></div></template>"; });
<<<<<<< HEAD
define('text!results/compose/compose-table.html', ['module'], function(module) { module.exports = "<template><br style=\"clear:both\"><br style=\"clear:both\"><br style=\"clear:both\"><hr style=\"clear:both\"><div style=\"width:1500px;margin:0 auto\" class=\"table-outter\"><table class=\"table table-bordered box-shadow--6dp\"><thead class=\"bg-primary\"><tr style=\"font-size:20px\"><th style=\"text-align:center\">Expense</th><th style=\"text-align:center\" repeat.for=\"expense of user.results.recommendedResults.length\">${user.results.recommendedResults[expense][0]}</th><th style=\"text-align:center\">Yearly Savings & Goals</th></tr></thead><tbody><tr><th style=\"font-size:20px;text-align:center\">Amount</th><td style=\"\" repeat.for=\"amount of user.results.recommendedResults.length\"><div style=\"text-align:center\">${user.expenses['total' + user.results.recommendedResults[amount][0] + 'Expense']}</div><hr><div style=\"height:300px;overflow-y:scroll\"><div repeat.for=\"expense of constants[user.results.recommendedResults[amount][0] + 'Expenses']\" class=\"form-group\"><label>${expense.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[expense.value]\" disabled.bind=\"!user.expenses[expense.value + 'lock']\" change.delegate=\"checkValue(user.expenses, user.expenses[expense.value], expense, user.results.recommendedResults[amount][0])\" class=\"form-control ${user.expenses[expense.value + 'check'] ? 'none' : 'alert-danger'}\"></div><br></div></div></td><td><div style=\"text-align:center\">${user.personalInfo.savingsPerMonth * 12}</div><hr><div class=\"form-group\"><label for=\"privateSchool\">Savings Per Month</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" class=\"form-control\"></div><br></div><div show.bind=\"user.results.showGoals\" style=\"height:200px;overflow-y:scroll\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group\"><label for=\"privateSchool\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\"></div></div><br></div></div></div></td></tr></tbody></table></div></template>"; });
define('text!home/home.css', ['module'], function(module) { module.exports = ".bg {\r\n  background:#337ab7;\r\n  text-align: center;\r\n  padding: 50px;\r\n}\r\n\r\n.zigzag {\r\n  stroke-dasharray: 480;\r\n  stroke-dashoffset: 480;\r\n  -webkit-animation: zigzag 4s linear forwards infinite;\r\n          animation: zigzag 4s linear forwards infinite;\r\n}\r\n\r\n@-webkit-keyframes zigzag {\r\n  from {\r\n    stroke-dashoffset: 980;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n@keyframes zigzag {\r\n  from {\r\n    stroke-dashoffset: 980;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n.dash {\r\n  stroke-dasharray: 280;\r\n  stroke-dashoffset: 280;\r\n  -webkit-animation: month 4s linear backwards infinite;\r\n          animation: month 4s linear backwards infinite;\r\n}\r\n.dash:nth-child(1) {\r\n  -webkit-animation-delay: 0s;\r\n          animation-delay: 0s;\r\n}\r\n.dash:nth-child(2) {\r\n  -webkit-animation-delay: 0.05s;\r\n          animation-delay: 0.05s;\r\n}\r\n.dash:nth-child(3) {\r\n  -webkit-animation-delay: 0.10s;\r\n          animation-delay: 0.10s;\r\n}\r\n.dash:nth-child(4) {\r\n  -webkit-animation-delay: 0.15s;\r\n          animation-delay: 0.15s;\r\n}\r\n.dash:nth-child(5) {\r\n  -webkit-animation-delay: 0.20s;\r\n          animation-delay: 0.20s;\r\n}\r\n.dash:nth-child(6) {\r\n  -webkit-animation-delay: 0.25s;\r\n          animation-delay: 0.25s;\r\n}\r\n.dash:nth-child(7) {\r\n  -webkit-animation-delay: 0.30s;\r\n          animation-delay: 0.30s;\r\n}\r\n.dash:nth-child(8) {\r\n  -webkit-animation-delay: 0.35s;\r\n          animation-delay: 0.35s;\r\n}\r\n.dash:nth-child(9) {\r\n  -webkit-animation-delay: 0.40s;\r\n          animation-delay: 0.40s;\r\n}\r\n.dash:nth-child(10) {\r\n  -webkit-animation-delay: 0.45s;\r\n          animation-delay: 0.45s;\r\n}\r\n\r\n@-webkit-keyframes month {\r\n  from {\r\n    stroke-dashoffset: 380;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n@keyframes month {\r\n  from {\r\n    stroke-dashoffset: 380;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n"; });
=======
define('text!results/compose/compose-table.html', ['module'], function(module) { module.exports = "<template><br style=\"clear:both\"><br style=\"clear:both\"><br style=\"clear:both\"><hr style=\"clear:both\"><div style=\"width:1500px;margin:0 auto\" class=\"table-outter\"><table class=\"table table-bordered box-shadow--6dp\"><thead class=\"bg-primary\"><tr style=\"font-size:20px\"><th style=\"text-align:center\">Expense</th><th style=\"text-align:center\" repeat.for=\"expense of user.results.recommendedResults.length\">${user.results.recommendedResults[expense][0]}</th><th style=\"text-align:center\">Yearly Savings & Goals</th></tr></thead><tbody><tr><th style=\"font-size:20px;text-align:center\">Amount</th><td style=\"\" repeat.for=\"amount of user.results.recommendedResults.length\"><div style=\"text-align:center\"><strong>${user.expenses['total' + user.results.recommendedResults[amount][0] + 'Expense']}</strong></div><hr><div style=\"height:300px;overflow-y:scroll\"><div repeat.for=\"expense of constants[user.results.recommendedResults[amount][0] + 'Expenses']\" class=\"form-group\"><label>${expense.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[expense.value]\" disabled.bind=\"!user.expenses[expense.value + 'lock']\" change.delegate=\"checkValue(user.expenses, user.expenses[expense.value], expense, user.results.recommendedResults[amount][0])\" class=\"form-control ${user.expenses[expense.value + 'check'] ? 'alert-success' : 'alert-danger'}\"></div><br></div></div></td><td><div style=\"text-align:center\"><strong>${user.personalInfo.savingsPerMonth * 12}</strong></div><hr><div class=\"form-group\"><label for=\"privateSchool\">Savings Per Month</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" class=\"form-control\"></div><br></div><div show.bind=\"user.results.showGoals\" style=\"height:200px;overflow-y:scroll\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group\"><label for=\"privateSchool\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\"></div></div><br></div></div></div></td></tr></tbody></table></div><div style=\"width:20%;margin:0 auto;text-align:center\" class=\"alert alert-success\" role=\"alert\"><strong>This means your expense is lower than average</strong></div><div style=\"width:20%;margin:0 auto;text-align:center\" class=\"alert alert-danger\" role=\"alert\"><strong>This means your expense is higher than average</strong></div></template>"; });
define('text!css/navbar.css', ['module'], function(module) { module.exports = "nav{\r\n  width: 750px;\r\n  margin: 1em auto;\r\n}\r\n\r\nul{\r\n  margin: 0px;\r\n  padding: 0px;\r\n  list-style: none;\r\n}\r\n\r\nul.dropdown{ \r\n  position: relative; \r\n  width: 100%; \r\n}\r\n\r\nul.dropdown li{ \r\n  font-weight: bold; \r\n  float: left; \r\n  width: 180px; \r\n  position: relative;\r\n  background: #f5f5f5;\r\n}\r\n\r\nul.dropdown a:hover{ \r\n  color: #000; \r\n}\r\n\r\nul.dropdown li a { \r\n  display: block; \r\n  padding: 20px 8px;\r\n  color: #34495e; \r\n  position: relative; \r\n  z-index: 2000; \r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-weight: 300;\r\n}\r\n\r\nul.dropdown li a:hover,\r\nul.dropdown li a.hover{ \r\n  background: #337ab7;\r\n  position: relative;\r\n  color: #fff;\r\n}\r\n\r\n\r\nul.dropdown ul{ \r\n display: none;\r\n position: absolute; \r\n  top: 0; \r\n  left: 0; \r\n  width: 180px; \r\n  z-index: 1000;\r\n}\r\n\r\nul.dropdown ul li { \r\n  font-weight: normal; \r\n  background: #f5f5f5; \r\n  color: #000; \r\n  border-bottom: 1px solid #ccc; \r\n}\r\n\r\nul.dropdown ul li a{ \r\n  display: block; \r\n  color: #34495e !important;\r\n  background: #eee !important;\r\n} \r\n\r\nul.dropdown ul li a:hover{\r\n  display: block; \r\n  background: #3498db !important;\r\n  color: #fff !important;\r\n} \r\n\r\n.drop > a{\r\n  position: relative;\r\n}\r\n\r\n.drop > a:after{\r\n  content:\"\";\r\n  position: absolute;\r\n  right: 10px;\r\n  top: 40%;\r\n  border-left: 5px solid transparent;\r\n  border-top: 5px solid #333;\r\n  border-right: 5px solid transparent;\r\n  z-index: 999;\r\n}\r\n\r\n.drop > a:hover:after{\r\n  content:\"\";\r\n   border-left: 5px solid transparent;\r\n  border-top: 5px solid #fff;\r\n  border-right: 5px solid transparent;\r\n}\r\n\r\n"; });
>>>>>>> 36ca68a5c3207bf149703475bb0ba63e972d68e0
//# sourceMappingURL=app-bundle.js.map