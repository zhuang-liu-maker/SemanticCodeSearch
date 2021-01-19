/* eslint-disable */
export const js_beautify = function(u) {
        var i = {};
        function n(t) {
            if (i[t]) return i[t].exports;
            var e = i[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return u[t].call(e.exports, e, e.exports, n),
            e.l = !0,
            e.exports
        }
        return n.m = u,
        n.c = i,
        n.d = function(t, e, u) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: u
            })
        },
        n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        },
        n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var u = Object.create(null);
            if (n.r(u), Object.defineProperty(u, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) n.d(u, i,
            function(t) {
                return e[t]
            }.bind(null, i));
            return u
        },
        n.n = function(t) {
            var e = t && t.__esModule ?
            function() {
                return t.
            default
            }:
            function() {
                return t
            };
            return n.d(e, "a", e),
            e
        },
        n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        },
        n.p = "",
        n(n.s = 0)
    } ([function(t, e, u) {
        "use strict";
        var i = u(1).Beautifier,
        n = u(5).Options;
        t.exports = function(t, e) {
            return new i(t, e).beautify()
        },
        t.exports.defaultOptions = function() {
            return new n
        }
    },
    function(t, e, u) {
        "use strict";
        var i = u(2).Output,
        n = u(3).Token,
        o = u(4),
        _ = u(5).Options,
        s = u(7).Tokenizer,
        p = u(7).line_starters,
        l = u(7).positionable_operators,
        f = u(7).TOKEN;
        function c(t, e) {
            return - 1 !== e.indexOf(t)
        }
        function a(t, e) {
            return t && t.type === f.RESERVED && t.text === e
        }
        function d(t, e) {
            return t && t.type === f.RESERVED && c(t.text, e)
        }
        var b = ["case", "return", "do", "if", "throw", "else", "await", "break", "continue", "async"],
        g = function(t) {
            for (var e = {},
            u = 0; u < t.length; u++) e[t[u].replace(/-/g, "_")] = t[u];
            return e
        } (["before-newline", "after-newline", "preserve-newline"]),
        k = [g.before_newline, g.preserve_newline],
        m = "BlockStatement",
        w = "Statement",
        r = "ObjectLiteral",
        h = "ArrayLiteral",
        y = "ForInitializer",
        x = "Conditional",
        v = "Expression";
        function E(t, e) {
            e.multiline_frame || e.mode === y || e.mode === x || t.remove_indent(e.start_line_index)
        }
        function R(t) {
            return t === h
        }
        function O(t) {
            return c(t, [v, y, x])
        }
        function T(t, e) {
            e = e || {},
            this._source_text = t || "",
            this._output = null,
            this._tokens = null,
            this._last_last_text = null,
            this._flags = null,
            this._previous_flags = null,
            this._flag_store = null,
            this._options = new _(e)
        }
        T.prototype.create_flags = function(t, e) {
            var u = 0;
            return t && (u = t.indentation_level, !this._output.just_added_newline() && t.line_indent_level > u && (u = t.line_indent_level)),
            {
                mode: e,
                parent: t,
                last_token: t ? t.last_token: new n(f.START_BLOCK, ""),
                last_word: t ? t.last_word: "",
                declaration_statement: !1,
                declaration_assignment: !1,
                multiline_frame: !1,
                inline_frame: !1,
                if_block: !1,
                else_block: !1,
                do_block: !1,
                do_while: !1,
                import_block: !1,
                in_case_statement: !1,
                in_case: !1,
                case_body: !1,
                indentation_level: u,
                alignment: 0,
                line_indent_level: t ? t.line_indent_level: u,
                start_line_index: this._output.get_line_number(),
                ternary_depth: 0
            }
        },
        T.prototype._reset = function(t) {
            var e = t.match(/^[\t ]*/)[0];
            this._last_last_text = "",
            this._output = new i(this._options, e),
            this._output.raw = this._options.test_output_raw,
            this._flag_store = [],
            this.set_mode(m);
            var u = new s(t, this._options);
            return this._tokens = u.tokenize(),
            t
        },
        T.prototype.beautify = function() {
            if (this._options.disabled) return this._source_text;
            var t = this._reset(this._source_text),
            e = this._options.eol;
            "auto" === this._options.eol && (e = "\n", t && o.lineBreak.test(t || "") && (e = t.match(o.lineBreak)[0]));
            for (var u = this._tokens.next(); u;) this.handle_token(u),
            this._last_last_text = this._flags.last_token.text,
            this._flags.last_token = u,
            u = this._tokens.next();
            return this._output.get_code(e)
        },
        T.prototype.handle_token = function(t, e) {
            t.type === f.START_EXPR ? this.handle_start_expr(t) : t.type === f.END_EXPR ? this.handle_end_expr(t) : t.type === f.START_BLOCK ? this.handle_start_block(t) : t.type === f.END_BLOCK ? this.handle_end_block(t) : t.type === f.WORD ? this.handle_word(t) : t.type === f.RESERVED ? this.handle_word(t) : t.type === f.SEMICOLON ? this.handle_semicolon(t) : t.type === f.STRING ? this.handle_string(t) : t.type === f.EQUALS ? this.handle_equals(t) : t.type === f.OPERATOR ? this.handle_operator(t) : t.type === f.COMMA ? this.handle_comma(t) : t.type === f.BLOCK_COMMENT ? this.handle_block_comment(t, e) : t.type === f.COMMENT ? this.handle_comment(t, e) : t.type === f.DOT ? this.handle_dot(t) : t.type === f.EOF ? this.handle_eof(t) : (t.type, f.UNKNOWN, this.handle_unknown(t, e))
        },
        T.prototype.handle_whitespace_and_comments = function(t, e) {
            var u = t.newlines,
            i = this._options.keep_array_indentation && R(this._flags.mode);
            if (t.comments_before) for (var n = t.comments_before.next(); n;) this.handle_whitespace_and_comments(n, e),
            this.handle_token(n, e),
            n = t.comments_before.next();
            if (i) for (var _ = 0; _ < u; _ += 1) this.print_newline(0 < _, e);
            else if (this._options.max_preserve_newlines && u > this._options.max_preserve_newlines && (u = this._options.max_preserve_newlines), this._options.preserve_newlines && 1 < u) {
                this.print_newline(!1, e);
                for (var s = 1; s < u; s += 1) this.print_newline(!0, e)
            }
        };
        var A = ["async", "break", "continue", "return", "throw", "yield"];
        T.prototype.allow_wrap_or_preserved_newline = function(t, e) {
            if (e = void 0 !== e && e, !this._output.just_added_newline()) {
                var u = this._options.preserve_newlines && t.newlines || e;
                if (c(this._flags.last_token.text, l) || c(t.text, l)) {
                    var i = c(this._flags.last_token.text, l) && c(this._options.operator_position, k) || c(t.text, l);
                    u = u && i
                }
                if (u) this.print_newline(!1, !0);
                else if (this._options.wrap_line_length) {
                    if (d(this._flags.last_token, A)) return;
                    this._output.set_wrap_point()
                }
            }
        },
        T.prototype.print_newline = function(t, e) {
            if (!e && ";" !== this._flags.last_token.text && "," !== this._flags.last_token.text && "=" !== this._flags.last_token.text && (this._flags.last_token.type !== f.OPERATOR || "--" === this._flags.last_token.text || "++" === this._flags.last_token.text)) for (var u = this._tokens.peek(); ! (this._flags.mode !== w || this._flags.if_block && a(u, "else") || this._flags.do_block);) this.restore_mode();
            this._output.add_new_line(t) && (this._flags.multiline_frame = !0)
        },
        T.prototype.print_token_line_indentation = function(t) {
            this._output.just_added_newline() && (this._options.keep_array_indentation && t.newlines && ("[" === t.text || R(this._flags.mode)) ? (this._output.current_line.set_indent( - 1), this._output.current_line.push(t.whitespace_before), this._output.space_before_token = !1) : this._output.set_indent(this._flags.indentation_level, this._flags.alignment) && (this._flags.line_indent_level = this._flags.indentation_level))
        },
        T.prototype.print_token = function(t, e) {
            if (this._output.raw) this._output.add_raw_token(t);
            else {
                if (this._options.comma_first && t.previous && t.previous.type === f.COMMA && this._output.just_added_newline() && "," === this._output.previous_line.last()) {
                    var u = this._output.previous_line.pop();
                    this._output.previous_line.is_empty() && (this._output.previous_line.push(u), this._output.trim(!0), this._output.current_line.pop(), this._output.trim()),
                    this.print_token_line_indentation(t),
                    this._output.add_token(","),
                    this._output.space_before_token = !0
                }
                e = e || t.text,
                this.print_token_line_indentation(t),
                this._output.non_breaking_space = !0,
                this._output.add_token(e),
                this._output.previous_token_wrapped && (this._flags.multiline_frame = !0)
            }
        },
        T.prototype.indent = function() {
            this._flags.indentation_level += 1,
            this._output.set_indent(this._flags.indentation_level, this._flags.alignment)
        },
        T.prototype.deindent = function() {
            0 < this._flags.indentation_level && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level) && (this._flags.indentation_level -= 1, this._output.set_indent(this._flags.indentation_level, this._flags.alignment))
        },
        T.prototype.set_mode = function(t) {
            this._flags ? (this._flag_store.push(this._flags), this._previous_flags = this._flags) : this._previous_flags = this.create_flags(null, t),
            this._flags = this.create_flags(this._previous_flags, t),
            this._output.set_indent(this._flags.indentation_level, this._flags.alignment)
        },
        T.prototype.restore_mode = function() {
            0 < this._flag_store.length && (this._previous_flags = this._flags, this._flags = this._flag_store.pop(), this._previous_flags.mode === w && E(this._output, this._previous_flags), this._output.set_indent(this._flags.indentation_level, this._flags.alignment))
        },
        T.prototype.start_of_object_property = function() {
            return this._flags.parent.mode === r && this._flags.mode === w && (":" === this._flags.last_token.text && 0 === this._flags.ternary_depth || d(this._flags.last_token, ["get", "set"]))
        },
        T.prototype.start_of_statement = function(t) {
            var e = !1;
            return !! (e = (e = (e = (e = (e = (e = (e = e || d(this._flags.last_token, ["var", "let", "const"]) && t.type === f.WORD) || a(this._flags.last_token, "do")) || !(this._flags.parent.mode === r && this._flags.mode === w) && d(this._flags.last_token, A) && !t.newlines) || a(this._flags.last_token, "else") && !(a(t, "if") && !t.comments_before)) || this._flags.last_token.type === f.END_EXPR && (this._previous_flags.mode === y || this._previous_flags.mode === x)) || this._flags.last_token.type === f.WORD && this._flags.mode === m && !this._flags.in_case && !("--" === t.text || "++" === t.text) && "function" !== this._last_last_text && t.type !== f.WORD && t.type !== f.RESERVED) || this._flags.mode === r && (":" === this._flags.last_token.text && 0 === this._flags.ternary_depth || d(this._flags.last_token, ["get", "set"]))) && (this.set_mode(w), this.indent(), this.handle_whitespace_and_comments(t, !0), this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t, d(t, ["do", "for", "if", "while"])), !0)
        },
        T.prototype.handle_start_expr = function(t) {
            this.start_of_statement(t) || this.handle_whitespace_and_comments(t);
            var e = v;
            if ("[" === t.text) {
                if (this._flags.last_token.type === f.WORD || ")" === this._flags.last_token.text) return d(this._flags.last_token, p) && (this._output.space_before_token = !0),
                this.print_token(t),
                this.set_mode(e),
                this.indent(),
                void(this._options.space_in_paren && (this._output.space_before_token = !0));
                e = h,
                R(this._flags.mode) && ("[" !== this._flags.last_token.text && ("," !== this._flags.last_token.text || "]" !== this._last_last_text && "}" !== this._last_last_text) || this._options.keep_array_indentation || this.print_newline()),
                c(this._flags.last_token.type, [f.START_EXPR, f.END_EXPR, f.WORD, f.OPERATOR]) || (this._output.space_before_token = !0)
            } else {
                if (this._flags.last_token.type === f.RESERVED)"for" === this._flags.last_token.text ? (this._output.space_before_token = this._options.space_before_conditional, e = y) : c(this._flags.last_token.text, ["if", "while"]) ? (this._output.space_before_token = this._options.space_before_conditional, e = x) : c(this._flags.last_word, ["await", "async"]) ? this._output.space_before_token = !0 : "import" === this._flags.last_token.text && "" === t.whitespace_before ? this._output.space_before_token = !1 : (c(this._flags.last_token.text, p) || "catch" === this._flags.last_token.text) && (this._output.space_before_token = !0);
                else if (this._flags.last_token.type === f.EQUALS || this._flags.last_token.type === f.OPERATOR) this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t);
                else if (this._flags.last_token.type === f.WORD) {
                    this._output.space_before_token = !1;
                    var u = this._tokens.peek( - 3);
                    if (this._options.space_after_named_function && u) {
                        var i = this._tokens.peek( - 4);
                        d(u, ["async", "function"]) || "*" === u.text && d(i, ["async", "function"]) ? this._output.space_before_token = !0 : this._flags.mode === r && ("{" !== u.text && "," !== u.text && ("*" !== u.text || "{" !== i.text && "," !== i.text) || (this._output.space_before_token = !0))
                    }
                } else this.allow_wrap_or_preserved_newline(t); (this._flags.last_token.type === f.RESERVED && ("function" === this._flags.last_word || "typeof" === this._flags.last_word) || "*" === this._flags.last_token.text && (c(this._last_last_text, ["function", "yield"]) || this._flags.mode === r && c(this._last_last_text, ["{", ","]))) && (this._output.space_before_token = this._options.space_after_anon_function)
            }
            ";" === this._flags.last_token.text || this._flags.last_token.type === f.START_BLOCK ? this.print_newline() : this._flags.last_token.type !== f.END_EXPR && this._flags.last_token.type !== f.START_EXPR && this._flags.last_token.type !== f.END_BLOCK && "." !== this._flags.last_token.text && this._flags.last_token.type !== f.COMMA || this.allow_wrap_or_preserved_newline(t, t.newlines),
            this.print_token(t),
            this.set_mode(e),
            this._options.space_in_paren && (this._output.space_before_token = !0),
            this.indent()
        },
        T.prototype.handle_end_expr = function(t) {
            for (; this._flags.mode === w;) this.restore_mode();
            this.handle_whitespace_and_comments(t),
            this._flags.multiline_frame && this.allow_wrap_or_preserved_newline(t, "]" === t.text && R(this._flags.mode) && !this._options.keep_array_indentation),
            this._options.space_in_paren && (this._flags.last_token.type !== f.START_EXPR || this._options.space_in_empty_paren ? this._output.space_before_token = !0 : (this._output.trim(), this._output.space_before_token = !1)),
            this.deindent(),
            this.print_token(t),
            this.restore_mode(),
            E(this._output, this._previous_flags),
            this._flags.do_while && this._previous_flags.mode === x && (this._previous_flags.mode = v, this._flags.do_block = !1, this._flags.do_while = !1)
        },
        T.prototype.handle_start_block = function(t) {
            this.handle_whitespace_and_comments(t);
            var e = this._tokens.peek(),
            u = this._tokens.peek(1);
            "switch" === this._flags.last_word && this._flags.last_token.type === f.END_EXPR ? (this.set_mode(m), this._flags.in_case_statement = !0) : u && (c(u.text, [":", ","]) && c(e.type, [f.STRING, f.WORD, f.RESERVED]) || c(e.text, ["get", "set", "..."]) && c(u.type, [f.WORD, f.RESERVED])) ? c(this._last_last_text, ["class", "interface"]) ? this.set_mode(m) : this.set_mode(r) : this._flags.last_token.type === f.OPERATOR && "=>" === this._flags.last_token.text ? this.set_mode(m) : c(this._flags.last_token.type, [f.EQUALS, f.START_EXPR, f.COMMA, f.OPERATOR]) || d(this._flags.last_token, ["return", "throw", "import", "default"]) ? this.set_mode(r) : this.set_mode(m);
            var i = !e.comments_before && "}" === e.text,
            n = i && "function" === this._flags.last_word && this._flags.last_token.type === f.END_EXPR;
            if (this._options.brace_preserve_inline) {
                var _ = 0,
                s = null;
                this._flags.inline_frame = !0;
                do {
                    if (_ += 1, (s = this._tokens.peek(_ - 1)).newlines) {
                        this._flags.inline_frame = !1;
                        break
                    }
                } while ( s . type !== f . EOF && ( s . type !== f . END_BLOCK || s . opened !== t ))
            } ("expand" === this._options.brace_style || "none" === this._options.brace_style && t.newlines) && !this._flags.inline_frame ? this._flags.last_token.type !== f.OPERATOR && (n || this._flags.last_token.type === f.EQUALS || d(this._flags.last_token, b) && "else" !== this._flags.last_token.text) ? this._output.space_before_token = !0 : this.print_newline(!1, !0) : (!R(this._previous_flags.mode) || this._flags.last_token.type !== f.START_EXPR && this._flags.last_token.type !== f.COMMA || ((this._flags.last_token.type === f.COMMA || this._options.space_in_paren) && (this._output.space_before_token = !0), (this._flags.last_token.type === f.COMMA || this._flags.last_token.type === f.START_EXPR && this._flags.inline_frame) && (this.allow_wrap_or_preserved_newline(t), this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame, this._flags.multiline_frame = !1)), this._flags.last_token.type !== f.OPERATOR && this._flags.last_token.type !== f.START_EXPR && (this._flags.last_token.type !== f.START_BLOCK || this._flags.inline_frame ? this._output.space_before_token = !0 : this.print_newline())),
            this.print_token(t),
            this.indent(),
            i || this._options.brace_preserve_inline && this._flags.inline_frame || this.print_newline()
        },
        T.prototype.handle_end_block = function(t) {
            for (this.handle_whitespace_and_comments(t); this._flags.mode === w;) this.restore_mode();
            var e = this._flags.last_token.type === f.START_BLOCK;
            this._flags.inline_frame && !e ? this._output.space_before_token = !0 : "expand" === this._options.brace_style ? e || this.print_newline() : e || (R(this._flags.mode) && this._options.keep_array_indentation ? (this._options.keep_array_indentation = !1, this.print_newline(), this._options.keep_array_indentation = !0) : this.print_newline()),
            this.restore_mode(),
            this.print_token(t)
        },
        T.prototype.handle_word = function(t) {
            if (t.type === f.RESERVED) if (c(t.text, ["set", "get"]) && this._flags.mode !== r) t.type = f.WORD;
            else if ("import" === t.text && "(" === this._tokens.peek().text) t.type = f.WORD;
            else if (c(t.text, ["as", "from"]) && !this._flags.import_block) t.type = f.WORD;
            else if (this._flags.mode === r) {
                ":" === this._tokens.peek().text && (t.type = f.WORD)
            }
            if (this.start_of_statement(t) ? d(this._flags.last_token, ["var", "let", "const"]) && t.type === f.WORD && (this._flags.declaration_statement = !0) : !t.newlines || O(this._flags.mode) || this._flags.last_token.type === f.OPERATOR && "--" !== this._flags.last_token.text && "++" !== this._flags.last_token.text || this._flags.last_token.type === f.EQUALS || !this._options.preserve_newlines && d(this._flags.last_token, ["var", "let", "const", "set", "get"]) ? this.handle_whitespace_and_comments(t) : (this.handle_whitespace_and_comments(t), this.print_newline()), this._flags.do_block && !this._flags.do_while) {
                if (a(t, "while")) return this._output.space_before_token = !0,
                this.print_token(t),
                this._output.space_before_token = !0,
                void(this._flags.do_while = !0);
                this.print_newline(),
                this._flags.do_block = !1
            }
            if (this._flags.if_block) if (!this._flags.else_block && a(t, "else")) this._flags.else_block = !0;
            else {
                for (; this._flags.mode === w;) this.restore_mode();
                this._flags.if_block = !1,
                this._flags.else_block = !1
            }
            if (this._flags.in_case_statement && d(t, ["case", "default"])) return this.print_newline(),
            (this._flags.case_body || this._options.jslint_happy) && (this.deindent(), this._flags.case_body = !1),
            this.print_token(t),
            void(this._flags.in_case = !0);
            if (this._flags.last_token.type !== f.COMMA && this._flags.last_token.type !== f.START_EXPR && this._flags.last_token.type !== f.EQUALS && this._flags.last_token.type !== f.OPERATOR || this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t), a(t, "function")) return (c(this._flags.last_token.text, ["}", ";"]) || this._output.just_added_newline() && !c(this._flags.last_token.text, ["(", "[", "{", ":", "=", ","]) && this._flags.last_token.type !== f.OPERATOR) && (this._output.just_added_blankline() || t.comments_before || (this.print_newline(), this.print_newline(!0))),
            this._flags.last_token.type === f.RESERVED || this._flags.last_token.type === f.WORD ? d(this._flags.last_token, ["get", "set", "new", "export"]) || d(this._flags.last_token, A) ? this._output.space_before_token = !0 : a(this._flags.last_token, "default") && "export" === this._last_last_text ? this._output.space_before_token = !0 : "declare" === this._flags.last_token.text ? this._output.space_before_token = !0 : this.print_newline() : this._flags.last_token.type === f.OPERATOR || "=" === this._flags.last_token.text ? this._output.space_before_token = !0 : (this._flags.multiline_frame || !O(this._flags.mode) && !R(this._flags.mode)) && this.print_newline(),
            this.print_token(t),
            void(this._flags.last_word = t.text);
            var e = "NONE"; (this._flags.last_token.type === f.END_BLOCK ? this._previous_flags.inline_frame ? e = "SPACE": d(t, ["else", "catch", "finally", "from"]) ? "expand" === this._options.brace_style || "end-expand" === this._options.brace_style || "none" === this._options.brace_style && t.newlines ? e = "NEWLINE": (e = "SPACE", this._output.space_before_token = !0) : e = "NEWLINE": this._flags.last_token.type === f.SEMICOLON && this._flags.mode === m ? e = "NEWLINE": this._flags.last_token.type === f.SEMICOLON && O(this._flags.mode) ? e = "SPACE": this._flags.last_token.type === f.STRING ? e = "NEWLINE": this._flags.last_token.type === f.RESERVED || this._flags.last_token.type === f.WORD || "*" === this._flags.last_token.text && (c(this._last_last_text, ["function", "yield"]) || this._flags.mode === r && c(this._last_last_text, ["{", ","])) ? e = "SPACE": this._flags.last_token.type === f.START_BLOCK ? e = this._flags.inline_frame ? "SPACE": "NEWLINE": this._flags.last_token.type === f.END_EXPR && (this._output.space_before_token = !0, e = "NEWLINE"), d(t, p) && ")" !== this._flags.last_token.text && (e = this._flags.inline_frame || "else" === this._flags.last_token.text || "export" === this._flags.last_token.text ? "SPACE": "NEWLINE"), d(t, ["else", "catch", "finally"])) ? (this._flags.last_token.type !== f.END_BLOCK || this._previous_flags.mode !== m || "expand" === this._options.brace_style || "end-expand" === this._options.brace_style || "none" === this._options.brace_style && t.newlines) && !this._flags.inline_frame ? this.print_newline() : (this._output.trim(!0), "}" !== this._output.current_line.last() && this.print_newline(), this._output.space_before_token = !0) : "NEWLINE" === e ? d(this._flags.last_token, b) ? this._output.space_before_token = !0 : "declare" === this._flags.last_token.text && d(t, ["var", "let", "const"]) ? this._output.space_before_token = !0 : this._flags.last_token.type !== f.END_EXPR ? this._flags.last_token.type === f.START_EXPR && d(t, ["var", "let", "const"]) || ":" === this._flags.last_token.text || (a(t, "if") && a(t.previous, "else") ? this._output.space_before_token = !0 : this.print_newline()) : d(t, p) && ")" !== this._flags.last_token.text && this.print_newline() : this._flags.multiline_frame && R(this._flags.mode) && "," === this._flags.last_token.text && "}" === this._last_last_text ? this.print_newline() : "SPACE" === e && (this._output.space_before_token = !0); ! t.previous || t.previous.type !== f.WORD && t.previous.type !== f.RESERVED || (this._output.space_before_token = !0),
            this.print_token(t),
            this._flags.last_word = t.text,
            t.type === f.RESERVED && ("do" === t.text ? this._flags.do_block = !0 : "if" === t.text ? this._flags.if_block = !0 : "import" === t.text ? this._flags.import_block = !0 : this._flags.import_block && a(t, "from") && (this._flags.import_block = !1))
        },
        T.prototype.handle_semicolon = function(t) {
            this.start_of_statement(t) ? this._output.space_before_token = !1 : this.handle_whitespace_and_comments(t);
            for (var e = this._tokens.peek(); ! (this._flags.mode !== w || this._flags.if_block && a(e, "else") || this._flags.do_block);) this.restore_mode();
            this._flags.import_block && (this._flags.import_block = !1),
            this.print_token(t)
        },
        T.prototype.handle_string = function(t) {
            this.start_of_statement(t) ? this._output.space_before_token = !0 : (this.handle_whitespace_and_comments(t), this._flags.last_token.type === f.RESERVED || this._flags.last_token.type === f.WORD || this._flags.inline_frame ? this._output.space_before_token = !0 : this._flags.last_token.type === f.COMMA || this._flags.last_token.type === f.START_EXPR || this._flags.last_token.type === f.EQUALS || this._flags.last_token.type === f.OPERATOR ? this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t) : this.print_newline()),
            this.print_token(t)
        },
        T.prototype.handle_equals = function(t) {
            this.start_of_statement(t) || this.handle_whitespace_and_comments(t),
            this._flags.declaration_statement && (this._flags.declaration_assignment = !0),
            this._output.space_before_token = !0,
            this.print_token(t),
            this._output.space_before_token = !0
        },
        T.prototype.handle_comma = function(t) {
            this.handle_whitespace_and_comments(t, !0),
            this.print_token(t),
            this._output.space_before_token = !0,
            this._flags.declaration_statement ? (O(this._flags.parent.mode) && (this._flags.declaration_assignment = !1), this._flags.declaration_assignment ? (this._flags.declaration_assignment = !1, this.print_newline(!1, !0)) : this._options.comma_first && this.allow_wrap_or_preserved_newline(t)) : this._flags.mode === r || this._flags.mode === w && this._flags.parent.mode === r ? (this._flags.mode === w && this.restore_mode(), this._flags.inline_frame || this.print_newline()) : this._options.comma_first && this.allow_wrap_or_preserved_newline(t)
        },
        T.prototype.handle_operator = function(t) {
            var e = "*" === t.text && (d(this._flags.last_token, ["function", "yield"]) || c(this._flags.last_token.type, [f.START_BLOCK, f.COMMA, f.END_BLOCK, f.SEMICOLON])),
            u = c(t.text, ["-", "+"]) && (c(this._flags.last_token.type, [f.START_BLOCK, f.START_EXPR, f.EQUALS, f.OPERATOR]) || c(this._flags.last_token.text, p) || "," === this._flags.last_token.text);
            if (this.start_of_statement(t));
            else {
                var i = !e;
                this.handle_whitespace_and_comments(t, i)
            }
            if (d(this._flags.last_token, b)) return this._output.space_before_token = !0,
            void this.print_token(t);
            if ("*" !== t.text || this._flags.last_token.type !== f.DOT) if ("::" !== t.text) {
                if (this._flags.last_token.type === f.OPERATOR && c(this._options.operator_position, k) && this.allow_wrap_or_preserved_newline(t), ":" === t.text && this._flags.in_case) return this._flags.case_body = !0,
                this.indent(),
                this.print_token(t),
                this.print_newline(),
                void(this._flags.in_case = !1);
                var n = !0,
                _ = !0,
                s = !1;
                if (":" === t.text ? 0 === this._flags.ternary_depth ? n = !1 : (this._flags.ternary_depth -= 1, s = !0) : "?" === t.text && (this._flags.ternary_depth += 1), !u && !e && this._options.preserve_newlines && c(t.text, l)) {
                    var a = ":" === t.text,
                    o = a && s,
                    r = a && !s;
                    switch (this._options.operator_position) {
                    case g.before_newline:
                        return this._output.space_before_token = !r,
                        this.print_token(t),
                        a && !o || this.allow_wrap_or_preserved_newline(t),
                        void(this._output.space_before_token = !0);
                    case g.after_newline:
                        return this._output.space_before_token = !0,
                        !a || o ? this._tokens.peek().newlines ? this.print_newline(!1, !0) : this.allow_wrap_or_preserved_newline(t) : this._output.space_before_token = !1,
                        this.print_token(t),
                        void(this._output.space_before_token = !0);
                    case g.preserve_newline:
                        return r || this.allow_wrap_or_preserved_newline(t),
                        n = !(this._output.just_added_newline() || r),
                        this._output.space_before_token = n,
                        this.print_token(t),
                        void(this._output.space_before_token = !0)
                    }
                }
                if (e) {
                    this.allow_wrap_or_preserved_newline(t),
                    n = !1;
                    var h = this._tokens.peek();
                    _ = h && c(h.type, [f.WORD, f.RESERVED])
                } else "..." === t.text ? (this.allow_wrap_or_preserved_newline(t), n = this._flags.last_token.type === f.START_BLOCK, _ = !1) : (c(t.text, ["--", "++", "!", "~"]) || u) && (this._flags.last_token.type !== f.COMMA && this._flags.last_token.type !== f.START_EXPR || this.allow_wrap_or_preserved_newline(t), _ = n = !1, !t.newlines || "--" !== t.text && "++" !== t.text || this.print_newline(!1, !0), ";" === this._flags.last_token.text && O(this._flags.mode) && (n = !0), this._flags.last_token.type === f.RESERVED ? n = !0 : this._flags.last_token.type === f.END_EXPR ? n = !("]" === this._flags.last_token.text && ("--" === t.text || "++" === t.text)) : this._flags.last_token.type === f.OPERATOR && (n = c(t.text, ["--", "-", "++", "+"]) && c(this._flags.last_token.text, ["--", "-", "++", "+"]), c(t.text, ["+", "-"]) && c(this._flags.last_token.text, ["--", "++"]) && (_ = !0)), (this._flags.mode !== m || this._flags.inline_frame) && this._flags.mode !== w || "{" !== this._flags.last_token.text && ";" !== this._flags.last_token.text || this.print_newline());
                this._output.space_before_token = this._output.space_before_token || n,
                this.print_token(t),
                this._output.space_before_token = _
            } else this.print_token(t);
            else this.print_token(t)
        },
        T.prototype.handle_block_comment = function(t, e) {
            if (this._output.raw) return this._output.add_raw_token(t),
            void(t.directives && "end" === t.directives.preserve && (this._output.raw = this._options.test_output_raw));
            if (t.directives) return this.print_newline(!1, e),
            this.print_token(t),
            "start" === t.directives.preserve && (this._output.raw = !0),
            void this.print_newline(!1, !0);
            if (!o.newline.test(t.text) && !t.newlines) return this._output.space_before_token = !0,
            this.print_token(t),
            void(this._output.space_before_token = !0);
            var u, i = function(t) {
                for (var e = [], u = (t = t.replace(o.allLineBreaks, "\n")).indexOf("\n"); - 1 !== u;) e.push(t.substring(0, u)),
                u = (t = t.substring(u + 1)).indexOf("\n");
                return t.length && e.push(t),
                e
            } (t.text),
            n = !1,
            _ = !1,
            s = t.whitespace_before,
            a = s.length;
            if (this.print_newline(!1, e), this.print_token(t, i[0]), this.print_newline(!1, e), 1 < i.length) {
                for (n = function(t, e) {
                    for (var u = 0; u < t.length; u++) if (t[u].trim().charAt(0) !== e) return ! 1;
                    return ! 0
                } (i = i.slice(1), "*"), _ = function(t, e) {
                    for (var u, i = 0,
                    n = t.length; i < n; i++) if ((u = t[i]) && 0 !== u.indexOf(e)) return ! 1;
                    return ! 0
                } (i, s), n && (this._flags.alignment = 1), u = 0; u < i.length; u++) n ? this.print_token(t, i[u].replace(/^\s+/g, "")) : _ && i[u] ? this.print_token(t, i[u].substring(a)) : (this._output.current_line.set_indent( - 1), this._output.add_token(i[u])),
                this.print_newline(!1, e);
                this._flags.alignment = 0
            }
        },
        T.prototype.handle_comment = function(t, e) {
            t.newlines ? this.print_newline(!1, e) : this._output.trim(!0),
            this._output.space_before_token = !0,
            this.print_token(t),
            this.print_newline(!1, e)
        },
        T.prototype.handle_dot = function(t) {
            this.start_of_statement(t) || this.handle_whitespace_and_comments(t, !0),
            d(this._flags.last_token, b) ? this._output.space_before_token = !1 : this.allow_wrap_or_preserved_newline(t, ")" === this._flags.last_token.text && this._options.break_chained_methods),
            this._options.unindent_chained_methods && this._output.just_added_newline() && this.deindent(),
            this.print_token(t)
        },
        T.prototype.handle_unknown = function(t, e) {
            this.print_token(t),
            "\n" === t.text[t.text.length - 1] && this.print_newline(!1, e)
        },
        T.prototype.handle_eof = function(t) {
            for (; this._flags.mode === w;) this.restore_mode();
            this.handle_whitespace_and_comments(t)
        },
        t.exports.Beautifier = T
    },
    function(t, e, u) {
        "use strict";
        function n(t) {
            this.__parent = t,
            this.__character_count = 0,
            this.__indent_count = -1,
            this.__alignment_count = 0,
            this.__wrap_point_index = 0,
            this.__wrap_point_character_count = 0,
            this.__wrap_point_indent_count = -1,
            this.__wrap_point_alignment_count = 0,
            this.__items = []
        }
        function i(t, e) {
            this.__cache = [""],
            this.__indent_size = t.indent_size,
            this.__indent_string = t.indent_char,
            t.indent_with_tabs || (this.__indent_string = new Array(t.indent_size + 1).join(t.indent_char)),
            e = e || "",
            0 < t.indent_level && (e = new Array(t.indent_level + 1).join(this.__indent_string)),
            this.__base_string = e,
            this.__base_string_length = e.length
        }
        function _(t, e) {
            this.__indent_cache = new i(t, e),
            this.raw = !1,
            this._end_with_newline = t.end_with_newline,
            this.indent_size = t.indent_size,
            this.wrap_line_length = t.wrap_line_length,
            this.__lines = [],
            this.previous_line = null,
            this.current_line = null,
            this.next_line = new n(this),
            this.space_before_token = !1,
            this.non_breaking_space = !1,
            this.previous_token_wrapped = !1,
            this.__add_outputline()
        }
        n.prototype.clone_empty = function() {
            var t = new n(this.__parent);
            return t.set_indent(this.__indent_count, this.__alignment_count),
            t
        },
        n.prototype.item = function(t) {
            return t < 0 ? this.__items[this.__items.length + t] : this.__items[t]
        },
        n.prototype.has_match = function(t) {
            for (var e = this.__items.length - 1; 0 <= e; e--) if (this.__items[e].match(t)) return ! 0;
            return ! 1
        },
        n.prototype.set_indent = function(t, e) {
            this.is_empty() && (this.__indent_count = t || 0, this.__alignment_count = e || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count))
        },
        n.prototype._set_wrap_point = function() {
            this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count)
        },
        n.prototype._should_wrap = function() {
            return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count
        },
        n.prototype._allow_wrap = function() {
            if (this._should_wrap()) {
                this.__parent.add_new_line();
                var t = this.__parent.current_line;
                return t.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count),
                t.__items = this.__items.slice(this.__wrap_point_index),
                this.__items = this.__items.slice(0, this.__wrap_point_index),
                t.__character_count += this.__character_count - this.__wrap_point_character_count,
                this.__character_count = this.__wrap_point_character_count,
                " " === t.__items[0] && (t.__items.splice(0, 1), t.__character_count -= 1),
                !0
            }
            return ! 1
        },
        n.prototype.is_empty = function() {
            return 0 === this.__items.length
        },
        n.prototype.last = function() {
            return this.is_empty() ? null: this.__items[this.__items.length - 1]
        },
        n.prototype.push = function(t) {
            this.__items.push(t);
            var e = t.lastIndexOf("\n"); - 1 !== e ? this.__character_count = t.length - e: this.__character_count += t.length
        },
        n.prototype.pop = function() {
            var t = null;
            return this.is_empty() || (t = this.__items.pop(), this.__character_count -= t.length),
            t
        },
        n.prototype._remove_indent = function() {
            0 < this.__indent_count && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size)
        },
        n.prototype._remove_wrap_indent = function() {
            0 < this.__wrap_point_indent_count && (this.__wrap_point_indent_count -= 1)
        },
        n.prototype.trim = function() {
            for (;
            " " === this.last();) this.__items.pop(),
            this.__character_count -= 1
        },
        n.prototype.toString = function() {
            var t = "";
            return this.is_empty() || (t = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), t += this.__items.join("")),
            t
        },
        i.prototype.get_indent_size = function(t, e) {
            var u = this.__base_string_length;
            return e = e || 0,
            t < 0 && (u = 0),
            u += t * this.__indent_size,
            u += e
        },
        i.prototype.get_indent_string = function(t, e) {
            var u = this.__base_string;
            return e = e || 0,
            t < 0 && (t = 0, u = ""),
            e += t * this.__indent_size,
            this.__ensure_cache(e),
            u += this.__cache[e]
        },
        i.prototype.__ensure_cache = function(t) {
            for (; t >= this.__cache.length;) this.__add_column()
        },
        i.prototype.__add_column = function() {
            var t = this.__cache.length,
            e = 0,
            u = "";
            this.__indent_size && t >= this.__indent_size && (t -= (e = Math.floor(t / this.__indent_size)) * this.__indent_size, u = new Array(e + 1).join(this.__indent_string)),
            t && (u += new Array(t + 1).join(" ")),
            this.__cache.push(u)
        },
        _.prototype.__add_outputline = function() {
            this.previous_line = this.current_line,
            this.current_line = this.next_line.clone_empty(),
            this.__lines.push(this.current_line)
        },
        _.prototype.get_line_number = function() {
            return this.__lines.length
        },
        _.prototype.get_indent_string = function(t, e) {
            return this.__indent_cache.get_indent_string(t, e)
        },
        _.prototype.get_indent_size = function(t, e) {
            return this.__indent_cache.get_indent_size(t, e)
        },
        _.prototype.is_empty = function() {
            return ! this.previous_line && this.current_line.is_empty()
        },
        _.prototype.add_new_line = function(t) {
            return ! (this.is_empty() || !t && this.just_added_newline()) && (this.raw || this.__add_outputline(), !0)
        },
        _.prototype.get_code = function(t) {
            this.trim(!0);
            var e = this.current_line.pop();
            e && ("\n" === e[e.length - 1] && (e = e.replace(/\n+$/g, "")), this.current_line.push(e)),
            this._end_with_newline && this.__add_outputline();
            var u = this.__lines.join("\n");
            return "\n" !== t && (u = u.replace(/[\n]/g, t)),
            u
        },
        _.prototype.set_wrap_point = function() {
            this.current_line._set_wrap_point()
        },
        _.prototype.set_indent = function(t, e) {
            return t = t || 0,
            e = e || 0,
            this.next_line.set_indent(t, e),
            1 < this.__lines.length ? (this.current_line.set_indent(t, e), !0) : (this.current_line.set_indent(), !1)
        },
        _.prototype.add_raw_token = function(t) {
            for (var e = 0; e < t.newlines; e++) this.__add_outputline();
            this.current_line.set_indent( - 1),
            this.current_line.push(t.whitespace_before),
            this.current_line.push(t.text),
            this.space_before_token = !1,
            this.non_breaking_space = !1,
            this.previous_token_wrapped = !1
        },
        _.prototype.add_token = function(t) {
            this.__add_space_before_token(),
            this.current_line.push(t),
            this.space_before_token = !1,
            this.non_breaking_space = !1,
            this.previous_token_wrapped = this.current_line._allow_wrap()
        },
        _.prototype.__add_space_before_token = function() {
            this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "))
        },
        _.prototype.remove_indent = function(t) {
            for (var e = this.__lines.length; t < e;) this.__lines[t]._remove_indent(),
            t++;
            this.current_line._remove_wrap_indent()
        },
        _.prototype.trim = function(t) {
            for (t = void 0 !== t && t, this.current_line.trim(); t && 1 < this.__lines.length && this.current_line.is_empty();) this.__lines.pop(),
            this.current_line = this.__lines[this.__lines.length - 1],
            this.current_line.trim();
            this.previous_line = 1 < this.__lines.length ? this.__lines[this.__lines.length - 2] : null
        },
        _.prototype.just_added_newline = function() {
            return this.current_line.is_empty()
        },
        _.prototype.just_added_blankline = function() {
            return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty()
        },
        _.prototype.ensure_empty_line_above = function(t, e) {
            for (var u = this.__lines.length - 2; 0 <= u;) {
                var i = this.__lines[u];
                if (i.is_empty()) break;
                if (0 !== i.item(0).indexOf(t) && i.item( - 1) !== e) {
                    this.__lines.splice(u + 1, 0, new n(this)),
                    this.previous_line = this.__lines[this.__lines.length - 2];
                    break
                }
                u--
            }
        },
        t.exports.Output = _
    },
    function(t, e, u) {
        "use strict";
        t.exports.Token = function(t, e, u, i) {
            this.type = t,
            this.text = e,
            this.comments_before = null,
            this.newlines = u || 0,
            this.whitespace_before = i || "",
            this.parent = null,
            this.next = null,
            this.previous = null,
            this.opened = null,
            this.closed = null,
            this.directives = null
        }
    },
    function(t, e, u) {
        "use strict";
        var i = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a",
        n = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc",
        _ = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f",
        s = "(?:\\\\u[0-9a-fA-F]{4}|[\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a" + n + "])";
        e.identifier = new RegExp(s + "(?:\\\\u[0-9a-fA-F]{4}|[\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f])*", "g"),
        e.identifierStart = new RegExp(s),
        e.identifierMatch = new RegExp("(?:\\\\u[0-9a-fA-F]{4}|[" + i + n + _ + "])+");
        e.newline = /[\n\r\u2028\u2029]/,
        e.lineBreak = new RegExp("\r\n|" + e.newline.source),
        e.allLineBreaks = new RegExp(e.lineBreak.source, "g")
    },
    function(t, e, u) {
        "use strict";
        var n = u(6).Options,
        _ = ["before-newline", "after-newline", "preserve-newline"];
        function i(t) {
            n.call(this, t, "js");
            var e = this.raw_options.brace_style || null;
            "expand-strict" === e ? this.raw_options.brace_style = "expand": "collapse-preserve-inline" === e ? this.raw_options.brace_style = "collapse,preserve-inline": void 0 !== this.raw_options.braces_on_own_line && (this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand": "collapse");
            var u = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
            this.brace_preserve_inline = !1,
            this.brace_style = "collapse";
            for (var i = 0; i < u.length; i++)"preserve-inline" === u[i] ? this.brace_preserve_inline = !0 : this.brace_style = u[i];
            this.unindent_chained_methods = this._get_boolean("unindent_chained_methods"),
            this.break_chained_methods = this._get_boolean("break_chained_methods"),
            this.space_in_paren = this._get_boolean("space_in_paren"),
            this.space_in_empty_paren = this._get_boolean("space_in_empty_paren"),
            this.jslint_happy = this._get_boolean("jslint_happy"),
            this.space_after_anon_function = this._get_boolean("space_after_anon_function"),
            this.space_after_named_function = this._get_boolean("space_after_named_function"),
            this.keep_array_indentation = this._get_boolean("keep_array_indentation"),
            this.space_before_conditional = this._get_boolean("space_before_conditional", !0),
            this.unescape_strings = this._get_boolean("unescape_strings"),
            this.e4x = this._get_boolean("e4x"),
            this.comma_first = this._get_boolean("comma_first"),
            this.operator_position = this._get_selection("operator_position", _),
            this.test_output_raw = this._get_boolean("test_output_raw"),
            this.jslint_happy && (this.space_after_anon_function = !0)
        }
        i.prototype = new n,
        t.exports.Options = i
    },
    function(t, e, u) {
        "use strict";
        function i(t, e) {
            this.raw_options = n(t, e),
            this.disabled = this._get_boolean("disabled"),
            this.eol = this._get_characters("eol", "auto"),
            this.end_with_newline = this._get_boolean("end_with_newline"),
            this.indent_size = this._get_number("indent_size", 4),
            this.indent_char = this._get_characters("indent_char", " "),
            this.indent_level = this._get_number("indent_level"),
            this.preserve_newlines = this._get_boolean("preserve_newlines", !0),
            this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786),
            this.preserve_newlines || (this.max_preserve_newlines = 0),
            this.indent_with_tabs = this._get_boolean("indent_with_tabs", "\t" === this.indent_char),
            this.indent_with_tabs && (this.indent_char = "\t", 1 === this.indent_size && (this.indent_size = 4)),
            this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"))
        }
        function n(t, e) {
            var u, i = {};
            for (u in t = _(t)) u !== e && (i[u] = t[u]);
            if (e && t[e]) for (u in t[e]) i[u] = t[e][u];
            return i
        }
        function _(t) {
            var e, u = {};
            for (e in t) {
                u[e.replace(/-/g, "_")] = t[e]
            }
            return u
        }
        i.prototype._get_array = function(t, e) {
            var u = this.raw_options[t],
            i = e || [];
            return "object" == typeof u ? null !== u && "function" == typeof u.concat && (i = u.concat()) : "string" == typeof u && (i = u.split(/[^a-zA-Z0-9_\/\-]+/)),
            i
        },
        i.prototype._get_boolean = function(t, e) {
            var u = this.raw_options[t];
            return void 0 === u ? !!e: !!u
        },
        i.prototype._get_characters = function(t, e) {
            var u = this.raw_options[t],
            i = e || "";
            return "string" == typeof u && (i = u.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "\t")),
            i
        },
        i.prototype._get_number = function(t, e) {
            var u = this.raw_options[t];
            e = parseInt(e, 10),
            isNaN(e) && (e = 0);
            var i = parseInt(u, 10);
            return isNaN(i) && (i = e),
            i
        },
        i.prototype._get_selection = function(t, e, u) {
            var i = this._get_selection_list(t, e, u);
            if (1 !== i.length) throw new Error("Invalid Option Value: The option '" + t + "' can only be one of the following values:\n" + e + "\nYou passed in: '" + this.raw_options[t] + "'");
            return i[0]
        },
        i.prototype._get_selection_list = function(t, e, u) {
            if (!e || 0 === e.length) throw new Error("Selection list cannot be empty.");
            if (u = u || [e[0]], !this._is_valid_selection(u, e)) throw new Error("Invalid Default Value!");
            var i = this._get_array(t, u);
            if (!this._is_valid_selection(i, e)) throw new Error("Invalid Option Value: The option '" + t + "' can contain only the following values:\n" + e + "\nYou passed in: '" + this.raw_options[t] + "'");
            return i
        },
        i.prototype._is_valid_selection = function(t, e) {
            return t.length && e.length && !t.some(function(t) {
                return - 1 === e.indexOf(t)
            })
        },
        t.exports.Options = i,
        t.exports.normalizeOpts = _,
        t.exports.mergeOpts = n
    },
    function(t, e, u) {
        "use strict";
        var _ = u(8).InputScanner,
        n = u(9).Tokenizer,
        i = u(9).TOKEN,
        s = u(13).Directives,
        r = u(4),
        a = u(12).Pattern,
        o = u(14).TemplatablePattern;
        function h(t, e) {
            return - 1 !== e.indexOf(t)
        }
        var p = {
            START_EXPR: "TK_START_EXPR",
            END_EXPR: "TK_END_EXPR",
            START_BLOCK: "TK_START_BLOCK",
            END_BLOCK: "TK_END_BLOCK",
            WORD: "TK_WORD",
            RESERVED: "TK_RESERVED",
            SEMICOLON: "TK_SEMICOLON",
            STRING: "TK_STRING",
            EQUALS: "TK_EQUALS",
            OPERATOR: "TK_OPERATOR",
            COMMA: "TK_COMMA",
            BLOCK_COMMENT: "TK_BLOCK_COMMENT",
            COMMENT: "TK_COMMENT",
            DOT: "TK_DOT",
            UNKNOWN: "TK_UNKNOWN",
            START: i.START,
            RAW: i.RAW,
            EOF: i.EOF
        },
        l = new s(/\/\*/, /\*\//),
        f = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/,
        c = /[0-9]/,
        d = /[^\d\.]/,
        b = ">>> === !== << && >= ** != == <= >> || < / - + > : & % ? ^ | *".split(" "),
        g = ">>>= ... >>= <<= === >>> !== **= => ^= :: /= << <= == && -= >= >> != -- += ** || ++ %= &= *= |= = ! ? > < : / ^ - + * & % ~ |";
        g = (g = g.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&")).replace(/ /g, "|");
        var k, m = new RegExp(g),
        w = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),
        y = w.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as"]),
        x = new RegExp("^(?:" + y.join("|") + ")$"),
        v = function(t, e) {
            n.call(this, t, e),
            this._patterns.whitespace = this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source, /\u2028\u2029/.source);
            var u = new a(this._input),
            i = new o(this._input);
            i = (i = i.disable("handlebars")).disable("django"),
            this.__patterns = {
                template: i,
                identifier: i.starting_with(r.identifier).matching(r.identifierMatch),
                number: u.matching(f),
                punct: u.matching(m),
                comment: u.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
                block_comment: u.starting_with(/\/\*/).until_after(/\*\//),
                html_comment_start: u.matching(/<!--/),
                html_comment_end: u.matching(/-->/),
                include: u.starting_with(/#include/).until_after(r.lineBreak),
                shebang: u.starting_with(/#!/).until_after(r.lineBreak),
                xml: u.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),
                single_quote: i.until(/['\\\n\r\u2028\u2029]/),
                double_quote: i.until(/["\\\n\r\u2028\u2029]/),
                template_text: i.until(/[`\\$]/),
                template_expression: i.until(/[`}\\]/)
            }
        }; (v.prototype = new n)._is_comment = function(t) {
            return t.type === p.COMMENT || t.type === p.BLOCK_COMMENT || t.type === p.UNKNOWN
        },
        v.prototype._is_opening = function(t) {
            return t.type === p.START_BLOCK || t.type === p.START_EXPR
        },
        v.prototype._is_closing = function(t, e) {
            return (t.type === p.END_BLOCK || t.type === p.END_EXPR) && e && ("]" === t.text && "[" === e.text || ")" === t.text && "(" === e.text || "}" === t.text && "{" === e.text)
        },
        v.prototype._reset = function() {
            k = !1
        },
        v.prototype._get_next_token = function(t, e) {
            var u = null;
            this._readWhitespace();
            var i = this._input.peek();
            return null === i ? this._create_token(p.EOF, "") : u = (u = (u = (u = (u = (u = (u = (u = (u = u || this._read_string(i)) || this._read_word(t)) || this._read_singles(i)) || this._read_comment(i)) || this._read_regexp(i, t)) || this._read_xml(i, t)) || this._read_non_javascript(i)) || this._read_punctuation()) || this._create_token(p.UNKNOWN, this._input.next())
        },
        v.prototype._read_word = function(t) {
            var e;
            return "" !== (e = this.__patterns.identifier.read()) ? (e = e.replace(r.allLineBreaks, "\n"), t.type !== p.DOT && (t.type !== p.RESERVED || "set" !== t.text && "get" !== t.text) && x.test(e) ? "in" === e || "of" === e ? this._create_token(p.OPERATOR, e) : this._create_token(p.RESERVED, e) : this._create_token(p.WORD, e)) : "" !== (e = this.__patterns.number.read()) ? this._create_token(p.WORD, e) : void 0
        },
        v.prototype._read_singles = function(t) {
            var e = null;
            return "(" === t || "[" === t ? e = this._create_token(p.START_EXPR, t) : ")" === t || "]" === t ? e = this._create_token(p.END_EXPR, t) : "{" === t ? e = this._create_token(p.START_BLOCK, t) : "}" === t ? e = this._create_token(p.END_BLOCK, t) : ";" === t ? e = this._create_token(p.SEMICOLON, t) : "." === t && d.test(this._input.peek(1)) ? e = this._create_token(p.DOT, t) : "," === t && (e = this._create_token(p.COMMA, t)),
            e && this._input.next(),
            e
        },
        v.prototype._read_punctuation = function() {
            var t = this.__patterns.punct.read();
            if ("" !== t) return "=" === t ? this._create_token(p.EQUALS, t) : this._create_token(p.OPERATOR, t)
        },
        v.prototype._read_non_javascript = function(t) {
            var e = "";
            if ("#" === t) {
                if (this._is_first_token() && (e = this.__patterns.shebang.read())) return this._create_token(p.UNKNOWN, e.trim() + "\n");
                if (e = this.__patterns.include.read()) return this._create_token(p.UNKNOWN, e.trim() + "\n");
                t = this._input.next();
                var u = "#";
                if (this._input.hasNext() && this._input.testChar(c)) {
                    for (; u += t = this._input.next(), this._input.hasNext() && "#" !== t && "=" !== t;);
                    return "#" === t || ("[" === this._input.peek() && "]" === this._input.peek(1) ? (u += "[]", this._input.next(), this._input.next()) : "{" === this._input.peek() && "}" === this._input.peek(1) && (u += "{}", this._input.next(), this._input.next())),
                    this._create_token(p.WORD, u)
                }
                this._input.back()
            } else if ("<" === t) {
                if (e = this.__patterns.html_comment_start.read()) {
                    for (; this._input.hasNext() && !this._input.testChar(r.newline);) e += this._input.next();
                    return k = !0,
                    this._create_token(p.COMMENT, e)
                }
            } else if (k && "-" === t && (e = this.__patterns.html_comment_end.read())) return k = !1,
            this._create_token(p.COMMENT, e);
            return null
        },
        v.prototype._read_comment = function(t) {
            var e = null;
            if ("/" === t) {
                var u = "";
                if ("*" === this._input.peek(1)) {
                    u = this.__patterns.block_comment.read();
                    var i = l.get_directives(u);
                    i && "start" === i.ignore && (u += l.readIgnored(this._input)),
                    u = u.replace(r.allLineBreaks, "\n"),
                    (e = this._create_token(p.BLOCK_COMMENT, u)).directives = i
                } else "/" === this._input.peek(1) && (u = this.__patterns.comment.read(), e = this._create_token(p.COMMENT, u))
            }
            return e
        },
        v.prototype._read_string = function(t) {
            if ("`" !== t && "'" !== t && '"' !== t) return null;
            var e = this._input.next();
            return this.has_char_escapes = !1,
            e += "`" === t ? this._read_string_recursive("`", !0, "${") : this._read_string_recursive(t),
            this.has_char_escapes && this._options.unescape_strings && (e = function(t) {
                var e = "",
                u = 0,
                i = new _(t),
                n = null;
                for (; i.hasNext();) if ((n = i.match(/([\s]|[^\\]|\\\\)+/g)) && (e += n[0]), "\\" === i.peek()) {
                    if (i.next(), "x" === i.peek()) n = i.match(/x([0-9A-Fa-f]{2})/g);
                    else {
                        if ("u" !== i.peek()) {
                            e += "\\",
                            i.hasNext() && (e += i.next());
                            continue
                        }
                        n = i.match(/u([0-9A-Fa-f]{4})/g)
                    }
                    if (!n) return t;
                    if (126 < (u = parseInt(n[1], 16)) && u <= 255 && 0 === n[0].indexOf("x")) return t;
                    if (0 <= u && u < 32) {
                        e += "\\" + n[0];
                        continue
                    }
                    e += 34 === u || 39 === u || 92 === u ? "\\" + String.fromCharCode(u) : String.fromCharCode(u)
                }
                return e
            } (e)),
            this._input.peek() === t && (e += this._input.next()),
            e = e.replace(r.allLineBreaks, "\n"),
            this._create_token(p.STRING, e)
        },
        v.prototype._allow_regexp_or_xml = function(t) {
            return t.type === p.RESERVED && h(t.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || t.type === p.END_EXPR && ")" === t.text && t.opened.previous.type === p.RESERVED && h(t.opened.previous.text, ["if", "while", "for"]) || h(t.type, [p.COMMENT, p.START_EXPR, p.START_BLOCK, p.START, p.END_BLOCK, p.OPERATOR, p.EQUALS, p.EOF, p.SEMICOLON, p.COMMA])
        },
        v.prototype._read_regexp = function(t, e) {
            if ("/" === t && this._allow_regexp_or_xml(e)) {
                for (var u = this._input.next(), i = !1, n = !1; this._input.hasNext() && (i || n || this._input.peek() !== t) && !this._input.testChar(r.newline);) u += this._input.peek(),
                i ? i = !1 : (i = "\\" === this._input.peek(), "[" === this._input.peek() ? n = !0 : "]" === this._input.peek() && (n = !1)),
                this._input.next();
                return this._input.peek() === t && (u += this._input.next(), u += this._input.read(r.identifier)),
                this._create_token(p.STRING, u)
            }
            return null
        },
        v.prototype._read_xml = function(t, e) {
            if (this._options.e4x && "<" === t && this._allow_regexp_or_xml(e)) {
                var u = "",
                i = this.__patterns.xml.read_match();
                if (i) {
                    for (var n = i[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}"), _ = 0 === n.indexOf("{"), s = 0; i;) {
                        var a = !!i[1],
                        o = i[2];
                        if (! ( !! i[i.length - 1] || "![CDATA[" === o.slice(0, 8)) && (o === n || _ && o.replace(/^{\s+/, "{").replace(/\s+}$/, "}")) && (a ? --s: ++s), u += i[0], s <= 0) break;
                        i = this.__patterns.xml.read_match()
                    }
                    return i || (u += this._input.match(/[\s\S]*/g)[0]),
                    u = u.replace(r.allLineBreaks, "\n"),
                    this._create_token(p.STRING, u)
                }
            }
            return null
        },
        v.prototype._read_string_recursive = function(t, e, u) {
            var i, n;
            "'" === t ? n = this.__patterns.single_quote: '"' === t ? n = this.__patterns.double_quote: "`" === t ? n = this.__patterns.template_text: "}" === t && (n = this.__patterns.template_expression);
            for (var _ = n.read(), s = ""; this._input.hasNext();) {
                if ((s = this._input.next()) === t || !e && r.newline.test(s)) {
                    this._input.back();
                    break
                }
                "\\" === s && this._input.hasNext() ? ("x" === (i = this._input.peek()) || "u" === i ? this.has_char_escapes = !0 : "\r" === i && "\n" === this._input.peek(1) && this._input.next(), s += this._input.next()) : u && ("${" === u && "$" === s && "{" === this._input.peek() && (s += this._input.next()), u === s && (s += "`" === t ? this._read_string_recursive("}", e, "`") : this._read_string_recursive("`", e, "${"), this._input.hasNext() && (s += this._input.next()))),
                _ += s += n.read()
            }
            return _
        },
        t.exports.Tokenizer = v,
        t.exports.TOKEN = p,
        t.exports.positionable_operators = b.slice(),
        t.exports.line_starters = w.slice()
    },
    function(t, e, u) {
        "use strict";
        var n = RegExp.prototype.hasOwnProperty("sticky");
        function i(t) {
            this.__input = t || "",
            this.__input_length = this.__input.length,
            this.__position = 0
        }
        i.prototype.restart = function() {
            this.__position = 0
        },
        i.prototype.back = function() {
            0 < this.__position && (this.__position -= 1)
        },
        i.prototype.hasNext = function() {
            return this.__position < this.__input_length
        },
        i.prototype.next = function() {
            var t = null;
            return this.hasNext() && (t = this.__input.charAt(this.__position), this.__position += 1),
            t
        },
        i.prototype.peek = function(t) {
            var e = null;
            return t = t || 0,
            0 <= (t += this.__position) && t < this.__input_length && (e = this.__input.charAt(t)),
            e
        },
        i.prototype.__match = function(t, e) {
            t.lastIndex = e;
            var u = t.exec(this.__input);
            return ! u || n && t.sticky || u.index !== e && (u = null),
            u
        },
        i.prototype.test = function(t, e) {
            return e = e || 0,
            0 <= (e += this.__position) && e < this.__input_length && !!this.__match(t, e)
        },
        i.prototype.testChar = function(t, e) {
            var u = this.peek(e);
            return t.lastIndex = 0,
            null !== u && t.test(u)
        },
        i.prototype.match = function(t) {
            var e = this.__match(t, this.__position);
            return e ? this.__position += e[0].length: e = null,
            e
        },
        i.prototype.read = function(t, e, u) {
            var i, n = "";
            return t && (i = this.match(t)) && (n += i[0]),
            !e || !i && t || (n += this.readUntil(e, u)),
            n
        },
        i.prototype.readUntil = function(t, e) {
            var u, i = this.__position;
            t.lastIndex = this.__position;
            var n = t.exec(this.__input);
            return n ? (i = n.index, e && (i += n[0].length)) : i = this.__input_length,
            u = this.__input.substring(this.__position, i),
            this.__position = i,
            u
        },
        i.prototype.readUntilAfter = function(t) {
            return this.readUntil(t, !0)
        },
        i.prototype.get_regexp = function(t, e) {
            var u = null,
            i = "g";
            return e && n && (i = "y"),
            "string" == typeof t && "" !== t ? u = new RegExp(t, i) : t && (u = new RegExp(t.source, i)),
            u
        },
        i.prototype.get_literal_regexp = function(t) {
            return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
        },
        i.prototype.peekUntilAfter = function(t) {
            var e = this.__position,
            u = this.readUntilAfter(t);
            return this.__position = e,
            u
        },
        i.prototype.lookBack = function(t) {
            var e = this.__position - 1;
            return e >= t.length && this.__input.substring(e - t.length, e).toLowerCase() === t
        },
        t.exports.InputScanner = i
    },
    function(t, e, u) {
        "use strict";
        var i = u(8).InputScanner,
        _ = u(3).Token,
        s = u(10).TokenStream,
        n = u(11).WhitespacePattern,
        a = {
            START: "TK_START",
            RAW: "TK_RAW",
            EOF: "TK_EOF"
        },
        o = function(t, e) {
            this._input = new i(t),
            this._options = e || {},
            this.__tokens = null,
            this._patterns = {},
            this._patterns.whitespace = new n(this._input)
        };
        o.prototype.tokenize = function() {
            var t;
            this._input.restart(),
            this.__tokens = new s,
            this._reset();
            for (var e = new _(a.START, ""), u = null, i = [], n = new s; e.type !== a.EOF;) {
                for (t = this._get_next_token(e, u); this._is_comment(t);) n.add(t),
                t = this._get_next_token(e, u);
                n.isEmpty() || (t.comments_before = n, n = new s),
                t.parent = u,
                this._is_opening(t) ? (i.push(u), u = t) : u && this._is_closing(t, u) && ((t.opened = u).closed = t, u = i.pop(), t.parent = u),
                (t.previous = e).next = t,
                this.__tokens.add(t),
                e = t
            }
            return this.__tokens
        },
        o.prototype._is_first_token = function() {
            return this.__tokens.isEmpty()
        },
        o.prototype._reset = function() {},
        o.prototype._get_next_token = function(t, e) {
            this._readWhitespace();
            var u = this._input.read(/.+/g);
            return u ? this._create_token(a.RAW, u) : this._create_token(a.EOF, "")
        },
        o.prototype._is_comment = function(t) {
            return ! 1
        },
        o.prototype._is_opening = function(t) {
            return ! 1
        },
        o.prototype._is_closing = function(t, e) {
            return ! 1
        },
        o.prototype._create_token = function(t, e) {
            return new _(t, e, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token)
        },
        o.prototype._readWhitespace = function() {
            return this._patterns.whitespace.read()
        },
        t.exports.Tokenizer = o,
        t.exports.TOKEN = a
    },
    function(t, e, u) {
        "use strict";
        function i(t) {
            this.__tokens = [],
            this.__tokens_length = this.__tokens.length,
            this.__position = 0,
            this.__parent_token = t
        }
        i.prototype.restart = function() {
            this.__position = 0
        },
        i.prototype.isEmpty = function() {
            return 0 === this.__tokens_length
        },
        i.prototype.hasNext = function() {
            return this.__position < this.__tokens_length
        },
        i.prototype.next = function() {
            var t = null;
            return this.hasNext() && (t = this.__tokens[this.__position], this.__position += 1),
            t
        },
        i.prototype.peek = function(t) {
            var e = null;
            return t = t || 0,
            0 <= (t += this.__position) && t < this.__tokens_length && (e = this.__tokens[t]),
            e
        },
        i.prototype.add = function(t) {
            this.__parent_token && (t.parent = this.__parent_token),
            this.__tokens.push(t),
            this.__tokens_length += 1
        },
        t.exports.TokenStream = i
    },
    function(t, e, u) {
        "use strict";
        var i = u(12).Pattern;
        function n(t, e) {
            i.call(this, t, e),
            e ? this._line_regexp = this._input.get_regexp(e._line_regexp) : this.__set_whitespace_patterns("", ""),
            this.newline_count = 0,
            this.whitespace_before_token = ""
        } (n.prototype = new i).__set_whitespace_patterns = function(t, e) {
            t += "\\t ",
            e += "\\n\\r",
            this._match_pattern = this._input.get_regexp("[" + t + e + "]+", !0),
            this._newline_regexp = this._input.get_regexp("\\r\\n|[" + e + "]")
        },
        n.prototype.read = function() {
            this.newline_count = 0,
            this.whitespace_before_token = "";
            var t = this._input.read(this._match_pattern);
            if (" " === t) this.whitespace_before_token = " ";
            else if (t) {
                var e = this.__split(this._newline_regexp, t);
                this.newline_count = e.length - 1,
                this.whitespace_before_token = e[this.newline_count]
            }
            return t
        },
        n.prototype.matching = function(t, e) {
            var u = this._create();
            return u.__set_whitespace_patterns(t, e),
            u._update(),
            u
        },
        n.prototype._create = function() {
            return new n(this._input, this)
        },
        n.prototype.__split = function(t, e) {
            for (var u = t.lastIndex = 0,
            i = [], n = t.exec(e); n;) i.push(e.substring(u, n.index)),
            u = n.index + n[0].length,
            n = t.exec(e);
            return u < e.length ? i.push(e.substring(u, e.length)) : i.push(""),
            i
        },
        t.exports.WhitespacePattern = n
    },
    function(t, e, u) {
        "use strict";
        function i(t, e) {
            this._input = t,
            this._starting_pattern = null,
            this._match_pattern = null,
            this._until_pattern = null,
            this._until_after = !1,
            e && (this._starting_pattern = this._input.get_regexp(e._starting_pattern, !0), this._match_pattern = this._input.get_regexp(e._match_pattern, !0), this._until_pattern = this._input.get_regexp(e._until_pattern), this._until_after = e._until_after)
        }
        i.prototype.read = function() {
            var t = this._input.read(this._starting_pattern);
            return this._starting_pattern && !t || (t += this._input.read(this._match_pattern, this._until_pattern, this._until_after)),
            t
        },
        i.prototype.read_match = function() {
            return this._input.match(this._match_pattern)
        },
        i.prototype.until_after = function(t) {
            var e = this._create();
            return e._until_after = !0,
            e._until_pattern = this._input.get_regexp(t),
            e._update(),
            e
        },
        i.prototype.until = function(t) {
            var e = this._create();
            return e._until_after = !1,
            e._until_pattern = this._input.get_regexp(t),
            e._update(),
            e
        },
        i.prototype.starting_with = function(t) {
            var e = this._create();
            return e._starting_pattern = this._input.get_regexp(t, !0),
            e._update(),
            e
        },
        i.prototype.matching = function(t) {
            var e = this._create();
            return e._match_pattern = this._input.get_regexp(t, !0),
            e._update(),
            e
        },
        i.prototype._create = function() {
            return new i(this._input, this)
        },
        i.prototype._update = function() {},
        t.exports.Pattern = i
    },
    function(t, e, u) {
        "use strict";
        function i(t, e) {
            t = "string" == typeof t ? t: t.source,
            e = "string" == typeof e ? e: e.source,
            this.__directives_block_pattern = new RegExp(t + / beautify( \w+[:]\w+)+ /.source + e, "g"),
            this.__directive_pattern = / (\w+)[:](\w+)/g,
            this.__directives_end_ignore_pattern = new RegExp(t + /\sbeautify\signore:end\s/.source + e, "g")
        }
        i.prototype.get_directives = function(t) {
            if (!t.match(this.__directives_block_pattern)) return null;
            var e = {};
            this.__directive_pattern.lastIndex = 0;
            for (var u = this.__directive_pattern.exec(t); u;) e[u[1]] = u[2],
            u = this.__directive_pattern.exec(t);
            return e
        },
        i.prototype.readIgnored = function(t) {
            return t.readUntilAfter(this.__directives_end_ignore_pattern)
        },
        t.exports.Directives = i
    },
    function(t, e, u) {
        "use strict";
        var i = u(12).Pattern,
        n = {
            django: !1,
            erb: !1,
            handlebars: !1,
            php: !1
        };
        function _(t, e) {
            i.call(this, t, e),
            this.__template_pattern = null,
            this._disabled = Object.assign({},
            n),
            this._excluded = Object.assign({},
            n),
            e && (this.__template_pattern = this._input.get_regexp(e.__template_pattern), this._excluded = Object.assign(this._excluded, e._excluded), this._disabled = Object.assign(this._disabled, e._disabled));
            var u = new i(t);
            this.__patterns = {
                handlebars_comment: u.starting_with(/{{!--/).until_after(/--}}/),
                handlebars: u.starting_with(/{{/).until_after(/}}/),
                php: u.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
                erb: u.starting_with(/<%[^%]/).until_after(/[^%]%>/),
                django: u.starting_with(/{%/).until_after(/%}/),
                django_value: u.starting_with(/{{/).until_after(/}}/),
                django_comment: u.starting_with(/{#/).until_after(/#}/)
            }
        } (_.prototype = new i)._create = function() {
            return new _(this._input, this)
        },
        _.prototype._update = function() {
            this.__set_templated_pattern()
        },
        _.prototype.disable = function(t) {
            var e = this._create();
            return e._disabled[t] = !0,
            e._update(),
            e
        },
        _.prototype.exclude = function(t) {
            var e = this._create();
            return e._excluded[t] = !0,
            e._update(),
            e
        },
        _.prototype.read = function() {
            var t = "";
            t = this._match_pattern ? this._input.read(this._starting_pattern) : this._input.read(this._starting_pattern, this.__template_pattern);
            for (var e = this._read_template(); e;) this._match_pattern ? e += this._input.read(this._match_pattern) : e += this._input.readUntil(this.__template_pattern),
            t += e,
            e = this._read_template();
            return this._until_after && (t += this._input.readUntilAfter(this._until_pattern)),
            t
        },
        _.prototype.__set_templated_pattern = function() {
            var t = [];
            this._disabled.php || t.push(this.__patterns.php._starting_pattern.source),
            this._disabled.handlebars || t.push(this.__patterns.handlebars._starting_pattern.source),
            this._disabled.erb || t.push(this.__patterns.erb._starting_pattern.source),
            this._disabled.django || (t.push(this.__patterns.django._starting_pattern.source), t.push(this.__patterns.django_value._starting_pattern.source), t.push(this.__patterns.django_comment._starting_pattern.source)),
            this._until_pattern && t.push(this._until_pattern.source),
            this.__template_pattern = this._input.get_regexp("(?:" + t.join("|") + ")")
        },
        _.prototype._read_template = function() {
            var t = "",
            e = this._input.peek();
            if ("<" === e) {
                var u = this._input.peek(1);
                this._disabled.php || this._excluded.php || "?" !== u || (t = t || this.__patterns.php.read()),
                this._disabled.erb || this._excluded.erb || "%" !== u || (t = t || this.__patterns.erb.read())
            } else "{" === e && (this._disabled.handlebars || this._excluded.handlebars || (t = (t = t || this.__patterns.handlebars_comment.read()) || this.__patterns.handlebars.read()), this._disabled.django || (this._excluded.django || this._excluded.handlebars || (t = t || this.__patterns.django_value.read()), this._excluded.django || (t = (t = t || this.__patterns.django_comment.read()) || this.__patterns.django.read())));
            return t
        },
        t.exports.TemplatablePattern = _
    }]);
    // "function" == typeof define && define.amd ? define([],
//     function() {
//         return {
//             js_beautify: t
//         }
//     }) : "undefined" != typeof exports ? exports.js_beautify = t: "undefined" != typeof window ? window.js_beautify = t: "undefined" != typeof global && (global.js_beautify = t)
// } ();