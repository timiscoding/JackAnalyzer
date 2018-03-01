/*
comment
// hi
*/
/** lala*/
import readlines from 'n-readlines';
class JackTokenizer { // hi

  constructor(filename) { /** comment */
    this.readLine = new readlines(filename); /* something */
    this.prevLine = '';
    this.line = '';
    this.lineIndex = 0;
    this.nextToken = {};
    this.token = {};
  }

  getLine() {
    let noComments = '';
    let whiteSpaceComment = /\/\/.*/;
    const blockComment = /\/\*[^\*]*[^\/]*(\*\/)?$/;

    if (this.line = this.readLine.next()) {
      this.line = this.prevLine + this.line.toString().trim();
      noComments = this.line.replace(whiteSpaceComment, '').trim();
      const blockMatch = this.line.match(blockComment);

      if (Array.isArray(blockMatch)) {
        noComments = this.line.replace(blockComment, '').trim();
        if (blockMatch[1] === undefined) {
          this.prevLine = blockMatch[0];
        } else if (blockMatch[1] === '*/') {
          this.prevLine = '';
        }
      }

      if (noComments.length === 0) {
        return this.getLine();
        this.prevLine = '';
      } else {
        return noComments;
      }
    }
    return false;
  }

  hasMoreTokens() {
    if (this.lineIndex === 0 || this.lineIndex >= this.line.length) {
      if ((this.line = this.getLine()) === false) {
        return false;
      }
      this.lineIndex = 0;
    }
    const keywordRe = "\\b(class|constructor|function|method|field|static|var|int|char|boolean|void|true|false|null|this|let|do|if|else|while|return)\\b";
    const identifierRe = "\\b([a-z][a-z_0-9]*)\\b";
    const symbolRe = "([\\-\\[\\]{}().,;+*/&|<>=~])";
    const intConstRe = "(\\d+)";
    const stringConstRe = '(".+")';
    const tokens = new RegExp([keywordRe, identifierRe, symbolRe, intConstRe, stringConstRe].join('|'), "gi");
    let matches;

    tokens.lastIndex = this.lineIndex;
    if ((matches = tokens.exec(this.line)) !== null) {
      const types = ["KEYWORD", "IDENTIFIER", "SYMBOL", "INT_CONST", "STRING_CONST"];
      matches.slice(1).forEach((match, i) => {
        if (match) {
          this.nextToken.type = types[i];
          this.nextToken.value = match;

          if (this.nextToken.type === "STRING_CONST") {
            this.nextToken.value = this.nextToken.value.slice(1, -1);
          }
        }
      })
      this.lineIndex = tokens.lastIndex;
      console.log(this.nextToken);
      return true;
    }
  }
}

var tk = new JackTokenizer("Square/Main.jack");
while (tk.hasMoreTokens()) {}
