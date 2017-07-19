var screenW = window.innerWidth,
    xCenter = screenW/2,
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

animationContainer.insertBefore(emojiGun1,animationContainer.firstChild);
animationContainer.insertBefore(emojiGun2,animationContainer.firstChild);
animationContainer.insertBefore(emojiGun3,animationContainer.firstChild);

animationContainer.appendChild(emojiExplosion2);
animationContainer.appendChild(emojiExplosion3);

var tl = new TimelineMax({repeat:-1})
        .to([emojiMoney,emojiGun1,emojiGun2,emojiGun3,emojiExplosion1,emojiExplosion2,emojiExplosion3], 0, {display:'none'})
        .to(emojiAnimation, 0, {display:'block'})
        .from(emojiBank, 1, {autoAlpha:0, rotationX:-90, delay:0.5,ease:Power4.easeOut})
        .fromTo(emojiRobber, 1.5, {left:screenW+100}, {left:xCenter+110, delay:1, ease:Power4.easeOut})
        .fromTo(emojiGun, 1.5, {display:'none',left:screenW+100}, {display:'block',left:xCenter+110, ease:Power4.easeOut},2.5)
        .to(emojiRobber, 0.5, {left:xCenter+190, ease:Back.easeOut, delay:1})
        .fromTo(emojiGun, 0.5, {rotation:-45,left:xCenter+125},{rotation:0,left:xCenter+110,ease:Back.easeOut,delay:-0.5})
        .to(emojiRobber, 0.5, {left:xCenter, delay:1})
        .to(emojiGun, 0.25, {left:xCenter, delay:-0.5})
        .to(emojiGun, 0, {rotationY:-180,display:'none'})
        .to(emojiRobber, 0, {display:'none'})
        .to(emojiBank, 0.1, {left:xCenter-10,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter+10,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter-20,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter+20,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter,ease:Power4.easeOut})
        .to(emojiBank, 0.1, {left:xCenter-10,ease:Power4.easeIn,delay:0.25})
        .to(emojiBank, 0.1, {left:xCenter+10,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter-20,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter+20,ease:Power4.easeIn})
        .to(emojiBank, 0.1, {left:xCenter,ease:Power4.easeOut})
        .to([emojiGun,emojiRobber,emojiMoney], 0, {display:'block'})
        .to(emojiGun, 0.6, {left:xCenter+330,delay:0.5})
        .to(emojiRobber, 0.4, {left:xCenter+220,delay:-0.4})
        .to(emojiMoney, 0.2, {left:xCenter+110,delay:-0.2})
        .fromTo(emojiCar, 0.5, {left:screenW+100}, {left:xCenter+440, delay:1, ease:Power4.easeOut})
        .to(emojiMoney, 0.6, {left:xCenter+440,delay:0.5})
        .to(emojiRobber, 0.4, {left:xCenter+440,delay:-0.6})
        .to(emojiGun, 0.2, {left:xCenter+440,delay:-0.6})
        .to([emojiGun,emojiRobber,emojiMoney], 0, {display:'none'})
        .to(emojiCar, 0.5, {rotationY:-180,ease:Power4.easeInOut})
        .to(emojiCar, 0.25, {left:screenW+110,ease:Power4.easeIn})
        .to(emojiBank, 0.75, {left:'-=220', autoAlpha:0, ease:Power4.easeIn,delay:-0.5})
        .to(emojiCar, 0, {rotationY:0})
        .to(document.getElementsByTagName('body')[0],0.5,{backgroundColor:'#009ACD'})
        .to(emojiCar, 2, {left:-220,ease:Power1.easeIn})
        .fromTo(emojiPolice, 2, {left:screenW+220},{left:-110,delay:-2,ease:Power1.easeIn})
        .to(emojiCar, 0, {rotationY:-180,delay:0.5})
        .fromTo(emojiPolice1, 1, {left:screenW+220},{left:xCenter-110,ease:Power4.easeOut})
        .fromTo(emojiPolice2, 1, {left:screenW+220},{left:xCenter,ease:Power4.easeOut,delay:-0.75})
        .fromTo(emojiPolice3, 1, {left:screenW+220},{left:xCenter+110,ease:Power4.easeOut,delay:-0.75})
        .to(emojiCar, 1, {left:xCenter-360,ease:Back.easeOut,delay:-1})
        .to(emojiGun1, 0, {display:'block',rotation:-45,left:xCenter-110})
        .to(emojiGun1, 0.5, {rotation:0, ease:Back.easeOut})
        .to(emojiPolice1, 0.5, {left:xCenter-10,ease:Power4.easeInOut,delay:-0.5})
        .to(emojiPolice2, 0.5, {left:xCenter+100,ease:Power4.easeInOut,delay:-0.5})
        .to(emojiPolice3, 0.5, {left:xCenter+210,ease:Power4.easeInOut,delay:-0.5})
        .to(emojiGun2, 0, {display:'block',rotation:-45,left:xCenter+100})
        .to(emojiGun2, 0.5, {rotation:0,ease:Back.easeOut})
        .to(emojiPolice2, 0.5, {left:xCenter+210,ease:Power4.easeInOut,delay:-0.5})
        .to(emojiPolice3, 0.5, {left:xCenter+320,ease:Power4.easeInOut,delay:-0.5})
        .to(emojiGun3, 0, {display:'block',rotation:-45,left:xCenter+320})
        .to(emojiGun3, 0.5, {rotation:0,ease:Back.easeOut})
        .to(emojiPolice3, 0.5, {left:xCenter+420,ease:Power4.easeInOut,delay:-0.5})
        .to(emojiExplosion1, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay: 0.25})
        .to(emojiExplosion2, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.025})
        .to(emojiExplosion3, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.05})
        .to(emojiExplosion1, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.075})
        .to(emojiExplosion2, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.1})
        .to(emojiExplosion3, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.125})
        .to(emojiExplosion1, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.15})
        .to(emojiExplosion2, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.175})
        .to(emojiExplosion3, 0, {display:'block',marginTop:(Math.random()*120)-100,left:xCenter-220-(Math.random()*120), delay:0.2})
        .to(emojiExplosion1, 0, {display:'none',delay:0.025})
        .to(emojiExplosion2, 0, {display:'none',delay:0.025})
        .to(emojiExplosion3, 0, {display:'none',delay:0.025})
        .to(emojiCar, 0.5, {rotation:180,ease:Elastic.easeOut,delay:0.5})
        .to(document.getElementsByTagName('body')[0], 0.5,{backgroundColor:'#c21c3b'})
        .fromTo(emojiAmbulance, 0.5, {left:-220, ease:Power4.easeOut,rotationY:180,delay:0.5},{left:xCenter-360, delay:1})
        .to(emojiGun1, 0.5, {left:xCenter-10,ease:Power4.easeInOut,delay:0.5})
        .to(emojiGun2, 0, {left:xCenter+210,ease:Power4.easeInOut,delay:-0.25})
        .to(emojiGun3, 0, {left:xCenter+420,ease:Power4.easeInOut,delay:-0.25})
        .to([emojiPolice1,emojiPolice2,emojiPolice3], 0.25, {rotationY:180,delay:-0.1})
        .to([emojiCar,emojiGun1,emojiGun2,emojiGun3], 0, {display:'none',delay:0.5})
        .to(emojiAmbulance, 0.5, {left:screenW+100,ease:Power2.easeIn})
        .to(emojiPolice1, 0.5, {left:screenW+300,ease:Power2.easeIn,delay:-0.5})
        .to(emojiPolice2, 0.5, {left:screenW+500,ease:Power2.easeIn,delay:-0.5})
        .to(emojiPolice3, 0.5, {left:screenW+700,ease:Power2.easeIn,delay:-0.5})
        .from(emojiHospital, 0.5, {autoAlpha:0,delay:0.5})
        .to(emojiAmbulance, 0, {rotationY:0})
        .to(emojiAmbulance, 1, {left:xCenter,ease:Power4.easeOut,delay:0.5})
        .from(emojiFearful, 0.5, {autoAlpha:0,delay:1.5})
        .fromTo(emojiGavel, 0.5, {left:screenW+100},{left:xCenter+110,ease:Power4.easeOut})
        .to(emojiGavel,0.25,{marginTop:'-=36',rotation:30,ease:Power4.easeOut,delay:-0.25})
        .to(emojiGavel,0.5,{marginTop:'+=36',rotation:0,ease:Bounce.easeOut,delay:0.25})
        .from(emojiCrying, 0.5, {autoAlpha:0})
        .from(jailbars, 1, {top:-150,ease:Bounce.easeOut})
        .to(document.getElementsByTagName('body')[0],1,{backgroundColor:'#666',delay:-1})
        .to([emojiFearful,emojiHospital,emojiAmbulance], 0, {display:'none'})
        .to([emojiCrying, jailbars, emojiGavel], 1,{rotationX:90,autoAlpha:0,ease:Power4.easeIn,delay:2})
        .to(document.getElementsByTagName('body')[0],1,{backgroundColor:'#000'})
        .to(document.getElementsByTagName('body')[0],1,{backgroundColor:'#5bb12f',delay:0.5});