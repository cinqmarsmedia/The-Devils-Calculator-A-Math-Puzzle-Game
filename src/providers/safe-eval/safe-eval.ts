import { Injectable } from '@angular/core';

/*
  Generated class for the SafeEvalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//note: safeEval is not being used at line 2081 in home.ts, eval is being directly used there
@Injectable()
export class SafeEvalProvider {
  private r: any;
  constructor() {
    if (window["SES"]) {
      this.r = window["SES"].makeSESRootRealm({ mathRandomMode: 'allow' });
    } else {
      console.warn("NO SES")
      this.r = {
        evaluate: (code, endowments) => {
          return ((function (code, endowments) {
            let props = Object.keys(endowments);
            let str="";
            for(let i=0;i<props.length;i++){
              let prop = props[i];
                str+=("var " + prop + "=" + endowments[prop]+";")
            }
            let answer = eval(str+code);
            return answer;
          })(code, endowments))
        }
      }
    }
    //this.r = window["SES"].makeSESRootRealm({consoleMode:'allow', errorStackMode: 'allow',mathRandomMode: 'allow'});
  }
  public evaluate(code: any, endowments?: any): any {
    if (typeof code !== "string") {
      code = `(${code})`;
    }
    return this.r.evaluate(code, endowments);
  }
}
