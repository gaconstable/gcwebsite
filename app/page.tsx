"use client";
import { useState } from "react";
const nowItems = [
  ["Living", "New York"],
  ["Reading", "Steve Jobs — Walter Isaacson"],
  ["Listening", "Rebelution"],
  ["Thinking about", "AI infrastructure, vibe coding, pickleball"],
];
const library = [
  {
    number: "01",
    type: "Work",
    title: "Where I've worked and my goals",
    detail: "Selected work and things in progress.",
    mark: "◇\n◇",
    tone: "work",
  },
  {
    number: "02",
    type: "Music",
    title: "Go-tos right now",
    detail: "What I’m listening to.",
    mark: "♪",
    tone: "music",
  },
  {
    number: "03",
    type: "Books",
    title: "My favorite reads",
    detail: "A living shelf.",
    mark: "Aa",
    tone: "books",
  },
  {
    number: "04",
    type: "Enjoying",
    title: "Articles, videos, podcasts, projects worth sharing",
    detail: "Things I’m into right now.",
    mark: "ϟ",
    tone: "enjoying",
  },
];
const cardContents: Record<string, { kicker: string; items: string[] }> = {
  Work: { kicker: "Selected work", items: ["FinDash", "AI compute market map", "Small tools and experiments"] },
  Music: { kicker: "On rotation", items: ["Charm — Clairo", "Rebelution", "Late summer, slowly"] },
  Books: { kicker: "On the shelf", items: ["Steve Jobs — Walter Isaacson", "The Creative Act", "Books I keep returning to"] },
  Enjoying: { kicker: "Lately", items: ["Vibe coding", "Pickleball", "Long runs without headphones"] },
  Places: { kicker: "A few points on the planet", items: ["New York", "Barcelona", "Dolomites", "Oʻahu"] },
};
const musicItems = [
  {
    type: "Album",
    title: "Dire Straits",
    artist: "Dire Straits · 1978",
    href: "https://open.spotify.com/album/4dKdxly4ji1vfl7sEYuqBe",
    image: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0205b07080bdc2dd0e2cf6f008",
  },
  {
    type: "Song",
    title: "Cleaning Windows",
    artist: "Van Morrison",
    href: "https://open.spotify.com/track/1Y0fLiphJPvf7Rs56aAL3O",
    image: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d801a110ad2782a57af68092",
  },
  {
    type: "Playlist",
    title: "tv aux 8/7",
    artist: "Spotify",
    href: "https://open.spotify.com/playlist/72sroOmS1KGlkbe054hrZq",
    image: "https://mosaic.scdn.co/300/ab67616d00001e020a49794bd0a26ed45ffa9df4ab67616d00001e02565b363923790503c0b96690ab67616d00001e02b9ab30b4236e93e1a630eef4ab67616d00001e02fe5dc4f72fc5587fe59f665b",
  },
];
const bookItems = [
  ["Steve Jobs", "Walter Isaacson"],
  ["The Creative Act", "Rick Rubin"],
  ["Shoe Dog", "Phil Knight"],
  ["Zero to One", "Peter Thiel"],
  ["Sapiens", "Yuval Noah Harari"],
  ["Principles", "Ray Dalio"],
  ["The Psychology of Money", "Morgan Housel"],
  ["The Ride of a Lifetime", "Robert Iger"],
  ["The Hard Thing About Hard Things", "Ben Horowitz"],
  ["The Almanack of Naval Ravikant", "Eric Jorgenson"],
];
function CardReveal({ opened, onClose }: { opened: { name: string; tone: string; x: number; y: number }; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const closeWithRipple = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 650);
  };
  return <div className={`card-reveal reveal-${opened.name.toLowerCase()}${closing ? " is-closing" : ""}`} onClick={(event) => { event.stopPropagation(); closeWithRipple(); }} style={{ "--ripple-x": `${opened.x}px`, "--ripple-y": `${opened.y}px` } as React.CSSProperties}>
    <div className="ripple-grid" aria-hidden="true" />
    <button className="reveal-close" onClick={(event) => { event.stopPropagation(); closeWithRipple(); }} aria-label="Close card">Close ×</button>
    <div className="reveal-inner">
      <p>{cardContents[opened.name].kicker}</p>
      <h2>{opened.name}</h2>
      {opened.name === "Music" ? (
        <div className="music-stack">
          {musicItems.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} key={item.type}>
              <img src={item.image} alt="" />
              <span>{item.type}</span>
              <div><b>{item.title}</b><small>{item.artist}</small></div>
              <i>Spotify ↗</i>
            </a>
          ))}
        </div>
      ) : opened.name === "Books" ? (
        <div className="book-stack" aria-label="Favorite books">
          {[bookItems.slice(0, 5), bookItems.slice(5)].map((pile, pileIndex) => (
            <div className="book-pile" key={pileIndex}>
              {pile.map(([title, author], index) => (
                <div className="book-spine" style={{ "--book": index } as React.CSSProperties} key={title}>
                  <small>0{pileIndex * 5 + index + 1}</small>
                  <b>{title}</b>
                  <span>{author}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="reveal-items">{cardContents[opened.name].items.map((item, index) => <a href="#" onClick={(event) => event.preventDefault()} key={item}><span>0{index + 1}</span><b>{item}</b><i>↗</i></a>)}</div>
      )}
    </div>
  </div>;
}
export default function Home() {
  const [opened, setOpened] = useState<{ name: string; tone: string; x: number; y: number } | null>(null);
  const openCard = (name: string, tone: string, event?: React.MouseEvent<HTMLElement>) => {
    const bounds = event?.currentTarget.getBoundingClientRect();
    setOpened({ name, tone, x: bounds ? event.clientX - bounds.left : 300, y: bounds ? event.clientY - bounds.top : 250 });
  };
  return (
    <main>
      <nav className="nav shell">
        <div className="navlinks">
          <a href="#now">Right now</a>
          <a href="#library">Library</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <header className="hero shell" id="top">
        <h1>George Constable</h1>
      </header>
      <section className="now section shell" id="now">
        <p className="eyebrow">Right now</p>
        <div className="now-list">
          {nowItems.map(([label, value]) => (
            <div className="now-item" key={label}>
              <p><span>{label}:</span> {value}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="library" id="library">
        <div className="shell library-intro">
          <p className="eyebrow">The library</p>
          <p className="library-hint">tap a card to explore</p>
        </div>
        <div className="shelf shell">
          {library.map((item, index) => (
            <article
              className={`library-panel ${item.tone}`}
              key={item.title}
              style={{ "--index": index } as React.CSSProperties}
              role="button"
              tabIndex={0}
              onClick={(event) => openCard(item.type, item.tone, event)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openCard(item.type, item.tone); }}
            >
              <div className="panel-top">
                <span>{item.type}</span>
                <span>{item.number}</span>
              </div>
              <div className="panel-mark">{item.mark}</div>
              <div className="panel-copy">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <button>
                  Open <span>↗</span>
                </button>
              </div>
              {opened?.name === item.type && <CardReveal opened={opened} onClose={() => setOpened(null)} />}
            </article>
          ))}
          <article
            className="library-panel places-card"
            style={{ "--index": 4 } as React.CSSProperties}
            role="button"
            tabIndex={0}
            onClick={(event) => openCard("Places", "places-card", event)}
            onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openCard("Places", "places-card"); }}
          >
            <div className="panel-top">
              <span>Places</span>
              <span>05</span>
            </div>
            <div className="panel-mark earth-mark" aria-label="Earth">◎</div>
            <div className="panel-copy">
              <h3>Some great sights</h3>
            </div>
            {opened?.name === "Places" && <CardReveal opened={opened} onClose={() => setOpened(null)} />}
          </article>
        </div>
      </section>
      <section className="contact shell" id="contact">
        <h2>Elsewhere</h2>
        <div className="accounts">
          <a href="mailto:hello@example.com">
            <span>Email</span>
            <b>Write me a note</b>
            <i>↗</i>
          </a>
          <a href="https://www.linkedin.com/in/george-a-constable/" target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            <b>George A. Constable</b>
            <i>↗</i>
          </a>
          <a href="https://www.instagram.com/gaconstable/" target="_blank" rel="noreferrer">
            <span>Instagram</span>
            <b>@georgeconstable</b>
            <i>↗</i>
          </a>
          <a href="https://www.strava.com/athletes/georgeconstable" target="_blank" rel="noreferrer">
            <span>Strava</span>
            <b>Runs & rides</b>
            <i>↗</i>
          </a>
          <a href="https://open.spotify.com/user/georgec12?si=63ba3d4117414d5b" target="_blank" rel="noreferrer">
            <span>Spotify</span>
            <b>What I’m listening to</b>
            <i>↗</i>
          </a>
        </div>
      </section>
      <footer className="shell">
        <p>New York · 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
