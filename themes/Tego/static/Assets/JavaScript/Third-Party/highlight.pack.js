/*
  Highlight.js 10.0.1 (33af2ea5)
  License: BSD-3-Clause
  Copyright (c) 2006-2020, Ivan Sagalaev
*/
! function(e, n) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = e || self).hljs = n()
}(this, (function() {
  "use strict";

  function e(n) {
      Object.freeze(n);
      var t = "function" == typeof n;
      return Object.getOwnPropertyNames(n).forEach((function(r) {
          !n.hasOwnProperty(r) || null === n[r] || "object" != typeof n[r] && "function" != typeof n[r] || t && ("caller" === r || "callee" === r || "arguments" === r) || Object.isFrozen(n[r]) || e(n[r])
      })), n
  }

  function n(e) {
      return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function t(e) {
      var n, t = {},
          r = Array.prototype.slice.call(arguments, 1);
      for (n in e) t[n] = e[n];
      return r.forEach((function(e) {
          for (n in e) t[n] = e[n]
      })), t
  }

  function r(e) {
      return e.nodeName.toLowerCase()
  }
  var a = Object.freeze({
      __proto__: null,
      escapeHTML: n,
      inherit: t,
      nodeStream: function(e) {
          var n = [];
          return function e(t, a) {
              for (var i = t.firstChild; i; i = i.nextSibling) 3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({
                  event: "start",
                  offset: a,
                  node: i
              }), a = e(i, a), r(i).match(/br|hr|img|input/) || n.push({
                  event: "stop",
                  offset: a,
                  node: i
              }));
              return a
          }(e, 0), n
      },
      mergeStreams: function(e, t, a) {
          var i = 0,
              s = "",
              o = [];

          function l() {
              return e.length && t.length ? e[0].offset !== t[0].offset ? e[0].offset < t[0].offset ? e : t : "start" === t[0].event ? e : t : e.length ? e : t
          }

          function c(e) {
              s += "<" + r(e) + [].map.call(e.attributes, (function(e) {
                  return " " + e.nodeName + '="' + n(e.value).replace(/"/g, "&quot;") + '"'
              })).join("") + ">"
          }

          function u(e) {
              s += "</" + r(e) + ">"
          }

          function d(e) {
              ("start" === e.event ? c : u)(e.node)
          }
          for (; e.length || t.length;) {
              var g = l();
              if (s += n(a.substring(i, g[0].offset)), i = g[0].offset, g === e) {
                  o.reverse().forEach(u);
                  do {
                      d(g.splice(0, 1)[0]), g = l()
                  } while (g === e && g.length && g[0].offset === i);
                  o.reverse().forEach(c)
              } else "start" === g[0].event ? o.push(g[0].node) : o.pop(), d(g.splice(0, 1)[0])
          }
          return s + n(a.substr(i))
      }
  });
  const i = "</span>",
      s = e => !!e.kind;
  class o {
      constructor(e, n) {
          this.buffer = "", this.classPrefix = n.classPrefix, e.walk(this)
      }
      addText(e) {
          this.buffer += n(e)
      }
      openNode(e) {
          if (!s(e)) return;
          let n = e.kind;
          e.sublanguage || (n = `${this.classPrefix}${n}`), this.span(n)
      }
      closeNode(e) {
          s(e) && (this.buffer += i)
      }
      span(e) {
          this.buffer += `<span class="${e}">`
      }
      value() {
          return this.buffer
      }
  }
  class l {
      constructor() {
          this.rootNode = {
              children: []
          }, this.stack = [this.rootNode]
      }
      get top() {
          return this.stack[this.stack.length - 1]
      }
      get root() {
          return this.rootNode
      }
      add(e) {
          this.top.children.push(e)
      }
      openNode(e) {
          let n = {
              kind: e,
              children: []
          };
          this.add(n), this.stack.push(n)
      }
      closeNode() {
          if (this.stack.length > 1) return this.stack.pop()
      }
      closeAllNodes() {
          for (; this.closeNode(););
      }
      toJSON() {
          return JSON.stringify(this.rootNode, null, 4)
      }
      walk(e) {
          return this.constructor._walk(e, this.rootNode)
      }
      static _walk(e, n) {
          return "string" == typeof n ? e.addText(n) : n.children && (e.openNode(n), n.children.forEach(n => this._walk(e, n)), e.closeNode(n)), e
      }
      static _collapse(e) {
          e.children && (e.children.every(e => "string" == typeof e) ? (e.text = e.children.join(""), delete e.children) : e.children.forEach(e => {
              "string" != typeof e && l._collapse(e)
          }))
      }
  }
  class c extends l {
      constructor(e) {
          super(), this.options = e
      }
      addKeyword(e, n) {
          "" !== e && (this.openNode(n), this.addText(e), this.closeNode())
      }
      addText(e) {
          "" !== e && this.add(e)
      }
      addSublanguage(e, n) {
          let t = e.root;
          t.kind = n, t.sublanguage = !0, this.add(t)
      }
      toHTML() {
          return new o(this, this.options).value()
      }
      finalize() {}
  }

  function u(e) {
      return e && e.source || e
  }
  const d = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
      g = {
          begin: "\\\\[\\s\\S]",
          relevance: 0
      },
      h = {
          className: "string",
          begin: "'",
          end: "'",
          illegal: "\\n",
          contains: [g]
      },
      f = {
          className: "string",
          begin: '"',
          end: '"',
          illegal: "\\n",
          contains: [g]
      },
      p = {
          begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
      },
      m = function(e, n, r) {
          var a = t({
              className: "comment",
              begin: e,
              end: n,
              contains: []
          }, r || {});
          return a.contains.push(p), a.contains.push({
              className: "doctag",
              begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
              relevance: 0
          }), a
      },
      b = m("//", "$"),
      v = m("/\\*", "\\*/"),
      x = m("#", "$");
  var _ = Object.freeze({
          __proto__: null,
          IDENT_RE: "[a-zA-Z]\\w*",
          UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
          NUMBER_RE: "\\b\\d+(\\.\\d+)?",
          C_NUMBER_RE: d,
          BINARY_NUMBER_RE: "\\b(0b[01]+)",
          RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
          BACKSLASH_ESCAPE: g,
          APOS_STRING_MODE: h,
          QUOTE_STRING_MODE: f,
          PHRASAL_WORDS_MODE: p,
          COMMENT: m,
          C_LINE_COMMENT_MODE: b,
          C_BLOCK_COMMENT_MODE: v,
          HASH_COMMENT_MODE: x,
          NUMBER_MODE: {
              className: "number",
              begin: "\\b\\d+(\\.\\d+)?",
              relevance: 0
          },
          C_NUMBER_MODE: {
              className: "number",
              begin: d,
              relevance: 0
          },
          BINARY_NUMBER_MODE: {
              className: "number",
              begin: "\\b(0b[01]+)",
              relevance: 0
          },
          CSS_NUMBER_MODE: {
              className: "number",
              begin: "\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
              relevance: 0
          },
          REGEXP_MODE: {
              begin: /(?=\/[^\/\n]*\/)/,
              contains: [{
                  className: "regexp",
                  begin: /\//,
                  end: /\/[gimuy]*/,
                  illegal: /\n/,
                  contains: [g, {
                      begin: /\[/,
                      end: /\]/,
                      relevance: 0,
                      contains: [g]
                  }]
              }]
          },
          TITLE_MODE: {
              className: "title",
              begin: "[a-zA-Z]\\w*",
              relevance: 0
          },
          UNDERSCORE_TITLE_MODE: {
              className: "title",
              begin: "[a-zA-Z_]\\w*",
              relevance: 0
          },
          METHOD_GUARD: {
              begin: "\\.\\s*[a-zA-Z_]\\w*",
              relevance: 0
          }
      }),
      E = "of and for in not or if then".split(" ");

  function R(e, n) {
      return n ? +n : (t = e, E.includes(t.toLowerCase()) ? 0 : 1);
      var t
  }
  const N = n,
      w = t,
      {
          nodeStream: y,
          mergeStreams: O
      } = a;
  return function(n) {
      var r = [],
          a = {},
          i = {},
          s = [],
          o = !0,
          l = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
          d = "Could not find the language '{}', did you forget to load/include a language module?",
          g = {
              noHighlightRe: /^(no-?highlight)$/i,
              languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
              classPrefix: "hljs-",
              tabReplace: null,
              useBR: !1,
              languages: void 0,
              __emitter: c
          };

      function h(e) {
          return g.noHighlightRe.test(e)
      }

      function f(e, n, t, r) {
          var a = {
              code: n,
              language: e
          };
          T("before:highlight", a);
          var i = a.result ? a.result : p(a.language, a.code, t, r);
          return i.code = a.code, T("after:highlight", i), i
      }

      function p(e, n, r, i) {
          var s = n;

          function l(e, n) {
              var t = v.case_insensitive ? n[0].toLowerCase() : n[0];
              return e.keywords.hasOwnProperty(t) && e.keywords[t]
          }

          function c() {
              null != _.subLanguage ? function() {
                  if ("" !== k) {
                      var e = "string" == typeof _.subLanguage;
                      if (!e || a[_.subLanguage]) {
                          var n = e ? p(_.subLanguage, k, !0, E[_.subLanguage]) : m(k, _.subLanguage.length ? _.subLanguage : void 0);
                          _.relevance > 0 && (T += n.relevance), e && (E[_.subLanguage] = n.top), w.addSublanguage(n.emitter, n.language)
                      } else w.addText(k)
                  }
              }() : function() {
                  var e, n, t, r;
                  if (_.keywords) {
                      for (n = 0, _.lexemesRe.lastIndex = 0, t = _.lexemesRe.exec(k), r = ""; t;) {
                          r += k.substring(n, t.index);
                          var a = null;
                          (e = l(_, t)) ? (w.addText(r), r = "", T += e[1], a = e[0], w.addKeyword(t[0], a)) : r += t[0], n = _.lexemesRe.lastIndex, t = _.lexemesRe.exec(k)
                      }
                      r += k.substr(n), w.addText(r)
                  } else w.addText(k)
              }(), k = ""
          }

          function h(e) {
              e.className && w.openNode(e.className), _ = Object.create(e, {
                  parent: {
                      value: _
                  }
              })
          }
          var f = {};

          function b(n, t) {
              var a, i = t && t[0];
              if (k += n, null == i) return c(), 0;
              if ("begin" == f.type && "end" == t.type && f.index == t.index && "" === i) {
                  if (k += s.slice(t.index, t.index + 1), !o) throw (a = Error("0 width match regex")).languageName = e, a.badRule = f.rule, a;
                  return 1
              }
              if (f = t, "begin" === t.type) return function(e) {
                  var n = e[0],
                      t = e.rule;
                  return t.__onBegin && (t.__onBegin(e) || {}).ignoreMatch ? function(e) {
                      return 0 === _.matcher.regexIndex ? (k += e[0], 1) : (A = !0, 0)
                  }(n) : (t && t.endSameAsBegin && (t.endRe = RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")), t.skip ? k += n : (t.excludeBegin && (k += n), c(), t.returnBegin || t.excludeBegin || (k = n)), h(t), t.returnBegin ? 0 : n.length)
              }(t);
              if ("illegal" === t.type && !r) throw (a = Error('Illegal lexeme "' + i + '" for mode "' + (_.className || "<unnamed>") + '"')).mode = _, a;
              if ("end" === t.type) {
                  var l = function(e) {
                      var n = e[0],
                          t = s.substr(e.index),
                          r = function e(n, t) {
                              if (function(e, n) {
                                      var t = e && e.exec(n);
                                      return t && 0 === t.index
                                  }(n.endRe, t)) {
                                  for (; n.endsParent && n.parent;) n = n.parent;
                                  return n
                              }
                              if (n.endsWithParent) return e(n.parent, t)
                          }(_, t);
                      if (r) {
                          var a = _;
                          a.skip ? k += n : (a.returnEnd || a.excludeEnd || (k += n), c(), a.excludeEnd && (k = n));
                          do {
                              _.className && w.closeNode(), _.skip || _.subLanguage || (T += _.relevance), _ = _.parent
                          } while (_ !== r.parent);
                          return r.starts && (r.endSameAsBegin && (r.starts.endRe = r.endRe), h(r.starts)), a.returnEnd ? 0 : n.length
                      }
                  }(t);
                  if (null != l) return l
              }
              return k += i, i.length
          }
          var v = M(e);
          if (!v) throw console.error(d.replace("{}", e)), Error('Unknown language: "' + e + '"');
          ! function(e) {
              function n(n, t) {
                  return RegExp(u(n), "m" + (e.case_insensitive ? "i" : "") + (t ? "g" : ""))
              }
              class r {
                  constructor() {
                      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0
                  }
                  addRule(e, n) {
                      n.position = this.position++, this.matchIndexes[this.matchAt] = n, this.regexes.push([n, e]), this.matchAt += function(e) {
                          return RegExp(e.toString() + "|").exec("").length - 1
                      }(e) + 1
                  }
                  compile() {
                      0 === this.regexes.length && (this.exec = () => null);
                      let e = this.regexes.map(e => e[1]);
                      this.matcherRe = n(function(e, n) {
                          for (var t = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./, r = 0, a = "", i = 0; i < e.length; i++) {
                              var s = r += 1,
                                  o = u(e[i]);
                              for (i > 0 && (a += "|"), a += "("; o.length > 0;) {
                                  var l = t.exec(o);
                                  if (null == l) {
                                      a += o;
                                      break
                                  }
                                  a += o.substring(0, l.index), o = o.substring(l.index + l[0].length), "\\" == l[0][0] && l[1] ? a += "\\" + (+l[1] + s) : (a += l[0], "(" == l[0] && r++)
                              }
                              a += ")"
                          }
                          return a
                      }(e), !0), this.lastIndex = 0
                  }
                  exec(e) {
                      this.matcherRe.lastIndex = this.lastIndex;
                      let n = this.matcherRe.exec(e);
                      if (!n) return null;
                      let t = n.findIndex((e, n) => n > 0 && null != e),
                          r = this.matchIndexes[t];
                      return Object.assign(n, r)
                  }
              }
              class a {
                  constructor() {
                      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0
                  }
                  getMatcher(e) {
                      if (this.multiRegexes[e]) return this.multiRegexes[e];
                      let n = new r;
                      return this.rules.slice(e).forEach(([e, t]) => n.addRule(e, t)), n.compile(), this.multiRegexes[e] = n, n
                  }
                  considerAll() {
                      this.regexIndex = 0
                  }
                  addRule(e, n) {
                      this.rules.push([e, n]), "begin" === n.type && this.count++
                  }
                  exec(e) {
                      let n = this.getMatcher(this.regexIndex);
                      n.lastIndex = this.lastIndex;
                      let t = n.exec(e);
                      return t && (this.regexIndex += t.position + 1, this.regexIndex === this.count && (this.regexIndex = 0)), t
                  }
              }

              function i(e) {
                  let n = e.input[e.index - 1],
                      t = e.input[e.index + e[0].length];
                  if ("." === n || "." === t) return {
                      ignoreMatch: !0
                  }
              }
              if (e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
              ! function r(s, o) {
                  s.compiled || (s.compiled = !0, s.__onBegin = null, s.keywords = s.keywords || s.beginKeywords, s.keywords && (s.keywords = function(e, n) {
                      var t = {};
                      return "string" == typeof e ? r("keyword", e) : Object.keys(e).forEach((function(n) {
                          r(n, e[n])
                      })), t;

                      function r(e, r) {
                          n && (r = r.toLowerCase()), r.split(" ").forEach((function(n) {
                              var r = n.split("|");
                              t[r[0]] = [e, R(r[0], r[1])]
                          }))
                      }
                  }(s.keywords, e.case_insensitive)), s.lexemesRe = n(s.lexemes || /\w+/, !0), o && (s.beginKeywords && (s.begin = "\\b(" + s.beginKeywords.split(" ").join("|") + ")(?=\\b|\\s)", s.__onBegin = i), s.begin || (s.begin = /\B|\b/), s.beginRe = n(s.begin), s.endSameAsBegin && (s.end = s.begin), s.end || s.endsWithParent || (s.end = /\B|\b/), s.end && (s.endRe = n(s.end)), s.terminator_end = u(s.end) || "", s.endsWithParent && o.terminator_end && (s.terminator_end += (s.end ? "|" : "") + o.terminator_end)), s.illegal && (s.illegalRe = n(s.illegal)), null == s.relevance && (s.relevance = 1), s.contains || (s.contains = []), s.contains = [].concat(...s.contains.map((function(e) {
                      return function(e) {
                          return e.variants && !e.cached_variants && (e.cached_variants = e.variants.map((function(n) {
                              return t(e, {
                                  variants: null
                              }, n)
                          }))), e.cached_variants ? e.cached_variants : function e(n) {
                              return !!n && (n.endsWithParent || e(n.starts))
                          }(e) ? t(e, {
                              starts: e.starts ? t(e.starts) : null
                          }) : Object.isFrozen(e) ? t(e) : e
                      }("self" === e ? s : e)
                  }))), s.contains.forEach((function(e) {
                      r(e, s)
                  })), s.starts && r(s.starts, o), s.matcher = function(e) {
                      let n = new a;
                      return e.contains.forEach(e => n.addRule(e.begin, {
                          rule: e,
                          type: "begin"
                      })), e.terminator_end && n.addRule(e.terminator_end, {
                          type: "end"
                      }), e.illegal && n.addRule(e.illegal, {
                          type: "illegal"
                      }), n
                  }(s))
              }(e)
          }(v);
          var x, _ = i || v,
              E = {},
              w = new g.__emitter(g);
          ! function() {
              for (var e = [], n = _; n !== v; n = n.parent) n.className && e.unshift(n.className);
              e.forEach(e => w.openNode(e))
          }();
          var y, O, k = "",
              T = 0,
              L = 0;
          try {
              var A = !1;
              for (_.matcher.considerAll(); A ? A = !1 : (_.matcher.lastIndex = L, _.matcher.considerAll()), y = _.matcher.exec(s);) O = b(s.substring(L, y.index), y), L = y.index + O;
              return b(s.substr(L)), w.closeAllNodes(), w.finalize(), x = w.toHTML(), {
                  relevance: T,
                  value: x,
                  language: e,
                  illegal: !1,
                  emitter: w,
                  top: _
              }
          } catch (n) {
              if (n.message && n.message.includes("Illegal")) return {
                  illegal: !0,
                  illegalBy: {
                      msg: n.message,
                      context: s.slice(L - 100, L + 100),
                      mode: n.mode
                  },
                  sofar: x,
                  relevance: 0,
                  value: N(s),
                  emitter: w
              };
              if (o) return {
                  relevance: 0,
                  value: N(s),
                  emitter: w,
                  language: e,
                  top: _,
                  errorRaised: n
              };
              throw n
          }
      }

      function m(e, n) {
          n = n || g.languages || Object.keys(a);
          var t = function(e) {
                  const n = {
                      relevance: 0,
                      emitter: new g.__emitter(g),
                      value: N(e),
                      illegal: !1,
                      top: E
                  };
                  return n.emitter.addText(e), n
              }(e),
              r = t;
          return n.filter(M).filter(k).forEach((function(n) {
              var a = p(n, e, !1);
              a.language = n, a.relevance > r.relevance && (r = a), a.relevance > t.relevance && (r = t, t = a)
          })), r.language && (t.second_best = r), t
      }

      function b(e) {
          return g.tabReplace || g.useBR ? e.replace(l, (function(e, n) {
              return g.useBR && "\n" === e ? "<br>" : g.tabReplace ? n.replace(/\t/g, g.tabReplace) : ""
          })) : e
      }

      function v(e) {
          var n, t, r, a, s, o = function(e) {
              var n, t = e.className + " ";
              if (t += e.parentNode ? e.parentNode.className : "", n = g.languageDetectRe.exec(t)) {
                  var r = M(n[1]);
                  return r || (console.warn(d.replace("{}", n[1])), console.warn("Falling back to no-highlight mode for this block.", e)), r ? n[1] : "no-highlight"
              }
              return t.split(/\s+/).find(e => h(e) || M(e))
          }(e);
          h(o) || (T("before:highlightBlock", {
              block: e,
              language: o
          }), g.useBR ? (n = document.createElement("div")).innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n") : n = e, s = n.textContent, r = o ? f(o, s, !0) : m(s), (t = y(n)).length && ((a = document.createElement("div")).innerHTML = r.value, r.value = O(t, y(a), s)), r.value = b(r.value), T("after:highlightBlock", {
              block: e,
              result: r
          }), e.innerHTML = r.value, e.className = function(e, n, t) {
              var r = n ? i[n] : t,
                  a = [e.trim()];
              return e.match(/\bhljs\b/) || a.push("hljs"), e.includes(r) || a.push(r), a.join(" ").trim()
          }(e.className, o, r.language), e.result = {
              language: r.language,
              re: r.relevance
          }, r.second_best && (e.second_best = {
              language: r.second_best.language,
              re: r.second_best.relevance
          }))
      }

      function x() {
          if (!x.called) {
              x.called = !0;
              var e = document.querySelectorAll("pre code");
              r.forEach.call(e, v)
          }
      }
      const E = {
          disableAutodetect: !0,
          name: "Plain text"
      };

      function M(e) {
          return e = (e || "").toLowerCase(), a[e] || a[i[e]]
      }

      function k(e) {
          var n = M(e);
          return n && !n.disableAutodetect
      }

      function T(e, n) {
          var t = e;
          s.forEach((function(e) {
              e[t] && e[t](n)
          }))
      }
      Object.assign(n, {
          highlight: f,
          highlightAuto: m,
          fixMarkup: b,
          highlightBlock: v,
          configure: function(e) {
              g = w(g, e)
          },
          initHighlighting: x,
          initHighlightingOnLoad: function() {
              window.addEventListener("DOMContentLoaded", x, !1)
          },
          registerLanguage: function(e, t) {
              var r;
              try {
                  r = t(n)
              } catch (n) {
                  if (console.error("Language definition for '{}' could not be registered.".replace("{}", e)), !o) throw n;
                  console.error(n), r = E
              }
              r.name || (r.name = e), a[e] = r, r.rawDefinition = t.bind(null, n), r.aliases && r.aliases.forEach((function(n) {
                  i[n] = e
              }))
          },
          listLanguages: function() {
              return Object.keys(a)
          },
          getLanguage: M,
          requireLanguage: function(e) {
              var n = M(e);
              if (n) return n;
              throw Error("The '{}' language is required, but not loaded.".replace("{}", e))
          },
          autoDetection: k,
          inherit: w,
          addPlugin: function(e, n) {
              s.push(e)
          }
      }), n.debugMode = function() {
          o = !1
      }, n.safeMode = function() {
          o = !0
      }, n.versionString = "10.0.1";
      for (const n in _) "object" == typeof _[n] && e(_[n]);
      return Object.assign(n, _), n
  }({})
}));
hljs.registerLanguage("python", function() {
  "use strict";
  return function(e) {
      var n = {
              keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10",
              built_in: "Ellipsis NotImplemented",
              literal: "False None True"
          },
          a = {
              className: "meta",
              begin: /^(>>>|\.\.\.) /
          },
          i = {
              className: "subst",
              begin: /\{/,
              end: /\}/,
              keywords: n,
              illegal: /#/
          },
          s = {
              begin: /\{\{/,
              relevance: 0
          },
          r = {
              className: "string",
              contains: [e.BACKSLASH_ESCAPE],
              variants: [{
                  begin: /(u|b)?r?'''/,
                  end: /'''/,
                  contains: [e.BACKSLASH_ESCAPE, a],
                  relevance: 10
              }, {
                  begin: /(u|b)?r?"""/,
                  end: /"""/,
                  contains: [e.BACKSLASH_ESCAPE, a],
                  relevance: 10
              }, {
                  begin: /(fr|rf|f)'''/,
                  end: /'''/,
                  contains: [e.BACKSLASH_ESCAPE, a, s, i]
              }, {
                  begin: /(fr|rf|f)"""/,
                  end: /"""/,
                  contains: [e.BACKSLASH_ESCAPE, a, s, i]
              }, {
                  begin: /(u|r|ur)'/,
                  end: /'/,
                  relevance: 10
              }, {
                  begin: /(u|r|ur)"/,
                  end: /"/,
                  relevance: 10
              }, {
                  begin: /(b|br)'/,
                  end: /'/
              }, {
                  begin: /(b|br)"/,
                  end: /"/
              }, {
                  begin: /(fr|rf|f)'/,
                  end: /'/,
                  contains: [e.BACKSLASH_ESCAPE, s, i]
              }, {
                  begin: /(fr|rf|f)"/,
                  end: /"/,
                  contains: [e.BACKSLASH_ESCAPE, s, i]
              }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          },
          l = {
              className: "number",
              relevance: 0,
              variants: [{
                  begin: e.BINARY_NUMBER_RE + "[lLjJ]?"
              }, {
                  begin: "\\b(0o[0-7]+)[lLjJ]?"
              }, {
                  begin: e.C_NUMBER_RE + "[lLjJ]?"
              }]
          },
          t = {
              className: "params",
              variants: [{
                  begin: /\(\s*\)/,
                  skip: !0,
                  className: null
              }, {
                  begin: /\(/,
                  end: /\)/,
                  excludeBegin: !0,
                  excludeEnd: !0,
                  contains: ["self", a, l, r, e.HASH_COMMENT_MODE]
              }]
          };
      return i.contains = [r, l, a], {
          name: "Python",
          aliases: ["py", "gyp", "ipython"],
          keywords: n,
          illegal: /(<\/|->|\?)|=>/,
          contains: [a, l, {
              beginKeywords: "if",
              relevance: 0
          }, r, e.HASH_COMMENT_MODE, {
              variants: [{
                  className: "function",
                  beginKeywords: "def"
              }, {
                  className: "class",
                  beginKeywords: "class"
              }],
              end: /:/,
              illegal: /[${=;\n,]/,
              contains: [e.UNDERSCORE_TITLE_MODE, t, {
                  begin: /->/,
                  endsWithParent: !0,
                  keywords: "None"
              }]
          }, {
              className: "meta",
              begin: /^[\t ]*@/,
              end: /$/
          }, {
              begin: /\b(print|exec)\(/
          }]
      }
  }
}());
hljs.registerLanguage("python-repl", function() {
  "use strict";
  return function(n) {
      return {
          aliases: ["pycon"],
          contains: [{
              className: "meta",
              starts: {
                  end: / |$/,
                  starts: {
                      end: "$",
                      subLanguage: "python"
                  }
              },
              variants: [{
                  begin: /^>>>(?=[ ]|$)/
              }, {
                  begin: /^\.\.\.(?=[ ]|$)/
              }]
          }]
      }
  }
}());
hljs.registerLanguage("bash", function() {
  "use strict";
  return function(e) {
      const s = {};
      Object.assign(s, {
          className: "variable",
          variants: [{
              begin: /\$[\w\d#@][\w\d_]*/
          }, {
              begin: /\$\{/,
              end: /\}/,
              contains: [{
                  begin: /:-/,
                  contains: [s]
              }]
          }]
      });
      const n = {
              className: "subst",
              begin: /\$\(/,
              end: /\)/,
              contains: [e.BACKSLASH_ESCAPE]
          },
          t = {
              className: "string",
              begin: /"/,
              end: /"/,
              contains: [e.BACKSLASH_ESCAPE, s, n]
          };
      n.contains.push(t);
      const a = {
          begin: /\$\(\(/,
          end: /\)\)/,
          contains: [{
              begin: /\d+#[0-9a-f]+/,
              className: "number"
          }, e.NUMBER_MODE, s]
      };
      return {
          name: "Bash",
          aliases: ["sh", "zsh"],
          lexemes: /\b-?[a-z\._]+\b/,
          keywords: {
              keyword: "if then else elif fi for while in do done case esac function",
              literal: "true false",
              built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
              _: "-ne -eq -lt -gt -f -d -e -s -l -a"
          },
          contains: [{
              className: "meta",
              begin: /^#![^\n]+sh\s*$/,
              relevance: 10
          }, {
              className: "function",
              begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
              returnBegin: !0,
              contains: [e.inherit(e.TITLE_MODE, {
                  begin: /\w[\w\d_]*/
              })],
              relevance: 0
          }, a, e.HASH_COMMENT_MODE, t, {
              className: "",
              begin: /\\"/
          }, {
              className: "string",
              begin: /'/,
              end: /'/
          }, s]
      }
  }
}());
hljs.registerLanguage("properties", function() {
  "use strict";
  return function(e) {
      var n = "[ \\t\\f]*",
          t = "(" + n + "[:=]" + n + "|[ \\t\\f]+)",
          a = "([^\\\\:= \\t\\f\\n]|\\\\.)+",
          s = {
              end: t,
              relevance: 0,
              starts: {
                  className: "string",
                  end: /$/,
                  relevance: 0,
                  contains: [{
                      begin: "\\\\\\n"
                  }]
              }
          };
      return {
          name: ".properties",
          case_insensitive: !0,
          illegal: /\S/,
          contains: [e.COMMENT("^\\s*[!#]", "$"), {
              begin: "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+" + t,
              returnBegin: !0,
              contains: [{
                  className: "attr",
                  begin: "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",
                  endsParent: !0,
                  relevance: 0
              }],
              starts: s
          }, {
              begin: a + t,
              returnBegin: !0,
              relevance: 0,
              contains: [{
                  className: "meta",
                  begin: a,
                  endsParent: !0,
                  relevance: 0
              }],
              starts: s
          }, {
              className: "attr",
              relevance: 0,
              begin: a + n + "$"
          }]
      }
  }
}());
hljs.registerLanguage("go", function() {
  "use strict";
  return function(e) {
      var n = {
          keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
          literal: "true false iota nil",
          built_in: "append cap close complex copy imag len make new panic print println real recover delete"
      };
      return {
          name: "Go",
          aliases: ["golang"],
          keywords: n,
          illegal: "</",
          contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
              className: "string",
              variants: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                  begin: "`",
                  end: "`"
              }]
          }, {
              className: "number",
              variants: [{
                  begin: e.C_NUMBER_RE + "[i]",
                  relevance: 1
              }, e.C_NUMBER_MODE]
          }, {
              begin: /:=/
          }, {
              className: "function",
              beginKeywords: "func",
              end: "\\s*(\\{|$)",
              excludeEnd: !0,
              contains: [e.TITLE_MODE, {
                  className: "params",
                  begin: /\(/,
                  end: /\)/,
                  keywords: n,
                  illegal: /["']/
              }]
          }]
      }
  }
}());
hljs.registerLanguage("ruby", function() {
  "use strict";
  return function(e) {
      var n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
          a = {
              keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
              literal: "true false nil"
          },
          s = {
              className: "doctag",
              begin: "@[A-Za-z]+"
          },
          i = {
              begin: "#<",
              end: ">"
          },
          r = [e.COMMENT("#", "$", {
              contains: [s]
          }), e.COMMENT("^\\=begin", "^\\=end", {
              contains: [s],
              relevance: 10
          }), e.COMMENT("^__END__", "\\n$")],
          c = {
              className: "subst",
              begin: "#\\{",
              end: "}",
              keywords: a
          },
          t = {
              className: "string",
              contains: [e.BACKSLASH_ESCAPE, c],
              variants: [{
                  begin: /'/,
                  end: /'/
              }, {
                  begin: /"/,
                  end: /"/
              }, {
                  begin: /`/,
                  end: /`/
              }, {
                  begin: "%[qQwWx]?\\(",
                  end: "\\)"
              }, {
                  begin: "%[qQwWx]?\\[",
                  end: "\\]"
              }, {
                  begin: "%[qQwWx]?{",
                  end: "}"
              }, {
                  begin: "%[qQwWx]?<",
                  end: ">"
              }, {
                  begin: "%[qQwWx]?/",
                  end: "/"
              }, {
                  begin: "%[qQwWx]?%",
                  end: "%"
              }, {
                  begin: "%[qQwWx]?-",
                  end: "-"
              }, {
                  begin: "%[qQwWx]?\\|",
                  end: "\\|"
              }, {
                  begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
              }, {
                  begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
                  returnBegin: !0,
                  contains: [{
                      begin: /<<[-~]?'?/
                  }, {
                      begin: /\w+/,
                      endSameAsBegin: !0,
                      contains: [e.BACKSLASH_ESCAPE, c]
                  }]
              }]
          },
          b = {
              className: "params",
              begin: "\\(",
              end: "\\)",
              endsParent: !0,
              keywords: a
          },
          d = [t, i, {
              className: "class",
              beginKeywords: "class module",
              end: "$|;",
              illegal: /=/,
              contains: [e.inherit(e.TITLE_MODE, {
                  begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
              }), {
                  begin: "<\\s*",
                  contains: [{
                      begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE
                  }]
              }].concat(r)
          }, {
              className: "function",
              beginKeywords: "def",
              end: "$|;",
              contains: [e.inherit(e.TITLE_MODE, {
                  begin: n
              }), b].concat(r)
          }, {
              begin: e.IDENT_RE + "::"
          }, {
              className: "symbol",
              begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
              relevance: 0
          }, {
              className: "symbol",
              begin: ":(?!\\s)",
              contains: [t, {
                  begin: n
              }],
              relevance: 0
          }, {
              className: "number",
              begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
              relevance: 0
          }, {
              begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
          }, {
              className: "params",
              begin: /\|/,
              end: /\|/,
              keywords: a
          }, {
              begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
              keywords: "unless",
              contains: [i, {
                  className: "regexp",
                  contains: [e.BACKSLASH_ESCAPE, c],
                  illegal: /\n/,
                  variants: [{
                      begin: "/",
                      end: "/[a-z]*"
                  }, {
                      begin: "%r{",
                      end: "}[a-z]*"
                  }, {
                      begin: "%r\\(",
                      end: "\\)[a-z]*"
                  }, {
                      begin: "%r!",
                      end: "![a-z]*"
                  }, {
                      begin: "%r\\[",
                      end: "\\][a-z]*"
                  }]
              }].concat(r),
              relevance: 0
          }].concat(r);
      c.contains = d, b.contains = d;
      var g = [{
          begin: /^\s*=>/,
          starts: {
              end: "$",
              contains: d
          }
      }, {
          className: "meta",
          begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)",
          starts: {
              end: "$",
              contains: d
          }
      }];
      return {
          name: "Ruby",
          aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
          keywords: a,
          illegal: /\/\*/,
          contains: r.concat(g).concat(d)
      }
  }
}());
hljs.registerLanguage("yaml", function() {
  "use strict";
  return function(e) {
      var n = {
          className: "string",
          relevance: 0,
          variants: [{
              begin: /'/,
              end: /'/
          }, {
              begin: /"/,
              end: /"/
          }, {
              begin: /\S+/
          }],
          contains: [e.BACKSLASH_ESCAPE, {
              className: "template-variable",
              variants: [{
                  begin: "{{",
                  end: "}}"
              }, {
                  begin: "%{",
                  end: "}"
              }]
          }]
      };
      return {
          name: "YAML",
          case_insensitive: !0,
          aliases: ["yml", "YAML"],
          contains: [{
              className: "attr",
              variants: [{
                  begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)"
              }, {
                  begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)'
              }, {
                  begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)"
              }]
          }, {
              className: "meta",
              begin: "^---s*$",
              relevance: 10
          }, {
              className: "string",
              begin: "[\\|>]([0-9]?[+-])?[ ]*\\n( *)[\\S ]+\\n(\\2[\\S ]+\\n?)*"
          }, {
              begin: "<%[%=-]?",
              end: "[%-]?%>",
              subLanguage: "ruby",
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0
          }, {
              className: "type",
              begin: "!" + e.UNDERSCORE_IDENT_RE
          }, {
              className: "type",
              begin: "!!" + e.UNDERSCORE_IDENT_RE
          }, {
              className: "meta",
              begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
          }, {
              className: "meta",
              begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
          }, {
              className: "bullet",
              begin: "\\-(?=[ ]|$)",
              relevance: 0
          }, e.HASH_COMMENT_MODE, {
              beginKeywords: "true false yes no null",
              keywords: {
                  literal: "true false yes no null"
              }
          }, {
              className: "number",
              begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
          }, {
              className: "number",
              begin: e.C_NUMBER_RE + "\\b"
          }, n]
      }
  }
}());
hljs.registerLanguage("powershell", function() {
  "use strict";
  return function(e) {
      var n = {
              keyword: "if else foreach return do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch hidden static parameter",
              built_in: "ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write"
          },
          s = {
              begin: "`[\\s\\S]",
              relevance: 0
          },
          i = {
              className: "variable",
              variants: [{
                  begin: /\$\B/
              }, {
                  className: "keyword",
                  begin: /\$this/
              }, {
                  begin: /\$[\w\d][\w\d_:]*/
              }]
          },
          a = {
              className: "string",
              variants: [{
                  begin: /"/,
                  end: /"/
              }, {
                  begin: /@"/,
                  end: /^"@/
              }],
              contains: [s, i, {
                  className: "variable",
                  begin: /\$[A-z]/,
                  end: /[^A-z]/
              }]
          },
          t = {
              className: "string",
              variants: [{
                  begin: /'/,
                  end: /'/
              }, {
                  begin: /@'/,
                  end: /^'@/
              }]
          },
          r = e.inherit(e.COMMENT(null, null), {
              variants: [{
                  begin: /#/,
                  end: /$/
              }, {
                  begin: /<#/,
                  end: /#>/
              }],
              contains: [{
                  className: "doctag",
                  variants: [{
                      begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
                  }, {
                      begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
                  }]
              }]
          }),
          c = {
              className: "class",
              beginKeywords: "class enum",
              end: /\s*[{]/,
              excludeEnd: !0,
              relevance: 0,
              contains: [e.TITLE_MODE]
          },
          l = {
              className: "function",
              begin: /function\s+/,
              end: /\s*\{|$/,
              excludeEnd: !0,
              returnBegin: !0,
              relevance: 0,
              contains: [{
                  begin: "function",
                  relevance: 0,
                  className: "keyword"
              }, {
                  className: "title",
                  begin: /\w[\w\d]*((-)[\w\d]+)*/,
                  relevance: 0
              }, {
                  begin: /\(/,
                  end: /\)/,
                  className: "params",
                  relevance: 0,
                  contains: [i]
              }]
          },
          o = {
              begin: /using\s/,
              end: /$/,
              returnBegin: !0,
              contains: [a, t, {
                  className: "keyword",
                  begin: /(using|assembly|command|module|namespace|type)/
              }]
          },
          p = {
              className: "function",
              begin: /\[.*\]\s*[\w]+[ ]??\(/,
              end: /$/,
              returnBegin: !0,
              relevance: 0,
              contains: [{
                  className: "keyword",
                  begin: "(".concat(n.keyword.toString().replace(/\s/g, "|"), ")\\b"),
                  endsParent: !0,
                  relevance: 0
              }, e.inherit(e.TITLE_MODE, {
                  endsParent: !0
              })]
          },
          g = [p, r, s, e.NUMBER_MODE, a, t, {
              className: "built_in",
              variants: [{
                  begin: "(Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|Limit|Merge|New|Out|Publish|Restore|Save|Sync|Unpublish|Update|Approve|Assert|Complete|Confirm|Deny|Disable|Enable|Install|Invoke|Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|Unprotect|Use|ForEach|Sort|Tee|Where)+(-)[\\w\\d]+"
              }]
          }, i, {
              className: "literal",
              begin: /\$(null|true|false)\b/
          }, {
              className: "selector-tag",
              begin: /\@\B/,
              relevance: 0
          }],
          m = {
              begin: /\[/,
              end: /\]/,
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0,
              contains: [].concat("self", g, {
                  begin: "(string|char|byte|int|long|bool|decimal|single|double|DateTime|xml|array|hashtable|void)",
                  className: "built_in",
                  relevance: 0
              }, {
                  className: "type",
                  begin: /[\.\w\d]+/,
                  relevance: 0
              })
          };
      return p.contains.unshift(m), {
          name: "PowerShell",
          aliases: ["ps", "ps1"],
          lexemes: /-?[A-z\.\-]+\b/,
          case_insensitive: !0,
          keywords: n,
          contains: g.concat(c, l, o, {
              variants: [{
                  className: "operator",
                  begin: "(-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|-split|-wildcard|-xor)\\b"
              }, {
                  className: "literal",
                  begin: /(-)[\w\d]+/,
                  relevance: 0
              }]
          }, m)
      }
  }
}());
hljs.registerLanguage("dockerfile", function() {
  "use strict";
  return function(e) {
      return {
          name: "Dockerfile",
          aliases: ["docker"],
          case_insensitive: !0,
          keywords: "from maintainer expose env arg user onbuild stopsignal",
          contains: [e.HASH_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, {
              beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
              starts: {
                  end: /[^\\]$/,
                  subLanguage: "bash"
              }
          }],
          illegal: "</"
      }
  }
}());
hljs.registerLanguage("json", function() {
  "use strict";
  return function(n) {
      var e = {
              literal: "true false null"
          },
          i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE],
          t = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE],
          a = {
              end: ",",
              endsWithParent: !0,
              excludeEnd: !0,
              contains: t,
              keywords: e
          },
          l = {
              begin: "{",
              end: "}",
              contains: [{
                  className: "attr",
                  begin: /"/,
                  end: /"/,
                  contains: [n.BACKSLASH_ESCAPE],
                  illegal: "\\n"
              }, n.inherit(a, {
                  begin: /:/
              })].concat(i),
              illegal: "\\S"
          },
          s = {
              begin: "\\[",
              end: "\\]",
              contains: [n.inherit(a)],
              illegal: "\\S"
          };
      return t.push(l, s), i.forEach((function(n) {
          t.push(n)
      })), {
          name: "JSON",
          contains: t,
          keywords: e,
          illegal: "\\S"
      }
  }
}());
hljs.registerLanguage("plaintext", function() {
  "use strict";
  return function(t) {
      return {
          name: "Plain text",
          aliases: ["text", "txt"],
          disableAutodetect: !0
      }
  }
}());