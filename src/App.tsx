import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  ExternalLink,
  Eye,
  Headphones,
  Heart,
  Library,
  Lightbulb,
  Menu,
  Moon,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const URL_LIVRO =
  'https://educapes.capes.gov.br/bitstream/capes/704805/2/Leituras%20Psicanal%C3%ADticas%20sobre%20os%20Desafios%20da%20Atualidade.pdf';
type Capitulo = { numero: number; titulo: string; pagina: number };
type Trilha = {
  id: number;
  nome: string;
  subtitulo: string;
  sinal: string;
  cor: string;
  sobre: string;
  capitulos: Capitulo[];
};
const montar = (inicio: number, dados: Array<[string, number]>) =>
  dados.map(([titulo, pagina], indice) => ({
    numero: inicio + indice,
    titulo,
    pagina,
  }));
const trilhas: Trilha[] = [
  {
    id: 1,
    nome: 'Luto & angústia',
    subtitulo: 'Os afetos do nosso tempo',
    sinal: '◌',
    cor: '#D78A66',
    sobre:
      'Luto, desamparo, pandemia e a criação de novas possibilidades de existir.',
    capitulos: montar(1, [
      ['Sobre aquilo que em mim, eu mesmo desconheço', 11],
      ['Notas sobre o luto em Freud e Lacan', 26],
      ['O olhar da psicanálise para a ansiedade e o pânico', 38],
      ['A clínica psicanalítica com crianças em tempos de pandemia', 52],
      ['Se essa rua fosse minha: do lugar de objeto à trilha do desejo', 67],
      ['Luto: assunto de família ou de domínio público?', 81],
      ['Impactos da gestão neoliberal na pandemia', 96],
    ]),
  },
  {
    id: 2,
    nome: 'Desejo & sociedade',
    subtitulo: 'Capitalismo, racismo e clínica',
    sinal: '✳',
    cor: '#C1AD88',
    sobre:
      'Consumo, desejo, racismo, resistência e os discursos do mundo contemporâneo.',
    capitulos: montar(8, [
      ['A arte de um bom vendedor está em vender... a felicidade', 112],
      ['Consumo e mídias digitais no mundo contemporâneo', 123],
      ['Futuro de mercados comuns: eficácia e docilidade', 138],
      ['Discurso do capitalista, segregação e racismo', 149],
      ['A segregação e seu furo: o discurso do analista', 164],
      ['O racismo e a recusa da transferência', 175],
    ]),
  },
  {
    id: 3,
    nome: 'Política & redes',
    subtitulo: 'Discursos e plataformas',
    sinal: '⌁',
    cor: '#A7A1C0',
    sobre:
      'Tecnopopulismo, pós-verdade, desinformação e vínculos sociais digitais.',
    capitulos: montar(14, [
      ['Sobre o tecnopopulismo e a servidão apaixonada', 191],
      ['Uma leitura psicanalítica sobre pós-verdade', 201],
    ]),
  },
  {
    id: 4,
    nome: 'Amor & identidade',
    subtitulo: 'Gênero, sexualidade e sexuação',
    sinal: '♡',
    cor: '#D69CA3',
    sobre:
      'Debates sobre amor, gozo, gênero e a diversidade dos modos de existir.',
    capitulos: montar(16, [
      ['A sexualidade e suas manifestações clínicas: gozo e amor', 217],
      ['Adolescência, intersexo e sexuação', 233],
      ['Masculinidade e feminilidade como modos de gozo', 244],
      ['A individualização do rito na era do Outro que não existe', 261],
      ['Ensaio sobre psicanálise e feminismo', 270],
    ]),
  },
  {
    id: 5,
    nome: 'Corpo & cultura',
    subtitulo: 'A clínica dos transtornos alimentares',
    sinal: '◈',
    cor: '#9DBEAE',
    sobre:
      'O corpo, os sintomas alimentares, as exigências culturais e a subjetividade.',
    capitulos: montar(21, [
      ['Maus hábitos: sintomas alimentares no corpo em cena', 286],
      ['Notas sobre a clínica psicanalítica da obesidade', 296],
    ]),
  },
];
const capitulos = trilhas.flatMap(trilha => trilha.capitulos);
const noticias = [
  {
    categoria: 'NEUROCIÊNCIA',
    data: '21 OUT 2026',
    fonte: 'Nature',
    titulo: 'O desenvolvimento cerebral e a saúde mental na adolescência',
    descricao:
      'Pesquisadores analisam padrões de maturação do cérebro relacionados a sintomas futuros; ainda não é uma ferramenta clínica.',
    url: 'https://www.nature.com/articles/d41586-026-03357-9',
    sinal: '◌',
  },
  {
    categoria: 'COMPORTAMENTO',
    data: '05 OUT 2026',
    fonte: 'University of Exeter',
    titulo: 'Nas redes sociais, como usamos importa tanto quanto o tempo',
    descricao:
      'Estudo investiga como o envolvimento emocional e cognitivo com redes se relaciona à saúde mental.',
    url: 'https://news.exeter.ac.uk/faculty-of-humanities-arts-and-social-sciences/focus-on-social-media-engagement-not-just-screen-time-essential-to-help-protect-mental-health/',
    sinal: '✳',
  },
  {
    categoria: 'SAÚDE PÚBLICA',
    data: '09 OUT 2026',
    fonte: 'OMS',
    titulo: 'OMS propõe cuidados de saúde mental mais próximos da comunidade',
    descricao:
      'Diretriz global busca apoiar serviços que respeitam escolhas, direitos e autonomia.',
    url: 'https://www.who.int/singapore/news/detail-global/09-10-2026-who-urges-shift-from-institutional-to-community-based-mental-health-care',
    sinal: '♡',
  },
];
const questoes = [
  {
    pergunta: 'Qual é o eixo da primeira parte da coletânea?',
    opcoes: ['Luto e angústia', 'Anatomia', 'Astronomia', 'Física'],
    correta: 0,
    explicacao:
      'A primeira parte reúne sete capítulos sobre pandemia, luto e angústia.',
  },
  {
    pergunta: 'Quem aparece ao lado de Freud em um capítulo sobre o luto?',
    opcoes: ['Jung', 'Lacan', 'Skinner', 'Piaget'],
    correta: 1,
    explicacao:
      'O segundo capítulo chama-se Notas sobre o luto em Freud e Lacan.',
  },
  {
    pergunta: 'Qual tema compõe a segunda parte da obra?',
    opcoes: [
      'Biologia',
      'Capitalismo, racismo e clínica',
      'Artes visuais',
      'Matemática',
    ],
    correta: 1,
    explicacao:
      'A segunda parte trata de consumo, capitalismo, racismo e prática clínica.',
  },
  {
    pergunta: 'Onde está o capítulo sobre pós-verdade?',
    opcoes: [
      'Transtornos alimentares',
      'Psicanálise, política e mídias sociais',
      'Pandemia',
      'Sexualidade',
    ],
    correta: 1,
    explicacao:
      'A pós-verdade é discutida na terceira parte, dedicada à política e às mídias sociais.',
  },
  {
    pergunta: 'Qual assunto aparece na quarta parte?',
    opcoes: [
      'Sexualidade e sexuação',
      'Botânica',
      'Engenharia',
      'Economia aplicada',
    ],
    correta: 0,
    explicacao:
      'A quarta parte reúne discussões sobre gênero, sexualidade e sexuação.',
  },
  {
    pergunta: 'A parte V analisa principalmente:',
    opcoes: [
      'Cultura musical',
      'Transtornos alimentares',
      'Mecânica',
      'Cinema documental',
    ],
    correta: 1,
    explicacao:
      'A última parte aborda a clínica psicanalítica dos transtornos alimentares.',
  },
];
const cartoes = [
  {
    pergunta: 'O que é inconsciente?',
    resposta:
      'Na psicanálise, refere-se a processos psíquicos não inteiramente acessíveis à consciência, que podem se manifestar em sonhos, sintomas e linguagem.',
  },
  {
    pergunta: 'O que é luto?',
    resposta:
      'Uma experiência de elaboração diante de uma perda. A obra discute o luto sob diferentes perspectivas de Freud e Lacan.',
  },
  {
    pergunta: 'O que é desejo?',
    resposta:
      'Um conceito que vai além de necessidades imediatas e que ocupa lugar central em diferentes leituras psicanalíticas.',
  },
  {
    pergunta: 'O que é transferência?',
    resposta:
      'A relação na qual sentimentos, expectativas e vínculos se atualizam no contexto analítico, com importância para o trabalho clínico.',
  },
  {
    pergunta: 'Como compreender pós-verdade?',
    resposta:
      'Um contexto em que crenças e emoções podem pesar mais na formação de opiniões do que a avaliação de evidências.',
  },
  {
    pergunta: 'Por que estudar mídias digitais?',
    resposta:
      'Porque plataformas e discursos contemporâneos modificam o reconhecimento, o consumo, os vínculos e as formas de se relacionar.',
  },
];
const explicacoes: Record<number, string> = {
  1: 'O capítulo parte da pergunta sobre aquilo que desconhecemos em nós mesmos e aborda a direção do tratamento analítico diante da pandemia.',
  2: 'O texto aproxima Freud e Lacan para discutir perdas e formas singulares de elaboração do luto.',
  3: 'O capítulo discute ansiedade, pânico, angústia e desamparo em diálogo com os desafios da pandemia.',
  9: 'A leitura investiga relações entre consumo, mídias digitais e desejo, no mundo contemporâneo.',
  15: 'O texto discute a pós-verdade e suas implicações para discursos políticos e vínculos sociais.',
  16: 'O capítulo aproxima sexualidade, gozo e amor de questões clínicas contemporâneas.',
  21: 'O estudo aborda corpo, alimento, demandas sociais e sintomas alimentares em uma perspectiva psicanalítica.',
};
function FundoVivo() {
  const referencia = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const tela = referencia.current;
    if (!tela) return;
    const contexto = tela.getContext('2d');
    if (!contexto) return;
    const reduzir = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const simbolos = '· . + × ° ✦ ∴ ∵';
    const particulas = Array.from({ length: 90 }, (_, indice) => ({
      x: ((indice * 73 + 43) % 103) / 103,
      y: ((indice * 47 + 13) % 101) / 101,
      tamanho: 8 + (indice % 9),
      velocidade: 0.18 + (indice % 7) / 18,
      simbolo: simbolos[(indice * 5) % simbolos.length],
    }));
    let largura = 0;
    let altura = 0;
    let quadro = 0;
    let animacao = 0;
    let ultimo = 0;
    const ponteiro = { x: -500, y: -500 };
    const redimensionar = () => {
      const dimensoes = tela.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = dimensoes.width;
      altura = dimensoes.height;
      tela.width = Math.round(largura * dpr);
      tela.height = Math.round(altura * dpr);
      contexto.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const mover = (evento: PointerEvent) => {
      const posicao = tela.getBoundingClientRect();
      ponteiro.x = evento.clientX - posicao.left;
      ponteiro.y = evento.clientY - posicao.top;
    };
    const desenhar = (agora: number) => {
      animacao = requestAnimationFrame(desenhar);
      if (agora - ultimo < 35 && !reduzir) return;
      ultimo = agora;
      contexto.clearRect(0, 0, largura, altura);
      particulas.forEach((particula, indice) => {
        const tempo = reduzir ? 0 : agora * 0.0001 * particula.velocidade;
        const x = particula.x * largura + Math.sin(tempo + indice) * 18;
        const y = particula.y * altura + Math.cos(tempo * 0.7 + indice) * 22;
        const distancia = Math.hypot(x - ponteiro.x, y - ponteiro.y);
        const iluminada = Math.max(0, 1 - distancia / 170);
        contexto.globalAlpha = 0.14 + iluminada * 0.6;
        contexto.fillStyle = iluminada > 0.1 ? '#efb290' : '#a07a64';
        contexto.font = String(particula.tamanho) + 'px monospace';
        contexto.fillText(
          particula.simbolo,
          x + (iluminada ? (x - ponteiro.x) / 12 : 0),
          y
        );
      });
      contexto.globalAlpha = 1;
      quadro++;
      if (reduzir && quadro > 2) cancelAnimationFrame(animacao);
    };
    redimensionar();
    window.addEventListener('resize', redimensionar);
    window.addEventListener('pointermove', mover);
    animacao = requestAnimationFrame(desenhar);
    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener('resize', redimensionar);
      window.removeEventListener('pointermove', mover);
    };
  }, []);
  return <canvas className="fundo-vivo" ref={referencia} aria-hidden="true" />;
}
function Guia({ tamanho = 'grande' }: { tamanho?: 'grande' | 'pequeno' }) {
  const [fala, definirFala] = useState('Eu sou o Nilo. Vem descobrir comigo!');
  const [aberto, definirAberto] = useState(false);
  const frases = [
    'Uma pergunta pode abrir um universo.',
    'Não precisa ter todas as respostas.',
    'O conhecimento cresce quando a gente explora.',
    'Você já descobriu algo novo hoje?',
  ];
  const interagir = () => {
    definirFala(frases[Math.floor(Math.random() * frases.length)]);
    definirAberto(true);
  };
  return (
    <div className={'mascote mascote-' + tamanho}>
      <button
        type="button"
        className="corpo-mascote"
        onClick={interagir}
        aria-label="Conversar com Nilo, o mascote"
        title="Clique em mim"
      >
        <svg
          viewBox="0 0 180 180"
          role="img"
          aria-label="Nilo, mascote original do MenteVerso"
        >
          <path
            d="M42 113C15 88 30 43 66 36c18-24 54-20 65 1 38 0 45 41 24 62 10 37-22 65-60 51-27 16-54-2-53-37Z"
            fill="#e8cbb4"
            stroke="#5a342c"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M66 38C60 23 68 13 80 13M113 37c-2-17 8-25 22-23"
            fill="none"
            stroke="#d68f70"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M93 42c-17 18 6 26-4 44m14-32c18 10 2 24 15 34M61 105c-4 21 7 30 19 31m46-29c7 18-2 29-14 31"
            fill="none"
            stroke="#cd967a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <ellipse cx="73" cy="91" rx="7" ry="10" fill="#392724" />
          <ellipse cx="115" cy="91" rx="7" ry="10" fill="#392724" />
          <circle cx="75" cy="88" r="2" fill="white" />
          <circle cx="117" cy="88" r="2" fill="white" />
          <path
            d="M88 112q7 10 16 0"
            fill="none"
            stroke="#5a342c"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse
            cx="57"
            cy="107"
            rx="10"
            ry="6"
            fill="#dc988c"
            opacity=".65"
          />
          <ellipse
            cx="129"
            cy="107"
            rx="10"
            ry="6"
            fill="#dc988c"
            opacity=".65"
          />
        </svg>
      </button>
      {(aberto || tamanho === 'grande') && (
        <div className="balao-mascote" onClick={() => definirAberto(false)}>
          {fala}
        </div>
      )}
    </div>
  );
}
function App() {
  const [pagina, definirPagina] = useState('inicio');
  const [perfil, definirPerfil] = useState(
    () => localStorage.getItem('menteverso-perfil') || ''
  );
  const [rascunho, definirRascunho] = useState('');
  const [aviso, definirAviso] = useState('');
  const [modal, definirModal] = useState(false);
  const [concluidos, definirConcluidos] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('menteverso-concluidos') || '[]');
    } catch {
      return [];
    }
  });
  const [trilha, definirTrilha] = useState(trilhas[0]);
  const [capitulo, definirCapitulo] = useState<Capitulo>(
    trilhas[0].capitulos[0]
  );
  const [busca, definirBusca] = useState('');
  const [indiceQuestao, definirIndiceQuestao] = useState(0);
  const [respostas, definirRespostas] = useState<Record<number, number>>({});
  const [indiceCartao, definirIndiceCartao] = useState(0);
  const [verso, definirVerso] = useState(false);
  const [paleta, definirPaleta] = useState(
    () => localStorage.getItem('menteverso-paleta') || 'terra'
  );
  const [menuAberto, definirMenuAberto] = useState(false);
  const [audioAtivo, definirAudioAtivo] = useState(false);
  const quantidade = concluidos.length;
  const porcentagem = Math.round((quantidade / 22) * 100);
  const navegar = (destino: string) => {
    definirPagina(destino);
    definirMenuAberto(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const criarPerfil = () => {
    if (rascunho.trim().length < 2) {
      definirAviso('Escreva pelo menos 2 caracteres para continuar.');
      return;
    }
    const novoNome = rascunho.trim();
    definirPerfil(novoNome);
    localStorage.setItem('menteverso-perfil', novoNome);
    definirAviso('');
    definirModal(false);
    navegar('painel');
  };
  const estudar = () => {
    if (perfil) navegar('painel');
    else definirModal(true);
  };
  const abrirTrilha = (selecionada: Trilha) => {
    definirTrilha(selecionada);
    navegar('trilhas');
  };
  const abrirCapitulo = (selecionado: Capitulo) => {
    definirCapitulo(selecionado);
    navegar('leitura');
  };
  const marcarConclusao = () => {
    const novaLista = concluidos.includes(capitulo.numero)
      ? concluidos.filter(numero => numero !== capitulo.numero)
      : [...concluidos, capitulo.numero];
    definirConcluidos(novaLista);
    localStorage.setItem('menteverso-concluidos', JSON.stringify(novaLista));
  };
  const voz = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não oferece leitura em voz alta.');
      return;
    }
    if (audioAtivo) {
      window.speechSynthesis.cancel();
      definirAudioAtivo(false);
      return;
    }
    const texto =
      explicacoes[capitulo.numero] ||
      'Explore este tema a partir da obra Leituras Psicanalíticas sobre os Desafios da Atualidade. Leia o capítulo original e anote suas descobertas.';
    const enunciado = new SpeechSynthesisUtterance(
      capitulo.titulo + '. ' + texto
    );
    enunciado.lang = 'pt-BR';
    enunciado.rate = 0.92;
    enunciado.onend = () => definirAudioAtivo(false);
    window.speechSynthesis.speak(enunciado);
    definirAudioAtivo(true);
  };
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    localStorage.setItem('menteverso-paleta', paleta);
  }, [paleta]);
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD)
      navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);
  const trocarPaleta = () =>
    definirPaleta(
      paleta === 'terra' ? 'lilas' : paleta === 'lilas' ? 'oliva' : 'terra'
    );
  const resumo =
    explicacoes[capitulo.numero] ||
    'Este capítulo apresenta uma perspectiva singular sobre os desafios da atualidade. Abra o texto original e identifique os conceitos, argumentos e perguntas que chamam sua atenção. A síntese detalhada deste capítulo será ampliada em versões futuras.';
  const respostasCertas = questoes.reduce(
    (total, questao, indice) =>
      total + (respostas[indice] === questao.correta ? 1 : 0),
    0
  );
  return (
    <div className={'aplicacao paleta-' + paleta}>
      <header className="cabecalho">
        <button
          className="marca"
          onClick={() => navegar('inicio')}
          aria-label="Voltar ao início"
        >
          <span className="simbolo-marca">
            <span>◌</span>
            <span>✳</span>
          </span>
          <span>
            mente<span className="marca-destaque">verso</span>
            <small>UM UNIVERSO DE IDEIAS</small>
          </span>
        </button>
        <nav
          className={'navegacao ' + (menuAberto ? 'aberta' : '')}
          aria-label="Navegação principal"
        >
          <button onClick={() => navegar('inicio')}>Início</button>
          <button
            onClick={() => {
              navegar('inicio');
              setTimeout(
                () =>
                  document
                    .getElementById('noticias')
                    ?.scrollIntoView({ behavior: 'smooth' }),
                100
              );
            }}
          >
            Notícias
          </button>
          <button
            onClick={() => {
              if (perfil) navegar('trilhas');
              else estudar();
            }}
          >
            Trilhas
          </button>
          <button
            onClick={() => {
              if (perfil) navegar('cartoes');
              else estudar();
            }}
          >
            Memorização
          </button>
        </nav>
        <div className="acoes-topo">
          <button
            className="botao-icone"
            title="Trocar cores"
            aria-label="Trocar cores do site"
            onClick={trocarPaleta}
          >
            <Sparkles size={17} />
          </button>
          <button className="botao-conta" onClick={estudar}>
            {perfil ? 'Meu espaço' : 'Entrar'} <ArrowUpRight size={16} />
          </button>
          <button
            className="botao-menu"
            aria-label="Abrir menu"
            onClick={() => definirMenuAberto(!menuAberto)}
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {pagina === 'inicio' && (
        <main>
          <section className="principal" id="topo">
            <FundoVivo />
            <div className="aurora aurora-a" />
            <div className="aurora aurora-b" />
            <div className="conteudo-principal">
              <div className="selo">
                <span className="ponto-ativo" /> UMA NOVA FORMA DE ESTUDAR A
                MENTE <span className="selo-estrela">✳</span>
              </div>
              <h1>
                A mente é um
                <br />
                <em>universo inteiro.</em>
              </h1>
              <p className="texto-principal">
                Um espaço vivo para descobrir ideias, conectar conceitos e
                estudar psicanálise no seu próprio ritmo. Com curiosidade, sem
                pressa.
              </p>
              <div className="botoes-principal">
                <button className="botao-primario" onClick={estudar}>
                  Começar minha jornada <ArrowRight size={19} />
                </button>
                <button
                  className="botao-secundario"
                  onClick={() =>
                    document
                      .getElementById('explorar')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Conhecer a experiência <ChevronDown size={18} />
                </button>
              </div>
              <p className="legenda-principal">
                ✧ Gratuito para explorar <span>·</span> 5 trilhas <span>·</span>{' '}
                22 capítulos
              </p>
            </div>
            <div className="orbita-mascote">
              <div className="anel-orbita anel-1" />
              <div className="anel-orbita anel-2" />
              <Guia />
              <span className="estrela-mascote">✶</span>
            </div>
            <div className="rodape-hero">
              <span>01 / 05 · UMA IDEIA COMEÇA AQUI</span>
              <button
                onClick={() =>
                  document
                    .getElementById('explorar')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                DESCER PARA EXPLORAR <ChevronDown size={15} />
              </button>
            </div>
          </section>
          <section className="secao secao-apresentacao" id="explorar">
            <div className="rotulo-secao">
              <span>01</span> UMA EXPERIÊNCIA DIFERENTE
            </div>
            <div className="apresentacao-grid">
              <div>
                <h2>
                  Aprender é <em>se conectar.</em>
                </h2>
                <p>
                  Transformamos um livro acadêmico em um universo de caminhos
                  para explorar. A cada capítulo, uma descoberta; a cada
                  pergunta, uma nova conexão.
                </p>
                <button className="link-discreto" onClick={estudar}>
                  Conheça seu espaço de estudos <ArrowUpRight size={18} />
                </button>
              </div>
              <div
                className="visual-conexoes"
                aria-label="Ilustração animada de conceitos relacionados"
              >
                <span className="nodo nodo-a">desejo</span>
                <span className="nodo nodo-b">sujeito</span>
                <span className="nodo nodo-c">linguagem</span>
                <span className="nodo nodo-d">memória</span>
                <span className="nodo nodo-central">✳</span>
                <div className="fio fio-a" />
                <div className="fio fio-b" />                <div className="fio fio-c" />
              </div>
            </div>
            <div className="tres-diferenciais">
              <article>
                <span className="numero-diferencial">01 /</span>
                <BookOpen size={25} />
                <h3>Textos que fazem sentido</h3>
                <p>
                  Capítulos organizados por tema, com contexto e acesso direto
                  ao livro original.
                </p>
              </article>
              <article>
                <span className="numero-diferencial">02 /</span>
                <Lightbulb size={25} />
                <h3>Aprenda fazendo</h3>
                <p>
                  Questões com feedback, cartões de memória e revisões para
                  fixar conceitos.
                </p>
              </article>
              <article>
                <span className="numero-diferencial">03 /</span>
                <Compass size={25} />
                <h3>Seu próprio percurso</h3>
                <p>
                  Explore livremente, marque capítulos concluídos e acompanhe
                  sua evolução.
                </p>
              </article>
            </div>
          </section>
          <section className="secao secao-trilhas-publica" id="universos">
            <div className="rotulo-secao">
              <span>02</span> OS CINCO UNIVERSOS
            </div>
            <div className="cabecalho-secao-linha">
              <h2>
                Cinco caminhos.
                <br />
                <em>Infinitas perguntas.</em>
              </h2>
              <p>
                O ponto de partida é o livro{' '}
                <i>Leituras Psicanalíticas sobre os Desafios da Atualidade</i>,
                organizado por Flavia Gaze Bonfim.
              </p>
            </div>
            <div className="trilhas-publicas">
              {trilhas.map((item, indice) => (
                <button
                  key={item.id}
                  className="trilha-publica"
                  onClick={() => {
                    definirTrilha(item);
                    if (perfil) navegar('trilhas');
                    else definirModal(true);
                  }}
                  style={{ '--cor-trilha': item.cor } as React.CSSProperties}
                >
                  <span className="trilha-publica-topo">
                    <span>0{indice + 1} / UNIVERSO</span>
                    <ArrowUpRight size={18} />
                  </span>
                  <span className="trilha-sinal">{item.sinal}</span>
                  <strong>{item.nome}</strong>
                  <span className="trilha-sub">{item.subtitulo}</span>
                  <span className="trilha-publica-base">
                    {item.capitulos.length} capítulos <ArrowRight size={17} />
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section className="secao secao-noticias" id="noticias">
            <div className="rotulo-secao">
              <span>03</span> ALÉM DAS PÁGINAS
            </div>
            <div className="cabecalho-secao-linha">
              <h2>
                O mundo muda.
                <br />
                <em>A conversa continua.</em>
              </h2>
              <p>
                Notícias e pesquisas externas para ampliar o olhar sobre a
                mente, a sociedade e nosso tempo. Fontes sempre identificadas.
              </p>
            </div>
            <div className="grade-noticias">
              {noticias.map((noticia, indice) => (
                <a
                  key={noticia.url}
                  className={'noticia noticia-' + indice}
                  href={noticia.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="noticia-padrao">
                    <span>{noticia.sinal}</span>
                    <span className="linhas-noticia" />
                  </span>
                  <div className="noticia-corpo">
                    <span className="noticia-meta">
                      {noticia.categoria} <i>·</i> {noticia.data}
                    </span>
                    <h3>{noticia.titulo}</h3>
                    <p>{noticia.descricao}</p>
                    <span className="noticia-rodape">
                      {noticia.fonte} <ArrowUpRight size={18} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <p className="nota-fontes">
              Notícias selecionadas em 30/10/2026 · O MenteVerso não oferece
              diagnóstico ou aconselhamento clínico.
            </p>
          </section>
          <section className="secao secao-companheiro">
            <div className="rotulo-secao">
              <span>04</span> UMA COMPANHIA PARA A CURIOSIDADE
            </div>
            <div className="companheiro-grid">
              <div className="companheiro-visual">
                <div className="halo-companheiro" />
                <Guia />
              </div>
              <div>
                <div className="marcador-pequeno">CONHEÇA O NILO ✳</div>
                <h2>
                  Seu pequeno
                  <br />
                  <em>companheiro de ideias.</em>
                </h2>
                <p>
                  O Nilo mora por aqui. Ele acompanha suas descobertas, reage
                  quando você interage com ele e lembra que estudar também pode
                  ser leve.
                </p>
                <p className="texto-menor">
                  Toque nele e descubra o que está pensando.
                </p>
                <button className="botao-primario" onClick={estudar}>
                  Entrar nesse universo <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
          <section className="secao secao-perguntas">
            <div className="rotulo-secao">
              <span>05</span> PERGUNTAS QUE SEMPRE APARECEM
            </div>
            <h2>
              Curiosidades <em>bem-vindas.</em>
            </h2>
            <div className="perguntas">
              <details>
                <summary>
                  Preciso criar uma conta para ler as notícias?
                  <ChevronDown size={18} />
                </summary>
                <p>
                  Não. A página inicial, as notícias e as informações sobre o
                  projeto são públicas.
                </p>
              </details>
              <details>
                <summary>
                  O MenteVerso é gratuito?
                  <ChevronDown size={18} />
                </summary>
                <p>
                  Sim. Nesta versão de demonstração, todos os exercícios e
                  trilhas estão liberados gratuitamente.
                </p>
              </details>
              <details>
                <summary>
                  Onde fica salvo meu progresso?
                  <ChevronDown size={18} />
                </summary>
                <p>
                  Por enquanto, o perfil e as leituras concluídas ficam salvos
                  apenas neste navegador/dispositivo. A sincronização entre
                  aparelhos exige uma conta real, prevista para a evolução do
                  projeto.
                </p>
              </details>
              <details>
                <summary>
                  O MenteVerso substitui terapia ou estudo acadêmico?
                  <ChevronDown size={18} />
                </summary>
                <p>
                  Não. É uma ferramenta educacional de apoio à leitura. O livro
                  e seus autores continuam sendo a referência principal;
                  questões clínicas precisam de profissionais qualificados.
                </p>
              </details>
            </div>
          </section>
          <section className="convite-final">
            <div className="convite-risco">✶ ✳ ◌ ✶ ✳ ◌</div>
            <h2>
              O próximo universo
              <br />
              <em>pode começar agora.</em>
            </h2>
            <p>
              Abra uma porta para descobrir coisas que você ainda não sabe que
              quer aprender.
            </p>
            <button className="botao-primario" onClick={estudar}>
              Começar a explorar <ArrowRight size={18} />
            </button>
          </section>
        </main>
      )}
      {pagina !== 'inicio' && (
        <main className="area-estudos">
          <aside className="barra-estudos">
            <div className="perfil-lateral">
              <div className="avatar-estudo">
                {perfil.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <small>OLÁ, EXPLORADOR(A)</small>
                <strong>{perfil}</strong>
              </div>
            </div>
            <div className="menu-estudos">
              <button
                className={pagina === 'painel' ? 'ativo' : ''}
                onClick={() => navegar('painel')}
              >
                <Compass size={18} /> Visão geral
              </button>
              <button
                className={
                  pagina === 'trilhas' || pagina === 'leitura' ? 'ativo' : ''
                }
                onClick={() => navegar('trilhas')}
              >
                <Library size={18} /> Minhas trilhas
              </button>
              <button
                className={pagina === 'quiz' ? 'ativo' : ''}
                onClick={() => navegar('quiz')}
              >
                <Lightbulb size={18} /> Desafios
              </button>
              <button
                className={pagina === 'cartoes' ? 'ativo' : ''}
                onClick={() => navegar('cartoes')}
              >
                <RotateCcw size={18} /> Cartões de memória
              </button>
              <button
                className={pagina === 'conexoes' ? 'ativo' : ''}
                onClick={() => navegar('conexoes')}
              >
                <Sparkles size={18} /> Mapa de ideias
              </button>
            </div>
            <div className="lateral-inferior">
              <span>PROGRESSO GERAL</span>
              <strong>{quantidade} de 22 capítulos</strong>
              <div className="barra-progresso">
                <span style={{ width: porcentagem + '%' }} />
              </div>
              <small>{porcentagem}% da jornada</small>
            </div>
          </aside>
          <div className="conteudo-estudos">
            <div className="atalhos-mobile">
              <button onClick={() => navegar('painel')}>Painel</button>
              <button onClick={() => navegar('trilhas')}>Trilhas</button>
              <button onClick={() => navegar('quiz')}>Desafios</button>
              <button onClick={() => navegar('cartoes')}>Cartões</button>
            </div>
            {pagina === 'painel' && (
              <div className="conteudo-interno">
                <div className="etiqueta">SEU ESPAÇO NO UNIVERSO</div>
                <h1>
                  Um universo de
                  <br />
                  <em>possibilidades, {perfil.split(' ')[0]}.</em>
                </h1>
                <p className="introducao-painel">
                  Seu caminho não precisa ser linear. Escolha por onde começar e
                  aprenda uma descoberta de cada vez.
                </p>
                <div className="indicadores">
                  <div>
                    <span>CONCLUÍDOS</span>
                    <strong>
                      {String(quantidade).padStart(2, '0')}
                      <small>/ 22</small>
                    </strong>
                  </div>
                  <div>
                    <span>TRILHAS</span>
                    <strong>05</strong>
                  </div>
                  <div>
                    <span>EVOLUÇÃO</span>
                    <strong>
                      {porcentagem}
                      <small>%</small>
                    </strong>
                  </div>
                </div>
                <div className="secao-dashboard-titulo">
                  <h2>Continue explorando</h2>
                  <button onClick={() => navegar('trilhas')}>
                    Ver todas <ArrowRight size={16} />
                  </button>
                </div>
                <div className="grade-trilhas-dashboard">
                  {trilhas.map(item => (
                    <button
                      key={item.id}
                      className="cartao-trilha-dashboard"
                      onClick={() => abrirTrilha(item)}
                    >
                      <span style={{ color: item.cor }}>{item.sinal}</span>
                      <small>UNIVERSO 0{item.id}</small>
                      <strong>{item.nome}</strong>
                      <p>{item.subtitulo}</p>
                      <div className="barra-progresso">
                        <span
                          style={{
                            width:
                              Math.round(
                                (item.capitulos.filter(cap =>
                                  concluidos.includes(cap.numero)
                                ).length /
                                  item.capitulos.length) *
                                  100
                              ) + '%',
                            background: item.cor,
                          }}
                        />
                      </div>
                      <span className="legenda-trilha">
                        {
                          item.capitulos.filter(cap =>
                            concluidos.includes(cap.numero)
                          ).length
                        }
                        /{item.capitulos.length} capítulos{' '}
                        <ArrowRight size={17} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {pagina === 'trilhas' && (
              <div className="conteudo-interno">
                <div className="etiqueta">SUA BIBLIOTECA</div>
                <h1>
                  Escolha um <em>caminho.</em>
                </h1>
                <p className="introducao-painel">
                  Cinco universos de leitura organizados a partir do sumário do
                  livro.
                </p>
                <label className="campo-busca">
                  <Search size={18} />
                  <input
                    placeholder="Buscar capítulo, autor ou conceito..."
                    value={busca}
                    onChange={evento => definirBusca(evento.target.value)}
                  />
                </label>
                {trilhas
                  .filter(
                    item =>
                      item.capitulos.some(cap =>
                        cap.titulo.toLowerCase().includes(busca.toLowerCase())
                      ) || item.nome.toLowerCase().includes(busca.toLowerCase())
                  )
                  .map(item => (
                    <div className="lista-trilha" key={item.id}>
                      <button
                        className="titulo-lista-trilha"
                        onClick={() => definirTrilha(item)}
                      >
                        <span
                          style={{ color: item.cor }}
                          className="simbolo-trilha"
                        >
                          {item.sinal}
                        </span>
                        <span>
                          <small>
                            UNIVERSO 0{item.id} · {item.capitulos.length}{' '}
                            CAPÍTULOS
                          </small>
                          <strong>{item.nome}</strong>
                          <em>{item.sobre}</em>
                        </span>
                        <ChevronDown
                          size={19}
                          className={trilha.id === item.id ? 'seta-virada' : ''}
                        />
                      </button>
                      {(trilha.id === item.id || busca.length > 0) && (
                        <div className="capitulos-lista">
                          {item.capitulos
                            .filter(
                              cap =>
                                cap.titulo
                                  .toLowerCase()
                                  .includes(busca.toLowerCase()) ||
                                item.nome
                                  .toLowerCase()
                                  .includes(busca.toLowerCase())
                            )
                            .map(cap => (
                              <button
                                key={cap.numero}
                                className="linha-capitulo"
                                onClick={() => abrirCapitulo(cap)}
                              >
                                <span className="numero-capitulo">
                                  {String(cap.numero).padStart(2, '0')}
                                </span>
                                <span>
                                  {cap.titulo}
                                  <small>
                                    Página {cap.pagina} · Livro original
                                  </small>
                                </span>
                                {concluidos.includes(cap.numero) ? (
                                  <CheckCircle2 size={20} color="#a9bfa2" />
                                ) : (
                                  <ArrowRight size={19} />
                                )}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {pagina === 'leitura' && (
              <div className="conteudo-interno">
                <button className="voltar" onClick={() => navegar('trilhas')}>
                  <ChevronLeft size={17} /> Voltar às trilhas
                </button>
                <div className="etiqueta">
                  CAPÍTULO {String(capitulo.numero).padStart(2, '0')} · PÁGINA{' '}
                  {capitulo.pagina}
                </div>
                <h1 className="titulo-capitulo">{capitulo.titulo}</h1>
                <div className="ferramentas-leitura">
                  <button onClick={voz}>
                    {audioAtivo ? (
                      <VolumeX size={17} />
                    ) : (
                      <Headphones size={17} />
                    )}{' '}
                    {audioAtivo ? 'Parar áudio' : 'Ouvir introdução'}
                  </button>
                  <a
                    href={URL_LIVRO + '#page=' + capitulo.pagina}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={17} /> Abrir PDF original
                  </a>
                </div>
                <div className="card-leitura">
                  <div className="etiqueta">ANTES DE LER</div>
                  <h2>Uma porta de entrada</h2>
                  <p>{resumo}</p>
                  <p className="aviso-leitura">
                    Este resumo é uma introdução educacional original, não
                    substitui a leitura do capítulo nem reproduz seu texto
                    integral.
                  </p>
                  <div className="pergunta-reflexao">
                    <Lightbulb size={20} />
                    <div>
                      <strong>Para pensar durante a leitura</strong>
                      <p>
                        Qual questão desse capítulo parece mais relevante para
                        compreender a vida contemporânea?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bloco-livro">
                  <div>
                    <BookOpen size={25} />
                    <div>
                      <strong>Continue no livro original</strong>
                      <p>
                        Organização: Flavia Gaze Bonfim · Editora Bagai · 2022
                      </p>
                    </div>
                  </div>
                  <a
                    href={URL_LIVRO + '#page=' + capitulo.pagina}
                    target="_blank"
                    rel="noreferrer"
                    className="botao-primario"
                  >
                    Ler capítulo <ArrowUpRight size={18} />
                  </a>
                </div>
                <button
                  className={
                    'botao-conclusao ' +
                    (concluidos.includes(capitulo.numero) ? 'concluido' : '')
                  }
                  onClick={marcarConclusao}
                >
                  {concluidos.includes(capitulo.numero) ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Check size={20} />
                  )}{' '}
                  {concluidos.includes(capitulo.numero)
                    ? 'Capítulo estudado — desfazer'
                    : 'Marcar capítulo como estudado'}
                </button>
              </div>
            )}
            {pagina === 'quiz' && (
              <div className="conteudo-interno">
                <div className="etiqueta">DESAFIOS INTERATIVOS</div>
                <h1>
                  Aprender também
                  <br />
                  <em>é experimentar.</em>
                </h1>
                <p className="introducao-painel">
                  Teste seus conhecimentos sobre a estrutura e os temas da obra.
                  Um passo de cada vez.
                </p>
                <div className="painel-quiz">
                  <div className="cabecalho-quiz">
                    <span>
                      PERGUNTA {indiceQuestao + 1} / {questoes.length}
                    </span>
                    <span>{Object.keys(respostas).length} respondidas</span>
                  </div>
                  <div className="barra-progresso">
                    <span
                      style={{
                        width:
                          (Object.keys(respostas).length / questoes.length) *
                            100 +
                          '%',
                      }}
                    />
                  </div>
                  <h2>{questoes[indiceQuestao].pergunta}</h2>
                  <div className="opcoes-quiz">
                    {questoes[indiceQuestao].opcoes.map((opcao, indice) => (
                      <button
                        key={opcao}
                        disabled={respostas[indiceQuestao] !== undefined}
                        className={
                          respostas[indiceQuestao] === indice
                            ? indice === questoes[indiceQuestao].correta
                              ? 'certa'
                              : 'errada'
                            : respostas[indiceQuestao] !== undefined &&
                                indice === questoes[indiceQuestao].correta
                              ? 'certa'
                              : ''
                        }
                        onClick={() =>
                          definirRespostas({
                            ...respostas,
                            [indiceQuestao]: indice,
                          })
                        }
                      >
                        <span>{String.fromCharCode(65 + indice)}</span>
                        {opcao}
                        {respostas[indiceQuestao] !== undefined &&
                          indice === questoes[indiceQuestao].correta && (
                            <Check size={18} />
                          )}
                      </button>
                    ))}
                  </div>
                  {respostas[indiceQuestao] !== undefined && (
                    <div className="feedback-quiz">
                      <strong>
                        {respostas[indiceQuestao] ===
                        questoes[indiceQuestao].correta
                          ? 'Muito bem! ✳'
                          : 'Essa era uma boa hipótese.'}
                      </strong>
                      <p>{questoes[indiceQuestao].explicacao}</p>
                    </div>
                  )}
                  <div className="rodape-quiz">
                    <span>
                      {Object.keys(respostas).length === questoes.length
                        ? respostasCertas +
                          ' de ' +
                          questoes.length +
                          ' acertos'
                        : 'Descubra, erre e tente de novo.'}
                    </span>
                    <div>
                      <button
                        className="botao-secundario"
                        onClick={() => {
                          definirRespostas({});
                          definirIndiceQuestao(0);
                        }}
                      >
                        <RotateCcw size={17} /> Reiniciar
                      </button>
                      <button
                        className="botao-primario"
                        disabled={respostas[indiceQuestao] === undefined}
                        onClick={() =>
                          definirIndiceQuestao(
                            (indiceQuestao + 1) % questoes.length
                          )
                        }
                      >
                        {indiceQuestao === questoes.length - 1
                          ? 'Rever perguntas'
                          : 'Próxima'}{' '}
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {pagina === 'cartoes' && (
              <div className="conteudo-interno">
                <div className="etiqueta">MEMORIZAÇÃO ATIVA</div>
                <h1>
                  Uma ideia de
                  <br />
                  <em>cada vez.</em>
                </h1>
                <p className="introducao-painel">
                  Toque no cartão para descobrir a explicação. Volte quantas
                  vezes quiser.
                </p>
                <div className="numero-cartao">
                  CARTÃO {String(indiceCartao + 1).padStart(2, '0')} /{' '}
                  {String(cartoes.length).padStart(2, '0')}
                </div>
                <button
                  className={'flashcard ' + (verso ? 'virado' : '')}
                  onClick={() => definirVerso(!verso)}
                >
                  <div className="marca-flashcard">
                    MENTEVERSO <span>✳</span>
                  </div>
                  <span className="texto-flashcard">
                    {verso
                      ? cartoes[indiceCartao].resposta
                      : cartoes[indiceCartao].pergunta}
                  </span>
                  <span className="rodape-flashcard">
                    <RotateCcw size={18} />{' '}
                    {verso
                      ? 'Toque para ver a pergunta'
                      : 'Toque para revelar a resposta'}
                  </span>
                </button>
                <div className="controle-cartoes">
                  <button
                    onClick={() => {
                      definirIndiceCartao(
                        (indiceCartao - 1 + cartoes.length) % cartoes.length
                      );
                      definirVerso(false);
                    }}
                  >
                    <ChevronLeft size={19} /> Anterior
                  </button>
                  <span>
                    {indiceCartao + 1} de {cartoes.length}
                  </span>
                  <button
                    onClick={() => {
                      definirIndiceCartao((indiceCartao + 1) % cartoes.length);
                      definirVerso(false);
                    }}
                  >                    Próximo <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            )}
            {pagina === 'conexoes' && (
              <div className="conteudo-interno">
                <div className="etiqueta">MAPA DE IDEIAS</div>
                <h1>
                  Ideias que
                  <br />
                  <em>se encontram.</em>
                </h1>
                <p className="introducao-painel">
                  Conceitos não vivem isolados. Toque em um universo e veja suas
                  conexões nos capítulos.
                </p>
                <div className="mapa-ideias">
                  {trilhas.map((item, indice) => (
                    <button
                      key={item.id}
                      className={'ideia ideia-' + indice}
                      onClick={() => abrirTrilha(item)}
                      style={
                        { '--cor-trilha': item.cor } as React.CSSProperties
                      }
                    >
                      <span>{item.sinal}</span>
                      <strong>{item.nome}</strong>
                      <small>{item.capitulos.length} capítulos</small>
                    </button>
                  ))}
                  <div className="ideia-centro">✳</div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
      <footer className="rodape-site">
        <div>
          <span className="marca-rodape">
            mente<em>verso</em> ✳
          </span>
          <p>Um universo de ideias, um passo por vez.</p>
        </div>
        <div className="links-rodape">
          <a href={URL_LIVRO} target="_blank" rel="noreferrer">
            Livro original <ArrowUpRight size={15} />
          </a>
          <button onClick={() => navegar('inicio')}>Página inicial</button>
          <button onClick={trocarPaleta}>Trocar cores</button>
        </div>
        <div className="credito-final">
          PROJETO EDUCACIONAL INDEPENDENTE · 2026
        </div>
      </footer>
      {modal && (
        <div
          className="fundo-modal"
          role="presentation"
          onMouseDown={evento => {
            if (evento.target === evento.currentTarget) definirModal(false);
          }}
        >
          <div
            className="modal-perfil"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
          >
            <button
              className="fechar-modal"
              onClick={() => definirModal(false)}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <span className="enfeite-modal">✳</span>
            <div className="etiqueta">SUA JORNADA COMEÇA AQUI</div>
            <h2 id="titulo-modal">
              Como podemos
              <br />
              <em>te chamar?</em>
            </h2>
            <p>
              Crie um perfil neste dispositivo para guardar suas leituras
              concluídas. Não é necessário e-mail.
            </p>
            <form
              onSubmit={evento => {
                evento.preventDefault();
                criarPerfil();
              }}
            >
              <label htmlFor="nome-visitante">SEU NOME</label>
              <input
                id="nome-visitante"
                autoFocus
                placeholder="Digite seu nome"
                value={rascunho}
                onChange={evento => {
                  definirRascunho(evento.target.value);
                  definirAviso('');
                }}
              />
              {aviso && <p className="erro-formulario">{aviso}</p>}
              <button type="submit" className="botao-primario">
                Criar perfil <ArrowRight size={18} />
              </button>
            </form>
            <small className="nota-modal">
              Seus dados ficam apenas neste navegador. Não é uma conta
              sincronizada.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
