import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as EventoPonteiro } from 'react';
import { MessageCircle, MessageCircleOff, Minus, Plus, Sparkles } from 'lucide-react';
import './loko.css';

type EstadoLoko =
  | 'calmo'
  | 'curioso'
  | 'feliz'
  | 'pensando'
  | 'lendo'
  | 'digitando'
  | 'sono'
  | 'triste'
  | 'surpreso'
  | 'segurado'
  | 'comemorando';

type EventoLoko = {
  estado?: EstadoLoko;
  mensagem?: string;
  destaque?: boolean;
};

type PropriedadesLoko = {
  modo?: 'hero' | 'secao' | 'flutuante';
  pagina?: string;
  progresso?: number;
};

const frases = [
  'Uma ideia pode virar um universo.',
  'Às vezes o melhor começo é uma boa pergunta.',
  'Miau. Quer explorar mais uma trilha?',
  'Eu gosto de acompanhar suas descobertas.',
  'Não se preocupe com a pressa. Descobrir é o caminho.',
  'Meu sininho toca quando encontro uma ideia boa!'
];

export function avisarLoko(estado: EstadoLoko, mensagem?: string, destaque = false) {
  window.dispatchEvent(new CustomEvent<EventoLoko>('menteverso:loko', {
    detail: { estado, mensagem, destaque }
  }));
}

/**
 * Loko: personagem 2D desenhado por vetores, inspirado no gato da foto enviada.
 * O desenho não usa imagens externas nem mecanismos de geração.
 */
export default function Loko({
  modo = 'hero',
  pagina = 'inicio',
  progresso = 0
}: PropriedadesLoko) {
  const flutuante = modo === 'flutuante';
  const elemento = useRef<HTMLDivElement | null>(null);
  const botao = useRef<HTMLButtonElement | null>(null);
  const arrasto = useRef<{
    id: number;
    inicioX: number;
    inicioY: number;
    origemX: number;
    origemY: number;
    moveu: boolean;
  } | null>(null);
  const posicaoAtual = useRef({ x: 0, y: 0 });
  const ultimoAviso = useRef(0);
  const intervaloMensagem = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervaloEstado = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [posicao, definirPosicao] = useState({ x: 0, y: 0 });
  const [estado, definirEstado] = useState<EstadoLoko>('calmo');
  const [fala, definirFala] = useState(
    modo === 'hero' ? 'Sou o Loko! Pode me pegar e arrastar. 🐾' : ''
  );
  const [falaVisivel, definirFalaVisivel] = useState(modo === 'hero');
  const [segurando, definirSegurando] = useState(false);
  const [recolhido, definirRecolhido] = useState(false);
  const [falasAtivas, definirFalasAtivas] = useState(
    () => localStorage.getItem('menteverso-loko-falas') !== 'ocultas'
  );
  const [estrelas, definirEstrelas] = useState(false);
  const [inatividade, definirInatividade] = useState(false);

  const falar = (mensagem: string, proximoEstado: EstadoLoko = 'curioso', destaque = false) => {
    definirEstado(proximoEstado);
    if (falasAtivas && mensagem) {
      definirFala(mensagem);
      definirFalaVisivel(true);
      if (intervaloMensagem.current) clearTimeout(intervaloMensagem.current);
      intervaloMensagem.current = setTimeout(() => definirFalaVisivel(false), 6800);
    }
    if (destaque) {
      definirEstrelas(true);
      setTimeout(() => definirEstrelas(false), 1700);
    }
    if (intervaloEstado.current) clearTimeout(intervaloEstado.current);
    intervaloEstado.current = setTimeout(() => definirEstado('calmo'), 3500);
  };

  useEffect(() => {
    const elementoAtual = elemento.current;
    if (!elementoAtual) return;
    const moverOlhar = (evento: PointerEvent) => {
      if (arrasto.current) return;
      const limites = elementoAtual.getBoundingClientRect();
      const centroX = limites.left + limites.width / 2;
      const centroY = limites.top + limites.height / 2;
      const deltaX = Math.max(-1, Math.min(1, (evento.clientX - centroX) / 170));
      const deltaY = Math.max(-1, Math.min(1, (evento.clientY - centroY) / 170));
      elementoAtual.style.setProperty('--loko-olhar-x', (deltaX * 4.7).toFixed(1) + 'px');
      elementoAtual.style.setProperty('--loko-olhar-y', (deltaY * 3.1).toFixed(1) + 'px');
      elementoAtual.style.setProperty('--loko-cabeca', (deltaX * 4).toFixed(1) + 'deg');
      ultimoAviso.current = Date.now();
      if (inatividade) {
        definirInatividade(false);
        definirEstado('calmo');
      }
    };
    const reagir = (evento: Event) => {
      if (!flutuante) {
        const caixa = elementoAtual.getBoundingClientRect();
        if (caixa.bottom < 0 || caixa.top > window.innerHeight) return;
      }
      ultimoAviso.current = Date.now();
      definirInatividade(false);
      const dados = (evento as CustomEvent<EventoLoko>).detail;
      if (dados) falar(dados.mensagem || '', dados.estado || 'curioso', dados.destaque);
    };
    const noClick = (evento: MouseEvent) => {
      const alvo = evento.target as HTMLElement | null;
      if (!alvo || alvo.closest('.loko-area')) return;
      ultimoAviso.current = Date.now();
      if (!flutuante) {
        const caixa = elementoAtual.getBoundingClientRect();
        if (caixa.bottom < 0 || caixa.top > window.innerHeight) return;
      }
      const link = alvo.closest('a[href], button');
      if (!link) return;
      const agora = Date.now();
      if (agora - ultimoAviso.current < 14000) return;
      ultimoAviso.current = agora;
      if (link.matches('a[href]') && !link.closest('.noticia')) return;
      if (link.closest('.noticia')) {
        falar('Interessante! Vamos conferir a fonte dessa notícia.', 'curioso');
      } else if (link.matches('.botao-icone')) {
        falar('As cores mudam, mas eu continuo cinza!', 'feliz');
      }
    };
    let ultimoScroll = 0;
    const aoRolar = () => {
      ultimoAviso.current = Date.now();
      if (Date.now() - ultimoScroll > 2200) {
        elementoAtual.classList.remove('loko-rolando');
        void elementoAtual.offsetWidth;
        elementoAtual.classList.add('loko-rolando');
        ultimoScroll = Date.now();
      }
    };
    window.addEventListener('pointermove', moverOlhar, { passive: true });
    window.addEventListener('menteverso:loko', reagir);
    window.addEventListener('click', noClick);
    window.addEventListener('scroll', aoRolar, { passive: true });
    const adormecer = window.setInterval(() => {
      if (!arrasto.current && Date.now() - ultimoAviso.current > 60000) {
        definirInatividade(true);
        definirEstado('sono');
      }
    }, 30000);
    ultimoAviso.current = Date.now();
    return () => {
      window.removeEventListener('pointermove', moverOlhar);
      window.removeEventListener('menteverso:loko', reagir);
      window.removeEventListener('click', noClick);
      window.removeEventListener('scroll', aoRolar);
      window.clearInterval(adormecer);
      if (intervaloMensagem.current) clearTimeout(intervaloMensagem.current);
      if (intervaloEstado.current) clearTimeout(intervaloEstado.current);
    };
  // A instância só instala os ouvintes uma vez; renderizações usam os atributos atuais.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modo, falasAtivas]);

  useEffect(() => {
    if (modo === 'hero' && falasAtivas) {
      const temporizador = setTimeout(() => definirFalaVisivel(false), 9000);
      return () => clearTimeout(temporizador);
    }
  }, [modo, falasAtivas]);

  useEffect(() => {
    if (!flutuante) return;
    const mensagens: Record<string, string> = {
      painel: 'Olha só, quantas trilhas podemos explorar!',
      trilhas: 'Escolha um capítulo. Eu vou junto!',
      leitura: 'Hora da leitura. Vou prestar atenção também.',
      quiz: 'Vamos pensar antes de responder?',
      cartoes: 'Memória fica mais forte com revisão!',
      conexoes: 'As ideias se conectam como estrelas.'
    };
    if (pagina in mensagens) {
      const temporizador = setTimeout(() => falar(mensagens[pagina], pagina === 'leitura' ? 'lendo' : 'curioso'), 350);
      return () => clearTimeout(temporizador);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, modo]);

  const aoPegar = (evento: EventoPonteiro<HTMLButtonElement>) => {
    if (recolhido || evento.button !== 0) return;
    evento.preventDefault();
    arrasto.current = {
      id: evento.pointerId, inicioX: evento.clientX, inicioY: evento.clientY,
      origemX: posicaoAtual.current.x, origemY: posicaoAtual.current.y, moveu: false
    };
    evento.currentTarget.setPointerCapture(evento.pointerId);
    definirSegurando(true);
    definirEstado('segurado');
    definirFalaVisivel(false);
    ultimoAviso.current = Date.now();
  };

  const aoMover = (evento: EventoPonteiro<HTMLButtonElement>) => {
    const dados = arrasto.current;
    if (!dados || dados.id !== evento.pointerId) return;
    const deslocamentoX = evento.clientX - dados.inicioX;
    const deslocamentoY = evento.clientY - dados.inicioY;
    if (Math.abs(deslocamentoX) + Math.abs(deslocamentoY) > 8) dados.moveu = true;
    const proximo = {
      x: Math.max(-Math.min(window.innerWidth * .55, 300), Math.min(window.innerWidth * .55, 300, dados.origemX + deslocamentoX)),
      y: Math.max(-Math.min(window.innerHeight * .5, 340), Math.min(window.innerHeight * .5, 340, dados.origemY + deslocamentoY))
    };
    posicaoAtual.current = proximo;
    definirPosicao(proximo);
  };

  const aoSoltar = (evento: EventoPonteiro<HTMLButtonElement>) => {
    const dados = arrasto.current;
    if (!dados || dados.id !== evento.pointerId) return;
    arrasto.current = null;
    definirSegurando(false);
    try {
      if (evento.currentTarget.hasPointerCapture(evento.pointerId)) {
        evento.currentTarget.releasePointerCapture(evento.pointerId);
      }
    } catch { /* navegador encerrou a captura */ }
    if (dados.moveu) {
      falar('Miau! Que passeio! Pode me pegar de novo.', 'surpreso');
    } else {
      const frase = frases[Math.floor(Math.random() * frases.length)];
      falar(frase, 'feliz', true);
    }
  };

  const interagirTeclado = () => {
    if (arrasto.current) return;
    falar(frases[Math.floor(Math.random() * frases.length)], 'feliz', true);
  };
  const alternarFalas = () => {
    const novoEstado = !falasAtivas;
    definirFalasAtivas(novoEstado);
    localStorage.setItem('menteverso-loko-falas', novoEstado ? 'visiveis' : 'ocultas');
    definirFalaVisivel(false);
  };

  const estilos = {
    '--loko-arrasto-x': posicao.x + 'px',
    '--loko-arrasto-y': posicao.y + 'px'
  } as CSSProperties;
  return (
    <div
      className={[
        'loko-area', 'loko-' + modo, 'loko-estado-' + estado,
        segurando ? 'loko-segurado' : '', recolhido ? 'loko-recolhido' : '',
        inatividade ? 'loko-inativo' : ''
      ].filter(Boolean).join(' ')}
      style={estilos}
      ref={elemento}
    >
      {flutuante && (
        <div className="loko-controles" aria-label="Controles do Loko">
          <button title={falasAtivas ? 'Ocultar falas do Loko' : 'Mostrar falas do Loko'} aria-label={falasAtivas ? 'Ocultar falas do Loko' : 'Mostrar falas do Loko'} onClick={alternarFalas}>
            {falasAtivas ? <MessageCircle size={14}/> : <MessageCircleOff size={14}/>}
          </button>
          <button title={recolhido ? 'Expandir Loko' : 'Recolher Loko'} aria-label={recolhido ? 'Expandir Loko' : 'Recolher Loko'} onClick={() => definirRecolhido(!recolhido)}>
            {recolhido ? <Plus size={14}/> : <Minus size={14}/>}
          </button>
        </div>
      )}
      {falaVisivel && !recolhido && falasAtivas && fala && (
        <div className="loko-balao" role="status" aria-live="polite">
          <span className="loko-balao-nome">LOKO <span>✳</span></span>
          <button className="loko-fechar-fala" title="Fechar mensagem do Loko" aria-label="Fechar mensagem do Loko" onClick={() => definirFalaVisivel(false)}>×</button>
          <span className="loko-balao-texto">{fala}</span>
        </div>
      )}
      <button
        className="loko-corpo-botao"
        ref={botao}
        type="button"
        title="Loko: toque ou segure para arrastar"
        aria-label="Loko, mascote interativo. Toque para conversar; segure e arraste para movê-lo."
        onPointerDown={aoPegar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onClick={evento => {
          if (evento.detail === 0) interagirTeclado();
        }}
      >
        <svg className="loko-desenho" viewBox="0 0 210 245" role="img" aria-label="Loko, gato cinza de olhos âmbar e sininho azul">
          <defs>
            <linearGradient id={'loko-pelo-' + modo} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#aba9a5"/>
              <stop offset=".55" stopColor="#797b79"/>
              <stop offset="1" stopColor="#555a5b"/>
            </linearGradient>
            <linearGradient id={'loko-rosto-' + modo} x1=".25" x2=".85" y1="0" y2="1">
              <stop offset="0" stopColor="#adaaa4"/>
              <stop offset=".65" stopColor="#8e8e89"/>
              <stop offset="1" stopColor="#656968"/>
            </linearGradient>
            <radialGradient id={'loko-olhos-' + modo}>
              <stop offset="0" stopColor="#fff2a4"/>
              <stop offset=".65" stopColor="#eac15e"/>
              <stop offset="1" stopColor="#a77835"/>
            </radialGradient>
          </defs>
          <g className="loko-rabinho">
            <path d="M153 186C208 215 209 119 182 129C166 136 199 166 177 177" stroke="#4e5354" strokeWidth="17" fill="none" strokeLinecap="round"/>
            <path d="M155 184C206 209 205 128 184 136" stroke="#868784" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".75"/>
          </g>
          <g className="loko-corpo">
            <path d="M65 142C37 144 38 195 52 224C65 238 148 236 158 217C178 175 154 143 130 139Z"
              fill={'url(#loko-pelo-' + modo + ')'} stroke="#4b4d4e" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M88 153C80 173 86 205 98 221C118 229 132 206 121 167"
              fill="#aaa7a2" opacity=".65"/>
            <path d="M65 180Q40 191 57 230" fill="none" stroke="#666969" strokeWidth="20" strokeLinecap="round" className="loko-patinha-esquerda"/>
            <path d="M143 180Q160 198 142 229" fill="none" stroke="#666969" strokeWidth="20" strokeLinecap="round" className="loko-patinha-direita"/>
            <ellipse cx="65" cy="226" rx="20" ry="12" fill="#93938e" stroke="#5b5c5c" strokeWidth="2" className="loko-pe-esquerdo"/>
            <ellipse cx="143" cy="226" rx="20" ry="12" fill="#93938e" stroke="#5b5c5c" strokeWidth="2" className="loko-pe-direito"/>
            <path d="M61 226v7m9-6v6m66-7v6m10-6v6" stroke="#707372" strokeWidth="1.6" opacity=".8"/>
          </g>
          <g className="loko-cabeca">
            <path d="M48 70L31 11Q28 0 40 5L83 38Q108 32 126 37L167 5Q183 -2 179 16L166 84Z"
              fill={'url(#loko-pelo-' + modo + ')'} stroke="#555856" strokeWidth="4" strokeLinejoin="round" className="loko-orelhas"/>
            <path d="M45 27L59 61 74 43Z M166 28L150 61 134 43Z" fill="#b1857b" opacity=".78"/>
            <path d="M105 34C51 32 29 66 37 111C42 145 67 161 104 166C144 162 170 143 174 111C179 65 151 33 105 34Z"
              fill={'url(#loko-rosto-' + modo + ')'} stroke="#515453" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M104 49V98" stroke="#cac3b8" strokeWidth="2" opacity=".3"/>
            <path d="M49 76Q73 61 95 76M116 76Q142 61 161 77" stroke="#545958" strokeWidth="4" fill="none" opacity=".75"/>
            <g className="loko-olhos">
              <ellipse cx="74" cy="94" rx="23" ry="19" fill="#4b4d46"/>
              <ellipse cx="138" cy="94" rx="23" ry="19" fill="#4b4d46"/>
              <ellipse cx="74" cy="93" rx="20" ry="16" fill={'url(#loko-olhos-' + modo + ')'}/>
              <ellipse cx="138" cy="93" rx="20" ry="16" fill={'url(#loko-olhos-' + modo + ')'}/>
              <g className="loko-pupilas">
                <ellipse cx="74" cy="94" rx="4.5" ry="13" fill="#242422"/>
                <ellipse cx="138" cy="94" rx="4.5" ry="13" fill="#242422"/>
                <circle cx="68" cy="87" r="3.8" fill="#fff3d5" opacity=".85"/>
                <circle cx="132" cy="87" r="3.8" fill="#fff3d5" opacity=".85"/>
              </g>
              <path className="loko-palpebras" d="M51 93Q74 70 97 93M115 93Q138 70 161 93" fill="none" stroke="#747571" strokeWidth="0"/>
            </g>
            <path d="M103 101L90 128Q104 137 116 128Z" fill="#8a8985" opacity=".35"/>
            <path d="M99 124Q105 121 112 124L107 133Q105 135 103 133Z" fill="#4b4544"/>
            <path className="loko-boca" d="M105 134Q101 141 93 138M105 134Q113 141 120 138" stroke="#55504c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <g stroke="#e2d7c6" strokeWidth="1.5" strokeLinecap="round" opacity=".78" className="loko-bigodes">
              <path d="M86 128L32 117M87 134L28 137M88 141L39 155M124 128L175 116M124 135L181 137M125 141L175 154"/>
            </g>
            <path d="M58 150Q104 174 153 148" stroke="#3d3333" strokeWidth="12" fill="none" strokeLinecap="round"/>
            <path d="M58 150Q104 175 153 148" stroke="#c6a56d" strokeWidth="3" fill="none" strokeDasharray="8 6" opacity=".8"/>
            <g className="loko-sino">
              <ellipse cx="104" cy="164" rx="13" ry="12" fill="#4e9ec2" stroke="#294e66" strokeWidth="3"/>
              <path d="M99 156q7-5 12 2" fill="none" stroke="#b6edf5" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="104" cy="169" r="2.6" fill="#23465d"/>
            </g>
          </g>
          <g className="loko-simbolo">
            {estado === 'pensando' || estado === 'lendo' || estado === 'digitando' ? (
              <><circle cx="172" cy="30" r="6" fill="#e8b88e"/><circle cx="186" cy="15" r="10" fill="#e8b88e" opacity=".7"/></>
            ) : null}
            {estado === 'sono' ? (
              <text x="163" y="32" fill="#bfaed8" fontSize="26" fontFamily="serif">zZ</text>
            ) : null}
            {estado === 'comemorando' || estado === 'feliz' ? (
              <text x="166" y="30" fill="#f1c991" fontSize="25">✦</text>
            ) : null}
          </g>
        </svg>
        {estrelas && <span className="loko-estrelas" aria-hidden="true">✦ · ✳ · ✦</span>}
      </button>
      {!flutuante && <div className="loko-arraste" aria-hidden="true">SEGURE PARA MOVER <span>↕</span></div>}
      {flutuante && recolhido && <span className="loko-recolhido-label">Loko</span>}
      {flutuante && progresso === 100 && <span className="loko-medalha" title="Você concluiu todos os capítulos"><Sparkles size={15}/></span>}
    </div>
  );
}
