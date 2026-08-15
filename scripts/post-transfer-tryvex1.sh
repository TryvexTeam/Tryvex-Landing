#!/usr/bin/env bash
# Post-transferencia: enlaza el repo al proyecto ya movido a tryvex1,
# verifica credenciales y dominio, y deja veredicto objetivo.
# Correr DESPUES de transferir el proyecto en la UI de Vercel.
set -euo pipefail

SCOPE=tryvex1
PROJECT=tryvex-landing
DOMAIN=www.tryvex.tech

cd "$(dirname "$0")/.."

echo "== 1. Confirmar que el proyecto ya vive en $SCOPE =="
vercel project ls --scope "$SCOPE" | grep -q "$PROJECT" || {
  echo "FALLO: $PROJECT todavia no esta en $SCOPE. Transfiera el proyecto primero."
  exit 1
}

echo "== 2. Enlazar el repo local al proyecto correcto =="
vercel link --yes --scope "$SCOPE" --project "$PROJECT"
grep -q '"orgId"' .vercel/project.json && cat .vercel/project.json

echo "== 3. Verificar las 7 variables de entorno =="
FALTAN=0
for VAR in GOOGLE_CALENDAR_ID GOOGLE_REFRESH_TOKEN GOOGLE_CLIENT_SECRET \
           GOOGLE_CLIENT_ID GOOGLE_MEET_LINK CITAS_INGEST_TOKEN RESEND_API_KEY; do
  if vercel env ls --scope "$SCOPE" | grep -q "\b$VAR\b"; then
    echo "  ok   $VAR"
  else
    echo "  FALTA $VAR"
    FALTAN=$((FALTAN + 1))
  fi
done
[ "$FALTAN" -eq 0 ] || { echo "FALLO: faltan $FALTAN variables. Agreguelas antes de desplegar."; exit 1; }

echo "== 4. Confirmar que el dominio quedo en $SCOPE =="
vercel domains ls --scope "$SCOPE" | grep -q "tryvex.tech" || {
  echo "FALLO: tryvex.tech no esta en $SCOPE. Removerlo del team viejo y agregarlo aqui."
  exit 1
}

echo "== 5. Deploy de produccion =="
vercel deploy --prod --yes --scope "$SCOPE"

echo "== 6. Veredicto objetivo: el dominio debe responder 200 =="
CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN")
echo "  https://$DOMAIN -> $CODE"
[ "$CODE" = "200" ] || { echo "FALLO: el dominio no responde 200."; exit 1; }

echo "== 7. El CNAME debe seguir resolviendo a Vercel =="
nslookup "$DOMAIN" | grep -qi "vercel-dns" || {
  echo "AVISO: el CNAME ya no apunta a vercel-dns. Revise el registrar externo."
  exit 1
}

echo ""
echo "MIGRACION VERIFICADA: proyecto en $SCOPE, 7 variables presentes, dominio 200."
