require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./config/database');
const models = require('./models');
const { supabase } = require('./lib/supabase');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

function loadOpenApiSpec() {
  const candidates = [
    path.join(__dirname, 'docs', 'openapi.yaml'),
    path.join(__dirname, 'openapi.yaml'),
  ];
  for (const specPath of candidates) {
    if (!fs.existsSync(specPath)) continue;
    try {
      const doc = yaml.load(fs.readFileSync(specPath, 'utf8'));
      return { doc, specPath };
    } catch (e) {
      console.error(`[Swagger] Erro ao ler ${specPath}:`, e.message);
    }
  }
  console.warn(
    '[Swagger] docs/openapi.yaml em falta no servidor. Garante que a pasta docs/ está commitada e incluída no deploy.'
  );
  return {
    doc: {
      openapi: '3.0.3',
      info: {
        title: 'Ecoplay API',
        version: '1.0.0',
        description:
          'A especificação OpenAPI não foi encontrada neste ambiente. Inclui **docs/openapi.yaml** no repositório e volta a fazer deploy.',
      },
      paths: {},
    },
    specPath: null,
  };
}

const { doc: openapiDocument, specPath: resolvedOpenapiPath } = loadOpenApiSpec();

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument, {
    customSiteTitle: 'Ecoplay API — Swagger',
    explorer: true,
  })
);

app.get('/openapi.yaml', (req, res) => {
  if (!resolvedOpenapiPath) {
    return res.status(404).type('text/plain').send('openapi.yaml não disponível neste deploy.');
  }
  res.type('text/yaml; charset=utf-8');
  res.send(fs.readFileSync(resolvedOpenapiPath, 'utf8'));
});

if (models.sequelize) {
  app.use('/api', require('./routes'));
}

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Ecoplay API',
  });
});

async function checkSupabaseRest() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return 'skipped';
  }
  const res = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });
  if (res.ok || res.status === 404) {
    return 'ok';
  }
  return `http ${res.status}`;
}

app.get('/health', async (req, res) => {
  const checks = {
    supabase: 'skipped',
    postgres: 'skipped',
  };

  try {
    checks.supabase = await checkSupabaseRest();
  } catch (e) {
    checks.supabase = e.message;
  }

  if (sequelize) {
    try {
      await sequelize.authenticate();
      checks.postgres = 'ok';
    } catch (e) {
      checks.postgres = e.message;
    }
  }

  const hasConfig =
    process.env.SUPABASE_URL ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.DATABASE_URL;

  const ok =
    !hasConfig ||
    checks.postgres === 'ok' ||
    checks.supabase === 'ok' ||
    (checks.postgres === 'skipped' && checks.supabase === 'skipped');

  res.status(ok ? 200 : 503).json({
    ok,
    checks,
  });
});

/** Exemplo: use getSupabase() nas rotas quando for consultar via cliente Supabase */
app.get('/api/supabase-ready', (req, res) => {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.status(503).json({
        ok: false,
        message: 'Configure SUPABASE_URL e SUPABASE_ANON_KEY no .env',
      });
    }
    supabase();
    res.json({ ok: true, message: 'Cliente Supabase inicializado' });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs/`);
});
