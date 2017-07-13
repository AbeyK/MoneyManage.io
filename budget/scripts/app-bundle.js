define('app',['exports', 'jquery', 'bootstrap'], function (exports, _jquery) {
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

        personalinfo.prototype.attached = function attached() {
            this.slider.createAgeSlider();
        };

        return personalinfo;
    }()) || _class);
});
define('expenses/expenses',['exports', 'aurelia-framework', 'aurelia-router', '../services/user'], function (exports, _aureliaFramework, _aureliaRouter, _user) {
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

    var expenses = exports.expenses = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function expenses(router, user) {
        _classCallCheck(this, expenses);

        this.router = router;
        this.user = user;
    }) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', 'highcharts'], function (exports, _aureliaFramework, _aureliaRouter, _user, _highcharts) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    var HighCharts = _interopRequireWildcard(_highcharts);

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

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function () {
        function results(router, user) {
            _classCallCheck(this, results);

            this.router = router;
            this.user = user;
        }

        results.prototype.attached = function attached() {
            this.createChart('resultsContainer');
        };

        results.prototype.createChart = function createChart(containerID) {
            Highcharts.chart(containerID, {

                title: {
                    text: 'Solar Employment Growth by Sector, 2010-2016'
                },

                subtitle: {
                    text: 'Source: thesolarfoundation.com'
                },

                yAxis: {
                    title: {
                        text: 'Number of Employees'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Installation',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: 'Manufacturing',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Sales & Distribution',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: 'Project Development',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: 'Other',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }]
            });
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
    };
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
                min: 0,
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

        this.expense = 10;
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

                this.age = 30;
                this.income = 0;

                this.goalsList = ["Private School", "College", "Wedding", "Vacation", "Boat", "New Car", "Other"];
                this.checkSchool = false;
                this.PrivateSchool = 0;

                this.checkCollege = false;
                this.College = 0;

                this.checkWedding = false;
                this.Wedding = 0;

                this.checkVacation = false;
                this.Vacation = 0;

                this.checkBoat = false;
                this.Boat = 0;

                this.checkCar = false;
                this.NewCar = 0;

                this.checkOther = false;
                this.Other = 0;

                this.currentGoals = [];
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

        this.result = 10;
    };
});
define('aboutyou/compose-age',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ComposeAge = exports.ComposeAge = function ComposeAge() {
        _classCallCheck(this, ComposeAge);
    };
});
define('aboutyou/compose-personal-info',["exports"], function (exports) {
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
define('aboutyou/compose-goals',["exports"], function (exports) {
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"highcharts/css/highcharts.css\"></require><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/style.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><h4 style=\"padding-right:15px\">MyBudget</h4></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div></div></nav><router-view></router-view></template>"; });
define('text!css/style.css', ['module'], function(module) { module.exports = "#personalinfo, #expenses, #results {\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    width: 60%;\r\n}\r\n"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><div id=\"personalinfo\"><compose view-model=\"./compose-personal-info\"></compose><compose view-model=\"./compose-goals\"></compose></div></template>"; });
define('text!expenses/expenses.html', ['module'], function(module) { module.exports = "<template><div id=\"expenses\"><h1>Expenses</h1></div><head><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script></head><body><div class=\"container\"><p><strong>Note:</strong> The <strong>data-parent</strong> attribute makes sure that all collapsible elements under the specified parent will be closed when one of the collapsible item is shown.</p><div class=\"panel-group\" id=\"accordion\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\">Home</a></h4></div><div id=\"collapse1\" class=\"panel-collapse collapse in\"><div class=\"panel-body\"><div class=\"form-group\"><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\">Car/Transportation</a></h4></div><div id=\"collapse2\" class=\"panel-collapse collapse\"><div class=\"panel-body\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\">Health</a></h4></div><div id=\"collapse3\" class=\"panel-collapse collapse\"><div class=\"panel-body\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\">Discretionary Expenses</a></h4></div><div id=\"collapse4\" class=\"panel-collapse collapse\"><div class=\"panel-body\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div></div></div></div></div></div></body></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><div id=\"resultsContainer\"></div></div></template>"; });
define('text!aboutyou/compose-age.html', ['module'], function(module) { module.exports = "<template><p>Age Compose!!!</p></template>"; });
define('text!aboutyou/compose-personal-info.html', ['module'], function(module) { module.exports = "<template><h2>Personal Info</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><div class=\"form-group\"><label for=\"salary\">Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.income\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></template>"; });
define('text!aboutyou/compose-goals.html', ['module'], function(module) { module.exports = "<template><hr><h2>Goals</h2><div id=\"drag-and-drop-container\" style=\"clear:both\"><div id=\"availableGoals\" style=\"height:500px;background-color:orange;border:solid 1px\" class=\"col-md-6\"><h1>Wishes</h1><hr><div class=\"row col-md-4 col-md-push-4\" dragstart.trigger=\"drag($event)\"><div repeat.for=\"goal of user.personalInfo.goalsList\" class=\"row\"><div class=\"current-buttons btn btn-primary\" draggable=\"true\">${goal}</div><br><br></div></div></div><div style=\"height:500px;background-color:orange;border:solid 1px;overflow-y:scroll\" class=\"col-md-6\" drop.trigger=\"drop($event)\" dragstart.trigger=\"drag($event)\" dragover.trigger=\"allowDrop($event)\"><h1>My Wishes</h1><hr><div repeat.for=\"wish of constants.wishes\"><div show.bind=\"user.personalInfo[wish.check]\"><h3>${wish.title}</h3><button click.delegate=\"remove(wish.title)\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"privateSchool\">Amount for ${wish.title}</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo[wish.value]\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div></div><div id=\"myGoals\" style=\"width:100%;height:30%;background-color:gray\"><div id=\"myGoals\" style=\"text-align:center;vertical-align:middle;line-height:150px\">Add Wish Here</div></div><br></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map