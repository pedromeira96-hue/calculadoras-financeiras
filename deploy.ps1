<#>
.SYNOPSIS
    Script de deploy local para Vercel (Next.js static export)
.DESCRIPTION
    Executa testes, build e opcionalmente faz push para GitHub (deploy automático Vercel)
.NOTES
    Requer: Node.js 20+, Git, Vercel CLI (opcional)
#>

param(
    [switch]$SkipTests,
    [switch]$PushGit,
    [string]$CommitMessage = "chore: deploy update"
)

$ErrorActionPreference = "Stop"
Write-Host "=== ContaDívida Deploy Script ===" -ForegroundColor Cyan

# 1. Verifica se está na pasta correta
if (-not (Test-Path "package.json")) {
    Write-Error "Execute na raiz do projeto (onde está package.json)"
    exit 1
}

# 2. Instala dependências se necessário
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# 3. Testes
if (-not $SkipTests) {
    Write-Host "Rodando testes (32 unitários)..." -ForegroundColor Yellow
    npm run test
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Testes falharam!"
        exit 1
    }
    Write-Host "✅ 32 testes passaram" -ForegroundColor Green
}

# 3. Build
Write-Host "Buildando (Next.js static export)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build falhou!"
    exit 1
}
Write-Host "✅ Build OK — 27 páginas estáticas em ./out" -ForegroundColor Green

# 4. Verifica se há mudanças para commit
$status = git status --porcelain
if ($status) {
    Write-Host "Há mudanças não commitadas:" -ForegroundColor Yellow
    git status --short
    
    if ($PushGit) {
        Write-Host "Commitando e pushando..." -ForegroundColor Yellow
        git add -A
        git commit -m $CommitMessage
        git push
        Write-Host "✅ Push concluído — Vercel deploy automático iniciado" -ForegroundColor Green
    } else {
        Write-Host "Use -PushGit para commit + push automático" -ForegroundColor Yellow
    }
} else {
    Write-Host "Nenhuma mudança para commit" -ForegroundColor Gray
}

Write-Host "=== Deploy concluído ===" -ForegroundColor Cyan
Write-Host "URL produção: https://calculadoras-financeiras-sooty.vercel.app" -ForegroundColor Cyan
Write-Host "Próximos passos manuais:" -ForegroundColor Yellow
Write-Host "  1. Vercel Dashboard → Settings → Environment Variables → NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_ADSENSE_CLIENT_ID"
Write-Host "  2. Search Console → submit sitemap.xml"
Write-Host "  2. TikTok Business → bio com link + UTMs"