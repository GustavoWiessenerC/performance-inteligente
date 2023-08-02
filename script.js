import { check } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 10,
  duration: '20s'
};

export default function () {
  let res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body contains text match': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
  });
  
}

export function handleSummary(data) {
  return {
    "performance-inteligente.html": htmlReport(data)
  };
}
