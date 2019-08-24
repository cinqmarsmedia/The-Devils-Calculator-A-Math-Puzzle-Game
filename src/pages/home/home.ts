import { Component, ViewChild } from "@angular/core";
import { NavController, AlertController, Platform } from "ionic-angular";

import { LoadingController } from 'ionic-angular';
//import { Subscription } from 'rxjs';
//import { Haptic } from 'ionic-angular';
import { DeviceFeedback } from "@ionic-native/device-feedback";
import { TapticEngine } from "@ionic-native/taptic-engine";
import { InAppPurchase } from "@ionic-native/in-app-purchase";
import { LaunchReview } from '@ionic-native/launch-review';
import 'chartjs-plugin-zoom';
//import { HttpClient } from '@angular/common/http';
//import { HostListener } from '@angular/core';

import { Storage } from "@ionic/storage";
import { Chart } from "chart.js";
import { slideInstructions } from "./../../constants";
import { vulgarities } from "./../../constants";
import { errors } from "./../../constants";
import { mockings } from "./../../constants";
import { impatient } from "./../../constants";
//import { disallowed } from './../../constants';
import { onfire } from "./../../constants";
import { newchart } from "./../../constants";

import { mathfacts } from "./../../constants";
import { tooltiplist } from "./../../constants";

import { gameFunctions } from "../../functionData";
import { levelData } from "../../gameData";

//import { firebaseData } from '../../gameData'; // remove

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
//import { Observable } from 'rxjs/Observable';
//import { NgZone } from '@angular/core';

import { Slides } from "ionic-angular";

import * as howler from "howler";

import { first } from 'rxjs/operators';
import { MathsProvider } from "../../providers/maths/maths";
import { SafeEvalProvider } from "../../providers/safe-eval/safe-eval";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  //@ViewChild('notesInput') myInput ;
  @ViewChild("lineCanvas") lineCanvas;

  @ViewChild(Slides) slides: Slides;

  handleKeyboardEvent(event: KeyboardEvent) {

if (typeof this.prompt._state!== 'undefined' && this.prompt._state==3){return}


    if (this.block || this.creation) {
      return;
    }

    if (this.notes){
      if (event.key=="Escape"){
        this.notesButton();
      }
        return;
    }

    if (this.ads[0] || this.ads[1] || this.ads[2] || this.ads[3]){
      return
    }

    if (this.slideshowstate.length > 0){
      //alert(event.key);
if (typeof this.slides == 'undefined' || this.filmleader){
return
}

this.slides.enableKeyboardControl(false);

      if (event.key == "d" || event.key == "ArrowRight"){this.nextSlide()}
      if (event.key == "a" || event.key == "ArrowLeft"){this.prevSlide()}
        //event.preventDefault(); // NOT WORKING
      return;
    }else{


    if (event.key == "ArrowRight"){
      this.helpButton();
    }

    if (event.key == "ArrowLeft"){
      this.notesButton();
    }

    if (event.key == "ArrowUp" || event.key == "ArrowDown"){
      this.graphs()
    }

    if (event.key == "*" && isNaN(this.level)){
      this.forceFirebase();
    }

    if (!isNaN(parseInt(event.key))) {
      this.btnClicked(event.key);
    }
    if (event.key == "_") {
      //this.btnClicked(event.key);
      this.muteSFX()
    }
    if (event.key == "#") {
      this.openCalc()
      //this.btnClicked(event.key);
    }
    if (event.key == ".") {
      this.btnClicked(event.key);
    }
    if (event.key == "-") {
      //this.btnClicked(event.key);
      this.btnClicked("negate");
    }
    if (event.key == "Enter" || event.key == "=") {
      event.preventDefault();
      this.btnClicked("=");
    }
    if (
      event.key == "Backspace" ||
      event.key == "Escape" ||
      event.key == "c"
    ) {
      event.preventDefault();
      this.btnClicked("C");
    }

    if (event.key == "ç" || event.key == "C" || event.key == "Delete") {
      this.btnClicked("AC");
    }
    if (event.key == "!") {
      this.btnClicked("MR1");
    }
    if (event.key == "@") {
      this.btnClicked("MR2");
    }
    if (event.key == "#") {
      this.btnClicked("MR3");
    }
    if (event.key == "¡") {
      this.btnClicked("MS1");
    }
    if (event.key == "™") {
      this.btnClicked("MS2");
    }
    if (event.key == "£") {
      this.btnClicked("MS3");
    }

    if (event.key == "a" || event.key == "[" || event.key == "j") {
      if (this.alphahidden){return}
      this.btnClicked("Δ");
    }

    if (event.key == "s" || event.key == "]" || event.key == "k") {
      if (this.betahidden){return}
      this.btnClicked("ψ");
    }

    if (event.key == "d" || event.key == "\\" || event.key == "l") {
      if (this.gammahidden){return}
      this.btnClicked("φ");
    }


  if (event.key == "A" || event.key == "{" || event.key == "J") {
      this.visualOperator(0);
    }

    if (event.key == "S" || event.key == "}" || event.key == "K") {
      this.visualOperator(1);
    }

    if (event.key == "D" || event.key == "|" || event.key == "L") {
    this.visualOperator(2);
    }

if (event.key == "p" || event.key == "P"){
 this.clipboardCopy();
    }

    if (event.key == "w" || event.key == "W"){

if (this.help){
this.holdScreen();
}else{
this.wolfram()
}
    }

    if (event.key == "o" || event.key == "O"){
this.oeis(true)
    }


    if (event.key == " ") {
      event.preventDefault();
    }
    }
  }

  Alpha: any = function() {};
  Beta: any = function() {};
  Gamma: any = function() {};
  devilString: string = "The Devil's Calculator";

  onResumeSubscription: any;
  onPauseSubscription: any;
  firebaseSubscription:any;

  ads:any=[false,false,false,false]  // synonymy (0) // upgrade (1) // politiTruth/Cham (2)
/*
  desktop: boolean = false;
  desktoptwo: boolean = false; // full screen on screen and hide numbers
*/

  items: any;
  itemsRef: AngularFireList<any>;

  DRM:boolean=false; 
  //steam:boolean=false;
  //posterad:boolean=false; // setup

  sfx: any =

{
    click: [
      new howler.Howl({ src: ["/assets/sfx/click1.mp3"] }),
      new howler.Howl({ src: ["/assets/sfx/click2.mp3"] }),
      new howler.Howl({ src: ["/assets/sfx/click3.mp3"] }),
      new howler.Howl({ src: ["/assets/sfx/click4.mp3"] }),
      new howler.Howl({ src: ["/assets/sfx/click5.mp3"] }),
      new howler.Howl({ src: ["/assets/sfx/click6.mp3"] })
    ],

    slide: new howler.Howl({ src: ["/assets/sfx/slide.mp3"] }),

    fire: new howler.Howl({
      src: ["/assets/sfx/fireshort.mp3"],
      loop: true,
      volume: 0
    }),

    compute: new howler.Howl({ src: ["/assets/sfx/compute.mp3"] }),
    nono: new howler.Howl({ src: ["/assets/sfx/nono.mp3"], volume: 0.4 }),
    win: new howler.Howl({ src: ["/assets/sfx/win.mp3"] }),
    poof: new howler.Howl({ src: ["/assets/sfx/smoke.mp3"] }),
    clear: new howler.Howl({ src: ["/assets/sfx/clear.mp3"] }),
    save: new howler.Howl({ src: ["/assets/sfx/save.mp3"] }),
    alarm: new howler.Howl({ src: ["/assets/sfx/alarm.mp3"] }),
    tick: new howler.Howl({ src: ["/assets/sfx/tick.mp3"] })
  };

  filmleader: boolean = false;

  targetvalue:any=666;

  //dialogueindex=0;
  // ----- creation variables ---- //
  creation: boolean = false;
  customlvlfunc: any = [null, null, null];
  customlvlformula: any = "";
  //customlvlauth:any=''
  //customlvlname:any=''
  customlvlhint: any = "";
  customlvlonfire: any = "";
  isNaN: any;
  overlaygif: any = false;
  //---------------------------------------
  wideview: boolean = false;
  //sixteennine:boolean=false;
  keyboardshort: boolean = false;
  notch: boolean = false;
  tablet: boolean = false;
  finalLevel: any = Object.keys(levelData).length;
  realLevel: any = 0;
  replayscreen: boolean = false;
  memoryrecalllast: boolean = false;
  flashonfire:boolean=false;
  //soul: any = 0;
  dlcPlayed:any=[];
  revealed:boolean=false;
  hint: boolean = false;
  graphdata: boolean = false;
  lineChart: any = null;
  levelhint: any = "";
  communityMode:boolean=false;
  graph: boolean = false;
  intervalfunc: any = null;
  result: any = "The Devil's Calculator";
  rated:boolean=false;
  level: any = 1; //debug
  equals: boolean = false;
  memory: any = [
    [null, [false, false, false]],
    [null, [false, false, false]],
    [null, [false, false, false]]
  ];
  skipped: any = [];
  operandState: any = [false, false, false];
  //regCalc:boolean=false;
  err: boolean = false;
  calcbuttons:any=['tools','levels','help'];
  nonotimeout: any;
  equation: any = "";
  block: any = false;
  help: boolean = false;
  notes: boolean = false;
  slide: number = 0;
  slideshowstate: any = [];
  helpText: any = "";
  Math:any=Math;
  hapticSupress:boolean=false;

  tutpop:any=[0,'67%','12%','70%','10%','Use this symbol with different inputs and look for patterns',false];

  notesObj:any={};
  notesText: any = ""; //

prompt:any={};

 //------------

  lastlvlkicker: any = 0;

  tempMemory: any = [null, []];
  historys: any = [];
  temphistorys: any = [];
  buttonDisallowState: any = [];
  alphahidden: boolean = false;
  betahidden: boolean = false;
  gammahidden: boolean = false;
  overflowstring: any = ""; // maybe
  randomnum: any = Math.floor(Math.random() * 1000);
  levelprompt:any=false;
  username: any = "";
  onlineLevels: any = [];
  dlcLevels:any=[];
  usernames: any = [];
  dlcMode:boolean=false;
  playedOnline: any = [];
  tooltip:any=false;
  //postgame:boolean=false;
  //fireuserkey:any=''
  nothingleft: boolean = false;
  lvlkey: any = null;
  onlinechallengecont: any = null;
  tempRez: any = "";
  memorysave: any = -1;
  levelanswer = "";
  onfirebtnsdesk = [];
  platformMobile: any = false;
  totalComputations:any=0;
  lvlcomputations:any=0;
  //answerreveal:boolean=false;
  //squat: boolean = false;
  graphPoints: any = [[], [], []];
  mobile: boolean = false;
  //unlockKey:any
  mute:boolean=false;
  lvltocompute:any="";
  //includes=window.includes();

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public deviceFeedback: DeviceFeedback,
    public taptic: TapticEngine,
    public iap: InAppPurchase,
    public platform: Platform,
   // public ngZone: NgZone,
    public launchReview: LaunchReview,
    public loadingCtrl: LoadingController,
    private mathsProvider: MathsProvider,
    private safeEval: SafeEvalProvider
    //public http: HttpClient
  ) {
//alert(Math.PI);
//this.fetchFirebase()
//this.dlcintro(null);

// console.log(this.safeEval.evaluate("2+2"));
// console.log(this.safeEval.evaluate("(Math.PI).toString().replace('.','')[4]"));

// function fn(a){
//   let x = a*2;
//   return x;
// }
// let safeFn = (this.safeEval.evaluate(fn));
// console.log(safeFn(25));

// let code = "a+4"
// let x = (a)=>{
//   return this.safeEval.evaluate(code, {a});
// }

//alert(this.wolframCloud("https://www.wolframcloud.com/objects/114d73d2-0e22-4588-87f3-b672ed8003a2",9));

if (this.level>60 || isNaN(this.level)){
   this.fetchFirebase();
}
    this.onResumeSubscription=this.platform.resume.subscribe((result)=>{//resume
if (this.result == "Build or Replay" || this.result== "Offline" || this.nothingleft){
  this.fetchFirebase();
}
this.block=false;
this.resumeFire();
    })


  this.onPauseSubscription=this.platform.pause.subscribe((result)=>{//Background
//console.log('backgroundpause');
this.setData(); //save

//this.sfx.fire.fade(0.5, 0, 2000);
this.sfx.fire.stop();
//this.sfx=null;// destory audio

//setInterval(()=>{console.log('testInterval')},1000)// test interval
      });



/*
  this.platform.ready().then(() => {})
*/

    // https://ionicframework.com/docs/native/in-app-purchase/

    // in-app purchase...

    // public zone:NgZone, public haptic: Haptic
    // set a key/value


    this.isNaN = isNaN;

    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.mobile = false;
      //this.desktop = true;
    } else {
      //this.desktop = false;
      this.mobile = true;
    }
//this.mobile=true;
/*
if (this.notesText == "" || this.notesText.length<5) {
        this.setNotes(!this.mobile);
}
*/
    // debug section --------

    //-----------------------

    this.platformMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone|iPad|iPod/i);

    //this.loadsfx();
    //this.fetchFirebase();
    this.dimensions();

    //this.slides.lockSwipes(true);

    if (!this.platformMobile) {
      window.onresize = () => {
        this.dimensions();
      };
    }

    // Or to get a key/value pair
    storage.get("data").then(val => {
      if (val) {
        this.unwrapVariables(val);
        //let x = this;
        //this=val;
        /*
//console.log(this);
 this.level=parseInt(val.level);
 this.notesText=val.notesText;
 this.playedOnline=val.playedOnline;
 this.username=val.username;
 this.postgame=val.postgame
  */
        //this.onlineLevels=val.onlineLevels
        //alert(this.username);
      } else {
        this.levelState();
      }
    });
  }

ngOnDestroy() {
    // always unsubscribe your subscriptions to prevent leaks
this.onResumeSubscription.unsubscribe();
this.onPauseSubscription.unsubscribe();
this.firebaseSubscription.unsubscribe();
}

closeTut(){

if (this.tutpop[0]==2){
this.tutpop[0]=0;
setTimeout(()=>{
        this.tutpop=[3,'76%','10%','70%','10%','What number plus four is 666? Use it to calculate 666 and win.',true];
      },0);

}else{
this.tutpop[0]=0;
}


}

evalValidator(expression){
  return null
}

eduPrompt(){
//this.mobile=true; // just for debugging ()()
let message
  if (this.mobile){
message="Our non-profit makes our games available free to educators and students. Send code that unlocks the full game to your edu or ac email"
  }else{
message="Our non-profit makes our games available free to educators and students. Send a steam key for the full game to your edu or ac email"
  }

this.prompt = this.alertCtrl.create({
        title: 'EDU|AC Address',
        message:message,
        inputs: [
          {
            name: "email",
            placeholder: 'euler@college.edu'
          }
        ],
        buttons: [
         {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: "Send",
            handler: data => {
              // send email to server
            }
          }

        ]
      });
      this.prompt.present();




}


unlockHold(){

this.prompt = this.alertCtrl.create({
        title: 'Enter Student|Teacher Code',

        message:"Our non-profit makes our games freely available to students and teachers. Enter Code:",
        inputs: [
          {
            name: "code",
            placeholder: 'L5X13QFS'
          }
        ],
        buttons: [
         {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: "Enter",
            handler: data => {

if (this.secretCode(data.code,false)){
//this.result="EDU Unlock"
this.keyboardshort=false;
this.graph=false;
this.resetCalcButtons();
return true;
}else{
  alert('Code Incorrect, Check again');
  return false;
}

            }
          }

        ]
      });
      this.prompt.present();
}

getCodes(param){
// secret code encoding process, hardcoded below
return ["1H3S9XA8", "9TQ6Q0FD"];
}


secretCode(code,quickexpiry){

  if (!this.DRM){
  this.tutorialPrompt('Full Game already Unlocked');
  return true;
}

var realCodes=this.getCodes(quickexpiry);

if (code==realCodes[0] || code==realCodes[1]){

   this.adClose()
    this.DRM=false;

    if (this.level==22){
      this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
            this.historys = [];
            this.result='Level: 23';
            this.level=23;
            this.realLevel=23
            this.levelState();
    }
    this.setData();

this.tutorialPrompt('Full Game Unlocked Using Code!');
return true;
}else{
return false;
}


}


tutorialPrompt(html){

 this.prompt = this.alertCtrl.create({
        //title: 'tutorial',
        //subTitle: 'wowowow',
        message:html,
        buttons: [
         {
            text: "Guide",
            handler: data => {
              this.guide();
            }
          },
          {
            text: "Ok",
            handler: data => {}
          }

        ]
      });
      this.prompt.present();

}


resumeFire(){
      if (this.onfirebtnsdesk.length > 0 && !this.mute) {
      this.sfx.fire = new howler.Howl({
      src: ["/assets/sfx/fireshort.mp3"],
      loop: true,
      volume: 0
    });
      this.sfx.fire.play();
      this.sfx.fire.fade(0, 0.2, 2000)
    }
}

visualOperator(btn){
//alert();
//if (this.
if (btn==0){
  if (this.alphahidden){return}
this.slideshow(6, 8,true);
}else if (btn==1){
  if (this.betahidden){return}
this.slideshow(14, 16,true);
}else if (btn==2){
 if (this.gammahidden){return}
this.slideshow(23, 25,true);
}else if (btn==3){
this.slideshow(18, 19,true);
}
}

  setNotes(desktop) {
  let temp=''
  if (this.level>50){
    temp='OEIS'
  }else{
    temp='Desmos'
  }

    let template =
      "Welcome to the Devil's Calculator. Compute the integer '666' using all available operators (Δ,ψ,φ) to win a level. This space is for note taking and will save each level. Wolfram Alpha and "+temp+" are linked to below as resources. Hold the screen during play to launch a calculator, hold '+/-' to mute SFX and hold Δ,ψ,φ for info. Insert symbols here by typing";

    if (desktop) {
      this.notesText =
        template +
        " '[', ']' and '\\' respectively. Clear these notes by holding 'AC'.";
    } else {
      this.notesText =
        template +
        " '/', ':' and ';' respectively. Clear these notes by holding 'AC'.";
    }
  }

threeCalc(){
  this.help=false;
  this.resetCalcButtons();
  this.openCalc(true);
}



holdScreen(){
if (this.block || this.replayscreen || this.filmleader || this.slideshowstate.length>0){return}

 this.block=true;

var path

if (isNaN(this.level) && this.dlcMode){

this.dlcLevels.forEach((lvl)=>{
  if (lvl.dlc.id==this.onlinechallengecont){
   path=lvl.dlc;
  }
})


}else{
  path=levelData[this.level];
}

 if (typeof path == 'undefined'){
  path={wolfHint:"http://functions.wolfram.com/",wolfHelp:"http://mathworld.wolfram.com/topics/Puzzles.html"}
  }


if (this.result == "Build or Replay" || this.nothingleft){

window.open("https://www.wolframalpha.com/problem-generator/?scrollTo=Numbertheory", "_system", "location=yes");

}else{
if (this.hint){

  if (typeof path.wolfHint !== 'undefined'){

    if (path.wolfHint!==''){
      // window.open

var url
if (path.wolfHint.includes('.com')){
url=path.wolfHint
}else{
url="https://www.wolframalpha.com/input/?i="+encodeURIComponent(path.wolfHint)
}

      window.open(url, "_system", "location=yes");
    }
  }


//open up wolfram hint from database
// problem generator? Dynamic just open hint in wolfram? Or have separate thing? Or if not.. yeah.
}else if(this.help){
//open up wolfram link from database Dynamic just open hint in wolfram? Or have separate thing? Or if not.. yeah? If false?
//alert(levelData[this.level].wolfHelp);
  if (typeof path.wolfHelp !== 'undefined'){

    if (path.wolfHelp!==''){
      // window.open

      var url
if (path.wolfHelp.includes('.com')){
url=path.wolfHelp
}else{
url="https://www.wolframalpha.com/input/?i="+encodeURIComponent(path.wolfHelp)
}



      window.open(url, "_system", "location=yes");
    }
  }

}else if (this.graph){
//https://www.wolframalpha.com/input/?i=%5B1,2%5D,%5B2,3%5D,%5B3,4%5D

//----------------------

var points=[];

if (points.length<this.graphPoints[0].length){
  points=this.graphPoints[0];
}
if (points.length<this.graphPoints[1].length){
  points=this.graphPoints[1];
}
if (points.length<this.graphPoints[2].length){
  points=this.graphPoints[2];
}
var plot='plot[';

if (points.length){

points.forEach((point)=>{
  plot+='['+point.x+','+point.y+'],';
})

plot+=']';
plot=plot.replace(',]',']');

window.open("https://www.wolframalpha.com/input/?i="+plot, "_blank", "location=yes");
}
}else if(this.notes){

window.open("https://develop.open.wolframcloud.com/objects/wpc-welcome/ThingsToTryComputationalNotebook.nb#sidebar=none", "_blank", "location=yes");


}else{
  this.openCalc()
}
}

setTimeout(() => {this.block=false}, 1000);
}


  openCalc(bool:any=false){

   // open calculator
   if (this.level>14){
window.open("https://www.desmos.com/scientific", "_blank", "location=yes");
}else{
window.open("https://www.desmos.com/fourfunction", "_blank", "location=yes,contextIsolation=no");
}

  }

  dimensions() {
    //alert(window.innerWidth+' '+window.innerHeight);
    // listen for changes

    var ratio = window.innerWidth / window.innerHeight;

    if (ratio > 0.9) {
      this.wideview = true;

      /*
if (window.innerWidth/window.innerHeight>1.66){
  this.sixteennine=true;
}else{
  this.sixteennine=false;
}
*/
    } else if (ratio > 0.6 && ratio < 0.7) {
      //this.squat = true;
      this.tablet=false;
      this.wideview = false;

    } else if (ratio >= 0.7) {
      this.tablet = true;
      //this.squat = false;
      this.wideview = false;

    } else {
      this.tablet = false;
      //this.squat = false;
      this.wideview = false;

    }
    if (ratio < 0.5) {
      this.notch = true;
    } else {
      this.notch = false;
    }
  }

  nextSlide() {
    var speed = 1000;
    if (slideInstructions.notrans.includes(this.slide + 1) && this.level == 1 && this.slideshowstate.length==8) {

      var path='/assets/imgs/slides/Shot_';

      if (this.mobile){
        path='/assets/imgs/slides/compressed/Shot_';
      }
      this.overlaygif = path + String(this.slide + 1) + ".gif";
      speed = 0;
      /**/

      if (typeof slideInstructions.sfx[this.slide + 1] !== "undefined" && !this.mute) {
        this.sfx[slideInstructions.sfx[this.slide + 1]].play();
      }
      this.slide++;

      setTimeout(() => {
        this.slides.slideNext(speed);
      }, 500);

      return;
    } else {
      this.overlaygif = false;
    }
    //if (slideInstructions.notrans.includes(this.slide+1)){
    //speed=0;
    /*
if (typeof slideInstructions.sfx[this.slide+1] !== 'undefined'){
  this.sfx[slideInstructions.sfx[this.slide+1]].play();
}
*/
    //}else{
      if (!this.mute){
    this.sfx.slide.play();
  }
    //}

    if (this.slideshowstate.length !== this.slide) {

      this.slides.slideNext(speed); // speed (can skip slides)
      this.slide++;
    } else {
      this.doneSlide();
    }
  }

  prevSlide() {
    var speed = 1000;
    if (this.slide==0){return}
    //console.log(this.slide);
    if (slideInstructions.notrans.includes(this.slide) && this.level < 3) {
      this.overlaygif =
        "/assets/imgs/slides/slide" + String(this.slide) + ".gif";
      speed = 0;
    } else {
      this.overlaygif = false;
    }
if (!this.mute){
    this.sfx.slide.play();
}
    this.slides.slidePrev(speed); //speed

    this.slide--;
  }

  doneSlide() {
    //skip

    //this.sfx.projector.fade(1, 0, 2000);
    this.filmleader = true;

    if (this.level > 2 && this.level < 66) {
      this.result = "Level: " + this.level;
    }

    if (this.level==1 && this.realLevel==0 && this.historys.length==0){
this.tutpop[0]=1;
    }

    setTimeout(() => {
      this.filmleader = false;
this.resetCalcButtons();
      this.slideshowstate = [];
      this.slide = 0;

      if ((this.level == 68 || isNaN(this.level))
      ) {
        this.help = true;
        this.result = "PostGame";
        this.tooltip='<b>*</b> Create your own levels and play ones others have made!'
        //this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
        this.tooltip=false;
        this.setData();


//-
if (this.skipped.length<5){
 this.prompt = this.alertCtrl.create({
        title: 'Congratulations!',
        //subTitle: 'wowowow',
        message:'Wow!! We are really impressed! Less than 1% of players make it this far, but the game isn\'t over yet! Now that you\'ve won the game, your custom levels will be given more visibility. New DLC is always coming out, so follow us on twitter and say "hi" so we can congratulate you once again!<br><br><a href="https://twitter.com/devilscalc"><img class="twitfollow" src="assets/imgs/twit.png"></a>',
        buttons: [

          {
            text: "dismiss",
            handler: data => {}
          }

        ]
      });

      this.prompt.present();

}

      }
    }, 600);
  }

ratingPop(){
  let loading = this.loadingCtrl.create({
    //spinner: 'bubbles',
    //content: ''
  });

  loading.present();


     let alert = this.alertCtrl.create({
    title: 'Please Rate and Review',
    message: 'If you are enjoying the game, please rate and/or review. Your feedback helps expose the project to others',
    buttons: [
      {
        text: 'Later',
        //role: 'cancel',
        handler: () => {
         loading.dismiss();
        }
      },
      {
        text: 'Ok',
        handler: () => {
          this.rated=true;
          this.setData();
          loading.dismiss();
          if (this.mobile){
              this.launchReview.launch().then((result) => {
                  this.rated=true;
                  this.setData();
              });
            }else{
          window.open("https://store.steampowered.com/app/1014280/The_Devils_Calculator/", "_system", "location=yes");
            }

        }
      }
    ]
  });
  alert.present();
  }

  promptRating(){

if (this.mobile){
  // fallback?
if(this.launchReview.isRatingSupported()){
  this.launchReview.rating()
}else{
this.ratingPop();
}}else{
this.ratingPop();
}


}


  ionViewDidLoad() {
    //alert(this.hint);
    //this.levelState()
    Chart.defaults.global.defaultFontFamily = "Ticking Timebomb BB";
    Chart.defaults.global.defaultFontColor = "rgba(255,50,50,.8)";
    //Chart.canvas.parentNode.style.height = '128px';
  }

  wrapVariables() {
    var persist = [
      "DRM",
      "mute",
      "memory",
      "totalComputations",
      //"notesText",
      "notesObj",
      "onlinechallengecont",
      "nothingleft",
      "playedOnline",
      "gammahidden",
      "betahidden",
      "alphahidden",
      "buttonDisallowState",
      "historys",
      "tempMemory",
      "targetvalue",
      "rated",
      "dlcPlayed",
     // "tooltip",
      //"helpText",
      //"equation",
      "operandState",
      "equals",
      "level",
      "result",
      "levelhint",
      "realLevel",
      "memoryrecalllast",
      "graphdata",
      "username",
      "usernames",
      "onlineLevels",
      "levelanswer",
      //"onfirebtnsdesk",
      "skipped",
      "graphPoints",
      "dlcLevels",
      "dlcMode",
      "communityMode"
    ];

    /*
,'answerreveal'
,'onlineLevels'

,'lineChart'
*/
    let state = {};
    /*
if (typeof this.lineChart !== 'undefined'){
   state={graph:[this.lineChart.data.datasets[0].data,this.lineChart.data.datasets[1].data,this.lineChart.data.datasets[2].data]}
 }else{
   state={}
 }
  state={}
 */

    /**/
    persist.forEach(prop => {
      state[prop] = this[prop];
    });

    return state;
  }

  unwrapVariables(state) {
    //console.log('state',state);
    /**/
    for (var prop in state) {
      //if (prop!=='levels'){
      this[prop] = state[prop];
      //}
    }

    if (this.result == this.level) {
      this.result = "Level: " + this.level;
    }


this.resetCalcButtons()


    /*
if (typeof this.lineChart !== 'undefined'){
this.lineChart.data.datasets[0].data=state.graph[0]
this.lineChart.data.datasets[1].data=state.graph[1]
this.lineChart.data.datasets[2].data=state.graph[2]
}
*/

    /*
if (this.dialogueindex!==-1){
this.dialogueindex=0;
this.cutscene()

*/
    this.levelState(false,undefined,true);
  }

isGraphData(){
  return this.graphPoints[0].length>1 || this.graphPoints[1].length>1 || this.graphPoints[2].length>1;
}

resetCalcButtons(){
this.calcbuttons=['tools','levels','help'];

if (this.isGraphData()){
        this.calcbuttons[1]='graph';
      }else{

if (isNaN(this.level)){
if (String(this.level).substring(0,3).toUpperCase()=='DLC'){
 this.calcbuttons[1]='exit dlc';
}else if (this.realLevel!==0){
 this.calcbuttons[1]='exit lvl';
}

}

if (this.realLevel>this.level){
  this.calcbuttons[1]='exit lvl';
}
}


  }

adClose(){
  if (this.level==22){
    this.result='';
this.replay();
this.setData();
  }

this.ads=[false,false,false,false];
}

  fetchFirebase(bool: boolean = true) {
    //console.log('fb');

    this.itemsRef = this.db.list("items");
    //console.log(this.itemsRef);
    this.items = this.itemsRef.snapshotChanges();
//console.log(this.items);
    this.firebaseSubscription = this.items.pipe(first()).subscribe(items => { // .first() throws error

    //this.firebaseSubscription.unsubscribe(); // instead of .first()?


          // async from firebase
//console.log(items.length);
    //console.log(items);


    this.onlineLevels=[];
    this.dlcLevels=[];
    this.usernames=[];
      items.forEach((item, i) => {
        /**/


          let obj = item.payload.val();
          obj.key = item.key;
           //console.log(obj);
           if (typeof obj.dlc == 'undefined'){ // condition? DLC param?
             //console.log(obj)
          this.onlineLevels.push(obj);
          }else{
            // so you can test dlc levels before they're released
            if (obj.dlc.priority<1000 && obj.dlc.priority>0){ // should be 1000?
            this.dlcLevels.push(obj)
            }
          }

      if (typeof obj.name !== 'undefined'){

var n = obj.name.indexOf(' ');
var nm = obj.name.substring(0, n != -1 ? n : obj.name.length);

        if (!this.usernames.includes(nm)){
          this.usernames.push(nm);
        }
}
        //this.onlineLevels.push(item);
      });
      //console.log(this.onlineLevels);
      //console.log(this.usernames);
      /**/
      if (bool) {
        //alert(this.onlineLevels);
        this.levelState(true);
      }
    });
  }

  setData() {
    let store = this.wrapVariables();
    this.storage.set("data", store); //,onlineLevels:this.onlineLevels

    /*
{level:this.level,notesText:this.notesText,playedOnline:this.playedOnline,username:this.username,postgame:this.postgame}
*/
  }

  textareasanitize(txt) {
    if (
      txt[txt.length - 1] == "[" ||
      (txt[txt.length - 1] == "/" && !this.wideview)
    ) {
      this.notesText = txt.slice(0, -1) + "Δ";
    }

    if (
      txt[txt.length - 1] == "]" ||
      (txt[txt.length - 1] == ":" && !this.wideview)
    ) {
      this.notesText = txt.slice(0, -1) + "ψ";
    }

    if (
      txt[txt.length - 1] == "\\" ||
      (txt[txt.length - 1] == ";" && !this.wideview)
    ) {
      this.notesText = txt.slice(0, -1) + "φ";
    }
  }

slideshow(start, end, noleader:boolean=false) {

this.calcbuttons=['back','','next'];
this.notes=false;
this.graph=false;
this.help=false;
//alert(start);
//if (start==1 && this.mobile){noleader=true}

this.slideshowstate=[];
if (!noleader){
    this.filmleader = true;
    var timeout=2200;
}else{
  timeout=0;
}
    // start slide projector hum
    //this.sfx.projector
    //this.sfx.projector.play();
    //this.sfx.projector.fade(0, 1, 4000);
    //this.playsfx('test',1,true)

    //this.slideshowstate=[];
    this.slide = 1;

    setTimeout(() => {
      this.filmleader = false;
      if (typeof slideInstructions.sfx[start] !== "undefined" && !this.mute) {
        this.sfx[slideInstructions.sfx[start]].play();
      }
    }, timeout);

    for (var i = start; i <= end; i++) {
      var ext = ".jpg";
      if (slideInstructions.gifs.includes(i)) {
        ext = ".gif";
      }

       var path='/assets/imgs/slides/Shot_';

      if (this.mobile){
        path='/assets/imgs/slides/compressed/Shot_';
      }


      var filename = path + i + ext;
      if (!this.slideshowstate.includes(filename)) {
        this.slideshowstate.push(filename);
      }
      //console.log(this.slideshowstate);
    }

    if (noleader && (this.level>36 || isNaN(this.level))){

      if (this.mobile){
this.slideshowstate.push('/assets/imgs/slides/compressed/Shot_18.jpg','/assets/imgs/slides/compressed/Shot_19.jpg');
      }else{
this.slideshowstate.push('/assets/imgs/slides/Shot_18.jpg','/assets/imgs/slides/Shot_19.jpg');
      }
    }
  }

forceFirebase(bool:boolean=false){
    if (this.level>60 || isNaN(this.level) || bool){
      this.help=false;
      this.resetCalcButtons();
      this.block=true;
   this.NoNo(false, 'Sync Server');
}
  }

  muteSFX(){
    this.help=false;
    this.resetCalcButtons();
    this.mute=!this.mute;
    this.block=true;

    if (this.mute){
this.NoNo(false, 'Sound Off');
this.sfx.fire.fade(0.2, 0, 2000);
this.sfx.fire.stop();
    }else{
this.NoNo(false, 'Sound On');
this.resumeFire();
    }
  }

  firesfx() {

    if (this.mute){return}
    //console.log('firesfx');
    if (this.onfirebtnsdesk.length) {
      this.sfx.fire.play();
      this.sfx.fire.fade(0, 0.2, 2000);
    } else {
      this.sfx.fire.fade(0.2, 0, 2000);
      this.sfx.fire.stop();
    }
  }

  cutscenecontroller() {
    if (this.equation !== "") {
      return;
    }
    slideInstructions.story.forEach(story => {
      if (story.lvl == this.level) {
        //console.log('fires');
        this.slideshow(story.start, story.end);
      }
    });
  }

setTooltip(){
//tooltiplist
  if (typeof tooltiplist == 'undefined'){return}

  if (typeof tooltiplist[this.level] == 'undefined'){
    this.tooltip=false;
  }else{
     this.tooltip=tooltiplist[this.level];
   }
}
  //sets up a level ()()()
  levelState(checkedfb: boolean = false, dlcID?,boot?) {

//alert(this.realLevel);
    //this.postgame=true;
    //console.log('ahhhhh')
    //let postgame=this.postgame || (!(this.level<this.finalLevel+1) || isNaN(this.level));
    //console.log('lvlstate');
    if (!this.dlcMode && !this.creation){
    this.cutscenecontroller();
    }
    this.operandState = [false, false, false];
    this.countIdle(false);
this.lvlcomputations=0;

if (!this.dlcMode){
if (this.DRM){

  if (this.level>22 || this.level=='postgame' || this.level=='community'){
      this.ads=[false,false,false,true];
      this.level=22;
  }

  if (this.level==8){
    this.ads=[true,false,false,false];
  }else if (this.level==13){
    this.ads=[false,true,false,false];
  }else if (this.level==17){
    this.ads=[false,false,true,false];
  }

}

if (this.level==20 && !this.rated){
    this.promptRating();
  }

if (this.level==42 && !this.rated){
    this.promptRating();
  }


//---------------------------------

if (typeof this.notesObj[String(this.level)] !=='undefined'){
this.notesText=this.notesObj[String(this.level)];
if (this.notesText.length<3){
  this.setNotes(!this.mobile)
}
}else{
  this.setNotes(!this.mobile)
}
}
//---------------------------------
this.revealed=false;
    //if ((this.onlineLevels.length==0 || !this.onlineLevels) && fb){
var emptywhileOnline=(this.onlineLevels.length == 0 || !this.onlineLevels ||
      this.onlineLevels.length == this.playedOnline.length) && isNaN(this.level)

var emptyfirstDLC=this.dlcMode && (this.dlcLevels.length == 0 || !this.dlcLevels || this.dlcLevels.length == this.dlcPlayed.length);

if ((emptywhileOnline || emptyfirstDLC) && !checkedfb && typeof dlcID == 'undefined') {
      //console.log('fetchOnlineFB');
      this.fetchFirebase();
      return;
    }

    //let postgame=true;
    let lvlkey;
    let lvldata;
// && not dlcmode
let lastlvlisDLC=String(this.level).substring(0,3).toUpperCase()=='DLC';

if (lastlvlisDLC && !this.dlcMode){
  //console.log(1490)
  this.level=this.realLevel+1;
  this.realLevel=0;
}

// ------------------
if (isNaN(this.level) && !this.dlcMode) {
      this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];

      if (this.level=="No Challenges Available Currently"){
        this.helpText =
        "There are no new challenges available at this moment. Build one of your own, or reset the postgame by pressing '.000' and equals, reset the whole game by hitting '.00000' (use '4973.' to skip ahead)";
      }else{
      this.helpText =
        "Welcome to postgame! You have mastered The Devil's Calculator and unlocked User Challenges. You may now skip levels using the help menu, and create your own levels for others to play. Answers can now be integers other than 666.";
        }

      // sort onlineLevels

      this.onlineLevels.sort((a, b) => {

        // ----------- test this ()() ?-------------
        /*
        if (typeof a.name !=='undefined' && typeof b.name !=='undefined'){
        if (a.name.substring(0,3)=='DLC' && b.name.substring(0,3)!=='DLC'){
          return 1;
        }
        if (a.name.substring(0,3)!=='DLC' && b.name.substring(0,3)=='DLC'){
          return -1;
        }
        }
        */
        // -------------------------------

        if (
          /**/
          (a.plays - a.skips) * (a.avgrating*a.avgrating) >
          (b.plays - b.skips) * (b.avgrating*b.avgrating)


        ) {
          return -1;
        } else if (
          (a.plays - a.skips) * (a.avgrating*a.avgrating) <
          (b.plays - b.skips) * (b.avgrating*b.avgrating)

        ) {
          return 1;
        } else {
          return 0;
        }
      });

      let level = null;
      //alert(this.onlineLevels);

      for (var i = 0; i < this.onlineLevels.length; i++) {

        //alert(this.onlineLevels[i].payload.val().name)
        //alert(this.playedOnline)
        //alert(!this.playedOnline.includes(this.onlineLevels[i].payload.val().name))

        if (
          !this.playedOnline.includes(this.onlineLevels[i].name) &&
          this.username !== this.onlineLevels[i].username
        ) {


          //alert('whyyyy '+this.playedOnline); // this shouldn't be firing right hereeee!!!!!!!!!!!!!!!!!!
          level = this.onlineLevels[i];
          this.onlinechallengecont = this.onlineLevels[i];
          this.lvlkey = this.onlineLevels[i].key;
          break;
        }
      }
      //alert('level: '+level);
      if (!level) {
        // go to create
        //this.create(false);
        this.level = "No Challenges Available Currently";

 if(!navigator.onLine) { // true|false
  this.result = "Offline"
}else{
        this.result = "Build or Replay";
        this.block=false;

        if (this.realLevel!==0){
       // -------- escape ---- //
      this.tutorialPrompt('No More Online Levels Available Right Now, Check Back Later');

      this.level = this.realLevel;
      this.realLevel = 0;
      this.clearAll(false);
      this.graph = false;
      this.help=false;
      this.hint=false;
      this.resetCalcButtons();

      this.result = "The Devil's Calculator";
      this.levelState();
      return;


        }
}
        this.nothingleft = true;
        this.buttonDisallowState = [];
        this.alphahidden = true;
        this.betahidden = true;
        this.gammahidden = true;
        return;
      } else {
        this.result = "Next User Challenge";
        this.block = false;
        setTimeout(() => {
          if (this.result == "Next User Challenge"){
            this.result = "";
          }
          //this.block = false;
        }, 2000);

//alert(this.level); // community ()()()()()()()
        this.level = level.name;
        this.levelhint = level.hint;
        this.levelanswer = level.answer;

if (this.realLevel!==0){
 this.calcbuttons[1]='exit lvl';
 };

if (typeof level.tocompute=='undefined'){
this.targetvalue=666;
}else{
this.targetvalue=level.tocompute;
}

this.tooltip='<b>*</b> Calculate <b><u>'+this.targetvalue+'</u></b> using all available operators. Skip or Solve to leave feedback.'


        //console.log(level);
        //return; // -------------- HERE IS THE PROBLEM, IT'S NOT THERE ----
        //alert(level.onfire); // ()()() check this out.

        if (typeof level.onfire == "undefined") {
          level.onfire = [];
        }

        this.buttonDisallowState = level.onfire;

        this.onfirebtnsdesk = [];

        if (typeof this.buttonDisallowState == 'undefined' || this.buttonDisallowState==''){
this.buttonDisallowState=[];
        }

        this.buttonDisallowState.forEach(a => {
          if (!isNaN(a) || a == "C") {
            this.onfirebtnsdesk.push(a);
          }
        });

        if (level.alpha == "") {
          this.buttonDisallowState.push("Δ");
        } else {
          this.Alpha = (a)=> {
            try {
              return this.mathsProvider.mathEval(level.alpha,a);
            } catch (e) {
              //console.log(e);
              if (typeof e.message !== "undefined") {
                alert(e.message);
              }
              this.NoNo(true, "function broken");
              return;
            }
          };
        }

        if (level.beta == "") {
          this.buttonDisallowState.push("ψ");
        } else {
          this.Beta = (a, b)=> {
            try {
              return this.mathsProvider.mathEval(level.beta,a,b);
            } catch (e) {
              //console.log(e);
              if (typeof e.message !== "undefined") {
                alert(e.message);
              }
              this.NoNo(true, "function broken");
              return;
            }
          };
        }

        if (level.gamma == "") {
          this.buttonDisallowState.push("φ");
        } else {
          this.Gamma = (a)=> {

            if (a < 0 || String(a).includes(".")) {
              this.NoNo(true, "only positive int");
              return;
            } // test?
            try {
              return this.mathsProvider.mathEval(level.gamma,a);
            } catch (e) {
              //console.log(e);
              if (typeof e.message !== "undefined") {
                alert(e.message);
              }
              this.NoNo(true, "function broken");
              return;
            }
          };
        }

        if (typeof this.buttonDisallowState !== "undefined") {
          this.alphahidden = this.buttonDisallowState.includes("Δ");
          this.betahidden = this.buttonDisallowState.includes("ψ");
          this.gammahidden = this.buttonDisallowState.includes("φ");
          //alert(this.alphahidden)
        }

        this.setData();
        this.firesfx();
        return;
      }

      // when completed (or skipped) update feedback for level and add to users playedOnline
      //this.realLevel=0;
    } else if (this.dlcMode){

let dlcLeft=[];

var num=1+this.dlcPlayed.length;


if (typeof dlcID == 'undefined'){

     //this.level = "DLC x"+this.dlcPlayed.length+1;

// remaining DLC


if (this.dlcPlayed.length>0){

  if (this.DRM && this.dlcPlayed.length>2){
this.ads=[false,true,false,false];
this.replay();
  return;
}

this.dlcLevels.forEach((lvl)=>{
  if (!this.dlcPlayed.includes(lvl.dlc.id)){
    dlcLeft.push(lvl);
  }
})

}else{
  dlcLeft=this.dlcLevels;
}

dlcLeft.sort((a, b) => {
        if (a.dlc.priority>b.dlc.priority) {
          return -1;
        } else {
          return 1;
        }
      });
}else{
this.dlcLevels.forEach((lvl,i)=>{
  if (lvl.dlc.id==dlcID){
dlcLeft=[lvl]
num=i+1;
  }
})



}
//this.realLevel=this.level;



if (!lastlvlisDLC){
 this.realLevel=this.level
 //this.realLevel=0;
}




if (dlcLeft.length==0 || this.dlcLevels.length==this.dlcPlayed.length){
this.dlcMode=false
this.level=this.realLevel;
this.realLevel=0;
this.clearAll(false);
this.graph = false;
this.resetCalcButtons();

this.result = "The Devil's Calculator";
this.levelState();

this.noMoreDLC();
  return;
}

 if (typeof boot == 'undefined'){
this.clearAll(false);
}


this.resetCalcButtons();

this.helpText ="DLC levels are curated by the developers and are comprised of levels made by mathematicians, graduate students and others we choose to showcase. They can use any number as their win condition, not just 666.";




this.onlinechallengecont=dlcLeft[0].dlc.id // use this container for id
//console.log('fires');
        this.level = "DLC "+num;
        this.levelhint = dlcLeft[0].hint;
        this.levelanswer = dlcLeft[0].answer;
        this.result = "DLC lvl "+num;

this.calcbuttons[1]='exit dlc';

if (typeof this.notesObj[String(this.level)] !=='undefined'){
this.notesText=this.notesObj[String(this.level)];
if (this.notesText.length<3){
  this.setNotes(!this.mobile)
}
}else{
  this.setNotes(!this.mobile)
}



if (typeof dlcLeft[0].tocompute=='undefined'){
this.targetvalue=666;
}else{
this.targetvalue=dlcLeft[0].tocompute;
}

this.tooltip='<b>*</b> '+dlcLeft[0].dlc.tooltip;

  //this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
  this.historys = [];

 if (typeof dlcLeft[0].onfire == "undefined") {
          dlcLeft[0].onfire = [];
        }

        this.buttonDisallowState = dlcLeft[0].onfire;

        this.onfirebtnsdesk = [];

        if (typeof this.buttonDisallowState == 'undefined' || this.buttonDisallowState==''){
this.buttonDisallowState=[];
        }

        this.buttonDisallowState.forEach(a => {
          if (!isNaN(a) || a == "C") {
            this.onfirebtnsdesk.push(a);
          }
        });

        if (dlcLeft[0].alpha == "") {
          this.buttonDisallowState.push("Δ");
        } else {
          this.Alpha = (a)=> { // = async(
            try {
              if (this.onlinechallengecont=="X9c99HDq"){

                return eval("(r=>{r=String(r);for(var n=0,t=0,a=0,e=1;e<r.length;e++)parseInt(r[e-1])==parseInt(r[e])?t++:parseInt(r[e-1])>parseInt(r[e])?a++:parseInt(r[e-1])<parseInt(r[e])&&n++;return parseInt(String(n)+String(t)+String(a))})(a)");

              }else{
              //alert(dlcLeft[0].alpha)
              return this.safeEval.evaluate(dlcLeft[0].alpha, {a});
                }







            } catch (e) {
              //console.log(e);
              if (typeof e.message !== "undefined") {
                alert(e.message);
              }
              this.NoNo(true, "function broken");
              return;
            }
          };
        }

        if (dlcLeft[0].beta == "") {
          this.buttonDisallowState.push("ψ");
        } else {
          this.Beta = (a, b)=>{
            try {
              return this.safeEval.evaluate(dlcLeft[0].beta, {a,b});
            } catch (e) {
              //console.log(e);
              if (typeof e.message !== "undefined") {
                alert(e.message);
              }
              this.NoNo(true, "function broken");
              return;
            }
          };
        }

        if (dlcLeft[0].gamma == "") {
          this.buttonDisallowState.push("φ");
        } else {
          this.Gamma = (a)=>{
            /*
            if (a < 0 || a.includes(".")) {
              this.NoNo(true, "only positive int");
              return;
            } // test?
*/
            try {
              return this.safeEval.evaluate(dlcLeft[0].gamma, {a});
            } catch (e) {
              //console.log(e);
              if (typeof e.message !== "undefined") {
                alert(e.message);
              }
              this.NoNo(true, "function broken");
              return;
            }
          };
        }

        if (typeof this.buttonDisallowState !== "undefined") {
          this.alphahidden = this.buttonDisallowState.includes("Δ");
          this.betahidden = this.buttonDisallowState.includes("ψ");
          this.gammahidden = this.buttonDisallowState.includes("φ");
          //alert(this.alphahidden)
        }

        this.setData();
        this.firesfx();

this.dlcintro(dlcLeft[0]);

        return;



// ----------------------------------------------

    }else {

      this.targetvalue=666;
      this.setTooltip()
      lvlkey = this.level;
      //this.realLevel=0;
      lvldata = levelData;
    }

    this.buttonDisallowState = levelData[this.level].onfire;
    this.helpText = levelData[this.level].help;
    this.levelhint = levelData[this.level].hint;
    this.levelanswer = levelData[this.level].answer;

    if (this.level==1 && !this.mobile){
      this.helpText+=". Can freely resize window and use keyboard or number keys"
    }

    this.onfirebtnsdesk = [];

            if (typeof this.buttonDisallowState == 'undefined' || this.buttonDisallowState==''){
this.buttonDisallowState=[];
        }

    this.buttonDisallowState.forEach(a => {
      if (a !== "Δ" && a !== "ψ" && a !== "φ") {
        this.onfirebtnsdesk.push(a);
      }
    });

    if (levelData[this.level].alpha == "") {
      this.buttonDisallowState.push("Δ");
    } else {
      if (typeof gameFunctions[levelData[this.level].alpha] !== "undefined") {
        this.Alpha = gameFunctions[levelData[this.level].alpha];
      } else {
        this.Alpha = (a)=> {
          try {
            if (this.level == 66) {
              return this.randomnum;
            }

            return this.safeEval.evaluate(levelData[this.level].alpha, {a});
          } catch (e) {
            //console.log(e);
            if (typeof e.message !== "undefined") {
              alert(e.message);
            }
            this.NoNo(true, "function broken");
            return;
          }
        };
      }
    }

    if (levelData[this.level].beta == "") {
      //alert('fires');
      this.buttonDisallowState.push("ψ");
    } else {
      if (typeof gameFunctions[levelData[this.level].beta] !== "undefined") {
        this.Beta = gameFunctions[levelData[this.level].beta];
      } else {
        this.Beta = (a, b)=> {
          try {
            return this.safeEval.evaluate(levelData[this.level].beta, {a,b});
          } catch (e) {
            //console.log(e);
            if (typeof e.message !== "undefined") {
              alert(e.message);
            }
            this.NoNo(true, "function broken");
            return;
          }
        };
      }
    }

    if (levelData[this.level].gamma == "") {
      this.buttonDisallowState.push("φ");
    } else {
      if (typeof gameFunctions[levelData[this.level].gamma] !== "undefined") {
        this.Gamma = gameFunctions[levelData[this.level].gamma];
      } else {
        this.Gamma = (a)=> {
          if (a < 0 || String(a).includes(".")) {
            this.NoNo(true, "only positive int");
            return;
          }
          try {
            return this.safeEval.evaluate(levelData[this.level].gamma, {a});
          } catch (e) {
            //console.log(e);
            if (typeof e.message !== "undefined") {
              alert(e.message);
            }
            this.NoNo(true, "function broken");
            return;
          }
        };
      }
    }

    this.setData();
    this.firesfx();

    if (typeof this.buttonDisallowState !== "undefined") {
      this.alphahidden = this.buttonDisallowState.includes("Δ");
      this.betahidden = this.buttonDisallowState.includes("ψ");
      this.gammahidden = this.buttonDisallowState.includes("φ");
      //alert(this.alphahidden)

  }
}


noMoreDLC(){

this.prompt = this.alertCtrl.create({
     //title: 'Level Maker',
    //subTitle: 'It is recommended you play further into the game before creating levels. The further along you are, the more standing and exposure your levels will initially have in the community. Operators will be hidden until unlocked.',
    message:'<a href="https://twitter.com/devilscalc"><img class="twitfollow" src="assets/imgs/twit.png"></a><br><br><span class="textleft"><b>Check back soon! </b>We periodically add free DLC by mathematicians and the game\'s creators. <a href="https://goo.gl/forms/oztwpVeUpYmfPbp73"><b>Submit your level</b></a> for DLC consideration. Replay DLC by using the "levels" menu. <b>Follow us on twitter for DLC updates!</b> You may continue by playing community challenges or exit back to the main game</span>',
        buttons: [
          {
            text: "Back"
          },

          {
            text: "Continue",
            handler: data => {
              //alert('do it up'); // ()()()()
              //this.slideshowstate
              this.resetCalcButtons();
              this.slideshowstate = [];
              this.slide = 0;
              this.communityMode=true;
              this.realLevel=this.level;
              this.level='community';
              this.levelState();
              }
            }
         ]
      });
//this.block=false;
      this.prompt.present();

}

  wolfram() {

    this.prompt = this.alertCtrl.create({
     title: 'Search Wolfram Alpha',
    subTitle: 'Leave blank to upload all your notes for NLP processing. <i>Over the Integers flag will be added if ending with "O". To interpolate to n decimal places, use Floor(x*10^n)/10^n</i> i.e. Floor(x*100)/100*10=666',
    //message:'<a href="https://twitter.com/devilscalc"><img class="twitfollow" src="assets/imgs/twit.png"></a><br><br><span class="textleft"><b>Check back soon! </b>We periodically add free DLC by mathematicians and the game\'s creators. <a href="https://goo.gl/forms/oztwpVeUpYmfPbp73"><b>Submit your level</b></a> for DLC consideration. Replay DLC by using the "levels" menu. <b>Follow us on twitter for DLC updates!</b> You may continue by playing community challenges or exit back to the main game</span>',
    inputs: [
          {
            name: "search",
            //value: data.name,
            placeholder: '3x+5y=666 over the integers'
          }
        ],
        buttons: [
          {
            text: "Back",
            handler: data => {
     setTimeout(()=>{this.focusNotes();},500)

            }
          },

          {
            text: "Search",
            handler: data => {
             if (data.search.length==0){
               //return false;
            if (this.notesText.substring(0,7)=="Welcome"){
                    return false
                }
               data.search=this.notesText;


             }
    //this.notes = false;
    //this.resetCalcButtons();

// if there are not two letters in a row
//var twoletters=data.search.match(/[a-z][a-z]/g)
//var oneletter=data.search.match(/[a-z]/g)

if (data.search[data.search.length-1]=="o" || data.search[data.search.length-1]=="O"){
  data.search+="ver the integers"
}

    window.open("https://www.wolframalpha.com/input/?i="+encodeURIComponent(data.search), "_system", "location=yes");

  setTimeout(()=>{this.focusNotes();},500)
              }
            }
         ]
      });

      this.prompt.present();



  }

  oeis(force:boolean=false) {
    this.notes = false;
    this.resetCalcButtons();
    if (this.level<51 && !force){
      this.openCalc();
      return
    }

    window.open("https://oeis.org", "_system", "location=yes");
  }

  //-------create functions -------//
  bckCreate() {
     this.resetCalcButtons();
    this.creation = false;
    this.equation="";
    this.customlvlfunc = [null, null, null];
    this.customlvlformula = "";
    this.customlvlhint = "";
    this.customlvlonfire = "";
    this.lvltocompute="";
  }

  clickFunc(s) {
    setTimeout(() => {
      let focus = false;

      if (s == "Δ") {
        if (!this.customlvlfunc[0]) {
          this.defFunc("Δ");
        } else {
          focus = true;
          // insert 'Δ' into input field
        }
      } else if (s == "ψ") {
        if (!this.customlvlfunc[1]) {
          this.defFunc("ψ");
        } else {
          focus = true;
          // insert 'ψ' into input field
        }
      } else if (s == "φ") {
        if (!this.customlvlfunc[2]) {
          this.defFunc("φ");
        } else {
          focus = true;
          // insert 'φ' into input field
        }
      }

      if (focus) {
        //if (s!=="ψ" && )
        this.customlvlformula += s;
        setTimeout(() => {
          let element: any = document.getElementById("formula");

          element.focus();
          element.setSelectionRange(element.value.length, element.value.length);
        }, 150);
      }
    }, 0);
  }
/*
inputFormula(event){
//alert(event[event.length-1]);
if (isNaN(event[event.length-1])){
 this.customlvlformula= "jfdklsj";
}

}
*/

dlcintro(level){

this.prompt = this.alertCtrl.create({
     //title: 'Level Maker',
    //subTitle: 'It is recommended you play further into the game before creating levels. The further along you are, the more standing and exposure your levels will initially have in the community. Operators will be hidden until unlocked.',
    message:'<img class="avatar" src="'+level.dlc.avatar+'"><br><b>DLC</b> level created by<br><b class="namedlc">'+level.dlc.author+'</b><br><span class="textleft">'+level.dlc.bio+'</span>',
              buttons: [
          {
            text: "more",
             handler: data => {
              window.open(level.dlc.info, "_system", "location=yes");
              }
          },

          {
            text: "Ok"

            }
         ]
      });
      this.prompt.present();


}

  defFunc(s) {
    setTimeout(() => {
      let title;
      let subtitle;
      let example;

      if (s == "Δ") {
        title = 'Define Unary Function "' + s + '"';
        subtitle = "Return a <a href='https://mathjs.org/docs/expressions/parsing.html'>math.js expression</a> with one argument (a). Delete by defining with input blank. Use Ternary Operators for more complex functions, i.e. 'a%2 ? a/2 : a+3' will divide by 2 when the input is odd and add 3 when even";
        example = "a*5+4";
      } else if (s == "ψ") {
        title = 'Define Binary Function "' + s + '"';
        subtitle = "Return a <a href='https://mathjs.org/docs/expressions/parsing.html'>math.js expression</a> with two arguments (a,b). Delete by defining with input blank. Use Ternary Operators for more complex functions, i.e. 'a==b ? a*b : a/b' will multiply both inputs together when they are the same, and divde them when different";
        example = "a*b-b";
      } else if (s == "φ") {
        title = 'Define Unary Integer Sequence Function "' + s + '"';
        subtitle = "Return a <a href='https://mathjs.org/docs/expressions/parsing.html'>math.js expression</a> with one argument (a). Delete by defining with input blank. You can define an array of integers and return an index, i.e. '[0,1,1,2,3,5,8,13,21,34][a]' or compute them dynamically";
        example = 'string(pi)[a]';
      }

      this.prompt = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        //cssClass: 'codeinput',
        inputs: [
          {
            name: "expression",
            //value: data.name,
            placeholder: example
          }
        ],

        buttons: [
          {
            text: "Cancel"
          },

          {
            text: "Define",
            handler: data => {
              if (data.expression == "" || data.expression=="null") {

                   if (s == "Δ") {
                this.customlvlfunc[0] = null;
              } else if (s == "ψ") {
                this.customlvlfunc[1] = null;
              } else if (s == "φ") {
                this.customlvlfunc[2] = null;
              }


                // unset
                return;
              }

              data.expression = data.expression.toLowerCase();

              if (!data.expression.includes("a")) {
                alert('requires input variable "a"');
                return false;
              }

              if (!data.expression.includes("b") && s == "ψ") {
                alert('requires input variable "b"');
                return false;
              }

              if (s == "Δ") {
                this.customlvlfunc[0] = data.expression;
              } else if (s == "ψ") {
                this.customlvlfunc[1] = data.expression;
              } else if (s == "φ") {
                this.customlvlfunc[2] = data.expression;
              }
            }
          }
        ]
      });
      this.prompt.present();
    }, 0);
  }

  submitLevel() {
    setTimeout(() => {
     // if (parseInt(this.lvltocompute)){}



      if (this.customlvlhint == "") {
        alert("Hint Required");
        return;
      }

let vulgar = false;
vulgarities.forEach(v => {
  if (this.customlvlhint.toUpperCase().includes(v.toUpperCase())) {
                    vulgar = true;
                  }
});

if (vulgar){
  alert("Vulgarities Not Allowed");
        return;
}

if (typeof this.lvltocompute =='undefined'){
 this.lvltocompute=666
}

if (!Number.isInteger(parseFloat(this.lvltocompute))){
  alert('number to calculate is not an integer');
  return;
}


      if (this.customlvlfunc[0] == "" && this.customlvlfunc[1] == "" && this.customlvlfunc[2] == ""){
        alert('You must define at least one function');
        return;
      }

      let period = this.customlvlonfire.includes(".");
      let negate = this.customlvlonfire.includes("-");
      //if(typeof this.customlvlonfire=='string'){}
//var customlvlfireHolder=this.customlvlonfire;
if (typeof this.customlvlonfire !== 'string'){
  var temp=this.customlvlonfire;
  this.customlvlonfire=""
  temp.forEach((x)=>{
    if (x !== 'Δ' && x !== 'ψ' && x !== 'φ'){
    this.customlvlonfire+="'"+x+"',"
    }
  })
  if (this.customlvlonfire[this.customlvlonfire.length-1]==','){
this.customlvlonfire=this.customlvlonfire.substring(0, this.customlvlonfire.length - 1)
}
}
      let temponfire = this.customlvlonfire.replace(/\D/g, "").split("");

      let onfire: any = [];

      temponfire.forEach(n => {
        if (!onfire.includes(n)) {
          onfire.push(n);
        }
      });

      let illegal = false;

      if (period) {
        onfire.push(".");
      }
      if (negate) {
        onfire.push("negate");
        if (this.customlvlformula.includes("-")) {
          illegal = true;
        }
      }
      this.customlvlonfire = onfire;

      this.customlvlonfire.forEach(c => {
        if (this.customlvlformula.includes(c)) {
          illegal = true;
        }
      });
//this.customlvlonfire=customlvlfireHolder // -!-

      if (illegal) {
        alert("One or more of your disabled numbers appears in your formula");
        return;
      }

      // VALIDATE customlvlonfire, make sure this.customlvlformula doesn't contain any of those letters

      if (this.customlvlfunc[0]) {
        if (!this.customlvlformula.includes("Δ")) {
          alert("Δ function defined but not in formula. Insert Δ symbol into formula by clicking its button in the top right");
          return;
        }

  this.Alpha = (a)=> {

        try {
             return this.mathsProvider.mathEval(this.customlvlfunc[0],a);
          } catch (e) {
            //console.log(e);
            if (typeof e.message !== "undefined") {
              alert('Δ: '+e.message);
            }else{
              alert('misc error with Δ');
            }
            return;
          }

        };

        //console.log(this.Alpha(5));
        //console.log(this.Alpha(6));

      } else {
        this.customlvlfunc[0] = "";
      }

      if (this.customlvlfunc[1]) {
        if (!this.customlvlformula.includes("ψ")) {
          alert("ψ function defined but not in formula. Insert ψ symbol into formula by clicking its button in the top right");
          return;
        }
        this.Beta = (a, b)=> {


      try {
            return this.mathsProvider.mathEval(this.customlvlfunc[1],a,b);
          } catch (e) {
            //console.log(e);
            if (typeof e.message !== "undefined") {
              alert('ψ: '+e.message);
            }else{
              alert('misc error with ψ');
            }
            return;
          }


        };
      } else {
        this.customlvlfunc[1] = "";
      }

      if (this.customlvlfunc[2]) {
        if (!this.customlvlformula.includes("φ")) {
          alert("φ function defined but not in formula. Insert φ symbol into formula by clicking its button in the top right");
          return;
        }
        this.Gamma = (a)=> {


                  try {
             return this.mathsProvider.mathEval(this.customlvlfunc[2],a);
          } catch (e) {
            //console.log(e);
            if (typeof e.message !== "undefined") {
              alert('φ: '+e.message);
            }else{
              alert('misc error with φ');
            }
            return;
          }

        };
      } else {
        this.customlvlfunc[2] = "";
      }

      if (this.customlvlfunc[0] == "") {
        onfire.push("Δ");
      }
      if (this.customlvlfunc[1] == "") {
        onfire.push("ψ");
      }
      if (this.customlvlfunc[2] == "") {
        onfire.push("φ");
      }

      //let dup=false;
      //let genkey=this.genKey(this.customlvlfunc[0]+this.customlvlfunc[1]+this.customlvlfunc[2])
      let dup = false;

this.customlvlformula=this.customlvlformula.replace(/ /g,'');

if (this.customlvlformula.match(/[^\.^\d^\-^\(^\)^Δ^ψ^φ]+/g)){
alert('Formula contains illegal characters');
  return;
}

if (this.customlvlformula.match(/\dΔ|\dφ]+/g)){
alert('Unary operators Δ and φ must always preceed their input');
  return;
}


//


      this.onlineLevels.forEach(item => {

        if (
          item.alpha == this.customlvlfunc[0] &&
          item.beta == this.customlvlfunc[1] &&
          item.gamma == this.customlvlfunc[2] && JSON.stringify(this.customlvlonfire)==JSON.stringify(item.onfire)
        ) {

          dup = true;
        }
      });

      /**/
      if (dup) {
        alert("Challenge already exists, try again");
        return;
      }
// -------
      this.targetvalue=this.lvltocompute;
//alert(this.customlvlformula);
      this.compute(this.customlvlformula);
    });

    // validate formula, then push
    // alert()
    // push to firebase
  }
  /*
genKey(functionsmush){


return (Math.random()*9999999).toString(36);
}
*/
  validatedLevel(rez,output?) {
    this.levelState();
    if (rez==1) {
      //alert('fires');
      //this.itemsRef.update(temp.key, update);
      //let gen=this.genKey(this.customlvlfunc[0]+this.customlvlfunc[1]+this.customlvlfunc[2])
      let counter = 1;
//console.log(this.onlineLevels);
      this.onlineLevels.forEach(item => {

var n = item.name.indexOf(' ');
var nm = item.name.substring(0, n != -1 ? n : item.name.length);

        if (nm == this.username) {
          counter++;
        }
      });

      let title = this.username;

      if (counter > 1) {
        title = title + " (" + counter + ")";
      }
      var time=new Date().getTime();
      // CUSTOMLVLONFIRE BROKEN, NOT RIGHT FORMAT?
      var startrating=5;
      var plays=0;

      if (this.level<61){
      startrating=1;
      plays=0;
      }

      // dedupe this.customlvlonfire
      //this.customlvlonfire=[new Set(this.customlvlonfire)]
let lvlonfire=this.customlvlonfire.filter((v,i) => {
  return this.customlvlonfire.indexOf(v) === i
})


      let data = {
        name: title,
        hint: this.customlvlhint,
        alpha: this.customlvlfunc[0],
        beta: this.customlvlfunc[1],
        gamma: this.customlvlfunc[2],
        onfire: lvlonfire,
        plays: plays,
        skips: 0,
        avgrating: startrating,
        username: this.username,
        answer: this.customlvlformula,
        tocompute:this.lvltocompute,
        date: time
      };

      if (typeof this.itemsRef == "undefined") {
        this.itemsRef = this.db.list("items");
      }
      this.itemsRef.push(data).then(()=>{
this.prompt = this.alertCtrl.create({
    title: 'Level Uploaded',
    subTitle: 'Other users will now be able to play your level in the community challenges. Thank you! Also consider submitting your level to our <a href="https://goo.gl/forms/oztwpVeUpYmfPbp73">DLC showcase</a>',
    buttons: [
      {
        text: 'Continue',
        role: 'cancel',
        handler: () => {
          this.fetchFirebase();
          this.bckCreate();
        }
      }]
  });
this.prompt.present();
      }).catch(()=>{
this.tutorialPrompt('There is an error connecting to the server. Check if you are online and whether there is maintance or an outage on @devilscalc. Contact info@cinqmarsmedia.com for concerns.');

      });

      //this.result = "Upload Success";




      //alert('Your Level was successfully uploaded');
      //this.NoNo(true,"Upload  Success")

    } else if (rez==0) {
      alert("Formula is legitimate but does not seem to equal "+this.lvltocompute+". Output is instead "+output);
    }else{
      alert("There seems to be an error with your formula, try again");
    }
  }

guide(){
   window.open("https://cinqmarsmedia.com/devilscalculator/guide", "_system", "location=yes");
}
  //--------------------------------
  about() {

if (this.DRM){

    if (this.mobile){
// purchase logic


    }

this.ads=[false,true,false,false];


}else{
  window.open("https://cinqmarsmedia.com", "_system", "location=yes");
}

/**/




  }

  helpButton() {

    // --------------
    setTimeout(() => {

      if (this.filmleader) {
        return;
      }
      this.countIdle(false);
      this.hapticCall(3);
      this.tapticCall()
      if (this.slideshowstate.length > 0) {
        this.nextSlide();
        return;
      }
      this.clickSFX();

      if (this.replayscreen) {

if (this.DRM){
// dissallow
this.ads=[false,true,false,false];
  return;
}else if (this.level<40 && !this.username){
// warning
this.prompt = this.alertCtrl.create({
     title: 'Level Maker',
    subTitle: 'It is recommended you play further into the game before creating levels. The further along you are, the more standing and exposure your levels will initially have in the community. Operators will be hidden until unlocked.',
        buttons: [
        {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: "Ok",
            handler: data => {
        this.replayscreen = false;
        this.create();
        this.result = "";
            }
          }

        ]
      });
      this.prompt.present();



return;
}


        this.replayscreen = false;
        this.create();
        this.result = "";
        return;
      }

     if (this.keyboardshort) {
        this.keyboardshort = false;
        this.graph=false;
this.resetCalcButtons();
        return;
      }



      if (this.hint) {
           this.hint = false;
           this.help=false;
           this.resetCalcButtons();
        return;
      }
      if (this.notes) {
        this.oeis();
        return;
      }

      if (this.graph) {

//if (this.level<61){

//-----------------------------

            if (!this.mobile) {
          if (this.keyboardshort) {
            this.keyboardshort = false;
            this.help = false;
               this.hint = false;
               this.resetCalcButtons();
          } else {
          this.calcbuttons[2]='back';
          //this.calcbuttons[1]='levels';
//about|upgrade
if (this.DRM){
this.calcbuttons[1]='upgrade';
}else{
this.calcbuttons[1]='about';
}


            this.keyboardshort = true;
          }

          //alert('keyboard shortcuts');
        }else{
          this.about();

        }

//-----------------------------
//}else{

//}

        return;
      }

      if (!this.help && !this.notes && !this.graph && !this.replayscreen){

  if (this.level==1 || this.level==2){
        this.tutorialPrompt('<img src="/assets/imgs/tutorial.jpg"><b>Δ</b> Calculate the number <b><u>666</u></b> with the mystery function to win<br><hr><i>9 Δ=4 may imply Δ is subtracting 5</i>')
      }

  if (this.level==18 || this.level==19){
        this.tutorialPrompt('<img src="/assets/imgs/tutorial2.jpg"><b>ψ</b> Calculate the number <b><u>666</u></b> with the mystery binary function to win<br><hr><i>2ψ3=5 may imply ψ represents addition</i>')
      }
 if (this.level==18 || this.level==19){
        this.tutorialPrompt('<img src="/assets/imgs/tutorial2.jpg"><b>ψ</b> Calculate the number <b><u>666</u></b> with the mystery binary function to win<br><hr><i>2ψ3=5 may imply ψ represents addition</i>')
      }

if (this.level==37 || this.level==38){
        this.tutorialPrompt('<img src="/assets/imgs/tutorial3.jpg">Use both functions to calculate the number <b><u>666</u></b>. Their order will inject parantheses automatically')
      }

if (this.level==51 || this.level==52){
        this.tutorialPrompt('<img src="/assets/imgs/tutorial4.jpg"><b>φ</b> Calculate the number <b><u>666</u></b> with the mystery OEIS function to win<br><hr><i>4φ=7 could imply φ represents prime numbers</i>')
      }
      if (this.level==51 || this.level==52){
        this.tutorialPrompt('<img src="/assets/imgs/tutorial4.jpg"><b>φ</b> Calculate the number <b><u>666</u></b> with the mystery OEIS function to win<br><hr><i>4φ=7 could imply φ represents prime numbers</i>')
      }

        if (this.level==53){
        this.tutorialPrompt('<img src="/assets/imgs/oeis.png"><b>OEIS</b> is a wonderful resource and extremely helpful for the game <i>xkcd is also wonderful</i>')
      }


      }

      this.help = !this.help;

if (this.help){
  this.lvlcomputations=-1*Math.floor(this.level/5)-5;

  this.calcbuttons[2]='back';
this.calcbuttons[1]='hint';
  if (!isNaN(this.level)){

    this.calcbuttons[0]='guide';

  }else{
    //this.calcbuttons[1]='hint';
    if (this.nothingleft && !this.dlcMode){
      this.calcbuttons[0]='reset';
      this.calcbuttons[1]='sync';
    }else{
     this.calcbuttons[0]='skip';
     }
  }
  /*
if (this.level<51){
    this.calcbuttons=['back','wolfram','calc'];
}else{
    this.calcbuttons=['back','wolfram','OEIS'];
}
*/
}else{
this.resetCalcButtons();
}

      this.notes = false;
      this.graph = false;
      // generate proper help prompt, pick from array
    }, 0);
  }

  notesButton() {
    /* debug
this.storage.clear().then(()=>{
        window.location.reload(true);
        })
 */
    setTimeout(() => {

      if (this.filmleader) {
        return;
      }
      this.countIdle(false);
      this.hapticCall(3);
      this.tapticCall()
      if (this.slideshowstate.length > 0) {
        this.prevSlide();
        return;
      }
      this.clickSFX();

      if (this.replayscreen && this.isGraphData()) {
        this.replayscreen = false;
        this.resetCalcButtons();
        this.result = "";
        return;
      }
/**/
      if (this.dlcMode && this.graph && !this.nothingleft){
        this.dlcMode=false;
        this.resetCalcButtons();
      }

      if (this.help) {
        if (isNaN(this.level)) {
          if (this.nothingleft && !this.dlcMode) {


this.prompt = this.alertCtrl.create({
     //title: this.levelanswer,
    subTitle: "Are you sure you want to reset your game data?",
        buttons: [
          {
            text: "cancel",
            handler: data => {}
          },{
            text: "ok",
            handler: data => {
            this.nothingleft = false;
            this.resetStoragewDRM()
            }
          }

        ]
      });
      this.prompt.present();

            return;
          }
          // skip?
          if (String(this.level).substring(0,3).toUpperCase()=='DLC'){
            // ---- it just wins? No. Skipped.
           // this.dlcPlayed.push(this.onlinechallengecont);
            //console.log(this.dlcPlayed);
            this.levelWon();
          }else{
          this.onlineLevelDone(false);
        }
          this.help = false;
          this.resetCalcButtons();
          return;
        }

     this.guide();
     this.help=false;
     this.hint=false;

      this.resetCalcButtons();

        // -----------------
        //this.about();
        return;
      }

      if (this.replayscreen && !this.isGraphData()){
        this.DLC();
        return;
      }

      if (this.graph) {
        this.replay();

        return;
      }

      if (this.notes){
        this.updateNotes();
      }

      this.notes = !this.notes;

      if (this.notes){
if (this.level<51){
    this.calcbuttons=['back','wolfram','calc'];
}else{
    this.calcbuttons=['back','wolfram','OEIS'];
}
}else{
this.resetCalcButtons();
                }


      this.help = false;
      this.graph = false;

      // NOTES focus
      /*  */
      this.focusNotes();
    }, 0);
  }

  updateNotes(){

this.notesObj[String(this.level)]=this.notesText;
this.setData();
  }

  onlineLevelDone(success) {

    this.clearAll(false);

//let skip=false;

//if (success){skip=true}

    if (this.revealed) {
      success = false;
    }

    if (success) {
      this.onlinechallengecont.plays++;
    } else {
      this.onlinechallengecont.skips++;
    }

    let total = this.onlinechallengecont.skips + this.onlinechallengecont.plays;

     this.result = "Rate Level";
    this.prompt = this.alertCtrl.create({
      title: "Rate This Challenge",
      subTitle: "Feedback helps the community immensely",
      enableBackdropDismiss: false,
      inputs: [
        {
          type: "radio",
          label: "Great | Elegantly Designed",
          value: "6"
        },
        {
          type: "radio",
          label: "Good | Shows Ingenuity",
          value: "4"
        },
        {
          type: "radio",
          label: "Lacking | Shows Potential",
          value: "2"
        },
        {
          type: "radio",
          label: "Poor | Weak Effort",
          value: "0"
        },
        {
          type: "radio",
          label: "Spam | Overly Obscure or Easy",
          value: "-6"
        }
      ],

      buttons: [
        {
          text: "Submit",
          handler: data => {

   data = parseInt(data);

        if (isNaN(data)){
              return false
            }

            if (total > 1) {
              this.onlinechallengecont.avgrating =
                ((total - 1) * this.onlinechallengecont.avgrating + data) /
                total;
            } else {
              this.onlinechallengecont.avgrating = data;
            }

            //??
            if (typeof this.itemsRef == "undefined") {
              this.itemsRef = this.db.list("items");
            }

var avg=Math.floor(this.onlinechallengecont.avgrating*1000)/1000;

let smartobj={avgrating:avg,plays:this.onlinechallengecont.plays,skips:this.onlinechallengecont.skips};

//console.log(JSON.stringify(this.onlinechallengecont))
//console.log(this.lvlkey);
            this.itemsRef.update(this.lvlkey, smartobj).then(()=>{

            }).catch((err)=>{
             // console.log(err);
              alert('problem updating feedback, contact info@cinqmarsmedia.com');
            });

            this.playedOnline.push(this.onlinechallengecont.name);
            this.setData();

            this.levelState();
            /*
            if (data==6){
              //----------------------
            this.tutorialPrompt('Love this level? Tweet to us and let us know to consider it for a DLC showcase! <br><br><a href="https://twitter.com/devilscalc"><img class="twitfollow" src="assets/imgs/twit.png"></a>')
            }
            */
          }
        }
      ]
    });


    this.prompt.present();

    // grab data object
    //Update skips+1 if !success, plays+1 if success

    //prompt rating

    // calc rating into data object, start over if 0 (scale is 1-5)

    //find key

    // update online

    // add name to this.playedOnline

    // save localStorage (this.setData())

    //this.levelState()
  }

  tryApp(item){
//true = synonymy
//false = polititruth/cham

var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

if (item){
  if (this.mobile){
    if (iOS){
 // if ios syn
  window.open("https://itunes.apple.com/us/app/synonymy/id924648807?ls=1&mt=8", "_system", "location=yes");
    }else{
 // if android syn
  window.open("https://play.google.com/store/apps/details?id=air.com.jarvisfilms.synonomy", "_system", "location=yes");
    }


  }else{
    // steam syn
     window.open("https://store.steampowered.com/app/342890/Synonymy/", "_system", "location=yes");
  }

}else{
  if (this.mobile){
    if (iOS){
 // if ios pol
      window.open("https://itunes.apple.com/us/app/polititruth/id1217091559?ls=1&mt=8", "_system", "location=yes");
    }else{
 // if android pol
      window.open("https://play.google.com/store/apps/details?id=com.cinqmarsmedia.polititruth", "_system", "location=yes");
    }
  }else{
// steam cham
     window.open("https://store.steampowered.com/app/834170/Chameleon_Video_Player/", "_system", "location=yes");
  }

}


  }

  graphs() {
    setTimeout(() => {
      if (this.filmleader) {
        return;
      }
      this.countIdle(false);
      this.hapticCall(3);
      this.tapticCall()
      if (this.slideshowstate.length > 0) {
        this.doneSlide();
        return;
      }
      this.clickSFX();


if (!this.isGraphData() && !this.help && !this.notes){
// go directly to levels

this.replay(true)
return;

}




      if (this.replayscreen){

          if (this.isGraphData()){
        this.DLC();
          }else{
            this.replay();
          }


        return;
      }

      this.replayscreen = false;
      if (this.notes) {
        this.wolfram();
        return;
      }


      if (this.keyboardshort) {
/*
this.keyboardshort = false;
this.calcbuttons[1]='back';
this.calcbuttons[2]='info';
*/
this.about();
// ()()()()()()()()()()()()()
        return;
      }

      if (this.help) {
        if (this.hint) {

if (isNaN(this.level)){
this.revealed=true;

let subtitle

if(String(this.level).substring(0,3).toUpperCase()=='DLC'){
subtitle='this is one possible answer to the DLC level, calculating '+this.targetvalue+'.'
}else{
  subtitle='this answer passed our upload checker and calculated '+this.targetvalue+'. Once skipped or beaten, you may leave feedback for this level.'
}


this.prompt = this.alertCtrl.create({
     title: this.levelanswer,
    subTitle: subtitle,
        buttons: [
          {
            text: "Ok",
            handler: data => {}
          }

        ]
      });
      this.prompt.present();

}else{


if (this.level !== this.realLevel && this.realLevel !== 0) {
      //alert('fires');
      this.level = this.realLevel;
      this.realLevel = 0;
      this.clearAll(false);
      this.graph = false;
      this.help=false;
      this.hint=false;
      this.resetCalcButtons();

      this.result = "The Devil's Calculator";
      this.levelState();
      return;
    }

 this.prompt = this.alertCtrl.create({
        title: 'Skip Level?',
        subTitle: 'You can return at any time by using the <u>"level"</u> menu, under "Graph". Your notes will be saved. For additional help <a href="https://cinqmarsmedia.com/devilscalculator/guide">consult our online guide</a>',

        buttons: [

          {
            text: "cancel",
            handler: data => {

            }
          },
          {
            text: "Skip",
            handler: data => {
              if (!this.skipped.includes(this.level)){
              this.skipped.push(this.level);
              }
            this.resetCalcButtons();
            this.help = false;
            this.notes = false;
            this.graph = false;
            this.hint = false;
            this.levelWon();

            }
          }

        ]
      });
      this.prompt.present();

}

        } else {

if (this.nothingleft && !this.dlcMode){

this.forceFirebase(true);

}else{
     this.hint = true;
        if (!isNaN(this.level)){
          this.calcbuttons[1]='skip'
        }else{
          this.calcbuttons[1]='reveal'
        }

        }

        }

        return;
      }

      if (!this.graph && this.graphdata) {
        setTimeout(() => {
          //if (!this.lineChart){

          var newGraph = newchart;
          newGraph.data.datasets[0].data = this.graphPoints[0];
          newGraph.data.datasets[1].data = this.graphPoints[1];
          newGraph.data.datasets[2].data = this.graphPoints[2];

          this.lineChart = new Chart(this.lineCanvas.nativeElement, newchart); // instantiate graph
          //}

          this.lineChart.update();

        }, 0);
      }

      this.graph = !this.graph;

      if (this.graph){


this.calcbuttons[1]='back';


if (this.level !== this.realLevel && this.realLevel !== 0){
  if (this.dlcMode){
this.calcbuttons[0]='exit dlc';
  }else{
  this.calcbuttons[0]='exit lvl';
  }

}else{
   this.calcbuttons[0]='levels';
}
/*
if (this.level>60 || isNaN(this.level)){
this.calcbuttons[2]='create';
}else{
  */
if (!this.mobile){
this.calcbuttons[2]='info';

}else if (this.DRM){
this.calcbuttons[2]='upgrade';
}else{
this.calcbuttons[2]='about';
}

//}

}else{
  if (this.lineChart!==null){
this.lineChart.resetZoom();
}
this.resetCalcButtons();
}

      this.notes = false;
      this.help = false;
    }, 0);
  }

  DLC(){

if (this.DRM && this.dlcPlayed.length>3){
this.ads=[false,true,false,false];
  return;
}

    this.dlcMode=!this.dlcMode;
   if (!this.dlcMode){
     this.clearAll(false)
    this.graph = false;
    this.resetCalcButtons();
   }



    this.levelState();

  }

  create(bool: boolean = true) {
    this.replayscreen = false;
    this.graph = false;
       this.hint = false;

   // if (isNaN(this.level) || isNaN(this.realLevel) || this.realLevel>60 || this.level>60) {
      //!(this.level<this.finalLevel+1)
      if (!bool) {
        this.fetchFirebase();
      }

      this.creation = true;
      if (this.username == "" || !this.username) {
        this.creation = true;
        this.prompt = this.alertCtrl.create({
          enableBackdropDismiss: false,
          title: "Select A Username",

          subTitle: 'Usernames are device specific. You will need to make a new username when playing from another device. You cannot change your device username.' ,
          inputs: [
            {
              name: "username",
              //type:"search",
              placeholder: "newuser"
            }
          ],

          buttons: [
            {
              text: "Cancel",
              handler: data => {
                this.creation = false;
                 this.resetCalcButtons();
                 this.help=false;
                 this.graph=false;
                 this.replayscreen=false;

              }
            },

            {
              text: "Submit",
              handler: data => {
                data.username = data.username.replace(" ", "");
                data.username = data.username.replace(" ", "");

                data.username = data.username.toUpperCase();

                if (!isNaN(data.username)) {
                  alert("username cannot only be numbers");
                  //data.preventDefault();
                  return false;
                }

                if (data.username.length < 4) {
                  alert("username must be at least 4 chars in length");
                  return false;
                }

                //if (!this.usernames.includes(data.username)){
                let vulgar = false;
                let duplicateuser = false;
//alert(data.username);
                vulgarities.forEach(v => {
                  if (data.username.includes(v.toUpperCase())) {
                    vulgar = true;
                  }
                });

let official =['official','dlc','numberphile','ccj242','cinq']

  official.forEach(v => {
                  if (data.username.includes(v.toUpperCase())) {
                    duplicateuser = true;
                  }
  });

                this.usernames.forEach(item => {
                  if (item.toUpperCase() == data.username) {
                    duplicateuser = true;
                  }
                });

                if (vulgar) {
                  alert("vulgarities are not allowed");
                  return false;
                }

                if (duplicateuser) {
                  alert("username already taken");
                  return false;
                }


                //alert(this.fireuserkey);

                this.username = data.username;
                /*
                if (typeof this.itemsRef == "undefined") {
                  this.itemsRef = this.db.list("items");
                }
                */


                //this.itemsRef.update("-username", this.usernames);
                this.setData();
              }
            }
          ]
        });
        this.prompt.present();
        //return;
      }

  }

  replay(bool:boolean=false) {
    //alert(this.realLevel)
    if (this.level !== this.realLevel && this.realLevel !== 0) {
      //alert('fires');
      this.level = this.realLevel;
      this.realLevel = 0;
      this.clearAll(false);
      this.graph = false;
      this.resetCalcButtons();
      this.communityMode=false;

      //this.result = "The Devil's Calculator";.2.
      this.dlcMode=false;

      this.levelState();


            this.result = "Level: " + this.level;
setTimeout(() => {
        if (this.result.substring(0,6)=="Level: "){
          this.result = "";
        }
        //this.countIdle(false);
      }, 1500);
      return;
    }

    if (this.replayscreen) {
      this.replayscreen = false;
      this.resetCalcButtons();

    } else {
      /*
      if (this.level == 1) {
        this.DLC();

        return;
      }
      */
      this.replayscreen = true;

      if (bool){
      this.calcbuttons[1]='back';
      this.calcbuttons[0]='DLC';
      }else{
      this.calcbuttons[0]='back';
      this.calcbuttons[1]='DLC';
      }

      this.calcbuttons[2]='create';
    }
    this.graph = false;
    this.result = "";
  }

  levelSelect(lvl:any=this.result) {

    // ()()()()()()()()() if period

    if (lvl[0]=='.'){
      lvl=parseInt(lvl.substr(1));

if (lvl>this.dlcPlayed.length || lvl<1){
  this.graph=false;
  this.replayscreen=false;
  this.NoNo(true, "DLC lvl Not Available");
  return;
}

this.dlcMode=true;
var idToLoad=this.dlcPlayed[lvl-1];
this.levelState(false,idToLoad)
      return;
    }

    let lvlSel = parseInt(lvl);
    this.replayscreen = false;

if (lvlSel > this.finalLevel || lvlSel < 1) {
this.NoNo(true, "Level Does Not Exist");
return;
}

if (this.level+1<lvlSel && lvlSel<69){

if (this.DRM && lvlSel>22){
 this.ads=[false,true,false,false];
  return;
}

// prompt

this.prompt = this.alertCtrl.create({
     title: 'Warning',
    subTitle: 'Challenges are carefully constructed to build upon earlier concepts. Are you sure you wish to skip ahead?',
        buttons: [
        {
            text: "Cancel",
            handler: data => {
              this.result="";
            }
          },
          {
            text: "Ok",
            handler: data => {
  this.resetCalcButtons();
      this.realLevel = lvlSel;


 for (let i = this.level; i <= lvlSel; i++) {
    if (!this.skipped.includes(i)){
              this.skipped.push(i);
            }
      }

   this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
            this.historys = [];
            this.totalComputations=this.totalComputations+(lvlSel-this.level)*lvlSel;
            this.result='Level: '+lvlSel ;
            this.level=lvlSel;
            this.levelState();


      this.level = lvlSel;
      //this.newlevelstate=
      this.clearAll(false);
      this.levelState();
      this.result = "Level: " + this.level;
setTimeout(() => {
        if (this.result.substring(0,6)=="Level: "){
          this.result = "";
        }
        //this.countIdle(false);
      }, 1500);

            }
          }

        ]
      });
      this.prompt.present();

//this.NoNo(true, "Have Yet to Unlock");
return;
}

if (lvlSel==this.level){
this.NoNo(true);
return;
}

    if (lvlSel < this.level || isNaN(this.level)) {
      this.resetCalcButtons();
      this.realLevel = this.level;

      this.level = lvlSel;
      //this.newlevelstate=
      this.clearAll(false);
      this.calcbuttons[1]='exit lvl'
      this.levelState();
      this.result = "Level: " + this.level;

      setTimeout(() => {
        if (this.result.substring(0,6)=="Level: "){
          this.result = "";
        }

        //this.countIdle(false);
      }, 1500);
    }
  }


tapticCall(){
if (this.hapticSupress || !this.mobile){return}
    setTimeout(()=>{
this.taptic.selection();
},0)
}

hapticCall(type){
if (this.hapticSupress || !this.mobile){return}
  setTimeout(()=>{
this.deviceFeedback.haptic(type);
},0)
}

  clickSFX() {
    //this.btnclicksfx.src = "../../assets/sfx/click"+(Math.floor(Math.random() * 21)+1)+".mp3";
    //this.btnclicksfx.load()
    //this.btnclicksfx.play();
    if (!this.mute){
setTimeout(()=>{
    this.sfx.click[Math.floor(Math.random() * 6)].play();
},0)
    }
  }

  btnClicked(btn) {

if (!this.block && !this.filmleader && !this.help && !this.graph && !this.notes){


if (parseInt(btn)<10 && (!this.buttonDisallowState.includes(btn)||  this.replayscreen)){

  if (isNaN(this.result)) {

   if (this.result.match(/[a-z]/i) && !this.result.includes("e+")) {

          if (this.result.includes('Level:') && this.tooltip){
            this.levelprompt=false;
          }

          this.result = "";
          this.equation = "";
        }
      }

       if (this.nonotimeout) {
        clearTimeout(this.nonotimeout);
        this.nonotimeout = null;
        this.result = this.tempRez;
      }



if (this.equals){
this.equals = false;
this.result=btn;
this.equation = "";
this.operandState = [false, false, false];
}else{
this.result+=btn;
}

setTimeout(()=>{
this.btnClicked(13);
},0)
return;
}

if (btn == "C") {
this.result="";
setTimeout(()=>{
this.btnClicked('C1');
},0)
return;
}

if (btn=='C1'){
  btn='C';
}

}

    setTimeout(() => {
      if (this.block && !this.nothingleft) {
        return;
      }

      //console.log(1719)
      if (this.filmleader) {
        return;
      }

      if (this.level==1){

if (this.tutpop[0]==2){
this.tutpop[0]=0;
setTimeout(()=>{
        this.tutpop=[3,'76%','10%','70%','10%','What number plus four is 666? Use it to calculate 666 and win.',true];
      },0);

}else if (this.tutpop[0]==3){

this.tutpop[0]=0;
}




      }

      if (this.result=='Offline'){
        this.forceFirebase(true)
        return;
      }
      //console.log(this.haptic.available())


      this.clickSFX();
      this.tapticCall()
      //this.haptic.selection();


      if (this.help && !this.hint && !this.keyboardshort){

        if (btn == "Δ"){
    this.visualOperator(0)
    return;
        }

 if (btn == "ψ"){
    this.visualOperator(1)
    return;
        }
         if (btn == "φ"){
    this.visualOperator(2)
    return;
        }
/*
        if (btn=='2' && this.historys.length>1){
          this.clipboardCopy();
          return;
        }
*/

        if (btn=='negate'){
          this.muteSFX();
          return;
        }
        /*
        if (btn=='3'){
          this.threeCalc();
          return;
        }
        */
        if (btn=='6'){
          this.help=false;
          this.resetCalcButtons();
         this.forceFirebase();
          return;
        }

      }


      if (btn !== "=" && btn !== "AC") {
        this.hapticCall(3);
      }

      if (this.nonotimeout) {
        clearTimeout(this.nonotimeout);
        this.nonotimeout = null;
        this.result = this.tempRez;
      }

      if (this.levelprompt){
      if (isNaN(this.level) && this.tooltip){
        this.levelprompt=false;
      }
    }

      if (isNaN(this.result)) {

        if (this.result.match(/[a-z]/i) && !this.result.includes("e+")) {
          /**/
          if (this.result.includes('Level:') && this.tooltip){
            this.levelprompt=false;
          }

          this.result = "";
          this.equation = "";
        }
      }
      if (this.result == null) {
        this.result = "";
      }
      if (this.result.length > 30) {
        // overflow error
        this.NoNo(true, "overflow");
      }

if (this.graph && this.lineChart!==null){
  this.lineChart.resetZoom();
}
      this.help = false;
      this.graph = false;
      this.keyboardshort = false;
      this.hint = false;

      if (this.notes) {

        if (btn == "φ" || btn == "Δ" || btn == "ψ") {
          this.notesText += btn;
          this.focusNotes();
        } else if (!isNaN(btn)) {
          this.notesText += btn;
          this.focusNotes();
        } else if (btn == "AC" && this.notesText.length > 0) {
          this.notesText = "";
          this.focusNotes();
        } else if (btn == "C" && this.notesText.length== 0) {
          return;
        } else {
          //alert('why?');
          this.updateNotes();
          this.resetCalcButtons();
          this.notes = false;
        }

        return;
      }
if (!this.replayscreen){
      this.resetCalcButtons();
}
      //console.log(1776)
      if (this.buttonDisallowState.includes(btn) && !this.replayscreen) {
        if (isNaN(parseInt(btn)) && this.level < 3) {
          this.NoNo(
            false,
            impatient[Math.floor(impatient.length * Math.random())]
          );
        } else {
          if (btn !== "ψ" && btn !== "Δ" && btn !== "φ") {
            //alert('boooom');
            this.NoNo(false, onfire[Math.floor(onfire.length * Math.random())]);
            if (!this.mobile && this.wideview){
            this.flashonfire=true;
            setTimeout(()=>{this.flashonfire=false},1000)
            }

          }
        }

        return;
      }

      if (btn !== "C" && btn !== "AC") {
        this.countIdle(false);
      }

      if (btn == "C") {

        if (this.replayscreen){
        this.replayscreen = false;
        this.resetCalcButtons();
        }

        this.result = "";
        this.equals = false;
        this.equation = "";
        this.memorysave = -1;
        this.operandState = [false, false, false];
        this.countIdle(true);

      } else if (btn == "φ" || btn == "Δ" || btn == "ψ") {



        if (this.replayscreen) {
          this.resetCalcButtons();
          this.replayscreen = false;
          this.result = "";
          return;
        }
        /*
  if (btn=='ψ' && this.result[this.result.length-1]=='ψ'){
    this.NoNo(false);
  }
  */

    if (this.result[this.result.length-1]=='.'){
          this.NoNo(true);
          return;
        }


        let space;
        if (btn == "Δ") {

if (this.tutpop[0]>0){
this.tutpop[0]=0;
}


          space = "";

          if (this.equals) {
            //this.equation=this.result;
            //this.result='';
            this.equation = "";
            this.equals = false;
            /*
  if (!this.memoryrecalllast){ // GET RID OF THIS?? Makes game easier....
    this.operandState=[false,false,false]
  }else{
    this.memoryrecalllast=false;
  }
  */
          }
          //alert(String(this.result[0]))
          if (
            !isNaN(this.result.toString().slice(-1)) ||
            this.result[this.result.length - 1] == ")"
          ) {
            let urinary = this.result.toString().match(/[\d,\.,-,)]+$/g);

            if (urinary) {
              //this.result=this.result.replace(new RegExp(urinary[0] + '$'),'Δ('+urinary[0]+')');

              if (
                this.result.toString().lastIndexOf("ψ") >
                this.result.toString().lastIndexOf(")")
              ) {
                this.result = "Δ(" + this.result + ")"; // parentheses?
              } else {
                this.result = "Δ" + this.result;
              }

              return;
            }
          }
        } else if (btn == "φ") {
          space = "";

          if (this.equals) {
            //this.equation=this.result;
            //this.result='';
            this.equation = "";
            this.equals = false;
            /*
   if (!this.memoryrecalllast){
    this.operandState=[false,false,false]
  }else{
    this.memoryrecalllast=false;
  }
  */
          }

          if (
            !isNaN(this.result.toString().slice(-1)) ||
            this.result[this.result.length - 1] == ")"
          ) {
            let urinary = this.result.toString().match(/[\d,\.,-,)]+$/g);
            //alert(urinary);
            if (urinary) {
              //this.result=this.result.replace(new RegExp(urinary[0] + '$'),'Δ('+urinary[0]+')');

              if (
                this.result.toString().lastIndexOf("ψ") >
                this.result.toString().lastIndexOf(")")
              ) {
                this.result = "φ(" + this.result + ")"; // parentheses?
              } else {
                this.result = "φ" + this.result;
              }

              return;
            }
          }
        } else {
          if (this.result[this.result.length - 1] == "ψ") {
            return;
          }
          space = ""; //'  '
        }

        if (this.equals) {
          //console.log('equalstrue');
          //this.equation=this.result;
          //this.result='';
          //console.log(this.operandState);
          this.equation = "";
          this.equals = false;
          /*
    if (this.tempMemory[1].length>0){
    this.operandState=this.tempMemory[1]
    }else{
    this.operandState=[false,false,false]
    }
    */
        }
        this.result = this.result + space + btn + space;
      } else if (btn == "AC") {
        this.hapticCall(1);
        this.replayscreen = false;
        this.clearAll(true);
      } else if (btn == "=") {
        this.hapticCall(1);

        if (this.result !== "" && this.replayscreen) {
          this.levelSelect();
          return;
        }

if (this.result == ".0.0.0.0.") {
  this.storage.clear().then(() => {
window.location.reload(true);
  })
  return;
}

if (this.result==".000"){
  this.playedOnline=[]
  this.setData();
  this.levelState();
  return;
}

if (this.mobile){

if (this.result==".0900"){
this.hapticSupress=true;
this.NoNo(true, "haptics off");
return;
}



}


// -------------------
if (this.DRM && this.result.length>7 && !isNaN(parseFloat(this.result))){







//----------------------------------


}


if (this.result == ".00000") {
this.resetStoragewDRM();
  return;
}


      if (this.result == ".4973.") {

      if (this.DRM){
this.ads=[false,true,false,false];
        return;
      }

            // cheat code, 666th prime
            if (this.realLevel !== 0) {
              this.level = this.realLevel;
            }
/**/
            for (var i = this.level; i <= this.finalLevel; i++) {
              if (!this.skipped.includes(i)){
              this.skipped.push(i);
              }
            }

            //this.postgame=true;
            this.level = "postgame";
            this.tooltip='<b>*</b> Create your own levels and play ones others have made!'
            this.btnClicked("AC");
            this.realLevel = 0;
            this.levelState();
            this.result='PostGame';
            /*
            this.slideshow(
              slideInstructions.ending[0],
              slideInstructions.ending[1]
            );
            */
            /**/
            return;
          }


          if (this.result==".216." && !(this.realLevel>21)){
            this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
            this.historys = [];
            this.totalComputations=this.totalComputations+50;
            this.result='Level: 23';
            this.level=23;
            this.realLevel=23
            this.levelState();
            return;
          }


let temp:any=String(this.result).match(/^\..+\.$/g);

if (temp){
temp=String(temp).replace('.','');
temp=parseInt(temp)

if (temp>0 && temp<=68){
//console.log(this.realLevel);
if ((this.realLevel==0 && this.level<temp) || (this.realLevel!==0 && this.realLevel<temp)){

if (this.DRM && temp>22){
 this.ads=[false,true,false,false];
  return;
}

// prompt

this.prompt = this.alertCtrl.create({
     title: 'Warning',
    subTitle: 'Challenges are carefully constructed to build upon earlier concepts. Are you sure you wish to skip ahead?',
        buttons: [
        {
            text: "Cancel",
            handler: data => {
              this.result="";
            }
          },
          {
            text: "Ok",
            handler: data => {


  this.realLevel=0;

  for (let i = this.level; i <= temp; i++) {
    if (!this.skipped.includes(i)){
              this.skipped.push(i);
            }
      }

   this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
            this.historys = [];
             this.totalComputations=this.totalComputations+(temp-this.level)*temp;

            this.result='Level: '+temp;
            this.level=temp;
            this.clearAll(false);
            this.levelState();

            }
          }

        ]
      });

this.prompt.present();
      return;
}else{
//alert(this.level);
this.clearAll(false);

if (this.level>temp){
this.realLevel=this.level;
}


this.level=temp;
this.result='Level: '+temp;
this.clearAll(false);
this.calcbuttons[1]='exit lvl'
//this.levelSelect(temp)
this.levelState();
  return
}

}
}

if (String(this.result).split(".").length>2 && !this.result.includes('Δ') && !this.result.includes('φ') && !this.result.includes('ψ')){
this.NoNo(true);
return;
}

        if (!isNaN(this.result)) {
if (this.level==68 && this.result.includes('e+')){
  this.compute(this.result);
}

          // here
          if (this.result == "666") {
            this.compute(this.result);
          }

          return;
        }


if (!this.result.match(/\d/g)){
  return;
}

        /*
            if (this.regCalc){
              this.result=eval(this.result)
              return;
            }
  */

        this.mergeOperandStates(this.result);
        this.compute(this.result);

        this.equals = true;
      } else if (btn == "negate") {
        this.negation();
      } else if (btn == "MS1") {
        this.memorySave(0);
      } else if (btn == "MR1") {
        this.memoryRecall(0);
      } else if (btn == "MS2") {
        this.memorySave(1);
      } else if (btn == "MR2") {
        this.memoryRecall(1);
      } else if (btn == "MS3") {
        this.memorySave(2);
      } else if (btn == "MR3") {
        this.memoryRecall(2);
      } else {
        if (btn == ".") {
          if (this.replayscreen) {

            if (this.dlcPlayed.length==0){

            this.resetCalcButtons();
            this.replayscreen = false;
            this.result = "";
            }else{
              this.result='.';
              }

            return;
          }

          if (this.result[this.result.length - 1] == ".") {
            return;
          }
        }
        //console.log(2001)
        //console.log(this.result.split(''))
        if (this.result[2] !== "ψ") {
          this.equation = "";
        }
        //
        //console.log(this.equals);
        if (this.equals) {
/*
          if (
            this.level == 64 &&
            !isNaN(this.result) &&
            this.result !== "" &&
            this.result !== 0 && this.result!=="Build or Replay"
          ) {
            this.NoNo(true);
            return;
          }
*/

          // level


          this.result = "";
          //console.log('nigg');
          //this.equation=''
          this.equals = false;
          this.operandState = [false, false, false];
        }

if (isNaN(parseInt(btn))){ // ()()()()()
        this.result += btn;
        }
        //console.log(this.result);

        if (this.replayscreen) {
          let period=this.result.includes('.')
          if ((this.result.length > 2 && !period) || this.result.length > 3) {

            if (this.result.length>3 && period){
              //this.result='';
              this.result = this.result.substring(1)
            }

            this.result = this.result.substring(1);
          }
        }
      }
    }, 0);
  }




  focusNotes() {
    setTimeout(() => {
      let element: any = document.getElementById("notesInput");
      //this.notesText=temp

if (typeof this.prompt._state!== 'undefined' && this.prompt._state==3){return}

      if (element) {
        element.focus();

        //element.value()=this.notesText;
        element.setSelectionRange(element.value.length, element.value.length);

        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }

  countIdle(bool, long: boolean = false) {
    //return; // weird......
   // console.log('countidle',bool);
   if (this.intervalfunc == null && !bool){
    // console.log('returninining');
     return
   }else if (this.intervalfunc || !bool) {
      clearTimeout(this.intervalfunc);
      this.intervalfunc = null;
      return;
    } // maybe this will fix?

//!this.DRM && (this.level>9 || isNaN(this.level))
//if ((!(this.level<8) || this.DRM ) && (this.historys.length>1 || this.tooltip)){return}
if (this.historys.length>1 || (this.tooltip && !(this.level<8))){return}

if (!this.DRM){
long=true;
}

//if (){}
 // console.log((!(this.level<8)) && (this.historys.length>1 || this.tooltip || this.DRM ))


    if (bool) {
      var duration;

      if (long) {
        duration = Math.floor(Math.random() * 2000) + 18000;
      } else {
        duration = Math.floor(Math.random() * 1000) + 9700;
      }

      this.intervalfunc = setTimeout(() => {
        //alert(this.result);
        if (
          this.result == "" &&
          !this.graph &&
          !this.replayscreen &&
          !this.notes &&
          !this.help
        ) {
          this.NoNo(
            false,
            mockings[Math.floor(Math.random() * mockings.length)],
            false,false,true
          );
          //this.countIdle(false);
        }
      }, duration);
    }
  }

  resetStoragewDRM(){
      this.storage.clear().then(() => {
if (this.DRM==false){
var store
if (this.username.length>0){
store = {'DRM':false,'username':this.username}
}else{
store = {'DRM':false}
}

this.storage.set("data", store).then(()=>{
   window.location.reload(true);
})

}else{
    window.location.reload(true);
}

});
  }

  buyButton(){
//this.posterad=false // debug
//this.DRM=false; // debug
//this.adClose() // debug
    if (this.mobile){
  let loading = this.loadingCtrl.create({
    //spinner: 'bubbles',
    //content: ''
  });

  loading.present();

  //setTimeout(() => {
/*
var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
var purchkey

if (iOS){
purchkey=ios_purchase_key;
}else{
purchkey=android_purchase_key;
}
*/


    }else{
window.open("https://store.steampowered.com/app/1014280/The_Devils_Calculator/", "_system", "location=yes"); // steam
//this.posterad=false // debug
//this.DRM=false; // debug
//this.adClose() // debug

    }

  }


  clearAll(idle: boolean = false) {
    this.memory = [
      [null, [false, false, false]],
      [null, [false, false, false]],
      [null, [false, false, false]]
    ];
    this.memorysave = -1;
    this.tempMemory = [null, []];
    this.historys = [];
    this.equation = "";
    this.graphdata = false;
    this.graphPoints = [[], [], []];
    this.result = "";
    this.equals = false;
    this.operandState = [false, false, false];
    if (idle) {
      this.countIdle(true);
    } else {
      this.countIdle(true, true); //long
    }
    this.replayscreen = false;

    /*
this.lineChart.data.datasets[0].data=[]
this.lineChart.data.datasets[1].data=[]
this.lineChart.data.datasets[2].data=[]
*/
if (!this.mute){
    this.sfx.clear.play();
    }
    //haptic?

    this.setData();
  }

  negation() {

    if (this.replayscreen) {
      this.resetCalcButtons();
      this.replayscreen = false;
      this.result = "";
      return;
    }

    if (this.result == ".") {
      //this.NoNo(true);
      //return;
      this.result="-."
      return;
    }

    if (this.result == "-.") {
      this.result = ".";
      return;
    }

    if (this.equals && this.result == "") {
      this.result = "-";
      this.equals = false;
      this.equation = "";
      this.memorysave = -1;
      this.operandState = [false, false, false];
      this.countIdle(true);
      this.replayscreen = false;
    }
    if (this.result == "") {
      this.result = "-";
      return;
    }

    if (this.result == "-") {
      this.result = "";
      return;
    }

    /*
this.result=this.result+'-';
// last thing you did?
return;
*/

    let string = String(this.result);
    //var sanitized=string.replace(new RegExp("  ", "g"), "")
    var sanitized = string;

    // if there's a ψ further than a ) , set X
    let append = false;
    var x;

    if (sanitized.lastIndexOf("ψ") > sanitized.lastIndexOf(")")) {
      x = sanitized.slice(sanitized.lastIndexOf("ψ") + 1);
//console.log('fires');
     append = true;
      // capture after ψ
    } else {
     x = sanitized;

    }

//
    // process x

    // find the first thing from left to right. If it is a Δ\d or φ\d then cycle it, else just toggle it
    /*
var x=x.replace(/\.?\d\d?.?/g, "+$&");
var x=x.replace(/-\+/g, "@");
var x=x.replace(/\+/g, "-");
var x=x.replace(/\@/g, "");
*/
    //x=process(x);

    if ((x.slice(0, 2).match(/[[Δφ][\.\d(]/i) || []).length > 0) {
      x = x.slice(0, 1) + "-" + x.slice(1);
    } else if ((x.slice(0, 2).match(/[Δφ]\-/i) || []).length > 0) {
      x = "-" + x.slice(0, 1) + x.slice(2);
    } else if ((x.slice(0, 3).match(/\-[Δφ][^\-Δφ]/i) || []).length > 0) {
      x = x.slice(0, 2) + "-" + x.slice(2);
    } else if ((x.slice(0, 3).match(/\-[Δφ]\-/i) || []).length > 0) {
      x = x.slice(1, 2) + x.slice(3);
    } else if (x[0] == "-") {
      x = x.slice(1);
    } else {
      x = "-" + x;
    }

    /*
if (x.includes('-') && !(x.includes('-Δ') || x.includes('-φ'))){
var x=x.replace(/Δ/g, "-Δ");
var x=x.replace(/φ/g, "-φ");

}else if ((x.includes('-Δ') || x.includes('-φ'))&&(x.match(/-\d|-\./g)||[]).length==0){
var x=x.replace(/-Δ/g, "Δ");
var x=x.replace(/-φ/g, "φ");
}else{


}
*/

    // -----------------------------------

    if (append || sanitized[sanitized.length-1]=="ψ") {
x = sanitized.slice(0, sanitized.lastIndexOf("ψ") + 1) + x;
    }

    //x=x.replace('ψ','  ψ  ')
    this.result = x;

    // go through and change all pos numbers to negatives and all negatives to positives
    //alert(typeof String())

    // START HERE
    //[^\d-](\.?\d)|^[^\d-](\.?\d) replace with '+', switch, negatives are deleted pluses become minuses
    /*
var sanitized=string.replace(new RegExp(" ", "g"), "")

if (sanitized.includes('-φ-') || sanitized.includes('-Δ-')&&(sanitized.match(/-\d|-\./g)||[]).length==0){
var sanitized=sanitized.replace(/-Δ-/g, "Δ");
var sanitized=sanitized.replace(/-φ-/g, "φ");

this.result=sanitized;
return;

}

if (sanitized.includes('-') && !(sanitized.includes('-Δ') || sanitized.includes('-φ'))){
var temp=sanitized.replace(/Δ/g, "-Δ");
var temp=temp.replace(/φ/g, "-φ");
if (temp==sanitized){
  var temp=sanitized.replace(/\.?\d\d?.?/g, "+$&");
var temp=temp.replace(/-\+/g, "@");
var temp=temp.replace(/\+/g, "-");
var temp=temp.replace(/\@/g, "");
}

}else if ((sanitized.includes('-Δ') || sanitized.includes('-φ'))&&(sanitized.match(/-\d|-\./g)||[]).length==0){
var temp=sanitized.replace(/-Δ/g, "Δ");
var temp=temp.replace(/-φ/g, "φ");
}else{

var temp=sanitized.replace(/\.?\d\d?.?/g, "+$&");
var temp=temp.replace(/-\+/g, "@");
var temp=temp.replace(/\+/g, "-");
var temp=temp.replace(/\@/g, "");
}

this.result=temp;
*/

    /*
//[^\d-](\.?[\dΔφ])|^[^\d-](\.?[\dΔφ])
alert(temp);
return;
var temp=sanitized.replace(new RegExp("Δ|φ|ψ", "g"), "|")

   if (temp.indexOf("||") > -1 || temp.indexOf("..") > -1){

        //temp=temp.replace('|||','|X|X|'); //
     //alert('multiple symbols? what\'s to become of us?')
this.NoNo(true)
return;
   }


  if (temp[0] == '|' || temp[temp.length-1]=='|'){

    if (temp[0] == '|' && this.tempMemory[0] && !isNaN(this.tempMemory[0])){

      // weird issue????
     //temp=String(this.tempMemory[0])+temp
     //string=String(this.tempMemory[0])+string;
    }else{
          // alert('firess');
    //alert("operand at beginning or end");
    //this.NoNo(true)
    //return;
    }
  }

let numbers=temp.split("|");
//alert(numbers);
let tempsym=sanitized.replace(new RegExp("[0-9]|-|[.]", "g"), "")

let symbols=tempsym.split("");

let oppNums=[]
numbers.forEach((item:any)=>{

let opp

if (item>0){
  opp=0-item
}else if (item.length>0){
  opp=Math.abs(item)
}else{
  opp='';
}
  oppNums.push(opp)
})

let tempRez=''
if (symbols.length!==0){
for (var i=0;i<symbols.length;i++){

tempRez+=String(oppNums[i])
tempRez+=String(symbols[i])

if (i==symbols.length-1){
  tempRez+=String(oppNums[i+1])

}


}
}else{
  tempRez=oppNums[0]
}

this.result=tempRez;
*/
  }

  memorySave(num) {
    if (this.replayscreen) {
      this.resetCalcButtons();
      this.replayscreen = false;
      this.result = "";
      return;
    }

    if (isNaN(this.result)) {
      // formula
      this.memorysave = num;
      this.btnClicked("=");
      return;
    }
    if (!this.mute){
    this.sfx.save.play();
  }
    //alert(this.operandState);
    this.memory[num][0] = this.result;
    this.memory[num][1] = this.operandState;
    this.result = "";

    this.btnClicked("C");
    /*
setTimeout(()=>{
  this.result='';
},1000)
*/
    this.setData();
  }

  NoNo(x: boolean = false, y?, sfx: boolean = true, override: boolean = false, mock:boolean=false) {

this.countIdle(false);

if (this.creation){
  this.validatedLevel(2)
  return;
}

    if (sfx) {
      if (!this.mute){
setTimeout(()=>{
      this.sfx.nono.play();
},0)
      }
      this.hapticCall(1);
      this.tapticCall()
    } else {
      this.hapticCall(3);
      this.tapticCall()
    }
    //this.haptic.notification({ type: 'error' })

    this.memorysave = -1;

    if ((this.equals || x) && (this.level !== 64 || override)) {
      this.result = "";
      this.equation = "";
      this.equals = false;
      this.operandState = [false, false, false];
      this.tempMemory = [null, []];
    }

    //alert(this.result);

    this.tempRez = this.result;

    if (typeof y !== "undefined") {
      this.result = y;
    } else {
      this.result = errors[Math.floor(Math.random() * errors.length)];
    }

    this.err = true;

    //this.temphistorys=this.historys;
    /*
if (this.result.length>9){
this.historys=[]
}
*/

    setTimeout(() => {
      this.err = false;
    }, 200);

    this.nonotimeout = setTimeout(() => {
      if (this.result=='Sync Server'){
           this.fetchFirebase();
      }
      //var tmp=this.result
      this.result = this.tempRez;
      this.block=false;
      if (this.result=='' && !mock){
        //console.log('fires');
        this.countIdle(true)
      }
      //this.historys=this.temphistorys;
    }, 1500);
  }


  clipboardCopy(){
//console.log(this.historys);

if (this.historys.length<2 || this.mobile){return}

let val='';
let newline='\x0d\x0a';

this.historys.forEach((equation)=>{

  var temp=equation.replace(' = ','\x09');
  val+=temp+newline;

})

  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

this.tutorialPrompt('Formula History Copied to Clipboard');
  }

  memoryRecall(num) {
    if (this.replayscreen) {
      this.resetCalcButtons();
      this.replayscreen = false;
      this.result = "";
      return;
    }

    this.result = String(this.result);
    // dissallow if last thing is a number....
    if (!this.memory[num][0]) {
      this.memorySave(num);
      return;
    }

    //console.log(this.result.split(""));
    /* */
    if (!isNaN(parseInt(this.result[this.result.length - 1]))) {
      //this.memRecall=true;
      this.equals = true;
      this.result = this.memory[num][0];
      // reset operandstate
      //this.tempMemory[1]=
      this.operandState = [false, false, false];
      this.mergeOperandStates(this.result, this.memory[num][1]);
      return;
    }

    /**/

    //this.memRecall=true;
    this.equals = true;
    this.result += this.memory[num][0];
    this.mergeOperandStates(this.result, this.memory[num][1]);
    this.memoryrecalllast = true;
  }

  mergeOperandStates(result, other: any = [false, false, false]) {
    let alpha =
      String(result).indexOf("Δ") > -1 || this.operandState[0] || other[0];
    let beta =
      String(result).indexOf("ψ") > -1 || this.operandState[1] || other[1];
    let gamma =
      String(result).indexOf("φ") > -1 || this.operandState[2] || other[2];
    this.operandState = [alpha, beta, gamma];
    //alert(this.operandState);
  }

  compute(string, recur?, origstr?) {
    if (this.level == 68) {
      string = string.replace("e+", "09090909");
    }


    //alert(string);
    if (this.level == 66) {
      this.randomnum = Math.floor(Math.random() * 1000);
    }
    if (
      this.result == 666 &&
      (this.operandState[0] || this.buttonDisallowState.includes("Δ")) &&
      (this.operandState[1] || this.buttonDisallowState.includes("ψ")) &&
      (this.operandState[2] || this.buttonDisallowState.includes("φ"))
    ) {
      this.levelWon();
      return;
    } else if (this.result == 666) {
      return;
    }


    //let sanitized=string.replace(new RegExp(" | ", "g"), "");
    var sanitized = string;
    //alert(string);
    if (typeof origstr == "undefined") {
      origstr = sanitized;
    }
    //alert(origstr);
    if (typeof recur !== "undefined") {
      //console.log(recur);
      //sanitized=recur.replace(new RegExp(" | ", "g"), "");
      sanitized = recur;
    }

    if (this.level == 68) {
      sanitized = sanitized.replace("e+", "09090909");
    }

    // alert(sanitized);
    let paranth = false;
    let masterstring;
    let operatedstring;
    if (sanitized.includes("(")) {
      paranth = true;
      masterstring = sanitized;

      sanitized = sanitized
        .slice(sanitized.lastIndexOf("("))
        .match(/\((.*?)\)/g)[0];
      sanitized = sanitized.replace("(", "");
      sanitized = sanitized.replace(")", "");

      //alert(typeof sanitized);
      operatedstring = sanitized;
      //alert(operatedstring);
      // make sanitized what's in the innermost parentheses
      // recur after computation while preserving the master string
    }

    let urinary = sanitized.match(/Δ-?[\d,\.]+|φ-?[\d,\.]+/g);

    if (
      (sanitized.match(/\dΔ/g) || []).length > 0 ||
      (sanitized.match(/\dφ/g) || []).length > 0
    ) {
      this.NoNo(true); // come back to
      return;
    }

    if (urinary) {
      //alert(urinary[0]);
       let notint=false;
      urinary.forEach((exp, i) => { //.forEach(async(exp,i
        //alert(i);
        /*
if ((exp.match(/\./g) || []).length>1){
  nono=true;
}
*/
        let num;
        if (exp.includes("φ")) {
          num = exp.replace("φ", "");
          if (!Number.isInteger(parseFloat(num))){
notint=true;
          }

          sanitized = sanitized.replace(exp, this.Gamma(parseFloat(num)));
          sanitized = sanitized.replace("--", "");
        } else {
          num = exp.replace("Δ", "");
/**/
if (this.onlinechallengecont=="X9c99HDq"){
sanitized = sanitized.replace(exp, this.Alpha(num));
}else{
sanitized = sanitized.replace(exp, this.Alpha(parseFloat(num)));
}


         // sanitized = sanitized.replace(exp, await Promise.resolve(this.Alpha(parseFloat(num))));
          sanitized = sanitized.replace("--", "");
        }
      });

      if (sanitized.includes("Δ") || sanitized.includes("φ")) {
        //alert(sanitized);
        this.compute(string, sanitized, origstr);
        return;
      } else {
        // check if all parantheses have been resolved
      }
      if (notint){
        this.NoNo(false, "φ Not An Integer");
        return;
      }
    } else {
      let holder;
      if (
        sanitized.includes("Δ") &&
        this.tempMemory[0] &&
        !isNaN(this.tempMemory[0])
      ) {
        holder = sanitized.replace(
          /Δ([^Δ]*)$/,
          "Δ" + String(this.tempMemory[0]) + "$1"
        ); //a_b!c

        this.compute(holder, holder, origstr + this.tempMemory[0]);
        return;
      }

      if (
        sanitized.includes("φ") &&
        this.tempMemory[0] &&
        !isNaN(this.tempMemory[0])
      ) {
        holder = sanitized.replace(
          /φ([^Δ]*)$/,
          "φ" + String(this.tempMemory[0]) + "$1"
        ); //a_b!c

        this.compute(holder, holder, origstr + this.tempMemory[0]);
        return;
      }
    }

    var temp = sanitized.replace(new RegExp("φ|ψ", "g"), "|");

    if (temp.indexOf("||") > -1 || temp.indexOf("..") > -1) {
      //temp=temp.replace('|||','|X|X|'); //
      //alert('multiple symbols? what\'s to become of us?')
      this.NoNo(true);
      return;
    }

    if (temp[0] == "|" || temp[temp.length - 1] == "|") {
      if (
        temp[0] == "|" &&
        this.tempMemory[0] &&
        !isNaN(this.tempMemory[0]) &&
        !string.includes("(")
      ) {
        temp = String(this.tempMemory[0]) + temp;
        string = String(this.tempMemory[0]) + string;
        origstr = String(this.tempMemory[0]) + origstr;
      } else {
        //alert("operand at beginning or end");
        this.NoNo(true);
        return;
      }
    }

    let numbers = temp.split("|");

    //alert(numbers);
    let tempsym = sanitized.replace(new RegExp("[0-9]|-|[.]", "g"), "");

    let symbols = tempsym.split("");
    let runningValue = numbers[0];
    symbols.forEach((symbol, i) => {
      /*
if (symbol=='Δ'){
  //alert(runningValue+' '+numbers[i+1])
runningValue=this.Alpha(runningValue,numbers[i+1])
}else
*/

      if (symbol == "ψ") {
        runningValue = this.Beta(
          parseFloat(runningValue),
          parseFloat(numbers[i + 1])
        );

        if (this.level == 68) {
          this.lastlvlkicker = parseInt(numbers[i + 1]);
        }
      }
      /* second binary operation
else if (symbol=='φ'){
runningValue=this.Gamma(runningValue,numbers[i+1])
}
*/
    });


    //this.validatedLevel(true)
    // this.creation

    this.result = runningValue;

    if (
      String(this.result).includes(".") &&
      String(this.result).split(".")[1].length > 6
    ) {
      if(String(this.result).includes("e") && typeof this.result.toPrecision!=='undefined'){
        //console.log(typeof this.result.toPrecision)
        this.result=this.result.toPrecision(5)
      }

      this.result = Math.floor(this.result * 1000000) / 1000000;
    }

    //Math.floor(runningValue*1000000)/1000000
    this.equation = origstr;
    if (this.level == 68) {
      this.equation = this.equation.replace("09090909", "e+");
    } else {
      //this.result = parseFloat(parseFloat(this.result).toPrecision(8));

      if (String(this.result).includes('.9999')){
this.result=Math.floor(this.result)+1
      }else if (String(this.result).includes('.000001')){
this.result=Math.floor(this.result)
      }
    }

    if (paranth) {
      //alert(this.result);
      this.compute(
        masterstring,
        masterstring.replace("(" + operatedstring + ")", this.result),
        origstr
      );

      return;
    }

        if (this.creation) {
      var rez
      if (Math.floor(runningValue * 100) / 100 == this.targetvalue){
rez=1
      }else{
        /**/
        if (isNaN(Math.floor(runningValue * 100) / 100)){
          alert('Fatal problem with function, returns: '+Math.floor(runningValue * 100) / 100);
          return;
        }

        //alert(Math.floor(runningValue * 100) / 100)
        rez=0
        var output=Math.floor(runningValue * 100) / 100;
      }

this.validatedLevel(rez,output);
      this.result = "";
      return;
    }

    //alert('what? '+this.result);
    if (this.level == 68) {
      this.result = parseFloat(
        this.result.toString().replace("09090909", "e+")
      );
      if (this.equation.includes("Δ") && this.equation.includes("e+")) {
        var digitsadd = 0;

        String(Math.abs(this.lastlvlkicker))
          .split("")
          .forEach(digit => {
            digitsadd = digitsadd + parseInt(digit);
          });
        if (this.lastlvlkicker !== -1) {
          this.result = this.result + this.lastlvlkicker;
        }
        /*
if (this.lastlvlkicker<0){
 this.result=this.result-this.lastlvlkicker
}else{
this.result=this.result+this.lastlvlkicker
}
*/
      }
    }

    this.tempMemory[0] = this.result;
    this.tempMemory[1] = this.operandState;


var sciNote=(number)=>{
number=parseFloat(number);
var sciNumber=parseFloat(number.toExponential(3)).toExponential()


if (String(number).length >= String(number.toExponential()).length){
return sciNumber
}else{

if (number%100000==0 && number !==0){

return number.toExponential(0);
}
//alert(number.toExponential(3));
if (String(number).length>6 && String(sciNumber).length<String(number).length){
return sciNumber;
}

}

return number;
}

 let sanitizedequation=this.equation;

	let numInEquation=this.equation.match(/\d+/g)

	numInEquation.forEach((num)=>{

	sanitizedequation=sanitizedequation.replace(num,sciNote(num));

	})


    let sanitizedresult=sciNote(Math.floor(this.result*1000)/1000);

    let formula = sanitizedequation + " = " + sanitizedresult
// ()()()()() scinote if big?

    /*
if (this.level==68){
 formula=formula.toString().replace('09090909','e+')
}
*/

if (this.level==1 && this.realLevel==0 && this.historys.length==0 && this.tutpop!==-1 && this.result!==666){
this.tutpop=[2,'20%','12%','70%','10%',formula+' so perhaps the function is adding four to the input',false];
    }


    //console.log(this.historys)
    if (isNaN(this.result)) {
      this.result = String(this.result).replace("--", "");

      if (isNaN(this.result)) {
        //console.log(this.result);
        this.NoNo(true);
        // custom nonos for that level? maybe....
        // how to deal with hexidecimal?
        return;
      }
    }
if (!this.mute){
  setTimeout(()=>{
    this.sfx.compute.play();
    },0)
}
    if (!this.historys.includes(formula)) {
      this.historys.unshift(formula);

      let alpha = this.equation.includes("Δ");
      let beta = this.equation.includes("ψ");
      let gamma = this.equation.includes("φ");

      let onealpha = (this.equation.match(/Δ/g) || []).length == 1;
      let onebeta = (this.equation.match(/ψ/g) || []).length == 1;
      let onegamma = (this.equation.match(/φ/g) || []).length == 1;
      let updateGraph = false;
      let input;

      if (onealpha && !beta && !gamma) {
        input = this.equation.replace("Δ", "");

        //this.lineChart.data.datasets[0].data.push({x:parseFloat(input),y:this.result});
        /*
this.lineChart.data.datasets[0].data.sort(function(a, b) {
    return a.x - b.x;
});
*/

        this.graphPoints[0].push({ x: parseFloat(input), y: this.result });
        this.graphPoints[0].sort(function(a, b) {
          return a.x - b.x;
        });

        //this.lineChart.update();
        this.graphdata = true;
      } else if (onegamma && !beta && !alpha) {
        input = this.equation.replace("φ", "");
        /*
this.lineChart.data.datasets[2].data.push({x:parseFloat(input),y:this.result});
this.lineChart.data.datasets[2].data.sort(function(a, b) {
    return a.x - b.x;
});
*/
        this.graphPoints[2].push({ x: parseFloat(input), y: this.result });
        this.graphPoints[2].sort(function(a, b) {
          return a.x - b.x;
        });

        //this.lineChart.update();
        this.graphdata = true;
      } else if (onebeta && !alpha && !gamma) {
        input = this.equation.split("ψ");
        if (input[0] == input[1]) {
          /*
  this.lineChart.data.datasets[1].data.push({x:parseFloat(input[0]),y:this.result});
  this.lineChart.data.datasets[1].data.sort(function(a, b) {
    return a.x - b.x;
});
  */
          this.graphPoints[1].push({ x: parseFloat(input[0]), y: this.result });
          this.graphPoints[1].sort(function(a, b) {
            return a.x - b.x;
          });
          //this.lineChart.update();
          this.graphdata = true;
        }
      }

      if (this.graphPoints[0].length>1 || this.graphPoints[1].length>1 || this.graphPoints[2].length>1){
        this.calcbuttons[1]='graph';
      }

      // UPDATE CHARTS JS

      //if (origstr){}
      //console.log(this.lineChart.data.datasets[0].data)

      //if there is only one __

      //this.graphdata
    }
    this.equals = true; // fixes it?

this.totalComputations++
this.lvlcomputations++
    if (!this.platformMobile){
    this.setData();
}
    if (this.memorysave !== -1) {
      this.memorySave(this.memorysave);
      this.memorysave = -1;
      return;
    }

if (this.targetvalue!==666){
  this.targetvalue=parseInt(this.targetvalue);

if (isNaN(this.targetvalue)){
  //console.log('66 fallback');
  this.targetvalue=666;
}

if (this.level<69 && !this.dlcMode){
  //console.log('firesdlcfallback');
this.targetvalue=666;
}

}




//console.log(this.targetvalue);


    if (
      this.result == this.targetvalue &&
      (this.operandState[0] || this.buttonDisallowState.includes("Δ")) &&
      (this.operandState[1] || this.buttonDisallowState.includes("ψ")) &&
      (this.operandState[2] || this.buttonDisallowState.includes("φ"))
    ) {
      this.levelWon();
    }
  }


  levelWon() {
    if (!this.mute){
    this.sfx.win.play();
  }
  this.lvlcomputations=0;
    //this.haptic.notification({ type: 'success' })
    this.hapticCall(1);
    this.tapticCall()
    //this.countIdle(false);
    this.block = true;
    let onlinedone = false;
    this.historys = [];

let dlcReplay=false;

    setTimeout(() => {
          this.levelprompt=mathfacts[Math.floor(Math.random()*mathfacts.length)];
      if ((this.realLevel == 0 || this.communityMode) && !this.dlcMode) {
        // test logic
        if (isNaN(this.level)) {

          onlinedone = true;
          this.playedOnline.push(this.level);
          this.level = "Next User Challenge";
        }else {
         // alert(this.level)
          //alert(this.realLevel)
          if (this.level == this.finalLevel) {
            this.level = "postgame";
            this.tooltip='<b>*</b> Create your own levels and play ones others have made!'
            this.realLevel = 0;
            this.levelState();

            this.slideshow(
              slideInstructions.ending[0],
              slideInstructions.ending[1]
            );
            this.block = false;
            this.equation = "";
            return;
          } else {
            this.level++;
          }
        }
      } else if (this.dlcMode){

          //alert(this.onlinechallengecont);
          if (this.dlcPlayed.includes(this.onlinechallengecont)){
        dlcReplay=true;
          }else{
          this.dlcPlayed.push(this.onlinechallengecont)
          }

         this.onlinechallengecont=null;

  //console.log('fires');

      }else {
        if (this.skipped.includes(this.level)) {
          this.skipped.splice(this.skipped.indexOf(this.level));
        }
        this.level = this.realLevel;
        this.realLevel = 0;
      }

      this.clearAll(false);
      //this.soul = 0;

      this.memorysave = -1;
      let repeat = 0;
      var timer = setInterval(() => {
        this.result = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 10);

        repeat++;
        if (repeat == 10) {
          clearInterval(timer);
          if (onlinedone) {
            this.onlineLevelDone(true);
            return;
          }
          //let message = mockings[Math.floor(Math.random()*mockings.length)]
          //let message = "Level: " + this.level;
          //this.NoNo(true, message, true, true);
/**/
let islastlvldlc=String(this.level).substring(0,3).toUpperCase()=='DLC'

if (islastlvldlc){
   this.result="Level: " + this.realLevel;
}else{
  this.result="Level: " + this.level;
}

          //console.log(this.result);


          if (!this.mute){
          this.sfx.nono.play();
}
      this.hapticCall(1);
      this.tapticCall()

 this.err = true;
    setTimeout(() => {
      this.err = false;
    }, 200);

    if (dlcReplay){
        this.replay();
    }else{
         this.levelState();
    }


          this.block = false;
          this.setData();
        }
      }, 100);
    }, 1000);
  }
}
