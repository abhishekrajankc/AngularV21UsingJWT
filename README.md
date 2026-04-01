<h2>Auth System using JWT (Angular 21 + ASP.NET Core)</h2>
<br>
A full-stack authentication system built using <b>Angular (v21)</b> and ASP.NET Core Web API, implementing modern authentication practices with <b>JWT (JSON Web Token)</b>, Angular Signals, and secure API communication.
<br>

<h2>🧠 Project Overview</h2>

This project demonstrates a production-style authentication flow:

<ul>
  <li>User login via API</li>
  <li>JWT token generation and validation</li>
  <li>Secure API access using Authorization headers</li>
  <li>Automatic token expiry handling</li>
  <li>Reactive UI using <b>Angular Signals</b></li>
</ul>

<h2>⚙️ Tech Stack</h2>
<b>Frontend</b>
<ul>
  <li>Angular 21 (Standalone Components) </li>
  <li>TypeScript </li>
  <li>Angular Signals (signal, computed, effect) </li>
  <li>Angular Router </li>
  <li>HTTP Interceptor </li>
</ul>

<b>Backend</b>



<ul>
  <li>
    ASP.NET Core Web API (.NET 8)
  </li>
  <li>
    JWT Authentication (Microsoft.AspNetCore.Authentication.JwtBearer)
  </li>
  <li>
    CORS Configuration
  </li>
  
</ul>
<b>🔐 Authentication Flow</b>
<ul>
  <li>
    User logs in via Angular UI
  </li>
  <li>Backend validates credentials</li>
  <li>JWT token is generated and returned</li>
  <li>Token is stored in localStorage</li>
  <li>HTTP Interceptor attaches token to all API requests</li>
  <li>
    Backend validates token for protected endpoints
  </li>

</ul>
