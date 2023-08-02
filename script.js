import { check } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 10,
  duration: '10s'
};

export default function () {
  let res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body contains text match': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
  });
  
}
