---
name: cybersecurity
description: "Análisis de seguridad, auditoría de código, vulnerabilidades, smart contracts, dependencias maliciosas y hardening. Basado en Trail of Bits security skills (40+ capacidades). Activar cuando el usuario diga: audita esto, revisa seguridad, busca vulnerabilidades, analiza dependencias, hardening, pentest, CVE, OWASP, revisa el PR de seguridad."
allowed-tools: Read, Grep, Glob, Bash
---

# Cybersecurity — Trail of Bits Framework

> Fuente: github.com/trailofbits/skills — 40+ capacidades de seguridad
> Adaptado para proyectos Next.js / TypeScript / Tryvex Landing

---

## Índice de Capacidades

| Área | Cuándo usar |
|------|-------------|
| [Auditoría Estática](#1-auditoría-estática) | Revisar código por vulnerabilidades |
| [Supply Chain](#2-supply-chain--dependencias) | Analizar paquetes y CVEs |
| [OWASP Top 10](#3-owasp-top-10--checklist-nextjs) | Checklist de seguridad web |
| [Differential Review](#4-differential-review-prs) | Revisar PRs por superficie de ataque |
| [GitHub Actions Audit](#5-github-actions-audit) | Workflows CI/CD seguros |
| [Semgrep SAST](#6-semgrep--reglas-sast) | Reglas personalizadas de detección |
| [Protocolo de Respuesta](#protocolo-de-respuesta) | Cómo reportar hallazgos |

---

## 1. Auditoría Estática

Revisar código por patrones peligrosos:

```bash
# Secrets hardcodeados
grep -rn "sk-\|pk_live\|PRIVATE_KEY\|password\s*=\|api_key\s*=" src/

# XSS vectors
grep -rn "dangerouslySetInnerHTML\|innerHTML\|eval(" src/

# Open redirects
grep -rn "redirect(\|router.push(" src/
```

**Checklist Next.js App Router:**
- [ ] `headers()` de Next.js configurados con CSP, HSTS, X-Frame-Options
- [ ] Inputs del usuario validados con Zod antes de procesar
- [ ] Server Actions con validación de origen
- [ ] Variables de entorno: solo `NEXT_PUBLIC_` para el cliente

---

## 2. Supply Chain — Dependencias

```bash
npm audit --json          # CVEs conocidos
npx audit-ci --moderate   # Falla si hay vulnerabilidades medias+
```

**Señales de alerta en package.json:**
- Paquetes con nombres similares a populares (typosquatting)
- Scripts `postinstall` en dependencias desconocidas
- Versiones fijadas con `^` o `~` en deps críticas de seguridad

---

## 3. OWASP Top 10 — Checklist Next.js

- [ ] **A01 Broken Access Control** — ¿Rutas protegidas con middleware?
- [ ] **A02 Cryptographic Failures** — ¿Datos sensibles sin cifrar en tránsito o reposo?
- [ ] **A03 Injection** — ¿Todo input sanitizado? ¿Queries parametrizadas?
- [ ] **A04 Insecure Design** — ¿Lógica de negocio expuesta en el cliente?
- [ ] **A05 Security Misconfiguration** — ¿Headers de seguridad activos?
- [ ] **A06 Vulnerable Components** — ¿`npm audit` sin HIGH/CRITICAL?
- [ ] **A07 Auth Failures** — ¿Sesiones con expiración y rotación de tokens?
- [ ] **A09 Logging Failures** — ¿Logs sin datos sensibles (passwords, tokens)?

---

## 4. Differential Review (PRs)

Al revisar un PR con cambios de seguridad:
1. ¿Qué nueva superficie de ataque introduce?
2. ¿Qué datos del usuario toca (lectura/escritura)?
3. ¿Qué validaciones se agregaron o quitaron?
4. ¿Hay cambios en autenticación o autorización?
5. ¿Se exponen nuevos endpoints públicos?

---

## 5. GitHub Actions Audit

Revisar `.github/workflows/`:
- ¿Se usa `pull_request_target` con código externo no confiable?
- ¿`GITHUB_TOKEN` tiene permisos mínimos necesarios?
- ¿Actions de terceros fijadas a SHA completo, no a tag?
- ¿Secrets expuestos en logs con `echo` o `print`?

---

## 6. Semgrep — Reglas SAST

```yaml
rules:
  - id: no-hardcoded-secrets
    pattern: |
      const $KEY = "sk-..."
    message: "Secret hardcodeado detectado — usar variables de entorno"
    severity: ERROR
    languages: [typescript, javascript]

  - id: no-dangerous-html
    pattern: dangerouslySetInnerHTML={{ __html: $X }}
    message: "XSS potencial — sanitizar $X antes de usar"
    severity: WARNING
    languages: [tsx, jsx]
```

---

## Protocolo de Respuesta

```
SEVERIDAD: [CRÍTICA | ALTA | MEDIA | BAJA]
ARCHIVO: ruta/al/archivo.ts:42
PROBLEMA: descripción clara del riesgo
IMPACTO: qué puede ocurrir si se explota
FIX: código o acción correctiva concreta
```

**CRÍTICA/ALTA** → Detener toda otra tarea. Reportar al señor Ignacio antes de continuar.
**MEDIA/BAJA** → Incluir al final del trabajo con fix adjunto.

---

## Capacidades Adicionales (Trail of Bits)

| Capacidad | Descripción |
|-----------|-------------|
| Smart Contract Audit | Análisis de contratos Solidity por reentrancy, overflow, access control |
| YARA Rules | Crear reglas de detección de malware en archivos del repo |
| Mutation Testing | Verificar que los tests realmente detectan bugs |
| Property-Based Testing | Generar casos extremos automáticamente |
| DWARF Analysis | Analizar binarios y símbolos de debug |
| Constant-Time Analysis | Verificar código criptográfico sin timing attacks |
