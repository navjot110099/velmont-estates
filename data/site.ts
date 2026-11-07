// ============================================================
// VELMONT ESTATES — Content model
// Ultra-luxury real-estate developer.
// ============================================================

const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const brand = {
  name: "Velmont Estates",
  short: "Velmont",
  tagline: "From Vision to Reality.",
  established: "MMX04",
  city: "Côte d'Azur · New York · Dubai",
};

// The architectural journey — each room is a section of the site.
export const rooms = [
  { id: "entrance", floor: "00", name: "Grand Entrance" },
  { id: "living", floor: "01", name: "Living Room" },
  { id: "kitchen", floor: "02", name: "Kitchen" },
  { id: "dining", floor: "03", name: "Dining Room" },
  { id: "cellar", floor: "04", name: "Wine Cellar" },
  { id: "office", floor: "05", name: "Executive Office" },
  { id: "theater", floor: "06", name: "Home Theater" },
  { id: "suite", floor: "07", name: "Master Suite" },
  { id: "closet", floor: "08", name: "Walk-in Closet" },
  { id: "spa", floor: "09", name: "Spa Bathroom" },
  { id: "wellness", floor: "10", name: "Wellness Area" },
  { id: "rooftop", floor: "11", name: "Rooftop Terrace" },
] as const;

export const about = {
  eyebrow: "The House of Velmont",
  title: "We do not build houses.\nWe compose the way life is lived.",
  lead: "For two decades, Velmont Estates has authored residences that outlive trend and appreciate beyond measure — architectural masterpieces conceived as heirlooms, not addresses.",
  columns: [
    {
      k: "Vision",
      t: "A single, uncompromising idea",
      body: "Every Velmont residence begins as a question: how should a life this considered be housed? The answer becomes architecture — patient, precise, and entirely bespoke.",
    },
    {
      k: "Mission",
      t: "Craft without compromise",
      body: "We assemble the world's finest artisans, engineers, and designers around one commission at a time. Nothing is templated. Everything is drawn by hand before it is built by master.",
    },
    {
      k: "Philosophy",
      t: "Timelessness over trend",
      body: "We measure success in decades, not seasons. Materials are chosen for how they age; proportions for how they endure. A Velmont home is finished the moment it feels inevitable.",
    },
  ],
  stat: [
    { n: "20", s: "Years of quiet mastery" },
    { n: "€4.2B", s: "In realised residences" },
    { n: "38", s: "Countries commissioned" },
    { n: "100%", s: "Bespoke, never repeated" },
  ],
};

export const services = [
  {
    n: "01",
    title: "Bespoke Residences",
    desc: "Ground-up architecture conceived around a single family's life — every threshold, sightline, and material drawn to order.",
    img: U("1600585154340-be6161a56a0c"),
  },
  {
    n: "02",
    title: "Custom Villas",
    desc: "Waterfront estates and hillside retreats where structure dissolves into landscape and glass surrenders to view.",
    img: U("1580587771525-78b9dba3b914"),
  },
  {
    n: "03",
    title: "Architecture",
    desc: "An in-house atelier of architects translating ambition into engineered permanence — sculptural, structural, sublime.",
    img: U("1616486338812-3dadae4b4ace"),
  },
  {
    n: "04",
    title: "Interior Design",
    desc: "Interiors composed as instruments of atmosphere — light, texture, and shadow tuned to the hour and the mood.",
    img: U("1600607687939-ce8a6c25118c"),
  },
  {
    n: "05",
    title: "Property Development",
    desc: "Signature collections in the world's most coveted enclaves, developed with the discretion of a private commission.",
    img: U("1600585152220-90363fe7e115"),
  },
  {
    n: "06",
    title: "Lifestyle Curation",
    desc: "Beyond the build — staffing, art advisory, and estate management so a residence is not merely owned, but lived.",
    img: U("1600210492486-724fe5c67fb0"),
  },
];

export const properties = [
  {
    id: "maison-lumiere",
    name: "Maison Lumière",
    location: "Cap-Ferrat, France",
    price: "Price upon request",
    spec: "6 Bed · 9 Bath · 1,240 m²",
    tag: "Waterfront",
    img: U("1600596542815-ffad4c1539a9", 1800),
    blurb: "A cliffside villa of glass and travertine suspended above the Mediterranean.",
  },
  {
    id: "the-monolith",
    name: "The Monolith",
    location: "Beverly Hills, USA",
    price: "$46,500,000",
    spec: "8 Bed · 12 Bath · 1,850 m²",
    tag: "Architectural",
    img: U("1512917774080-9991f1c4c750", 1800),
    blurb: "A sculpted volume of black steel and warm oak carved into the hillside.",
  },
  {
    id: "villa-aurelia",
    name: "Villa Aurelia",
    location: "Lake Como, Italy",
    price: "€38,000,000",
    spec: "7 Bed · 10 Bath · 1,520 m²",
    tag: "Heritage",
    img: U("1600585154526-990dced4db0d", 1800),
    blurb: "A restored belle-époque estate reimagined for a contemporary dynasty.",
  },
  {
    id: "sky-pavilion",
    name: "Sky Pavilion",
    location: "Dubai, UAE",
    price: "Price upon request",
    spec: "Full-floor · 5 Bed · 1,100 m²",
    tag: "Penthouse",
    img: U("1512453979798-5ea266f8880c", 1800),
    blurb: "A private aerie above the skyline, wrapped in floor-to-ceiling horizon.",
  },
];

export const collection = [
  { id: "c1", name: "The Obsidian Wing", meta: "Private Commission", img: U("1600566753086-00f18fb6b3ea", 1400), span: "tall" },
  { id: "c2", name: "Atrium of Light", meta: "Signature Development", img: U("1600607688969-a5bfcd646154", 1400), span: "wide" },
  { id: "c3", name: "The Marble Court", meta: "Ultra-Prime Residence", img: U("1567767292278-a4f21aa2d36e", 1400), span: "reg" },
  { id: "c4", name: "Cellar No. IV", meta: "Bespoke Interior", img: U("1560448204-e02f11c3d0e2", 1400), span: "reg" },
  { id: "c5", name: "Suspended Garden", meta: "Rooftop Commission", img: U("1615529182904-14819c35db37", 1400), span: "tall" },
  { id: "c6", name: "The Long Gallery", meta: "Private Estate", img: U("1512918728675-ed5a9ecdebfd", 1400), span: "wide" },
];

export const timeline = [
  { year: "2004", t: "The atelier is founded", d: "A single architect, a single commission on the Côte d'Azur." },
  { year: "2011", t: "First international estate", d: "Velmont crosses the Atlantic with a landmark Beverly Hills residence." },
  { year: "2017", t: "The Craft Guild", d: "An in-house guild of master artisans is established across three continents." },
  { year: "2022", t: "Award for Architecture", d: "Named Développeur de l'Année for uncompromising design integrity." },
  { year: "2026", t: "The next horizon", d: "Twelve signature developments underway in the world's rarest locations." },
];

export const awards = [
  "Développeur de l'Année · 2022",
  "Prix d'Excellence Architecturale",
  "Robb Report — Best of the Best",
  "AD100 Recognised Atelier",
  "International Property Awards · Grand Prix",
];

export const testimonials = [
  {
    quote:
      "Velmont did not deliver a house. They delivered the feeling I had been trying to describe my whole life, made permanent in stone and light.",
    name: "A. Rothschild-Levine",
    role: "Private Client · Geneva",
    img: U("1600566752355-35792bedcfea", 900),
  },
  {
    quote:
      "The most disciplined studio I have ever commissioned. Not one detail was left to chance, and not one promise went unkept.",
    name: "Marcus Thorne",
    role: "Collector · New York",
    img: U("1600047509807-ba8f99d2cdde", 900),
  },
  {
    quote:
      "They understood that luxury is silence — the absence of everything that does not belong. Our home has that silence.",
    name: "Sofia Marchetti",
    role: "Principal · Milan",
    img: U("1600210492486-724fe5c67fb0", 900),
  },
];

export const lifestyle = {
  eyebrow: "The Velmont Life",
  title: "A residence is not where the day ends.\nIt is the instrument the day is played on.",
  body: "Morning light calibrated to wake you gently. A kitchen that performs for one or for one hundred. A cellar that keeps time. Every Velmont home is choreographed around the rituals of an extraordinary life.",
  images: [
    U("1615529182904-14819c35db37", 1200),
    U("1600607687939-ce8a6c25118c", 1200),
    U("1600585152220-90363fe7e115", 1200),
  ],
};

export const features = [
  { t: "Intelligent Living", d: "A whole-estate operating system anticipating light, climate, sound, and security before you ask." },
  { t: "Wellness by Design", d: "Circadian lighting, hydrotherapy, and air purified to alpine clarity — built into the architecture." },
  { t: "Sustainable Permanence", d: "Geothermal, solar, and greywater systems concealed within materials chosen to last a century." },
  { t: "Master Finishes", d: "Book-matched Italian marble, hand-oiled walnut, brushed bronze — sourced, never substituted." },
  { t: "Private Security", d: "Discreet, integrated protection engineered to be felt only in its absence of intrusion." },
  { t: "Curated Provenance", d: "Every fixture, stone, and species documented — a residence with a biography." },
];

export const philosophy = {
  eyebrow: "The Detail",
  title: "Luxury is what survives the closest inspection.",
  points: [
    { k: "Material", t: "Italian Marble", d: "Quarried, book-matched, and set by hand so the veining tells a single continuous story across a room." },
    { k: "Warmth", t: "Natural Walnut", d: "Slow-grown, hand-oiled timber that deepens with every passing year of use." },
    { k: "Structure", t: "Black Steel", d: "Minimal, muscular framing that lets glass span impossibly and shadows fall with intent." },
    { k: "Accent", t: "Brushed Bronze", d: "The single warm metal that ties a Velmont interior together — aged, never lacquered." },
  ],
};

export const investment = {
  eyebrow: "The Horizon",
  title: "The rarest addresses appreciate in silence.",
  body: "Velmont residences are not merely homes; they are positions. Scarcity, provenance, and uncompromising build quality have made our developments among the most resilient private assets in the world.",
  stats: [
    { n: "+11.4%", s: "Avg. annual appreciation" },
    { n: "12", s: "Developments underway" },
    { n: "0", s: "Ever offered twice" },
  ],
  future: [
    { name: "Velmont Riviera", loc: "Saint-Tropez", status: "Reservations 2026" },
    { name: "The Aspen Reserve", loc: "Colorado", status: "Groundbreaking 2027" },
    { name: "Marina Bianca", loc: "Porto Cervo", status: "In design" },
  ],
};

export const contact = {
  eyebrow: "Begin the Commission",
  title: "From vision to reality.",
  body: "A Velmont residence begins with a single, private conversation. Tell us how you wish to live.",
  email: "private@velmontestates.com",
  phone: "+33 4 93 00 04 04",
  offices: ["Côte d'Azur", "New York", "Dubai"],
};

export const nav = [
  { label: "Vision", target: "living" },
  { label: "Services", target: "kitchen" },
  { label: "Residences", target: "dining" },
  { label: "Collection", target: "cellar" },
  { label: "Contact", target: "rooftop" },
];
