import { check } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    stages: [
        { target: 500, duration: "3m" },
        { target: 200, duration: "2m" },
        { target: 0, duration: "1m" }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], 
        http_req_duration: ['p(95)<2000'], 
    }
}

export default function () {
  let res = http.get('http://test.k6.io/');
  
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body contains text match': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
    'response time is less than 2 seconds': (r) => r.timings.duration < 2000
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data)
  };
}
