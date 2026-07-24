let input

try {
    input = JSON.parse(require('fs').readFileSync(0, 'utf8'))
} catch (erro) {
    // Payload inválido ou vazio: não bloqueia o encerramento da sessão
    console.error('session-stop: falha ao interpretar stdin, ignorando hook.', erro)
    process.exit(0)
}

if (input.stop_hook_active) process.exit(0)

let temMudancas = false

try {
    temMudancas = require('child_process').execSync('git status --porcelain').toString().trim().length > 0
} catch (erro) {
    // Fora de um repositório git ou git indisponível: não bloqueia
    process.exit(0)
}

if (!temMudancas) process.exit(0)

console.log(JSON.stringify({
    decision: 'block',
    reason: 'Revise o que foi feito e confirme se tudo está correto antes de finalizar.'
}))

process.exit(0)