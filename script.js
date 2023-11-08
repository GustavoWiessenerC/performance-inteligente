import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { sleep, check } from 'k6';
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      options: {
        browser: {
          type: 'chromium'
        }
      }
    }
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
}

export default async function () {
  const page = browser.newPage();

  try {
    await login(page);
    await navigateToInspectionPage(page);
    await findRandomOperation(page);
    await validateGraphVisibility(page);
    await changeAnalysisPeriod(page);
    await closeGraph(page);
    await updateGraph(page);
    await validateBiomassGraphVisibility(page);
  } finally {
    page.close();
    sleep(3);
  }
  sleep(2);
}

async function login(page) {
  await page.goto('https://backoffice-qa.dev-bra.audsat.io/login');
  const inputEmail = await page.locator('#mat-input-0');
  const inputPassword = await page.locator('#mat-input-1');
  await inputEmail.type('api@brasilseg.com.br');
  await inputPassword.type('b_io01uya');
  const loginButton = await page.locator('.mat-button-wrapper');
  await loginButton.click();
  sleep(2);
  const imgWithSrc = await page.locator('#home__tools-nav > a:nth-child(1) > span');
  await imgWithSrc.click();
  sleep(2);

  check(page.url(), {
    'Check - Carregamento tela após multiplos user': (url) => url === 'https://backoffice-qa.dev-bra.audsat.io/inspecao-remota?crop_type=TEMPORAL_CROP'
  });
}

async function navigateToInspectionPage(page) {
  const fieldStageFilter = await page.locator('#mat-select-value-1 > span');
  await fieldStageFilter.click();
  sleep(1);
  const valueFilterDisponivelSemImagens = await page.locator('#mat-option-0 > span');
  await valueFilterDisponivelSemImagens.click();
  sleep(1);
  const clickBody = await page.locator('body');
  await clickBody.click();
  sleep(2);

  const buttonFindOperations = await page.locator('body > app-root > main > section > app-remotely-inspection > app-list > div.title-header > div > form > div > div:nth-child(3) > div > div > div > button:nth-child(1) > span.mat-button-wrapper');
  await buttonFindOperations.click();
  sleep(2);
}

async function findRandomOperation(page) {
  const lineOperations = await page.$$('.col-11');
  const identifiers = [];

  for (let i = 0; i < lineOperations.length; i++) {
    const identifier = await lineOperations[i].innerText();
    identifiers.push(identifier);
  }

  const identifiersSort = identifiers.sort();
  const primeiroIdentificador = identifiersSort[0];

  const input = await page.locator('.mat-chip-list-wrapper > input');
  await input.type(primeiroIdentificador);

  const buttonFindOperations = await page.locator('body > app-root > main > section > app-remotely-inspection > app-list > div.title-header > div > form > div > div:nth-child(3) > div > div > div > button:nth-child(1) > span.mat-button-wrapper');
  await buttonFindOperations.click();
  sleep(1);

  return primeiroIdentificador;
}

async function validateGraphVisibility(page) {
  sleep(3)
  const col11 = await page.locator('.col-11');
  await col11.click();
  sleep(1);
  const graph = await page.locator('.graph');
  await graph.click();
  sleep(1);
  const chartjs = await page.locator('.chartjs-render-monitor');

  check(chartjs.isVisible(), {
    'Elemento canvas está visível': (v) => v === true,
  });

  sleep(2);
}

async function changeAnalysisPeriod(page) {
  const button = await page.locator('body > app-root > main > section > app-remotely-inspection > app-area-confirmation > app-layout > app-footer-glebes-data > footer > app-mosaics-expansion-panel > div > div.expansion-panel__content.content.timeline.open > div > app-mosaic-timeline > div > div > div.col-5 > div > div > button');
  await button.click();
  sleep(1);
  const successButton = await page.locator('button[class=success]');
  await successButton.click();
}

async function closeGraph(page) {
  sleep(1);
  const graph = await page.locator('.graph');
  await graph.click();
}

async function updateGraph(page) {
  const button = await page.locator('body > app-root > main > section > app-remotely-inspection > app-area-confirmation > app-layout > app-operation-data-analysis > div > div.operation-data-analysis__header > button');
  await button.click();

  const matButton = await page.locator('.operation-data-analysis__content__title__update__button > .mat-button-wrapper');
  await matButton.click();
}

async function validateBiomassGraphVisibility(page) {
  const biomassOperationGraph = await page.locator('.operation-data-analysis__content__biomass-graphic > img');
  sleep(1);
  check(await biomassOperationGraph.isVisible(), {
    'Elemento grapfico biomassa está visível': (v) => v === true,
  });

  sleep(2);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data)
  };
}



