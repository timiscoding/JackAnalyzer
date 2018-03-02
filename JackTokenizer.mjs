import readlines from 'n-readlines';

export default class JackTokenizer {
  constructor(filename) {
    this.readLine = new readlines(filename);
    this.prevLine = '';
    this.line = '';
    this.lineIndex = 0;
    this.nextToken = {};
    this.token = {};
  }

  static get types() {
    return Object.freeze({
      KEYWORD: "keyword",
      SYMBOL: "symbol",
      IDENTIFIER: "identifier",
      INT_CONST: "integerConstant",
      STRING_CONST: "stringConstant",
    });
  }

  static get keywords() {
    return Object.freeze({
      CLASS: 'class',
      METHOD: 'method',
      FUNCTION: 'function',
      CONSTRUCTOR: 'constructor',
      INT: 'int',
      BOOLEAN: 'boolean',
      CHAR: 'char',
      VOID: 'void',
      VAR: 'var',
      STATIC: 'static',
      FIELD: 'field',
      LET: 'let',
      DO: 'do',
      IF: 'if',
      ELSE: 'else',
      WHILE: 'while',
      RETURN: 'return',
      TRUE: 'true',
      FALSE: 'false',
      NULL: 'null',
      THIS: 'this',
    });
  }

  getLine() {
    let noComments = '';
    let whiteSpaceComment = /\/\/.*/;
    const blockComment = /\/\*(?:\*(?!\/)|(?<!\*)\/|[^\*\/])*(\*\/)?$/; // match * if no / after it, match / if no * before it

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
