//© West7014 studios 2023//

//Ubuntu Google Font Rendering
const head = document.getElementsByTagName("head")[0];
const style = document.createElement("style");
style.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');";
head.appendChild(style);

//W7s Watermark
const poweredBy = document.createElement("div");
poweredBy.innerHTML = "Powered By <a href='https://west7014-studios.w3spaces.com' style='color: white; text-decoration: none; text-decoration: underline dotted blue;'>West7014 studios Connect</a>";
poweredBy.style.position = "fixed";
poweredBy.style.bottom = "0";
poweredBy.style.left = "0";
poweredBy.style.color = "white";
poweredBy.style.backgroundColor = "black";
poweredBy.style.fontFamily = "Ubuntu, sans-serif";
document.body.appendChild(poweredBy);


// Create a script element for the Cloudflare Rocket Loader library
const rocketLoaderScript = document.createElement('script');
rocketLoaderScript.src = 'https://cdnjs.cloudflare.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/rocket-loader.min.js';
rocketLoaderScript.defer = true;

// Create a script element for the Cloudflare Google Analytics library
const gaScript = document.createElement('script');
gaScript.src = 'https://cdnjs.cloudflare.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/apps/ga.min.js';
gaScript.defer = true;

// Append the script elements to the head of the document
document.head.appendChild(rocketLoaderScript);
document.head.appendChild(gaScript);

//IP Blocker V2

// An array of banned IP addresses
const bannedIPs = [
  "192.168.1.1",
  "10.0.0.1",
  "::1", // IPv6 loopback address
  "2600:9000:2358:ec00:b:df74:43c0:93a1:442" // new IPv6 address
];

// A function to check if an IP address is in the banned list
function isBannedIP(ip) {
  // Check if the IP address is an IPv4 address
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
    return bannedIPs.includes(ip);
  }
  
  // Check if the IP address is an IPv6 address
  if (/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip)) {
    return bannedIPs.includes(ip);
  }
  
  // If the IP address is neither IPv4 nor IPv6, do not block it
  return false;
}

// An example of how to use the isBannedIP function to block traffic
function handleRequest(request) {
  const ip = request.headers.get("CF-Connecting-IP"); // Cloudflare specific header
  if (isBannedIP(ip)) {
    return new Response("Access Denied", { status: 403 });
  } else {
    // handle the request normally
    return fetch(request);
  }
}

//Rate Limiter

// An object to keep track of request counts by IP address
const requestCounts = {};

// The maximum number of requests allowed within the time window
const maxRequestsPerTimeWindow = 100;

// The time window in milliseconds
const timeWindowMs = 15000; // 15 Seconds

// A function to check if an IP address has exceeded the rate limit
function hasExceededRateLimit(ip) {
  // Get the current timestamp
  const now = Date.now();
  
  // Remove old entries from the requestCounts object
  Object.keys(requestCounts).forEach((key) => {
    if (now - key > timeWindowMs) {
      delete requestCounts[key];
    }
  });
  
  // Check if the number of requests within the time window has exceeded the limit
  if (requestCounts[ip] && requestCounts[ip] >= maxRequestsPerTimeWindow) {
    return true;
  }
  
  // Increment the request count for the IP address and return false
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;
  return false;
}

// An example of how to use the hasExceededRateLimit function to limit traffic
function handleRequest(request) {
  const ip = request.headers.get("CF-Connecting-IP"); // Cloudflare specific header
  if (hasExceededRateLimit(ip)) {
    return new Response("Too Many Requests", { status: 429 });
  } else {
    // handle the request normally
    return fetch(request);
  }
}


//Analytics
//Powered By Google Analytics

const GA_TRACKING_ID = "G-SCK21SQC4J";

// Function to track pageviews
function trackPageview() {
  if (typeof gtag !== "undefined") {
    gtag('config', GA_TRACKING_ID);
  } else {
    console.warn("Google Analytics has not been loaded.");
  }
}

// Function to load Google Analytics script
function loadAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID);

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_TRACKING_ID;
  script.async = true;
  document.head.appendChild(script);
}

// Call loadAnalytics function to load Google Analytics script
loadAnalytics();

// Track pageviews on initial page load
trackPageview();

// Track pageviews on subsequent page loads (e.g. page changes within a single-page application)
window.addEventListener("hashchange", trackPageview);

//UA Logging

// Get the user's IP address
const ip = request.headers.get("CF-Connecting-IP"); // Cloudflare specific header

// Use the user's IP address as their name
localStorage.setItem("name", ip);

//End Of File//a
