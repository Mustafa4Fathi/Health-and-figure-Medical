!function () {
    "use strict";
    const e = Array.from(document.getElementsByTagName("img"))
        , t = e => {
            const t = e.parentElement;
            t && t.style.removeProperty("animation")
        }
        ;
    e.forEach((e => {
        e.complete ? t(e) : e.addEventListener("load", (() => {
            t(e)
        }
        ))
    }
    ))
}();
