define('app',['exports', 'jquery', 'aurelia-framework', 'services/user', './config', 'bootbox', 'jquery-ui-dist', 'bootstrap'], function (exports, _jquery, _aureliaFramework, _user, _config, bootbox) {
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

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
    function App(user) {
      _classCallCheck(this, App);

      this.user = user;
      this.signedIn;

      this.currentUser = {};
      this.currentKey;
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      var widthLimit = true;
      if ((0, _jquery2.default)(window).width() < 800) {
        widthLimit = false;
      }
      this.router = router;
      config.title = "Budget Tool";
      config.map([{
        route: ['', 'home'], moduleId: 'home/home',
        name: 'home', title: ' MoneyManage: Budgeting Tool ', nav: widthLimit, settings: 'Home'
      }, {
        route: 'personalinfo', moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'MoneyManage: Personal Info', nav: true, settings: 'Personal'
      }, {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'MoneyManage: Spending Habits', nav: true, settings: 'Spending'
      }, {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'MoneyManage: Results', nav: true, settings: 'Results'
      }, {
        route: 'logout', moduleId: 'logout/logout',
        name: 'logout', title: 'MoneyManage: Logout', nav: false, settings: 'Logout'
      }, {
        route: 'login', moduleId: 'login/login',
        name: 'login', title: 'MoneyManage: Login', nav: false, settings: 'Login'
      }, {
        route: 'about', moduleId: 'about/about',
        name: 'about', title: 'MoneyManage: About', nav: widthLimit, settings: 'About'
      }]);
    };

    App.prototype.logout = function logout() {
      firebase.auth().signOut().then(function () {
        console.log("signed out");
        bootbox.alert({
          title: "MoneyManage",
          message: "You are signed out!",
          backdrop: true
        });
      }).catch(function (error) {
        console.log(error.message);
      });
    };

    App.prototype.save = function save() {
      var currentUser = firebase.database().ref('Users/' + this.currentKey);

      currentUser.on('value', function (snap) {
        console.log(snap.val());
      });

      currentUser.update({ "name": "Joseph C" });

      bootbox.alert({
        title: "MoneyManage",
        message: "Content saved!",
        backdrop: true
      });
    };

    App.prototype.attached = function attached() {
      var _this = this;

      firebase.initializeApp(_config.configFB);
      var users = firebase.database().ref('Users/');

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          _this.signedIn = true;
          var currentUid = user.uid;
          _this.currentUser = {};

          users.on('value', function (snap) {
            snap.forEach(function (currentSnap) {
              if (currentSnap.val().uid == currentUid) {
                _this.currentKey = currentSnap.key;
              }
            });
          });
        } else _this.signedIn = false;
      });
    };

    return App;
  }()) || _class);
});
define('config',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var configFB = exports.configFB = {
        apiKey: "AIzaSyCg4U9P4k7ZXpT_sV6PdvQWbdA4jEP14Rw",
        authDomain: "moneymanage-84d90.firebaseapp.com",
        databaseURL: "https://moneymanage-84d90.firebaseio.com",
        projectId: "moneymanage-84d90",
        storageBucket: "moneymanage-84d90.appspot.com",
        messagingSenderId: "608888268283"
    };
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
define('about/about',['exports', 'aurelia-framework', 'aurelia-router', '../services/user'], function (exports, _aureliaFramework, _aureliaRouter, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.about = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var about = exports.about = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function () {
        function about(router, user) {
            _classCallCheck(this, about);

            this.router = router;
            this.user = user;
        }

        about.prototype.attached = function attached() {
            this.user.personalInfo.showNavbar = true;
        };

        return about;
    }()) || _class);
});
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/constants', '../utilities/slider', '../services/expensesConstants'], function (exports, _aureliaFramework, _aureliaRouter, _user, _constants, _slider, _expensesConstants) {
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

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _slider.Slider, _constants.Constants, _expensesConstants.ExpensesConstants), _dec(_class = function () {
        function personalinfo(router, user, slider, constants, expensesConstants) {
            _classCallCheck(this, personalinfo);

            this.router = router;
            this.user = user;
            this.slider = slider;
            this.constants = constants;
            this.expensesConstants = expensesConstants;
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

            var arr = this.user.personalInfo.currentGoals;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === title) {
                    this.user.personalInfo.currentGoals.splice(i, 1);
                }
            }

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
            this.expensesConstants.getExpenseConstants();

            console.log(this.user.personalInfo);
            if (this.user.personalInfo.income < 0 || isNaN(this.user.personalInfo.income)) alert('Enter valid income');else if (this.user.personalInfo.savingsPerMonth < 0 || isNaN(this.user.personalInfo.savingsPerMonth)) alert('Enter valid income');else if (this.user.personalInfo.householdSize < 0 || isNaN(this.user.personalInfo.householdSize)) alert('Enter valid household size');else if (this.user.personalInfo.householdSize == 0) alert('Household size must be greater than 0');else if (this.user.personalInfo.squareFootHome < 0 || isNaN(this.user.personalInfo.squareFootHome)) alert('Enter valid size of home');else this.router.navigate('#/expenses');
        };

        personalinfo.prototype.back = function back() {
            this.router.navigate('#/home');
        };

        personalinfo.prototype.attached = function attached() {
            this.user.personalInfo.showNavbar = true;
            this.slider.createAgeSlider();

            $('#wishesTooltip').tooltip({
                content: "Add the wishes you would like to reach for in the future.Rank your wishes based on priority (1 being highest priority)."
            });
        };

        return personalinfo;
    }()) || _class);
});
define('home/home',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', 'bootbox'], function (exports, _aureliaFramework, _aureliaRouter, _user, bootbox) {
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

  var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function () {
    function results(router, user) {
      _classCallCheck(this, results);

      this.router = router;
      this.user = user;
    }

    results.prototype.start = function start() {
      var _this = this;

      if ($(window).width() < 800) {
        bootbox.confirm({
          title: "MoneyManage",
          message: "Your screen size is still in beta testing for this application. Some features may not be available. Please switch to a larger screen for the best experience.",
          buttons: {
            cancel: {
              label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
              label: '<i class="fa fa-check"></i> Start'
            }
          },
          callback: function callback(result) {
            if (result) {
              console.log(result);
              _this.user.personalInfo.showNavbar = true;
              _this.router.navigate('#/personalinfo');
            }
          }
        });
      } else {
        this.user.personalInfo.showNavbar = true;
        this.router.navigate('#/personalinfo');
      }
    };

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

      this.user.personalInfo.showNavbar = false;
    };

    return results;
  }()) || _class);
});
define('expenses/expenses',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/constants', '../services/expensesConstants', '../utilities/calculateExpenses', 'bootbox'], function (exports, _aureliaFramework, _aureliaRouter, _user, _constants, _expensesConstants, _calculateExpenses, bootbox) {
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
            if (myElement == 'mortgage' || myElement == 'propertyTax' || myElement == 'homeownerInsurance' || myElement == 'carPayment' || myElement == 'carInsurance' || myElement == 'healthInsurance' || myElement == 'visualInsurance' || myElement == 'eyeCare' || myElement == 'dentalInsurance' || myElement == 'cavities' || myElement == 'braces') return;

            if (this.user.expenses[myElement + 'lock']) this.user.expenses[myElement + 'lock'] = false;else this.user.expenses[myElement + 'lock'] = true;
        };

        expenses.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        expenses.prototype.next = function next() {
            console.log(this.user.expenses);

            this.expensesConstants.getExpenseConstants();

            if (!this.user.expenses.homeCanGoToNext) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid home expenses before accessing Results.",
                    backdrop: true
                });
            } else if (!this.user.expenses.carCanGoToNext) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid car expenses before accessing Results.",
                    backdrop: true
                });
            } else if (!this.user.expenses.healthCanGoToNext) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid health expenses before accessing Results.",
                    backdrop: true
                });
            } else if (!this.user.expenses.discretionaryCanGoToNext) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid discretionary expenses before accessing Results.",
                    backdrop: true
                });
            } else this.router.navigate('#/results');
        };

        expenses.prototype.attached = function attached() {
            this.user.personalInfo.showNavbar = true;

            this.user.expenses.mortgagelock = false;
            this.user.expenses.propertyTaxlock = false;
            this.user.expenses.homeownerInsurancelock = false;

            this.user.expenses.carPaymentlock = false;
            this.user.expenses.carInsurancelock = false;

            this.user.expenses.healthInsurancelock = false;
            this.user.expenses.visualInsurancelock = false;
            this.user.expenses.eyeCarelock = false;
            this.user.expenses.dentalInsurancelock = false;
            this.user.expenses.cavitieslock = false;
            this.user.expenses.braceslock = false;
            $('#expensesTooltip').tooltip({
                content: "Enter all expenses as monthly amounts unless stated otherwise. Lock values you don't want changed. We've locked some values that cannot be changed."
            });
        };

        return expenses;
    }()) || _class);
});
define('logout/logout',[], function () {
    'use strict';

    var screenW = window.innerWidth,
        xCenter = screenW / 2,
        animationContainer = document.getElementById('emojiAnimation'),
        emojiPolice1 = document.getElementById('emojiPolice').cloneNode(true),
        emojiPolice2 = document.getElementById('emojiPolice').cloneNode(true),
        emojiPolice3 = document.getElementById('emojiPolice').cloneNode(true),
        emojiGun1 = document.getElementById('emojiGun').cloneNode(true),
        emojiGun2 = document.getElementById('emojiGun').cloneNode(true),
        emojiGun3 = document.getElementById('emojiGun').cloneNode(true),
        emojiExplosion2 = document.getElementById('emojiExplosion1').cloneNode(true),
        emojiExplosion3 = document.getElementById('emojiExplosion1').cloneNode(true);

    emojiPolice1.id = 'emojiPolice1';
    emojiPolice2.id = 'emojiPolice2';
    emojiPolice3.id = 'emojiPolice3';

    emojiGun1.id = 'emojiGun1';
    emojiGun2.id = 'emojiGun2';
    emojiGun3.id = 'emojiGun3';

    emojiExplosion2.id = 'emojiExplosion2';
    emojiExplosion3.id = 'emojiExplosion3';

    animationContainer.appendChild(emojiPolice1);
    animationContainer.appendChild(emojiPolice2);
    animationContainer.appendChild(emojiPolice3);

    animationContainer.insertBefore(emojiGun1, animationContainer.firstChild);
    animationContainer.insertBefore(emojiGun2, animationContainer.firstChild);
    animationContainer.insertBefore(emojiGun3, animationContainer.firstChild);

    animationContainer.appendChild(emojiExplosion2);
    animationContainer.appendChild(emojiExplosion3);

    var tl = new TimelineMax({ repeat: -1 }).to([emojiMoney, emojiGun1, emojiGun2, emojiGun3, emojiExplosion1, emojiExplosion2, emojiExplosion3], 0, { display: 'none' }).to(emojiAnimation, 0, { display: 'block' }).from(emojiBank, 1, { autoAlpha: 0, rotationX: -90, delay: 0.5, ease: Power4.easeOut }).fromTo(emojiRobber, 1.5, { left: screenW + 100 }, { left: xCenter + 110, delay: 1, ease: Power4.easeOut }).fromTo(emojiGun, 1.5, { display: 'none', left: screenW + 100 }, { display: 'block', left: xCenter + 110, ease: Power4.easeOut }, 2.5).to(emojiRobber, 0.5, { left: xCenter + 190, ease: Back.easeOut, delay: 1 }).fromTo(emojiGun, 0.5, { rotation: -45, left: xCenter + 125 }, { rotation: 0, left: xCenter + 110, ease: Back.easeOut, delay: -0.5 }).to(emojiRobber, 0.5, { left: xCenter, delay: 1 }).to(emojiGun, 0.25, { left: xCenter, delay: -0.5 }).to(emojiGun, 0, { rotationY: -180, display: 'none' }).to(emojiRobber, 0, { display: 'none' }).to(emojiBank, 0.1, { left: xCenter - 10, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter + 10, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter - 20, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter + 20, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter, ease: Power4.easeOut }).to(emojiBank, 0.1, { left: xCenter - 10, ease: Power4.easeIn, delay: 0.25 }).to(emojiBank, 0.1, { left: xCenter + 10, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter - 20, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter + 20, ease: Power4.easeIn }).to(emojiBank, 0.1, { left: xCenter, ease: Power4.easeOut }).to([emojiGun, emojiRobber, emojiMoney], 0, { display: 'block' }).to(emojiGun, 0.6, { left: xCenter + 330, delay: 0.5 }).to(emojiRobber, 0.4, { left: xCenter + 220, delay: -0.4 }).to(emojiMoney, 0.2, { left: xCenter + 110, delay: -0.2 }).fromTo(emojiCar, 0.5, { left: screenW + 100 }, { left: xCenter + 440, delay: 1, ease: Power4.easeOut }).to(emojiMoney, 0.6, { left: xCenter + 440, delay: 0.5 }).to(emojiRobber, 0.4, { left: xCenter + 440, delay: -0.6 }).to(emojiGun, 0.2, { left: xCenter + 440, delay: -0.6 }).to([emojiGun, emojiRobber, emojiMoney], 0, { display: 'none' }).to(emojiCar, 0.5, { rotationY: -180, ease: Power4.easeInOut }).to(emojiCar, 0.25, { left: screenW + 110, ease: Power4.easeIn }).to(emojiBank, 0.75, { left: '-=220', autoAlpha: 0, ease: Power4.easeIn, delay: -0.5 }).to(emojiCar, 0, { rotationY: 0 }).to(document.getElementsByTagName('body')[0], 0.5, { backgroundColor: '#009ACD' }).to(emojiCar, 2, { left: -220, ease: Power1.easeIn }).fromTo(emojiPolice, 2, { left: screenW + 220 }, { left: -110, delay: -2, ease: Power1.easeIn }).to(emojiCar, 0, { rotationY: -180, delay: 0.5 }).fromTo(emojiPolice1, 1, { left: screenW + 220 }, { left: xCenter - 110, ease: Power4.easeOut }).fromTo(emojiPolice2, 1, { left: screenW + 220 }, { left: xCenter, ease: Power4.easeOut, delay: -0.75 }).fromTo(emojiPolice3, 1, { left: screenW + 220 }, { left: xCenter + 110, ease: Power4.easeOut, delay: -0.75 }).to(emojiCar, 1, { left: xCenter - 360, ease: Back.easeOut, delay: -1 }).to(emojiGun1, 0, { display: 'block', rotation: -45, left: xCenter - 110 }).to(emojiGun1, 0.5, { rotation: 0, ease: Back.easeOut }).to(emojiPolice1, 0.5, { left: xCenter - 10, ease: Power4.easeInOut, delay: -0.5 }).to(emojiPolice2, 0.5, { left: xCenter + 100, ease: Power4.easeInOut, delay: -0.5 }).to(emojiPolice3, 0.5, { left: xCenter + 210, ease: Power4.easeInOut, delay: -0.5 }).to(emojiGun2, 0, { display: 'block', rotation: -45, left: xCenter + 100 }).to(emojiGun2, 0.5, { rotation: 0, ease: Back.easeOut }).to(emojiPolice2, 0.5, { left: xCenter + 210, ease: Power4.easeInOut, delay: -0.5 }).to(emojiPolice3, 0.5, { left: xCenter + 320, ease: Power4.easeInOut, delay: -0.5 }).to(emojiGun3, 0, { display: 'block', rotation: -45, left: xCenter + 320 }).to(emojiGun3, 0.5, { rotation: 0, ease: Back.easeOut }).to(emojiPolice3, 0.5, { left: xCenter + 420, ease: Power4.easeInOut, delay: -0.5 }).to(emojiExplosion1, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.25 }).to(emojiExplosion2, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.025 }).to(emojiExplosion3, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.05 }).to(emojiExplosion1, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.075 }).to(emojiExplosion2, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.1 }).to(emojiExplosion3, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.125 }).to(emojiExplosion1, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.15 }).to(emojiExplosion2, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.175 }).to(emojiExplosion3, 0, { display: 'block', marginTop: Math.random() * 120 - 100, left: xCenter - 220 - Math.random() * 120, delay: 0.2 }).to(emojiExplosion1, 0, { display: 'none', delay: 0.025 }).to(emojiExplosion2, 0, { display: 'none', delay: 0.025 }).to(emojiExplosion3, 0, { display: 'none', delay: 0.025 }).to(emojiCar, 0.5, { rotation: 180, ease: Elastic.easeOut, delay: 0.5 }).to(document.getElementsByTagName('body')[0], 0.5, { backgroundColor: '#c21c3b' }).fromTo(emojiAmbulance, 0.5, { left: -220, ease: Power4.easeOut, rotationY: 180, delay: 0.5 }, { left: xCenter - 360, delay: 1 }).to(emojiGun1, 0.5, { left: xCenter - 10, ease: Power4.easeInOut, delay: 0.5 }).to(emojiGun2, 0, { left: xCenter + 210, ease: Power4.easeInOut, delay: -0.25 }).to(emojiGun3, 0, { left: xCenter + 420, ease: Power4.easeInOut, delay: -0.25 }).to([emojiPolice1, emojiPolice2, emojiPolice3], 0.25, { rotationY: 180, delay: -0.1 }).to([emojiCar, emojiGun1, emojiGun2, emojiGun3], 0, { display: 'none', delay: 0.5 }).to(emojiAmbulance, 0.5, { left: screenW + 100, ease: Power2.easeIn }).to(emojiPolice1, 0.5, { left: screenW + 300, ease: Power2.easeIn, delay: -0.5 }).to(emojiPolice2, 0.5, { left: screenW + 500, ease: Power2.easeIn, delay: -0.5 }).to(emojiPolice3, 0.5, { left: screenW + 700, ease: Power2.easeIn, delay: -0.5 }).from(emojiHospital, 0.5, { autoAlpha: 0, delay: 0.5 }).to(emojiAmbulance, 0, { rotationY: 0 }).to(emojiAmbulance, 1, { left: xCenter, ease: Power4.easeOut, delay: 0.5 }).from(emojiFearful, 0.5, { autoAlpha: 0, delay: 1.5 }).fromTo(emojiGavel, 0.5, { left: screenW + 100 }, { left: xCenter + 110, ease: Power4.easeOut }).to(emojiGavel, 0.25, { marginTop: '-=36', rotation: 30, ease: Power4.easeOut, delay: -0.25 }).to(emojiGavel, 0.5, { marginTop: '+=36', rotation: 0, ease: Bounce.easeOut, delay: 0.25 }).from(emojiCrying, 0.5, { autoAlpha: 0 }).from(jailbars, 1, { top: -150, ease: Bounce.easeOut }).to(document.getElementsByTagName('body')[0], 1, { backgroundColor: '#666', delay: -1 }).to([emojiFearful, emojiHospital, emojiAmbulance], 0, { display: 'none' }).to([emojiCrying, jailbars, emojiGavel], 1, { rotationX: 90, autoAlpha: 0, ease: Power4.easeIn, delay: 2 }).to(document.getElementsByTagName('body')[0], 1, { backgroundColor: '#000' }).to(document.getElementsByTagName('body')[0], 1, { backgroundColor: '#5bb12f', delay: 0.5 });
});
define('login/login',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', 'bootbox'], function (exports, _aureliaFramework, _aureliaRouter, _user, bootbox) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.login = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var login = exports.login = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function () {
        function login(router, user) {
            _classCallCheck(this, login);

            this.router = router;
            this.user = user;

            this.emailInput = "";
            this.passwordInput = "";

            this.newEmail = "";
            this.newPassword = "";
        }

        login.prototype.newUser = function newUser(email, password) {
            var _this = this;

            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
                firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
                    console.log("new user signed in");
                }).catch(function (error) {
                    console.log(error.message);
                });

                bootbox.alert({
                    title: "MoneyManage",
                    message: "User created and signed in!",
                    backdrop: true
                });

                _this.router.navigate('#/personalinfo');
            }).catch(function () {
                console.log(error.message);
            });
        };

        login.prototype.login = function login(email, password) {
            var _this2 = this;

            firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "You are signed in!",
                    backdrop: true
                });

                _this2.router.navigate('#/personalinfo');
            }).catch(function (error) {
                console.log(error.message);
            });
        };

        login.prototype.facebookLogin = function facebookLogin() {
            var _this3 = this;

            var provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;

                var user = result.user;

                bootbox.alert({
                    title: "MoneyManage",
                    message: "You are signed in!",
                    backdrop: true
                });

                _this3.router.navigate('#/personalinfo');
            }).catch(function (error) {
                console.log(error.message);
            });
        };

        login.prototype.twitterLogin = function twitterLogin() {
            var _this4 = this;

            var provider = new firebase.auth.TwitterAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var secret = result.credential.secret;

                var user = result.user;

                bootbox.alert({
                    title: "MoneyManage",
                    message: "You are signed in!",
                    backdrop: true
                });

                _this4.router.navigate('#/personalinfo');
            }).catch(function (error) {
                console.log(error.message);
            });
        };

        login.prototype.googleLogin = function googleLogin() {
            var _this5 = this;

            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;

                var user = result.user;

                bootbox.alert({
                    title: "MoneyManage",
                    message: "You are signed in!",
                    backdrop: true
                });

                _this5.router.navigate('#/personalinfo');
            }).catch(function (error) {
                console.log(error.message);
            });
        };

        login.prototype.attached = function attached() {
            this.user.personalInfo.showNavbar = true;
        };

        return login;
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
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/chart', '../services/constants', '../utilities/calculateExpenses', '../utilities/calculateRecommended', '../utilities/calculatePercentages', 'bootbox'], function (exports, _aureliaFramework, _aureliaRouter, _user, _chart, _constants, _calculateExpenses, _calculateRecommended, _calculatePercentages, bootbox) {
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

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _chart.Chart, _constants.Constants, _calculateExpenses.calculateExpenses, _calculatePercentages.calculatePercentages, _calculateRecommended.calculateRecommended), _dec(_class = function () {
        function results(router, user, chart, constants, calculateExpenses, calculatePercentages, calculateRecommended) {
            _classCallCheck(this, results);

            this.selectedOptions = {};
            this.someOptions = [];

            this.router = router;
            this.user = user;
            this.chart = chart;
            this.constants = constants;
            this.calculateExpenses = calculateExpenses;
            this.calculateRecommended = calculateRecommended;
            this.calculatePercentages = calculatePercentages;

            this.selectedChart = [];
            this.chartOptions = [{ "text": "Simple Budget" }, { "text": "Advanced Budget" }, { "text": "Projected Expenses" }, { "text": "Goals" }];
            this.selectedChart = { "text": "Simple Budget" };

            this.homeChanges = Object.keys(this.user.recommend.homeChanges);
            this.carChanges = Object.keys(this.user.recommend.carChanges);
            this.healthChanges = Object.keys(this.user.recommend.healthChanges);
            this.discretionaryChanges = Object.keys(this.user.recommend.discretionaryChanges);

            this.currentHomeChanges = [];
            this.currentCarChanges = [];
            this.currentHealthChanges = [];
            this.currentDiscretionaryChanges = [];

            this.modelHomeChanges = [];
            this.modelCarChanges = [];
            this.modelHealthChanges = [];
            this.modelDiscretionaryChanges = [];
            this.modelExpenseChange = 0;
        }

        results.prototype.checkValue = function checkValue(expenses, value, category, overallCategory) {
            var val = parseInt(value);
            if (val < 0) expenses[category.value + 'check'] = false;else if (val > 0) expenses[category.value + 'check'] = true;

            if (overallCategory == 'Home') this.calculateExpenses.homeExpenses();else if (overallCategory == 'Car') this.calculateExpenses.carExpenses();else if (overallCategory == 'Health') this.calculateExpenses.healthExpenses();else if (overallCategory == 'Discretionary') this.calculateExpenses.discretionaryExpenses();
        };

        results.prototype.getChartData = function getChartData() {
            this.calculateExpenses.get5YearEstimates();
            this.calculateRecommended.getRecommendedTotals();
            this.calculatePercentages.calculateAllPercentages();
            this.calculateExpenses.getChartResults();

            console.log(this.user.expenses);
            console.log(this.user.results);
            console.log(this.user.recommend);

            this.formatModal();

            this.chart.createFiveYearGoalsChart('fiveYearGoalsContainer', this.user.results);
            this.chart.createFiveYearExpensesChart('fiveYearExpensesContainer', this.user.results);
            this.chart.createSimpleChart('resultsContainerSimple', this.user.results);
            this.chart.createAdvancedChart('resultsContainerAdvanced', this.user.results);

            this.chart.createRecommendedChart('recommendedContainer', this.user.results, this.user.recommend);
            this.chart.createAdvancedRecommendedChart('recommendedContainerAdvanced', this.user.results, this.user.recommend);
        };

        results.prototype.showChart = function showChart(option) {
            if (option == "Simple Budget") {
                this.user.results.showBudget = true;
                this.user.results.showGoalsChart = false;
                this.user.results.showExpenses = false;
                this.user.results.showAdvanced = false;
            } else if (option == "Advanced Budget") {
                this.user.results.showAdvanced = true;
                this.user.results.showGoalsChart = false;
                this.user.results.showExpenses = false;
                this.user.results.showBudget = false;
            } else if (option == "Projected Expenses") {
                this.user.results.showExpenses = true;
                this.user.results.showGoalsChart = false;
                this.user.results.showBudget = false;
                this.user.results.showAdvanced = false;
            } else if (option == "Goals") {
                this.user.results.showGoalsChart = true;
                this.user.results.showExpenses = false;
                this.user.results.showBudget = false;
                this.user.results.showAdvanced = false;
            }

            this.selectedChart.text = option;
            return true;
        };

        results.prototype.showRecommendedChart = function showRecommendedChart(option) {
            if (option == "Recommended Simple Budget") {
                this.user.results.showAdvancedRecommended = false;
            } else this.user.results.showAdvancedRecommended = true;
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

        results.prototype.home = function home() {
            this.router.navigate('#/home');
        };

        results.prototype.formatModal = function formatModal() {
            this.modelHomeChanges = [];
            this.modelCarChanges = [];
            this.modelHealthChanges = [];
            this.modelDiscretionaryChanges = [];

            this.currentHomeChanges = [];
            this.currentCarChanges = [];
            this.currentHealthChanges = [];
            this.currentDiscretionaryChanges = [];

            for (var i = 0; i < this.homeChanges.length; i++) {
                var val = parseFloat(this.user.recommend.homeChanges[this.homeChanges[i]]);
                if (val < 0) {
                    this.modelHomeChanges.push("-$" + Math.abs(val).toFixed(2));
                    this.currentHomeChanges.push(this.homeChanges[i] + ":");
                } else if (val > 0) {
                    this.modelHomeChanges.push("$" + Math.abs(val).toFixed(2));
                    this.currentHomeChanges.push(this.homeChanges[i] + ":");
                }
            }

            if (this.currentHomeChanges.length == 0) this.currentHomeChanges.push('None');

            for (var i = 0; i < this.carChanges.length; i++) {
                var val = parseFloat(this.user.recommend.carChanges[this.carChanges[i]]);
                if (val < 0) {
                    this.modelCarChanges.push("-$" + Math.abs(val).toFixed(2));
                    this.currentCarChanges.push(this.carChanges[i] + ":");
                } else if (val > 0) {
                    this.modelCarChanges.push("$" + Math.abs(val).toFixed(2));
                    this.currentCarChanges.push(this.carChanges[i] + ":");
                }
            }

            if (this.currentCarChanges.length == 0) this.currentCarChanges.push('None');

            for (var i = 0; i < this.healthChanges.length; i++) {
                var val = parseFloat(this.user.recommend.healthChanges[this.healthChanges[i]]);
                if (val < 0) {
                    this.modelHealthChanges.push("-$" + Math.abs(val).toFixed(2));
                    this.currentHealthChanges.push(this.healthChanges[i] + ":");
                } else if (val > 0) {
                    this.modelHealthChanges.push("$" + Math.abs(val).toFixed(2));
                    this.currentHealthChanges.push(this.healthChanges[i] + ":");
                }
            }

            if (this.currentHealthChanges.length == 0) this.currentHealthChanges.push('None');

            for (var i = 0; i < this.discretionaryChanges.length; i++) {
                var val = parseFloat(this.user.recommend.discretionaryChanges[this.discretionaryChanges[i]]);
                if (val < 0) {
                    this.modelDiscretionaryChanges.push("-$" + Math.abs(val).toFixed(2));
                    this.currentDiscretionaryChanges.push(this.discretionaryChanges[i] + ":");
                } else if (val > 0) {
                    this.modelDiscretionaryChanges.push("$" + Math.abs(val).toFixed(2));
                    this.currentDiscretionaryChanges.push(this.discretionaryChanges[i] + ":");
                }
            }

            if (this.currentDiscretionaryChanges.length == 0) this.currentDiscretionaryChanges.push('None');

            var expenseChange = this.user.recommend.expensesChange;
            if (expenseChange < 0) this.modelExpenseChange = "-$" + Math.abs(expenseChange.toFixed(2));else this.modelExpenseChange = "$" + Math.abs(expenseChange.toFixed(2));
        };

        results.prototype.attached = function attached() {
            var _this = this;

            this.user.personalInfo.showNavbar = true;
            this.getChartData();

            this.user.results.showBudget = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showExpenses = false;
            this.user.results.showAdvanced = false;
            this.user.results.showAdvancedRecommended = false;

            this.user.expenses.mortgagelock = false;
            this.user.expenses.propertyTaxlock = false;
            this.user.expenses.homeownerInsurancelock = false;

            this.user.expenses.carPaymentlock = false;
            this.user.expenses.carInsurancelock = false;

            this.user.expenses.healthInsurancelock = false;
            this.user.expenses.visualInsurancelock = false;
            this.user.expenses.eyeCarelock = false;
            this.user.expenses.dentalInsurancelock = false;
            this.user.expenses.cavitieslock = false;
            this.user.expenses.braceslock = false;

            if (this.user.personalInfo.currentGoals.length > 0) this.user.results.showGoals = true;else this.user.results.showGoals = false;

            if (this.user.expenses.totalHomeExpense + this.user.expenses.totalCarExpense + this.user.expenses.totalHealthExpense + this.user.expenses.totalDiscretionaryExpense == 0) {
                this.user.expenses.isTotalExpenseZero = true;

                bootbox.confirm({
                    title: "MoneyManage",
                    message: "Please input some spending habits before accessing results!",
                    buttons: {
                        cancel: {
                            label: '<i class="fa fa-times"></i> Cancel'
                        },
                        confirm: {
                            label: '<i class="fa fa-check"></i> Spending'
                        }
                    },
                    callback: function callback(result) {
                        if (result) {
                            console.log(result);
                            _this.user.personalInfo.showNavbar = true;
                            _this.router.navigate('#/expenses');
                        }
                    }
                });
            } else {
                this.user.expenses.isTotalExpenseZero = false;
            }
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
            "title": "Mortgage/Rent",
            "value": "mortgage"
        }, {
            "title": "Property tax (yearly)",
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
            "title": "Streaming Service",
            "value": "streaming"
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
            "title": "Clothes",
            "value": "clothes"
        }];

        this.homeCategories = ['Mortgage/Rent', 'Property tax (yearly)', "Homeowner's Insurace", 'Phone Payment', 'Internet', 'Cable', 'Streaming Service', 'Groceries', 'Utilities', 'Maintenance', 'Clothes'];

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
            "title": "Visual Insurance",
            "value": "visualInsurance"
        }, {
            "title": "Eye Care",
            "value": "eyeCare"
        }, {
            "title": "Dental Insurance",
            "value": "dentalInsurance"
        }, {
            "title": "Dental Work",
            "value": "cavities"
        }, {
            "title": "Braces",
            "value": "braces"
        }];
        this.healthCategories = ['Health Insurance', 'Medication', 'Unexpected Medical Problems', 'Visual Insurance', 'Eye Care', 'Dental Insurance', 'Dental Work', 'Braces'];

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

    var ExpensesConstants = exports.ExpensesConstants = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function ExpensesConstants(user) {
            _classCallCheck(this, ExpensesConstants);

            this.user = user;
        }

        ExpensesConstants.prototype.getExpenseConstants = function getExpenseConstants() {
            var emergencyValue = 0;
            if (this.user.personalInfo.householdSize == 1) {
                emergencyValue = 3300 / 12;
            } else emergencyValue = 6550 / 12;

            this.user.expenses.homeExpenseConstants = {
                "Mortgage": [461, 461, 461, 493, 614, 678, 678, 759, 939, 939, 1037, 1037, 1211, 1211, 1211, 1686][Math.min(15, Math.floor(this.user.personalInfo.income / 10000))],

                "CableMax": 81.75,
                "CableExpanded": 69.03,
                "CableBasic": 23.79,
                "Streaming": 9,

                "GroceryThrifty": [201, 201, 382, 504, 618, 717, 855, 949, 1080, 1203, 1393, 1483][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
                "GroceryLow": [267, 267, 488, 657, 811, 947, 1134, 1259, 1436, 1588, 1833, 1886][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
                "GroceryModerate": [332, 332, 607, 814, 1006, 1176, 1412, 1577, 1799, 1985, 2286, 2341][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
                "GroceryLiberal": [414, 414, 759, 999, 1222, 1423, 1698, 1887, 2148, 2375, 2739, 2812][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],

                "Utilities": 200 + 200 * .02 * parseInt(this.user.personalInfo.householdSize),
                "Maintenance": parseInt(this.user.personalInfo.squareFootHome / 12),
                "Clothes": Math.floor(this.user.personalInfo.income * .05) / 12
            };

            this.user.expenses.carExpenseConstants = {
                "Payment": 479,
                "GasMin": 100,
                "GasMax": 250,
                "PublicTransport": 65,
                "Maintenance": 913.50 / 12
            };

            this.user.expenses.healthExpenseConstants = {
                "MedicationMin": parseFloat(this.user.expenses.medication) * .95,
                "Emergency": emergencyValue,
                "Braces": 6000 / 12
            };

            this.user.expenses.discretionaryExpenseConstants = {
                "Eating": Math.floor(this.user.personalInfo.income * .045),
                "Club": 162
            };
        };

        return ExpensesConstants;
    }()) || _class);
});
define('services/user',['exports', '../services/data/personalInfoData', '../services/data/goalsData', '../services/data/expensesData', '../services/data/resultsData', '../services/data/recommendedData'], function (exports, _personalInfoData, _goalsData, _expensesData, _resultsData, _recommendedData) {
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
        this.recommend = new _recommendedData.RecommendedData();
    };
});
define('utilities/calculateExpenses',['exports', 'aurelia-framework', '../services/user', 'bootbox'], function (exports, _aureliaFramework, _user, bootbox) {
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

    var calculateExpenses = exports.calculateExpenses = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function calculateExpenses(user) {
            _classCallCheck(this, calculateExpenses);

            this.user = user;
        }

        calculateExpenses.prototype.getChartResults = function getChartResults() {
            this.user.results.simpleChartResults = [];
            this.user.results.simpleChartResults.push(['Home', this.user.expenses.totalHomeExpense]);
            this.user.results.simpleChartResults.push(['Car', this.user.expenses.totalCarExpense]);
            this.user.results.simpleChartResults.push(['Health', this.user.expenses.totalHealthExpense]);
            this.user.results.simpleChartResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense]);

            this.user.results.recommendedResults = [];
            this.user.results.recommendedResults.push(['Home', this.user.recommend.totalHomeExpense]);
            this.user.results.recommendedResults.push(['Car', this.user.recommend.totalCarExpense]);
            this.user.results.recommendedResults.push(['Health', this.user.recommend.totalHealthExpense]);
            this.user.results.recommendedResults.push(['Discretionary', this.user.recommend.totalDiscretionaryExpense]);
        };

        calculateExpenses.prototype.get5YearExpenses = function get5YearExpenses() {
            this.user.results.homeFiveYears = [];
            this.user.results.carFiveYears = [];
            this.user.results.healthFiveYears = [];
            this.user.results.discretionaryFiveYears = [];
            this.user.results.fiveYearExpenses = [];

            for (var i = 0; i < 5; i++) {
                var tempHomeTotal = (parseInt(this.user.expenses.mortgage) + parseFloat(this.user.expenses.propertyTax) / 12 + parseInt(this.user.expenses.homeownerInsurance) * Math.pow(1 + .0250, i) + parseInt(this.user.expenses.phone) * Math.pow(1 - .012, i) + parseInt(this.user.expenses.internet) * Math.pow(1 - .018, i) + parseInt(this.user.expenses.cable) * Math.pow(1 + .029, i) + parseInt(this.user.expenses.streaming) + parseInt(this.user.expenses.groceries) * Math.pow(1 + 0.01, i) + parseInt(this.user.expenses.utilities) * Math.pow(1 + .018, i) + parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes) * Math.pow(1 - 0.001, i)) * 12;
                this.user.results.homeFiveYears.push(tempHomeTotal);

                var tempCarTotal = (parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) * Math.pow(1 + .052, i) + parseInt(this.user.expenses.publicTransport) * Math.pow(1 - .003, i) + parseInt(this.user.expenses.gas) * Math.pow(1 + 0.026, i) + parseInt(this.user.expenses.carMaintenance)) * 12;
                this.user.results.carFiveYears.push(tempCarTotal);

                var tempHealthTotal = (parseInt(this.user.expenses.healthInsurance) * Math.pow(1 + .035, i) + parseInt(this.user.expenses.medication) * Math.pow(1 + .025, i) + parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.visualInsurance) + parseInt(this.user.expenses.eyeCare) + parseInt(this.user.expenses.dentalInsurance) * Math.pow(1 + .02, i) + parseInt(this.user.expenses.cavities) * Math.pow(1 + .027, i) + parseInt(this.user.expenses.braces) * Math.pow(1 + .011, i)) * 12;
                this.user.results.healthFiveYears.push(tempHealthTotal);

                var tempDiscretionaryTotal = (parseInt(this.user.expenses.eatingOut) * Math.pow(1 + .024, i) + parseInt(this.user.expenses.bars) * Math.pow(1 + .02, i) + parseInt(this.user.expenses.funMoney) * Math.pow(1 + .003, i) + parseInt(this.user.expenses.other)) * 12;
                this.user.results.discretionaryFiveYears.push(tempDiscretionaryTotal);

                var tempTotalExpense = tempHomeTotal + tempCarTotal + tempHealthTotal + tempDiscretionaryTotal;
                this.user.results.fiveYearExpenses.push(tempTotalExpense);
            }
        };

        calculateExpenses.prototype.get5YearEarnings = function get5YearEarnings() {
            this.user.results.fiveYearEarnings = [];
            this.user.results.fiveYearIncome = [];
            this.user.results.fiveYearSavings = [];

            for (var i = 0; i < 5; i++) {
                var tempTotalExpense = this.user.results.fiveYearExpenses[i];

                var tempIncome = parseInt(this.user.personalInfo.income) * Math.pow(1.025, i);
                tempIncome -= parseInt(this.user.personalInfo.savingsPerMonth) * 12 * Math.pow(1.0199, i);
                this.user.results.fiveYearIncome.push(tempIncome);
                var tempDifferenceIncomeExpense = tempIncome - tempTotalExpense;

                var tempSavings = 0;
                if (i > 0) tempSavings = parseFloat(this.user.results.fiveYearSavings[i - 1]);
                tempSavings += parseInt(this.user.personalInfo.savingsPerMonth) * 12;
                tempSavings *= 1.0199;
                tempSavings += tempDifferenceIncomeExpense;
                this.user.results.fiveYearSavings.push(tempSavings);

                var tempEarnings = 0;
                if (i > 0) tempEarnings = parseFloat(this.user.results.fiveYearEarnings[i - 1]);
                tempEarnings += tempIncome;
                tempEarnings += tempSavings;
                tempEarnings -= tempTotalExpense;

                this.user.results.fiveYearEarnings.push(tempEarnings);
            }
        };

        calculateExpenses.prototype.get5YearGoals = function get5YearGoals() {
            this.user.results.fiveYearPrivateSchoolGoal = [];
            this.user.results.fiveYearCollegeGoal = [];
            this.user.results.fiveYearWeddingGoal = [];
            this.user.results.fiveYearVacationGoal = [];
            this.user.results.fiveYearBoatGoal = [];
            this.user.results.fiveYearNewCarGoal = [];
            this.user.results.fiveYearOtherGoal = [];

            this.user.results.chartGoals = [];

            for (var i = 0; i < 5; i++) {
                var tempGoal = 0;
                var temp = [];

                for (var j = 0; j < this.user.personalInfo.currentGoalsRanks.length; j++) {
                    var color;
                    tempGoal += parseInt(this.user.personalInfo[this.user.personalInfo.currentGoalsRanks[j][1]]);

                    if (tempGoal > this.user.results.fiveYearSavings[i]) {
                        this.user.results[this.user.personalInfo.currentGoalsRanks[j][1] + 'MetGoal'] = false;
                        color = '#dff0d8';
                    } else {
                        this.user.results[this.user.personalInfo.currentGoalsRanks[j][1] + 'MetGoal'] = true;
                        color = '#f2dede';
                    }

                    this.user.results['fiveYear' + this.user.personalInfo.currentGoalsRanks[j][1] + 'Goal'] = tempGoal;
                    temp.push({
                        name: this.user.personalInfo.currentGoalsRanks[j][1],
                        data: tempGoal,
                        color: color
                    });
                }
                this.user.results.chartGoals.push(temp);
            }
        };

        calculateExpenses.prototype.get5YearEstimates = function get5YearEstimates() {
            this.get5YearExpenses();
            this.get5YearEarnings();
            this.get5YearGoals();
        };

        calculateExpenses.prototype.homeExpenses = function homeExpenses() {
            var tempHomeTotal = (parseInt(this.user.expenses.mortgage) + parseFloat(this.user.expenses.propertyTax / 12) + parseInt(this.user.expenses.homeownerInsurance) + parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) + parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.streaming) + parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) + parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes)) * 12;

            if (isNaN(tempHomeTotal)) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid inputs.",
                    backdrop: true
                });
                this.user.expenses.homeCanGoToNext = false;
            } else {
                if (this.user.expenses.mortgage > this.user.expenses.homeExpenseConstants["Mortgage"]) this.user.expenses.mortgagecheck = false;else this.user.expenses.mortgagecheck = true;

                if (this.user.expenses.cable > this.user.expenses.homeExpenseConstants["CableMax"]) this.user.expenses.cablecheck = false;else this.user.expenses.cablecheck = true;

                if (this.user.expenses.streaming > this.user.expenses.homeExpenseConstants["Streaming"]) this.user.expenses.streamingcheck = false;else this.user.expenses.streamingcheck = true;

                if (this.user.expenses.groceries > this.user.expenses.homeExpenseConstants["GroceryLiberal"]) this.user.expenses.groceriescheck = false;else this.user.expenses.groceriescheck = true;

                if (this.user.expenses.utilities > this.user.expenses.homeExpenseConstants["Utilities"]) this.user.expenses.utilitiescheck = false;else this.user.expenses.utilitiescheck = true;

                if (this.user.expenses.homeMaintenance > this.user.expenses.homeExpenseConstants["Maintenance"]) this.user.expenses.homeMaintenancecheck = false;else this.user.expenses.homeMaintenancecheck = true;

                if (this.user.expenses.clothes > this.user.expenses.homeExpenseConstants["Clothes"]) this.user.expenses.clothescheck = false;else this.user.expenses.clothescheck = true;

                this.user.expenses.homeCanGoToNext = true;
                this.user.expenses.totalHomeExpense = tempHomeTotal;

                return tempHomeTotal;
            }
        };

        calculateExpenses.prototype.carExpenses = function carExpenses() {
            var tempCarTotal = (parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) + parseInt(this.user.expenses.publicTransport) + parseInt(this.user.expenses.gas) + parseInt(this.user.expenses.carMaintenance)) * 12;

            if (isNaN(tempCarTotal)) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid inputs.",
                    backdrop: true
                });
                this.user.expenses.carCanGoToNext = false;
            } else {
                if (this.user.expenses.carPayment > this.user.expenses.carExpenseConstants["Payment"]) this.user.expenses.carPaymentcheck = false;else this.user.expenses.carPaymentcheck = true;

                if (this.user.expenses.gas > this.user.expenses.carExpenseConstants["GasMax"]) this.user.expenses.gascheck = false;else this.user.expenses.gascheck = true;

                if (this.user.expenses.publicTransport > this.user.expenses.carExpenseConstants["PublicTransport"]) this.user.expenses.publicTransportcheck = false;else this.user.expenses.publicTransportcheck = true;

                if (this.user.expenses.carMaintenance > this.user.expenses.carExpenseConstants["Maintenance"]) this.user.expenses.carMaintenancecheck = false;else this.user.expenses.carMaintenancecheck = true;

                this.user.expenses.carCanGoToNext = true;
                this.user.expenses.totalCarExpense = tempCarTotal;
            }
        };

        calculateExpenses.prototype.healthExpenses = function healthExpenses() {
            var tempHealthTotal = (parseInt(this.user.expenses.healthInsurance) + parseInt(this.user.expenses.medication) + parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.visualInsurance) + parseInt(this.user.expenses.eyeCare) + parseInt(this.user.expenses.dentalInsurance) + parseInt(this.user.expenses.cavities) + parseInt(this.user.expenses.braces)) * 12;

            if (isNaN(tempHealthTotal)) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid inputs.",
                    backdrop: true
                });
                this.user.expenses.healthCanGoToNext = false;
            } else {
                if (this.user.expenses.unexpectedMedicalProblems > this.user.expenses.healthExpenseConstants["Emergency"]) this.user.expenses.unexpectedMedicalProblemscheck = false;else this.user.expenses.unexpectedMedicalProblemscheck = true;

                if (this.user.expenses.braces > this.user.expenses.healthExpenseConstants["Braces"]) this.user.expenses.bracescheck = false;else this.user.expenses.bracescheck = true;

                this.user.expenses.healthCanGoToNext = true;
                this.user.expenses.totalHealthExpense = tempHealthTotal;
            }
        };

        calculateExpenses.prototype.discretionaryExpenses = function discretionaryExpenses() {
            var tempDiscretionaryTotal = (parseInt(this.user.expenses.eatingOut) + parseInt(this.user.expenses.bars) + parseInt(this.user.expenses.funMoney) + parseInt(this.user.expenses.other)) * 12;

            if (isNaN(tempDiscretionaryTotal)) {
                bootbox.alert({
                    title: "MoneyManage",
                    message: "Please enter valid inputs.",
                    backdrop: true
                });
                this.user.expenses.discretionaryCanGoToNext = false;
            } else {
                if (this.user.expenses.eatingOut > this.user.expenses.discretionaryExpenseConstants["Eating"]) this.user.expenses.eatingOutcheck = false;else this.user.expenses.eatingOutcheck = true;

                if (this.user.expenses.bars > this.user.expenses.discretionaryExpenseConstants["Club"]) this.user.expenses.barscheck = false;else this.user.expenses.barscheck = true;

                this.user.expenses.discretionaryCanGoToNext = true;
                this.user.expenses.totalDiscretionaryExpense = tempDiscretionaryTotal;
            }
        };

        return calculateExpenses;
    }()) || _class);
});
define('utilities/calculatePercentages',['exports', 'aurelia-framework', '../services/user', '../services/constants'], function (exports, _aureliaFramework, _user, _constants) {
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

    var calculatePercentages = exports.calculatePercentages = (_dec = (0, _aureliaFramework.inject)(_user.User, _constants.Constants), _dec(_class = function () {
        function calculatePercentages(user, constants) {
            _classCallCheck(this, calculatePercentages);

            this.user = user;
            this.constants = constants;
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

            var homeRecommended = this.user.recommend.totalHomeExpense;
            var carRecommended = this.user.recommend.totalCarExpense;
            var healthRecommended = this.user.recommend.totalHealthExpense;
            var discretionaryRecommended = this.user.recommend.totalDiscretionaryExpense;
            var totalRecommended = this.user.recommend.totalExpense;

            this.calculateHomePercentagesRecommended(homeRecommended, totalRecommended);
            this.calculateCarPercentagesRecommended(carRecommended, totalRecommended);
            this.calculateHealthPercentagesRecommended(healthRecommended, totalRecommended);
            this.calculateDiscretionaryPercentagesRecommended(discretionaryRecommended, totalRecommended);
        };

        calculatePercentages.prototype.calculateHomePercentages = function calculateHomePercentages(home, total) {
            this.user.results.advancedHomeAmounts = [];
            this.user.results.homePercentageArray = [];
            this.user.results.homePercentage = home / total * 100;

            for (var i = 0; i < this.constants.HomeExpenses.length; i++) {
                var expenseName = this.constants.HomeExpenses[i].value;
                this.user.results.homePercentageArray.push(this.user.results[expenseName + 'Percentage'] = this.user.expenses[expenseName] / home * this.user.results.homePercentage);
                if (expenseName == 'propertyTax') this.user.results.advancedHomeAmounts.push(this.user.expenses[expenseName]);else this.user.results.advancedHomeAmounts.push(this.user.expenses[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateCarPercentages = function calculateCarPercentages(car, total) {
            this.user.results.advancedCarAmounts = [];
            this.user.results.carPercentageArray = [];
            this.user.results.carPercentage = car / total * 100;

            for (var i = 0; i < this.constants.CarExpenses.length; i++) {
                var expenseName = this.constants.CarExpenses[i].value;
                this.user.results.carPercentageArray.push(this.user.results[expenseName + 'Percentage'] = this.user.expenses[expenseName] / car * this.user.results.carPercentage);
                this.user.results.advancedCarAmounts.push(this.user.expenses[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateHealthPercentages = function calculateHealthPercentages(health, total) {
            this.user.results.advancedHealthAmounts = [];
            this.user.results.healthPercentageArray = [];
            this.user.results.healthPercentage = health / total * 100;

            for (var i = 0; i < this.constants.HealthExpenses.length; i++) {
                var expenseName = this.constants.HealthExpenses[i].value;
                this.user.results.healthPercentageArray.push(this.user.results[expenseName + 'Percentage'] = this.user.expenses[expenseName] / health * this.user.results.healthPercentage);
                this.user.results.advancedHealthAmounts.push(this.user.expenses[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateDiscretionaryPercentages = function calculateDiscretionaryPercentages(discretionary, total) {
            this.user.results.advancedDiscretionaryAmounts = [];
            this.user.results.discretionaryPercentageArray = [];
            this.user.results.discretionaryPercentage = discretionary / total * 100;

            for (var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                var expenseName = this.constants.DiscretionaryExpenses[i].value;
                this.user.results.discretionaryPercentageArray.push(this.user.results[expenseName + 'Percentage'] = this.user.expenses[expenseName] / discretionary * this.user.results.discretionaryPercentage);
                this.user.results.advancedDiscretionaryAmounts.push(this.user.expenses[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateHomePercentagesRecommended = function calculateHomePercentagesRecommended(home, total) {
            this.user.recommend.advancedHomeAmounts = [];
            this.user.recommend.homePercentageArray = [];
            this.user.recommend.homePercentage = home / total * 100;

            for (var i = 0; i < this.constants.HomeExpenses.length; i++) {
                var expenseName = this.constants.HomeExpenses[i].value;
                this.user.recommend.homePercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = this.user.recommend[expenseName] / home * this.user.recommend.homePercentage);
                if (expenseName == 'propertyTax') this.user.recommend.advancedHomeAmounts.push(this.user.recommend[expenseName]);else this.user.recommend.advancedHomeAmounts.push(this.user.recommend[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateCarPercentagesRecommended = function calculateCarPercentagesRecommended(car, total) {
            this.user.recommend.advancedCarAmounts = [];
            this.user.recommend.carPercentageArray = [];
            this.user.recommend.carPercentage = car / total * 100;

            for (var i = 0; i < this.constants.CarExpenses.length; i++) {
                var expenseName = this.constants.CarExpenses[i].value;
                this.user.recommend.carPercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = this.user.recommend[expenseName] / car * this.user.recommend.carPercentage);
                this.user.recommend.advancedCarAmounts.push(this.user.recommend[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateHealthPercentagesRecommended = function calculateHealthPercentagesRecommended(health, total) {
            this.user.recommend.advancedHealthAmounts = [];
            this.user.recommend.healthPercentageArray = [];
            this.user.recommend.healthPercentage = health / total * 100;

            for (var i = 0; i < this.constants.HealthExpenses.length; i++) {
                var expenseName = this.constants.HealthExpenses[i].value;
                this.user.recommend.healthPercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = this.user.recommend[expenseName] / health * this.user.recommend.healthPercentage);
                this.user.recommend.advancedHealthAmounts.push(this.user.recommend[expenseName] * 12);
            }
        };

        calculatePercentages.prototype.calculateDiscretionaryPercentagesRecommended = function calculateDiscretionaryPercentagesRecommended(discretionary, total) {
            this.user.recommend.advancedDiscretionaryAmounts = [];
            this.user.recommend.discretionaryPercentageArray = [];
            this.user.recommend.discretionaryPercentage = discretionary / total * 100;

            for (var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                var expenseName = this.constants.DiscretionaryExpenses[i].value;
                this.user.recommend.discretionaryPercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = this.user.recommend[expenseName] / discretionary * this.user.recommend.discretionaryPercentage);
                this.user.recommend.advancedDiscretionaryAmounts.push(this.user.recommend[expenseName] * 12);
            }
        };

        return calculatePercentages;
    }()) || _class);
});
define('utilities/calculateRecommended',['exports', 'aurelia-framework', '../services/user', '../services/constants', '../services/expensesConstants'], function (exports, _aureliaFramework, _user, _constants, _expensesConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.calculateRecommended = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var calculateRecommended = exports.calculateRecommended = (_dec = (0, _aureliaFramework.inject)(_user.User, _constants.Constants, _expensesConstants.ExpensesConstants), _dec(_class = function () {
        function calculateRecommended(user, constants, expensesConstants) {
            _classCallCheck(this, calculateRecommended);

            this.user = user;
            this.constants = constants;
            this.expensesConstants = expensesConstants;
        }

        calculateRecommended.prototype.getRecommendedTotals = function getRecommendedTotals() {
            var home = this.user.expenses.totalHomeExpense;
            var car = this.user.expenses.totalCarExpense;
            var health = this.user.expenses.totalHealthExpense;
            var discretionary = this.user.expenses.totalDiscretionaryExpense;
            var total = home + car + health + discretionary;
            this.user.expenses.totalExpense = total;

            this.expensesConstants.getExpenseConstants();
            this.getOriginalExpenses();

            var chartGoals = this.user.results.chartGoals;

            var goalsTotal = 0;
            if (chartGoals[0].length <= 0) goalsTotal = 0;else goalsTotal = chartGoals[0][chartGoals[0].length - 1].data;

            var savingsTotal = this.user.results.fiveYearSavings[4];
            var incomeTotal = this.user.results.fiveYearIncome[4];
            var expenseTotal = this.user.results.fiveYearExpenses[4];
            var adjustedSavingsTotal = savingsTotal - (incomeTotal - expenseTotal);
            var adjustingHandler = true;
            var count = 0;

            this.user.recommend.expensesChange = 0;
            this.user.recommend.adjustedSavingsTotal = adjustedSavingsTotal;

            for (var i = 0; i < this.constants.HomeExpenses.length; i++) {
                var expenseName = this.constants.HomeExpenses[i].value;
                this.user.recommend.homeChanges[expenseName] = 0;
            }

            for (var i = 0; i < this.constants.CarExpenses.length; i++) {
                var expenseName = this.constants.CarExpenses[i].value;
                this.user.recommend.carChanges[expenseName] = 0;
            }

            for (var i = 0; i < this.constants.HealthExpenses.length; i++) {
                var expenseName = this.constants.HealthExpenses[i].value;
                this.user.recommend.healthChanges[expenseName] = 0;
            }

            for (var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                var expenseName = this.constants.DiscretionaryExpenses[i].value;
                this.user.recommend.discretionaryChanges[expenseName] = 0;
            }

            while (adjustingHandler) {
                this.user.recommend.totalHomeExpense = 0;
                this.user.recommend.totalCarExpense = 0;
                this.user.recommend.totalHealthExpense = 0;
                this.user.recommend.totalDiscretionaryExpense = 0;
                this.user.recommend.totalExpense = 0;

                for (var i = 0; i < this.constants.HomeExpenses.length; i++) {
                    var expenseName = this.constants.HomeExpenses[i].value;
                    var adjusted = 0;

                    if (!this.user.recommend[expenseName + 'lock']) ;else {
                        if (expenseName == 'phone') {
                            adjusted = this.user.recommend[expenseName] * .90;
                        } else if (expenseName == 'internet') {
                            adjusted = this.user.recommend[expenseName] * .90;
                        } else if (expenseName == 'cable') {
                            if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.CableMax) {
                                adjusted = this.user.expenses.homeExpenseConstants.CableMax;
                            } else if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.CableExpanded) {
                                adjusted = this.user.expenses.homeExpenseConstants.CableExpanded;
                            } else if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.CableBasic) {
                                adjusted = this.user.expenses.homeExpenseConstants.CableBasic;
                            } else adjusted = 0;
                        } else if (expenseName == 'streaming') {
                            if (this.user.recommend['cable'] == 0 && this.user.recommend.homeChanges['cable'] < 0) adjusted = this.user.expenses.homeExpenseConstants.Streaming;else adjusted = this.user.recommend[expenseName];
                        } else if (expenseName == 'groceries') {
                            if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.GroceryLiberal) {
                                adjusted = this.user.expenses.homeExpenseConstants.GroceryLiberal;
                            } else if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.GroceryModerate) {
                                adjusted = this.user.expenses.homeExpenseConstants.GroceryModerate;
                            } else if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.GroceryLow) {
                                adjusted = this.user.expenses.homeExpenseConstants.GroceryLow;
                            } else if (this.user.recommend[expenseName] >= this.user.expenses.homeExpenseConstants.GroceryThrifty) {
                                adjusted = this.user.expenses.homeExpenseConstants.GroceryThrifty;
                            } else adjusted = this.user.recommend[expenseName];
                        } else if (expenseName == 'utilities') {
                            var decrease = 0;
                            if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.Utilities) {
                                decrease = (this.user.expenses[expenseName] - this.user.expenses.homeExpenseConstants.Utilities) / 5;
                                if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                            }
                            if (this.user.recommend[expenseName] <= this.user.expenses.homeExpenseConstants.Utilities) {
                                if (this.user.recommend.homeChanges[expenseName] != 0) adjusted = this.user.expenses.homeExpenseConstants.Utilities;else adjusted = this.user.recommend[expenseName];
                            }
                        } else if (expenseName == 'homeMaintenance') {
                            var decrease = 0;
                            if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.Maintenance) {
                                decrease = (this.user.expenses[expenseName] - this.user.expenses.homeExpenseConstants.Maintenance) / 5;
                                if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                            }
                            if (this.user.recommend[expenseName] <= this.user.expenses.homeExpenseConstants.Maintenance) {
                                adjusted = this.user.expenses.homeExpenseConstants.Maintenance;
                            }
                        } else if (expenseName == 'clothes') {
                            var decrease = 0;
                            if (this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.Clothes) {
                                decrease = (this.user.expenses[expenseName] - this.user.expenses.homeExpenseConstants.Clothes) / 5;
                                if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                            }
                            if (this.user.recommend[expenseName] <= this.user.expenses.homeExpenseConstants.Clothes) {
                                if (this.user.recommend.homeChanges[expenseName] != 0) adjusted = this.user.expenses.homeExpenseConstants.Clothes;else adjusted = this.user.recommend[expenseName];
                            }
                        }

                        this.user.recommend.homeChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                        this.user.recommend[expenseName] = adjusted;
                    }

                    if (expenseName == 'propertyTax') this.user.recommend.totalHomeExpense += this.user.recommend[expenseName];else this.user.recommend.totalHomeExpense += this.user.recommend[expenseName] * 12;
                }

                for (var i = 0; i < this.constants.CarExpenses.length; i++) {
                    var expenseName = this.constants.CarExpenses[i].value;
                    var adjusted = 0;

                    if (!this.user.recommend[expenseName + 'lock']) ;else {
                        if (expenseName == 'gas') {
                            if (this.user.recommend[expenseName] > this.user.expenses.carExpenseConstants.GasMax) {
                                adjusted = this.user.expenses.carExpenseConstants.GasMax;
                            } else if (this.user.recommend[expenseName] <= this.user.expenses.carExpenseConstants.GasMin) {
                                if (this.user.recommend.carChanges[expenseName] < 0) adjusted = this.user.expenses.carExpenseConstants.GasMin;else adjusted = this.user.recommend[expenseName];
                            } else {
                                var decrease = (this.user.expenses[expenseName] - this.user.expenses.carExpenseConstants.GasMin) / 5;
                                if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;

                                if (adjusted <= this.user.expenses.carExpenseConstants.GasMin || count == 4) {
                                    adjusted = this.user.expenses.carExpenseConstants.GasMin;
                                }
                            }
                        } else if (expenseName == 'publicTransport') {
                            var temp = 0;
                            if (this.user.recommend.carChanges["gas"] != 0) {
                                var gasPerc = (this.user.recommend["gas"] - this.user.expenses.carExpenseConstants.GasMin) / (this.user.expenses.carExpenseConstants.GasMax - this.user.expenses.carExpenseConstants.GasMin);
                                temp = this.user.expenses.carExpenseConstants.PublicTransport - this.user.expenses.carExpenseConstants.PublicTransport * gasPerc;

                                if (this.user.recommend.carChanges["gas"] < temp) adjusted = temp;else adjusted = this.user.recommend[expenseName];
                            } else adjusted = this.user.recommend[expenseName];
                        } else if (expenseName == 'carMaintenance') {
                            var decrease = 0;
                            if (this.user.recommend['carInsurance'] == 0) this.user.recommend[expenseName] = 0;else {
                                if (this.user.recommend[expenseName] > this.user.expenses.carExpenseConstants.Maintenance) {
                                    decrease = (this.user.expenses[expenseName] - this.user.expenses.carExpenseConstants.Maintenance) / 5;
                                    if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                                }
                                if (this.user.recommend[expenseName] <= this.user.expenses.carExpenseConstants.Maintenance) {
                                    adjusted = this.user.expenses.carExpenseConstants.Maintenance;
                                }
                            }
                        }

                        this.user.recommend.carChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                        this.user.recommend[expenseName] = adjusted;
                    }

                    this.user.recommend.totalCarExpense += this.user.recommend[expenseName] * 12;
                }

                for (var i = 0; i < this.constants.HealthExpenses.length; i++) {
                    var expenseName = this.constants.HealthExpenses[i].value;
                    var adjusted = 0;

                    if (!this.user.recommend[expenseName + 'lock']) ;else {
                        if (expenseName == 'medication') {
                            var decrease = (this.user.expenses.medication - this.user.expenses.healthExpenseConstants.MedicationMin) / 5;
                            if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                        } else if (expenseName == 'unexpectedMedicalProblems') {
                            if (this.user.recommend[expenseName] > this.user.expenses.healthExpenseConstants.Emergency) adjusted = this.user.recommend[expenseName] * .90;
                            if (this.user.recommend[expenseName] <= this.user.expenses.healthExpenseConstants.Emergency) adjusted = this.user.expenses.healthExpenseConstants.Emergency;
                        }

                        this.user.recommend.healthChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                        this.user.recommend[expenseName] = adjusted;
                    }

                    this.user.recommend.totalHealthExpense += this.user.recommend[expenseName] * 12;
                }

                for (var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                    var expenseName = this.constants.DiscretionaryExpenses[i].value;
                    var adjusted = 0;

                    if (!this.user.recommend[expenseName + 'lock']) ;else {
                        if (expenseName == 'eatingOut') {
                            var decrease = 0;
                            if (this.user.recommend[expenseName] > this.user.expenses.discretionaryExpenseConstants.Eating) {
                                decrease = (this.user.expenses[expenseName] - this.user.expenses.discretionaryExpenseConstants.Eating) / 5;
                                if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                            }
                            if (this.user.recommend[expenseName] <= this.user.expenses.discretionaryExpenseConstants.Eating) {
                                if (this.user.recommend.discretionaryChanges[expenseName] != 0) adjusted = this.user.expenses.discretionaryExpenseConstants.Eating;else adjusted = this.user.recommend[expenseName];
                            }
                        } else if (expenseName == 'bars') {
                            var decrease = 0;
                            if (this.user.recommend[expenseName] > this.user.expenses.discretionaryExpenseConstants.Club) {
                                decrease = (this.user.expenses[expenseName] - this.user.expenses.discretionaryExpenseConstants.Club) / 5;
                                if (decrease < 0) adjusted = this.user.recommend[expenseName];else adjusted = this.user.recommend[expenseName] - decrease;
                            }
                            if (this.user.recommend[expenseName] <= this.user.expenses.discretionaryExpenseConstants.Club) {
                                if (this.user.recommend.discretionaryChanges[expenseName] != 0) adjusted = this.user.expenses.discretionaryExpenseConstants.Club;else adjusted = this.user.recommend[expenseName];
                            }
                        } else adjusted = this.user.recommend[expenseName] * .90;

                        this.user.recommend.discretionaryChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                        this.user.recommend[expenseName] = adjusted;
                    }

                    this.user.recommend.totalDiscretionaryExpense += this.user.recommend[expenseName] * 12;
                }

                this.user.recommend.totalExpense = this.user.recommend.totalHomeExpense + this.user.recommend.totalCarExpense + this.user.recommend.totalHealthExpense + this.user.recommend.totalDiscretionaryExpense;

                expenseTotal = this.user.recommend.totalExpense;

                var tempAdjusted = adjustedSavingsTotal + (incomeTotal - expenseTotal);
                count++;

                this.user.recommend.expensesChange = this.user.recommend.totalExpense - this.user.expenses.totalExpense;

                if (tempAdjusted >= goalsTotal) {
                    this.user.recommend.message = "With our recommendations, you meet your goals!";
                    this.user.recommend.messageStyle = "alert alert-success";
                    adjustingHandler = false;
                }
                if (count > 4) {
                    this.user.recommend.message = "You do not meet your goals with our recommendations. Consider a more reasonable approach.";
                    this.user.recommend.messageStyle = "alert alert-danger";
                    adjustingHandler = false;
                }
            }
        };

        calculateRecommended.prototype.getOriginalExpenses = function getOriginalExpenses() {
            for (var i = 0; i < this.constants.HomeExpenses.length; i++) {
                this.user.recommend[this.constants.HomeExpenses[i].value] = parseInt(this.user.expenses[this.constants.HomeExpenses[i].value]);
                this.user.recommend[this.constants.HomeExpenses[i].value + 'lock'] = this.user.expenses[this.constants.HomeExpenses[i].value + 'lock'];
                this.user.recommend[this.constants.HomeExpenses[i].value + 'check'] = this.user.expenses[this.constants.HomeExpenses[i].value + 'check'];
            }

            for (var i = 0; i < this.constants.CarExpenses.length; i++) {
                this.user.recommend[this.constants.CarExpenses[i].value] = parseInt(this.user.expenses[this.constants.CarExpenses[i].value]);
                this.user.recommend[this.constants.CarExpenses[i].value + 'lock'] = this.user.expenses[this.constants.CarExpenses[i].value + 'lock'];
                this.user.recommend[this.constants.CarExpenses[i].value + 'check'] = this.user.expenses[this.constants.CarExpenses[i].value + 'check'];
            }

            for (var i = 0; i < this.constants.HealthExpenses.length; i++) {
                this.user.recommend[this.constants.HealthExpenses[i].value] = parseInt(this.user.expenses[this.constants.HealthExpenses[i].value]);
                this.user.recommend[this.constants.HealthExpenses[i].value + 'lock'] = this.user.expenses[this.constants.HealthExpenses[i].value + 'lock'];
                this.user.recommend[this.constants.HealthExpenses[i].value + 'check'] = this.user.expenses[this.constants.HealthExpenses[i].value + 'check'];
            }

            for (var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                this.user.recommend[this.constants.DiscretionaryExpenses[i].value] = parseInt(this.user.expenses[this.constants.DiscretionaryExpenses[i].value]);
                this.user.recommend[this.constants.DiscretionaryExpenses[i].value + 'lock'] = this.user.expenses[this.constants.DiscretionaryExpenses[i].value + 'lock'];
                this.user.recommend[this.constants.DiscretionaryExpenses[i].value + 'check'] = this.user.expenses[this.constants.DiscretionaryExpenses[i].value + 'check'];
            }
        };

        return calculateRecommended;
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

        Chart.prototype.createFiveYearGoalsChart = function createFiveYearGoalsChart(containerID, results) {
            var chartGoals = results.chartGoals;
            var chartSpecificGoals = results.chartGoals[0];

            var chartGoalSeries = [{
                name: "Savings & Extra Income",
                data: results.fiveYearSavings,
                color: '#0066ff'
            }];

            for (var i = 0; i < chartSpecificGoals.length; i++) {
                var arr = [];

                for (var j = 0; j < chartGoals.length; j++) {
                    arr.push(chartGoals[0][i].data);
                }

                chartGoalSeries.push({
                    name: chartGoals[0][i].name,
                    data: arr,
                    color: chartGoals[0][i].color
                });
            }

            Highcharts.chart(containerID, {
                title: {
                    text: 'Goals'
                },
                yAxis: {
                    title: {
                        text: 'Amount'
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
                tooltip: {
                    valuePrefix: '$',
                    valueDecimals: 2
                },
                series: chartGoalSeries
            });
        };

        Chart.prototype.createFiveYearExpensesChart = function createFiveYearExpensesChart(containerID, results) {
            Highcharts.chart(containerID, {

                title: {
                    text: 'Projected Expenses'
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
                        pointStart: 2017,
                        valueDecimals: 2
                    }
                },

                tooltip: {
                    valuePrefix: '$',
                    valueDecimals: 2
                },

                series: [{
                    name: 'Home',
                    data: results.homeFiveYears
                }, {
                    name: 'Car',
                    data: results.carFiveYears
                }, {
                    name: 'Health',
                    data: results.healthFiveYears
                }, {
                    name: 'Discretionary',
                    data: results.discretionaryFiveYears
                }]

            });
        };

        Chart.prototype.createSimpleChart = function createSimpleChart(containerID, results) {
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
                    text: 'Total Expense: ' + results.fiveYearExpenses[0]
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                tooltip: {
                    valuePrefix: '$',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Delivered amount',
                    data: results.simpleChartResults
                }]
            });
        };

        Chart.prototype.createAdvancedChart = function createAdvancedChart(containerID, results) {
            var categories = ['Home', 'Car', 'Health', 'Discretionary'],
                data = [{
                y: this.user.expenses.totalHomeExpense,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: results.advancedHomeAmounts
                }
            }, {
                y: this.user.expenses.totalCarExpense,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: results.advancedCarAmounts
                }
            }, {
                y: this.user.expenses.totalHealthExpense,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: results.advancedHealthAmounts
                }
            }, {
                y: this.user.expenses.totalDiscretionaryExpense,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: results.advancedDiscretionaryAmounts
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
                        y: parseFloat(data[i].drilldown.data[j])
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
                    text: 'Total Expense: ' + results.fiveYearExpenses[0]
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
                    valuePrefix: '$',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Amount of Total Expense',
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
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + '$' + this.y : null;
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

        Chart.prototype.createRecommendedChart = function createRecommendedChart(containerID, results, recommend) {
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
                subtitle: {
                    text: 'Total Expense: ' + recommend.totalExpense
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
                tooltip: {
                    valuePrefix: '$',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Expense amount',
                    data: results.recommendedResults
                }]
            });
        };

        Chart.prototype.createAdvancedRecommendedChart = function createAdvancedRecommendedChart(containerID, results, recommend) {
            var categories = ['Home', 'Car', 'Health', 'Discretionary'],
                data = [{
                y: recommend.totalHomeExpense,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: recommend.advancedHomeAmounts
                }
            }, {
                y: recommend.totalCarExpense,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: recommend.advancedCarAmounts
                }
            }, {
                y: recommend.totalHealthExpense,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: recommend.advancedHealthAmounts
                }
            }, {
                y: recommend.totalDiscretionaryExpense,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: recommend.advancedDiscretionaryAmounts
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
                        y: parseFloat(data[i].drilldown.data[j])
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
                    text: 'Total Expense: ' + recommend.totalExpense
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
                    valuePrefix: '$',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Amount of Total Expense',
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
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + '$' + this.y : null;
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

    var ComposeCarExpenses = exports.ComposeCarExpenses = function () {
        function ComposeCarExpenses() {
            _classCallCheck(this, ComposeCarExpenses);

            this.click = true;
        }

        ComposeCarExpenses.prototype.clicked = function clicked() {
            this.click = !this.click;
        };

        return ComposeCarExpenses;
    }();
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

    var ComposeDiscretionaryExpenses = exports.ComposeDiscretionaryExpenses = function () {
        function ComposeDiscretionaryExpenses() {
            _classCallCheck(this, ComposeDiscretionaryExpenses);

            this.click = true;
        }

        ComposeDiscretionaryExpenses.prototype.clicked = function clicked() {
            this.click = !this.click;
        };

        return ComposeDiscretionaryExpenses;
    }();
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

    var ComposeHealthExpenses = exports.ComposeHealthExpenses = function () {
        function ComposeHealthExpenses() {
            _classCallCheck(this, ComposeHealthExpenses);

            this.click = true;
        }

        ComposeHealthExpenses.prototype.clicked = function clicked() {
            this.click = !this.click;
        };

        return ComposeHealthExpenses;
    }();
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

    var ComposeHomeExpenses = exports.ComposeHomeExpenses = function () {
        function ComposeHomeExpenses() {
            _classCallCheck(this, ComposeHomeExpenses);

            this.click = false;
        }

        ComposeHomeExpenses.prototype.clicked = function clicked() {
            this.click = !this.click;
        };

        return ComposeHomeExpenses;
    }();
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
define('results/compose/compose-recommendations',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeRecommendations = exports.ComposeRecommendations = function ComposeRecommendations() {
        _classCallCheck(this, ComposeRecommendations);
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

                this.isTotalExpenseZero = false;

                this.totalExpense = 0;
                this.totalHomeExpense = 0;
                this.totalCarExpense = 0;
                this.totalHealthExpense = 0;
                this.totalDiscretionaryExpense = 0;

                this.homeCanGoToNext = true;
                this.carCanGoToNext = true;
                this.healthCanGoToNext = true;
                this.discretionaryCanGoToNext = true;

                this.homeExpenseConstants = {};
                this.carExpenseConstants = {};
                this.healthExpenseConstants = {};
                this.discretionaryExpenseConstants = {};

                this.mortgage = 0;
                this.propertyTax = 0;
                this.homeownerInsurance = 0;
                this.phone = 0;
                this.internet = 0;
                this.cable = 0;
                this.streaming = 0;
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
                this.streamingcheck = true;
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
                this.streaminglock = true;
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
                this.visualInsurance = 0;
                this.eyeCare = 0;
                this.dentalInsurance = 0;
                this.cavities = 0;
                this.braces = 0;

                this.healthInsurancecheck = true;
                this.medicationcheck = true;
                this.unexpectedMedicalProblemscheck = true;
                this.visualInsurancecheck = true;
                this.eyeCarecheck = true;
                this.dentalInsurancecheck = true;
                this.cavitiescheck = true;
                this.bracescheck = true;

                this.healthInsurancelock = true;
                this.medicationlock = true;
                this.unexpectedMedicalProblemslock = true;
                this.visualInsurancelock = true;
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

                this.showNavbar = false;

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
define('services/data/recommendedData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var RecommendedData = exports.RecommendedData = function RecommendedData() {
                _classCallCheck(this, RecommendedData);

                this.totalExpense = 0;
                this.totalHomeExpense = 0;
                this.totalCarExpense = 0;
                this.totalHealthExpense = 0;
                this.totalDiscretionaryExpense = 0;
                this.advancedAmounts = [];
                this.adjustedSavingsTotal = 0;

                this.message = "";
                this.messageStyle = "";
                this.savingsChange = 0;
                this.expensesChange = 0;

                this.mortgage = 0;
                this.propertyTax = 0;
                this.homeownerInsurance = 0;
                this.phone = 0;
                this.internet = 0;
                this.cable = 0;
                this.streaming = 0;
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
                this.streamingcheck = true;
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
                this.streaminglock = true;
                this.grocerieslock = true;
                this.utilitieslock = true;
                this.homeMaintenancelock = true;
                this.clotheslock = true;

                this.homeChanges = {
                        "mortgage": 0,
                        "propertyTax": 0,
                        "homeownerInsurance": 0,
                        "phone": 0,
                        "internet": 0,
                        "cable": 0,
                        "streaming": 0,
                        "groceries": 0,
                        "utilities": 0,
                        "homeMaintenance": 0,
                        "clothes": 0
                };

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

                this.carChanges = {
                        "carPayment": 0,
                        "carInsurance": 0,
                        "publicTransport": 0,
                        "gas": 0,
                        "carMaintenance": 0
                };

                this.healthInsurance = 0;
                this.medication = 0;
                this.unexpectedMedicalProblems = 0;
                this.visualInsurance = 0;
                this.eyeCare = 0;
                this.dentalInsurance = 0;
                this.cavities = 0;
                this.braces = 0;

                this.healthInsurancecheck = true;
                this.medicationcheck = true;
                this.unexpectedMedicalProblemscheck = true;
                this.visualInsurancecheck = true;
                this.eyeCarecheck = true;
                this.dentalInsurancecheck = true;
                this.cavitiescheck = true;
                this.bracescheck = true;

                this.healthInsurancelock = true;
                this.medicationlock = true;
                this.unexpectedMedicalProblemslock = true;
                this.visualInsurancelock = true;
                this.eyeCarelock = true;
                this.dentalInsurancelock = true;
                this.cavitieslock = true;
                this.braceslock = true;

                this.healthChanges = {
                        "healthInsurance": 0,
                        "medication": 0,
                        "unexpectedMedicalProblems": 0,
                        "visualInsurance": 0,
                        "eyeCare": 0,
                        "dentalInsurance": 0,
                        "cavities": 0,
                        "braces": 0
                };

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

                this.discretionaryChanges = {
                        "eatingOut": 0,
                        "bars": 0,
                        "funMoney": 0,
                        "other": 0
                };

                this.homePercentage = 0;
                this.mortgagePercentage = 0;
                this.propertyTaxPercentage = 0;
                this.phonePercentage = 0;
                this.internetPercentage = 0;
                this.cablePercentage = 0;
                this.streamingPercentage = 0;
                this.groceriesPercentage = 0;
                this.utilitiesPercentage = 0;
                this.homeMaintenancePercentage = 0;
                this.clothesPercentage = 0;
                this.homePercentageArray = [];
                this.advancedHomeAmounts = [];

                this.carPercentage = 0;
                this.carPaymentPercentage = 0;
                this.carInsurancePercentage = 0;
                this.publicTransportPercentage = 0;
                this.gasPercentage = 0;
                this.carMaintenancePercentage = 0;
                this.carPercentageArray = [];
                this.advancedCarAmounts = [];

                this.healthPercentage = 0;
                this.healthInsurancePercentage = 0;
                this.medicationPercentage = 0;
                this.unexpectedMedicalProblemsPercentage = 0;
                this.visualInsurancePercentage = 0;
                this.eyeCarePercentage = 0;
                this.dentalInsurancePercentage = 0;
                this.cavitiesPercentage = 0;
                this.bracesPercentage = 0;
                this.healthPercentageArray = [];
                this.advancedHealthAmounts = [];

                this.discretionaryPercentage = 0;
                this.eatingOutPercentage = 0;
                this.barsPercentage = 0;
                this.funMoneyPercentage = 0;
                this.otherPercentage = 0;
                this.discretionaryPercentageArray = [];
                this.advancedDiscretionaryAmounts = [];
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

                this.simpleChartResults = [];
                this.recommendedResults = [];
                this.showGoals = false;

                this.showBudget = true;
                this.showAdvanced = false;
                this.showGoalsChart = false;
                this.showExpenses = false;
                this.showAdvancedRecommended = false;

                this.fiveYearExpenses = [];
                this.fiveYearIncome = [];
                this.fiveYearSavings = [];
                this.fiveYearEarnings = [];

                this.fiveYearPrivateSchoolGoal = [];
                this.fiveYearCollegeGoal = [];
                this.fiveYearWeddingGoal = [];
                this.fiveYearVacationGoal = [];
                this.fiveYearBoatGoal = [];
                this.fiveYearNewCarGoal = [];
                this.fiveYearOtherGoal = [];

                this.PrivateSchoolMetGoal = false;
                this.CollegeMetGoal = false;
                this.WeddingMetGoal = false;
                this.VacationMetGoal = false;
                this.BoatMetGoal = false;
                this.NewCarMetGoal = false;
                this.OtherMetGoal = false;

                this.chartGoals = [];

                this.homePercentage = 0;
                this.mortgagePercentage = 0;
                this.propertyTaxPercentage = 0;
                this.phonePercentage = 0;
                this.internetPercentage = 0;
                this.cablePercentage = 0;
                this.streamingPercentage = 0;
                this.groceriesPercentage = 0;
                this.utilitiesPercentage = 0;
                this.homeMaintenancePercentage = 0;
                this.clothesPercentage = 0;
                this.homePercentageArray = [];
                this.homeFiveYears = [];
                this.advancedHomeAmounts = [];

                this.carPercentage = 0;
                this.carPaymentPercentage = 0;
                this.carInsurancePercentage = 0;
                this.publicTransportPercentage = 0;
                this.gasPercentage = 0;
                this.carMaintenancePercentage = 0;
                this.carPercentageArray = [];
                this.carFiveYears = [];
                this.advancedCarAmounts = [];

                this.healthPercentage = 0;
                this.healthInsurancePercentage = 0;
                this.medicationPercentage = 0;
                this.unexpectedMedicalProblemsPercentage = 0;
                this.visualInsurancePercentage = 0;
                this.eyeCarePercentage = 0;
                this.dentalInsurancePercentage = 0;
                this.cavitiesPercentage = 0;
                this.bracesPercentage = 0;
                this.healthPercentageArray = [];
                this.healthFiveYears = [];
                this.advancedHealthAmounts = [];

                this.discretionaryPercentage = 0;
                this.eatingOutPercentage = 0;
                this.barsPercentage = 0;
                this.funMoneyPercentage = 0;
                this.otherPercentage = 0;
                this.discretionaryPercentageArray = [];
                this.discretionaryFiveYears = [];
                this.advancedDiscretionaryAmounts = [];
        };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"highcharts/css/highcharts.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/style.css\"></require><require from=\"css/navbar.css\"></require><link href=\"https://fonts.googleapis.com/css?family=Maven+Pro\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0\"><nav class=\"navbar navbar-default\" id=\"navbarHeader\" show.bind=\"user.personalInfo.showNavbar\" style=\"border:none;background:#fff;width:60%\"><div class=\"container-fluid\" style=\"margin:0 auto;display:table\"><ul class=\"navbar-nav\" style=\"width:100%\"><li repeat.for=\"row of router.navigation\" style=\"margin:0 auto;display:inline\" class=\"${row.isActive ? 'active' : ''}\"><a id=\"navtitles\" href.bind=\"row.href\" style=\"margin:0 auto;text-align:center;padding:3vmin;padding-bottom:2vmin;padding-top:2vmin;font-size:1.3em\">${row.settings}</a></li></ul></div><hr style=\"border-color:#337ab7;width:100%\"></nav><div id=\"app\"><div id=\"content\" style=\"padding:0\"><router-view></router-view></div></div></template>"; });
define('text!about/about.css', ['module'], function(module) { module.exports = ""; });
define('text!about/about.html', ['module'], function(module) { module.exports = "<template><require from=\"css/style.css\"></require><br><br><br><nav id=\"personalinfo\" style=\"text-align:justify\"><div><h1 style=\"color:#337ab7\">MoneyManage<h1 style=\"color:#337ab7\"><h2 style=\"color:#337ab7\">The MoneyManage Budget Planner helps you manage your income in an intuitive and fun way. Effortlessly stay on top of finances and see your plan’s progress with SmartGraphsTM. Find opportunities to save with SpendAlerts and see how much you’re spending compared to the rest of the country. With our goal based approach, we help you create a plan with a vision for the future in mind. Relax and watch your savings grow with MoneyManage</h2></h1></h1></div></nav></template>"; });
define('text!css/drag-and-drop.css', ['module'], function(module) { module.exports = ".goalOverflow {\r\n    overflow-y:scroll;\r\n}\r\n\r\n#myGoals {\r\n    width: 100%; \r\n    height: 30%; \r\n    background-color: #f5f5f5;\r\n    text-align: center; \r\n    color: #337ab7;\r\n    vertical-align: middle; \r\n    line-height: 150px;\r\n}\r\npanel{\r\n    height: 10px !important;\r\n        box-shadow: 10px 10px grey;\r\n\r\n}\r\n"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><div id=\"personalinfo\"><form submit.delegate=\"next()\"><compose view-model=\"./compose/compose-personal-info\"></compose><br><br><compose view-model=\"./compose/compose-goals\"></compose><br><hr><button class=\"btn btn-secondary btn-lg\" style=\"float:left;width:10vmax;margin:1vw\" click.delegate=\"back()\"><span class=\"glyphicon glyphicon-arrow-left\"></span></button> <button class=\"btn btn-primary btn-lg\" style=\"float:right;width:10vmax;margin:1vw\" type=\"submit\" id=\"next\"><span class=\"glyphicon glyphicon-arrow-right\"></span></button></form></div></template>"; });
define('text!css/navbar.css', ['module'], function(module) { module.exports = "\r\nnav{\r\n  width: 100%;\r\n  margin: 1em auto;\r\n}\r\n\r\nul{\r\n  margin: 0px;\r\n  padding: 0px;\r\n  list-style: none;\r\n}\r\n\r\nul.dropdown{ \r\n  position: relative; \r\n  width: 100%; \r\n}\r\n\r\nul.dropdown li{ \r\n  font-weight: bold; \r\n  float: left; \r\n  width: 125px; \r\n  position: relative;\r\n  background: #f5f5f5;\r\n}\r\n\r\nul.dropdown a:hover{ \r\n  color: #000; \r\n}\r\n\r\nul.dropdown li a { \r\n  display: block; \r\n  padding: 20px 8px;\r\n  color: #34495e; \r\n  position: relative; \r\n  z-index: 2000; \r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-weight: 300;\r\n}\r\n\r\nul.dropdown li a:hover,\r\nul.dropdown li a.hover{ \r\n  background: #337ab7;\r\n  position: relative;\r\n  color: #fff;\r\n}\r\n\r\n\r\nul.dropdown ul{ \r\n display: none;\r\n position: absolute; \r\n  top: 0; \r\n  left: 0; \r\n  width: 1000px; \r\n  z-index: 1000;\r\n}\r\n\r\nul.dropdown ul li { \r\n  font-weight: normal; \r\n  background: #f5f5f5; \r\n  color: #000; \r\n  border-bottom: 1px solid #ccc; \r\n}\r\n\r\nul.dropdown ul li a{ \r\n  display: block; \r\n  color: #34495e !important;\r\n  background: #eee !important;\r\n} \r\n\r\nul.dropdown ul li a:hover{\r\n  display: block; \r\n  background: #3498db !important;\r\n  color: #fff !important;\r\n} \r\n\r\n.drop > a{\r\n  position: relative;\r\n}\r\n\r\n.drop > a:after{\r\n  content:\"\";\r\n  position: absolute;\r\n  right: 10px;\r\n  top: 40%;\r\n  border-left: 5px solid transparent;\r\n  border-top: 5px solid #333;\r\n  border-right: 5px solid transparent;\r\n  z-index: 999;\r\n}\r\n\r\n.drop > a:hover:after{\r\n  content:\"\";\r\n   border-left: 5px solid transparent;\r\n  border-top: 5px solid #fff;\r\n  border-right: 5px solid transparent;\r\n}\r\n\r\n.navbar-default {\r\n  height: 30px;\r\n  min-height:30px;\r\n  font-size: 15px;\r\n}\r\n\r\n.navbar-default .navbar-nav > li > a,\r\n.navbar-brand {\r\n  padding-top: 0;\r\n  padding-bottom: 0;\r\n  line-height: 30px;\r\n  color:#337ab7;\r\n}\r\n\r\n .navbar-default .navbar-nav > .active{\r\n    color: #fff;\r\n   /*background: #337ab7;*/\r\n }\r\n .navbar-default .navbar-nav > .active > a, \r\n .navbar-default .navbar-nav > .active > a:hover, \r\n .navbar-default .navbar-nav > .active > a:focus {\r\n      color: #fff;\r\n      background: #337ab7;\r\n      /*font-weight: bold;*/\r\n }\r\n\r\n .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\r\n    background-color: #337ab7;\r\n    color: #fff;\r\n}\r\na {\r\n    text-decoration: none !important;\r\n}\r\n\r\n.dropdown {\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n.dropdown .dropdown-menu {\r\n    position: absolute;\r\n    top: 100%;\r\n    display: none;\r\n    margin: 0;\r\n\r\n    /****************\r\n     ** NEW STYLES **\r\n     ****************/\r\n\r\n    list-style: none; /** Remove list bullets */\r\n    width: 100%; /** Set the width to 100% of it's parent */\r\n    padding: 0;\r\n}\r\n\r\n.dropdown:hover .dropdown-menu {\r\n    display: block;\r\n}\r\n\r\n/** Button Styles **/\r\n.dropdown button {\r\n    /*background: #FF6223;\r\n    color: #FFFFFF;*/\r\n    border: none;\r\n    margin: 0;\r\n    padding: 0.4em 0.8em;\r\n    font-size: 1em;\r\n}\r\n\r\n/** List Item Styles **/\r\n.dropdown a {\r\n    display: block;\r\n    padding: 0.2em 0.8em;\r\n    text-decoration: none;\r\n    /*background: #CCCCCC;\r\n    color: #333333;*/\r\n}\r\n\r\n/** List Item Hover Styles **/\r\n.dropdown a:hover {\r\n    /*background: #BBBBBB;*/\r\n}\r\n#navbarHeader{\r\n  width:100% !important;\r\n}\r\n\r\n@media screen and (min-width: 1200px) {\r\n#navbarHeader{\r\n  width:60% !important;\r\n\r\n}\r\n}"; });
define('text!expenses/expenses.html', ['module'], function(module) { module.exports = "<template><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"><br><br><div id=\"expenses\"><form submit.delegate=\"next()\"><div class=\"container\" style=\"width:60%;padding:0\"><div class=\"panel-group popout\" id=\"accordion\"><compose view-model=\"./compose/compose-home-expenses\"></compose><compose view-model=\"./compose/compose-car-expenses\"></compose><compose view-model=\"./compose/compose-health-expenses\"></compose><compose view-model=\"./compose/compose-discretionary-expenses\"></compose></div></div><div id=\"personalinfo\"><hr><button class=\"btn btn-secondary btn-lg\" style=\"float:left;width:10vmax;margin:1vw\" click.delegate=\"back()\"><span class=\"glyphicon glyphicon-arrow-left\"></span></button> <button class=\"btn btn-primary btn-lg\" style=\"float:right;width:10vmax;margin:1vw\" type=\"submit\" id=\"next\"><span class=\"glyphicon glyphicon-arrow-right\"></span></button></div></form></div><br><br><br></template>"; });
define('text!css/style.css', ['module'], function(module) { module.exports = "#personalinfo, #navbarHeader, #expenses, #results{\r\n    animation: fadein .5s;\r\n    -moz-animation: fadein .5s; /* Firefox */\r\n    -webkit-animation: fadein .5s; /* Safari and Chrome */\r\n    -o-animation: fadein .5s; /* Opera */\r\n}\r\n@keyframes fadein {\r\n    from {\r\n        opacity:0;\r\n    }\r\n    to {\r\n        opacity:1;\r\n    }\r\n}\r\n@-moz-keyframes fadein { /* Firefox */\r\n    from {\r\n        opacity:0;\r\n    }\r\n    to {\r\n        opacity:1;\r\n    }\r\n}\r\n@-webkit-keyframes fadein { /* Safari and Chrome */\r\n    from {\r\n        opacity:0;\r\n    }\r\n    to {\r\n        opacity:1;\r\n    }\r\n}\r\n@-o-keyframes fadein { /* Opera */\r\n    from {\r\n        opacity:0;\r\n    }\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n#personalinfo, #expenses, #results {\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    width: 60%;\r\n}\r\n\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n\tbackground-color: #fff;\r\n\t    font-family: 'Maven Pro', sans-serif;\r\n\r\n}\r\n.range-slider {\r\n    /*position: relative;*/\r\n    height: 10px;\r\n}\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n\r\n.btn-sample:active {\r\n  color: #337ab7; \r\n}\r\n\r\ni {\r\n\twidth:10px;\r\n}\r\n\r\n.expensesInput {\r\n\twidth: 90%;\r\n\t margin: 0 auto;\r\n}\r\n\r\n.glyphicon-question-sign {\r\n\tcolor: #fff;\r\n\tfont-size: 20px;\r\n}\r\n\r\n.box-shadow--6dp {\r\nbox-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 6px 9px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.highcharts-series-group {\r\nbox-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 6px 9px rgba(0, 0, 0, 0.2);\r\n}\r\n.btn{\r\n\tborder-radius:0;\r\n}\r\n/*.panel, .panel-group .panel-heading+.panel-collapse>.panel-body{\r\n    border: 0;\r\n}*/\r\n.panel-title, .panel-heading{\r\n  background: #337ab7 !important;\r\n  color:white !important;\r\n  font-weight:bold !important;\r\n  /*margin:0 !important;*/\r\n  padding: 1.2vmin !important;\r\n\r\n  }\r\n\r\n.adding {\r\n\tcolor: #3c763d;\r\n}\r\n\r\n.decreasing {\r\n\tcolor: #a94442;\r\n}\r\n.container{\r\n\twidth:100vw !important;\r\n}\r\n@media screen and (min-width: 700px) {\r\n  .container {\r\nwidth:85vw !important;  }\r\n}\r\n@media screen and (min-width: 1200px) {\r\n  .container {\r\nwidth:60vw !important;  }\r\n}\r\n\r\n#personalinfo{\r\n\twidth:100vw !important;\r\n}\r\n@media screen and (min-width: 700px) {\r\n#personalinfo {\r\nwidth:85vw !important;  }\r\n}\r\n@media screen and (min-width: 1200px) {\r\n#personalinfo {\r\nwidth:60vw !important;  }\r\n}\r\n\r\n#results{\r\n\twidth:100vw !important;\r\n}\r\n@media screen and (min-width: 700px) {\r\n#results {\r\nwidth:85vw !important;  }\r\n}\r\n@media screen and (min-width: 1200px) {\r\n#results {\r\nwidth:60vw !important;  }\r\n}\r\n.glyphicon.glyphicon-question-sign {\r\n    font-size: 70%;\r\n\t}\r\n\r\n.loading-bro {\r\n  margin: 50px auto;\r\n  width: 150px;\r\n}\r\n.loading-bro > h1 {\r\n  text-align: center;\r\n  font-size: 2.5em;\r\n  margin-bottom: 1em;\r\n  font-weight: 300;\r\n  color: #337ab7;\r\n}\r\n\r\n#load {\r\n  width: 150px;\r\n  animation: loading 3s linear infinite;\r\n}\r\n#load #loading-inner {\r\n  stroke-dashoffset: 0;\r\n  stroke-dasharray: 300;\r\n  stroke-width: 10;\r\n  stroke-miterlimit: 10;\r\n  stroke-linecap: round;\r\n  animation: loading-circle 2s linear infinite;\r\n  stroke: #337ab7;\r\n  fill: transparent;\r\n}\r\n\r\n@keyframes loading {\r\n  0% {\r\n    transform: rotate(0);\r\n  }\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n@keyframes loading-circle {\r\n  0% {\r\n    stroke-dashoffset: 0;\r\n  }\r\n  100% {\r\n    stroke-dashoffset: -600;\r\n  }\r\n}\r\n"; });
define('text!home/home.css', ['module'], function(module) { module.exports = "*{\r\n  \r\nmargin:0 auto;\r\n}\r\n\r\n#title{\r\n    margin:0 auto;\r\n    padding: 5%;\r\n    padding-bottom: 1vh;\r\n  font-size: 36px; /* Some tweener fallback that doesn't look awful */ \r\n  font-size: 11vw;    \r\n  font-weight: bold;\r\n    color: #fff;\r\n    /*font-family: 'Maven Pro', sans-serif;*/\r\n\r\n}\r\n\r\n@media screen and (min-width: 700px) {\r\n  #title {\r\n   font-size: 7vmin;\r\n  }\r\n}\r\n#subtitle{\r\n      font-style: italic;\r\n      color: #fff;\r\n  font-size: 4.5vmin;\r\n      padding-bottom: 0;\r\n\r\n}\r\n\r\n@media screen and (min-width: 700px) {\r\n  #subtitle {\r\n  font-size: 3vmin;\r\n  }\r\n}\r\n#start{\r\n  font-size: 3vmin !important;\r\n\r\n    /*width: 10%;*/\r\n    /*height: 150px;*/\r\n    color: #fff;\r\n        /*padding:0 !important;*/\r\n\r\n    padding-left: 8vmin !important;\r\n    padding-right: 8vmin !important;\r\n\r\n}\r\n.btn-start{\r\n    background-color: #337ab7;\r\n    color:#fff;\r\n        font-weight: bold;\r\n\r\n    font-size: 4vh;\r\n\r\n}\r\n\r\n.btn-start:hover{\r\n  -moz-transition: all 0.15s ease-in-out;\r\n  -o-transition: all 0.15s ease-in-out;\r\n  -webkit-transition: all 0.15s ease-in-out;\r\n  transition: all 0.15s ease-in-out;\r\n    background-color: #fff;\r\n    color: #afca5d !important;\r\n        font-weight: bold;\r\n\r\n    font-size: 4vh;\r\n}\r\n\r\n\r\nbody{\r\n    /*background: linear-gradient(to bottom right, #1567b9, #baecc7);*/\r\n}\r\n.bg {\r\nheight:100vh;\r\nmargin: 0;\r\n    background: linear-gradient(to bottom right, #1567b9, #baecc7);\r\n  text-align: center;\r\n  padding: 0;\r\n}\r\n\r\n.zigzag {\r\n  stroke-dasharray: 480;\r\n  stroke-dashoffset: 480;\r\n  -webkit-animation: zigzag 4s linear forwards infinite;\r\n          animation: zigzag 4s linear forwards infinite;\r\n}\r\n\r\n@-webkit-keyframes zigzag {\r\n  from {\r\n    stroke-dashoffset: 980;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n@keyframes zigzag {\r\n  from {\r\n    stroke-dashoffset: 980;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n.dash {\r\n  stroke-dasharray: 280;\r\n  stroke-dashoffset: 280;\r\n  -webkit-animation: month 4s linear backwards infinite;\r\n          animation: month 4s linear backwards infinite;\r\n}\r\n.dash:nth-child(1) {\r\n  -webkit-animation-delay: 0s;\r\n          animation-delay: 0s;\r\n}\r\n.dash:nth-child(2) {\r\n  -webkit-animation-delay: 0.05s;\r\n          animation-delay: 0.05s;\r\n}\r\n.dash:nth-child(3) {\r\n  -webkit-animation-delay: 0.10s;\r\n          animation-delay: 0.10s;\r\n}\r\n.dash:nth-child(4) {\r\n  -webkit-animation-delay: 0.15s;\r\n          animation-delay: 0.15s;\r\n}\r\n.dash:nth-child(5) {\r\n  -webkit-animation-delay: 0.20s;\r\n          animation-delay: 0.20s;\r\n}\r\n.dash:nth-child(6) {\r\n  -webkit-animation-delay: 0.25s;\r\n          animation-delay: 0.25s;\r\n}\r\n.dash:nth-child(7) {\r\n  -webkit-animation-delay: 0.30s;\r\n          animation-delay: 0.30s;\r\n}\r\n.dash:nth-child(8) {\r\n  -webkit-animation-delay: 0.35s;\r\n          animation-delay: 0.35s;\r\n}\r\n.dash:nth-child(9) {\r\n  -webkit-animation-delay: 0.40s;\r\n          animation-delay: 0.40s;\r\n}\r\n.dash:nth-child(10) {\r\n  -webkit-animation-delay: 0.45s;\r\n          animation-delay: 0.45s;\r\n}\r\n\r\n@-webkit-keyframes month {\r\n  from {\r\n    stroke-dashoffset: 380;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n@keyframes month {\r\n  from {\r\n    stroke-dashoffset: 380;\r\n  }\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\nsvg{\r\n width: 90%;\r\n /*background-image: url(image-with-4-3-aspect-ratio.svg);*/\r\n /*background-size: cover;*/\r\n height: 50vmin;\r\n padding: 0; /* reset */\r\n /*padding-bottom: calc(100% * 3 / 4);*/\r\n }\r\n\r\n@media screen and (min-width: 700px) {\r\n  svg {\r\n     height: 40vmin;\r\n  }\r\n}\r\n\r\n"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template style=\"background-color:#337ab7\"><require from=\"home/home.css\"></require><div class=\"bg\"><div style=\"position:relative;top:50%;transform:translateY(-60%)\"><div style=\"border:#fff\"><h1 id=\"title\">MoneyManage</h1><svg version=\"1.1\" baseProfile=\"tiny\" id=\"chart\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"366.037px\" height=\"261.026px\" viewBox=\"0 0 366.037 261.026\" xml:space=\"preserve\"><path fill=\"#FFFFFF\" d=\"M297.813,187.789c-0.414,0-0.75-0.336-0.75-0.75V41.398c0-0.689-0.561-1.25-1.25-1.25H61.049\r\n\tc-0.689,0-1.25,0.561-1.25,1.25v145.641c0,0.414-0.336,0.75-0.75,0.75s-0.75-0.336-0.75-0.75V41.398c0-1.517,1.234-2.75,2.75-2.75\r\n\th234.764c1.516,0,2.75,1.233,2.75,2.75v145.641C298.563,187.453,298.227,187.789,297.813,187.789z M327.25,187.977\r\n\tc0-0.414-0.336-0.75-0.75-0.75H30.363c-0.414,0-0.75,0.336-0.75,0.75c0,10.002,8.137,18.139,18.138,18.139h261.367\r\n\tC319.116,206.115,327.25,197.979,327.25,187.977z M325.733,188.727c-0.394,8.828-7.696,15.889-16.615,15.889H47.75\r\n\tc-8.923,0-16.228-7.061-16.621-15.889H325.733z\"/><g><line class=\"dash\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"84.662\" y1=\"168.215\" x2=\"84.662\" y2=\"140.473\"/><line class=\"dash\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"105.592\" y1=\"168.215\" x2=\"105.592\" y2=\"149.795\"/><line class=\"dash three\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"126.523\" y1=\"168.215\" x2=\"126.523\" y2=\"159.118\"/><line class=\"dash four\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"147.453\" y1=\"168.215\" x2=\"147.453\" y2=\"140.473\"/><line class=\"dash five\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"168.382\" y1=\"168.215\" x2=\"168.382\" y2=\"149.795\"/><line class=\"dash six\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"189.313\" y1=\"168.215\" x2=\"189.313\" y2=\"140.473\"/><line class=\"dash seven\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"210.244\" y1=\"168.215\" x2=\"210.244\" y2=\"135.812\"/><line class=\"dash eight\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"231.173\" y1=\"168.215\" x2=\"231.173\" y2=\"163.779\"/><line class=\"dash nine\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"252.104\" y1=\"168.215\" x2=\"252.104\" y2=\"154.457\"/><line class=\"dash ten\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" x1=\"272.201\" y1=\"168.215\" x2=\"272.201\" y2=\"163.779\"/></g><polyline fill=\"none\" points=\"84.295,72.647 104.795,97.147 147.795,75.147 189.295,110.647 231.795,102.147 270.795,122.147 \"/><polyline class=\"zigzag\" fill=\"none\" stroke=\"#AFCA5D\" stroke-width=\"5\" stroke-miterlimit=\"10\" points=\"84.295,72.647 104.795,97.147 \r\n\t147.795,75.147 189.295,110.647 231.795,102.147 270.795,122.147 \"/></svg><div style=\"text-align:center;margin:0 auto\"><button id=\"start\" type=\"button\" class=\"btn btn-start\" style=\"margin:0 auto\" click.delegate=\"start()\">START</button></div></div></div></div></template>"; });
define('text!login/login.css', ['module'], function(module) { module.exports = "\r\n\r\nform#login-form {\r\n  background: #fff;\r\n  width: 35em;\r\n  margin: 2em auto;\r\n  overflow: hidden;\r\n  position: relative;\r\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 6px 9px rgba(0, 0, 0, 0.2);\r\n\r\n  /*-moz-border-radius: 0.3em;\r\n  -webkit-border-radius: 0.3em;\r\n  border-radius: 0.3em;\r\n  -moz-box-shadow: 0 0 0.2em #000;\r\n  -webkit-box-shadow: 0 0 0.2em #000;\r\n  box-shadow: 0 0 0.2em #000;*/\r\n}\r\nform#login-form div.heading {\r\n  background: #337ab7;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-transform: uppercase;\r\n  font-weight: bold;\r\npadding: 1.2vmin; font-weight:bold;\r\n}\r\nform#login-form div.left {\r\n  width: 50%;\r\n  float: left;\r\n  padding: 1.7em 1.5em 2.5em 1.5em;\r\n  -moz-box-sizing: border-box;\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\nform#login-form div.right {\r\n  width: 50%;\r\n  float: right;\r\n  padding: 1.7em 1.5em 2.5em 1.5em;\r\n  -moz-box-sizing: border-box;\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\nform#login-form:before {\r\n  content: 'or';\r\n  color: gray;\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  margin: auto;\r\n  height: 0.5em;\r\n  width: 0.5em;\r\n  left: -1.5em;\r\n  top: 1.2em;\r\n  z-index: 900;\r\n}\r\nform#login-form:after {\r\n  content: '';\r\n  position: absolute;\r\n  background: rgba(128, 128, 128, 0.3);\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  margin: auto;\r\n  height: 7.25em;\r\n  width: 0.1em;\r\n  left: -0.85em;\r\n  top: -6.8em;\r\n  -moz-box-shadow: 0 8.8em 0 0 rgba(128, 128, 128, 0.3);\r\n  -webkit-box-shadow: 0 8.8em 0 0 rgba(128, 128, 128, 0.3);\r\n  box-shadow: 0 8.8em 0 0 rgba(128, 128, 128, 0.3);\r\n}\r\n\r\ndiv.left label {\r\n  display: inline-block;\r\n  color: gray;\r\n  font-size: 1.1em;\r\n  margin-top: 0.6em;\r\n}\r\ndiv.left input[type=\"email\"], div.left input[type=\"password\"] {\r\n  border: 0.1em solid #dfdfdf;\r\n  padding: 1em;\r\n  margin: 0.6em 0;\r\n  -moz-border-radius: 0.2em;\r\n  -webkit-border-radius: 0.2em;\r\n  border-radius: 0.2em;\r\n  -moz-box-shadow: 0 0 0.2em rgba(223, 223, 223, 0.2);\r\n  -webkit-box-shadow: 0 0 0.2em rgba(223, 223, 223, 0.2);\r\n  box-shadow: 0 0 0.2em rgba(223, 223, 223, 0.2);\r\n  -moz-transition: all 0.15s ease-in-out;\r\n  -o-transition: all 0.15s ease-in-out;\r\n  -webkit-transition: all 0.15s ease-in-out;\r\n  transition: all 0.15s ease-in-out;\r\n}\r\ndiv.left input[type=\"email\"]:focus, div.left input[type=\"password\"]:focus {\r\n  outline: none;\r\n  /*border: 0.1em solid #bdbdbd;*/\r\n}\r\ndiv.left input[type=\"submit\"] {\r\n  background: #337ab7;\r\n  color: #fff;\r\n  outline: none;\r\n  text-transform: uppercase;\r\n  padding: 1.2em;\r\n  overflow: hidden;\r\n  border: none;\r\n  letter-spacing: 0.1em;\r\n  margin: 0.5em 0;\r\n  font-weight: bold;\r\n  -moz-border-radius: 0.4em;\r\n  -webkit-border-radius: 0.4em;\r\n  border-radius: 0.4em;\r\n  -moz-transition: all 0.15s ease-in-out;\r\n  -o-transition: all 0.15s ease-in-out;\r\n  -webkit-transition: all 0.15s ease-in-out;\r\n  transition: all 0.15s ease-in-out;\r\n}\r\ndiv.left input[type=\"submit\"]:hover {\r\n  background: #fff;\r\n  color: #afca5d;\r\n}\r\n\r\ndiv.right div.connect {\r\n  color: gray;\r\n  font-size: 1.1em;\r\n  text-align: center;\r\n}\r\ndiv.right a {\r\n  display: inline-block;\r\n  font-size: 1.5em;\r\n  text-decoration: none;\r\n  color: white;\r\n  width: 9em;\r\n  padding: 0.55em 0.3em;\r\n  clear: both;\r\n  text-align: center;\r\n  margin: 0.5em 0.1em;\r\n  -moz-border-radius: 0.3em;\r\n  -webkit-border-radius: 0.3em;\r\n  border-radius: 0.3em;\r\n}\r\ndiv.right a.facebook {\r\n  background: #3a589a;\r\n  margin-top: 0.8em;\r\n  -moz-transition: all 0.15s ease-in-out;\r\n  -o-transition: all 0.15s ease-in-out;\r\n  -webkit-transition: all 0.15s ease-in-out;\r\n  transition: all 0.15s ease-in-out;\r\n}\r\ndiv.right a.facebook:hover {\r\n  background: rgba(58, 88, 154, 0.8);\r\n}\r\ndiv.right a.twitter {\r\n  background: #4099ff;\r\n  -moz-transition: all 0.15s ease-in-out;\r\n  -o-transition: all 0.15s ease-in-out;\r\n  -webkit-transition: all 0.15s ease-in-out;\r\n  transition: all 0.15s ease-in-out;\r\n}\r\ndiv.right a.twitter:hover {\r\n  background: rgba(64, 153, 255, 0.8);\r\n}\r\ndiv.right a.google-plus {\r\n  background: #e9544f;\r\n  -moz-transition: all 0.15s ease-in-out;\r\n  -o-transition: all 0.15s ease-in-out;\r\n  -webkit-transition: all 0.15s ease-in-out;\r\n  transition: all 0.15s ease-in-out;\r\n}\r\ndiv.right a.google-plus:hover {\r\n  background: rgba(233, 84, 79, 0.8);\r\n}\r\n"; });
define('text!login/login.html', ['module'], function(module) { module.exports = "<template><require from=\"login/login.css\"></require><require from=\"home/home.css\"></require><require from=\"css/style.css\"></require><br><br><form submit.delegate=\"login(emailInput, passwordInput)\" action=\"#\" id=\"login-form\"><div class=\"\" style=\"background-color:#337ab7;color:#fff\"><h3 style=\"margin:0;padding:1.2vmin;font-weight:700;text-align:center\">MoneyManage</h3></div><div class=\"left\"><label for=\"email\">Email</label><br><input value.bind=\"emailInput\" type=\"email\" name=\"email\" id=\"email\" placeholder=\"email@email.com\"><br><label for=\"password\">Password</label><br><input value.bind=\"passwordInput\" type=\"password\" name=\"password\" id=\"pass\" placeholder=\"password\"><br><input type=\"submit\" value=\"Login\"></div><div class=\"right\" style=\"font-size:.8em;text-align:center;border-radius:0\"><div class=\"connect\">Register With...</div><a href=\"\" class=\"facebook\" click.delegate=\"facebookLogin()\"><span class=\"fontawesome-facebook\">Facebook</span></a><br><a href=\"\" class=\"google-plus\"><span class=\"fontawesome-google-plus\" click.delegate=\"googleLogin()\">Google</span></a></div></form><form submit.delegate=\"newUser(newEmail, newPassword)\" id=\"login-form\"><div class=\"heading\">Create new user</div><div class=\"left\"><label for=\"email\">Email</label><br><input value.bind=\"newEmail\" type=\"email\" name=\"email\" id=\"email\" placeholder=\"email@email.com\"><br><label for=\"password\">Password</label><br><input value.bind=\"newPassword\" type=\"password\" name=\"password\" id=\"pass\" placeholder=\"password\"><br><input type=\"submit\" value=\"New User\"></div><div class=\"right\"><div class=\"connect\">Connect with</div><a href=\"\" class=\"facebook\"><span class=\"fontawesome-facebook\" click.delegate=\"facebookLogin()\">Facebook</span></a><br><a href=\"\" class=\"twitter\"><span class=\"fontawesome-twitter\" click.delegate=\"twitterLogin()\">Twitter</span></a><br><a href=\"\" class=\"google-plus\"><span class=\"fontawesome-google-plus\" click.delegate=\"googleLogin()\">Google</span></a></div></form></template>"; });
define('text!logout/logout.css', ['module'], function(module) { module.exports = "body {\r\n  background:#5bb12f;\r\n}\r\n#emojiAnimation {\r\n  display:none;\r\n}\r\n.emoji-container {\r\n  background: #fff;\r\n  width:64px;\r\n  height:64px;\r\n  padding:16px;\r\n  border-radius:50%;\r\n  position:absolute;\r\n  top:50%;\r\n  left:50%;\r\n  margin-top:-64px;\r\n  margin-left:-40px;\r\n  overflow:hidden;\r\n}\r\n.emoji-car {\r\n  position:relative;\r\n  top:-16px;\r\n  left:-4px;\r\n  width:72px;\r\n}\r\n#sliderWrapper {\r\n  position:absolute;\r\n  left: 10%;\r\n  bottom:0;\r\n  width:80%;\r\n}\r\n#emojiExplosion1,#emojiExplosion2,#emojiExplosion3 {\r\n  width:32px;\r\n  height:32px;\r\n  margin-top:-36px;\r\n  padding:8px;\r\n}\r\n#jailbars {\r\n    position: absolute;\r\n    top: -20px;\r\n    left: 3px;\r\n    width: 100%;\r\n}\r\n.jailbar {\r\n    width: 6px;\r\n    height: 120px;\r\n    background: #666;\r\n    float: left;\r\n    margin: 6px;\r\n}"; });
define('text!logout/logout.html', ['module'], function(module) { module.exports = "<template><h1>Logout</h1><div id=\"emojiAnimation\"><div id=\"emojiGun\" class=\"emoji-container\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><path fill=\"#719198\" d=\"m39.01 28.28c0 2.646-1.659 4.789-3.708 4.789h-22.406c-2.049 0-1.967-2.143-1.967-4.789 0-2.646-.083-4.792 1.967-4.792h22.406c2.049 0 3.708 2.145 3.708 4.792\"/><path fill=\"#6c888c\" d=\"m38.744 30.05c.168-.551.269-1.144.269-1.77 0-2.646-1.659-4.792-3.708-4.792h-22.406c-2.049 0-1.967 2.145-1.967 4.792 0 .625-.003 1.219.017 1.77h27.795\"/><g fill=\"#719198\"><path d=\"m37.36 33.486c.805 1.902-1.681 3.927-2.272 4.779-1.636 2.347.759 2.19.813 2.183 2.033-.305 4.478-2.631 4.693-7.963.126-3.055-3.846-3.357-5.875-3.051-.135.02-.267.053-.399.095 1.476.044 2.161 1.885 3.04 3.957\"/><path d=\"m48.17 20.335c1.556-.932.092-3.752-.105-4.69-.537-2.587 1.634-1.169 1.678-1.134 1.772 1.33 3.076 4.341 1.029 8.313-1.171 2.277-5.01.33-6.777-.999-.114-.09-.224-.185-.328-.287 1.395.771 2.807-.185 4.503-1.203\"/></g><path fill=\"#354a54\" d=\"m63.27 51.916c.117-.792.103-1.71-.031-2.488-.29-1.697-4.606-8.807-6.02-10.783-1.1-1.539-2.01-3.158-1.874-5.05-.153-.506-.293-1.022-.401-1.557-.213-1.042-.303-2.095-.315-3.149l1.573-2.324c.771-1.137.513-2.704-.567-3.502-.438-.322-.943-.428-1.443-.415-.658-1.494-1.992-2.587-3.605-3.047-3.998 3.814-7.468 7.983-8.9 12.732 2.187 3.177 2.552 6.03 1.898 10.09 1.449 2.359 4.627 7.917 4.771 9.516.434 4.838-.657 6.363 2.158 5.903.522-.082 9.496-1.82 9.496-1.82 4.808-.922 3.595-3.539 3.265-4.101\"/><path fill=\"#405866\" d=\"m57.22 38.645c-1.1-1.539-2.01-3.158-1.874-5.05-.153-.506-.293-1.022-.401-1.557-.074-.353-.112-.711-.159-1.069-8.08 7.304-6.938 21.1 4.243 25.24.598-.114.98-.188.98-.188 4.811-.922 3.597-3.539 3.268-4.101.117-.792.103-1.71-.031-2.488-.291-1.699-4.607-8.808-6.03-10.784\"/><g fill=\"#719198\"><path d=\"m35.391 21.998c0 3.02-2.445 5.464-5.463 5.464h-25.857c-3.02 0-3.724-2.447-3.724-5.464 0-3.02.708-5.466 3.724-5.466h25.856c3.02 0 5.464 2.448 5.464 5.466\"/><path d=\"m38.646 45.18h-6.51c-3.419 0-6.199-3.117-6.199-6.945 0-3.83 2.78-6.946 6.199-6.946h6.51c3.419 0 6.201 3.116 6.201 6.946 0 3.828-2.783 6.945-6.201 6.945m-6.511-12.149c-2.458 0-4.459 2.334-4.459 5.203s2 5.204 4.459 5.204h6.51c2.459 0 4.459-2.335 4.459-5.204s-2-5.203-4.459-5.203h-6.51\"/></g><path fill=\"#80a0a6\" d=\"m47.56 26.817c0 4.564-4.04 6.25-9.03 6.25h-6.274c-4.988 0-9.03-1.686-9.03-6.25v-6.04c0-4.563 4.04-5.977 9.03-5.977h6.274c4.99 0 9.03 1.414 9.03 5.977v6.04\"/><g fill=\"#465c61\"><path d=\"m41.734 19.965c0 .472-.522.852-1.174.852h-10.334c-.65 0-1.18-.38-1.18-.852v-.816c0-.472.529-.851 1.18-.851h10.334c.651 0 1.174.379 1.174.851v.816\"/><path d=\"m41.734 25.16c0 .468-.522.85-1.174.85h-10.334c-.65 0-1.18-.381-1.18-.85v-.817c0-.472.529-.852 1.18-.852h10.334c.651 0 1.174.379 1.174.852v.817\"/><path d=\"m41.894 29.619c0 .469-.523.849-1.174.849h-10.335c-.651 0-1.18-.379-1.18-.849v-.818c0-.472.529-.85 1.18-.85h10.335c.65 0 1.174.378 1.174.85v.818\"/></g></svg></div><div id=\"emojiRobber\" class=\"emoji-container\"><svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 64 64\" viewBox=\"0 0 64 64\"><g transform=\"matrix(.97676 0 0 .97676.85 1.446)\"><g fill-rule=\"evenodd\"><path d=\"m62.984 56.52c-.108-.244-.226-.487-.357-.727-.648-1.203-1.611-2.35-2.831-3.413-1.681-1.469-3.864-2.789-6.438-3.911 2.994-5.474 8.811-14.912 8.811-14.912l-25.17 5.133-.368 5.984c-1.549-.111-3.127-.171-4.735-.171-.003 0-.003 0-.003 0-1.612 0-3.191.06-4.738.171l-.365-5.984-25.18-5.133c0 0 5.82 9.438 8.812 14.912-2.571 1.122-4.757 2.442-6.439 3.911-1.219 1.063-2.179 2.21-2.831 3.413-.132.239-.249.482-.355.727-.421.98-.643 1.994-.643 3.03 0 .914.171 1.808.501 2.678h62.47c.33-.87.505-1.764.505-2.678 0-1.039-.221-2.053-.645-3.03\" fill=\"#2e3e44\"/><path d=\"m12.243 56.52c.105-.244.222-.487.354-.727.653-1.203 1.612-2.35 2.832-3.413 1.681-1.469 3.864-2.789 6.438-3.911-1.992-3.643-5.237-9.04-7.18-12.244l-13.08-2.668c0 0 5.82 9.438 8.812 14.912-2.571 1.122-4.757 2.442-6.439 3.911-1.219 1.063-2.179 2.21-2.831 3.413-.132.239-.249.482-.355.727-.421.98-.643 1.994-.643 3.03 0 .914.171 1.808.501 2.678h11.445c-.331-.87-.501-1.764-.501-2.678-.001-1.039.221-2.053.644-3.03\" fill=\"#25333a\"/></g><path d=\"m27.691 56.18c-.113.377-.509.589-.885.476-.377-.11-.592-.509-.478-.886l3.491-11.652c.117-.376.509-.59.888-.477.375.111.592.508.476.885l-3.492 11.654\" fill=\"#e6e7e8\"/><g fill-rule=\"evenodd\"><ellipse ry=\"15.05\" rx=\"15.848\" cy=\"30.504\" cx=\"31.891\" fill=\"#fbbf67\"/><g fill=\"#1a2428\"><path d=\"m28.713 35.995c-.303 1.204-2.15 1.774-4.121 1.275-1.972-.499-3.326-1.877-3.02-3.081.305-1.202 2.15-1.773 4.127-1.273 1.969.497 3.324 1.875 3.02 3.079\"/><path d=\"m35.08 35.995c.305 1.204 2.149 1.774 4.126 1.275 1.97-.499 3.324-1.877 3.02-3.081-.303-1.202-2.149-1.773-4.12-1.273-1.973.497-3.327 1.875-3.02 3.079\"/></g></g><path d=\"m10.794 25.77c-1.01-.774-1.288-2.722 0-3.433 4.241-2.341 8.983-2.895 13.472-4.29 1.301-7.26 3.804-12.838 4.605-15.04-1.528-.431-3.041-1.018-4.627-.965-1.059.035-2.111-.264-3.074.324-.881.54-1.553 1.819-2.031 2.693-1.235 2.217-2.023 4.722-2.746 7.141-.652 2.177-1.174 4.416-1.459 6.672-2.594.332-5.15.668-7.658 1.476-1.262.406-2.482.93-3.667 1.519-.926.46-2.365.998-2.982 1.845-.112.163-.08.47.078.594.796.631 2.097.404 3.01.881 1.146.602 2.447 1.05 3.627 1.631 2.707 1.332 5.375 2.744 8.104 4.02 5.169 2.412 10.676 4.145 16.442 3.681.314-.025.647-.004.979.023-2.345-.558-17.998-5.637-22.08-8.773\" fill=\"#25333a\"/><g><path d=\"m46.48 32.502c-.004-.007-.009-.015-.011-.021-.141-.043-.277-.156-.386-.255-.136-.132-.328-.338-.383-.412-.173-.238-.324-.499-.529-.703-.61-.6-1.398-.874-2.198-1.08-.773-.198-1.577-.183-2.37-.159-1.315.044-2.635.12-3.953.171-1.572.061-3.146.05-4.72.007-.009 0-.022 0-.029 0-.011 0-.021 0-.033 0v.001c-1.573.043-3.146.053-4.72-.007-1.316-.051-2.633-.126-3.954-.171-.792-.023-1.594-.039-2.367.159-.802.206-1.591.479-2.196 1.08-.209.204-.361.464-.532.703-.055.074-.245.28-.383.412-.109.099-.247.212-.386.255-.004.006-.006.014-.008.021 0 0-.618.226-.097 1.498h-.008c.031.058.058.117.085.176.061.132.121.256.206.359.295.342.435.751.588 1.165.301.813.672 1.598 1.247 2.259 1.059 1.215 2.395 1.949 3.983 2.244 1.196.218 2.361.151 3.506-.264 1.22-.441 2.177-1.208 2.897-2.286.54-.807.959-1.667 1.246-2.594.024-.076.058-.153.089-.229.145-.369.479-.58.835-.607.353.027.688.238.835.607.03.076.062.153.087.229.287.927.706 1.787 1.245 2.594.723 1.078 1.682 1.845 2.898 2.286 1.145.415 2.312.481 3.51.264 1.586-.295 2.924-1.029 3.979-2.244.575-.661.944-1.445 1.247-2.259.153-.414.291-.823.588-1.165.088-.104.146-.228.205-.359.029-.059.058-.118.087-.176h-.011c.529-1.273-.089-1.499-.089-1.499\" fill=\"#1a2528\"/><path d=\"m18.845 32.19c.136-.194.264-.402.431-.567.54-.532 1.239-.775 1.948-.958.686-.173 1.396-.163 2.099-.14 1.169.037 2.334.109 3.503.151 1.395.05 2.789.041 4.185.004l.431-.001c.013 0-.406.001-.392.001.006 0 .445 0 .452 0l-.104 3.371c-.007 0-.341.324-.348.324-.315.019-.621.214-.753.54-.025.071-.056.136-.076.203-.256.822-.627 1.587-1.105 2.3-.641.955-1.489 1.635-2.569 2.027-1.014.365-2.048.427-3.106.229-1.41-.256-2.594-.906-3.53-1.986-.509-.584-.837-1.278-1.105-2-.008-.02-.016-.039-.021-.058-.261-1.128-.282-2.338.06-3.438\" fill=\"#253235\" fill-rule=\"evenodd\"/><path d=\"m20.856 36.844c-.062-.741.041-1.535.198-2.338.006-.023.01-.045.016-.066.322-1.089.804-2.186 1.443-3.118-.32-.022-.639-.023-.958.029-.532.089-1.061.219-1.487.577-.132.11-.239.253-.352.388-.32.784-.382 1.67-.264 2.515.004.016.008.025.012.045.149.544.348 1.075.682 1.534.225.311.479.578.759.81-.017-.123-.036-.248-.049-.376\" fill=\"#fff\"/><path d=\"m44.958 32.19c-.139-.194-.267-.402-.436-.567-.538-.532-1.234-.775-1.945-.958-.688-.173-1.396-.163-2.099-.14-1.17.037-2.336.109-3.504.151-1.396.05-2.79.041-4.184.004l-.432-.001c-.012 0 .405.001.393.001-.008 0-.445 0-.451 0l.103 3.371c.006 0 .34.324.348.324.318.019.621.214.753.54.025.071.055.136.078.203.254.822.625 1.587 1.103 2.3.641.955 1.487 1.635 2.569 2.027 1.015.365 2.049.427 3.108.229 1.408-.256 2.591-.906 3.528-1.986.509-.584.837-1.278 1.104-2 .009-.02.016-.039.021-.058.261-1.128.284-2.338-.057-3.438\" fill=\"#253235\" fill-rule=\"evenodd\"/><path d=\"m42.942 36.844c.065-.741-.04-1.535-.198-2.338-.004-.023-.009-.045-.012-.066-.322-1.089-.807-2.186-1.444-3.118.319-.022.641-.023.959.029.53.089 1.057.219 1.485.577.132.11.238.253.352.388.32.784.381 1.67.264 2.515-.003.016-.008.025-.012.045-.151.544-.348 1.075-.682 1.534-.227.311-.479.578-.759.81.02-.123.036-.248.047-.376\" fill=\"#fff\"/></g><path d=\"m63.24 23.996c0-.014 0-.028 0-.041-.007-.076-.03-.157-.089-.239-.62-.856-2.054-1.369-2.982-1.845-1.173-.606-2.411-1.097-3.666-1.519-2.489-.838-5.067-1.149-7.658-1.476-.288-2.26-.819-4.49-1.456-6.672-.717-2.438-1.554-4.893-2.742-7.141-.462-.87-1.169-2.163-2.034-2.693-1.01-.613-2-.185-3.08-.324-1.144-.152-2.407.307-3.483.633-1.355.408-2.745.672-4.156.769-2.625.183-5.04-1.489-7.648-1.402-1.059.033-2.111-.264-3.074.324-.881.54-1.553 1.819-2.031 2.693-1.235 2.217-2.023 4.72-2.746 7.141-.652 2.175-1.174 4.416-1.459 6.672-2.594.33-5.15.668-7.658 1.476-1.262.406-2.482.93-3.667 1.519-.926.458-2.365.998-2.982 1.845-.112.163-.08.468.078.594.796.631 2.097.404 3.01.881 1.146.602 2.447 1.05 3.627 1.631 2.707 1.332 5.375 2.741 8.104 4.02 5.169 2.41 10.676 4.145 16.442 3.681.633-.053 1.34.086 1.985.096.719.009 1.438-.035 2.151-.092 1.348-.109 2.684-.355 4-.662 2.751-.645 5.396-1.705 7.967-2.872 2.736-1.245 5.396-2.662 8.09-3.999 1.238-.615 2.528-1.386 3.859-1.751.575-.159 1.123-.376 1.713-.513.508-.116.994-.085 1.413-.419.118-.094.167-.204.167-.312v-.001\" fill=\"#2e3e44\"/><path d=\"m30.511 23.02c-2.625 0-4.885-.231-6.741-.543-5.876-.986-8.699-3.517-8.835-3.6l.171-1.171c.029.019 3.335 2.503 8.968 3.435 5.204.86 13.718.361 24.574-3.6l.197 1.336c-7.312 2.671-13.36 4.143-18.334 4.143\" fill=\"#bcbec0\"/></g></svg></div><div id=\"emojiMoney\" class=\"emoji-container\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><g transform=\"translate(4.712)\"><g fill=\"#f79423\"><path d=\"m11.03 3.768c3.782-1.228 14.508 3.125 15.882 4.691 1.365 1.558-7.546 2.202-12.384 2.919-4.992.751-9.971 1.648-11.332.077-1.36-1.549 4.057-6.451 7.834-7.687\"/><path d=\"m37.06 1.038c4.322-1.262 15.912 3.928 17.312 5.696 1.386 1.79-8.58 2.236-14.02 2.893-5.631.674-11.271 1.52-12.658-.262-1.396-1.768 5.059-7.078 9.369-8.327\"/><path d=\"m11.692 8.207c2.597-1.708 13.774.039 15.658 1.112 1.902 1.064-5.305 3.219-9.05 4.691-3.851 1.523-7.624 3.193-9.521 2.103-1.909-1.06.327-6.181 2.915-7.906\"/><path d=\"m22.17.09c3.781.339 7.76 6.953 7.391 8.52-.356 1.558-7.348-.85-11.465-1.901-4.24-1.078-8.614-2.031-8.236-3.589.365-1.575 8.52-3.365 12.31-3.03\"/><path d=\"m35.12 7.485c3.795.326 7.77 6.945 7.4 8.507-.369 1.567-7.357-.846-11.474-1.893-4.228-1.073-8.615-2.039-8.237-3.601.358-1.562 8.53-3.343 12.311-3.01\"/><path d=\"m0 51.636c0 9.431 13.478 12.178 27.896 12.178 14.417 0 27.9-2.747 27.9-12.178 0-9.413-13.482-37.532-27.9-37.532-14.418 0-27.896 28.12-27.896 37.532\"/></g><path d=\"m36.549 15.263c0 1.974-1.597 3.571-3.571 3.571h-10.165c-1.97 0-3.571-1.597-3.571-3.571 0-1.97 1.601-3.571 3.571-3.571h10.164c1.975 0 3.572 1.601 3.572 3.571\" fill=\"#845939\"/><g fill=\"#25333a\"><path d=\"m34.476 40.966c-1.107-1.181-2.635-1.971-4.086-2.627-1.511-.688-3.7-1.249-4.662-2.73-.807-1.24.305-2.541 1.438-2.919 1.824-.613 4.074.125 5.675 1.026.798.446 1.64.009 1.944-.79.335-.884.67-1.769 1-2.652.202-.537-.124-1.224-.604-1.494-1.455-.807-2.971-1.249-4.572-1.459 0-.901 0-1.803 0-2.704 0-.721-.601-1.322-1.322-1.322-.833 0-1.661 0-2.494 0-.717 0-1.322.601-1.322 1.322 0 1.01 0 2.01 0 3.02-2.468.712-4.717 2.301-5.593 4.825-.974 2.794-.382 5.687 1.691 7.803 1.112 1.138 2.614 1.885 4.04 2.532 1.609.726 3.588 1.249 4.627 2.799 1.112 1.657-.326 3.292-1.88 3.761-2.086.626-4.614-.313-6.366-1.404-.768-.48-1.661.013-1.94.79-.322.897-.644 1.794-.966 2.691-.206.575.137 1.185.609 1.493 1.653 1.082 3.55 1.618 5.494 1.842 0 .948 0 1.897 0 2.846 0 .387.142.683.352.893.013.014.026.026.034.039.013.013.026.025.039.034.21.215.506.356.893.356.85 0 1.691 0 2.537 0 .721 0 1.318-.601 1.318-1.322 0-1.047 0-2.095 0-3.142 2.743-.79 4.863-2.562 5.932-5.314 1.096-2.807.164-6.074-1.823-8.194\"/><path d=\"m34.476 39.14c-1.107-1.176-2.635-1.966-4.086-2.622-1.511-.688-3.7-1.249-4.662-2.734-.807-1.232.305-2.537 1.438-2.919 1.824-.609 4.074.125 5.675 1.026.798.451 1.64.008 1.944-.79.335-.884.67-1.764 1-2.648.202-.541-.124-1.228-.604-1.494-1.455-.811-2.971-1.249-4.572-1.463 0-.897 0-1.803 0-2.704 0-.717-.601-1.318-1.322-1.318-.833 0-1.661 0-2.494 0-.717 0-1.322.601-1.322 1.318 0 1.01 0 2.02 0 3.02-2.468.713-4.717 2.305-5.593 4.829-.974 2.794-.382 5.687 1.691 7.799 1.112 1.138 2.614 1.889 4.04 2.532 1.609.726 3.588 1.249 4.627 2.799 1.112 1.656-.326 3.292-1.88 3.764-2.086.627-4.614-.312-6.366-1.407-.768-.477-1.661.017-1.94.79-.322.901-.644 1.798-.966 2.695-.206.57.137 1.185.609 1.493 1.653 1.078 3.55 1.618 5.494 1.842 0 .948 0 1.893 0 2.846 0 .382.142.679.352.893.013.014.026.026.034.039.013.009.026.021.039.034.21.21.506.352.893.352.85 0 1.691 0 2.537 0 .721 0 1.318-.601 1.318-1.317 0-1.052 0-2.099 0-3.146 2.743-.789 4.863-2.558 5.932-5.313 1.096-2.806.164-6.077-1.823-8.197\"/></g></g></svg></div><div id=\"emojiCar\" class=\"emoji-container\"><svg class=\"emoji-car\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><g transform=\"translate(0 26)\"><path d=\"m57.779 15.846c0 1.134-.982 2.058-2.192 2.058h-40.02c-1.21 0-2.192-.923-2.192-2.058l11.976-12.922c1.132-1.251 2.524-2.058 3.734-2.058l22.11-.866c1.208 0 2.189.921 2.189 2.058l4.399 13.788\" fill=\"#c5344d\"/><path d=\"m53.852 12.879c0 .791-.76 1.433-1.696 1.433h-31.09c-.937 0-1.698-.642-1.698-1.433l8.489-8.989c.878-.869 2.739-1.429 3.678-1.429l17.3-.348c.938 0 1.698.641 1.698 1.431l3.319 9.335\" fill=\"#a2c2ca\"/><path d=\"m39.3 14.195c.08.529-.285 1.019-.814 1.095-.527.08-1.021-.285-1.097-.816l-1.802-12.261c-.078-.527.287-1.019.815-1.099.527-.076 1.021.289 1.098.816l1.8 12.265\" fill=\"#c5344d\"/><path d=\"m62.52 20.755c0 3.559-2.887 6.446-6.447 6.446h-48.69c-3.557 0-6.441-2.887-6.441-6.446 0-3.558 2.885-6.443 6.441-6.443h48.689c3.561 0 6.448 2.885 6.448 6.443\" fill=\"#df394c\"/><g fill=\"#fff\"><path d=\"m20.796 27.2c0 4.234-3.439 7.675-7.685 7.675-4.232 0-7.671-3.441-7.671-7.675 0-4.242 3.439-7.677 7.671-7.677 4.246 0 7.685 3.435 7.685 7.677\"/><path d=\"m57.688 27.11c0 4.238-3.441 7.675-7.686 7.675-4.231 0-7.673-3.437-7.673-7.675 0-4.242 3.441-7.675 7.673-7.675 4.244 0 7.686 3.434 7.686 7.675\"/></g><path d=\"m19.434 27.2c0 3.482-2.829 6.311-6.319 6.311-3.48 0-6.311-2.828-6.311-6.311 0-3.488 2.831-6.315 6.311-6.315 3.49 0 6.319 2.827 6.319 6.315\" fill=\"#243438\"/><path d=\"m17.211 27.11c0 2.26-1.831 4.093-4.096 4.093-2.252 0-4.089-1.833-4.089-4.093 0-2.259 1.837-4.089 4.089-4.089 2.265 0 4.096 1.83 4.096 4.089\" fill=\"#969796\"/><path d=\"m56.32 27.2c0 3.482-2.825 6.311-6.315 6.311-3.48 0-6.311-2.828-6.311-6.311 0-3.488 2.83-6.315 6.311-6.315 3.49 0 6.315 2.827 6.315 6.315\" fill=\"#243438\"/><path d=\"m54.1 27.11c0 2.26-1.829 4.093-4.096 4.093-2.252 0-4.091-1.833-4.091-4.093 0-2.259 1.839-4.089 4.091-4.089 2.266 0 4.096 1.83 4.096 4.089\" fill=\"#969796\"/><g fill=\"#e3e4e3\"><path d=\"m3.039 19.13c0 1.679-.681 3.04-1.522 3.04-.838 0-1.517-1.361-1.517-3.04v-.068c0-1.681.679-3.039 1.517-3.039.841 0 1.522 1.358 1.522 3.039v.068\"/><path d=\"m64.04 19.559c0 1.677-.68 3.039-1.517 3.039-.844 0-1.524-1.362-1.524-3.039v-.07c0-1.679.681-3.04 1.524-3.04.837 0 1.517 1.361 1.517 3.04v.07\"/></g><path d=\"m36.58 26.534c-.119.48-.63.763-1.153.634-.516-.127-.842-.619-.721-1.095l2.743-11.1c.113-.476.63-.759 1.147-.632.521.127.846.619.729 1.097l-2.745 11.09\" fill=\"#c5344d\"/><path d=\"m30.23 12.51c.213-3.822 1.831-7.169 4.092-10.09l-2.792.039c-.939 0-2.799.56-3.678 1.429l-8.489 8.989c0 .791.761 1.433 1.698 1.433h9.196c-.04-.587-.058-1.185-.027-1.802\" fill=\"#83afb7\"/></g></svg></div><div id=\"emojiPolice\" class=\"emoji-container\"><svg class=\"emoji-car\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><g transform=\"translate(0 2)\"><path d=\"m42.818 22.32c.035 1.068-.543 1.961-1.291 1.996l-9.437.431c-.745.035-1.38-.803-1.411-1.873-.035-1.068.542-1.962 1.286-1.996l9.382-.877c.751-.033 1.436 1.247 1.471 2.319\" fill=\"#df394c\"/><path d=\"m36.917 22.754c-.004-.844.06-1.621.172-2.356l-5.122.479c-.744.033-1.321.928-1.286 1.996.031 1.07.667 1.908 1.411 1.873l4.997-.228c-.103-.557-.164-1.143-.172-1.764\" fill=\"#3f5aa1\"/><path d=\"m53.19 39.22c0 1.01-.873 1.832-1.953 1.832h-35.63c-1.08 0-1.953-.822-1.953-1.832l10.66-11.505c1.01-1.115 2.249-1.833 3.325-1.833l19.679-.77c1.08 0 1.953.822 1.953 1.832l3.919 12.276\" fill=\"#c2c2c2\"/><path d=\"m49.689 36.572c0 .705-.679 1.279-1.513 1.279h-27.676c-.834 0-1.512-.574-1.512-1.279l7.558-8c.784-.772 2.44-1.273 3.274-1.273l15.405-.307c.834 0 1.512.571 1.512 1.274l2.952 8.308\" fill=\"#3f5aa1\"/><path d=\"m36.734 37.746c.068.473-.254.906-.727.975-.472.07-.908-.255-.979-.725l-1.6-10.919c-.07-.468.252-.908.725-.976.472-.068.908.255.979.725l1.602 10.92\" fill=\"#bbbaba\"/><path d=\"m28.666 36.24c.187-3.401 1.625-6.383 3.641-8.981l-2.487.033c-.834 0-2.491.501-3.274 1.273l-7.558 8c0 .705.678 1.279 1.512 1.279h8.189c-.039-.526-.055-1.057-.023-1.606\" fill=\"#5978ba\"/><path d=\"m62.14 43.861c0 3.51-2.845 6.357-6.356 6.357h-48.04c-3.51 0-6.357-2.849-6.357-6.357 0-3.512 2.847-6.357 6.357-6.357h48.03c3.514 0 6.359 2.846 6.359 6.357\" fill=\"#e3e4e3\"/><path d=\"m63.52 46.1c0 2.332-2.975 4.227-6.649 4.227h-50.23c-3.672 0-6.648-1.895-6.648-4.227 0-2.338 2.976-4.229 6.648-4.229h50.23c3.676 0 6.649 1.891 6.649 4.229\" fill=\"#243438\"/><g fill=\"#fff\"><path d=\"m20.975 50.22c0 4.18-3.394 7.573-7.58 7.573-4.179 0-7.57-3.396-7.57-7.573 0-4.185 3.391-7.574 7.57-7.574 4.186 0 7.58 3.389 7.58 7.574\"/><path d=\"m57.37 50.13c0 4.182-3.393 7.573-7.581 7.573-4.175 0-7.57-3.394-7.57-7.573 0-4.184 3.396-7.572 7.57-7.572 4.191 0 7.581 3.388 7.581 7.572\"/></g><path d=\"m19.63 50.22c0 3.436-2.79 6.227-6.231 6.227-3.436 0-6.227-2.791-6.227-6.227 0-3.439 2.791-6.229 6.227-6.229 3.441 0 6.231 2.789 6.231 6.229\" fill=\"#243438\"/><path d=\"m17.437 50.13c0 2.229-1.805 4.04-4.04 4.04-2.226 0-4.04-1.81-4.04-4.04 0-2.228 1.812-4.03 4.04-4.03 2.233 0 4.04 1.804 4.04 4.03\" fill=\"#969796\"/><path d=\"m56.03 50.22c0 3.436-2.791 6.227-6.235 6.227-3.435 0-6.226-2.791-6.226-6.227 0-3.439 2.791-6.229 6.226-6.229 3.444 0 6.235 2.789 6.235 6.229\" fill=\"#243438\"/><path d=\"m53.834 50.13c0 2.229-1.809 4.04-4.04 4.04-2.222 0-4.03-1.81-4.03-4.04 0-2.228 1.812-4.03 4.03-4.03 2.233 0 4.04 1.804 4.04 4.03\" fill=\"#969796\"/><path d=\"m3.456 42.26c0 1.657-.67 3-1.501 3-.826 0-1.499-1.343-1.499-3v-.065c0-1.658.672-3 1.499-3 .831 0 1.501 1.342 1.501 3v.065\" fill=\"#e3e4e3\"/><path d=\"m63.64 42.68c0 1.655-.671 2.998-1.501 2.998-.825 0-1.5-1.343-1.5-2.998v-.07c0-1.655.675-2.996 1.5-2.996.83 0 1.501 1.341 1.501 2.996v.07\" fill=\"#df394c\"/><path d=\"m36.488 41.852l-1.793 7.254c-.117.473.207.957.718 1.082.51.127 1.021-.151 1.134-.625l1.906-7.709h-1.965v-.002\" fill=\"#fff\"/></g></svg></div><div id=\"emojiBank\" class=\"emoji-container\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><g fill=\"#a2c3cb\"><path d=\"m28.947 21.03c0 8.623 0 17.248 0 25.874 0 5.481 0 10.97 0 16.457 0 .348.245.64.532.64 7.253 0 14.514 0 21.77 0 4.156 0 8.306 0 12.462 0 .285 0 .53-.292.53-.64 0-8.621 0-17.247 0-25.873 0-5.491 0-10.973 0-16.458 0-.191-.056-.335-.144-.438l-.014-.011c0-.011-.009-.013-.009-.013-.091-.109-.216-.181-.365-.181-7.263 0-14.519 0-21.771 0-4.155 0-8.311 0-12.461 0-.286 0-.53.295-.53.643\"/><path d=\"m0 21.03c0 8.623 0 17.248 0 25.874 0 5.481 0 10.97 0 16.457 0 .348.245.64.532.64 7.254 0 14.517 0 21.772 0 4.152 0 8.304 0 12.457 0 .288 0 .533-.292.533-.64 0-8.621 0-17.247 0-25.873 0-5.491 0-10.973 0-16.458 0-.191-.058-.335-.146-.438l-.013-.011c0-.011-.011-.013-.02-.019-.079-.103-.203-.174-.356-.174-7.26 0-14.516 0-21.77 0-4.154 0-8.31 0-12.46 0-.284 0-.529.294-.529.642\"/></g><g fill=\"#5697a2\"><path d=\"m2.151 31.04c2.353 0 4.71 0 7.06 0 1.492 0 2.984 0 4.482 0 .096 0 .185-.039.185-.078 0-1.039 0-2.078 0-3.113 0-.597 0-1.188 0-1.785 0-.043-.088-.075-.185-.075-2.355 0-4.706 0-7.06 0-1.49 0-2.999 0-4.482 0-.051 0-.103.008-.128.023v.004c-.026.015-.047.028-.047.047 0 1.038 0 2.072 0 3.116 0 .597 0 1.185 0 1.782 0 .04.072.079.175.079\"/><path d=\"m2.153 39.28c2.417 0 4.834 0 7.245 0 1.535 0 3.07 0 4.607 0 .092 0 .189-.038.189-.077 0-1.034 0-2.077 0-3.108 0-.602 0-1.188 0-1.785 0-.043-.097-.077-.189-.077-2.419 0-4.834 0-7.25 0-1.528 0-3.079 0-4.603 0-.049 0-.105.008-.133.026v.004c-.023.013-.047.025-.047.047 0 1.035 0 2.074 0 3.117 0 .592 0 1.185 0 1.776 0 .039.076.077.181.077\"/><path d=\"m2.207 46.39c3.098 0 6.202 0 9.289 0 1.969 0 3.935 0 5.91 0 .12 0 .24-.037.24-.076 0-1.039 0-2.078 0-3.112 0-.597 0-1.188 0-1.786 0-.043-.12-.072-.24-.072-3.104 0-6.202 0-9.3 0-1.96 0-3.948 0-5.899 0-.067 0-.133.008-.172.021v.005c-.028.018-.06.029-.06.029 0 1.057 0 2.091 0 3.135 0 .597 0 1.186 0 1.781 0 .036.099.075.232.075\"/><path d=\"m2.181 54.631c2.715 0 5.44 0 8.149 0 1.726 0 3.452 0 5.187 0 .105 0 .21-.039.21-.076 0-1.035 0-2.078 0-3.108 0-.603 0-1.188 0-1.786 0-.043-.105-.078-.21-.078-2.727 0-5.442 0-8.16 0-1.722 0-3.463 0-5.176 0-.06 0-.12.001-.152.026v.004c-.028.013-.054.026-.054.026 0 1.056 0 2.095 0 3.138 0 .593 0 1.187 0 1.778 0 .037.086.076.206.076\"/><path d=\"m51.745 31.682c2.136 0 4.276 0 6.407 0 1.356 0 2.712 0 4.074 0 .084 0 .166-.039.166-.078 0-1.035 0-2.078 0-3.108 0-.601 0-1.189 0-1.787 0-.043-.082-.075-.166-.075-2.141 0-4.279 0-6.412 0-1.353 0-2.723 0-4.069 0-.047 0-.093.009-.12.024v.004c-.02.015-.039.028-.039.028 0 1.055 0 2.094 0 3.137 0 .593 0 1.185 0 1.777 0 .039.066.078.159.078\"/><path d=\"m49.53 39.926c2.58 0 5.165 0 7.735 0 1.642 0 3.274 0 4.922 0 .101 0 .201-.039.201-.076 0-1.039 0-2.078 0-3.113 0-.598 0-1.189 0-1.786 0-.043-.102-.073-.201-.073-2.586 0-5.166 0-7.741 0-1.632 0-3.289 0-4.916 0-.056 0-.112.008-.142.021v.004c-.026.018-.055.029-.055.029 0 1.057 0 2.092 0 3.135 0 .597 0 1.185 0 1.781.002.039.085.078.197.078\"/><path d=\"m45.52 47.03c3.387 0 6.777 0 10.154 0 2.148 0 4.295 0 6.455 0 .131 0 .264-.039.264-.078 0-1.034 0-2.078 0-3.107 0-.602 0-1.189 0-1.787 0-.043-.133-.076-.264-.076-3.395 0-6.779 0-10.16 0-2.143 0-4.314 0-6.449 0-.072 0-.149.009-.188.025v.004c-.035.014-.066.025-.066.047 0 1.035 0 2.074 0 3.117 0 .594 0 1.187 0 1.777-.002.039.103.078.254.078\"/><path d=\"m48.23 55.27c2.844 0 5.689 0 8.524 0 1.806 0 3.608 0 5.421 0 .111 0 .225-.037.225-.076 0-1.039 0-2.078 0-3.111 0-.598 0-1.189 0-1.787 0-.043-.112-.072-.225-.072-2.847 0-5.688 0-8.531 0-1.799 0-3.623 0-5.414 0-.062 0-.123.009-.158.021v.005c-.027.018-.057.029-.057.047 0 1.039 0 2.073 0 3.117 0 .598 0 1.186 0 1.781 0 .038.09.075.215.075\"/></g><path fill=\"#c6dcdf\" d=\"m11.777 3.273c0 12.183 0 24.365 0 36.549 0 7.75 0 15.5 0 23.25 0 .493.279.905.61.905 8.333 0 16.671 0 25.01 0 4.767 0 9.537 0 14.309 0 .33 0 .607-.412.607-.905 0-12.181 0-24.365 0-36.551 0-7.752 0-15.497 0-23.25 0-.268-.063-.474-.162-.618l-.017-.017c0 0-.011-.017-.021-.026-.094-.146-.233-.245-.409-.245-8.338 0-16.672 0-25.01 0-4.768 0-9.538 0-14.308 0-.33 0-.609.412-.609.906\"/><path fill=\"#9a535f\" d=\"m26.587 63.999c2.273 0 4.547 0 6.81 0 1.444 0 2.892 0 4.338 0 .086 0 .168-.056.168-.124 0-1.695 0-3.396 0-5.093 0-.976 0-1.94 0-2.915 0-.068-.082-.125-.168-.125-2.276 0-4.549 0-6.813 0-1.443 0-2.89 0-4.334 0-.045 0-.084.014-.116.039l-.002.004h-.004c-.023.021-.047.053-.047.082 0 1.695 0 3.396 0 5.092 0 .975 0 1.945 0 2.916 0 .068.081.124.168.124\"/><path fill=\"#86a7ac\" d=\"m27.979 60.03c.395 0 .79 0 1.183 0 .251 0 .502 0 .754 0 0 0 .03-.019.03-.035 0-.463 0-.927 0-1.392 0-.266 0-.531 0-.799 0-.017-.015-.033-.015-.033-.41 0-.805 0-1.2 0-.249 0-.502 0-.751 0 0 0-.017.004-.023.013-.002.009-.007.013-.007.013 0 .473 0 .938 0 1.404 0 .268 0 .527 0 .794-.002.017.011.035.029.035\"/><g fill=\"#6cb5c6\"><path d=\"m14.4 29.25c7.129 0 14.261 0 21.374 0 4.51 0 9.02 0 13.562 0 .279 0 .558-.051.558-.099 0-1.297 0-2.599 0-3.891 0-.749 0-1.488 0-2.235 0-.054-.277-.094-.558-.094-7.142 0-14.254 0-21.368 0-4.502 0-9.08 0-13.567 0-.133 0-.303.011-.386.03v.007c-.071.017-.14.034-.14.058 0 1.297 0 2.596 0 3.901 0 .744 0 1.482 0 2.225 0 .047.223.098.525.098\"/><path d=\"m14.718 38.26c7.07 0 14.13 0 21.18 0 4.465 0 8.939 0 13.441 0 .274 0 .551-.047.551-.094 0-1.303 0-2.604 0-3.896 0-.746 0-1.485 0-2.232 0-.056-.275-.094-.551-.094-7.08 0-14.13 0-21.18 0-4.461 0-9 0-13.445 0-.138 0-.303.008-.384.03v.004c-.069.017-.138.035-.138.06 0 1.297 0 2.594 0 3.898 0 .742 0 1.482 0 2.23 0 .047.221.094.523.094\"/><path d=\"m14.718 48.577c7.07 0 14.13 0 21.18 0 4.465 0 8.939 0 13.441 0 .274 0 .551-.048.551-.095 0-1.297 0-2.602 0-3.895 0-.748 0-1.486 0-2.232 0-.057-.275-.096-.551-.096-7.08 0-14.13 0-21.18 0-4.461 0-9 0-13.445 0-.138 0-.303 0-.384.03 0 0 0 0 0 .005-.069.018-.138.034-.138.061 0 1.297 0 2.594 0 3.898 0 .742 0 1.48 0 2.229 0 .047.221.095.523.095\"/></g><path fill=\"#86a7ac\" d=\"m34.33 60.03c.393 0 .79 0 1.183 0 .252 0 .498 0 .757 0 0 0 .027-.019.027-.035 0-.463 0-.927 0-1.392 0-.266 0-.531 0-.799 0-.017-.016-.033-.016-.033-.409 0-.805 0-1.199 0-.252 0-.505 0-.752 0l-.021.013c-.004.009-.009.013-.009.013 0 .473 0 .938 0 1.404 0 .268 0 .527 0 .794 0 .017.015.035.03.035\"/><path fill=\"#04a69c\" d=\"m38.19 19.498c0-3.654-2.573-4.704-5.361-5.292l-1.477-.298c-2.179-.43-2.351-1.061-2.351-1.911 0-1.099.992-1.756 2.651-1.756 1.969 0 2.474.985 2.684 1.729l.021.062c.248.648.821 1.035 1.541 1.035.185 0 .346-.03.475-.056.77-.15 1.306-.767 1.306-1.49 0-.181-.034-.361-.102-.533-.396-1.267-1.494-3.265-4.572-3.72v-2.172c0-1.814-2.836-1.814-2.836 0v2.186c-3.297.517-4.513 2.761-4.513 4.716 0 3.559 2.476 4.553 4.899 5.05l1.6.341c2.273.459 2.672 1.052 2.672 2.127 0 1.31-1.107 2.097-2.971 2.097-2.415 0-2.907-1.088-3.237-2.31-.193-.679-.803-1.112-1.557-1.112-.165 0-.298.021-.455.049l-.045.006c-.782.187-1.305.799-1.305 1.526 0 .142.025.256.045.352l.023.11c.35 1.183 1.123 3.768 4.987 4.349v2.273c0 .907.71 1.384 1.415 1.384s1.423-.477 1.423-1.384v-2.235c3.058-.399 5.04-2.355 5.04-5.124\"/></svg></div><div id=\"emojiExplosion1\" class=\"emoji-container\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><path fill=\"#fbb041\" d=\"m38.24 19.309l-.04-11.159-5.674 7.29-4.913-10.989-1.75 15.347-12.715-1.758 6.785 6.553-15.04 2.839 14.442 3.618-15.04 16.851 20.881-11.458.03 11.161 5.691-7.294 4.912 10.99 1.749-15.347 12.708 1.759-6.783-6.552 15.04-2.84-14.44-3.612 15.04-16.853z\"/><path fill=\"#fff\" d=\"m34.967 23.605l-.018-5.555-2.829 3.63-2.449-5.476-.88 7.645-6.329-.874 3.379 3.265-7.49 1.414 7.196 1.804-7.497 8.396 10.406-5.714.018 5.564 2.826-3.634 2.45 5.482.882-7.651 6.333.876-3.379-3.263 7.494-1.414-7.204-1.802 7.494-8.399z\"/><path fill=\"#df394c\" d=\"m63.7 4.24l-17.804 19.95 17.04 4.259-17.415 3.289 7.569 7.314-14.587-2.02-2.075 18.16-5.776-12.915-6.481 8.306-.034-12.466-24.413 13.396 17.804-19.95-17.03-4.265 17.412-3.292-7.572-7.31 14.595 2.02 2.074-18.17 5.77 12.923 6.479-8.311.039 12.471 24.408-13.393m-22.24 26.344l12.661-2.391-11.852-2.968 12.278-13.754-17.35 9.517-.03-9.852-4.891 6.273-4.053-9.06-1.43 12.526-10.838-1.493 6 5.789-12.66 2.391 11.856 2.964-12.284 13.76 17.354-9.521.024 9.856 4.895-6.273 4.049 9.06 1.439-12.532 10.831 1.501-6-5.792\"/></svg></div><div class=\"emoji-container\" id=\"emojiAmbulance\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><g transform=\"translate(0 4)\"><path d=\"m42.45 8.02c-6.709 0-12.153 3.43-12.153 7.659 0 4.23 5.444 7.659 12.153 7.659v-15.318\" fill=\"#3f5aa1\"/><path d=\"m42.45 23.337c6.713 0 12.153-3.43 12.153-7.659 0-4.23-5.44-7.658-12.153-7.658v15.317\" fill=\"#ee4237\"/><path d=\"m61.777 32.976c0 1.284-1.108 2.33-2.48 2.33h-49.859c-1.372 0-2.482-1.044-2.482-2.33l13.548-14.62c1.283-1.417 2.856-2.328 4.229-2.328l34.17-.983c1.369 0 2.479 1.044 2.479 2.33l.398 15.601\" fill=\"#d1d2d2\"/><path d=\"m33.31 17.771l-5.748.08c-1.062 0-3.167.636-4.161 1.618l-9.606 10.17c0 .897.861 1.622 1.923 1.622h17.555l.037-13.49\" fill=\"#a2c2ca\"/><path d=\"m62.26 40.19c0 4.747-2.828 8.598-6.32 8.598h-47.766c-3.49 0-6.322-3.852-6.322-8.598 0-4.746 2.832-8.595 6.322-8.595h47.764c3.494 0 6.322 3.848 6.322 8.595\" fill=\"#919396\"/><path d=\"m63.75 43.665c0 2.826-2.988 5.119-6.674 5.119h-50.4c-3.684 0-6.672-2.293-6.672-5.119 0-2.828 2.988-5.118 6.672-5.118h50.4c3.686 0 6.674 2.29 6.674 5.118\" fill=\"#d1d2d2\"/><path d=\"m56.895 35.25h-50.4c-1.516 0-2.896.403-4.01 1.059-.494 1.217-.802 2.593-.806 4.076 1.213-.977 2.918-1.592 4.818-1.592h50.4c2.096 0 3.939.754 5.164 1.911 0-.094.019-.179.019-.271 0-1.356-.252-2.622-.662-3.763-1.188-.863-2.752-1.42-4.518-1.42\" fill=\"#df394c\"/><g fill=\"#fff\"><path d=\"m21.329 48.784c0 4.153-3.375 7.529-7.539 7.529-4.155 0-7.527-3.376-7.527-7.529 0-4.162 3.372-7.531 7.527-7.531 4.163-.002 7.539 3.369 7.539 7.531\"/><path d=\"m57.52 48.7c0 4.156-3.371 7.53-7.537 7.53-4.151 0-7.527-3.374-7.527-7.53 0-4.16 3.376-7.531 7.527-7.531 4.165 0 7.537 3.371 7.537 7.531\"/></g><path d=\"m19.992 48.784c0 3.416-2.775 6.19-6.198 6.19-3.417 0-6.191-2.774-6.191-6.19 0-3.422 2.775-6.195 6.191-6.195 3.422 0 6.198 2.773 6.198 6.195\" fill=\"#243438\"/><path d=\"m17.81 48.698c0 2.217-1.794 4.02-4.02 4.02-2.213 0-4.01-1.799-4.01-4.02 0-2.216 1.802-4.01 4.02-4.01 2.221 0 4.02 1.796 4.02 4.01\" fill=\"#969796\"/><path d=\"m56.18 48.784c0 3.416-2.773 6.19-6.199 6.19-3.416 0-6.19-2.774-6.19-6.19 0-3.422 2.774-6.195 6.19-6.195 3.424 0 6.199 2.773 6.199 6.195\" fill=\"#243438\"/><path d=\"m54 48.698c0 2.217-1.798 4.02-4.02 4.02-2.209 0-4.01-1.799-4.01-4.02 0-2.216 1.803-4.01 4.01-4.01 2.222 0 4.02 1.796 4.02 4.01\" fill=\"#969796\"/><path d=\"m3.907 38.02c0 2.238-.667 4.056-1.492 4.056-.822 0-1.49-1.817-1.49-4.056v-.091c0-2.24.668-4.054 1.49-4.054.826 0 1.492 1.813 1.492 4.054v.091\" fill=\"#e3e4e3\"/><path d=\"m63.75 38.592c0 2.237-.669 4.052-1.492 4.052-.822 0-1.492-1.814-1.492-4.052v-.094c0-2.242.67-4.054 1.492-4.054.823 0 1.492 1.812 1.492 4.054v.094\" fill=\"#df394c\"/><path d=\"m26.04 29.2c.238-4.322 2.068-8.11 4.625-11.413l-3.156.043c-1.062 0-3.168.636-4.161 1.618l-9.608 10.17c0 .897.861 1.622 1.922 1.622h10.407c-.046-.666-.066-1.342-.029-2.04\" fill=\"#83afb7\"/><g fill=\"#df394c\"><path d=\"m42.33 25.21c2.927 0 5.849 0 8.768 0 1.862 0 3.729 0 5.586 0 .115 0 .223-.021.223-.048 0-.686 0-1.378 0-2.066 0-.394 0-.785 0-1.182 0-.027-.106-.048-.223-.048-2.928 0-5.85 0-8.771 0-1.862 0-3.722 0-5.583 0-.059 0-.108.003-.145.011l-.004.002c-.006 0-.006 0-.006 0-.031.001-.063.021-.063.035 0 .69 0 1.378 0 2.064 0 .399 0 .791 0 1.184.003.027.102.048.218.048\"/><path d=\"m47.832 21.99c0 1.701 0 3.401 0 5.099 0 1.081 0 2.161 0 3.242 0 .068.021.128.05.128.683 0 1.376 0 2.066 0 .396 0 .786 0 1.186 0 .027 0 .052-.06.052-.128 0-1.702 0-3.399 0-5.099 0-1.078 0-2.159 0-3.242 0-.035-.009-.063-.017-.082v-.002-.006c-.017-.018-.026-.031-.026-.031-.701 0-1.393 0-2.078 0-.398 0-.791 0-1.183 0-.028 0-.05.054-.05.121\"/><path d=\"m47.832 16.75c0 1.701 0 3.397 0 5.095 0 1.083 0 2.163 0 3.244 0 .066.021.126.05.126.683 0 1.376 0 2.066 0 .396 0 .786 0 1.186 0 .027 0 .052-.06.052-.126 0-1.704 0-3.401 0-5.099 0-1.078 0-2.161 0-3.24 0-.037-.009-.066-.017-.085v-.003-.006c-.017-.015-.026-.031-.026-.031-.701 0-1.393 0-2.078 0-.398 0-.791 0-1.183 0-.028 0-.05.055-.05.125\"/></g></g></svg></div><div class=\"emoji-container\" id=\"emojiHospital\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\"><g fill=\"#86a7ac\"><path d=\"m31.945 25.04c0 7.817 0 15.638 0 23.456 0 4.971 0 9.943 0 14.918 0 .314.222.58.483.58 6.575 0 13.158 0 19.737 0 3.762 0 7.522 0 11.293 0 .261 0 .479-.266.479-.58 0-7.818 0-15.635 0-23.457 0-4.975 0-9.945 0-14.917 0-.173-.051-.304-.129-.397 0 0-.009-.006-.013-.001 0-.001-.008-.012-.008-.012-.082-.1-.195-.164-.331-.164-6.581 0-13.16 0-19.736 0-3.768 0-7.529 0-11.294 0-.259 0-.481.267-.481.583\"/><path d=\"m0 33.732c0 6.076 0 12.152 0 18.227 0 3.86 0 7.727 0 11.59 0 .245.208.451.452.451 6.125 0 12.261 0 18.391 0 3.505 0 7.01 0 10.524 0 .243 0 .445-.206.445-.451 0-6.074 0-12.146 0-18.222 0-3.869 0-7.729 0-11.595 0-.131-.046-.232-.123-.307 0 0-.004-.004-.008-.009l-.017-.012c-.068-.074-.173-.125-.298-.125-6.134 0-12.264 0-18.394 0-3.506 0-7.01 0-10.521 0-.243.002-.451.209-.451.453\"/></g><g fill=\"#6c888c\"><path d=\"m4.145 42.482c.8 0 1.602 0 2.397 0 .508 0 1.018 0 1.525 0 .033 0 .062-.035.062-.07 0-.941 0-1.884 0-2.822 0-.541 0-1.078 0-1.619 0-.039-.029-.065-.062-.065-.8 0-1.6 0-2.399 0-.506 0-1.021 0-1.523 0-.018 0-.035.008-.045.019v.004c-.008.017-.018.027-.018.027 0 .958 0 1.896 0 2.842 0 .541 0 1.073 0 1.614 0 .035.028.07.063.07\"/><path d=\"m4.145 49.954c.8 0 1.602 0 2.397 0 .508 0 1.018 0 1.525 0 .033 0 .062-.034.062-.069 0-.941 0-1.884 0-2.822 0-.541 0-1.077 0-1.618 0-.038-.029-.065-.062-.065-.8 0-1.6 0-2.399 0-.506 0-1.021 0-1.523 0-.018 0-.035.008-.045.02v.005c-.008.015-.018.026-.018.026 0 .957 0 1.896 0 2.842 0 .541 0 1.074 0 1.615 0 .032.028.066.063.066\"/><path d=\"m10.695 42.482c.798 0 1.602 0 2.399 0 .508 0 1.014 0 1.526 0 .031 0 .06-.035.06-.07 0-.941 0-1.884 0-2.822 0-.541 0-1.078 0-1.619 0-.039-.029-.065-.06-.065-.804 0-1.602 0-2.401 0-.506 0-1.02 0-1.524 0-.015 0-.035.008-.044.019v.004c-.008.017-.016.027-.016.027 0 .958 0 1.896 0 2.842 0 .541 0 1.073 0 1.614 0 .035.025.07.06.07\"/><path d=\"m10.695 49.954c.798 0 1.602 0 2.399 0 .508 0 1.014 0 1.526 0 .031 0 .06-.034.06-.069 0-.941 0-1.884 0-2.822 0-.541 0-1.077 0-1.618 0-.038-.029-.065-.06-.065-.804 0-1.602 0-2.401 0-.506 0-1.02 0-1.524 0-.015 0-.035.008-.044.02v.005c-.008.015-.016.026-.016.026 0 .957 0 1.896 0 2.842 0 .541 0 1.074 0 1.615 0 .032.025.066.06.066\"/><path d=\"m51.727 34.698c.801 0 1.604 0 2.4 0 .508 0 1.016 0 1.525 0 .031 0 .062-.035.062-.07 0-.942 0-1.884 0-2.821 0-.541 0-1.077 0-1.618 0-.039-.03-.068-.062-.068-.803 0-1.603 0-2.401 0-.506 0-1.021 0-1.524 0-.017 0-.033.008-.033.008s-.001.014-.001.018c-.009.014-.017.025-.017.043 0 .941 0 1.879 0 2.824 0 .541 0 1.074 0 1.615 0 .034.024.069.06.069\"/><path d=\"m51.727 42.17c.801 0 1.604 0 2.4 0 .508 0 1.016 0 1.525 0 .031 0 .062-.035.062-.07 0-.941 0-1.885 0-2.822 0-.541 0-1.078 0-1.619 0-.039-.03-.066-.062-.066-.803 0-1.603 0-2.401 0-.506 0-1.021 0-1.524 0-.017 0-.033.008-.033.008s-.001.013-.001.017c-.009.017-.017.026-.017.042 0 .941 0 1.88 0 2.826 0 .541 0 1.074 0 1.615 0 .034.024.069.06.069\"/><path d=\"m58.28 34.698c.8 0 1.6 0 2.398 0 .51 0 1.018 0 1.526 0 .03 0 .062-.035.062-.07 0-.942 0-1.884 0-2.821 0-.541 0-1.077 0-1.618 0-.039-.029-.068-.062-.068-.802 0-1.603 0-2.401 0-.506 0-1.02 0-1.523 0 0 0-.034.008-.045.021 0 0 0 0 0 .004 0 0-.016.025-.016.043 0 .941 0 1.879 0 2.825 0 .541 0 1.074 0 1.614.002.035.027.07.061.07\"/><path d=\"m58.28 42.17c.8 0 1.6 0 2.398 0 .51 0 1.018 0 1.526 0 .03 0 .062-.035.062-.07 0-.941 0-1.885 0-2.822 0-.541 0-1.078 0-1.619 0-.039-.029-.066-.062-.066-.802 0-1.603 0-2.401 0-.506 0-1.02 0-1.523 0 0 0-.034.008-.045.021 0 0 0 0 0 .004 0 0-.016.026-.016.042 0 .941 0 1.88 0 2.826 0 .541 0 1.074 0 1.615.002.034.027.069.061.069\"/><path d=\"m51.727 48.611c.801 0 1.604 0 2.4 0 .508 0 1.016 0 1.525 0 .031 0 .062-.034.062-.069 0-.942 0-1.884 0-2.821 0-.541 0-1.078 0-1.619 0-.039-.03-.065-.062-.065-.803 0-1.603 0-2.401 0-.506 0-1.021 0-1.524 0-.017 0-.033.008-.043.021v.004c-.009.016-.017.027-.017.041 0 .942 0 1.881 0 2.826 0 .541 0 1.074 0 1.615 0 .033.024.067.06.067\"/><path d=\"m51.727 56.08c.801 0 1.604 0 2.4 0 .508 0 1.016 0 1.525 0 .031 0 .062-.035.062-.068 0-.942 0-1.885 0-2.822 0-.541 0-1.078 0-1.619 0-.039-.03-.064-.062-.064-.803 0-1.603 0-2.401 0-.506 0-1.021 0-1.524 0-.017 0-.033.008-.043.019v.004c-.009.017-.017.026-.017.043 0 .942 0 1.88 0 2.825 0 .541 0 1.074 0 1.615 0 .032.024.067.06.067\"/><path d=\"m58.28 48.611c.8 0 1.6 0 2.398 0 .51 0 1.018 0 1.526 0 .03 0 .062-.034.062-.069 0-.942 0-1.884 0-2.821 0-.541 0-1.078 0-1.619 0-.039-.029-.065-.062-.065-.802 0-1.603 0-2.401 0-.506 0-1.02 0-1.523 0 0 0-.034.008-.045.021v.004c-.008.016-.016.027-.016.041 0 .942 0 1.881 0 2.826 0 .541 0 1.074 0 1.615.002.033.027.067.061.067\"/><path d=\"m58.28 56.08c.8 0 1.6 0 2.398 0 .51 0 1.018 0 1.526 0 .03 0 .062-.035.062-.068 0-.942 0-1.885 0-2.822 0-.541 0-1.078 0-1.619 0-.039-.029-.064-.062-.064-.802 0-1.603 0-2.401 0-.506 0-1.02 0-1.523 0 0 0-.034.008-.045.019v.004c-.008.017-.016.026-.016.043 0 .942 0 1.88 0 2.825 0 .541 0 1.074 0 1.615.002.032.027.067.061.067\"/></g><path fill=\"#a2c3cb\" d=\"m16.381 8.94c0 11.04 0 22.09 0 33.13 0 7.02 0 14.05 0 21.07 0 .451.253.82.552.82 7.555 0 15.11 0 22.668 0 4.322 0 8.646 0 12.971 0 .3 0 .553-.369.553-.82 0-11.04 0-22.08 0-33.13 0-7.03 0-14.05 0-21.07 0-.243-.059-.43-.148-.561l-.016-.016c0-.014-.009-.016-.02-.023-.082-.132-.211-.221-.369-.221-7.559 0-15.11 0-22.668 0-4.322 0-8.646 0-12.97 0-.3 0-.553.374-.553.821\"/><path fill=\"#405967\" d=\"m29.806 63.989c2.059 0 4.118 0 6.172 0 1.311 0 2.619 0 3.934 0 .077 0 .15-.052.15-.117 0-1.532 0-3.073 0-4.612 0-.883 0-1.759 0-2.646 0-.062-.073-.108-.15-.108-2.063 0-4.122 0-6.178 0-1.308 0-2.618 0-3.928 0-.041 0-.076.012-.105.031l-.002.004h-.004c-.02.023-.042.047-.042.073 0 1.538 0 3.079 0 4.62 0 .884 0 1.763 0 2.639 0 .065.074.116.153.116\"/><g fill=\"#86a7ac\"><path d=\"m31.07 60.39c.358 0 .716 0 1.072 0 .228 0 .455 0 .683 0 0 0 .025-.017.025-.031 0-.42 0-.846 0-1.262 0-.244 0-.481 0-.724 0-.021-.013-.03-.013-.03-.372 0-.73 0-1.088 0-.226 0-.456 0-.681 0l-.021.008v.004c-.002.004-.006.012-.006.012 0 .428 0 .85 0 1.27 0 .24 0 .481 0 .724.002.013.014.029.029.029\"/><path d=\"m18.775 37.473c6.606 0 13.215 0 19.808 0 4.183 0 8.362 0 12.569 0 .258 0 .515-.047.515-.088 0-1.177 0-2.355 0-3.527 0-.68 0-1.35 0-2.027 0-.046-.257-.085-.515-.085-6.617 0-13.213 0-19.805 0-4.17 0-8.418 0-12.573 0-.128 0-.282.012-.36.027v.004c-.062.021-.128.035-.128.054 0 1.176 0 2.352 0 3.534 0 .677 0 1.347 0 2.02 0 .04.207.087.489.087\"/><path d=\"m18.753 46.821c6.332 0 12.662 0 18.985 0 4.01 0 8.02 0 12.05 0 .25 0 .495-.048.495-.089 0-1.176 0-2.355 0-3.526 0-.683 0-1.351 0-2.028 0-.045-.245-.084-.495-.084-6.344 0-12.662 0-18.982 0-3.999 0-8.07 0-12.05 0-.125 0-.272.001-.347.026 0 0 0 0 0 .008-.063.017-.123.031-.123.05 0 1.176 0 2.355 0 3.539 0 .674 0 1.342 0 2.02 0 .04.197.088.469.088\"/><path d=\"m26.557 37.489c1 0 2 0 2.999 0 .639 0 1.275 0 1.913 0 .039 0 .078-.048.078-.091 0-1.174 0-2.354 0-3.525 0-.682 0-1.352 0-2.028 0-.046-.039-.085-.078-.085-1 0-2 0-3.01 0-.635 0-1.275 0-1.905 0-.023 0-.043.012-.057.027v.004c0 .02-.02.035-.02.054 0 1.174 0 2.351 0 3.534 0 .678 0 1.346 0 2.02 0 .042.033.09.076.09\"/><path d=\"m26.557 46.838c1 0 2 0 2.999 0 .639 0 1.275 0 1.913 0 .039 0 .078-.048.078-.091 0-1.175 0-2.354 0-3.524 0-.683 0-1.352 0-2.028 0-.046-.039-.085-.078-.085-1 0-2 0-3.01 0-.635 0-1.275 0-1.905 0-.023 0-.043.012-.057.027v.008c0 .017-.02.031-.02.051 0 1.176 0 2.355 0 3.537 0 .675 0 1.344 0 2.02 0 .04.033.088.076.088\"/><path d=\"m46.17 37.489c1 0 2.01 0 3.01 0 .632 0 1.269 0 1.905 0 .04 0 .079-.048.079-.091 0-1.174 0-2.354 0-3.525 0-.682 0-1.352 0-2.028 0-.046-.039-.085-.079-.085-1 0-2 0-3 0-.634 0-1.276 0-1.907 0-.02 0-.043.012-.055.027v.004c-.001.02-.021.035-.021.054 0 1.174 0 2.351 0 3.534 0 .678 0 1.346 0 2.02 0 .042.033.09.076.09\"/><path d=\"m46.17 46.838c1 0 2.01 0 3.01 0 .632 0 1.269 0 1.905 0 .04 0 .079-.048.079-.091 0-1.175 0-2.354 0-3.524 0-.683 0-1.352 0-2.028 0-.046-.039-.085-.079-.085-1 0-2 0-3 0-.634 0-1.276 0-1.907 0-.02 0-.043.012-.055.027v.008c0 0-.021.031-.021.051 0 1.176 0 2.355 0 3.537 0 .675 0 1.344 0 2.02 0 .04.033.088.076.088\"/><path d=\"m38.04 37.489c1 0 2 0 3 0 .635 0 1.271 0 1.909 0 .039 0 .076-.048.076-.091 0-1.174 0-2.354 0-3.525 0-.682 0-1.352 0-2.028 0-.046-.037-.085-.076-.085-1 0-2 0-3 0-.633 0-1.275 0-1.905 0-.022 0-.045.012-.06.027v.004c-.008.02-.021.035-.021.054 0 1.174 0 2.351 0 3.534 0 .678 0 1.346 0 2.02 0 .042.036.09.081.09\"/><path d=\"m38.04 46.838c1 0 2 0 3 0 .635 0 1.271 0 1.909 0 .039 0 .076-.048.076-.091 0-1.175 0-2.354 0-3.524 0-.683 0-1.352 0-2.028 0-.046-.037-.085-.076-.085-1 0-2 0-3 0-.633 0-1.275 0-1.905 0-.022 0-.045.012-.06.027v.008c0 0-.021.031-.021.051 0 1.176 0 2.355 0 3.537 0 .675 0 1.344 0 2.02 0 .04.036.088.081.088\"/><path d=\"m36.82 60.39c.356 0 .718 0 1.072 0 .229 0 .457 0 .685 0 0 0 .026-.017.026-.031 0-.42 0-.846 0-1.262 0-.244 0-.481 0-.724 0-.021-.014-.03-.014-.03-.372 0-.73 0-1.088 0-.229 0-.458 0-.682 0l-.019.008v.004c-.004.004-.008.012-.008.012 0 .428 0 .85 0 1.27 0 .24 0 .481 0 .724.002.013.015.029.028.029\"/></g><g fill=\"#de374b\"><path d=\"m26.664 23.261c3.341 0 6.676 0 10.01 0 2.125 0 4.254 0 6.375 0 .13 0 .253-.023.253-.055 0-.784 0-1.572 0-2.358 0-.45 0-.897 0-1.351 0-.031-.123-.054-.253-.054-3.34 0-6.677 0-10.01 0-2.125 0-4.249 0-6.374 0-.068 0-.125.004-.164.014l-.006.002h-.006c-.039.009-.07.025-.07.025 0 .802 0 1.588 0 2.371 0 .455 0 .903 0 1.352 0 .03.116.054.247.054\"/><path d=\"m32.945 19.581c0 1.942 0 3.88 0 5.818 0 1.236 0 2.467 0 3.703 0 .074.024.144.057.144.782 0 1.57 0 2.357 0 .451 0 .898 0 1.354 0 .031 0 .058-.07.058-.144 0-1.944 0-3.882 0-5.82 0-1.232 0-2.466 0-3.701 0-.041-.006-.072-.019-.094v-.002c0-.008 0-.008 0-.008-.017-.019-.028-.035-.028-.035-.801 0-1.591 0-2.373 0-.455 0-.902 0-1.351 0-.029 0-.055.063-.055.139\"/><path d=\"m32.945 13.597c0 1.942 0 3.878 0 5.816 0 1.238 0 2.469 0 3.703 0 .074.024.144.057.144.782 0 1.57 0 2.357 0 .451 0 .898 0 1.354 0 .031 0 .058-.07.058-.144 0-1.944 0-3.882 0-5.818 0-1.232 0-2.468 0-3.701 0-.041-.006-.072-.019-.096v-.002-.005c-.017-.02-.028-.037-.028-.037-.801 0-1.591 0-2.373 0-.455 0-.902 0-1.351 0-.029 0-.055.062-.055.14\"/></g></svg></div><div class=\"emoji-container\" id=\"emojiGavel\"><svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 1024 1024\" enable-background=\"new 0 0 1024 1024\" xml:space=\"preserve\"><path fill=\"#844207\" d=\"M13.9,877c-0.2,24,15.7,43.5,34.9,43.2h571.4c19.2,0.1,34.9-19.1,34.7-43.3c0-23.8-15.6-43.4-34.7-43.4 h-35.9v-47.4H84.7v47.4h-36C29.5,833.5,13.8,853,13.9,877z\"/><path fill=\"#5B2E09\" d=\"M433.9,613.3L259.7,438.8c-13.4-13.7-38.3-10.9-55.3,6c-17,16.9-19.7,41.7-5.9,55.2l174,174.4   c13.7,13.6,38.2,11.1,55.3-6C444.8,651.6,447.6,626.8,433.9,613.3z\"/><path fill=\"#5B2E09\" d=\"M775,272.1L600.8,97.8c-13.5-13.8-38.3-11-55.3,5.8c-17,16.9-19.6,41.7-5.9,55.3l174.1,174.3    c13.5,13.7,38.2,11.2,55.2-5.9C785.8,310.5,788.6,285.9,775,272.1z\"/><path fill=\"#5B2E09\" d=\"M284.7,413.8l175.5,176l87.1-87.5l0.5-0.1l390.2,391.1c7.9,7.1,18.2,11.6,29.7,11.6c5.4,0,10.5-1.1,15.3-2.8 c12.1-4.5,21.7-14,26.2-26.2c1.8-4.8,2.9-9.9,2.9-15.3c0-11.9-4.8-22.7-12.5-30.7L609.8,440.2l80.6-80.4l-175.7-176L284.7,413.8z\"/><path fill=\"#E8C91D\" d=\"M320.8,377.8l175.5,176l51.1-51.5l0.5-0.1l61.9-62l47.3-47.1L481.4,217L320.8,377.8z\"/></svg></div><div class=\"emoji-container\" id=\"emojiFearful\"><svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 64 64\" viewBox=\"0 0 64 64\"><path d=\"M63.958,31.98c0,17.665-14.313,31.979-31.979,31.979C14.315,63.959,0,49.645,0,31.98    C0,14.315,14.315,0,31.979,0C49.645,0,63.958,14.315,63.958,31.98z\" fill=\"#fbbf67\"/><g fill=\"#25333a\"><ellipse ry=\"5.099\" rx=\"4.205\" cy=\"25.305\" cx=\"42.859\"/><path d=\"m25.07 25.305c0 2.816-1.882 5.099-4.203 5.099-2.327 0-4.21-2.283-4.21-5.099 0-2.817 1.884-5.101 4.21-5.101 2.321 0 4.203 2.283 4.203 5.101\"/></g><path d=\"m42.794 54.57c-.288 0-5.524-1.672-10.815-1.672-4.72 0-9.488 1.672-10.809 1.672-1.149 0-1.576-2.174-.881-3.473 6.324-11.914 17.06-11.914 23.389 0 .685 1.299.26 3.473-.884 3.473\" fill=\"#633d19\"/><g fill=\"#fff\"><ellipse ry=\"9.732\" rx=\"6.5\" cy=\"25.305\" cx=\"20.984\"/><ellipse ry=\"9.732\" rx=\"6.5\" cy=\"25.305\" cx=\"42.979\"/></g><g fill=\"#25333a\"><ellipse ry=\"5.099\" rx=\"4.205\" cy=\"25.305\" cx=\"20.984\"/><path d=\"m47.18 25.305c0 2.816-1.881 5.099-4.205 5.099s-4.205-2.283-4.205-5.099c0-2.817 1.881-5.101 4.205-5.101s4.205 2.283 4.205 5.101\"/></g><g fill=\"#633d19\"><path d=\"m22.821 3.772c-3.918 4.179-8.318 7.386-13.604 9.626-1.205.511-.272 2.307.92 1.801 5.439-2.305 10-5.621 14.03-9.922.888-.944-.459-2.453-1.35-1.505\"/><path d=\"m9.719 16.05c-.845 0-1.611-.648-1.785-1.507-.162-.796.225-1.519.987-1.841 5.01-2.123 9.377-5.214 13.347-9.446.828-.881 2.314-.531 2.796.581.292.675.162 1.426-.339 1.961-4.234 4.517-8.907 7.819-14.291 10.1-.233.099-.474.15-.715.15m13.738-11.819c-4.201 4.452-8.733 7.659-13.943 9.867-.083.352.11.498.328.405 5.187-2.198 9.691-5.386 13.777-9.743.04-.043.132-.142.056-.32-.06-.135-.175-.209-.218-.209\"/><path d=\"m42.654 3.772c3.918 4.179 8.318 7.386 13.604 9.626 1.204.511.271 2.307-.921 1.801-5.438-2.305-10-5.621-14.03-9.922-.887-.944.461-2.453 1.351-1.505\"/><path d=\"m55.756 16.05c-.24 0-.48-.051-.715-.15-5.384-2.283-10.06-5.585-14.291-10.1-.502-.535-.632-1.286-.34-1.961.482-1.112 1.967-1.463 2.797-.581 3.971 4.232 8.334 7.323 13.348 9.446.762.322 1.148 1.045.986 1.841-.174.859-.939 1.507-1.785 1.507m-13.746-11.779c-.089 0-.166.067-.209.17-.076.178.016.276.055.32 4.088 4.357 8.592 7.544 13.778 9.743l.122.029c.143 0 .271-.154.301-.292-5.306-2.35-9.838-5.558-13.955-9.948-.034-.014-.062-.022-.092-.022\"/></g></svg></div><div class=\"emoji-container\" id=\"emojiCrying\"><div id=\"jailbars\"><div class=\"jailbar\"></div><div class=\"jailbar\"></div><div class=\"jailbar\"></div><div class=\"jailbar\"></div><div class=\"jailbar\"></div></div><svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 64 64\" viewBox=\"0 0 64 64\"><path d=\"m63.978 32c0 17.665-14.314 31.979-31.979 31.979-17.664 0-31.979-14.314-31.979-31.979 0-17.66 14.315-31.975 31.979-31.975 17.665 0 31.979 14.315 31.979 31.975\" fill=\"#fbbf67\"/><path d=\"m54.02 35.15c.518-1.702.813-3.583.813-5.573 0-7.438-4.02-13.461-8.986-13.461-4.965 0-8.993 6.02-8.993 13.461 0 3.35.821 6.407 2.176 8.761 4.609-1.825 9.981-2.702 14.99-3.188\" fill=\"#fff\"/><path d=\"m51.926 29.576c0 4.072-2.721 7.371-6.079 7.371-3.361 0-6.082-3.299-6.082-7.371 0-4.072 2.721-7.375 6.082-7.375 3.359 0 6.079 3.303 6.079 7.375\" fill=\"#25333a\"/><g transform=\"translate(.02.026)\" fill=\"#633d19\"><path d=\"m27.25 4.456c-.407.115-.818.229-1.225.344-.063.02-.099.055-.154.075-.06.027-.119.051-.174.091-.091.071-.162.158-.217.245-.016.02-.032.028-.043.051-2.153 3.705-5.838 5.436-10.06 4.566-2.26-.466-2.351-1.41-4.468-.818-.865.241-.908 1.339-.221 1.79 6.32 4.187 14.43 1.928 17.672-4.922.356-.747-.248-1.659-1.113-1.422\"/><path d=\"m36.703 4.456c.411.115.817.229 1.225.344.063.02.103.055.154.075.059.027.118.051.178.091.091.071.162.158.217.245.012.02.027.028.044.051 2.148 3.705 5.838 5.436 10.05 4.566 2.263-.466 2.35-1.41 4.471-.818.865.241.909 1.339.218 1.79-6.316 4.187-14.426 1.928-17.669-4.922-.357-.747.244-1.659 1.109-1.422\"/></g><path d=\"m27.472 29.576c0 7.434-4.02 13.462-8.986 13.462-4.965 0-8.994-6.03-8.994-13.462 0-7.438 4.03-13.461 8.994-13.461 4.965 0 8.986 6.02 8.986 13.461\" fill=\"#fff\"/><path d=\"m24.565 29.576c0 4.076-2.721 7.375-6.083 7.375-3.362 0-6.083-3.299-6.083-7.375 0-4.068 2.721-7.371 6.083-7.371 3.362 0 6.083 3.302 6.083 7.371\" fill=\"#25333a\"/><g transform=\"translate(.02.026)\" fill=\"#fff\"><path d=\"m24.411 34.609c0 2.662-1.777 4.819-3.974 4.819-2.196 0-3.978-2.157-3.978-4.819 0-2.662 1.782-4.823 3.978-4.823 2.196 0 3.974 2.161 3.974 4.823\"/><path d=\"m21.13 28.13c0 1.789-1.193 3.235-2.67 3.235-1.474 0-2.67-1.446-2.67-3.235 0-1.79 1.197-3.239 2.67-3.239 1.477 0 2.67 1.449 2.67 3.239\"/><path d=\"m51.21 33.09c0 2.662-1.777 4.819-3.974 4.819-2.195 0-3.978-2.157-3.978-4.819 0-2.662 1.782-4.823 3.978-4.823 2.197 0 3.974 2.161 3.974 4.823\"/><path d=\"m47.929 26.611c0 1.79-1.192 3.235-2.67 3.235-1.474 0-2.67-1.446-2.67-3.235 0-1.789 1.196-3.239 2.67-3.239 1.477 0 2.67 1.45 2.67 3.239\"/></g><path d=\"m22.381 52.33c-.628.719-.241 1.92.798 1.92 1.197 0 5.495-1.813 9.756-1.813 4.771 0 9.496 1.813 9.757 1.813 1.034 0 1.418-1.201.802-1.92-5.72-6.593-15.406-6.593-21.11 0\" fill=\"#633d19\"/><path d=\"m11.605 54.71c0 4.704 3.136 8.516 7.01 8.516 3.871 0 7.01-3.812 7.01-8.516 0-4.704-3.136-16.306-7.01-16.306-3.874 0-7.01 11.601-7.01 16.306\" fill=\"#58c5e8\"/></svg></div></div></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><br><br><br><div show.bind=\"user.expenses.isTotalExpenseZero\" class=\"loading-bro\"><h1>Loading</h1><svg id=\"load\" x=\"0px\" y=\"0px\" viewBox=\"0 0 150 150\"><circle id=\"loading-inner\" cx=\"75\" cy=\"75\" r=\"60\"/></svg></div><div show.bind=\"!user.expenses.isTotalExpenseZero\"><compose view-model=\"./compose/compose-chart\"></compose><compose view-model=\"./compose/compose-recommendations\"></compose><compose view-model=\"./compose/compose-table\"></compose></div><hr><button class=\"btn btn-secondary btn-lg\" style=\"float:left;width:10vmax;margin:1vw\" click.delegate=\"back()\"><span class=\"glyphicon glyphicon-arrow-left\"></span></button><div show.bind=\"!user.expenses.isTotalExpenseZero\"><button class=\"btn btn-lg\" style=\"float:center;width:20vmax;background-color:#dff0d8\" click.delegate=\"getChartData()\">Redraw Chart</button></div><button class=\"btn btn-primary btn-lg\" style=\"float:right;width:10vmax;margin:1vw\" click.delegate=\"home()\">Finish</button><br><br><br></div></template>"; });
define('text!aboutyou/compose/compose-goals.html', ['module'], function(module) { module.exports = "<template><require from=\"css/drag-and-drop.css\"></require><div id=\"availableGoals\" style=\"width:30%;float:left;padding-right:5%\"><div class=\"box-shadow--6dp\" style=\"border-radius:0;height:512px\"><div class=\"\" style=\"background-color:#337ab7;color:#fff\"><h3 style=\"margin:0;padding:1.2vmin;font-weight:700\">Wishes</h3></div><div style=\"height:425px;overflow:auto\" class=\"panel-body\" dragstart.trigger=\"drag($event)\"><div repeat.for=\"goal of user.personalInfo.goalsList\" class=\"row\"><div id=\"wishesCol\" class=\"current-buttons btn\" style=\"width:70%;height:50%;background-color:#f5f5f5;font-size:1vw\" draggable=\"true\">${goal}</div><br><br></div></div></div></div><div id=\"currentGoals\" drop.trigger=\"drop($event)\" dragover.trigger=\"allowDrop($event)\"><div style=\"height:512px;width:70%;border-radius:0;display:inline-block\" class=\"box-shadow--6dp ${user.personalInfo.currentGoals.length >= 2 ? 'goalOverflow' : 'none'}\"><div class=\"\" style=\"background-color:#337ab7;color:#fff\"><h3 style=\"margin:0;padding:1.2vmin;font-weight:700\">Wish List <span id=\"wishesTooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></h3></div><div class=\"panel-body\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group\" style=\"float:left;padding-right:4%\"><label for=\"rank\">Rank</label><select class=\"form-control\" value.bind=\"user.personalInfo['rank' + wish.value]\"><option repeat.for=\"rank of user.personalInfo.currentGoals.length\">${rank + 1}</option></select></div><div class=\"form-group\" style=\"width:80%;float:left\"><label for=\"wish\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\"><div class=\"input-group-btn\"><button click.delegate=\"remove(wish.title)\" class=\"btn btn-danger\">X</button></div></div></div><br><br><br><br><br></div></div><div id=\"myGoals\" style=\"clear:both;font-size:17px\"><span class=\"glyphicon glyphicon-plus\" style=\"font-size:14px\"></span> Drag Wish Here</div><br></div></div></div></template>"; });
define('text!aboutyou/compose/compose-personal-info.html', ['module'], function(module) { module.exports = "<template><br><br><br><div class=\"box-shadow--6dp\" style=\"border-radius:0;height:400px;width:100%;overflow:auto\"><div class=\"\" style=\"background-color:#337ab7;color:#fff\"><h3 style=\"margin:0;padding:1.2vmin;font-weight:700\">About Me</h3></div><br><div class=\"form-group\" style=\"width:90%;margin:0 auto\"><label for=\"age\">Age</label><input style=\"width:400px\" id=\"age\"></div><div style=\"width:90%;margin:0 auto\"><div class=\"form-group col-md-6\"><label for=\"salary\">Household Income Per Year</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.income\" change.delegate=\"checkIncome()\" class=\"form-control ${user.personalInfo.validIncome ? 'none' : 'btn-danger'}\"></div></div><div class=\"form-group col-md-6\"><label for=\"savings\">Savings Per Month (for goals)</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" change.delegate=\"checkSavings()\" class=\"form-control ${user.personalInfo.validSavings ? 'none' : 'btn-danger'}\"></div></div><div class=\"form-group col-md-6\"><label for=\"householdSize\">Household Size</label><input type=\"text\" value.bind=\"user.personalInfo.householdSize\" change.delegate=\"checkHouseholdSize()\" class=\"form-control ${user.personalInfo.validHouseholdSize ? 'none' : 'btn-danger'}\"></div><div class=\"form-group col-md-6\"><label for=\"householdSize\">Size of Home (in square feet)</label><input type=\"text\" value.bind=\"user.personalInfo.squareFootHome\" change.delegate=\"checkHomeSize()\" class=\"form-control ${user.personalInfo.validHomeSize ? 'none' : 'btn-danger'}\"></div></div></div></template>"; });
define('text!expenses/compose/compose-car-expenses.html', ['module'], function(module) { module.exports = "<template><br><div class=\"${click ? 'none' : 'box-shadow--6dp'}\" style=\"border-radius:0\"><div><h4 class=\"panel-title\"><div style=\"float:right;padding:5px;width:30%;text-align:right\">Yearly Total: $${user.expenses.totalCarExpense}</div><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#carExpenseCollapse\" click.delegate=\"clicked()\" style=\"float:left;padding:5px;width:30%\"><span show.bind=\"click\" class=\"glyphicon glyphicon-chevron-right\"></span> <span show.bind=\"!click\" class=\"glyphicon glyphicon-chevron-down\"></span> </a><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#carExpenseCollapse\" click.delegate=\"clicked()\" style=\"font-size:24px\"><center>Transportation</center></a></h4></div><div id=\"carExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"car of constants.CarExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${car.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[car.value]\" change.delegate=\"calculateExpenses.carExpenses()\" class=\"form-control\" id=\"${car.value}\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[car.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(car.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[car.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[car.value + 'lock']\"></i></button></div></div><br></div><br></div></div></div></template>"; });
define('text!expenses/compose/compose-discretionary-expenses.html', ['module'], function(module) { module.exports = "<template><br><div class=\"${click ? 'none' : 'box-shadow--6dp'}\" style=\"border-radius:0\"><div><h4 class=\"panel-title\"><div style=\"float:right;padding:5px;width:30%;text-align:right\">Yearly Total: $${user.expenses.totalDiscretionaryExpense}</div><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#discretionaryExpenseCollapse\" click.delegate=\"clicked()\" style=\"float:left;padding:5px;width:30%\"><span show.bind=\"click\" class=\"glyphicon glyphicon-chevron-right\"></span> <span show.bind=\"!click\" class=\"glyphicon glyphicon-chevron-down\"></span> </a><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#discretionaryExpenseCollapse\" click.delegate=\"clicked()\" style=\"font-size:24px\"><center>Other</center></a></h4></div><div id=\"discretionaryExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"discretionary of constants.DiscretionaryExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${discretionary.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[discretionary.value]\" change.delegate=\"calculateExpenses.discretionaryExpenses()\" class=\"form-control\" id=\"${discretionary.value}\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[discretionary.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(discretionary.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[discretionary.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[discretionary.value + 'lock']\"></i></button></div></div><br></div></div></div></div></template>"; });
define('text!expenses/compose/compose-health-expenses.html', ['module'], function(module) { module.exports = "<template><br><div class=\"${click ? 'none' : 'box-shadow--6dp'}\" style=\"border-radius:0\"><div><h4 class=\"panel-title\"><div style=\"float:right;padding:5px;width:30%;text-align:right\">Yearly Total: $${user.expenses.totalHealthExpense}</div><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#healthExpenseCollapse\" click.delegate=\"clicked()\" style=\"float:left;padding:5px;width:30%\"><span show.bind=\"click\" class=\"glyphicon glyphicon-chevron-right\"></span> <span show.bind=\"!click\" class=\"glyphicon glyphicon-chevron-down\"></span> </a><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#healthExpenseCollapse\" click.delegate=\"clicked()\" style=\"font-size:24px\"><center>Health</center></a></h4></div><div id=\"healthExpenseCollapse\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div repeat.for=\"health of constants.HealthExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${health.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[health.value]\" change.delegate=\"calculateExpenses.healthExpenses()\" class=\"form-control\" id=\"${health.value}\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[health.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(health.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[health.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[health.value + 'lock']\"></i></button></div></div></div><br></div></div></div></template>"; });
define('text!expenses/compose/compose-home-expenses.html', ['module'], function(module) { module.exports = "<template><br><div class=\"${click ? 'none' : 'box-shadow--6dp'}\" style=\"border-radius:0\"><div><h4 class=\"panel-title\"><div style=\"float:right;padding:5px;width:30%;text-align:right\">Yearly Total: $${user.expenses.totalHomeExpense.toFixed(0)}</div><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#homeExpenseCollapse\" click.delegate=\"clicked()\" style=\"float:left;padding:5px;width:30%\"><span show.bind=\"click\" class=\"glyphicon glyphicon-chevron-right\"></span> <span show.bind=\"!click\" class=\"glyphicon glyphicon-chevron-down\"></span> </a><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#homeExpenseCollapse\" click.delegate=\"clicked()\" style=\"font-size:24px\"><center>Home <span id=\"expensesTooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></center></a></h4></div><div id=\"homeExpenseCollapse\" class=\"panel-collapse collapse in\"><div class=\"panel-body\"><div repeat.for=\"home of constants.HomeExpenses\" class=\"form-group col-md-6\"><label style=\"padding-left:5%\">${home.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0 expensesInput\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[home.value]\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" id=\"${home.value}\"><div class=\"input-group-btn\"><button type=\"button\" class=\"btn ${user.expenses[home.value + 'lock'] ? 'btn-default' : 'btn-primary'}\" click.delegate=\"lockStateChange(home.value)\"><i class=\"fa fa-unlock\" show.bind=\"!user.expenses[home.value + 'lock']\"></i> <i class=\"fa fa-lock\" show.bind=\"user.expenses[home.value + 'lock']\"></i></button></div></div><br></div></div></div></div></template>"; });
define('text!results/compose/compose-chart.html', ['module'], function(module) { module.exports = "<template><div class=\"col-md-6\"><div class=\"\" show.bind=\"user.results.showBudget\" id=\"resultsContainerSimple\"></div><div class=\"\" show.bind=\"user.results.showAdvanced\" id=\"resultsContainerAdvanced\"></div><div class=\"\" show.bind=\"user.results.showGoalsChart\" id=\"fiveYearGoalsContainer\"></div><div class=\"\" show.bind=\"user.results.showExpenses\" id=\"fiveYearExpensesContainer\"></div><div class=\"form-group\" style=\"padding-top:3vmin\"><select class=\"form-control\" value.bind=\"option\" change.delegate=\"showChart(option)\" style=\"font-weight:700;font-size:1em;height:3.3em\"><option repeat.for=\"option of chartOptions\">${option.text}</option></select></div></div><div class=\"col-md-6\"><div class=\"\" show.bind=\"!user.results.showAdvancedRecommended\" id=\"recommendedContainer\"></div><div class=\"\" show.bind=\"user.results.showAdvancedRecommended\" id=\"recommendedContainerAdvanced\"></div><div class=\"form-group\" style=\"padding-top:3vmin\"><select class=\"form-control\" value.bind=\"option\" change.delegate=\"showRecommendedChart(option)\" style=\"font-weight:700;font-size:1em;height:3.3em\"><option>Recommended Simple Budget</option><option>Recommended Advanced Budget</option></select></div></div><br><br></template>"; });
define('text!results/compose/compose-recommendations.html', ['module'], function(module) { module.exports = "<template><br style=\"clear:both\"><div class=\"${user.recommend.messageStyle}\"><b>${user.recommend.message}</b><br><br><button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#changes\">See Recommended Changes</button><div class=\"modal fade\" id=\"changes\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\"><b>Monthly Changes</b></h4></div><div class=\"modal-body\"><div class=\"row\"><div class=\"col-md-6\"><h5><b>Home Changes</b></h5><div repeat.for=\"homeChange of currentHomeChanges\" class=\"${user.recommend.homeChanges[homeChange.slice(0,-1)] < 0 ? 'decreasing' : 'adding'}\">${homeChange.charAt(0).toUpperCase() + homeChange.slice(1)} ${modelHomeChanges[$index]}</div></div><div class=\"col-md-6\"><h5><b>Transportation Changes</b></h5><div repeat.for=\"carChange of currentCarChanges\" class=\"${user.recommend.carChanges[carChange.slice(0,-1)] < 0 ? 'decreasing' : 'adding'}\">${carChange.charAt(0).toUpperCase() + carChange.slice(1)} ${modelCarChanges[$index]}</div></div></div><hr><div class=\"row\"><div class=\"col-md-6\"><h5><b>Health Changes</b></h5><div repeat.for=\"healthChange of currentHealthChanges\" class=\"${user.recommend.healthChanges[healthChange.slice(0,-1)] < 0 ? 'decreasing' : 'adding'}\">${healthChange.charAt(0).toUpperCase() + healthChange.slice(1)} ${modelHealthChanges[$index]}</div></div><div class=\"col-md-6\"><h5><b>Discretionary Changes</b></h5><div repeat.for=\"discretionaryChange of currentDiscretionaryChanges\" class=\"${user.recommend.discretionaryChanges[discretionaryChange.slice(0,-1)] < 0 ? 'decreasing' : 'adding'}\">${discretionaryChange.charAt(0).toUpperCase() + discretionaryChange.slice(1)} ${modelDiscretionaryChanges[$index]}</div><h5 class=\"${user.recommend.expensesChange < 0 ? 'decreasing' : 'adding'}\"><b>Yearly Expense Change: ${modelExpenseChange}</b></h5><h5 style=\"color:#3c763d\"><b>Savings Change: $${user.recommend.savingsChange.toFixed(2)}</b></h5></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></div></template>"; });
define('text!results/compose/compose-table.html', ['module'], function(module) { module.exports = "<template><hr style=\"clear:both\"><div style=\"width:100%;margin:0 auto\" class=\"table-outter\"><table class=\"table table-bordered box-shadow--6dp\"><thead class=\"bg-primary\"><tr style=\"font-size:20px\"><th style=\"text-align:center\" repeat.for=\"expense of user.results.recommendedResults.length\">${user.results.recommendedResults[expense][0]}</th><th style=\"text-align:center\">Savings</th></tr></thead><tbody><tr><td repeat.for=\"amount of user.results.recommendedResults.length\"><div style=\"text-align:center\"><strong>$ ${user.expenses['total' + user.results.recommendedResults[amount][0] + 'Expense']}</strong></div><hr><div style=\"height:300px;overflow-y:scroll\"><div repeat.for=\"expense of constants[user.results.recommendedResults[amount][0] + 'Expenses']\" class=\"form-group\"><label>${expense.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.expenses[expense.value]\" disabled.bind=\"!user.expenses[expense.value + 'lock']\" change.delegate=\"checkValue(user.expenses, user.expenses[expense.value], expense, user.results.recommendedResults[amount][0])\" class=\"form-control ${user.expenses[expense.value + 'check'] ? 'alert-success' : 'alert-danger'}\"></div><br></div></div></td><td><div style=\"text-align:center\"><strong>$ ${user.personalInfo.savingsPerMonth * 12}</strong></div><hr><div class=\"form-group\"><label for=\"privateSchool\">Savings Per Month</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.savingsPerMonth\" class=\"form-control\"></div><br></div><div show.bind=\"user.results.showGoals\" style=\"height:200px;overflow-y:scroll\"><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><div class=\"form-group\"><label for=\"privateSchool\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control ${user.results[wish.value + 'MetGoal'] ? 'alert-success' : 'alert-danger'}\"></div></div><br></div></div></div></td></tr></tbody></table></div><div style=\"width:45%;margin:0 auto;text-align:center\" class=\"alert alert-success\" role=\"alert\"><strong>This means your expense is lower than average or you meet your goal</strong></div><div style=\"width:45%;margin:0 auto;text-align:center\" class=\"alert alert-danger\" role=\"alert\"><strong>This means your expense is higher than average or you didn't meet your goal</strong></div></template>"; });
//# sourceMappingURL=app-bundle.js.map