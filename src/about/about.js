import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';

@inject(Router, User)
export class about {
    constructor(router, user) {
        this.router = router;
        this.user = user;
    }
  start() {
    if ($(window).width() < 800) {
      //let self = this;
      this.user.personalInfo.widthGreaterThan800=false;
      console.log(this.user.personalInfo.widthGreaterThan800);
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
          callback: (result) => {
            if (result){
              console.log(result);
              // this.user.personalInfo.showNavbar = true;
              this.router.navigate('#/personalinfo');
            }
          }
      });
      
    }
    else{
          // this.user.personalInfo.showNavbar = true;
         this.router.navigate('#/personalinfo');
    }

 // bootbox.alert('Your screen size is not recommended for this application. Please switch to a larger screen for the best experience.', () => {
      //   console.log('bootbox alert');
      // });
      
      // alert("Your screen size is not recommended for this application. Please switch to a larger screen for the best experience.");
  }
    attached() {
        this.user.personalInfo.showNavbar = true;
    }
}