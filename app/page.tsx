"use client";
import { useEffect, useState } from "react";
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
  Work: { kicker: "Selected work", items: ["FinDash.ai", "PwC", "Small tools and experiments"] },
  Music: { kicker: "On rotation", items: ["Charm — Clairo", "Rebelution", "Late summer, slowly"] },
  Books: { kicker: "On the shelf", items: ["Steve Jobs — Walter Isaacson", "The Creative Act", "Books I keep returning to"] },
  Enjoying: { kicker: "Lately", items: ["AI Infrastructure", "Pickleball", "Meal Prepping", "Vibe Coding", "Planning the weekend"] },
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
  { title: "Mind Gym", author: "Gary Mack & David Casstevens", blurb: "Good performance depends on mental habits as much as physical preparation: focus, confidence, composure, and the ability to recover after mistakes. The same habits carry naturally from sports into work and everyday life." },
  { title: "The Inner Game of Tennis", author: "W. Timothy Gallwey", blurb: "Self-judgment often interferes with abilities that are already there. Calm attention and trust in preparation can improve much more than a tennis match." },
  { title: "The Gut: A Pocket Primer", author: "Amy Fleming", status: "Reading now", blurb: "Digestion is closely connected to energy, mood, immunity, and sleep. The book makes health feel less like a set of isolated systems and more like the result of small, connected choices." },
  { title: "Steve Jobs", author: "Walter Isaacson", status: "Reading now", blurb: "A study in owning a product vision all the way down to its smallest detail. Jobs’s intensity was often difficult, but the book makes a strong case for care, taste, and passion in the things that get built." },
  { title: "Norwegian Wood", author: "Haruki Murakami", blurb: "A quiet reflection on youth, intimacy, memory, and the uncertainty of becoming an adult. Its slow pace and emotional honesty leave space for the contradictions that shape a life." },
  { title: "Shoe Dog", author: "Phil Knight", blurb: "Building something meaningful is usually messy, uncertain, and held together by belief before it looks successful. The story is ultimately about persistence, product instinct, and staying close to the work." },
  { title: "Open", author: "Andre Agassi", blurb: "An honest account of pressure, repetition, and the complicated relationship an athlete can have with success. Understanding the mind becomes a way to turn resistance into a life chosen more deliberately." },
  { title: "Outliers", author: "Malcolm Gladwell", blurb: "Success looks different when viewed through timing, culture, opportunity, and accumulated practice rather than talent alone. It offers a useful lens for understanding why people and systems develop the way they do." },
  { title: "Ready Player One", author: "Ernest Cline", blurb: "A nostalgic adventure that also asks what is lost when digital worlds become more appealing than the real one. Technology can expand a life, but it cannot fully replace one." },
  { title: "The Defining Decade", author: "Meg Jay", blurb: "Ordinary choices in the twenties quietly shape work, relationships, and identity. Direction comes less from having everything figured out than from making commitments and allowing them to matter." },
];
const workItems = [
  { title: "FinDash.ai", blurb: "A short note about this role will live here." },
  { title: "PwC", blurb: "A short note about this role will live here." },
  { title: "Small tools and experiments", blurb: "A short note about this work will live here." },
];
const enjoyingItems = cardContents.Enjoying.items.map((title, index) => ({ title, href: "", number: index + 1 }));
const placeItems = cardContents.Places.items.map((title) => ({ title, photos: ["", ""] }));
function CardReveal({ opened, onClose }: { opened: { name: string; tone: string; x: number; y: number }; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<(typeof bookItems)[number] & { x: number; y: number; closing?: boolean } | null>(null);
  const [selectedWork, setSelectedWork] = useState<(typeof workItems)[number] & { x: number; y: number; closing?: boolean } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<(typeof placeItems)[number] & { x: number; y: number; closing?: boolean } | null>(null);
  const closeWithRipple = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 650);
  };
  const openBook = (book: (typeof bookItems)[number], event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const card = event.currentTarget.closest(".card-reveal")?.getBoundingClientRect();
    setSelectedBook({ ...book, x: card ? event.clientX - card.left : 300, y: card ? event.clientY - card.top : 250 });
  };
  const closeBook = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!selectedBook || selectedBook.closing) return;
    setSelectedBook({ ...selectedBook, closing: true });
    window.setTimeout(() => setSelectedBook(null), 900);
  };
  const openWork = (work: (typeof workItems)[number], event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const card = event.currentTarget.closest(".card-reveal")?.getBoundingClientRect();
    setSelectedWork({ ...work, x: card ? event.clientX - card.left : 300, y: card ? event.clientY - card.top : 250 });
  };
  const closeWork = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!selectedWork || selectedWork.closing) return;
    setSelectedWork({ ...selectedWork, closing: true });
    window.setTimeout(() => setSelectedWork(null), 900);
  };
  const openPlace = (place: (typeof placeItems)[number], event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const card = event.currentTarget.closest(".card-reveal")?.getBoundingClientRect();
    setSelectedPlace({ ...place, x: card ? event.clientX - card.left : 300, y: card ? event.clientY - card.top : 250 });
  };
  const closePlace = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!selectedPlace || selectedPlace.closing) return;
    setSelectedPlace({ ...selectedPlace, closing: true });
    window.setTimeout(() => setSelectedPlace(null), 900);
  };
  return <div className={`card-reveal reveal-${opened.name.toLowerCase()}${closing ? " is-closing" : ""}`} onClick={(event) => { event.stopPropagation(); closeWithRipple(); }} style={{ "--ripple-x": `${opened.x}px`, "--ripple-y": `${opened.y}px` } as React.CSSProperties}>
    <div className="ripple-grid" aria-hidden="true" />
    <button className="reveal-close" onClick={(event) => { event.stopPropagation(); closeWithRipple(); }} aria-label="Close card">Close ×</button>
    <div className="reveal-inner">
      <p>{cardContents[opened.name].kicker}{opened.name === "Books" && <span className="book-hint">tap a book to explore</span>}</p>
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
              {pile.map((book, index) => (
                <button className="book-spine" onClick={(event) => openBook(book, event)} style={{ "--book": index } as React.CSSProperties} key={book.title}>
                  <small>0{pileIndex * 5 + index + 1}</small>
                  <b>{book.title}</b>
                  <span><i>{book.author}</i>{book.status && <em>{book.status}</em>}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : opened.name === "Work" ? (
        <div className="reveal-items work-items">
          {workItems.map((item, index) => (
            <button onClick={(event) => openWork(item, event)} key={item.title}>
              <span>0{index + 1}</span><b>{item.title}</b><i>↗</i>
            </button>
          ))}
        </div>
      ) : opened.name === "Enjoying" ? (
        <div className="enjoying-grid" aria-label="Things worth sharing">
          {[enjoyingItems.slice(0, 3), enjoyingItems.slice(3)].map((column, columnIndex) => (
            <div className="enjoying-column" key={columnIndex}>
              {column.map((item) => {
                return <a href={item.href || "#"} target={item.href ? "_blank" : undefined} rel={item.href ? "noreferrer" : undefined} onClick={(event) => { event.stopPropagation(); if (!item.href) event.preventDefault(); }} key={item.number}>
                  <span>{String(item.number).padStart(2, "0")}</span><b>{item.title}</b><i>↗</i>
                </a>;
              })}
            </div>
          ))}
        </div>
      ) : opened.name === "Places" ? (
        <div className="reveal-items place-items">
          {placeItems.map((item, index) => (
            <button onClick={(event) => openPlace(item, event)} key={item.title}>
              <span>0{index + 1}</span><b>{item.title}</b><i>↗</i>
            </button>
          ))}
        </div>
      ) : (
        <div className="reveal-items">{cardContents[opened.name].items.map((item, index) => <a href="#" onClick={(event) => event.preventDefault()} key={item}><span>0{index + 1}</span><b>{item}</b><i>↗</i></a>)}</div>
      )}
    </div>
    {selectedBook && (
      <div className={`book-detail${selectedBook.closing ? " is-closing" : ""}`} onClick={closeBook} style={{ "--book-x": `${selectedBook.x}px`, "--book-y": `${selectedBook.y}px` } as React.CSSProperties}>
        <div className="book-detail-meta"><b>{selectedBook.title}</b><span>{selectedBook.author}</span></div>
        <p>{selectedBook.blurb}</p>
      </div>
    )}
    {selectedWork && (
      <div className={`book-detail work-detail${selectedWork.closing ? " is-closing" : ""}`} onClick={closeWork} style={{ "--book-x": `${selectedWork.x}px`, "--book-y": `${selectedWork.y}px` } as React.CSSProperties}>
        <div className="book-detail-meta"><b>{selectedWork.title}</b></div>
        <p>{selectedWork.blurb}</p>
      </div>
    )}
    {selectedPlace && (
      <div className={`book-detail place-detail${selectedPlace.closing ? " is-closing" : ""}`} onClick={closePlace} style={{ "--book-x": `${selectedPlace.x}px`, "--book-y": `${selectedPlace.y}px` } as React.CSSProperties}>
        <div className="book-detail-meta"><b>{selectedPlace.title}</b></div>
        <div className="place-photo-grid">
          {selectedPlace.photos.map((photo, index) => photo ? <img src={photo} alt={`${selectedPlace.title} ${index + 1}`} key={index} /> : <div className="photo-slot" key={index}><span>Photo {String(index + 1).padStart(2, "0")}</span></div>)}
        </div>
      </div>
    )}
  </div>;
}
export default function Home() {
  const [opened, setOpened] = useState<{ name: string; tone: string; x: number; y: number } | null>(null);
  const listeningArtists = [musicItems[0].artist.split(" · ")[0], musicItems[1].artist];
  const [listeningArtist, setListeningArtist] = useState(listeningArtists[0]);
  const [thinkingItems, setThinkingItems] = useState(cardContents.Enjoying.items.slice(0, 3));
  useEffect(() => {
    setListeningArtist(listeningArtists[Math.floor(Math.random() * listeningArtists.length)]);
    setThinkingItems([...cardContents.Enjoying.items].sort(() => Math.random() - 0.5).slice(0, 3));
  }, []);
  const nowItems = [
    ["Living", cardContents.Places.items[0]],
    ["Working", cardContents.Work.items[0]],
    ["Listening", listeningArtist],
    ["Reading", bookItems.filter((book) => book.status).map((book) => book.title).join(" + ")],
    ["Thinking about", thinkingItems.join(", ")],
  ];
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
