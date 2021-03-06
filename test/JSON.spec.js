"use strict";
var dist_1 = require('../dist');
var TestHelpers_1 = require('./TestHelpers');
var inspect = require('util').inspect;
var grammar = "\n/* https://www.ietf.org/rfc/rfc4627.txt */\nvalue                ::= false | null | true | object | array | number | string\nBEGIN_ARRAY          ::= WS* #x5B WS*  /* [ left square bracket */\nBEGIN_OBJECT         ::= WS* #x7B WS*  /* { left curly bracket */\nEND_ARRAY            ::= WS* #x5D WS*  /* ] right square bracket */\nEND_OBJECT           ::= WS* #x7D WS*  /* } right curly bracket */\nNAME_SEPARATOR       ::= WS* #x3A WS*  /* : colon */\nVALUE_SEPARATOR      ::= WS* #x2C WS*  /* , comma */\nWS                   ::= [#x20#x09#x0A#x0D]+   /* Space | Tab | \n | \r */\nfalse                ::= \"false\"\nnull                 ::= \"null\"\ntrue                 ::= \"true\"\nobject               ::= BEGIN_OBJECT (member (VALUE_SEPARATOR member)*)? END_OBJECT\nmember               ::= string NAME_SEPARATOR value\narray                ::= BEGIN_ARRAY (value (VALUE_SEPARATOR value)*)? END_ARRAY\n\n/* NUMBERS */\n\nnumber          ::= \"-\"? (\"0\" | [1-9] DIGIT*) (\".\" [0-9]+)? EXP?\nDIGIT           ::= [0-9]\nEXP             ::= (\"e\" | \"E\") ( \"-\" | \"+\" )? (\"0\" | [1-9] [0-9]*)\n\n/* STRINGS */\n\nstring          ::= '\"' CHAR* '\"'\nESCAPE          ::= #x5C /*  */\nHEXDIG          ::= [a-fA-F0-9]\nESCAPABLE       ::= #x22 | #x5C | #x2F | #x62 | #x66 | #x6E | #x72 | #x74 | #x75 HEXDIG HEXDIG HEXDIG HEXDIG\nCHAR            ::= UNESCAPED | ESCAPE ESCAPABLE\nUNESCAPED       ::= [#x20-#x21] | [#x23-#x5B] | [#x5D-#xFFFF]\n  ";
describe('JSON', function () {
    describe('Parse JSON', function () {
        var parser;
        it('create parser', function () {
            parser = new dist_1.Parser(dist_1.Grammars.W3C.RULES, {});
            TestHelpers_1.testParseToken(parser, grammar);
        });
    });
    describe('Grammars.W3C parses JSON grammar', function () {
        var RULES = dist_1.Grammars.W3C.getRules(grammar);
        var parser = new dist_1.Parser(RULES, {});
        TestHelpers_1.printBNF(parser);
        TestHelpers_1.testParseToken(parser, JSON.stringify(true));
        TestHelpers_1.testParseToken(parser, JSON.stringify(false));
        TestHelpers_1.testParseToken(parser, JSON.stringify(null));
        TestHelpers_1.testParseToken(parser, JSON.stringify(""));
        TestHelpers_1.testParseToken(parser, JSON.stringify("\""));
        TestHelpers_1.testParseToken(parser, JSON.stringify("\"{}"));
        TestHelpers_1.testParseToken(parser, JSON.stringify(10));
        TestHelpers_1.testParseToken(parser, JSON.stringify(-10));
        TestHelpers_1.testParseToken(parser, JSON.stringify(-10.1));
        parser.debug = true;
        TestHelpers_1.testParseToken(parser, JSON.stringify(10.1E123));
        parser.debug = false;
        TestHelpers_1.testParseToken(parser, JSON.stringify({}));
        TestHelpers_1.testParseToken(parser, JSON.stringify({ a: true }));
        TestHelpers_1.testParseToken(parser, JSON.stringify({ a: false }));
        parser.debug = true;
        TestHelpers_1.testParseToken(parser, JSON.stringify({
            a: false, b: "asd\n      asd ", list: [1, 2, 3, true]
        }));
        parser.debug = false;
        TestHelpers_1.testParseToken(parser, JSON.stringify([]));
        TestHelpers_1.testParseToken(parser, JSON.stringify([{}]));
        TestHelpers_1.testParseToken(parser, JSON.stringify([null, false]));
    });
});
//# sourceMappingURL=JSON.spec.js.map