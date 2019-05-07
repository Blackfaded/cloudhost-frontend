const replace = require('replace-in-file');

const optionsDev = {
  files: 'docker-compose.dev.yml',
  from: /cloudhost\/frontend_development:(\d+.\d+.\d+)/g,
  to: `cloudhost/frontend_development:${process.env.NPM_PACKAGE_VERSION}`
};

const optionsStaging = {
  files: 'docker-compose.staging.yml',
  from: /cloudhost\/frontend_staging:(\d+.\d+.\d+)/g,
  to: `cloudhost/frontend_staging:${process.env.NPM_PACKAGE_VERSION}`
};

const optionsProd = {
  files: 'docker-compose.prod.yml',
  from: /cloudhost\/frontend_production:(\d+.\d+.\d+)/g,
  to: `cloudhost/frontend_production:${process.env.NPM_PACKAGE_VERSION}`
};

replace(optionsDev)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });

replace(optionsStaging)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });

replace(optionsProd)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
