!function() {
    "use strict";
    function t(t, n) {
        let e;
        return (...o)=>{
            clearTimeout(e),
            e = setTimeout((()=>{
                t(...o)
            }
            ), n)
        }
    }
    class n {
        constructor() {
            this.callbacks = [],
            window.addEventListener("DOMContentLoaded", (()=>this.onDOMContentLoaded()))
        }
        onDOMContentLoaded() {
            this.callbacks.sort(((t,n)=>t.priority - n.priority)).forEach((({callback: t})=>t()))
        }
        runOnLoad(t) {
            "loading" === document.readyState ? this.callbacks.push(t) : t.callback()
        }
    }
    function e(t, e=Number.MAX_VALUE) {
        var o;
        (window.canva_scriptExecutor = null !== (o = window.canva_scriptExecutor) && void 0 !== o ? o : new n).runOnLoad({
            callback: t,
            priority: e
        })
    }
    class o {
        constructor(t) {
            this.items = [],
            this.previousWidth = document.documentElement.clientWidth,
            this.previousHeight = window.innerHeight;
            const n = t((()=>this.onWindowResize()), 100);
            window.addEventListener("resize", n)
        }
        onWindowResize() {
            const t = document.documentElement.clientWidth
            , n = window.innerHeight
            , e = this.previousWidth !== t
            , o = this.previousHeight !== n;
            this.items.forEach((t=>{
                const n = ()=>{
                    t.callback(),
                    t.executed = !0
                }
                ;
                (!t.executed || e && t.options.runOnWidthChange || o && t.options.runOnHeightChange) && n()
            }
            )),
            this.previousWidth = t,
            this.previousHeight = n
        }
        runOnResize(t, n) {
            this.items.push({
                callback: t,
                options: n,
                executed: n.runOnLoad
            }),
            this.items.sort(((t,n)=>t.options.priority - n.options.priority)),
            n.runOnLoad && e(t, n.priority)
        }
    }
    function i(n, e, i=t) {
        var r;
        (window.canva_debounceResize = null !== (r = window.canva_debounceResize) && void 0 !== r ? r : new o(i)).runOnResize(n, {
            runOnLoad: !1,
            runOnWidthChange: !0,
            runOnHeightChange: !1,
            priority: Number.MAX_VALUE,
            ...e
        })
    }
    const r = "--minfs"
    , c = "--rzf"
    , a = "--rfso"
    , s = "--bfso";
    function u(t, n, e=.001) {
        return Math.abs(t - n) < e
    }
    function d(t, n) {
        return window.getComputedStyle(t).getPropertyValue(n)
    }
    function l(t, n, e) {
        t.style.setProperty(n, e)
    }
    function m(t, n) {
        const e = document.createElement("div");
        e.style.setProperty(t, n),
        document.body.append(e);
        const o = d(e, t);
        return e.remove(),
        o
    }
    function f() {
        const t = function() {
            const t = parseFloat(m("font-size", "0.1px"));
            return t > 1 ? t : 0
        }()
        , n = function(t) {
            const n = 2 * Math.max(t, 1);
            return n / parseFloat(m("font-size", `${n}px`))
        }(t);
        if (function(t) {
            if (0 === t)
                return;
            l(document.documentElement, r, `${t}px`),
            i((()=>{
                const n = 100 * t
                , {clientWidth: e} = document.documentElement;
                l(document.documentElement, c, n > e ? (e / n).toPrecision(4) : null)
            }
            ), {
                runOnLoad: !0
            })
        }(t * Math.max(1, n)),
        u(n, 1))
            return;
        const e = u(parseFloat(d(document.documentElement, "font-size")), parseFloat(m("grid-template-columns", "1rem")));
        l(document.documentElement, e ? a : s, n.toPrecision(4))
    }
    function h() {
        document.querySelectorAll("img, image, video, svg").forEach((t=>t.addEventListener("contextmenu", (t=>t.preventDefault()))))
    }
    const p = t=>{
        const n = {
            type: "CLICKED_LINK",
            link: t.currentTarget.getAttribute("href")
        };
        navigator.sendBeacon("_api/analytics/events", JSON.stringify(n))
    }
    ;
    function g() {
        [...document.querySelectorAll("a[href][data-interstitial-link]")].forEach((t=>{
            t.addEventListener("click", p)
        }
        ))
    }
    const v = "--sbw"
    , w = "--inner1Vh";
    function y(t, n, e) {
        t.style.setProperty(n, e)
    }
    function E() {
        y(document.documentElement, w, window.innerHeight / 100 + "px"),
        function() {
            const t = window.innerWidth - document.documentElement.clientWidth;
            y(document.documentElement, v, t >= 0 ? `${t}px` : null)
        }()
    }
    var b;
    const O = "undefined" != typeof window ? null === (b = window.navigator) || void 0 === b ? void 0 : b.userAgent : void 0;
    const L = !(!O || (A = O,
    !A.match(/AppleWebKit\//) || A.match(/Chrome\//) || A.match(/Chromium\//)));
    var A;
    function x() {
        document.querySelectorAll("svg").forEach((t=>t.style.background = "url('data:image/png;base64,')"))
    }
    let C;
    function W() {
        C || (C = Array.from(document.querySelectorAll("foreignObject")).filter((t=>0 === t.getBoundingClientRect().width)));
        const t = function() {
            const t = document.createElement("div");
            t.style.fontSize = "100vw",
            document.body.append(t);
            const n = parseFloat(window.getComputedStyle(t).fontSize);
            return t.remove(),
            n / window.innerWidth
        }();
        Array.from(C).forEach((n=>function(t) {
            return new Promise(((n,e)=>{
                const o = t.querySelector("img");
                o && !o.complete ? (o.addEventListener("load", (()=>n())),
                o.addEventListener("error", (()=>e()))) : n()
            }
            ))
        }(n).finally((()=>function(t, n) {
            const e = Array.from(t.children);
            e.forEach(((t,n)=>{
                if (t.hasAttribute("data-foreign-object-container"))
                    t.style.transformOrigin = "",
                    t.style.transform = "";
                else {
                    const o = document.createElement("div");
                    o.setAttribute("data-foreign-object-container", ""),
                    t.insertAdjacentElement("beforebegin", o),
                    t.remove(),
                    o.append(t),
                    e[n] = o
                }
            }
            ));
            const o = t.getScreenCTM();
            if (!o)
                return;
            const {a: i, b: r, c: c, d: a} = o.scale(n);
            e.forEach((t=>{
                if (!t.hasAttribute("data-foreign-object-container"))
                    return;
                const {style: n} = t;
                n.transformOrigin = "0px 0px",
                n.transform = `matrix(${i}, ${r}, ${c}, ${a}, 0, 0)`
            }
            ))
        }(n, t)))))
    }
    [function() {
        e(f)
    }
    , function() {
        i(E, {
            runOnLoad: !0,
            runOnHeightChange: !0,
            priority: 1
        })
    }
    , function() {
        L && i(W, {
            runOnLoad: !0
        })
    }
    , function() {
        L && e(x)
    }
    , function() {
        e(h)
    }
    , function() {
        e(g)
    }
    ].forEach((t=>t()))
}();

const lang = navigator.language ? navigator.language : 'en';
            const loaded = new Promise((resolve)=>{
                if (document.readyState === 'loading') {
                    window.addEventListener('DOMContentLoaded', resolve);
                    return;
                }
                resolve();
            }
            )
            Promise.all([fetch('_footer?lang=' + encodeURIComponent(lang)), loaded]).then(([response])=>{
                if (response.status !== 200) {
                    return;
                }
                response.text().then(footerStr=>{
                    const div = document.createElement('div');
                    div.innerHTML = footerStr;
                    for (const child of [...div.children]) {
                        if (child.tagName.toLowerCase() !== 'script') {
                            document.body.append(child);
                        }
                    }

                    (()=>{
                        !function(e) {
                            "use strict";
                            const t = document.getElementById("modal_backdrop")
                            , n = document.getElementById("modal")
                            , o = document.getElementById("captcha-form")
                            , c = document.getElementById("report_button")
                            , d = document.getElementById("form_report")
                            , s = document.getElementById("form_cancel")
                            , l = document.getElementById("form_submit_reason")
                            , a = document.getElementById("form_go_back")
                            , r = document.getElementById("form_submit_captcha")
                            , m = document.getElementById("form_close")
                            , i = document.getElementById("form_close_initial")
                            , u = document.getElementById("report_reason_0")
                            , p = document.getElementById("error_message")
                            , _ = document.getElementById("error_message_captcha")
                            , y = new Map;
                            y.set(0, document.getElementById("form_step_terms")),
                            y.set(1, document.getElementById("form_step_report_reason")),
                            y.set(4, document.getElementById("form_step_report_other"));
                            const E = document.getElementById("form_step_report_ip");
                            E && y.set(5, E),
                            y.set(2, document.getElementById("form_step_captcha")),
                            y.set(3, document.getElementById("form_step_success"));
                            const f = document.getElementById("report_reason_4")
                            , g = document.getElementById("form_close_ip")
                            , h = document.getElementById("form_go_back_ip")
                            , I = document.getElementById("report_reason_other")
                            , k = document.getElementById("form_close_other")
                            , w = document.getElementById("form_go_back_other");
                            function v() {
                                t.classList.remove("active"),
                                n.classList.remove("active"),
                                c.classList.remove("active"),
                                c.focus()
                            }
                            function B(e) {
                                y.forEach(((t,n)=>{
                                    n === e ? (t.style.display = "block",
                                    L(t)) : t.style.display = "none"
                                }
                                ))
                            }
                            let b, C = !1;
                            const T = "NETEASE" === window.C_CAPTCHA_IMPLEMENTATION ? ()=>b : ()=>{
                                const e = o.elements.namedItem("g-recaptcha-response");
                                return null == e ? void 0 : e.value
                            }
                            ;
                            t.onclick = v,
                            s.onclick = v,
                            m.onclick = v,
                            i.onclick = v,
                            g && (g.onclick = v),
                            k.onclick = v,
                            c.onclick = function() {
                                y.forEach(((e,t)=>{
                                    e.style.display = 0 === t ? "block" : "none"
                                }
                                )),
                                t.classList.add("active"),
                                n.classList.add("active"),
                                c.classList.add("active"),
                                u.checked = !0,
                                setTimeout((()=>{
                                    L(y.get(0))
                                }
                                ), 350)
                            }
                            ,
                            d.onclick = d.dataset.reportUrl ? function() {
                                const {origin: e, pathname: t} = window.location
                                , n = e + t
                                , o = d.dataset.reportUrl + encodeURIComponent(n);
                                window.open(o)
                            }
                            : ()=>B(1),
                            l.onclick = ()=>{
                                null != E && f.checked ? B(5) : I.checked ? B(4) : (B(2),
                                function() {
                                    if (C)
                                        return;
                                    const e = document.createElement("script");
                                    e.src = "NETEASE" === window.C_CAPTCHA_IMPLEMENTATION ? "https://cstaticdun.126.net/load.min.js" : "https://www.google.com/recaptcha/api.js",
                                    e.async = !0,
                                    e.defer = !0,
                                    document.head.appendChild(e),
                                    C = !0,
                                    e.onload = "NETEASE" === window.C_CAPTCHA_IMPLEMENTATION ? ()=>{
                                        var e;
                                        null === (e = window.initNECaptcha) || void 0 === e || e.call(window, {
                                            captchaId: window.C_CAPTCHA_KEY,
                                            element: "#netease-captcha",
                                            protocol: "https",
                                            width: "auto",
                                            onVerify: (e,t)=>{
                                                b = t.validate
                                            }
                                        })
                                    }
                                    : ()=>{}
                                }())
                            }
                            ,
                            a.onclick = ()=>B(1),
                            h && (h.onclick = ()=>B(1)),
                            w.onclick = ()=>B(1),
                            o.addEventListener("submit", (function(e) {
                                e.preventDefault(),
                                p.style.display = "none",
                                _.style.display = "none";
                                const t = function() {
                                    let e = "";
                                    const t = document.getElementsByName("report_reason");
                                    for (let n = 0; n < t.length; n++) {
                                        const o = t[n];
                                        o.checked && (e = o.value)
                                    }
                                    return e
                                }()
                                , n = T();
                                if (!n)
                                    return void (_.style.display = "block");
                                const o = {
                                    reason: t,
                                    challenge: n
                                }
                                , c = window.location.origin + window.location.pathname + "/_api/report";
                                r.classList.add("loading"),
                                fetch(c, {
                                    method: "POST",
                                    body: JSON.stringify(o),
                                    headers: {
                                        "Content-Type": "application/json; charset=utf-8"
                                    }
                                }).then((e=>{
                                    r.classList.remove("loading"),
                                    e.ok ? B(3) : p.style.display = "block"
                                }
                                ))
                            }
                            ));
                            const A = new Map
                            , L = e=>{
                                const t = A.get(e);
                                null != t && document.removeEventListener("keydown", t);
                                const n = e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
                                , o = e
                                , c = n[n.length - 1]
                                , d = function(e) {
                                    ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? document.activeElement === o && (c.focus(),
                                    e.preventDefault()) : document.activeElement === c && (o.focus(),
                                    e.preventDefault()))
                                };
                                A.set(e, d),
                                document.addEventListener("keydown", d),
                                o.focus()
                            }
                            ;
                            e.keepFocus = L,
                            Object.defineProperty(e, "__esModule", {
                                value: !0
                            })
                        }({});
                    }
                    )();
                    window.dispatchEvent(new Event('resize'));
                }
                );
            }
            );