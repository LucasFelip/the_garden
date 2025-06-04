import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MailOpen } from 'lucide-react';

const letterContent = `
Tenho tantas coisas para te dizer, como se cada pétala do nosso amor fosse uma palavra cuidadosamente escolhida. Escrevo esta carta não apenas como um gesto romântico, mas como um convite ao nosso jardim secreto, aquele espaço sagrado onde guardamos nossos sentimentos mais profundos.

Criei este jardim pensando em você, para que fosse algo especial, um refúgio de memórias onde podemos sempre retornar para reviver tudo o que construímos juntos. Esse espaço digital foi feito para ser um pedaço do meu amor, e como reflexo do meu mundo para você. Peguei coisas que você ama, como girassóis, e as transformei em algo que espero que te faça sorrir. Cada detalhe foi pensado com carinho, para que você sinta o quanto é especial para mim.

Começamos nossa jornada com cicatrizes, marcas que nos moldaram e nos ensinaram o valor da cura que encontramos juntos. E mesmo que o mundo tenha tentado nos definir em tons de preto e branco, você sempre foi aquela luz perfeita entre os extremos. Nem ácido, nem alcalino. Você é esse mistério doce e bruto ao mesmo tempo, perfeitamente desalinhado — e é exatamente isso que se conecta à minha essência. Desde que você chegou, algo em mim mudou irremediavelmente. Sou outro. Alterado por sua presença. Um elemento novo, que só existe porque você existe.

Cada novo dia é uma flor que se abre para nós; cada risada, um raio de sol que clareia nosso caminho. Mas há algo mais — algo invisível, como a dança das suas moléculas com as minhas. Uma química que não se explica, só se sente. Quero atravessar cada camada sua, até o mais profundo, onde as palavras se dissolvem e resta só o que é verdadeiro. Estou rendido à sua forma de ser. Aos seus silêncios. Ao caos bonito da sua alma.

Eu quero ser mais do que um abrigo. Quero ser seu provedor, aquele que envolve, que acalma, que decide ao seu lado, que te protege da dor quando o mundo pesa demais. Quero ser aquele que te conhece não só pelo que você mostra, mas por aquilo que nem sempre consegue dizer. A sua armadura e sua vulnerabilidade. Seu porto e sua tempestade. O toque que entende e o silêncio que respeita. Estou aqui pra reacender o que for necessário, pra ser combustível quando faltar força, e repouso quando você só quiser respirar.

Este jardim também é meu agradecimento a você, meu girassol, por sempre buscar a luz mesmo nos dias mais sombrios. Você é o motivo pelo qual meu coração floresce, e cada pétala aqui é uma lembrança preciosa de como você é especial para mim. Mas, mais do que isso, você é o impulso que me faz encarar minhas próprias sombras. Ao seu lado, eu quero não só o melhor de você, mas tudo de você — até mesmo aquilo que o mundo talvez não saiba como amar. Suas dores, seus traumas, seus impulsos mais escuros. Se você quiser dar, então me dê tudo. Eu estou pronto para segurar até aquilo que pesa.

Eu te admiro de uma maneira única, difícil até de explicar, como se cada flor fosse um eco do amor que sinto por você. Você é a luz singular que ilumina meu ser e guia meu caminho. Quero entregar a você tudo que sou e tudo que tenho. Mesmo quando meu corpo fraqueja, minha vontade de te amar segue em chamas. Meus braços sabem o caminho do seu corpo. Meus olhos te reconhecem mesmo no escuro. Minhas palavras tentam alcançar aquilo que só o silêncio entre nós traduz.

Vivemos momentos de mudança, em que tudo parece estar mais próximo do que jamais esteve. Saiba que estarei aqui, hoje e sempre, para te apoiar, amar e construir ao seu lado um futuro cheio de vida e significado. Porque eu já provei do gosto da sua alma e não sei mais voltar atrás. Desenvolvi um gosto por você, por tudo que você é — mesmo aquilo que você tenta esconder.

Eu sei que a vida pode ser caótica, temos problemas e desafios, cada dia, cada instante somos provados e testados, toda a nossa sanidade e força são colocadas à prova. Mas mesmo assim, eu quero que saiba que você é a razão pela qual eu continuo lutando, a luz que me guia em meio à escuridão. E se for guerra, então eu luto por você. Não com justiça, mas com tudo que eu tenho.

Esses meses foram intensos e desafiadores, mas teremos momentos de alegria e felicidade, como o dia em que nos encontramos. Quero que saiba que cada lágrima derramada foi um passo em direção ao nosso amor, e cada sorriso compartilhado é uma flor que desabrocha em nosso jardim.

Espero que esta carta te faça sentir o quanto você é amada e valorizada. Que cada palavra aqui escrita seja um lembrete do nosso amor inabalável, da nossa força e da beleza que encontramos juntos. Você tem tantas lutas e estamos nessa transição, isso é algo que vamos passar juntos, para que possamos crescer e florescer. E mesmo quando o mundo quiser te partir, eu vou estar aqui, inteiro, te esperando, pronto para receber cada pedaço. Porque se você quiser se dar — então me dê. E eu te darei tudo em troca. Eu te amo, eu te adoro, eu te acelumdisperilosiuoso.
`;

const SecretSection = () => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  // Define a romantic palette based on the background (deep reds, warm grays, soft pinks)
  const colors = {
    backgroundOverlay: 'rgba(40, 20, 30, 0.65)', // Dark, warm overlay
    envelopeBg: 'linear-gradient(135deg, #6a3040, #8a4050)', // Deep reddish-purple gradient
    envelopeIcon: '#f0d0d8', // Soft pink
    envelopeText: '#f0d0d8', // Soft pink
    letterBg: 'linear-gradient(to bottom, #fdf6f8, #f8f0f2)', // Very soft pinkish-white gradient
    letterBorder: 'rgba(138, 64, 80, 0.3)', // Muted reddish border
    letterText: '#4a2a3a', // Dark, warm purple/brown
    letterHeading: '#8a4050', // Deep reddish-purple for headings
    backButtonBg: 'rgba(240, 208, 216, 0.6)', // Semi-transparent soft pink
    backButtonHoverBg: 'rgba(240, 208, 216, 0.8)',
    backButtonIcon: '#4a2a3a',
    scrollbarThumb: '#b58090', // Muted pinkish-purple
    scrollbarTrack: 'rgba(248, 240, 242, 0.5)',
  };

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 w-full h-full z-50 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url('https://preview.redd.it/even-in-arcadia-4k-wallpaper-v0-duuzxj0nheze1.png?width=1080&crop=smart&auto=webp&s=bd960ef1b55afe26bd6f57fa72e6224ab172bcc9')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: colors.backgroundOverlay }}></div>

        {/* Back Button */}
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={handleGoBack}
            className="absolute top-6 left-6 z-[70] p-2 rounded-full hover:shadow-md transition-all shadow-lg"
            style={{ backgroundColor: colors.backButtonBg, color: colors.backButtonIcon }}
            whileHover={{ backgroundColor: colors.backButtonHoverBg }}
            aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </motion.button>

        <AnimatePresence>
          {!isLetterOpen ? (
              // Envelope View
              <motion.div
                  key="envelope"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                  onClick={handleOpenLetter}
                  className="relative z-[60] cursor-pointer p-8 rounded-lg shadow-2xl hover:shadow-pink-900/30 transition-shadow duration-300 aspect-[1.6/1] w-[200px] md:w-[250px] flex items-center justify-center border border-black/20"
                  style={{
                    background: colors.envelopeBg,
                    perspective: '1000px'
                  }}
                  title="Clique para abrir a carta"
              >
                {/* Envelope Icon */}
                <Mail size={60} style={{ color: colors.envelopeIcon }} className="drop-shadow-md" />
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-40 rounded-lg"></div>
                <p className="absolute bottom-4 text-xs font-semibold" style={{ color: colors.envelopeText }}>Abrir Carta</p>
              </motion.div>
          ) : (
              // Letter View
              <motion.div
                  key="letter"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative z-[60] w-[90%] max-w-2xl h-[80vh] max-h-[700px] p-6 md:p-10 rounded-lg shadow-xl overflow-y-auto scrollbar-thin"
                  style={{
                    background: colors.letterBg,
                    borderColor: colors.letterBorder,
                    borderWidth: '2px',
                    color: colors.letterText,
                    '--scrollbar-thumb': colors.scrollbarThumb,
                    '--scrollbar-track': colors.scrollbarTrack,
                  }}
              >
                {/* Apply scrollbar styles via CSS variables if using tailwind-scrollbar plugin */}
                {/* Or use basic browser styling */}
                <style>{`
                            .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
                            .scrollbar-thin::-webkit-scrollbar-track { background: var(--scrollbar-track); border-radius: 3px; }
                            .scrollbar-thin::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 3px; }
                            .scrollbar-thin { scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track); }
                        `}</style>

                <div className="font-serif leading-relaxed text-base md:text-lg">
                  <p className="mb-6 text-lg md:text-xl font-semibold text-center" style={{ color: colors.letterHeading }}>
                    Ao meu Girassol,
                  </p>

                  {/* Variable Content Area */}
                  <div className="whitespace-pre-line mb-8 text-justify indent-8">
                    {letterContent.trim()}
                  </div>

                  <p className="mt-10 text-right font-semibold" style={{ color: colors.letterHeading }}>
                    Com amor, seu eterno amante.
                  </p>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
};

export default SecretSection;

