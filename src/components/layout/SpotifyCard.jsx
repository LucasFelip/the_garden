// src/components/SpotifyCard.jsx
import React, { useState, useEffect } from 'react';
import { PlayCircle, ExternalLink } from 'lucide-react';

// SVG inline do logotipo Spotify (versão monocromática simplificada)
const SpotifyLogoSVG = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 168 168"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
    >
      <circle fill="#1DB954" cx="84" cy="84" r="84" />
      <path
          fill="#FFF"
          d="M119.6 119.4c-2.1 3.3-6.5 4.3-9.8 2.2-27.2-17.5-61.4-21.5-101.6-12.2-3.7.9-7.3-1.3-8.2-5-1-3.7 1.3-7.3 5-8.2 44.7-10.8 83.3-6 114.3 13.7 3.2 2.1 4.2 6.5 2.1 9.8zm12.5-25c-2.6 4.1-8 5.3-12.1 2.7-31.2-19.7-78.9-25.4-116.1-14.5-4.5 1.4-9.2-1.1-10.5-5.6-1.4-4.5 1.1-9.2 5.6-10.5 42.7-13.4 96.7-7.4 133.1 17.2 3.9 2.5 5 7.7 2.5 11.2zM138.2 75.7c-36.5-21.1-97.8-23-136.4-13.2-5 1.4-10.3-1.5-11.7-6.5-1.4-5 1.5-10.3 6.5-11.7C35.2 40.2 104 42.3 147.1 66.1c4.5 2.6 6.1 8.3 3.5 12.6-2.5 4.3-8.2 5.6-12.4 3z"
      />
    </svg>
);

const SpotifyCard = ({ playlistUrl }) => {
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(false);

  // Monta URL do oEmbed
  const oEmbedEndpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(
      playlistUrl
  )}`;

  useEffect(() => {
    fetch(oEmbedEndpoint)
        .then((res) => {
          if (!res.ok) throw new Error('Falha ao buscar oEmbed');
          return res.json();
        })
        .then((json) => {
          setMeta(json);
        })
        .catch(() => {
          setError(true);
        });
  }, [oEmbedEndpoint]);

  if (error) {
    return (
        <div className="p-4 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-sm text-center">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Não foi possível carregar a playlist.
          </p>
          <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center space-x-1 text-[hsl(var(--primary))] hover:underline"
          >
            <PlayCircle size={16} />
            <span className="text-sm font-medium">Abrir no Spotify</span>
          </a>
        </div>
    );
  }

  if (!meta) {
    // Placeholder skeleton
    return (
        <div className="animate-pulse p-4 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-sm">
          <div className="h-44 bg-[hsl(var(--border)/0.1)] rounded-lg mb-4"></div>
          <div className="h-6 w-3/4 bg-[hsl(var(--border)/0.1)] rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-[hsl(var(--border)/0.1)] rounded"></div>
        </div>
    );
  }

  // Se meta foi carregado com sucesso:
  // meta.thumbnail_url → URL da capa (640x640)
  // meta.title         → "Para o jardim"
  // meta.author_name   → "lucasreis09"
  // meta.author_url    → link do autor
  // meta.provider_name → "Spotify"
  // meta.provider_url  → "https://www.spotify.com"

  return (
      <a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group block overflow-hidden rounded-xl border-t-4 border-l-0 border-r-0 border-b-0 border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-shadow duration-200"
          style={{ borderTopColor: '#1DB954' /* linha superior verde Spotify */ }}
      >

        {/* Capa da playlist com overlay de play ao hover */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
              src={meta.thumbnail_url}
              alt={`Capa da playlist ${meta.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Overlay de play (100% opacidade ao hover) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
            <PlayCircle
                size={60}
                className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </div>

        <div className="p-4 bg-[hsl(var(--card))]">
          {/* Título da playlist */}
          <h4 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2 truncate">
            {meta.title}
          </h4>

          {/* Descrição curta (você pode alterar para o texto que preferir) */}
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Para o meu amor, fiz essa playlist para você.
          </p>

          <div className="flex items-center justify-between">
            {/* Autor da playlist com ícone do Spotify */}
            <div className="flex items-center space-x-2">
              <img
                  src={meta.thumbnail_url}
                  alt="Avatar do autor"
                  className="h-8 w-8 rounded-full object-cover border-[1px] border-[hsl(var(--border))]"
              />
              <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                {meta.author_name}
              </span>
                <span className="text-2xs text-[hsl(var(--muted-foreground))]">
                {/* Poderia ser: “{n} faixas” se você soubesse o número de músicas */}
                  LucasFelip
              </span>
              </div>
            </div>

            {/* Botão “Abrir” */}
            <div className="flex items-center space-x-1">
              <PlayCircle size={16} className="text-[#1DB954]" />
              <span className="text-sm font-semibold text-[#1DB954]">Abrir</span>
            </div>
          </div>
        </div>
      </a>
  );
};

export default SpotifyCard;
