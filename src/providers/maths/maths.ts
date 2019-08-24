import { Injectable } from '@angular/core';
import * as math from 'mathjs';


/*
  Generated class for the MathsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MathsProvider {
  private limitedEval: any
  constructor() {
    this.limitedEval = math.eval
    math.import({
      'import': function () { throw new Error('Function import is disabled') },
      'createUnit': function () { throw new Error('Function createUnit is disabled') },
      'eval': function () { throw new Error('Function eval is disabled') },
      'parse': function () { throw new Error('Function parse is disabled') },
      'simplify': function () { throw new Error('Function simplify is disabled') },
      'derivative': function () { throw new Error('Function derivative is disabled') }
    }, { override: true });
  }

  private iterEval(str, a?, b?) {
    //parse the input for the ternary operator
    //search for all /?/ and /:/ and then turn them into an if expression
    //also search for a and b and replace them with their actual values
    let childStr1, childStr2, childStr3;

    for (let i = 0; i < str.length; i++) {
      if (str[i] == "?") {
        childStr1 = str.substring(0, i);
        let count = 0;
        for (let j = i + 1; j < str.length; j++) {
          if (str[j] == "?") {
            count++;
          }
          if (str[j] == ":") {
            count--;
          }
          if (count == -1) {
            childStr2 = str.substring(i + 1, j);
            childStr3 = str.substring(j + 1);
            break;
          }
        }

        if (this.substituteEval(childStr1, a, b)) {
          return this.iterEval(childStr2, a, b);
        } else {
          return this.iterEval(childStr3, a, b);
        }
      }

    }

    return this.substituteEval(str, a, b);
  }

  //evaluate after substituing for a and b
  private substituteEval(str, a?, b?) {
    let reA = /(.*)(a)([^a-zA-Z]|$)(.*)/
    while (str.match(reA)) {
      str = str.replace(reA, function (match, $1, $2, $3, $4, offset, str) {
        return $1 + "(" + a + ")" + $3 + $4;
      });
    }

    let reB = /(.*)(b)([^a-zA-Z]|$)(.*)/
    while (str.match(reB)) {
      str = str.replace(reB, function (match, $1, $2, $3, $4, offset, str) {
        return $1 + "(" + b + ")" + $3 + $4;
      });
    }

    //close brackets
    let openingBrackets = str.replace(/[^\(]/g, "").length;
    let closingBrackets = str.replace(/[^\)]/g, "").length;

    for (let i = 0; i < openingBrackets - closingBrackets; i++) {
      str = str + ")";
    }
    for (let i = 0; i < closingBrackets - openingBrackets; i++) {
      str = "(" + str;
    }

    return this.limitedEval(str);
  }

  private customEval(x, a?, b?) {
    x = x.toLowerCase();
    //remove last semicolon
    if (x[x.length - 1] == ";") {
      x = x.substring(0, x.length - 1);
    }
    return this.iterEval(x, a, b);
  }

  public mathEval(x, a?, b?) {
    try {
      return this.parseResult(this.customEval(x, a, b))
    } catch (err) {
      console.error("mathEval error", err);
      throw err;
    }
  }

  private parseResult(x: any) {
    if (math.typeof(x) == "Array") {
      return this.parseResult(x[0]);
    }
    if (math.typeof(x) == "ResultSet") {
      return this.parseResult(x.valueOf());
    }
    if (math.typeof(x) == "Matrix") {
      return this.parseResult(math.subset(x, math.index(0)));
    }
    return x;
  }

}