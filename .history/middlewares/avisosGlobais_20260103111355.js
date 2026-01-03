ReferenceError: C:\portal-cpd\views\home.ejs:59
    57| </nav>

    58| 

 >> 59| <%- include('partials/avisos') %>

    60|     <main>

    61|         <div class="container">

    62|             <div class="card">


C:\portal-cpd\views\partials\avisos.ejs:1
 >> 1| <% if (avisosAtivos && avisosAtivos.length > 0) { %>

    2|   <div class="aviso-global">

    3|     <% avisosAtivos.forEach(aviso => { %>

    4|       <span>⚠️ <%= aviso.mensagem %></span>


avisosAtivos is not defined
    at eval ("C:\\portal-cpd\\views\\partials\\avisos.ejs":10:8)
    at avisos (C:\portal-cpd\node_modules\ejs\lib\ejs.js:703:17)
    at include (C:\portal-cpd\node_modules\ejs\lib\ejs.js:701:39)
    at eval ("C:\\portal-cpd\\views\\home.ejs":39:17)
    at home (C:\portal-cpd\node_modules\ejs\lib\ejs.js:703:17)
    at tryHandleCache (C:\portal-cpd\node_modules\ejs\lib\ejs.js:274:36)
    at exports.renderFile [as engine] (C:\portal-cpd\node_modules\ejs\lib\ejs.js:491:10)
    at View.render (C:\portal-cpd\node_modules\express\lib\view.js:139:8)
    at tryRender (C:\portal-cpd\node_modules\express\lib\application.js:627:10)
    at app.render (C:\portal-cpd\node_modules\express\lib\application.js:574:3)