import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, ChevronRight, Code2, Lightbulb, Play, Sparkles, Trophy } from 'lucide-react';
import type { Aula, Catalogo } from '../integracoes/flow-programacao/contratos/tipos';
import catalogoOriginal from '../integracoes/flow-programacao/conteudos/catalogo.json';
import { avisarLoko } from './Loko';
import './programacao.css';

const Laboratorio = lazy(() => import('../integracoes/flow-programacao/aplicativos/web/src/laboratorios/Laboratorio'));
const catalogo = catalogoOriginal as Catalogo;
type Progresso = { respostas: Record<string, number>; concluidas: string[]; ultimaAula?: string; atualizacao?: number; };
const progressoVazio = (): Progresso => ({ respostas: {}, concluidas: [] });
const totalPublicado = catalogo.trilhas.reduce((total, trilha) => total + trilha.modulos.reduce((n, modulo) => n + modulo.aulas.length, 0), 0);

export default function Programacao({ perfil }: { perfil: string }) {
  const chave = 'menteverso-programacao-v1:' + perfil;
  const [progresso, definirProgresso] = useState<Progresso>(() => {
    try { const dado = JSON.parse(localStorage.getItem(chave) || 'null'); return dado && typeof dado === 'object' && Array.isArray(dado.concluidas) && dado.respostas ? dado : progressoVazio(); }
    catch { return progressoVazio(); }
  });
  const [trilhaId, definirTrilhaId] = useState(catalogo.trilhas[0]?.id || '');
  const [aulaId, definirAulaId] = useState<string | null>(() => {
    try { return JSON.parse(localStorage.getItem(chave) || 'null')?.ultimaAula || null; } catch { return null; }
  });
  const [etapa, definirEtapa] = useState<'aprender'|'praticar'|'laboratorio'>('aprender');
  const [laboratorioAprovado, definirLaboratorioAprovado] = useState(false);
  const [premio, definirPremio] = useState(false);
  const [busca, definirBusca] = useState('');
  const [modulosAbertos, definirModulosAbertos] = useState<string[]>([]);
  const [avisos, definirAvisos] = useState('');
  const trilha = catalogo.trilhas.find(item => item.id === trilhaId) || catalogo.trilhas[0];
  const aula = useMemo(() => catalogo.trilhas.flatMap(t => t.modulos.flatMap(m => m.aulas)).find(a => a.id === aulaId), [aulaId]);
  useEffect(() => { try { localStorage.setItem(chave, JSON.stringify(progresso)); } catch { definirAvisos('Seu navegador não permitiu salvar. Verifique o armazenamento.'); } }, [chave, progresso]);
  useEffect(() => { if (!premio) return; const tempo = setTimeout(() => definirPremio(false), 4500); return () => clearTimeout(tempo); }, [premio]);
  const escrever = (mudar: (atual: Progresso) => Progresso) => definirProgresso(atual => ({ ...mudar(atual), atualizacao: Date.now() }));
  const abrirAula = (selecionada: Aula) => {
    definirAulaId(selecionada.id); definirEtapa('aprender'); definirLaboratorioAprovado(false);
    escrever(atual => ({ ...atual, ultimaAula: selecionada.id }));
    avisarLoko('digitando', 'Vamos programar juntos? Cada linha conta!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const responder = (questao: string, escolha: number) => {
    const chaveQuestao = (aula?.id || '') + ':' + questao;
    if (progresso.respostas[chaveQuestao] !== undefined) return;
    escrever(atual => ({ ...atual, respostas: { ...atual.respostas, [chaveQuestao]: escolha } }));
    avisarLoko('pensando', 'Sua resposta foi registrada neste dispositivo. Vamos entender o porquê!');
  };
  const concluir = () => {
    if (!aula || progresso.concluidas.includes(aula.id)) return;
    const respondidas = aula.questoes.every(q => progresso.respostas[aula.id + ':' + q.id] !== undefined);
    if (!respondidas) { definirEtapa('praticar'); definirAvisos('Responda às questões antes de concluir.'); return; }
    if (!laboratorioAprovado) { definirEtapa('laboratorio'); definirAvisos('Execute e aprove as verificações do laboratório antes de concluir.'); return; }
    escrever(atual => ({ ...atual, concluidas: [...atual.concluidas, aula.id] }));
    definirPremio(true); definirAvisos('');
    avisarLoko('comemorando', 'Mais uma competência dominada! Você merece comemorar!', true);
  };
  const completas = progresso.concluidas.length;
  const percentual = totalPublicado ? Math.round(completas / totalPublicado * 100) : 0;
  return <section className="curso-programacao" aria-label="Curso de programação">
    {premio && <div role="status" className="programacao-premio"><Trophy size={32}/><strong>Nova competência!</strong><span>Você concluiu a aula e desbloqueou um novo passo.</span><Sparkles size={22}/></div>}
    <div className="programacao-topo">
      <div><span className="etiqueta">MENTEVERSO · APRENDER FAZENDO</span><h1>Programação <em>guiada.</em></h1><p>Um universo de código, prática e descobertas. O curso original do Flow agora faz parte do MenteVerso.</p></div>
      <div className="programacao-progresso"><strong>{completas}<small>/{totalPublicado}</small></strong><span>AULAS CONCLUÍDAS</span><div className="programacao-barra"><i style={{ width: percentual + '%' }}/></div><small>{percentual}% concluído</small></div>
    </div>
    <div className="programacao-trilhas" aria-label="Trilhas de programação">
      {catalogo.trilhas.map((item, indice) => <button type="button" key={item.id} className={item.id === trilhaId ? 'selecionada' : ''} onClick={() => { definirTrilhaId(item.id); definirAulaId(null); definirBusca(''); }}>
        <span className="programacao-trilha-numero">{String(indice+1).padStart(2,'0')}</span><strong>{item.titulo}</strong><span className="programacao-trilha-contador">{item.modulos.reduce((s,m)=>s+m.aulas.filter(a=>progresso.concluidas.includes(a.id)).length,0)}/{item.modulos.reduce((s,m)=>s+m.aulas.length,0)}</span>
      </button>)}
    </div>
    {avisos && <p role="status" className="programacao-aviso">{avisos}</p>}
    {aula ? <div className="programacao-aula" key={aula.id}>
      <button className="programacao-voltar" onClick={() => definirAulaId(null)}><ArrowLeft size={16}/> Voltar à árvore de estudos</button>
      <span className="etiqueta">AULA · {aula.linguagem.toUpperCase()}</span><h2>{aula.titulo}</h2><p className="programacao-objetivo">{aula.objetivo}</p>
      <div className="programacao-etapas" role="tablist" aria-label="Etapas da aula">
        {([['aprender','Aprender'],['praticar','Fixar'],['laboratorio','Laboratório']] as const).map(([id, titulo]) =>
          <button key={id} role="tab" aria-selected={etapa === id} onClick={() => definirEtapa(id)}>{titulo}</button>)}
      </div>
      {etapa === 'aprender' && <div className="programacao-leitura">
        <div className="programacao-blocos">{aula.blocos.map((bloco, indice) => <p key={indice}>{bloco}</p>)}</div>
        <h3>Exemplos explicados</h3>
        {aula.exemplos.map((exemplo, indice) => <div key={indice} className="programacao-exemplo"><h4>{exemplo.titulo}</h4><pre><code>{exemplo.codigo}</code></pre><ol>{exemplo.explicacao.map((explicacao, i) => <li key={i}>{explicacao}</li>)}</ol></div>)}
        <div className="programacao-resumo"><Lightbulb size={21}/><div><strong>Guarde esta ideia</strong><p>{aula.resumo}</p></div></div>
        <button className="botao-primario" onClick={() => definirEtapa('praticar')}>Praticar o que aprendi <ArrowRight size={17}/></button>
      </div>}
      {etapa === 'praticar' && <div className="programacao-questoes">
        <p>As questões avaliativas permitem uma resposta por dispositivo. Depois de escolher, a alternativa não poderá ser alterada neste perfil local.</p>
        {aula.questoes.map((questao, indice) => {
          const resposta = progresso.respostas[aula.id + ':' + questao.id];
          const respondeu = resposta !== undefined;
          return <fieldset key={questao.id}><legend><span>QUESTÃO {String(indice+1).padStart(2,'0')}</span>{questao.enunciado}</legend>
            {questao.alternativas.map((alternativa, i) => <button type="button" disabled={respondeu} key={i} className={(respondeu && resposta === i ? 'escolhida ' : '') + (respondeu && alternativa.correta ? 'certa' : '')} onClick={() => responder(questao.id, i)}>{alternativa.texto}{respondeu && (alternativa.correta ? <CheckCircle2 size={18}/> : resposta === i ? <span>✕</span> : null)}</button>)}
            {respondeu && <p className="programacao-explicacao">{questao.alternativas[resposta]?.feedback}</p>}
          </fieldset>;
        })}
        <button className="botao-primario" onClick={() => definirEtapa('laboratorio')}>Abrir laboratório <Code2 size={17}/></button>
      </div>}
      {etapa === 'laboratorio' && <div className="programacao-laboratorio">
        <div className="programacao-desafio"><Play size={20}/><div><strong>Seu desafio</strong><p>{aula.desafio}</p></div></div>
        <Suspense fallback={<p role="status">Preparando editor do Flow…</p>}>
          <Laboratorio aula={aula} perfilId={perfil} aoTestar={resultado => { definirLaboratorioAprovado(resultado.aprovado); if (resultado.aprovado) avisarLoko('comemorando','Seu código passou nos testes!',true); }} aoEnviar={() => definirAvisos('Seu código está salvo no dispositivo. A integração com avaliação remota ainda será implementada.')}/>
        </Suspense>
        <button className="botao-primario" onClick={concluir} disabled={progresso.concluidas.includes(aula.id)}>{progresso.concluidas.includes(aula.id) ? 'Aula concluída' : 'Concluir competência'} <Check size={17}/></button>
      </div>}
    </div> : <div className="programacao-arvore">
      <div className="programacao-trilha-cabecalho"><span className="etiqueta">ÁRVORE DE ESTUDOS</span><h2>{trilha.titulo}</h2><p>{trilha.descricao}</p></div>
      <label className="programacao-busca"><span>Buscar aulas</span><input value={busca} onChange={e=>definirBusca(e.target.value)} placeholder="Digite um tema ou conceito…"/></label>
      <div className="programacao-modulos">{trilha.modulos.filter(m => !busca || m.titulo.toLowerCase().includes(busca.toLowerCase()) || m.aulas.some(a => a.titulo.toLowerCase().includes(busca.toLowerCase()))).map((modulo, indice) => {
        const aberto = modulosAbertos.includes(modulo.id) || Boolean(busca) || indice === 0;
        return <div className="programacao-modulo" key={modulo.id}>
          <button className="programacao-modulo-titulo" onClick={() => definirModulosAbertos(atual => atual.includes(modulo.id) ? atual.filter(x=>x!==modulo.id) : [...atual,modulo.id])}>
            <span className="programacao-etapa-numero">{String(indice+1).padStart(2,'0')}</span><span><strong>{modulo.titulo}</strong><small>{modulo.estado === 'publicado' ? modulo.aulas.length+' aula disponível' : 'Em breve'}</small></span><ChevronDown size={18} className={aberto ? 'aberto' : ''}/>
          </button>
          {aberto && <div className="programacao-modulo-aulas">{modulo.aulas.length === 0 ? <p className="programacao-em-breve">Mais experiências chegam em breve.</p> : modulo.aulas.filter(a=>!busca||a.titulo.toLowerCase().includes(busca.toLowerCase())||modulo.titulo.toLowerCase().includes(busca.toLowerCase())).map(a=><button type="button" key={a.id} onClick={()=>abrirAula(a)}><span className="programacao-icone-aula">{progresso.concluidas.includes(a.id) ? <CheckCircle2 size={19}/> : <BookOpen size={19}/>}</span><span><strong>{a.titulo}</strong><small>{a.objetivo}</small></span><ChevronRight size={18}/></button>)}</div>}
        </div>;
      })}</div>
      <div className="programacao-rodape"><Sparkles size={20}/><p>O MenteVerso continua crescendo. Novas aulas e livros: <strong>em breve.</strong></p></div>
    </div>}
    <p className="programacao-privacidade">O progresso de programação desta versão é salvo localmente por perfil neste navegador; a conta ainda não sincroniza respostas com um servidor.</p>
  </section>;
}
