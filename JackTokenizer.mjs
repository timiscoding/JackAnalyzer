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

  static get types() {
    return Object.freeze({
      KEYWORD: "KEYWORD",
      SYMBOL: "SYMBOL",
      IDENTIFIER: "IDENTIFIER",
      INT_CONST: "INTEGER CONSTANT",
      STRING_CONST: "STRING CONSTANT",
    });
  }

  static get keywords() {
    return Object.freeze({
      CLASS: 'CLASS',
      METHOD: 'METHOD',
      FUNCTION: 'FUNCTION',
      CONSTRUCTOR: 'CONSTRUCTOR',
      INT: 'INT',
      BOOLEAN: 'BOOLEAN',
      CHAR: 'CHAR',
      VOID: 'VOID',
      VAR: 'VAR',
      STATIC: 'STATIC',
      FIELD: 'FIELD',
      LET: 'LET',
      DO: 'DO',
      IF: 'IF',
      ELSE: 'ELSE',
      WHILE: 'WHILE',
      RETURN: 'RETURN',
      TRUE: 'TRUE',
      FALSE: 'FALSE',
      NULL: 'NULL',
      THIS: 'THIS',
    });
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
    const stringConstRe = '"(.+)"';
    const tokens = new RegExp([keywordRe, identifierRe, symbolRe, intConstRe, stringConstRe].join('|'), "gi");
    let matches;

    tokens.lastIndex = this.lineIndex;
    if ((matches = tokens.exec(this.line)) !== null) {
      const { KEYWORD, IDENTIFIER, SYMBOL, INT_CONST, STRING_CONST } = JackTokenizer.types;
      const captureGroup = [KEYWORD, IDENTIFIER, SYMBOL, INT_CONST, STRING_CONST];
      matches.slice(1).forEach((match, i) => {
        if (match) {
          this.nextToken.type = captureGroup[i];
          this.nextToken.value = match;
        }
      })
      this.lineIndex = tokens.lastIndex;
      return true;
    }
  }

  advance() {
    this.token = this.nextToken;
  }

  tokenType() {
    return this.token.type;
  }

  keyword() {
    return JackTokenizer.keywords[this.token.value.toUpperCase()];
  }

  symbol() {
    return this.token.value;
  }

  identifier() {
    return this.token.value;
  }

  intVal() {
    return parseInt(this.token.value, 10);
  }

  stringVal() {
    return this.nextToken.value;
  }


}

var tk = new JackTokenizer("Square/Main.jack");
while (tk.hasMoreTokens()) {
  tk.advance();
  const {KEYWORD, SYMBOL, IDENTIFIER, INT_CONST, STRING_CONST} = JackTokenizer.types;
  switch(tk.tokenType()) {
    case KEYWORD:
      console.log(tk.tokenType(), tk.keyword());
      break;
    case SYMBOL:
      console.log(tk.tokenType(), tk.symbol());
      break;
    case IDENTIFIER:
      console.log(tk.tokenType(), tk.identifier());
      break;
    case INT_CONST:
      console.log(tk.tokenType(), tk.intVal());
      break;
    case STRING_CONST:
      console.log(tk.tokenType(), tk.stringVal());
      break;
  }
}
